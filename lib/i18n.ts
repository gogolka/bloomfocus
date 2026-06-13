// Lightweight i18n for the marketing site. English lives at "/", and de/fr/es
// each get their own route that renders the shared HomeContent with this dict.

export const LOCALES = ['en', 'de', 'fr', 'es'] as const
export type Lang = (typeof LOCALES)[number]

export const LANG_LABEL: Record<Lang, string> = { en: 'EN', de: 'DE', fr: 'FR', es: 'ES' }
export const LANG_PATH: Record<Lang, string> = { en: '/', de: '/de', fr: '/fr', es: '/es' }

export interface HomeDict {
  badge: string
  heroPre: string
  heroEm: string
  heroSub: string
  ctaShop: string
  ctaBlog: string
  chips: string[]
  painEyebrow: string
  painPre: string
  painEm: string
  pains: string[]
  painQuote: string
  productsEyebrow: string
  productsPre: string
  productsEm: string
  products: { title: string; desc: string; tag: string }[]
  viewProduct: string
  seeAll: string
  howEyebrow: string
  howPre: string
  howEm: string
  steps: { title: string; desc: string }[]
  appEyebrow: string
  appPre: string
  appEm: string
  appSub: string
  features: string[]
  tryApp: string
  plantName: string
  plantStage: string
  level: string
  streak: string
  actions: string[]
  blogEyebrow: string
  blogPre: string
  blogEm: string
  allArticles: string
  ctaPre: string
  ctaEm: string
  ctaSub: string
  ctaButton: string
}

export interface NewsletterDict {
  heading: string
  sub: string
  namePlaceholder: string
  emailPlaceholder: string
  subscribe: string
  subscribing: string
  successFull: string
  noSpam: string
  compactLabel: string
  compactSub: string
  compactSuccess: string
}

