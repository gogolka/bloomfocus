import type { Metadata } from 'next'
import HomeContent from '@/components/HomeContent'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'bloom focus — Boîte à outils TDAH & agendas',
  description: "Des outils d'organisation pensés pour les cerveaux TDAH. Agendas à imprimer, suivis d'habitudes, menus dopamine – sans honte, en douceur et vraiment utiles.",
  alternates: {
    canonical: 'https://bloomfocus.org/fr',
    languages: { en: 'https://bloomfocus.org', de: 'https://bloomfocus.org/de', fr: 'https://bloomfocus.org/fr', es: 'https://bloomfocus.org/es' },
  },
}

export default function HomeFr() {
  return <HomeContent lang="fr" />
}
