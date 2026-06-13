import type { Metadata } from 'next'
import HomeContent from '@/components/HomeContent'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'bloom focus — Kit TDAH y agendas',
  description: 'Herramientas de planificación diseñadas para cerebros con TDAH. Agendas imprimibles, seguimiento de hábitos, menús de dopamina: sin culpa, con calma y de verdad útiles.',
  alternates: {
    canonical: 'https://bloomfocus.org/es',
    languages: { en: 'https://bloomfocus.org', de: 'https://bloomfocus.org/de', fr: 'https://bloomfocus.org/fr', es: 'https://bloomfocus.org/es' },
  },
}

export default function HomeEs() {
  return <HomeContent lang="es" />
}
