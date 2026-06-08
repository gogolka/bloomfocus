'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null as any
  return createClient(url, key)
})()
const MODES = { focus: 25 * 60, short: 5 * 60, long: 15 * 60, micro: 10 * 60 }
const CIRCUMFERENCE = 2 * Math.PI * 88

export default function TimerPage() {
  const [mode, setMode] = useState<keyof typeof MODES>('focus')
  const [remaining, setRemaining] = useState(MODES.focus)
  const [running, setRunning] = useState(false)
  const [task, setTask] = useState('')
  const [pomodoros, setPomodoros] = useState(0)
  const [xpToast, setXpToast] = useState('')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const total = MODES[mode]
  const pct = remaining / total
  const mins = Math.floor(remaining / 60).toString().padStart(2, '0')
  const secs = (remaining % 60).toString().padStart(2, '0')

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining(r => {
          if (r <= 1) {
            clearInterval(intervalRef.current!)
            setRunning(false)
            if (mode === 'focus') {
              setPomodoros(p => p + 1)
              setXpToast('+40 XP 🍅 Focus complete!')
              setTimeout(() => setXpToast(''), 3000)
              saveSession()
            }
            return 0
          }
          return r - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  async function saveSession() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('pomodoro_sessions').insert({ user_id: user.id, duration_minutes: MODES[mode] / 60, task_label: task || null, completed: true })
  }

  function changeMode(m: keyof typeof MODES) {
    setMode(m); setRemaining(MODES[m]); setRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  function reset() { setRemaining(MODES[mode]); setRunning(false); if (intervalRef.current) clearInterval(intervalRef.current) }

  return (
    <div>
      {xpToast && <div style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', background: '#2D2926', color: 'white', padding: '10px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600, zIndex: 200, whiteSpace: 'nowrap' }}>{xpToast}</div>}

      <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', marginBottom: 4 }}>Focus Timer</div>
      <div style={{ fontSize: 13, color: '#9B8F88', marginBottom: 20 }}>Each pomodoro = +40 XP · {pomodoros} done today 🍅</div>

      {/* Task input */}
      <input value={task} onChange={e => setTask(e.target.value)} placeholder="What are you focusing on?" style={{ width: '100%', border: '1.5px solid rgba(45,41,38,0.12)', borderRadius: 12, padding: '11px 14px', fontSize: 14, color: '#2D2926', background: '#FEFCFA', outline: 'none', marginBottom: 16, fontFamily: "'DM Sans', sans-serif", boxSizing: 'border-box' }} />

      {/* Mode buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {(Object.entries(MODES) as [keyof typeof MODES, number][]).map(([m, s]) => (
          <button key={m} onClick={() => changeMode(m)} style={{ background: mode === m ? '#B8A4E8' : '#FEFCFA', color: mode === m ? 'white' : '#6B5F58', border: `1.5px solid ${mode === m ? '#B8A4E8' : 'rgba(45,41,38,0.12)'}`, borderRadius: 100, padding: '7px 16px', fontSize: 12, fontWeight: mode === m ? 600 : 400, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            {m === 'focus' ? '🍅 Focus 25m' : m === 'short' ? '☕ Break 5m' : m === 'long' ? '🌿 Long 15m' : '⚡ Micro 10m'}
          </button>
        ))}
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
            <div style={{ fontSize: 11, color: '#9B8F88', marginTop: 4, textTransform: 'uppercase', letterSpacing: '1px' }}>{running ? (mode === 'focus' ? 'focusing…' : 'resting…') : remaining === 0 ? 'done!' : 'ready'}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={reset} style={{ width: 52, height: 52, borderRadius: '50%', border: 'none', background: '#E8DEFF', color: '#2D2926', fontSize: 20, cursor: 'pointer' }}>↺</button>
          <button onClick={() => setRunning(!running)} style={{ width: 52, height: 52, borderRadius: '50%', border: 'none', background: '#B8A4E8', color: 'white', fontSize: 20, cursor: 'pointer' }}>
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
