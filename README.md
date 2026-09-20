# FELAGI_DEV

Developer portfolio — a static, localized (ru/en) site built with Astro.
No backend: content lives in the repository, the build produces plain HTML.

## Stack

- **Astro 7** — static output, zero JS by default, islands only where needed
- **TypeScript** — `astro/tsconfigs/strict` plus extra strict flags, no `@ts-ignore`
- **Design tokens in CSS** — dark theme first, light via `data-theme`
- **pnpm**, Node 22 LTS

## Requirements

- Node **>= 22.12.0** (see `.nvmrc`, `engines`)
- pnpm **>= 10**

### Enable pnpm once

pnpm is not installed globally; it ships with Node via Corepack. Enable it once
(one-time, needs a shell with rights to write the Node install directory — on
Windows run it as Administrator):

```sh
corepack enable
```

After that `pnpm` is on your `PATH` and picks up the exact version pinned in
`packageManager` automatically. If you cannot run `corepack enable`, the
zero-install equivalent is `corepack pnpm <command>`.

## Commands

| Command         | Action                                       |
| --------------- | -------------------------------------------- |
| `pnpm install`  | Install dependencies                         |
| `pnpm dev`      | Dev server at http://localhost:4321          |
| `pnpm build`    | Build the static site to `dist/`             |
| `pnpm preview`  | Preview the built output                     |
| `pnpm check`    | Astro + TypeScript checks                    |

The dev server uses a fixed port (`4321`) with `strictPort`, so the URL is stable.

## Layout

```
public/            static assets served as-is (favicon, og images)
src/
  components/      UI components (Astro, no framework islands)
  layouts/         page shells
  pages/           file-based routes
  styles/          design tokens and global CSS
```

## Conventions

- Commits in English, no `Co-Authored-By` trailer.
- TypeScript is strict; do not silence the compiler with `@ts-ignore`.

## Roadmap

- [x] **CP0** — scaffold, strict TS, theme tokens, dark/light toggle
- [ ] **CP1** — ru/en routing, UI string dictionary
- [ ] **CP2** — typed projects content collection
- [ ] **CP3** — pages: about, project list, project detail
- [ ] **CP4** — polish: responsiveness, motion, details
- [ ] **CP5** — SEO: meta, OG, hreflang, sitemap
- [ ] **CP6** — production deploy and final Lighthouse pass