export const home: Record<Lang, HomeDict> = {
  en: {
    badge: `ADHD Toolkit · bloom focus`,
    heroPre: `Planning that works with your brain, `,
    heroEm: `not against it.`,
    heroSub: `Tools designed for neurodivergent brains — no shame, no pressure, no "just try harder." Finally, a planner your ADHD brain actually wants to use.`,
    ctaShop: `Shop the toolkit ✨`,
    ctaBlog: `Read the blog`,
    chips: [`Neurodivergent-first`, `No shame, no pressure`, `Instant download`, `Warm & structured`],
    painEyebrow: `Sound familiar?`,
    painPre: `Your brain isn't broken. `,
    painEm: `It just needs a different system.`,
    pains: [
      `You start 10 things and finish none of them`,
      `Todo lists make you feel worse, not better`,
      `Time just... disappears, and you don't know where it went`,
      `Your brain won't stop even when you desperately need to rest`,
      `You know what to do — you just can't make yourself start`,
      `You've tried every system. None of them stuck.`,
    ],
    painQuote: `"We're the friend who also has ADHD — who gets it, doesn't judge, and has actually found things that help."`,
    productsEyebrow: `The toolkit`,
    productsPre: `Tools your ADHD brain `,
    productsEm: `actually wants`,
    products: [
      { title: `Dopamine Menu`, desc: `A reward system your ADHD brain will actually use. Pick a treat, no guilt.`, tag: `Instant download` },
      { title: `ADHD Daily Planner`, desc: `Energy-based time blocks. Brain dump space. No shame, no pressure.`, tag: `Printable · PDF` },
      { title: `Habit Tracker`, desc: `Track what matters, not everything. Celebrate every single win.`, tag: `Undated · A4 & Letter` },
      { title: `Weekly Brain Dump`, desc: `Empty your head onto paper. No judgment, no structure needed.`, tag: `Instant download` },
    ],
    viewProduct: `View product →`,
    seeAll: `See all products →`,
    howEyebrow: `How it works`,
    howPre: `Three steps. `,
    howEm: `That's all.`,
    steps: [
      { title: `Choose your tool`, desc: `Browse planners, trackers, and toolkits built for ADHD brains — not against them.` },
      { title: `Download in minutes`, desc: `Instant PDF download. Print at home or use digitally. No waiting, no overwhelm.` },
      { title: `Start with one small step`, desc: `That's it. One step. That's enough. Your brain will do the rest.` },
    ],
    appEyebrow: `Free ADHD toolkit`,
    appPre: `The bloom focus `,
    appEm: `app`,
    appSub: `A free ADHD toolkit that lives in your browser. Tasks, habits, focus timer, brain dump, dopamine menu — all in one place. With streaks, XP, and a plant that grows as you do.`,
    features: [
      `Grow a plant as you complete tasks`,
      `Build streaks and earn XP`,
      `Task manager with micro-steps`,
      `Brain dump → convert to tasks`,
      `Pomodoro timer + habit tracker`,
    ],
    tryApp: `Try the free app →`,
    plantName: `My Brain Plant`,
    plantStage: `Stage: Full Bloom`,
    level: `Level 7 ADHD Brain`,
    streak: `🔥 12 streak`,
    actions: [`Write report intro`, `Drink water`, `25 min focus done`],
    blogEyebrow: `From the blog`,
    blogPre: `Understanding your `,
    blogEm: `ADHD brain`,
    allArticles: `All articles →`,
    ctaPre: `One small step. `,
    ctaEm: `That's enough.`,
    ctaSub: `Your brain isn't broken. It just needs tools built for how it actually works.`,
    ctaButton: `Start with bloom focus ✨`,
  },

  de: {
    badge: `ADHS-Toolkit · bloom focus`,
    heroPre: `Planung, die mit deinem Gehirn arbeitet, `,
    heroEm: `nicht gegen es.`,
    heroSub: `Werkzeuge für neurodivergente Köpfe – ohne Scham, ohne Druck, ohne „streng dich einfach mehr an". Endlich ein Planer, den dein ADHS-Gehirn wirklich nutzen will.`,
    ctaShop: `Zum Toolkit ✨`,
    ctaBlog: `Zum Blog`,
    chips: [`Neurodivergent zuerst`, `Ohne Scham, ohne Druck`, `Sofort-Download`, `Warm & strukturiert`],
    painEyebrow: `Kommt dir das bekannt vor?`,
    painPre: `Dein Gehirn ist nicht kaputt. `,
    painEm: `Es braucht nur ein anderes System.`,
    pains: [
      `Du fängst 10 Dinge an und beendest keines davon`,
      `To-do-Listen machen alles schlimmer, nicht besser`,
      `Die Zeit … verschwindet einfach, und du weißt nicht, wohin`,
      `Dein Kopf kommt nicht zur Ruhe, selbst wenn du dringend Pause brauchst`,
      `Du weißt, was zu tun ist – du kommst nur nicht ins Tun`,
      `Du hast jedes System probiert. Keines ist geblieben.`,
    ],
    painQuote: `„Wir sind die Freundin, die selbst ADHS hat – die es versteht, nicht urteilt und wirklich Dinge gefunden hat, die helfen."`,
    productsEyebrow: `Das Toolkit`,
    productsPre: `Werkzeuge, die dein ADHS-Gehirn `,
    productsEm: `wirklich will`,
    products: [
      { title: `Dopamine Menu`, desc: `Ein Belohnungssystem, das dein ADHS-Gehirn wirklich nutzt. Wähl dir etwas Schönes, ganz ohne schlechtes Gewissen.`, tag: `Sofort-Download` },
      { title: `ADHD Daily Planner`, desc: `Zeitblöcke nach Energie. Platz zum Gedanken-Ausleeren. Ohne Scham, ohne Druck.`, tag: `Druckbar · PDF` },
      { title: `Habit Tracker`, desc: `Verfolge, was zählt – nicht alles. Feiere jeden einzelnen Erfolg.`, tag: `Undatiert · A4 & Letter` },
      { title: `Weekly Brain Dump`, desc: `Leer deinen Kopf aufs Papier. Ohne Urteil, ohne nötige Struktur.`, tag: `Sofort-Download` },
    ],
    viewProduct: `Produkt ansehen →`,
    seeAll: `Alle Produkte ansehen →`,
    howEyebrow: `So funktioniert's`,
    howPre: `Drei Schritte. `,
    howEm: `Mehr nicht.`,
    steps: [
      { title: `Wähl dein Werkzeug`, desc: `Stöbere durch Planer, Tracker und Toolkits, die für ADHS-Köpfe gemacht sind – nicht gegen sie.` },
      { title: `In Minuten heruntergeladen`, desc: `Sofortiger PDF-Download. Zu Hause ausdrucken oder digital nutzen. Kein Warten, keine Überforderung.` },
      { title: `Beginn mit einem kleinen Schritt`, desc: `Das war's. Ein Schritt. Das genügt. Dein Gehirn macht den Rest.` },
    ],
    appEyebrow: `Kostenloses ADHS-Toolkit`,
    appPre: `Die bloom focus `,
    appEm: `App`,
    appSub: `Ein kostenloses ADHS-Toolkit direkt im Browser. Aufgaben, Gewohnheiten, Fokus-Timer, Brain Dump, Dopamin-Menü – alles an einem Ort. Mit Streaks, XP und einer Pflanze, die mit dir wächst.`,
    features: [
      `Lass eine Pflanze wachsen, während du Aufgaben erledigst`,
      `Baue Streaks auf und sammle XP`,
      `Aufgaben-Manager mit Mini-Schritten`,
      `Brain Dump → in Aufgaben verwandeln`,
      `Pomodoro-Timer + Gewohnheits-Tracker`,
    ],
    tryApp: `Kostenlose App testen →`,
    plantName: `Meine Hirn-Pflanze`,
    plantStage: `Phase: Volle Blüte`,
    level: `Level 7 ADHS-Gehirn`,
    streak: `🔥 12er-Streak`,
    actions: [`Bericht-Einleitung schreiben`, `Wasser trinken`, `25 Min Fokus geschafft`],
    blogEyebrow: `Aus dem Blog`,
    blogPre: `Verstehe dein `,
    blogEm: `ADHS-Gehirn`,
    allArticles: `Alle Artikel →`,
    ctaPre: `Ein kleiner Schritt. `,
    ctaEm: `Das genügt.`,
    ctaSub: `Dein Gehirn ist nicht kaputt. Es braucht nur Werkzeuge, die zu seiner Arbeitsweise passen.`,
    ctaButton: `Mit bloom focus starten ✨`,
  },

  fr: {
    badge: `Boîte à outils TDAH · bloom focus`,
    heroPre: `Une organisation qui travaille avec ton cerveau, `,
    heroEm: `pas contre lui.`,
    heroSub: `Des outils pensés pour les cerveaux neurodivergents – sans honte, sans pression, sans « fais juste plus d'efforts ». Enfin un agenda que ton cerveau TDAH a vraiment envie d'utiliser.`,
    ctaShop: `Découvrir les outils ✨`,
    ctaBlog: `Lire le blog`,
    chips: [`Pensé neurodivergent`, `Sans honte, sans pression`, `Téléchargement immédiat`, `Doux & structuré`],
    painEyebrow: `Ça te parle ?`,
    painPre: `Ton cerveau n'est pas défaillant. `,
    painEm: `Il lui faut juste un autre système.`,
    pains: [
      `Tu commences 10 choses et n'en finis aucune`,
      `Les listes de tâches te font te sentir pire, pas mieux`,
      `Le temps… disparaît, sans que tu saches où il est passé`,
      `Ton cerveau ne s'arrête pas, même quand tu as désespérément besoin de repos`,
      `Tu sais quoi faire – tu n'arrives juste pas à t'y mettre`,
      `Tu as essayé tous les systèmes. Aucun n'a tenu.`,
    ],
    painQuote: `« On est l'amie qui a aussi un TDAH – qui comprend, ne juge pas, et a vraiment trouvé ce qui aide. »`,
    productsEyebrow: `Les outils`,
    productsPre: `Des outils que ton cerveau TDAH `,
    productsEm: `veut vraiment`,
    products: [
      { title: `Dopamine Menu`, desc: `Un système de récompenses que ton cerveau TDAH utilisera vraiment. Choisis ta petite douceur, sans culpabilité.`, tag: `Téléchargement immédiat` },
      { title: `ADHD Daily Planner`, desc: `Des blocs de temps selon ton énergie. De la place pour vider ta tête. Sans honte, sans pression.`, tag: `À imprimer · PDF` },
      { title: `Habit Tracker`, desc: `Suis ce qui compte, pas tout. Célèbre chaque petite victoire.`, tag: `Sans dates · A4 & Letter` },
      { title: `Weekly Brain Dump`, desc: `Vide ta tête sur le papier. Sans jugement, sans structure imposée.`, tag: `Téléchargement immédiat` },
    ],
    viewProduct: `Voir le produit →`,
    seeAll: `Voir tous les produits →`,
    howEyebrow: `Comment ça marche`,
    howPre: `Trois étapes. `,
    howEm: `C'est tout.`,
    steps: [
      { title: `Choisis ton outil`, desc: `Parcours les agendas, trackers et kits pensés pour les cerveaux TDAH – pas contre eux.` },
      { title: `Téléchargé en quelques minutes`, desc: `Téléchargement PDF immédiat. À imprimer chez toi ou à utiliser en numérique. Sans attente, sans surcharge.` },
      { title: `Commence par un petit pas`, desc: `C'est tout. Un pas. Ça suffit. Ton cerveau fera le reste.` },
    ],
    appEyebrow: `Boîte à outils TDAH gratuite`,
    appPre: `L'appli `,
    appEm: `bloom focus`,
    appSub: `Une boîte à outils TDAH gratuite, directement dans ton navigateur. Tâches, habitudes, minuteur de concentration, brain dump, menu dopamine – tout au même endroit. Avec des séries, de l'XP et une plante qui grandit avec toi.`,
    features: [
      `Fais pousser une plante en accomplissant tes tâches`,
      `Construis des séries et gagne de l'XP`,
      `Gestionnaire de tâches avec micro-étapes`,
      `Brain dump → transforme en tâches`,
      `Minuteur Pomodoro + suivi d'habitudes`,
    ],
    tryApp: `Essayer l'appli gratuite →`,
    plantName: `Ma plante-cerveau`,
    plantStage: `Stade : pleine floraison`,
    level: `Niveau 7 cerveau TDAH`,
    streak: `🔥 série de 12`,
    actions: [`Écrire l'intro du rapport`, `Boire de l'eau`, `25 min de concentration faites`],
    blogEyebrow: `Du blog`,
    blogPre: `Comprendre ton `,
    blogEm: `cerveau TDAH`,
    allArticles: `Tous les articles →`,
    ctaPre: `Un petit pas. `,
    ctaEm: `Ça suffit.`,
    ctaSub: `Ton cerveau n'est pas défaillant. Il lui faut juste des outils adaptés à son fonctionnement.`,
    ctaButton: `Commencer avec bloom focus ✨`,
  },

  es: {
    badge: `Kit TDAH · bloom focus`,
    heroPre: `Una planificación que trabaja con tu cerebro, `,
    heroEm: `no contra él.`,
    heroSub: `Herramientas diseñadas para cerebros neurodivergentes: sin culpa, sin presión, sin «solo esfuérzate más». Por fin, una agenda que tu cerebro con TDAH sí quiere usar.`,
    ctaShop: `Ver las herramientas ✨`,
    ctaBlog: `Leer el blog`,
    chips: [`Neurodivergente primero`, `Sin culpa, sin presión`, `Descarga inmediata`, `Cálido y estructurado`],
    painEyebrow: `¿Te suena?`,
    painPre: `Tu cerebro no está roto. `,
    painEm: `Solo necesita un sistema diferente.`,
    pains: [
      `Empiezas 10 cosas y no terminas ninguna`,
      `Las listas de tareas te hacen sentir peor, no mejor`,
      `El tiempo… simplemente desaparece, y no sabes a dónde se fue`,
      `Tu cerebro no para, incluso cuando necesitas descansar con urgencia`,
      `Sabes qué hacer; lo que no logras es empezar`,
      `Has probado todos los sistemas. Ninguno se quedó.`,
    ],
    painQuote: `«Somos esa amiga que también tiene TDAH: que lo entiende, no juzga y de verdad ha encontrado cosas que ayudan.»`,
    productsEyebrow: `Las herramientas`,
    productsPre: `Herramientas que tu cerebro con TDAH `,
    productsEm: `sí quiere`,
    products: [
      { title: `Dopamine Menu`, desc: `Un sistema de recompensas que tu cerebro con TDAH sí usará. Elige un gusto, sin culpa.`, tag: `Descarga inmediata` },
      { title: `ADHD Daily Planner`, desc: `Bloques de tiempo según tu energía. Espacio para vaciar la mente. Sin culpa, sin presión.`, tag: `Imprimible · PDF` },
      { title: `Habit Tracker`, desc: `Haz seguimiento de lo que importa, no de todo. Celebra cada logro.`, tag: `Sin fechas · A4 y Letter` },
      { title: `Weekly Brain Dump`, desc: `Vacía tu cabeza en papel. Sin juicios, sin estructura obligatoria.`, tag: `Descarga inmediata` },
    ],
    viewProduct: `Ver producto →`,
    seeAll: `Ver todos los productos →`,
    howEyebrow: `Cómo funciona`,
    howPre: `Tres pasos. `,
    howEm: `Nada más.`,
    steps: [
      { title: `Elige tu herramienta`, desc: `Explora agendas, trackers y kits hechos para cerebros con TDAH, no contra ellos.` },
      { title: `Descárgalo en minutos`, desc: `Descarga PDF inmediata. Imprime en casa o úsalo en digital. Sin esperas, sin agobio.` },
      { title: `Empieza con un pequeño paso`, desc: `Eso es todo. Un paso. Es suficiente. Tu cerebro hará el resto.` },
    ],
    appEyebrow: `Kit TDAH gratuito`,
    appPre: `La `,
    appEm: `app bloom focus`,
    appSub: `Un kit TDAH gratuito que vive en tu navegador. Tareas, hábitos, temporizador de enfoque, brain dump, menú de dopamina: todo en un sitio. Con rachas, XP y una planta que crece contigo.`,
    features: [
      `Haz crecer una planta al completar tareas`,
      `Crea rachas y gana XP`,
      `Gestor de tareas con micropasos`,
      `Brain dump → conviértelo en tareas`,
      `Temporizador Pomodoro + seguimiento de hábitos`,
    ],
    tryApp: `Probar la app gratis →`,
    plantName: `Mi planta cerebral`,
    plantStage: `Etapa: floración plena`,
    level: `Nivel 7 cerebro TDAH`,
    streak: `🔥 racha de 12`,
    actions: [`Escribir la intro del informe`, `Beber agua`, `25 min de enfoque hechos`],
    blogEyebrow: `Del blog`,
    blogPre: `Entender tu `,
    blogEm: `cerebro con TDAH`,
    allArticles: `Todos los artículos →`,
    ctaPre: `Un pequeño paso. `,
    ctaEm: `Es suficiente.`,
    ctaSub: `Tu cerebro no está roto. Solo necesita herramientas hechas para cómo funciona de verdad.`,
    ctaButton: `Empezar con bloom focus ✨`,
  },
}

