# Лабораторная работа №4: МаршрутИИ (Frontend + Backend)

**Дисциплина:** Программирование сетевых приложений

**Группа:** ИУ5Ц-64Б

**Студент:** Кузнецов Никита

**Семестр:** 6

## Содержание

- [Цель работы](#цель-работы)
- [Структура проекта](#структура-проекта)
- [Backend (Express.js)](#backend-expressjs)
- [Запуск](#запуск)
- [Технологии](#технологии)
- [Вывод](#вывод)

## Цель работы
Создание полноценного веб-приложения с frontend-частью и backend-API на Express.js для управления каталогом нейросетей.

## Структура проекта

```
iu5c-64b-psp/
├── index.html              # Точка входа frontend
├── main.js                 # Клиентский роутер
├── src/                    # Backend (Express.js)
│   ├── index.js            # Точка входа сервера
│   ├── routes/             # Маршруты API
│   │   └── ai.js
│   ├── controllers/        # Обработчики запросов
│   │   └── aiController.js
│   ├── services/           # Бизнес-логика
│   │   ├── aiService.js
│   │   └── fileService.js
│   └── data/               # Хранение данных
│       └── ai.json
├── pages/                  # Страницы frontend
│   ├── home/               # Главная страница
│   ├── ai/                 # Страница нейросети
│   ├── about/              # О проекте
│   └── calculator/         # Калькулятор
├── components/             # Компоненты UI
│   ├── navbar/
│   ├── card/
│   ├── footer/
│   ├── accordion/
│   └── button-back/
└── package.json
```

## Backend (Express.js)

### Архитектура (Layered Architecture)

1. **Request** → попадает в `index.js`
2. **Middleware** → парсинг JSON, CORS, логирование
3. **Router** (`routes/`) → маршрутизация
4. **Controller** (`controllers/`) → валидация, вызов сервиса
5. **Service** (`services/`) → бизнес-логика
6. **File/Data** → хранение в JSON-файле

### API Endpoints

| Метод   | Endpoint        | Описание              |
|---------|-----------------|----------------------|
| GET     | `/api/ai`       | Получить все нейросети |
| GET     | `/api/ai/:id`   | Получить одну по ID   |
| POST    | `/api/ai`       | Создать новую         |
| PATCH   | `/api/ai/:id`   | Обновить по ID        |
| DELETE  | `/api/ai/:id`   | Удалить по ID         |

### Структура данных (ai.json)

```json
{
  "id": 1,
  "src": "https://example.com/image.jpg",
  "title": "ChatGPT",
  "description": "Большая языковая модель от OpenAI",
  "features": ["Диалоги", "Генерация текста"],
  "company": "OpenAI",
  "link": "https://chat.openai.com"
}
```

## Запуск

### Установка зависимостей
```bash
npm install
```

### Запуск сервера (backend)
```bash
npm run dev
```
Сервер запустится на `http://localhost:5000`

### Запуск frontend
Откройте `index.html` в браузере или используйте Live Server.

## Технологии

- **Frontend:** HTML5, JavaScript (ES6 Modules), Bootstrap 5
- **Backend:** Node.js, Express.js
- **Данные:** JSON-файл (в будущем — база данных)
- **Архитектура:** Layered Architecture, REST API, MVC (frontend)

## Вывод
В ходе работы создано полноценное веб-приложение:
- **Frontend** — SPA с роутингом, компонентным подходом и Bootstrap 5
- **Backend** — Express.js API с полным CRUD для управления данными

Реализована слоистая архитектура backend, отделяющая маршрутизацию, обработку запросов и бизнес-логику. Данные хранятся в JSON-файле с возможностью расширения до базы данных.
