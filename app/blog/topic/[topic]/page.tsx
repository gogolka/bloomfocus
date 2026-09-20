import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { publishedArticlesInTopic } from '@/lib/articles'
import { topics, topicBySlug, MIN_ARTICLES_FOR_INDEXING } from '@/lib/topics'
import TopicNav from '@/components/TopicNav'
import { NOINDEX_FOLLOW } from '@/lib/publish-status'
import { SITE_URL } from '@/lib/site'

// ISR: the article count changes as the publishing schedule fills a topic, and
// with it whether this hub is indexable. Same interval as the blog index.
export const revalidate = 3600

export function generateStaticParams() {
  return topics.map(t => ({ topic: t.slug }))
}

export async function generateMetadata({ params }: { params: { topic: string } }): Promise<Metadata> {
  const topic = topicBySlug(params.topic)
  if (!topic) return { title: 'Topic not found' }
  const count = publishedArticlesInTopic(topic.slug).length
  return {
    title: `${topic.label} — ADHD articles`,
    description: topic.description,
    alternates: { canonical: `${SITE_URL}/blog/topic/${topic.slug}` },
    // A hub with one or two articles is a thin page. It stays reachable so the
    // pill always leads somewhere, but it is not offered to search until the
    // schedule has filled it out.
    robots: count >= MIN_ARTICLES_FOR_INDEXING ? undefined : NOINDEX_FOLLOW,
    openGraph: { title: `${topic.label} — ADHD articles`, description: topic.description, type: 'website' },
    twitter: { card: 'summary_large_image', title: `${topic.label} — ADHD articles`, description: topic.description },
  }
}

export default function TopicHubPage({ params }: { params: { topic: string } }) {
  const topic = topicBySlug(params.topic)
  if (!topic) notFound()
  const articles = publishedArticlesInTopic(topic.slug)

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: topic.label, item: `${SITE_URL}/blog/topic/${topic.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, '\\u003c') }} />
      <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
        <section style={{ padding: '64px 24px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${topic.color} 0%, transparent 65%)`, opacity: 0.55, pointerEvents: 'none' }} />
          <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative' }}>
            <Link href="/blog" style={{ textDecoration: 'none', fontSize: 13, color: '#776B64', display: 'inline-block', marginBottom: 20 }}>
              ← All articles
            </Link>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 42px)', color: '#2D2926', lineHeight: 1.2, marginBottom: 16 }}>
              {topic.label}
            </h1>
            <p style={{ fontSize: 15, color: '#6B5F58', lineHeight: 1.7 }}>{topic.description}</p>
            <div style={{ fontSize: 13, color: '#776B64', marginTop: 16 }}>
              {articles.length === 1 ? '1 article' : `${articles.length} articles`}
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8, #B8D4B8)' }} />
        </section>

        <section style={{ padding: '40px 24px 64px', maxWidth: 900, margin: '0 auto' }}>
          {articles.length === 0 ? (
            <p style={{ fontSize: 15, color: '#6B5F58', textAlign: 'center' }}>
              Nothing published here yet — the first articles on this topic are on their way.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {articles.map(article => (
                <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="hover-card-sm" style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 20, padding: '28px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 40, flexShrink: 0 }}>{article.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: '#776B64', marginBottom: 10 }}>{article.date} · {article.readTime}</div>
                      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', lineHeight: 1.3, marginBottom: 10 }}>{article.title}</h2>
                      <p style={{ fontSize: 14, color: '#6B5F58', lineHeight: 1.6 }}>{article.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section style={{ padding: '0 24px 80px', maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', marginBottom: 16 }}>Other topics</h2>
          <TopicNav activeSlug={topic.slug} />
        </section>
      </div>
    </>
  )
}