export const newsletter: Record<Lang, NewsletterDict> = {
  en: {
    heading: `Join the bloom focus letter`,
    sub: `Gentle, practical tools for working with an ADHD brain, plus new releases now and then. Subscribe and we'll send you 15% off your first order to say hello.`,
    namePlaceholder: `First name (optional)`,
    emailPlaceholder: `you@email.com`,
    subscribe: `Subscribe`,
    subscribing: `Subscribing…`,
    successFull: `You're in — we've sent a little welcome note and your 15% discount to your inbox. Thank you for being here. 🌱`,
    noSpam: `No spam, ever. Leave whenever you like.`,
    compactLabel: `Newsletter`,
    compactSub: `Gentle ADHD tools and the occasional new release. No spam, leave anytime.`,
    compactSuccess: `You're in — check your inbox for a welcome note and your discount. 🌱`,
  },
  de: {
    heading: `Abonniere den bloom focus Brief`,
    sub: `Sanfte, praktische Werkzeuge für den Alltag mit ADHS – und ab und zu Neuigkeiten. Abonniere, und wir schicken dir zur Begrüßung 15 % Rabatt auf deine erste Bestellung.`,
    namePlaceholder: `Vorname (optional)`,
    emailPlaceholder: `du@email.com`,
    subscribe: `Abonnieren`,
    subscribing: `Wird abonniert…`,
    successFull: `Du bist dabei – wir haben dir eine kleine Willkommensnachricht und deinen 15 %-Rabatt geschickt. Schön, dass du hier bist. 🌱`,
    noSpam: `Niemals Spam. Du kannst jederzeit gehen.`,
    compactLabel: `Newsletter`,
    compactSub: `Sanfte ADHS-Werkzeuge und ab und zu Neues. Kein Spam, jederzeit abbestellbar.`,
    compactSuccess: `Du bist dabei – schau in dein Postfach für eine Willkommensnachricht und deinen Rabatt. 🌱`,
  },
  fr: {
    heading: `Rejoins la lettre bloom focus`,
    sub: `Des outils doux et concrets pour vivre avec un cerveau TDAH, et de temps en temps des nouveautés. Abonne-toi et on t'offre 15 % sur ta première commande pour te dire bonjour.`,
    namePlaceholder: `Prénom (facultatif)`,
    emailPlaceholder: `toi@email.com`,
    subscribe: `S'abonner`,
    subscribing: `Inscription…`,
    successFull: `C'est fait – on t'a envoyé un petit mot de bienvenue et ta réduction de 15 %. Merci d'être là. 🌱`,
    noSpam: `Jamais de spam. Tu pars quand tu veux.`,
    compactLabel: `Newsletter`,
    compactSub: `Des outils TDAH tout en douceur et, de temps en temps, une nouveauté. Pas de spam, désinscription quand tu veux.`,
    compactSuccess: `C'est fait – regarde ta boîte mail pour le mot de bienvenue et ta réduction. 🌱`,
  },
  es: {
    heading: `Únete a la carta de bloom focus`,
    sub: `Herramientas suaves y prácticas para convivir con un cerebro con TDAH, y de vez en cuando novedades. Suscríbete y te enviamos un 15 % de descuento en tu primer pedido para saludarte.`,
    namePlaceholder: `Nombre (opcional)`,
    emailPlaceholder: `tu@email.com`,
    subscribe: `Suscribirme`,
    subscribing: `Suscribiendo…`,
    successFull: `Ya estás dentro: te enviamos una pequeña nota de bienvenida y tu 15 % de descuento. Gracias por estar aquí. 🌱`,
    noSpam: `Sin spam, nunca. Puedes salir cuando quieras.`,
    compactLabel: `Newsletter`,
    compactSub: `Herramientas TDAH suaves y alguna novedad de vez en cuando. Sin spam, te vas cuando quieras.`,
    compactSuccess: `Ya estás dentro: revisa tu correo para la nota de bienvenida y tu descuento. 🌱`,
  },
}

