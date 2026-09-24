import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function takeScreenshot() {
  const outputPath = '/home/buddy/Portfolio/my-portfolio/hero_rendered_1440.png';
  const profileDir = `/tmp/ff_test_profile_${Date.now()}`;
  fs.mkdirSync(profileDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/firefox',
    headless: true,
    args: ['--headless', '--no-remote', '--new-instance', '--window-size=1440,900'],
    userDataDir: profileDir,
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    const port = process.env.PORT || 4321;
    console.log(`Navigating to http://localhost:${port} ...`);
    await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Wait 3.5s for Three.js WebGL & entrance animations to settle
    await new Promise((resolve) => setTimeout(resolve, 3500));

    await page.screenshot({ path: outputPath, fullPage: false });
    console.log('Screenshot successfully saved to', outputPath);
  } catch (err) {
    console.error('Screenshot error:', err);
  } finally {
    await browser.close();
    try {
      fs.rmSync(profileDir, { recursive: true, force: true });
    } catch {}
  }
}

takeScreenshot();
