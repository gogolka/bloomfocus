'use client'
import { useEffect, useState } from 'react'
import { supabaseBrowser as supabase } from '@/lib/supabaseBrowser'
import { BRAIN_DUMP_XP, levelFromXP, stageFromXP } from '@/lib/xp'
import { computeStreak, notifyStreakMilestone } from '@/lib/streak'

async function awardDumpXP(uid: string) {
  const today = new Date().toISOString().split('T')[0]
  const now = new Date().toISOString()
  const { data: cur } = await supabase.from('user_xp').select('total_xp, gems').eq('user_id', uid).single()
  const newXP = (cur?.total_xp || 0) + BRAIN_DUMP_XP
  const newGems = (cur?.gems || 0) + Math.floor(BRAIN_DUMP_XP / 10)
  const streak = await computeStreak(uid)
  await supabase.from('user_xp').upsert({
    user_id: uid, total_xp: newXP, level: levelFromXP(newXP), gems: newGems,
    streak_days: streak.streak_days, last_active_date: streak.last_active_date, updated_at: now,
  }, { onConflict: 'user_id' })
  if (streak.milestoneReached) notifyStreakMilestone()
  await supabase.from('xp_events').insert({ user_id: uid, action: 'brain_dump', xp_gained: BRAIN_DUMP_XP, description: 'Brain dump' })
  const { data: plant } = await supabase.from('user_plant').select('total_waterings').eq('user_id', uid).single()
  await supabase.from('user_plant').upsert({
    user_id: uid, total_waterings: (plant?.total_waterings || 0) + 1, stage: stageFromXP(newXP),
    last_watered_at: now, updated_at: now,
  }, { onConflict: 'user_id' })
}

export default function DumpPage() {
  const [content, setContent] = useState('')
  const [dumps, setDumps] = useState<any[]>([])
  const [xpToast, setXpToast] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const [convertingId, setConvertingId] = useState<string | null>(null)
  const [lineSel, setLineSel] = useState<boolean[]>([])

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }: any) => {
      if (user) { setUserId(user.id); loadDumps(user.id) }
    })
  }, [])

  async function loadDumps(uid: string) {
    const { data } = await supabase.from('brain_dumps').select('*').eq('user_id', uid).order('created_at', { ascending: false }).limit(10)
    setDumps(data || [])
  }

  async function saveDump() {
    if (!content.trim() || !userId) return
    const { data } = await supabase.from('brain_dumps').insert({ user_id: userId, content: content.trim() }).select().single()
    if (data) {
      setDumps(prev => [data, ...prev])
      setContent('')
      try { await awardDumpXP(userId) } catch (e) { console.error('dump XP failed', e) }
      setXpToast('+20 XP 🧠 Brain unloaded!')
      setTimeout(() => setXpToast(''), 2500)
    }
  }

  function dumpLines(dump: any): string[] {
    return dump.content.split('\n').map((l: string) => l.trim()).filter(Boolean)
  }

  function openConvert(dump: any) {
    setConvertingId(dump.id)
    setLineSel(dumpLines(dump).map(() => true))
  }

  async function createTasksFromLines(dump: any) {
    if (!userId) return
    const lines = dumpLines(dump)
    const chosen = lines.filter((_, i) => lineSel[i] ?? true)
    if (chosen.length === 0) return
    const rows = chosen.map(l => ({ user_id: userId, title: l.substring(0, 200), steps: [], source: 'brain_dump' }))
    const { data: created } = await supabase.from('tasks').insert(rows).select('id')
    if (created && created.length) {
      await supabase.from('brain_dumps').update({ converted_task_id: created[0].id }).eq('id', dump.id)
      setDumps(prev => prev.map(d => d.id === dump.id ? { ...d, converted_task_id: created[0].id } : d))
    }
    setConvertingId(null); setLineSel([])
  }

  const words = content.trim().split(/\s+/).filter(Boolean).length

  return (
    <div>
      {xpToast && <div style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', background: '#2D2926', color: 'white', padding: '10px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600, zIndex: 200, whiteSpace: 'nowrap' }}>{xpToast}</div>}

      <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', marginBottom: 4 }}>Brain Dump</div>
      <div style={{ fontSize: 13, color: '#9B8F88', marginBottom: 20 }}>Empty your head. No judgment, no structure. +20 XP each dump 🧠</div>

      <div style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 16, padding: '16px', marginBottom: 20 }}>
        <textarea
          value={content} onChange={e => setContent(e.target.value)}
          placeholder={"Everything that's in your head right now…\nTasks, worries, ideas, random thoughts — let it all out."}
          style={{ width: '100%', border: 'none', resize: 'none', minHeight: 180, fontSize: 15, lineHeight: 1.8, color: '#2D2926', background: 'transparent', outline: 'none', fontFamily: "'DM Sans', sans-serif" }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <span style={{ fontSize: 11, color: '#9B8F88' }}>{words} words</span>
          <button onClick={saveDump} style={{ background: '#B8A4E8', color: 'white', border: 'none', borderRadius: 100, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Save dump 🧠 (+20 XP)
          </button>
        </div>
      </div>

      {/* Previous dumps */}
      {dumps.length > 0 && (
        <div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: '#2D2926', marginBottom: 12 }}>Previous dumps</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {dumps.map(dump => (
              <div key={dump.id} style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 14, padding: '14px 16px' }}>
                <div style={{ fontSize: 11, color: '#9B8F88', marginBottom: 8 }}>{new Date(dump.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                <div style={{ fontSize: 13, color: '#2D2926', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{dump.content.substring(0, 200)}{dump.content.length > 200 ? '…' : ''}</div>
                {dump.converted_task_id ? (
                  <div style={{ marginTop: 8, fontSize: 11, color: '#5BA85B' }}>✓ Converted to tasks</div>
                ) : convertingId === dump.id ? (
                  <div style={{ marginTop: 12, background: '#FFF8F0', border: '1px solid rgba(184,164,232,0.4)', borderRadius: 12, padding: '12px 14px' }}>
                    <div style={{ fontSize: 11, color: '#6B5F58', marginBottom: 10 }}>Tick the lines that are real tasks — each becomes its own task. Leave the rest as ideas.</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                      {dumpLines(dump).map((line: string, i: number) => (
                        <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer', fontSize: 13, color: '#2D2926' }}>
                          <input type="checkbox" checked={lineSel[i] ?? true} onChange={e => setLineSel(prev => { const n = [...prev]; n[i] = e.target.checked; return n })} style={{ marginTop: 3, accentColor: '#B8A4E8' }} />
                          <span style={{ lineHeight: 1.5 }}>{line}</span>
                        </label>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <button onClick={() => createTasksFromLines(dump)} disabled={lineSel.filter(Boolean).length === 0} style={{ background: lineSel.filter(Boolean).length === 0 ? '#D4C5F9' : '#B8A4E8', color: 'white', border: 'none', borderRadius: 100, padding: '8px 16px', fontSize: 12, fontWeight: 600, cursor: lineSel.filter(Boolean).length === 0 ? 'not-allowed' : 'pointer' }}>
                        Create {lineSel.filter(Boolean).length} task{lineSel.filter(Boolean).length === 1 ? '' : 's'} →
                      </button>
                      <button onClick={() => { setConvertingId(null); setLineSel([]) }} style={{ background: 'none', border: 'none', fontSize: 12, color: '#9B8F88', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => openConvert(dump)} style={{ marginTop: 10, background: '#E8DEFF', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 11, color: '#7B5FCC', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                    → Convert to tasks
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
