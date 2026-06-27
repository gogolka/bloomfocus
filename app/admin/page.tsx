import { createClient } from '@supabase/supabase-js'
import AdminDashboard from './AdminDashboard'

export default async function AdminPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  // If no service role key — show setup instructions
  if (!url || !key) {
    return (
      <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
        <h2>Admin setup required</h2>
        <p>Add <code>SUPABASE_SERVICE_ROLE_KEY</code> to Vercel environment variables.</p>
      </div>
    )
  }

  const supabase = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    },
  })

  const [
    quizRes, ordersRes, orderStatsRes, subsRes, profilesRes, quizTypesRes, recentOrdersRes,
  ] = await Promise.allSettled([
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('amount_uah, status'),
    supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('adhd_type').not('adhd_type', 'is', null),
    supabase.from('orders').select('order_number, customer_email, amount_uah, status, created_at, products(title)').order('created_at', { ascending: false }).limit(10),
  ])

  const get = (r: PromiseSettledResult<any>) => r.status === 'fulfilled' ? r.value : { data: null, count: 0 }

  const orderStats = get(orderStatsRes).data || []
  const paidOrders = orderStats.filter((o: any) => o.status === 'paid')
  const totalRevenue = paidOrders.reduce((s: number, o: any) => s + (Number(o.amount_uah) || 0), 0)

  const typeCounts: Record<string, number> = {}
  ;(get(quizTypesRes).data || []).forEach((q: any) => {
    if (q.adhd_type) typeCounts[q.adhd_type] = (typeCounts[q.adhd_type] || 0) + 1
  })

  const stats = {
    quizCount: get(quizRes).count || 0,
    ordersCount: get(ordersRes).count || 0,
    paidOrdersCount: paidOrders.length,
    totalRevenue: (totalRevenue / 100).toFixed(2),
    subsCount: get(subsRes).count || 0,
    profilesCount: get(profilesRes).count || 0,
    typeCounts,
    recentOrders: get(recentOrdersRes).data || [],
  }

  return <AdminDashboard stats={stats} />
}

export const dynamic = 'force-dynamic'
