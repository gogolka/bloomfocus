'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabaseBrowser as supabase } from '@/lib/supabaseBrowser'

const C = {
  text: '#2D2926', mid: '#6B5F58', soft: '#9B8F88',
  lav: '#E8DEFF', purple: '#7B5FCC', purpleSoft: '#B8A4E8',
  cream: '#FFF8F0', card: '#FEFCFA', green: '#7FB069',
}

// Only the $2.99 printables tier is included with Pro. Higher-priced items
// (e.g. future bundles) are filtered out automatically by this price check.
const PRO_PRICE = 2.99

function priceNum(v: any): number {
  return parseFloat(String(v).replace(/[^0-9.]/g, '')) || 0
}

export default function LibraryPage() {
  const [loading, setLoading] = useState(true)
  const [isPro, setIsPro] = useState(false)
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }
    const [profile, prods] = await Promise.all([
      supabase.from('profiles').select('is_pro').eq('id', user.id).single(),
      supabase.from('products').select('slug, title, price_usd, emoji, color, file_path').eq('is_active', true),
    ])
    setIsPro(!!profile.data?.is_pro)
    const list = (prods.data || [])
      .filter(p => p.file_path && Math.abs(priceNum(p.price_usd) - PRO_PRICE) < 0.005)
      .sort((a, b) => String(a.title).localeCompare(String(b.title)))
    setProducts(list)
    setLoading(false)
  }

  function fileUrl(path: string): string {
    return supabase.storage.from('bloom-products').getPublicUrl(path).data.publicUrl
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '60px 0', fontSize: 32 }}>📔</div>

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <Link href="/app" style={{ textDecoration: 'none', color: C.soft, fontSize: 20 }}>←</Link>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: C.text, margin: 0 }}>Printables Library</h1>
      </div>

      {/* Pro framing */}
      <div style={{ background: 'linear-gradient(150deg, #F3EEFF, #FFF3EC)', border: '1px solid rgba(123,95,204,0.2)', borderRadius: 16, padding: '16px 18px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.6 }}>
          {isPro
            ? 'Every printable below is included with your Pro plan — download any of them as often as you like.'
            : 'These printables come included with bloom focus Pro. While we\'re in early access they\'re open to everyone, so help yourself and download whatever is useful to you.'}
        </div>
      </div>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: C.soft, fontSize: 14 }}>No printables available right now — check back soon.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {products.map(p => (
            <div key={p.slug} style={{ background: C.card, border: '1px solid rgba(45,41,38,0.08)', borderRadius: 18, padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: p.color || C.lav, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{p.emoji || '📄'}</div>
              <div style={{ fontSize: 14, color: C.text, fontWeight: 600, lineHeight: 1.3, flex: 1 }}>{p.title}</div>
              <a
                href={fileUrl(p.file_path)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', textAlign: 'center', background: C.purpleSoft, color: 'white', borderRadius: 100, padding: '9px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
              >
                Download ⬇
              </a>
            </div>
          ))}
        </div>
      )}

      <p style={{ fontSize: 12, color: C.soft, textAlign: 'center', lineHeight: 1.6, marginTop: 20 }}>
        Files download as a zip. You can also browse everything in the <Link href="/shop" style={{ color: C.purple }}>full shop</Link>.
      </p>
    </div>
  )
}
