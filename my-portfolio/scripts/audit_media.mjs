import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';

const mediaRoot = '/home/buddy/Portfolio/my-portfolio/Media';

function getAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else {
      const buf = fs.readFileSync(fullPath);
      const hash = crypto.createHash('sha256').update(buf).digest('hex');
      let fileDesc = '';
      try {
        fileDesc = execSync(`file -b "${fullPath}"`).toString().trim();
      } catch (e) {}

      results.push({
        relPath: path.relative(mediaRoot, fullPath),
        fullPath,
        filename: item,
        ext: path.extname(item).toLowerCase(),
        size: stat.size,
        hash,
        fileDesc,
      });
    }
  }
  return results;
}

const files = getAllFiles(mediaRoot);
const hashGroups = {};
for (const f of files) {
  if (!hashGroups[f.hash]) hashGroups[f.hash] = [];
  hashGroups[f.hash].push(f);
}

const duplicates = Object.entries(hashGroups).filter(([h, list]) => list.length > 1);

console.log(`=== TOTAL FILES: ${files.length} ===`);
console.log(`=== DUPLICATE GROUPS (EXACT BYTE-FOR-BYTE): ${duplicates.length} ===`);
duplicates.forEach(([h, list], i) => {
  console.log(`\nDuplicate Group ${i + 1} (${list[0].size} bytes, sha256: ${h.slice(0, 12)}...):`);
  list.forEach(item => console.log(`  - ${item.relPath}`));
});

fs.writeFileSync('/home/buddy/Portfolio/my-portfolio/scripts/media_audit_data.json', JSON.stringify({
  total: files.length,
  duplicates: duplicates.map(([h, list]) => ({ hash: h, files: list.map(l => l.relPath), size: list[0].size })),
  files
}, null, 2));
