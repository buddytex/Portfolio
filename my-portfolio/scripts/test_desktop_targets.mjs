// scripts/test_desktop_targets.mjs
import { spawn } from 'child_process';

const ff = spawn('/snap/bin/firefox', [
  '--headless',
  '--profile', '/home/buddy/ffprofile',
  '--remote-debugging-port', '9222',
  'about:blank'
], { stdio: 'ignore' });

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

await wait(2500);

const ws = new WebSocket('ws://127.0.0.1:9222/session');
let msgId = 1;
const pending = new Map();

function send(method, params = {}) {
  const id = msgId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.id && pending.has(data.id)) {
    const { resolve, reject } = pending.get(data.id);
    pending.delete(data.id);
    if (data.type === 'success') {
      resolve(data.result);
    } else {
      reject(data.error || data);
    }
  } else if (data.type === 'event' && data.method === 'log.entryAdded') {
    if (data.params.level === 'error' || data.params.level === 'warn') {
      console.log('[BROWSER LOG]', data.params.level, data.params.text);
    }
  }
};

await new Promise((resolve) => (ws.onopen = resolve));
await send('session.new', { capabilities: {} });

const tree = await send('browsingContext.getTree', {});
const contextId = tree.contexts[0].context;

await send('browsingContext.setViewport', {
  context: contextId,
  viewport: { width: 1440, height: 900 }
});

const targets = [
  { name: 'Image', selector: '.project-real-img' },
  { name: 'Title', selector: '.card-title' },
  { name: 'Metadata (Domain/Year)', selector: '.card-domain-row' },
  { name: 'Arrow circle', selector: '.card-arrow-circle' },
  { name: 'Card footer body', selector: '.card-footer-minimal' },
  { name: 'Inspect button in Hover overlay', selector: '.inspect-btn' },
];

for (const t of targets) {
  console.log(`\\nTesting Desktop Click on: ${t.name}`);

  await send('browsingContext.navigate', {
    context: contextId,
    url: 'http://localhost:4321/',
    wait: 'complete',
  });
  await wait(1500);

  const coords = await send('script.evaluate', {
    context: contextId,
    target: { context: contextId },
    awaitPromise: true,
    expression: `(() => {
      const card = document.getElementById('card-baja-2025');
      card.scrollIntoView({ behavior: 'instant', block: 'center' });
      const el = card.querySelector('${t.selector}');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.left + r.width / 2),
        y: Math.round(r.top + r.height / 2),
      };
    })()`,
  });

  if (!coords.result.value) {
    console.log(`Target ${t.name} not found!`);
    continue;
  }

  const cObj = Object.fromEntries(coords.result.value);
  const x = cObj.x.value;
  const y = cObj.y.value;

  // Move mouse to position (triggers hover if over visual wrap)
  await send('input.performActions', {
    context: contextId,
    actions: [
      {
        type: 'pointer',
        id: 'mouse1',
        parameters: { pointerType: 'mouse' },
        actions: [
          { type: 'pointerMove', x, y, duration: 80 },
        ],
      },
    ],
  });

  await wait(300);

  // Click
  await send('input.performActions', {
    context: contextId,
    actions: [
      {
        type: 'pointer',
        id: 'mouse1',
        parameters: { pointerType: 'mouse' },
        actions: [
          { type: 'pointerDown', button: 0 },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ],
  });

  await wait(1000);

  const destUrl = await send('script.evaluate', {
    context: contextId,
    target: { context: contextId },
    expression: `window.location.href`,
    awaitPromise: false,
  });
  console.log(`URL after clicking ${t.name}: ${destUrl.result.value}`);
  const ok = destUrl.result.value.includes('/projects/baja-2025');
  console.log(`Result: ${ok ? 'PASSED' : 'FAILED'}`);
}

ws.close();
ff.kill();
process.exit(0);
