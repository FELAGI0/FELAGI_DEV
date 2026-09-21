/**
 * Site-wide constants.
 *
 * Kept in one module so the header, footer and (later) the contacts section all
 * read from the same values. Duplicating a URL across components is how a
 * stale Telegram handle ends up live in one place and fixed in another.
 */

/** Product name shown in the header and as a title suffix. */
export const SITE_NAME = 'FELAGI_DEV';

/** Owner's handle, used in the footer copyright. */
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
