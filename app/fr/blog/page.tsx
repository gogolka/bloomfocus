import type { Metadata } from 'next'
import BlogList from '@/components/BlogList'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: `Blog TDAH — Astuces, guides & comprendre ton cerveau`,
  description: `Des articles sur le TDAH, la neurodivergence, des systèmes de productivité qui marchent vraiment et des approches douces de l'organisation.`,
  alternates: {
    canonical: 'https://bloomfocus.org/fr/blog',
    languages: { en: 'https://bloomfocus.org/blog', de: 'https://bloomfocus.org/de/blog', fr: 'https://bloomfocus.org/fr/blog', es: 'https://bloomfocus.org/es/blog' },
  },
}

export default function BlogListPage() {
  return <BlogList lang="fr" />
}
