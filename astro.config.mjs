// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // `dev`/`preview` run locally on a fixed port so the URL is predictable.
  server: {
    port: 4321,
  },
  vite: {
    server: {
      strictPort: true,
    },
  },
});