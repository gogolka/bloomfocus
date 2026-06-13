import type { Metadata } from 'next'
import BlogList from '@/components/BlogList'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog TDAH — Consejos, guías y entender tu cerebro',
  description: 'Artículos sobre el TDAH, la neurodivergencia, sistemas de productividad que de verdad funcionan y enfoques suaves para planificar y organizarte.',
  alternates: {
    canonical: 'https://bloomfocus.org/es/blog',
    languages: { en: 'https://bloomfocus.org/blog', de: 'https://bloomfocus.org/de/blog', fr: 'https://bloomfocus.org/fr/blog', es: 'https://bloomfocus.org/es/blog' },
  },
}

export default function BlogListPage() {
  return <BlogList lang="es" />
}
