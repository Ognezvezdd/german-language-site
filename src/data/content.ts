import type { GrammarTopic, ReadingText } from '../types'

const baseGrammarTopics: GrammarTopic[] = [
  {
    id: 'present-tense', level: 'A1', title: 'Präsens', subtitle: 'Настоящее время',
    summary: 'Präsens описывает то, что происходит сейчас, регулярно или в ближайшем будущем.',
    rules: [
      'Уберите у инфинитива окончание -en и добавьте: ich -e, du -st, er/sie/es -t, wir/sie/Sie -en, ihr -t.',
      'У глаголов на -t и -d перед -st и -t появляется дополнительное e: du arbeitest.',
      'У некоторых сильных глаголов меняется корневая гласная во 2-м и 3-м лице: du fährst, er liest.',
    ],
    examples: [
      { de: 'Ich lerne jeden Morgen Deutsch.', ru: 'Я учу немецкий каждое утро.' },
      { de: 'Fährst du heute mit dem Bus?', ru: 'Ты сегодня едешь на автобусе?' },
      { de: 'Am Freitag besuchen wir Berlin.', ru: 'В пятницу мы посетим Берлин.' },
    ],
    exercises: [
      { id: 'present-1', prompt: 'Du ___ sehr gut Deutsch.', options: ['sprichst', 'spreche', 'sprechen'], answer: 0, explanation: 'С du используется окончание -st; sprechen меняет e на i.' },
      { id: 'present-2', prompt: 'Wir ___ morgen nach Köln.', options: ['fahrt', 'fahren', 'fährst'], answer: 1, explanation: 'Форма для wir совпадает с инфинитивом: fahren.' },
      { id: 'present-3', prompt: 'Er ___ jeden Tag bis 18 Uhr.', options: ['arbeitet', 'arbeit', 'arbeitest'], answer: 0, explanation: 'После основы на -t вставляется e: er arbeitet.' },
    ],
  },
  {
    id: 'articles-cases', level: 'A1', title: 'Артикли и падежи', subtitle: 'Nominativ & Akkusativ',
    summary: 'Артикль показывает род, число и роль существительного в предложении.',
    rules: [
      'В Nominativ: der/ein, die/eine, das/ein, die/— (множественное число).',
      'В Akkusativ меняется только мужской род: der → den, ein → einen.',
      'После haben, brauchen, sehen, kaufen и mögen обычно нужен Akkusativ.',
    ],
    examples: [
      { de: 'Der Kaffee ist heiß.', ru: 'Кофе горячий.' },
      { de: 'Ich nehme einen Kaffee.', ru: 'Я возьму кофе.' },
      { de: 'Sie kauft die Fahrkarte.', ru: 'Она покупает билет.' },
    ],
    exercises: [
      { id: 'article-1', prompt: 'Ich brauche ___ Termin.', options: ['einen', 'ein', 'einem'], answer: 0, explanation: 'Termin — мужского рода и стоит в Akkusativ: einen Termin.' },
      { id: 'article-2', prompt: '___ Tasche ist neu.', options: ['Die', 'Den', 'Das'], answer: 0, explanation: 'Tasche — женского рода; подлежащее стоит в Nominativ.' },
      { id: 'article-3', prompt: 'Wir kaufen ___ Brot.', options: ['das', 'den', 'die'], answer: 0, explanation: 'Brot — средний род; das не меняется в Akkusativ.' },
    ],
  },
  {
    id: 'word-order', level: 'A1', title: 'Порядок слов', subtitle: 'Глагол на втором месте',
    summary: 'В обычном немецком предложении спрягаемая часть сказуемого занимает вторую позицию.',
    rules: [
      'Первую позицию может занимать подлежащее или обстоятельство, но глагол остаётся вторым.',
      'В вопросе без вопросительного слова глагол стоит первым: Kommst du?',
      'Отделяемая приставка уходит в конец: Ich rufe dich später an.',
    ],
    examples: [
      { de: 'Heute arbeite ich zu Hause.', ru: 'Сегодня я работаю дома.' },
      { de: 'Wann kommt der Zug an?', ru: 'Когда прибывает поезд?' },
      { de: 'Am Abend sehe ich einen Film.', ru: 'Вечером я смотрю фильм.' },
    ],
    exercises: [
      { id: 'order-1', prompt: 'Выберите правильный вариант.', options: ['Morgen ich fahre nach Bonn.', 'Morgen fahre ich nach Bonn.', 'Morgen nach Bonn ich fahre.'], answer: 1, explanation: 'После Morgen сразу идёт спрягаемый глагол fahre.' },
      { id: 'order-2', prompt: '___ du heute mit?', options: ['Kommst', 'Du kommst', 'Mitkommst'], answer: 0, explanation: 'В общем вопросе спрягаемый глагол стоит на первом месте.' },
      { id: 'order-3', prompt: 'Ich ___ um sieben Uhr ___.', options: ['stehe / auf', 'auf / stehe', 'aufstehe / —'], answer: 0, explanation: 'В главном предложении приставка auf отделяется и уходит в конец.' },
    ],
  },
  {
    id: 'perfect', level: 'A2', title: 'Perfekt', subtitle: 'Разговорное прошедшее',
    summary: 'В разговоре о завершённых событиях чаще всего используют haben/sein + Partizip II.',
    rules: [
      'Большинство глаголов образует Perfekt с haben: Ich habe gearbeitet.',
      'Глаголы движения и изменения состояния часто употребляются с sein: Wir sind gefahren.',
      'У правильных глаголов Partizip II обычно ge- + основа + -t; у глаголов на -ieren приставки ge- нет.',
    ],
    examples: [
      { de: 'Ich habe die E-Mail schon geschrieben.', ru: 'Я уже написал электронное письмо.' },
      { de: 'Wann bist du angekommen?', ru: 'Когда ты приехал?' },
      { de: 'Wir haben gestern lange telefoniert.', ru: 'Вчера мы долго разговаривали по телефону.' },
    ],
    exercises: [
      { id: 'perfect-1', prompt: 'Wir ___ nach Hamburg gefahren.', options: ['sind', 'haben', 'werden'], answer: 0, explanation: 'fahren как перемещение из точки в точку образует Perfekt с sein.' },
      { id: 'perfect-2', prompt: 'Sie hat das Essen ___.', options: ['gekocht', 'gekochen', 'gegekocht'], answer: 0, explanation: 'Partizip II правильного глагола kochen — gekocht.' },
      { id: 'perfect-3', prompt: 'Ich habe in Berlin ___.', options: ['studiert', 'gestudiert', 'studieren'], answer: 0, explanation: 'Глаголы на -ieren образуют Partizip II без ge-.' },
    ],
  },
  {
    id: 'dative', level: 'A2', title: 'Dativ', subtitle: 'Кому? Где?',
    summary: 'Dativ часто обозначает получателя действия и употребляется после определённых предлогов и глаголов.',
    rules: [
      'Артикли в Dativ: dem/einem (м. и ср.), der/einer (ж.), den + -n (мн.).',
      'Всегда Dativ после aus, bei, mit, nach, seit, von, zu, gegenüber.',
      'Глаголы helfen, danken, gefallen, gehören, antworten требуют Dativ.',
    ],
    examples: [
      { de: 'Ich fahre mit dem Fahrrad zur Arbeit.', ru: 'Я еду на работу на велосипеде.' },
      { de: 'Kannst du mir helfen?', ru: 'Ты можешь мне помочь?' },
      { de: 'Das Buch gehört meiner Schwester.', ru: 'Книга принадлежит моей сестре.' },
    ],
    exercises: [
      { id: 'dative-1', prompt: 'Ich spreche mit ___ Ärztin.', options: ['der', 'die', 'den'], answer: 0, explanation: 'После mit нужен Dativ; женский артикль die меняется на der.' },
      { id: 'dative-2', prompt: 'Wir helfen ___ Nachbarn.', options: ['dem', 'den', 'der'], answer: 0, explanation: 'helfen требует Dativ; Nachbar здесь в единственном числе.' },
      { id: 'dative-3', prompt: 'Sie fährt zu ___ Eltern.', options: ['ihren', 'ihrem', 'ihre'], answer: 0, explanation: 'Во множественном числе Dativ: ihren Eltern.' },
    ],
  },
  {
    id: 'modal-verbs', level: 'A2', title: 'Модальные глаголы', subtitle: 'können, müssen, dürfen…',
    summary: 'Модальный глагол выражает возможность, необходимость, желание или разрешение, а смысловой инфинитив уходит в конец.',
    rules: [
      'Модальный глагол спрягается и занимает вторую позицию.',
      'Смысловой глагол употребляется без zu в инфинитиве в конце предложения.',
      'У müssen и dürfen отрицание меняет смысл: nicht müssen — не обязательно; nicht dürfen — нельзя.',
    ],
    examples: [
      { de: 'Ich muss morgen früh aufstehen.', ru: 'Завтра мне нужно рано встать.' },
      { de: 'Hier darf man nicht parken.', ru: 'Здесь нельзя парковаться.' },
      { de: 'Möchtest du etwas trinken?', ru: 'Ты хотел бы что-нибудь выпить?' },
    ],
    exercises: [
      { id: 'modal-1', prompt: 'Ich ___ heute länger arbeiten.', options: ['muss', 'müsse', 'müssen'], answer: 0, explanation: 'Форма müssen для ich — muss.' },
      { id: 'modal-2', prompt: 'Выберите правильный порядок.', options: ['Wir können kommen später.', 'Wir später kommen können.', 'Wir können später kommen.'], answer: 2, explanation: 'Спрягаемый модальный глагол второй, инфинитив — в конце.' },
      { id: 'modal-3', prompt: 'Du ___ hier nicht rauchen. Это запрещено.', options: ['darfst', 'musst', 'willst'], answer: 0, explanation: 'nicht dürfen означает «нельзя, не разрешено».' },
    ],
  },
  {
    id: 'subordinate-clauses', level: 'B1', title: 'Придаточные', subtitle: 'weil, dass, obwohl, wenn',
    summary: 'Подчинительные союзы отправляют спрягаемый глагол в конец придаточного предложения.',
    rules: [
      'После weil, dass, obwohl, wenn глагол стоит в конце: weil ich keine Zeit habe.',
      'Если придаточное стоит первым, главное начинается с глагола: Wenn es regnet, bleibe ich zu Hause.',
      'В Perfekt вспомогательный глагол идёт после Partizip II: weil er spät gekommen ist.',
    ],
    examples: [
      { de: 'Ich lerne Deutsch, weil ich in Berlin arbeite.', ru: 'Я учу немецкий, потому что работаю в Берлине.' },
      { de: 'Obwohl es regnet, gehen wir spazieren.', ru: 'Хотя идёт дождь, мы идём гулять.' },
      { de: 'Sie sagt, dass sie später kommt.', ru: 'Она говорит, что придёт позже.' },
    ],
    exercises: [
      { id: 'clause-1', prompt: 'Ich bleibe zu Hause, weil ___.', options: ['ich bin krank', 'ich krank bin', 'bin ich krank'], answer: 1, explanation: 'После weil спрягаемый глагол стоит в конце.' },
      { id: 'clause-2', prompt: 'Wenn ich Zeit habe, ___ ich dich an.', options: ['rufe', 'ich rufe', 'anrufe'], answer: 0, explanation: 'После придаточного главное предложение начинается с глагола.' },
      { id: 'clause-3', prompt: 'Er sagt, dass er die Prüfung ___.', options: ['bestanden hat', 'hat bestanden', 'bestehen hat'], answer: 0, explanation: 'В придаточном Perfekt: Partizip II + вспомогательный глагол в самом конце.' },
    ],
  },
  {
    id: 'adjective-endings', level: 'B1', title: 'Склонение прилагательных', subtitle: 'Окончания без зубрёжки',
    summary: 'Окончание прилагательного дополняет информацию, которой не хватает в артикле.',
    rules: [
      'После определённого артикля чаще всего -e или -en: der neue Job, mit dem neuen Job.',
      'После ein-слов прилагательное показывает род: ein neuer Job, eine neue Stelle, ein neues Büro.',
      'Без артикля прилагательное берёт сильное окончание: frischer Kaffee, kaltes Wasser.',
    ],
    examples: [
      { de: 'Ich suche eine kleine Wohnung.', ru: 'Я ищу небольшую квартиру.' },
      { de: 'Er arbeitet in einem internationalen Team.', ru: 'Он работает в международной команде.' },
      { de: 'Zum Frühstück trinke ich heißen Tee.', ru: 'На завтрак я пью горячий чай.' },
    ],
    exercises: [
      { id: 'adj-1', prompt: 'Das ist ein interessant___ Buch.', options: ['es', 'e', 'en'], answer: 0, explanation: 'После ein в среднем роде Nominativ прилагательное получает -es.' },
      { id: 'adj-2', prompt: 'Ich spreche mit der neu___ Kollegin.', options: ['en', 'e', 'er'], answer: 0, explanation: 'После определённого артикля в Dativ окончание -en.' },
      { id: 'adj-3', prompt: 'Wir kaufen frisch___ Gemüse.', options: ['es', 'e', 'en'], answer: 0, explanation: 'Без артикля средний род в Akkusativ: frisches Gemüse.' },
    ],
  },
  {
    id: 'konjunktiv-two', level: 'B1', title: 'Konjunktiv II', subtitle: 'Вежливость и желания',
    summary: 'Konjunktiv II помогает вежливо попросить, дать совет или описать нереальную ситуацию.',
    rules: [
      'Для большинства глаголов используют würde + Infinitiv: Ich würde gern reisen.',
      'Частые формы haben, sein и модальных: hätte, wäre, könnte, müsste, sollte.',
      'В условии: Wenn ich Zeit hätte, würde ich mehr lesen.',
    ],
    examples: [
      { de: 'Könnten Sie mir bitte helfen?', ru: 'Не могли бы вы мне помочь?' },
      { de: 'An deiner Stelle würde ich früher anfangen.', ru: 'На твоём месте я бы начал раньше.' },
      { de: 'Wenn ich mehr Zeit hätte, würde ich öfter kochen.', ru: 'Если бы у меня было больше времени, я бы чаще готовил.' },
    ],
    exercises: [
      { id: 'konj-1', prompt: '___ Sie das bitte wiederholen?', options: ['Könnten', 'Konnten', 'Können würden'], answer: 0, explanation: 'Könnten Sie… — стандартная вежливая просьба.' },
      { id: 'konj-2', prompt: 'Wenn ich Urlaub ___, würde ich ans Meer fahren.', options: ['hätte', 'habe', 'hatte'], answer: 0, explanation: 'Нереальное условие требует Konjunktiv II: hätte.' },
      { id: 'konj-3', prompt: 'Du ___ mehr schlafen.', options: ['solltest', 'sollst würdest', 'würdest sollen'], answer: 0, explanation: 'solltest выражает мягкий совет.' },
    ],
  },
]

