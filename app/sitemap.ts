import { MetadataRoute } from 'next'
import { articles } from '@/lib/articles'

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

  const blogEntries: MetadataRoute.Sitemap = articles.flatMap(article => {
    const path = `/blog/${article.slug}`
    return LOCALES.map(locale => ({
      url: urlFor(locale, path),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: { languages: altLanguages(path) },
    }))
  })

  return [...staticEntries, ...blogEntries]
}
