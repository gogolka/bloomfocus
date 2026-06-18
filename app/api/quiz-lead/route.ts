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

// Per-result descriptions for the email — 3–4 sentences, warm and informative
const RESULT_COPY: Record<string, Record<Lang, { what: string; looks: string; note: string }>> = {
  inattentive: {
    en: {
      what: `The inattentive type is the quietest presentation of ADHD — and the most frequently missed. It's not about hyperactivity or disrupting a class; it's about a brain that drifts, loses track, and struggles to start things even when it genuinely wants to.`,
      looks: `In day-to-day life, this often looks like forgotten deadlines, a dozen half-finished projects, conversations that slip away mid-sentence, and a persistent sense of running behind no matter how hard you try. Many people with this type spent years being called "dreamy" or told they just needed to try harder.`,
      note: `The inattentive type is especially common in women and people who were high-achieving students — masking and overcompensation can hide it for decades.`,
    },
    de: {
      what: `Der unaufmerksame Typ ist die leiseste Form von ADHS – und wird am häufigsten übersehen. Es geht nicht um Hyperaktivität oder Störungen, sondern um ein Gehirn, das abdriftet, den Faden verliert und Schwierigkeiten hat anzufangen, auch wenn es das wirklich möchte.`,
      looks: `Im Alltag zeigt sich das oft als vergessene Fristen, ein Dutzend halbfertige Projekte und das anhaltende Gefühl, immer zu spät zu sein, egal wie sehr man es versucht. Viele Menschen mit diesem Typ wurden jahrelang als „verträumt" bezeichnet oder ihnen wurde gesagt, sie müssten sich mehr anstrengen.`,
      note: `Der unaufmerksame Typ ist besonders häufig bei Frauen und Menschen, die in der Schule Hochleistungen erbracht haben – Maskieren und Überkompensieren können ihn jahrzehntelang verbergen.`,
    },
    fr: {
      what: `Le type inattentif est la forme la plus silencieuse du TDAH — et la plus souvent manquée. Il ne s'agit pas d'hyperactivité ou de perturber une classe, mais d'un cerveau qui dérive, perd le fil et peine à démarrer les choses même quand il le veut vraiment.`,
      looks: `Au quotidien, cela ressemble souvent à des délais oubliés, une douzaine de projets à moitié terminés et un sentiment persistant d'être toujours en retard, peu importe les efforts. Beaucoup de personnes avec ce type ont passé des années à se faire appeler « rêveuses » ou à entendre qu'elles n'avaient qu'à faire plus d'efforts.`,
      note: `Le type inattentif est particulièrement fréquent chez les femmes et les personnes qui étaient de bons élèves — le masquage et la surcompensation peuvent le cacher pendant des décennies.`,
    },
    es: {
      what: `El tipo inatento es la presentación más silenciosa del TDAH, y la que más a menudo pasa desapercibida. No se trata de hiperactividad ni de interrumpir una clase; se trata de un cerebro que se desconecta, pierde el hilo y le cuesta empezar las cosas incluso cuando genuinamente quiere hacerlas.`,
      looks: `En el día a día, suele verse como plazos olvidados, una docena de proyectos a medias y una sensación persistente de ir siempre rezagado·a sin importar cuánto se intente. Muchas personas con este tipo pasaron años siendo llamadas "soñadoras" o escuchando que solo necesitaban esforzarse más.`,
      note: `El tipo inatento es especialmente frecuente en mujeres y personas que fueron estudiantes de alto rendimiento: el enmascaramiento y la sobrecompensación pueden ocultarlo durante décadas.`,
    },
  },
  hyperactive: {
    en: {
      what: `The hyperactive-impulsive type is what most people picture when they hear "ADHD" — but even here, the reality is more complex than the stereotype. It's not just fidgeting and talking too much; it's a nervous system that needs constant movement, stimulation, and output just to feel regulated.`,
      looks: `This can look like interrupting conversations, acting before thinking, a restlessness that doesn't switch off at night, and an emotional intensity that surprises even the person feeling it. Many people with this type are also remarkably creative, energetic, and able to think fast under pressure.`,
      note: `Hyperactive traits can become less physically visible with age — but the internal restlessness, impulsivity, and emotional intensity usually continue, just expressed differently.`,
    },
    de: {
      what: `Der hyperaktiv-impulsive Typ ist das, was die meisten Menschen mit „ADHS" verbinden – doch auch hier ist die Realität komplexer als das Klischee. Es geht nicht nur ums Zappeln und zu viel Reden; es ist ein Nervensystem, das ständige Bewegung, Stimulation und Output braucht, um sich reguliert zu fühlen.`,
      looks: `Das kann aussehen wie Gespräche unterbrechen, handeln bevor man denkt, eine Ruhelosigkeit, die nachts nicht aufhört, und eine emotionale Intensität, die selbst die Person, die sie erlebt, überrascht. Viele Menschen mit diesem Typ sind auch bemerkenswert kreativ, energiegeladen und können unter Druck schnell denken.`,
      note: `Hyperaktive Merkmale können mit dem Alter weniger sichtbar werden – aber die innere Unruhe, Impulsivität und emotionale Intensität bleiben meist bestehen, werden nur anders ausgedrückt.`,
    },
    fr: {
      what: `Le type hyperactif-impulsif est ce que la plupart des gens imaginent en entendant « TDAH » — mais même ici, la réalité est plus complexe que le stéréotype. Ce n'est pas seulement s'agiter et trop parler; c'est un système nerveux qui a besoin de mouvement, de stimulation et d'output constants pour se sentir régulé.`,
      looks: `Cela peut ressembler à interrompre les conversations, agir avant de penser, une agitation qui ne s'éteint pas la nuit, et une intensité émotionnelle qui surprend même la personne qui la ressent. Beaucoup de personnes avec ce type sont aussi remarquablement créatives, énergiques et capables de penser vite sous pression.`,
      note: `Les traits hyperactifs peuvent devenir moins visibles physiquement avec l'âge — mais l'agitation interne, l'impulsivité et l'intensité émotionnelle continuent généralement, juste exprimées différemment.`,
    },
    es: {
      what: `El tipo hiperactivo-impulsivo es lo que la mayoría de las personas imagina cuando oye "TDAH", pero incluso aquí la realidad es más compleja que el estereotipo. No se trata solo de moverse sin parar y hablar demasiado; es un sistema nervioso que necesita movimiento, estimulación y output constantes para sentirse regulado.`,
      looks: `Puede verse como interrumpir conversaciones, actuar antes de pensar, una inquietud que no se apaga por la noche y una intensidad emocional que sorprende incluso a quien la siente. Muchas personas con este tipo son también notablemente creativas, enérgicas y capaces de pensar rápido bajo presión.`,
      note: `Los rasgos hiperactivos pueden hacerse menos visibles físicamente con la edad, pero la inquietud interna, la impulsividad y la intensidad emocional suelen continuar, simplemente expresadas de otra manera.`,
    },
  },
  combined: {
    en: {
      what: `The combined type is the most common ADHD presentation — and often the most exhausting to live with, because it brings both the inattentive and the hyperactive-impulsive patterns together. Your brain can race ahead and lose the thread at the same time.`,
      looks: `This might mean starting a hundred things and finishing few of them, feeling simultaneously wired and foggy, emotions that arrive fast and loud, and a constant background hum of "I should be doing something else." Many people with this type describe feeling like they're always one step behind themselves.`,
      note: `The combined type often means the nervous system is dysregulated in multiple directions at once — which is why building external structure, routines, and self-compassion matters more than willpower.`,
    },
    de: {
      what: `Der kombinierte Typ ist die häufigste ADHS-Ausprägung – und oft die erschöpfendste, weil er sowohl unaufmerksame als auch hyperaktiv-impulsive Muster vereint. Das Gehirn kann gleichzeitig vorausrasen und den Faden verlieren.`,
      looks: `Das kann bedeuten: hundert Dinge beginnen und wenige beenden, sich gleichzeitig aufgedreht und benebelt fühlen, Emotionen, die schnell und laut ankommen, und ein ständiges Hintergrundsummen von „Ich sollte eigentlich etwas anderes tun." Viele Menschen mit diesem Typ beschreiben, dass sie sich ständig einen Schritt hinter sich selbst fühlen.`,
      note: `Der kombinierte Typ bedeutet oft, dass das Nervensystem in mehrere Richtungen gleichzeitig dysreguliert ist – deshalb ist der Aufbau externer Strukturen, Routinen und Selbstmitgefühl wichtiger als Willenskraft.`,
    },
    fr: {
      what: `Le type combiné est la présentation de TDAH la plus courante — et souvent la plus épuisante à vivre, car elle réunit à la fois les schémas inattentifs et hyperactifs-impulsifs. Le cerveau peut s'emballer et perdre le fil en même temps.`,
      looks: `Cela peut signifier commencer cent choses et en finir peu, se sentir à la fois survolté·e et dans le brouillard, des émotions qui arrivent vite et fort, et un bourdonnement de fond constant de « je devrais faire autre chose ». Beaucoup de personnes avec ce type décrivent le sentiment d'être toujours un pas derrière elles-mêmes.`,
      note: `Le type combiné signifie souvent que le système nerveux est dérégulé dans plusieurs directions à la fois — c'est pourquoi construire une structure externe, des routines et de l'auto-compassion compte plus que la volonté.`,
    },
    es: {
      what: `El tipo combinado es la presentación más frecuente del TDAH, y a menudo la más agotadora de vivir, porque reúne los patrones inatentos e hiperactivos-impulsivos al mismo tiempo. El cerebro puede acelerar y perder el hilo simultáneamente.`,
      looks: `Esto puede significar empezar cien cosas y terminar pocas, sentirse a la vez acelerado·a y con la mente nublada, emociones que llegan rápido y fuerte, y un zumbido de fondo constante de "debería estar haciendo otra cosa". Muchas personas con este tipo describen sentir que siempre van un paso por detrás de sí mismas.`,
      note: `El tipo combinado suele significar que el sistema nervioso está desregulado en múltiples direcciones a la vez, por eso construir estructura externa, rutinas y autocompasión importa más que la fuerza de voluntad.`,
    },
  },
  negative: {
    en: {
      what: `Your answers suggest that your current experience doesn't strongly align with ADHD patterns — which is genuinely good information to have.`,
      looks: `That said, ADHD can present differently depending on stress, sleep, context, and life stage. If you took this because something felt off, that feeling is worth paying attention to — it's always worth talking to a professional if you're concerned.`,
      note: `There are many reasons attention and focus can feel difficult that aren't ADHD. If you'd like to explore planning and productivity tools anyway, we're glad you're here.`,
    },
    de: {
      what: `Deine Antworten deuten darauf hin, dass deine aktuelle Erfahrung nicht stark mit ADHS-Mustern übereinstimmt – das ist eine wirklich nützliche Information.`,
      looks: `ADHS kann sich je nach Stress, Schlaf, Kontext und Lebensphase unterschiedlich zeigen. Wenn du diesen Test gemacht hast, weil sich etwas seltsam anfühlte, ist das Gefühl es wert, darauf zu achten – es lohnt sich immer, mit einem Fachmann zu sprechen, wenn du besorgt bist.`,
      note: `Es gibt viele Gründe, warum Aufmerksamkeit und Konzentration schwierig sein können, die kein ADHS sind. Wenn du dennoch Planungs- und Produktivitätswerkzeuge erkunden möchtest, freuen wir uns, dass du hier bist.`,
    },
    fr: {
      what: `Tes réponses suggèrent que ton expérience actuelle ne correspond pas fortement aux schémas du TDAH — c'est une information vraiment utile à avoir.`,
      looks: `Cela dit, le TDAH peut se présenter différemment selon le stress, le sommeil, le contexte et la période de vie. Si tu as fait ce test parce que quelque chose te semblait bizarre, ce sentiment mérite attention — il vaut toujours la peine de parler à un professionnel si tu t'inquiètes.`,
      note: `Il y a de nombreuses raisons pour lesquelles l'attention et la concentration peuvent être difficiles sans être du TDAH. Si tu veux explorer des outils de planification et de productivité quand même, on est contents que tu sois là.`,
    },
    es: {
      what: `Tus respuestas sugieren que tu experiencia actual no se alinea fuertemente con los patrones del TDAH, lo que es una información genuinamente útil.`,
      looks: `Dicho esto, el TDAH puede presentarse de forma diferente según el estrés, el sueño, el contexto y la etapa de vida. Si hiciste este test porque algo no te cuadraba, ese sentimiento merece atención: siempre vale la pena hablar con un profesional si tienes dudas.`,
      note: `Hay muchas razones por las que la atención y la concentración pueden resultar difíciles que no son TDAH. Si quieres explorar herramientas de planificación y productividad de todas formas, nos alegra que estés aquí.`,
    },
  },
}

