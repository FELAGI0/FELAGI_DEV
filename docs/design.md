# Дизайн-бриф: личное портфолио Артема (@FELAGI0)

## 0. Контекст

- Владелец: Артем
- GitHub: https://github.com/FELAGI0
- Telegram: https://t.me/olll07
- Email: felagi2323@gmail.com
- Прод: https://felagi-dev.pages.dev
- Стек сайта: Astro 7.3.3 static (SSG), TypeScript strict, vanilla JS
- Хостинг: Cloudflare Pages, autodeploy из main

## 1. Тон и роль

Backend-разработчик, Python / FastAPI / PostgreSQL.
Портфолио должно читаться как «инженер, который строит production-ready
сервисы», а не «фрилансер-универсал».

Ключевое сообщение на главной:
> Проектирую и разрабатываю production-ready веб-приложения на Python.

## 2. Палитра

Тёмная (дефолт):
  --bg        #0a0a0a
  --surface   #141414
  --border    #262626
  --fg        #e5e5e5
  --fg-muted  #8a8a8a
  --accent    #5b9dff

Светлая:
  --bg        #ffffff
  --surface   #f5f5f5
  --border    #e5e5e5
  --fg        #0a0a0a
  --fg-muted  #5a5a5a
  --accent    #1f6feb

## 3. Типографика

- UI:   Inter, 400 / 500 / 600
- Mono: JetBrains Mono, 400 / 500 (код, чипы, цифры, логотип)
- Hero h1:    clamp(2.5rem, 8vw, 5rem), weight 600, tracking -0.02em
- Секция h2:  clamp(1.75rem, 4vw, 2.5rem), weight 600
- Body:       1rem / 1.6, weight 400
- Muted:      0.9375rem / 1.6, color --fg-muted
- Чипы:       JetBrains Mono, 0.875rem

## 4. Сетка

- Container: max-width 1200px, padding 0 24px
- Секции: padding-block 80px (моб) / 120px (десктоп)
- Карточки: gap 24px
- Радиус: 12px карточки, 999px чипы
- Границы: 1px solid var(--border), теней нет
- Брейкпоинт: 768px

## 5. Логотип / монограмма

- SVG, квадрат с border-radius 12px
- Фон #0a0a0a
- Буква F по центру, JetBrains Mono Bold, ~55% от квадрата
- Цвет буквы: #e5e5e5 (в тёмной) / #0a0a0a (в светлой)
- Используется:
  - favicon (32×32)
  - header (32×32)
  - hero (200-400px)

## 6. Структура страниц

/[lang]/  — главная:
  1.  Header: Logo + nav (Проекты / Обо мне / Контакты) + LangSwitcher + ThemeToggle
  2.  Hero: имя, роль, стек, CTA «Проекты», монограмма справа
  3.  Marquee: стек (Python · FastAPI · PostgreSQL · Docker · React ...)
  4.  Selected Projects: 2 featured-карточки
  5.  About: 2 абзаца
  6.  Principles: 4 пункта
  7.  Focus: 1 строка
  8.  Skills: 3 карточки
  9.  Contacts: GitHub, Telegram, Email
  10. Footer

/[lang]/projects/          — список всех проектов
/[lang]/projects/[slug]/   — страница проекта (MDX)

## 7. Секции — контент

### Hero
  Артем · @FELAGI0
  Backend Developer
  Python · FastAPI · PostgreSQL

  Подзаголовок:
  «Проектирую и разрабатываю production-ready веб-приложения на Python.»

  CTA: «Проекты» → /[lang]/projects/

### About (2 абзаца)

  «Backend-разработчик с фокусом на Python и FastAPI. Проектирую API,
  бизнес-логику, работаю с базами данных, авторизацией и архитектурой
  приложений.

  Нравится не просто писать код, а создавать проекты, которые можно
  развернуть в production и развивать как полноценный продукт.
  Больше всего интересуюсь SaaS, CRM и внутренними корпоративными
  сервисами.»

