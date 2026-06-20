'use client'
import { useEffect, useState, createContext, useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabaseBrowser as supabase } from '@/lib/supabaseBrowser'
import InstallButton from '@/components/InstallButton'
import { useAppLang } from '@/lib/useAppLang'
import { APP_LANG_LABEL, APP_LANGS, AppLang } from '@/lib/app-i18n'

// Context so any child can access translations without prop drilling
export const AppLangContext = createContext<ReturnType<typeof useAppLang> | null>(null)
export function useAppTranslations() {
  const ctx = useContext(AppLangContext)
  if (!ctx) throw new Error('useAppTranslations must be used within AppLayout')
  return ctx
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [langOpen, setLangOpen] = useState(false)
  const pathname = usePathname()
  const appLang = useAppLang()
  const { lang, setLang, tr } = appLang

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
          <div style={{ fontSize: 14, color: '#9B8F88' }}>{tr.loading}</div>
        </div>
      </div>
    )
  }

  if (!user) return <AuthScreen tr={tr} />

  const navItems = [
    { href: '/app', label: tr.home, emoji: '🏠' },
    { href: '/app/tasks', label: tr.tasks, emoji: '✅' },
    { href: '/app/habits', label: tr.habits, emoji: '🌱' },
    { href: '/app/timer', label: tr.timer, emoji: '🍅' },
    { href: '/app/dump', label: tr.dump, emoji: '🧠' },
    { href: '/app/dopamine', label: tr.rewards, emoji: '🍬' },
  ]

  return (
    <AppLangContext.Provider value={appLang}>
      <div style={{ background: 'var(--cream)', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", overflowX: 'hidden', width: '100%', maxWidth: '100%', position: 'relative' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .bf-desktop-nav { display: none; }
          .bf-bottom-nav { display: flex; }
          .bf-back-to-site { display: none; }
          @media (min-width: 768px) {
            .bf-desktop-nav { display: flex; }
            .bf-bottom-nav { display: none; }
            .bf-back-to-site { display: inline-flex; }
            .bf-content { padding-bottom: 48px !important; }
          }
        `}} />

        {/* Top bar */}
        <div style={{ background: 'rgba(255,248,240,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(45,41,38,0.08)', padding: '0 20px', minHeight: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, position: 'sticky', top: 0, zIndex: 40 }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: '#2D2926', flexShrink: 0 }}>
            bloom <em style={{ color: '#B8A4E8' }}>focus</em>
            <span style={{ fontSize: 11, color: '#9B8F88', marginLeft: 8 }}>app</span>
          </div>

          {/* Desktop nav */}
          <div className="bf-desktop-nav" style={{ gap: 4, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            {navItems.map(item => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                  <div style={{ background: isActive ? '#E8DEFF' : 'transparent', borderRadius: 100, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}>
                    <span style={{ fontSize: 14, lineHeight: 1 }}>{item.emoji}</span>
                    <span style={{ fontSize: 13, color: isActive ? '#7B5FCC' : '#6B5F58', fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, position: 'relative' }}>
            <Link href="/" className="bf-back-to-site" style={{ textDecoration: 'none', alignItems: 'center', gap: 5, fontSize: 13, color: '#9B8F88', whiteSpace: 'nowrap' }}>
              {tr.backToSite}
            </Link>

            {/* Language switcher */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setLangOpen(v => !v)}
                style={{ background: 'none', border: '1px solid rgba(45,41,38,0.15)', borderRadius: 100, padding: '5px 10px', cursor: 'pointer', fontSize: 12, color: '#6B5F58', fontFamily: "'DM Sans', sans-serif" }}
              >
                {APP_LANG_LABEL[lang].split(' ')[0]} {langOpen ? '▲' : '▼'}
              </button>
              {langOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, background: 'white', borderRadius: 12, border: '1px solid rgba(45,41,38,0.1)', boxShadow: '0 8px 24px rgba(45,41,38,0.1)', overflow: 'hidden', zIndex: 200, minWidth: 140 }}>
                  {APP_LANGS.map(l => (
                    <button key={l} onClick={() => { setLang(l); setLangOpen(false) }}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '10px 14px', background: l === lang ? '#F5F0FF' : 'white', border: 'none', cursor: 'pointer', fontSize: 13, color: l === lang ? '#7B5FCC' : '#2D2926', fontWeight: l === lang ? 600 : 400, fontFamily: "'DM Sans', sans-serif" }}>
                      {APP_LANG_LABEL[l]}
                      {l === lang && <span style={{ marginLeft: 'auto' }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <InstallButton />
            <Link href="/app/settings" aria-label="Settings" style={{ textDecoration: 'none', fontSize: 18, lineHeight: 1, color: '#6B5F58' }}>⚙</Link>
          </div>
        </div>

        {/* Content */}
        <div className="bf-content" style={{ maxWidth: 600, margin: '0 auto', padding: '20px 16px 100px' }}>
          {children}
        </div>

        {/* Bottom nav (mobile) */}
        <div className="bf-bottom-nav" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, justifyContent: 'center', padding: '0 12px 16px', boxSizing: 'border-box', overflowX: 'hidden' }}>
          <div style={{ background: 'rgba(254,252,250,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 28, padding: '8px 6px', display: 'flex', gap: 2, boxShadow: '0 8px 32px rgba(45,41,38,0.1)', width: '100%', maxWidth: 440, boxSizing: 'border-box' }}>
            {navItems.map(item => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href} style={{ textDecoration: 'none', flex: '1 1 0', minWidth: 0 }}>
                  <div style={{ background: isActive ? '#E8DEFF' : 'transparent', borderRadius: 20, padding: '7px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, transition: 'all 0.2s', boxSizing: 'border-box' }}>
                    <span style={{ fontSize: 18, lineHeight: 1 }}>{item.emoji}</span>
                    <span style={{ fontSize: 9, color: isActive ? '#7B5FCC' : '#9B8F88', fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </AppLangContext.Provider>
  )
}

function AuthScreen({ tr }: { tr: any }) {
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
      else {
        try { fetch('/api/app-welcome', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) }).catch(() => {}) } catch {}
        setSuccess(tr.confirmAccount)
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 400, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌸</div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: '#2D2926', marginBottom: 4 }}>bloom <em style={{ color: '#B8A4E8' }}>focus</em></div>
          <div style={{ fontSize: 13, color: '#9B8F88' }}>{tr.toolkit}</div>
        </div>
        <div style={{ background: '#FEFCFA', borderRadius: 20, padding: '32px 28px', border: '1px solid rgba(45,41,38,0.08)', boxShadow: '0 4px 24px rgba(45,41,38,0.06)' }}>
          <div style={{ display: 'flex', background: '#FFF8F0', borderRadius: 12, padding: 4, marginBottom: 24 }}>
            {(['login', 'signup'] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); setSuccess('') }} style={{ flex: 1, background: mode === m ? '#B8A4E8' : 'transparent', color: mode === m ? 'white' : '#9B8F88', border: 'none', borderRadius: 10, padding: '8px', fontSize: 13, fontWeight: mode === m ? 600 : 400, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s' }}>
                {m === 'login' ? tr.signIn : tr.signUp}
              </button>
            ))}
          </div>
          {success ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📧</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: '#2D2926', marginBottom: 8 }}>{tr.checkEmail}</div>
              <div style={{ fontSize: 13, color: '#9B8F88', lineHeight: 1.6 }}>{success}</div>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#6B5F58', fontWeight: 500, marginBottom: 6 }}>{tr.email}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="hello@example.com"
                  style={{ width: '100%', border: '1.5px solid rgba(45,41,38,0.12)', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#2D2926', background: '#FFF8F0', outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#6B5F58', fontWeight: 500, marginBottom: 6 }}>{tr.password}</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  onKeyDown={e => e.key === 'Enter' && handleAuth()}
                  style={{ width: '100%', border: '1.5px solid rgba(45,41,38,0.12)', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#2D2926', background: '#FFF8F0', outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
              </div>
              {error && <div style={{ fontSize: 12, color: '#c0627a', marginBottom: 14, background: '#FFE8E8', borderRadius: 8, padding: '8px 12px' }}>{error}</div>}
              <button onClick={handleAuth} disabled={loading}
                style={{ width: '100%', background: loading ? '#D4C5F9' : '#B8A4E8', color: 'white', border: 'none', borderRadius: 100, padding: '13px', fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                {loading ? '...' : mode === 'login' ? `${tr.signIn} →` : `${tr.signUp} →`}
              </button>
            </>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link href="/" style={{ textDecoration: 'none', fontSize: 13, color: '#9B8F88' }}>{tr.backToSite}</Link>
        </div>
      </div>
    </div>
  )
}
