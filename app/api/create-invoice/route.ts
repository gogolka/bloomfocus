import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { productSlug, customerEmail, customerName } = await req.json()

    if (!productSlug || !customerEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Get product from DB
    const { data: product, error: productError } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('slug', productSlug)
      .eq('is_active', true)
      .single()

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // 2. Generate unique order number
    const orderNumber = `BF-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`

    // 3. Create order in DB (pending)
    const { data: order, error: orderError } = await supabaseAdmin
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
      console.error('Order creation error:', orderError)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // 4. Create Monobank invoice
    const monoPayload = {
      amount: product.price_uah,
      ccy: 980, // UAH
      merchantPaymInfo: {
        reference: orderNumber,
        destination: `bloom focus — ${product.title}`,
        basketOrder: [
          {
            name: product.title,
            qty: 1,
            sum: product.price_uah,
            icon: product.emoji || '🌸',
            unit: 'шт',
          },
        ],
      },
      redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/success?order=${orderNumber}`,
      webHookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/mono-webhook`,
      validity: 3600, // 1 hour
      paymentType: 'debit',
    }

    const monoResponse = await fetch('https://api.monobank.ua/api/merchant/invoice/create', {
      method: 'POST',
      headers: {
        'X-Token': process.env.MONO_TOKEN!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(monoPayload),
    })

    if (!monoResponse.ok) {
      const monoError = await monoResponse.text()
      console.error('Monobank error:', monoError)
      return NextResponse.json({ error: 'Payment system error' }, { status: 500 })
    }

    const monoData = await monoResponse.json()

    // 5. Save Monobank invoice ID to order
    await supabaseAdmin
      .from('orders')
      .update({ mono_invoice_id: monoData.invoiceId })
      .eq('id', order.id)

    return NextResponse.json({
      success: true,
      paymentUrl: monoData.pageUrl,
      orderNumber,
    })

  } catch (error) {
    console.error('Create invoice error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
