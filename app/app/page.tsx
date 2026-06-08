import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'bloom focus App — Coming Soon',
  description: 'The bloom focus ADHD toolkit app is coming soon. Task manager, brain dump, habit tracker and more — synced across all your devices.',
  robots: { index: false, follow: false },
}

export default function AppPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: 500 }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>🌸</div>
        <div style={{ background: '#D4C5F9', border: '1.5px solid #B8A4E8', borderRadius: 100, padding: '5px 16px', fontSize: 11, letterSpacing: '0.18em', color: '#7B5FCC', fontWeight: 700, textTransform: 'uppercase', display: 'inline-block', marginBottom: 24 }}>
          Coming soon
        </div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 36, color: '#2D2926', lineHeight: 1.2, marginBottom: 16 }}>
          The bloom focus <em style={{ color: '#B8A4E8' }}>app</em>
        </h1>
        <p style={{ fontSize: 15, color: '#6B5F58', lineHeight: 1.7, marginBottom: 32 }}>
          A full ADHD toolkit on your phone and laptop — synced, personal, and designed for your brain. Task manager, brain dump, habit tracker, dopamine menu, focus timer and more.
        </p>
        <div style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 16, padding: '20px 24px', marginBottom: 32, textAlign: 'left' }}>
          <div style={{ fontSize: 12, color: '#9B8F88', marginBottom: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>What's coming</div>
          {['Task decomposer with micro-steps', 'Brain dump → task transfer', 'Habit tracker with streaks', 'Dopamine menu (customizable)', 'Pomodoro & focus timer', 'Body doubling mode', 'Progress tracking across sessions'].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, fontSize: 14, color: '#2D2926' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#B8A4E8', flexShrink: 0 }} />
              {f}
            </div>
          ))}
        </div>
        <Link href="/shop" style={{
          textDecoration: 'none', background: '#B8A4E8', color: 'white',
          padding: '13px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, display: 'inline-block',
        }}>
          Browse the shop while you wait ✨
        </Link>
      </div>
    </div>
  )
}
