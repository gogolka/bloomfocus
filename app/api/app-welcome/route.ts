import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// Minutes to wait after registration before the welcome email arrives.
const DELAY_MINUTES = 20

function welcomeEmail(name: string) {
  return `
  <!DOCTYPE html><html><body style="font-family: Georgia, serif; background: #FFF8F0; margin: 0; padding: 40px 20px;">
    <div style="max-width: 560px; margin: 0 auto; background: #FEFCFA; border-radius: 20px; padding: 40px; border: 1px solid rgba(45,41,38,0.08);">
      <div style="text-align:center; margin-bottom: 28px;">
        <div style="font-size: 40px; margin-bottom: 12px;">🌸</div>
        <div style="font-size: 24px; color: #2D2926;">bloom <em style="color:#B8A4E8;">focus</em></div>
      </div>
      <h1 style="font-size: 22px; color:#2D2926; margin-bottom: 10px;">${name ? name + ', welcome in' : 'Welcome in'} 🌱</h1>
      <p style="font-size: 15px; color:#6B5F58; line-height: 1.7; margin-bottom: 16px;">Your bloom focus account is ready, and we're really glad you're here. This little space was built for ADHD brains, so there is no pressure to use all of it at once or to do it perfectly.</p>
      <p style="font-size: 15px; color:#6B5F58; line-height: 1.7; margin-bottom: 8px;">If you're not sure where to begin, here is the gentlest possible first step:</p>
      <ul style="font-size: 15px; color:#6B5F58; line-height: 1.8; margin: 0 0 20px; padding-left: 20px;">
        <li>Open the brain dump and empty whatever is rattling around your head right now.</li>
        <li>Turn one of those lines into a single small task.</li>
        <li>Water your plant by checking it off — that's a whole win, and it counts.</li>
      </ul>
      <div style="text-align:center; margin-bottom: 24px;">
        <a href="https://bloomfocus.org/app" style="display:inline-block; background:#B8A4E8; color:white; padding: 13px 28px; border-radius: 100px; text-decoration:none; font-size: 14px; font-weight: 600;">Open your toolkit →</a>
      </div>
      <div style="background:#E8DEFF; border-radius: 14px; padding: 20px; text-align:center; margin-bottom: 24px;">
        <p style="font-size: 13px; color:#6B5F58; margin: 0 0 6px;">And if you'd like printable planners too — 15% off your first order</p>
        <p style="font-size: 22px; font-weight: 700; letter-spacing: 0.12em; color:#7B5FCC; margin: 0;">BLOOM15</p>
      </div>
      <div style="border-top: 1px solid rgba(45,41,38,0.08); margin-top: 8px; padding-top: 18px; text-align:center;">
        <p style="font-size: 12px; color:#9B8F88;">bloom focus · bloomfocus.org<br/><em>Planning that works with your brain, not against it.</em></p>
      </div>
    </div>
  </body></html>`
}

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()
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
        attributes: { FIRSTNAME: name || '', SOURCE: 'app-signup' },
      }),
    }).catch(() => {})

    // Schedule the welcome email to arrive DELAY_MINUTES after registration.
    // Brevo holds it and delivers at scheduledAt — no cron needed on our side.
    const scheduledAt = new Date(Date.now() + DELAY_MINUTES * 60 * 1000).toISOString()
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { name: 'bloom focus', email: 'hello.bloomfocus@gmail.com' },
        to: [{ email: clean, name: name || clean }],
        subject: 'Welcome to bloom focus 🌸',
        htmlContent: welcomeEmail(name || ''),
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
          sender: { name: 'bloom focus', email: 'hello.bloomfocus@gmail.com' },
          to: [{ email: clean, name: name || clean }],
          subject: 'Welcome to bloom focus 🌸',
          htmlContent: welcomeEmail(name || ''),
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
