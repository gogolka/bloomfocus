import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { newsletterWelcome, emailLang } from '@/lib/i18n-email'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { email, name, lang } = await req.json()
    const loc = emailLang(lang)
    const clean = typeof email === 'string' ? email.trim().toLowerCase() : ''
    if (!clean || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean)) {
      return NextResponse.json({ error: 'Please enter a valid email' }, { status: 400 })
    }

    // Save the subscriber in your own database first (source = newsletter).
    try {
      await supabaseAdmin
        .from('leads')
        .upsert(
          { email: clean, name: name || null, adhd_type: null, source: 'newsletter' },
          { onConflict: 'email', ignoreDuplicates: true }
        )
    } catch (e) {
      console.error('subscribe: supabase save failed', e)
    }

    const brevoApiKey = process.env.BREVO_API_KEY
    if (!brevoApiKey) return NextResponse.json({ ok: true, subscribed: true, emailed: false })

    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: clean,
        updateEnabled: true,
        attributes: { FIRSTNAME: name || '', SOURCE: 'newsletter', LANG: loc },
      }),
    }).catch(() => {})

    const mail = newsletterWelcome(loc, name || '')
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { name: 'bloom focus', email: 'hello.bloomfocus@gmail.com' },
        to: [{ email: clean, name: name || clean }],
        subject: mail.subject,
        htmlContent: mail.html,
      }),
    }).catch(() => {})

    return NextResponse.json({ ok: true, subscribed: true, emailed: true })
  } catch (e) {
    console.error('subscribe error', e)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
