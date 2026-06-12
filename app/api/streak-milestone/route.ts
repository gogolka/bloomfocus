import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const MILESTONES = [3, 7, 14, 30]

// Tailored encouragement per milestone — kind, ADHD-aware, never shaming.
const COPY: Record<number, { headline: string; body: string }> = {
  3: {
    headline: 'Three days in a row 🌱',
    body: 'Three days might sound small, but for an ADHD brain it is the hardest part — you showed up when starting is the whole battle. Your plant noticed.',
  },
  7: {
    headline: 'A full week 🌿',
    body: 'Seven days of showing up, in your own way, at your own pace. This is what momentum feels like when it is built on kindness instead of pressure.',
  },
  14: {
    headline: 'Two weeks strong 🌸',
    body: 'Two weeks is no longer a streak you are trying to start — it is a rhythm you are living. Your plant is blooming because you kept coming back.',
  },
  30: {
    headline: 'Thirty days 🌺',
    body: 'A whole month. Not perfectly, not without messy days, but you returned again and again — and that is exactly the point. This is a genuinely big deal.',
  },
}

function emailHtml(name: string, streak: number) {
  const c = COPY[streak] || COPY[3]
  return `
  <!DOCTYPE html><html><body style="font-family: Georgia, serif; background: #FFF8F0; margin: 0; padding: 40px 20px;">
    <div style="max-width: 560px; margin: 0 auto; background: #FEFCFA; border-radius: 20px; padding: 40px; border: 1px solid rgba(45,41,38,0.08);">
      <div style="text-align:center; margin-bottom: 28px;">
        <div style="font-size: 40px; margin-bottom: 12px;">🔥</div>
        <div style="font-size: 24px; color: #2D2926;">bloom <em style="color:#B8A4E8;">focus</em></div>
      </div>
      <div style="text-align:center; background: linear-gradient(135deg,#E8DEFF 0%, #FFD6C4 100%); border-radius: 16px; padding: 28px; margin-bottom: 24px;">
        <div style="font-size: 52px; color:#2D2926; line-height:1; margin-bottom: 6px;">${streak}</div>
        <div style="font-size: 13px; color:#6B5F58; letter-spacing: 0.08em; text-transform: uppercase;">day streak</div>
      </div>
      <h1 style="font-size: 22px; color:#2D2926; margin-bottom: 10px;">${c.headline}</h1>
      <p style="font-size: 15px; color:#6B5F58; line-height: 1.7; margin-bottom: 24px;">${name ? name + ', ' : ''}${c.body}</p>
      <div style="text-align:center; margin-bottom: 8px;">
        <a href="https://bloomfocus.org/app" style="display:inline-block; background:#B8A4E8; color:white; padding: 14px 28px; border-radius: 100px; text-decoration:none; font-size: 15px; font-weight: 600;">Open bloom focus →</a>
      </div>
      <div style="border-top: 1px solid rgba(45,41,38,0.08); margin-top: 32px; padding-top: 20px; text-align:center;">
        <p style="font-size: 12px; color:#9B8F88;">bloom focus · bloomfocus.org<br/><em>Planning that works with your brain, not against it.</em></p>
      </div>
    </div>
  </body></html>`
}

export async function POST(req: NextRequest) {
  try {
    const token = (req.headers.get('Authorization') || '').replace('Bearer ', '').trim()
    if (!token) return NextResponse.json({ error: 'No token' }, { status: 401 })

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    // Client scoped to the user's token: RLS lets it read/update only their row.
    const supa = createClient(url, anon, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    })

    const { data: { user } } = await supa.auth.getUser()
    if (!user?.email) return NextResponse.json({ error: 'No user' }, { status: 401 })

    const { data: xp } = await supa
      .from('user_xp')
      .select('streak_days, streak_email_max')
      .eq('user_id', user.id)
      .single()
    if (!xp) return NextResponse.json({ sent: false })

    const already = xp.streak_email_max || 0
    // Highest milestone reached but not yet emailed.
    const milestone = MILESTONES.filter(m => xp.streak_days >= m && m > already).pop()
    if (!milestone) return NextResponse.json({ sent: false })

    const { data: profile } = await supa
      .from('profiles')
      .select('display_name')
      .eq('id', user.id)
      .single()
    const name = profile?.display_name || ''

    const brevoApiKey = process.env.BREVO_API_KEY
    if (brevoApiKey) {
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: { name: 'bloom focus', email: 'hello.bloomfocus@gmail.com' },
          to: [{ email: user.email, name: name || user.email }],
          subject: `🔥 ${milestone}-day streak — look at you go!`,
          htmlContent: emailHtml(name, milestone),
        }),
      })
    }

    // Dedupe: never email the same milestone twice.
    await supa.from('user_xp').update({ streak_email_max: milestone }).eq('user_id', user.id)

    return NextResponse.json({ sent: true, milestone })
  } catch (e) {
    console.error('streak-milestone error', e)
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
