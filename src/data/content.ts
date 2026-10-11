import type { GrammarTopic, ReadingText } from '../types'

export const grammarTopics: GrammarTopic[] = [
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

export const readingTexts: ReadingText[] = [
  {
    id: 'a1-bakery', level: 'A1', title: 'В булочной', kicker: 'Alltag', minutes: 3,
    text: [
      'Am Samstagmorgen geht Lena zur Bäckerei. Sie möchte Brot und zwei Brötchen kaufen.',
      'In der Bäckerei sagt sie: „Guten Morgen! Ich hätte gern ein Vollkornbrot und zwei Käsebrötchen.“ Die Verkäuferin fragt: „Möchten Sie noch etwas?“',
      'Lena nimmt auch ein Stück Apfelkuchen. Alles kostet acht Euro vierzig. Sie bezahlt mit Karte und geht zufrieden nach Hause.',
    ],
    glossary: [{ word: 'die Bäckerei', translation: 'булочная' }, { word: 'das Vollkornbrot', translation: 'цельнозерновой хлеб' }, { word: 'das Stück', translation: 'кусок' }, { word: 'zufrieden', translation: 'довольный' }],
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
    glossary: [{ word: 'die Halsschmerzen', translation: 'боль в горле' }, { word: 'das Fieber', translation: 'температура, жар' }, { word: 'die Arztpraxis', translation: 'врачебный кабинет' }, { word: 'die Versichertenkarte', translation: 'страховая карта' }],
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
    glossary: [{ word: 'in Ruhe', translation: 'спокойно, не спеша' }, { word: 'sich treffen', translation: 'встречаться' }, { word: 'danach', translation: 'после этого' }],
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
    glossary: [{ word: 'entfernt', translation: 'удалённый, на расстоянии' }, { word: 'renovieren', translation: 'ремонтировать' }, { word: 'der Umzug', translation: 'переезд' }, { word: 'tragen', translation: 'нести' }],
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
    glossary: [{ word: 'die Verspätung', translation: 'опоздание' }, { word: 'das Gleis', translation: 'путь, платформа' }, { word: 'rechtzeitig', translation: 'вовремя' }, { word: 'trotz', translation: 'несмотря на' }],
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
    glossary: [{ word: 'das Treppenhaus', translation: 'лестничная клетка' }, { word: 'klingeln', translation: 'звонить в дверь' }, { word: 'sich vorstellen', translation: 'представляться' }, { word: 'die Gegend', translation: 'район, местность' }],
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
    glossary: [{ word: 'die Beschäftigten', translation: 'сотрудники, занятые' }, { word: 'der Befürworter', translation: 'сторонник' }, { word: 'befürchten', translation: 'опасаться' }, { word: 'die Bedingung', translation: 'условие' }, { word: 'der Betrieb', translation: 'предприятие' }],
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
    glossary: [{ word: 'entdecken', translation: 'обнаруживать' }, { word: 'unterstützen', translation: 'поддерживать' }, { word: 'die Zugezogenen', translation: 'недавно переехавшие' }, { word: 'ehrenamtlich', translation: 'на общественных началах' }, { word: 'entstehen', translation: 'возникать' }],
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
    glossary: [{ word: 'verfügbar', translation: 'доступный' }, { word: 'bewusst', translation: 'осознанно' }, { word: 'etwas verpassen', translation: 'что-то упустить' }, { word: 'der Verzicht', translation: 'отказ' }, { word: 'die Gewohnheit', translation: 'привычка' }],
    questions: [
      { prompt: 'Когда Йонас выключает телефон?', options: ['Каждое воскресенье', 'Каждый вечер', 'Только в отпуске'], answer: 0 },
      { prompt: 'Что для него важнее длительности перерыва?', options: ['Компания', 'Привычка', 'Место'], answer: 1 },
    ],
  },
]
