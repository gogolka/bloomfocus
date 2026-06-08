import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    }

    // Find order by download token
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('*, products(*)')
      .eq('download_token', token)
      .eq('status', 'paid')
      .single()

    if (error || !order) {
      return NextResponse.json({ error: 'Invalid or expired download link' }, { status: 404 })
    }

    // Check token expiry
    const expiresAt = new Date(order.download_token_expires_at)
    if (expiresAt < new Date()) {
      return NextResponse.json({ error: 'Download link has expired' }, { status: 410 })
    }

    // Check download count
    if (order.download_count >= order.max_downloads) {
      return NextResponse.json({ error: 'Download limit reached. Please contact support.' }, { status: 429 })
    }

    // Check file exists
    if (!order.products?.file_path) {
      return NextResponse.json({ error: 'File not available yet' }, { status: 404 })
    }

    // Generate signed URL from Supabase Storage (valid for 1 hour)
    const { data: signedUrl, error: storageError } = await supabaseAdmin
      .storage
      .from('bloom-products')
      .createSignedUrl(order.products.file_path, 3600)

    if (storageError || !signedUrl) {
      console.error('Storage error:', storageError)
      return NextResponse.json({ error: 'Could not generate download link' }, { status: 500 })
    }

    // Increment download count
    await supabaseAdmin
      .from('orders')
      .update({ download_count: order.download_count + 1 })
      .eq('id', order.id)

    // Redirect to signed URL
    return NextResponse.redirect(signedUrl.signedUrl)

  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
