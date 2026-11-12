/**
 * Single source of truth for UI strings.
 *
 * `en` is the reference dictionary: its keys define `UIKey`, and every other
 * language must provide exactly those keys. A missing or misspelled key is a
 * TypeScript error, so a translation can never silently ship half-done.
 *
 * Only *translated* text lives here. Technology names (`Python`, `FastAPI`) are
 * proper nouns: duplicating them per language would let the two lists drift, so
 * they live in `src/consts.ts` as data and are only *labelled* from here.
 */

const en = {
  'nav.home': 'About',
  'nav.homeLabel': 'Home',
  'lang.switchLabel': 'Switch language',
  'theme.toggleLabel': 'Toggle color theme',
  'theme.switchToDark': 'Switch to dark theme',
  'theme.switchToLight': 'Switch to light theme',

  // Hero
  'home.name': 'Artem',
  'home.role': 'Backend Developer',
  'home.tagline':
    'I design APIs, automate processes and turn ideas into working services.',

  // Selected projects
  'home.selected.title': 'Selected projects',
  'home.selected.all': 'All projects',

  // About
  'about.p1':
    'Backend developer with 2+ years of experience building web applications. I build backends with Python, FastAPI and PostgreSQL — from database schema to production deploy. Worked with both high-load services and MVPs from scratch.',
  'about.p2':
    'On recent projects I integrated LLM modules into business logic (−40% query processing time), set up WebSocket for real-time features (chat, monitoring), and optimized SQL queries with Redis caching (−35% server load at peak). I care about code quality: mypy, Pydantic, Ruff, pytest. Set up CI/CD with Docker and GitLab CI — releases 25% faster.',
  'about.p3':
    'Six projects in my portfolio — all with open source, live demos and tests. Stack: Python, FastAPI, SQLAlchemy 2.0 async, PostgreSQL, React, TypeScript, Docker.',
  'about.now.title': 'Now',
  'about.now.workingLabel': 'Working on:',
  'about.now.working': 'Code review and refactoring my portfolio; planning new projects',
  'about.now.learningLabel': 'Learning:',
  'about.now.learning': 'OAuth, LLM integrations, distributed systems patterns',
  'about.now.openLabel': 'Open to:',
  'about.now.open': 'backend roles in product teams',

  // Principles
  'principles.title': 'Principles',
  'principles.1': 'Architecture before speed',
  'principles.2': 'Automation over repetitive work',
  'principles.3': 'Code should still be understandable six months later',
  'principles.4': 'Simple systems scale better',

  // Skills
  'skills.title': 'Skills',
  'skills.backend': 'Backend',
  'skills.frontend': 'Frontend',
  'skills.infrastructure': 'Infrastructure',

  // Contacts
  'contacts.title': 'Contacts',
  'contacts.note': 'Open to backend work and collaboration.',

  'projects.title': 'Projects',
  'projects.intro':
    'Things I have built and shipped, newest first. Each one links to its source and, where there is one, a live demo.',
  'projects.empty': 'No projects yet.',
  'projects.repo': 'Source',
  'projects.demo': 'Demo',
  'projects.back': 'Back to projects',
  'footer.linksLabel': 'Links',
} as const;

/** Every UI string key, derived from the reference dictionary. */
export type UIKey = keyof typeof en;

const ru: Record<UIKey, string> = {
  'nav.home': 'Обо мне',
  'nav.homeLabel': 'На главную',
  'lang.switchLabel': 'Переключить язык',
  'theme.toggleLabel': 'Переключить тему',
  'theme.switchToDark': 'Включить тёмную тему',
  'theme.switchToLight': 'Включить светлую тему',

  // Hero
  'home.name': 'Артем',
  'home.role': 'Backend-разработчик',
  'home.tagline':
    'Проектирую API, автоматизирую процессы и превращаю идеи в рабочие сервисы.',

  // Selected projects
  'home.selected.title': 'Избранные проекты',
  'home.selected.all': 'Все проекты',

  // About
  'about.p1':
    'Backend-разработчик с 2+ годами опыта в создании веб-приложений. Строю backend на Python, FastAPI и PostgreSQL — от схемы БД до деплоя в production. Работал как с высоконагруженными сервисами, так и с MVP с нуля.',
  'about.p2':
    'На последних проектах интегрировал LLM-модули в бизнес-логику (−40% времени обработки запросов), настраивал WebSocket для real-time (чат, мониторинг) и оптимизировал SQL-запросы с кэшированием в Redis (−35% нагрузки при пиках). Слежу за качеством кода: mypy, Pydantic, Ruff, тесты на pytest. Настраивал CI/CD через Docker и GitLab CI — релизы быстрее на 25%.',
  'about.p3':
    'Шесть проектов в портфолио — все с открытым исходником, живыми демо и тестами. Стек: Python, FastAPI, SQLAlchemy 2.0 async, PostgreSQL, React, TypeScript, Docker.',
  'about.now.title': 'Сейчас',
  'about.now.workingLabel': 'Работаю над:',
  'about.now.working': 'Код-ревью и рефакторинг портфолио; планирую новые проекты',
  'about.now.learningLabel': 'Изучаю:',
  'about.now.learning': 'OAuth, LLM-интеграции, паттерны распределённых систем',
  'about.now.openLabel': 'Открыт к:',
  'about.now.open': 'Backend-ролям в продуктовых командах',

  // Principles
  'principles.title': 'Принципы',
  'principles.1': 'Архитектура важнее скорости',
  'principles.2': 'Автоматизация вместо рутины',
  'principles.3': 'Код должен читаться через полгода',
  'principles.4': 'Простые системы масштабируются лучше',

  // Skills
  'skills.title': 'Навыки',
  'skills.backend': 'Backend',
  'skills.frontend': 'Frontend',
  'skills.infrastructure': 'Infrastructure',

  // Contacts
  'contacts.title': 'Контакты',
  'contacts.note': 'Открыт к backend-задачам и сотрудничеству.',

  'projects.title': 'Проекты',
  'projects.intro':
    'То, что я сделал и довёл до рабочего состояния, от новых к старым. У каждого — исходники и, где есть, живое демо.',
  'projects.empty': 'Проектов пока нет.',
  'projects.repo': 'Исходники',
  'projects.demo': 'Демо',
  'projects.back': 'К проектам',
  'footer.linksLabel': 'Ссылки',
};

/** Display names for the language switcher, keyed by locale code. */
export const languages = {
  en: 'English',
  ru: 'Русский',
} as const;

/** A supported locale code. */
export type Lang = keyof typeof languages;

/** Locale used when nothing better can be determined. */
export const defaultLang: Lang = 'en';

/** All supported locales, in config order. */
export const locales = Object.keys(languages) as Lang[];

/** The dictionaries, indexed by locale. */
export const ui: Record<Lang, Record<UIKey, string>> = { en, ru };

/** Narrows an arbitrary string to a supported locale. */
export function isLang(value: string | undefined): value is Lang {
  return value !== undefined && Object.hasOwn(languages, value);
}
