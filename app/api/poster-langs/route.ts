import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.json({ langs: [] })

  const { data: order } = await supabaseAdmin
    .from('orders')
    .select('product_id, lang, products(is_multilingual)')
    .eq('download_token', token)
    .eq('status', 'paid')
    .single()

  if (!order || !(order.products as any)?.is_multilingual) {
    return NextResponse.json({ langs: [], multilingual: false })
  }

  const { data: files } = await supabaseAdmin
    .from('product_files')
    .select('lang')
    .eq('product_id', order.product_id)
    .order('lang')

  return NextResponse.json({
    multilingual: true,
    orderLang: order.lang,
    langs: files?.map(f => f.lang) ?? [],
  })
}

export const dynamic = 'force-dynamic'
