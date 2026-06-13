import type { Metadata } from 'next'
import HomeContent from '@/components/HomeContent'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'bloom focus — ADHD Toolkit & Planners',
  description: 'Planning tools designed for ADHD brains. Printable planners, habit trackers, dopamine menus — shame-free, gentle, and actually helpful.',
  alternates: {
    canonical: 'https://bloomfocus.org',
    languages: {
      en: 'https://bloomfocus.org',
      de: 'https://bloomfocus.org/de',
      fr: 'https://bloomfocus.org/fr',
      es: 'https://bloomfocus.org/es',
    },
  },
}

export default function HomePage() {
  return <HomeContent lang="en" />
}
