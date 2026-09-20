import Link from 'next/link'
import { publishedArticlesInTopic } from '@/lib/articles'
import { topics, topicLabel } from '@/lib/topics'
import type { Lang } from '@/lib/i18n'

/**
 * Links to every topic hub, with its live article count.
 *
 * Rendered on the blog index and on each hub, so the hubs are reachable from
 * anywhere in the blog rather than only from an article's topic pill. Counts
 * come from the published set, so a scheduled article is not advertised here
 * before its date.
 *
 * Locale-aware: every locale has its own hubs, so the pills stay inside the
 * reader's language instead of dropping them into English.
 */
export default function TopicNav({ activeSlug, lang = 'en' }: { activeSlug?: string; lang?: Lang }) {
  const base = lang === 'en' ? '' : `/${lang}`
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {topics.map(t => {
        const count = publishedArticlesInTopic(t.slug).length
        const active = t.slug === activeSlug
        return (
          <Link
            key={t.slug}
            href={`${base}/blog/topic/${t.slug}`}
            style={{
              textDecoration: 'none',
              background: active ? t.color : '#FEFCFA',
              border: `1.5px solid ${active ? t.color : 'rgba(45,41,38,0.12)'}`,
              color: active ? t.textColor : '#5C5049',
              borderRadius: 100,
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: active ? 600 : 400,
            }}
          >
            {topicLabel(t.slug, lang)}
            <span style={{ opacity: 0.7, marginLeft: 6 }}>{count}</span>
          </Link>
        )
      })}
    </div>
  )
}
