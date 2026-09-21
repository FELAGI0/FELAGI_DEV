/**
 * Site-wide constants.
 *
 * Kept in one module so the header, footer and the home page's contacts block
 * all read from the same values. Duplicating a URL across components is how a
 * stale Telegram handle ends up live in one place and fixed in another.
 *
 * Technology names live here rather than in `src/i18n/ui.ts`: `Python` and
 * `FastAPI` are proper nouns with one correct spelling in every language, so
 * putting them in two dictionaries would only create two lists that drift apart.
 * Their *labels* ("Backend", "Skills") are translated; the names are not.
 */

/** Product name shown in the header and as a title suffix. */
export const SITE_NAME = 'FELAGI_DEV';

/** Owner's handle, shown in the hero and used in the footer copyright. */
export const OWNER_HANDLE = 'FELAGI0';

/** Human-readable page description default. */
export const SITE_DESCRIPTION =
  'Backend developer: Python, FastAPI, PostgreSQL. Portfolio and selected projects.';

/**
 * Outbound contact links, in the order the brief lists them (§7 Contacts).
 * `label` is a proper noun, so it is intentionally not translated.
 */
export const CONTACTS = [
  { label: 'GitHub', href: 'https://github.com/FELAGI0' },
  { label: 'Telegram', href: 'https://t.me/olll07' },
  { label: 'Email', href: 'mailto:felagi2323@gmail.com' },
] as const;

/**
 * Stack shown in the hero line and the scrolling marquee (brief §7).
 * Ordered so the backend core reads first, which is the point the site makes.
 */
export const STACK = [
  'Python',
  'FastAPI',
  'PostgreSQL',
  'SQLAlchemy 2.0',
  'Docker',
  'React',
  'TypeScript',
  'Pytest',
  'REST API',
] as const;

/** The three skills columns (brief §7 Skills). Labels are translated. */
export const SKILL_GROUPS = [
  {
    labelKey: 'skills.backend',
    items: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy 2.0', 'Alembic', 'Pydantic'],
  },
  {
    labelKey: 'skills.frontend',
    items: ['React', 'TypeScript'],
  },
  {
    labelKey: 'skills.infrastructure',
    items: ['Docker', 'Git / GitHub', 'Pytest', 'REST API'],
  },
] as const;

/**
 * The decorative terminal shown in the hero (brief §6).
 *
 * Data rather than markup so the component stays a pure renderer, and so the
 * service list is edited in one obvious place. Kept out of `src/i18n/ui.ts` for
 * the same reason as `STACK`: this is simulated shell output — command, service
 * names, port numbers and status words are what a real `docker compose up`
 * prints, and translating them would make the panel read as fake to anyone who
 * has used a terminal. It is `aria-hidden` anyway, so it carries no information
 * a screen reader needs.
 */
export const TERMINAL = {
  command: 'docker compose up',
  services: [
    { name: 'postgres', status: 'ready' },
    { name: 'backend', status: 'running :8000' },
    { name: 'redis', status: 'ready' },
  ],
  /** The closing line, set apart from the service list. */
  message: 'API listening on :8000',
} as const;
