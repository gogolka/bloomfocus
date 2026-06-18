'use client'
import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import DownloadAppButton from '@/components/DownloadAppButton'
import { LOCALES, LANG_LABEL, LANG_PATH, chrome } from '@/lib/i18n'

const FLAG: Record<string, string> = { en: '🇬🇧', de: '🇩🇪', fr: '🇫🇷', es: '🇪🇸' }

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  if (pathname?.startsWith('/app')) return null

  const cur = pathname?.startsWith('/de') ? 'de' : pathname?.startsWith('/fr') ? 'fr' : pathname?.startsWith('/es') ? 'es' : 'en'
  const c = chrome[cur]
  const quizPath = cur === 'en' ? '/quiz' : `/${cur}/quiz`
  const shopPath = cur === 'en' ? '/shop' : `/${cur}/shop`
  const blogPath = cur === 'en' ? '/blog' : `/${cur}/blog`

  const links = [
    { href: '/app', label: c.navApp },
    { href: quizPath, label: c.navTest },
    { href: shopPath, label: c.navShop },
    { href: blogPath, label: c.navBlog },
  ]

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const LangDropdown = ({ mobile = false }: { mobile?: boolean }) => (
    <div ref={!mobile ? langRef : undefined} style={{ position: 'relative' }}>
      <button
        onClick={() => setLangOpen(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: '1px solid rgba(45,41,38,0.15)',
          borderRadius: 100, padding: '6px 12px', cursor: 'pointer',
          fontSize: 13, color: '#6B5F58', fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <span>{FLAG[cur]}</span>
        <span>{LANG_LABEL[cur]}</span>
        <span style={{ fontSize: 10, opacity: 0.6 }}>{langOpen ? '▲' : '▼'}</span>
      </button>

      {langOpen && (
        <div style={{
          position: mobile ? 'relative' : 'absolute',
          top: mobile ? 0 : 'calc(100% + 8px)',
          right: mobile ? 'auto' : 0,
          background: 'white',
          borderRadius: 14,
          border: '1px solid rgba(45,41,38,0.1)',
          boxShadow: '0 8px 24px rgba(45,41,38,0.1)',
          overflow: 'hidden',
          minWidth: 140,
          zIndex: 200,
          marginTop: mobile ? 8 : 0,
        }}>
          {LOCALES.map(l => (
            <Link
              key={l}
              href={LANG_PATH[l]}
              onClick={() => { setLangOpen(false); setOpen(false) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '11px 16px', textDecoration: 'none',
                fontSize: 14, color: l === cur ? '#7B5FCC' : '#2D2926',
                fontWeight: l === cur ? 600 : 400,
                background: l === cur ? '#F5F0FF' : 'transparent',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (l !== cur) e.currentTarget.style.background = '#FAFAFA' }}
              onMouseLeave={e => { if (l !== cur) e.currentTarget.style.background = 'transparent' }}
            >
              <span>{FLAG[l]}</span>
              <span>{LANG_LABEL[l]}</span>
              {l === cur && <span style={{ marginLeft: 'auto', fontSize: 12 }}>✓</span>}
            </Link>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255,248,240,0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(45,41,38,0.08)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <Link href={LANG_PATH[cur]} style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', letterSpacing: '-0.5px' }}>
            bloom <em style={{ color: '#B8A4E8' }}>focus</em>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="desktop-nav">
          {links.map(link => (
            <Link key={link.href} href={link.href} style={{
              textDecoration: 'none', fontSize: 14, color: '#6B5F58', fontWeight: 500,
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#2D2926')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6B5F58')}
            >
              {link.label}
            </Link>
          ))}
          <LangDropdown />
          <DownloadAppButton />
          <Link href={shopPath} style={{
            textDecoration: 'none', background: '#B8A4E8', color: 'white',
            padding: '9px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600,
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#a08fd6'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#B8A4E8'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {c.shopNow}
          </Link>
        </div>

        {/* Mobile burger */}
        <button className="mobile-menu-btn" onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#2D2926' }}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'var(--cream)', borderTop: '1px solid var(--border)', padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={{ textDecoration: 'none', fontSize: 16, color: '#2D2926', fontWeight: 500 }}>
              {link.label}
            </Link>
          ))}
          <DownloadAppButton variant="block" />
          <LangDropdown mobile />
          <Link href={shopPath} onClick={() => setOpen(false)} style={{
            textDecoration: 'none', background: '#B8A4E8', color: 'white',
            padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, textAlign: 'center',
          }}>
            {c.shopNow}
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .mobile-menu-btn { display: none !important; } }
        @media (max-width: 767px) { .desktop-nav { display: none !important; } }
      `}</style>
    </nav>
  )
}

