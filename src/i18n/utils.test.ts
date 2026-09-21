import { describe, expect, it } from 'vitest';
import { getLangFromUrl, localizePath } from './utils';

describe('localizePath', () => {
  it('swaps the locale on the exact cases required by the spec', () => {
    expect(localizePath('/ru/', 'en')).toBe('/en/');
    expect(localizePath('/ru', 'en')).toBe('/en');
    expect(localizePath('/ru/projects/', 'en')).toBe('/en/projects/');
    expect(localizePath('/ru/projects/foo/', 'en')).toBe('/en/projects/foo/');
  });

  it('preserves query strings and fragments', () => {
    expect(localizePath('/ru/projects/?tag=x#top', 'en')).toBe('/en/projects/?tag=x#top');
    expect(localizePath('/ru/?q=1', 'en')).toBe('/en/?q=1');
    expect(localizePath('/ru#top', 'en')).toBe('/en#top');
    expect(localizePath('/ru/projects/foo/', 'en')).toBe('/en/projects/foo/');
  });

  it('prepends the locale to un-prefixed paths', () => {
    expect(localizePath('/', 'ru')).toBe('/ru/');
    expect(localizePath('/projects/', 'ru')).toBe('/ru/projects/');
    expect(localizePath('/projects/foo', 'ru')).toBe('/ru/projects/foo');
  });

  it('does not mistake a project slug for a locale', () => {
    expect(localizePath('/ru/projects/it/', 'en')).toBe('/en/projects/it/');
    expect(localizePath('/en/projects/ru/', 'ru')).toBe('/ru/projects/ru/');
  });

  it('keeps the trailing-slash shape of the input', () => {
    expect(localizePath('/ru/projects/', 'en')).toBe('/en/projects/');
    expect(localizePath('/ru/projects', 'en')).toBe('/en/projects');
  });

  it('leaves off-site URLs alone', () => {
    expect(localizePath('https://example.com/ru/', 'en')).toBe('https://example.com/ru/');
    expect(localizePath('//cdn.example.com/ru/', 'en')).toBe('//cdn.example.com/ru/');
    expect(localizePath('mailto:me@example.com', 'ru')).toBe('mailto:me@example.com');
  });
});

describe('getLangFromUrl', () => {
  it('reads the locale from the first path segment', () => {
    expect(getLangFromUrl(new URL('https://x.dev/ru/projects/'))).toBe('ru');
    expect(getLangFromUrl(new URL('https://x.dev/en/'))).toBe('en');
  });

  it('falls back to the default locale for un-prefixed paths', () => {
    expect(getLangFromUrl(new URL('https://x.dev/'))).toBe('en');
    expect(getLangFromUrl(new URL('https://x.dev/projects/'))).toBe('en');
  });
});
