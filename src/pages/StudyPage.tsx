import { useMemo, useState } from 'react'
import { Brain, CheckCircle2, RotateCcw, Speaker, Sparkles } from 'lucide-react'
import type { LearningStore } from '../hooks/useLearningStore'
import type { Word } from '../types'
import { isDue, reviewCard } from '../lib/sm2'
import { Badge, Button, Card, Chip, EmptyState, PageHeader, Progress } from '../components/ui'

type Mode = 'due' | 'new' | 'hard'

function speak(text: string) {
  if (!('speechSynthesis' in window)) return
  speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'de-DE'
  utterance.rate = .84
  speechSynthesis.speak(utterance)
}

function cardLabel(word: Word) {
  return <>{word.article && <span className="mr-2 text-accent">{word.article}</span>}{word.lemma}{word.plural && <span className="ml-2 text-muted">, {word.plural}</span>}</>
}

export function StudyPage({ store }: { store: LearningStore }) {
  const { words, state, setState, markActive } = store
  const dueCount = useMemo(() => words.filter((word) => state.review[word.id] && isDue(state.review[word.id])).length, [words, state.review])
  const newCount = useMemo(() => words.filter((word) => !state.review[word.id]).length, [words, state.review])
  const hardCount = useMemo(() => words.filter((word) => state.review[word.id]?.hard).length, [words, state.review])
  const initialMode: Mode = dueCount ? 'due' : 'new'
  const [mode, setMode] = useState<Mode>(initialMode)
  const [deckIds, setDeckIds] = useState<string[]>(() => makeDeck(initialMode, words, state.review))
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [results, setResults] = useState({ again: 0, learned: 0 })

  function chooseMode(next: Mode) {
    setMode(next)
    setDeckIds(makeDeck(next, words, state.review))
    setIndex(0)
    setRevealed(false)
    setResults({ again: 0, learned: 0 })
  }

  const current = words.find((word) => word.id === deckIds[index])
  const complete = deckIds.length > 0 && index >= deckIds.length
  const progress = deckIds.length ? (index / deckIds.length) * 100 : 0

  function rate(quality: number) {
    if (!current) return
    setState((previous) => ({
      ...previous,
      review: { ...previous.review, [current.id]: reviewCard(previous.review[current.id], quality) },
    }))
    markActive()
    setResults((previous) => ({ again: previous.again + (quality < 3 ? 1 : 0), learned: previous.learned + (quality >= 3 ? 1 : 0) }))
    setIndex((value) => value + 1)
    setRevealed(false)
  }

  return (
    <div className="animate-slide-up">
      <PageHeader eyebrow="Интервальные повторения · SM-2" title="Карточки" description="Вспомни значение, открой ответ и честно оцени сложность." />
      <div className="scrollbar-none -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        <Chip active={mode === 'due'} onClick={() => chooseMode('due')}>На сегодня · {dueCount}</Chip>
        <Chip active={mode === 'new'} onClick={() => chooseMode('new')}>Новые · {newCount}</Chip>
        <Chip active={mode === 'hard'} onClick={() => chooseMode('hard')}>Сложные · {hardCount}</Chip>
      </div>

      {!deckIds.length ? <EmptyState icon={<CheckCircle2 size={22} />} title={mode === 'due' ? 'На сегодня всё' : mode === 'hard' ? 'Сложных слов пока нет' : 'Новые слова закончились'} text={mode === 'due' ? 'Повторения появятся здесь в нужный день. Можно пока взять несколько новых слов.' : 'Слова попадут сюда автоматически после занятий.'} action={mode !== 'new' ? <Button onClick={() => chooseMode('new')}>Учить новые слова</Button> : undefined} /> : complete ? <Card className="mx-auto max-w-2xl p-7 text-center sm:p-10">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage/40"><Sparkles size={28} /></div>
        <h2 className="mt-5 font-display text-3xl font-semibold">Занятие завершено</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">Повторено {deckIds.length} слов. Уверенно: {results.learned}, требуют внимания: {results.again}.</p>
        <div className="mt-7 flex justify-center"><Button variant="secondary" onClick={() => chooseMode(mode)}><RotateCcw size={17} />Ещё один подход</Button></div>
      </Card> : current && <div className="mx-auto max-w-3xl">
        <div className="mb-3 flex items-center justify-between px-1 text-xs font-semibold text-muted"><span>{index + 1} из {deckIds.length}</span><span>{mode === 'due' ? 'Повторение' : mode === 'hard' ? 'Сложные слова' : 'Новые слова'}</span></div>
        <Progress value={progress} className="mb-4" />
        <Card className="min-h-[480px] overflow-hidden p-5 sm:min-h-[520px] sm:p-8">
          <div key={current.id} className="flex min-h-[430px] flex-col animate-card-in sm:min-h-[456px]">
            <div className="flex items-center justify-between gap-3"><div className="flex gap-2"><Badge tone="blue">{current.level}</Badge><Badge>{current.partOfSpeech}</Badge><Badge>№ {current.rank > 9999 ? 'моё' : current.rank}</Badge></div><button onClick={() => speak(current.lemma)} className="grid h-11 w-11 place-items-center rounded-2xl border border-line text-muted hover:text-ink" aria-label="Озвучить"><Speaker size={19} /></button></div>
            <div className={`flex flex-1 flex-col justify-center ${revealed ? 'py-6' : 'py-10'}`}>
              <h2 className="text-center font-display text-5xl font-semibold tracking-[-.025em] sm:text-6xl">{cardLabel(current)}</h2>
              <div className="mt-7 rounded-2xl bg-paper p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-xl leading-relaxed sm:text-2xl">{current.example}</p>
                    {revealed && <p className="mt-2 animate-slide-up text-sm leading-6 text-muted">{current.exampleTranslation}</p>}
                  </div>
                  <button onClick={() => speak(current.example)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line text-muted hover:text-ink" aria-label="Озвучить пример"><Speaker size={17} /></button>
                </div>
              </div>
              {!revealed && <p className="mt-5 text-center text-sm text-muted">Попробуй понять слово по контексту</p>}
              {revealed && <div className="mt-8 animate-slide-up">
                <div className="h-px bg-line" />
                <p className="mt-7 text-center text-2xl font-bold sm:text-3xl">{current.translation}</p>
                {current.forms && <p className="mt-5 text-center text-sm text-muted"><span className="mr-2 font-semibold uppercase tracking-wide">Формы</span>{current.forms}</p>}
              </div>}
            </div>
            {!revealed ? <Button onClick={() => setRevealed(true)} className="w-full py-3.5">Показать ответ</Button> : <div>
              <p className="mb-2 text-center text-xs font-medium text-muted">Насколько легко вспомнилось?</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <button onClick={() => rate(0)} className="rounded-2xl border border-red-200 bg-red-50 px-2 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-900 dark:bg-red-950/35 dark:text-red-300"><span className="block">Снова</span><span className="mt-1 block text-[10px] font-medium opacity-70">через 10 мин</span></button>
                <button onClick={() => rate(2)} className="rounded-2xl border border-amber-200 bg-amber-50 px-2 py-3 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950/35 dark:text-amber-300"><span className="block">Сложно</span><span className="mt-1 block text-[10px] font-medium opacity-70">завтра</span></button>
                <button onClick={() => rate(4)} className="rounded-2xl border border-sage bg-sage/20 px-2 py-3 text-sm font-semibold text-ink transition hover:bg-sage/35"><span className="block">Хорошо</span><span className="mt-1 block text-[10px] font-medium opacity-60">по плану</span></button>
                <button onClick={() => rate(5)} className="rounded-2xl border border-sky-200 bg-sky-50 px-2 py-3 text-sm font-semibold text-sky-800 transition hover:bg-sky-100 dark:border-sky-900 dark:bg-sky-950/35 dark:text-sky-300"><span className="block">Легко</span><span className="mt-1 block text-[10px] font-medium opacity-70">интервал × 1.3</span></button>
              </div>
            </div>}
          </div>
        </Card>
      </div>}
    </div>
  )
}

function makeDeck(mode: Mode, words: Word[], review: LearningStore['state']['review']) {
  if (mode === 'due') return words.filter((word) => review[word.id] && isDue(review[word.id])).sort((a, b) => new Date(review[a.id].dueAt).getTime() - new Date(review[b.id].dueAt).getTime()).slice(0, 30).map((word) => word.id)
  if (mode === 'hard') return words.filter((word) => review[word.id]?.hard).sort((a, b) => review[b.id].lapses - review[a.id].lapses).slice(0, 30).map((word) => word.id)
  return words.filter((word) => !review[word.id]).sort((a, b) => a.rank - b.rank).slice(0, 15).map((word) => word.id)
}
