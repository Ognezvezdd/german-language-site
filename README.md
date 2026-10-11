# Klar Deutsch

Спокойное mobile-first приложение для ежедневного изучения немецкого языка на уровнях A1–B1. Интерфейс — на русском языке.

## Что уже работает

- словарь из **650 частотных слов**, автоматически преобразованный из `example.txt`;
- поиск и фильтры по уровню, части речи и артиклю;
- карточка слова с артиклем, формами, переводом, примером и озвучкой через Web Speech API;
- ручное добавление слов и массовый импорт по текстовому формату;
- интервальное повторение по алгоритму SM-2 и отдельный режим сложных слов;
- 9 полноценных тем грамматики A1–B1 с теорией, примерами и 27 упражнениями;
- 9 текстов A1–B1 на бытовые и экзаменационные темы, вопросы и сохранение незнакомых слов;
- главная с дневным планом, статистикой, streak и прогрессом;
- светлая, тёмная и системная темы;
- локальная работа без регистрации и синхронизация через Appwrite после подключения;
- автоматический деплой в GitHub Pages.

## Стек

- React 18 + TypeScript + Vite;
- Tailwind CSS;
- Appwrite Web SDK;
- GitHub Actions + GitHub Pages;
- `localStorage` как рабочий гостевой режим и резервный слой до авторизации.

## Локальный запуск

Нужны Node.js 20+ и pnpm.

```bash
pnpm install
pnpm dev
```

Проверка production-сборки:

```bash
pnpm build
pnpm preview
```

## Формат импорта слов

Одна строка — одно слово, поля разделяются символом `|`:

```text
слово | перевод | часть речи | уровень | пример | перевод примера | формы
```

Примеры:

```text
der Termin, -e | приём, назначенная встреча | сущ. | A2 | Ich habe morgen einen Termin. | Завтра у меня назначена встреча. |
bezahlen | оплачивать | глаг. | A1 | Kann ich mit Karte bezahlen? | Можно оплатить картой? | bezahlen · bezahlte · hat bezahlt
```

Обязательны только слово и перевод. Для существительного артикль и множественное число указываются в первом поле: `die Zeit, -en`.

Исходный список находится в `example.txt`. После его изменения базу можно пересобрать:

```bash
pnpm generate:words
```

## Подключение проекта Appwrite «German lang site»

API key фронтенду **не нужен и не должен храниться в репозитории**. Нужны только публичные endpoint и ID ресурсов.

### 1. Web platforms

В Appwrite Console откройте проект → **Overview → Add platform → Web** и добавьте:

- `localhost` для разработки;
- `ognezvezdd.github.io` для GitHub Pages.

### 2. База и коллекции

Создайте DocumentsDB database, например `klar_deutsch`, и две коллекции.

#### `learning_state`

- Collection ID: `learning_state`;
- Document security: включена;
- collection-level permission: только `Create` для роли `Users`;
- не выдавайте коллекции общие `Read`, `Update` или `Delete`.

Атрибуты:

| Key | Type | Required | Рекомендация |
| --- | --- | --- | --- |
| `userId` | String | да | size 64 |
| `payload` | String | да | size 1 000 000 |
| `updatedAt` | Datetime | да | — |

Документ создаётся с ID пользователя. Клиент выдаёт `read/update/delete` только роли этого пользователя, поэтому чужой прогресс недоступен.

#### `shared_words`

- Collection ID: `shared_words`;
- Document security: включена;
- collection-level permission: `Create` для роли `Users`;
- общие `Update` и `Delete` не выдавайте.

Атрибуты:

| Key | Type | Required | Рекомендация |
| --- | --- | --- | --- |
| `ownerId` | String | да | size 64 |
| `payload` | String | да | size 20 000 |
| `createdAt` | Datetime | да | — |

Созданные через приложение слова получают публичное чтение, но изменять или удалять их может только автор.

### 3. Переменные окружения

Скопируйте `.env.example` в `.env.local` и заполните:

```dotenv
VITE_APPWRITE_ENDPOINT=https://<REGION>.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=<PROJECT_ID>
VITE_APPWRITE_DATABASE_ID=<DATABASE_ID>
VITE_APPWRITE_STATE_COLLECTION_ID=learning_state
VITE_APPWRITE_WORDS_COLLECTION_ID=shared_words
```

Без этих переменных приложение остаётся полностью рабочим в гостевом режиме, сохраняя данные в браузере.

## GitHub Pages

Workflow `.github/workflows/deploy.yml` собирает приложение после каждого push в `main` и публикует `dist`.

В репозитории GitHub добавьте те же пять значений в **Settings → Secrets and variables → Actions → Variables**. Это публичные клиентские настройки, не секретные ключи.

После первого успешного workflow сайт будет доступен по адресу:

`https://ognezvezdd.github.io/german-language-site/`

## Архитектура

```text
src/
├── components/       # layout и переиспользуемые UI-компоненты
├── data/             # статический учебный контент и 650 слов
├── hooks/            # единое состояние, localStorage и cloud sync
├── lib/              # Appwrite, SM-2, хранение и streak
├── pages/            # основные разделы приложения
├── App.tsx
└── main.tsx
```

Учебный контент находится в коде и JSON-подобных TypeScript-структурах. Appwrite хранит только пользовательский прогресс и слова, добавленные через интерфейс.
