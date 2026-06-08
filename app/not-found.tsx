import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: 400 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 80, color: '#D4C5F9', lineHeight: 1, marginBottom: 16 }}>404</div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: '#2D2926', marginBottom: 12 }}>Page not found</h1>
        <p style={{ fontSize: 14, color: '#6B5F58', lineHeight: 1.6, marginBottom: 28 }}>
          This page doesn't exist — but that's okay. One small step back is all it takes.
        </p>
        <Link href="/" style={{
          textDecoration: 'none', background: '#B8A4E8', color: 'white',
          padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, display: 'inline-block',
        }}>
          Back to home 🌸
        </Link>
      </div>
    </div>
  )
}
