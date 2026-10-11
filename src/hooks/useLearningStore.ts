import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Models } from 'appwrite'
import type { LearningState, Word } from '../types'
import { baseWords } from '../data/words.generated'
import { appwriteConfigured, getCurrentUser, loadCloudState, loadSharedWords, saveCloudState } from '../lib/appwrite'
import { loadLocalState, localDateKey, saveLocalState } from '../lib/storage'

export function useLearningStore() {
  const [state, setState] = useState<LearningState>(loadLocalState)
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)
  const [sharedWords, setSharedWords] = useState<Word[]>([])
  const [cloudStatus, setCloudStatus] = useState<'local' | 'loading' | 'synced' | 'error'>('local')
  const hydrated = useRef(false)
  const syncTimer = useRef<number | undefined>(undefined)

  const words = useMemo(() => {
    const byId = new Map<string, Word>()
    ;[...baseWords, ...sharedWords, ...state.customWords].forEach((word) => byId.set(word.id, word))
    return [...byId.values()]
  }, [sharedWords, state.customWords])

  const markActive = useCallback(() => {
    setState((current) => {
      const today = localDateKey()
      if (current.activeDays.includes(today)) return current
      return { ...current, activeDays: [...current.activeDays, today] }
    })
  }, [])

  const replaceFromCloud = useCallback(async (nextUser: Models.User<Models.Preferences>) => {
    setCloudStatus('loading')
    try {
      const [cloud, shared] = await Promise.all([loadCloudState(nextUser.$id), loadSharedWords()])
      if (cloud) setState(cloud)
      setSharedWords(shared)
      setCloudStatus('synced')
    } catch {
      setCloudStatus('error')
    }
  }, [])

  const refreshUser = useCallback(async () => {
    const currentUser = await getCurrentUser()
    setUser(currentUser)
    if (currentUser) await replaceFromCloud(currentUser)
    return currentUser
  }, [replaceFromCloud])

  useEffect(() => {
    if (!appwriteConfigured || hydrated.current) return
    hydrated.current = true
    void refreshUser()
  }, [refreshUser])

  useEffect(() => {
    saveLocalState(state)
    const root = document.documentElement
    const dark = state.theme === 'dark' || (state.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    root.classList.toggle('dark', dark)
    const themeColor = document.querySelector('meta[name="theme-color"]')
    themeColor?.setAttribute('content', dark ? '#171917' : '#f5f2eb')

    if (!user || !appwriteConfigured) return
    window.clearTimeout(syncTimer.current)
    setCloudStatus('loading')
    syncTimer.current = window.setTimeout(async () => {
      try {
        await saveCloudState(user.$id, state)
        setCloudStatus('synced')
      } catch {
        setCloudStatus('error')
      }
    }, 800)
    return () => window.clearTimeout(syncTimer.current)
  }, [state, user])

  const syncNow = useCallback(async () => {
    if (!user) return
    setCloudStatus('loading')
    try {
      await saveCloudState(user.$id, state)
      setCloudStatus('synced')
    } catch {
      setCloudStatus('error')
    }
  }, [state, user])

  return {
    state,
    setState,
    words,
    user,
    setUser,
    cloudStatus,
    markActive,
    refreshUser,
    syncNow,
    appwriteConfigured,
  }
}

export type LearningStore = ReturnType<typeof useLearningStore>
