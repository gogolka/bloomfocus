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

/**
 * Hub intro copy, per locale. Two to four sentences that say why the cluster
 * exists and what a reader will find, rather than "articles about X" — the hub
 * has to read as a real page to establish topical authority.
 */
export const topicIntro: Record<Lang, Record<TopicSlug, string>> = {
  en: {
    'adhd-basics': 'ADHD is one of the most talked-about and least accurately described conditions there is. This is the plain-language starting point: what it actually is, how it shows up, and why the name itself is misleading. Start here if you are trying to understand ADHD for the first time, or trying to explain it to someone else.',
    'diagnosis-and-treatment': 'Getting assessed is often the easiest decision and the hardest process. These articles cover what an evaluation actually involves, who can carry one out, how long it tends to take, and what the options look like afterwards — including medication, explained without hype or alarm.',
    'focus-and-executive-function': 'The hardest parts of ADHD are rarely about attention itself. They are about starting, switching and finishing — the machinery that turns intention into action. These articles cover time blindness, task paralysis, hyperfocus and the executive functions underneath all of them.',
    'emotions-and-burnout': 'Emotional intensity is one of the most disruptive parts of ADHD and one of the least discussed at diagnosis. These articles cover rejection sensitivity, emotional dysregulation, anxiety, masking, and the burnout that follows months of compensating for a brain that was never accommodated.',
    'daily-life': 'The ordinary friction of an ADHD day rarely gets written about kindly. Cleaning, sleep, food, money, replying to messages, the hobbies that stopped after three weeks — these articles take the everyday stuff seriously, and explain why it is genuinely harder rather than suggesting you simply try more.',
    'tools-and-systems': 'Most productivity advice assumes a brain that generates its own structure. These articles cover the methods that work the other way round — dopamine menus, habit stacking, body doubling, energy-based planning and planners that survive past week two, all built around how ADHD attention actually behaves.',
    'who-has-adhd': 'ADHD was studied for decades almost entirely in hyperactive young boys, and the diagnostic picture still carries that bias. These articles cover how it shows up differently in women, in children, in adults diagnosed late, and in the kids who were labelled gifted before anyone looked closer.',
    'co-occurring-and-sensory': 'ADHD rarely arrives on its own. These articles cover the conditions that most often sit alongside it — autism and AuDHD, OCD — and the sensory sensitivity that shapes daily life for many people with ADHD even though it appears on no diagnostic checklist.',
  },
  de: {
    'adhd-basics': 'ADHS wird viel besprochen und selten genau beschrieben. Hier ist der Einstieg in klarer Sprache: was ADHS tatsächlich ist, wie es sich zeigt und warum der Name selbst in die Irre führt. Beginne hier, wenn du ADHS zum ersten Mal verstehen oder es jemandem erklären willst.',
    'diagnosis-and-treatment': 'Die Entscheidung zur Abklärung ist oft der leichteste Teil, der Prozess der schwerste. Diese Artikel erklären, was eine Diagnostik umfasst, wer sie durchführt, wie lange sie dauert und welche Möglichkeiten danach bestehen — einschließlich Medikation, sachlich erklärt.',
    'focus-and-executive-function': 'Das Schwierigste an ADHS ist selten die Aufmerksamkeit selbst, sondern das Anfangen, Wechseln und Beenden. Diese Artikel behandeln Zeitblindheit, Aufgabenlähmung, Hyperfokus und die exekutiven Funktionen, die darunter liegen.',
    'emotions-and-burnout': 'Emotionale Intensität gehört zu den störendsten und bei der Diagnose am wenigsten erwähnten Seiten von ADHS. Diese Artikel behandeln Rejection Sensitivity, emotionale Dysregulation, Angst, Masking und den Burnout nach Monaten des Kompensierens.',
    'daily-life': 'Über die alltägliche Reibung eines ADHS-Tages wird selten freundlich geschrieben. Putzen, Schlaf, Essen, Geld, Nachrichten beantworten, Hobbys die nach drei Wochen endeten — diese Artikel nehmen den Alltag ernst und erklären, warum er wirklich schwerer ist.',
    'tools-and-systems': 'Die meisten Produktivitätstipps setzen ein Gehirn voraus, das Struktur selbst erzeugt. Diese Artikel behandeln Methoden, die andersherum funktionieren: Dopamin-Menüs, Habit Stacking, Body Doubling und Planer, die länger als zwei Wochen halten.',
    'who-has-adhd': 'ADHS wurde jahrzehntelang fast nur an hyperaktiven Jungen erforscht, und das diagnostische Bild trägt diese Verzerrung bis heute. Diese Artikel zeigen, wie es sich bei Frauen, Kindern, spät diagnostizierten Erwachsenen und einst „hochbegabten“ Kindern anders zeigt.',
    'co-occurring-and-sensory': 'ADHS kommt selten allein. Diese Artikel behandeln die häufigsten Begleiterkrankungen — Autismus und AuDHS, Zwangsstörung — sowie die Reizempfindlichkeit, die den Alltag vieler Betroffener prägt, obwohl sie auf keiner Diagnoseliste steht.',
  },
  fr: {
    'adhd-basics': "Le TDAH est l'un des troubles dont on parle le plus et que l'on décrit le moins précisément. Voici le point de départ en langage clair : ce que c'est réellement, comment cela se manifeste, et pourquoi le nom lui-même induit en erreur. Commencez ici si vous cherchez à comprendre le TDAH ou à l'expliquer à quelqu'un.",
    'diagnosis-and-treatment': "Décider de se faire évaluer est souvent le plus simple ; la démarche, le plus difficile. Ces articles expliquent ce qu'implique une évaluation, qui la réalise, combien de temps elle prend, et quelles options existent ensuite — y compris les traitements, expliqués sans exagération.",
    'focus-and-executive-function': "Le plus dur dans le TDAH concerne rarement l'attention elle-même, mais le fait de commencer, de changer de tâche et de finir. Ces articles traitent de la cécité temporelle, de la paralysie décisionnelle, de l'hyperfocalisation et des fonctions exécutives sous-jacentes.",
    'emotions-and-burnout': "L'intensité émotionnelle est l'un des aspects les plus perturbants du TDAH et l'un des moins évoqués au diagnostic. Ces articles traitent de la dysphorie sensible au rejet, de la dysrégulation émotionnelle, de l'anxiété, du masking et du burnout qui suit des mois de compensation.",
    'daily-life': "On écrit rarement avec bienveillance sur les frictions ordinaires d'une journée avec TDAH. Ménage, sommeil, alimentation, argent, messages sans réponse, loisirs abandonnés au bout de trois semaines : ces articles prennent le quotidien au sérieux et expliquent pourquoi il est réellement plus difficile.",
    'tools-and-systems': "La plupart des conseils de productivité supposent un cerveau qui produit sa propre structure. Ces articles présentent les méthodes qui fonctionnent dans l'autre sens : menus à dopamine, empilement d'habitudes, body doubling et agendas qui survivent à la deuxième semaine.",
    'who-has-adhd': "Le TDAH a été étudié pendant des décennies presque uniquement chez de jeunes garçons hyperactifs, et le tableau diagnostique en porte encore la trace. Ces articles montrent comment il se manifeste autrement chez les femmes, les enfants, les adultes diagnostiqués tard et les anciens « enfants surdoués ».",
    'co-occurring-and-sensory': "Le TDAH arrive rarement seul. Ces articles traitent des troubles qui l'accompagnent le plus souvent — autisme et AuDHD, TOC — ainsi que de l'hypersensibilité sensorielle qui façonne le quotidien de beaucoup, bien qu'elle ne figure sur aucune liste diagnostique.",
  },
  es: {
    'adhd-basics': 'El TDAH es uno de los trastornos de los que más se habla y que peor se describe. Este es el punto de partida en lenguaje claro: qué es realmente, cómo se manifiesta y por qué el propio nombre confunde. Empieza aquí si quieres entender el TDAH por primera vez o explicárselo a alguien.',
    'diagnosis-and-treatment': 'Decidir evaluarse suele ser lo fácil; el proceso, lo difícil. Estos artículos explican en qué consiste una evaluación, quién puede hacerla, cuánto suele tardar y qué opciones hay después — incluida la medicación, explicada sin alarmismo.',
    'focus-and-executive-function': 'Lo más difícil del TDAH rara vez es la atención en sí, sino empezar, cambiar de tarea y terminar. Estos artículos tratan la ceguera temporal, la parálisis ante tareas, el hiperfoco y las funciones ejecutivas que hay debajo.',
    'emotions-and-burnout': 'La intensidad emocional es una de las partes más incapacitantes del TDAH y de las que menos se mencionan en el diagnóstico. Estos artículos tratan la disforia sensible al rechazo, la desregulación emocional, la ansiedad, el enmascaramiento y el burnout posterior.',
    'daily-life': 'Rara vez se escribe con amabilidad sobre la fricción cotidiana de un día con TDAH. Limpiar, dormir, comer, el dinero, responder mensajes, las aficiones que duraron tres semanas: estos artículos se toman en serio lo cotidiano y explican por qué cuesta de verdad.',
    'tools-and-systems': 'La mayoría de los consejos de productividad dan por hecho un cerebro que genera su propia estructura. Estos artículos recogen los métodos que funcionan al revés: menús de dopamina, encadenamiento de hábitos, body doubling y agendas que sobreviven a la segunda semana.',
    'who-has-adhd': 'El TDAH se estudió durante décadas casi solo en niños hiperactivos, y el cuadro diagnóstico aún arrastra ese sesgo. Estos artículos muestran cómo se manifiesta distinto en mujeres, en niños, en adultos diagnosticados tarde y en quienes fueron etiquetados como superdotados.',
    'co-occurring-and-sensory': 'El TDAH rara vez llega solo. Estos artículos tratan las condiciones que más a menudo lo acompañan — autismo y AuDHD, TOC — y la sensibilidad sensorial que marca el día a día de muchas personas aunque no figure en ninguna lista diagnóstica.',
  },
}

