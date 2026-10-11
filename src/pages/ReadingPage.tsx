import { useMemo, useState } from 'react'
import { ArrowRight, Bookmark, BookmarkCheck, BookOpenText, Check, Clock3, Plus } from 'lucide-react'
import type { LearningStore } from '../hooks/useLearningStore'
import type { Level, ReadingText, Word } from '../types'
import { readingTexts } from '../data/content'
import { Badge, Button, Card, Chip, PageHeader, Progress, inputClass } from '../components/ui'

const dayNumber = () => Math.floor(Date.now() / 86_400_000)

function glossaryWord(text: ReadingText, word: string, translation: string): Word {
  const match = word.match(/^(der|die|das)\s+/i)
  const article = match?.[1]?.toLowerCase() as Word['article']
  const lemma = match ? word.slice(match[0].length) : word
  return {
    id: `reading-${text.id}-${word.toLocaleLowerCase('de').replace(/[^a-zäöüß]+/gi, '-')}`,
    rank: 20_000,
    raw: word,
    lemma,
    ...(article ? { article } : {}),
    partOfSpeech: article ? 'сущ.' : 'из текста',
    translation,
    level: text.level,
    category: 'Из чтения',
    example: text.text.find((paragraph) => paragraph.toLocaleLowerCase('de').includes(lemma.toLocaleLowerCase('de'))) ?? `„${lemma}“ ist ein nützliches Wort.`,
    exampleTranslation: `Слово из текста «${text.title}».`,
    custom: true,
  }
}

