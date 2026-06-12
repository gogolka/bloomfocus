'use client'
import { supabaseBrowser as supabase } from './supabaseBrowser'

// Milestones that trigger a celebration email (kept in sync with the
// /api/streak-milestone route, which is the source of truth for sending).
export const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100, 180, 365]

// Computes the streak fields to merge into a user_xp upsert, based on the
// stored last_active_date. Call only on a positive activity (completing a
// task/habit, finishing a focus session, saving a dump) — not on undo.
//
// Rules (kind, ADHD-aware):
//  - first ever activity                 -> streak = 1
//  - already active today                -> streak unchanged (no double count)
//  - active yesterday                    -> streak + 1
//  - exactly one missed day (grace day)  -> streak + 1 (forgiven, no reset)
//  - gap of 3+ days                      -> streak restarts at 1 (no shame)
export async function computeStreak(uid: string): Promise<{
  streak_days: number
  last_active_date: string
  previous: number
  milestoneReached: number | null
}> {
  const today = new Date().toISOString().split('T')[0]

  const { data } = await supabase
    .from('user_xp')
    .select('streak_days, last_active_date')
    .eq('user_id', uid)
    .single()

  const prev = data?.streak_days || 0
  const last = (data?.last_active_date as string | null) || null

  let streak: number
  if (!last) {
    streak = 1
  } else {
    const gap = Math.round((Date.parse(today) - Date.parse(last)) / 86400000)
    if (gap === 0) streak = prev || 1
    else if (gap === 1 || gap === 2) streak = prev + 1 // 1 grace day
    else streak = 1
  }

  const milestoneReached =
    streak > prev && STREAK_MILESTONES.includes(streak) ? streak : null

  return { streak_days: streak, last_active_date: today, previous: prev, milestoneReached }
}

// Fire-and-forget: ask the server to send a streak-milestone email. The server
// re-checks the milestone against the DB and dedupes, so this is safe to call
// whenever a milestone is reached. Never throws.
export async function notifyStreakMilestone() {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.access_token) return
    await fetch('/api/streak-milestone', {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
  } catch { /* ignore */ }
}
