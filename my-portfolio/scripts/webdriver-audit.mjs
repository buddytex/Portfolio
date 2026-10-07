// scripts/webdriver-audit.mjs
// Automated multi-viewport responsiveness and overflow audit using native WebDriver and geckodriver.
import { spawn } from 'child_process';

const VIEWPORTS = [
  { width: 320, height: 600, label: '320px (iPhone SE 1st / Ultra-compact)' },
  { width: 360, height: 740, label: '360px (Standard Android Compact)' },
  { width: 375, height: 667, label: '375px (iPhone SE / 8)' },
  { width: 390, height: 844, label: '390px (iPhone 12 / 13 / 14)' },
  { width: 414, height: 896, label: '414px (iPhone XR / Plus)' },
  { width: 430, height: 932, label: '430px (iPhone 14/15/16 Pro Max)' },
  { width: 768, height: 1024, label: '768px (iPad Mini / Portrait Tablet)' },
  { width: 1024, height: 768, label: '1024px (iPad Pro / Small Laptop)' },
  { width: 1366, height: 768, label: '1366px (Standard HD Laptop)' },
  { width: 1440, height: 900, label: '1440px (MacBook Pro / Desktop)' },
  { width: 1920, height: 1080, label: '1920px (Full HD Desktop)' },
];

const PAGES_TO_TEST = [
  { path: '/', name: 'Home Page' },
  { path: '/projects', name: 'Projects Archive' },
  { path: '/projects/baja-2025', name: 'Project Detail (BAJA 2025)' },
];

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function request(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const data = await res.json();
  if (data.value && data.value.error) {
    throw new Error(`WebDriver error: ${data.value.error} — ${data.value.message}`);
  }
  return data;
}