const addedGrammarTopics: GrammarTopic[] = [
  {
    id: 'personal-pronouns', level: 'A1', title: 'Личные местоимения', subtitle: 'ich, du, er, sie, es…',
    summary: 'Местоимение заменяет имя человека или предмета и подсказывает, какую форму глагола выбрать.',
    rules: [
      'ich — я, du — ты; er/sie/es — он/она/оно; wir — мы, ihr — вы (несколько знакомых людей), sie — они.',
      'Вежливое Sie всегда пишется с большой буквы и сочетается с формой глагола как wir/sie: Kommen Sie?',
      'Род местоимения совпадает с грамматическим родом слова: das Kind → es, die Tasche → sie, der Tisch → er.',
    ],
    examples: [
      { de: 'Ich heiße Anna. Und wie heißt du?', ru: 'Меня зовут Анна. А как зовут тебя?' },
      { de: 'Das ist mein Handy. Es ist neu.', ru: 'Это мой телефон. Он новый.' },
      { de: 'Frau Klein, kommen Sie aus Berlin?', ru: 'Госпожа Кляйн, Вы из Берлина?' },
    ],
    exercises: [
      { id: 'pronouns-1', prompt: 'Tom kommt aus Wien. ___ spricht Deutsch.', options: ['Er', 'Es', 'Sie'], answer: 0, explanation: 'Tom заменяется местоимением er.' },
      { id: 'pronouns-2', prompt: 'Anna und Mia lernen zusammen. ___ haben morgen eine Prüfung.', options: ['Ihr', 'Sie', 'Wir'], answer: 1, explanation: 'Несколько людей в третьем лице — sie (они).' },
      { id: 'pronouns-3', prompt: 'Herr Weber, wohnen ___ hier?', options: ['du', 'ihr', 'Sie'], answer: 2, explanation: 'Вежливое обращение — Sie с большой буквы.' },
    ],
  },
  {
    id: 'noun-gender', level: 'A1', title: 'Род существительных', subtitle: 'der, die или das?',
    summary: 'Существительное лучше учить сразу с артиклем. Окончания дают полезные подсказки, но не заменяют словарь.',
    rules: [
      'Мужской род часто имеют дни, месяцы, времена года и слова на -er, -ling, -ismus: der Montag, der Computer.',
      'Женский род часто узнаётся по -ung, -heit, -keit, -schaft, -tion, -tät, -ik, -ei: die Wohnung, die Universität.',
      'Средний род часто имеют слова на -chen, -lein, -ment, -um, -ma: das Mädchen, das Museum. У правил есть исключения.',
    ],
    examples: [
      { de: 'Der Morgen ist kalt, aber die Sonne scheint.', ru: 'Утро холодное, но солнце светит.' },
      { de: 'Die Bäckerei ist neben dem Museum.', ru: 'Булочная находится рядом с музеем.' },
      { de: 'Das Mädchen hört Musik.', ru: 'Девочка слушает музыку.' },
    ],
    exercises: [
      { id: 'gender-1', prompt: 'Какой артикль обычно у существительных на -ung?', options: ['der', 'die', 'das'], answer: 1, explanation: 'Существительные на -ung почти всегда женского рода: die Wohnung.' },
      { id: 'gender-2', prompt: 'Выберите правильный вариант: ___ Museum.', options: ['der', 'die', 'das'], answer: 2, explanation: 'Слова на -um обычно среднего рода: das Museum.' },
      { id: 'gender-3', prompt: 'Как слово надёжнее всего добавлять в словарь?', options: ['Только перевод', 'С артиклем и формой множественного числа', 'Только первую букву'], answer: 1, explanation: 'Артикль и множественное число лучше запоминать вместе со словом.' },
    ],
  },
  {
    id: 'questions', level: 'A1', title: 'Вопросы', subtitle: 'W-Fragen и Ja/Nein-Fragen',
    summary: 'В немецком есть вопросы с вопросительным словом и общие вопросы, на которые отвечают ja или nein.',
    rules: [
      'В W-вопросе порядок такой: вопросительное слово + глагол + подлежащее: Wo wohnst du?',
      'В вопросе без вопросительного слова глагол стоит первым: Kommst du morgen?',
      'Различайте wo — где, wohin — куда и woher — откуда; wer — кто, wen — кого, wem — кому.',
    ],
    examples: [
      { de: 'Wie viel kostet die Fahrkarte?', ru: 'Сколько стоит билет?' },
      { de: 'Wohin fährst du am Wochenende?', ru: 'Куда ты едешь на выходных?' },
      { de: 'Haben Sie einen Termin?', ru: 'У Вас есть запись?' },
    ],
    exercises: [
      { id: 'questions-1', prompt: '___ wohnst du? — In Leipzig.', options: ['Wo', 'Wohin', 'Woher'], answer: 0, explanation: 'Спрашиваем о месте: wo — где.' },
      { id: 'questions-2', prompt: '___ kommt der Zug? — Um 18 Uhr.', options: ['Warum', 'Wann', 'Wer'], answer: 1, explanation: 'О времени спрашиваем wann.' },
      { id: 'questions-3', prompt: 'Выберите общий вопрос.', options: ['Du arbeitest heute?', 'Arbeitest du heute?', 'Wann du arbeitest?'], answer: 1, explanation: 'В общем вопросе спрягаемый глагол стоит первым.' },
    ],
  },
  {
    id: 'possessive-pronouns', level: 'A1', title: 'Притяжательные слова', subtitle: 'mein, dein, sein, ihr…',
    summary: 'mein, dein и другие слова показывают принадлежность и получают окончания как неопределённый артикль.',
    rules: [
      'Основа зависит от владельца: ich → mein, du → dein, er/es → sein, sie → ihr, wir → unser, ihr → euer, Sie → Ihr.',
      'В Nominativ: mein Bruder, meine Schwester, mein Kind, meine Freunde.',
      'Окончание зависит не от владельца, а от рода, числа и падежа предмета: Ich sehe meinen Freund.',
    ],
    examples: [
      { de: 'Meine Wohnung ist klein, aber hell.', ru: 'Моя квартира маленькая, но светлая.' },
      { de: 'Wie ist Ihre Telefonnummer?', ru: 'Какой у Вас номер телефона?' },
      { de: 'Wir besuchen unsere Freunde.', ru: 'Мы навещаем наших друзей.' },
    ],
    exercises: [
      { id: 'possessive-1', prompt: 'Ich suche ___ Schlüssel.', options: ['meinen', 'mein', 'meine'], answer: 0, explanation: 'Schlüssel — мужской род в Akkusativ: meinen.' },
      { id: 'possessive-2', prompt: 'Anna ruft ___ Mutter an.', options: ['sein', 'ihre', 'ihr'], answer: 1, explanation: 'Владелец Anna → ihr; Mutter женского рода в Akkusativ → ihre.' },
      { id: 'possessive-3', prompt: 'Herr Klein, ist das ___ Pass?', options: ['dein', 'Ihr', 'ihren'], answer: 1, explanation: 'Вежливое «Ваш» пишется с большой буквы: Ihr Pass.' },
    ],
  },
  {
    id: 'negation', level: 'A1', title: 'Отрицание', subtitle: 'nicht или kein?',
    summary: 'kein отрицает существительное без определённого артикля, а nicht — действие, признак или конкретную часть фразы.',
    rules: [
      'kein заменяет ein: Ich habe einen Termin → Ich habe keinen Termin. Во множественном числе: keine Termine.',
      'nicht отрицает глагол, прилагательное, наречие или существительное с der/die/das: Das ist nicht teuer.',
      'nicht ставится перед тем, что отрицаем, а при отрицании всего действия обычно ближе к концу смысловой части.',
    ],
    examples: [
      { de: 'Ich trinke keinen Kaffee.', ru: 'Я не пью кофе.' },
      { de: 'Der Bus kommt heute nicht.', ru: 'Автобус сегодня не придёт.' },
      { de: 'Das ist nicht meine Tasche.', ru: 'Это не моя сумка.' },
    ],
    exercises: [
      { id: 'negation-1', prompt: 'Wir haben ___ Auto.', options: ['kein', 'nicht', 'keinen'], answer: 0, explanation: 'Auto среднего рода; отрицательный артикль в Akkusativ — kein.' },
      { id: 'negation-2', prompt: 'Die Wohnung ist ___ groß.', options: ['kein', 'nicht', 'keine'], answer: 1, explanation: 'Прилагательное groß отрицается с nicht.' },
      { id: 'negation-3', prompt: 'Er kauft ___ Äpfel.', options: ['keine', 'nicht', 'keinen'], answer: 0, explanation: 'Множественное число без артикля отрицается с keine.' },
    ],
  },
  {
    id: 'separable-verbs', level: 'A2', title: 'Отделяемые глаголы', subtitle: 'anrufen, einkaufen, aufstehen',
    summary: 'В главном предложении приставка отделяется и уходит в конец, образуя вместе с глаголом рамку.',
    rules: [
      'В Präsens и Präteritum спрягается основа, а приставка стоит в конце: Ich rufe dich an.',
      'В инфинитиве и придаточном глагол снова пишется вместе: Ich möchte dich anrufen; weil ich dich anrufe.',
      'В Partizip II ge- обычно стоит между приставкой и основой: einkaufen → eingekauft, anrufen → angerufen.',
    ],
    examples: [
      { de: 'Der Kurs fängt um neun Uhr an.', ru: 'Курс начинается в девять часов.' },
      { de: 'Ich muss heute noch einkaufen.', ru: 'Мне сегодня ещё нужно сходить за покупками.' },
      { de: 'Sie hat ihre Mutter angerufen.', ru: 'Она позвонила своей маме.' },
    ],
    exercises: [
      { id: 'separable-1', prompt: 'Ich ___ jeden Tag um sieben Uhr ___.', options: ['stehe / auf', 'aufstehe / —', 'auf / stehe'], answer: 0, explanation: 'В главном предложении: stehe ... auf.' },
      { id: 'separable-2', prompt: 'Wir möchten am Samstag ___.', options: ['ein kaufen', 'einkaufen', 'kaufen ein'], answer: 1, explanation: 'После модального глагола инфинитив остаётся целым: einkaufen.' },
      { id: 'separable-3', prompt: 'Er hat das Fenster ___.', options: ['aufgemacht', 'geaufmacht', 'macht auf'], answer: 0, explanation: 'Partizip II: auf + ge + macht.' },
    ],
  },
  {
    id: 'pronouns-cases', level: 'A2', title: 'Местоимения в падежах', subtitle: 'mich, mir, dich, dir…',
    summary: 'Форма личного местоимения меняется в зависимости от вопроса: кто, кого или кому.',
    rules: [
      'Nominativ называет деятеля: ich, du, er. Akkusativ отвечает на wen/was: mich, dich, ihn.',
      'Dativ отвечает на wem: mir, dir, ihm, ihr, uns, euch, ihnen/Ihnen.',
      'Ориентируйтесь на глагол и предлог: sehen + Akkusativ, helfen + Dativ, mit + Dativ.',
    ],
    examples: [
      { de: 'Kannst du mir helfen?', ru: 'Ты можешь мне помочь?' },
      { de: 'Ich sehe ihn jeden Morgen.', ru: 'Я вижу его каждое утро.' },
      { de: 'Die Ärztin spricht mit Ihnen.', ru: 'Врач разговаривает с Вами.' },
    ],
    exercises: [
      { id: 'case-pronouns-1', prompt: 'Paul ruft ___ später an. (я)', options: ['mich', 'mir', 'ich'], answer: 0, explanation: 'anrufen требует Akkusativ: mich.' },
      { id: 'case-pronouns-2', prompt: 'Das Geschenk gefällt ___. (она)', options: ['sie', 'ihr', 'ihre'], answer: 1, explanation: 'gefallen требует Dativ: ihr.' },
      { id: 'case-pronouns-3', prompt: 'Wir fahren mit ___ nach Hause. (они)', options: ['sie', 'ihnen', 'ihre'], answer: 1, explanation: 'После mit нужен Dativ: ihnen.' },
    ],
  },
  {
    id: 'preterite', level: 'A2', title: 'Präteritum', subtitle: 'Простое прошедшее',
    summary: 'Präteritum часто встречается в рассказах и новостях; sein, haben и модальные глаголы обычны в нём и в разговоре.',
    rules: [
      'Правильные глаголы получают -te: machen → machte, arbeiten → arbeitete.',
      'Сильные глаголы меняют основу: gehen → ging, kommen → kam, sehen → sah; форму лучше учить со словом.',
      'В речи особенно часты war, hatte, konnte, musste, wollte: Gestern war ich krank.',
    ],
    examples: [
      { de: 'Früher wohnte ich in Köln.', ru: 'Раньше я жил в Кёльне.' },
      { de: 'Der Zug kam zehn Minuten später.', ru: 'Поезд пришёл на десять минут позже.' },
      { de: 'Ich konnte gestern nicht kommen.', ru: 'Я вчера не смог прийти.' },
    ],
    exercises: [
      { id: 'preterite-1', prompt: 'Gestern ___ ich keine Zeit.', options: ['hatte', 'habe', 'hätte'], answer: 0, explanation: 'Präteritum от haben — hatte.' },
      { id: 'preterite-2', prompt: 'Wir ___ am Wochenende nach Dresden.', options: ['fuhren', 'fahren', 'gefahren'], answer: 0, explanation: 'Präteritum от fahren во множественном числе — fuhren.' },
      { id: 'preterite-3', prompt: 'Als Kind ___ er viel Fußball.', options: ['spielte', 'gespielt', 'spielen'], answer: 0, explanation: 'Правильный глагол: spiel- + -te.' },
    ],
  },
  {
    id: 'place-prepositions', level: 'A2', title: 'Место и направление', subtitle: 'Wo? Wohin? Woher?',
    summary: 'Вопрос помогает выбрать предлог и падеж: местоположение — Dativ, направление — часто Akkusativ.',
    rules: [
      'Wo? — где: in/auf/an + Dativ: Ich bin im Supermarkt. Das Buch liegt auf dem Tisch.',
      'Wohin? — куда: in/auf/an + Akkusativ: Ich gehe in den Supermarkt. Ich lege das Buch auf den Tisch.',
      'Woher? — откуда: aus для пространства/страны, von для человека или точки: aus Berlin, vom Arzt.',
    ],
    examples: [
      { de: 'Wir treffen uns am Bahnhof.', ru: 'Мы встречаемся на вокзале.' },
      { de: 'Stell die Milch bitte in den Kühlschrank.', ru: 'Поставь молоко, пожалуйста, в холодильник.' },
      { de: 'Sie kommt gerade vom Zahnarzt.', ru: 'Она как раз идёт от стоматолога.' },
    ],
    exercises: [
      { id: 'place-1', prompt: 'Das Handy liegt auf ___ Tisch.', options: ['dem', 'den', 'der'], answer: 0, explanation: 'Wo? Местоположение требует Dativ: auf dem Tisch.' },
      { id: 'place-2', prompt: 'Ich hänge das Bild an ___ Wand.', options: ['die', 'der', 'den'], answer: 0, explanation: 'Wohin? Направление требует Akkusativ: an die Wand.' },
      { id: 'place-3', prompt: 'Woher kommst du gerade? — ___ Büro.', options: ['Aus dem', 'In das', 'Bei dem'], answer: 0, explanation: 'Выход из помещения выражается aus + Dativ.' },
    ],
  },
  {
    id: 'conjunctions', level: 'B1', title: 'Союзы и логика', subtitle: 'denn, deshalb, trotzdem…',
    summary: 'Союзы связывают мысли, но по-разному влияют на порядок слов. Это особенно важно в устной и письменной части экзамена.',
    rules: [
      'und, aber, oder, denn, sondern не меняют порядок слов: Ich bleibe zu Hause, denn ich bin krank.',
      'deshalb, trotzdem, dann — самостоятельные наречия на позиции 1; глагол идёт сразу после них.',
      'weil, obwohl, dass вводят придаточное и отправляют глагол в конец.',
    ],
    examples: [
      { de: 'Ich bin müde, trotzdem gehe ich zum Kurs.', ru: 'Я устал, но всё же иду на курс.' },
      { de: 'Wir fahren mit dem Bus, weil es regnet.', ru: 'Мы едем на автобусе, потому что идёт дождь.' },
      { de: 'Nicht Paul, sondern Mia hat angerufen.', ru: 'Позвонил не Пауль, а Миа.' },
    ],
    exercises: [
      { id: 'conjunctions-1', prompt: 'Es regnet. ___ nehme ich einen Schirm.', options: ['Deshalb', 'Denn', 'Obwohl'], answer: 0, explanation: 'deshalb выражает следствие и занимает позицию 1: deshalb nehme ich.' },
      { id: 'conjunctions-2', prompt: 'Ich komme später, ___ mein Zug Verspätung hat.', options: ['weil', 'denn', 'trotzdem'], answer: 0, explanation: 'После weil глагол hat стоит в конце.' },
      { id: 'conjunctions-3', prompt: 'Er lernt viel, ___ morgen hat er eine Prüfung.', options: ['denn', 'weil', 'deshalb'], answer: 0, explanation: 'После denn сохраняется обычный порядок: er hat.' },
    ],
  },
  {
    id: 'future-one', level: 'B1', title: 'Futur I', subtitle: 'Планы и предположения',
    summary: 'Futur I строится с werden и инфинитивом, но для ясных планов немцы часто используют Präsens со временем.',
    rules: [
      'Форма: werden на второй позиции + смысловой инфинитив в конце: Ich werde dich anrufen.',
      'Для договорённого будущего достаточно Präsens: Morgen fahre ich nach Hamburg.',
      'Futur I также выражает предположение: Er wird jetzt im Büro sein — Наверное, он сейчас в офисе.',
    ],
    examples: [
      { de: 'Wir werden die Unterlagen morgen schicken.', ru: 'Мы отправим документы завтра.' },
      { de: 'Nächste Woche beginnt mein neuer Kurs.', ru: 'На следующей неделе начинается мой новый курс.' },
      { de: 'Sie wird wahrscheinlich später kommen.', ru: 'Вероятно, она придёт позже.' },
    ],
    exercises: [
      { id: 'future-1', prompt: 'Ich ___ dich heute Abend anrufen.', options: ['werde', 'wird', 'würde'], answer: 0, explanation: 'Форма werden для ich — werde; инфинитив стоит в конце.' },
      { id: 'future-2', prompt: 'Выберите правильный порядок.', options: ['Wir werden morgen arbeiten.', 'Wir morgen arbeiten werden.', 'Wir arbeiten werden morgen.'], answer: 0, explanation: 'werden стоит на позиции 2, инфинитив — в конце.' },
      { id: 'future-3', prompt: '„Er wird zu Hause sein“ может означать:', options: ['Наверное, он дома', 'Он был дома', 'Ему нельзя домой'], answer: 0, explanation: 'Futur I может выражать предположение о настоящем.' },
    ],
  },
]

