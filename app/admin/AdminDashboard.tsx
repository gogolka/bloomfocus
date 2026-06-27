'use client'

const C = {
  purple: '#7B5FCC', lav: '#E8DEFF', cream: '#FFF8F0',
  card: '#FEFCFA', text: '#2D2926', soft: '#9B8F88', mid: '#6B5F58',
  green: '#7FB069', peach: '#FFD6C4', border: 'rgba(45,41,38,0.08)',
}

const card: React.CSSProperties = {
  background: C.card, border: `1px solid ${C.border}`,
  borderRadius: 20, padding: 24, marginBottom: 16,
}

type Stats = {
  quizCount: number
  ordersCount: number
  paidOrdersCount: number
  totalRevenue: string
  subsCount: number
  profilesCount: number
  typeCounts: Record<string, number>
  recentOrders: any[]
}

const TYPE_LABEL: Record<string, string> = {
  combined: 'Combined', inattentive: 'Inattentive',
  hyperactive: 'Hyperactive', negative: 'Negative',
}
const TYPE_COLOR: Record<string, string> = {
  combined: '#B8A4E8', inattentive: '#7FB069',
  hyperactive: '#FFD6C4', negative: C.soft,
}

export default function AdminDashboard({ stats }: { stats: Stats }) {
  const totalQuiz = Object.values(stats.typeCounts).reduce((s, v) => s + v, 0) || 1

  return (
    <div style={{ background: C.cream, minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", padding: '32px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: C.text }}>
            bloom <em style={{ color: '#B8A4E8' }}>focus</em>
            <span style={{ fontSize: 16, color: C.soft, marginLeft: 10 }}>admin</span>
          </div>
          <div style={{ fontSize: 13, color: C.soft, marginTop: 4 }}>Overview · live data from Supabase</div>
        </div>

        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Quiz completions', value: stats.quizCount, emoji: '🧠', color: C.lav },
            { label: 'Total orders', value: stats.ordersCount, emoji: '📋', color: '#D4EEFF' },
            { label: 'Paid orders', value: stats.paidOrdersCount ?? 0, emoji: '💳', color: '#D4E8D4' },
            { label: 'Revenue (USD)', value: `$${stats.totalRevenue}`, emoji: '💰', color: C.peach },
            { label: 'Active Pro subs', value: stats.subsCount, emoji: '💜', color: C.lav },
            { label: 'App accounts', value: stats.profilesCount, emoji: '👤', color: '#D4EEFF' },
          ].map(k => (
            <div key={k.label} style={{ background: k.color, borderRadius: 18, padding: '18px 20px', border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{k.emoji}</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: C.text, fontWeight: 700 }}>{k.value}</div>
              <div style={{ fontSize: 11, color: C.mid, marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Quiz breakdown */}
        <div style={card}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: C.text, marginBottom: 16 }}>Quiz results breakdown</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Object.entries(stats.typeCounts).sort((a, b) => b[1] - a[1]).map(([type, count]) => {
              const pct = Math.round(count / totalQuiz * 100)
              return (
                <div key={type}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: C.mid }}>{TYPE_LABEL[type] || type}</span>
                    <span style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>{count} <span style={{ color: C.soft, fontWeight: 400 }}>({pct}%)</span></span>
                  </div>
                  <div style={{ height: 8, background: C.lav, borderRadius: 100, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: TYPE_COLOR[type] || C.purple, borderRadius: 100, transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent orders */}
        <div style={card}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: C.text, marginBottom: 16 }}>Recent orders</div>
          {stats.recentOrders.length === 0 ? (
            <div style={{ fontSize: 13, color: C.soft }}>No paid orders yet.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {['Order', 'Email', 'Product', 'Amount', 'Status', 'Date'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: C.soft, fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((o, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ padding: '10px 12px', color: C.purple, fontWeight: 600 }}>{o.order_number}</td>
                      <td style={{ padding: '10px 12px', color: C.mid }}>{o.customer_email}</td>
                      <td style={{ padding: '10px 12px', color: C.text }}>{o.products?.title || '—'}</td>
                      <td style={{ padding: '10px 12px', color: C.text, fontWeight: 600 }}>${(Number(o.amount_uah) / 100).toFixed(2)}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 100, background: o.status === 'paid' ? '#D4E8D4' : '#FFF3EC', color: o.status === 'paid' ? '#7FB069' : '#C07A3E' }}>
                          {o.status}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px', color: C.soft }}>{new Date(o.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style={{ fontSize: 11, color: C.soft, textAlign: 'center', marginTop: 16 }}>
          bloom focus admin · data refreshes on each page load
        </div>
      </div>
    </div>
  )
}
