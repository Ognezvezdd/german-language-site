import type { LearningState } from '../types'

const STORAGE_KEY = 'klar-deutsch-state-v1'

export const emptyState = (): LearningState => ({
  version: 1,
  review: {},
  customWords: [],
  grammar: { completed: [], mistakes: {} },
  reading: { completed: [], answers: {}, savedWords: [] },
  activeDays: [],
  dailyGoal: 12,
  theme: 'system',
})

export function loadLocalState(): LearningState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw) as Partial<LearningState>
    return {
      ...emptyState(),
      ...parsed,
      review: parsed.review ?? {},
      customWords: parsed.customWords ?? [],
      grammar: { ...emptyState().grammar, ...parsed.grammar },
      reading: { ...emptyState().reading, ...parsed.reading },
      activeDays: parsed.activeDays ?? [],
    }
  } catch {
    return emptyState()
  }
}

export function saveLocalState(state: LearningState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function localDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function calculateStreak(days: string[]) {
  const unique = new Set(days)
  const cursor = new Date()
  const today = localDateKey(cursor)
  if (!unique.has(today)) cursor.setDate(cursor.getDate() - 1)

  let streak = 0
  while (unique.has(localDateKey(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}
