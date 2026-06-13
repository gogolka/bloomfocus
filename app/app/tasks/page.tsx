'use client'
import { useEffect, useState } from 'react'
import { supabaseBrowser as supabase } from '@/lib/supabaseBrowser'
import { computeStreak, notifyStreakMilestone } from '@/lib/streak'

// XP model — must stay consistent with lib/gamification.ts
const TASK_XP = 50
const LEVEL_THRESHOLDS = [0, 100, 250, 500, 900, 1400, 2000, 2700, 3500, 4400, 5500, 6700, 8000, 9500, 11000, 13000, 15000, 17500, 20000, 23000]
const PLANT_STAGE_XP = [0, 100, 300, 700, 1500, 3000] // stages 1..6

function levelFromXP(xp: number): number {
  let lvl = 1
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) { if (xp >= LEVEL_THRESHOLDS[i]) lvl = i + 1; else break }
  return lvl
}
function stageFromXP(xp: number): number {
  let stage = 1
  for (let i = 0; i < PLANT_STAGE_XP.length; i++) { if (xp >= PLANT_STAGE_XP[i]) stage = i + 1; else break }
  return stage
}

// Award XP for completing a whole task and water the plant. Persists to DB
// under the user's own session (RLS: auth.uid() = user_id).
async function awardTaskXP(uid: string) {
  const today = new Date().toISOString().split('T')[0]
  const now = new Date().toISOString()

  const { data: cur } = await supabase.from('user_xp').select('total_xp, gems').eq('user_id', uid).single()
  const newXP = (cur?.total_xp || 0) + TASK_XP
  const newGems = (cur?.gems || 0) + Math.floor(TASK_XP / 10)

  const streak = await computeStreak(uid)
  await supabase.from('user_xp').upsert({
    user_id: uid,
    total_xp: newXP,
    level: levelFromXP(newXP),
    gems: newGems,
    streak_days: streak.streak_days,
    last_active_date: streak.last_active_date,
    updated_at: now,
  }, { onConflict: 'user_id' })
  if (streak.milestoneReached) notifyStreakMilestone()

  await supabase.from('xp_events').insert({ user_id: uid, action: 'task_done', xp_gained: TASK_XP, description: 'Task completed' })

  const { data: plant } = await supabase.from('user_plant').select('total_waterings').eq('user_id', uid).single()
  await supabase.from('user_plant').upsert({
    user_id: uid,
    total_waterings: (plant?.total_waterings || 0) + 1,
    stage: stageFromXP(newXP),
    last_watered_at: now,
    updated_at: now,
  }, { onConflict: 'user_id' })
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [newTask, setNewTask] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newTags, setNewTags] = useState<string[]>([])
  const [newTagInput, setNewTagInput] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [newStep, setNewStep] = useState('')
  const [xpToast, setXpToast] = useState('')
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    let done = false
    const init = (uid: string) => { if (!done) { done = true; setUserId(uid); loadTasks(uid) } }
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (session?.user) init(session.user.id)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e: any, session: any) => {
      if (session?.user) init(session.user.id)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  // Sort: undated tasks first (newest first), then dated tasks by nearest due date.
  function sortTasks(list: any[]) {
    return [...list].sort((a, b) => {
      if (!a.due_date && !b.due_date) return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      if (!a.due_date) return -1
      if (!b.due_date) return 1
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
    })
  }

  async function loadTasks(uid: string) {
    const { data } = await supabase.from('tasks').select('*').eq('user_id', uid).eq('status', 'active')
    setTasks(sortTasks(data || []))
  }

  function addTag() {
    const t = newTagInput.trim()
    if (!t || newTags.includes(t)) { setNewTagInput(''); return }
    setNewTags(prev => [...prev, t])
    setNewTagInput('')
  }

  async function addTask() {
    if (!newTask.trim() || !userId) return
    // Fold any text still sitting in the tag input into the tags, so the user
    // doesn't have to press Enter — typing a tag and hitting Add just works.
    const pending = newTagInput.trim()
    const finalTags = pending && !newTags.includes(pending) ? [...newTags, pending] : newTags
    const { data } = await supabase.from('tasks').insert({
      user_id: userId,
      title: newTask.trim(),
      steps: [],
      due_date: newDate || null,
      tags: finalTags,
    }).select().single()
    if (data) {
      setTasks(prev => sortTasks([data, ...prev]))
      setNewTask(''); setNewDate(''); setNewTags([]); setNewTagInput('')
    }
  }

  async function completeTask(task: any) {
    await supabase.from('tasks').update({ status: 'done', completed_at: new Date().toISOString() }).eq('id', task.id)
    setTasks(prev => prev.filter(t => t.id !== task.id))
    if (userId) {
      try { await awardTaskXP(userId) } catch (e) { console.error('awardTaskXP failed', e) }
    }
    showXP('+50 XP 💧 Plant watered!')
  }

  async function addStep(taskId: string, task: any) {
    if (!newStep.trim()) return
    const updatedSteps = [...(task.steps || []), { text: newStep.trim(), done: false }]
    await supabase.from('tasks').update({ steps: updatedSteps }).eq('id', taskId)
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, steps: updatedSteps } : t))
    setNewStep('')
  }

  async function toggleStep(taskId: string, task: any, stepIdx: number) {
    const updatedSteps = task.steps.map((s: any, i: number) => i === stepIdx ? { ...s, done: !s.done } : s)
    await supabase.from('tasks').update({ steps: updatedSteps }).eq('id', taskId)
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, steps: updatedSteps } : t))
    // Steps only track progress — no XP. XP is awarded once, when the whole task is done.
    if (!task.steps[stepIdx].done) {
      const allDone = updatedSteps.every((s: any) => s.done)
      showXP(allDone ? 'All steps done — finish the task for +50 XP ✨' : 'Step done ✓')
    }
  }

  function showXP(msg: string) { setXpToast(msg); setTimeout(() => setXpToast(''), 2500) }

  function formatDue(d: string): { label: string; color: string } {
    const date = new Date(d + 'T00:00:00')
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const diff = Math.round((date.getTime() - today.getTime()) / 86400000)
    if (diff < 0) return { label: `${Math.abs(diff)}d overdue`, color: '#c0627a' }
    if (diff === 0) return { label: 'Today', color: '#7B5FCC' }
    if (diff === 1) return { label: 'Tomorrow', color: '#7B5FCC' }
    if (diff < 7) return { label: `In ${diff} days`, color: '#9B8F88' }
    return { label: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), color: '#9B8F88' }
  }

  return (
    <div>
      {xpToast && <div style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', background: '#2D2926', color: 'white', padding: '10px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600, zIndex: 200, maxWidth: 'calc(100vw - 32px)', textAlign: 'center' }}>{xpToast}</div>}

      <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', marginBottom: 4 }}>Tasks</div>
      <div style={{ fontSize: 13, color: '#9B8F88', marginBottom: 20 }}>Each task = +50 XP + waters your plant 💧</div>

      <div style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 16, padding: 14, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} placeholder="What's the plan?" style={{ flex: 1, border: '1.5px solid rgba(45,41,38,0.12)', borderRadius: 12, padding: '11px 14px', fontSize: 14, color: '#2D2926', background: 'white', outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
          <button onClick={addTask} style={{ background: '#B8A4E8', color: 'white', border: 'none', borderRadius: 12, padding: '11px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Add ✨</button>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#9B8F88' }}>
            <span>📅</span>
            <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} style={{ border: '1px solid rgba(45,41,38,0.12)', borderRadius: 8, padding: '6px 10px', fontSize: 12, color: '#2D2926', background: 'white', outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
            {newDate && <button onClick={() => setNewDate('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9B8F88', fontSize: 13 }}>✕</button>}
          </label>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#9B8F88' }}>
            <span>🏷</span>
            <input value={newTagInput} onChange={e => setNewTagInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag() } }} placeholder="Add tag (optional)" style={{ border: '1px solid rgba(45,41,38,0.12)', borderRadius: 8, padding: '6px 10px', fontSize: 12, color: '#2D2926', background: 'white', outline: 'none', fontFamily: "'DM Sans', sans-serif", width: 130 }} />
          </div>

          {newTags.map(tag => (
            <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#E8DEFF', color: '#7B5FCC', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>
              {tag}
              <button onClick={() => setNewTags(prev => prev.filter(t => t !== tag))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7B5FCC', fontSize: 12, lineHeight: 1, padding: 0 }}>✕</button>
            </span>
          ))}
        </div>
      </div>

      {tasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#9B8F88' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: '#2D2926', marginBottom: 4 }}>All clear!</div>
          <div style={{ fontSize: 13 }}>Add a task above to get started.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tasks.map(task => {
            const isExp = expanded === task.id
            const stepsDone = (task.steps || []).filter((s: any) => s.done).length
            const stepsTotal = (task.steps || []).length
            return (
              <div key={task.id} style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button onClick={() => completeTask(task)} title="Mark done" style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #D4C5F9', background: 'transparent', cursor: 'pointer', flexShrink: 0 }} />
                  <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => setExpanded(isExp ? null : task.id)}>
                    <div style={{ fontSize: 14, color: '#2D2926', fontWeight: 500 }}>{task.title}</div>
                    {(task.due_date || (task.tags && task.tags.length > 0)) && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginTop: 5 }}>
                        {task.due_date && (() => { const d = formatDue(task.due_date); return (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 600, color: d.color }}>📅 {d.label}</span>
                        )})()}
                        {(task.tags || []).map((tag: string) => (
                          <span key={tag} style={{ background: '#E8DEFF', color: '#7B5FCC', borderRadius: 100, padding: '2px 8px', fontSize: 10, fontWeight: 600 }}>{tag}</span>
                        ))}
                      </div>
                    )}
                    {stepsTotal > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                        <div style={{ flex: 1, background: '#E8DEFF', borderRadius: 100, height: 3, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${(stepsDone / stepsTotal) * 100}%`, background: '#B8A4E8', borderRadius: 100 }} />
                        </div>
                        <div style={{ fontSize: 10, color: '#9B8F88' }}>{stepsDone}/{stepsTotal}</div>
                      </div>
                    )}
                  </div>
                  <button onClick={() => setExpanded(isExp ? null : task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#9B8F88' }}>{isExp ? '▲' : '▼'}</button>
                </div>
                {isExp && (
                  <div style={{ background: '#FFF8F0', borderTop: '1px solid rgba(45,41,38,0.06)', padding: '12px 16px' }}>
                    {(task.steps || []).map((step: any, si: number) => (
                      <div key={si} onClick={() => toggleStep(task.id, task, si)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', cursor: 'pointer' }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', border: step.done ? 'none' : '1.5px solid #D4C5F9', background: step.done ? '#B8A4E8' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {step.done && <span style={{ color: 'white', fontSize: 10 }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 13, color: step.done ? '#9B8F88' : '#2D2926', textDecoration: step.done ? 'line-through' : 'none' }}>{step.text}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                      <input value={newStep} onChange={e => setNewStep(e.target.value)} onKeyDown={e => e.key === 'Enter' && addStep(task.id, task)} placeholder="Add a micro-step..." style={{ flex: 1, border: '1px solid rgba(45,41,38,0.1)', borderRadius: 8, padding: '7px 10px', fontSize: 13, background: 'white', outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
                      <button onClick={() => addStep(task.id, task)} style={{ background: '#E8DEFF', border: 'none', borderRadius: 8, padding: '7px 12px', fontSize: 12, cursor: 'pointer', color: '#7B5FCC' }}>+</button>
                    </div>
                    <button onClick={() => completeTask(task)} style={{ marginTop: 10, width: '100%', background: '#2D2926', color: 'white', border: 'none', borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                      Mark as done ✓ (+50 XP)
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
