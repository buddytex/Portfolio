import fs from 'fs';
import path from 'path';

const srcFiles = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (/\.(ts|astro|json)$/.test(f)) srcFiles.push(full);
  }
}
walk('src');
srcFiles.push('media-section-map.json');

const referenced = new Set();
for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.matchAll(/['"`](\/(?:media|images)\/[^'"`]+)['"`]/g);
  for (const m of matches) {
    referenced.add(m[1]);
  }
}

console.log('Total referenced media paths:', referenced.size);

const missing = [];
for (const ref of referenced) {
  const localPath = path.join(process.cwd(), 'public', ref);
  if (!fs.existsSync(localPath)) {
    missing.push({ ref, localPath });
  }
}

if (missing.length === 0) {
  console.log('SUCCESS: All ' + referenced.size + ' referenced assets exist on disk! ZERO missing files!');
} else {
  console.error('MISSING ASSETS (' + missing.length + '):', JSON.stringify(missing, null, 2));
  process.exit(1);
}
