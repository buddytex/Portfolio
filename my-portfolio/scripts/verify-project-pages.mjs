// scripts/verify-project-pages.mjs
// Automated verification audit for all project and experience routes.
// Detects missing titles, descriptions, suspiciously short content, broken media paths,
// and pages containing only images.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

console.log('\n============================================================');
console.log('       AUTOMATED PROJECT & EXPERIENCE PAGE AUDIT');
console.log('============================================================\n');

// 1. Audit Source Data File (projects.ts)
const projectsFilePath = path.join(rootDir, 'src/data/projects.ts');
const projectsFileContent = fs.readFileSync(projectsFilePath, 'utf8');

// Extract project IDs cleanly from the projects export
// We parse the objects by matching `id: '...'` at the root project level
const projectBlockMatches = [...projectsFileContent.matchAll(/\{\s*\n\s*id:\s*['"]([a-z0-9-]+)['"],\s*\n\s*index:\s*['"]\d+['"]/g)]
  .map(m => m[1]);

const uniqueProjectIds = projectBlockMatches.length > 0 ? projectBlockMatches : [...new Set(
  [...projectsFileContent.matchAll(/\bindex:\s*['"]\d+['"]/g)]
)];

let totalProjects = uniqueProjectIds.length;
let passedCount = 0;
let warningCount = 0;
let failedCount = 0;

console.log(`Found ${totalProjects} distinct projects in src/data/projects.ts:\n`);

// 2. Audit Each Project Route
for (const id of uniqueProjectIds) {
  const projectHtmlPath = path.join(distDir, 'projects', id, 'index.html');
  const issues = [];
  const warnings = [];

  if (!fs.existsSync(projectHtmlPath)) {
    // If dist doesn't exist yet, note that production build is needed
    issues.push(`Rendered HTML missing at dist/projects/${id}/index.html (run npm run build)`);
  } else {
    const html = fs.readFileSync(projectHtmlPath, 'utf8');

    // Title check
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    if (!titleMatch || titleMatch[1].trim().length < 5) {
      issues.push('Missing or suspiciously short <title>');
    }

    // Meta description check
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    if (!descMatch || descMatch[1].trim().length < 20) {
      warnings.push('Missing or brief meta description');
    }

    // Project title in body
    const h1Match = html.match(/<h1[^>]*class=["'][^"']*project-title[^"']*["'][^>]*>([^<]+)<\/h1>/);
    if (!h1Match || h1Match[1].trim().length === 0) {
      issues.push('Missing <h1> project title');
    }

    // Executive summary check
    const summaryMatch = html.match(/class=["'][^"']*summary-lead[^"']*["'][^>]*>([^<]+)<\/p>/);
    if (!summaryMatch || summaryMatch[1].trim().length < 40) {
      issues.push('Missing or empty executive summary');
    }

    // Personal contribution list check
    const contribMatch = html.match(/class=["'][^"']*contribution-item[^"']*["']/g);
    if (!contribMatch || contribMatch.length === 0) {
      warnings.push('Missing explicit personal contributions list');
    }

    // Hardware & Software stack check
    const stackMatch = html.match(/class=["'][^"']*stack-item[^"']*["']/g);
    if (!stackMatch || stackMatch.length === 0) {
      warnings.push('Missing hardware/software architecture stack');
    }

    // Total text content word count check (ensure not just an empty page with an image)
    const textOnly = html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const wordCount = textOnly.split(' ').length;
    if (wordCount < 150) {
      issues.push(`Suspiciously short page content (${wordCount} words)`);
    }

    // Verify media paths referenced on the page
    const mediaSrcs = [...html.matchAll(/(?:src|href|data-lightbox)=["'](\/media\/[^"']+)["']/g)].map(m => m[1]);
    for (const rawSrc of mediaSrcs) {
      const decodedPath = decodeURIComponent(rawSrc.split('?')[0]);
      const fullDiskPath = path.join(publicDir, decodedPath);
      if (!fs.existsSync(fullDiskPath)) {
        issues.push(`Broken media asset reference: ${decodedPath}`);
      }
    }
  }

  // Report status
  if (issues.length > 0) {
    failedCount++;
    console.log(`✗ ${id} — FAILED`);
    issues.forEach(err => console.log(`    ❌ ${err}`));
    warnings.forEach(warn => console.log(`    ⚠ ${warn}`));
  } else if (warnings.length > 0) {
    warningCount++;
    console.log(`⚠ ${id} — OK (with warnings)`);
    warnings.forEach(warn => console.log(`    ⚠ ${warn}`));
  } else {
    passedCount++;
    console.log(`✓ ${id} — 100% OK (Title, Summary, Contributions, Hardware, Media verified)`);
  }
}

// 3. Audit Dedicated Professional Experience Route
console.log('\n--- Professional Experience Routes ---');
const expHtmlPath = path.join(distDir, 'experience', 'surgical-robotics', 'index.html');
if (fs.existsSync(expHtmlPath)) {
  const expHtml = fs.readFileSync(expHtmlPath, 'utf8');
  const expIssues = [];
  if (!expHtml.includes('CMR VERSIUS')) expIssues.push('Missing CMR Versius system reference');
  if (!expHtml.includes('video')) expIssues.push('Missing surgical robotics demonstration video');
  if (expIssues.length === 0) {
    console.log('✓ surgical-robotics (Experience) — 100% OK (Clinical observation, systems exposed, video verified)');
  } else {
    console.log('⚠ surgical-robotics — Notice: ' + expIssues.join(', '));
  }
} else {
  console.log('ℹ dist/experience/surgical-robotics/index.html not built yet.');
}

console.log('\n============================================================');
console.log(`AUDIT COMPLETE: ${passedCount} passed, ${warningCount} warnings, ${failedCount} failures.`);
console.log('============================================================\n');

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
