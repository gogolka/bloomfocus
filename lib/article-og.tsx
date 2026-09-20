import { ImageResponse } from 'next/og'
import { articles } from '@/lib/articles'
import { blogTitle } from '@/lib/articles-i18n'
import { topicBySlug, topicLabel } from '@/lib/topics'
import type { Lang } from '@/lib/i18n'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

const FALLBACK_TITLE: Record<Lang, string> = {
  en: 'bloom focus — ADHD Blog',
  de: 'bloom focus — ADHS-Blog',
  fr: 'bloom focus — Blog TDAH',
  es: 'bloom focus — Blog TDAH',
}

/**
 * Shared Open Graph / Twitter card renderer for article pages.
 *
 * One implementation for all four locales — each route's opengraph-image.tsx and
 * twitter-image.tsx is a thin wrapper that passes its own `lang`. Title and tag
 * are localised; the brand line and emoji are language-neutral.
 */
export function renderArticleOgImage(slug: string, lang: Lang) {
  const article = articles.find(a => a.slug === slug)
  const title = article ? blogTitle(slug, lang, article.title) : FALLBACK_TITLE[lang]
  const emoji = article?.emoji || '🧠'
  const topic = article ? topicBySlug(article.topic) : undefined
  const tag = topic ? topicLabel(topic.slug, lang) : null

  return new ImageResponse(
    (
      <div style={{
        width: 1200, height: 630, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#FFF8F0', fontFamily: 'Georgia, serif',
        position: 'relative', overflow: 'hidden', padding: '0 80px',
      }}>
        <div style={{
          position: 'absolute', top: -60, right: -60, width: 360, height: 360,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,222,255,0.65) 0%, transparent 70%)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: -40, left: -40, width: 280, height: 280,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,214,196,0.55) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Brand */}
        <div style={{ fontSize: 20, color: '#9B8F88', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 32, display: 'flex' }}>
          bloom focus
        </div>

        {/* Emoji */}
        <div style={{ fontSize: 64, marginBottom: 24, display: 'flex' }}>{emoji}</div>

        {/* Article title */}
        <div style={{
          fontSize: title.length > 60 ? 38 : 46,
          color: '#2D2926', textAlign: 'center',
          lineHeight: 1.3, maxWidth: 900,
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        }}>
          {title}
        </div>

        {/* Tag pill */}
        {tag && (
          <div style={{
            marginTop: 32, background: topic?.color || '#E8DEFF',
            borderRadius: 100, padding: '8px 24px',
            fontSize: 16, color: topic?.textColor || '#5F46A0',
            letterSpacing: '0.08em', display: 'flex',
          }}>
            {tag}
          </div>
        )}

        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 6,
          background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8, #B8D4B8)',
          display: 'flex',
        }} />
      </div>
    ),
    { ...ogSize }
  )
}
