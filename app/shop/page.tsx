import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import BuyButton from '@/components/BuyButton'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Shop — ADHD Planners & Toolkits',
  description: 'Browse all bloom focus products — printable planners, habit trackers, dopamine menus, and more. Designed for ADHD brains.',
  alternates: { canonical: 'https://bloomfocus.org/shop' },
}

async function getProducts() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error('Shop: missing Supabase env vars', { url: !!url, key: !!key })
    return []
  }

  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false }
  })

  const { data, error } = await supabase
    .from('products')
    .select('slug, title, description, price_usd, tag, emoji, color, border_color')
    .eq('is_active', true)
    .order('created_at')

  if (error) {
    console.error('Shop: Supabase error:', error.message, error.code)
    return []
  }

  return data ?? []
}

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <section style={{ padding: '64px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,222,255,0.6) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B8F88', marginBottom: 12 }}>bloom focus shop</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', color: '#2D2926', lineHeight: 1.2, marginBottom: 16 }}>
            Tools your ADHD brain <em style={{ color: '#B8A4E8' }}>actually wants to use</em>
          </h1>
          <p style={{ fontSize: 15, color: '#6B5F58', lineHeight: 1.7 }}>
            Every product is designed around real ADHD patterns — no shame, no overwhelm, just gentle structure.
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8, #B8D4B8)' }} />
      </section>

      <section style={{ padding: '48px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        {products.length === 0 && (
          <p style={{ textAlign: 'center', color: '#9B8F88' }}>Loading products...</p>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
          {products.map((p) => (
            <div key={p.slug} className="hover-card" style={{ background: p.color, border: `1.5px solid ${p.border_color}`, borderRadius: 20, padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 44, marginBottom: 16 }}>{p.emoji}</div>
              <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: 100, padding: '3px 12px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B5F58', display: 'inline-block', marginBottom: 12, alignSelf: 'flex-start' }}>{p.tag}</div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', marginBottom: 10 }}>{p.title}</h2>
              <p style={{ fontSize: 13, color: '#6B5F58', lineHeight: 1.6, flex: 1, marginBottom: 20 }}>{p.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926' }}>${Number(p.price_usd).toFixed(2)}</span>
                <BuyButton productSlug={p.slug} productTitle={p.title} priceUsd={`$${Number(p.price_usd).toFixed(2)}`} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
