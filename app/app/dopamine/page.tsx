'use client'
import { useState, useEffect } from 'react'
import { supabaseBrowser as supabase } from '@/lib/supabaseBrowser'
import { useCountdown, ensureNotificationPermission, notify, parseMinutes } from '@/lib/timer'

const BREAK_STORE_KEY = 'bloom-break-timer'

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

const EMOJI_CHOICES = ['⭐', '🎵', '🍫', '☕', '🎮', '📚', '🛁', '🌳', '🎨', '🧩', '🍿', '💆', '🎧', '🌷']

interface CustomReward {
  id: string
  category: string
  icon: string
  text: string
  time: string
}

export default function DopaminePage() {
  const [open, setOpen] = useState<string | null>('quick')
  const [picked, setPicked] = useState<string | null>(null)
  const [selected, setSelected] = useState<{ icon: string; text: string; time: string } | null>(null)
  const [toast, setToast] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const [custom, setCustom] = useState<CustomReward[]>([])

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 3500) }

  function onBreakComplete() {
    try { localStorage.removeItem(BREAK_STORE_KEY) } catch {}
    showToast('💛 Break over — welcome back, no rush.')
    notify('💛 Break over', 'Welcome back whenever you are ready.')
  }

  const breakTimer = useCountdown(onBreakComplete)

  // Restore a running break timer after reload / PWA reopen
  useEffect(() => {
    try {
      const raw = localStorage.getItem(BREAK_STORE_KEY)
      if (raw) {
        const saved = JSON.parse(raw)
        if (saved.end && saved.end > Date.now()) {
          setSelected({ icon: saved.icon || '💛', text: saved.text || 'Break', time: saved.time || '' })
          breakTimer.startAt(saved.end)
        } else { localStorage.removeItem(BREAK_STORE_KEY) }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function startBreak(item: { icon: string; text: string; time: string }) {
    const mins = parseMinutes(item.time)
    if (mins <= 0) return
    const end = Date.now() + mins * 60 * 1000
    try { localStorage.setItem(BREAK_STORE_KEY, JSON.stringify({ end, icon: item.icon, text: item.text, time: item.time })) } catch {}
    breakTimer.startAt(end)
    ensureNotificationPermission() // non-blocking: enables the completion notification
  }

  function stopBreak() {
    breakTimer.stop()
    try { localStorage.removeItem(BREAK_STORE_KEY) } catch {}
  }

  // Add-reward form state
  const [showForm, setShowForm] = useState(false)
  const [formIcon, setFormIcon] = useState('⭐')
  const [formText, setFormText] = useState('')
  const [formTime, setFormTime] = useState('')
  const [formCategory, setFormCategory] = useState('quick')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }: any) => {
      if (user) { setUserId(user.id); loadCustom(user.id) }
    })
  }, [])

  async function loadCustom(uid: string) {
    const { data } = await supabase.from('custom_rewards').select('*').eq('user_id', uid).order('created_at', { ascending: false })
    setCustom(data || [])
  }

  async function addReward() {
    if (!formText.trim() || !userId) return
    setSaving(true)
    const { data } = await supabase.from('custom_rewards').insert({
      user_id: userId,
      category: formCategory,
      icon: formIcon,
      text: formText.trim(),
      time: formTime.trim(),
    }).select().single()
    if (data) {
      setCustom(prev => [data, ...prev])
      setFormText(''); setFormTime(''); setFormIcon('⭐'); setShowForm(false)
      setOpen(formCategory)
    }
    setSaving(false)
  }

  async function deleteReward(id: string) {
    await supabase.from('custom_rewards').delete().eq('id', id)
    setCustom(prev => prev.filter(r => r.id !== id))
  }

  function randomReward() {
    const all = [
      ...REWARDS.flatMap(c => c.items),
      ...custom.map(c => ({ icon: c.icon, text: c.text, time: c.time })),
    ]
    const pick = all[Math.floor(Math.random() * all.length)]
    setPicked(null)
    setSelected({ icon: pick.icon, text: pick.text, time: pick.time })
  }

  return (
    <div>
      {toast && <div style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', background: '#2D2926', color: 'white', padding: '10px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600, zIndex: 200, maxWidth: 'calc(100vw - 32px)', textAlign: 'center' }}>{toast}</div>}

      <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', marginBottom: 4 }}>Dopamine Menu</div>
      <div style={{ fontSize: 13, color: '#9B8F88', marginBottom: 20 }}>When motivation disappears, pick a reward. You deserve it.</div>

      {/* Selected reward — confirmation + optional break timer */}
      {selected && (
        <div style={{ background: 'linear-gradient(135deg, #E8DEFF 0%, #FFD6C4 100%)', borderRadius: 16, padding: '18px', marginBottom: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>{selected.icon}</div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: '#2D2926', marginBottom: 4 }}>{selected.text}</div>
          {breakTimer.running ? (
            <>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 40, color: '#2D2926', letterSpacing: '-1px', margin: '8px 0' }}>
                {Math.floor(breakTimer.remaining / 60).toString().padStart(2, '0')}:{(breakTimer.remaining % 60).toString().padStart(2, '0')}
              </div>
              <div style={{ fontSize: 12, color: '#6B5F58', marginBottom: 12 }}>Enjoy it — guilt-free. We'll let you know when it's over.</div>
              <button onClick={stopBreak} style={{ background: 'rgba(255,255,255,0.7)', border: 'none', borderRadius: 100, padding: '8px 20px', fontSize: 13, fontWeight: 600, color: '#2D2926', cursor: 'pointer' }}>Stop break</button>
            </>
          ) : (
            <>
              <div style={{ fontSize: 13, color: '#6B5F58', lineHeight: 1.5, marginBottom: 14 }}>
                This is your reward — enjoy it fully, with zero guilt. 💛
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                {parseMinutes(selected.time) > 0 && (
                  <button onClick={() => startBreak(selected)} style={{ background: '#B8A4E8', color: 'white', border: 'none', borderRadius: 100, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    Start {parseMinutes(selected.time)}-min timer ⏱
                  </button>
                )}
                <button onClick={() => { setSelected(null); setPicked(null) }} style={{ background: 'rgba(255,255,255,0.7)', border: 'none', borderRadius: 100, padding: '10px 20px', fontSize: 14, fontWeight: 600, color: '#2D2926', cursor: 'pointer' }}>
                  Just enjoy it
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Random button */}
      <button onClick={randomReward} style={{ width: '100%', background: '#FEFCFA', border: '1.5px solid rgba(45,41,38,0.12)', borderRadius: 14, padding: '14px', fontSize: 14, color: '#2D2926', cursor: 'pointer', marginBottom: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
        🎲 Surprise me with a reward
      </button>

      {/* Add custom reward button */}
      <button onClick={() => setShowForm(!showForm)} style={{ width: '100%', background: showForm ? '#E8DEFF' : '#FEFCFA', border: '1.5px solid rgba(184,164,232,0.4)', borderRadius: 14, padding: '14px', fontSize: 14, color: '#2D2926', cursor: 'pointer', marginBottom: showForm ? 0 : 20, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
        {showForm ? '✕ Close' : '➕ Add your own reward'}
      </button>

      {showForm && (
        <div style={{ background: '#FEFCFA', border: '1.5px solid rgba(184,164,232,0.4)', borderRadius: 14, padding: '18px', marginTop: 10, marginBottom: 20 }}>
          {/* Emoji picker */}
          <div style={{ fontSize: 12, color: '#6B5F58', fontWeight: 500, marginBottom: 8 }}>Pick an icon</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {EMOJI_CHOICES.map(e => (
              <button key={e} onClick={() => setFormIcon(e)} style={{ fontSize: 20, padding: '6px 8px', borderRadius: 8, border: `1.5px solid ${formIcon === e ? 'rgba(184,164,232,0.8)' : 'transparent'}`, background: formIcon === e ? '#E8DEFF' : 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>{e}</button>
            ))}
          </div>

          {/* Text */}
          <div style={{ fontSize: 12, color: '#6B5F58', fontWeight: 500, marginBottom: 6 }}>Reward</div>
          <input value={formText} onChange={e => setFormText(e.target.value)} placeholder="e.g. Watch an episode of my show"
            onKeyDown={e => e.key === 'Enter' && addReward()}
            style={{ width: '100%', border: '1.5px solid rgba(45,41,38,0.12)', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#2D2926', background: '#FFF8F0', outline: 'none', fontFamily: "'DM Sans', sans-serif", marginBottom: 14 }} />

          {/* Time */}
          <div style={{ fontSize: 12, color: '#6B5F58', fontWeight: 500, marginBottom: 6 }}>Time (optional)</div>
          <input value={formTime} onChange={e => setFormTime(e.target.value)} placeholder="e.g. 20 min"
            style={{ width: '100%', border: '1.5px solid rgba(45,41,38,0.12)', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#2D2926', background: '#FFF8F0', outline: 'none', fontFamily: "'DM Sans', sans-serif", marginBottom: 14 }} />

          {/* Category */}
          <div style={{ fontSize: 12, color: '#6B5F58', fontWeight: 500, marginBottom: 8 }}>Category</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {REWARDS.map(cat => (
              <button key={cat.id} onClick={() => setFormCategory(cat.id)} style={{ flex: 1, padding: '8px', borderRadius: 10, border: `1.5px solid ${formCategory === cat.id ? cat.borderColor : 'transparent'}`, background: formCategory === cat.id ? cat.color : 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 12, color: '#2D2926', fontWeight: 500 }}>
                {cat.icon} {cat.title.split(' ')[0]}
              </button>
            ))}
          </div>

          <button onClick={addReward} disabled={saving || !formText.trim()} style={{ width: '100%', background: saving || !formText.trim() ? '#D4C5F9' : '#B8A4E8', color: 'white', border: 'none', borderRadius: 100, padding: '13px', fontSize: 14, fontWeight: 600, cursor: saving || !formText.trim() ? 'not-allowed' : 'pointer' }}>
            {saving ? 'Saving...' : 'Save reward'}
          </button>
        </div>
      )}

      {/* Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {REWARDS.map(cat => {
          const customForCat = custom.filter(c => c.category === cat.id)
          return (
            <div key={cat.id} style={{ background: cat.color, border: `1.5px solid ${cat.borderColor}`, borderRadius: 16, overflow: 'hidden' }}>
              <div onClick={() => setOpen(open === cat.id ? null : cat.id)} style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}>
                <span style={{ fontSize: 20 }}>{cat.icon}</span>
                <span style={{ fontWeight: 600, fontSize: 15, flex: 1, color: '#2D2926' }}>{cat.title}</span>
                <span style={{ background: 'rgba(255,255,255,0.5)', borderRadius: 100, padding: '3px 10px', fontSize: 11, color: '#6B5F58' }}>{cat.subtitle}</span>
                <span style={{ fontSize: 12, color: '#9B8F88', transition: 'transform 0.2s', display: 'inline-block', transform: open === cat.id ? 'rotate(180deg)' : 'none' }}>▼</span>
              </div>
              {open === cat.id && (
                <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {cat.items.map((item, i) => {
                    const key = `${cat.id}-${i}`
                    return (
                    <div key={i} onClick={() => { if (picked === key) { setPicked(null); setSelected(null) } else { setPicked(key); setSelected({ icon: item.icon, text: item.text, time: item.time }) } }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: picked === key ? 'white' : 'rgba(255,255,255,0.6)', borderRadius: 10, cursor: 'pointer', border: `1.5px solid ${picked === key ? 'rgba(184,164,232,0.5)' : 'transparent'}`, transition: 'all 0.15s' }}>
                      <span style={{ fontSize: 18 }}>{item.icon}</span>
                      <span style={{ fontSize: 14, flex: 1, color: '#2D2926' }}>{item.text}</span>
                      <span style={{ fontSize: 11, color: '#9B8F88' }}>{item.time}</span>
                      {picked === key && <span>⭐</span>}
                    </div>
                    )
                  })}
                  {/* Custom rewards for this category */}
                  {customForCat.map(item => {
                    const key = `custom-${item.id}`
                    return (
                    <div key={item.id} onClick={() => { if (picked === key) { setPicked(null); setSelected(null) } else { setPicked(key); setSelected({ icon: item.icon, text: item.text, time: item.time }) } }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: picked === key ? 'white' : 'rgba(255,255,255,0.6)', borderRadius: 10, cursor: 'pointer', border: `1.5px dashed ${picked === key ? 'rgba(184,164,232,0.8)' : 'rgba(184,164,232,0.5)'}` }}>
                      <span style={{ fontSize: 18 }}>{item.icon}</span>
                      <span style={{ fontSize: 14, flex: 1, color: '#2D2926' }}>{item.text}</span>
                      {item.time && <span style={{ fontSize: 11, color: '#9B8F88' }}>{item.time}</span>}
                      <button onClick={(e) => { e.stopPropagation(); deleteReward(item.id) }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#c0627a', padding: '2px 4px' }}>✕</button>
                    </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
