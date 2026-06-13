// Shared localisation for lifecycle emails (newsletter welcome + app welcome).
// The quiz-result and post-purchase emails localise inline in their own routes.

export const LOCALES = ['en', 'de', 'fr', 'es'] as const
export type Lang = (typeof LOCALES)[number]
export function emailLang(x: any): Lang {
  return (LOCALES as readonly string[]).includes(x) ? x : 'en'
}

const TAGLINE: Record<Lang, string> = {
  en: `Planning that works with your brain, not against it.`,
  de: `Planung, die mit deinem Gehirn arbeitet, nicht gegen es.`,
  fr: `Une organisation qui travaille avec ton cerveau, pas contre lui.`,
  es: `Una planificación que trabaja con tu cerebro, no contra él.`,
}

function shell(lang: Lang, emoji: string, heading: string, bodyHtml: string) {
  return `
  <!DOCTYPE html><html><body style="font-family: Georgia, serif; background: #FFF8F0; margin: 0; padding: 40px 20px;">
    <div style="max-width: 560px; margin: 0 auto; background: #FEFCFA; border-radius: 20px; padding: 40px; border: 1px solid rgba(45,41,38,0.08);">
      <div style="text-align:center; margin-bottom: 28px;">
        <div style="font-size: 40px; margin-bottom: 12px;">${emoji}</div>
        <div style="font-size: 24px; color: #2D2926;">bloom <em style="color:#B8A4E8;">focus</em></div>
      </div>
      <h1 style="font-size: 22px; color:#2D2926; margin-bottom: 10px;">${heading}</h1>
      ${bodyHtml}
      <div style="border-top: 1px solid rgba(45,41,38,0.08); margin-top: 28px; padding-top: 18px; text-align:center;">
        <p style="font-size: 12px; color:#9B8F88;">bloom focus · bloomfocus.org<br/><em>${TAGLINE[lang]}</em></p>
      </div>
    </div>
  </body></html>`
}

// ---------- Newsletter welcome ----------
const NEWSLETTER: Record<Lang, {
  subject: string
  heading: (n: string) => string
  intro: string
  giftLabel: string
  shopBtn: string
}> = {
  en: {
    subject: `Welcome to bloom focus 🌱 (here's 15% off)`,
    heading: (n) => `${n ? n + ', welcome' : 'Welcome'} to bloom focus`,
    intro: `Thank you for joining. From time to time we'll send you gentle, practical tools and ideas for working with an ADHD brain instead of against it — never spam, and you can leave whenever you like.`,
    giftLabel: `A little welcome gift — 15% off your first order`,
    shopBtn: `Explore the shop →`,
  },
  de: {
    subject: `Willkommen bei bloom focus 🌱 (15 % Rabatt für dich)`,
    heading: (n) => `${n ? n + ', willkommen' : 'Willkommen'} bei bloom focus`,
    intro: `Danke, dass du dabei bist. Ab und zu schicken wir dir sanfte, praktische Werkzeuge und Ideen, um mit einem ADHS-Gehirn zu arbeiten statt gegen es – niemals Spam, und du kannst jederzeit gehen.`,
    giftLabel: `Ein kleines Willkommensgeschenk – 15 % Rabatt auf deine erste Bestellung`,
    shopBtn: `Zum Shop →`,
  },
  fr: {
    subject: `Bienvenue chez bloom focus 🌱 (15 % pour toi)`,
    heading: (n) => `${n ? n + ', bienvenue' : 'Bienvenue'} chez bloom focus`,
    intro: `Merci de nous rejoindre. De temps en temps, on t'enverra des outils et des idées tout en douceur pour travailler avec un cerveau TDAH plutôt que contre lui – jamais de spam, et tu pars quand tu veux.`,
    giftLabel: `Un petit cadeau de bienvenue – 15 % sur ta première commande`,
    shopBtn: `Découvrir la boutique →`,
  },
  es: {
    subject: `Bienvenida a bloom focus 🌱 (un 15 % para ti)`,
    heading: (n) => `${n ? n + ', bienvenida' : 'Bienvenida'} a bloom focus`,
    intro: `Gracias por unirte. De vez en cuando te enviaremos herramientas e ideas suaves y prácticas para trabajar con un cerebro con TDAH en lugar de en su contra: nunca spam, y puedes salir cuando quieras.`,
    giftLabel: `Un pequeño regalo de bienvenida: 15 % en tu primer pedido`,
    shopBtn: `Ver la tienda →`,
  },
}

