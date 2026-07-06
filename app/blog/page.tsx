import type { Metadata } from 'next'
import BlogList from '@/components/BlogList'

export const metadata: Metadata = {
  title: 'ADHD Blog — Tips, Guides & Understanding Your Brain',
  description: 'Articles about ADHD, neurodivergence, productivity systems that actually work, and gentle approaches to planning and organization.',
  alternates: {
    canonical: 'https://bloomfocus.org/blog',
    languages: { en: 'https://bloomfocus.org/blog', de: 'https://bloomfocus.org/de/blog', fr: 'https://bloomfocus.org/fr/blog', es: 'https://bloomfocus.org/es/blog' },
  },
}

export default function BlogPage() {
  return <BlogList lang="en" />
}
