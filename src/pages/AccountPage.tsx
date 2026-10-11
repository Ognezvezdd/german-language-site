import { useState } from 'react'
import { Check, Cloud, CloudOff, Download, LogOut, Moon, RefreshCw, ShieldCheck, Sun, UserRoundPlus } from 'lucide-react'
import type { LearningStore } from '../hooks/useLearningStore'
import { friendlyAppwriteError, login as loginAppwrite, logout as logoutAppwrite, register as registerAppwrite } from '../lib/appwrite'
import { calculateStreak } from '../lib/storage'
import { Button, Card, Chip, Field, PageHeader, inputClass } from '../components/ui'

export function AccountPage({ store }: { store: LearningStore }) {
  const { state, setState, user, cloudStatus, refreshUser, syncNow, appwriteConfigured } = store
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit() {
    setBusy(true)
    setError('')
    try {
      if (mode === 'register') await registerAppwrite(email, password, name || 'Ученик')
      else await loginAppwrite(email, password)
      await refreshUser()
      setPassword('')
    } catch (nextError) {
      setError(friendlyAppwriteError(nextError))
    } finally {
      setBusy(false)
    }
  }

  async function signOut() {
    setBusy(true)
    try { await logoutAppwrite(); await refreshUser() } finally { setBusy(false) }
  }

  function exportProgress() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `klar-deutsch-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const status = cloudStatus === 'synced' ? { label: 'Синхронизировано', icon: Check, color: 'text-emerald-700 dark:text-emerald-300' } : cloudStatus === 'loading' ? { label: 'Синхронизация…', icon: RefreshCw, color: 'text-amber-700 dark:text-amber-300' } : cloudStatus === 'error' ? { label: 'Ошибка синхронизации', icon: CloudOff, color: 'text-red-700 dark:text-red-300' } : { label: 'Данные на устройстве', icon: CloudOff, color: 'text-muted' }
  const StatusIcon = status.icon

  return <div className="animate-slide-up">
    <PageHeader eyebrow="Профиль и данные" title="Аккаунт" description="Настройте спокойный темп занятий и синхронизацию между устройствами." />
    <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
      <div className="space-y-5">
        {user ? <Card className="p-5 sm:p-6"><div className="flex items-start gap-4"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-sage/45 text-xl font-bold">{(user.name || user.email)[0]?.toUpperCase()}</div><div className="min-w-0 flex-1"><h2 className="truncate text-xl font-bold">{user.name || 'Ученик'}</h2><p className="mt-1 truncate text-sm text-muted">{user.email}</p><div className={`mt-3 flex items-center gap-2 text-xs font-semibold ${status.color}`}><StatusIcon size={15} className={cloudStatus === 'loading' ? 'animate-spin' : ''} />{status.label}</div></div></div><div className="mt-6 grid grid-cols-3 divide-x divide-line rounded-2xl bg-paper py-4 text-center"><div><p className="text-xl font-bold">{Object.keys(state.review).length}</p><p className="mt-1 text-[10px] text-muted">слов</p></div><div><p className="text-xl font-bold">{state.grammar.completed.length}</p><p className="mt-1 text-[10px] text-muted">тем</p></div><div><p className="text-xl font-bold">{calculateStreak(state.activeDays)}</p><p className="mt-1 text-[10px] text-muted">streak</p></div></div><div className="mt-4 flex gap-2"><Button variant="secondary" onClick={() => void syncNow()} disabled={busy || cloudStatus === 'loading'} className="flex-1"><RefreshCw size={16} />Синхронизировать</Button><Button variant="ghost" onClick={() => void signOut()} disabled={busy} aria-label="Выйти"><LogOut size={18} /></Button></div></Card> : <Card className="p-5 sm:p-6">
          <div className="flex items-start gap-3"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sage/35"><Cloud size={20} /></div><div><h2 className="text-xl font-bold">Синхронизация Appwrite</h2><p className="mt-1 text-sm leading-6 text-muted">Войдите, чтобы продолжать занятия с любого устройства.</p></div></div>
          {!appwriteConfigured ? <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200"><p className="font-bold">Подключение ещё не настроено</p><p className="mt-1">Укажите публичные ID Appwrite в <code>.env.local</code>. Пока весь прогресс надёжно сохраняется в этом браузере.</p></div> : <>
            <div className="mt-5 flex gap-2"><Chip active={mode === 'login'} onClick={() => setMode('login')}>Войти</Chip><Chip active={mode === 'register'} onClick={() => setMode('register')}>Создать аккаунт</Chip></div>
            <div className="mt-5 space-y-4">{mode === 'register' && <Field label="Имя"><input className={inputClass} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="Макс" /></Field>}<Field label="Email"><input className={inputClass} type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" /></Field><Field label="Пароль" hint={mode === 'register' ? 'Минимум 8 символов.' : undefined}><input className={inputClass} type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} /></Field>{error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/35 dark:text-red-300">{error}</p>}<Button className="w-full" disabled={busy || !email || password.length < 8} onClick={() => void submit()}>{mode === 'register' ? <UserRoundPlus size={17} /> : <Cloud size={17} />}{busy ? 'Подождите…' : mode === 'register' ? 'Создать аккаунт' : 'Войти'}</Button></div>
          </>}
        </Card>}
        <Card className="p-5 sm:p-6"><div className="flex items-start gap-3"><ShieldCheck size={21} className="mt-0.5 shrink-0 text-muted" /><div><p className="text-sm font-bold">Приватность</p><p className="mt-1 text-xs leading-5 text-muted">Учебный контент открыт всем, но прогресс хранится в отдельном документе с правами только для вашего Appwrite User ID.</p></div></div></Card>
      </div>

      <div className="space-y-5"><Card className="p-5 sm:p-6"><h2 className="text-lg font-bold">Ежедневная цель</h2><p className="mt-1 text-sm text-muted">Количество карточек для спокойного ежедневного занятия.</p><div className="mt-5 grid grid-cols-4 gap-2">{[8, 12, 20, 30].map((goal) => <button key={goal} onClick={() => setState((current) => ({ ...current, dailyGoal: goal }))} className={`rounded-2xl border py-3 text-sm font-bold transition ${state.dailyGoal === goal ? 'border-ink bg-ink text-paper dark:border-sage dark:bg-sage dark:text-[#152018]' : 'border-line bg-paper hover:border-muted/50'}`}>{goal}</button>)}</div></Card>
        <Card className="p-5 sm:p-6"><h2 className="text-lg font-bold">Оформление</h2><p className="mt-1 text-sm text-muted">Тема применяется сразу и сохраняется на устройстве.</p><div className="mt-5 grid grid-cols-3 gap-2">{[
          { id: 'light' as const, label: 'Светлая', icon: Sun },
          { id: 'dark' as const, label: 'Тёмная', icon: Moon },
          { id: 'system' as const, label: 'Системная', icon: RefreshCw },
        ].map((theme) => <button key={theme.id} onClick={() => setState((current) => ({ ...current, theme: theme.id }))} className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl border text-xs font-semibold transition ${state.theme === theme.id ? 'border-ink bg-ink text-paper dark:border-sage dark:bg-sage dark:text-[#152018]' : 'border-line bg-paper hover:border-muted/50'}`}><theme.icon size={19} />{theme.label}</button>)}</div></Card>
        <Card className="p-5 sm:p-6"><h2 className="text-lg font-bold">Резервная копия</h2><p className="mt-1 text-sm leading-6 text-muted">Скачайте прогресс в JSON. Это полезно до подключения Appwrite или перед очисткой браузера.</p><Button variant="secondary" className="mt-5" onClick={exportProgress}><Download size={17} />Скачать прогресс</Button></Card>
      </div>
    </div>
  </div>
}