export function ReadingPage({ store }: { store: LearningStore }) {
  const { state, setState, markActive } = store
  const daily = readingTexts[dayNumber() % readingTexts.length]
  const [level, setLevel] = useState<'all' | Level>('all')
  const [selected, setSelected] = useState<ReadingText | null>(null)
  const [customWord, setCustomWord] = useState('')
  const [customTranslation, setCustomTranslation] = useState('')
  const [customMessage, setCustomMessage] = useState('')
  const filtered = useMemo(() => readingTexts.filter((text) => level === 'all' || text.level === level), [level])

  function toggleWord(text: ReadingText, word: string, translation: string) {
    const key = `${text.id}:${word}`
    setState((previous) => {
      const saved = previous.reading.savedWords.includes(key)
      const created = glossaryWord(text, word, translation)
      return {
        ...previous,
        customWords: saved ? previous.customWords.filter((item) => item.id !== created.id) : previous.customWords.some((item) => item.id === created.id) ? previous.customWords : [created, ...previous.customWords],
        reading: { ...previous.reading, savedWords: saved ? previous.reading.savedWords.filter((item) => item !== key) : [...previous.reading.savedWords, key] },
      }
    })
    markActive()
  }

  function saveAllWords(text: ReadingText) {
    setState((previous) => {
      const created = text.glossary.map((item) => glossaryWord(text, item.word, item.translation))
      const newWords = created.filter((word) => !previous.customWords.some((item) => item.id === word.id))
      const keys = text.glossary.map((item) => `${text.id}:${item.word}`)
      return {
        ...previous,
        customWords: [...newWords, ...previous.customWords],
        reading: { ...previous.reading, savedWords: [...new Set([...previous.reading.savedWords, ...keys])] },
      }
    })
    markActive()
  }

  function saveCustomWord(text: ReadingText) {
    const word = customWord.trim()
    const translation = customTranslation.trim()
    if (!word || !translation) {
      setCustomMessage('Заполните слово и перевод.')
      return
    }
    const key = `${text.id}:${word}`
    const created = glossaryWord(text, word, translation)
    setState((previous) => ({
      ...previous,
      customWords: previous.customWords.some((item) => item.id === created.id) ? previous.customWords : [created, ...previous.customWords],
      reading: { ...previous.reading, savedWords: previous.reading.savedWords.includes(key) ? previous.reading.savedWords : [...previous.reading.savedWords, key] },
    }))
    setCustomWord('')
    setCustomTranslation('')
    setCustomMessage(`«${word}» добавлено в словарь.`)
    markActive()
  }

  function answerQuestion(text: ReadingText, questionIndex: number, answerIndex: number) {
    const key = `${text.id}:${questionIndex}`
    setState((previous) => ({ ...previous, reading: { ...previous.reading, answers: { ...previous.reading.answers, [key]: answerIndex } } }))
    markActive()
  }

  function finishText(text: ReadingText) {
    setState((previous) => ({ ...previous, reading: { ...previous.reading, completed: previous.reading.completed.includes(text.id) ? previous.reading.completed : [...previous.reading.completed, text.id] } }))
    markActive()
  }

  if (selected) {
    const answered = selected.questions.filter((_, index) => state.reading.answers[`${selected.id}:${index}`] !== undefined).length
    const allAnswered = answered === selected.questions.length
    const completed = state.reading.completed.includes(selected.id)
    const savedGlossaryCount = selected.glossary.filter((item) => state.reading.savedWords.includes(`${selected.id}:${item.word}`)).length
    return <div className="animate-slide-up">
      <PageHeader onBack={() => setSelected(null)} eyebrow={`${selected.level} · ${selected.kicker} · ${selected.minutes} минут`} title={selected.title} description="Прочитайте текст без словаря, затем сохраните только действительно нужные слова и ответьте на вопросы." action={completed ? <Badge tone="green">Прочитано</Badge> : undefined} />
      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <Card className="p-5 sm:p-8"><div className="reading-copy space-y-5">{selected.text.map((paragraph) => <p key={paragraph} className="font-display text-xl leading-[1.75] text-ink sm:text-2xl sm:leading-[1.7]">{paragraph}</p>)}</div></Card>
        <div className="space-y-4"><Card className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-bold">Слова из текста</p><p className="mt-1 text-xs text-muted">Сохранено {savedGlossaryCount} из {selected.glossary.length}</p></div><Button variant="secondary" className="shrink-0 px-3 py-2 text-xs" onClick={() => saveAllWords(selected)}>Сохранить все</Button></div><div className="mt-4 max-h-[520px] space-y-2 overflow-y-auto pr-1">{selected.glossary.map((item) => {
          const saved = state.reading.savedWords.includes(`${selected.id}:${item.word}`)
          return <button key={item.word} onClick={() => toggleWord(selected, item.word, item.translation)} className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-3 text-left transition ${saved ? 'border-sage bg-sage/20' : 'border-line bg-paper hover:border-muted/50'}`}><div><p className="font-display text-lg font-semibold">{item.word}</p><p className="mt-0.5 text-xs text-muted">{item.translation}</p></div>{saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} className="text-muted" />}</button>
        })}</div></Card><Card className="p-5"><p className="text-sm font-bold">Своё слово или фраза</p><p className="mt-1 text-xs leading-5 text-muted">Если нужного выражения нет в подсказках, добавьте его прямо из текста.</p><div className="mt-4 space-y-2"><input className={inputClass} value={customWord} onChange={(event) => { setCustomWord(event.target.value); setCustomMessage('') }} placeholder="Немецкое слово или фраза" /><input className={inputClass} value={customTranslation} onChange={(event) => { setCustomTranslation(event.target.value); setCustomMessage('') }} onKeyDown={(event) => { if (event.key === 'Enter') saveCustomWord(selected) }} placeholder="Перевод" /><Button className="w-full" onClick={() => saveCustomWord(selected)}><Plus size={17} />Добавить в словарь</Button>{customMessage && <p className="text-xs leading-5 text-muted">{customMessage}</p>}</div></Card></div>
      </div>

      <div className="mt-8"><div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-accent">Проверка понимания</p><h2 className="mt-1 font-display text-2xl font-semibold">Вопросы по тексту</h2></div><span className="text-xs font-semibold text-muted">{answered}/{selected.questions.length}</span></div><div className="grid gap-4 md:grid-cols-2">{selected.questions.map((question, questionIndex) => {
        const chosen = state.reading.answers[`${selected.id}:${questionIndex}`]
        return <Card key={question.prompt} className="p-5"><p className="text-sm font-bold leading-6">{questionIndex + 1}. {question.prompt}</p><div className="mt-4 space-y-2">{question.options.map((option, optionIndex) => {
          const answeredQuestion = chosen !== undefined
          const correct = answeredQuestion && optionIndex === question.answer
          const wrong = chosen === optionIndex && chosen !== question.answer
          return <button key={option} disabled={answeredQuestion} onClick={() => answerQuestion(selected, questionIndex, optionIndex)} className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm font-medium ${correct ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30' : wrong ? 'border-red-400 bg-red-50 dark:bg-red-950/30' : 'border-line bg-paper hover:border-muted/50'}`}><span>{option}</span>{correct && <Check size={17} />}</button>
        })}</div>{chosen !== undefined && <p className={`mt-3 text-xs font-semibold ${chosen === question.answer ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-600 dark:text-red-300'}`}>{chosen === question.answer ? 'Верно' : `Правильный ответ: ${question.options[question.answer]}`}</p>}</Card>
      })}</div>{allAnswered && !completed && <div className="mt-5 flex justify-end"><Button onClick={() => finishText(selected)}>Завершить чтение <Check size={17} /></Button></div>}</div>
    </div>
  }

  const progress = Math.round((state.reading.completed.length / readingTexts.length) * 100)
  return <div className="animate-slide-up">
    <PageHeader eyebrow="Тексты A1–B1" title="Чтение" description="Короткие бытовые истории и актуальные темы с вопросами на понимание." />
    <button onClick={() => setSelected(daily)} className="group mb-6 block w-full text-left"><Card className="relative overflow-hidden p-5 transition group-hover:-translate-y-0.5 group-hover:border-muted/40 sm:p-7"><div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-sun/35 blur-2xl" /><div className="relative flex items-start justify-between gap-5"><div><div className="flex items-center gap-2"><Badge tone="yellow">Текст дня</Badge><Badge tone="blue">{daily.level}</Badge><span className="flex items-center gap-1 text-xs font-medium text-muted"><Clock3 size={14} />{daily.minutes} мин</span></div><h2 className="mt-5 font-display text-3xl font-semibold">{daily.title}</h2><p className="mt-3 max-w-2xl line-clamp-2 text-sm leading-6 text-muted">{daily.text[0]}</p><div className="mt-5 flex items-center gap-2 text-sm font-bold">Читать сейчас <ArrowRight size={17} className="transition group-hover:translate-x-1" /></div></div><BookOpenText size={31} className="hidden text-muted sm:block" /></div></Card></button>
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="scrollbar-none flex gap-2 overflow-x-auto pb-1"><Chip active={level === 'all'} onClick={() => setLevel('all')}>Все уровни</Chip>{(['A1', 'A2', 'B1'] as const).map((item) => <Chip key={item} active={level === item} onClick={() => setLevel(item)}>{item}</Chip>)}</div><div className="flex min-w-48 items-center gap-3"><Progress value={progress} className="flex-1" /><span className="text-xs font-bold text-muted">{progress}%</span></div></div>
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{filtered.map((text) => {
      const completed = state.reading.completed.includes(text.id)
      return <button key={text.id} onClick={() => setSelected(text)} className="group text-left"><Card className="h-full p-5 transition group-hover:-translate-y-0.5 group-hover:border-muted/40"><div className="flex items-center justify-between"><div className="flex gap-2"><Badge tone="blue">{text.level}</Badge>{completed && <Badge tone="green">прочитано</Badge>}</div><span className="flex items-center gap-1 text-xs text-muted"><Clock3 size={13} />{text.minutes} мин</span></div><p className="mt-5 text-xs font-bold uppercase tracking-[.12em] text-accent">{text.kicker}</p><h3 className="mt-2 text-xl font-bold">{text.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{text.text[0]}</p><div className="mt-5 flex items-center gap-2 text-sm font-semibold">Открыть <ArrowRight size={16} className="transition group-hover:translate-x-1" /></div></Card></button>
    })}</div>
  </div>
}
