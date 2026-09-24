import http from 'http';
import { exec } from 'child_process';
import fs from 'fs';

export async function captureFrame(outputFile = 'hero_composite_current.png') {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', '*');
      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }
      if (req.url === '/composite' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            const base64Data = data.image.replace(/^data:image\/png;base64,/, '');
            fs.writeFileSync(outputFile, base64Data, 'base64');
            console.log(`Saved ${outputFile} successfully!`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('{"ok":true}');
            server.close(() => resolve(outputFile));
          } catch (e) {
            reject(e);
          }
        });
        return;
      }
      res.writeHead(404);
      res.end();
    });

    const PORT = 9884;
    server.listen(PORT, () => {
      console.log(`Composite receiver listening on port ${PORT}`);
      
      // Inject capture script into dist/capture.html
      const origHtml = fs.readFileSync('dist/index.html', 'utf8');
      const captureScript = `
      <script>
        window.addEventListener('DOMContentLoaded', () => {
          setTimeout(async () => {
            try {
              const canvas3d = document.getElementById('hero3dCanvas');
              const portraitImg = document.getElementById('heroPortraitImg');
              const pcbCanvas = document.getElementById('circuitBoardCanvas');

              const W = 1440;
              const H = 900;
              const outCanvas = document.createElement('canvas');
              outCanvas.width = W;
              outCanvas.height = H;
              const ctx = outCanvas.getContext('2d');

              // 1. Warm ivory background
              ctx.fillStyle = '#F7F5F0';
              ctx.fillRect(0, 0, W, H);

              // 2. Draw PCB Canvas
              if (pcbCanvas) {
                try {
                  ctx.drawImage(pcbCanvas, 0, 0, W, H);
                } catch(e) { console.warn('PCB draw error', e); }
              }

              // 3. Draw 3D WebGL Canvas
              if (canvas3d) {
                try {
                  const rect = canvas3d.getBoundingClientRect();
                  ctx.drawImage(canvas3d, rect.left, rect.top, rect.width, rect.height);
                } catch(e) { console.warn('3D draw error', e); }
              }

              // 4. Draw Portrait with bottom gradient fade
              if (portraitImg && portraitImg.complete) {
                const rect = portraitImg.getBoundingClientRect();
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = rect.width;
                tempCanvas.height = rect.height;
                const tCtx = tempCanvas.getContext('2d');
                tCtx.drawImage(portraitImg, 0, 0, rect.width, rect.height);
                tCtx.globalCompositeOperation = 'destination-in';
                const grad = tCtx.createLinearGradient(0, 0, 0, rect.height);
                grad.addColorStop(0, 'rgba(0,0,0,1)');
                grad.addColorStop(0.72, 'rgba(0,0,0,1)');
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                tCtx.fillStyle = grad;
                tCtx.fillRect(0, 0, rect.width, rect.height);

                ctx.drawImage(tempCanvas, rect.left, rect.top);
              }

              // 5. Draw Hero Typography, Navigation, HUD, and CTAs
              // Draw top nav
              ctx.font = '700 18px Inter, sans-serif';
              ctx.fillStyle = '#141822';
              ctx.fillText('NAVEEN.', 64, 48);

              ctx.font = '500 13px Inter, sans-serif';
              ctx.fillStyle = '#555E6D';
              ctx.fillText('Projects', 560, 48);
              ctx.fillText('Skills', 645, 48);
              ctx.fillText('PCB Lab', 710, 48);
              ctx.fillText('Contact', 785, 48);

              // Resume button
              ctx.strokeStyle = 'rgba(20,24,34,0.15)';
              ctx.strokeRoundRect(1260, 28, 90, 32, 16);
              ctx.font = '600 12px Inter, sans-serif';
              ctx.fillStyle = '#141822';
              ctx.fillText('Resume', 1284, 49);

              // Step rail on far left
              ctx.font = '700 13px JetBrains Mono, monospace';
              ctx.fillStyle = '#141822';
              ctx.fillText('01', 32, 285);
              ctx.font = '700 10px JetBrains Mono, monospace';
              ctx.fillStyle = '#141822';
              ctx.fillText('HERO', 32, 302);

              ctx.font = '600 11px JetBrains Mono, monospace';
              ctx.fillStyle = 'rgba(20,24,34,0.28)';
              ctx.fillText('02', 32, 345);
              ctx.fillText('03', 32, 390);
              ctx.fillText('04', 32, 435);
              ctx.fillText('05', 32, 480);
              ctx.fillText('06', 32, 525);

              // Eyebrow
              ctx.fillStyle = '#B8924A';
              ctx.fillRect(80, 258, 22, 4.5);
              ctx.beginPath();
              ctx.arc(108, 260.2, 3, 0, Math.PI * 2);
              ctx.fill();
              ctx.font = '700 12px JetBrains Mono, monospace';
              ctx.fillText('ROBOTICS AND AUTOMATION ENGINEER', 120, 264);

              // Name line 1: NAVEEN
              ctx.font = '800 84px Inter, sans-serif';
              ctx.fillStyle = '#141822';
              ctx.fillText('NAVEEN', 80, 350);

              // Name line 2: SHAJI GEORGE
              ctx.fillText('SHAJI ', 80, 435);
              const shajiW = ctx.measureText('SHAJI ').width;
              const goldGrad = ctx.createLinearGradient(80 + shajiW, 0, 80 + shajiW + 380, 0);
              goldGrad.addColorStop(0, '#B8924A');
              goldGrad.addColorStop(0.35, '#F5E5B8');
              goldGrad.addColorStop(0.68, '#C29B4F');
              goldGrad.addColorStop(1, '#ECD08E');
              ctx.fillStyle = goldGrad;
              ctx.fillText('GEORGE', 80 + shajiW, 435);

              // Disciplines
              ctx.font = '600 11px JetBrains Mono, monospace';
              ctx.fillStyle = '#687282';
              ctx.fillText('AUTONOMOUS SYSTEMS  ·  ROBOTICS  ·  EMBEDDED SYSTEMS  ·  PERCEPTION  ·  HARDWARE', 80, 475);

              // Button 1: Dark pill
              ctx.fillStyle = '#141822';
              ctx.beginPath();
              ctx.roundRect(80, 510, 185, 48, 24);
              ctx.fill();
              ctx.font = '600 14px Inter, sans-serif';
              ctx.fillStyle = '#FFFFFF';
              ctx.fillText('Explore Projects  ↓', 104, 539);

              // Button 2: Light pill
              ctx.fillStyle = '#FFFFFF';
              ctx.beginPath();
              ctx.roundRect(280, 510, 260, 48, 24);
              ctx.fill();
              ctx.strokeStyle = 'rgba(20,24,34,0.18)';
              ctx.stroke();
              ctx.fillStyle = '#141822';
              ctx.fillText('Inspect Engineering Evidence  →', 302, 539);

              // Top HUD badge (BUILD, EXPLORE, AUTOMATE, IMPROVE)
              const badgeX = 1200;
              const badgeY = 240;
              ctx.fillStyle = 'rgba(255,255,255,0.75)';
              ctx.strokeStyle = 'rgba(184,146,74,0.4)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.roundRect(badgeX, badgeY, 115, 110, 12);
              ctx.fill();
              ctx.stroke();
              ctx.font = '600 10px JetBrains Mono, monospace';
              const items = ['BUILD', 'EXPLORE', 'AUTOMATE', 'IMPROVE'];
              items.forEach((item, idx) => {
                ctx.fillStyle = '#B8924A';
                ctx.fillText('·', badgeX + 12, badgeY + 24 + idx * 24);
                ctx.fillStyle = '#141822';
                ctx.fillText(item, badgeX + 22, badgeY + 24 + idx * 24);
                ctx.fillStyle = '#B8924A';
                ctx.fillRect(badgeX + 85, badgeY + 21 + idx * 24, 16, 1.5);
              });

              // Bottom HUD panel (IDEAS, HARDWARE, REAL-WORLD IMPACT +)
              const panelX = 1120;
              const panelY = 560;
              ctx.fillStyle = 'rgba(255,255,255,0.75)';
              ctx.strokeStyle = 'rgba(184,146,74,0.4)';
              ctx.beginPath();
              ctx.roundRect(panelX, panelY, 210, 85, 12);
              ctx.fill();
              ctx.stroke();
              ctx.font = '600 10.5px JetBrains Mono, monospace';
              ctx.fillStyle = '#141822';
              ctx.fillText('IDEAS', panelX + 18, panelY + 28);
              ctx.fillText('HARDWARE', panelX + 18, panelY + 48);
              ctx.fillText('REAL-WORLD IMPACT', panelX + 18, panelY + 68);
              ctx.font = '700 22px JetBrains Mono, monospace';
              ctx.fillStyle = '#B8924A';
              ctx.fillText('+', panelX + 180, panelY + 52);

              // Bottom left & right footnotes
              ctx.font = '700 10px JetBrains Mono, monospace';
              ctx.fillStyle = '#8892A0';
              ctx.fillText('ENGINEERING', 80, 850);
              ctx.fillStyle = '#141822';
              ctx.fillText('A MORE AUTONOMOUS TOMORROW ──', 80, 868);

              ctx.fillStyle = '#B8924A';
              ctx.fillText('// 01 ────', 1230, 850);
              ctx.fillStyle = '#687282';
              ctx.fillText('DESIGN  ×  BUILD  ×  DEPLOY', 1190, 868);

              const dataUrl = outCanvas.toDataURL('image/png');
              fetch('http://localhost:9884/composite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: dataUrl })
              });
            } catch (err) {
              console.error('Composite generation error:', err);
            }
          }, 1800);
        });
      </script>
      `;

      fs.writeFileSync('dist/capture.html', origHtml.replace('<head>', '<head>' + captureScript));

      // Trigger headless browser to load capture.html
      exec('firefox --headless --window-size=1440,900 http://localhost:4322/capture.html', (err) => {
        if (err && !fs.existsSync(outputFile)) {
          console.warn('Firefox exited with:', err.message);
        }
      });
    });
  });
}

if (process.argv[1].endsWith('capture_composite.mjs')) {
  captureFrame().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
