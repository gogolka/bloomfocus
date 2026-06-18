import { NextRequest, NextResponse } from 'next/server'
import { purchaseEmail, emailLang } from '@/lib/i18n-email'
import { supabaseAdmin } from '@/lib/supabase'
import crypto from 'crypto'

const BONUS_CODE = 'THANKYOU'
const BONUS_PERCENT = 10

function wfpSignature(fields: string[], secret: string): string {
  return crypto.createHmac('md5', secret).update(fields.join(';')).digest('hex')
}

async function sendDownloadEmail(
  email: string,
  customerName: string | null,
  productTitle: string,
  downloadUrl: string,
  orderNumber: string,
  lang: string
) {
  const brevoApiKey = process.env.BREVO_API_KEY
  if (!brevoApiKey) return
  const loc = emailLang(lang)
  const mail = purchaseEmail(loc, {
    productTitle,
    downloadUrl,
    orderNumber,
    bonusCode: BONUS_CODE,
    bonusPercent: BONUS_PERCENT,
  })
  await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender: { name: 'bloom focus', email: 'hello.bloomfocus@gmail.com' },
      to: [{ email, name: customerName || email }],
      subject: mail.subject,
      htmlContent: mail.html,
    }),
  })
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || ''
    let body: any

    if (contentType.includes('application/json')) {
      body = await req.json()
    } else {
      // WayForPay may send form-encoded
      const text = await req.text()
      try {
        body = JSON.parse(text)
      } catch {
        const params = new URLSearchParams(text)
        body = Object.fromEntries(params.entries())
      }
    }

    console.log('WFP webhook body:', JSON.stringify(body))

    const {
      merchantAccount,
      orderReference,
      amount,
      currency,
      authCode,
      cardPan,
      transactionStatus,
      reasonCode,
      merchantSignature,
    } = body

    // Verify signature
    const secret = process.env.WFP_MERCHANT_SECRET!
    const expectedSig = wfpSignature(
      [merchantAccount, orderReference, amount, currency, authCode, cardPan, transactionStatus, reasonCode],
      secret
    )
    if (merchantSignature !== expectedSig) {
      console.error('WFP webhook: invalid signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Find order
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*, products(*)')
      .eq('mono_invoice_id', orderReference) // WFP order ref stored here
      .single()

    if (orderError || !order) {
      console.error('WFP webhook: order not found', orderReference)
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (transactionStatus === 'Approved') {
      const downloadToken = crypto.randomBytes(32).toString('hex')
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

      await supabaseAdmin
        .from('orders')
        .update({
          status: 'paid',
          download_token: downloadToken,
          download_token_expires_at: expiresAt.toISOString(),
          paid_at: new Date().toISOString(),
        })
        .eq('id', order.id)

      // If Pro product — activate Pro and create subscription
      const slug = order.products?.slug || ''
      if (slug === 'pro-monthly' || slug === 'pro-annual') {
        const isAnnual = slug === 'pro-annual'
        const periodDays = isAnnual ? 365 : 30
        const periodEnd = new Date(Date.now() + periodDays * 24 * 60 * 60 * 1000)
        const nextCharge = new Date(periodEnd.getTime() - 3 * 24 * 60 * 60 * 1000) // 3 days before

        // Find user profile by email
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('email', order.customer_email)
          .single()

        if (profile?.id) {
          await supabaseAdmin
            .from('profiles')
            .update({
              is_pro: true,
              pro_until: periodEnd.toISOString(),
              rec_token: body.recToken || null,
              subscription_plan: isAnnual ? 'annual' : 'monthly',
            })
            .eq('id', profile.id)

          // Create subscription record
          await supabaseAdmin.from('subscriptions').insert({
            user_id: profile.id,
            customer_email: order.customer_email,
            plan: isAnnual ? 'annual' : 'monthly',
            status: 'active',
            rec_token: body.recToken || null,
            amount_usd: isAnnual ? 19.99 : 1.99,
            current_period_start: new Date().toISOString(),
            current_period_end: periodEnd.toISOString(),
            next_charge_at: nextCharge.toISOString(),
          })
        }
      }

      const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/download?token=${downloadToken}`

      await sendDownloadEmail(
        order.customer_email,
        order.customer_name,
        order.products.title,
        downloadUrl,
        order.order_number,
        order.lang,
      )

      await supabaseAdmin
        .from('orders')
        .update({ email_sent: true })
        .eq('id', order.id)

    } else if (['Declined', 'Expired', 'Refunded'].includes(transactionStatus)) {
      await supabaseAdmin
        .from('orders')
        .update({ status: 'failed' })
        .eq('id', order.id)
    }

    // WayForPay requires this response
    const responseSignature = wfpSignature([orderReference, 'accept'], secret)
    return NextResponse.json({
      orderReference,
      status: 'accept',
      time: Math.floor(Date.now() / 1000),
      signature: responseSignature,
    })

  } catch (error) {
    console.error('WFP webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
