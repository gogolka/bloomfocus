import type { Metadata } from 'next'
import TopicHub, { topicUrl } from '@/components/TopicHub'
import { publishedArticlesInTopic } from '@/lib/articles'
import { topics, topicBySlug, topicLabel, topicMeta, MIN_ARTICLES_FOR_INDEXING, type TopicSlug } from '@/lib/topics'
import { NOINDEX_FOLLOW } from '@/lib/publish-status'
import { LOCALES } from '@/lib/i18n'

const LANG = 'es' as const

// ISR: the article count changes as the publishing schedule fills a topic, and
// with it whether this hub is indexable. Same interval as the blog index.
export const revalidate = 3600

export function generateStaticParams() {
  return topics.map(t => ({ topic: t.slug }))
}

export async function generateMetadata({ params }: { params: { topic: string } }): Promise<Metadata> {
  const topic = topicBySlug(params.topic)
  if (!topic) return { title: 'Topic not found' }
  const label = topicLabel(topic.slug, LANG)
  const description = topicMeta[LANG][topic.slug as TopicSlug]
  const count = publishedArticlesInTopic(topic.slug).length

  // Every locale has this hub, so the alternates are the full set plus
  // x-default pointing at English — the same shape the article pages use.
  const languages: Record<string, string> = {}
  for (const l of LOCALES) languages[l] = topicUrl(topic.slug, l)
  languages['x-default'] = topicUrl(topic.slug, 'en')

  return {
    title: `${label} — ADHD articles`,
    description,
    alternates: { canonical: topicUrl(topic.slug, LANG), languages },
    // A hub with one or two articles is a thin page. It stays reachable so the
    // pill always leads somewhere, but it is not offered to search until the
    // schedule has filled it out.
    robots: count >= MIN_ARTICLES_FOR_INDEXING ? undefined : NOINDEX_FOLLOW,
    openGraph: { title: `${label} — ADHD articles`, description, type: 'website', url: topicUrl(topic.slug, LANG) },
    twitter: { card: 'summary_large_image', title: `${label} — ADHD articles`, description },
  }
}

export default function TopicHubPage({ params }: { params: { topic: string } }) {
  return <TopicHub lang={LANG} topicSlug={params.topic} />
}
