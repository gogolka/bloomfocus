import type { Lang } from '@/lib/i18n'

export interface ShopChromeDict {
  eyebrow: string
  h1pre: string
  h1em: string
  sub: string
  loading: string
}

export const shopChrome: Record<Lang, ShopChromeDict> = {
  en: {
    eyebrow: `bloom focus shop`,
    h1pre: `Tools your ADHD brain `,
    h1em: `actually wants to use`,
    sub: `Every product is designed around real ADHD patterns — no shame, no overwhelm, just gentle structure.`,
    loading: `Loading products...`,
  },
  de: {
    eyebrow: `bloom focus Shop`,
    h1pre: `Werkzeuge, die dein ADHS-Gehirn `,
    h1em: `wirklich nutzen will`,
    sub: `Jedes Produkt ist um echte ADHS-Muster herum gestaltet – ohne Scham, ohne Überforderung, einfach sanfte Struktur.`,
    loading: `Produkte werden geladen…`,
  },
  fr: {
    eyebrow: `boutique bloom focus`,
    h1pre: `Des outils que ton cerveau TDAH `,
    h1em: `veut vraiment utiliser`,
    sub: `Chaque produit est pensé autour de vrais schémas TDAH – sans honte, sans surcharge, juste une structure douce.`,
    loading: `Chargement des produits…`,
  },
  es: {
    eyebrow: `tienda bloom focus`,
    h1pre: `Herramientas que tu cerebro con TDAH `,
    h1em: `sí quiere usar`,
    sub: `Cada producto está diseñado en torno a patrones reales del TDAH: sin culpa, sin agobio, solo estructura suave.`,
    loading: `Cargando productos…`,
  },
}

export interface BuyDict {
  buyNow: string
  enterEmail: string
  total: string
  promoLabel: string
  apply: string
  applied: string
  offApplied: (n: number) => string
  nameLabel: string
  emailLabel: string
  payNow: string
  preparing: string
  preparingA: string
  preparingB: string
  secureA: string
  secureB: string
  invalidEmail: string
  genericError: string
  connError: string
  promoInvalid: string
  promoCheckErr: string
}

