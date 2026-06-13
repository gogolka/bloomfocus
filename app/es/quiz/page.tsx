import type { Metadata } from 'next'
import ADHDQuiz from '@/components/ADHDQuiz'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Test de TDAH gratuito — Descubre tu tipo de TDAH (inatento, hiperactivo, combinado)',
  description: 'Haz el test de TDAH gratuito de 40 preguntas basado en los criterios del DSM-5. Descubre en unos 5 minutos si tus patrones encajan con el TDAH y qué tipo te describe. No es un diagnóstico.',
  keywords: ['test TDAH', 'test TDAH gratis', 'tengo TDAH', 'test tipo TDAH', 'test TDAH adultos', 'autoevaluación TDAH'],
  alternates: {
    canonical: 'https://bloomfocus.org/es/quiz',
    languages: { en: 'https://bloomfocus.org/quiz', de: 'https://bloomfocus.org/de/quiz', fr: 'https://bloomfocus.org/fr/quiz', es: 'https://bloomfocus.org/es/quiz' },
  },
  openGraph: { title: 'Test de TDAH gratuito — Descubre tu tipo de TDAH', description: 'Un test de TDAH suave en 5 minutos, basado en los criterios del DSM-5.', url: 'https://bloomfocus.org/es/quiz', type: 'website' },
}

export default function QuizEs() {
  return <ADHDQuiz lang="es" />
}
