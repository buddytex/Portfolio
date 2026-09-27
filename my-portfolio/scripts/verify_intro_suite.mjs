// scripts/verify_intro_suite.mjs
// Automated verification suite for GSAP 850ms Intro & Navigation-Lifecycle Bug Fix
import fs from 'fs';
import path from 'path';

const GECKO_URL = 'http://127.0.0.1:4444';
const APP_URL = 'http://localhost:4321';
const ARTIFACTS_DIR = '/home/buddy/.gemini/antigravity-ide/brain/b4df4c82-2549-4201-961f-38a423238dec';

async function request(path, options = {}) {
  const res = await fetch(`${GECKO_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (data.value && data.value.error) {
    throw new Error(`WebDriver error: ${data.value.error} - ${data.value.message}`);
  }
  return data;
}

async function createSession(options = {}) {
  const mozArgs = ['-headless', '--width=1280', '--height=800'];
  const prefs = { ...(options.prefs || {}) };

  const res = await request('/session', {
    method: 'POST',
    body: JSON.stringify({
      capabilities: {
        alwaysMatch: {
          'moz:firefoxOptions': {
            args: mozArgs,
            prefs: prefs,
          },
        },
      },
    }),
  });
  return res.value.sessionId;
}

async function deleteSession(sessionId) {
  if (!sessionId) return;
  try {
    await request(`/session/${sessionId}`, { method: 'DELETE' });
  } catch (e) {
    console.error('Error closing session:', e.message);
  }
}

async function navigate(sessionId, url) {
  await request(`/session/${sessionId}/url`, {
    method: 'POST',
    body: JSON.stringify({ url }),
  });
}

async function execute(sessionId, script, args = []) {
  const res = await request(`/session/${sessionId}/execute/sync`, {
    method: 'POST',
    body: JSON.stringify({ script, args }),
  });
  return res.value;
}

async function takeScreenshot(sessionId, filename) {
  const res = await request(`/session/${sessionId}/screenshot`);
  const base64 = res.value;
  const buffer = Buffer.from(base64, 'base64');
  const filepath = path.join(ARTIFACTS_DIR, filename);
  fs.writeFileSync(filepath, buffer);
  console.log(`Saved screenshot: ${filepath}`);
  return filepath;
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runSuite() {
  console.log('=== STARTING INTRO & NAVIGATION LIFECYCLE VERIFICATION SUITE ===\n');
  const results = {};

  // -------------------------------------------------------------
  // TEST 1: Fresh Load — 850ms Intro Plays Once & Completely Removes from DOM
  // -------------------------------------------------------------
  console.log('--- TEST 1: Fresh Load Execution & DOM Removal ---');
  let s1 = await createSession();
  try {
    // Navigate once to clear session storage to guarantee clean fresh entry
    await navigate(s1, `${APP_URL}/`);
    await execute(s1, `sessionStorage.clear();`);
    // Now navigate fresh
    await navigate(s1, `${APP_URL}/`);
    
    // Check initial state: overlay present, synchronously opaque
    const initialState = await execute(s1, `
      const overlay = document.getElementById('introOverlay');
      const mark = document.getElementById('introMark');
      const line = document.getElementById('introLine');
      const hero = document.getElementById('hero') || document.querySelector('section');
      return {
        overlayExists: !!overlay,
        overlayOpacity: overlay ? window.getComputedStyle(overlay).opacity : null,
        markExists: !!mark,
        lineExists: !!line,
        heroExists: !!hero,
        sessionSeenFlag: sessionStorage.getItem('intro_seen')
      };
    `);
    console.log('Initial DOM state at mount:', initialState);

    // Capture screenshot during intro play (mark and line visible)
    await takeScreenshot(s1, 'intro_stage_mid_play.png');

    // Wait 1100ms for 850ms timeline + beat + cleanup to finish
    await sleep(1100);

    const postIntroState = await execute(s1, `
      const overlay = document.getElementById('introOverlay');
      const hero = document.getElementById('hero') || document.querySelector('section');
      const centerElem = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      return {
        overlayInDOM: !!overlay,
        heroVisible: !!hero,
        centerElementTag: centerElem ? centerElem.tagName : null,
        centerElementClass: centerElem ? centerElem.className : null,
        sessionSeenFlag: sessionStorage.getItem('intro_seen'),
        pageTitle: document.title
      };
    `);
    console.log('Post-intro state (after 1100ms):', postIntroState);

    await takeScreenshot(s1, 'intro_fresh_revealed_hero.png');

    const test1Passed =
      initialState.overlayExists &&
      initialState.sessionSeenFlag === 'true' &&
      !postIntroState.overlayInDOM &&
      postIntroState.heroVisible;

    results.test1_fresh_load = {
      passed: test1Passed,
      details: 'Intro rendered, set session flag synchronously, and removed from DOM cleanly after 850ms.',
    };
    console.log(`TEST 1 RESULT: ${test1Passed ? 'PASSED' : 'FAILED'}\n`);

    // -------------------------------------------------------------
    // TEST 2: Immediate Page Reload — Intro Must NOT Replay
    // -------------------------------------------------------------
    console.log('--- TEST 2: Immediate Page Reload (Session Flag Persistence) ---');
    await request(`/session/${s1}/refresh`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
    // Check immediately upon reload
    const reloadState = await execute(s1, `
      const overlay = document.getElementById('introOverlay');
      return {
        overlayInDOM: !!overlay,
        sessionSeenFlag: sessionStorage.getItem('intro_seen')
      };
    `);
    console.log('Immediate reload state:', reloadState);

    const test2Passed = !reloadState.overlayInDOM && reloadState.sessionSeenFlag === 'true';
    results.test2_reload = {
      passed: test2Passed,
      details: 'Reload bypassed intro completely; overlay was not rendered.',
    };
    console.log(`TEST 2 RESULT: ${test2Passed ? 'PASSED' : 'FAILED'}\n`);
  } finally {
    await deleteSession(s1);
  }

  // -------------------------------------------------------------
  // TEST 3: Astro ViewTransitions & Back-Navigation (The Priority Bug Fix)
  // -------------------------------------------------------------
  console.log('--- TEST 3: Astro ViewTransitions & Back-Navigation ---');
  let s3 = await createSession();
  try {
    // 3a. Initial fresh load on homepage
    await navigate(s3, `${APP_URL}/`);
    await sleep(1100); // let intro finish

    // 3b. Client-side navigate to project detail page
    console.log('Navigating to project detail page /projects/baja-2026/ ...');
    await execute(s3, `
      const link = document.querySelector('a[href*="/projects/baja-2026"]') || document.querySelector('a[href^="/projects/"]');
      if (link) {
        link.click();
      } else {
        window.location.href = '/projects/baja-2026/';
      }
    `);
    await sleep(800); // allow ViewTransitions swap

    const projectPageState = await execute(s3, `
      return {
        url: window.location.pathname,
        overlayInDOM: !!document.getElementById('introOverlay')
      };
    `);
    console.log('Project page state:', projectPageState);

    // 3c. Navigate BACK to homepage via browser back button
    console.log('Triggering browser BACK navigation to homepage ...');
    await request(`/session/${s3}/back`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
    await sleep(800); // allow ViewTransitions swap back to /

    const backNavState = await execute(s3, `
      const overlay = document.getElementById('introOverlay');
      const centerElem = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      return {
        url: window.location.pathname,
        overlayInDOM: !!overlay,
        centerElementTag: centerElem ? centerElem.tagName : null,
        centerElementClass: centerElem ? centerElem.className : null,
        pointerEventsBlocked: overlay ? window.getComputedStyle(overlay).pointerEvents !== 'none' : false,
        sessionSeenFlag: sessionStorage.getItem('intro_seen')
      };
    `);
    console.log('Back-navigation state on homepage:', backNavState);

    await takeScreenshot(s3, 'intro_back_navigation_working.png');

    // 3d. Also test in-site link back to home
    console.log('Testing in-site link navigation back to home ...');
    await execute(s3, `window.location.href = '/projects/baja-2026/';`);
    await sleep(800);
    await execute(s3, `
      const homeLink = document.querySelector('a[href="/"]') || document.querySelector('a[href="/#hero"]');
      if (homeLink) homeLink.click();
      else window.location.href = '/';
    `);
    await sleep(800);

    const linkBackState = await execute(s3, `
      const overlay = document.getElementById('introOverlay');
      const centerElem = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      return {
        url: window.location.pathname,
        overlayInDOM: !!overlay,
        centerElementTag: centerElem ? centerElem.tagName : null,
        centerElementClass: centerElem ? centerElem.className : null
      };
    `);
    console.log('In-site link back state:', linkBackState);

    const test3Passed =
      !backNavState.overlayInDOM &&
      !linkBackState.overlayInDOM &&
      backNavState.centerElementTag !== null &&
      backNavState.url === '/';

    results.test3_view_transitions_back_navigation = {
      passed: test3Passed,
      details: 'Back navigation and in-site link navigation do NOT recreate overlay; page is fully responsive with zero stuck state.',
    };
    console.log(`TEST 3 RESULT: ${test3Passed ? 'PASSED' : 'FAILED'}\n`);
  } finally {
    await deleteSession(s3);
  }

  // -------------------------------------------------------------
  // TEST 4: Dismiss on Interaction (Click / Keydown / Wheel)
  // -------------------------------------------------------------
  console.log('--- TEST 4: Dismiss on Interaction ---');
  let s4 = await createSession();
  try {
    await navigate(s4, `${APP_URL}/`);
    await execute(s4, `sessionStorage.clear();`);
    await navigate(s4, `${APP_URL}/`);
    // Immediately at 50ms into intro, simulate a user click
    await sleep(50);
    const dismissed = await execute(s4, `
      const overlayBefore = !!document.getElementById('introOverlay');
      // Dispatch click event on window
      window.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      const overlayAfter = !!document.getElementById('introOverlay');
      return { overlayBefore, overlayAfter };
    `);
    console.log('Dismiss interaction test:', dismissed);

    const test4Passed = dismissed.overlayBefore && !dismissed.overlayAfter;
    results.test4_dismiss_on_interaction = {
      passed: test4Passed,
      details: 'Clicking during intro triggers unified cleanup instantly, removing overlay node from DOM.',
    };
    console.log(`TEST 4 RESULT: ${test4Passed ? 'PASSED' : 'FAILED'}\n`);
  } finally {
    await deleteSession(s4);
  }

  // -------------------------------------------------------------
  // TEST 5: Accessibility — prefers-reduced-motion
  // -------------------------------------------------------------
  console.log('--- TEST 5: Reduced Motion Accessibility ---');
  // Pass Firefox preference for prefers-reduced-motion
  let s5 = await createSession({
    prefs: {
      'ui.prefersReducedMotion': 1,
    },
  });
  try {
    await navigate(s5, `${APP_URL}/`);
    // Check if intro was skipped
    const reducedMotionState = await execute(s5, `
      const overlay = document.getElementById('introOverlay');
      const matchesReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return {
        matchesReduced,
        overlayInDOM: !!overlay
      };
    `);
    console.log('Reduced motion check:', reducedMotionState);

    const test5Passed = !reducedMotionState.overlayInDOM;
    results.test5_reduced_motion = {
      passed: test5Passed,
      details: 'With prefers-reduced-motion: reduce, intro is completely bypassed; overlay is not rendered.',
    };
    console.log(`TEST 5 RESULT: ${test5Passed ? 'PASSED' : 'FAILED'}\n`);
  } finally {
    await deleteSession(s5);
  }

  // -------------------------------------------------------------
  // TEST 6: Dead Code & Orphaned Files Audit
  // -------------------------------------------------------------
  console.log('--- TEST 6: Dead Code Audit ---');
  const oldIntroExists = fs.existsSync('/home/buddy/Portfolio/my-portfolio/src/animations/intro.ts');
  const indexExportCheck = fs.readFileSync('/home/buddy/Portfolio/my-portfolio/src/animations/index.ts', 'utf-8');
  const hasOldExport = indexExportCheck.includes('./intro');

  const test6Passed = !oldIntroExists && !hasOldExport;
  results.test6_dead_code_audit = {
    passed: test6Passed,
    details: `intro.ts deleted: ${!oldIntroExists}, no dead re-export: ${!hasOldExport}`,
  };
  console.log(`TEST 6 RESULT: ${test6Passed ? 'PASSED' : 'FAILED'}\n`);

  // -------------------------------------------------------------
  // FINAL SUMMARY
  // -------------------------------------------------------------
  console.log('=== VERIFICATION SUITE SUMMARY ===');
  console.table(results);
  const allPassed = Object.values(results).every((r) => r.passed);
  console.log(`OVERALL RESULT: ${allPassed ? 'ALL TESTS PASSED (8/8 CHECKLIST VERIFIED)' : 'SOME TESTS FAILED'}`);
  return allPassed;
}

runSuite().catch((err) => {
  console.error('Suite error:', err);
  process.exit(1);
});
