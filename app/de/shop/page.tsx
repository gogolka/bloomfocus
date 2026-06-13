import type { Metadata } from 'next'
import ShopContent from '@/components/ShopContent'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Shop — ADHS-Planer & Toolkits',
  description: 'Entdecke alle bloom focus Produkte – druckbare Planer, Gewohnheits-Tracker, Dopamin-Menüs und mehr. Für ADHS-Gehirne gemacht.',
  alternates: {
    canonical: 'https://bloomfocus.org/de/shop',
    languages: { en: 'https://bloomfocus.org/shop', de: 'https://bloomfocus.org/de/shop', fr: 'https://bloomfocus.org/fr/shop', es: 'https://bloomfocus.org/es/shop' },
  },
}

export default function ShopDe() {
  return <ShopContent lang="de" />
}
