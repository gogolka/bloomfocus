import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const REASONS: Record<string, string> = {
  not_found: 'That code doesn\'t exist',
  inactive: 'That code is no longer active',
  expired: 'That code has expired',
  used_up: 'That code has reached its limit',
}

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false, message: 'Enter a code' })
    }
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
    const { data, error } = await supabase.rpc('validate_promo', { p_code: code })
    if (error) {
      console.error('validate-promo rpc error', error.message)
      return NextResponse.json({ valid: false, message: 'Could not check that code' })
    }
    const row = Array.isArray(data) ? data[0] : data
    if (row?.valid) {
      return NextResponse.json({ valid: true, discountPercent: row.discount_percent || 0 })
    }
    return NextResponse.json({ valid: false, message: REASONS[row?.reason] || 'That code isn\'t valid' })
  } catch (e: any) {
    console.error('validate-promo threw', e?.message)
    return NextResponse.json({ valid: false, message: 'Could not check that code' }, { status: 500 })
  }
}
