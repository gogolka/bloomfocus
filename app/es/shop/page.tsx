import type { Metadata } from 'next'
import ShopContent from '@/components/ShopContent'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Tienda — Agendas y kits TDAH',
  description: 'Explora todos los productos bloom focus: agendas imprimibles, seguimiento de hábitos, menús de dopamina y más. Diseñados para cerebros con TDAH.',
  alternates: {
    canonical: 'https://bloomfocus.org/es/shop',
    languages: { en: 'https://bloomfocus.org/shop', de: 'https://bloomfocus.org/de/shop', fr: 'https://bloomfocus.org/fr/shop', es: 'https://bloomfocus.org/es/shop' },
  },
}

export default function ShopEs() {
  return <ShopContent lang="es" />
}
