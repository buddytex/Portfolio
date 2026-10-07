/**
 * PCBRenderExporter.tsx — DEV-ONLY tool (mounted at /__pcb-export during `astro dev`).
 *
 * Renders every Gerber-backed board with the same materials as the live viewer and
 * captures TOP / BOTTOM / ISO views on transparent + dark backgrounds. Each PNG is
 * POSTed to the local receiver started by `node scripts/export-pcb-renders.mjs`,
 * which writes them to media/pcb-renders/<board-id>/.
 */

import { useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PCBBoardMesh } from './GerberPCBViewer';
import type { PCBData } from '../../lib/gerber/gerberToGeometry';

const RECEIVER = 'http://localhost:9885';
const ALL_LAYERS = {
  board: true, 'F.Cu': true, 'B.Cu': true, 'F.Mask': true, 'B.Mask': true,
  'F.Silkscreen': true, 'B.Silkscreen': true, drills: true,
};
const VIEWS = ['top', 'bottom', 'iso'] as const;
const DARK_BG = 0x0e1117;
const W = 1400;
const H = 1050;
const DPR = 2;

interface BoardJob { id: string; file: string }

function Capturer({ data, boardId, onDone }: { data: PCBData; boardId: string; onDone: () => void }) {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    let cancelled = false;
    const cam = camera as THREE.PerspectiveCamera;
    const wU = data.dimensions.width * 0.01;
    const hU = data.dimensions.height * 0.01;
    const aspect = W / H;
    const halfFov = THREE.MathUtils.degToRad(cam.fov / 2);
    // distance so the board fills ~88% of the frame
    const fitDist = (Math.max(wU / aspect, hU) / 2 / Math.tan(halfFov)) * 1.14;

    async function run() {
      // let geometry upload + first frames settle
      await new Promise(r => setTimeout(r, 600));
      for (const view of VIEWS) {
        if (view === 'top') { cam.position.set(0, 0, fitDist); cam.up.set(0, 1, 0); }
        if (view === 'bottom') { cam.position.set(0, 0, -fitDist); cam.up.set(0, 1, 0); }
        if (view === 'iso') {
          const dir = new THREE.Vector3(1.6, -1.3, 1.8).normalize();
          cam.position.copy(dir.multiplyScalar(fitDist * 1.12));
          cam.up.set(0, 0, 1);
        }
        cam.lookAt(0, 0, 0);
        cam.updateProjectionMatrix();

        for (const bg of ['transparent', 'dark'] as const) {
          gl.setClearColor(DARK_BG, bg === 'dark' ? 1 : 0);
          gl.render(scene, cam);
          const image = gl.domElement.toDataURL('image/png');
          const name = bg === 'dark' ? `${view}-dark.png` : `${view}.png`;
          await fetch(`${RECEIVER}/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ boardId, name, image, trim: bg === 'transparent' }),
          });
          if (cancelled) return;
        }
      }
      onDone();
    }
    run();
    return () => { cancelled = true; };
  }, [data, boardId, gl, scene, camera, onDone]);

  return null;
}

export default function PCBRenderExporter({ boards }: { boards: BoardJob[] }) {
  const [idx, setIdx] = useState(0);
  const [data, setData] = useState<PCBData | null>(null);
  const [status, setStatus] = useState('starting…');
  const job = boards[idx];

  useEffect(() => {
    if (!job) {
      setStatus('ALL DONE');
      fetch(`${RECEIVER}/done`, { method: 'POST' }).catch(() => {});
      return;
    }
    setData(null);
    setStatus(`rendering ${job.id} (${idx + 1}/${boards.length})`);
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    fetch(`${base}/pcb-data/${job.file}`).then(r => r.json()).then(setData);
  }, [idx, job, boards.length]);

  return (
    <div style={{ padding: 16, fontFamily: 'monospace', color: '#E5C378', background: '#222' }}>
      <div id="exportStatus">{status}</div>
      {job && data && (
        <div style={{ width: W, height: H }}>
          <Canvas
            key={job.id}
            dpr={DPR}
            gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, premultipliedAlpha: false }}
            camera={{ fov: 30, near: 0.01, far: 100, position: [0, 0, 3] }}
            frameloop="demand"
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.05;
            }}
          >
            <ambientLight intensity={1.3} color={0xFFFAF0} />
            <directionalLight position={[3, 5, 4]} intensity={2.0} color={0xFFF6E6} />
            <directionalLight position={[-3, -2, 3]} intensity={1.1} color={0xD8E6F5} />
            <directionalLight position={[0, 0, 5]} intensity={1.2} color={0xFFFFFF} />
            <directionalLight position={[0, -4, -3]} intensity={1.0} color={0xE4C87A} />
            <directionalLight position={[0, 0, -5]} intensity={1.2} color={0xFFFFFF} />
            <PCBBoardMesh data={data} layerVisibility={ALL_LAYERS} />
            <Capturer data={data} boardId={job.id} onDone={() => setIdx(i => i + 1)} />
          </Canvas>
        </div>
      )}
    </div>
  );
}
