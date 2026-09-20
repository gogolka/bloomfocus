import { renderArticleOgImage, ogSize, ogContentType } from '@/lib/article-og'

export const runtime = 'edge'
export const size = ogSize
export const contentType = ogContentType

// Without this file the article pages fall back to the site-wide Twitter image.
export default function ArticleTwitterImage({ params }: { params: { slug: string } }) {
  return renderArticleOgImage(params.slug, 'de')
}
