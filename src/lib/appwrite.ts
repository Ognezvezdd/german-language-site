import { Account, Client, Databases, ID, Permission, Query, Role, type Models } from 'appwrite'
import type { LearningState, Word } from '../types'

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || ''
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID || ''
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID || ''
const stateCollectionId = import.meta.env.VITE_APPWRITE_STATE_COLLECTION_ID || 'learning_state'
const wordsCollectionId = import.meta.env.VITE_APPWRITE_WORDS_COLLECTION_ID || 'shared_words'
const sharedWordsPageSize = 100
const sharedPayloadMaxBytes = 48_000

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

function parseWordPayload(payload: string): Word[] {
  try {
    const parsed = JSON.parse(payload) as Word | Word[]
    const words = Array.isArray(parsed) ? parsed : [parsed]
    return words.filter((word): word is Word => Boolean(word && typeof word === 'object' && word.id))
  } catch {
    return []
  }
}

function splitWordPayloads(words: Word[]) {
  const encoder = new TextEncoder()
  const chunks: Word[][] = []
  let current: Word[] = []

  for (const word of words) {
    const candidate = [...current, word]
    const candidateSize = encoder.encode(JSON.stringify(candidate)).byteLength
    if (current.length && candidateSize > sharedPayloadMaxBytes) {
      chunks.push(current)
      current = [word]
    } else {
      current = candidate
    }
  }

  if (current.length) chunks.push(current)
  return chunks
}

function fallbackHash(value: string) {
  let first = 0x811c9dc5
  let second = 0x9e3779b9
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index)
    first = Math.imul(first ^ code, 0x01000193)
    second = Math.imul(second ^ code, 0x85ebca6b)
  }
  return `${(first >>> 0).toString(36)}${(second >>> 0).toString(36)}`
}

function sharedDocumentId(userId: string, words: Word[]) {
  const source = `${userId}:${words.map((word) => word.id).join(':')}`
  return `sw_${fallbackHash(source)}`
}

function isConflict(error: unknown) {
  return Boolean(error && typeof error === 'object' && 'code' in error && Number(error.code) === 409)
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
  const words = new Map<string, Word>()
  let cursor: string | undefined

  while (true) {
    const queries = [Query.orderAsc('$id'), Query.limit(sharedWordsPageSize)]
    if (cursor) queries.push(Query.cursorAfter(cursor))
    const result = await databases.listDocuments<WordDocument>(databaseId, wordsCollectionId, queries)
    result.documents.flatMap((document) => parseWordPayload(document.payload)).forEach((word) => words.set(word.id, word))
    if (result.documents.length < sharedWordsPageSize) break
    cursor = result.documents[result.documents.length - 1]?.$id
    if (!cursor) break
  }

  return [...words.values()]
}

export async function publishSharedWords(userId: string, words: Word[]) {
  if (!appwriteConfigured || !words.length) return { words: 0, documents: 0 }
  const chunks = splitWordPayloads(words)

  for (const chunk of chunks) {
    const documentId = sharedDocumentId(userId, chunk)
    try {
      await databases.createDocument(
        databaseId,
        wordsCollectionId,
        documentId,
        { ownerId: userId, payload: JSON.stringify(chunk), createdAt: new Date().toISOString() },
        [Permission.read(Role.any()), Permission.update(Role.user(userId)), Permission.delete(Role.user(userId))],
      )
    } catch (error) {
      if (!isConflict(error)) throw error
    }
  }

  return { words: words.length, documents: chunks.length }
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
