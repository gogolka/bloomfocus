import type { Lang } from '@/lib/i18n'

const TITLES: Record<Lang, { eyebrow: string; title: string }> = {
  en: { eyebrow: 'From real ADHD brains', title: 'What people say' },
  de: { eyebrow: 'Von echten ADHS-Gehirnen', title: 'Was Leute sagen' },
  fr: { eyebrow: 'De vrais cerveaux TDAH', title: 'Ce que disent les gens' },
  es: { eyebrow: 'De cerebros TDAH reales', title: 'Lo que dice la gente' },
}

const CARD_COLORS = ['#E8DEFF', '#FFD6C4', '#D4E8D4', '#D4EEFF', '#FFE8E8', '#FFF0C4']

async function getTestimonials() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return []
  try {
    const res = await fetch(
      `${url}/rest/v1/testimonials?select=*&is_active=eq.true&order=sort_order.asc&limit=6`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` }, next: { revalidate: 3600 } } as RequestInit
    )
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export default async function Testimonials({ lang }: { lang: Lang }) {
  const items = await getTestimonials()
  if (!items.length) return null

  const t = TITLES[lang]

  return (
    <section style={{ padding: '80px 24px', background: '#FEFCFA' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B8F88', marginBottom: 12 }}>{t.eyebrow}</div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 4vw, 38px)', color: '#2D2926', lineHeight: 1.2 }}>{t.title}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {items.map((item: any, i: number) => {
            const text = (lang !== 'en' && item[`text_${lang}`]) || item.text_en
            return (
              <div key={item.id} style={{ background: CARD_COLORS[i % CARD_COLORS.length], borderRadius: 20, padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ fontSize: 14, letterSpacing: 2, color: '#C08A2E' }} aria-label={`${item.rating} out of 5 stars`}>
                  {'★'.repeat(item.rating || 5)}
                </div>
                <p style={{ fontSize: 14.5, color: '#2D2926', lineHeight: 1.7, flex: 1, margin: 0 }}>
                  “{text}”
                </p>
                <div style={{ fontSize: 12.5, color: '#6B5F58', fontWeight: 600 }}>
                  — {item.author}
                  {item.source && <span style={{ fontWeight: 400, color: '#9B8F88' }}> · {item.source === 'etsy' ? 'Etsy' : item.source}</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
