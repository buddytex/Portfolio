export interface PCBArtifact {
  id: string;
  name: string;
  /** Short uppercase label for the showcase tab bar */
  tabLabel?: string;
  subsystem: string;
  project: string;
  /** Project page id (omit when the board has no dedicated project page) */
  projectId?: string;
  dimensions: string;
  layerCount: string;
  finish: string;
  problemSolved?: string;
  designDecisions?: string;
  specs: { label: string; value: string }[];
  testPoints: { id: string; x: number; y: number; label: string; desc: string }[];
  /** Path to original Gerber archive for download (relative to /media/) */
  gerberArchive?: string;
  /** Path to preprocessed JSON geometry (relative to /pcb-data/) */
  gerberDataFile?: string;
  /** Static renders for reuse on other sites (relative to /media/) */
  renders?: { top?: string; bottom?: string; iso?: string };
  /** Board type label */
  boardType?: string;
  /** Design CAD Software */
  designSoftware?: string;
  /** Primary Data Source */
  dataUsed?: string;
  /** What Naveen Personally Designed */
  whatIDesigned?: string;
}

export const pcbArtifacts: PCBArtifact[] = [
  {
    id: 'vehicle-ecu',
    name: 'Custom Multi-Layer Vehicle ECU',
    tabLabel: '★ BACK-BOX ECU (2026)',
    subsystem: 'Steer-by-Wire & Isolated CAN Gateway',
    project: 'aBAJA SAEINDIA 2026 (Car A18 · AIR 11)',
    projectId: 'baja-2026',
    dimensions: '201.5 mm × 138.5 mm',
    layerCount: '2-Layer FR4 (1.6mm)',
    finish: 'ENIG (Electroless Nickel Immersion Gold)',
    designSoftware: 'KiCad EDA',
    dataUsed: 'RS-274X Gerber Archive (Back_Box_2026.zip)',
    whatIDesigned: 'Galvanic isolation barrier, CAN 2.0B differential split termination, TVS transient suppression, and automotive-grade buck power regulation.',
    problemSolved: 'Eliminated high-current electromagnetic interference (EMI) and 24V servo inductive kickback that caused logic microcontrollers to brown out during rapid full-lock steering on rough off-road terrain.',
    designDecisions: 'Physically separated power and logic planes via optocoupled galvanic isolation. Routed differential CAN 2.0B traces with matched 120Ω split termination and common-mode TVS protection (SMBJ24CA).',
    gerberArchive: 'Gerbers/Back_Box_2026.zip',
    gerberDataFile: 'back-box-2026.json',
    boardType: 'Back-Box ECU',
    specs: [
      { label: 'Layer Stackup', value: '2-Layer (Sig / GND)' },
      { label: 'Isolation Barrier', value: '2.5 kV Galvanic Isolation' },
      { label: 'Bus Standard', value: 'CAN 2.0B @ 500 kbps' },
      { label: 'Connector Header', value: 'Automotive Deutsch DT04-12P' },
      { label: 'Supply Input', value: '18V – 32V Transient Protected' },
    ],
    testPoints: [
      { id: 'tp-iso', x: 50, y: 50, label: 'TP_ISO: Isolation Barrier', desc: 'Optical barrier separating 24V actuator ground from 3.3V logic.' },
      { id: 'tp-can', x: 82, y: 28, label: 'TP_CAN: Differential Bus', desc: 'CAN_H/CAN_L differential pair terminated with 120Ω ±1% split network.' },
      { id: 'tp-pwr', x: 22, y: 78, label: 'TP_PWR: Buck Regulator', desc: 'Automotive-grade step-down stage with LC filter generating quiet 5.0V/3.3V.' },
      { id: 'tp-mcu', x: 38, y: 35, label: 'TP_MCU: Controller Core', desc: 'ARM Cortex M4 with hardware PWM timers and quadrature encoder ISRs.' },
    ],
  },
  {
    id: 'front-box-ecu',
    name: 'Front-Box ECU — Sensor Interface & Steering Controller',
    tabLabel: 'FRONT-BOX ECU (2026)',
    subsystem: 'Front Sensor Hub & Steering Actuator Interface',
    project: 'aBAJA SAEINDIA 2026 (Car A18 · AIR 11)',
    projectId: 'baja-2026',
    dimensions: '224.5 mm × 180.0 mm',
    layerCount: '2-Layer FR4 (1.6mm)',
    finish: 'ENIG (Electroless Nickel Immersion Gold)',
    designSoftware: 'KiCad EDA',
    dataUsed: 'RS-274X Gerber Archive (Front_Box_2026.rar)',
    whatIDesigned: 'Sensor interface distribution, low-noise copper ground planes, weatherproof automotive header breakouts, and CAN bus transceiver layout.',
    problemSolved: 'Centralized front vehicle sensing (LiDAR, camera, proximity) and steering actuator control into a single weatherproof enclosure with filtered power distribution and CAN bus connectivity.',
    designDecisions: 'Wide board form factor allows direct header-to-sensor cabling without intermediate wiring harness. Copper pour ground plane minimizes RF interference from high-speed sensor data lines.',
    gerberArchive: 'Gerbers/Front_Box_2026.rar',
    gerberDataFile: 'front-box-2026.json',
    boardType: 'Front-Box ECU',
    specs: [
      { label: 'Layer Stackup', value: '2-Layer (Sig / GND)' },
      { label: 'Board Dimensions', value: '224.5 × 180.0 mm' },
      { label: 'Bus Standard', value: 'CAN 2.0B @ 500 kbps' },
      { label: 'Mounting', value: '6× M3 NPTH Mounting Points' },
      { label: 'Supply Input', value: '12V–32V Automotive Input' },
    ],
    testPoints: [
      { id: 'tp-can-f', x: 75, y: 30, label: 'TP_CAN: CAN Bus Interface', desc: 'CAN 2.0B differential pair with split termination to vehicle backbone.' },
      { id: 'tp-pwr-f', x: 25, y: 70, label: 'TP_PWR: Power Distribution', desc: 'Filtered 12V input with automotive TVS protection and LC pre-filter.' },
      { id: 'tp-sensor', x: 60, y: 55, label: 'TP_SENS: Sensor Headers', desc: 'Multi-channel sensor interface headers for LiDAR, camera, and proximity inputs.' },
    ],
  },

  // ── Gerber-backed boards added from media/gerbers.zip ──
  // Specs below are measured directly from the fabrication files (outline, drill tables, KiCad job header).
  {
    id: 'abaja-main-2025',
    name: 'aBAJA 2025 Main PCB',
    tabLabel: 'MAIN PCB (2025)',
    subsystem: 'Vehicle Electronics · Main Board',
    project: 'aBAJA SAEINDIA 2025 (Car A12 · AIR 7)',
    projectId: 'baja-2025',
    dimensions: '159.5 mm × 151.0 mm',
    layerCount: '2-Layer FR4 (1.6mm)',
    finish: 'Production Gerber Set',
    designSoftware: 'KiCad 9.0.3 (Pcbnew)',
    dataUsed: 'RS-274X Gerber Archive (aBAJA_Main_PCB_2025.rar)',
    gerberArchive: 'Gerbers/aBAJA_Main_PCB_2025.rar',
    gerberDataFile: 'abaja-main-2025.json',
    renders: { top: 'pcb-renders/abaja-main-2025/top.png', bottom: 'pcb-renders/abaja-main-2025/bottom.png', iso: 'pcb-renders/abaja-main-2025/iso.png' },
    boardType: 'Main PCB',
    specs: [
      { label: 'Board Outline', value: '159.5 × 151.0 mm' },
      { label: 'Copper Layers', value: '2 (F.Cu / B.Cu)' },
      { label: 'Plated Through-Holes', value: '129' },
      { label: 'Mounting / NPTH Holes', value: '6' },
      { label: 'EDA Tool', value: 'KiCad 9.0.3' },
    ],
    testPoints: [],
  },
  {
    id: 'abaja-tbu-2025',
    name: 'aBAJA 2025 TBU Board',
    tabLabel: 'TBU (2025)',
    subsystem: 'Vehicle Electronics · TBU',
    project: 'aBAJA SAEINDIA 2025 (Car A12 · AIR 7)',
    projectId: 'baja-2025',
    dimensions: '161.0 mm × 140.0 mm',
    layerCount: '2-Layer FR4 (1.6mm)',
    finish: 'Production Gerber Set',
    designSoftware: 'KiCad 9.0.3 (Pcbnew)',
    dataUsed: 'RS-274X Gerber Archive (aBAJA_TBU_2025.rar)',
    gerberArchive: 'Gerbers/aBAJA_TBU_2025.rar',
    gerberDataFile: 'abaja-tbu-2025.json',
    renders: { top: 'pcb-renders/abaja-tbu-2025/top.png', bottom: 'pcb-renders/abaja-tbu-2025/bottom.png', iso: 'pcb-renders/abaja-tbu-2025/iso.png' },
    boardType: 'TBU',
    specs: [
      { label: 'Board Outline', value: '161.0 × 140.0 mm' },
      { label: 'Copper Layers', value: '2 (F.Cu / B.Cu)' },
      { label: 'Plated Through-Holes', value: '152' },
      { label: 'Mounting / NPTH Holes', value: '4' },
      { label: 'EDA Tool', value: 'KiCad 9.0.3' },
    ],
    testPoints: [],
  },
  {
    id: 'abaja-ssu-2025',
    name: 'aBAJA 2025 SSU Board',
    tabLabel: 'SSU (2025)',
    subsystem: 'Vehicle Electronics · SSU',
    project: 'aBAJA SAEINDIA 2025 (Car A12 · AIR 7)',
    projectId: 'baja-2025',
    dimensions: '136.5 mm × 123.5 mm',
    layerCount: '2-Layer FR4 (1.6mm)',
    finish: 'Production Gerber Set',
    designSoftware: 'KiCad 9.0.3 (Pcbnew)',
    dataUsed: 'RS-274X Gerber Archive (aBAJA_SSU_2025.rar)',
    gerberArchive: 'Gerbers/aBAJA_SSU_2025.rar',
    gerberDataFile: 'abaja-ssu-2025.json',
    renders: { top: 'pcb-renders/abaja-ssu-2025/top.png', bottom: 'pcb-renders/abaja-ssu-2025/bottom.png', iso: 'pcb-renders/abaja-ssu-2025/iso.png' },
    boardType: 'SSU',
    specs: [
      { label: 'Board Outline', value: '136.5 × 123.5 mm' },
      { label: 'Copper Layers', value: '2 (F.Cu / B.Cu)' },
      { label: 'Plated Through-Holes', value: '128' },
      { label: 'EDA Tool', value: 'KiCad 9.0.3' },
    ],
    testPoints: [],
  },
  {
    id: 'abaja-dashboard-2025',
    name: 'aBAJA 2025 Driver Dashboard PCB',
    tabLabel: 'DASHBOARD (2025)',
    subsystem: 'Vehicle Electronics · Dashboard',
    project: 'aBAJA SAEINDIA 2025 (Car A12 · AIR 7)',
    projectId: 'baja-2025',
    dimensions: '133.0 mm × 115.0 mm',
    layerCount: '2-Layer FR4 (1.6mm)',
    finish: 'Production Gerber Set',
    designSoftware: 'KiCad 9.0.3 (Pcbnew)',
    dataUsed: 'RS-274X Gerber Archive (aBAJA_Dashboard_2025.rar)',
    gerberArchive: 'Gerbers/aBAJA_Dashboard_2025.rar',
    gerberDataFile: 'abaja-dashboard-2025.json',
    renders: { top: 'pcb-renders/abaja-dashboard-2025/top.png', bottom: 'pcb-renders/abaja-dashboard-2025/bottom.png', iso: 'pcb-renders/abaja-dashboard-2025/iso.png' },
    boardType: 'Dashboard',
    specs: [
      { label: 'Board Outline', value: '133.0 × 115.0 mm' },
      { label: 'Copper Layers', value: '2 (F.Cu / B.Cu)' },
      { label: 'Plated Through-Holes', value: '147' },
      { label: 'Mounting / NPTH Holes', value: '4' },
      { label: 'EDA Tool', value: 'KiCad 9.0.3' },
    ],
    testPoints: [],
  },
  {
    id: 'rail-agent',
    name: 'Rail-Agent Controller PCB',
    tabLabel: 'RAIL-AGENT',
    subsystem: 'Rail-Agent · Rover Electronics',
    project: 'RailGuard AI / Rail-Agent',
    projectId: 'railguard-ai',
    dimensions: '≈114 mm × 85.5 mm (component extents)',
    layerCount: '2-Layer FR4 (1.6mm)',
    finish: 'Production Gerber Set',
    designSoftware: 'KiCad 10.0.2 (Pcbnew)',
    dataUsed: 'RS-274X Gerber Archive (Rail_Agent.rar)',
    gerberArchive: 'Gerbers/Rail_Agent.rar',
    gerberDataFile: 'rail-agent.json',
    renders: { top: 'pcb-renders/rail-agent/top.png', bottom: 'pcb-renders/rail-agent/bottom.png', iso: 'pcb-renders/rail-agent/iso.png' },
    boardType: 'Controller PCB',
    specs: [
      { label: 'Footprint Extents', value: '≈114 × 85.5 mm' },
      { label: 'Copper Layers', value: '2 (F.Cu / B.Cu)' },
      { label: 'Plated Through-Holes', value: '102' },
      { label: 'Mounting / NPTH Holes', value: '4' },
      { label: 'EDA Tool', value: 'KiCad 10.0.2' },
    ],
    testPoints: [],
  },
  {
    id: 'atbots-v4',
    name: 'Atbots v4 PCB',
    tabLabel: 'ATBOTS v4',
    subsystem: 'Industry Client Work · Atbots',
    project: 'Atbots (company project)',
    dimensions: '80.0 mm × 93.0 mm',
    layerCount: '2-Layer FR4 (1.6mm)',
    finish: 'Production Gerber Set',
    designSoftware: 'KiCad 10.0.2 (Pcbnew)',
    dataUsed: 'RS-274X Gerber Archive (Atbots_v4.zip)',
    gerberArchive: 'Gerbers/Atbots_v4.zip',
    gerberDataFile: 'atbots-v4.json',
    renders: { top: 'pcb-renders/atbots-v4/top.png', bottom: 'pcb-renders/atbots-v4/bottom.png', iso: 'pcb-renders/atbots-v4/iso.png' },
    boardType: 'Revision v4',
    specs: [
      { label: 'Board Outline', value: '80.0 × 93.0 mm' },
      { label: 'Copper Layers', value: '2 (F.Cu / B.Cu)' },
      { label: 'Plated Through-Holes', value: '177' },
      { label: 'Mounting / NPTH Holes', value: '5' },
      { label: 'EDA Tool', value: 'KiCad 10.0.2' },
    ],
    testPoints: [],
  },
  {
    id: 'swarm-node',
    name: 'Swarm Robotics Mesh & Motor Node',
    tabLabel: 'SWARM NODE',
    subsystem: 'Distributed Agent Compute & Motor Driver',
    project: 'Swarm Robotics Platform',
    projectId: 'swarm-robotics',
    dimensions: '74 mm × 78 mm × 77 mm',
    layerCount: 'Multi-Tier Modular Stackup',
    finish: 'ENIG Gold / Double-Sided FR4',
    designSoftware: 'EAGLE CAD & KiCad EDA',
    dataUsed: 'VeRLab HeRo Common (CAD, Meshes & EAGLE Architecture)',
    whatIDesigned: 'ESP32 two-robot master-slave coordination firmware, IR proximity ring thresholding, motor driver integration, and peer-to-peer TCP communication protocols.',
    problemSolved: 'Integrated decentralized compute, ad-hoc wireless mesh comms, dual DC motor drivers, and infrared proximity sensing into a compact 74mm swarm mobile robot footprint.',
    designDecisions: 'Modular stacked architecture separating power and motor drive plane from microcontroller logic and optical tracking hat. Differential drive with dual micro-motors.',
    specs: [
      { label: 'Microcontroller', value: 'Dual-Core ESP32 @ 240 MHz' },
      { label: 'Motor Drivers', value: 'Dual Integrated Full H-Bridge' },
      { label: 'RF Interface', value: '2.4 GHz 802.11 b/g/n Mesh' },
      { label: 'Sensor Headers', value: '4x Time-of-Flight / Proximity' },
      { label: 'Battery Management', value: 'Single-Cell LiPo Charger & Protection' },
    ],
    testPoints: [
      { id: 'tp-rf', x: 75, y: 22, label: 'TP_RF: Mesh Antenna Trace', desc: 'Pi-matched ceramic inverted-F antenna tuned for 2.4GHz ad-hoc broadcasts.' },
      { id: 'tp-drv', x: 50, y: 65, label: 'TP_DRV: Dual H-Bridge', desc: 'PWM motor driver outputs with integrated flyback diode protection.' },
      { id: 'tp-bms', x: 25, y: 42, label: 'TP_BMS: Power Supply Rail', desc: '3.7V LiPo battery management and low-dropout 3.3V linear regulator.' },
    ],
  },
];