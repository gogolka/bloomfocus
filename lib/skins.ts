// Plant skins (Pro). Each skin gives an emoji for every growth stage (1-6).
// The growth stage is still driven by XP — a skin only changes how the plant
// looks, never how it grows. 'default' mirrors PLANT_STAGES.

export interface PlantSkin {
  id: string
  label: string
  stages: string[] // index 0 = stage 1 … index 5 = stage 6
}

export const PLANT_SKINS: Record<string, PlantSkin> = {
  default: { id: 'default', label: 'Classic', stages: ['🌰', '🌱', '🪴', '🌿', '🌸', '🌺'] },
  tulip: { id: 'tulip', label: 'Tulip', stages: ['🌰', '🌱', '🪴', '🌿', '🌷', '🌷'] },
  sunflower: { id: 'sunflower', label: 'Sunflower', stages: ['🌰', '🌱', '🪴', '🌿', '🌻', '🌻'] },
  cactus: { id: 'cactus', label: 'Cactus', stages: ['🌰', '🌱', '🪴', '🌵', '🌵', '🏵️'] },
  tree: { id: 'tree', label: 'Tree', stages: ['🌰', '🌱', '🪴', '🌳', '🌳', '🍎'] },
  herb: { id: 'herb', label: 'Herb', stages: ['🌰', '🌱', '🪴', '🌿', '☘️', '🍀'] },
}

export const SKIN_LIST = Object.values(PLANT_SKINS)

export function skinEmoji(skin: string | null | undefined, stage: number): string {
  const s = PLANT_SKINS[skin || 'default'] || PLANT_SKINS.default
  const idx = Math.max(0, Math.min(s.stages.length - 1, (stage || 1) - 1))
  return s.stages[idx]
}
