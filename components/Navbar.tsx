'use client'
import { useState } from 'react'
import Link from 'next/link'
import DownloadAppButton from '@/components/DownloadAppButton'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/app', label: 'App' },
    { href: '/quiz', label: 'ADHD Test' },
    { href: '/shop', label: 'Shop' },
    { href: '/blog', label: 'Blog' },
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
        <Link href="/" style={{ textDecoration: 'none' }}>
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
          <DownloadAppButton />
          <Link href="/shop" style={{
            textDecoration: 'none', background: '#B8A4E8', color: 'white',
            padding: '9px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600,
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#a08fd6'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#B8A4E8'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Shop now ✨
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
          <div onClick={() => setOpen(false)}>
            <DownloadAppButton variant="block" />
          </div>
          <Link href="/shop" onClick={() => setOpen(false)} style={{
            textDecoration: 'none', background: '#B8A4E8', color: 'white',
            padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, textAlign: 'center',
          }}>
            Shop now ✨
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
