import { notFound } from 'next/navigation'
import Link from 'next/link'
import { articles, relatedArticles, topicOf } from '@/lib/articles'
import { articleFAQs } from '@/lib/article-faqs'
import { articleSources } from '@/lib/article-sources'
import type { Lang } from '@/lib/i18n'
import { blogChrome, blogTitle, blogExcerpt, blogBody, readTimeLabel } from '@/lib/articles-i18n'
import { topicLabel } from '@/lib/topics'
import { toBlocks, type ArticleBlock } from '@/lib/article-blocks'
import RichText from './RichText'

export default function BlogArticle({ lang, slug }: { lang: Lang; slug: string }) {
  const article = articles.find(a => a.slug === slug)
  if (!article) notFound()
  const c = blogChrome[lang]
  const base = lang === 'en' ? '' : `/${lang}`
  const content = blogBody(slug, lang)
  const faqs = lang === 'en' ? articleFAQs[slug] : undefined
  const sources = lang === 'en' ? articleSources[slug] : undefined

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <section style={{ padding: '64px 24px 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,222,255,0.5) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
          <Link href={`${base}/blog`} style={{ textDecoration: 'none', fontSize: 13, color: '#776B64', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
            {c.backToBlog}
          </Link>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
            {(() => {
              const topic = topicOf(article)
              const pill = (
                <div style={{ background: topic.color, borderRadius: 100, padding: '4px 14px', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: topic.textColor }}>
                  {topicLabel(topic.slug, lang)}
                </div>
              )
              // Hub pages are English-only for now, so only the English pill
              // links out — sending a German reader to an English hub is worse
              // than leaving the pill as a label.
              return lang === 'en'
                ? <Link href={`/blog/topic/${topic.slug}`} style={{ textDecoration: 'none' }}>{pill}</Link>
                : pill
            })()}
            <div style={{ fontSize: 13, color: '#776B64' }}>{article.date} · {readTimeLabel(lang, article.readTime)}</div>
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 4vw, 40px)', color: '#2D2926', lineHeight: 1.2, marginBottom: 20 }}>
            {blogTitle(slug, lang, article.title)}
          </h1>
          <p style={{ fontSize: 16, color: '#6B5F58', lineHeight: 1.7 }}>{blogExcerpt(slug, lang, article.excerpt)}</p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8, #B8D4B8)' }} />
      </section>

      <article style={{ padding: '48px 24px 80px', maxWidth: 720, margin: '0 auto' }}>
        {toBlocks(content).map((block, i) => (
          <Block key={i} block={block} lang={lang} />
        ))}

        {!!faqs?.length && (
          <section aria-labelledby="article-faq-heading" style={{ marginTop: 40 }}>
            <h2 id="article-faq-heading" style={{ fontFamily: 'Georgia, serif', fontSize: 24, color: '#2D2926', marginBottom: 24 }}>Frequently Asked Questions</h2>
            {faqs.map(faq => (
              <div key={faq.question}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#2D2926', lineHeight: 1.5, marginBottom: 8 }}>{faq.question}</h3>
                {/* Answers are single paragraphs with inline markup only, so they
                    go through RichText directly rather than the block renderer. */}
                <p style={{ fontSize: 16, color: '#2D2926', lineHeight: 1.85, marginBottom: 24 }}>
                  <RichText text={faq.answer} lang={lang} />
                </p>
              </div>
            ))}
          </section>
        )}

        {!!sources?.length && (
          <section aria-labelledby="article-sources-heading" style={{ marginTop: 40, color: '#6B5F58' }}>
            <h2 id="article-sources-heading" style={{ fontFamily: 'Georgia, serif', fontSize: 20, marginBottom: 16 }}>Sources</h2>
            <ul style={{ fontSize: 13, lineHeight: 1.7, paddingLeft: 20, listStyleType: 'disc' }}>
              {sources.map((source, i) => <li key={i} style={{ marginBottom: 8 }}><RichText text={source} lang={lang} /></li>)}
            </ul>
          </section>
        )}

        <div style={{ marginTop: 56, padding: '32px', background: '#E8DEFF', border: '1.5px solid #D4C5F9', borderRadius: 20, textAlign: 'center' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', marginBottom: 12 }}>
            {c.ctaTitle}
          </div>
          <p style={{ fontSize: 14, color: '#6B5F58', lineHeight: 1.6, marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
            {c.ctaSub}
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`${base}/shop`} style={{ textDecoration: 'none', background: '#7B5FCC', color: 'white', padding: '12px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, display: 'inline-block' }}>
              {c.ctaShop}
            </Link>
            <Link href={`${base}/quiz`} style={{ textDecoration: 'none', background: 'white', color: '#7B5FCC', border: '1.5px solid #D4C5F9', padding: '12px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, display: 'inline-block' }}>
              {c.ctaQuiz}
            </Link>
          </div>
        </div>

        <div style={{ marginTop: 56 }}>
          {/* h2, not h3: the only other heading on the page is the h1, and the
              article body can now emit its own h2s. */}
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', marginBottom: 20 }}>{c.more}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {relatedArticles(slug).map(a => (
              <Link key={a.slug} href={`${base}/blog/${a.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 14, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
                  <span style={{ fontSize: 28 }}>{a.emoji}</span>
                  <div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: '#2D2926', marginBottom: 4 }}>{blogTitle(a.slug, lang, a.title)}</div>
                    <div style={{ fontSize: 12, color: '#776B64' }}>{readTimeLabel(lang, a.readTime)}</div>
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

/**
 * One article block. Styles continue the existing scale — body text was 16px /
 * 1.85 line-height, and headings reuse the Georgia serif already used for h1.
 */
function Block({ block, lang }: { block: ArticleBlock; lang: Lang }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 25, color: '#2D2926', lineHeight: 1.3, margin: '44px 0 16px' }}>
          <RichText text={block.text} lang={lang} />
        </h2>
      )
    case 'h3':
      return (
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', lineHeight: 1.35, margin: '32px 0 12px' }}>
          <RichText text={block.text} lang={lang} />
        </h3>
      )
    case 'ul':
    case 'ol': {
      const List = block.type === 'ul' ? 'ul' : 'ol'
      // listStyleType is explicit because Tailwind's preflight sets
      // `ol,ul{list-style:none}` — without it the markers disappear.
      return (
        <List style={{ fontSize: 16, color: '#2D2926', lineHeight: 1.85, marginBottom: 24, paddingLeft: 26, listStyleType: block.type === 'ul' ? 'disc' : 'decimal' }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ marginBottom: 8 }}>
              <RichText text={item} lang={lang} />
            </li>
          ))}
        </List>
      )
    }
    default:
      return (
        <p style={{ fontSize: 16, color: '#2D2926', lineHeight: 1.85, marginBottom: 24 }}>
          <RichText text={block.text} lang={lang} />
        </p>
      )
  }
}
