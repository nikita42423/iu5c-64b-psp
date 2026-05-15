# Лабораторная работа №5: AJAX-запросы к API

**Дисциплина:** Программирование сетевых приложений

**Группа:** ИУ5Ц-64Б

**Студент:** Кузнецов Никита

**Семестр:** 6

## Цель работы
Взаимодействие с внешним API через `fetch`. Получение данных и вывод их в интерфейс пользователя.

## О проекте

**МаршрутИИ** — каталог нейросетей: ChatGPT, Claude, Gemini, Grok и сотни других в одном API и web-чате.

## Структура проекта

```
iu5c-64b-psp/
├── index.html              # Точка входа frontend
├── main.js                 # Клиентский роутер
├── modules/                # Работа с API
│   ├── ajax.js             # Fetch обёртка
│   └── stockUrls.js        # URL-адреса API
├── src/                    # Backend (Express.js)
│   ├── index.js            # Точка входа сервера
│   ├── routes/             # Маршруты API
│   │   └── ai.js
│   ├── controllers/        # Обработчики запросов
│   │   └── aiController.js
│   ├── services/          # Бизнес-логика
│   │   ├── aiService.js
│   │   └── fileService.js
│   └── data/              # Хранение данных
│       └── ai.json
├── pages/                 # Страницы frontend
│   ├── home/              # Главная страница (фильтр карточек)
│   ├── ai/                # Страница нейросети (просмотр, удаление)
│   ├── create/            # Создание карточки
│   ├── about/             # О проекте
│   └── calculator/        # Калькулятор
├── components/            # Компоненты UI
│   ├── navbar/
│   ├── card/
│   ├── footer/
│   ├── accordion/
│   └── button-back/
└── package.json
```

## Что такое fetch

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) — современный метод для выполнения HTTP-запросов из браузера, возвращает Promise.

## Модули для работы с API

### modules/ajax.js
Обёртка над fetch с методами:
- `get(url)` — GET-запрос
- `post(url, data)` — POST-запрос
- `patch(url, data)` — PATCH-запрос
- `delete(url)` — DELETE-запрос

### modules/stockUrls.js
Хранит URL-адреса API:
- `getStocks()` — получить все карточки
- `getStockById(id)` — получить одну по ID
- `createStock()` — создать новую
- `removeStockById(id)` — удалить по ID

## Реализованный функционал

### 1. Фильтрация карточек (главная страница)
На главной странице добавлено поле ввода и кнопки:
- **Найти** — фильтрует карточки по названию (query-параметр `?title=...`)
- **Очистить** — сбрасывает фильтр

### 2. Удаление карточки (страница AI)
На странице карточки добавлена кнопка **Удалить**:
- Отправляет DELETE-запрос к API
- После удаления перенаправляет на главную

### 3. Создание карточки
Отдельная страница `/pages/create/` с формой:
- Название (обязательно)
- URL изображения (обязательно)
- Описание (обязательно)
- Ссылка на сайт
- Функции (через запятую)
- Компания

## Backend (Express.js)

### API Endpoints

| Метод   | Endpoint                  | Описание              |
|---------|---------------------------|----------------------|
| GET     | `/api/ai`                 | Получить все нейросети |
| GET     | `/api/ai?title=...`       | Фильтрация по названию |
| GET     | `/api/ai/:id`             | Получить одну по ID   |
| POST    | `/api/ai`                 | Создать новую         |
| PATCH   | `/api/ai/:id`             | Обновить по ID        |
| DELETE  | `/api/ai/:id`             | Удалить по ID         |

## Запуск

### Установка зависимостей
```bash
npm install
```

### Запуск сервера (backend)
```bash
npm start
```
Сервер запустится на `http://localhost:3000`

### Запуск frontend
```bash
npm run dev
```
Откроется на `http://localhost:5173`

## Технологии

- **Frontend:** HTML5, JavaScript (ES6 Modules), Bootstrap 5, Fetch API
- **Backend:** Node.js, Express.js
- **Данные:** JSON-файл
- **Архитектура:** Layered Architecture, REST API, MVC (frontend)

## Вывод
В ходе работы:
- Реализована работа с API через Fetch API
- Добавлена фильтрация карточек по названию
- Добавлено удаление карточек
- Добавлено создание новых карточек