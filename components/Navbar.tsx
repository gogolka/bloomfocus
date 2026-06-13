'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import DownloadAppButton from '@/components/DownloadAppButton'
import { LOCALES, LANG_LABEL, LANG_PATH, chrome } from '@/lib/i18n'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // The /app section is a standalone toolkit with its own header and nav —
  // the marketing chrome would just double up and cover the content.
  if (pathname?.startsWith('/app')) return null

  const cur = pathname?.startsWith('/de') ? 'de' : pathname?.startsWith('/fr') ? 'fr' : pathname?.startsWith('/es') ? 'es' : 'en'
  const c = chrome[cur]
  const quizPath = cur === 'en' ? '/quiz' : `/${cur}/quiz`

  const links = [
    { href: '/app', label: c.navApp },
    { href: quizPath, label: c.navTest },
    { href: '/shop', label: c.navShop },
    { href: '/blog', label: c.navBlog },
  ]

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
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', borderRight: '1px solid rgba(45,41,38,0.12)', paddingRight: 18, marginRight: -8 }}>
            {LOCALES.map(l => (
              <Link key={l} href={LANG_PATH[l]} style={{ textDecoration: 'none', fontSize: 12, fontWeight: cur === l ? 700 : 500, color: cur === l ? '#7B5FCC' : '#9B8F88', padding: '2px 5px', borderRadius: 6 }}>{LANG_LABEL[l]}</Link>
            ))}
          </div>
          <DownloadAppButton />
          <Link href="/shop" style={{
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
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingTop: 4 }}>
            {LOCALES.map(l => (
              <Link key={l} href={LANG_PATH[l]} onClick={() => setOpen(false)} style={{ textDecoration: 'none', fontSize: 14, fontWeight: cur === l ? 700 : 500, color: cur === l ? '#7B5FCC' : '#9B8F88', border: '1px solid rgba(45,41,38,0.12)', borderRadius: 8, padding: '6px 12px' }}>{LANG_LABEL[l]}</Link>
            ))}
          </div>
          <Link href="/shop" onClick={() => setOpen(false)} style={{
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
