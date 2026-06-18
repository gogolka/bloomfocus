import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

// WayForPay signature: HMAC_MD5 of joined fields
function wfpSignature(fields: string[], secret: string): string {
  return crypto.createHmac('md5', secret).update(fields.join(';')).digest('hex')
}

// WayForPay language mapping
const WFP_LANG: Record<string, string> = { en: 'EN', de: 'EN', fr: 'EN', es: 'ES' }

// WayForPay currency — show USD to international buyers
const WFP_CURRENCY = 'USD'

export async function POST(req: NextRequest) {
  try {
    const { productSlug, customerEmail, customerName, promoCode, lang } = await req.json()
    const loc = ['en','de','fr','es'].includes(lang) ? lang : 'en'

    if (!productSlug || !customerEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(url, anonKey)

    // 1. Read product
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('slug', productSlug)
      .eq('is_active', true)
      .single()

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // 2. Apply promo code if provided
    let amountUsd = product.price_usd
    let discount = 0
    let appliedCode: string | null = null

    if (promoCode && typeof promoCode === 'string' && promoCode.trim()) {
      const { data: promo } = await supabase.rpc('validate_promo', { p_code: promoCode })
      const row = Array.isArray(promo) ? promo[0] : promo
      if (!row?.valid) {
        return NextResponse.json({ error: 'This promo code is no longer valid' }, { status: 400 })
      }
      const pct = Math.min(100, Math.max(0, row.discount_percent || 0))
      amountUsd = Math.max(0.5, parseFloat((product.price_usd * (100 - pct) / 100).toFixed(2)))
      discount = parseFloat((product.price_usd - amountUsd).toFixed(2))
      appliedCode = promoCode.trim().toUpperCase()
    }

    // 3. Create order
    const orderNumber = `BF-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    const orderDate = Math.floor(Date.now() / 1000)

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        product_id: product.id,
        customer_email: customerEmail,
        customer_name: customerName || null,
        amount_uah: Math.round(amountUsd * 100), // store cents
        promo_code: appliedCode,
        discount_uah: Math.round(discount * 100),
        status: 'pending',
        lang: loc,
      })
      .select()
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Failed to create order', detail: orderError?.message }, { status: 500 })
    }

    // 4. Create WayForPay invoice
    const merchantLogin = process.env.WFP_MERCHANT_LOGIN!
    const merchantSecret = process.env.WFP_MERCHANT_SECRET!
    const domain = 'bloomfocus.org'

    const signatureFields = [
      merchantLogin,
      domain,
      orderNumber,
      String(orderDate),
      String(amountUsd),
      WFP_CURRENCY,
      product.title,
      '1',
      String(amountUsd),
    ]

    const merchantSignature = wfpSignature(signatureFields, merchantSecret)

    const wfpPayload = {
      transactionType: 'CREATE_INVOICE',
      merchantAccount: merchantLogin,
      merchantAuthType: 'SimpleSignature',
      merchantDomainName: domain,
      merchantSignature,
      apiVersion: 1,
      orderReference: orderNumber,
      orderDate,
      amount: amountUsd,
      currency: WFP_CURRENCY,
      orderTimeout: 49000,
      productName: [product.title],
      productPrice: [amountUsd],
      productCount: [1],
      clientEmail: customerEmail,
      clientFirstName: customerName || '',
      returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/success?order=${orderNumber}`,
      serviceUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/wfp-webhook`,
      language: WFP_LANG[loc] || 'EN',
    }

    const wfpResponse = await fetch('https://api.wayforpay.com/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wfpPayload),
    })

    if (!wfpResponse.ok) {
      const err = await wfpResponse.text()
      console.error('WayForPay error', wfpResponse.status, err)
      return NextResponse.json({ error: 'Payment system error', detail: err }, { status: 500 })
    }

    const wfpData = await wfpResponse.json()
    console.log('WFP response:', JSON.stringify(wfpData))

    if (wfpData.reasonCode !== 1100 && wfpData.reason !== 'Ok') {
      console.error('WayForPay rejected', wfpData)
      return NextResponse.json({ error: 'Payment rejected', detail: wfpData.reason }, { status: 500 })
    }

    const paymentUrl = wfpData.invoiceUrl || wfpData.url

    await supabase
      .from('orders')
      .update({ mono_invoice_id: orderNumber })
      .eq('id', order.id)

    return NextResponse.json({ success: true, paymentUrl, orderNumber })

  } catch (error: any) {
    console.error('create-invoice threw', error?.message)
    return NextResponse.json({ error: 'Internal server error', detail: error?.message }, { status: 500 })
  }
}