export interface ChromeDict {
  navApp: string
  navTest: string
  navShop: string
  navBlog: string
  shopNow: string
  tagline: string
  explore: string
  shopAll: string
  adhdBlog: string
  connect: string
  rights: string
}

export const chrome: Record<Lang, ChromeDict> = {
  en: {
    navApp: `App`, navTest: `ADHD Test`, navShop: `Shop`, navBlog: `Blog`, shopNow: `Shop now ✨`,
    tagline: `Planning tools designed for ADHD brains. Warm, gentle, and actually helpful.`,
    explore: `Explore`, shopAll: `Shop all products`, adhdBlog: `ADHD blog`, connect: `Connect`,
    rights: `© 2026 bloom focus. All rights reserved.`,
  },
  de: {
    navApp: `App`, navTest: `ADHS-Test`, navShop: `Shop`, navBlog: `Blog`, shopNow: `Zum Shop ✨`,
    tagline: `Planungstools für ADHS-Gehirne. Warm, sanft und wirklich hilfreich.`,
    explore: `Entdecken`, shopAll: `Alle Produkte`, adhdBlog: `ADHS-Blog`, connect: `Kontakt`,
    rights: `© 2026 bloom focus. Alle Rechte vorbehalten.`,
  },
  fr: {
    navApp: `Appli`, navTest: `Test TDAH`, navShop: `Boutique`, navBlog: `Blog`, shopNow: `Boutique ✨`,
    tagline: `Des outils d'organisation pensés pour les cerveaux TDAH. Chaleureux, doux et vraiment utiles.`,
    explore: `Explorer`, shopAll: `Tous les produits`, adhdBlog: `Blog TDAH`, connect: `Contact`,
    rights: `© 2026 bloom focus. Tous droits réservés.`,
  },
  es: {
    navApp: `App`, navTest: `Test TDAH`, navShop: `Tienda`, navBlog: `Blog`, shopNow: `Comprar ✨`,
    tagline: `Herramientas de planificación para cerebros con TDAH. Cálidas, suaves y de verdad útiles.`,
    explore: `Explorar`, shopAll: `Todos los productos`, adhdBlog: `Blog TDAH`, connect: `Contacto`,
    rights: `© 2026 bloom focus. Todos los derechos reservados.`,
  },
}

export function langFromPath(pathname: string | null | undefined): Lang {
  if (pathname?.startsWith('/de')) return 'de'
  if (pathname?.startsWith('/fr')) return 'fr'
  if (pathname?.startsWith('/es')) return 'es'
  return 'en'
}
