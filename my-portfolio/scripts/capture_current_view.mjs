import http from 'http';
import { exec } from 'child_process';
import fs from 'fs';

async function testCurrent() {
  return new Promise((resolve) => {
    let done = false;

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
          console.log('[BROWSER]', body);
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
            fs.writeFileSync('/home/buddy/Portfolio/my-portfolio/current_pcb_3d_shot.png', base64Data, 'base64');
            console.log('✓ SUCCESS! Saved current_pcb_3d_shot.png');
            done = true;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('{"ok":true}');
            setTimeout(() => {
              server.close(() => resolve(true));
            }, 500);
          } catch(e) {
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

    const PORT = 9890;
    server.listen(PORT, () => {
      console.log('Server on 9890...');

      const origHtml = fs.readFileSync('dist/index.html', 'utf8');

      const inject = `
      <style>
        #hero, #roles, #work, #skills { display: none !important; }
        .datum-spine-wrap { display: none !important; }
        header.nav { display: none !important; }
        #hardware { padding-top: 10px !important; }
      </style>
      <script>
        function log(m) {
          fetch('http://localhost:9890/log', { method: 'POST', body: String(m) }).catch(()=>{});
        }

        window.addEventListener('DOMContentLoaded', () => {
          log('DOM Loaded. Searching for PCB 3D canvas...');
          let tries = 0;
          const intv = setInterval(() => {
            tries++;
            const hardware = document.getElementById('hardware');
            const canvases = hardware ? hardware.querySelectorAll('canvas') : [];
            log('Try ' + tries + ': canvases in #hardware = ' + canvases.length);
            for (const c of canvases) {
              log('Canvas size: ' + c.width + 'x' + c.height);
              if (c.width > 200 && c.height > 200) {
                clearInterval(intv);
                log('Valid canvas found! Waiting 2s for render...');
                setTimeout(() => {
                  try {
                    const dataUrl = c.toDataURL('image/png');
                    fetch('http://localhost:9890/save', {
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({ image: dataUrl })
                    }).then(() => log('Frame sent!'));
                  } catch(e) {
                    log('Canvas error: ' + e.message);
                  }
                }, 2000);
                return;
              }
            }

            if (tries > 25) {
              clearInterval(intv);
              log('Timeout: no canvas reached >200x200');
            }
          }, 500);
        });
      </script>
      `;

      fs.writeFileSync('dist/test_snap.html', origHtml.replace('<head>', '<head>' + inject));

      const ffCmd = 'firefox -no-remote -P temp_pcb --headless --window-size=1440,1000 http://localhost:4322/test_snap.html';
      console.log('Launching Firefox...');
      exec(ffCmd, (err) => {
        if (err && !done) console.warn('Firefox exited:', err.message);
      });

      setTimeout(() => {
        if (!done) {
          console.log('Capture timed out after 30s');
          server.close(() => resolve(false));
        }
      }, 30000);
    });
  });
}

testCurrent().then(ok => {
  console.log('Done:', ok);
  process.exit(ok ? 0 : 1);
});
