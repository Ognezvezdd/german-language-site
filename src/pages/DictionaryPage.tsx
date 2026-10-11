import { useMemo, useState } from 'react'
import { BookPlus, Check, ChevronRight, Download, Search, SlidersHorizontal, Speaker, Upload, X } from 'lucide-react'
import type { LearningStore } from '../hooks/useLearningStore'
import type { Level, PageId, Word } from '../types'
import { publishSharedWords } from '../lib/appwrite'
import { Badge, Button, Card, Chip, EmptyState, Field, Modal, PageHeader, inputClass, textareaClass } from '../components/ui'

const parts = ['все', 'сущ.', 'глаг.', 'прил.', 'нареч.']
const levels: ('все' | Level)[] = ['все', 'A1', 'A2', 'B1']

function speak(text: string) {
  if (!('speechSynthesis' in window)) return
  speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'de-DE'
  utterance.rate = .86
  speechSynthesis.speak(utterance)
}

function parseRawWord(raw: string) {
  const clean = raw.trim()
  const match = clean.match(/^(der|die|das)\s+/i)
  const article = match?.[1]?.toLowerCase() as Word['article']
  const rest = match ? clean.slice(match[0].length) : clean
  const [lemma, ...plural] = rest.split(',')
  return { article, lemma: lemma.trim(), plural: plural.join(',').trim() || undefined }
}

