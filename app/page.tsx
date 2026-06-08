import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'bloom focus — ADHD Toolkit & Planners',
  description: 'Planning tools designed for ADHD brains. Printable planners, habit trackers, dopamine menus — shame-free, gentle, and actually helpful.',
  alternates: { canonical: 'https://bloomfocus.org' },
}

const pains = [
  { emoji: '🌀', text: 'You start 10 things and finish none of them' },
  { emoji: '📋', text: 'Todo lists make you feel worse, not better' },
  { emoji: '⏰', text: 'Time just... disappears, and you don\'t know where it went' },
  { emoji: '🧠', text: 'Your brain won\'t stop even when you desperately need to rest' },
  { emoji: '😶', text: 'You know what to do — you just can\'t make yourself start' },
  { emoji: '💔', text: 'You\'ve tried every system. None of them stuck.' },
]

const products = [
  { title: 'Dopamine Menu', desc: 'A reward system your ADHD brain will actually use. Pick a treat, no guilt.', tag: 'Instant download', color: '#E8DEFF', borderColor: '#D4C5F9', emoji: '🍬' },
  { title: 'ADHD Daily Planner', desc: 'Energy-based time blocks. Brain dump space. No shame, no pressure.', tag: 'Printable · PDF', color: '#FFD6C4', borderColor: '#FFBFA8', emoji: '📋' },
  { title: 'Habit Tracker', desc: 'Track what matters, not everything. Celebrate every single win.', tag: 'Undated · A4 & Letter', color: '#D4E8D4', borderColor: '#B8D4B8', emoji: '🌱' },
  { title: 'Weekly Brain Dump', desc: 'Empty your head onto paper. No judgment, no structure needed.', tag: 'Instant download', color: '#D4EEFF', borderColor: '#D4EEFF', emoji: '🧠' },
]

const steps = [
  { num: '01', title: 'Choose your tool', desc: 'Browse planners, trackers, and toolkits built for ADHD brains — not against them.', color: '#E8DEFF' },
  { num: '02', title: 'Download in minutes', desc: 'Instant PDF download. Print at home or use digitally. No waiting, no overwhelm.', color: '#FFD6C4' },
  { num: '03', title: 'Start with one small step', desc: 'That\'s it. One step. That\'s enough. Your brain will do the rest.', color: '#D4E8D4' },
]

const blogPreviews = [
  { slug: 'why-adhd-brains-struggle-with-planning', title: 'Why ADHD Brains Struggle with Planning (And What Actually Helps)', date: 'June 2026', tag: 'Understanding ADHD' },
  { slug: 'dopamine-menu-guide', title: 'What Is a Dopamine Menu and How to Make One That Works', date: 'June 2026', tag: 'Tools & Tips' },
  { slug: 'time-blindness-adhd', title: 'Time Blindness: Why You Can\'t Feel Time Passing', date: 'June 2026', tag: 'Understanding ADHD' },
]

