import type { Lang } from '@/lib/i18n'
import { articleContentEN } from '@/lib/article-content'

export interface BlogChromeDict {
  eyebrow: string
  h1pre: string
  h1em: string
  sub: string
  backToBlog: string
  ctaTitle: string
  ctaSub: string
  ctaShop: string
  ctaQuiz: string
  more: string
}

export const blogChrome: Record<Lang, BlogChromeDict> = {
  en: {
    eyebrow: `bloom focus blog`, h1pre: `Understanding your `, h1em: `ADHD brain`,
    sub: `No jargon, no shame, no "just try harder." Real information about how neurodivergent brains work — and what actually helps.`,
    backToBlog: `← Back to blog`, ctaTitle: `Ready to try tools that actually work?`,
    ctaSub: `Browse the bloom focus toolkit — designed for ADHD brains, built with care.`,
    ctaShop: `Shop the toolkit ✨`, ctaQuiz: `Take the free ADHD test 🧠`, more: `More from the blog`,
  },
  de: {
    eyebrow: `bloom focus Blog`, h1pre: `Verstehe dein `, h1em: `ADHS-Gehirn`,
    sub: `Kein Fachjargon, keine Scham, kein „streng dich einfach mehr an". Echte Informationen darüber, wie neurodivergente Gehirne funktionieren – und was wirklich hilft.`,
    backToBlog: `← Zurück zum Blog`, ctaTitle: `Bereit für Werkzeuge, die wirklich funktionieren?`,
    ctaSub: `Entdecke das bloom focus Toolkit – für ADHS-Köpfe gestaltet, mit Sorgfalt gemacht.`,
    ctaShop: `Zum Toolkit ✨`, ctaQuiz: `Kostenlosen ADHS-Test machen 🧠`, more: `Mehr aus dem Blog`,
  },
  fr: {
    eyebrow: `blog bloom focus`, h1pre: `Comprendre ton `, h1em: `cerveau TDAH`,
    sub: `Pas de jargon, pas de honte, pas de « fais juste plus d'efforts ». De vraies informations sur le fonctionnement des cerveaux neurodivergents – et ce qui aide vraiment.`,
    backToBlog: `← Retour au blog`, ctaTitle: `Prêt·e à essayer des outils qui marchent vraiment ?`,
    ctaSub: `Découvre la boîte à outils bloom focus – pensée pour les cerveaux TDAH, conçue avec soin.`,
    ctaShop: `Découvrir les outils ✨`, ctaQuiz: `Faire le test TDAH gratuit 🧠`, more: `Plus d'articles du blog`,
  },
  es: {
    eyebrow: `blog bloom focus`, h1pre: `Entender tu `, h1em: `cerebro con TDAH`,
    sub: `Sin jerga, sin culpa, sin «solo esfuérzate más». Información real sobre cómo funcionan los cerebros neurodivergentes, y qué ayuda de verdad.`,
    backToBlog: `← Volver al blog`, ctaTitle: `¿Listo·a para probar herramientas que de verdad funcionan?`,
    ctaSub: `Explora el kit bloom focus: diseñado para cerebros con TDAH, hecho con cariño.`,
    ctaShop: `Ver las herramientas ✨`, ctaQuiz: `Hacer el test TDAH gratis 🧠`, more: `Más del blog`,
  },
}

// English blog tag -> localized
export const blogTagMap: Record<Lang, Record<string, string>> = {
  en: {},
  de: { 'Understanding ADHD': `ADHS verstehen`, 'Tools & Tips': `Tools & Tipps` },
  fr: { 'Understanding ADHD': `Comprendre le TDAH`, 'Tools & Tips': `Outils & astuces` },
  es: { 'Understanding ADHD': `Entender el TDAH`, 'Tools & Tips': `Herramientas y consejos` },
}

