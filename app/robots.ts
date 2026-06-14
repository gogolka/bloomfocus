import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/app', '/api/', '/download', '/success'] },
    ],
    sitemap: 'https://bloomfocus.org/sitemap.xml',
  }
}
