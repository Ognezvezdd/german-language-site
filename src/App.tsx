import { useEffect, useState } from 'react'
import type { PageId } from './types'
import { useLearningStore } from './hooks/useLearningStore'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { DictionaryPage } from './pages/DictionaryPage'
import { StudyPage } from './pages/StudyPage'
import { GrammarPage } from './pages/GrammarPage'
import { ReadingPage } from './pages/ReadingPage'
import { AccountPage } from './pages/AccountPage'

const validPages: PageId[] = ['home', 'words', 'study', 'grammar', 'reading', 'account']

function pageFromHash(): PageId {
  const value = window.location.hash.replace('#/', '') as PageId
  return validPages.includes(value) ? value : 'home'
}

export default function App() {
  const store = useLearningStore()
  const [page, setPageState] = useState<PageId>(pageFromHash)
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const dark = store.state.theme === 'dark' || (store.state.theme === 'system' && systemDark)

  useEffect(() => {
    const update = () => setPageState(pageFromHash())
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  function setPage(next: PageId) {
    if (page !== next) window.history.pushState(null, '', `#/${next}`)
    setPageState(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function toggleTheme() {
    store.setState((current) => ({ ...current, theme: dark ? 'light' : 'dark' }))
  }

  return <Layout page={page} setPage={setPage} dark={dark} toggleTheme={toggleTheme} userName={store.user?.name || store.user?.email}>
    {page === 'home' && <HomePage store={store} navigate={setPage} />}
    {page === 'words' && <DictionaryPage store={store} navigate={setPage} />}
    {page === 'study' && <StudyPage store={store} />}
    {page === 'grammar' && <GrammarPage store={store} />}
    {page === 'reading' && <ReadingPage store={store} />}
    {page === 'account' && <AccountPage store={store} />}
  </Layout>
}
