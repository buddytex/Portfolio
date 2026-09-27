export interface PCBArtifact {
  id: string;
  name: string;
  subsystem: string;
  project: string;
  projectId: string;
  dimensions: string;
  layerCount: string;
  finish: string;
  problemSolved: string;
  designDecisions: string;
  specs: { label: string; value: string }[];
  testPoints: { id: string; x: number; y: number; label: string; desc: string }[];
  /** Path to original Gerber archive for download (relative to /media/) */
  gerberArchive?: string;
  /** Path to preprocessed JSON geometry (relative to /pcb-data/) */
  gerberDataFile?: string;
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
  {
    id: 'estop-interlock',
    name: 'Fail-Safe Hardware E-Stop Interlock Board',
    subsystem: 'Dual-Channel Emergency Power Severing',
    project: 'aBAJA SAEINDIA 2026 Safety Architecture',
    projectId: 'baja-2026',
    dimensions: '82 mm × 64 mm',
    layerCount: '2-Layer 2oz Heavy Copper',
    finish: 'Lead-Free HASL with Conformal Coating',
    designSoftware: 'KiCad EDA',
    dataUsed: 'Hardware Safety Prototype Architecture',
    whatIDesigned: 'Purely hardware-arbitrated dual-channel latching circuit with SCR latching relay, sub-5ms contact separation, and isolated telemetry dry-contact feedback.',
    problemSolved: 'Prevented autonomous vehicle runaway in the event of trajectory software faults, communication link loss, or compute freeze during competition trials.',
    designDecisions: 'Purely hardware-arbitrated dual-channel latching circuit requiring active manual reset. Operates completely independent of microcontroller firmware or software state with sub-5ms relay contact separation.',
    specs: [
      { label: 'Relay Configuration', value: 'Dual Form-C Normally Closed' },
      { label: 'Response Latency', value: '< 5 ms Hardware Trip' },
      { label: 'Current Rating', value: '40 A Continuous (80 A Peak)' },
      { label: 'Trigger Channels', value: 'RF Wireless Link + Physical Cockpit Slap' },
      { label: 'Interlock Logic', value: 'Hardware SCR Latching Relay' },
    ],
    testPoints: [
      { id: 'tp-relay', x: 68, y: 48, label: 'TP_RELAY: Safety Contacts', desc: 'Dual redundant relay contacts switching the high-current battery line.' },
      { id: 'tp-trip', x: 32, y: 30, label: 'TP_TRIP: Latch Trigger', desc: 'Hardware latch trigger input with optocoupled RC noise debounce.' },
      { id: 'tp-stat', x: 45, y: 75, label: 'TP_STAT: Telemetry Out', desc: 'Isolated dry-contact feedback to ROS 2 logger indicating safety state.' },
    ],
  },
  {
    id: 'swarm-node',
    name: 'Swarm Robotics Mesh & Motor Node',
    subsystem: 'Distributed Agent Compute & Motor Driver',
    project: 'Swarm Robotics Platform',
    projectId: 'swarm-robotics',
    dimensions: '62 mm × 62 mm',
    layerCount: '2-Layer FR4 Standard',
    finish: 'ENIG Gold',
    designSoftware: 'KiCad EDA',
    dataUsed: 'Multi-Agent Mesh Architecture',
    whatIDesigned: 'ESP32 modular compute carrier, dual H-bridge motor driver interface, optical wheel encoder conditioning, and regulated LiPo power rail.',
    problemSolved: 'Packaged dual-core compute, ad-hoc wireless mesh communications, dual H-bridge motor drivers, and 4-channel proximity sensing into a compact mobile agent footprint.',
    designDecisions: 'Dedicated Core 0 to real-time closed-loop encoder PID and Core 1 to peer-to-peer TCP/IP mesh consensus broadcasts, eliminating latency jitter.',
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