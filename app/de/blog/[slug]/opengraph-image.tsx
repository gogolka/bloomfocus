import { renderArticleOgImage, ogSize, ogContentType } from '@/lib/article-og'

export const runtime = 'edge'
export const size = ogSize
export const contentType = ogContentType

export default function ArticleOgImage({ params }: { params: { slug: string } }) {
  return renderArticleOgImage(params.slug, 'de')
}
