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
 * Rewrite a path so it points at `lang`.
 *
 * If the path already starts with a supported locale, that segment is swapped;
 * otherwise the locale is prepended. Query strings, fragments and the presence
 * or absence of a trailing slash are preserved exactly, because a switcher that
 * silently drops `?tag=x` or `#section` loses the user's place.
 *
 *   localizePath('/ru/', 'en')                    -> '/en/'
 *   localizePath('/ru', 'en')                     -> '/en'
 *   localizePath('/ru/projects/', 'en')           -> '/en/projects/'
 *   localizePath('/ru/projects/foo/', 'en')       -> '/en/projects/foo/'
 *   localizePath('/ru/projects/?tag=x#top', 'en') -> '/en/projects/?tag=x#top'
 *   localizePath('/', 'ru')                       -> '/ru/'
 *   localizePath('/projects/', 'ru')              -> '/ru/projects/'
 *
 * Absolute and protocol-relative URLs are returned untouched: they point off
 * this site and have no locale to rewrite.
 */
export function localizePath(path: string, lang: Lang): string {
  const hashAt = path.indexOf('#');
  const hash = hashAt === -1 ? '' : path.slice(hashAt);
  const beforeHash = hashAt === -1 ? path : path.slice(0, hashAt);

  const queryAt = beforeHash.indexOf('?');
  const query = queryAt === -1 ? '' : beforeHash.slice(queryAt);
  const pathname = queryAt === -1 ? beforeHash : beforeHash.slice(0, queryAt);

  if (/^[a-z][a-z\d+.-]*:/i.test(pathname) || pathname.startsWith('//')) {
    return path;
  }

  // A bare '/' keeps its single trailing slash; other paths keep whatever they had.
  if (pathname === '' || pathname === '/') {
    return `/${lang}/${query}${hash}`;
  }

  const hasTrailingSlash = pathname.endsWith('/');
  const segments = pathname.split('/').filter(Boolean);

  if (isLang(segments[0])) {
    segments[0] = lang;
  } else {
    segments.unshift(lang);
  }

  const next = `/${segments.join('/')}${hasTrailingSlash ? '/' : ''}`;
  return `${next}${query}${hash}`;
}

/** Every locale except `lang`, in config order. */
export function otherLangs(lang: Lang): Lang[] {
  return locales.filter((locale) => locale !== lang);
}
