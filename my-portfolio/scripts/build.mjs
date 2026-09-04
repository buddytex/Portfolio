process.env.RAYON_NUM_THREADS = process.env.RAYON_NUM_THREADS || '2';
process.env.NODE_OPTIONS = (process.env.NODE_OPTIONS || '') + ' --max-old-space-size=4096';

import { spawn } from 'child_process';

const child = spawn(
  process.execPath,
  ['./node_modules/astro/bin/astro.mjs', 'build'],
  {
    stdio: 'inherit',
    env: process.env,
  }
);

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
