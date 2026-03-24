export type WeightedCandidate = {
  name: string
  weight: number
}

export type WeightedPickResult = {
  name: string
  weight: number
  totalWeight: number
  chance: number
}

export const pickWeighted = (candidates: WeightedCandidate[]): WeightedPickResult | null => {
  const sanitized = candidates
    .map((c) => ({ name: c.name, weight: Number.isFinite(c.weight) ? c.weight : 0 }))
    .filter((c) => c.weight > 0)

  const total = sanitized.reduce((sum, c) => sum + c.weight, 0)
  if (total <= 0) return null

  let r = Math.random() * total
  for (const c of sanitized) {
    r -= c.weight
    if (r <= 0) {
      return {
        name: c.name,
        weight: c.weight,
        totalWeight: total,
        chance: c.weight / total
      }
    }
  }

  const last = sanitized[sanitized.length - 1]
  return {
    name: last.name,
    weight: last.weight,
    totalWeight: total,
    chance: last.weight / total
  }
}