export const buy: Record<Lang, BuyDict> = {
  en: {
    buyNow: `Buy now →`, enterEmail: `Enter your email to continue`, total: `Total`, promoLabel: `Promo code`,
    apply: `Apply`, applied: `Applied ✓`, offApplied: (n) => `✓ ${n}% off applied`,
    nameLabel: `Your name (optional)`, emailLabel: `Email address`, payNow: `Pay now →`,
    preparing: `Preparing secure payment…`, preparingA: `This can take a few seconds.`, preparingB: `Please don't close this window.`,
    secureA: `🔒 Secure payment via Monobank`, secureB: `📧 Download link sent to your email instantly after payment`,
    invalidEmail: `Please enter a valid email address`, genericError: `Something went wrong`, connError: `Connection error. Please try again.`,
    promoInvalid: `That code isn't valid`, promoCheckErr: `Could not check that code`,
  },
  de: {
    buyNow: `Jetzt kaufen →`, enterEmail: `Gib deine E-Mail ein, um fortzufahren`, total: `Gesamt`, promoLabel: `Gutscheincode`,
    apply: `Anwenden`, applied: `Angewendet ✓`, offApplied: (n) => `✓ ${n} % Rabatt angewendet`,
    nameLabel: `Dein Name (optional)`, emailLabel: `E-Mail-Adresse`, payNow: `Jetzt bezahlen →`,
    preparing: `Sichere Zahlung wird vorbereitet…`, preparingA: `Das kann ein paar Sekunden dauern.`, preparingB: `Bitte schließe dieses Fenster nicht.`,
    secureA: `🔒 Sichere Zahlung über Monobank`, secureB: `📧 Download-Link sofort nach der Zahlung per E-Mail`,
    invalidEmail: `Bitte gib eine gültige E-Mail-Adresse ein`, genericError: `Etwas ist schiefgelaufen`, connError: `Verbindungsfehler. Bitte versuche es erneut.`,
    promoInvalid: `Dieser Code ist ungültig`, promoCheckErr: `Code konnte nicht geprüft werden`,
  },
  fr: {
    buyNow: `Acheter →`, enterEmail: `Saisis ton e-mail pour continuer`, total: `Total`, promoLabel: `Code promo`,
    apply: `Appliquer`, applied: `Appliqué ✓`, offApplied: (n) => `✓ ${n} % de réduction appliqués`,
    nameLabel: `Ton nom (facultatif)`, emailLabel: `Adresse e-mail`, payNow: `Payer →`,
    preparing: `Préparation du paiement sécurisé…`, preparingA: `Cela peut prendre quelques secondes.`, preparingB: `Merci de ne pas fermer cette fenêtre.`,
    secureA: `🔒 Paiement sécurisé via Monobank`, secureB: `📧 Lien de téléchargement envoyé par e-mail juste après le paiement`,
    invalidEmail: `Saisis une adresse e-mail valide`, genericError: `Une erreur s'est produite`, connError: `Erreur de connexion. Réessaie.`,
    promoInvalid: `Ce code n'est pas valide`, promoCheckErr: `Impossible de vérifier ce code`,
  },
  es: {
    buyNow: `Comprar →`, enterEmail: `Escribe tu correo para continuar`, total: `Total`, promoLabel: `Código promocional`,
    apply: `Aplicar`, applied: `Aplicado ✓`, offApplied: (n) => `✓ ${n} % de descuento aplicado`,
    nameLabel: `Tu nombre (opcional)`, emailLabel: `Dirección de correo`, payNow: `Pagar →`,
    preparing: `Preparando el pago seguro…`, preparingA: `Esto puede tardar unos segundos.`, preparingB: `Por favor, no cierres esta ventana.`,
    secureA: `🔒 Pago seguro con Monobank`, secureB: `📧 Enlace de descarga enviado a tu correo justo tras el pago`,
    invalidEmail: `Introduce una dirección de correo válida`, genericError: `Algo salió mal`, connError: `Error de conexión. Inténtalo de nuevo.`,
    promoInvalid: `Ese código no es válido`, promoCheckErr: `No se pudo comprobar ese código`,
  },
}

// English tag -> localized tag
export const tagMap: Record<Lang, Record<string, string>> = {
  en: {},
  de: { 'Instant download': `Sofort-Download`, 'Printable · PDF': `Druckbar · PDF`, 'Undated · A4 & Letter': `Undatiert · A4 & Letter` },
  fr: { 'Instant download': `Téléchargement immédiat`, 'Printable · PDF': `À imprimer · PDF`, 'Undated · A4 & Letter': `Sans dates · A4 & Letter` },
  es: { 'Instant download': `Descarga inmediata`, 'Printable · PDF': `Imprimible · PDF`, 'Undated · A4 & Letter': `Sin fechas · A4 y Letter` },
}

