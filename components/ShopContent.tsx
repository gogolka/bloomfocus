import BuyButton from '@/components/BuyButton'
import type { Lang } from '@/lib/i18n'
import { shopChrome, tagMap, productDesc } from '@/lib/i18n-shop'

async function getProducts() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url) { console.error('Shop: NEXT_PUBLIC_SUPABASE_URL is missing'); return [] }
  const key = anonKey || serviceKey
  if (!key) { console.error('Shop: no Supabase key available'); return [] }
  const endpoint = `${url}/rest/v1/products?select=slug,title,description,price_usd,tag,emoji,color,border_color&is_active=eq.true&order=created_at.asc`
  try {
    const res = await fetch(endpoint, { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: 'no-store' })
    if (!res.ok) { console.error('Shop: REST fetch failed', res.status, await res.text()); return [] }
    return await res.json()
  } catch (e) { console.error('Shop: fetch threw', e); return [] }
}

export default async function ShopContent({ lang }: { lang: Lang }) {
  const products = await getProducts()
  const c = shopChrome[lang]

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <section style={{ padding: '64px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,222,255,0.6) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B8F88', marginBottom: 12 }}>{c.eyebrow}</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 44px)', color: '#2D2926', lineHeight: 1.2, marginBottom: 16 }}>
            {c.h1pre}<em style={{ color: '#B8A4E8' }}>{c.h1em}</em>
          </h1>
          <p style={{ fontSize: 15, color: '#6B5F58', lineHeight: 1.7 }}>{c.sub}</p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8, #B8D4B8)' }} />
      </section>

      <section style={{ padding: '48px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        {products.length === 0 && (
          <p style={{ textAlign: 'center', color: '#9B8F88' }}>{c.loading}</p>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
          {products.map((p: any) => {
            const tag = lang === 'en' ? p.tag : (tagMap[lang][p.tag] || p.tag)
            const description = lang === 'en' ? p.description : (productDesc[p.slug]?.[lang] || p.description)
            return (
              <div key={p.slug} className="hover-card" style={{ background: p.color, border: `1.5px solid ${p.border_color}`, borderRadius: 20, padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 44, marginBottom: 16 }}>{p.emoji}</div>
                <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: 100, padding: '3px 12px', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B5F58', display: 'inline-block', marginBottom: 12, alignSelf: 'flex-start' }}>{tag}</div>
                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', marginBottom: 10 }}>{p.title}</h2>
                <p style={{ fontSize: 13, color: '#6B5F58', lineHeight: 1.6, flex: 1, marginBottom: 20 }}>{description}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926' }}>${Number(p.price_usd).toFixed(2)}</span>
                  <BuyButton productSlug={p.slug} productTitle={p.title} priceUsd={`$${Number(p.price_usd).toFixed(2)}`} lang={lang} />
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
