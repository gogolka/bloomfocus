import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const orderNumber = req.nextUrl.searchParams.get('order')

    if (!orderNumber) {
      return NextResponse.json({ error: 'Missing order number' }, { status: 400 })
    }

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('status, download_token, products(title)')
      .eq('order_number', orderNumber)
      .single()

    if (error || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({
      status: order.status,
      downloadToken: order.status === 'paid' ? order.download_token : null,
      productTitle: (order.products as any)?.title || '',
    })

  } catch (error) {
    console.error('Order status error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