export function newsletterWelcome(lang: Lang, name: string) {
  const e = NEWSLETTER[lang]
  const body = `
      <p style="font-size: 15px; color:#6B5F58; line-height: 1.7; margin-bottom: 20px;">${e.intro}</p>
      <div style="background:#E8DEFF; border-radius: 14px; padding: 24px; text-align:center; margin-bottom: 24px;">
        <p style="font-size: 13px; color:#6B5F58; margin: 0 0 8px;">${e.giftLabel}</p>
        <p style="font-size: 26px; font-weight: 700; letter-spacing: 0.12em; color:#7B5FCC; margin: 0 0 12px;">BLOOM15</p>
        <a href="https://bloomfocus.org/shop" style="display:inline-block; background:#B8A4E8; color:white; padding: 12px 26px; border-radius: 100px; text-decoration:none; font-size: 14px; font-weight: 600;">${e.shopBtn}</a>
      </div>`
  return { subject: e.subject, html: shell(lang, '🌱', e.heading(name), body) }
}

// ---------- App welcome ----------
const APP: Record<Lang, {
  subject: string
  heading: (n: string) => string
  p1: string
  p2: string
  li: [string, string, string]
  openBtn: string
  giftLabel: string
}> = {
  en: {
    subject: `Welcome to your bloom focus toolkit 🌸`,
    heading: (n) => `${n ? n + ', welcome in' : 'Welcome in'} 🌱`,
    p1: `Your bloom focus account is ready, and we're really glad you're here. This little space was built for ADHD brains, so there is no pressure to use all of it at once or to do it perfectly.`,
    p2: `If you're not sure where to begin, here is the gentlest possible first step:`,
    li: [
      `Open the brain dump and empty whatever is rattling around your head right now.`,
      `Turn one of those lines into a single small task.`,
      `Water your plant by checking it off — that's a whole win, and it counts.`,
    ],
    openBtn: `Open your toolkit →`,
    giftLabel: `And if you'd like printable planners too — 15% off your first order`,
  },
  de: {
    subject: `Willkommen in deinem bloom focus Toolkit 🌸`,
    heading: (n) => `${n ? n + ', willkommen' : 'Willkommen'} 🌱`,
    p1: `Dein bloom focus Konto ist bereit, und wir freuen uns sehr, dass du da bist. Dieser kleine Ort ist für ADHS-Köpfe gemacht – es gibt keinen Druck, alles auf einmal oder perfekt zu nutzen.`,
    p2: `Falls du nicht weißt, wo du anfangen sollst, hier der sanfteste mögliche erste Schritt:`,
    li: [
      `Öffne den Brain Dump und leer aus, was dir gerade im Kopf herumschwirrt.`,
      `Mach aus einer dieser Zeilen eine einzige kleine Aufgabe.`,
      `Gieß deine Pflanze, indem du sie abhakst – das ist ein ganzer Erfolg, und er zählt.`,
    ],
    openBtn: `Toolkit öffnen →`,
    giftLabel: `Und falls du auch druckbare Planer möchtest – 15 % Rabatt auf deine erste Bestellung`,
  },
  fr: {
    subject: `Bienvenue dans ta boîte à outils bloom focus 🌸`,
    heading: (n) => `${n ? n + ', bienvenue' : 'Bienvenue'} 🌱`,
    p1: `Ton compte bloom focus est prêt, et on est vraiment contents que tu sois là. Ce petit espace a été pensé pour les cerveaux TDAH : aucune pression d'utiliser tout d'un coup ou de le faire parfaitement.`,
    p2: `Si tu ne sais pas par où commencer, voici le tout premier pas le plus doux possible :`,
    li: [
      `Ouvre le brain dump et vide tout ce qui te trotte dans la tête en ce moment.`,
      `Transforme l'une de ces lignes en une seule petite tâche.`,
      `Arrose ta plante en la cochant – c'est une vraie victoire, et elle compte.`,
    ],
    openBtn: `Ouvrir ta boîte à outils →`,
    giftLabel: `Et si tu veux aussi des agendas à imprimer – 15 % sur ta première commande`,
  },
  es: {
    subject: `Bienvenida a tu kit bloom focus 🌸`,
    heading: (n) => `${n ? n + ', bienvenida' : 'Bienvenida'} 🌱`,
    p1: `Tu cuenta de bloom focus está lista, y nos alegra mucho que estés aquí. Este pequeño espacio se creó para cerebros con TDAH: sin presión por usarlo todo de golpe ni hacerlo perfecto.`,
    p2: `Si no sabes por dónde empezar, este es el primer paso más suave posible:`,
    li: [
      `Abre el brain dump y vacía lo que te ronde la cabeza ahora mismo.`,
      `Convierte una de esas líneas en una sola tarea pequeña.`,
      `Riega tu planta marcándola como hecha: es toda una victoria, y cuenta.`,
    ],
    openBtn: `Abrir tu kit →`,
    giftLabel: `Y si también quieres agendas imprimibles: 15 % en tu primer pedido`,
  },
}

