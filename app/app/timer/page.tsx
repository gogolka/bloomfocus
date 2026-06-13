'use client'
import { useState, useEffect, useRef } from 'react'
import { supabaseBrowser as supabase } from '@/lib/supabaseBrowser'
import { POMODORO_XP, levelFromXP, stageFromXP } from '@/lib/xp'
import { computeStreak, notifyStreakMilestone } from '@/lib/streak'
import { useCountdown, ensureNotificationPermission, notify } from '@/lib/timer'

const MODE_DEFAULTS = { focus: 25 * 60, short: 5 * 60, long: 15 * 60, micro: 10 * 60 }
type Mode = keyof typeof MODE_DEFAULTS
const CIRCUMFERENCE = 2 * Math.PI * 88
const STORE_KEY = 'bloom-focus-timer'
const FOCUS_KEY = 'bloom-focus-length'

async function awardPomodoroXP(uid: string) {
  const today = new Date().toISOString().split('T')[0]
  const now = new Date().toISOString()
  const { data: cur } = await supabase.from('user_xp').select('total_xp, gems').eq('user_id', uid).single()
  const newXP = (cur?.total_xp || 0) + POMODORO_XP
  const newGems = (cur?.gems || 0) + Math.floor(POMODORO_XP / 10)
  const streak = await computeStreak(uid)
  await supabase.from('user_xp').upsert({
    user_id: uid, total_xp: newXP, level: levelFromXP(newXP), gems: newGems,
    streak_days: streak.streak_days, last_active_date: streak.last_active_date, updated_at: now,
  }, { onConflict: 'user_id' })
  if (streak.milestoneReached) notifyStreakMilestone()
  await supabase.from('xp_events').insert({ user_id: uid, action: 'pomodoro_done', xp_gained: POMODORO_XP, description: 'Focus session completed' })
  const { data: plant } = await supabase.from('user_plant').select('total_waterings').eq('user_id', uid).single()
  await supabase.from('user_plant').upsert({
    user_id: uid, total_waterings: (plant?.total_waterings || 0) + 1, stage: stageFromXP(newXP),
    last_watered_at: now, updated_at: now,
  }, { onConflict: 'user_id' })
}

