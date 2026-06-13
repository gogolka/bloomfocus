import Link from 'next/link'
import NewsletterSignup from '@/components/NewsletterSignup'
import { home, type Lang } from '@/lib/i18n'

const PRODUCT_META = [
  { emoji: '🍬', color: '#E8DEFF', borderColor: '#D4C5F9' },
  { emoji: '📋', color: '#FFD6C4', borderColor: '#FFBFA8' },
  { emoji: '🌱', color: '#D4E8D4', borderColor: '#B8D4B8' },
  { emoji: '🧠', color: '#D4EEFF', borderColor: '#D4EEFF' },
]
const STEP_META = [
  { num: '01', color: '#E8DEFF' },
  { num: '02', color: '#FFD6C4' },
  { num: '03', color: '#D4E8D4' },
]
const PAIN_EMOJI = ['🌀', '📋', '⏰', '🧠', '😶', '💔']
const CHIP_COLORS = ['#E8DEFF', '#FFD6C4', '#D4E8D4', '#D4EEFF']
const CHIP_BORDERS = ['#D4C5F9', '#FFBFA8', '#B8D4B8', '#D4EEFF']
const FEATURE_EMOJI = ['🌱', '🔥', '✅', '🧠', '🍅']
const ACTION_META = [
  { emoji: '✅', xp: '+50 XP' },
  { emoji: '🌱', xp: '+30 XP' },
  { emoji: '🍅', xp: '+40 XP' },
]
// Blog previews link to the English articles for now (blog is translated later).
const blogPreviews = [
  { slug: 'why-adhd-brains-struggle-with-planning', title: 'Why ADHD Brains Struggle with Planning (And What Actually Helps)', date: 'June 2026', tag: 'Understanding ADHD' },
  { slug: 'dopamine-menu-guide', title: 'What Is a Dopamine Menu and How to Make One That Works', date: 'June 2026', tag: 'Tools & Tips' },
  { slug: 'time-blindness-adhd', title: 'Time Blindness: Why You Can\'t Feel Time Passing', date: 'June 2026', tag: 'Understanding ADHD' },
]

