// scripts/generate_system_init_gif.mjs
// Compiles a complete 3.4s "System Initialization" Engineering Animated GIF
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const GECKO_URL = 'http://127.0.0.1:4444';
const APP_URL = 'http://localhost:4321';
const FRAMES_DIR = '/home/buddy/Portfolio/my-portfolio/sysinit_frames';
const ARTIFACT_DIR = '/home/buddy/.gemini/antigravity-ide/brain/b4df4c82-2549-4201-961f-38a423238dec';
const GIF_OUTPUT = path.join(ARTIFACT_DIR, 'intro_system_initialization.gif');
const PUBLIC_OUTPUT = '/home/buddy/Portfolio/my-portfolio/public/intro_animation.gif';

if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

async function req(p, opts = {}) {
  const res = await fetch(`${GECKO_URL}${p}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
  return res.json();
}

async function main() {
  console.log('--- Step 1: Launching Firefox session ---');
  const sessionRes = await req('/session', {
    method: 'POST',
    body: JSON.stringify({
      capabilities: {
        alwaysMatch: {
          'moz:firefoxOptions': {
            args: ['-headless', '--width=1280', '--height=800'],
          },
        },
      },
    }),
  });
  const sid = sessionRes.value.sessionId;

  try {
    console.log('--- Step 2: Navigating to page with ?introPreview=true ---');
    // Note: Do not pass debug to keep HUD hidden for cinematic view
    await req(`/session/${sid}/url`, {
      method: 'POST',
      body: JSON.stringify({ url: `${APP_URL}/?introPreview=true` }),
    });

    // Wait until __introAnimeTimeline exists and pause it
    console.log('--- Step 3: Acquiring Anime.js master timeline ---');
    let ready = false;
    for (let i = 0; i < 40; i++) {
      const res = await req(`/session/${sid}/execute/sync`, {
        method: 'POST',
        body: JSON.stringify({
          script: `
            // Hide debug hud for pure cinematic presentation
            const hud = document.getElementById('introDebugHud');
            if (hud) hud.style.display = 'none';

            if (window.__introAnimeTimeline) {
              window.__introAnimeTimeline.pause();
              return true;
            }
            return false;
          `,
          args: [],
        }),
      });
      if (res.value) {
        ready = true;
        break;
      }
      await new Promise((r) => setTimeout(r, 50));
    }

    if (!ready) {
      throw new Error('Failed to acquire __introAnimeTimeline');
    }

    console.log('--- Step 4: Sampling 36 choreographed timeline frames (0 to 3400ms) ---');
    // Sample key moments:
    // Phase 1 (0-500ms): Ambient drift & Origin ignite
    // Phase 2 (500-900ms): Core origin bloom
    // Phase 3 (900-1500ms): Circuit traces drawing
    // Phase 4 (1500-2200ms): Traveling energy pulses
    // Phase 5 (2200-2600ms): Optical rotary encoder & vernier ring spinning
    // Phase 6 (2600-2900ms): System tension lock
    // Phase 7 (2900-3400ms): Luminous horizon spark & split aperture shutter opening
    const timestamps = [];
    for (let t = 50; t <= 3350; t += 95) {
      timestamps.push(t);
    }
    timestamps.push(3400);

    let frameIdx = 0;
    for (const ms of timestamps) {
      await req(`/session/${sid}/execute/sync`, {
        method: 'POST',
        body: JSON.stringify({
          script: `
            if (window.__introAnimeTimeline) {
              window.__introAnimeTimeline.seek(${ms});
            }
          `,
          args: [],
        }),
      });
      await new Promise((r) => setTimeout(r, 25)); // render tick

      const shotRes = await req(`/session/${sid}/screenshot`);
      const buffer = Buffer.from(shotRes.value, 'base64');
      const filename = `frame_${String(frameIdx).padStart(3, '0')}.png`;
      fs.writeFileSync(path.join(FRAMES_DIR, filename), buffer);
      process.stdout.write(`\rCaptured frame ${frameIdx + 1}/${timestamps.length} (t=${ms}ms)`);
      frameIdx++;
    }
    console.log('\nIntro frames captured. Capturing final resting Hero frames ...');

    // Dismiss overlay and reveal Hero
    await req(`/session/${sid}/execute/sync`, {
      method: 'POST',
      body: JSON.stringify({
        script: `
          const overlay = document.getElementById('introOverlay');
          if (overlay) overlay.remove();
        `,
        args: [],
      }),
    });
    await new Promise((r) => setTimeout(r, 300));

    // Capture 3 resting Hero frames for final hold
    for (let h = 0; h < 3; h++) {
      const shotRes = await req(`/session/${sid}/screenshot`);
      const buffer = Buffer.from(shotRes.value, 'base64');
      const filename = `frame_${String(frameIdx).padStart(3, '0')}.png`;
      fs.writeFileSync(path.join(FRAMES_DIR, filename), buffer);
      frameIdx++;
    }

    console.log(`Total ${frameIdx} frames ready. Compiling animated GIF with Python PIL ...`);

    const pythonScript = `
import os
import glob
from PIL import Image

frames_dir = "${FRAMES_DIR}"
output_path = "${GIF_OUTPUT}"
public_path = "${PUBLIC_OUTPUT}"

frame_files = sorted(glob.glob(os.path.join(frames_dir, "frame_*.png")))
print(f"Processing {len(frame_files)} animation frames...")

images = []
durations = []

for i, f in enumerate(frame_files):
    img = Image.open(f).convert("RGBA")
    # Resize to 960x600 for optimal crispness and web performance
    img_resized = img.resize((960, 600), Image.Resampling.LANCZOS)
    
    # Dark backdrop blending
    bg = Image.new("RGB", img_resized.size, (7, 10, 16))
    bg.paste(img_resized, mask=img_resized.split()[3])
    
    # Quantize with clean adaptive palette
    q = bg.quantize(colors=160, method=Image.Quantize.MEDIANCUT)
    images.append(q)
    
    # Frame duration: 95ms during animation, 1400ms hold on final revealed Hero frame
    if i >= len(frame_files) - 3:
        durations.append(1400 if i == len(frame_files) - 1 else 95)
    else:
        durations.append(95)

if images:
    images[0].save(
        output_path,
        save_all=True,
        append_images=images[1:],
        duration=durations,
        loop=0,
        optimize=True
    )
    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"SUCCESS: Saved {output_path} ({size_mb:.2f} MB)")
    
    # Also save directly to public directory
    images[0].save(
        public_path,
        save_all=True,
        append_images=images[1:],
        duration=durations,
        loop=0,
        optimize=True
    )
    print(f"SUCCESS: Copied to {public_path}")
`;

    fs.writeFileSync(path.join(FRAMES_DIR, 'compile.py'), pythonScript);
    const pyOutput = execSync(`python3 ${path.join(FRAMES_DIR, 'compile.py')}`, { encoding: 'utf-8' });
    console.log(pyOutput);

  } finally {
    await req(`/session/${sid}`, { method: 'DELETE' });
    console.log('Session closed.');
  }
}

main().catch(console.error);
