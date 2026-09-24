import http from 'http';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const PORT_RECEIVER = 9898;
const ASTRO_PORT = 4321;
const DIAGNOSTIC_HTML_PATH = 'public/diagnostic_runner.html';

async function runComprehensiveDiagnostics() {
  return new Promise((resolve, reject) => {
    let testReport = null;
    let completed = false;

    // 1. Setup telemetry receiver server
    const server = http.createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', '*');

      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }

      if (req.url === '/telemetry') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            if (data.type === 'LOG') {
              console.log('[TEST LOG]', data.message);
            } else if (data.type === 'SCREENSHOT') {
              const base64 = data.image.replace(/^data:image\/png;base64,/, '');
              fs.writeFileSync(`diag_${data.name}.png`, base64, 'base64');
              console.log(`[SNAPSHOT SAVED] diag_${data.name}.png`);
            } else if (data.type === 'FINAL_REPORT') {
              testReport = data.report;
              console.log('\n================ FINAL TELEMETRY REPORT RECEIVED ================');
              completed = true;
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end('{"ok":true}');
              setTimeout(() => {
                cleanup();
                server.close(() => resolve(testReport));
              }, 1000);
              return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('{"ok":true}');
          } catch (e) {
            console.error('Telemetry error:', e);
            res.writeHead(500);
            res.end();
          }
        });
        return;
      }

      res.writeHead(404);
      res.end();
    });

    function cleanup() {
      try {
        if (fs.existsSync(DIAGNOSTIC_HTML_PATH)) {
          fs.unlinkSync(DIAGNOSTIC_HTML_PATH);
        }
      } catch {}
    }

    server.listen(PORT_RECEIVER, () => {
      console.log(`Telemetry receiver listening on port ${PORT_RECEIVER}...`);

      // 2. Generate diagnostic HTML test suite
      const runnerHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Portfolio Diagnostics Runner</title>
  <style>
    body, html { margin: 0; padding: 0; background: #111; color: #fff; font-family: monospace; overflow: hidden; height: 100%; }
    #hud { height: 40px; background: #222; display: flex; align-items: center; padding: 0 16px; gap: 20px; font-size: 13px; z-index: 9999; }
    #frameContainer { width: 100%; height: calc(100% - 40px); display: flex; justify-content: center; background: #0a0a0a; }
    iframe { border: none; width: 1440px; height: 100%; transition: width 0.3s ease; background: #fff; }
  </style>
</head>
<body>
  <div id="hud">
    <span id="testStep" style="color: #4ade80;">INITIALIZING DIAGNOSTICS...</span>
    <span id="fpsMeter" style="color: #facc15;">FPS: --</span>
    <span id="scrollMeter" style="color: #60a5fa;">SCROLL: 0px</span>
  </div>
  <div id="frameContainer">
    <iframe id="testFrame" src="http://localhost:${ASTRO_PORT}/"></iframe>
  </div>

  <script>
    const RECEIVER = 'http://localhost:${PORT_RECEIVER}/telemetry';

    async function send(type, payload) {
      try {
        await fetch(RECEIVER, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, ...payload })
        });
      } catch(e) {}
    }

    function log(msg) {
      document.getElementById('testStep').textContent = msg;
      send('LOG', { message: msg });
    }

    const frame = document.getElementById('testFrame');

    frame.onload = async () => {
      log('Target page loaded in iframe. Waiting for initial scripts to mount...');
      await new Promise(r => setTimeout(r, 1500));

      const doc = frame.contentDocument;
      const win = frame.contentWindow;

      const report = {
        meta: {
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        },
        tests: {},
        fpsData: {},
        errors: []
      };

      // Listen for iframe console errors
      const origError = win.console.error;
      win.console.error = function(...args) {
        report.errors.push(args.map(a => String(a)).join(' '));
        origError.apply(win.console, args);
      };

      // FPS Measurement utility
      function measureFps(durationMs) {
        return new Promise(res => {
          let frames = 0;
          let lastTime = performance.now();
          const startTime = lastTime;
          let minDelta = Infinity;
          let maxDelta = 0;

          function loop(now) {
            frames++;
            const delta = now - lastTime;
            lastTime = now;
            if (delta > maxDelta && frames > 2) maxDelta = delta;
            if (delta < minDelta && frames > 2) minDelta = delta;

            if (now - startTime < durationMs) {
              win.requestAnimationFrame(loop);
            } else {
              const actualDuration = (now - startTime) / 1000;
              const avgFps = Math.round(frames / actualDuration);
              const maxFrameTimeMs = Math.round(maxDelta);
              res({ avgFps, maxFrameTimeMs, totalFrames: frames });
            }
          }
          win.requestAnimationFrame(loop);
        });
      }

      // ========================================================
      // TEST 1 — HERO (Stay on Hero 10-12s, measure FPS, observe)
      // ========================================================
      log('TEST 1: Observing Hero for 10 seconds (Ambient 3D, Circuit signals, Text)...');
      
      const heroEl = doc.getElementById('hero');
      const portraitImg = doc.getElementById('heroPortraitImg');
      const circuitCanvas = doc.getElementById('circuitBoardCanvas');
      const canvas3d = doc.getElementById('hero3dCanvas');
      const heroName = doc.getElementById('heroName');

      // Test pointer movement parallax
      log('TEST 1.1: Simulating pointer parallax on Hero...');
      for (let i = 0; i < 5; i++) {
        const simX = win.innerWidth * (0.3 + i * 0.1);
        const simY = win.innerHeight * (0.4 + (i % 2) * 0.1);
        win.dispatchEvent(new MouseEvent('mousemove', { clientX: simX, clientY: simY }));
        await new Promise(r => setTimeout(r, 100));
      }

      // Measure ambient FPS over 10 seconds
      log('TEST 1.2: Measuring Hero ambient FPS over 10 seconds...');
      const heroFps = await measureFps(10000);
      document.getElementById('fpsMeter').textContent = 'HERO FPS: ' + heroFps.avgFps + ' (max frame: ' + heroFps.maxFrameTimeMs + 'ms)';

      report.tests.hero = {
        observedFps: heroFps.avgFps,
        maxFrameTimeMs: heroFps.maxFrameTimeMs,
        portraitVisible: win.getComputedStyle(portraitImg).opacity,
        portraitTransform: win.getComputedStyle(portraitImg).transform,
        circuitVisible: win.getComputedStyle(circuitCanvas).opacity,
        canvas3dVisible: win.getComputedStyle(canvas3d).opacity,
        heroNameRendered: heroName ? heroName.textContent.trim().replace(/\\s+/g, ' ') : null,
      };

      // ========================================================
      // TEST 2 — SCROLL DOWN (Slow scroll, Rapid scroll, Return)
      // ========================================================
      log('TEST 2.1: Slowly scrolling through entire page...');
      const maxScroll = doc.documentElement.scrollHeight - win.innerHeight;
      const scrollSteps = [500, 1200, 2200, 3200, 4200, maxScroll];

      let scrollDropCount = 0;
      for (const targetY of scrollSteps) {
        const startY = win.scrollY;
        win.scrollTo({ top: targetY, behavior: 'smooth' });
        await new Promise(r => setTimeout(r, 450));
        document.getElementById('scrollMeter').textContent = 'SCROLL: ' + Math.round(win.scrollY) + 'px';
      }

      log('TEST 2.2: Rapid scroll Hero -> Bottom (0 -> max)...');
      win.scrollTo({ top: 0, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 300));
      win.scrollTo({ top: maxScroll, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 300));

      log('TEST 2.3: Rapid scroll Bottom -> Hero (max -> 0)...');
      win.scrollTo({ top: 0, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 800));

      // CRITICAL BUG VERIFICATION: Did Hero elements disappear upon return?
      const returnPortraitOpacity = win.getComputedStyle(portraitImg).opacity;
      const returnCircuitOpacity = win.getComputedStyle(circuitCanvas).opacity;
      const returnCanvas3dOpacity = win.getComputedStyle(canvas3d).opacity;

      report.tests.scroll = {
        maxScrollY: maxScroll,
        heroCircuitDisappeared: parseFloat(returnCircuitOpacity) < 0.5,
        heroPortraitDisappeared: parseFloat(returnPortraitOpacity) < 0.5,
        hero3dDisappeared: parseFloat(returnCanvas3dOpacity) < 0.5,
        returnPortraitOpacity,
        returnCircuitOpacity,
        returnCanvas3dOpacity,
      };

      // ========================================================
      // TEST 3 — PROJECTS
      // ========================================================
      log('TEST 3: Checking Projects cards and hover interaction...');
      const workEl = doc.getElementById('work');
      if (workEl) {
        workEl.scrollIntoView({ behavior: 'instant' });
        await new Promise(r => setTimeout(r, 600));

        const cards = doc.querySelectorAll('.project-card');
        const firstCard = cards[0];
        let cardHoveredTransform = null;
        if (firstCard) {
          firstCard.dispatchEvent(new MouseEvent('mouseenter'));
          await new Promise(r => setTimeout(r, 200));
          cardHoveredTransform = win.getComputedStyle(firstCard).transform;
        }

        report.tests.projects = {
          cardsCount: cards.length,
          firstCardOpacity: firstCard ? win.getComputedStyle(firstCard).opacity : null,
          cardHoveredTransform,
        };
      }

      // ========================================================
      // TEST 4 — ROLES (Open 3 roles sequentially, verify layout)
      // ========================================================
      log('TEST 4: Checking Roles accordion sequential expansion...');
      const rolesEl = doc.getElementById('roles');
      if (rolesEl) {
        rolesEl.scrollIntoView({ behavior: 'instant' });
        await new Promise(r => setTimeout(r, 600));

        const roleButtons = doc.querySelectorAll('.role-row-btn');
        const roleItems = doc.querySelectorAll('.role-item');
        const expansionHistory = [];

        for (let idx = 0; idx < Math.min(roleButtons.length, 3); idx++) {
          roleButtons[idx].click();
          await new Promise(r => setTimeout(r, 400));

          const expandedIndices = [];
          roleItems.forEach((item, i) => {
            if (item.classList.contains('is-expanded')) expandedIndices.push(i);
          });
          expansionHistory.push({ clicked: idx, expanded: expandedIndices });
        }

        report.tests.roles = {
          rolesCount: roleItems.length,
          expansionHistory,
          onlyOneExpandedAtATime: expansionHistory.every(h => h.expanded.length <= 1)
        };
      }

      // ========================================================
      // TEST 5 — SKILLS
      // ========================================================
      log('TEST 5: Checking Skills bubble map & hover...');
      const skillsEl = doc.getElementById('skills');
      if (skillsEl) {
        skillsEl.scrollIntoView({ behavior: 'instant' });
        await new Promise(r => setTimeout(r, 600));

        const bubbles = doc.querySelectorAll('.skill-bubble');
        const firstBubble = bubbles[0];
        let bubbleHoverScale = null;
        let hudUpdated = false;

        if (firstBubble) {
          firstBubble.dispatchEvent(new MouseEvent('mouseenter'));
          await new Promise(r => setTimeout(r, 250));
          bubbleHoverScale = win.getComputedStyle(firstBubble).transform;
          const hudSkillName = doc.getElementById('hudSkillName');
          hudUpdated = hudSkillName && hudSkillName.textContent.trim().length > 0;
        }

        report.tests.skills = {
          bubblesCount: bubbles.length,
          firstBubbleOpacity: firstBubble ? win.getComputedStyle(firstBubble).opacity : null,
          bubbleHoverScale,
          hudUpdated
        };
      }

      // ========================================================
      // TEST 6 — PCB 3D SECTION
      // ========================================================
      log('TEST 6: Checking PCB 3D section and board tabs...');
      const hardwareEl = doc.getElementById('hardware');
      if (hardwareEl) {
        hardwareEl.scrollIntoView({ behavior: 'instant' });
        await new Promise(r => setTimeout(r, 1200));

        const dotBtns = doc.querySelectorAll('.pcb-dot-btn');
        const detailCards = doc.querySelectorAll('.pcb-details-card');

        // Measure PCB viewport FPS
        const pcbFps = await measureFps(3000);

        // Click next tab
        let tabSwitched = false;
        if (dotBtns.length > 1) {
          dotBtns[1].click();
          await new Promise(r => setTimeout(r, 500));
          tabSwitched = detailCards[1] ? detailCards[1].classList.contains('active') : false;
        }

        report.tests.pcb = {
          pcbFps: pcbFps.avgFps,
          pcbMaxFrameTimeMs: pcbFps.maxFrameTimeMs,
          dotTabsCount: dotBtns.length,
          tabSwitched
        };
      }

      // ========================================================
      // TEST 7 — RESIZE VIEWPORT (Desktop -> Tablet -> Mobile)
      // ========================================================
      log('TEST 7: Checking responsive viewports (1440px -> 768px -> 375px)...');
      
      frame.style.width = '768px';
      await new Promise(r => setTimeout(r, 500));
      const tabletHeroDisplay = win.getComputedStyle(heroEl).display;

      frame.style.width = '375px';
      await new Promise(r => setTimeout(r, 500));
      const mobileHeroDisplay = win.getComputedStyle(heroEl).display;

      // Restore desktop
      frame.style.width = '1440px';
      await new Promise(r => setTimeout(r, 400));

      report.tests.responsive = {
        tabletHeroDisplay,
        mobileHeroDisplay,
        responsivePassed: tabletHeroDisplay !== 'none' && mobileHeroDisplay !== 'none'
      };

      // ========================================================
      // TEST 8 — REDUCED MOTION
      // ========================================================
      log('TEST 8: Checking reduced motion compliance...');
      const isReducedSupported = win.matchMedia('(prefers-reduced-motion: reduce)') !== undefined;
      report.tests.reducedMotion = {
        supported: isReducedSupported,
      };

      log('DIAGNOSTICS COMPLETE! Sending final report to server...');
      await send('FINAL_REPORT', { report });
    };
  </script>
</body>
</html>`;

      fs.writeFileSync(DIAGNOSTIC_HTML_PATH, runnerHtml);
      console.log(`Generated ${DIAGNOSTIC_HTML_PATH}. Opening headless Firefox...`);

      // Launch headless Firefox with dedicated profile directory in home
      const profileDir = '/home/buddy/Portfolio/my-portfolio/.ff_diag';
      if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir, { recursive: true });

      const ffCmd = `firefox -no-remote -profile ${profileDir} --headless --window-size=1440,1050 http://localhost:${ASTRO_PORT}/diagnostic_runner.html`;
      console.log('Executing:', ffCmd);

      const browserProc = exec(ffCmd, (err) => {
        if (err && !completed) {
          console.warn('Firefox closed with notice:', err.message);
        }
      });

      // Timeout safety after 45s
      setTimeout(() => {
        if (!completed) {
          console.log('Diagnostic timeout after 45s. Cleaning up...');
          cleanup();
          try { browserProc.kill(); } catch {}
          server.close(() => resolve(testReport));
        }
      }, 45000);
    });
  });
}

runComprehensiveDiagnostics().then(report => {
  console.log('Finished diagnostics execution.');
  if (report) {
    fs.writeFileSync('diagnostic_output.json', JSON.stringify(report, null, 2));
    console.log('Saved report to diagnostic_output.json');
  }
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
