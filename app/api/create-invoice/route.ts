import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { productSlug, customerEmail, customerName } = await req.json()

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

    // 2. Create order (anon INSERT policy allows)
    const orderNumber = `BF-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        product_id: product.id,
        customer_email: customerEmail,
        customer_name: customerName || null,
        amount_uah: product.price_uah,
        status: 'pending',
      })
      .select()
      .single()

    if (orderError || !order) {
      console.error('create-invoice: order insert failed', orderError?.message, orderError?.code)
      return NextResponse.json({ error: 'Failed to create order', detail: orderError?.message }, { status: 500 })
    }

    // 3. Create Monobank invoice
    const monoPayload = {
      amount: product.price_uah,
      ccy: 980,
      merchantPaymInfo: {
        reference: orderNumber,
        destination: `bloom focus — ${product.title}`,
        basketOrder: [
          { name: product.title, qty: 1, sum: product.price_uah, icon: product.emoji || '🌸', unit: 'шт' },
        ],
      },
      redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/success?order=${orderNumber}`,
      webHookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/mono-webhook`,
      validity: 3600,
      paymentType: 'debit',
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
