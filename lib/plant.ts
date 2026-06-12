// Kind, ADHD-aware plant status. The plant never dies and never loses a growth
// stage (stage is permanent, driven by total XP). When you are away it simply
// rests, then springs back to full the moment you return. Health here is a
// soft, motivational signal computed from the last activity — there is no
// punishing decay stored anywhere.

export type PlantMood = 'awake' | 'resting' | 'napping'

export interface PlantStatus {
  health: number
  mood: PlantMood
  badge: string // small overlay emoji ('' when awake)
  message: string
}

export function plantStatus(lastActiveISO: string | null | undefined): PlantStatus {
  if (!lastActiveISO) {
    return { health: 100, mood: 'awake', badge: '', message: 'Complete anything to water your plant 💧' }
  }
  const days = Math.floor((Date.now() - new Date(lastActiveISO).getTime()) / 86400000)

  if (days <= 1) {
    return { health: 100, mood: 'awake', badge: '', message: 'Thriving — keep going at your own pace 🌿' }
  }
  if (days <= 3) {
    return { health: 70, mood: 'resting', badge: '💤', message: 'Getting a little sleepy — one small thing perks it right back up.' }
  }
  return { health: 45, mood: 'napping', badge: '😴', message: "Napping while you're away. It springs back to full the moment you return 💛" }
}