/**
 * Hub meta descriptions, written around how people actually search the topic
 * rather than around the topic's name — "adhd cleaning tips" and "why can't I
 * start tasks" are the queries these pages have a chance at, not "daily life".
 */
export const topicMeta: Record<Lang, Record<TopicSlug, string>> = {
  en: {
    'adhd-basics': 'What ADHD is, what the symptoms look like in real life, the three types, and whether it can be cured — clear answers without jargon or stereotypes.',
    'diagnosis-and-treatment': 'How ADHD assessment actually works, what to expect from an evaluation, waiting times and referral routes, and a plain-language guide to ADHD medication.',
    'focus-and-executive-function': "Why you can't start tasks even when you want to: time blindness, ADHD paralysis, hyperfocus, executive dysfunction and transitions, explained and worked around.",
    'emotions-and-burnout': 'Rejection sensitive dysphoria, emotional dysregulation, ADHD and anxiety, masking and ADHD burnout — why feelings hit harder, and what actually helps.',
    'daily-life': 'ADHD cleaning tips, doom piles, forgetting to eat, object permanence, waiting mode and the hobby graveyard — practical help for the everyday stuff.',
    'tools-and-systems': 'Dopamine menus, habit stacking, body doubling and the best planner setup for ADHD — tools built around how ADHD attention actually works.',
    'who-has-adhd': 'ADHD in women, ADHD in children, adult and late-diagnosed ADHD, high-functioning ADHD and gifted-kid burnout — how it looks in the people research missed.',
    'co-occurring-and-sensory': 'ADHD and autism (AuDHD), ADHD and OCD, and ADHD sensory sensitivity — how overlapping conditions change the picture and what to raise with a clinician.',
  },
  de: {
    'adhd-basics': 'Was ADHS ist, wie die Symptome im Alltag aussehen, die drei Typen und ob es heilbar ist — klare Antworten ohne Fachjargon und Klischees.',
    'diagnosis-and-treatment': 'Wie eine ADHS-Diagnostik abläuft, was dich erwartet, Wartezeiten und Überweisungswege sowie ein verständlicher Überblick über ADHS-Medikamente.',
    'focus-and-executive-function': 'Warum Anfangen nicht klappt, obwohl du willst: Zeitblindheit, ADHS-Lähmung, Hyperfokus, exekutive Dysfunktion und Übergänge — erklärt und umgangen.',
    'emotions-and-burnout': 'Rejection Sensitive Dysphoria, emotionale Dysregulation, ADHS und Angst, Masking und ADHS-Burnout — warum Gefühle härter treffen und was hilft.',
    'daily-life': 'ADHS und Putzen, Doom Piles, Essen vergessen, Objektpermanenz, Wartemodus und der Hobby-Friedhof — praktische Hilfe für den Alltag.',
    'tools-and-systems': 'Dopamin-Menü, Habit Stacking, Body Doubling und der passende Planer bei ADHS — Werkzeuge, die zur ADHS-Aufmerksamkeit passen.',
    'who-has-adhd': 'ADHS bei Frauen, bei Kindern, bei spät diagnostizierten Erwachsenen, High-Functioning ADHS und Gifted-Kid-Burnout — die übersehenen Verläufe.',
    'co-occurring-and-sensory': 'ADHS und Autismus (AuDHS), ADHS und Zwangsstörung sowie Reizempfindlichkeit — wie Begleiterkrankungen das Bild verändern.',
  },
  fr: {
    'adhd-basics': "Ce qu'est le TDAH, à quoi ressemblent les symptômes au quotidien, les trois types et s'il se guérit — des réponses claires, sans jargon ni clichés.",
    'diagnosis-and-treatment': "Comment se déroule une évaluation TDAH, à quoi s'attendre, délais et parcours d'orientation, et un guide clair sur les traitements du TDAH.",
    'focus-and-executive-function': "Pourquoi commencer est impossible même quand on le veut : cécité temporelle, paralysie TDAH, hyperfocalisation, dysfonction exécutive et transitions.",
    'emotions-and-burnout': "Dysphorie sensible au rejet, dysrégulation émotionnelle, TDAH et anxiété, masking et burnout TDAH — pourquoi les émotions frappent plus fort.",
    'daily-life': "TDAH et ménage, piles de désordre, oublier de manger, permanence de l'objet, mode attente et loisirs abandonnés — de l'aide concrète au quotidien.",
    'tools-and-systems': "Menu à dopamine, empilement d'habitudes, body doubling et le bon agenda pour le TDAH — des outils adaptés au fonctionnement réel de l'attention.",
    'who-has-adhd': "TDAH chez les femmes, chez l'enfant, à l'âge adulte et diagnostiqué tard, TDAH « haut niveau de fonctionnement » et burnout des enfants surdoués.",
    'co-occurring-and-sensory': "TDAH et autisme (AuDHD), TDAH et TOC, hypersensibilité sensorielle — comment les troubles associés changent le tableau clinique.",
  },
  es: {
    'adhd-basics': 'Qué es el TDAH, cómo son los síntomas en la vida real, los tres tipos y si tiene cura — respuestas claras, sin tecnicismos ni estereotipos.',
    'diagnosis-and-treatment': 'Cómo es realmente una evaluación de TDAH, qué esperar, tiempos de espera y vías de derivación, y una guía clara sobre la medicación.',
    'focus-and-executive-function': 'Por qué no puedes empezar aunque quieras: ceguera temporal, parálisis por TDAH, hiperfoco, disfunción ejecutiva y transiciones.',
    'emotions-and-burnout': 'Disforia sensible al rechazo, desregulación emocional, TDAH y ansiedad, enmascaramiento y burnout — por qué las emociones golpean más fuerte.',
    'daily-life': 'TDAH y limpieza, montones de cosas, olvidar comer, permanencia del objeto, modo espera y aficiones abandonadas — ayuda práctica para lo cotidiano.',
    'tools-and-systems': 'Menú de dopamina, encadenamiento de hábitos, body doubling y la agenda adecuada para el TDAH — herramientas adaptadas a cómo funciona la atención.',
    'who-has-adhd': 'TDAH en mujeres, en niños, en adultos con diagnóstico tardío, TDAH de alto funcionamiento y el burnout de los niños superdotados.',
    'co-occurring-and-sensory': 'TDAH y autismo (AuDHD), TDAH y TOC, y sensibilidad sensorial — cómo los trastornos asociados cambian el panorama.',
  },
}
