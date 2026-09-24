import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function verifyPortfolio() {
  const profileDir = `/home/buddy/Portfolio/my-portfolio/.ff_verify_${Date.now()}`;
  fs.mkdirSync(profileDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/firefox',
    headless: true,
    args: ['--headless', '--no-remote', '--new-instance', '--window-size=1440,900', '--profile', profileDir],
    userDataDir: profileDir,
  });

  const brokenImages = [];
  const consoleErrors = [];

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    page.on('response', (response) => {
      if (response.status() >= 400 && response.request().resourceType() === 'image') {
        brokenImages.push({ url: response.url(), status: response.status() });
      }
    });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    console.log('1. Loading Home Page (http://localhost:4321)...');
    await page.goto('http://localhost:4321', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2000));

    // Scroll to Roles section
    console.log('2. Inspecting Roles Section...');
    await page.evaluate(() => {
      const el = document.getElementById('roles');
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 1000));

    // Click on Role 02 (Anchoring)
    await page.evaluate(() => {
      const role2Header = document.querySelector('[data-role-index="1"]');
      if (role2Header) role2Header.click();
    });
    await new Promise((r) => setTimeout(r, 1000));

    await page.screenshot({ path: '/home/buddy/Portfolio/my-portfolio/verify_roles_nakshatra.png' });
    console.log('Saved verify_roles_nakshatra.png');

    // Click credential tab 1 (Intel AI)
    await page.evaluate(() => {
      const tabs = document.querySelectorAll('.cred-tab');
      if (tabs[1]) tabs[1].click();
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: '/home/buddy/Portfolio/my-portfolio/verify_cred_intel.png' });
    console.log('Saved verify_cred_intel.png');

    // Scroll to Projects section
    console.log('3. Inspecting Projects Section...');
    await page.evaluate(() => {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: '/home/buddy/Portfolio/my-portfolio/verify_projects_grid.png' });
    console.log('Saved verify_projects_grid.png');

    // Go to Smart CCTV Project Page
    console.log('4. Navigating to /projects/smart-cctv...');
    await page.goto('http://localhost:4321/projects/smart-cctv', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: '/home/buddy/Portfolio/my-portfolio/verify_smart_cctv_page.png' });
    console.log('Saved verify_smart_cctv_page.png');

    // Go to Swarm Robotics Project Page
    console.log('5. Navigating to /projects/swarm-robotics...');
    await page.goto('http://localhost:4321/projects/swarm-robotics', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: '/home/buddy/Portfolio/my-portfolio/verify_swarm_robotics_page.png' });
    console.log('Saved verify_swarm_robotics_page.png');

    // Mobile Viewport Test (390x844)
    console.log('6. Testing Mobile Viewport (390x844)...');
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await page.goto('http://localhost:4321', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1500));
    await page.evaluate(() => {
      const el = document.getElementById('roles');
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: '/home/buddy/Portfolio/my-portfolio/verify_mobile_roles.png' });
    console.log('Saved verify_mobile_roles.png');

    console.log('--- VERIFICATION SUMMARY ---');
    console.log('Broken Images Count:', brokenImages.length);
    if (brokenImages.length > 0) {
      console.log('Broken Images:', JSON.stringify(brokenImages, null, 2));
    }
    console.log('Console Errors Count:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.log('Console Errors:', JSON.stringify(consoleErrors, null, 2));
    }
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await browser.close();
    try {
      fs.rmSync(profileDir, { recursive: true, force: true });
    } catch {}
  }
}

verifyPortfolio();
