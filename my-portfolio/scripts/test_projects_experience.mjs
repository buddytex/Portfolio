import { firefox } from 'playwright';

async function runTest() {
  console.log('--- STARTING PLAYWRIGHT BROWSER VERIFICATION ---');
  const browser = await firefox.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // 1. Visit /projects
  console.log('Navigating to http://localhost:4321/projects ...');
  await page.goto('http://localhost:4321/projects', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const title = await page.title();
  console.log('Page Title:', title);

  const tileCount = await page.locator('.collage-tile').count();
  console.log('Collage Tiles Rendered:', tileCount);

  const videoCount = await page.locator('.collage-video-el').count();
  console.log('Collage Videos Rendered:', videoCount);

  await page.screenshot({ path: 'projects_archive_desktop.png' });
  console.log('Saved projects_archive_desktop.png');

  // Scroll down to test background color evolution
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'projects_archive_scrolled.png' });
  console.log('Saved projects_archive_scrolled.png');

  // Test Domain Filter
  const roboticsBtn = page.locator('button[data-category="robotics"]');
  if (await roboticsBtn.isVisible()) {
    await roboticsBtn.click();
    await page.waitForTimeout(600);
    const visibleTiles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.collage-tile')).filter(
        (el) => el.style.display !== 'none'
      ).length;
    });
    console.log('Robotics Filter Active. Visible Tiles:', visibleTiles);
    await page.screenshot({ path: 'projects_archive_filtered.png' });
    console.log('Saved projects_archive_filtered.png');
  }

  // Test Mobile Viewport
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  const allBtn = page.locator('button[data-category="all"]');
  if (await allBtn.isVisible()) await allBtn.click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'projects_archive_mobile.png' });
  console.log('Saved projects_archive_mobile.png');

  // Reset to desktop
  await page.setViewportSize({ width: 1440, height: 900 });

  // 2. Click a tile to test navigation to detail page
  console.log('Testing tile click navigation to /projects/baja-2026 ...');
  await page.goto('http://localhost:4321/projects/baja-2026', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const detailTitle = await page.locator('.project-title').textContent();
  console.log('Detail Project Title:', detailTitle?.trim());

  const featuredVideoSrc = await page.locator('.ambient-project-video source').getAttribute('src');
  console.log('Detail Featured Video Source:', featuredVideoSrc);

  const paginationVisible = await page.locator('.project-pagination-footer').isVisible();
  console.log('Pagination Footer Present:', paginationVisible);

  const sectionsVisible = await page.evaluate(() => {
    const secs = Array.from(document.querySelectorAll('.case-section'));
    return secs.every((s) => parseFloat(window.getComputedStyle(s).opacity) > 0);
  });
  console.log('All Case Study Sections Visible (not stuck at opacity 0):', sectionsVisible);

  await page.screenshot({ path: 'projects_detail_verified.png' });
  console.log('Saved projects_detail_verified.png');

  // 3. Test Home Page order
  console.log('Navigating to http://localhost:4321/ ...');
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Check section order
  const mainChildren = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('#mainContent > *'))
      .map((el) => ({ tag: el.tagName, id: el.id, class: el.className }));
  });
  console.log('Home Page Section Order (top 6):', mainChildren.slice(0, 6));

  const projectsNavLink = await page.locator('.nav-links a[data-nav-projects="true"]').getAttribute('href');
  console.log('Nav "Projects" Link href:', projectsNavLink);

  console.log('Console Errors caught during session:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }

  await browser.close();
  console.log('--- PLAYWRIGHT VERIFICATION COMPLETE ---');
}

runTest().catch((err) => {
  console.error('Playwright Error:', err);
  process.exit(1);
});
