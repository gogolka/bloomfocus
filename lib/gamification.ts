import { supabaseAdmin } from './supabase'

export const XP_REWARDS = {
  task_done: 50,
  habit_done: 30,
  pomodoro_done: 40,
  brain_dump: 20,
  streak_bonus: 10,
  plant_watered: 5,
}

export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 900, 1400, 2000, 2700, 3500, 4400, // levels 1-10
  5500, 6700, 8000, 9500, 11000, 13000, 15000, 17500, 20000, 23000, // 11-20
]

export function getLevelFromXP(xp: number): number {
  let level = 1
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1
    else break
  }
  return level
}

export function getXPToNextLevel(xp: number): { current: number; needed: number; progress: number } {
  const level = getLevelFromXP(xp)
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0
  const nextThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
  const current = xp - currentThreshold
  const needed = nextThreshold - currentThreshold
  return { current, needed, progress: Math.round((current / needed) * 100) }
}

export const PLANT_STAGES = {
  1: { name: 'Seed', emoji: '🌰', minXP: 0 },
  2: { name: 'Sprout', emoji: '🌱', minXP: 100 },
  3: { name: 'Seedling', emoji: '🪴', minXP: 300 },
  4: { name: 'Growing', emoji: '🌿', minXP: 700 },
  5: { name: 'Blooming', emoji: '🌸', minXP: 1500 },
  6: { name: 'Full Bloom', emoji: '🌺', minXP: 3000 },
}

export async function awardXP(
  userId: string,
  action: keyof typeof XP_REWARDS,
  description?: string
) {
  const xpGained = XP_REWARDS[action]

  // Record XP event
  await supabaseAdmin.from('xp_events').insert({
    user_id: userId,
    action,
    xp_gained: xpGained,
    description: description || action,
  })

  // Get current XP
  const { data: current } = await supabaseAdmin
    .from('user_xp')
    .select('total_xp, level, gems, streak_days, last_active_date')
    .eq('user_id', userId)
    .single()

  if (!current) return

  const newXP = current.total_xp + xpGained
  const newLevel = getLevelFromXP(newXP)
  const newGems = current.gems + Math.floor(xpGained / 10)

  // Update streak
  const today = new Date().toISOString().split('T')[0]
  const lastActive = current.last_active_date
  let newStreak = current.streak_days

  if (lastActive !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    if (lastActive === yesterday) {
      newStreak = current.streak_days + 1
    } else if (!lastActive) {
      newStreak = 1
    } else {
      newStreak = 1 // reset streak
    }
  }

  // Update plant stage based on XP
  const plantStage = Object.entries(PLANT_STAGES)
    .reverse()
    .find(([, s]) => newXP >= s.minXP)?.[0] || '1'

  await supabaseAdmin.from('user_plant')
    .update({
      stage: parseInt(plantStage),
      health: Math.min(100, (await supabaseAdmin.from('user_plant').select('health').eq('user_id', userId).single()).data?.health || 80 + 10),
      total_waterings: supabaseAdmin.rpc('increment', { row_id: userId }),
      last_watered_at: new Date().toISOString(),
    })
    .eq('user_id', userId)

  // Update XP
  await supabaseAdmin.from('user_xp').update({
    total_xp: newXP,
    level: newLevel,
    gems: newGems,
    streak_days: newStreak,
    last_active_date: today,
    updated_at: new Date().toISOString(),
  }).eq('user_id', userId)

  // Check achievements
  await checkAchievements(userId, newXP, newStreak, newLevel)

  return { xpGained, newXP, newLevel, newStreak }
}

async function checkAchievements(userId: string, xp: number, streak: number, level: number) {
  const { data: existing } = await supabaseAdmin
    .from('user_achievements')
    .select('achievement_id')
    .eq('user_id', userId)

  const earned = new Set(existing?.map(a => a.achievement_id) || [])
  const toEarn: string[] = []

  if (streak >= 3 && !earned.has('streak_3')) toEarn.push('streak_3')
  if (streak >= 7 && !earned.has('streak_7')) toEarn.push('streak_7')
  if (streak >= 30 && !earned.has('streak_30')) toEarn.push('streak_30')
  if (level >= 5 && !earned.has('level_5')) toEarn.push('level_5')
  if (level >= 10 && !earned.has('level_10')) toEarn.push('level_10')

  if (toEarn.length > 0) {
    await supabaseAdmin.from('user_achievements').insert(
      toEarn.map(id => ({ user_id: userId, achievement_id: id }))
    )
  }
}
