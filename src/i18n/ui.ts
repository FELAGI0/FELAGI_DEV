/**
 * Single source of truth for UI strings.
 *
 * `en` is the reference dictionary: its keys define `UIKey`, and every other
 * language must provide exactly those keys. A missing or misspelled key is a
 * TypeScript error, so a translation can never silently ship half-done.
 */

const en = {
  'nav.home': 'About',
  'nav.projects': 'Projects',
  'lang.switchLabel': 'Switch language',
  'theme.toggleLabel': 'Toggle color theme',
  'theme.switchToDark': 'Switch to dark theme',
  'theme.switchToLight': 'Switch to light theme',
  'home.eyebrow': 'Portfolio',
  'home.title': 'Developer portfolio',
  'home.intro':
    'Static, no-nonsense portfolio: what I build, what I build it with, and how to reach me. Localization and the theme switch work; projects below.',
  'projects.title': 'Projects',
  'projects.intro':
    'Things I have built and shipped, newest first. Each one links to its source and, where there is one, a live demo.',
  'projects.empty': 'No projects yet.',
  'projects.stackLabel': 'Stack',
  'projects.repo': 'Source',
  'projects.demo': 'Demo',
  'footer.note': 'Built with Astro. Static, no trackers.',
  'redirect.title': 'Redirecting',
  'redirect.manual': 'Choose a language:',
} as const;

/** Every UI string key, derived from the reference dictionary. */
export type UIKey = keyof typeof en;

const ru: Record<UIKey, string> = {
  'nav.home': 'Обо мне',
  'nav.projects': 'Проекты',
  'lang.switchLabel': 'Переключить язык',
  'theme.toggleLabel': 'Переключить тему',
  'theme.switchToDark': 'Включить тёмную тему',
  'theme.switchToLight': 'Включить светлую тему',
  'home.eyebrow': 'Портфолио',
  'home.title': 'Портфолио разработчика',
  'home.intro':
    'Статичное портфолио без лишнего: что делаю, на чём делаю и как связаться. Локализация и тема уже работают — проекты ниже.',
  'projects.title': 'Проекты',
  'projects.intro':
    'То, что я сделал и довёл до рабочего состояния, от новых к старым. У каждого — исходники и, где есть, живое демо.',
  'projects.empty': 'Проектов пока нет.',
  'projects.stackLabel': 'Стек',
  'projects.repo': 'Исходники',
  'projects.demo': 'Демо',
  'footer.note': 'Собрано на Astro. Статика, без трекеров.',
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