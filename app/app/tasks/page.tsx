'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null as any
  return createClient(url, key)
})()

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [newTask, setNewTask] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [newStep, setNewStep] = useState('')
  const [xpToast, setXpToast] = useState('')
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) { setUserId(user.id); loadTasks(user.id) }
    })
  }, [])

  async function loadTasks(uid: string) {
    const { data } = await supabase.from('tasks').select('*').eq('user_id', uid).eq('status', 'active').order('created_at', { ascending: false })
    setTasks(data || [])
  }

  async function addTask() {
    if (!newTask.trim() || !userId) return
    const { data } = await supabase.from('tasks').insert({ user_id: userId, title: newTask.trim(), steps: [] }).select().single()
    if (data) { setTasks(prev => [data, ...prev]); setNewTask('') }
  }

  async function completeTask(task: any) {
    await supabase.from('tasks').update({ status: 'done', completed_at: new Date().toISOString() }).eq('id', task.id)
    setTasks(prev => prev.filter(t => t.id !== task.id))
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
    if (!task.steps[stepIdx].done) showXP('+10 XP ✓')
  }

  function showXP(msg: string) { setXpToast(msg); setTimeout(() => setXpToast(''), 2500) }

  return (
    <div>
      {xpToast && <div style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', background: '#2D2926', color: 'white', padding: '10px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600, zIndex: 200, whiteSpace: 'nowrap' }}>{xpToast}</div>}

      <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', marginBottom: 4 }}>Tasks</div>
      <div style={{ fontSize: 13, color: '#9B8F88', marginBottom: 20 }}>Each task = +50 XP + waters your plant 💧</div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} placeholder="What's the thing you're avoiding?" style={{ flex: 1, border: '1.5px solid rgba(45,41,38,0.12)', borderRadius: 12, padding: '11px 14px', fontSize: 14, color: '#2D2926', background: '#FEFCFA', outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
        <button onClick={addTask} style={{ background: '#B8A4E8', color: 'white', border: 'none', borderRadius: 12, padding: '11px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Add ✨</button>
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
