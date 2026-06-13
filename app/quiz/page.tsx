import type { Metadata } from 'next'
import ADHDQuiz from '@/components/ADHDQuiz'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Free ADHD Test — Find Your ADHD Type (Inattentive, Hyperactive, Combined)',
  description: 'Take the free 40-question ADHD self-assessment based on DSM-5 criteria. Discover whether your patterns align with ADHD and which type fits you — in about 5 minutes. Not a diagnosis.',
  keywords: ['ADHD test', 'ADHD quiz', 'do I have ADHD', 'ADHD self assessment', 'ADHD type test', 'inattentive ADHD test', 'adult ADHD test', 'free ADHD test'],
  alternates: { canonical: 'https://bloomfocus.org/quiz' },
  openGraph: {
    title: 'Free ADHD Test — Find Your ADHD Type',
    description: 'A gentle, 5-minute ADHD self-assessment based on DSM-5 criteria. Find your type and get tools that fit how your brain works.',
    url: 'https://bloomfocus.org/quiz',
    type: 'website',
  },
}

export default function QuizPage() {
  return <ADHDQuiz />
}
