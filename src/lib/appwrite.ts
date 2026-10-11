import { Account, Client, Databases, ID, Permission, Query, Role, type Models } from 'appwrite'
import type { LearningState, Word } from '../types'

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || ''
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID || ''
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID || ''
const stateCollectionId = import.meta.env.VITE_APPWRITE_STATE_COLLECTION_ID || 'learning_state'
const wordsCollectionId = import.meta.env.VITE_APPWRITE_WORDS_COLLECTION_ID || 'shared_words'

export const appwriteConfigured = Boolean(endpoint && projectId && databaseId)

const client = new Client()
if (appwriteConfigured) client.setEndpoint(endpoint).setProject(projectId)

export const account = new Account(client)
const databases = new Databases(client)

type StateDocument = Models.Document & {
  userId: string
  payload: string
  updatedAt: string
}

type WordDocument = Models.Document & {
  ownerId: string
  payload: string
  createdAt: string
}

export async function getCurrentUser() {
  if (!appwriteConfigured) return null
  try {
    return await account.get()
  } catch {
    return null
  }
}

export async function register(email: string, password: string, name: string) {
  await account.create(ID.unique(), email, password, name)
  await account.createEmailPasswordSession(email, password)
  return account.get()
}

export async function login(email: string, password: string) {
  await account.createEmailPasswordSession(email, password)
  return account.get()
}

export async function logout() {
  await account.deleteSession('current')
}

export async function loadCloudState(userId: string): Promise<LearningState | null> {
  try {
    const doc = await databases.getDocument<StateDocument>(databaseId, stateCollectionId, userId)
    return JSON.parse(doc.payload) as LearningState
  } catch {
    return null
  }
}

export async function saveCloudState(userId: string, state: LearningState) {
  const data = {
    userId,
    payload: JSON.stringify({ ...state, lastSyncedAt: new Date().toISOString() }),
    updatedAt: new Date().toISOString(),
  }

  try {
    await databases.updateDocument(databaseId, stateCollectionId, userId, data)
  } catch {
    await databases.createDocument(
      databaseId,
      stateCollectionId,
      userId,
      data,
      [
        Permission.read(Role.user(userId)),
        Permission.update(Role.user(userId)),
        Permission.delete(Role.user(userId)),
      ],
    )
  }
}

export async function loadSharedWords(): Promise<Word[]> {
  if (!appwriteConfigured) return []
  try {
    const result = await databases.listDocuments<WordDocument>(databaseId, wordsCollectionId, [Query.orderDesc('$createdAt'), Query.limit(100)])
    return result.documents.flatMap((document) => {
      try { return [JSON.parse(document.payload) as Word] } catch { return [] }
    })
  } catch {
    return []
  }
}

export async function publishSharedWords(userId: string, words: Word[]) {
  if (!appwriteConfigured || !words.length) return
  await Promise.all(words.map((word) => databases.createDocument(
    databaseId,
    wordsCollectionId,
    ID.unique(),
    { ownerId: userId, payload: JSON.stringify(word), createdAt: new Date().toISOString() },
    [Permission.read(Role.any()), Permission.update(Role.user(userId)), Permission.delete(Role.user(userId))],
  )))
}

export function friendlyAppwriteError(error: unknown) {
  if (error && typeof error === 'object' && 'message' in error) {
    const message = String((error as { message: unknown }).message)
    if (message.toLowerCase().includes('invalid credentials')) return 'Неверный email или пароль.'
    if (message.toLowerCase().includes('already exists')) return 'Аккаунт с таким email уже существует.'
    return message
  }
  return 'Не удалось связаться с Appwrite.'
}
