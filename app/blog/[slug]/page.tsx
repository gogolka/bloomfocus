import type { Metadata } from 'next'
import Script from 'next/script'
import BlogArticle from '@/components/BlogArticle'
import { articles } from '@/lib/articles'
import { articleFAQs } from '@/lib/article-faqs'

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
  }
}

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find(a => a.slug === params.slug)
  const faqs = articleFAQs[params.slug]
  const faqLd = faqs?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        // Schema text uses the same answer with inline link labels as plain text.
        text: f.answer.replace(/\[([^\]]+)\]\(\/blog\/[a-z0-9-]+\)/g, '$1'),
      },
    })),
  } : null
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
      {faqLd && (
        <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, '\\u003c') }} />
      )}
      <BlogArticle lang="en" slug={params.slug} />
    </>
  )
}
