import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { appWelcome, emailLang } from '@/lib/i18n-email'

export const dynamic = 'force-dynamic'

// Minutes to wait after registration before the welcome email arrives.
const DELAY_MINUTES = 20

export async function POST(req: NextRequest) {
  try {
    const { email, name, lang } = await req.json()
    const loc = emailLang(lang)
    const clean = typeof email === 'string' ? email.trim().toLowerCase() : ''
    if (!clean || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean)) {
      return NextResponse.json({ error: 'No valid email' }, { status: 400 })
    }

    // Save the new sign-up as a lead (source = app) so they're in your own list too.
    try {
      await supabaseAdmin
        .from('leads')
        .upsert(
          { email: clean, name: name || null, adhd_type: null, source: 'app' },
          { onConflict: 'email', ignoreDuplicates: true }
        )
    } catch (e) {
      console.error('app-welcome: supabase save failed', e)
    }

    const brevoApiKey = process.env.BREVO_API_KEY
    if (!brevoApiKey) return NextResponse.json({ ok: true, scheduled: false })

    // Tag the contact in Brevo as an app sign-up.
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: clean,
        updateEnabled: true,
        attributes: { FIRSTNAME: name || '', SOURCE: 'app-signup', LANG: loc },
      }),
    }).catch(() => {})

    // Schedule the welcome email to arrive DELAY_MINUTES after registration.
    // Brevo holds it and delivers at scheduledAt — no cron needed on our side.
    const mail = appWelcome(loc, name || '')
    const scheduledAt = new Date(Date.now() + DELAY_MINUTES * 60 * 1000).toISOString()
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { name: 'bloom focus', email: 'hello@bloomfocus.org' },
        to: [{ email: clean, name: name || clean }],
        subject: mail.subject,
        htmlContent: mail.html,
        scheduledAt,
      }),
    })

    // If the plan doesn't allow scheduledAt, fall back to sending immediately.
    if (!res.ok) {
      const detail = await res.text()
      console.error('app-welcome scheduled send failed, retrying immediate', res.status, detail.slice(0, 200))
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: { name: 'bloom focus', email: 'hello@bloomfocus.org' },
          to: [{ email: clean, name: name || clean }],
          subject: mail.subject,
          htmlContent: mail.html,
        }),
      }).catch(() => {})
      return NextResponse.json({ ok: true, scheduled: false, sentImmediately: true })
    }

    return NextResponse.json({ ok: true, scheduled: true, scheduledAt })
  } catch (e) {
    console.error('app-welcome error', e)
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
