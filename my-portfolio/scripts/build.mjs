process.env.RAYON_NUM_THREADS = process.env.RAYON_NUM_THREADS || '2';
process.env.NODE_OPTIONS = (process.env.NODE_OPTIONS || '') + ' --max-old-space-size=4096';

import { spawn } from 'child_process';

// Step 1: Preprocess Gerber files into optimized JSON for the 3D PCB viewer
console.log('[build] Preprocessing Gerber fabrication data...');
const preprocess = spawn(
  process.execPath,
  ['./scripts/preprocess-gerbers.mjs'],
  { stdio: 'inherit', env: process.env }
);

preprocess.on('exit', (ppCode) => {
  if (ppCode !== 0) {
    console.warn('[build] Gerber preprocessing returned non-zero — continuing with Astro build');
  }

  // Step 2: Run the Astro build
  console.log('[build] Starting Astro build...');
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
});
