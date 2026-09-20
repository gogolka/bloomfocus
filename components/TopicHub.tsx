import Link from 'next/link'
import { notFound } from 'next/navigation'
import { publishedArticlesInTopic } from '@/lib/articles'
import { topicBySlug, topicLabel, topicIntro, type TopicSlug } from '@/lib/topics'
import { blogTitle, blogExcerpt, readTimeLabel } from '@/lib/articles-i18n'
import TopicNav from '@/components/TopicNav'
import type { Lang } from '@/lib/i18n'
import { SITE_URL } from '@/lib/site'

// One hub body shared by all four locale routes. The routes differ only in the
// locale they pass and in their own generateMetadata, so the markup, the
// structured data and the publish gating cannot drift between languages.

const CHROME: Record<Lang, { back: string; other: string; empty: string; one: string; many: (n: number) => string }> = {
  en: { back: '← All articles', other: 'Other topics', empty: 'Nothing published here yet — the first articles on this topic are on their way.', one: '1 article', many: n => `${n} articles` },
  de: { back: '← Alle Artikel', other: 'Weitere Themen', empty: 'Hier ist noch nichts veröffentlicht — die ersten Artikel zu diesem Thema sind unterwegs.', one: '1 Artikel', many: n => `${n} Artikel` },
  fr: { back: '← Tous les articles', other: "Autres thèmes", empty: "Rien de publié ici pour l'instant — les premiers articles sur ce thème arrivent.", one: '1 article', many: n => `${n} articles` },
  es: { back: '← Todos los artículos', other: 'Otros temas', empty: 'Aquí todavía no hay nada publicado — los primeros artículos sobre este tema están en camino.', one: '1 artículo', many: n => `${n} artículos` },
}

export function topicUrl(slug: string, lang: Lang): string {
  return lang === 'en' ? `${SITE_URL}/blog/topic/${slug}` : `${SITE_URL}/${lang}/blog/topic/${slug}`
}

export default function TopicHub({ lang, topicSlug }: { lang: Lang; topicSlug: string }) {
  const topic = topicBySlug(topicSlug)
  if (!topic) notFound()
  const list = publishedArticlesInTopic(topic.slug)
  const c = CHROME[lang]
  const base = lang === 'en' ? '' : `/${lang}`
  const label = topicLabel(topic.slug, lang)
  const intro = topicIntro[lang][topic.slug as TopicSlug]

  // CollectionPage carries the hub's own identity; the nested ItemList names the
  // articles in reading order so the hub is legible as a curated set rather than
  // an arbitrary listing page.
  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: label,
    description: intro,
    url: topicUrl(topic.slug, lang),
    inLanguage: lang,
    isPartOf: { '@type': 'Blog', name: 'bloom focus blog', url: `${SITE_URL}${base}/blog` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: list.length,
      itemListElement: list.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: lang === 'en' ? `${SITE_URL}/blog/${a.slug}` : `${SITE_URL}/${lang}/blog/${a.slug}`,
        name: blogTitle(a.slug, lang, a.title),
      })),
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}${base}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}${base}/blog` },
      { '@type': 'ListItem', position: 3, name: label, item: topicUrl(topic.slug, lang) },
    ],
  }

  const ld = (o: unknown) => JSON.stringify(o).replace(/</g, '\\u003c')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(breadcrumbLd) }} />
      <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
        <section style={{ padding: '64px 24px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${topic.color} 0%, transparent 65%)`, opacity: 0.55, pointerEvents: 'none' }} />
          <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
            <Link href={`${base}/blog`} style={{ textDecoration: 'none', fontSize: 13, color: '#776B64', display: 'inline-block', marginBottom: 20 }}>
              {c.back}
            </Link>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 42px)', color: '#2D2926', lineHeight: 1.2, marginBottom: 16 }}>
              {label}
            </h1>
            <p style={{ fontSize: 15, color: '#6B5F58', lineHeight: 1.75, textAlign: 'left' }}>{intro}</p>
            <div style={{ fontSize: 13, color: '#776B64', marginTop: 16 }}>
              {list.length === 1 ? c.one : c.many(list.length)}
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8, #B8D4B8)' }} />
        </section>

        <section style={{ padding: '40px 24px 64px', maxWidth: 900, margin: '0 auto' }}>
          {list.length === 0 ? (
            <p style={{ fontSize: 15, color: '#6B5F58', textAlign: 'center' }}>{c.empty}</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {list.map(article => (
                <Link key={article.slug} href={`${base}/blog/${article.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="hover-card-sm" style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 20, padding: '28px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 40, flexShrink: 0 }}>{article.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: '#776B64', marginBottom: 10 }}>{article.date} · {readTimeLabel(lang, article.readTime)}</div>
                      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', lineHeight: 1.3, marginBottom: 10 }}>{blogTitle(article.slug, lang, article.title)}</h2>
                      <p style={{ fontSize: 14, color: '#6B5F58', lineHeight: 1.6 }}>{blogExcerpt(article.slug, lang, article.excerpt)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section style={{ padding: '0 24px 80px', maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', marginBottom: 16 }}>{c.other}</h2>
          <TopicNav activeSlug={topic.slug} lang={lang} />
        </section>
      </div>
    </>
  )
}
