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
  'nav.projects': 'Projects',
  'nav.sectionsLabel': 'Page sections',
  'lang.switchLabel': 'Switch language',
  'theme.toggleLabel': 'Toggle color theme',
  'theme.switchToDark': 'Switch to dark theme',
  'theme.switchToLight': 'Switch to light theme',

  // Hero
  'home.name': 'Artem',
  'home.role': 'Backend Developer',
  'home.tagline':
    'I design APIs, automate processes and turn ideas into working services.',
  'home.heroLabel': 'Introduction',

  // Stack marquee
  'home.stackLabel': 'Technology stack',

  // Selected projects
  'home.selected.title': 'Selected projects',
  'home.selected.all': 'All projects',

  // About
  'about.p1':
    'Backend developer focused on Python and FastAPI. I design APIs, business logic, and work with databases, authentication and application architecture.',
  'about.p2':
    'What I enjoy is not just writing code but building projects that can be deployed to production and grown into a real product. I am most interested in SaaS, CRM and internal corporate services.',

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
  'projects.notFound': 'Project not found.',
  'footer.linksLabel': 'Links',
  'redirect.title': 'Redirecting',
  'redirect.manual': 'Choose a language:',
} as const;

/** Every UI string key, derived from the reference dictionary. */
export type UIKey = keyof typeof en;

const ru: Record<UIKey, string> = {
  'nav.home': 'Обо мне',
  'nav.homeLabel': 'На главную',
  'nav.projects': 'Проекты',
  'nav.sectionsLabel': 'Разделы страницы',
  'lang.switchLabel': 'Переключить язык',
  'theme.toggleLabel': 'Переключить тему',
  'theme.switchToDark': 'Включить тёмную тему',
  'theme.switchToLight': 'Включить светлую тему',

  // Hero
  'home.name': 'Артем',
  'home.role': 'Backend-разработчик',
  'home.tagline':
    'Проектирую API, автоматизирую процессы и превращаю идеи в рабочие сервисы.',
  'home.heroLabel': 'Кто я',

  // Stack marquee
  'home.stackLabel': 'Технологический стек',

  // Selected projects
  'home.selected.title': 'Избранные проекты',
  'home.selected.all': 'Все проекты',

  // About
  'about.p1':
    'Backend-разработчик с фокусом на Python и FastAPI. Проектирую API, бизнес-логику, работаю с базами данных, авторизацией и архитектурой приложений.',
  'about.p2':
    'Нравится не просто писать код, а создавать проекты, которые можно развернуть в production и развивать как полноценный продукт. Больше всего интересуюсь SaaS, CRM и внутренними корпоративными сервисами.',

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
  'projects.notFound': 'Проект не найден.',
  'footer.linksLabel': 'Ссылки',
  'redirect.title': 'Перенаправление',
  'redirect.manual': 'Выберите язык:',
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
