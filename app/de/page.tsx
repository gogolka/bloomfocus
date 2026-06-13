import type { Metadata } from 'next'
import HomeContent from '@/components/HomeContent'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'bloom focus — ADHS-Toolkit & Planer',
  description: 'Planungstools für ADHS-Gehirne. Druckbare Planer, Gewohnheits-Tracker, Dopamin-Menüs – ohne Scham, sanft und wirklich hilfreich.',
  alternates: {
    canonical: 'https://bloomfocus.org/de',
    languages: { en: 'https://bloomfocus.org', de: 'https://bloomfocus.org/de', fr: 'https://bloomfocus.org/fr', es: 'https://bloomfocus.org/es' },
  },
}

export default function HomeDe() {
  return <HomeContent lang="de" />
}
