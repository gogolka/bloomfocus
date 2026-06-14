import type { Metadata } from 'next'
import Script from 'next/script'
import BlogArticle from '@/components/BlogArticle'
import { articles } from '@/lib/articles'
import { blogTitle, blogExcerpt } from '@/lib/articles-i18n'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articles.find(a => a.slug === params.slug)
  if (!article) return { title: 'Article not found' }
  const title = blogTitle(params.slug, 'fr', article.title)
  const description = blogExcerpt(params.slug, 'fr', article.excerpt)
  return {
    title,
    description,
    alternates: {
      canonical: `https://bloomfocus.org/fr/blog/${params.slug}`,
      languages: {
        en: `https://bloomfocus.org/blog/${params.slug}`,
        de: `https://bloomfocus.org/de/blog/${params.slug}`,
        fr: `https://bloomfocus.org/fr/blog/${params.slug}`,
        es: `https://bloomfocus.org/es/blog/${params.slug}`,
      },
    },
    openGraph: { title, description, type: 'article', publishedTime: article.date },
  }
}

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find(a => a.slug === params.slug)
  const title = article ? blogTitle(params.slug, 'fr', article.title) : ''
  const description = article ? blogExcerpt(params.slug, 'fr', article.excerpt) : ''
  const jsonLd = article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: 'bloom focus', url: 'https://bloomfocus.org' },
    publisher: { '@type': 'Organization', name: 'bloom focus', url: 'https://bloomfocus.org', logo: { '@type': 'ImageObject', url: 'https://bloomfocus.org/icons/icon-192.png' } },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://bloomfocus.org/fr/blog/${params.slug}` },
    url: `https://bloomfocus.org/fr/blog/${params.slug}`,
    inLanguage: 'fr',
  } : null
  return (
    <>
      {jsonLd && (
        <Script id="article-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <BlogArticle lang="fr" slug={params.slug} />
    </>
  )
}
