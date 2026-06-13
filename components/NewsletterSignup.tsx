'use client'
import { useState } from 'react'

export default function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  async function submit() {
    if (!email.trim() || status === 'loading') return
    setStatus('loading'); setMsg('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      const data = await res.json()
      if (!res.ok) { setStatus('error'); setMsg(data.error || 'Something went wrong'); return }
      setStatus('done'); setEmail(''); setName('')
    } catch {
      setStatus('error'); setMsg('Connection error — please try again')
    }
  }

  // ---- Compact variant (used in the dark footer) ----
  if (compact) {
    return (
      <div>
        <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9B8F88', marginBottom: 16 }}>Newsletter</div>
        {status === 'done' ? (
          <p style={{ fontSize: 14, color: '#FEFCFA', opacity: 0.85, lineHeight: 1.6, margin: 0 }}>You're in — check your inbox for a welcome note and your discount. 🌱</p>
        ) : (
          <>
            <p style={{ fontSize: 13, color: '#9B8F88', lineHeight: 1.7, marginBottom: 14, maxWidth: 260 }}>Gentle ADHD tools and the occasional new release. No spam, leave anytime.</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submit()}
                placeholder="you@email.com"
                style={{ flex: '1 1 160px', minWidth: 0, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#FEFCFA', outline: 'none', fontFamily: "'DM Sans', sans-serif" }}
              />
              <button onClick={submit} disabled={status === 'loading'} style={{ background: '#B8A4E8', color: 'white', border: 'none', borderRadius: 8, padding: '9px 16px', fontSize: 13, fontWeight: 600, cursor: status === 'loading' ? 'default' : 'pointer', whiteSpace: 'nowrap' }}>
                {status === 'loading' ? '…' : 'Subscribe'}
              </button>
            </div>
            {status === 'error' && <div style={{ fontSize: 12, color: '#FFBFA8', marginTop: 8 }}>{msg}</div>}
          </>
        )}
      </div>
    )
  }

  // ---- Full variant (used as a section on the marketing site) ----
  return (
    <section style={{ background: 'linear-gradient(150deg, #F3EEFF, #FFF3EC)', borderRadius: 28, padding: '44px 28px', textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
      <div style={{ fontSize: 36, marginBottom: 10 }}>💌</div>
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: '#2D2926', margin: '0 0 10px', lineHeight: 1.2 }}>Join the bloom focus letter</h2>
      {status === 'done' ? (
        <p style={{ fontSize: 16, color: '#6B5F58', lineHeight: 1.7, maxWidth: 460, margin: '0 auto' }}>You're in — we've sent a little welcome note and your 15% discount to your inbox. Thank you for being here. 🌱</p>
      ) : (
        <>
          <p style={{ fontSize: 15, color: '#6B5F58', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 24px' }}>
            Gentle, practical tools for working with an ADHD brain, plus new releases now and then. Subscribe and we'll send you 15% off your first order to say hello.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 460, margin: '0 auto' }}>
            <input
              type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="First name (optional)"
              style={{ flex: '1 1 140px', minWidth: 0, background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.12)', borderRadius: 100, padding: '13px 18px', fontSize: 14, color: '#2D2926', outline: 'none', fontFamily: "'DM Sans', sans-serif" }}
            />
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
              placeholder="you@email.com"
              style={{ flex: '1 1 180px', minWidth: 0, background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.12)', borderRadius: 100, padding: '13px 18px', fontSize: 14, color: '#2D2926', outline: 'none', fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
          <button onClick={submit} disabled={status === 'loading'} style={{ marginTop: 14, background: '#7B5FCC', color: 'white', border: 'none', borderRadius: 100, padding: '13px 32px', fontSize: 15, fontWeight: 600, cursor: status === 'loading' ? 'default' : 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
          {status === 'error' && <div style={{ fontSize: 13, color: '#C0627A', marginTop: 12 }}>{msg}</div>}
          <p style={{ fontSize: 12, color: '#9B8F88', marginTop: 16, marginBottom: 0 }}>No spam, ever. Leave whenever you like.</p>
        </>
      )}
    </section>
  )
}
