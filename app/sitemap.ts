import { MetadataRoute } from 'next'
import { publishedArticles } from '@/lib/articles'
import { translatedLocales } from '@/lib/articles-i18n'

const BASE = 'https://bloomfocus.org'
const LOCALES = ['en', 'de', 'fr', 'es'] as const

// Build a localized absolute URL for a given path (path '' = home, otherwise '/shop' etc.)
function urlFor(locale: string, path: string) {
  const prefix = locale === 'en' ? '' : `/${locale}`
  return `${BASE}${prefix}${path}`
}

// hreflang alternates map for a given path, including x-default (English)
function altLanguages(path: string): Record<string, string> {
  const langs: Record<string, string> = {}
  for (const l of LOCALES) langs[l] = urlFor(l, path)
  langs['x-default'] = urlFor('en', path)
  return langs
}

// ISR: re-evaluate the publish gate without a redeploy. See lib/publish-status.
export const revalidate = 3600

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static pages: [path, changeFrequency, priority]
  const staticPages: [string, 'weekly' | 'monthly', number][] = [
    ['', 'weekly', 1],
    ['/shop', 'weekly', 0.9],
    ['/quiz', 'monthly', 0.8],
    ['/blog', 'weekly', 0.8],
  ]

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap(([path, changeFrequency, priority]) =>
    LOCALES.map(locale => ({
      url: urlFor(locale, path),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: altLanguages(path) },
    }))
  )

  // Only the locales an article is genuinely translated into. A locale URL that
  // falls back to English text is still reachable directly, but listing it here
  // — or naming it in hreflang — would tell Google we publish the same article
  // four times in four languages when we publish it once.
  // Unpublished articles are absent entirely — never advertise a page that is
  // deliberately not live yet.
  const blogEntries: MetadataRoute.Sitemap = publishedArticles().flatMap(article => {
    const articleDate = new Date(article.date)
    const path = `/blog/${article.slug}`
    const locales = translatedLocales(article.slug)
    const languages = locales.length > 1
      ? Object.fromEntries([
          ...locales.map(l => [l, urlFor(l, path)] as const),
          ['x-default', urlFor('en', path)] as const,
        ])
      : undefined
    return locales.map(locale => ({
      url: urlFor(locale, path),
      lastModified: articleDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      ...(languages ? { alternates: { languages } } : {}),
    }))
  })

  // The Privacy Policy is translated, so it gets one entry per locale with
  // hreflang alternates. About/Contact/Terms are still English-only.
  const privacyEntries: MetadataRoute.Sitemap = LOCALES.map(locale => ({
    url: urlFor(locale, '/privacy'),
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.3,
    alternates: { languages: altLanguages('/privacy') },
  }))

  const legalEntries: MetadataRoute.Sitemap = [
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  return [...staticEntries, ...blogEntries, ...privacyEntries, ...legalEntries]
}
