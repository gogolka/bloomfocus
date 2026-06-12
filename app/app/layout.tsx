'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabaseBrowser as supabase } from '@/lib/supabaseBrowser'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🌸</div>
          <div style={{ fontSize: 14, color: '#9B8F88' }}>Loading...</div>
        </div>
      </div>
    )
  }

  if (!user) return <AuthScreen />

  const navItems = [
    { href: '/app', label: 'Home', emoji: '🏠' },
    { href: '/app/tasks', label: 'Tasks', emoji: '✅' },
    { href: '/app/habits', label: 'Habits', emoji: '🌱' },
    { href: '/app/timer', label: 'Timer', emoji: '🍅' },
    { href: '/app/dump', label: 'Dump', emoji: '🧠' },
    { href: '/app/dopamine', label: 'Rewards', emoji: '🍬' },
  ]

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top bar */}
      <div style={{ background: 'rgba(255,248,240,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(45,41,38,0.08)', padding: '0 20px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 64, zIndex: 40 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: '#2D2926' }}>
          bloom <em style={{ color: '#B8A4E8' }}>focus</em>
          <span style={{ fontSize: 11, color: '#9B8F88', marginLeft: 8 }}>app</span>
        </div>
        <button
          onClick={() => supabase.auth.signOut()}
          style={{ background: 'none', border: 'none', fontSize: 12, color: '#9B8F88', cursor: 'pointer' }}
        >
          Sign out
        </button>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px 16px 100px' }}>
        {children}
      </div>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', padding: '0 16px 16px' }}>
        <div style={{ background: 'rgba(254,252,250,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 28, padding: '8px 6px', display: 'flex', gap: 2, boxShadow: '0 8px 32px rgba(45,41,38,0.1)' }}>
          {navItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: isActive ? '#E8DEFF' : 'transparent',
                  borderRadius: 20, padding: '7px 11px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                  minWidth: 52, transition: 'all 0.2s',
                }}>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>{item.emoji}</span>
                  <span style={{ fontSize: 9, color: isActive ? '#7B5FCC' : '#9B8F88', fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function AuthScreen() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleAuth = async () => {
    if (!email || !password) { setError('Please fill in all fields'); return }
    setLoading(true); setError('')

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setSuccess('Check your email to confirm your account!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 400, width: '100%' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌸</div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: '#2D2926', marginBottom: 4 }}>
            bloom <em style={{ color: '#B8A4E8' }}>focus</em>
          </div>
          <div style={{ fontSize: 13, color: '#9B8F88' }}>Your ADHD toolkit</div>
        </div>

        {/* Card */}
        <div style={{ background: '#FEFCFA', borderRadius: 20, padding: '32px 28px', border: '1px solid rgba(45,41,38,0.08)', boxShadow: '0 4px 24px rgba(45,41,38,0.06)' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', background: '#FFF8F0', borderRadius: 12, padding: 4, marginBottom: 24 }}>
            {(['login', 'signup'] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); setSuccess('') }} style={{
                flex: 1, background: mode === m ? '#B8A4E8' : 'transparent',
                color: mode === m ? 'white' : '#9B8F88',
                border: 'none', borderRadius: 10, padding: '8px', fontSize: 13,
                fontWeight: mode === m ? 600 : 400, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.2s',
              }}>
                {m === 'login' ? 'Sign in' : 'Sign up'}
              </button>
            ))}
          </div>

          {success ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📧</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: '#2D2926', marginBottom: 8 }}>Check your email</div>
              <div style={{ fontSize: 13, color: '#9B8F88', lineHeight: 1.6 }}>{success}</div>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#6B5F58', fontWeight: 500, marginBottom: 6 }}>Email</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="hello@example.com"
                  style={{ width: '100%', border: '1.5px solid rgba(45,41,38,0.12)', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#2D2926', background: '#FFF8F0', outline: 'none', fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#6B5F58', fontWeight: 500, marginBottom: 6 }}>Password</label>
                <input
                  type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  onKeyDown={e => e.key === 'Enter' && handleAuth()}
                  style={{ width: '100%', border: '1.5px solid rgba(45,41,38,0.12)', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#2D2926', background: '#FFF8F0', outline: 'none', fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>
              {error && <div style={{ fontSize: 12, color: '#c0627a', marginBottom: 14, background: '#FFE8E8', borderRadius: 8, padding: '8px 12px' }}>{error}</div>}
              <button
                onClick={handleAuth} disabled={loading}
                style={{ width: '100%', background: loading ? '#D4C5F9' : '#B8A4E8', color: 'white', border: 'none', borderRadius: 100, padding: '13px', fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif" }}
              >
                {loading ? '...' : mode === 'login' ? 'Sign in →' : 'Create account →'}
              </button>
            </>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link href="/" style={{ textDecoration: 'none', fontSize: 13, color: '#9B8F88' }}>← Back to site</Link>
        </div>
      </div>
    </div>
  )
}