function resultEmail(lang: Lang, name: string, label: string, result: string) {
  const e = EMAILS[lang]
  const isPositive = result !== 'negative'
  const copy = RESULT_COPY[result]?.[lang] || RESULT_COPY['negative'][lang]

  const typeBlock = `
      <div style="background:#F5F0FF; border-radius:14px; padding:24px; margin-bottom:24px; border:1px solid #D4C5F9;">
        <div style="font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#7B5FCC; margin-bottom:10px;">
          ${lang==='fr'?'Ton type':lang==='de'?'Dein Typ':lang==='es'?'Tu tipo':'Your type'}
        </div>
        <div style="font-size:18px; font-weight:700; color:#2D2926; font-family:Georgia,serif; margin-bottom:14px;">${label}</div>
        <p style="font-size:14px; color:#6B5F58; line-height:1.75; margin:0 0 12px;">${copy.what}</p>
        <p style="font-size:14px; color:#6B5F58; line-height:1.75; margin:0 0 12px;">${copy.looks}</p>
        <p style="font-size:13px; color:#7B5FCC; line-height:1.6; margin:0; font-style:italic;">${copy.note}</p>
      </div>`

  const workbookBlock = isPositive ? `
      <div style="background:#FFF3EC; border-radius:14px; padding:24px; margin-bottom:24px; border:1px solid rgba(255,180,140,0.4);">
        <div style="font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#C07A3E; margin-bottom:8px;">
          ${lang==='fr'?'Guide recommandé':lang==='de'?'Empfohlener Leitfaden':lang==='es'?'Guía recomendada':'Recommended guide'}
        </div>
        <p style="font-size:15px; font-weight:700; color:#2D2926; margin:0 0 6px; font-family:Georgia,serif;">
          ${lang==='fr'?'Nouveau diagnostic de TDAH — Tes 30 premiers jours':lang==='de'?'Neue ADHS-Diagnose — Die ersten 30 Tage':lang==='es'?'Nuevo diagnóstico de TDAH — Primeros 30 días':'New ADHD Diagnosis: Your First 30 Days'}
        </p>
        <p style="font-size:13px; color:#6B5F58; line-height:1.6; margin:0 0 16px;">
          ${lang==='fr'?'Un cahier doux de 44 pages pour les 30 premiers jours après le diagnostic.':lang==='de'?'Ein sanftes 44-seitiges Arbeitsheft für die ersten 30 Tage nach der Diagnose.':lang==='es'?'Un cuaderno suave de 44 páginas para los primeros 30 días tras el diagnóstico.':'A gentle 44-page workbook for the first month after diagnosis. 4 weeks · 30 daily actions · CBT-based.'}
        </p>
        <a href="https://bloomfocus.org/${lang==='en'?'':lang+'/'}shop#new-adhd-diagnosis-30-days"
          style="display:inline-block; background:#C07A3E; color:#fff; border-radius:100px; padding:12px 26px; text-decoration:none; font-size:14px; font-weight:600;">
          ${lang==='fr'?'Obtenir le guide — $8.99':lang==='de'?'Leitfaden holen — $8.99':lang==='es'?'Obtener la guía — $8.99':'Get the workbook — $8.99'}
        </a>
      </div>` : ''

  return `
  <!DOCTYPE html><html><body style="font-family: Georgia, serif; background: #FFF8F0; margin: 0; padding: 40px 20px;">
    <div style="max-width: 560px; margin: 0 auto; background: #FEFCFA; border-radius: 20px; padding: 40px; border: 1px solid rgba(45,41,38,0.08);">
      <div style="text-align:center; margin-bottom: 28px;">
        <div style="font-size: 40px; margin-bottom: 12px;">🧠</div>
        <div style="font-size: 24px; color: #2D2926;">bloom <em style="color:#B8A4E8;">focus</em></div>
      </div>
      <h1 style="font-size: 22px; color:#2D2926; margin-bottom: 10px;">${e.heading(label)}</h1>
      <p style="font-size: 15px; color:#6B5F58; line-height: 1.7; margin-bottom: 20px;">${e.intro(name)}</p>
      ${typeBlock}
      ${workbookBlock}
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
        attributes: { FIRSTNAME: name || '', ADHD_TYPE: canonicalLabel, SOURCE: 'adhd-quiz', LANG: loc, QUIZ_COMPLETED: true },
      }),
    }).catch(() => {})

    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { name: 'bloom focus', email: 'hello@bloomfocus.org' },
        to: [{ email, name: name || email }],
        subject: EMAILS[loc].subject(localizedLabel),
        htmlContent: resultEmail(loc, name || '', localizedLabel, result || 'negative'),
      }),
    }).catch(() => {})

    return NextResponse.json({ ok: true, captured: true })
  } catch (e) {
    console.error('quiz-lead error', e)
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
