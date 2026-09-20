import type { Metadata } from 'next'
import Script from 'next/script'
import BlogArticle from '@/components/BlogArticle'
import { articles } from '@/lib/articles'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articles.find(a => a.slug === params.slug)
  if (!article) return { title: 'Article not found' }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `https://bloomfocus.org/blog/${params.slug}`,
      languages: {
        en: `https://bloomfocus.org/blog/${params.slug}`,
        de: `https://bloomfocus.org/de/blog/${params.slug}`,
        fr: `https://bloomfocus.org/fr/blog/${params.slug}`,
        es: `https://bloomfocus.org/es/blog/${params.slug}`,
      },
    },
    openGraph: { title: article.title, description: article.excerpt, type: 'article', publishedTime: new Date(article.date).toISOString() },
    // Without this the root layout's site-wide card is inherited on every article.
    // `images` is omitted on purpose: Next.js then reuses the generated
    // opengraph-image for the Twitter card too, so there is one source of truth.
    twitter: { card: 'summary_large_image', title: article.title, description: article.excerpt },
  }
}

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find(a => a.slug === params.slug)
  const jsonLd = article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: { '@type': 'Organization', name: 'bloom focus', url: 'https://bloomfocus.org' },
    publisher: { '@type': 'Organization', name: 'bloom focus', url: 'https://bloomfocus.org', logo: { '@type': 'ImageObject', url: 'https://bloomfocus.org/icons/icon-192.png' } },
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.date).toISOString(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://bloomfocus.org/blog/${params.slug}` },
    url: `https://bloomfocus.org/blog/${params.slug}`,
    inLanguage: 'en',
  } : null

  const breadcrumbLd = article ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bloomfocus.org' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://bloomfocus.org/blog' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://bloomfocus.org/blog/${params.slug}` },
    ],
  } : null
  return (
    <>
      {jsonLd && (
        <Script id="article-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      {breadcrumbLd && (
        <Script id="breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      )}
      <BlogArticle lang="en" slug={params.slug} />
    </>
  )
}
