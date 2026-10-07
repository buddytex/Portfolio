import http from 'http';
import { exec } from 'child_process';
import fs from 'fs';

const PORT_RECEIVER = 9988;
const ASTRO_PORT = 4321;
const RUNNER_FILE = 'public/audit_runner.html';

async function runMobileAudit() {
  return new Promise((resolve) => {
    let completed = false;

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
            console.log('\n================ AUDIT REPORT ================');
            console.log(JSON.stringify(data, null, 2));
            completed = true;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('{"ok":true}');
            setTimeout(() => {
              cleanup();
              server.close(() => resolve(data));
            }, 1000);
          } catch (e) {
            console.error('Report parse error:', e);
            res.writeHead(500);
            res.end();
          }
        });
        return;
      }

      if (req.url === '/log') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
          console.log('[BROWSER LOG]', body);
          res.writeHead(200);
          res.end('ok');
        });
        return;
      }

      res.writeHead(404);
      res.end();
    });

    function cleanup() {
      try {
        if (fs.existsSync(RUNNER_FILE)) fs.unlinkSync(RUNNER_FILE);
      } catch {}
    }

    server.listen(PORT_RECEIVER, () => {
      console.log(`Mobile Audit Receiver running on ${PORT_RECEIVER}...`);

      const viewports = [320, 360, 375, 390, 414, 430, 768, 1024, 1366, 1440];

      const runnerHtml = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Audit</title>
<style>
  body, html { margin:0; padding:0; background:#000; overflow:hidden; }
  #frame { border:none; height:100vh; background:#fff; margin:0 auto; display:block; }
</style>
</head>
<body>
<iframe id="frame" src="http://localhost:${ASTRO_PORT}/?introPreview=false"></iframe>
<script>
  const RECEIVER = 'http://localhost:${PORT_RECEIVER}';
  function log(m) {
    fetch(RECEIVER + '/log', { method: 'POST', body: String(m) }).catch(()=>{});
  }

  const frame = document.getElementById('frame');
  const viewports = ${JSON.stringify(viewports)};

  frame.onload = async () => {
    log('Iframe loaded. Waiting for intro overlay to finish or remove it...');
    await new Promise(r => setTimeout(r, 2600));

    const win = frame.contentWindow;
    const doc = frame.contentDocument;

    // Remove intro overlay if still present
    const intro = doc.getElementById('introOverlay');
    if (intro) intro.remove();

    const results = {};

    for (const vp of viewports) {
      log('Testing viewport ' + vp + 'px...');
      frame.style.width = vp + 'px';
      // Trigger resize in iframe
      win.dispatchEvent(new Event('resize'));
      await new Promise(r => setTimeout(r, 600));

      const docEl = doc.documentElement;
      const body = doc.body;
      const scrollW = docEl.scrollWidth;
      const clientW = docEl.clientWidth;
      const hasOverflow = scrollW > vp;

      const overflowingElements = [];
      const allEls = doc.querySelectorAll('*');
      for (const el of allEls) {
        // Skip hidden or script/style/svg path
        if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.tagName === 'path') continue;
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.right > vp + 1.5) {
          overflowingElements.push({
            tag: el.tagName,
            id: el.id || '',
            cls: (el.className && typeof el.className === 'string') ? el.className.slice(0, 60) : '',
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            diff: Math.round(rect.right - vp),
            snippet: el.outerHTML.slice(0, 100).replace(/\\n/g, '')
          });
        }
      }

      // Check section bounding boxes
      const sections = ['hero', 'roles', 'work', 'experience', 'focus', 'skills', 'hardware', 'beyond', 'contact'];
      const sectionInfo = {};
      for (const sId of sections) {
        const sec = doc.getElementById(sId);
        if (sec) {
          const r = sec.getBoundingClientRect();
          sectionInfo[sId] = {
            width: Math.round(r.width),
            scrollWidth: sec.scrollWidth,
            hasInnerOverflow: sec.scrollWidth > vp
          };
        }
      }

      // Check navigation
      const navToggle = doc.getElementById('navToggle');
      const mobileDrawer = doc.getElementById('mobileDrawer');
      const navToggleVisible = navToggle ? getComputedStyle(navToggle).display !== 'none' : false;

      results[vp] = {
        viewportWidth: vp,
        scrollWidth,
        clientWidth: clientW,
        hasOverflow,
        overflowDelta: scrollW - vp,
        overflowingElementsCount: overflowingElements.length,
        topOverflowingElements: overflowingElements.slice(0, 8),
        sectionInfo,
        navToggleVisible
      };
    }

    // Send final report
    fetch(RECEIVER + '/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(results)
    }).catch(()=>{});
  };
</script>
</body>
</html>`;

      fs.writeFileSync(RUNNER_FILE, runnerHtml);

      const ffCmd = `firefox -no-remote -P "audit_prof" --headless --window-size=1600,1000 "http://localhost:${ASTRO_PORT}/audit_runner.html"`;
      console.log('Launching Firefox runner...');
      exec(ffCmd, (err) => {
        if (err && !completed) console.log('Firefox process note:', err.message);
      });

      setTimeout(() => {
        if (!completed) {
          console.log('Audit timed out after 35s');
          cleanup();
          server.close(() => resolve(null));
        }
      }, 35000);
    });
  });
}

runMobileAudit().then(() => {
  process.exit(0);
});
