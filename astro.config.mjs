// @ts-check
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // `.mdx` is the authoring format for project pages: MDX keeps frontmatter
  // (validated by the collection schema) while allowing components in the body
  // later on.
  integrations: [mdx()],

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
