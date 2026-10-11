import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react'
import { ArrowLeft, X } from 'lucide-react'

export function Button({ className = '', variant = 'primary', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger' }) {
  const variants = {
    primary: 'bg-ink text-paper hover:opacity-90 dark:bg-sage dark:text-[#152018]',
    secondary: 'border border-line bg-card text-ink hover:bg-line/30',
    ghost: 'text-muted hover:bg-line/35 hover:text-ink',
    danger: 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300',
  }
  return <button className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-45 ${variants[variant]} ${className}`} {...props} />
}

export function Chip({ active = false, className = '', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return <button className={`shrink-0 rounded-full border px-3.5 py-2 text-sm font-medium transition ${active ? 'border-ink bg-ink text-paper dark:border-sage dark:bg-sage dark:text-[#152018]' : 'border-line bg-card text-muted hover:border-muted/50 hover:text-ink'} ${className}`} {...props}>{children}</button>
}

export function Badge({ children, tone = 'neutral' }: PropsWithChildren<{ tone?: 'neutral' | 'green' | 'red' | 'yellow' | 'blue' }>) {
  const tones = {
    neutral: 'bg-line/55 text-muted',
    green: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    red: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300',
    yellow: 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300',
    blue: 'bg-sky-100 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300',
  }
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>
}

export function PageHeader({ eyebrow, title, description, action, onBack }: { eyebrow?: string; title: string; description?: string; action?: ReactNode; onBack?: () => void }) {
  return (
    <div className="mb-7 flex items-start justify-between gap-4">
      <div className="min-w-0">
        {onBack && <button onClick={onBack} className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink"><ArrowLeft size={17} /> Назад</button>}
        {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-accent">{eyebrow}</p>}
        <h1 className="font-display text-[2rem] font-semibold leading-[1.02] tracking-[-.02em] text-ink sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <div className={`rounded-[1.4rem] border border-line bg-card shadow-soft ${className}`}>{children}</div>
}

export function Progress({ value, className = '' }: { value: number; className?: string }) {
  return <div className={`h-2 overflow-hidden rounded-full bg-line/65 ${className}`}><div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>
}

export function Modal({ open, title, onClose, children, wide = false }: PropsWithChildren<{ open: boolean; title: string; onClose: () => void; wide?: boolean }>) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#11130f]/55 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true">
      <div className={`max-h-[92vh] w-full overflow-y-auto rounded-t-[1.75rem] border border-line bg-card shadow-2xl animate-slide-up sm:rounded-[1.75rem] ${wide ? 'sm:max-w-3xl' : 'sm:max-w-lg'}`}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-card/95 px-5 py-4 backdrop-blur sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
          <button onClick={onClose} aria-label="Закрыть" className="grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-line/50 hover:text-ink"><X size={20} /></button>
        </div>
        <div className="p-5 sm:p-6">{children}</div>
      </div>
    </div>
  )
}

export function Field({ label, hint, children }: PropsWithChildren<{ label: string; hint?: string }>) {
  return <label className="block"><span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>{children}{hint && <span className="mt-1.5 block text-xs leading-5 text-muted">{hint}</span>}</label>
}

export const inputClass = 'h-12 w-full rounded-2xl border border-line bg-paper px-4 text-sm text-ink outline-none transition placeholder:text-muted/65 focus:border-accent focus:ring-4 focus:ring-accent/10'
export const textareaClass = 'min-h-28 w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-muted/65 focus:border-accent focus:ring-4 focus:ring-accent/10'

export function EmptyState({ icon, title, text, action }: { icon?: ReactNode; title: string; text: string; action?: ReactNode }) {
  return <div className="flex min-h-64 flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-line bg-card/50 px-6 py-12 text-center">
    {icon && <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-line/50 text-muted">{icon}</div>}
    <h3 className="text-lg font-bold text-ink">{title}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-muted">{text}</p>{action && <div className="mt-5">{action}</div>}
  </div>
}
