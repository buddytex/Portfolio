import http from 'http';
import { exec } from 'child_process';
import fs from 'fs';

async function runAudit() {
  return new Promise((resolve, reject) => {
    let completed = false;
    const testResults = [];

    const server = http.createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', '*');

      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }

      if (req.url === '/report') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            testResults.push(data);
            console.log('[TEST REPORT]', JSON.stringify(data, null, 2));

            if (data.final) {
              completed = true;
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end('{"ok":true}');
              setTimeout(() => {
                server.close(() => resolve(testResults));
              }, 500);
            } else {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end('{"ok":true}');
            }
          } catch (e) {
            console.error('Report parse error:', e);
            res.writeHead(500);
            res.end();
          }
        });
        return;
      }

      res.writeHead(404);
      res.end();
    });

    const PORT = 9893;
    server.listen(PORT, () => {
      console.log(`Audit test receiver on port ${PORT}...`);

      const injectScript = `
      <script>
        async function sendReport(data) {
          try {
            await fetch('http://localhost:9893/report', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
          } catch(e) {}
        }

        window.addEventListener('DOMContentLoaded', async () => {
          // Wait for initial hero animation to settle
          await new Promise(r => setTimeout(r, 1200));

          const portraitImg = document.getElementById('heroPortraitImg');
          const circuitCanvas = document.getElementById('circuitBoardCanvas');
          const canvas3d = document.getElementById('hero3dCanvas');
          const heroName = document.getElementById('heroName');

          const initialHeroState = {
            test: '01_initial_hero_state',
            portraitOpacity: window.getComputedStyle(portraitImg).opacity,
            circuitOpacity: window.getComputedStyle(circuitCanvas).opacity,
            canvas3dOpacity: window.getComputedStyle(canvas3d).opacity,
            heroNameText: heroName ? heroName.textContent.trim().replace(/\\s+/g, ' ') : null,
          };
          await sendReport(initialHeroState);

          // 2. Scroll deep past hero to Roles and Projects
          window.scrollTo({ top: 1800, behavior: 'instant' });
          await new Promise(r => setTimeout(r, 600));

          const scrolledDownState = {
            test: '02_scrolled_down_state',
            scrollY: window.scrollY,
            portraitOpacity: window.getComputedStyle(portraitImg).opacity,
            circuitOpacity: window.getComputedStyle(circuitCanvas).opacity,
          };
          await sendReport(scrolledDownState);

          // 3. Scroll deep to Skills and PCB
          window.scrollTo({ top: 3800, behavior: 'instant' });
          await new Promise(r => setTimeout(r, 600));

          // 4. Test Roles Accordion
          const firstRoleBtn = document.querySelector('.role-row-btn');
          const firstRoleItem = document.querySelector('.role-item');
          let roleExpanded = false;
          if (firstRoleBtn) {
            firstRoleBtn.click();
            await new Promise(r => setTimeout(r, 450));
            roleExpanded = firstRoleItem ? firstRoleItem.classList.contains('is-expanded') : false;
          }

          // 5. Scroll ALL THE WAY BACK TO HERO
          window.scrollTo({ top: 0, behavior: 'instant' });
          await new Promise(r => setTimeout(r, 900));

          const heroReturnedState = {
            test: '03_hero_returned_state',
            scrollY: window.scrollY,
            portraitOpacity: window.getComputedStyle(portraitImg).opacity,
            circuitOpacity: window.getComputedStyle(circuitCanvas).opacity,
            canvas3dOpacity: window.getComputedStyle(canvas3d).opacity,
            portraitTransform: window.getComputedStyle(portraitImg).transform,
            roleExpanded,
            final: true
          };
          await sendReport(heroReturnedState);
        });
      </script>
      `;

      // Read built index.html and inject test harness
      const indexHtml = fs.readFileSync('dist/index.html', 'utf8');
      fs.writeFileSync('dist/audit_test.html', indexHtml.replace('<head>', '<head>' + injectScript));

      const ffCmd = 'firefox -no-remote -P temp_audit_profile --headless --window-size=1440,1000 http://localhost:4321/dist/audit_test.html 2>&1 || firefox -no-remote --headless --window-size=1440,1000 http://localhost:4322/audit_test.html';
      
      // Serve dist on a lightweight server if dev server doesn't serve dist directly
      const staticServer = http.createServer((sreq, sres) => {
        let filePath = 'dist' + sreq.url.split('?')[0];
        if (filePath.endsWith('/')) filePath += 'index.html';
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath);
          if (filePath.endsWith('.html')) sres.setHeader('Content-Type', 'text/html');
          else if (filePath.endsWith('.js')) sres.setHeader('Content-Type', 'application/javascript');
          else if (filePath.endsWith('.css')) sres.setHeader('Content-Type', 'text/css');
          sres.writeHead(200);
          sres.end(content);
        } else {
          sres.writeHead(404);
          sres.end();
        }
      });

      staticServer.listen(9894, () => {
        const cmd = 'firefox -no-remote -P temp_test_p --headless --window-size=1440,1000 http://localhost:9894/audit_test.html';
        console.log('Running test in headless Firefox against http://localhost:9894/audit_test.html...');
        exec(cmd, (err) => {
          if (err && !completed) {
            console.log('Browser exited:', err.message);
          }
        });

        setTimeout(() => {
          if (!completed) {
            console.log('Test timeout after 25s');
            staticServer.close();
            server.close(() => resolve(testResults));
          } else {
            staticServer.close();
          }
        }, 25000);
      });
    });
  });
}

runAudit().then(results => {
  console.log('Audit completed with results count:', results.length);
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