// Localized title + excerpt per slug (en comes from lib/articles).
export const articleMeta: Record<string, Partial<Record<Lang, { title: string; excerpt: string }>>> = {
  'why-adhd-brains-struggle-with-planning': {
    de: { title: `Warum ADHS-Gehirne mit Planung kämpfen (und was wirklich hilft)`, excerpt: `Planung fühlt sich unmöglich an – nicht weil du faul bist, sondern weil dein Gehirn anders verdrahtet ist. Hier ist die Wissenschaft dahinter und was du tun kannst.` },
    fr: { title: `Pourquoi les cerveaux TDAH peinent à planifier (et ce qui aide vraiment)`, excerpt: `Planifier semble impossible – non parce que tu es paresseux·se, mais parce que ton cerveau est câblé différemment. Voici la science, et ce que tu peux y faire.` },
    es: { title: `Por qué a los cerebros con TDAH les cuesta planificar (y qué ayuda de verdad)`, excerpt: `Planificar parece imposible, no porque seas perezoso·a, sino porque tu cerebro está cableado de otra forma. Aquí tienes la ciencia y qué puedes hacer.` },
  },
  'dopamine-menu-guide': {
    de: { title: `Was ist ein Dopamin-Menü und wie erstellst du eines, das funktioniert`, excerpt: `Ein Dopamin-Menü ist eines der wirksamsten ADHS-Werkzeuge – und überraschend einfach. So baust du deins.` },
    fr: { title: `Qu'est-ce qu'un menu dopamine et comment en créer un qui marche`, excerpt: `Le menu dopamine est l'un des outils TDAH les plus efficaces – et étonnamment simple. Voici comment créer le tien.` },
    es: { title: `Qué es un menú de dopamina y cómo crear uno que funcione`, excerpt: `Un menú de dopamina es una de las herramientas TDAH más eficaces, y sorprendentemente simple. Así creas el tuyo.` },
  },
  'time-blindness-adhd': {
    de: { title: `Zeitblindheit: Warum du das Vergehen der Zeit nicht spürst (und was hilft)`, excerpt: `Zeitblindheit ist eines der am meisten missverstandenen ADHS-Symptome. Es geht nicht um Verantwortungslosigkeit – es ist neurologisch.` },
    fr: { title: `Cécité temporelle : pourquoi tu ne sens pas le temps passer (et ce qui aide)`, excerpt: `La cécité temporelle est l'un des symptômes du TDAH les plus mal compris. Ce n'est pas de l'irresponsabilité – c'est neurologique.` },
    es: { title: `Ceguera temporal: por qué no sientes pasar el tiempo (y qué ayuda)`, excerpt: `La ceguera temporal es uno de los síntomas del TDAH más malinterpretados. No es irresponsabilidad: es neurológico.` },
  },
  'habit-stacking-adhd': {
    de: { title: `Habit Stacking bei ADHS: Routinen aufbauen, die wirklich bleiben`, excerpt: `Die meisten Gewohnheits-Tipps versagen bei ADHS-Köpfen. Hier ist ein sanfterer Ansatz, der mit deinem Gehirn arbeitet.` },
    fr: { title: `Habit stacking et TDAH : construire des routines qui tiennent vraiment`, excerpt: `La plupart des conseils sur les habitudes échouent avec les cerveaux TDAH. Voici une approche plus douce, adaptée à ton fonctionnement.` },
    es: { title: `Habit stacking y TDAH: crear rutinas que de verdad se quedan`, excerpt: `La mayoría de los consejos sobre hábitos fallan con los cerebros con TDAH. Aquí tienes un enfoque más suave, hecho a tu medida.` },
  },
  'do-i-have-adhd-test': {
    de: { title: `Hast du ADHS? Wie du es erkennst – und was du als Nächstes tust`, excerpt: `Fragst du dich, ob du ADHS hast? Hier sind die Anzeichen, die Erwachsene wirklich erleben, wie sich unaufmerksamer und hyperaktiver Typ unterscheiden, und die nächsten Schritte.` },
    fr: { title: `As-tu un TDAH ? Comment le savoir – et que faire ensuite`, excerpt: `Tu te demandes si tu as un TDAH ? Voici les signes que vivent vraiment les adultes, en quoi les types inattentif et hyperactif diffèrent, et les étapes à suivre.` },
    es: { title: `¿Tienes TDAH? Cómo saberlo y qué hacer después`, excerpt: `¿Te preguntas si tienes TDAH? Aquí están las señales que viven de verdad los adultos, en qué se diferencian el tipo inatento y el hiperactivo, y los pasos a seguir.` },
  },
  'adhd-paralysis': {
    de: { title: `ADHS-Paralyse: Warum du erstarrst – und wie du wieder ins Tun kommst`, excerpt: `Du weißt genau, was zu tun ist, du willst es tun, und kommst trotzdem nicht von der Stelle. Das ist ADHS-Paralyse. Hier ist, warum sie passiert, und sanfte Wege heraus.` },
    fr: { title: `Paralysie TDAH : pourquoi tu te figes – et comment te débloquer`, excerpt: `Tu sais exactement quoi faire, tu veux le faire, et tu n'arrives toujours pas à bouger. C'est la paralysie TDAH. Voici pourquoi elle arrive et des façons douces de briser le gel.` },
    es: { title: `Parálisis por TDAH: por qué te bloqueas y cómo desatascarte`, excerpt: `Sabes exactamente qué hacer, quieres hacerlo y aun así no logras moverte. Eso es la parálisis por TDAH. Aquí está por qué ocurre y formas suaves de romper el bloqueo.` },
  },
  'best-planner-for-adhd': {
    de: { title: `Der beste Planer für ADHS (und warum die meisten Planer dich im Stich lassen)`, excerpt: `Die meisten Planer sind für neurotypische Gehirne gemacht – deshalb verstauben sie ab Woche zwei. Das sollte ein ADHS-freundlicher Planer wirklich können.` },
    fr: { title: `Le meilleur agenda pour le TDAH (et pourquoi la plupart te laissent tomber)`, excerpt: `La plupart des agendas sont pensés pour les cerveaux neurotypiques – d'où la poussière dès la deuxième semaine. Voici ce qu'un agenda adapté au TDAH doit vraiment avoir.` },
    es: { title: `La mejor agenda para el TDAH (y por qué la mayoría te fallan)`, excerpt: `La mayoría de las agendas están hechas para cerebros neurotípicos, por eso acumulan polvo en la segunda semana. Esto es lo que una agenda apta para el TDAH necesita de verdad.` },
  },
  'adhd-in-women': {
    de: { title: `ADHS bei Frauen: Die Anzeichen, die jahrelang übersehen werden`, excerpt: `ADHS bei Frauen wird chronisch unterdiagnostiziert, weil es oft wie Angst, Perfektionismus oder einfach „Zerstreutheit" aussieht. Hier sind die übersehenen Anzeichen.` },
    fr: { title: `Le TDAH chez les femmes : les signes que l'on rate pendant des années`, excerpt: `Le TDAH chez les femmes est chroniquement sous-diagnostiqué car il ressemble souvent à de l'anxiété, du perfectionnisme ou à de la « tête en l'air ». Voici les signes que l'on néglige.` },
    es: { title: `TDAH en mujeres: las señales que se pasan por alto durante años`, excerpt: `El TDAH en mujeres está crónicamente infradiagnosticado porque a menudo parece ansiedad, perfeccionismo o simplemente ser «despistada». Aquí están las señales que se pasan por alto.` },
  },
}

