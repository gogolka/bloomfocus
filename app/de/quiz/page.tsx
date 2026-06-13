import type { Metadata } from 'next'
import ADHDQuiz from '@/components/ADHDQuiz'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Kostenloser ADHS-Test — Finde deinen ADHS-Typ (unaufmerksam, hyperaktiv, Mischtyp)',
  description: 'Mach den kostenlosen ADHS-Selbsttest mit 40 Fragen auf Basis der DSM-5-Kriterien. Finde in etwa 5 Minuten heraus, ob deine Muster zu ADHS passen und welcher Typ zu dir passt. Keine Diagnose.',
  keywords: ['ADHS Test', 'ADHS Selbsttest', 'habe ich ADHS', 'ADHS Typ Test', 'ADHS Test Erwachsene', 'kostenloser ADHS Test'],
  alternates: {
    canonical: 'https://bloomfocus.org/de/quiz',
    languages: { en: 'https://bloomfocus.org/quiz', de: 'https://bloomfocus.org/de/quiz', fr: 'https://bloomfocus.org/fr/quiz', es: 'https://bloomfocus.org/es/quiz' },
  },
  openGraph: { title: 'Kostenloser ADHS-Test — Finde deinen ADHS-Typ', description: 'Ein sanfter ADHS-Selbsttest in 5 Minuten auf Basis der DSM-5-Kriterien.', url: 'https://bloomfocus.org/de/quiz', type: 'website' },
}

export default function QuizDe() {
  return <ADHDQuiz lang="de" />
}
