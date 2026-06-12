'use client'
import { useEffect, useState } from 'react'
import { supabaseBrowser as supabase } from '@/lib/supabaseBrowser'
import { HABIT_XP, levelFromXP, stageFromXP } from '@/lib/xp'
const EMOJIS = ['💧','🏃','📖','🧘','🥗','😴','✍️','🎵','☀️','💊','🌿','❤️']
const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

// Adjust XP + plant when a habit is completed (+) or un-completed (-). Persists to DB.
async function adjustHabitXP(uid: string, complete: boolean) {
  const today = new Date().toISOString().split('T')[0]
  const now = new Date().toISOString()
  const delta = complete ? HABIT_XP : -HABIT_XP
  const gemDelta = complete ? Math.floor(HABIT_XP / 10) : -Math.floor(HABIT_XP / 10)

  const { data: cur } = await supabase.from('user_xp').select('total_xp, gems').eq('user_id', uid).single()
  const newXP = Math.max(0, (cur?.total_xp || 0) + delta)
  const newGems = Math.max(0, (cur?.gems || 0) + gemDelta)

  await supabase.from('user_xp').upsert({
    user_id: uid, total_xp: newXP, level: levelFromXP(newXP), gems: newGems,
    last_active_date: today, updated_at: now,
  }, { onConflict: 'user_id' })

  if (complete) {
    await supabase.from('xp_events').insert({ user_id: uid, action: 'habit_done', xp_gained: HABIT_XP, description: 'Habit completed' })
  }

  const { data: plant } = await supabase.from('user_plant').select('total_waterings').eq('user_id', uid).single()
  const newWater = Math.max(0, (plant?.total_waterings || 0) + (complete ? 1 : -1))
  await supabase.from('user_plant').upsert({
    user_id: uid, total_waterings: newWater, stage: stageFromXP(newXP),
    last_watered_at: now, updated_at: now,
  }, { onConflict: 'user_id' })
}

export default function HabitsPage() {
  const [habits, setHabits] = useState<any[]>([])
  const [completions, setCompletions] = useState<Record<string, boolean>>({})
  const [newHabit, setNewHabit] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState('💧')
  const [xpToast, setXpToast] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    let done = false
    const init = (uid: string) => { if (!done) { done = true; setUserId(uid); loadHabits(uid) } }
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (session?.user) init(session.user.id)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e: any, session: any) => {
      if (session?.user) init(session.user.id)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  async function loadHabits(uid: string) {
    const { data: h } = await supabase.from('habits').select('*').eq('user_id', uid).eq('is_active', true).order('created_at')
    const { data: c } = await supabase.from('habit_completions').select('habit_id').eq('user_id', uid).eq('completed_date', today)
    setHabits(h || [])
    const done: Record<string, boolean> = {}
    c?.forEach((x: any) => { done[x.habit_id] = true })
    setCompletions(done)
  }

  async function addHabit() {
    if (!newHabit.trim() || !userId) return
    const { data } = await supabase.from('habits').insert({ user_id: userId, title: newHabit.trim(), emoji: selectedEmoji }).select().single()
    if (data) { setHabits(prev => [...prev, data]); setNewHabit('') }
  }

  async function toggleHabit(habitId: string) {
    if (!userId) return
    if (completions[habitId]) {
      await supabase.from('habit_completions').delete().eq('habit_id', habitId).eq('completed_date', today)
      setCompletions(prev => { const n = {...prev}; delete n[habitId]; return n })
      try { await adjustHabitXP(userId, false) } catch (e) { console.error('habit XP remove failed', e) }
    } else {
      await supabase.from('habit_completions').insert({ habit_id: habitId, user_id: userId, completed_date: today })
      setCompletions(prev => ({ ...prev, [habitId]: true }))
      try { await adjustHabitXP(userId, true) } catch (e) { console.error('habit XP award failed', e) }
      setXpToast('+30 XP 🌱'); setTimeout(() => setXpToast(''), 2000)
    }
  }

  const doneCount = Object.keys(completions).length

  return (
    <div>
      {xpToast && <div style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', background: '#2D2926', color: 'white', padding: '10px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600, zIndex: 200, whiteSpace: 'nowrap' }}>{xpToast}</div>}

      <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', marginBottom: 4 }}>Habits</div>
      <div style={{ fontSize: 13, color: '#9B8F88', marginBottom: 20 }}>Each habit = +30 XP · {doneCount}/{habits.length} done today</div>

      {/* Progress */}
      {habits.length > 0 && (
        <div style={{ background: '#D4E8D4', borderRadius: 16, padding: '16px', marginBottom: 20, textAlign: 'center' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 32, color: '#2D2926', marginBottom: 4 }}>{doneCount}/{habits.length}</div>
          <div style={{ background: 'rgba(255,255,255,0.5)', borderRadius: 100, height: 6, overflow: 'hidden', margin: '8px 0' }}>
            <div style={{ height: '100%', width: habits.length ? `${(doneCount / habits.length) * 100}%` : '0%', background: '#5BA85B', borderRadius: 100, transition: 'width 0.4s' }} />
          </div>
          <div style={{ fontSize: 12, color: '#6B5F58' }}>{doneCount === habits.length && habits.length > 0 ? '🎉 All done! Amazing!' : 'habits completed today'}</div>
        </div>
      )}

      {/* Habits list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {habits.map(habit => {
          const done = !!completions[habit.id]
          return (
            <div key={habit.id} onClick={() => toggleHabit(habit.id)} style={{ background: done ? '#D4E8D4' : '#FEFCFA', border: `1.5px solid ${done ? '#B8D4B8' : 'rgba(45,41,38,0.08)'}`, borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: done ? '#B8D4B8' : '#E8DEFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{habit.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#2D2926', fontWeight: 500, textDecoration: done ? 'line-through' : 'none' }}>{habit.title}</div>
                <div style={{ fontSize: 11, color: '#9B8F88', marginTop: 2 }}>{done ? '✓ Done today! +30 XP' : 'Tap to complete'}</div>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: '50%', border: done ? 'none' : '2px solid #D4C5F9', background: done ? '#5BA85B' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                {done && <span style={{ color: 'white' }}>✓</span>}
              </div>
            </div>
          )
        })}
      </div>

      {/* Add habit */}
      <div style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 16, padding: '16px' }}>
        <div style={{ fontSize: 13, color: '#6B5F58', fontWeight: 500, marginBottom: 10 }}>Add a new habit</div>
        <div style={{ fontSize: 11, color: '#9B8F88', marginBottom: 6 }}>Pick an icon</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {EMOJIS.map(e => (
            <button key={e} onClick={() => setSelectedEmoji(e)} style={{ fontSize: 18, padding: '4px 8px', borderRadius: 8, border: `1.5px solid ${selectedEmoji === e ? '#B8A4E8' : 'transparent'}`, background: selectedEmoji === e ? '#E8DEFF' : 'transparent', cursor: 'pointer' }}>{e}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input value={newHabit} onChange={e => setNewHabit(e.target.value)} onKeyDown={e => e.key === 'Enter' && addHabit()} placeholder="e.g. Drink water, Move 10 min..." style={{ flex: 1, border: '1.5px solid rgba(45,41,38,0.12)', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#2D2926', background: '#FFF8F0', outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
          <button onClick={addHabit} style={{ background: '#B8A4E8', color: 'white', border: 'none', borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Add</button>
        </div>
      </div>
    </div>
  )
}
