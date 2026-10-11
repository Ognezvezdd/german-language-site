import fs from 'node:fs'
import path from 'node:path'
import { realExamples } from './examples/index.mjs'

const root = process.cwd()
const lines = fs.readFileSync(path.join(root, 'example.txt'), 'utf8')
  .split(/\r?\n/)
  .map((line) => line.trim())

if (Object.keys(realExamples).length !== 650) {
  throw new Error(`Expected 650 curated examples, found ${Object.keys(realExamples).length}`)
}

const forms = {
  sein: 'sein · war · ist gewesen',
  haben: 'haben · hatte · hat gehabt',
  werden: 'werden · wurde · ist geworden',
  können: 'können · konnte · hat gekonnt',
  müssen: 'müssen · musste · hat gemusst',
  wollen: 'wollen · wollte · hat gewollt',
  dürfen: 'dürfen · durfte · hat gedurft',
  mögen: 'mögen · mochte · hat gemocht',
  gehen: 'gehen · ging · ist gegangen',
  kommen: 'kommen · kam · ist gekommen',
  sehen: 'sehen · sah · hat gesehen',
  sprechen: 'sprechen · sprach · hat gesprochen',
  geben: 'geben · gab · hat gegeben',
  nehmen: 'nehmen · nahm · hat genommen',
  finden: 'finden · fand · hat gefunden',
  fahren: 'fahren · fuhr · ist gefahren',
  essen: 'essen · aß · hat gegessen',
  trinken: 'trinken · trank · hat getrunken',
  wissen: 'wissen · wusste · hat gewusst',
  bleiben: 'bleiben · blieb · ist geblieben',
  bringen: 'bringen · brachte · hat gebracht',
  denken: 'denken · dachte · hat gedacht',
  helfen: 'helfen · half · hat geholfen',
  empfehlen: 'empfehlen · empfahl · hat empfohlen',
}

const categoryRules = [
  ['Путешествия', /(zug|bus|bahn|straße|reise|hotel|fahren|fliegen|bahnhof|karte|weg|ort)/i],
  ['Еда', /(essen|trinken|brot|fleisch|ei|küche|kochen|kaffee|tee|restaurant|kuchen)/i],
  ['Работа', /(arbeit|beruf|büro|termin|erfolg|firma|chef|kolleg|geschäft)/i],
  ['Люди', /(mann|frau|freund|familie|kind|mensch|leute|eltern|name)/i],
  ['Дом', /(haus|wohnung|zimmer|tür|fenster|wand|stuhl|tisch|kleidung)/i],
  ['Здоровье', /(arzt|körper|gesund|krank|angst|tod|gehirn)/i],
  ['Природа', /(natur|sonne|wind|blume|see|wasser|tier|baum)/i],
  ['Время', /(zeit|tag|jahr|monat|woche|heute|morgen|gestern|anfang|pause)/i],
]

function categoryFor(word, translation) {
  const haystack = `${word} ${translation}`
  return categoryRules.find(([, pattern]) => pattern.test(haystack))?.[0] ?? 'Основы'
}

function parseRaw(raw) {
  const articleMatch = raw.match(/^(der|die|das)\s+/i)
  const article = articleMatch?.[1]?.toLowerCase()
  const withoutArticle = articleMatch ? raw.slice(articleMatch[0].length) : raw
  const [head, ...pluralParts] = withoutArticle.split(',')
  return {
    article,
    lemma: head.trim(),
    plural: pluralParts.join(',').trim() || undefined,
  }
}

const words = []
for (let i = 0; i < lines.length; i += 1) {
  if (!/^\d+$/.test(lines[i])) continue
  const rank = Number(lines[i])
  if (rank < 1 || rank > 650) continue

  const raw = lines[i + 1]
  const partOfSpeech = lines[i + 2]
  const translation = lines[i + 3]
  if (!raw || !partOfSpeech || !translation || raw === 'сущ.' || raw === 'глаг.' || raw === 'прил.' || raw === 'нареч.') continue

  const parsed = parseRaw(raw)
  const entry = { ...parsed, raw, rank, partOfSpeech, translation }
  const examplePair = realExamples[rank]
  if (!examplePair || examplePair.length !== 2) {
    throw new Error(`Missing curated example for rank ${rank}: ${raw}`)
  }
  const [example, exampleTranslation] = examplePair
  words.push({
    id: `base-${String(rank).padStart(3, '0')}`,
    rank,
    raw,
    lemma: parsed.lemma,
    ...(parsed.article ? { article: parsed.article } : {}),
    ...(parsed.plural ? { plural: parsed.plural } : {}),
    partOfSpeech,
    translation,
    level: rank <= 250 ? 'A1' : rank <= 500 ? 'A2' : 'B1',
    category: categoryFor(raw, translation),
    example,
    exampleTranslation,
    ...(forms[parsed.lemma.toLowerCase()] ? { forms: forms[parsed.lemma.toLowerCase()] } : {}),
  })
}

if (words.length !== 650) {
  throw new Error(`Expected 650 words, parsed ${words.length}`)
}

const target = path.join(root, 'src/data/words.generated.ts')
const output = `// Сгенерировано из example.txt. Не редактируйте вручную.\nimport type { Word } from '../types'\n\nexport const baseWords: Word[] = ${JSON.stringify(words, null, 2)}\n`
fs.mkdirSync(path.dirname(target), { recursive: true })
fs.writeFileSync(target, output)
console.log(`Generated ${words.length} words in ${target}`)
