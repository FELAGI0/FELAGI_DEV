import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, isLang, type Lang } from './ui';

/**
 * Access layer for the `projects` collection.
 *
 * The loader gives every file a flat `id` like `felagi-crm/en`, where the last
 * segment is the locale and everything before it is the slug. Nothing else in
 * the codebase should need to know that encoding, so this module is the single
 * place that parses it and the single place that enforces the "an entry with no
 * translation in this language is hidden in that language" rule.
 *
 * Note this is about *content* locales, which happen to line up with the UI
 * locales in `ui.ts`. They are kept as separate concepts because a project can
 * exist in one language only, while the UI is always translated.
 */

/** A project entry paired with the slug and locale it was loaded under. */
export interface Project {
  /** URL segment: `felagi-crm`. */
  slug: string;
  /** Content locale of the file this entry came from. */
  lang: Lang;
  /** `data` plus the rendered MDX body, straight from the collection. */
  entry: CollectionEntry<'projects'>;
}

/**
 * Split a collection id into its slug and locale.
 *
 *   'felagi-crm/en'        -> { slug: 'felagi-crm', lang: 'en' }
 *   'my-proj/v2/ru'        -> { slug: 'my-proj/v2', lang: 'ru' }
 *
 * Returns `null` when the last segment is not a supported locale, or when
 * there is no slug at all. Callers treat `null` as "not valid content" — the
 * schema cannot express "the filename must end in a locale", so this is where
 * that rule lives. Failing loudly beats rendering a page at a nonsense slug.
 */
export function parseProjectId(id: string): { slug: string; lang: Lang } | null {
  const segments = id.split('/').filter(Boolean);
  if (segments.length < 2) return null;

  const last = segments[segments.length - 1];
  if (!isLang(last)) return null;

  const slug = segments.slice(0, -1).join('/');
  if (slug === '') return null;

  return { slug, lang: last };
}

/** Every project for one locale. */
export async function getProjects(lang: Lang): Promise<Project[]> {
  const entries = await getCollection('projects');

  const projects: Project[] = [];
  for (const entry of entries) {
    const parsed = parseProjectId(entry.id);
    if (parsed === null || parsed.lang !== lang) continue;
    projects.push({ slug: parsed.slug, lang: parsed.lang, entry });
  }

  return projects;
}

/**
 * Projects for one locale, newest first.
 *
 * `date` is an ISO `YYYY-MM-DD` string, so a plain string comparison is both
 * exact and cheap — no `Date` parsing, no timezone surprises. Ties fall back to
 * the slug so the order is stable across builds rather than depending on
 * filesystem order.
 */
export async function getProjectsSorted(lang: Lang): Promise<Project[]> {
  const projects = await getProjects(lang);
  return projects.sort((a, b) => {
    if (a.entry.data.date !== b.entry.data.date) {
      return a.entry.data.date < b.entry.data.date ? 1 : -1;
    }
    return a.slug.localeCompare(b.slug);
  });
}

/** Only the projects marked `featured`, newest first. */
export async function getFeaturedProjects(lang: Lang): Promise<Project[]> {
  const projects = await getProjectsSorted(lang);
  return projects.filter((project) => project.entry.data.featured);
}

/** Locales this project actually has a translation for. */
export async function getProjectLangs(slug: string): Promise<Lang[]> {
  const entries = await getCollection('projects');
  const langs: Lang[] = [];
  for (const entry of entries) {
    const parsed = parseProjectId(entry.id);
    if (parsed !== null && parsed.slug === slug) {
      langs.push(parsed.lang);
    }
  }
  return langs;
}

/** Every distinct slug, regardless of locale. Used to build static paths. */
export async function getProjectSlugs(): Promise<string[]> {
  const entries = await getCollection('projects');
  const slugs = new Set<string>();
  for (const entry of entries) {
    const parsed = parseProjectId(entry.id);
    if (parsed !== null) slugs.add(parsed.slug);
  }
  return [...slugs];
}

export { defaultLang };