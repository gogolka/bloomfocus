import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'bloom focus — ADHD Toolkit & Planners'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FFF8F0',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background blobs */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,222,255,0.7) 0%, transparent 70%)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: -60,
          width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,214,196,0.6) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Logo */}
        <div style={{ fontSize: 56, marginBottom: 24, display: 'flex' }}>🧠</div>

        {/* Brand name */}
        <div style={{ fontSize: 32, color: '#9B8F88', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20, display: 'flex' }}>
          bloom focus
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 52, color: '#2D2926', textAlign: 'center',
          lineHeight: 1.25, maxWidth: 800, marginBottom: 28, display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        }}>
          ADHD Toolkit&nbsp;
          <span style={{ color: '#B8A4E8', fontStyle: 'italic' }}>&amp; Planners</span>
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: 22, color: '#6B5F58', textAlign: 'center',
          maxWidth: 640, lineHeight: 1.5, display: 'flex',
        }}>
          Planning tools designed for ADHD brains. Shame-free, gentle, and actually helpful.
        </div>

        {/* Bottom bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 6,
          background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8, #B8D4B8)',
          display: 'flex',
        }} />
      </div>
    ),
    { ...size }
  )
}