export function appWelcome(lang: Lang, name: string) {
  const e = APP[lang]
  const body = `
      <p style="font-size: 15px; color:#6B5F58; line-height: 1.7; margin-bottom: 16px;">${e.p1}</p>
      <p style="font-size: 15px; color:#6B5F58; line-height: 1.7; margin-bottom: 8px;">${e.p2}</p>
      <ul style="font-size: 15px; color:#6B5F58; line-height: 1.8; margin: 0 0 20px; padding-left: 20px;">
        <li>${e.li[0]}</li>
        <li>${e.li[1]}</li>
        <li>${e.li[2]}</li>
      </ul>
      <div style="text-align:center; margin-bottom: 24px;">
        <a href="https://bloomfocus.org/app" style="display:inline-block; background:#B8A4E8; color:white; padding: 13px 28px; border-radius: 100px; text-decoration:none; font-size: 14px; font-weight: 600;">${e.openBtn}</a>
      </div>
      <div style="background:#E8DEFF; border-radius: 14px; padding: 20px; text-align:center; margin-bottom: 24px;">
        <p style="font-size: 13px; color:#6B5F58; margin: 0 0 6px;">${e.giftLabel}</p>
        <p style="font-size: 22px; font-weight: 700; letter-spacing: 0.12em; color:#7B5FCC; margin: 0;">BLOOM15</p>
      </div>`
  return { subject: e.subject, html: shell(lang, '🌸', e.heading(name), body) }
}

