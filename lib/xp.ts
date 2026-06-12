// Client-safe XP helpers. Pure functions + constants only — no server imports.
// Keep values consistent with lib/gamification.ts.
export const TASK_XP = 50
export const HABIT_XP = 30
export const POMODORO_XP = 40

export const LEVEL_THRESHOLDS = [0, 100, 250, 500, 900, 1400, 2000, 2700, 3500, 4400, 5500, 6700, 8000, 9500, 11000, 13000, 15000, 17500, 20000, 23000]
export const PLANT_STAGE_XP = [0, 100, 300, 700, 1500, 3000] // stages 1..6

export function levelFromXP(xp: number): number {
  let lvl = 1
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) { if (xp >= LEVEL_THRESHOLDS[i]) lvl = i + 1; else break }
  return lvl
}

export function stageFromXP(xp: number): number {
  let stage = 1
  for (let i = 0; i < PLANT_STAGE_XP.length; i++) { if (xp >= PLANT_STAGE_XP[i]) stage = i + 1; else break }
  return stage
}