// Localized article bodies (paragraph arrays) per slug. Filled in language by
// language; any slug/lang not present here falls back to the English body.
export const articleBody: Record<string, Partial<Record<Lang, string[]>>> = {}

// ---- helpers ----
export function blogTitle(slug: string, lang: Lang, enTitle: string) {
  if (lang === 'en') return enTitle
  return articleMeta[slug]?.[lang]?.title || enTitle
}
export function blogExcerpt(slug: string, lang: Lang, enExcerpt: string) {
  if (lang === 'en') return enExcerpt
  return articleMeta[slug]?.[lang]?.excerpt || enExcerpt
}
export function blogTag(enTag: string, lang: Lang) {
  if (lang === 'en') return enTag
  return blogTagMap[lang][enTag] || enTag
}
export function blogBody(slug: string, lang: Lang): string[] {
  if (lang !== 'en') {
    const t = articleBody[slug]?.[lang]
    if (t && t.length) return t
  }
  return articleContentEN[slug] || []
}
export function readTimeLabel(lang: Lang, raw: string) {
  const n = parseInt(String(raw).replace(/\D+/g, '')) || 0
  if (lang === 'de') return `${n} Min. Lesezeit`
  if (lang === 'fr') return `${n} min de lecture`
  if (lang === 'es') return `${n} min de lectura`
  return raw
}
