import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

function wfpSignature(fields: string[], secret: string): string {
  return crypto.createHmac('md5', secret).update(fields.join(';')).digest('hex')
}

// Called by Vercel cron daily — charges subscriptions due today
export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const merchantLogin = process.env.WFP_MERCHANT_LOGIN!
  const merchantSecret = process.env.WFP_MERCHANT_SECRET!

  // Find subscriptions due for charge (next_charge_at <= now)
  const { data: subs, error } = await supabaseAdmin
    .from('subscriptions')
    .select('*')
    .eq('status', 'active')
    .lte('next_charge_at', new Date().toISOString())
    .not('rec_token', 'is', null)

  if (error || !subs?.length) {
    return NextResponse.json({ ok: true, charged: 0 })
  }

  let charged = 0
  let failed = 0

  for (const sub of subs) {
    const orderRef = `BF-RENEW-${Date.now()}-${sub.id.substring(0, 6).toUpperCase()}`
    const orderDate = Math.floor(Date.now() / 1000)
    const amount = sub.amount_usd

    const signatureFields = [
      merchantLogin, 'bloomfocus.org', orderRef,
      String(orderDate), String(amount), 'USD',
      'bloom focus Pro', '1', String(amount),
    ]
    const merchantSignature = wfpSignature(signatureFields, merchantSecret)

    try {
      const res = await fetch('https://api.wayforpay.com/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionType: 'CHARGE',
          merchantAccount: merchantLogin,
          merchantDomainName: 'bloomfocus.org',
          merchantSignature,
          apiVersion: 1,
          orderReference: orderRef,
          orderDate,
          amount,
          currency: 'USD',
          productName: ['bloom focus Pro'],
          productPrice: [amount],
          productCount: [1],
          recToken: sub.rec_token,
        }),
      })

      const data = await res.json()

      if (data.transactionStatus === 'Approved') {
        const periodDays = sub.plan === 'annual' ? 365 : 30
        const newPeriodEnd = new Date(Date.now() + periodDays * 24 * 60 * 60 * 1000)
        const newNextCharge = new Date(newPeriodEnd.getTime() - 3 * 24 * 60 * 60 * 1000)

        await supabaseAdmin.from('subscriptions').update({
          current_period_start: new Date().toISOString(),
          current_period_end: newPeriodEnd.toISOString(),
          next_charge_at: newNextCharge.toISOString(),
          updated_at: new Date().toISOString(),
        }).eq('id', sub.id)

        // Extend pro_until for user
        await supabaseAdmin.from('profiles').update({
          is_pro: true,
          pro_until: newPeriodEnd.toISOString(),
        }).eq('email', sub.customer_email)

        charged++
      } else {
        // Charge failed — deactivate after 3 failed attempts or immediately
        await supabaseAdmin.from('subscriptions').update({
          status: 'failed',
          updated_at: new Date().toISOString(),
        }).eq('id', sub.id)

        await supabaseAdmin.from('profiles').update({
          is_pro: false,
        }).eq('email', sub.customer_email)

        failed++
      }
    } catch (e) {
      console.error('Charge failed for sub:', sub.id, e)
      failed++
    }
  }

  return NextResponse.json({ ok: true, charged, failed, total: subs.length })
}
