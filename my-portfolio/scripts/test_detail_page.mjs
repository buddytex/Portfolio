
import http from 'http';
import { exec } from 'child_process';
import fs from 'fs';

const server = http.createServer((req, res) => {
  if (req.url === '/log') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      console.log('[PAGE LOG]', body);
      res.writeHead(200);
      res.end('ok');
    });
  } else if (req.url === '/done') {
    res.writeHead(200);
    res.end('ok');
    setTimeout(() => { server.close(); process.exit(0); }, 300);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(9877, () => {
  const html = fs.readFileSync('dist/projects/baja-2026/index.html', 'utf8');
  const inject = `
  <script>
    window.addEventListener('DOMContentLoaded', async () => {
      await new Promise(r => setTimeout(r, 1500));
      const title = document.querySelector('.project-title');
      const visual = document.querySelector('.project-hero-visual');
      const img = document.querySelector('.project-hero-img');
      const sections = document.querySelectorAll('.case-section');
      
      const info = {
        titleOpacity: title ? window.getComputedStyle(title).opacity : 'null',
        titleText: title ? title.textContent : 'null',
        visualOpacity: visual ? window.getComputedStyle(visual).opacity : 'null',
        imgSrc: img ? img.currentSrc || img.src : 'null',
        imgDisplay: img ? window.getComputedStyle(img).display : 'null',
        imgHeight: img ? window.getComputedStyle(img).height : 'null',
        sectionsCount: sections.length,
        sec0Opacity: sections[0] ? window.getComputedStyle(sections[0]).opacity : 'null'
      };
      await fetch('http://localhost:9877/log', { method: 'POST', body: JSON.stringify(info) });
      await fetch('http://localhost:9877/done', { method: 'POST' });
    });
  </script>
  `;
  fs.writeFileSync('dist/projects/baja-2026/debug_page.html', html.replace('<head>', '<head>' + inject));
  exec('firefox -no-remote -P temp_profile_test --headless http://localhost:4322/projects/baja-2026/debug_page.html');
});
