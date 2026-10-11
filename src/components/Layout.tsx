import type { ReactNode } from 'react'
import { BookOpenText, Brain, CircleUserRound, GraduationCap, House, Moon, NotebookTabs, Sun } from 'lucide-react'
import type { PageId } from '../types'

const nav: { id: PageId; label: string; icon: typeof House }[] = [
  { id: 'home', label: 'Сегодня', icon: House },
  { id: 'words', label: 'Слова', icon: NotebookTabs },
  { id: 'study', label: 'Карточки', icon: Brain },
  { id: 'grammar', label: 'Грамматика', icon: GraduationCap },
  { id: 'reading', label: 'Чтение', icon: BookOpenText },
  { id: 'account', label: 'Аккаунт', icon: CircleUserRound },
]

export function Layout({ page, setPage, dark, toggleTheme, userName, children }: { page: PageId; setPage: (page: PageId) => void; dark: boolean; toggleTheme: () => void; userName?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[244px] flex-col border-r border-line bg-card px-4 py-5 lg:flex">
        <button onClick={() => setPage('home')} className="mb-9 flex items-baseline gap-2 px-3 text-left">
          <span className="font-display text-3xl font-semibold tracking-tight">Klar.</span>
          <span className="text-xs font-semibold uppercase tracking-[.17em] text-accent">Deutsch</span>
        </button>
        <nav className="space-y-1.5">
          {nav.map((item) => {
            const Icon = item.icon
            const active = page === item.id
            return <button key={item.id} onClick={() => setPage(item.id)} className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition ${active ? 'bg-ink text-paper dark:bg-sage dark:text-[#152018]' : 'text-muted hover:bg-line/40 hover:text-ink'}`}><Icon size={19} strokeWidth={active ? 2.5 : 2} />{item.label}</button>
          })}
        </nav>
        <div className="mt-auto rounded-2xl bg-paper p-3">
          <button onClick={() => setPage('account')} className="flex w-full items-center gap-3 text-left">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage/45 text-sm font-bold text-ink">{userName?.[0]?.toUpperCase() || 'Г'}</div>
            <div className="min-w-0"><p className="truncate text-sm font-semibold text-ink">{userName || 'Гостевой режим'}</p><p className="text-xs text-muted">Настройки</p></div>
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-paper/90 px-4 backdrop-blur-xl lg:hidden">
        <button onClick={() => setPage('home')} className="flex items-baseline gap-1.5"><span className="font-display text-2xl font-semibold">Klar.</span><span className="text-[10px] font-bold uppercase tracking-[.14em] text-accent">Deutsch</span></button>
        <div className="flex items-center gap-1">
          <button onClick={toggleTheme} aria-label="Сменить тему" className="grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-line/40">{dark ? <Sun size={19} /> : <Moon size={19} />}</button>
          <button onClick={() => setPage('account')} aria-label="Аккаунт" className={`grid h-10 w-10 place-items-center rounded-full ${page === 'account' ? 'bg-ink text-paper' : 'text-muted hover:bg-line/40'}`}><CircleUserRound size={21} /></button>
        </div>
      </header>

      <main className="min-h-screen pb-28 lg:ml-[244px] lg:pb-10">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-7 sm:py-9 lg:px-10 lg:py-10">{children}</div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-card/95 px-1 pb-[max(.45rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-xl lg:hidden">
        {nav.slice(0, 5).map((item) => {
          const Icon = item.icon
          const active = page === item.id
          return <button key={item.id} onClick={() => setPage(item.id)} className={`flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-semibold transition ${active ? 'text-accent' : 'text-muted'}`}><Icon size={20} strokeWidth={active ? 2.6 : 2} /><span>{item.label}</span></button>
        })}
      </nav>
    </div>
  )
}
