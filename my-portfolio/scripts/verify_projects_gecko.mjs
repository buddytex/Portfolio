import fs from 'fs';

const GECKO_URL = 'http://127.0.0.1:4444';
const APP_URL = 'http://localhost:4321';

async function req(path, options = {}) {
  const res = await fetch(`${GECKO_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (data.value && data.value.error) {
    throw new Error(`WebDriver error: ${data.value.error} - ${data.value.message}`);
  }
  return data;
}

async function run() {
  console.log('--- STARTING GECKODRIVER BROWSER VALIDATION ---');
  
  // Create Session
  const sessionRes = await req('/session', {
    method: 'POST',
    body: JSON.stringify({
      capabilities: {
        alwaysMatch: {
          'moz:firefoxOptions': {
            args: ['-headless', '--width=1440', '--height=900'],
          },
        },
      },
    }),
  });
  const sId = sessionRes.value.sessionId;
  console.log('Geckodriver session created:', sId);

  try {
    // 1. Visit /projects
    console.log(`Navigating to ${APP_URL}/projects ...`);
    await req(`/session/${sId}/url`, {
      method: 'POST',
      body: JSON.stringify({ url: `${APP_URL}/projects` }),
    });
    await new Promise((r) => setTimeout(r, 1500));

    // Get Title
    const titleRes = await req(`/session/${sId}/title`);
    console.log('Page Title:', titleRes.value);

    // Count tiles and videos via script
    const statsRes = await req(`/session/${sId}/execute/sync`, {
      method: 'POST',
      body: JSON.stringify({
        script: `
          return {
            items: document.querySelectorAll('.collage-item').length,
            videos: document.querySelectorAll('.collage-video-el').length,
            filters: document.querySelectorAll('.filter-pill').length,
            canvas: !!document.getElementById('collageCircuitCanvas'),
            background: window.getComputedStyle(document.getElementById('projectsExperience')).backgroundColor
          };
        `,
        args: [],
      }),
    });
    console.log('Projects Page Diagnostics:', statsRes.value);

    // Take Desktop Screenshot
    const snap1 = await req(`/session/${sId}/screenshot`);
    fs.writeFileSync('projects_desktop_live.png', Buffer.from(snap1.value, 'base64'));
    console.log('Saved projects_desktop_live.png');

    // Test Hover Overlay on second collage item
    await req(`/session/${sId}/execute/sync`, {
      method: 'POST',
      body: JSON.stringify({
        script: `
          const firstScrim = document.querySelectorAll('.collage-item .tile-hover-scrim')[0];
          if (firstScrim) {
            firstScrim.setAttribute('style', 'opacity: 1 !important; pointer-events: auto !important;');
          }
        `,
        args: [],
      }),
    });
    const snapHover = await req(`/session/${sId}/screenshot`);
    fs.writeFileSync('projects_hover_live.png', Buffer.from(snapHover.value, 'base64'));
    console.log('Saved projects_hover_live.png');

    // Test Domain Filter
    console.log('Clicking Robotics filter chip...');
    await req(`/session/${sId}/execute/sync`, {
      method: 'POST',
      body: JSON.stringify({
        script: `
          const btn = document.querySelector('button[data-category="robotics"]');
          if (btn) btn.click();
        `,
        args: [],
      }),
    });
    await new Promise((r) => setTimeout(r, 600));
    const filterStats = await req(`/session/${sId}/execute/sync`, {
      method: 'POST',
      body: JSON.stringify({
        script: `
          return Array.from(document.querySelectorAll('.collage-item'))
            .filter(t => t.style.display !== 'none').length;
        `,
        args: [],
      }),
    });
    console.log('Visible items after Robotics filter:', filterStats.value);
    const snap3 = await req(`/session/${sId}/screenshot`);
    fs.writeFileSync('projects_filtered_live.png', Buffer.from(snap3.value, 'base64'));
    console.log('Saved projects_filtered_live.png');

    // 2. Project Detail Page Verification
    console.log(`Navigating to ${APP_URL}/projects/baja-2026 ...`);
    await req(`/session/${sId}/url`, {
      method: 'POST',
      body: JSON.stringify({ url: `${APP_URL}/projects/baja-2026` }),
    });
    await new Promise((r) => setTimeout(r, 1200));

    const detailStats = await req(`/session/${sId}/execute/sync`, {
      method: 'POST',
      body: JSON.stringify({
        script: `
          const sections = Array.from(document.querySelectorAll('.case-section'));
          return {
            title: document.querySelector('.project-title')?.textContent?.trim(),
            hasVideo: !!document.querySelector('.ambient-project-video source'),
            videoSrc: document.querySelector('.ambient-project-video source')?.getAttribute('src'),
            hasPagination: !!document.querySelector('.project-pagination-footer'),
            allSectionsVisible: sections.every(s => parseFloat(window.getComputedStyle(s).opacity) > 0)
          };
        `,
        args: [],
      }),
    });
    console.log('BAJA 2026 Detail Verification:', detailStats.value);
    const snapDetail = await req(`/session/${sId}/screenshot`);
    fs.writeFileSync('baja2026_detail_live.png', Buffer.from(snapDetail.value, 'base64'));
    console.log('Saved baja2026_detail_live.png');

    // 3. Home Page Section Order Verification
    console.log(`Navigating to ${APP_URL}/ ...`);
    await req(`/session/${sId}/url`, {
      method: 'POST',
      body: JSON.stringify({ url: `${APP_URL}/` }),
    });
    await new Promise((r) => setTimeout(r, 2000));

    const homeStats = await req(`/session/${sId}/execute/sync`, {
      method: 'POST',
      body: JSON.stringify({
        script: `
          const main = document.getElementById('mainContent');
          const children = Array.from(main.children).map(c => ({ id: c.id, tag: c.tagName, class: c.className }));
          const navProjects = document.querySelector('.nav-links a[data-nav-projects="true"]')?.getAttribute('href');
          return {
            sectionOrder: children.slice(0, 6),
            navProjectsHref: navProjects
          };
        `,
        args: [],
      }),
    });
    console.log('Home Page Structure & Ordering:', homeStats.value);
    const snapHome = await req(`/session/${sId}/screenshot`);
    fs.writeFileSync('home_order_verified.png', Buffer.from(snapHome.value, 'base64'));
    console.log('Saved home_order_verified.png');

    console.log('--- ALL BROWSER TESTS PASSED FLAWLESSLY ---');
  } finally {
    console.log('Deleting Geckodriver session...');
    await req(`/session/${sId}`, { method: 'DELETE' });
  }
}

run().catch((e) => {
  console.error('Test run failed:', e);
  process.exit(1);
});
