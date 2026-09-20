import type { Lang } from '@/lib/i18n'

// Topic taxonomy for the blog.
//
// This replaces the old two-tag split ("Understanding ADHD" / "Tools & Tips"),
// which put 34 of 43 articles in one bucket — a hub page that was effectively a
// copy of /blog and had nothing specific to rank for. Eight topics give each
// hub a distinct search intent.
//
// Pill colours are part of the topic, not of the article: they used to be
// duplicated on every article entry and had already drifted (one Tools & Tips
// article was green while the rest were peach). Every text/background pair here
// clears 4.5:1 — the old pills did not (the lavender pair was 3.75:1).

export interface Topic {
  /** URL segment under /blog/topic/ */
  slug: string
  label: string
  /** Hub intro and meta description. */
  description: string
  color: string
  textColor: string
}

export const topics = [
  {
    slug: 'adhd-basics',
    label: 'ADHD Basics',
    description: 'What ADHD actually is, what it looks like, and who it affects — the plain-language starting point, without the jargon or the stereotypes.',
    color: '#E8DEFF',
    textColor: '#5F46A0',
  },
  {
    slug: 'diagnosis-and-treatment',
    label: 'Diagnosis & Treatment',
    description: 'Getting assessed, what the process involves, and what the options are afterwards — including medication, explained without hype or alarm.',
    color: '#D4EEFF',
    textColor: '#1F5675',
  },
  {
    slug: 'focus-and-executive-function',
    label: 'Focus & Executive Function',
    description: 'Why starting, switching and finishing are the hard parts — time blindness, task paralysis, hyperfocus, and the machinery underneath them.',
    color: '#D4C5F9',
    textColor: '#4A3080',
  },
  {
    slug: 'emotions-and-burnout',
    label: 'Emotions & Burnout',
    description: 'Rejection sensitivity, emotional intensity, anxiety, masking and the collapse that follows months of overcompensating.',
    color: '#FFE8E8',
    textColor: '#9B3535',
  },
  {
    slug: 'daily-life',
    label: 'Daily Life',
    description: 'The ordinary friction that rarely gets written about kindly — cleaning, sleep, food, money, replying to messages, abandoned hobbies.',
    color: '#FFD6C4',
    textColor: '#8A4418',
  },
  {
    slug: 'tools-and-systems',
    label: 'Tools & Systems',
    description: 'Methods that work with an ADHD brain instead of against it: dopamine menus, habit stacking, body doubling, and planners that survive week two.',
    color: '#D4E8D4',
    textColor: '#2C6630',
  },
  {
    slug: 'who-has-adhd',
    label: 'Who Has ADHD',
    description: 'How ADHD shows up differently in women, in children, in adults diagnosed late, and in the kids who were called gifted first.',
    color: '#FFBFA8',
    textColor: '#7A3512',
  },
  {
    slug: 'co-occurring-and-sensory',
    label: 'Co-occurring & Sensory',
    description: 'ADHD rarely arrives alone. Autism and AuDHD, OCD, and the sensory sensitivity that sits alongside all of it.',
    color: '#B8D4B8',
    textColor: '#245424',
  },
] as const satisfies readonly Topic[]

export type TopicSlug = (typeof topics)[number]['slug']

const BY_SLUG = new Map<string, Topic>(topics.map(t => [t.slug, t]))

export function topicBySlug(slug: string): Topic | undefined {
  return BY_SLUG.get(slug)
}

/**
 * Topic labels per locale. The hub pages are English-only for now, but the
 * topic pill appears on every article in every locale, so the label has to be
 * translated even where the hub is not yet built.
 */
export const topicLabels: Record<Lang, Record<TopicSlug, string>> = {
  en: {
    'adhd-basics': 'ADHD Basics',
    'diagnosis-and-treatment': 'Diagnosis & Treatment',
    'focus-and-executive-function': 'Focus & Executive Function',
    'emotions-and-burnout': 'Emotions & Burnout',
    'daily-life': 'Daily Life',
    'tools-and-systems': 'Tools & Systems',
    'who-has-adhd': 'Who Has ADHD',
    'co-occurring-and-sensory': 'Co-occurring & Sensory',
  },
  de: {
    'adhd-basics': 'ADHS-Grundlagen',
    'diagnosis-and-treatment': 'Diagnose & Behandlung',
    'focus-and-executive-function': 'Fokus & Exekutivfunktionen',
    'emotions-and-burnout': 'Gefühle & Burnout',
    'daily-life': 'Alltag',
    'tools-and-systems': 'Tools & Systeme',
    'who-has-adhd': 'Wer ADHS hat',
    'co-occurring-and-sensory': 'Begleiterkrankungen & Reizverarbeitung',
  },
  fr: {
    'adhd-basics': 'Les bases du TDAH',
    'diagnosis-and-treatment': 'Diagnostic & traitement',
    'focus-and-executive-function': 'Concentration & fonctions exécutives',
    'emotions-and-burnout': 'Émotions & burnout',
    'daily-life': 'Vie quotidienne',
    'tools-and-systems': 'Outils & systèmes',
    'who-has-adhd': 'Qui a un TDAH',
    'co-occurring-and-sensory': 'Troubles associés & sensorialité',
  },
  es: {
    'adhd-basics': 'Conceptos básicos del TDAH',
    'diagnosis-and-treatment': 'Diagnóstico y tratamiento',
    'focus-and-executive-function': 'Concentración y función ejecutiva',
    'emotions-and-burnout': 'Emociones y burnout',
    'daily-life': 'Vida diaria',
    'tools-and-systems': 'Herramientas y sistemas',
    'who-has-adhd': 'Quién tiene TDAH',
    'co-occurring-and-sensory': 'Trastornos asociados y sensorialidad',
  },
}

/** Takes a plain string so callers holding a Topic (whose slug is widened to
 *  string) do not need a cast; unknown slugs fall back to the slug itself. */
export function topicLabel(slug: string, lang: Lang): string {
  const forLang = topicLabels[lang] as Record<string, string | undefined>
  return forLang[slug] ?? (topicLabels.en as Record<string, string | undefined>)[slug] ?? slug
}

/**
 * A hub with only a couple of live articles is a thin page — the exact thing to
 * avoid before an AdSense review. Below this many published articles a hub
 * stays reachable but is not indexed and is left out of the sitemap; it starts
 * being advertised on its own once the publishing schedule fills it.
 */
export const MIN_ARTICLES_FOR_INDEXING = 3