const grammarAids: Record<string, Partial<GrammarTopic>> = {
  'personal-pronouns': {
    formula: 'местоимение + подходящая форма глагола',
    tables: [{ title: 'Личные местоимения в Nominativ', headers: ['Лицо', 'Единственное число', 'Множественное число'], rows: [['1-е', 'ich — я', 'wir — мы'], ['2-е', 'du — ты', 'ihr — вы'], ['3-е', 'er / sie / es — он / она / оно', 'sie — они'], ['Вежливо', 'Sie — Вы', 'Sie — Вы']] }],
    tips: ['du — для друзей, семьи и детей; Sie — в формальной ситуации.', 'sie может означать «она» или «они»; форму подсказывает глагол: sie kommt / sie kommen.'],
  },
  'present-tense': {
    formula: 'основа глагола + -e / -st / -t / -en / -t / -en',
    tables: [{ title: 'lernen в Präsens', headers: ['Кто?', 'Форма', 'Перевод'], rows: [['ich', 'lerne', 'учу'], ['du', 'lernst', 'учишь'], ['er / sie / es', 'lernt', 'учит'], ['wir', 'lernen', 'учим'], ['ihr', 'lernt', 'учите'], ['sie / Sie', 'lernen', 'учат / учите']] }],
    tips: ['Окончания wir и sie/Sie совпадают с инфинитивом.', 'У sein формы особые: bin, bist, ist, sind, seid, sind.'],
  },
  'noun-gender': {
    tables: [{ title: 'Частые подсказки рода', headers: ['Род', 'Что часто относится', 'Типичные окончания'], rows: [['der', 'дни, месяцы, времена года', '-er, -ling, -ismus, -ich'], ['die', 'многие абстрактные понятия', '-ung, -heit, -keit, -schaft, -tion, -tät, -ik, -ei'], ['das', 'уменьшительные и заимствования', '-chen, -lein, -ment, -um, -ma']] }],
    tips: ['Сохраняйте не Tisch, а der Tisch, -e.', 'Смысл и окончание помогают, но при сомнении проверяйте словарь.'],
  },
  'articles-cases': {
    formula: 'Nominativ: кто/что? · Akkusativ: кого/что? · Dativ: кому/где?',
    tables: [{ title: 'Артикли: три основных падежа', headers: ['Падеж', 'Мужской', 'Средний', 'Женский', 'Мн. число'], rows: [['Nominativ', 'der / ein', 'das / ein', 'die / eine', 'die / —'], ['Akkusativ', 'den / einen', 'das / ein', 'die / eine', 'die / —'], ['Dativ', 'dem / einem', 'dem / einem', 'der / einer', 'den / — (+n)']] , note: 'В Akkusativ особенно заметно меняется мужской род. В Dativ множественного числа существительное обычно получает -n: mit den Freunden.' }],
    tips: ['FUDOG: für, um, durch, ohne, gegen — всегда Akkusativ.', 'aus, bei, mit, nach, seit, von, zu — всегда Dativ.'],
  },
  'word-order': {
    formula: 'позиция 1 + спрягаемый глагол + подлежащее + остальная информация',
    tips: ['Позиция — это целый блок: Am Montag | fahre | ich…', 'Удобный нейтральный порядок обстоятельств: время → причина → образ действия → место.'],
  },
  questions: {
    formula: 'W-слово + глагол + подлежащее? · или · Глагол + подлежащее?',
    tables: [{ title: 'Главные вопросительные слова', headers: ['Слово', 'Значение', 'Пример'], rows: [['was', 'что', 'Was machst du?'], ['wo / wohin / woher', 'где / куда / откуда', 'Woher kommst du?'], ['wann', 'когда', 'Wann beginnt der Kurs?'], ['wer / wen / wem', 'кто / кого / кому', 'Wem soll ich helfen?'], ['wie / warum', 'как / почему', 'Wie geht es dir?'], ['wie viel(e)', 'сколько', 'Wie viel kostet das?'], ['welche(r, s)', 'какой / какая / какое', 'Welchen Bus nimmst du?']] }],
  },
  'possessive-pronouns': {
    formula: 'основа владельца + окончание рода/числа/падежа предмета',
    tables: [{ title: 'Основа по владельцу', headers: ['Владелец', 'Основа', 'Пример'], rows: [['ich', 'mein-', 'mein Bruder'], ['du', 'dein-', 'deine Schwester'], ['er / es', 'sein-', 'sein Handy'], ['sie', 'ihr-', 'ihre Arbeit'], ['wir', 'unser-', 'unsere Wohnung'], ['ihr', 'euer-', 'eure Freunde'], ['sie / Sie', 'ihr- / Ihr-', 'ihre / Ihre Adresse']] }],
    tips: ['Сначала найдите владельца, затем род и падеж предмета.', 'У euer перед окончанием часто исчезает e: eure, euren.'],
  },
  negation: { formula: 'kein + существительное · nicht + всё остальное', tips: ['Если в утвердительной фразе можно поставить ein/eine, в отрицании обычно будет kein/keine.', 'nicht ставьте непосредственно перед контрастом: nicht heute, sondern morgen.'] },
  'separable-verbs': { formula: 'Ich rufe dich an. · Ich möchte dich anrufen. · Ich habe dich angerufen.', tips: ['Выделяйте приставку при заучивании: ANrufen, AUFstehen.', 'Не все приставки отделяются: be-, ge-, er-, ver-, zer- обычно неотделяемые.'] },
  dative: {
    formula: 'wem? · aus, bei, mit, nach, seit, von, zu + Dativ',
    tables: [{ title: 'Формы Dativ', headers: ['Род/число', 'Определённый', 'Неопределённый', 'Пример'], rows: [['мужской', 'dem', 'einem', 'mit dem Freund'], ['средний', 'dem', 'einem', 'in einem Hotel'], ['женский', 'der', 'einer', 'bei der Ärztin'], ['множественное', 'den', '—', 'mit den Kindern']] }],
  },
  'pronouns-cases': {
    formula: 'кто? Nominativ · кого? Akkusativ · кому? Dativ',
    tables: [{ title: 'Личные местоимения по падежам', headers: ['Nominativ', 'Akkusativ', 'Dativ', 'По-русски'], rows: [['ich', 'mich', 'mir', 'я / меня / мне'], ['du', 'dich', 'dir', 'ты / тебя / тебе'], ['er', 'ihn', 'ihm', 'он / его / ему'], ['sie', 'sie', 'ihr', 'она / её / ей'], ['es', 'es', 'ihm', 'оно / его / ему'], ['wir', 'uns', 'uns', 'мы / нас / нам'], ['ihr', 'euch', 'euch', 'вы / вас / вам'], ['sie / Sie', 'sie / Sie', 'ihnen / Ihnen', 'они / Вы']] }],
  },
  'modal-verbs': {
    formula: 'подлежащее + модальный глагол + ... + инфинитив',
    tables: [{ title: 'Значения и формы для ich / er', headers: ['Глагол', 'Значение', 'Форма ich / er'], rows: [['können', 'мочь, уметь', 'kann / kann'], ['dürfen', 'иметь разрешение', 'darf / darf'], ['müssen', 'быть должным', 'muss / muss'], ['sollen', 'следует; должен по чужим словам', 'soll / soll'], ['wollen', 'хотеть', 'will / will'], ['möchten', 'хотел(а) бы', 'möchte / möchte'], ['mögen', 'любить, нравиться', 'mag / mag']] }],
    tips: ['nicht müssen = не нужно, а nicht dürfen = запрещено.', 'möchten — самая нейтральная форма для заказа и вежливого желания.'],
  },
  perfect: {
    formula: 'haben / sein на позиции 2 + ... + Partizip II в конце',
    tables: [{ title: 'Как строится Partizip II', headers: ['Тип', 'Схема', 'Пример'], rows: [['правильный', 'ge- + основа + -t', 'machen → gemacht'], ['сильный', 'часто ge- + основа + -en', 'fahren → gefahren'], ['на -ieren', 'без ge-', 'studieren → studiert'], ['неотделяемая приставка', 'без ge-', 'besuchen → besucht'], ['отделяемая приставка', 'приставка + ge + основа', 'einkaufen → eingekauft']] }],
    tips: ['sein выбирайте при перемещении из A в B и изменении состояния.', 'Partizip II лучше учить вместе с haben/sein: ist gefahren, hat gearbeitet.'],
  },
  preterite: {
    formula: 'правильный: основа + -te · сильный: особая форма',
    tables: [{ title: 'Самые нужные формы', headers: ['Инфинитив', 'ich / er', 'wir / sie', 'Перевод'], rows: [['sein', 'war', 'waren', 'был'], ['haben', 'hatte', 'hatten', 'имел'], ['können', 'konnte', 'konnten', 'мог'], ['müssen', 'musste', 'mussten', 'должен был'], ['gehen', 'ging', 'gingen', 'шёл'], ['kommen', 'kam', 'kamen', 'пришёл']] }],
  },
  'place-prepositions': {
    formula: 'Wo? Dativ · Wohin? Akkusativ · Woher? aus/von + Dativ',
    tables: [{ title: 'Выбор вопроса', headers: ['Вопрос', 'Смысл', 'Пример'], rows: [['Wo?', 'место, нет движения к цели', 'im Büro, auf dem Tisch'], ['Wohin?', 'направление или перемещение', 'ins Büro, auf den Tisch'], ['Woher?', 'исходная точка', 'aus dem Büro, vom Arzt']] }],
  },
  'subordinate-clauses': { formula: 'главное, союз + ... + спрягаемый глагол в конце', tips: ['Запятая перед придаточным обязательна.', 'Если придаточное первое, после запятой сразу идёт глагол главного предложения.'] },
  conjunctions: {
    formula: 'denn + обычный порядок · deshalb + глагол · weil + глагол в конце',
    tables: [{ title: 'Три модели связи', headers: ['Тип', 'Слова', 'Что с глаголом'], rows: [['0', 'und, aber, oder, denn, sondern', 'обычный порядок'], ['1', 'deshalb, trotzdem, dann, danach', 'глагол сразу после связки'], ['конец', 'weil, dass, obwohl, wenn', 'глагол в конце придаточного']] }],
  },
  'future-one': { formula: 'werden на позиции 2 + ... + инфинитив в конце', tips: ['Для твёрдого плана с указанием времени чаще звучит естественно Präsens.', 'Для предположения добавляйте wahrscheinlich, wohl или vermutlich.'] },
  'adjective-endings': { formula: 'артикль и окончание вместе показывают род, число и падеж', tips: ['После der/die/das почти везде -en; -e остаётся в Nominativ ед. числа и Akkusativ жен./ср. рода.', 'После ein-слова ищите недостающий сигнал: ein neuer, eine neue, ein neues.'] },
  'konjunktiv-two': {
    formula: 'würde + инфинитив · hätte / wäre / könnte / müsste / sollte',
    tables: [{ title: 'Частые готовые формы', headers: ['Форма', 'Функция', 'Пример'], rows: [['könnte', 'вежливая просьба / возможность', 'Könnten Sie mir helfen?'], ['würde', 'желание / нереальное действие', 'Ich würde gern reisen.'], ['hätte', 'нереальное «иметь»', 'Wenn ich Zeit hätte…'], ['wäre', 'нереальное «быть»', 'Das wäre schön.'], ['sollte', 'мягкий совет', 'Du solltest mehr schlafen.']] }],
  },
}

