// ============================================================
// DETERMINISTIC CIRCUIT ROUTES & TOPOLOGY
// Stable engineering signal network definition
// Right-angle and 45° chamfered SVG paths across sections
// ============================================================

export interface CircuitNodePoint {
  id: string;
  x: number; // ViewBox units (0 to 1920)
  y: number; // ViewBox units (0 to 1080)
  label?: string;
  isVia?: boolean;
}

export interface CircuitRoute {
  id: string;
  name: string;
  section: 'hero' | 'work' | 'hardware' | 'skills' | 'about' | 'contact';
  path: string; // SVG path d attribute
  startNode: string;
  endNode: string;
  priority: 1 | 2 | 3; // 1: high frequency, 2: medium, 3: ambient
  pulseSpeed: number; // Base duration in ms
  pulseDelay: number; // Stagger delay in ms
}

// Fixed precision nodes across the viewport
export const CIRCUIT_NODES: CircuitNodePoint[] = [
  // Hero region
  { id: 'N_H01', x: 80,   y: 120, label: 'TP_00', isVia: true },
  { id: 'N_H02', x: 260,  y: 120, label: 'BUS_A', isVia: false },
  { id: 'N_H03', x: 260,  y: 340, label: 'TP_01', isVia: true },
  { id: 'N_H04', x: 440,  y: 340, label: 'REF_H', isVia: false },
  { id: 'N_H05', x: 960,  y: 160, label: 'CAM_0', isVia: true },
  { id: 'N_H06', x: 1180, y: 160, label: 'MCU_V', isVia: false },
  { id: 'N_H07', x: 1180, y: 380, label: 'TP_02', isVia: true },
  { id: 'N_H08', x: 1480, y: 380, label: 'OPT_R', isVia: false },
  { id: 'N_H09', x: 1480, y: 560, label: 'GND_H', isVia: true },
  { id: 'N_H10', x: 740,  y: 520, label: 'CROSS', isVia: false },
  { id: 'N_H11', x: 740,  y: 840, label: 'FEED',  isVia: true },

  // Projects / Work region
  { id: 'N_W01', x: 120,  y: 220, label: 'IO_P1', isVia: true },
  { id: 'N_W02', x: 380,  y: 220, label: 'CLK_1', isVia: false },
  { id: 'N_W03', x: 380,  y: 640, label: 'CAN_P', isVia: true },
  { id: 'N_W04', x: 620,  y: 640, label: 'DRV_0', isVia: false },
  { id: 'N_W05', x: 1240, y: 280, label: 'SMR_A', isVia: true },
  { id: 'N_W06', x: 1560, y: 280, label: 'MESH1', isVia: false },
  { id: 'N_W07', x: 1560, y: 720, label: 'TP_W2', isVia: true },
  { id: 'N_W08', x: 1740, y: 720, label: 'PWR_W', isVia: false },

  // Hardware / Skills region
  { id: 'N_S01', x: 160,  y: 180, label: 'ISO_B', isVia: true },
  { id: 'N_S02', x: 420,  y: 180, label: 'GATE1', isVia: false },
  { id: 'N_S03', x: 420,  y: 520, label: 'LIDAR', isVia: true },
  { id: 'N_S04', x: 860,  y: 520, label: 'ROS_2', isVia: false },
  { id: 'N_S05', x: 1040, y: 320, label: 'FR4_T', isVia: true },
  { id: 'N_S06', x: 1380, y: 320, label: 'ENIG',  isVia: false },
  { id: 'N_S07', x: 1380, y: 760, label: 'ESTOP', isVia: true },
  { id: 'N_S08', x: 1680, y: 760, label: 'RELAY', isVia: false },

  // About / Chronology region
  { id: 'N_A01', x: 220,  y: 140, label: 'CH_26', isVia: true },
  { id: 'N_A02', x: 540,  y: 140, label: 'NODE1', isVia: false },
  { id: 'N_A03', x: 540,  y: 480, label: 'CH_25', isVia: true },
  { id: 'N_A04', x: 780,  y: 480, label: 'NODE2', isVia: false },
  { id: 'N_A05', x: 780,  y: 820, label: 'CH_24', isVia: true },
  { id: 'N_A06', x: 1220, y: 820, label: 'CH_23', isVia: false },

  // Contact / Dispatch region
  { id: 'N_C01', x: 180,  y: 360, label: 'IN_L',  isVia: true },
  { id: 'N_C02', x: 620,  y: 360, label: 'CONV1', isVia: false },
  { id: 'N_C03', x: 840,  y: 580, label: 'DISP1', isVia: true },
  { id: 'N_C04', x: 1080, y: 580, label: 'DISP2', isVia: true },
  { id: 'N_C05', x: 1300, y: 360, label: 'CONV2', isVia: false },
  { id: 'N_C06', x: 1720, y: 360, label: 'IN_R',  isVia: true },
];