export default function HomePage() {
  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 100px', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,222,255,0.7) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,214,196,0.5) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 100, left: '15%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,232,212,0.4) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#D4C5F9', border: '1.5px solid #B8A4E8', borderRadius: 100, padding: '5px 16px', fontSize: 11, letterSpacing: '0.18em', color: '#7B5FCC', fontWeight: 700, textTransform: 'uppercase', marginBottom: 28 }}>
            ADHD Toolkit · bloom focus
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(36px, 6vw, 64px)', color: '#2D2926', lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: 20 }}>
            Planning that works with<br />your brain,{' '}
            <em style={{ color: '#B8A4E8' }}>not against it.</em>
          </h1>
          <p style={{ fontSize: 17, color: '#6B5F58', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 36px' }}>
            Tools designed for neurodivergent brains — no shame, no pressure, no "just try harder." Finally, a planner your ADHD brain actually wants to use.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/shop" className="btn-primary" style={{ textDecoration: 'none', background: '#B8A4E8', color: 'white', padding: '14px 28px', borderRadius: 100, fontSize: 15, fontWeight: 600, boxShadow: '0 4px 20px rgba(184,164,232,0.35)', display: 'inline-block' }}>
              Shop the toolkit ✨
            </Link>
            <Link href="/blog" className="btn-outline" style={{ textDecoration: 'none', background: 'transparent', color: '#6B5F58', padding: '14px 28px', borderRadius: 100, fontSize: 15, fontWeight: 500, border: '1.5px solid rgba(45,41,38,0.12)', display: 'inline-block' }}>
              Read the blog
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
            {['Neurodivergent-first', 'No shame, no pressure', 'Instant download', 'Warm & structured'].map((t, i) => (
              <div key={i} style={{ background: ['#E8DEFF','#FFD6C4','#D4E8D4','#D4EEFF'][i], border: `1.5px solid ${['#D4C5F9','#FFBFA8','#B8D4B8','#D4EEFF'][i]}`, borderRadius: 100, padding: '5px 14px', fontSize: 12, color: '#2D2926' }}>{t}</div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8, #B8D4B8)' }} />
      </section>

      {/* PAIN */}
      <section style={{ padding: '80px 24px', background: '#FEFCFA' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B8F88', marginBottom: 12 }}>Sound familiar?</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 4vw, 38px)', color: '#2D2926', lineHeight: 1.2 }}>
              Your brain isn't broken.<br /><em style={{ color: '#B8A4E8' }}>It just needs a different system.</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
            {pains.map((pain, i) => (
              <div key={i} style={{ background: '#FFF8F0', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 16, padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: 14, boxShadow: '0 2px 12px rgba(45,41,38,0.04)' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{pain.emoji}</span>
                <p style={{ fontSize: 14, color: '#6B5F58', lineHeight: 1.6 }}>{pain.text}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: '#2D2926', fontStyle: 'italic', lineHeight: 1.6 }}>
              "We're the friend who also has ADHD — who gets it, doesn't judge,<br />and has actually found things that help."
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B8F88', marginBottom: 12 }}>The toolkit</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 4vw, 38px)', color: '#2D2926' }}>
              Tools your ADHD brain <em style={{ color: '#B8A4E8' }}>actually wants</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {products.map((p, i) => (
              <div key={i} className="hover-card" style={{ background: p.color, border: `1.5px solid ${p.borderColor}`, borderRadius: 20, padding: '28px 24px' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{p.emoji}</div>
                <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: 100, padding: '3px 12px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B5F58', display: 'inline-block', marginBottom: 12 }}>{p.tag}</div>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: '#6B5F58', lineHeight: 1.6, marginBottom: 20 }}>{p.desc}</p>
                <Link href="/shop" style={{ textDecoration: 'none', background: '#2D2926', color: 'white', padding: '10px 20px', borderRadius: 100, fontSize: 12, fontWeight: 600, display: 'inline-block' }}>View product →</Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/shop" className="btn-outline" style={{ textDecoration: 'none', background: 'transparent', color: '#2D2926', padding: '13px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, border: '1.5px solid rgba(45,41,38,0.2)', display: 'inline-block' }}>
              See all products →
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 24px', background: '#FEFCFA' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B8F88', marginBottom: 12 }}>How it works</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 4vw, 38px)', color: '#2D2926' }}>
              Three steps. <em style={{ color: '#B8A4E8' }}>That's all.</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ background: s.color, borderRadius: 20, padding: '28px 24px' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 40, color: 'rgba(45,41,38,0.15)', marginBottom: 16 }}>{s.num}</div>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#6B5F58', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B8F88', marginBottom: 8 }}>From the blog</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3vw, 32px)', color: '#2D2926' }}>
                Understanding your <em style={{ color: '#B8A4E8' }}>ADHD brain</em>
              </h2>
            </div>
            <Link href="/blog" style={{ textDecoration: 'none', fontSize: 13, color: '#6B5F58', fontWeight: 500 }}>All articles →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {blogPreviews.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div className="hover-card-sm" style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 20, padding: '28px 24px', height: '100%' }}>
                  <div style={{ background: '#E8DEFF', borderRadius: 100, padding: '3px 12px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7B5FCC', display: 'inline-block', marginBottom: 16 }}>{post.tag}</div>
                  <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 17, color: '#2D2926', lineHeight: 1.4, marginBottom: 12 }}>{post.title}</h3>
                  <div style={{ fontSize: 12, color: '#9B8F88' }}>{post.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: '80px 24px', background: '#2D2926', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,164,232,0.2) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,191,168,0.15) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 42px)', color: '#FEFCFA', lineHeight: 1.2, marginBottom: 16 }}>
            One small step.<br /><em style={{ color: '#B8A4E8' }}>That's enough.</em>
          </h2>
          <p style={{ fontSize: 15, color: '#9B8F88', lineHeight: 1.7, marginBottom: 36 }}>
            Your brain isn't broken. It just needs tools built for how it actually works.
          </p>
          <Link href="/shop" className="btn-primary" style={{ textDecoration: 'none', background: '#B8A4E8', color: 'white', padding: '15px 32px', borderRadius: 100, fontSize: 15, fontWeight: 600, display: 'inline-block', boxShadow: '0 4px 24px rgba(184,164,232,0.4)' }}>
            Start with bloom focus ✨
          </Link>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8, #B8D4B8)' }} />
      </section>
    </div>
  )
}
