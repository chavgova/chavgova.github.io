import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// The repository is an account site. Set SITE_BASE=/repository for a project site.
export default defineConfig({
  site: process.env.SITE_URL || 'https://chavgova.github.io',
  base: process.env.SITE_BASE || '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
  vite: { plugins: [tailwindcss()] },
});
