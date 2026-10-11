export type Level = 'A1' | 'A2' | 'B1'
export type PageId = 'home' | 'words' | 'study' | 'grammar' | 'reading' | 'account'

export type Word = {
  id: string
  rank: number
  raw: string
  lemma: string
  article?: 'der' | 'die' | 'das'
  plural?: string
  partOfSpeech: string
  translation: string
  level: Level
  category: string
  example: string
  exampleTranslation: string
  forms?: string
  custom?: boolean
}

export type ReviewProgress = {
  repetitions: number
  interval: number
  easeFactor: number
  dueAt: string
  lastReviewedAt?: string
  lapses: number
  hard: boolean
}

export type GrammarProgress = {
  completed: string[]
  mistakes: Record<string, number>
}

export type ReadingProgress = {
  completed: string[]
  answers: Record<string, number>
  savedWords: string[]
}

export type LearningState = {
  version: 1
  review: Record<string, ReviewProgress>
  customWords: Word[]
  grammar: GrammarProgress
  reading: ReadingProgress
  activeDays: string[]
  dailyGoal: number
  theme: 'light' | 'dark' | 'system'
  lastSyncedAt?: string
}

export type GrammarExercise = {
  id: string
  prompt: string
  options: string[]
  answer: number
  explanation: string
}

export type GrammarTopic = {
  id: string
  level: Level
  title: string
  subtitle: string
  summary: string
  rules: string[]
  examples: { de: string; ru: string }[]
  exercises: GrammarExercise[]
}

export type ReadingText = {
  id: string
  level: Level
  title: string
  kicker: string
  minutes: number
  text: string[]
  glossary: { word: string; translation: string }[]
  questions: { prompt: string; options: string[]; answer: number }[]
}
