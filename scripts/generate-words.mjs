import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const lines = fs.readFileSync(path.join(root, 'example.txt'), 'utf8')
  .split(/\r?\n/)
  .map((line) => line.trim())

const knownExamples = {
  sein: ['Wo bist du heute?', 'Где ты сегодня?'],
  haben: ['Ich habe heute viel Zeit.', 'Сегодня у меня много времени.'],
  auch: ['Ich komme auch mit.', 'Я тоже пойду с вами.'],
  können: ['Kannst du mir bitte helfen?', 'Ты можешь мне помочь?'],
  werden: ['Es wird langsam dunkel.', 'Постепенно темнеет.'],
  so: ['So machen wir das.', 'Мы сделаем это так.'],
  dann: ['Zuerst arbeiten wir, dann machen wir Pause.', 'Сначала мы работаем, затем делаем перерыв.'],
  noch: ['Möchtest du noch einen Kaffee?', 'Хочешь ещё кофе?'],
  wie: ['Wie heißt du?', 'Как тебя зовут?'],
  sagen: ['Kannst du das noch einmal sagen?', 'Можешь сказать это ещё раз?'],
  also: ['Also, wir treffen uns um acht.', 'Итак, встречаемся в восемь.'],
  als: ['Als Kind wohnte ich in Bonn.', 'В детстве я жил в Бонне.'],
  machen: ['Was machst du am Wochenende?', 'Что ты делаешь на выходных?'],
  jetzt: ['Ich habe jetzt keine Zeit.', 'Сейчас у меня нет времени.'],
  hier: ['Hier ist noch ein Platz frei.', 'Здесь ещё есть свободное место.'],
  geben: ['Gibt es hier einen Supermarkt?', 'Здесь есть супермаркет?'],
  sehr: ['Vielen Dank, das ist sehr nett.', 'Большое спасибо, это очень мило.'],
  gehen: ['Wir gehen heute zu Fuß.', 'Сегодня мы идём пешком.'],
  alle: ['Alle Kollegen sind schon da.', 'Все коллеги уже здесь.'],
  müssen: ['Ich muss morgen früh aufstehen.', 'Завтра мне нужно рано встать.'],
  da: ['Da ist die Bushaltestelle.', 'Вот автобусная остановка.'],
  gut: ['Der Kaffee schmeckt sehr gut.', 'Кофе очень вкусный.'],
  schon: ['Hast du schon gegessen?', 'Ты уже поел?'],
  ganz: ['Die Aufgabe ist ganz einfach.', 'Задание довольно простое.'],
  wenn: ['Ruf mich an, wenn du Zeit hast.', 'Позвони мне, когда у тебя будет время.'],
  nur: ['Ich brauche nur fünf Minuten.', 'Мне нужно всего пять минут.'],
  sehen: ['Wir sehen uns morgen.', 'Увидимся завтра.'],
  kommen: ['Wann kommt der nächste Zug?', 'Когда придёт следующий поезд?'],
  immer: ['Er kommt immer pünktlich.', 'Он всегда приходит вовремя.'],
  denken: ['Ich denke oft an meine Familie.', 'Я часто думаю о своей семье.'],
  wissen: ['Wissen Sie, wo der Bahnhof ist?', 'Вы знаете, где вокзал?'],
  viel: ['Heute habe ich viel zu tun.', 'Сегодня у меня много дел.'],
  wollen: ['Wir wollen im Sommer reisen.', 'Летом мы хотим путешествовать.'],
  fragen: ['Darf ich etwas fragen?', 'Можно кое-что спросить?'],
  finden: ['Wie findest du die Wohnung?', 'Как тебе квартира?'],
  bleiben: ['Ich bleibe heute zu Hause.', 'Сегодня я останусь дома.'],
  tun: ['Was kann ich für Sie tun?', 'Что я могу для вас сделать?'],
  nehmen: ['Ich nehme einen Tee, bitte.', 'Я возьму чай, пожалуйста.'],
  stehen: ['Der Bus steht vor dem Hotel.', 'Автобус стоит перед отелем.'],
  vielleicht: ['Vielleicht regnet es morgen.', 'Возможно, завтра будет дождь.'],
  glauben: ['Ich glaube, das ist richtig.', 'Думаю, это правильно.'],
  halten: ['Der Zug hält in Köln.', 'Поезд останавливается в Кёльне.'],
  nennen: ['Können Sie ein Beispiel nennen?', 'Вы можете привести пример?'],
  mögen: ['Ich mag deutsche Filme.', 'Мне нравятся немецкие фильмы.'],
  zeigen: ['Können Sie mir den Weg zeigen?', 'Вы можете показать мне дорогу?'],
  führen: ['Dieses Gespräch führt zu einer Lösung.', 'Этот разговор приводит к решению.'],
  sprechen: ['Sie spricht sehr gut Deutsch.', 'Она очень хорошо говорит по-немецки.'],
  bringen: ['Ich bringe dir morgen das Buch.', 'Я принесу тебе книгу завтра.'],
  leben: ['Meine Eltern leben auf dem Land.', 'Мои родители живут за городом.'],
  fahren: ['Wir fahren mit dem Zug nach Berlin.', 'Мы едем в Берлин на поезде.'],
  meinen: ['Was meinst du damit?', 'Что ты имеешь в виду?'],
  kaufen: ['Wo kann ich eine Fahrkarte kaufen?', 'Где я могу купить билет?'],
  brauchen: ['Wir brauchen noch etwas Zeit.', 'Нам нужно ещё немного времени.'],
  essen: ['Was essen wir heute Abend?', 'Что мы будем есть сегодня вечером?'],
  trinken: ['Möchten Sie etwas trinken?', 'Хотите что-нибудь выпить?'],
  arbeiten: ['Ich arbeite seit einem Jahr hier.', 'Я работаю здесь уже год.'],
  wohnen: ['Wir wohnen in einer kleinen Wohnung.', 'Мы живём в небольшой квартире.'],
  heißen: ['Wie heißt diese Straße?', 'Как называется эта улица?'],
  lernen: ['Ich lerne jeden Tag Deutsch.', 'Я учу немецкий каждый день.'],
  kennen: ['Kennst du dieses Restaurant?', 'Ты знаешь этот ресторан?'],
  verstehen: ['Ich verstehe die Frage nicht.', 'Я не понимаю вопрос.'],
  warten: ['Wir warten auf den Bus.', 'Мы ждём автобус.'],
  helfen: ['Kann ich Ihnen helfen?', 'Я могу вам помочь?'],
  anfangen: ['Der Kurs fängt um neun Uhr an.', 'Курс начинается в девять часов.'],
  aufstehen: ['Am Montag stehe ich früh auf.', 'В понедельник я рано встаю.'],
  anrufen: ['Ich rufe dich heute Abend an.', 'Я позвоню тебе сегодня вечером.'],
  bezahlen: ['Kann ich mit Karte bezahlen?', 'Можно оплатить картой?'],
  bestellen: ['Wir möchten zwei Suppen bestellen.', 'Мы хотели бы заказать два супа.'],
  bekommen: ['Wo bekomme ich eine Fahrkarte?', 'Где мне получить билет?'],
  suchen: ['Ich suche den Ausgang.', 'Я ищу выход.'],
  vergessen: ['Vergiss bitte deinen Schlüssel nicht.', 'Пожалуйста, не забудь ключ.'],
  erklären: ['Können Sie das bitte erklären?', 'Вы можете это объяснить?'],
  empfehlen: ['Können Sie ein Café empfehlen?', 'Вы можете порекомендовать кафе?'],
  sich_kümmern: ['Ich kümmere mich um die Reservierung.', 'Я позабочусь о бронировании.'],
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

function fallbackExample(entry) {
  const key = entry.lemma.toLowerCase().replaceAll(' ', '_')
  if (knownExamples[key]) return knownExamples[key]

  if (entry.article) {
    const article = entry.article[0].toUpperCase() + entry.article.slice(1)
    return [`${article} ${entry.lemma} ist heute wichtig.`, `Сегодня важно: ${entry.translation}.`]
  }

  if (entry.partOfSpeech.includes('глаг')) {
    const verb = entry.lemma.startsWith('sich ') ? `uns ${entry.lemma.slice(5)}` : entry.lemma
    return [`Wir wollen heute ${verb}.`, `Сегодня мы хотим: ${entry.translation}.`]
  }

  if (entry.partOfSpeech.includes('прил')) {
    return [`Das ist wirklich ${entry.lemma}.`, `Это действительно ${entry.translation}.`]
  }

  return [`„${entry.lemma}“ hört man oft im Alltag.`, `«${entry.lemma}» часто можно услышать в повседневной речи.`]
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
  const [example, exampleTranslation] = fallbackExample(entry)
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
