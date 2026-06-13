import type { Metadata } from 'next'
import ShopContent from '@/components/ShopContent'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Boutique — Agendas & kits TDAH',
  description: "Découvre tous les produits bloom focus – agendas à imprimer, suivis d'habitudes, menus dopamine et plus encore. Pensés pour les cerveaux TDAH.",
  alternates: {
    canonical: 'https://bloomfocus.org/fr/shop',
    languages: { en: 'https://bloomfocus.org/shop', de: 'https://bloomfocus.org/de/shop', fr: 'https://bloomfocus.org/fr/shop', es: 'https://bloomfocus.org/es/shop' },
  },
}

export default function ShopFr() {
  return <ShopContent lang="fr" />
}
