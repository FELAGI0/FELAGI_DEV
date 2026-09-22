import { defaultLang, isLang, locales, ui, type Lang, type UIKey } from './ui';

/**
 * Locale of the current URL, based on its first path segment.
 * Falls back to the default locale for un-prefixed paths.
 *
 *   getLangFromUrl(new URL('https://x.dev/ru/projects/')) // 'ru'
 *   getLangFromUrl(new URL('https://x.dev/projects/'))    // 'en' (default)
 */
export function getLangFromUrl(url: URL): Lang {
  const [first] = url.pathname.split('/').filter(Boolean);
  return isLang(first) ? first : defaultLang;
}

/**
 * Look up a UI string. `key` is typed, so an unknown key fails the build
 * instead of rendering `undefined`.
 */
export function t(lang: Lang, key: UIKey): string {
  return ui[lang][key];
}

/**
 * Rewrite a site-internal path so it points at `lang`.
 *
 * If the path already starts with a supported locale, that segment is swapped;
 * otherwise the locale is prepended. The trailing-slash shape of the input is
 * preserved.
 *
 *   localizePath('/ru/', 'en')              -> '/en/'
 *   localizePath('/ru', 'en')               -> '/en'
 *   localizePath('/ru/projects/', 'en')     -> '/en/projects/'
 *   localizePath('/', 'ru')                 -> '/ru/'
 *   localizePath('/projects/', 'ru')        -> '/ru/projects/'
 *
 * Callers pass `Astro.url.pathname` (or `'/'`), which never carries a query or
 * fragment; the language switcher appends the visitor's current `?…#…` suffix
 * client-side instead. Absolute URLs have no locale to rewrite and are simply
 * not valid input here.
 */
export function localizePath(path: string, lang: Lang): string {
  const hasTrailingSlash = path.endsWith('/');
  const segments = path.split('/').filter(Boolean);

  if (isLang(segments[0])) {
    segments[0] = lang;
  } else {
    segments.unshift(lang);
  }

  return `/${segments.join('/')}${hasTrailingSlash ? '/' : ''}`;
}

/** Every locale except `lang`, in config order. */
export function otherLangs(lang: Lang): Lang[] {
  return locales.filter((locale) => locale !== lang);
}
