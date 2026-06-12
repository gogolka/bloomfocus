import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#2D2926', color: '#FEFCFA', padding: '48px 24px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, marginBottom: 12 }}>
              bloom <em style={{ color: '#B8A4E8' }}>focus</em>
            </div>
            <p style={{ fontSize: 13, color: '#9B8F88', lineHeight: 1.7, maxWidth: 240 }}>
              Planning tools designed for ADHD brains. Warm, gentle, and actually helpful.
            </p>
          </div>

          {/* Links */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9B8F88', marginBottom: 16 }}>Explore</div>
            {[
              { href: '/shop', label: 'Shop all products' },
              { href: '/blog', label: 'ADHD blog' },
            ].map(l => (
              <div key={l.href} style={{ marginBottom: 10 }}>
                <Link href={l.href} style={{ textDecoration: 'none', fontSize: 14, color: '#FEFCFA', opacity: 0.8 }}>{l.label}</Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9B8F88', marginBottom: 16 }}>Connect</div>
            <div style={{ fontSize: 14, color: '#FEFCFA', opacity: 0.8, marginBottom: 10 }}>hello.bloomfocus@gmail.com</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              {[
                { label: 'Etsy', href: 'https://bloomfocusshop.etsy.com' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 8, padding: '6px 14px', fontSize: 12, color: '#FEFCFA', textDecoration: 'none',
                }}>{s.label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: '#9B8F88' }}>© 2026 bloom focus. All rights reserved.</div>
          <div style={{ height: 3, width: 120, background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8, #B8D4B8)', borderRadius: 100 }} />
        </div>
      </div>
    </footer>
  )
}
