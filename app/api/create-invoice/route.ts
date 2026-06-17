import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

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

    // 1. Read product (public RLS allows)
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('slug', productSlug)
      .eq('is_active', true)
      .single()

    if (productError || !product) {
      console.error('create-invoice: product read failed', productError?.message)
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // 1b. Apply promo code if provided — ALWAYS re-validated server-side so the
    // charged amount can never be tampered with from the client.
    let amount = product.price_uah
    let discount = 0
    let appliedCode: string | null = null
    if (promoCode && typeof promoCode === 'string' && promoCode.trim()) {
      const { data: promo } = await supabase.rpc('validate_promo', { p_code: promoCode })
      const row = Array.isArray(promo) ? promo[0] : promo
      if (!row?.valid) {
        return NextResponse.json({ error: 'This promo code is no longer valid' }, { status: 400 })
      }
      const pct = Math.min(100, Math.max(0, row.discount_percent || 0))
      amount = Math.max(1, Math.round(product.price_uah * (100 - pct) / 100))
      discount = product.price_uah - amount
      appliedCode = promoCode.trim().toUpperCase()
    }

    // 2. Create order (anon INSERT policy allows)
    const orderNumber = `BF-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        product_id: product.id,
        customer_email: customerEmail,
        customer_name: customerName || null,
        amount_uah: amount,
        promo_code: appliedCode,
        discount_uah: discount,
        status: 'pending',
        lang: loc,
      })
      .select()
      .single()

    if (orderError || !order) {
      console.error('create-invoice: order insert failed', orderError?.message, orderError?.code)
      return NextResponse.json({ error: 'Failed to create order', detail: orderError?.message }, { status: 500 })
    }

    // 3. Create Monobank invoice
    const unitLabel: Record<string, string> = { en: 'pcs', de: 'Stk', fr: 'pcs', es: 'uds' }
    const monoPayload = {
      amount: amount,
      ccy: 980, // UAH only supported by Monobank
      merchantPaymInfo: {
        reference: orderNumber,
        destination: `bloom focus — ${product.title}`,
        basketOrder: [
          { name: product.title, qty: 1, sum: amount, icon: product.emoji || '🌸', unit: unitLabel[loc] || 'pcs' },
        ],
      },
      redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/success?order=${orderNumber}`,
      webHookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/mono-webhook`,
      validity: 3600,
      paymentType: 'debit',
      // Note: Monobank checkout language is auto-detected from buyer's browser
    }

    const monoResponse = await fetch('https://api.monobank.ua/api/merchant/invoice/create', {
      method: 'POST',
      headers: { 'X-Token': process.env.MONO_TOKEN!, 'Content-Type': 'application/json' },
      body: JSON.stringify(monoPayload),
    })

    if (!monoResponse.ok) {
      const monoError = await monoResponse.text()
      console.error('create-invoice: monobank error', monoResponse.status, monoError)
      return NextResponse.json({ error: 'Payment system error', detail: monoError }, { status: 500 })
    }

    const monoData = await monoResponse.json()

    await supabase
      .from('orders')
      .update({ mono_invoice_id: monoData.invoiceId })
      .eq('id', order.id)

    return NextResponse.json({ success: true, paymentUrl: monoData.pageUrl, orderNumber })

  } catch (error: any) {
    console.error('create-invoice: threw', error?.message)
    return NextResponse.json({ error: 'Internal server error', detail: error?.message }, { status: 500 })
  }
}