// ---------- Post-purchase delivery email ----------
const PURCHASE: Record<Lang, {
  subject: (p: string) => string
  h1: string
  thanks: (p: string) => string
  clickInfo: string
  downloadBtn: string
  bonusEyebrow: string
  appTitle: string
  appDesc: string
  appBtn: string
  bonusLine: (n: number) => string
  orderNo: (o: string) => string
  helpLine: string
}> = {
  en: {
    subject: (p) => `Your download is ready — ${p} 🌸`,
    h1: `Your download is ready!`,
    thanks: (p) => `Thank you for your purchase. Your <strong>${p}</strong> is ready to download.`,
    clickInfo: `Click the button below to download your file.<br/><em>This link is valid for 24 hours and can be used up to 3 times.</em>`,
    downloadBtn: `Download now →`,
    bonusEyebrow: `🎁 A little thank-you`,
    appTitle: `Your free companion app`,
    appDesc: `Tasks, habits, a focus timer and a brain dump that turns into to-dos — all free, right in your browser.`,
    appBtn: `Open the free app →`,
    bonusLine: (n) => `<strong>${n}% off your next order</strong> as a thank-you — use this code at checkout:`,
    orderNo: (o) => `Order number: <strong>${o}</strong>`,
    helpLine: `If the link expires or you need help, reply to this email.`,
  },
  de: {
    subject: (p) => `Dein Download ist bereit – ${p} 🌸`,
    h1: `Dein Download ist bereit!`,
    thanks: (p) => `Danke für deinen Kauf. Dein <strong>${p}</strong> ist bereit zum Download.`,
    clickInfo: `Klick auf den Button unten, um deine Datei herunterzuladen.<br/><em>Dieser Link ist 24 Stunden gültig und bis zu 3-mal nutzbar.</em>`,
    downloadBtn: `Jetzt herunterladen →`,
    bonusEyebrow: `🎁 Ein kleines Dankeschön`,
    appTitle: `Deine kostenlose Begleit-App`,
    appDesc: `Aufgaben, Gewohnheiten, ein Fokus-Timer und ein Brain Dump, der zu To-dos wird – alles kostenlos, direkt im Browser.`,
    appBtn: `Kostenlose App öffnen →`,
    bonusLine: (n) => `<strong>${n} % Rabatt auf deine nächste Bestellung</strong> als Dankeschön – nutze diesen Code an der Kasse:`,
    orderNo: (o) => `Bestellnummer: <strong>${o}</strong>`,
    helpLine: `Wenn der Link abläuft oder du Hilfe brauchst, antworte einfach auf diese E-Mail.`,
  },
  fr: {
    subject: (p) => `Ton téléchargement est prêt – ${p} 🌸`,
    h1: `Ton téléchargement est prêt !`,
    thanks: (p) => `Merci pour ton achat. Ton <strong>${p}</strong> est prêt à télécharger.`,
    clickInfo: `Clique sur le bouton ci-dessous pour télécharger ton fichier.<br/><em>Ce lien est valable 24 heures et utilisable jusqu'à 3 fois.</em>`,
    downloadBtn: `Télécharger →`,
    bonusEyebrow: `🎁 Un petit merci`,
    appTitle: `Ton appli compagnon gratuite`,
    appDesc: `Des tâches, des habitudes, un minuteur de concentration et un brain dump qui se transforme en to-do – tout gratuit, directement dans ton navigateur.`,
    appBtn: `Ouvrir l'appli gratuite →`,
    bonusLine: (n) => `<strong>${n} % sur ta prochaine commande</strong> en remerciement – utilise ce code au paiement :`,
    orderNo: (o) => `Numéro de commande : <strong>${o}</strong>`,
    helpLine: `Si le lien expire ou si tu as besoin d'aide, réponds à cet e-mail.`,
  },
  es: {
    subject: (p) => `Tu descarga está lista — ${p} 🌸`,
    h1: `¡Tu descarga está lista!`,
    thanks: (p) => `Gracias por tu compra. Tu <strong>${p}</strong> está listo para descargar.`,
    clickInfo: `Pulsa el botón de abajo para descargar tu archivo.<br/><em>Este enlace es válido 24 horas y se puede usar hasta 3 veces.</em>`,
    downloadBtn: `Descargar ahora →`,
    bonusEyebrow: `🎁 Un pequeño gracias`,
    appTitle: `Tu app gratuita de acompañamiento`,
    appDesc: `Tareas, hábitos, un temporizador de enfoque y un brain dump que se convierte en tareas: todo gratis, en tu navegador.`,
    appBtn: `Abrir la app gratis →`,
    bonusLine: (n) => `<strong>${n} % en tu próximo pedido</strong> como gracias: usa este código al pagar:`,
    orderNo: (o) => `Número de pedido: <strong>${o}</strong>`,
    helpLine: `Si el enlace caduca o necesitas ayuda, responde a este correo.`,
  },
}

