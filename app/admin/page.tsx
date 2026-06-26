import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import AdminDashboard from './AdminDashboard'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'dianahohol97@gmail.com'

export default async function AdminPage() {
  // Simple auth check via Supabase Admin
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const [
    { count: quizCount },
    { count: ordersCount },
    { data: orderStats },
    { count: subsCount },
    { count: profilesCount },
    { data: quizTypes },
    { data: recentOrders },
    { data: pageViews },
  ] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'paid'),
    supabase.from('orders').select('amount_uah').eq('status', 'paid'),
    supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('adhd_type').not('adhd_type', 'is', null),
    supabase.from('orders').select('order_number, customer_email, amount_uah, created_at, products(title)').eq('status', 'paid').order('created_at', { ascending: false }).limit(10),
    supabase.from('leads').select('created_at').order('created_at', { ascending: false }).limit(30),
  ])

  const totalRevenue = orderStats?.reduce((sum, o) => sum + (Number(o.amount_uah) || 0), 0) || 0

  // Count quiz types
  const typeCounts: Record<string, number> = {}
  quizTypes?.forEach(q => {
    if (q.adhd_type) typeCounts[q.adhd_type] = (typeCounts[q.adhd_type] || 0) + 1
  })

  const stats = {
    quizCount: quizCount || 0,
    ordersCount: ordersCount || 0,
    totalRevenue: (totalRevenue / 100).toFixed(2),
    subsCount: subsCount || 0,
    profilesCount: profilesCount || 0,
    typeCounts,
    recentOrders: recentOrders || [],
  }

  return <AdminDashboard stats={stats} />
}

export const dynamic = 'force-dynamic'
