# FELAGI_DEV

Developer portfolio — a static, localized (ru/en) site built with Astro.
No backend: content lives in the repository, the build produces plain HTML.

## Stack

- **Astro 7** — static output, zero JS by default, islands only where needed
- **TypeScript** — `astro/tsconfigs/strict` plus extra strict flags, no `@ts-ignore`
- **Design tokens in CSS** — dark theme first, light via `data-theme`
- **pnpm**, Node 22 LTS

## Requirements

- Node **>= 22.22.0** (see `.nvmrc`, `engines`)
- pnpm **>= 10**

### Why 22.22.0

The floor comes from the dependency tree, not from preference. The strictest
`engines.node` among our actual dependencies is:

| Package | Requires |
| --- | --- |
| `undici@8.10.2` | `node >= 22.19.0` |

Everything else sits lower (`astro@7.3.3` → `>=22.12.0`, `vite@8.3.0` →
`^20.19.0 || >=22.12.0`). A scan of all 226 installed packages found nothing
demanding more than `22.19.0`, so **22.22.0** is comfortably above the real
requirement.

Two things this number is *not*:

- It is not dictated by `corepack`. Corepack is a tool bundled with Node, not a
  dependency of this project — `corepack@0.36.0` does declare
  `^22.22.2 || ^24.15.0 || >=26.0.0`, but that constrains the Node the Corepack
  shim runs under, and it does not appear anywhere in `pnpm-lock.yaml`. It is
  not what breaks an install here.
- It is not a hard pin. The floor is deliberately set to `22.22.0` rather than
  `22.22.2` so it cannot fail against Cloudflare Pages. Cloudflare resolves the
  `22.x` line from its own build-image table and ignores `.nvmrc`; if it hands
  the build `22.22.0`, a `>=22.22.2` floor would reject a Node that is in fact
  perfectly capable of running this project, and the build would fail with
  `ERR_PNPM_UNSUPPORTED_ENGINE`.

That last failure is real history: the first Cloudflare Pages build died on
`NODE_VERSION=22.12.0`, because `undici@8.10.2` needs `>=22.19.0`. The fix at
the time was an exact `NODE_VERSION=22.22.2` pin in the Pages project settings,
which works but leaves the build fragile — it depends on that one value staying
set. Relaxing the floor to `22.22.0` means the repository itself no longer
rejects what Cloudflare is likely to provide.

`package.json#engines` plus `.nvmrc` are the source of truth visible in Git.
Cloudflare reads its own `NODE_VERSION` environment variable, not `.nvmrc`, so
that variable still needs to be set to a 22.x version at or above `22.22.0`.

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
public/            static assets served as-is (favicon)
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
- [x] **CP1** — ru/en routing, UI string dictionary
- [x] **CP2** — typed projects content collection
- [x] **CP3** — pages: about, project list, project detail
- [x] **CP4** — polish: responsiveness, motion, details
- [x] **CP5** — SEO: meta, OG, hreflang, sitemap
- [ ] **CP6** — production deploy and final Lighthouse pass
