import { ArrowRight, BookOpenText, Brain, CalendarCheck2, Flame, GraduationCap, Sparkles, Target } from 'lucide-react'
import type { LearningStore } from '../hooks/useLearningStore'
import type { PageId } from '../types'
import { isDue } from '../lib/sm2'
import { calculateStreak, localDateKey } from '../lib/storage'
import { grammarTopics, readingTexts } from '../data/content'
import { Badge, Button, Card, PageHeader, Progress } from '../components/ui'

const dayNumber = () => Math.floor(Date.now() / 86_400_000)

export function HomePage({ store, navigate }: { store: LearningStore; navigate: (page: PageId) => void }) {
  const { state, words } = store
  const today = localDateKey()
  const reviewedToday = Object.values(state.review).filter((item) => item.lastReviewedAt?.slice(0, 10) === today).length
  const due = words.filter((word) => state.review[word.id] && isDue(state.review[word.id])).length
  const learned = Object.values(state.review).filter((item) => item.repetitions > 0).length
  const hard = Object.values(state.review).filter((item) => item.hard).length
  const streak = calculateStreak(state.activeDays)
  const dailyReading = readingTexts[dayNumber() % readingTexts.length]
  const pendingGrammar = grammarTopics.find((topic) => !state.grammar.completed.includes(topic.id)) ?? grammarTopics[0]
  const goalPercent = Math.round((reviewedToday / state.dailyGoal) * 100)
  const weekday = new Intl.DateTimeFormat('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())

  return (
    <div className="animate-slide-up">
      <PageHeader eyebrow={weekday} title="Guten Tag!" description="Немного практики каждый день — и немецкий становится привычным." action={<div className="hidden items-center gap-2 rounded-full border border-line bg-card px-3 py-2 text-sm font-semibold sm:flex"><Flame size={17} className="text-accent" /> {streak} {streak === 1 ? 'день' : 'дней'}</div>} />

      <div className="grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
        <Card className="relative overflow-hidden p-5 sm:p-7">
          <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-sage/20 blur-2xl" />
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div><Badge tone={due ? 'yellow' : 'green'}>{due ? `${due} пора повторить` : 'Всё повторено'}</Badge><h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Карточки на сегодня</h2><p className="mt-2 max-w-lg text-sm leading-6 text-muted">Повтори знакомые слова, затем возьми несколько новых из частотного словаря.</p></div>
              <div className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ink text-paper sm:grid dark:bg-sage dark:text-[#152018]"><Brain size={25} /></div>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button onClick={() => navigate('study')}>Начать занятие <ArrowRight size={17} /></Button>
              <span className="text-xs font-medium text-muted">≈ {Math.max(3, Math.ceil((due || state.dailyGoal) * .35))} минут</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.15em] text-muted">Дневная цель</p><p className="mt-2 text-3xl font-bold">{reviewedToday}<span className="text-lg font-medium text-muted"> / {state.dailyGoal}</span></p></div><div className="grid h-12 w-12 place-items-center rounded-2xl bg-sun/45 text-ink"><Target size={22} /></div></div>
          <Progress value={goalPercent} className="mt-5" />
          <p className="mt-3 text-xs leading-5 text-muted">{reviewedToday >= state.dailyGoal ? 'Цель выполнена. Sehr gut!' : `Осталось ${state.dailyGoal - reviewedToday} карточек — один короткий подход.`}</p>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Слов изучено', value: learned, icon: Sparkles, tone: 'bg-sage/35' },
          { label: 'Сложных', value: hard, icon: Brain, tone: 'bg-red-100 dark:bg-red-950/35' },
          { label: 'Тем пройдено', value: state.grammar.completed.length, icon: GraduationCap, tone: 'bg-sky-100 dark:bg-sky-950/35' },
          { label: 'Текстов прочитано', value: state.reading.completed.length, icon: BookOpenText, tone: 'bg-sun/45' },
        ].map((stat) => <Card key={stat.label} className="p-4 sm:p-5"><div className={`mb-4 grid h-9 w-9 place-items-center rounded-xl ${stat.tone}`}><stat.icon size={18} /></div><p className="text-2xl font-bold">{stat.value}</p><p className="mt-1 text-xs leading-5 text-muted">{stat.label}</p></Card>)}
      </div>

      <div className="mt-8 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.15em] text-accent">План дня</p><h2 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">Ещё два шага</h2></div><div className="hidden items-center gap-2 text-xs font-semibold text-muted sm:flex"><CalendarCheck2 size={16} /> Спокойный темп</div></div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <button onClick={() => navigate('grammar')} className="group text-left">
          <Card className="h-full p-5 transition group-hover:-translate-y-0.5 group-hover:border-muted/40 sm:p-6">
            <div className="flex items-start justify-between gap-4"><div><Badge tone="blue">{pendingGrammar.level} · грамматика</Badge><h3 className="mt-4 text-xl font-bold">{pendingGrammar.title}</h3><p className="mt-1 text-sm text-muted">{pendingGrammar.subtitle}</p></div><ArrowRight size={20} className="mt-1 text-muted transition group-hover:translate-x-1 group-hover:text-ink" /></div>
            <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted">{pendingGrammar.summary}</p>
          </Card>
        </button>
        <button onClick={() => navigate('reading')} className="group text-left">
          <Card className="h-full p-5 transition group-hover:-translate-y-0.5 group-hover:border-muted/40 sm:p-6">
            <div className="flex items-start justify-between gap-4"><div><Badge tone="green">{dailyReading.level} · {dailyReading.minutes} мин</Badge><h3 className="mt-4 text-xl font-bold">{dailyReading.title}</h3><p className="mt-1 text-sm text-muted">Текст дня · {dailyReading.kicker}</p></div><ArrowRight size={20} className="mt-1 text-muted transition group-hover:translate-x-1 group-hover:text-ink" /></div>
            <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted">{dailyReading.text[0]}</p>
          </Card>
        </button>
      </div>
    </div>
  )
}
