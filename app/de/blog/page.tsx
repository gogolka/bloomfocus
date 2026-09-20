import type { Metadata } from 'next'
import BlogList from '@/components/BlogList'

export const metadata: Metadata = {
  title: 'ADHS-Blog — Tipps, Leitfäden & dein Gehirn verstehen',
  description: 'Artikel über ADHS, Neurodivergenz, Produktivitätssysteme, die wirklich funktionieren, und sanfte Ansätze für Planung und Organisation.',
  alternates: {
    canonical: 'https://bloomfocus.org/de/blog',
    languages: { en: 'https://bloomfocus.org/blog', de: 'https://bloomfocus.org/de/blog', fr: 'https://bloomfocus.org/fr/blog', es: 'https://bloomfocus.org/es/blog' },
  },
}

// ISR: re-evaluate the publish gate without a redeploy. See lib/publish-status.
export const revalidate = 3600

export default function BlogListPage() {
  return <BlogList lang="de" />
}