### Principles (4 пункта)

  1. Понятная архитектура
  2. Читаемый и типизированный код
  3. Тесты и автоматизация
  4. Docker и документированный API

### Focus (1 строка)

  «Сейчас фокус — production-ready backend, архитектура и подготовка
  к работе в сильной продуктовой команде.»

### Skills — 3 карточки

  Backend                Frontend          Infrastructure
  ──────────────         ─────────────     ──────────────
  Python                 React             Docker
  FastAPI                TypeScript        Git / GitHub
  PostgreSQL                               Pytest
  SQLAlchemy 2.0                           REST API
  Alembic
  Pydantic

### Contacts

  GitHub:   https://github.com/FELAGI0
  Telegram: https://t.me/olll07
  Email:    felagi2323@gmail.com

## 8. Проекты (Content Collections)

Структура:
  src/content/projects/
    felagi-crm/
      ru.mdx
      en.mdx
    projecthub/
      ru.mdx
      en.mdx

Zod-схема:
  title:     string
  summary:   string      # 1 строка для карточки
  stack:     string[]
  repo:      string      # URL
  demo?:     string      # URL
  demoNote?: string      # напр. "cold start ~30s"
  cover?:    string      # путь к картинке (свои скриншоты, позже)
  date:      string
  featured:  boolean

  Про date: YAML-парсер может вернуть Date (если дата без кавычек)
  или string (если в кавычках). Схема нормализует обе формы к ISO
  YYYY-MM-DD через isoDate. Проверено на TZ +03:00 и UTC —
  дата не съезжает.

### FELAGI CRM
  title:     FELAGI CRM
  summary:   Production-minded CRM на FastAPI + React. RBAC,
             async SQLAlchemy, 335 тестов, drag-and-drop kanban.
  stack:     [Python, FastAPI, PostgreSQL, SQLAlchemy 2.0,
              React, TypeScript, Docker]
  repo:      https://github.com/FELAGI0/FELAGI-CRM
  demo:      https://felagi-crm.vercel.app
  demoNote:  backend cold start ~30s (Render free tier)
  featured:  true

### ProjectHub
  title:     ProjectHub
  summary:   Full-stack project management: FastAPI + React 19,
             RBAC, kanban, 243 теста.
  stack:     [Python, FastAPI, PostgreSQL, React, TypeScript, Docker]
  repo:      https://github.com/FELAGI0/ProjectHub
  demo:      https://projecthub-frontend-fpfq.onrender.com
  demoNote:  cold start ~30s (Render free tier)
  featured:  true

## 9. Анимации

Уровень 1 (везде):
  - Стаггер fade-slide-up на секциях при скролле (IntersectionObserver)
  - Hover: карточки translateY(-2px) + смена границы
  - Тема/язык: плавный цветовой transition (уже заложено)

Уровень 2 (выборочно):
  - Split-text hero при загрузке (по словам, 400мс, ease-out)
  - Курсор-прожектор на главной (radial-gradient, mix-blend-mode: screen)
  - Marquee со стеком (бесконечная прокрутка)
  - View Transitions между страницами (Astro 7 API)

Отклонено:
  - Count-up на цифрах (нет Stats)
  - 3D-tilt карточек
  - Прелоадер, автоплей видео, частицы на фоне

Все анимации уважают prefers-reduced-motion: reduce.

## 10. Компоненты

  Header.astro          — лого, nav, LangSwitcher, ThemeToggle
  Footer.astro          — копирайт, ссылки
  Logo.astro            — монограмма (3 размера)
  ProjectCard.astro     — превью + название + стек-чипы + ссылки
  SkillCard.astro       — категория + список
  PrincipleItem.astro   — номер + текст
  Marquee.astro         — бегущая строка

## 11. Соглашения проекта

- Без @ts-ignore / # type: ignore
- Коммиты на английском, без Co-Authored-By
- Backend (если появится) не трогать при frontend-фичах
- После каждого чекпоинта: STOP → показать → ок → коммит → push
- Если падает — показать ошибку, не чинить наугад