// Product descriptions per slug (titles kept in English to match the shop/files).
// English comes from the database; only de/fr/es overrides live here.
export const productDesc: Record<string, Partial<Record<Lang, string>>> = {
  'dopamine-menu': {
    de: `Ein sanftes Belohnungs-Toolkit für ADHS-Köpfe. Plane deine Dopamin-Kicks, bevor du sie brauchst – schnelle Kicks, mittlere Pausen, tiefes Aufladen, Soziales, Kreatives und eigene Belohnungen. Enthält 4 Varianten: farbig mit Beispielen, farbig leer, tintensparend mit Beispielen, tintensparend leer.`,
    fr: `Une boîte à récompenses tout en douceur pour les cerveaux TDAH. Planifie tes doses de dopamine avant d'en avoir besoin – petites doses, pauses moyennes, recharge profonde, social, créatif et récompenses personnalisées. Inclut 4 variantes : couleur avec exemples, couleur vierge, faible encre avec exemples, faible encre vierge.`,
    es: `Un kit de recompensas suave para cerebros con TDAH. Planifica tus chutes de dopamina antes de necesitarlos: chutes rápidos, pausas medias, recarga profunda, social, creativo y recompensas personalizadas. Incluye 4 variantes: color con ejemplos, color en blanco, poca tinta con ejemplos, poca tinta en blanco.`,
  },
  'morning-routine-cards': {
    de: `Visuelle Morgenroutine-Karten in acht Schritten für ADHS-Köpfe. Aufwachen, trinken, atmen, Zähne putzen, anziehen, essen, 3 Aufgaben aufschreiben, loslegen. Enthält 4 Varianten: farbig mit Schritten, farbig leer, tintensparend mit Schritten, tintensparend leer.`,
    fr: `Des cartes visuelles de routine matinale en huit étapes, pensées pour les cerveaux TDAH. Se réveiller, s'hydrater, respirer, se brosser les dents, s'habiller, manger, écrire 3 tâches, commencer. Inclut 4 variantes : couleur avec étapes, couleur vierge, faible encre avec étapes, faible encre vierge.`,
    es: `Tarjetas visuales de rutina matinal en ocho pasos, diseñadas para cerebros con TDAH. Despertar, hidratarse, respirar, cepillarse, vestirse, comer, escribir 3 tareas, empezar. Incluye 4 variantes: color con pasos, color en blanco, poca tinta con pasos, poca tinta en blanco.`,
  },
  'adhd-daily-planner': {
    de: `Eine Seite. Ein Tag. Sieben Bereiche. Datum & Stimmung, Top-3-MITs, Zeitblöcke nach Energie, Brain Dump, Erfolge, Morgen und Notizen. Keine Überforderung – nur das Wesentliche. Enthält 2 Varianten: farbig und tintensparend.`,
    fr: `Une page. Un jour. Sept sections. Date & humeur, Top 3 des tâches clés, blocs de temps selon l'énergie, brain dump, victoires, demain et notes. Sans surcharge – juste l'essentiel. Inclut 2 variantes : couleur et faible encre.`,
    es: `Una página. Un día. Siete secciones. Fecha y ánimo, Top 3 de tareas clave, bloques de tiempo según la energía, brain dump, logros, mañana y notas. Sin agobio: solo lo que importa. Incluye 2 variantes: color y poca tinta.`,
  },
  'task-decomposer': {
    de: `Große Aufgaben wirken unmöglich. Winzige Schritte nicht. Zerlege jede Aufgabe in bis zu 10 Mini-Schritte, finde deine allererste 2-Minuten-Handlung, sammle, was du brauchst, und setze eine Belohnung. Enthält 2 Varianten: farbig und tintensparend.`,
    fr: `Les grandes tâches semblent impossibles. Les tout petits pas, non. Découpe n'importe quelle tâche en jusqu'à 10 micro-étapes, repère ta toute première action de 2 minutes, rassemble ce qu'il te faut et prévois une récompense. Inclut 2 variantes : couleur et faible encre.`,
    es: `Las tareas grandes parecen imposibles. Los pasos diminutos no. Divide cualquier tarea en hasta 10 micropasos, identifica tu primera acción de 2 minutos, reúne lo que necesitas y fija una recompensa. Incluye 2 variantes: color y poca tinta.`,
  },
  'daily-gratitude': {
    de: `Selbst an schweren Tagen zählen die kleinen Dinge. Drei gute Dinge, jemand, für den du dankbar bist, eine kleine Freude, etwas, das dir gelungen ist, und die Absicht für morgen. Sanft und ohne Scham. Enthält 2 Varianten: farbig und tintensparend.`,
    fr: `Même les jours difficiles, les petites choses comptent. Trois bonnes choses, quelqu'un à qui tu es reconnaissant·e, une petite joie, quelque chose que tu as bien fait, et l'intention de demain. Doux et sans honte. Inclut 2 variantes : couleur et faible encre.`,
    es: `Incluso en los días difíciles, las pequeñas cosas cuentan. Tres cosas buenas, alguien a quien agradeces, una pequeña alegría, algo que hiciste bien y la intención de mañana. Suave y sin culpa. Incluye 2 variantes: color y poca tinta.`,
  },
  'weekly-habit-tracker': {
    de: `Kleine Dinge, oft getan. Fortschritt statt Perfektion. Verfolge deine Gewohnheiten über die Woche mit einem einfachen Raster, setze ein Streak-Ziel und feiere Erfolge. Enthält 2 Varianten: farbig und tintensparend.`,
    fr: `De petites choses, faites souvent. Le progrès plutôt que la perfection. Suis tes habitudes sur la semaine avec une grille simple, fixe-toi un objectif de série et célèbre tes victoires. Inclut 2 variantes : couleur et faible encre.`,
    es: `Cosas pequeñas, hechas a menudo. Progreso antes que perfección. Haz seguimiento de tus hábitos durante la semana con una cuadrícula simple, fija una meta de racha y celebra los logros. Incluye 2 variantes: color y poca tinta.`,
  },
  'weekly-planner': {
    de: `Eine Woche auf einen Blick. Sanfte Struktur mit Raum zum Atmen. Montag bis Wochenende, Top 3 der Woche und Notizen. Gibt es im normalen Layout und mit mehr Zeilen. Enthält 4 Varianten: farbig normal, farbig mehr Zeilen, tintensparend normal, tintensparend mehr Zeilen.`,
    fr: `Une semaine en un coup d'œil. Une structure douce avec de la place pour respirer. Du lundi au week-end, Top 3 de la semaine et notes. Disponible en version standard et avec plus de lignes. Inclut 4 variantes : couleur standard, couleur plus de lignes, faible encre standard, faible encre plus de lignes.`,
    es: `Una semana de un vistazo. Estructura suave con espacio para respirar. De lunes a fin de semana, Top 3 de la semana y notas. Disponible en versión normal y con más filas. Incluye 4 variantes: color normal, color más filas, poca tinta normal, poca tinta más filas.`,
  },
  'monthly-overview': {
    de: `Das große Ganze – ohne Überforderung. Vollständiges Monatskalender-Raster, Fokus des Monats, wichtige Daten und Notizen. Undatiert, damit du in jedem Monat starten kannst. Enthält 2 Varianten: farbig und tintensparend.`,
    fr: `La vue d'ensemble – sans la surcharge. Grille calendrier du mois complet, le focus du mois, dates importantes et notes. Sans dates, pour commencer n'importe quel mois. Inclut 2 variantes : couleur et faible encre.`,
    es: `La visión de conjunto, sin el agobio. Cuadrícula de calendario del mes completo, el foco del mes, fechas importantes y notas. Sin fechas, para empezar cualquier mes. Incluye 2 variantes: color y poca tinta.`,
  },
  'brain-dump-journal': {
    de: `Schreib alles auf. Keine Ordnung, kein Urteil. Ablauf über drei Seiten: Kopf leeren, Aufgaben-Dump → Sortieren (Heute / Diese Woche / Später / Löschen) und eine Sache zum Anpacken. Enthält 2 Varianten: farbig und tintensparend.`,
    fr: `Écris tout. Sans ordre, sans jugement. Un déroulé en trois pages : vide ta tête, déversoir de tâches → trier (à faire aujourd'hui / cette semaine / plus tard / supprimer), et une seule chose sur laquelle agir. Inclut 2 variantes : couleur et faible encre.`,
    es: `Escríbelo todo. Sin orden, sin juicio. Un flujo de tres páginas: vacía tu mente, volcado de tareas → ordenar (hacer hoy / esta semana / más tarde / eliminar) y una sola cosa sobre la que actuar. Incluye 2 variantes: color y poca tinta.`,
  },
  'meal-planner': {
    de: `Keine „Was gibt's zum Abendessen?"-Panik um 16 Uhr mehr. Wochen-Essensraster (Frühstück, Mittag, Abend, Snacks) plus Einkaufsliste und Vorbereitungsnotizen. Zwei Seiten. Enthält 2 Varianten: farbig und tintensparend.`,
    fr: `Fini la panique de 16 h « qu'est-ce qu'on mange ce soir ? ». Grille de repas de la semaine (petit-déjeuner, déjeuner, dîner, en-cas) plus liste de courses et notes de préparation. Deux pages. Inclut 2 variantes : couleur et faible encre.`,
    es: `Se acabó el pánico de las 16 h de «¿qué hay de cena?». Cuadrícula de comidas de la semana (desayuno, comida, cena, tentempiés) más lista de la compra y notas de preparación. Dos páginas. Incluye 2 variantes: color y poca tinta.`,
  },
}
