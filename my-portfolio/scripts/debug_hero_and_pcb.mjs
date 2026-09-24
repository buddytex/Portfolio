import http from 'http';
import { exec } from 'child_process';
import fs from 'fs';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/log') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      console.log('[DEBUG LOG]', body);
      res.writeHead(200);
      res.end('ok');
    });
    return;
  }

  if (req.url === '/save_pcb') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const b64 = body.replace(/^data:image\/png;base64,/, '');
      fs.writeFileSync('pcb_live_verified.png', b64, 'base64');
      console.log('✓ Successfully wrote pcb_live_verified.png (bytes:', b64.length, ')');
      res.writeHead(200);
      res.end('ok');
    });
    return;
  }

  if (req.url === '/done') {
    res.writeHead(200);
    res.end('ok');
    setTimeout(() => {
      server.close();
      process.exit(0);
    }, 500);
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(9876, () => {
  console.log('Debug test server listening on 9876...');

  const html = fs.readFileSync('dist/index.html', 'utf8');
  const inject = `
  <script>
    async function log(msg) {
      console.log(msg);
      await fetch('http://localhost:9876/log', {
        method: 'POST',
        body: JSON.stringify(msg)
      }).catch(() => {});
    }

    window.addEventListener('DOMContentLoaded', async () => {
      await new Promise(r => setTimeout(r, 1200));

      const portrait = document.getElementById('heroPortraitImg');
      const canvas = document.getElementById('circuitBoardCanvas');
      const canvas3d = document.getElementById('hero3dCanvas');

      function getState(stage) {
        return {
          stage,
          scrollY: window.scrollY,
          portraitOpacity: portrait ? window.getComputedStyle(portrait).opacity : 'missing',
          portraitTransform: portrait ? window.getComputedStyle(portrait).transform : 'missing',
          circuitOpacity: canvas ? window.getComputedStyle(canvas).opacity : 'missing',
          canvas3dOpacity: canvas3d ? window.getComputedStyle(canvas3d).opacity : 'missing',
        };
      }

      await log(getState('INITIAL LOAD'));

      // Scroll down past hero (e.g. 1200px)
      window.scrollTo(0, 1200);
      await new Promise(r => setTimeout(r, 1000));
      await log(getState('AFTER SCROLL DOWN 1200px'));

      // Scroll back to top (hero)
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 1000));
      await log(getState('AFTER SCROLL BACK TO 0px'));

      // Scroll down again
      window.scrollTo(0, 1500);
      await new Promise(r => setTimeout(r, 1000));
      await log(getState('AFTER SCROLL DOWN AGAIN 1500px'));

      // Scroll back up to hero
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 1000));
      await log(getState('AFTER SCROLL BACK AGAIN 0px'));

      // Check PCB section
      const pcbCanvas = document.querySelector('#hardware canvas');
      const pcbLoading = document.querySelector('.gerber-viewer-container');
      let dataUrl = null;
      if (pcbCanvas) {
        try {
          dataUrl = pcbCanvas.toDataURL('image/png');
        } catch (e) {}
      }

      await log({
        pcbCanvasFound: !!pcbCanvas,
        pcbCanvasWidth: pcbCanvas ? pcbCanvas.width : 0,
        pcbCanvasHeight: pcbCanvas ? pcbCanvas.height : 0,
        pcbViewerFound: !!pcbLoading,
        hasImage: !!dataUrl,
      });

      if (dataUrl) {
        await fetch('http://localhost:9876/save_pcb', {
          method: 'POST',
          body: dataUrl,
        }).catch(() => {});
      }

      await fetch('http://localhost:9876/done', { method: 'POST' }).catch(() => {});
    });
  </script>
  `;

  fs.writeFileSync('dist/debug_test.html', html.replace('<head>', '<head>' + inject));

  const cmd = 'firefox -no-remote -P temp_profile_test --headless http://localhost:4322/debug_test.html';
  exec(cmd, (err) => {
    if (err) console.error('Firefox run error:', err.message);
  });
});