async function runAudit() {
  const port = process.env.PORT || 4321;
  const baseUrl = `http://localhost:${port}`;
  const geckodriverPort = 4444;

  console.log('Starting geckodriver...');
  const geckodriver = spawn('/snap/bin/geckodriver', ['--port', String(geckodriverPort)], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  geckodriver.stderr.on('data', (d) => {
    // console.error('[geckodriver]', d.toString());
  });

  await sleep(1200);

  let sessionId = null;
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  const failures = [];

  try {
    console.log('Creating WebDriver session with headless Firefox...');
    const sessionRes = await request(`http://localhost:${geckodriverPort}/session`, {
      method: 'POST',
      body: JSON.stringify({
        capabilities: {
          alwaysMatch: {
            'moz:firefoxOptions': {
              args: ['-headless', '--no-remote'],
            },
          },
        },
      }),
    });

    sessionId = sessionRes.value.sessionId;
    console.log(`Session established: ${sessionId}\n`);

    console.log('============================================================');
    console.log('      MULTI-VIEWPORT RESPONSIVENESS & OVERFLOW AUDIT');
    console.log(`      Target: ${baseUrl}`);
    console.log('============================================================\n');

    for (const pageTest of PAGES_TO_TEST) {
      console.log(`\nAuditing Route: ${pageTest.name} (${pageTest.path})`);
      console.log('------------------------------------------------------------');

      // Navigate to route once first
      await request(`http://localhost:${geckodriverPort}/session/${sessionId}/url`, {
        method: 'POST',
        body: JSON.stringify({ url: `${baseUrl}${pageTest.path}` }),
      });
      await sleep(1500);

      for (const vp of VIEWPORTS) {
        totalTests++;

        // Set window dimensions
        await request(`http://localhost:${geckodriverPort}/session/${sessionId}/window/rect`, {
          method: 'POST',
          body: JSON.stringify({ width: vp.width, height: vp.height }),
        });
        await sleep(500);

        // Execute JS script in page to check scrollWidth and overflowing elements
        const execRes = await request(`http://localhost:${geckodriverPort}/session/${sessionId}/execute/sync`, {
          method: 'POST',
          body: JSON.stringify({
            script: `
              const docEl = document.documentElement;
              const body = document.body;
              const innerWidth = window.innerWidth;
              const scrollWidth = Math.max(docEl.scrollWidth, body ? body.scrollWidth : 0);
              const clientWidth = docEl.clientWidth;
              const hasOverflow = scrollWidth > innerWidth + 1;

              const culprits = [];
              if (hasOverflow) {
                const all = document.querySelectorAll('*');
                for (const el of all) {
                  const rect = el.getBoundingClientRect();
                  if (rect.right > innerWidth + 2) {
                    const tag = el.tagName.toLowerCase();
                    const cls = el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).slice(0, 2).join('.') : '';
                    const id = el.id ? '#' + el.id : '';
                    culprits.push({
                      selector: tag + id + cls,
                      right: Math.round(rect.right),
                      width: Math.round(rect.width),
                      excess: Math.round(rect.right - innerWidth)
                    });
                    if (culprits.length >= 4) break;
                  }
                }
              }

              return {
                innerWidth,
                clientWidth,
                scrollWidth,
                hasOverflow,
                culprits
              };
            `,
            args: [],
          }),
        });

        const res = execRes.value;

        if (!res.hasOverflow) {
          passedTests++;
          console.log(`  ✓ [${vp.width}px] ${vp.label}: Clean (scrollWidth: ${res.scrollWidth}px, innerWidth: ${res.innerWidth}px)`);
        } else {
          failedTests++;
          console.error(`  ✗ [${vp.width}px] ${vp.label}: OVERFLOW! (scrollWidth: ${res.scrollWidth}px > innerWidth: ${res.innerWidth}px)`);
          if (res.culprits.length > 0) {
            console.error('    Culprits:', JSON.stringify(res.culprits));
          }
          failures.push({
            page: pageTest.name,
            viewport: vp.width,
            ...res,
          });
        }
      }
    }

    // Nav Drawer Interaction Test on Mobile (375px)
    console.log('\nAuditing Mobile Nav Drawer Interaction (375px)');
    console.log('------------------------------------------------------------');
    await request(`http://localhost:${geckodriverPort}/session/${sessionId}/window/rect`, {
      method: 'POST',
      body: JSON.stringify({ width: 375, height: 667 }),
    });
    await request(`http://localhost:${geckodriverPort}/session/${sessionId}/url`, {
      method: 'POST',
      body: JSON.stringify({ url: `${baseUrl}/` }),
    });
    await sleep(1000);

    const navTestRes = await request(`http://localhost:${geckodriverPort}/session/${sessionId}/execute/sync`, {
      method: 'POST',
      body: JSON.stringify({
        script: `
          const toggle = document.querySelector('.nav-toggle');
          if (!toggle) return { ok: false, error: 'No .nav-toggle found' };
          
          toggle.click();
          const drawer = document.querySelector('.mobile-drawer');
          const isOpenAfterClick = drawer && (drawer.classList.contains('open') || drawer.getAttribute('aria-hidden') === 'false');
          const toggleAria = toggle.getAttribute('aria-expanded');
          
          return {
            ok: true,
            hasToggle: true,
            isOpenAfterClick,
            toggleAria,
            drawerWidth: drawer ? drawer.clientWidth : 0
          };
        `,
        args: [],
      }),
    });

    console.log('  Mobile Nav Drawer Test Result:', navTestRes.value);
    if (navTestRes.value.isOpenAfterClick) {
      console.log('  ✓ Mobile Nav Drawer opens and reports active aria state cleanly.');
    } else {
      console.warn('  ⚠ Mobile drawer toggle check did not report open class.');
    }

  } catch (err) {
    console.error('Fatal audit error:', err);
  } finally {
    if (sessionId) {
      try {
        await request(`http://localhost:${geckodriverPort}/session/${sessionId}`, { method: 'DELETE' });
      } catch {}
    }
    geckodriver.kill();
  }

  console.log('\n============================================================');
  console.log(`AUDIT COMPLETE: ${passedTests}/${totalTests} Tests Passed, ${failedTests} Failed.`);
  console.log('============================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runAudit();
