import type { ReviewProgress } from '../types'

export const newReviewProgress = (): ReviewProgress => ({
  repetitions: 0,
  interval: 0,
  easeFactor: 2.5,
  dueAt: new Date(0).toISOString(),
  lapses: 0,
  hard: false,
})

export function reviewCard(current: ReviewProgress | undefined, quality: number): ReviewProgress {
  const previous = current ?? newReviewProgress()
  const q = Math.max(0, Math.min(5, quality))
  let repetitions = previous.repetitions
  let interval = previous.interval
  let lapses = previous.lapses

  if (q < 3) {
    repetitions = 0
    interval = q === 0 ? 0 : 1
    lapses += 1
  } else {
    repetitions += 1
    if (repetitions === 1) interval = 1
    else if (repetitions === 2) interval = 6
    else interval = Math.max(1, Math.round(previous.interval * previous.easeFactor))
  }

  const easeFactor = Math.max(1.3, previous.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))
  const due = new Date()
  if (q === 0) due.setMinutes(due.getMinutes() + 10)
  else due.setDate(due.getDate() + interval)

  return {
    repetitions,
    interval,
    easeFactor,
    dueAt: due.toISOString(),
    lastReviewedAt: new Date().toISOString(),
    lapses,
    hard: q <= 2 || (previous.hard && q < 4),
  }
}

export function isDue(progress?: ReviewProgress) {
  return !progress || new Date(progress.dueAt).getTime() <= Date.now()
}
