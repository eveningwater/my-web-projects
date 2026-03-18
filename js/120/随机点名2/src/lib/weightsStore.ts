const STORAGE_KEY = 'random-call:weights:v1'

export const loadWeights = (): Record<string, number> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}

    const out: Record<string, number> = {}
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value !== 'number') continue
      if (!Number.isFinite(value)) continue
      out[key] = value
    }
    return out
  } catch {
    return {}
  }
}

export const saveWeights = (weights: Record<string, number>): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weights))
  } catch {
    return
  }
}
