# FELAGI_DEV

Static portfolio site of a backend developer, built with Astro.
There is no backend: content lives in the repository and the build produces plain HTML.

[![Astro](https://img.shields.io/badge/Astro-7-ff5d01?logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white)](https://felagi-dev.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-felagi--dev.vercel.app-blue)](https://felagi-dev.vercel.app/)

## Live Demo

<https://felagi-dev.vercel.app>

- English: <https://felagi-dev.vercel.app/en/>
- Русский: <https://felagi-dev.vercel.app/ru/>

The root URL is a locale-neutral stub: it reads `navigator.languages` and sends
the visitor to `/en/` or `/ru/`. With JavaScript disabled a `<noscript>` meta
refresh falls back to `/en/`, and visible links let the visitor switch by hand.

## Features

- **Static site generation** — fully prerendered HTML, zero JS by default and no
  framework islands. Client-side scripts cover only theme, language links and motion.
- **i18n (ru/en)** — every URL is locale-prefixed (`prefixDefaultLocale`), UI strings
  come from typed dictionaries, and switching language keeps the visitor on the same page.
- **Dark and light themes** — dark is the default; a pre-paint script resolves
  `localStorage` → `prefers-color-scheme` → fallback so the theme never flashes.
- **Line-grid background** — a fixed 64px lattice at ~0.025 opacity, texture rather
  than a drawn element.
- **Motion with an escape hatch** — staggered scroll reveals, split-text hero and a
  cursor spotlight, all gated behind one `prefers-reduced-motion` check. With reduced
  motion the page is simply static.
- **Content Collections** — projects are MDX with a zod schema: an invalid frontmatter
  fails the build instead of rendering broken markup.
- **SEO** — canonical, hreflang alternates, `x-default`, Open Graph + Twitter card with
  a shared 1200×630 image, and a generated sitemap.
- **Custom 404** — locale-neutral, theme-aware, `noindex`.
- **Strict TypeScript** — `astro/tsconfigs/strict` plus `noUncheckedIndexedAccess`,
  `exactOptionalPropertyTypes` and friends. No `@ts-ignore` anywhere.

## Architecture

```
src/content/projects/<slug>/{en,ru}.mdx   authoring format, one file per locale
        │
        ▼  validated by src/content.config.ts (zod schema)
src/i18n/projects.ts                      parses "<slug>/<lang>" ids into { slug, lang }
        │                                 a locale without a file is hidden in that locale
        ▼
src/pages/[lang]/…                        getStaticPaths → one route per existing file
        │
        ▼
src/layouts/BaseLayout.astro              canonical, hreflang, OG, fonts, theme, header/footer
```

UI strings live in `src/i18n/ui.ts`: `en` is the reference dictionary, its keys define
`UIKey`, and `ru` is typed as `Record<UIKey, string>` — a missing translation is a build
error, not a blank page. Technology names (`Python`, `FastAPI`) are proper nouns and live
in `src/consts.ts` as data, so the two dictionaries cannot drift apart.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Astro 7 (static output) |
| Language | TypeScript 5.9 (strict) |
| Content | MDX via `@astrojs/mdx`, Astro Content Collections (zod) |
| Styling | CSS custom properties (design tokens), scoped component styles |
| Fonts | Self-hosted Inter and JetBrains Mono via the Astro Fonts API |
| i18n | Hand-rolled typed dictionaries, locale-prefixed routing |
| SEO | `@astrojs/sitemap`, canonical / hreflang / Open Graph |
| Testing | Vitest |
| Build tool | Vite |
| Deployment | Vercel (static) |
| Code style | `.editorconfig`, `.gitattributes` (LF) |

## Project Structure

```
.
├── astro.config.mjs          integrations, fonts, i18n routing, site origin
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── docs/design.md            design brief
├── public/
│   ├── favicon.svg
│   └── og.png                shared 1200×630 social preview
└── src/
    ├── consts.ts             contacts, stack, skill groups, terminal panel data
    ├── content.config.ts     typed `projects` collection schema
    ├── content/projects/     MDX content, one file per locale
    ├── i18n/                 dictionaries, path helpers, content access layer (+ tests)
    ├── layouts/
    │   └── BaseLayout.astro  page shell: head, header, footer, theme
    ├── components/           Astro components, no framework islands
    ├── pages/
    │   ├── index.astro       locale stub with redirect
    │   ├── 404.astro         custom 404
    │   └── [lang]/           home, projects list, project detail
    └── styles/               tokens.css (design tokens) + global.css
```

## Quick Start

```sh
pnpm install
pnpm dev       # dev server at http://localhost:4321 (fixed port, strictPort)
pnpm build     # static output to dist/
pnpm preview   # serve the built output
pnpm check     # Astro + TypeScript diagnostics
pnpm test      # unit tests (vitest)
```

## Development Notes

- **Node >= 22.22.2** (see `.nvmrc`) and **pnpm >= 10**.
- pnpm ships with Node via Corepack, not as a global install. Enable it once with
  `corepack enable` (on Windows this needs a shell with rights to write the Node
  install directory). It then picks up the version pinned in `packageManager`.
  Without it, `corepack pnpm <command>` is the zero-install equivalent.
- **LF everywhere** — `.gitattributes` normalizes line endings, and `.editorconfig`
  enforces charset, indentation and a final newline.
- **Commits** — English, Conventional Commits, no `Co-Authored-By` trailer. The author
  of a commit is the user only.
- `pnpm check` and `pnpm build` must both pass before a commit.

## Roadmap

- [x] **CP0** — scaffold, strict TS, theme tokens, dark/light toggle
- [x] **CP1** — ru/en routing, UI string dictionary
- [x] **CP2** — typed projects content collection
- [x] **CP3** — pages: about, project list, project detail
- [x] **CP4** — polish: responsiveness, motion, details
- [x] **CP5** — SEO: meta, OG, hreflang, sitemap, custom 404
- [x] **CP6** — production deploy and final Lighthouse pass

## License

[MIT](./LICENSE)

## Author

**FELAGI0**

- GitHub: <https://github.com/FELAGI0>
- Telegram: <https://t.me/olll07>
- Email: <mailto:felagi2323@gmail.com>