export default function HomeContent({ lang }: { lang: Lang }) {
  const t = home[lang]

  return (
    <div style={{ background: 'var(--cream)' }}>

      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 100px', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,222,255,0.7) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,214,196,0.5) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 100, left: '15%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,232,212,0.4) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#D4C5F9', border: '1.5px solid #B8A4E8', borderRadius: 100, padding: '5px 16px', fontSize: 11, letterSpacing: '0.18em', color: '#7B5FCC', fontWeight: 700, textTransform: 'uppercase', marginBottom: 28 }}>
            {t.badge}
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(36px, 6vw, 64px)', color: '#2D2926', lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: 20 }}>
            {t.heroPre}<em style={{ color: '#B8A4E8' }}>{t.heroEm}</em>
          </h1>
          <p style={{ fontSize: 17, color: '#6B5F58', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 36px' }}>
            {t.heroSub}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/shop" className="btn-primary" style={{ textDecoration: 'none', background: '#B8A4E8', color: 'white', padding: '14px 28px', borderRadius: 100, fontSize: 15, fontWeight: 600, boxShadow: '0 4px 20px rgba(184,164,232,0.35)', display: 'inline-block' }}>
              {t.ctaShop}
            </Link>
            <Link href="/blog" className="btn-outline" style={{ textDecoration: 'none', background: 'transparent', color: '#6B5F58', padding: '14px 28px', borderRadius: 100, fontSize: 15, fontWeight: 500, border: '1.5px solid rgba(45,41,38,0.12)', display: 'inline-block' }}>
              {t.ctaBlog}
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
            {t.chips.map((chip, i) => (
              <div key={i} style={{ background: CHIP_COLORS[i], border: `1.5px solid ${CHIP_BORDERS[i]}`, borderRadius: 100, padding: '5px 14px', fontSize: 12, color: '#2D2926' }}>{chip}</div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8, #B8D4B8)' }} />
      </section>

      {/* PAIN */}
      <section style={{ padding: '80px 24px', background: '#FEFCFA' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B8F88', marginBottom: 12 }}>{t.painEyebrow}</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 4vw, 38px)', color: '#2D2926', lineHeight: 1.2 }}>
              {t.painPre}<em style={{ color: '#B8A4E8' }}>{t.painEm}</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
            {t.pains.map((pain, i) => (
              <div key={i} style={{ background: '#FFF8F0', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 16, padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: 14, boxShadow: '0 2px 12px rgba(45,41,38,0.04)' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{PAIN_EMOJI[i]}</span>
                <p style={{ fontSize: 14, color: '#6B5F58', lineHeight: 1.6 }}>{pain}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: '#2D2926', fontStyle: 'italic', lineHeight: 1.6 }}>
              {t.painQuote}
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B8F88', marginBottom: 12 }}>{t.productsEyebrow}</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 4vw, 38px)', color: '#2D2926' }}>
              {t.productsPre}<em style={{ color: '#B8A4E8' }}>{t.productsEm}</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {t.products.map((p, i) => (
              <div key={i} className="hover-card" style={{ background: PRODUCT_META[i].color, border: `1.5px solid ${PRODUCT_META[i].borderColor}`, borderRadius: 20, padding: '28px 24px' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{PRODUCT_META[i].emoji}</div>
                <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: 100, padding: '3px 12px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B5F58', display: 'inline-block', marginBottom: 12 }}>{p.tag}</div>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: '#6B5F58', lineHeight: 1.6, marginBottom: 20 }}>{p.desc}</p>
                <Link href="/shop" style={{ textDecoration: 'none', background: '#2D2926', color: 'white', padding: '10px 20px', borderRadius: 100, fontSize: 12, fontWeight: 600, display: 'inline-block' }}>{t.viewProduct}</Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/shop" className="btn-outline" style={{ textDecoration: 'none', background: 'transparent', color: '#2D2926', padding: '13px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, border: '1.5px solid rgba(45,41,38,0.2)', display: 'inline-block' }}>
              {t.seeAll}
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 24px', background: '#FEFCFA' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B8F88', marginBottom: 12 }}>{t.howEyebrow}</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 4vw, 38px)', color: '#2D2926' }}>
              {t.howPre}<em style={{ color: '#B8A4E8' }}>{t.howEm}</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {t.steps.map((s, i) => (
              <div key={i} style={{ background: STEP_META[i].color, borderRadius: 20, padding: '28px 24px' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 40, color: 'rgba(45,41,38,0.15)', marginBottom: 16 }}>{STEP_META[i].num}</div>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#6B5F58', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP SECTION */}
      <section style={{ padding: '80px 24px', background: '#2D2926', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,164,232,0.15) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,191,168,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B8F88', marginBottom: 12 }}>{t.appEyebrow}</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 4vw, 38px)', color: '#FAFAF8', lineHeight: 1.2, marginBottom: 16 }}>
                {t.appPre}<em style={{ color: '#B8A4E8' }}>{t.appEm}</em>
              </h2>
              <p style={{ fontSize: 15, color: '#9B8F88', lineHeight: 1.7, marginBottom: 32 }}>
                {t.appSub}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {t.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 18 }}>{FEATURE_EMOJI[i]}</span>
                    <span style={{ fontSize: 14, color: '#FEFCFA' }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/app" style={{ textDecoration: 'none', background: '#B8A4E8', color: 'white', padding: '14px 28px', borderRadius: 100, fontSize: 15, fontWeight: 600, display: 'inline-block', boxShadow: '0 4px 20px rgba(184,164,232,0.35)' }}>
                {t.tryApp}
              </Link>
            </div>

            {/* App preview card */}
            <div style={{ background: '#1A1814', borderRadius: 24, padding: '24px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ background: 'linear-gradient(135deg, rgba(232,222,255,0.15) 0%, rgba(255,214,196,0.1) 100%)', borderRadius: 16, padding: '20px', marginBottom: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 56, marginBottom: 8 }}>🌸</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: '#FAFAF8', marginBottom: 4 }}>{t.plantName}</div>
                <div style={{ fontSize: 11, color: '#9B8F88', marginBottom: 10 }}>{t.plantStage}</div>
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 100, height: 5, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '78%', background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8)', borderRadius: 100 }} />
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '12px 14px', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: '#FAFAF8', fontFamily: 'Georgia, serif' }}>{t.level}</span>
                  <span style={{ fontSize: 11, color: '#9B8F88' }}>{t.streak}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 100, height: 6, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '65%', background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8)', borderRadius: 100 }} />
                </div>
              </div>

              {t.actions.map((label, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <span style={{ fontSize: 16 }}>{ACTION_META[i].emoji}</span>
                  <span style={{ fontSize: 12, color: '#FAFAF8', flex: 1 }}>{label}</span>
                  <span style={{ fontSize: 11, color: '#B8A4E8' }}>{ACTION_META[i].xp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B8F88', marginBottom: 8 }}>{t.blogEyebrow}</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3vw, 32px)', color: '#2D2926' }}>
                {t.blogPre}<em style={{ color: '#B8A4E8' }}>{t.blogEm}</em>
              </h2>
            </div>
            <Link href="/blog" style={{ textDecoration: 'none', fontSize: 13, color: '#6B5F58', fontWeight: 500 }}>{t.allArticles}</Link>
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

      {/* NEWSLETTER */}
      <section style={{ padding: '20px 24px 72px', background: '#FFF8F0' }}>
        <NewsletterSignup lang={lang} />
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: '80px 24px', background: '#2D2926', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,164,232,0.2) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,191,168,0.15) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 42px)', color: '#FEFCFA', lineHeight: 1.2, marginBottom: 16 }}>
            {t.ctaPre}<em style={{ color: '#B8A4E8' }}>{t.ctaEm}</em>
          </h2>
          <p style={{ fontSize: 15, color: '#9B8F88', lineHeight: 1.7, marginBottom: 36 }}>
            {t.ctaSub}
          </p>
          <Link href="/shop" className="btn-primary" style={{ textDecoration: 'none', background: '#B8A4E8', color: 'white', padding: '15px 32px', borderRadius: 100, fontSize: 15, fontWeight: 600, display: 'inline-block', boxShadow: '0 4px 24px rgba(184,164,232,0.4)' }}>
            {t.ctaButton}
          </Link>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8, #B8D4B8)' }} />
      </section>
    </div>
  )
}
