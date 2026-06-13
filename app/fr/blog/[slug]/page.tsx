import type { Metadata } from 'next'
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
  return <BlogArticle lang="fr" slug={params.slug} />
}
