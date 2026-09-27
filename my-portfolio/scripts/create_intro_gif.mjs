// scripts/create_intro_gif.mjs
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const GECKO_URL = 'http://127.0.0.1:4444';
const APP_URL = 'http://localhost:4321';
const FRAMES_DIR = '/home/buddy/Portfolio/my-portfolio/scratch_frames';
const ARTIFACT_DIR = '/home/buddy/.gemini/antigravity-ide/brain/b4df4c82-2549-4201-961f-38a423238dec';
const GIF_OUTPUT = path.join(ARTIFACT_DIR, 'intro_animation.gif');

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
    console.log('--- Step 2: Navigating to page with ?replay=true ---');
    await req(`/session/${sid}/url`, {
      method: 'POST',
      body: JSON.stringify({ url: `${APP_URL}/?replay=true` }),
    });

    // Wait until __introTimeline exists
    console.log('--- Step 3: Waiting for GSAP timeline and pausing ---');
    let ready = false;
    for (let i = 0; i < 30; i++) {
      const res = await req(`/session/${sid}/execute/sync`, {
        method: 'POST',
        body: JSON.stringify({
          script: `
            if (window.__introTimeline) {
              window.__introTimeline.pause();
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
      throw new Error('Failed to acquire __introTimeline');
    }

    console.log('--- Step 4: Capturing animation frames via timeline scrub ---');
    const timestamps = [];
    // 0.0s to 0.84s every 0.035s (Stage A, Stage B, Beat, Stage C)
    for (let t = 0.0; t <= 0.84; t += 0.035) {
      timestamps.push(parseFloat(t.toFixed(3)));
    }

    let frameIdx = 0;
    for (const t of timestamps) {
      await req(`/session/${sid}/execute/sync`, {
        method: 'POST',
        body: JSON.stringify({
          script: `window.__introTimeline.seek(${t});`,
          args: [],
        }),
      });
      await new Promise((r) => setTimeout(r, 20)); // wait for paint

      const shotRes = await req(`/session/${sid}/screenshot`);
      const buffer = Buffer.from(shotRes.value, 'base64');
      const filename = `frame_${String(frameIdx).padStart(3, '0')}.png`;
      fs.writeFileSync(path.join(FRAMES_DIR, filename), buffer);
      frameIdx++;
    }

    console.log(`Captured ${frameIdx} intro frames. Triggering completion / Hero reveal ...`);

    // Let timeline complete Stage D (removes overlay and shows Hero)
    await req(`/session/${sid}/execute/sync`, {
      method: 'POST',
      body: JSON.stringify({
        script: `
          window.__introTimeline.seek(0.85);
        `,
        args: [],
      }),
    });
    await new Promise((r) => setTimeout(r, 300)); // wait for DOM update and Hero render

    // Capture Hero resting frame
    for (let h = 0; h < 3; h++) {
      const shotRes = await req(`/session/${sid}/screenshot`);
      const buffer = Buffer.from(shotRes.value, 'base64');
      const filename = `frame_${String(frameIdx).padStart(3, '0')}.png`;
      fs.writeFileSync(path.join(FRAMES_DIR, filename), buffer);
      frameIdx++;
      await new Promise((r) => setTimeout(r, 50));
    }

    console.log(`Total ${frameIdx} frames captured. Assembling GIF with Python PIL ...`);

    // Execute Python script to compile animated GIF with optimal palette & timing
    const pythonScript = `
import os
import glob
from PIL import Image

frames_dir = "${FRAMES_DIR}"
output_path = "${GIF_OUTPUT}"

frame_files = sorted(glob.glob(os.path.join(frames_dir, "frame_*.png")))
print(f"Loading {len(frame_files)} frames...")

images = []
durations = []

for i, f in enumerate(frame_files):
    img = Image.open(f).convert("RGBA")
    # Resize to 960x600 for sharp rendering and fast loading
    img_resized = img.resize((960, 600), Image.Resampling.LANCZOS)
    
    # Convert RGBA to RGB with dark background blending if needed
    bg = Image.new("RGB", img_resized.size, (12, 14, 20))
    bg.paste(img_resized, mask=img_resized.split()[3])
    
    # Quantize to 128 colors with diffusion for smooth gradients
    q = bg.quantize(colors=128, method=Image.Quantize.MEDIANCUT)
    images.append(q)
    
    # Frame duration: 40ms for animation, 1200ms for final hero reveal hold
    if i == len(frame_files) - 1:
        durations.append(1200) # hold on Hero before loop
    else:
        durations.append(40)

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
    print(f"SUCCESS: Generated GIF at {output_path} ({size_mb:.2f} MB)")
`;

    fs.writeFileSync('/home/buddy/Portfolio/my-portfolio/scratch_frames/compile_gif.py', pythonScript);
    const pyOutput = execSync('python3 /home/buddy/Portfolio/my-portfolio/scratch_frames/compile_gif.py', { encoding: 'utf-8' });
    console.log(pyOutput);

  } finally {
    await req(`/session/${sid}`, { method: 'DELETE' });
    console.log('Session closed.');
  }
}

main().catch(console.error);
