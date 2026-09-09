process.env.RAYON_NUM_THREADS = process.env.RAYON_NUM_THREADS || '2';
process.env.NODE_OPTIONS = (process.env.NODE_OPTIONS || '') + ' --max-old-space-size=4096';

import { dev } from 'astro';

await dev({
  root: '.',
  server: {
    port: 4321,
    host: true
  }
});
console.log('Astro dev server ready');