function createWord(fields: string[]): Word | null {
  const [raw, translation, partOfSpeech = 'прочее', level = 'A1', example = '', exampleTranslation = '', forms = ''] = fields.map((item) => item.trim())
  if (!raw || !translation || !example || !exampleTranslation) return null
  const parsed = parseRawWord(raw)
  const id = `custom-${typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`}`
  return {
    id,
    rank: 10_000 + Math.floor(Math.random() * 100_000),
    raw,
    lemma: parsed.lemma,
    ...(parsed.article ? { article: parsed.article } : {}),
    ...(parsed.plural ? { plural: parsed.plural } : {}),
    partOfSpeech,
    translation,
    level: (['A1', 'A2', 'B1'].includes(level.toUpperCase()) ? level.toUpperCase() : 'A1') as Level,
    category: 'Мои слова',
    example,
    exampleTranslation,
    ...(forms ? { forms } : {}),
    custom: true,
  }
}

function WordTitle({ word, size = 'normal' }: { word: Word; size?: 'normal' | 'large' }) {
  return <div className={`font-display font-semibold tracking-[-.01em] text-ink ${size === 'large' ? 'text-4xl sm:text-5xl' : 'text-xl sm:text-2xl'}`}>
    {word.article && <span className="mr-2 text-accent">{word.article}</span>}{word.lemma}{word.plural && <span className="ml-1.5 text-muted">, {word.plural}</span>}
  </div>
}

export function DictionaryPage({ store, navigate }: { store: LearningStore; navigate: (page: PageId) => void }) {
  const { words, state, setState, user, appwriteConfigured } = store
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState<'все' | Level>('все')
  const [part, setPart] = useState('все')
  const [article, setArticle] = useState<'все' | 'der' | 'die' | 'das'>('все')
  const [sort, setSort] = useState<'rank' | 'alpha'>('rank')
  const [limit, setLimit] = useState(60)
  const [selected, setSelected] = useState<Word | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [addMode, setAddMode] = useState<'manual' | 'import'>('import')
  const [notice, setNotice] = useState('')
  const [importText, setImportText] = useState('')
  const [importError, setImportError] = useState('')
  const [manual, setManual] = useState({ raw: '', translation: '', part: 'сущ.', level: 'A1', example: '', exampleTranslation: '', forms: '' })

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('de')
    return words.filter((word) => {
      if (query && !`${word.raw} ${word.translation} ${word.example}`.toLocaleLowerCase('de').includes(query)) return false
      if (level !== 'все' && word.level !== level) return false
      if (part !== 'все' && !word.partOfSpeech.includes(part.replace('.', ''))) return false
      if (article !== 'все' && word.article !== article) return false
      return true
    }).sort((a, b) => sort === 'rank' ? a.rank - b.rank : a.lemma.localeCompare(b.lemma, 'de'))
  }, [words, search, level, part, article, sort])

  async function addWords(nextWords: Word[], skipped = 0) {
    if (!nextWords.length) return
    const skippedText = skipped > 0 ? ` Строк пропущено без полного примера: ${skipped}.` : ''
    setState((current) => ({ ...current, customWords: [...nextWords, ...current.customWords] }))
    if (user && appwriteConfigured) {
      try {
        await publishSharedWords(user.$id, nextWords)
        setNotice(`Добавлено ${nextWords.length}. Слова опубликованы в общей базе.${skippedText}`)
      } catch {
        setNotice(`Добавлено ${nextWords.length} локально. Публикация в Appwrite не удалась.${skippedText}`)
      }
    } else {
      setNotice(`Добавлено ${nextWords.length} локально. Войдите в аккаунт, чтобы опубликовать их для всех.${skippedText}`)
    }
    setAddOpen(false)
    setImportText('')
    setImportError('')
  }

  function handleImport() {
    const lines = importText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
    const imported = lines.map((line) => createWord(line.split('|'))).filter((word): word is Word => Boolean(word))
    const skipped = lines.length - imported.length
    if (!imported.length) {
      setImportError('Для каждой строки нужны слово, перевод, пример и перевод примера.')
      return
    }
    setImportError('')
    void addWords(imported, skipped)
  }

  function handleManual() {
    const word = createWord([manual.raw, manual.translation, manual.part, manual.level, manual.example, manual.exampleTranslation, manual.forms])
    if (word) void addWords([word])
  }

  const studiedCount = Object.values(state.review).filter((item) => item.repetitions > 0).length

  return (
    <div className="animate-slide-up">
      <PageHeader eyebrow="650 частотных слов" title="Словарь" description={`${words.length} слов · ${studiedCount} в повторении · реальные примеры A1–B1`} action={<Button onClick={() => setAddOpen(true)} className="px-3.5 sm:px-4"><BookPlus size={18} /><span className="hidden sm:inline">Добавить</span></Button>} />

      {notice && <div className="mb-4 flex items-start gap-3 rounded-2xl border border-sage/60 bg-sage/20 px-4 py-3 text-sm text-ink"><Check size={18} className="mt-0.5 shrink-0" /><span className="flex-1 leading-5">{notice}</span><button onClick={() => setNotice('')}><X size={17} /></button></div>}

      <Card className="mb-5 p-3 sm:p-4">
        <div className="relative"><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={19} /><input value={search} onChange={(event) => { setSearch(event.target.value); setLimit(60) }} className={`${inputClass} pl-11`} placeholder="Найти слово или перевод…" /></div>
        <div className="scrollbar-none mt-3 flex gap-2 overflow-x-auto pb-1">
          {levels.map((item) => <Chip key={item} active={level === item} onClick={() => { setLevel(item); setLimit(60) }}>{item === 'все' ? 'Все уровни' : item}</Chip>)}
          <span className="mx-0.5 h-10 w-px shrink-0 bg-line" />
          {parts.map((item) => <Chip key={item} active={part === item} onClick={() => { setPart(item); setLimit(60) }}>{item === 'все' ? 'Все части речи' : item}</Chip>)}
          <span className="mx-0.5 h-10 w-px shrink-0 bg-line" />
          {(['der', 'die', 'das'] as const).map((item) => <Chip key={item} active={article === item} onClick={() => { setArticle(article === item ? 'все' : item); setLimit(60) }}>{item}</Chip>)}
        </div>
      </Card>

      <div className="mb-3 flex items-center justify-between gap-3 px-1 text-xs font-semibold text-muted"><span>Найдено: {filtered.length}</span><button onClick={() => setSort(sort === 'rank' ? 'alpha' : 'rank')} className="inline-flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-line/40 hover:text-ink"><SlidersHorizontal size={15} /> {sort === 'rank' ? 'по частоте' : 'по алфавиту'}</button></div>

      {!filtered.length ? <EmptyState icon={<Search size={20} />} title="Ничего не найдено" text="Попробуйте изменить запрос или убрать часть фильтров." /> : <Card className="overflow-hidden shadow-none">
        <div className="hidden grid-cols-[70px_1.25fr_.6fr_1fr_100px] gap-4 border-b border-line px-5 py-3 text-[11px] font-bold uppercase tracking-[.12em] text-muted md:grid"><span>Ранг</span><span>Слово</span><span>Тип</span><span>Перевод</span><span>Статус</span></div>
        {filtered.slice(0, limit).map((word) => {
          const progress = state.review[word.id]
          return <button key={word.id} onClick={() => setSelected(word)} className="grid w-full grid-cols-[1fr_auto] items-center gap-3 border-b border-line px-4 py-4 text-left transition last:border-0 hover:bg-line/20 md:grid-cols-[70px_1.25fr_.6fr_1fr_100px] md:gap-4 md:px-5">
            <span className="hidden font-mono text-xs text-muted md:block">{word.rank > 9999 ? '—' : word.rank}</span>
            <div><WordTitle word={word} /><p className="mt-1 text-xs text-muted md:hidden">{word.translation} · {word.partOfSpeech}</p></div>
            <span className="hidden text-sm text-muted md:block">{word.partOfSpeech}</span><span className="hidden text-sm text-ink md:block">{word.translation}</span>
            <div className="flex items-center gap-2">{progress ? <Badge tone={progress.hard ? 'red' : 'green'}>{progress.hard ? 'сложное' : 'учу'}</Badge> : <Badge>новое</Badge>}<ChevronRight size={17} className="text-muted md:hidden" /></div>
          </button>
        })}
      </Card>}
      {filtered.length > limit && <div className="mt-5 flex justify-center"><Button variant="secondary" onClick={() => setLimit((value) => value + 60)}>Показать ещё {Math.min(60, filtered.length - limit)}</Button></div>}

      <Modal open={Boolean(selected)} title="Карточка слова" onClose={() => setSelected(null)} wide>
        {selected && <div>
          <div className="flex items-start justify-between gap-4"><div><div className="mb-3 flex flex-wrap gap-2"><Badge tone="blue">{selected.level}</Badge><Badge>{selected.partOfSpeech}</Badge><Badge>ранг {selected.rank > 9999 ? 'добавлено' : selected.rank}</Badge></div><WordTitle word={selected} size="large" /></div><button onClick={() => speak(selected.lemma)} className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line text-ink hover:bg-line/30" aria-label="Озвучить слово"><Speaker size={21} /></button></div>
          <div className="my-6 h-px bg-line" />
          <p className="text-2xl font-bold text-ink">{selected.translation}</p>
          <div className="mt-6 rounded-2xl bg-paper p-4 sm:p-5"><div className="flex items-start justify-between gap-3"><div><p className="font-display text-2xl leading-snug text-ink">{selected.example}</p><p className="mt-2 text-sm leading-6 text-muted">{selected.exampleTranslation}</p></div><button onClick={() => speak(selected.example)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line text-muted hover:text-ink"><Speaker size={18} /></button></div></div>
          {selected.forms && <div className="mt-4 flex items-start gap-4 border-t border-line pt-4"><span className="w-20 shrink-0 text-xs font-semibold uppercase tracking-wide text-muted">Формы</span><span className="text-sm font-medium text-ink">{selected.forms}</span></div>}
          <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><Button variant="secondary" onClick={() => setSelected(null)}>Закрыть</Button><Button onClick={() => { setSelected(null); navigate('study') }}>Учить в карточках <ChevronRight size={17} /></Button></div>
        </div>}
      </Modal>

      <Modal open={addOpen} title="Добавить слова" onClose={() => setAddOpen(false)} wide>
        <div className="mb-5 flex gap-2"><Chip active={addMode === 'import'} onClick={() => setAddMode('import')}><Upload size={15} className="mr-1.5 inline" />Массовый импорт</Chip><Chip active={addMode === 'manual'} onClick={() => setAddMode('manual')}><BookPlus size={15} className="mr-1.5 inline" />Одно слово</Chip></div>
        {addMode === 'import' ? <div className="space-y-5">
          <div className="rounded-2xl bg-paper p-4 text-xs leading-6 text-muted"><p className="font-semibold text-ink">Одна строка — одно слово. Поля разделяйте символом |</p><code className="mt-2 block overflow-x-auto whitespace-nowrap text-[11px]">die Zeit, -en | время | сущ. | A1 | Hast du jetzt Zeit? | У тебя сейчас есть время? |</code><p className="mt-2">Обязательны слово, перевод, живой пример и перевод примера. Артикль и форма множественного числа указываются в первом поле.</p></div>
          <Field label="Список слов"><textarea value={importText} onChange={(event) => { setImportText(event.target.value); setImportError('') }} className={`${textareaClass} min-h-52 font-mono text-xs`} placeholder={'der Termin, -e | приём, назначенная встреча | сущ. | A2 | Ich habe morgen einen Termin. | Завтра у меня назначена встреча.\nbezahlen | оплачивать | глаг. | A1 | Kann ich mit Karte bezahlen? | Можно оплатить картой?'} /></Field>
          {importError && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/35 dark:text-red-300">{importError}</p>}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><Button variant="secondary" onClick={() => setAddOpen(false)}>Отмена</Button><Button disabled={!importText.trim()} onClick={handleImport}><Download size={17} />Импортировать</Button></div>
        </div> : <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Слово" hint="Для существительного: die Zeit, -en"><input className={inputClass} value={manual.raw} onChange={(event) => setManual({ ...manual, raw: event.target.value })} placeholder="die Zeit, -en" /></Field>
          <Field label="Перевод"><input className={inputClass} value={manual.translation} onChange={(event) => setManual({ ...manual, translation: event.target.value })} placeholder="время" /></Field>
          <Field label="Часть речи"><select className={inputClass} value={manual.part} onChange={(event) => setManual({ ...manual, part: event.target.value })}><option>сущ.</option><option>глаг.</option><option>прил.</option><option>нареч.</option><option>прочее</option></select></Field>
          <Field label="Уровень"><select className={inputClass} value={manual.level} onChange={(event) => setManual({ ...manual, level: event.target.value })}><option>A1</option><option>A2</option><option>B1</option></select></Field>
          <Field label="Пример"><input className={inputClass} value={manual.example} onChange={(event) => setManual({ ...manual, example: event.target.value })} placeholder="Hast du jetzt Zeit?" /></Field>
          <Field label="Перевод примера"><input className={inputClass} value={manual.exampleTranslation} onChange={(event) => setManual({ ...manual, exampleTranslation: event.target.value })} placeholder="У тебя сейчас есть время?" /></Field>
          <div className="sm:col-span-2"><Field label="Формы (необязательно)" hint="Например: fahren · fuhr · ist gefahren"><input className={inputClass} value={manual.forms} onChange={(event) => setManual({ ...manual, forms: event.target.value })} /></Field></div>
          <div className="flex flex-col-reverse gap-2 pt-2 sm:col-span-2 sm:flex-row sm:justify-end"><Button variant="secondary" onClick={() => setAddOpen(false)}>Отмена</Button><Button disabled={!manual.raw.trim() || !manual.translation.trim() || !manual.example.trim() || !manual.exampleTranslation.trim()} onClick={handleManual}>Добавить слово</Button></div>
        </div>}
      </Modal>
    </div>
  )
}
