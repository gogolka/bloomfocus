import { MetadataRoute } from 'next'
import { articles } from './blog/page'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogUrls = articles.map(article => ({
    url: `https://bloomfocus.org/blog/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: 'https://bloomfocus.org', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://bloomfocus.org/shop', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://bloomfocus.org/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...blogUrls,
  ]
}