export default function TimerPage() {
  const [mode, setMode] = useState<Mode>('focus')
  const [focusMin, setFocusMin] = useState(25)
  const [task, setTask] = useState('')
  const [pomodoros, setPomodoros] = useState(0)
  const [xpToast, setXpToast] = useState('')
  const modeRef = useRef(mode); modeRef.current = mode
  const taskRef = useRef(task); taskRef.current = task
  const focusMinRef = useRef(focusMin); focusMinRef.current = focusMin

  const MODES: Record<Mode, number> = { focus: focusMin * 60, short: MODE_DEFAULTS.short, long: MODE_DEFAULTS.long, micro: MODE_DEFAULTS.micro }

  const showToast = (msg: string) => { setXpToast(msg); setTimeout(() => setXpToast(''), 3000) }

  async function saveSession() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const durationMin = modeRef.current === 'focus' ? focusMinRef.current : MODE_DEFAULTS[modeRef.current] / 60
    await supabase.from('pomodoro_sessions').insert({ user_id: user.id, duration_minutes: durationMin, task_label: taskRef.current || null, completed: true })
    try { await awardPomodoroXP(user.id) } catch (e) { console.error('pomodoro XP failed', e) }
  }

  function handleComplete() {
    try { localStorage.removeItem(STORE_KEY) } catch {}
    if (modeRef.current === 'focus') {
      setPomodoros(p => p + 1)
      showToast('+40 XP 🍅 Focus complete!')
      notify('🍅 Focus complete!', 'Nice work — time for a break.')
      saveSession()
    } else {
      showToast('☕ Break over!')
      notify('☕ Break over', 'Ready to focus again?')
    }
  }

  const { remaining, running, startAt, start, pause, resume, reset } = useCountdown(handleComplete)

  // Restore a running timer (and its mode) after a reload / PWA reopen.
  useEffect(() => {
    try {
      const fl = parseInt(localStorage.getItem(FOCUS_KEY) || '', 10)
      if (fl && fl >= 1 && fl <= 180) setFocusMin(fl)
    } catch {}
    try {
      const raw = localStorage.getItem(STORE_KEY)
      if (raw) {
        const saved = JSON.parse(raw)
        if (saved.end && saved.end > Date.now() && saved.mode in MODES) {
          setMode(saved.mode)
          startAt(saved.end)
        } else {
          localStorage.removeItem(STORE_KEY)
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const total = MODES[mode]
  const shown = running ? remaining : (remaining > 0 ? remaining : total)
  const pct = shown / total
  const mins = Math.floor(shown / 60).toString().padStart(2, '0')
  const secs = (shown % 60).toString().padStart(2, '0')

  function persist(end: number, m: keyof typeof MODES) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ end, mode: m })) } catch {}
  }

  function handlePlayPause() {
    if (running) {
      pause()
      try { localStorage.removeItem(STORE_KEY) } catch {}
      return
    }
    const sec = remaining > 0 && remaining < total ? remaining : MODES[mode]
    const end = Date.now() + sec * 1000
    persist(end, mode)
    startAt(end)
    ensureNotificationPermission() // non-blocking: enables the completion notification
  }

  function changeMode(m: Mode) {
    setMode(m)
    reset(MODES[m])
    try { localStorage.removeItem(STORE_KEY) } catch {}
  }

  function handleReset() {
    reset(MODES[mode])
    try { localStorage.removeItem(STORE_KEY) } catch {}
  }

  // Pro: customise the focus length. Only allowed while not running, so an
  // in-progress session is never disrupted.
  function setFocusLength(min: number) {
    if (running) return
    const clamped = Math.max(1, Math.min(180, Math.round(min)))
    setFocusMin(clamped)
    try { localStorage.setItem(FOCUS_KEY, String(clamped)) } catch {}
    if (mode === 'focus') reset(clamped * 60)
  }

  return (
    <div>
      {xpToast && <div style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', background: '#2D2926', color: 'white', padding: '10px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600, zIndex: 200, maxWidth: 'calc(100vw - 32px)', textAlign: 'center' }}>{xpToast}</div>}

      <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', marginBottom: 4 }}>Focus Timer</div>
      <div style={{ fontSize: 13, color: '#9B8F88', marginBottom: 20 }}>Each pomodoro = +40 XP · {pomodoros} done today 🍅</div>

      {/* Task input */}
      <input value={task} onChange={e => setTask(e.target.value)} placeholder="What are you focusing on?" style={{ width: '100%', border: '1.5px solid rgba(45,41,38,0.12)', borderRadius: 12, padding: '11px 14px', fontSize: 14, color: '#2D2926', background: '#FEFCFA', outline: 'none', marginBottom: 16, fontFamily: "'DM Sans', sans-serif", boxSizing: 'border-box' }} />

      {/* Mode buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {(Object.entries(MODES) as [Mode, number][]).map(([m]) => (
          <button key={m} onClick={() => changeMode(m)} style={{ background: mode === m ? '#B8A4E8' : '#FEFCFA', color: mode === m ? 'white' : '#6B5F58', border: `1.5px solid ${mode === m ? '#B8A4E8' : 'rgba(45,41,38,0.12)'}`, borderRadius: 100, padding: '7px 16px', fontSize: 12, fontWeight: mode === m ? 600 : 400, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            {m === 'focus' ? `🍅 Focus ${focusMin}m` : m === 'short' ? '☕ Break 5m' : m === 'long' ? '🌿 Long 15m' : '⚡ Micro 10m'}
          </button>
        ))}
      </div>

      {/* Focus-length presets (Pro) */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: '#9B8F88' }}>Focus length:</span>
        {[25, 50, 90].map(min => (
          <button key={min} onClick={() => setFocusLength(min)} disabled={running} style={{ background: focusMin === min ? '#E8DEFF' : 'transparent', color: focusMin === min ? '#7B5FCC' : '#9B8F88', border: '1px solid rgba(123,95,204,0.25)', borderRadius: 100, padding: '5px 12px', fontSize: 12, fontWeight: focusMin === min ? 600 : 400, cursor: running ? 'default' : 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            {min}m
          </button>
        ))}
        <input
          type="number" min={1} max={180} value={focusMin}
          onChange={e => setFocusLength(parseInt(e.target.value, 10) || 1)}
          disabled={running}
          style={{ width: 60, border: '1px solid rgba(123,95,204,0.25)', borderRadius: 100, padding: '5px 10px', fontSize: 12, color: '#7B5FCC', background: 'transparent', outline: 'none', fontFamily: "'DM Sans', sans-serif", textAlign: 'center' }}
        />
      </div>

      {/* Timer ring */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ position: 'relative', width: 200, height: 200, marginBottom: 24 }}>
          <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="100" cy="100" r="88" fill="none" stroke="#E8DEFF" strokeWidth="8" />
            <circle cx="100" cy="100" r="88" fill="none" stroke="#B8A4E8" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE} strokeDashoffset={CIRCUMFERENCE * (1 - pct)} style={{ transition: 'stroke-dashoffset 1s linear' }} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 48, color: '#2D2926', letterSpacing: '-2px', lineHeight: 1 }}>{mins}:{secs}</div>
            <div style={{ fontSize: 11, color: '#9B8F88', marginTop: 4, textTransform: 'uppercase', letterSpacing: '1px' }}>{running ? (mode === 'focus' ? 'focusing…' : 'resting…') : shown === 0 ? 'done!' : 'ready'}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={handleReset} style={{ width: 52, height: 52, borderRadius: '50%', border: 'none', background: '#E8DEFF', color: '#2D2926', fontSize: 20, cursor: 'pointer' }}>↺</button>
          <button onClick={handlePlayPause} style={{ width: 52, height: 52, borderRadius: '50%', border: 'none', background: '#B8A4E8', color: 'white', fontSize: 20, cursor: 'pointer' }}>
            {running ? '⏸' : '▶'}
          </button>
        </div>

        {/* Pomodoro dots */}
        <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          {Array.from({ length: Math.max(4, pomodoros + 1) }).map((_, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: i < pomodoros ? '#B8A4E8' : '#E8DEFF', border: '2px solid #D4C5F9' }} />
          ))}
        </div>
      </div>

      {/* Tips */}
      <div style={{ background: '#FFD6C4', borderRadius: 16, padding: '16px', border: '1px solid #FFBFA8' }}>
        <div style={{ fontSize: 13, color: '#6B5F58', lineHeight: 1.6 }}>
          <strong>💡 Tip:</strong> Even one 25-minute focus session counts. Your brain doesn't need to be perfect — it needs to start.
        </div>
      </div>
    </div>
  )
}
