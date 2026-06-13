import { notFound } from 'next/navigation'
import Link from 'next/link'
import { articles } from '@/lib/articles'
import type { Lang } from '@/lib/i18n'
import { blogChrome, blogTitle, blogExcerpt, blogTag, blogBody, readTimeLabel } from '@/lib/articles-i18n'

export default function BlogArticle({ lang, slug }: { lang: Lang; slug: string }) {
  const article = articles.find(a => a.slug === slug)
  if (!article) notFound()
  const c = blogChrome[lang]
  const base = lang === 'en' ? '' : `/${lang}`
  const content = blogBody(slug, lang)

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <section style={{ padding: '64px 24px 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,222,255,0.5) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
          <Link href={`${base}/blog`} style={{ textDecoration: 'none', fontSize: 13, color: '#9B8F88', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
            {c.backToBlog}
          </Link>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
            <div style={{ background: article.tagColor, borderRadius: 100, padding: '4px 14px', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: article.tagTextColor }}>
              {blogTag(article.tag, lang)}
            </div>
            <div style={{ fontSize: 13, color: '#9B8F88' }}>{article.date} · {readTimeLabel(lang, article.readTime)}</div>
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 4vw, 40px)', color: '#2D2926', lineHeight: 1.2, marginBottom: 20 }}>
            {blogTitle(slug, lang, article.title)}
          </h1>
          <p style={{ fontSize: 16, color: '#6B5F58', lineHeight: 1.7 }}>{blogExcerpt(slug, lang, article.excerpt)}</p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8, #B8D4B8)' }} />
      </section>

      <article style={{ padding: '48px 24px 80px', maxWidth: 720, margin: '0 auto' }}>
        {content.map((paragraph, i) => (
          <p key={i} style={{ fontSize: 16, color: '#2D2926', lineHeight: 1.85, marginBottom: 24 }}>
            {paragraph}
          </p>
        ))}

        <div style={{ marginTop: 56, padding: '32px', background: '#E8DEFF', border: '1.5px solid #D4C5F9', borderRadius: 20, textAlign: 'center' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', marginBottom: 12 }}>
            {c.ctaTitle}
          </div>
          <p style={{ fontSize: 14, color: '#6B5F58', lineHeight: 1.6, marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
            {c.ctaSub}
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`${base}/shop`} style={{ textDecoration: 'none', background: '#B8A4E8', color: 'white', padding: '12px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, display: 'inline-block' }}>
              {c.ctaShop}
            </Link>
            <Link href={`${base}/quiz`} style={{ textDecoration: 'none', background: 'white', color: '#7B5FCC', border: '1.5px solid #D4C5F9', padding: '12px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, display: 'inline-block' }}>
              {c.ctaQuiz}
            </Link>
          </div>
        </div>

        <div style={{ marginTop: 56 }}>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', marginBottom: 20 }}>{c.more}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {articles.filter(a => a.slug !== slug).slice(0, 2).map((a, i) => (
              <Link key={i} href={`${base}/blog/${a.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 14, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
                  <span style={{ fontSize: 28 }}>{a.emoji}</span>
                  <div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: '#2D2926', marginBottom: 4 }}>{blogTitle(a.slug, lang, a.title)}</div>
                    <div style={{ fontSize: 12, color: '#9B8F88' }}>{readTimeLabel(lang, a.readTime)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
