import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/app', '/api/', '/download', '/success', '/admin'] },
    ],
    sitemap: 'https://bloomfocus.org/sitemap.xml',
  }
}
