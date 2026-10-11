import { useMemo, useState } from 'react'
import { ArrowRight, Check, CheckCircle2, CircleAlert, GraduationCap, RotateCcw, X } from 'lucide-react'
import type { LearningStore } from '../hooks/useLearningStore'
import type { GrammarTopic, Level } from '../types'
import { grammarTopics } from '../data/content'
import { Badge, Button, Card, Chip, EmptyState, PageHeader, Progress } from '../components/ui'

type Filter = 'all' | Level | 'errors'

export function GrammarPage({ store }: { store: LearningStore }) {
  const { state, setState, markActive } = store
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<GrammarTopic | null>(null)
  const [view, setView] = useState<'theory' | 'practice'>('theory')
  const [question, setQuestion] = useState(0)
  const [answer, setAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const filtered = useMemo(() => grammarTopics.filter((topic) => {
    if (filter === 'all') return true
    if (filter === 'errors') return topic.exercises.some((exercise) => (state.grammar.mistakes[exercise.id] ?? 0) > 0)
    return topic.level === filter
  }), [filter, state.grammar.mistakes])

  function openTopic(topic: GrammarTopic) {
    setSelected(topic)
    setView('theory')
    restartPractice()
  }

  function restartPractice() {
    setQuestion(0)
    setAnswer(null)
    setScore(0)
    setFinished(false)
  }

  function chooseAnswer(option: number) {
    if (!selected || answer !== null) return
    setAnswer(option)
    const exercise = selected.exercises[question]
    const correct = option === exercise.answer
    if (correct) setScore((value) => value + 1)
    else setState((previous) => ({ ...previous, grammar: { ...previous.grammar, mistakes: { ...previous.grammar.mistakes, [exercise.id]: (previous.grammar.mistakes[exercise.id] ?? 0) + 1 } } }))
    markActive()
  }

  function nextQuestion() {
    if (!selected) return
    if (question < selected.exercises.length - 1) {
      setQuestion((value) => value + 1)
      setAnswer(null)
      return
    }
    setFinished(true)
    setState((previous) => ({ ...previous, grammar: { ...previous.grammar, completed: previous.grammar.completed.includes(selected.id) ? previous.grammar.completed : [...previous.grammar.completed, selected.id] } }))
  }

  if (selected) {
    const mistakes = selected.exercises.reduce((total, exercise) => total + (state.grammar.mistakes[exercise.id] ?? 0), 0)
    const currentExercise = selected.exercises[question]
    return <div className="animate-slide-up">
      <PageHeader onBack={() => setSelected(null)} eyebrow={`${selected.level} · ${selected.subtitle}`} title={selected.title} description={selected.summary} action={state.grammar.completed.includes(selected.id) ? <Badge tone="green">Пройдено</Badge> : undefined} />
      <div className="mb-5 flex gap-2"><Chip active={view === 'theory'} onClick={() => setView('theory')}>Теория</Chip><Chip active={view === 'practice'} onClick={() => setView('practice')}>Упражнения · {selected.exercises.length}</Chip>{mistakes > 0 && <Badge tone="red">{mistakes} ошибок</Badge>}</div>

      {view === 'theory' ? <div className="grid gap-4 lg:grid-cols-[1fr_.7fr]">
        <Card className="p-5 sm:p-7"><p className="text-xs font-bold uppercase tracking-[.14em] text-muted">Главное правило</p><div className="mt-5 space-y-4">{selected.rules.map((rule, index) => <div key={rule} className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-paper dark:bg-sage dark:text-[#152018]">{index + 1}</span><p className="pt-0.5 text-sm leading-6 text-ink sm:text-base">{rule}</p></div>)}</div></Card>
        <Card className="p-5 sm:p-7"><p className="text-xs font-bold uppercase tracking-[.14em] text-muted">Живые примеры</p><div className="mt-4 divide-y divide-line">{selected.examples.map((example) => <div key={example.de} className="py-4 first:pt-1"><p className="font-display text-xl leading-snug">{example.de}</p><p className="mt-1.5 text-sm text-muted">{example.ru}</p></div>)}</div></Card>
        <div className="lg:col-span-2"><Button onClick={() => { setView('practice'); restartPractice() }} className="w-full sm:w-auto">Проверить себя <ArrowRight size={17} /></Button></div>
      </div> : finished ? <Card className="mx-auto max-w-2xl p-7 text-center sm:p-10"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage/40"><CheckCircle2 size={28} /></div><h2 className="mt-5 font-display text-3xl font-semibold">Тема пройдена</h2><p className="mt-3 text-sm leading-6 text-muted">Правильных ответов: {score} из {selected.exercises.length}. {score === selected.exercises.length ? 'Отлично — правило уже уверенно работает.' : 'Ошибки сохранены: к теме можно вернуться в отдельном фильтре.'}</p><div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row"><Button variant="secondary" onClick={() => setView('theory')}>Повторить теорию</Button><Button onClick={restartPractice}><RotateCcw size={17} />Пройти ещё раз</Button></div></Card> : <div className="mx-auto max-w-3xl">
        <div className="mb-3 flex items-center justify-between text-xs font-semibold text-muted"><span>Вопрос {question + 1} из {selected.exercises.length}</span><span>{score} верно</span></div><Progress value={(question / selected.exercises.length) * 100} className="mb-4" />
        <Card className="p-5 sm:p-8"><p className="text-xs font-bold uppercase tracking-[.13em] text-muted">Выберите ответ</p><h2 className="mt-4 text-xl font-bold leading-relaxed sm:text-2xl">{currentExercise.prompt}</h2><div className="mt-7 space-y-2.5">{currentExercise.options.map((option, index) => {
          const isCorrect = answer !== null && index === currentExercise.answer
          const isWrong = answer === index && index !== currentExercise.answer
          return <button key={option} onClick={() => chooseAnswer(index)} disabled={answer !== null} className={`flex min-h-14 w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition sm:text-base ${isCorrect ? 'border-emerald-400 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/35 dark:text-emerald-200' : isWrong ? 'border-red-400 bg-red-50 text-red-800 dark:bg-red-950/35 dark:text-red-200' : 'border-line bg-paper hover:border-muted/50'}`}><span>{option}</span>{isCorrect && <Check size={19} />}{isWrong && <X size={19} />}</button>
        })}</div>
        {answer !== null && <div className={`mt-5 rounded-2xl p-4 ${answer === currentExercise.answer ? 'bg-sage/30' : 'bg-red-50 dark:bg-red-950/30'}`}><div className="flex gap-3">{answer === currentExercise.answer ? <CheckCircle2 className="mt-0.5 shrink-0" size={19} /> : <CircleAlert className="mt-0.5 shrink-0 text-red-600" size={19} />}<div><p className="text-sm font-bold">{answer === currentExercise.answer ? 'Правильно' : 'Стоит запомнить'}</p><p className="mt-1 text-sm leading-6 text-muted">{currentExercise.explanation}</p></div></div></div>}
        {answer !== null && <div className="mt-6 flex justify-end"><Button onClick={nextQuestion}>{question === selected.exercises.length - 1 ? 'Завершить' : 'Дальше'} <ArrowRight size={17} /></Button></div>}
        </Card>
      </div>}
    </div>
  }

  const completedPercent = Math.round((state.grammar.completed.length / grammarTopics.length) * 100)
  return <div className="animate-slide-up">
    <PageHeader eyebrow="Теория + практика" title="Грамматика" description="От базового порядка слов до уверенного B1 — короткими понятными темами." />
    <Card className="mb-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><p className="text-sm font-bold">Общий прогресс</p><p className="mt-1 text-xs text-muted">Пройдено {state.grammar.completed.length} из {grammarTopics.length} тем</p></div><div className="w-full sm:w-64"><div className="mb-2 text-right text-xs font-bold text-muted">{completedPercent}%</div><Progress value={completedPercent} /></div></Card>
    <div className="scrollbar-none -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"><Chip active={filter === 'all'} onClick={() => setFilter('all')}>Все темы</Chip>{(['A1', 'A2', 'B1'] as const).map((item) => <Chip key={item} active={filter === item} onClick={() => setFilter(item)}>{item}</Chip>)}<Chip active={filter === 'errors'} onClick={() => setFilter('errors')}>Повторить ошибки</Chip></div>
    {!filtered.length ? <EmptyState icon={<GraduationCap size={22} />} title="Ошибок пока нет" text="После выполнения упражнений темы с ошибками появятся здесь." action={<Button variant="secondary" onClick={() => setFilter('all')}>Посмотреть все темы</Button>} /> : <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{filtered.map((topic, index) => {
      const mistakes = topic.exercises.reduce((sum, exercise) => sum + (state.grammar.mistakes[exercise.id] ?? 0), 0)
      const completed = state.grammar.completed.includes(topic.id)
      return <button key={topic.id} onClick={() => openTopic(topic)} className="group text-left"><Card className="h-full p-5 transition group-hover:-translate-y-0.5 group-hover:border-muted/40"><div className="flex items-start justify-between"><div className="flex gap-2"><Badge tone="blue">{topic.level}</Badge>{completed && <Badge tone="green">готово</Badge>}{mistakes > 0 && <Badge tone="red">{mistakes} ошибок</Badge>}</div><span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</span></div><h3 className="mt-5 text-xl font-bold">{topic.title}</h3><p className="mt-1 text-sm text-muted">{topic.subtitle}</p><p className="mt-4 line-clamp-3 text-sm leading-6 text-muted">{topic.summary}</p><div className="mt-5 flex items-center gap-2 text-sm font-semibold text-ink">Открыть тему <ArrowRight size={16} className="transition group-hover:translate-x-1" /></div></Card></button>
    })}</div>}
  </div>
}
