// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Absolute base for canonical URLs, hreflang alternates, OG tags and the
  // sitemap. Production is the Vercel deployment URL.
  site: 'https://felagi-dev.vercel.app',

  // `.mdx` is the authoring format for project pages: MDX keeps frontmatter
  // (validated by the collection schema) while allowing components in the body
  // later on.
  integrations: [
    mdx(),
    // The `/` stub is a noindex redirect, so it stays out of the sitemap.
    sitemap({ filter: (page) => new URL(page).pathname !== '/' }),
  ],

  /*
   * Self-hosted fonts, served from our own origin.
   *
   * Astro's Fonts API downloads the files at build time and emits `@font-face`
   * plus the preload links, so the site makes no third-party request at runtime
   * (no `fonts.googleapis.com`, no data leaving the visitor's browser). It also
   * generates size-adjusted local fallbacks, which keeps the text from shifting
   * when the real font swaps in.
   *
   * Only the weights actually used are requested — each extra weight is another
   * file for every visitor to download. `cyrillic` is required, not optional:
   * the Russian pages would otherwise fall back mid-sentence and render two
   * different typefaces in one paragraph.
   */
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'cyrillic'],
      fallbacks: ['system-ui', '-apple-system', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: [400, 600, 700],
      styles: ['normal'],
      // Cyrillic included for the same reason as Inter: the monospace face is
      // used for Russian-facing text too (dates, project meta).
      subsets: ['latin', 'cyrillic'],
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
    },
  ],

  // `dev`/`preview` run locally on a fixed port so the URL is predictable.
  server: {
    port: 4321,
  },
  vite: {
    server: {
      strictPort: true,
    },
  },

  // ru/en routing. `prefixDefaultLocale: true` means every page lives under
  // its locale (`/en/...`, `/ru/...`), so no locale is privileged in the URL
  // and switching languages is a pure path swap.
  // `redirectToDefaultLocale: false` keeps `/` as our own entry stub, which
  // does the browser-language detection Astro's static output cannot do.
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
