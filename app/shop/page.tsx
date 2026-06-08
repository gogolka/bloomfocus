import type { Metadata } from 'next'
import BuyButton from '@/components/BuyButton'

export const metadata: Metadata = {
  title: 'Shop — ADHD Planners & Toolkits',
  description: 'Browse all bloom focus products — printable planners, habit trackers, dopamine menus, and more. Designed for ADHD brains.',
  alternates: { canonical: 'https://bloomfocus.org/shop' },
}

const products = [
  { slug: 'dopamine-menu', title: 'Dopamine Menu PDF', desc: 'A printable reward menu designed for ADHD brains. Pick a treat, no guilt, no shame. Available in A4 and US Letter.', priceUsd: '$4.99', tag: 'Instant download', color: '#E8DEFF', borderColor: '#D4C5F9', emoji: '🍬' },
  { slug: 'daily-planner', title: 'ADHD Daily Planner', desc: 'Energy-based time blocks. Brain dump section. Daily wins tracker. Undated so you can start any day.', priceUsd: '$5.99', tag: 'Printable · PDF', color: '#FFD6C4', borderColor: '#FFBFA8', emoji: '📋' },
  { slug: 'habit-tracker', title: 'Gentle Habit Tracker', desc: 'Track what actually matters — not everything. Built for brains that need flexibility, not rigidity.', priceUsd: '$3.99', tag: 'Undated · A4 & Letter', color: '#D4E8D4', borderColor: '#B8D4B8', emoji: '🌱' },
  { slug: 'brain-dump', title: 'Weekly Brain Dump', desc: 'Empty your head onto paper. No structure needed. Just write — and feel the relief.', priceUsd: '$3.99', tag: 'Instant download', color: '#D4EEFF', borderColor: '#D4EEFF', emoji: '🧠' },
]

export default function ShopPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <section style={{ padding: '64px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,222,255,0.6) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B8F88', marginBottom: 12 }}>bloom focus shop</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', color: '#2D2926', lineHeight: 1.2, marginBottom: 16 }}>
            Tools your ADHD brain <em style={{ color: '#B8A4E8' }}>actually wants to use</em>
          </h1>
          <p style={{ fontSize: 15, color: '#6B5F58', lineHeight: 1.7 }}>
            Every product is designed around real ADHD patterns — no shame, no overwhelm, just gentle structure.
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8, #B8D4B8)' }} />
      </section>

      <section style={{ padding: '48px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
          {products.map((p) => (
            <div key={p.slug} className="hover-card" style={{ background: p.color, border: `1.5px solid ${p.borderColor}`, borderRadius: 20, padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 44, marginBottom: 16 }}>{p.emoji}</div>
              <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: 100, padding: '3px 12px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B5F58', display: 'inline-block', marginBottom: 12, alignSelf: 'flex-start' }}>{p.tag}</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', marginBottom: 10 }}>{p.title}</h2>
              <p style={{ fontSize: 13, color: '#6B5F58', lineHeight: 1.6, flex: 1, marginBottom: 20 }}>{p.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926' }}>{p.priceUsd}</span>
                <BuyButton productSlug={p.slug} productTitle={p.title} priceUsd={p.priceUsd} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