const grammarOrder = ['personal-pronouns', 'present-tense', 'noun-gender', 'articles-cases', 'word-order', 'questions', 'possessive-pronouns', 'negation', 'separable-verbs', 'dative', 'pronouns-cases', 'modal-verbs', 'perfect', 'preterite', 'place-prepositions', 'subordinate-clauses', 'conjunctions', 'future-one', 'adjective-endings', 'konjunktiv-two']

export const grammarTopics = [...baseGrammarTopics, ...addedGrammarTopics]
  .map((topic) => ({ ...topic, ...grammarAids[topic.id] }))
  .sort((a, b) => grammarOrder.indexOf(a.id) - grammarOrder.indexOf(b.id))

export const readingTexts: ReadingText[] = [
  {
    id: 'a1-bakery', level: 'A1', title: 'В булочной', kicker: 'Alltag', minutes: 3,
    text: [
      'Am Samstagmorgen geht Lena zur Bäckerei. Sie möchte Brot und zwei Brötchen kaufen.',
      'In der Bäckerei sagt sie: „Guten Morgen! Ich hätte gern ein Vollkornbrot und zwei Käsebrötchen.“ Die Verkäuferin fragt: „Möchten Sie noch etwas?“',
      'Lena nimmt auch ein Stück Apfelkuchen. Alles kostet acht Euro vierzig. Sie bezahlt mit Karte und geht zufrieden nach Hause.',
    ],
    glossary: [{ word: 'die Bäckerei', translation: 'булочная' }, { word: 'das Vollkornbrot', translation: 'цельнозерновой хлеб' }, { word: 'das Brötchen', translation: 'булочка' }, { word: 'die Verkäuferin', translation: 'продавщица' }, { word: 'noch etwas', translation: 'что-нибудь ещё' }, { word: 'das Stück', translation: 'кусок' }, { word: 'bezahlen', translation: 'платить' }, { word: 'zufrieden', translation: 'довольный' }],
    questions: [
      { prompt: 'Когда Лена идёт в булочную?', options: ['В субботу утром', 'В пятницу вечером', 'В воскресенье'], answer: 0 },
      { prompt: 'Что она покупает дополнительно?', options: ['Кофе', 'Яблочный пирог', 'Молоко'], answer: 1 },
    ],
  },
  {
    id: 'a1-doctor', level: 'A1', title: 'Запись к врачу', kicker: 'Gesundheit', minutes: 3,
    text: [
      'Niko fühlt sich seit gestern nicht gut. Er hat Halsschmerzen und ein bisschen Fieber.',
      'Er ruft in der Arztpraxis an. Die Mitarbeiterin sagt: „Sie können heute um 15 Uhr kommen.“ Niko schreibt die Uhrzeit sofort in seinen Kalender.',
      'Am Nachmittag nimmt er seine Versichertenkarte und fährt mit dem Bus zur Praxis. Er ist zehn Minuten vor dem Termin da.',
    ],
    glossary: [{ word: 'sich fühlen', translation: 'чувствовать себя' }, { word: 'die Halsschmerzen', translation: 'боль в горле' }, { word: 'das Fieber', translation: 'температура, жар' }, { word: 'die Arztpraxis', translation: 'врачебный кабинет' }, { word: 'der Termin', translation: 'запись, приём' }, { word: 'die Uhrzeit', translation: 'время на часах' }, { word: 'die Versichertenkarte', translation: 'страховая карта' }, { word: 'vor dem Termin', translation: 'до приёма' }],
    questions: [
      { prompt: 'Какие симптомы у Нико?', options: ['Болит спина', 'Болит горло и температура', 'Только кашель'], answer: 1 },
      { prompt: 'Во сколько приём?', options: ['В 13:00', 'В 15:00', 'В 17:00'], answer: 1 },
    ],
  },
  {
    id: 'a1-weekend', level: 'A1', title: 'Выходной день', kicker: 'Freizeit', minutes: 3,
    text: [
      'Mara arbeitet von Montag bis Freitag. Am Wochenende steht sie später auf und frühstückt in Ruhe.',
      'Wenn das Wetter schön ist, fährt sie mit dem Fahrrad in den Park. Dort trifft sie oft ihre Freundin Sofia.',
      'Am Abend kochen sie zusammen. Heute machen sie Nudeln mit Gemüse und sehen danach einen Film.',
    ],
    glossary: [{ word: 'das Wochenende', translation: 'выходные' }, { word: 'später aufstehen', translation: 'вставать позже' }, { word: 'in Ruhe', translation: 'спокойно, не спеша' }, { word: 'das Wetter', translation: 'погода' }, { word: 'mit dem Fahrrad', translation: 'на велосипеде' }, { word: 'sich treffen', translation: 'встречаться' }, { word: 'zusammen', translation: 'вместе' }, { word: 'danach', translation: 'после этого' }],
    questions: [
      { prompt: 'Куда Мара едет в хорошую погоду?', options: ['В парк', 'На работу', 'В магазин'], answer: 0 },
      { prompt: 'Что подруги готовят сегодня?', options: ['Суп', 'Пиццу', 'Макароны с овощами'], answer: 2 },
    ],
  },
  {
    id: 'a2-apartment', level: 'A2', title: 'Новая квартира', kicker: 'Wohnen', minutes: 4,
    text: [
      'Nach drei Wochen Suche hat Amir endlich eine neue Wohnung gefunden. Sie liegt nicht direkt im Zentrum, aber die U-Bahn ist nur fünf Minuten entfernt.',
      'Die Wohnung hat zwei Zimmer, eine kleine Küche und einen Balkon. Besonders gut gefällt Amir das helle Wohnzimmer. Nur das Badezimmer muss noch renoviert werden.',
      'Am Samstag helfen ihm seine Freunde beim Umzug. Amir bestellt Pizza für alle, weil nach dem Tragen niemand mehr kochen möchte.',
    ],
    glossary: [{ word: 'die Suche', translation: 'поиск' }, { word: 'entfernt', translation: 'удалённый, на расстоянии' }, { word: 'besonders', translation: 'особенно' }, { word: 'das Wohnzimmer', translation: 'гостиная' }, { word: 'renovieren', translation: 'ремонтировать' }, { word: 'der Umzug', translation: 'переезд' }, { word: 'tragen', translation: 'нести' }, { word: 'bestellen', translation: 'заказывать' }],
    questions: [
      { prompt: 'Что находится в пяти минутах от дома?', options: ['Супермаркет', 'Метро', 'Работа'], answer: 1 },
      { prompt: 'Почему Амир заказывает пиццу?', options: ['Кухни нет', 'Он не умеет готовить', 'Все устали после переноски вещей'], answer: 2 },
    ],
  },
  {
    id: 'a2-train', level: 'A2', title: 'Поезд опаздывает', kicker: 'Unterwegs', minutes: 4,
    text: [
      'Julia muss heute zu einem wichtigen Gespräch nach Frankfurt fahren. Ihr Zug sollte um 8:12 Uhr abfahren, hat aber zwanzig Minuten Verspätung.',
      'Sie informiert ihren Kollegen per Nachricht. Kurz danach ändert sich auch das Gleis. Julia nimmt schnell ihre Tasche und geht zu Gleis sieben.',
      'Im Zug findet sie einen ruhigen Platz am Fenster. Trotz der Verspätung kommt sie noch rechtzeitig zu ihrem Termin.',
    ],
    glossary: [{ word: 'das Gespräch', translation: 'встреча, разговор' }, { word: 'abfahren', translation: 'отправляться' }, { word: 'die Verspätung', translation: 'опоздание' }, { word: 'jemanden informieren', translation: 'сообщать кому-либо' }, { word: 'sich ändern', translation: 'меняться' }, { word: 'das Gleis', translation: 'путь, платформа' }, { word: 'rechtzeitig', translation: 'вовремя' }, { word: 'trotz', translation: 'несмотря на' }],
    questions: [
      { prompt: 'На сколько минут задерживается поезд?', options: ['10', '20', '30'], answer: 1 },
      { prompt: 'Успевает ли Юлия на встречу?', options: ['Да', 'Нет', 'В тексте не сказано'], answer: 0 },
    ],
  },
  {
    id: 'a2-neighbors', level: 'A2', title: 'Новые соседи', kicker: 'Begegnungen', minutes: 4,
    text: [
      'Seit einer Woche wohnt eine neue Familie im dritten Stock. Paul hat sie bisher nur im Treppenhaus gesehen.',
      'Am Sonntagnachmittag klingeln die Nachbarn bei ihm. Sie stellen sich vor und bringen einen selbst gebackenen Kuchen mit. Die Tochter heißt Mila und geht in die gleiche Schule wie Pauls Sohn.',
      'Sie trinken zusammen Kaffee und sprechen über die Gegend. Paul zeigt ihnen später den Spielplatz und den nächsten Supermarkt.',
    ],
    glossary: [{ word: 'der Stock', translation: 'этаж' }, { word: 'das Treppenhaus', translation: 'лестничная клетка' }, { word: 'bisher', translation: 'до сих пор' }, { word: 'klingeln', translation: 'звонить в дверь' }, { word: 'sich vorstellen', translation: 'представляться' }, { word: 'selbst gebacken', translation: 'испечённый самостоятельно' }, { word: 'die Gegend', translation: 'район, местность' }, { word: 'der Spielplatz', translation: 'детская площадка' }],
    questions: [
      { prompt: 'Что приносят соседи?', options: ['Цветы', 'Пирог', 'Книгу'], answer: 1 },
      { prompt: 'Что общего у детей?', options: ['Одна школа', 'Один спортивный клуб', 'Один учитель музыки'], answer: 0 },
    ],
  },
  {
    id: 'b1-four-day-week', level: 'B1', title: 'Четырёхдневная неделя', kicker: 'Arbeitswelt', minutes: 6,
    text: [
      'Immer mehr Unternehmen testen eine Vier-Tage-Woche. Die Beschäftigten arbeiten dabei nicht unbedingt weniger Stunden pro Tag, haben aber ein längeres Wochenende.',
      'Befürworter berichten, dass die Mitarbeiter motivierter sind und sich besser konzentrieren können. Außerdem bleibt mehr Zeit für Familie, Sport und Erholung. Kritiker befürchten dagegen, dass der Arbeitsdruck an den übrigen Tagen steigt.',
      'Ob das Modell funktioniert, hängt stark von der Branche und der Organisation ab. In einer Pflegeeinrichtung gelten andere Bedingungen als in einer Softwarefirma. Deshalb gibt es keine Lösung, die für alle Betriebe gleich gut passt.',
    ],
    glossary: [{ word: 'die Beschäftigten', translation: 'сотрудники, занятые' }, { word: 'unbedingt', translation: 'обязательно' }, { word: 'der Befürworter', translation: 'сторонник' }, { word: 'sich konzentrieren', translation: 'концентрироваться' }, { word: 'die Erholung', translation: 'отдых, восстановление' }, { word: 'befürchten', translation: 'опасаться' }, { word: 'der Arbeitsdruck', translation: 'рабочая нагрузка, давление' }, { word: 'die Bedingung', translation: 'условие' }, { word: 'der Betrieb', translation: 'предприятие' }],
    questions: [
      { prompt: 'Какой плюс называют сторонники?', options: ['Выше зарплата', 'Больше времени на отдых', 'Короче рабочий день'], answer: 1 },
      { prompt: 'От чего зависит успех модели?', options: ['Только от зарплаты', 'От отрасли и организации', 'От времени года'], answer: 1 },
    ],
  },
  {
    id: 'b1-volunteering', level: 'B1', title: 'Волонтёрство в городе', kicker: 'Gesellschaft', minutes: 6,
    text: [
      'Als Elena nach Deutschland gezogen ist, kannte sie in ihrer neuen Stadt fast niemanden. Auf einer Internetseite entdeckte sie ein Projekt, das ältere Menschen beim Einkaufen unterstützt.',
      'Seitdem besucht sie jeden Mittwoch Frau Keller. Meistens kaufen sie gemeinsam ein, manchmal trinken sie aber auch nur Tee und unterhalten sich. Elena verbessert dabei ihre Deutschkenntnisse und erfährt viel über das Leben in der Stadt.',
      'Für Frau Keller ist vor allem der persönliche Kontakt wichtig. Aus einer praktischen Hilfe ist mit der Zeit eine echte Freundschaft entstanden. Elena empfiehlt deshalb auch anderen Zugezogenen, sich ehrenamtlich zu engagieren.',
    ],
    glossary: [{ word: 'umziehen', translation: 'переезжать' }, { word: 'entdecken', translation: 'обнаруживать' }, { word: 'unterstützen', translation: 'поддерживать' }, { word: 'sich unterhalten', translation: 'беседовать' }, { word: 'die Deutschkenntnisse', translation: 'знания немецкого' }, { word: 'die Zugezogenen', translation: 'недавно переехавшие' }, { word: 'ehrenamtlich', translation: 'на общественных началах' }, { word: 'sich engagieren', translation: 'активно участвовать' }, { word: 'entstehen', translation: 'возникать' }],
    questions: [
      { prompt: 'Как Елена познакомилась с проектом?', options: ['Через коллегу', 'На сайте', 'В языковой школе'], answer: 1 },
      { prompt: 'Что возникло между Еленой и госпожой Келлер?', options: ['Деловое партнёрство', 'Дружба', 'Спор'], answer: 1 },
    ],
  },
  {
    id: 'b1-digital-break', level: 'B1', title: 'День без смартфона', kicker: 'Medien', minutes: 6,
    text: [
      'Viele Menschen greifen morgens zuerst zum Smartphone und legen es abends als Letztes weg. Nachrichten, Termine und Unterhaltung sind ständig verfügbar. Gerade deshalb probieren einige bewusst digitale Pausen aus.',
      'Jonas schaltet sein Handy jeden Sonntag für mehrere Stunden aus. Am Anfang hatte er das Gefühl, etwas zu verpassen. Inzwischen genießt er die Ruhe: Er kocht, liest oder macht einen langen Spaziergang, ohne jede Minute auf den Bildschirm zu schauen.',
      'Ein vollständiger Verzicht wäre für ihn im Alltag unrealistisch. Schon eine regelmäßige Pause hilft ihm jedoch, bewusster mit seiner Zeit umzugehen. Wichtig ist für ihn nicht die Dauer, sondern die Gewohnheit.',
    ],
    glossary: [{ word: 'nach etwas greifen', translation: 'тянуться за чем-либо' }, { word: 'verfügbar', translation: 'доступный' }, { word: 'bewusst', translation: 'осознанно' }, { word: 'etwas verpassen', translation: 'что-то упустить' }, { word: 'inzwischen', translation: 'тем временем, теперь' }, { word: 'der Bildschirm', translation: 'экран' }, { word: 'der Verzicht', translation: 'отказ' }, { word: 'mit etwas umgehen', translation: 'обращаться с чем-либо' }, { word: 'die Gewohnheit', translation: 'привычка' }],
    questions: [
      { prompt: 'Когда Йонас выключает телефон?', options: ['Каждое воскресенье', 'Каждый вечер', 'Только в отпуске'], answer: 0 },
      { prompt: 'Что для него важнее длительности перерыва?', options: ['Компания', 'Привычка', 'Место'], answer: 1 },
    ],
  },
  {
    id: 'a1-supermarket', level: 'A1', title: 'Покупки в супермаркете', kicker: 'Einkaufen', minutes: 4,
    text: [
      'Nach der Arbeit geht Oleg in den Supermarkt. Zu Hause hat er noch Nudeln, aber kein Gemüse und keine Milch.',
      'Er nimmt Tomaten, eine Gurke, einen Liter Milch und sechs Eier. Äpfel sind heute im Angebot, deshalb kauft er auch ein Kilo.',
      'An der Kasse fragt die Kassiererin: „Brauchen Sie eine Tüte?“ Oleg sagt: „Nein, danke. Ich habe einen Rucksack.“',
      'Er bezahlt 14 Euro 60 mit Karte. Den Kassenbon steckt er in die Jackentasche und fährt nach Hause.',
    ],
    glossary: [{ word: 'der Supermarkt', translation: 'супермаркет' }, { word: 'das Gemüse', translation: 'овощи' }, { word: 'der Liter', translation: 'литр' }, { word: 'im Angebot', translation: 'по акции' }, { word: 'die Kasse', translation: 'касса' }, { word: 'die Kassiererin', translation: 'кассирша' }, { word: 'die Tüte', translation: 'пакет' }, { word: 'der Rucksack', translation: 'рюкзак' }, { word: 'der Kassenbon', translation: 'кассовый чек' }],
    questions: [
      { prompt: 'Чего у Олега ещё есть дома?', options: ['Макароны', 'Молоко', 'Овощи'], answer: 0 },
      { prompt: 'Почему он покупает яблоки?', options: ['Они по акции', 'Они нужны другу', 'Других фруктов нет'], answer: 0 },
      { prompt: 'Почему ему не нужен пакет?', options: ['У него мало покупок', 'У него есть рюкзак', 'Пакеты закончились'], answer: 1 },
    ],
  },
  {
    id: 'a1-language-course', level: 'A1', title: 'Первый день на курсах', kicker: 'Deutsch lernen', minutes: 4,
    text: [
      'Heute beginnt für Sara ein neuer Deutschkurs. Der Unterricht ist zweimal pro Woche: am Dienstag und am Donnerstag.',
      'Im Kurs sind zwölf Personen aus acht Ländern. Die Lehrerin heißt Frau Berg. Zuerst stellen sich alle kurz vor.',
      'Sara sitzt neben Luis aus Spanien. Sie machen eine Übung zusammen und fragen: „Wie heißt du? Wo wohnst du? Welche Sprachen sprichst du?“',
      'Nach dem Kurs trinken einige Teilnehmer noch einen Kaffee. Sara ist müde, aber sie freut sich schon auf Donnerstag.',
    ],
    glossary: [{ word: 'der Deutschkurs', translation: 'курс немецкого языка' }, { word: 'der Unterricht', translation: 'занятие, обучение' }, { word: 'zweimal pro Woche', translation: 'два раза в неделю' }, { word: 'das Land', translation: 'страна' }, { word: 'die Lehrerin', translation: 'учительница' }, { word: 'sich vorstellen', translation: 'представляться' }, { word: 'die Übung', translation: 'упражнение' }, { word: 'der Teilnehmer', translation: 'участник курса' }, { word: 'sich auf etwas freuen', translation: 'радоваться чему-то предстоящему' }],
    questions: [
      { prompt: 'В какие дни проходит курс?', options: ['В понедельник и среду', 'Во вторник и четверг', 'Только в субботу'], answer: 1 },
      { prompt: 'Откуда Луис?', options: ['Из Испании', 'Из Италии', 'Из Португалии'], answer: 0 },
      { prompt: 'Что делают некоторые участники после курса?', options: ['Пишут тест', 'Идут домой', 'Пьют кофе'], answer: 2 },
    ],
  },
  {
    id: 'a2-job-interview', level: 'A2', title: 'Собеседование', kicker: 'Beruf', minutes: 5,
    text: [
      'Mina hat sich bei einem Hotel als Rezeptionistin beworben. Heute hat sie ein Vorstellungsgespräch mit der Hotelleiterin. Sie kommt zehn Minuten früher und meldet sich an der Rezeption.',
      'Im Gespräch erzählt Mina von ihrer Ausbildung und ihrer letzten Arbeitsstelle. Sie spricht drei Sprachen und arbeitet gern mit Menschen. Das ist für das internationale Hotel besonders wichtig.',
      'Die Leiterin fragt auch nach Minas Arbeitszeiten. Mina kann unter der Woche flexibel arbeiten, möchte aber nur jedes zweite Wochenende übernehmen.',
      'Am Ende darf Mina selbst Fragen stellen. Sie möchte wissen, wann die Stelle beginnt und ob es eine Einarbeitung gibt. Eine Antwort bekommt sie bis Freitag.',
    ],
    glossary: [{ word: 'sich bewerben', translation: 'подавать заявку на работу' }, { word: 'die Rezeptionistin', translation: 'администратор на ресепшене' }, { word: 'das Vorstellungsgespräch', translation: 'собеседование' }, { word: 'die Ausbildung', translation: 'профессиональное образование' }, { word: 'die Arbeitsstelle', translation: 'место работы' }, { word: 'unter der Woche', translation: 'в будние дни' }, { word: 'flexibel', translation: 'гибко' }, { word: 'übernehmen', translation: 'брать на себя' }, { word: 'die Einarbeitung', translation: 'введение в работу' }],
    questions: [
      { prompt: 'На какую должность подалась Мина?', options: ['Официантка', 'Администратор', 'Менеджер'], answer: 1 },
      { prompt: 'Как часто она готова работать в выходные?', options: ['Каждые выходные', 'Каждые вторые выходные', 'Никогда'], answer: 1 },
      { prompt: 'Когда она получит ответ?', options: ['До пятницы', 'Через месяц', 'Сразу после беседы'], answer: 0 },
    ],
  },
  {
    id: 'a2-repair', level: 'A2', title: 'Проблема в квартире', kicker: 'Wohnen', minutes: 5,
    text: [
      'Seit gestern wird die Heizung in Leons Wohnung nicht mehr warm. Draußen sind nur fünf Grad, deshalb ruft er am Morgen seinen Vermieter an.',
      'Leon erklärt das Problem und sagt, dass auch das warme Wasser manchmal ausfällt. Der Vermieter verspricht, sofort eine Firma zu informieren.',
      'Am Nachmittag meldet sich ein Techniker. Er kann zwischen 16 und 18 Uhr kommen. Leon verschiebt einen Termin und wartet zu Hause.',
      'Der Techniker findet schnell die Ursache und tauscht ein kaputtes Teil aus. Eine Stunde später funktionieren Heizung und warmes Wasser wieder.',
    ],
    glossary: [{ word: 'die Heizung', translation: 'отопление' }, { word: 'der Vermieter', translation: 'арендодатель' }, { word: 'ausfallen', translation: 'переставать работать' }, { word: 'versprechen', translation: 'обещать' }, { word: 'der Techniker', translation: 'техник' }, { word: 'verschieben', translation: 'переносить' }, { word: 'die Ursache', translation: 'причина' }, { word: 'kaputt', translation: 'сломанный' }, { word: 'ein Teil austauschen', translation: 'заменить деталь' }],
    questions: [
      { prompt: 'Что не работает в квартире?', options: ['Свет', 'Отопление', 'Интернет'], answer: 1 },
      { prompt: 'Когда придёт техник?', options: ['Утром', 'Между 16 и 18 часами', 'На следующий день'], answer: 1 },
      { prompt: 'Как решается проблема?', options: ['Меняют деталь', 'Покупают новую систему', 'Леон переезжает'], answer: 0 },
    ],
  },
  {
    id: 'b1-language-work', level: 'B1', title: 'Немецкий на работе', kicker: 'Integration', minutes: 7,
    text: [
      'Als Daria ihre neue Stelle in einem Architekturbüro begann, verstand sie die fachlichen Aufgaben gut. Schwieriger waren für sie spontane Gespräche in der Küche und kurze Telefonate mit Kunden.',
      'Deshalb notierte sie jeden Tag drei Ausdrücke, die ihre Kollegen häufig benutzten. Am Abend suchte sie Beispiele und schrieb mit jedem Ausdruck einen eigenen Satz. Besonders nützlich waren Formulierungen wie „Ich kümmere mich darum“ oder „Könnten Sie das genauer erklären?“',
      'Auch ihre Kollegen unterstützten sie. Sie korrigierten wichtige E-Mails, ohne jeden kleinen Fehler zu markieren, und erklärten Abkürzungen aus dem Büroalltag. Dadurch wurde Daria sicherer und beteiligte sich häufiger an Besprechungen.',
      'Nach einigen Monaten merkte sie, dass nicht perfekte Grammatik, sondern klare Kommunikation entscheidend war. Heute fragt sie sofort nach, wenn etwas unklar ist, und hilft neuen internationalen Kollegen beim Einstieg.',
    ],
    glossary: [{ word: 'das Architekturbüro', translation: 'архитектурное бюро' }, { word: 'fachlich', translation: 'профессиональный, специальный' }, { word: 'spontan', translation: 'спонтанно' }, { word: 'der Ausdruck', translation: 'выражение' }, { word: 'sich um etwas kümmern', translation: 'заняться чем-либо' }, { word: 'die Abkürzung', translation: 'сокращение' }, { word: 'sich beteiligen', translation: 'участвовать' }, { word: 'die Besprechung', translation: 'совещание' }, { word: 'entscheidend', translation: 'решающий' }, { word: 'nachfragen', translation: 'переспрашивать, уточнять' }],
    questions: [
      { prompt: 'Что сначала было сложнее всего для Дарьи?', options: ['Профессиональные задания', 'Спонтанные разговоры и звонки', 'Поездка на работу'], answer: 1 },
      { prompt: 'Как она работала с новыми выражениями?', options: ['Только переводила их', 'Писала с ними свои предложения', 'Просила удалить их из писем'], answer: 1 },
      { prompt: 'Какой вывод она сделала?', options: ['Нельзя говорить с ошибками', 'Важнее ясное общение', 'Нужна только письменная речь'], answer: 1 },
    ],
  },
  {
    id: 'b1-return', level: 'B1', title: 'Возврат онлайн-покупки', kicker: 'Verbraucher', minutes: 7,
    text: [
      'Vor zwei Wochen bestellte Karim online einen Bürostuhl. Laut Beschreibung sollte er besonders bequem sein und innerhalb von drei Tagen geliefert werden. Das Paket kam jedoch erst nach acht Tagen an.',
      'Beim Auspacken stellte Karim fest, dass eine Armlehne beschädigt war. Außerdem fehlten zwei Schrauben. Er fotografierte die Schäden und schrieb sofort an den Kundenservice.',
      'Das Unternehmen bot ihm zunächst einen Gutschein an. Karim lehnte ab, weil er den Stuhl nicht benutzen konnte, und bat um einen kostenlosen Rückversand sowie die Erstattung des Kaufpreises.',
      'Am nächsten Tag erhielt er ein Rücksendeetikett. Nachdem das Paket beim Händler angekommen war, wurde das Geld auf sein Konto zurücküberwiesen. Karim war mit der Lösung zufrieden, obwohl der ganze Vorgang fast drei Wochen gedauert hatte.',
    ],
    glossary: [{ word: 'laut Beschreibung', translation: 'согласно описанию' }, { word: 'bequem', translation: 'удобный' }, { word: 'geliefert werden', translation: 'быть доставленным' }, { word: 'feststellen', translation: 'установить, обнаружить' }, { word: 'die Armlehne', translation: 'подлокотник' }, { word: 'beschädigt', translation: 'повреждённый' }, { word: 'der Kundenservice', translation: 'служба поддержки' }, { word: 'der Gutschein', translation: 'подарочный сертификат, купон' }, { word: 'der Rückversand', translation: 'обратная отправка' }, { word: 'die Erstattung', translation: 'возмещение денег' }, { word: 'das Rücksendeetikett', translation: 'этикетка для возврата' }],
    questions: [
      { prompt: 'Какие проблемы были со стулом?', options: ['Неверный цвет', 'Повреждение и нехватка деталей', 'Слишком высокая цена'], answer: 1 },
      { prompt: 'Почему Карим отказался от купона?', options: ['Купон уже истёк', 'Стулом нельзя было пользоваться', 'Он хотел другой цвет'], answer: 1 },
      { prompt: 'Когда вернули деньги?', options: ['Сразу после письма', 'После получения возврата продавцом', 'До отправки стула'], answer: 1 },
    ],
  },
]
