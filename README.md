# FELAGI_DEV

Developer portfolio — a static, localized (ru/en) site built with Astro.
No backend: content lives in the repository, the build produces plain HTML.

## Stack

- **Astro 7** — static output, zero JS by default, islands only where needed
- **TypeScript** — `astro/tsconfigs/strict` plus extra strict flags, no `@ts-ignore`
- **Design tokens in CSS** — dark theme first, light via `data-theme`
- **pnpm**, Node 22 LTS

## Requirements

- Node **>= 22.22.2** (see `.nvmrc`, `engines`)
- pnpm **>= 10**

### Why 22.22.2 and not an older 22.x

The floor is set by the dependency tree, not by preference. Two engines in the
graph raise it above the usual "22 LTS" minimum:

| Package | Requires |
| --- | --- |
| `undici@8.10.2` | `node >= 22.19.0` |
| `corepack@0.36.0` | `node ^22.22.2 \|\| ^24.15.0 \|\| >=26.0.0` |

`corepack` is the stricter of the two, so **22.22.2** is the real minimum.
Lowering it makes `pnpm install` fail with `ERR_PNPM_UNSUPPORTED_ENGINE` — this
is exactly what broke the first Cloudflare Pages build, which ran with
`NODE_VERSION=22.12.0`. The GitHub-visible source of truth is
`package.json#engines` plus `.nvmrc`; the Cloudflare build needs its own
`NODE_VERSION=22.22.2` variable set to match, since it reads the environment,
not `.nvmrc`.

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
| `pnpm test`     | Unit tests (vitest)                          |

The dev server uses a fixed port (`4321`) with `strictPort`, so the URL is stable.

## Deployment

Hosted on **Cloudflare Pages** as project `felagi-dev`, auto-deploying from
`main`. Build command `pnpm build`, output directory `dist`, and
`NODE_VERSION=22.22.2` in the project environment.

The site is pure static output: no Pages Functions, no edge runtime. Everything
`/` needs is in the page itself.

### Language handling on `/`

`/` is a static stub that picks a locale and redirects:

- **JavaScript on** — an inline script in `<head>` reads `navigator.languages`
  and sends the visitor to `/ru/` or `/en/`. One hop, no flash.
- **JavaScript off** — a `<noscript>` meta refresh sends everyone to `/en/`,
  and the visible links let them switch.

Known limitation: with JavaScript disabled, a Russian visitor lands on `/en/`
and must switch by hand. Detecting the browser language without JavaScript
requires reading the `Accept-Language` request header, which a static file
cannot see — it would need an edge runtime (Cloudflare Pages Function). That
machinery was weighed against the ~0.1% of visitors affected and rejected: the
site stays static.

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