export function purchaseEmail(
  lang: Lang,
  opts: { productTitle: string; downloadUrl: string; orderNumber: string; bonusCode: string; bonusPercent: number }
) {
  const e = PURCHASE[lang]
  const { productTitle, downloadUrl, orderNumber, bonusCode, bonusPercent } = opts
  const html = `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Georgia, serif; background: #FFF8F0; margin: 0; padding: 40px 20px;">
          <div style="max-width: 560px; margin: 0 auto; background: #FEFCFA; border-radius: 20px; padding: 40px; border: 1px solid rgba(45,41,38,0.08);">
            <div style="text-align: center; margin-bottom: 32px;">
              <div style="font-size: 40px; margin-bottom: 12px;">🌸</div>
              <div style="font-size: 24px; color: #2D2926; letter-spacing: -0.5px;">bloom <em style="color: #B8A4E8;">focus</em></div>
            </div>
            <h1 style="font-size: 22px; color: #2D2926; margin-bottom: 8px; line-height: 1.3;">${e.h1}</h1>
            <p style="font-size: 15px; color: #6B5F58; line-height: 1.7; margin-bottom: 24px;">${e.thanks(productTitle)}</p>
            <div style="background: #E8DEFF; border-radius: 14px; padding: 24px; text-align: center; margin-bottom: 24px;">
              <p style="font-size: 14px; color: #6B5F58; margin-bottom: 16px;">${e.clickInfo}</p>
              <a href="${downloadUrl}" style="display: inline-block; background: #B8A4E8; color: white; padding: 14px 28px; border-radius: 100px; text-decoration: none; font-size: 15px; font-weight: 600;">${e.downloadBtn}</a>
            </div>
            <div style="background: #FFF3EC; border: 1px solid rgba(255,180,140,0.45); border-radius: 14px; padding: 22px; margin-bottom: 24px;">
              <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #C07A3E; margin-bottom: 12px;">${e.bonusEyebrow}</div>
              <p style="font-size: 14px; color: #2D2926; line-height: 1.7; margin: 0 0 4px;"><strong>${e.appTitle}</strong></p>
              <p style="font-size: 14px; color: #6B5F58; line-height: 1.7; margin: 0 0 14px;">${e.appDesc}</p>
              <div style="text-align: center; margin-bottom: 20px;">
                <a href="https://bloomfocus.org/app" style="display: inline-block; background: #B8A4E8; color: white; padding: 11px 24px; border-radius: 100px; text-decoration: none; font-size: 14px; font-weight: 600;">${e.appBtn}</a>
              </div>
              <p style="font-size: 14px; color: #2D2926; line-height: 1.7; margin: 0 0 10px;">${e.bonusLine(bonusPercent)}</p>
              <div style="text-align: center; background: #FEFCFA; border: 1px dashed #C07A3E; border-radius: 10px; padding: 12px;">
                <span style="font-size: 20px; font-weight: 700; letter-spacing: 0.14em; color: #C07A3E;">${bonusCode}</span>
              </div>
            </div>
            <p style="font-size: 13px; color: #9B8F88; line-height: 1.6; margin-bottom: 8px;">${e.orderNo(orderNumber)}</p>
            <p style="font-size: 13px; color: #9B8F88; line-height: 1.6;">${e.helpLine}</p>
            <div style="border-top: 1px solid rgba(45,41,38,0.08); margin-top: 32px; padding-top: 20px; text-align: center;">
              <p style="font-size: 12px; color: #9B8F88;">bloom focus · bloomfocus.org<br/><em>${TAGLINE[lang]}</em></p>
            </div>
          </div>
        </body>
        </html>`
  return { subject: e.subject(productTitle), html }
}
