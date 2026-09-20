import Link from 'next/link'
import { publishedArticlesInTopic } from '@/lib/articles'
import { topics } from '@/lib/topics'

/**
 * Links to every topic hub, with its live article count.
 *
 * Rendered on the blog index and on each hub, so the hubs are reachable from
 * anywhere in the blog rather than only from an article's topic pill. Counts
 * come from the published set, so a scheduled article is not advertised here
 * before its date.
 *
 * English-only, like the hubs themselves.
 */
export default function TopicNav({ activeSlug }: { activeSlug?: string }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {topics.map(t => {
        const count = publishedArticlesInTopic(t.slug).length
        const active = t.slug === activeSlug
        return (
          <Link
            key={t.slug}
            href={`/blog/topic/${t.slug}`}
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
            {t.label}
            <span style={{ opacity: 0.7, marginLeft: 6 }}>{count}</span>
          </Link>
        )
      })}
    </div>
  )
}
