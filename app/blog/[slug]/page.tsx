import type { Metadata } from 'next'
import BlogArticle from '@/components/BlogArticle'
import { articles } from '@/lib/articles'
import { articleAlternateLanguages, servedLanguage } from '@/lib/articles-i18n'
import { articleFAQs } from '@/lib/article-faqs'
import { inlineToPlainText } from '@/lib/article-blocks'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articles.find(a => a.slug === params.slug)
  if (!article) return { title: 'Article not found' }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `https://bloomfocus.org/blog/${params.slug}`,
      // Only locales with a real translation — a fallback-to-English
      // URL must not be advertised as this article in that language.
      languages: articleAlternateLanguages(params.slug),
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
  const faqs = articleFAQs[params.slug]
  const faqLd = faqs?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        // Same tokenizer the renderer uses, so the schema text can never drift
        // from what readers see — and bold/italic are handled too, not just links.
        text: inlineToPlainText(f.answer),
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
    // Article schema wants an image; point at this locale's generated
    // Open Graph card so the rich result has one.
    image: {
      '@type': 'ImageObject',
      url: `https://bloomfocus.org/blog/${params.slug}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    inLanguage: servedLanguage(params.slug, 'en'),
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      )}
      {breadcrumbLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, '\\u003c') }} />
      )}
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, '\\u003c') }} />
      )}
      <BlogArticle lang="en" slug={params.slug} />
    </>
  )
}
