'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getLevelFromXP, getXPToNextLevel, PLANT_STAGES } from '@/lib/gamification'
import { stageFromXP, PLANT_STAGE_XP } from '@/lib/xp'
import { skinEmoji } from '@/lib/skins'
import { plantStatus } from '@/lib/plant'
import { supabaseBrowser as supabase } from '@/lib/supabaseBrowser'

export default function AppDashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 17) setGreeting('Good afternoon')
    else setGreeting('Good evening')
    loadData()
  }, [])

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const [profile, xp, plant, achievements] = await Promise.all([
      supabase.from('profiles').select('display_name, avatar_emoji, is_pro').eq('id', user.id).single(),
      supabase.from('user_xp').select('total_xp, level, gems, streak_days').eq('user_id', user.id).single(),
      supabase.from('user_plant').select('stage, health, plant_name, last_watered_at, bloomed_count, xp_base, skin').eq('user_id', user.id).single(),
      supabase.from('user_achievements').select('achievement_id, achievements(title, emoji)').eq('user_id', user.id).order('earned_at', { ascending: false }).limit(3),
    ])

    const today = new Date().toISOString().split('T')[0]
    const [habitsToday, tasksToday] = await Promise.all([
      supabase.from('habit_completions').select('id', { count: 'exact' }).eq('user_id', user.id).eq('completed_date', today),
      supabase.from('tasks').select('id', { count: 'exact' }).eq('user_id', user.id).eq('status', 'done').gte('completed_at', today),
    ])

    setData({
      profile: profile.data,
      xp: xp.data,
      plant: plant.data,
      achievements: achievements.data || [],
      todayHabits: habitsToday.count || 0,
      todayTasks: tasksToday.count || 0,
    })
    setLoading(false)
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '60px 0', fontSize: 32 }}>🌱</div>
  if (!data) return null

  const xpProgress = getXPToNextLevel(data.xp?.total_xp || 0)
  const level = getLevelFromXP(data.xp?.total_xp || 0)
  // Current plant grows on XP earned since the last bloom (xp_base). This lets a
  // fully-bloomed plant be "harvested" into the garden and a fresh seed begin,
  // so progress never hits a ceiling.
  const totalXP = data.xp?.total_xp || 0
  const xpBase = data.plant?.xp_base || 0
  const plantXP = Math.max(0, totalXP - xpBase)
  const plantStageNum = stageFromXP(plantXP)
  const plantStage = PLANT_STAGES[plantStageNum as keyof typeof PLANT_STAGES] || PLANT_STAGES[1]
  const status = plantStatus(data.plant?.last_watered_at)
  const fullyBloomed = plantStageNum >= 6
  const bloomedCount = data.plant?.bloomed_count || 0
  const nextStageXP = PLANT_STAGE_XP[plantStageNum] // undefined at full bloom
  const xpToNextStage = nextStageXP ? nextStageXP - plantXP : 0

  async function harvestBloom() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('user_plant').update({
      bloomed_count: bloomedCount + 1,
      xp_base: xpBase + 3000,
      stage: 1,
      last_watered_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).eq('user_id', user.id)
    loadData()
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: '#9B8F88', marginBottom: 4 }}>{greeting} 👋</div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926' }}>{data.profile?.display_name || 'Friend'}</div>
      </div>

      {/* PLANT */}
      <div style={{ background: 'linear-gradient(135deg, #E8DEFF 0%, #FFD6C4 100%)', borderRadius: 24, padding: '28px 24px', marginBottom: 16, textAlign: 'center', border: '1.5px solid #D4C5F9', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 8 }}>
          <div style={{ fontSize: 80, lineHeight: 1, opacity: status.mood === 'napping' ? 0.7 : 1, transition: 'opacity 0.4s' }}>{skinEmoji(data.plant?.skin, plantStageNum)}</div>
          {status.badge && <div style={{ position: 'absolute', top: -6, right: -14, fontSize: 26 }}>{status.badge}</div>}
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: '#2D2926', marginBottom: 4 }}>{data.plant?.plant_name || 'My Brain Plant'}</div>
        <div style={{ fontSize: 12, color: '#6B5F58', marginBottom: 16 }}>Stage: <strong>{plantStage.name}</strong></div>

        {fullyBloomed ? (
          <div style={{ background: 'rgba(255,255,255,0.55)', borderRadius: 16, padding: '16px', marginBottom: 8 }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: '#2D2926', marginBottom: 6 }}>Full bloom! 🎉</div>
            <div style={{ fontSize: 12, color: '#6B5F58', lineHeight: 1.6, marginBottom: 14 }}>
              This plant grew all the way. Move it into your garden and plant a fresh seed — your progress keeps going.
            </div>
            <button onClick={harvestBloom} style={{ background: '#B8A4E8', color: 'white', border: 'none', borderRadius: 100, padding: '11px 22px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Plant your next seed 🌱
            </button>
          </div>
        ) : (
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#6B5F58', marginBottom: 4 }}>
              <span>Plant health</span><span>{status.health}%</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.4)', borderRadius: 100, height: 6, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${status.health}%`, background: status.mood === 'awake' ? '#5BA85B' : status.mood === 'resting' ? '#E0B870' : '#C9A2D4', borderRadius: 100, transition: 'width 0.5s' }} />
            </div>
            <div style={{ fontSize: 11, color: '#6B5F58', fontStyle: 'italic', marginTop: 10 }}>{status.message}</div>
            <div style={{ fontSize: 10, color: '#9B8F88', marginTop: 4 }}>{xpToNextStage} XP to {plantStageNum >= 5 ? 'full bloom' : 'next stage'}</div>
          </div>
        )}

        <Link href="/app/garden" style={{ textDecoration: 'none', display: 'block', borderTop: '1px solid rgba(255,255,255,0.5)', marginTop: 14, paddingTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: bloomedCount > 0 ? 6 : 0 }}>
            <span style={{ fontSize: 10, color: '#6B5F58', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Your garden{bloomedCount > 0 ? ` · ${bloomedCount} bloomed` : ''}</span>
            <span style={{ fontSize: 11, color: '#7B5FCC', fontWeight: 600 }}>Visit 🌷 →</span>
          </div>
          {bloomedCount > 0 && <div style={{ fontSize: 22, lineHeight: 1.3 }}>{Array.from({ length: Math.min(bloomedCount, 30) }).map(() => '🌺').join(' ')}</div>}
        </Link>
      </div>

      {/* XP + LEVEL */}
      <div style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 20, padding: '20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: '#9B8F88', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Level</div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: '#2D2926', lineHeight: 1 }}>{level} <span style={{ fontSize: 14, color: '#9B8F88' }}>ADHD Brain</span></div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, marginBottom: 2 }}>🔥</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: '#2D2926' }}>{data.xp?.streak_days || 0}</div>
              <div style={{ fontSize: 9, color: '#9B8F88' }}>streak</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9B8F88', marginBottom: 4 }}>
          <span>{data.xp?.total_xp || 0} XP total</span>
          <span>{xpProgress.current} / {xpProgress.needed} to next level</span>
        </div>
        <div style={{ background: '#E8DEFF', borderRadius: 100, height: 8, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${xpProgress.progress}%`, background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8)', borderRadius: 100, transition: 'width 0.5s' }} />
        </div>
      </div>

      {/* INSIGHTS LINK */}
      <Link href="/app/insights" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(100deg, #E8DEFF, #FFF0E8)', border: '1px solid rgba(123,95,204,0.18)', borderRadius: 16, padding: '14px 18px', marginBottom: 16 }}>
          <span style={{ fontSize: 14, color: '#2D2926', fontWeight: 500 }}>📊 See your insights</span>
          <span style={{ fontSize: 13, color: '#7B5FCC' }}>View →</span>
        </div>
      </Link>

      {/* PRINTABLES LIBRARY LINK */}
      <Link href="/app/library" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 16, padding: '14px 18px', marginBottom: 16 }}>
          <span style={{ fontSize: 14, color: '#2D2926', fontWeight: 500 }}>📔 Printables library <span style={{ fontSize: 11, color: '#7B5FCC', fontWeight: 600 }}>· Pro</span></span>
          <span style={{ fontSize: 13, color: '#7B5FCC' }}>Open →</span>
        </div>
      </Link>

      {/* TODAY STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        {[
          { label: 'Tasks done today', value: data.todayTasks, emoji: '✅', color: '#D4E8D4', href: '/app/tasks' },
          { label: 'Habits done today', value: data.todayHabits, emoji: '🌱', color: '#D4EEFF', href: '/app/habits' },
        ].map((stat, i) => (
          <Link key={i} href={stat.href} style={{ textDecoration: 'none' }}>
            <div style={{ background: stat.color, borderRadius: 16, padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{stat.emoji}</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: '#2D2926', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: '#6B5F58', marginTop: 4 }}>{stat.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: '#2D2926', marginBottom: 12 }}>Quick start</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { href: '/app/tasks', emoji: '✅', label: 'Add or complete a task', desc: '+50 XP · waters your plant', color: '#E8DEFF' },
          { href: '/app/habits', emoji: '🌱', label: 'Check your habits', desc: '+30 XP each habit', color: '#D4E8D4' },
          { href: '/app/timer', emoji: '🍅', label: 'Start a focus session', desc: '+40 XP per pomodoro', color: '#FFD6C4' },
          { href: '/app/dump', emoji: '🧠', label: 'Brain dump', desc: '+20 XP · clear your head', color: '#D4EEFF' },
          { href: '/app/dopamine', emoji: '🍬', label: 'Pick a reward', desc: 'You deserve it', color: '#FFE8E8' },
        ].map((action, i) => (
          <Link key={i} href={action.href} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: action.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{action.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#2D2926', fontWeight: 500 }}>{action.label}</div>
                <div style={{ fontSize: 11, color: '#9B8F88', marginTop: 2 }}>{action.desc}</div>
              </div>
              <div style={{ fontSize: 16, color: '#D4C5F9' }}>→</div>
            </div>
          </Link>
        ))}
      </div>

      {data.achievements?.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: '#2D2926', marginBottom: 12 }}>Recent achievements</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {data.achievements.map((a: any, i: number) => (
              <div key={i} style={{ background: '#FFF8F0', border: '1px solid #E8E0D8', borderRadius: 12, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 18 }}>{a.achievements?.emoji}</span>
                <span style={{ fontSize: 12, color: '#6B5F58' }}>{a.achievements?.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
