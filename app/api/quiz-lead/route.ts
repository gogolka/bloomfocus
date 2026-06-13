import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

const RESULT_LABELS: Record<string, string> = {
  negative: 'Low ADHD indicators',
  inattentive: 'Primarily Inattentive Type',
  hyperactive: 'Primarily Hyperactive-Impulsive Type',
  combined: 'Combined Type',
}

function resultEmail(name: string, label: string) {
  return `
  <!DOCTYPE html><html><body style="font-family: Georgia, serif; background: #FFF8F0; margin: 0; padding: 40px 20px;">
    <div style="max-width: 560px; margin: 0 auto; background: #FEFCFA; border-radius: 20px; padding: 40px; border: 1px solid rgba(45,41,38,0.08);">
      <div style="text-align:center; margin-bottom: 28px;">
        <div style="font-size: 40px; margin-bottom: 12px;">🧠</div>
        <div style="font-size: 24px; color: #2D2926;">bloom <em style="color:#B8A4E8;">focus</em></div>
      </div>
      <h1 style="font-size: 22px; color:#2D2926; margin-bottom: 10px;">Your ADHD type: ${label}</h1>
      <p style="font-size: 15px; color:#6B5F58; line-height: 1.7; margin-bottom: 20px;">${name ? name + ', thank you' : 'Thank you'} for taking the assessment. Remember, this is a self-reflection tool, not a diagnosis — but it can be a helpful starting point for understanding how your brain works.</p>
      <div style="background:#E8DEFF; border-radius: 14px; padding: 24px; text-align:center; margin-bottom: 24px;">
        <p style="font-size: 13px; color:#6B5F58; margin: 0 0 8px;">Your exclusive 15% discount</p>
        <p style="font-size: 26px; font-weight: 700; letter-spacing: 0.12em; color:#7B5FCC; margin: 0 0 12px;">BLOOM15</p>
        <a href="https://bloomfocus.org/shop" style="display:inline-block; background:#B8A4E8; color:white; padding: 12px 26px; border-radius: 100px; text-decoration:none; font-size: 14px; font-weight: 600;">Shop the toolkit →</a>
      </div>
      <p style="font-size: 13px; color:#9B8F88; line-height: 1.6;">A formal diagnosis requires a licensed professional. If you recognize yourself in these patterns, it may be worth speaking with one.</p>
      <div style="border-top: 1px solid rgba(45,41,38,0.08); margin-top: 28px; padding-top: 18px; text-align:center;">
        <p style="font-size: 12px; color:#9B8F88;">bloom focus · bloomfocus.org<br/><em>Planning that works with your brain, not against it.</em></p>
      </div>
    </div>
  </body></html>`
}

export async function POST(req: NextRequest) {
  try {
    const { email, name, result } = await req.json()
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'No email' }, { status: 400 })
    }
    const label = RESULT_LABELS[result] || 'ADHD self-assessment'

    // Save the lead in your own database first — this is your source of truth and
    // is independent of Brevo. Duplicate emails are silently ignored.
    try {
      await supabaseAdmin
        .from('leads')
        .upsert(
          { email: email.trim().toLowerCase(), name: name || null, adhd_type: label, source: 'adhd-quiz' },
          { onConflict: 'email', ignoreDuplicates: true }
        )
    } catch (e) {
      console.error('lead save to supabase failed', e)
    }

    const brevoApiKey = process.env.BREVO_API_KEY
    if (!brevoApiKey) return NextResponse.json({ ok: true, captured: true, emailed: false })

    // Upsert the contact so the lead is saved (and tagged with their type).
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        attributes: {
          FIRSTNAME: name || '',
          ADHD_TYPE: label,
          SOURCE: 'adhd-quiz',
        },
      }),
    }).catch(() => {})

    // Send the result + discount email.
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { name: 'bloom focus', email: 'hello.bloomfocus@gmail.com' },
        to: [{ email, name: name || email }],
        subject: `Your ADHD type: ${label} 🧠`,
        htmlContent: resultEmail(name || '', label),
      }),
    }).catch(() => {})

    return NextResponse.json({ ok: true, captured: true })
  } catch (e) {
    console.error('quiz-lead error', e)
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
