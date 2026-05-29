# Лабораторная работа №6: Promise, Fetch API и сборка клиентской части

**Дисциплина:** Программирование сетевых приложений

**Группа:** ИУ5Ц-64Б

**Студент:** Кузнецов Никита

**Семестр:** 6

## Содержание

1. [Цель работы](#цель-работы)
2. [О проекте](#о-проекте)
3. [Структура проекта](#структура-проекта)
4. [Promise](#promise)
5. [Async / Await](#async--await)
6. [Fetch API](#fetch-api)
7. [Модули для работы с API](#модули-для-работы-с-api)
8. [Реализованный функционал](#реализованный-функционал)
9. [Backend (Express.js)](#backend-expressjs)
10. [Сборка клиентской части (Vite)](#сборка-клиентской-части-vite)
11. [Раздача статики](#раздача-статики)
12. [Запуск](#запуск)
13. [Технологии](#технологии)
14. [Вывод](#вывод)

## Цель работы

- Первая часть: замена механизма взаимодействия с внешним API с `XMLHttpRequest` на современный метод `fetch`, знакомство с `Promise` и `async/await`.
- Вторая часть: сборка клиентской части приложения с помощью системы сборки `Vite` и раздача клиентской части в качестве статики с серверной стороны во избежание проблем с CORS.

## О проекте

**МаршрутИИ** — каталог нейросетей: ChatGPT, Claude, Gemini, Grok и сотни других в одном API и web-чате.

## Структура проекта

```
iu5c-64b-psp/
├── index.html              # Точка входа frontend
├── main.js                 # Клиентский роутер
├── modules/                # Работа с API
│   ├── ajax.js             # Fetch обёртка (async/await)
│   └── stockUrls.js        # URL-адреса API
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
│   ├── home/               # Главная страница (фильтр карточек)
│   ├── ai/                 # Страница нейросети (просмотр, удаление)
│   ├── create/             # Создание карточки
│   ├── about/              # О проекте
│   └── calculator/         # Калькулятор
├── components/             # Компоненты UI
│   ├── navbar/
│   ├── card/
│   ├── footer/
│   ├── accordion/
│   └── button-back/
├── public/                 # Собранная клиентская часть (Vite build)
├── vite.config.js          # Конфигурация Vite
└── package.json
```

## Promise

**Promise** — специальный объект для отложенных и асинхронных вычислений. Позволяет избежать блокировки выполнения кода при долгих операциях (например, запросы к серверу).

### Состояния промиса

| Состояние  | Описание |
|------------|----------|
| `Pending`  | Ожидание, результат ещё не известен |
| `Fulfilled`| Промис выполнен успешно, результат получен |
| `Rejected` | Промис отклонён, произошла ошибка |

### Создание промиса

```js
const promise = new Promise((resolve, reject) => {
    // Асинхронная логика
    if (success) {
        resolve(value); // Pending → Fulfilled
    } else {
        reject(error);  // Pending → Rejected
    }
});
```

### Методы промиса

- `then(onFulfilled, onRejected)` — обработка успешного выполнения или ошибки
- `catch(onRejected)` — обработка ошибки (сокращение для `then(null, onRejected)`)
- `finally(onFinally)` — вызывается в любом случае после завершения

```js
promise
    .then(result => console.log('Успех:', result))
    .catch(error => console.log('Ошибка:', error))
    .finally(() => console.log('Завершено'));
```

## Async / Await

`async/await` — синтаксический сахар над промисами, делающий асинхронный код похожим на синхронный.

```js
const getData = async () => {
    try {
        const result = await somePromise;
        console.log(result);
    } catch (err) {
        console.log(err);
    }
};
```

Ключевое слово `await` приостанавливает выполнение функции до получения результата промиса, не блокируя основной поток.

## Fetch API

`fetch` — встроенная в браузер функция для выполнения HTTP-запросов, возвращающая Promise.

```js
const getDataFromServer = async () => {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
    }
};
```

В отличие от `XMLHttpRequest`, `fetch` использует промисы и `async/await`, что делает код более читаемым и удобным для сопровождения.

## Модули для работы с API

### modules/ajax.js

Обёртка над `fetch` с использованием `async/await`:

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
|---------|---------------------------|-----------------------|
| GET     | `/api/ai`                 | Получить все нейросети |
| GET     | `/api/ai?title=...`       | Фильтрация по названию |
| GET     | `/api/ai/:id`             | Получить одну по ID    |
| POST    | `/api/ai`                 | Создать новую          |
| PATCH   | `/api/ai/:id`             | Обновить по ID         |
| DELETE  | `/api/ai/:id`             | Удалить по ID          |

## Сборка клиентской части (Vite)

Vite — современная система сборки для фронтенд-приложений.

### Установка

```bash
npm install -D vite
```

### Конфигурация

```js
// vite.config.js
export default {
    build: {
        outDir: './public',
        emptyOutDir: true,
    },
};
```

### Команды

- `npm run dev` — запуск dev-сервера (`http://localhost:5173`)
- `npm run build` — сборка production-версии в папку `public`
- `npm run preview` — локальный просмотр production-сборки

## Раздача статики

Чтобы сервер раздавал клиентскую часть как статические файлы (и избежать CORS), папка `public` (результат сборки Vite) копируется в проект и подключается через `express.static`:

```js
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
```

После этого приложение доступно на `http://localhost:5000` без необходимости раздельного запуска frontend и backend.

## Запуск

### Установка зависимостей

```bash
npm install
```

### Режим разработки (с Vite dev server)

```bash
# Терминал 1: backend
npm start

# Терминал 2: frontend
npm run dev
```

Backend: `http://localhost:5000`
Frontend: `http://localhost:5173`

### Production режим (статическая раздача)

```bash
npm run build
npm start
```

Приложение доступно на `http://localhost:5000`

## Технологии

- **Frontend:** HTML5, JavaScript (ES6 Modules), Bootstrap 5, Fetch API
- **Backend:** Node.js, Express.js
- **Сборка:** Vite
- **Данные:** JSON-файл
- **Архитектура:** Layered Architecture, REST API, MVC (frontend)

## Вывод

В ходе работы:

1. Изучены механизмы асинхронного программирования в JavaScript: `Promise`, `async/await`.
2. Реализовано взаимодействие с API через Fetch API с использованием `async/await` вместо `XMLHttpRequest`.
3. Настроена сборка клиентской части с помощью Vite.
4. Реализована раздача статических файлов с сервера, что позволило избавиться от CORS-проблем при разработке.
5. Итоговое приложение может работать как в режиме разработки (с раздельным запуском frontend и backend), так и в production-режиме (единый сервер на Express.js, раздающий статику).
