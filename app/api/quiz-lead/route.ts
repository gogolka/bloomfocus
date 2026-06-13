import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { quiz } from '@/lib/i18n-quiz'

const LOCALES = ['en', 'de', 'fr', 'es'] as const
type Lang = (typeof LOCALES)[number]

// Canonical English labels — stored in the DB / Brevo so analytics stay in one language.
const RESULT_LABELS: Record<string, string> = {
  negative: 'Low ADHD indicators',
  inattentive: 'Primarily Inattentive Type',
  hyperactive: 'Primarily Hyperactive-Impulsive Type',
  combined: 'Combined Type',
}

const EMAILS: Record<Lang, {
  subject: (label: string) => string
  heading: (label: string) => string
  intro: (name: string) => string
  discountLabel: string
  shopBtn: string
  disclaimer: string
  footerTagline: string
}> = {
  en: {
    subject: (l) => `Your ADHD type: ${l} 🧠`,
    heading: (l) => `Your ADHD type: ${l}`,
    intro: (n) => `${n ? n + ', thank you' : 'Thank you'} for taking the assessment. Remember, this is a self-reflection tool, not a diagnosis — but it can be a helpful starting point for understanding how your brain works.`,
    discountLabel: `Your exclusive 15% discount`,
    shopBtn: `Shop the toolkit →`,
    disclaimer: `A formal diagnosis requires a licensed professional. If you recognize yourself in these patterns, it may be worth speaking with one.`,
    footerTagline: `Planning that works with your brain, not against it.`,
  },
  de: {
    subject: (l) => `Dein ADHS-Typ: ${l} 🧠`,
    heading: (l) => `Dein ADHS-Typ: ${l}`,
    intro: (n) => `${n ? n + ', danke' : 'Danke'}, dass du den Test gemacht hast. Denk daran: Das ist ein Werkzeug zur Selbstreflexion, keine Diagnose – aber ein hilfreicher Ausgangspunkt, um zu verstehen, wie dein Gehirn funktioniert.`,
    discountLabel: `Dein exklusiver 15 %-Rabatt`,
    shopBtn: `Zum Toolkit →`,
    disclaimer: `Eine formale Diagnose erfordert eine Fachperson. Wenn du dich in diesen Mustern wiedererkennst, lohnt sich vielleicht ein Gespräch.`,
    footerTagline: `Planung, die mit deinem Gehirn arbeitet, nicht gegen es.`,
  },
  fr: {
    subject: (l) => `Ton type de TDAH : ${l} 🧠`,
    heading: (l) => `Ton type de TDAH : ${l}`,
    intro: (n) => `${n ? n + ', merci' : 'Merci'} d'avoir fait le test. Rappelle-toi : c'est un outil d'auto-réflexion, pas un diagnostic – mais un bon point de départ pour comprendre comment fonctionne ton cerveau.`,
    discountLabel: `Ta réduction exclusive de 15 %`,
    shopBtn: `Découvrir les outils →`,
    disclaimer: `Un diagnostic formel nécessite un·e professionnel·le. Si tu te reconnais dans ces schémas, il peut être utile d'en parler.`,
    footerTagline: `Une organisation qui travaille avec ton cerveau, pas contre lui.`,
  },
  es: {
    subject: (l) => `Tu tipo de TDAH: ${l} 🧠`,
    heading: (l) => `Tu tipo de TDAH: ${l}`,
    intro: (n) => `${n ? n + ', gracias' : 'Gracias'} por hacer el test. Recuerda: es una herramienta de autorreflexión, no un diagnóstico, pero puede ser un buen punto de partida para entender cómo funciona tu cerebro.`,
    discountLabel: `Tu descuento exclusivo del 15 %`,
    shopBtn: `Ver las herramientas →`,
    disclaimer: `Un diagnóstico formal requiere un·a profesional. Si te reconoces en estos patrones, quizá valga la pena hablar con uno·a.`,
    footerTagline: `Una planificación que trabaja con tu cerebro, no contra él.`,
  },
}

function resultEmail(lang: Lang, name: string, label: string) {
  const e = EMAILS[lang]
  return `
  <!DOCTYPE html><html><body style="font-family: Georgia, serif; background: #FFF8F0; margin: 0; padding: 40px 20px;">
    <div style="max-width: 560px; margin: 0 auto; background: #FEFCFA; border-radius: 20px; padding: 40px; border: 1px solid rgba(45,41,38,0.08);">
      <div style="text-align:center; margin-bottom: 28px;">
        <div style="font-size: 40px; margin-bottom: 12px;">🧠</div>
        <div style="font-size: 24px; color: #2D2926;">bloom <em style="color:#B8A4E8;">focus</em></div>
      </div>
      <h1 style="font-size: 22px; color:#2D2926; margin-bottom: 10px;">${e.heading(label)}</h1>
      <p style="font-size: 15px; color:#6B5F58; line-height: 1.7; margin-bottom: 20px;">${e.intro(name)}</p>
      <div style="background:#E8DEFF; border-radius: 14px; padding: 24px; text-align:center; margin-bottom: 24px;">
        <p style="font-size: 13px; color:#6B5F58; margin: 0 0 8px;">${e.discountLabel}</p>
        <p style="font-size: 26px; font-weight: 700; letter-spacing: 0.12em; color:#7B5FCC; margin: 0 0 12px;">BLOOM15</p>
        <a href="https://bloomfocus.org/shop" style="display:inline-block; background:#B8A4E8; color:white; padding: 12px 26px; border-radius: 100px; text-decoration:none; font-size: 14px; font-weight: 600;">${e.shopBtn}</a>
      </div>
      <p style="font-size: 13px; color:#9B8F88; line-height: 1.6;">${e.disclaimer}</p>
      <div style="border-top: 1px solid rgba(45,41,38,0.08); margin-top: 28px; padding-top: 18px; text-align:center;">
        <p style="font-size: 12px; color:#9B8F88;">bloom focus · bloomfocus.org<br/><em>${e.footerTagline}</em></p>
      </div>
    </div>
  </body></html>`
}

export async function POST(req: NextRequest) {
  try {
    const { email, name, result, lang } = await req.json()
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'No email' }, { status: 400 })
    }
    const loc: Lang = LOCALES.includes(lang) ? lang : 'en'
    const canonicalLabel = RESULT_LABELS[result] || 'ADHD self-assessment'
    const localizedLabel = (quiz[loc].results as any)[result]?.title || canonicalLabel

    // Save the lead in your own database first — source of truth, independent of Brevo.
    try {
      await supabaseAdmin
        .from('leads')
        .upsert(
          { email: email.trim().toLowerCase(), name: name || null, adhd_type: canonicalLabel, source: 'adhd-quiz' },
          { onConflict: 'email', ignoreDuplicates: true }
        )
    } catch (e) {
      console.error('lead save to supabase failed', e)
    }

    const brevoApiKey = process.env.BREVO_API_KEY
    if (!brevoApiKey) return NextResponse.json({ ok: true, captured: true, emailed: false })

    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        attributes: { FIRSTNAME: name || '', ADHD_TYPE: canonicalLabel, SOURCE: 'adhd-quiz', LANG: loc },
      }),
    }).catch(() => {})

    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { name: 'bloom focus', email: 'hello.bloomfocus@gmail.com' },
        to: [{ email, name: name || email }],
        subject: EMAILS[loc].subject(localizedLabel),
        htmlContent: resultEmail(loc, name || '', localizedLabel),
      }),
    }).catch(() => {})

    return NextResponse.json({ ok: true, captured: true })
  } catch (e) {
    console.error('quiz-lead error', e)
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
