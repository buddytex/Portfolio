import http from 'http';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

async function verifyLive() {
  return new Promise((resolve, reject) => {
    let saved = false;

    const server = http.createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
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
          console.log('[BROWSER LOG]', body);
          res.writeHead(200);
          res.end('ok');
        });
        return;
      }

      if (req.url === '/save') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const base64Data = data.image.replace(/^data:image\/png;base64,/, '');
            const outPath = '/home/buddy/Portfolio/my-portfolio/pcb_live_verified.png';
            fs.writeFileSync(outPath, base64Data, 'base64');
            console.log('✓ Successfully saved PCB verification capture to:', outPath);
            saved = true;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('{"ok":true}');
            setTimeout(() => {
              cleanup();
              server.close(() => resolve(true));
            }, 500);
          } catch (e) {
            console.error('Save error:', e);
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
        if (fs.existsSync('public/pcb_live_test.html')) fs.unlinkSync('public/pcb_live_test.html');
      } catch {}
    }

    const PORT = 9892;
    server.listen(PORT, () => {
      console.log(`Live verify server on port ${PORT}...`);

      const origHtml = fs.readFileSync('dist/index.html', 'utf8');

      const inject = `
      <style>
        #hero, #roles, #work, #skills { display: none !important; }
        .datum-spine-wrap { display: none !important; }
        header.nav { display: none !important; }
        #hardware { padding-top: 10px !important; }
      </style>
      <script>
        function log(msg) {
          fetch('http://localhost:9892/log', {
            method: 'POST',
            body: String(msg)
          }).catch(() => {});
        }

        window.addEventListener('DOMContentLoaded', () => {
          log('DOM ready, checking for 3D PCB...');
          let count = 0;
          const interval = setInterval(() => {
            count++;
            const hardware = document.getElementById('hardware');
            const canvases = hardware ? hardware.querySelectorAll('canvas') : [];
            let targetCanvas = null;
            for (const c of canvases) {
              if (c.width > 200 && c.height > 200) {
                targetCanvas = c;
                break;
              }
            }

            if (targetCanvas) {
              clearInterval(interval);
              log('Target canvas found: ' + targetCanvas.width + 'x' + targetCanvas.height);
              setTimeout(() => {
                try {
                  const dataUrl = targetCanvas.toDataURL('image/png');
                  fetch('http://localhost:9892/save', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ image: dataUrl })
                  }).then(() => log('Data sent to server!'))
                    .catch(e => log('Fetch error: ' + e.message));
                } catch(e) {
                  log('toDataURL error: ' + e.message);
                }
              }, 2500);
            } else if (count > 25) {
              clearInterval(interval);
              log('Timeout: no canvas found');
            }
          }, 500);
        });
      </script>
      `;

      fs.writeFileSync('dist/pcb_live_test.html', origHtml.replace('<head>', '<head>' + inject));

      const ffCmd = 'firefox -no-remote -P temp_profile_test --headless --window-size=1440,1000 http://localhost:4322/pcb_live_test.html';
      console.log('Launching headless Firefox on port 4322...');
      exec(ffCmd, (err) => {
        if (err && !saved) {
          console.warn('Firefox exited:', err.message);
        }
      });

      setTimeout(() => {
        if (!saved) {
          console.log('Timeout waiting for capture.');
          cleanup();
          server.close(() => resolve(false));
        }
      }, 25000);
    });
  });
}

verifyLive().then(ok => {
  console.log('Finished. Success:', ok);
  process.exit(ok ? 0 : 1);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
