import type { Metadata } from 'next'
import Link from 'next/link'
import { articles } from '@/lib/articles'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'ADHD Blog — Tips, Guides & Understanding Your Brain',
  description: 'Articles about ADHD, neurodivergence, productivity systems that actually work, and gentle approaches to planning and organization.',
  alternates: { canonical: 'https://bloomfocus.org/blog' },
}

export default function BlogPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <section style={{ padding: '64px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,232,212,0.5) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B8F88', marginBottom: 12 }}>bloom focus blog</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', color: '#2D2926', lineHeight: 1.2, marginBottom: 16 }}>
            Understanding your <em style={{ color: '#B8A4E8' }}>ADHD brain</em>
          </h1>
          <p style={{ fontSize: 15, color: '#6B5F58', lineHeight: 1.7 }}>
            No jargon, no shame, no "just try harder." Real information about how neurodivergent brains work — and what actually helps.
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8, #B8D4B8)' }} />
      </section>

      <section style={{ padding: '48px 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {articles.map((article, i) => (
            <Link key={i} href={`/blog/${article.slug}`} style={{ textDecoration: 'none' }}>
              <div className="hover-card-sm" style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 20, padding: '28px 28px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 40, flexShrink: 0 }}>{article.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
                    <div style={{ background: article.tagColor, borderRadius: 100, padding: '3px 12px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: article.tagTextColor }}>{article.tag}</div>
                    <div style={{ fontSize: 12, color: '#9B8F88' }}>{article.date} · {article.readTime}</div>
                  </div>
                  <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', lineHeight: 1.3, marginBottom: 10 }}>{article.title}</h2>
                  <p style={{ fontSize: 14, color: '#6B5F58', lineHeight: 1.6 }}>{article.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
