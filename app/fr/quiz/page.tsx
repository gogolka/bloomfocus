import type { Metadata } from 'next'
import ADHDQuiz from '@/components/ADHDQuiz'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Test TDAH gratuit — Découvre ton type de TDAH (inattentif, hyperactif, combiné)',
  description: 'Fais le test TDAH gratuit de 40 questions fondé sur les critères du DSM-5. Découvre en 5 minutes si tes schémas correspondent au TDAH et quel type te correspond. Pas un diagnostic.',
  keywords: ['test TDAH', 'test TDAH gratuit', 'ai-je un TDAH', 'test type TDAH', 'test TDAH adulte', 'auto-évaluation TDAH'],
  alternates: {
    canonical: 'https://bloomfocus.org/fr/quiz',
    languages: { en: 'https://bloomfocus.org/quiz', de: 'https://bloomfocus.org/de/quiz', fr: 'https://bloomfocus.org/fr/quiz', es: 'https://bloomfocus.org/es/quiz' },
  },
  openGraph: { title: 'Test TDAH gratuit — Découvre ton type de TDAH', description: 'Un test TDAH tout en douceur en 5 minutes, fondé sur les critères du DSM-5.', url: 'https://bloomfocus.org/fr/quiz', type: 'website' },
}

export default function QuizFr() {
  return <ADHDQuiz lang="fr" />
}
