import { NextRequest, NextResponse } from 'next/server'
import { purchaseEmail, emailLang } from '@/lib/i18n-email'
import { supabaseAdmin } from '@/lib/supabase'
import crypto from 'crypto'

// Post-purchase bonus. Keep this in sync with the THANKYOU row in promo_codes:
// if you change the percent here, also update promo_codes so checkout matches.
const BONUS_CODE = 'THANKYOU'
const BONUS_PERCENT = 10

// Verify Monobank webhook signature
function verifyMonoSignature(body: string, signature: string, publicKey: string): boolean {
  try {
    const verify = crypto.createVerify('SHA256')
    verify.update(body)
    return verify.verify(publicKey, signature, 'base64')
  } catch {
    return false
  }
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
    const body = await req.text()
    const signature = req.headers.get('X-Sign') || ''

    // Verify signature if public key is set
    const monoPublicKey = process.env.MONO_PUBLIC_KEY
    if (monoPublicKey && signature) {
      const isValid = verifyMonoSignature(body, signature, monoPublicKey)
      if (!isValid) {
        console.error('Invalid Monobank signature')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const payload = JSON.parse(body)
    const { invoiceId, status, paymentId } = payload

    if (!invoiceId) {
      return NextResponse.json({ error: 'Missing invoiceId' }, { status: 400 })
    }

    // Find order by invoice ID
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*, products(*)')
      .eq('mono_invoice_id', invoiceId)
      .single()

    if (orderError || !order) {
      console.error('Order not found for invoice:', invoiceId)
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Handle payment status
    if (status === 'success') {
      // Generate download token
      const downloadToken = crypto.randomBytes(32).toString('hex')
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

      // Update order to paid
      await supabaseAdmin
        .from('orders')
        .update({
          status: 'paid',
          mono_payment_id: paymentId,
          download_token: downloadToken,
          download_token_expires_at: expiresAt.toISOString(),
          paid_at: new Date().toISOString(),
        })
        .eq('id', order.id)

      // Send download email
      const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/download?token=${downloadToken}`

      await sendDownloadEmail(
        order.customer_email,
        order.customer_name,
        order.products.title,
        downloadUrl,
        order.order_number,
        order.lang,
      )

      // Mark email as sent
      await supabaseAdmin
        .from('orders')
        .update({ email_sent: true })
        .eq('id', order.id)

    } else if (status === 'failure' || status === 'expired') {
      await supabaseAdmin
        .from('orders')
        .update({ status: 'failed' })
        .eq('id', order.id)
    }

    return NextResponse.json({ ok: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
