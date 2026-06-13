'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabaseBrowser as supabase } from '@/lib/supabaseBrowser'

const C = {
  text: '#2D2926', mid: '#6B5F58', soft: '#9B8F88',
  lav: '#E8DEFF', purple: '#7B5FCC', purpleSoft: '#B8A4E8',
  cream: '#FFF8F0', card: '#FEFCFA', peach: '#FFD6C4', green: '#7FB069',
}

const ACTION_META: Record<string, { label: string; emoji: string; color: string }> = {
  task_done: { label: 'Tasks', emoji: '✅', color: '#B8D4B8' },
  habit_done: { label: 'Habits', emoji: '🌱', color: '#A8D8C8' },
  pomodoro_done: { label: 'Focus', emoji: '🍅', color: '#FFBFA8' },
  brain_dump: { label: 'Brain dumps', emoji: '🧠', color: '#C9B8E8' },
}

function dayKey(d: Date) { return d.toISOString().split('T')[0] }

export default function InsightsPage() {
  const [loading, setLoading] = useState(true)
  const [d, setD] = useState<any>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const now = new Date()
    const since30 = new Date(now.getTime() - 30 * 86400000)
    const since30Date = dayKey(since30)

    const [xp, plant, events, pomos, tasksDone, habitComps, dumps] = await Promise.all([
      supabase.from('user_xp').select('total_xp, level, streak_days, longest_streak').eq('user_id', user.id).single(),
      supabase.from('user_plant').select('bloomed_count, total_waterings').eq('user_id', user.id).single(),
      supabase.from('xp_events').select('action, xp_gained, created_at').eq('user_id', user.id).gte('created_at', since30.toISOString()).order('created_at', { ascending: true }),
      supabase.from('pomodoro_sessions').select('duration_minutes, created_at').eq('user_id', user.id).eq('completed', true),
      supabase.from('tasks').select('completed_at').eq('user_id', user.id).eq('status', 'done'),
      supabase.from('habit_completions').select('completed_date').eq('user_id', user.id).gte('completed_date', since30Date),
      supabase.from('brain_dumps').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
    ])

    const evs: any[] = events.data || []

    // Last 14 days of XP
    const days: { label: string; date: string; xp: number }[] = []
    for (let i = 13; i >= 0; i--) {
      const dt = new Date(now.getTime() - i * 86400000)
      days.push({ date: dayKey(dt), label: dt.toLocaleDateString('en-US', { weekday: 'narrow' }), xp: 0 })
    }
    const dayMap: Record<string, { label: string; date: string; xp: number }> = {}
    days.forEach(x => { dayMap[x.date] = x })
    evs.forEach(e => {
      const k = (e.created_at || '').split('T')[0]
      if (dayMap[k]) dayMap[k].xp += e.xp_gained || 0
    })

    // Where XP comes from (last 30 days)
    const breakdown: Record<string, { label: string; emoji: string; color: string; xp: number; count: number }> = {}
    evs.forEach(e => {
      const meta = ACTION_META[e.action] || { label: e.action || 'Other', emoji: '✨', color: '#E0D8CF' }
      const key = meta.label
      if (!breakdown[key]) breakdown[key] = { ...meta, xp: 0, count: 0 }
      breakdown[key].xp += e.xp_gained || 0
      breakdown[key].count += 1
    })
    const breakdownArr = Object.values(breakdown).sort((a, b) => b.xp - a.xp)
    const breakdownTotal = breakdownArr.reduce((s, x) => s + x.xp, 0) || 1

    // Focus
    const pomosArr: any[] = pomos.data || []
    const focusMinutes = pomosArr.reduce((s, p) => s + (p.duration_minutes || 0), 0)

    // Tasks done windows
    const tasksArr: any[] = tasksDone.data || []
    const since7 = new Date(now.getTime() - 7 * 86400000)
    const done7 = tasksArr.filter(t => t.completed_at && new Date(t.completed_at) >= since7).length
    const done30 = tasksArr.filter(t => t.completed_at && new Date(t.completed_at) >= since30).length

    // Active days in last 30 (distinct days with any XP event)
    const activeDays = new Set(evs.map(e => (e.created_at || '').split('T')[0])).size

    setD({
      totalXp: xp.data?.total_xp || 0,
      level: xp.data?.level || 1,
      streak: xp.data?.streak_days || 0,
      longest: xp.data?.longest_streak || xp.data?.streak_days || 0,
      bloomed: plant.data?.bloomed_count || 0,
      waterings: plant.data?.total_waterings || 0,
      days,
      breakdownArr,
      breakdownTotal,
      focusMinutes,
      focusSessions: pomosArr.length,
      tasksAll: tasksArr.length,
      done7,
      done30,
      habits30: (habitComps.data || []).length,
      dumps: dumps.count || 0,
      activeDays,
    })
    setLoading(false)
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '60px 0', fontSize: 32 }}>📊</div>
  if (!d) return null

  const maxXp = Math.max(1, ...d.days.map((x: any) => x.xp))
  const focusH = Math.floor(d.focusMinutes / 60)
  const focusM = d.focusMinutes % 60

  const statCard = (label: string, value: string | number, sub?: string) => (
    <div style={{ background: C.card, border: '1px solid rgba(45,41,38,0.08)', borderRadius: 16, padding: '16px', flex: '1 1 0', minWidth: 0 }}>
      <div style={{ fontSize: 11, color: C.soft, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: C.text, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: C.soft, marginTop: 4 }}>{sub}</div>}
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <Link href="/app" style={{ textDecoration: 'none', color: C.soft, fontSize: 20 }}>←</Link>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: C.text, margin: 0 }}>Your insights</h1>
      </div>
      <p style={{ fontSize: 13, color: C.mid, marginBottom: 20 }}>How your brain has been doing. No judgment — just gentle patterns.</p>

      {/* Top stats */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        {statCard('Total XP', d.totalXp.toLocaleString(), `Level ${d.level}`)}
        {statCard('Current streak', `${d.streak}🔥`, `Best: ${d.longest}`)}
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        {statCard('Active days', `${d.activeDays}`, 'last 30 days')}
        {statCard('Plants bloomed', `${d.bloomed}🌺`, `${d.waterings} waterings`)}
      </div>

      {/* 14-day XP chart */}
      <div style={{ background: C.card, border: '1px solid rgba(45,41,38,0.08)', borderRadius: 20, padding: '20px', marginBottom: 16 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: C.text, marginBottom: 2 }}>XP over the last 14 days</div>
        <div style={{ fontSize: 12, color: C.soft, marginBottom: 18 }}>Every bar is a day you showed up.</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 120 }}>
          {d.days.map((day: any, i: number) => (
            <div key={i} style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: '100%', height: 100, display: 'flex', alignItems: 'flex-end' }}>
                <div title={`${day.xp} XP`} style={{ width: '100%', height: `${(day.xp / maxXp) * 100}%`, minHeight: day.xp > 0 ? 4 : 0, background: day.xp > 0 ? `linear-gradient(180deg, ${C.purpleSoft}, ${C.peach})` : 'transparent', borderRadius: 6, transition: 'height 0.4s' }} />
              </div>
              <span style={{ fontSize: 9, color: C.soft }}>{day.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Where XP comes from */}
      <div style={{ background: C.card, border: '1px solid rgba(45,41,38,0.08)', borderRadius: 20, padding: '20px', marginBottom: 16 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: C.text, marginBottom: 18 }}>Where your XP comes from</div>
        {d.breakdownArr.length === 0 && <div style={{ fontSize: 13, color: C.soft }}>Nothing yet — complete a task or habit to see this fill in.</div>}
        {d.breakdownArr.map((b: any, i: number) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: C.text, marginBottom: 5 }}>
              <span>{b.emoji} {b.label} <span style={{ color: C.soft }}>· {b.count}×</span></span>
              <span style={{ color: C.mid }}>{b.xp} XP</span>
            </div>
            <div style={{ background: C.lav, borderRadius: 100, height: 8, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(b.xp / d.breakdownTotal) * 100}%`, background: b.color, borderRadius: 100 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Focus + tasks */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        {statCard('Focus time', focusH > 0 ? `${focusH}h ${focusM}m` : `${focusM}m`, `${d.focusSessions} sessions`)}
        {statCard('Tasks done', d.tasksAll, 'all time')}
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        {statCard('Tasks · 7 days', d.done7)}
        {statCard('Habits · 30 days', d.habits30)}
      </div>

      <p style={{ fontSize: 12, color: C.soft, textAlign: 'center', lineHeight: 1.6 }}>
        These numbers are here to help you notice patterns, not to grade you.<br />A quiet day still counts.
      </p>
    </div>
  )
}
