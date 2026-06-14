import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token')
    const lang  = req.nextUrl.searchParams.get('lang') // optional: en|de|fr|es

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
    if (new Date(order.download_token_expires_at) < new Date()) {
      return NextResponse.json({ error: 'Download link has expired' }, { status: 410 })
    }

    // Check download count
    if (order.download_count >= order.max_downloads) {
      return NextResponse.json({ error: 'Download limit reached. Please contact support.' }, { status: 429 })
    }

    let filePath: string | null = null
    let fileName: string | null = null

    // Multilingual product: look up per-language file
    if (order.products?.is_multilingual) {
      const targetLang = lang || order.lang || 'en'
      const { data: pf } = await supabaseAdmin
        .from('product_files')
        .select('file_path, file_name')
        .eq('product_id', order.products.id)
        .eq('lang', targetLang)
        .single()

      if (pf) {
        filePath = pf.file_path
        fileName = pf.file_name
      } else {
        // fallback to English
        const { data: pfEn } = await supabaseAdmin
          .from('product_files')
          .select('file_path, file_name')
          .eq('product_id', order.products.id)
          .eq('lang', 'en')
          .single()
        filePath = pfEn?.file_path ?? null
        fileName = pfEn?.file_name ?? null
      }
    } else {
      filePath = order.products?.file_path ?? null
      fileName = order.products?.file_name ?? null
    }

    if (!filePath) {
      return NextResponse.json({ error: 'File not available yet' }, { status: 404 })
    }

    // Generate signed URL (1 hour)
    const { data: signedUrl, error: storageError } = await supabaseAdmin
      .storage
      .from('bloom-products')
      .createSignedUrl(filePath, 3600, {
        download: fileName || true,
      })

    if (storageError || !signedUrl) {
      console.error('Storage error:', storageError)
      return NextResponse.json({ error: 'Could not generate download link' }, { status: 500 })
    }

    // Increment download count
    await supabaseAdmin
      .from('orders')
      .update({ download_count: order.download_count + 1 })
      .eq('id', order.id)

    return NextResponse.redirect(signedUrl.signedUrl)

  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
