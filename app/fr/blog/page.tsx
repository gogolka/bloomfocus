import type { Metadata } from 'next'
import BlogList from '@/components/BlogList'

export const metadata: Metadata = {
  title: `Blog TDAH — Astuces, guides & comprendre ton cerveau`,
  description: `Des articles sur le TDAH, la neurodivergence, des systèmes de productivité qui marchent vraiment et des approches douces de l'organisation.`,
  alternates: {
    canonical: 'https://bloomfocus.org/fr/blog',
    languages: { en: 'https://bloomfocus.org/blog', de: 'https://bloomfocus.org/de/blog', fr: 'https://bloomfocus.org/fr/blog', es: 'https://bloomfocus.org/es/blog' },
  },
}

// ISR: re-evaluate the publish gate without a redeploy. See lib/publish-status.
export const revalidate = 3600

export default function BlogListPage() {
  return <BlogList lang="fr" />
}
