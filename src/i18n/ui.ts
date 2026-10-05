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
    'Backend developer focused on Python and FastAPI. I design APIs and work with async SQLAlchemy, PostgreSQL, JWT authentication and RBAC. Frontend — React and TypeScript, when a full product is needed. I build backends for SaaS and CRM — from database schema to production deploy.',
  'about.p2':
    'I enjoy not just writing code, but building projects that can be deployed and grown as a product. My favorite moment is when the whole system comes alive — from docker compose up to live endpoints.',
  'about.p3':
    'Three projects in my portfolio — all with open source, live demos and tests (315 / 195 / 243).',
  'about.now.title': 'Now',
  'about.now.workingLabel': 'Working on:',
  'about.now.working': 'FELAGI-Review',
  'about.now.learningLabel': 'Learning:',
  'about.now.learning': 'OAuth, distributed systems patterns',
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
    'Backend-разработчик с фокусом на Python и FastAPI. Проектирую API, работаю с async SQLAlchemy, PostgreSQL, JWT-авторизацией и RBAC. Frontend — React и TypeScript, когда нужно сделать полный продукт. Строю backend для SaaS и CRM — от схемы БД до деплоя в production.',
  'about.p2':
    'Нравится не просто писать код, а создавать проекты, которые можно развернуть и развивать как продукт. Больше всего люблю момент, когда система запускается целиком — от docker compose up до живых эндпоинтов.',
  'about.p3':
    'Три проекта в портфолио — все с открытым исходником, живыми демо и тестами (315 / 195 / 243).',
  'about.now.title': 'Сейчас',
  'about.now.workingLabel': 'Работаю над:',
  'about.now.working': 'FELAGI-Review',
  'about.now.learningLabel': 'Изучаю:',
  'about.now.learning': 'OAuth, паттерны распределённых систем',
  'about.now.openLabel': 'Открыт к:',
  'about.now.open': 'backend-ролям в продуктовых командах',

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
