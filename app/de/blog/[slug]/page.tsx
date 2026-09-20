import type { Metadata } from 'next'
import BlogArticle from '@/components/BlogArticle'
import { articles } from '@/lib/articles'
import { blogTitle, blogExcerpt, articleAlternateLanguages, servedLanguage, hasTranslation } from '@/lib/articles-i18n'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articles.find(a => a.slug === params.slug)
  if (!article) return { title: 'Article not found' }
  const title = blogTitle(params.slug, 'de', article.title)
  const description = blogExcerpt(params.slug, 'de', article.excerpt)
  return {
    title,
    description,
    alternates: {
      canonical: `https://bloomfocus.org/de/blog/${params.slug}`,
      // Only locales with a real translation — a fallback-to-English
      // URL must not be advertised as this article in that language.
      languages: articleAlternateLanguages(params.slug),
    },
    openGraph: { title, description, type: 'article', publishedTime: new Date(article.date).toISOString() },
    // Without this the root layout's site-wide card is inherited on every article.
    twitter: { card: 'summary_large_image', title, description },
    // An article with no translation still renders here, but it serves the
    // English body under a localized URL. Keep it reachable and crawlable,
    // just not indexable as a separate page — otherwise it competes with the
    // English original as duplicate content. follow stays on so the links out
    // of it are still discovered. Same source of truth as sitemap and hreflang:
    // add a real translation and the page becomes indexable automatically.
    robots: hasTranslation(params.slug, 'de') ? undefined : { index: false, follow: true },
  }
}

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find(a => a.slug === params.slug)
  const title = article ? blogTitle(params.slug, 'de', article.title) : ''
  const description = article ? blogExcerpt(params.slug, 'de', article.excerpt) : ''
  const jsonLd = article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: 'bloom focus', url: 'https://bloomfocus.org' },
    publisher: { '@type': 'Organization', name: 'bloom focus', url: 'https://bloomfocus.org', logo: { '@type': 'ImageObject', url: 'https://bloomfocus.org/icons/icon-192.png' } },
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.date).toISOString(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://bloomfocus.org/de/blog/${params.slug}` },
    url: `https://bloomfocus.org/de/blog/${params.slug}`,
    // Article schema wants an image; point at this locale's generated
    // Open Graph card so the rich result has one.
    image: {
      '@type': 'ImageObject',
      url: `https://bloomfocus.org/de/blog/${params.slug}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    inLanguage: servedLanguage(params.slug, 'de'),
  } : null

  const breadcrumbLd = article ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bloomfocus.org/de' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://bloomfocus.org/de/blog' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://bloomfocus.org/de/blog/${params.slug}` },
    ],
  } : null
  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      )}
      {breadcrumbLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, '\\u003c') }} />
      )}
      <BlogArticle lang="de" slug={params.slug} />
    </>
  )
}
