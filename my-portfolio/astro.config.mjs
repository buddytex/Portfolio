// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // @ts-ignore
  site: process.env['ASTRO_SITE'] || 'https://buddytex.github.io',
  // @ts-ignore
  base: process.env['ASTRO_BASE'] || undefined,
  integrations: [react()],
  vite: {
    optimizeDeps: {
      noDiscovery: true,
      include: [],
    },
  },
});
