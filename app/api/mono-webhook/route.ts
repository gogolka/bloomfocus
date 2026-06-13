import { NextRequest, NextResponse } from 'next/server'
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
  orderNumber: string
) {
  const brevoApiKey = process.env.BREVO_API_KEY
  if (!brevoApiKey) return

  await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': brevoApiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'bloom focus', email: 'hello.bloomfocus@gmail.com' },
      to: [{ email, name: customerName || email }],
      subject: `Your download is ready — ${productTitle} 🌸`,
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Georgia, serif; background: #FFF8F0; margin: 0; padding: 40px 20px;">
          <div style="max-width: 560px; margin: 0 auto; background: #FEFCFA; border-radius: 20px; padding: 40px; border: 1px solid rgba(45,41,38,0.08);">
            
            <div style="text-align: center; margin-bottom: 32px;">
              <div style="font-size: 40px; margin-bottom: 12px;">🌸</div>
              <div style="font-size: 24px; color: #2D2926; letter-spacing: -0.5px;">
                bloom <em style="color: #B8A4E8;">focus</em>
              </div>
            </div>

            <h1 style="font-size: 22px; color: #2D2926; margin-bottom: 8px; line-height: 1.3;">
              Your download is ready!
            </h1>
            <p style="font-size: 15px; color: #6B5F58; line-height: 1.7; margin-bottom: 24px;">
              Thank you for your purchase. Your <strong>${productTitle}</strong> is ready to download.
            </p>

            <div style="background: #E8DEFF; border-radius: 14px; padding: 24px; text-align: center; margin-bottom: 24px;">
              <p style="font-size: 14px; color: #6B5F58; margin-bottom: 16px;">
                Click the button below to download your file.<br/>
                <em>This link is valid for 24 hours and can be used up to 3 times.</em>
              </p>
              <a href="${downloadUrl}" style="display: inline-block; background: #B8A4E8; color: white; padding: 14px 28px; border-radius: 100px; text-decoration: none; font-size: 15px; font-weight: 600;">
                Download now →
              </a>
            </div>

            <div style="background: #FFF3EC; border: 1px solid rgba(255,180,140,0.45); border-radius: 14px; padding: 22px; margin-bottom: 24px;">
              <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #C07A3E; margin-bottom: 12px;">🎁 A little thank-you</div>
              <p style="font-size: 14px; color: #2D2926; line-height: 1.7; margin: 0 0 4px;"><strong>Your free companion app</strong></p>
              <p style="font-size: 14px; color: #6B5F58; line-height: 1.7; margin: 0 0 14px;">Tasks, habits, a focus timer and a brain dump that turns into to-dos — all free, right in your browser.</p>
              <div style="text-align: center; margin-bottom: 20px;">
                <a href="https://bloomfocus.org/app" style="display: inline-block; background: #B8A4E8; color: white; padding: 11px 24px; border-radius: 100px; text-decoration: none; font-size: 14px; font-weight: 600;">Open the free app →</a>
              </div>
              <p style="font-size: 14px; color: #2D2926; line-height: 1.7; margin: 0 0 10px;"><strong>${BONUS_PERCENT}% off your next order</strong> as a thank-you — use this code at checkout:</p>
              <div style="text-align: center; background: #FEFCFA; border: 1px dashed #C07A3E; border-radius: 10px; padding: 12px;">
                <span style="font-size: 20px; font-weight: 700; letter-spacing: 0.14em; color: #C07A3E;">${BONUS_CODE}</span>
              </div>
            </div>

            <p style="font-size: 13px; color: #9B8F88; line-height: 1.6; margin-bottom: 8px;">
              Order number: <strong>${orderNumber}</strong>
            </p>
            <p style="font-size: 13px; color: #9B8F88; line-height: 1.6;">
              If the link expires or you need help, reply to this email.
            </p>

            <div style="border-top: 1px solid rgba(45,41,38,0.08); margin-top: 32px; padding-top: 20px; text-align: center;">
              <p style="font-size: 12px; color: #9B8F88;">
                bloom focus · bloomfocus.org<br/>
                <em>Planning that works with your brain, not against it.</em>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
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
        order.order_number
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
