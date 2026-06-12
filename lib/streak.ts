'use client'
import { supabaseBrowser as supabase } from './supabaseBrowser'

// Computes the streak fields to merge into a user_xp upsert, based on the
// stored last_active_date. Call this only on a positive activity (completing a
// task/habit, finishing a focus session, saving a dump) — not on undo.
//
// Rules (kind, ADHD-aware):
//  - first ever activity            -> streak = 1
//  - already active today           -> streak unchanged (no double count)
//  - active yesterday               -> streak + 1
//  - gap of 2+ days                 -> streak restarts at 1 (no negative, no shame)
//
// Returns both the new streak and whether a milestone was newly reached this
// call, so the caller can trigger a celebration / email.
export const STREAK_MILESTONES = [3, 7, 14, 30, 66, 100]

export async function computeStreak(uid: string): Promise<{
  streak_days: number
  last_active_date: string
  previous: number
  milestoneReached: number | null
}> {
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  const { data } = await supabase
    .from('user_xp')
    .select('streak_days, last_active_date')
    .eq('user_id', uid)
    .single()

  const prev = data?.streak_days || 0
  const last = (data?.last_active_date as string | null) || null

  let streak: number
  if (last === today) streak = prev || 1
  else if (last === yesterday) streak = prev + 1
  else streak = 1

  const milestoneReached =
    streak > prev && STREAK_MILESTONES.includes(streak) ? streak : null

  return { streak_days: streak, last_active_date: today, previous: prev, milestoneReached }
}
