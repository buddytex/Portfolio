import http from 'http';
import { exec } from 'child_process';
import fs from 'fs';

export function capture(targetFile = 'hero_composite_latest.png') {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', '*');
      if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }
      if (req.url === '/composite' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            console.log('Received composite frame, length:', data.image.length);
            const base64Data = data.image.replace(/^data:image\/png;base64,/, '');
            fs.writeFileSync(targetFile, base64Data, 'base64');
            console.log(`Saved ${targetFile} successfully!`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('{"ok":true}');
            setTimeout(() => {
              server.close();
              resolve(targetFile);
            }, 300);
          } catch(e) {
            reject(e);
          }
        });
        return;
      }
      res.writeHead(404);
      res.end();
    });

    const PORT = 9886;
    server.listen(PORT, () => {
      console.log(`Receiver listening on ${PORT}`);
      const origHtml = fs.readFileSync('dist/index.html', 'utf8');
      const inject = `
      <script>
        window.addEventListener('DOMContentLoaded', () => {
          setTimeout(async () => {
            try {
              const canvas3d = document.getElementById('hero3dCanvas');
              const portraitImg = document.getElementById('heroPortraitImg');
              const pcbCanvas = document.getElementById('circuitBoardCanvas');

              const outCanvas = document.createElement('canvas');
              outCanvas.width = 1440;
              outCanvas.height = 900;
              const ctx = outCanvas.getContext('2d');

              // 1. Warm ivory background #F7F5F0
              ctx.fillStyle = '#F7F5F0';
              ctx.fillRect(0, 0, 1440, 900);

              // 2. PCB Circuit Traces
              if (pcbCanvas) {
                const pr = pcbCanvas.getBoundingClientRect();
                try { ctx.drawImage(pcbCanvas, pr.left, pr.top, pr.width, pr.height); } catch(e){}
              }

              // 3. 3D WebGL Canvas
              if (canvas3d) {
                const rect = canvas3d.getBoundingClientRect();
                try {
                  ctx.drawImage(canvas3d, rect.left, rect.top, rect.width, rect.height);
                } catch(e) {
                  console.error('Error drawing 3D canvas:', e);
                }
              }

              // 4. AO Shadow
              const ao = document.querySelector('.portrait-ao-shadow');
              if (ao) {
                const r = ao.getBoundingClientRect();
                const rad = ctx.createRadialGradient(r.left + r.width*0.5, r.top + r.height*0.55, 10, r.left + r.width*0.5, r.top + r.height*0.55, r.width*0.45);
                rad.addColorStop(0, 'rgba(18, 22, 30, 0.35)');
                rad.addColorStop(0.5, 'rgba(18, 22, 30, 0.1)');
                rad.addColorStop(1, 'rgba(18, 22, 30, 0)');
                ctx.fillStyle = rad;
                ctx.fillRect(r.left, r.top, r.width, r.height);
              }

              // 5. Cutout Portrait with bottom gradient fade
              if (portraitImg && portraitImg.complete) {
                const r = portraitImg.getBoundingClientRect();
                const pCanvas = document.createElement('canvas');
                pCanvas.width = r.width;
                pCanvas.height = r.height;
                const pCtx = pCanvas.getContext('2d');
                pCtx.drawImage(portraitImg, 0, 0, r.width, r.height);

                pCtx.globalCompositeOperation = 'destination-in';
                const grad = pCtx.createLinearGradient(0, 0, 0, r.height);
                grad.addColorStop(0, 'rgba(0,0,0,1)');
                grad.addColorStop(0.72, 'rgba(0,0,0,1)');
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                pCtx.fillStyle = grad;
                pCtx.fillRect(0, 0, r.width, r.height);

                ctx.drawImage(pCanvas, r.left, r.top, r.width, r.height);
              }

              // 6. HUD Badge & Panel
              const badge = document.querySelector('.hero-hud-badge');
              if (badge) {
                const br = badge.getBoundingClientRect();
                ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
                ctx.strokeStyle = 'rgba(184, 146, 74, 0.4)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect(br.left, br.top, br.width, br.height, 12);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#141822';
                ctx.font = '600 11px monospace';
                ctx.fillText('· BUILD', br.left + 12, br.top + 22);
                ctx.fillText('· EXPLORE ――', br.left + 12, br.top + 40);
                ctx.fillText('· AUTOMATE ――', br.left + 12, br.top + 58);
                ctx.fillText('· IMPROVE ――', br.left + 12, br.top + 76);
              }

              const panel = document.querySelector('.hero-hud-panel');
              if (panel) {
                const pr = panel.getBoundingClientRect();
                ctx.fillStyle = 'rgba(255, 255, 255, 0.68)';
                ctx.strokeStyle = 'rgba(184, 146, 74, 0.4)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect(pr.left, pr.top, pr.width, pr.height, 12);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#141822';
                ctx.font = '600 11px monospace';
                ctx.fillText('IDEAS', pr.left + 16, pr.top + 24);
                ctx.fillText('HARDWARE', pr.left + 16, pr.top + 42);
                ctx.fillText('REAL-WORLD IMPACT', pr.left + 16, pr.top + 60);

                ctx.fillStyle = '#b8924a';
                ctx.font = '700 20px sans-serif';
                ctx.fillText('+', pr.left + pr.width - 28, pr.top + 46);
              }

              // 7. Left Column Content
              const eyebrow = document.getElementById('heroEyebrow');
              if (eyebrow) {
                const er = eyebrow.getBoundingClientRect();
                ctx.fillStyle = '#b8924a';
                ctx.fillRect(er.left, er.top + 4, 22, 4);
                ctx.beginPath();
                ctx.arc(er.left + 30, er.top + 6, 3, 0, Math.PI*2);
                ctx.fill();
                ctx.font = '700 12px monospace';
                ctx.fillText('ROBOTICS AND AUTOMATION ENGINEER', er.left + 40, er.top + 10);
              }

              const nameEl = document.getElementById('heroName');
              if (nameEl) {
                const nr = nameEl.getBoundingClientRect();
                ctx.fillStyle = '#141822';
                ctx.font = '800 64px sans-serif';
                ctx.fillText('NAVEEN', nr.left, nr.top + 56);
                ctx.fillText('SHAJI ', nr.left, nr.top + 120);
                
                const gGrad = ctx.createLinearGradient(nr.left + 210, 0, nr.left + 500, 0);
                gGrad.addColorStop(0, '#b8924a');
                gGrad.addColorStop(0.35, '#f5e5b8');
                gGrad.addColorStop(0.7, '#c29b4f');
                gGrad.addColorStop(1, '#ecd08e');
                ctx.fillStyle = gGrad;
                ctx.fillText('GEORGE', nr.left + 210, nr.top + 120);
              }

              const disc = document.getElementById('heroDisciplines');
              if (disc) {
                const dr = disc.getBoundingClientRect();
                ctx.fillStyle = '#6b7280';
                ctx.font = '600 11px monospace';
                ctx.fillText('AUTONOMOUS SYSTEMS · ROBOTICS · EMBEDDED SYSTEMS · PERCEPTION · HARDWARE', dr.left, dr.top + 12);
              }

              const exploreBtn = document.getElementById('heroExploreBtn');
              if (exploreBtn) {
                const er = exploreBtn.getBoundingClientRect();
                ctx.fillStyle = '#141822';
                ctx.beginPath();
                ctx.roundRect(er.left, er.top, er.width, er.height, 9999);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.font = '600 14px sans-serif';
                ctx.fillText('Explore Projects  ↓', er.left + 24, er.top + 28);
              }

              const evidBtn = document.getElementById('heroEvidenceBtn');
              if (evidBtn) {
                const vr = evidBtn.getBoundingClientRect();
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = 'rgba(20,24,34,0.18)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect(vr.left, vr.top, vr.width, vr.height, 9999);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = '#141822';
                ctx.font = '600 14px sans-serif';
                ctx.fillText('Inspect Engineering Evidence  →', vr.left + 24, vr.top + 28);
              }

              // 8. Navigation Bar & Step Rail
              ctx.font = '700 18px sans-serif';
              ctx.fillStyle = '#141822';
              ctx.fillText('NAVEEN.', 64, 48);

              ctx.font = '500 13px sans-serif';
              ctx.fillStyle = '#555E6D';
              ctx.fillText('Projects', 560, 48);
              ctx.fillText('Skills', 645, 48);
              ctx.fillText('PCB Lab', 710, 48);
              ctx.fillText('Contact', 785, 48);

              ctx.strokeStyle = 'rgba(20,24,34,0.15)';
              ctx.beginPath();
              ctx.roundRect(1260, 28, 90, 32, 16);
              ctx.stroke();
              ctx.font = '600 12px sans-serif';
              ctx.fillStyle = '#141822';
              ctx.fillText('Resume', 1284, 49);

              // Step Rail
              ctx.font = '700 13px monospace';
              ctx.fillStyle = '#141822';
              ctx.fillText('01', 32, 285);
              ctx.font = '700 10px monospace';
              ctx.fillText('HERO', 32, 302);
              ctx.font = '600 11px monospace';
              ctx.fillStyle = 'rgba(20,24,34,0.3)';
              ctx.fillText('02', 32, 345);
              ctx.fillText('03', 32, 390);
              ctx.fillText('04', 32, 435);
              ctx.fillText('05', 32, 480);
              ctx.fillText('06', 32, 525);

              // Bottom Coordinates
              ctx.fillStyle = '#9ca3af';
              ctx.font = '700 10px monospace';
              ctx.fillText('ENGINEERING', 60, 850);
              ctx.fillStyle = '#141822';
              ctx.font = '600 10px monospace';
              ctx.fillText('A MORE AUTONOMOUS TOMORROW ――', 60, 866);

              ctx.fillStyle = '#b8924a';
              ctx.font = '700 11px monospace';
              ctx.fillText('// 01 ――――', 1240, 850);
              ctx.fillStyle = '#6b7280';
              ctx.font = '600 10px monospace';
              ctx.fillText('DESIGN × BUILD × DEPLOY', 1240, 866);

              const dataUrl = outCanvas.toDataURL('image/png');
              fetch('http://localhost:9886/composite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: dataUrl })
              }).catch(()=>{});
            } catch(err) {
              console.error(err);
            }
          }, 1800);
        });
      </script>
      `;

      fs.writeFileSync('dist/test_capture_live.html', origHtml.replace('<head>', '<head>' + inject));
      exec('timeout 12s env LIBGL_ALWAYS_SOFTWARE=1 firefox --headless --window-size=1440,900 http://localhost:4322/test_capture_live.html', () => {});
    });
  });
}

if (process.argv[1].endsWith('generate_composite.mjs')) {
  const target = process.argv[2] || 'hero_composite_v8.png';
  capture(target).then(() => {
    console.log('Capture complete:', target);
    process.exit(0);
  }).catch(err => {
    console.error('Capture failed:', err);
    process.exit(1);
  });
}
