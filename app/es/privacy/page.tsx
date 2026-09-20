import type { Metadata } from 'next'
import PrivacyContent from '@/components/PrivacyContent'
import { privacyDict } from '@/lib/privacy-i18n'

const t = privacyDict['es']

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: {
    canonical: 'https://bloomfocus.org/es/privacy',
    languages: {
      en: 'https://bloomfocus.org/privacy',
      de: 'https://bloomfocus.org/de/privacy',
      fr: 'https://bloomfocus.org/fr/privacy',
      es: 'https://bloomfocus.org/es/privacy',
    },
  },
}

export default function PrivacyPage() {
  return <PrivacyContent lang="es" />
}
