import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

function welcomeEmail(name: string) {
  return `
  <!DOCTYPE html><html><body style="font-family: Georgia, serif; background: #FFF8F0; margin: 0; padding: 40px 20px;">
    <div style="max-width: 560px; margin: 0 auto; background: #FEFCFA; border-radius: 20px; padding: 40px; border: 1px solid rgba(45,41,38,0.08);">
      <div style="text-align:center; margin-bottom: 28px;">
        <div style="font-size: 40px; margin-bottom: 12px;">🌱</div>
        <div style="font-size: 24px; color: #2D2926;">bloom <em style="color:#B8A4E8;">focus</em></div>
      </div>
      <h1 style="font-size: 22px; color:#2D2926; margin-bottom: 10px;">${name ? name + ', welcome' : 'Welcome'} to bloom focus</h1>
      <p style="font-size: 15px; color:#6B5F58; line-height: 1.7; margin-bottom: 20px;">Thank you for joining. From time to time we'll send you gentle, practical tools and ideas for working with an ADHD brain instead of against it — never spam, and you can leave whenever you like.</p>
      <div style="background:#E8DEFF; border-radius: 14px; padding: 24px; text-align:center; margin-bottom: 24px;">
        <p style="font-size: 13px; color:#6B5F58; margin: 0 0 8px;">A little welcome gift — 15% off your first order</p>
        <p style="font-size: 26px; font-weight: 700; letter-spacing: 0.12em; color:#7B5FCC; margin: 0 0 12px;">BLOOM15</p>
        <a href="https://bloomfocus.org/shop" style="display:inline-block; background:#B8A4E8; color:white; padding: 12px 26px; border-radius: 100px; text-decoration:none; font-size: 14px; font-weight: 600;">Explore the shop →</a>
      </div>
      <div style="border-top: 1px solid rgba(45,41,38,0.08); margin-top: 28px; padding-top: 18px; text-align:center;">
        <p style="font-size: 12px; color:#9B8F88;">bloom focus · bloomfocus.org<br/><em>Planning that works with your brain, not against it.</em></p>
      </div>
    </div>
  </body></html>`
}

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()
    const clean = typeof email === 'string' ? email.trim().toLowerCase() : ''
    // Basic shape check so we don't store obvious junk.
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

    // Add the contact to Brevo (tagged as a newsletter signup) for sending.
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: clean,
        updateEnabled: true,
        attributes: { FIRSTNAME: name || '', SOURCE: 'newsletter' },
      }),
    }).catch(() => {})

    // Send a gentle welcome + discount.
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { name: 'bloom focus', email: 'hello.bloomfocus@gmail.com' },
        to: [{ email: clean, name: name || clean }],
        subject: 'Welcome to bloom focus 🌱 (here\'s 15% off)',
        htmlContent: welcomeEmail(name || ''),
      }),
    }).catch(() => {})

    return NextResponse.json({ ok: true, subscribed: true, emailed: true })
  } catch (e) {
    console.error('subscribe error', e)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
