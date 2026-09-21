import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * An ISO `YYYY-MM-DD` date that tolerates how YAML actually parses one.
 *
 * A bare `date: 2026-09-15` is not a string to a YAML parser — the format looks
 * like a timestamp, so `js-yaml` hands it over as a `Date` already sitting at
 * UTC midnight, and a strict `z.iso.date()` rejects it with "expected string,
 * received object". Quoting it (`date: "2026-09-15"`) fixes that file but
 * leaves the trap armed for the next one, so the schema normalises instead:
 * a `Date` is converted with `toISOString().slice(0, 10)`, which is exact
 * because the parser anchors to UTC. Strings pass through untouched, so both
 * the quoted and unquoted forms are valid.
 */
const isoDate = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.iso.date(),
);

/**
 * The `projects` collection.
 *
 * Each project is a directory holding one file per locale:
 *
 *   src/content/projects/<slug>/ru.mdx
 *   src/content/projects/<slug>/en.mdx
 *
 * The `glob()` loader assigns every file an `id` derived from its path, and
 * the locale is derived from the *filename*, not the frontmatter. That keeps a
 * translation from being silently attached to the wrong language: a file named
 * `ru.mdx` cannot claim to be English. `src/i18n/projects.ts` owns the mapping
 * from those ids to a `{ slug, lang }` pair.
 *
 * The schema is the contract. If an entry violates it, the build fails with a
 * message naming the file — bad content never reaches production.
 */
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    /** Display name. */
    title: z.string().min(1),

    /** One line for the card. Not full sentences of prose — that is the body. */
    summary: z.string().min(1),

    /** Technologies shown as chips. At least one, or the card looks broken. */
    stack: z.array(z.string().min(1)).min(1),

    /** Source repository. Must be a real URL. */
    repo: z.url(),

    /** Live demo, when there is one. */
    demo: z.url().optional(),

    /** Caveat shown next to the demo link, e.g. "cold start ~30s". */
    demoNote: z.string().min(1).optional(),

    /** Screenshot path, added later. */
    cover: z.string().min(1).optional(),

    /** ISO date (`YYYY-MM-DD`). Used to sort newest first. */
    date: isoDate,

    /**
     * The one number that best describes the project, shown large on the card.
     *
     * A single optional field rather than an array: the card has room to
     * emphasise exactly one figure, and a list would invite filling it with
     * three, which would flatten the emphasis the field exists to create.
     * `value` is the figure itself ("16"), `label` says what it counts
     * ("tests") — kept apart so the number can be set in a larger type than the
     * word next to it without splitting the string at render time.
     */
    metric: z
      .object({
        value: z.string().min(1),
        label: z.string().min(1),
      })
      .optional(),

    /** Shows on the home page's selected-projects block. */
    featured: z.boolean(),
  }),
});

export const collections = { projects };