// Deterministic stable SVG paths with 90° and 45° bends
export const CIRCUIT_ROUTES: CircuitRoute[] = [
  // ------------------------------------------------------------
  // HERO SECTION ROUTES
  // ------------------------------------------------------------
  {
    id: 'hero-main-bus',
    name: 'Hero Primary Logic Bus',
    section: 'hero',
    path: 'M 80 120 L 240 120 L 260 140 L 260 320 L 280 340 L 440 340',
    startNode: 'N_H01',
    endNode: 'N_H04',
    priority: 1,
    pulseSpeed: 3200,
    pulseDelay: 400,
  },
  {
    id: 'hero-portrait-conduit',
    name: 'Hero Portrait Optical Datum',
    section: 'hero',
    path: 'M 960 160 L 1160 160 L 1180 180 L 1180 360 L 1200 380 L 1480 380',
    startNode: 'N_H05',
    endNode: 'N_H08',
    priority: 1,
    pulseSpeed: 3600,
    pulseDelay: 1200,
  },
  {
    id: 'hero-lateral-return',
    name: 'Hero Right Lateral Return',
    section: 'hero',
    path: 'M 1480 380 L 1480 540 L 1460 560 L 1220 560',
    startNode: 'N_H08',
    endNode: 'N_H09',
    priority: 2,
    pulseSpeed: 2800,
    pulseDelay: 2200,
  },
  {
    id: 'hero-downward-feed',
    name: 'Hero Section Inter-Feed',
    section: 'hero',
    path: 'M 440 340 L 720 340 L 740 360 L 740 820 L 760 840 L 920 840',
    startNode: 'N_H04',
    endNode: 'N_H11',
    priority: 2,
    pulseSpeed: 4200,
    pulseDelay: 1800,
  },

  // ------------------------------------------------------------
  // PROJECTS SECTION ROUTES
  // ------------------------------------------------------------
  {
    id: 'projects-route-a',
    name: 'Projects Left Control Trunk',
    section: 'work',
    path: 'M 120 220 L 360 220 L 380 240 L 380 620 L 400 640 L 620 640',
    startNode: 'N_W01',
    endNode: 'N_W04',
    priority: 1,
    pulseSpeed: 3400,
    pulseDelay: 600,
  },
  {
    id: 'projects-route-b',
    name: 'Projects Right Sensor Trunk',
    section: 'work',
    path: 'M 1240 280 L 1540 280 L 1560 300 L 1560 700 L 1580 720 L 1740 720',
    startNode: 'N_W05',
    endNode: 'N_W08',
    priority: 2,
    pulseSpeed: 3800,
    pulseDelay: 1500,
  },

  // ------------------------------------------------------------
  // HARDWARE & SKILLS ROUTES
  // ------------------------------------------------------------
  {
    id: 'hardware-galvanic-spine',
    name: 'Hardware Isolation Spine',
    section: 'hardware',
    path: 'M 160 180 L 400 180 L 420 200 L 420 500 L 440 520 L 860 520',
    startNode: 'N_S01',
    endNode: 'N_S04',
    priority: 1,
    pulseSpeed: 3500,
    pulseDelay: 900,
  },
  {
    id: 'skills-interconnect',
    name: 'Skills Perception Gateway',
    section: 'skills',
    path: 'M 1040 320 L 1360 320 L 1380 340 L 1380 740 L 1400 760 L 1680 760',
    startNode: 'N_S05',
    endNode: 'N_S08',
    priority: 2,
    pulseSpeed: 3900,
    pulseDelay: 2000,
  },

  // ------------------------------------------------------------
  // ABOUT / CHRONOLOGY ROUTES
  // ------------------------------------------------------------
  {
    id: 'about-chronology-spine',
    name: 'About Chronological Datum',
    section: 'about',
    path: 'M 220 140 L 520 140 L 540 160 L 540 460 L 560 480 L 760 480 L 780 500 L 780 820 L 1220 820',
    startNode: 'N_A01',
    endNode: 'N_A06',
    priority: 1,
    pulseSpeed: 4500,
    pulseDelay: 800,
  },

  // ------------------------------------------------------------
  // CONTACT / DISPATCH ROUTES
  // ------------------------------------------------------------
  {
    id: 'contact-convergence-left',
    name: 'Contact Converge Port Left',
    section: 'contact',
    path: 'M 180 360 L 600 360 L 620 380 L 820 580 L 840 580',
    startNode: 'N_C01',
    endNode: 'N_C03',
    priority: 1,
    pulseSpeed: 3100,
    pulseDelay: 500,
  },
  {
    id: 'contact-convergence-right',
    name: 'Contact Converge Port Right',
    section: 'contact',
    path: 'M 1720 360 L 1320 360 L 1300 380 L 1100 580 L 1080 580',
    startNode: 'N_C06',
    endNode: 'N_C04',
    priority: 1,
    pulseSpeed: 3100,
    pulseDelay: 1100,
  },
];
