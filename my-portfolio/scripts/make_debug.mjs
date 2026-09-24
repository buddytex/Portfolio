
import { spawn } from 'child_process';
import http from 'http';

// Let's create an injected HTML file that captures errors
const origHtml = fs.readFileSync('dist/index.html', 'utf8');
const debugLogger = `
<script>
  window.__LOGS__ = [];
  const origLog = console.log;
  const origErr = console.error;
  const origWarn = console.warn;
  console.log = (...args) => { window.__LOGS__.push(['LOG', ...args]); origLog(...args); };
  console.error = (...args) => { window.__LOGS__.push(['ERR', ...args]); origErr(...args); };
  console.warn = (...args) => { window.__LOGS__.push(['WARN', ...args]); origWarn(...args); };
  window.addEventListener('error', (e) => {
    window.__LOGS__.push(['UNCAUGHT', e.message, e.filename, e.lineno, e.colno]);
  });
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const c = document.getElementById('hero3dCanvas');
      const info = {
        canvasFound: !!c,
        w: c ? c.width : 0,
        h: c ? c.height : 0,
        clientW: c ? c.clientWidth : 0,
        clientH: c ? c.clientHeight : 0,
        rect: c ? c.getBoundingClientRect() : null,
        logs: window.__LOGS__,
      };
      const pre = document.createElement('pre');
      pre.id = 'DEBUG_OUT';
      pre.style.position = 'fixed';
      pre.style.bottom = '0';
      pre.style.left = '0';
      pre.style.zIndex = '999999';
      pre.style.background = 'black';
      pre.style.color = '#0f0';
      pre.style.padding = '10px';
      pre.style.maxWidth = '100vw';
      pre.style.maxHeight = '300px';
      pre.style.overflow = 'auto';
      pre.textContent = JSON.stringify(info, null, 2);
      document.body.appendChild(pre);
    }, 1500);
  });
</script>
`;
const debugHtml = origHtml.replace('<head>', '<head>' + debugLogger);
fs.writeFileSync('dist/debug.html', debugHtml);
console.log('Written dist/debug.html');
