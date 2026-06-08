'use client'
import { useState } from 'react'

const REWARDS = [
  { id: 'quick', icon: '⚡', title: 'Quick Hits', subtitle: '1–5 min', color: '#E8DEFF', borderColor: '#D4C5F9', items: [
    { icon: '🎵', text: 'Play your favourite song', time: '3 min' },
    { icon: '🕺', text: 'Dance like nobody watches', time: '2 min' },
    { icon: '🌬️', text: 'Box breathing (4-4-4-4)', time: '1 min' },
    { icon: '☀️', text: 'Step outside, feel the sun', time: '2 min' },
    { icon: '🍫', text: 'One piece of your favourite treat', time: '1 min' },
    { icon: '😂', text: 'Watch one funny video', time: '3 min' },
  ]},
  { id: 'medium', icon: '🌸', title: 'Medium Breaks', subtitle: '10–20 min', color: '#FFD6C4', borderColor: '#FFBFA8', items: [
    { icon: '🚶', text: 'Short walk outside', time: '15 min' },
    { icon: '☕', text: 'Make a cozy drink', time: '10 min' },
    { icon: '📱', text: 'Scroll freely without guilt', time: '10 min' },
    { icon: '🛁', text: 'Warm shower or wash face', time: '10 min' },
    { icon: '📞', text: 'Call someone you love', time: '15 min' },
  ]},
  { id: 'recharge', icon: '🌿', title: 'Deep Recharge', subtitle: '30+ min', color: '#D4E8D4', borderColor: '#B8D4B8', items: [
    { icon: '😴', text: 'Power nap (set an alarm!)', time: '20 min' },
    { icon: '📖', text: 'Read for pleasure', time: '30 min' },
    { icon: '🧘', text: 'Gentle yoga or stretching', time: '20 min' },
    { icon: '🌳', text: 'Nature walk', time: '30 min' },
  ]},
]

export default function DopaminePage() {
  const [open, setOpen] = useState<string | null>('quick')
  const [picked, setPicked] = useState<string | null>(null)
  const [random, setRandom] = useState<string | null>(null)

  function randomReward() {
    const all = REWARDS.flatMap(c => c.items)
    const pick = all[Math.floor(Math.random() * all.length)]
    setRandom(`${pick.icon} ${pick.text} — ${pick.time}`)
  }

  return (
    <div>
      <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', marginBottom: 4 }}>Dopamine Menu</div>
      <div style={{ fontSize: 13, color: '#9B8F88', marginBottom: 20 }}>When motivation disappears, pick a reward. You deserve it.</div>

      {/* Random button */}
      <button onClick={randomReward} style={{ width: '100%', background: '#FEFCFA', border: '1.5px solid rgba(45,41,38,0.12)', borderRadius: 14, padding: '14px', fontSize: 14, color: '#2D2926', cursor: 'pointer', marginBottom: random ? 0 : 20, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
        🎲 Surprise me with a reward
      </button>
      {random && (
        <div style={{ background: 'linear-gradient(135deg, #E8DEFF 0%, #FFD6C4 100%)', borderRadius: 14, padding: '16px', marginBottom: 20, textAlign: 'center', marginTop: 10 }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926' }}>{random}</div>
          <button onClick={() => setRandom(null)} style={{ marginTop: 10, background: 'none', border: 'none', fontSize: 12, color: '#9B8F88', cursor: 'pointer' }}>dismiss</button>
        </div>
      )}

      {/* Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {REWARDS.map(cat => (
          <div key={cat.id} style={{ background: cat.color, border: `1.5px solid ${cat.borderColor}`, borderRadius: 16, overflow: 'hidden' }}>
            <div onClick={() => setOpen(open === cat.id ? null : cat.id)} style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}>
              <span style={{ fontSize: 20 }}>{cat.icon}</span>
              <span style={{ fontWeight: 600, fontSize: 15, flex: 1, color: '#2D2926' }}>{cat.title}</span>
              <span style={{ background: 'rgba(255,255,255,0.5)', borderRadius: 100, padding: '3px 10px', fontSize: 11, color: '#6B5F58' }}>{cat.subtitle}</span>
              <span style={{ fontSize: 12, color: '#9B8F88', transition: 'transform 0.2s', display: 'inline-block', transform: open === cat.id ? 'rotate(180deg)' : 'none' }}>▼</span>
            </div>
            {open === cat.id && (
              <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {cat.items.map((item, i) => (
                  <div key={i} onClick={() => setPicked(picked === `${cat.id}-${i}` ? null : `${cat.id}-${i}`)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: picked === `${cat.id}-${i}` ? 'white' : 'rgba(255,255,255,0.6)', borderRadius: 10, cursor: 'pointer', border: `1.5px solid ${picked === `${cat.id}-${i}` ? 'rgba(184,164,232,0.5)' : 'transparent'}`, transition: 'all 0.15s' }}>
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    <span style={{ fontSize: 14, flex: 1, color: '#2D2926' }}>{item.text}</span>
                    <span style={{ fontSize: 11, color: '#9B8F88' }}>{item.time}</span>
                    {picked === `${cat.id}-${i}` && <span>⭐</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
