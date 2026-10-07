export interface MediaItem {
  path: string;
  type: 'image' | 'video';
  title: string;
  caption?: string;
  badge?: string;
  poster?: string;
}

export interface MediaGalleryGroup {
  id: string;
  title: string;
  items: MediaItem[];
}

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  role: string;
  shortRole: string;
  keyAreas: string[];
  skillsUsed: string[];
  personalContributions?: string[];
  teamSystem?: string[];
  projectType?: 'competition' | 'academic' | 'hackathon' | 'research';
  engineeringDecisions?: string[];
  year: string;
  status: string;
  domain: string;
  category: 'autonomous' | 'robotics' | 'vision' | 'embedded' | 'hardware';
  summary: string;
  challenge: string;
  approach: string;
  systemArchitecture: string[];
  softwareStack: string[];
  hardwareStack: string[];
  keyResults: string[];
  ownershipStory?: {
    title: string;
    narrative: string;
    takeaways: string[];
  };
  failuresAndIterations?: {
    issue: string;
    rootCause: string;
    iteration: string;
  }[];
  githubUrl?: string;
  visualSignature: 'trajectory' | 'lidar' | 'vision' | 'swarm' | 'rail' | 'balance' | 'agv' | 'lane' | 'surgical' | 'mechatronics';
  featured?: boolean;
  imagePath?: string;
  secondaryImage?: string;
  featuredVideo?: {
    path: string;
    poster?: string;
    title: string;
    caption: string;
    badge: string;
  };
  attribution?: {
    source: string;
    project: string;
    repository: string;
    website: string;
    license: string;
  };
  mediaGalleries?: MediaGalleryGroup[];
}

export const projects: Project[] = [
  // ============================================================
  // PROJECT 01 — aBAJA SAEINDIA 2025 (Car A12 · AIR 7)
  // ============================================================
  {
    id: 'baja-2025',
    index: '01',
    title: 'aBAJA SAEINDIA 2025',
    featured: true,
    subtitle: 'Autonomous All-Terrain Vehicle · Car A12 · Team Equinox',
    role: 'Electrical & Electronics Division · Vehicle Development',
    shortRole: 'E&E Division — Vehicle Development',
    keyAreas: ['Vehicle Electrical', 'Relay Control Systems', 'Sensor Integration', 'Wiring', 'Hands-on Fabrication', 'Project Ownership'],
    skillsUsed: [
      'Wiring Harness Fabrication',
      'Mechanical Fabrication',
      'Hands-on Prototyping',
      'Mechanical Assembly',
      'Electronics Debugging',
      'Team Leadership',
      'C++',
      'Python'
    ],
    ownershipStory: {
      title: 'Taking Ownership: Built When It Had to Be Built',
      narrative: 'During the 2025 Baja campaign, the team situation deteriorated and overall build momentum effectively stalled, leaving the autonomous vehicle and its subsystems at risk of not qualifying for the national arena. Rather than allowing months of collegiate preparation to lapse, I stepped into the breach and spent months personally developing, troubleshooting, and fabricating the vehicle and its core systems. Working late into the night in the college workshop, I wired the complete electrical distribution box, built the relay switching boards, resolved mechanical mounting constraints, and ensured the sensor suite was integrated and calibrated. This pivotal trial taught me true engineering persistence: stepping up when external support falters, learning whatever mechanical or electrical disciplines are needed on the fly, and taking absolute ownership until Car A12 reached the competition grounds—earning All India Rank 7 nationally.',
      takeaways: [
        'Personal accountability: Taking complete responsibility when project continuity is threatened',
        'Multi-domain execution: Bridging electrical wiring, mechanical fitting, and system troubleshooting',
        'Grounded engineering grit: Overcoming setbacks through hands-on fabrication to meet strict competition deadlines'
      ]
    },
    personalContributions: [
      'Stepped up during a critical team stall to personally assemble and integrate key vehicle electrical, relay control, and sensor subsystems.',
      'Fabricated and routed the high-current relay power switching box and safety E-Stop interlock circuits for Car A12.',
      'Overcame mechanical and electrical mounting roadblocks through hands-on workshop fabrication, soldering, and harness crimping.',
      'Field-tested electrical integrity across dynamic off-road obstacle courses at BAJA SAEINDIA 2025, securing AIR 7.'
    ],
    engineeringDecisions: [
      'Relay-based switching architecture selected for initial prototype simplicity, rapid fabrication, and high noise immunity on rugged terrain.',
      'Direct sensor wiring approach used to establish a reliable baseline before migrating to a distributed CAN bus architecture in 2026.'
    ],
    year: '2025',
    status: 'AIR 7 — NATIONAL',
    domain: 'Autonomous Vehicle / Competition Engineering / Team Development',
    category: 'autonomous',
    summary: 'Took core ownership of electrical development and vehicle assembly for Team Equinox\'s inaugural autonomous Baja vehicle (Car A12), bringing the car to the dirt track to compete at BAJA SAEINDIA 2025 and achieve All India Rank 7 nationally.',
    challenge: 'Overcoming team attrition and severe build delays to deliver a fully functional, scrutiny-compliant autonomous vehicle electrical system within strict national competition deadlines.',
    approach: 'Personally built the relay-based power switching systems, integrated safety interlocks, routed custom harnesses, and conducted comprehensive hands-on workshop fabrication and testing.',
    systemArchitecture: [
      'Relay-Based Power Switching & Control',
      'Direct Sensor Wiring & Signal Conditioning',
      'Emergency Stop Safety Circuit',
      'Battery Power Distribution',
      'Autonomous Perception Sensor Mounting'
    ],
    softwareStack: ['Arduino IDE', 'Embedded C++', 'Serial Communication', 'Sensor Calibration'],
    hardwareStack: ['Arduino R4 Minima', '24V Relay Banks', 'Power Distribution Board', 'Safety Kill Switch', 'Sensor Mounts'],
    keyResults: [
      'All India Rank 7 (AIR 7) at BAJA SAEINDIA 2025 National Competition',
      'Successfully passed all technical scrutiny and safety inspections',
      'Completed dynamic endurance trials on off-road terrain'
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'trajectory',
    imagePath: '/media/projects/baja/baja-2025/vehicle/CAR_best_2025.jpeg',
    secondaryImage: '/media/projects/baja/baja-2025/team/spider1.png',
    featuredVideo: {
      path: '/media/projects/baja/baja-2025/WhatsApp Video 2026-09-25 at 17.17.53.mp4',
      poster: '/media/projects/baja/baja-2025/abaja2025bench.jpeg',
      title: 'Powertrain & Bench Electrical Testing',
      caption: 'Direct bench-level validation of the electric traction drive, motor controller, custom relay boards, and auxiliary 12V bus during shop development.',
      badge: 'BENCH TESTING EVIDENCE'
    },
    mediaGalleries: [
      {
        id: 'vehicle-2025',
        title: 'Car A12 — Competition Vehicle',
        items: [
          {
            path: '/media/projects/baja/baja-2025/vehicle/CAR_best_2025.jpeg',
            type: 'image',
            title: 'Car A12 at BAJA SAEINDIA 2025 Competition',
            caption: 'Autonomous Baja Car A12 with driver ready for dynamic endurance trials at the national competition arena. Teal/black livery with autonomous sensor suite visible.',
            badge: 'AIR 7 — NATIONAL'
          }
        ]
      },
      {
        id: 'electrical-2025',
        title: 'Electrical & Bench Systems — Taking Ownership Evidence',
        items: [
          {
            path: '/media/projects/baja/baja-2025/abaja2025bench.jpeg',
            type: 'image',
            title: 'Motor Test Bench & Power Electronics Setup',
            caption: 'Electric traction motor coupled to custom high-voltage orange motor cabling, industrial inverter box, 12V auxiliary battery, and hand-built relay switching boards during endurance bench tests.',
            badge: 'TEST BENCH'
          },
          {
            path: '/media/projects/baja/baja-2025/abaja2025.jpeg',
            type: 'image',
            title: 'Hand-Wired Protoboard Vehicle ECU & CAN Transceiver',
            caption: 'Custom point-to-point protoboard ECU integrating SN65HVD230 CAN transceiver, DC-DC step-down buck converter, screw terminal blocks, and inductive proximity sensor conditioning.',
            badge: 'CUSTOM ECU'
          },
          {
            path: '/media/projects/baja/baja-2025/WhatsApp Image 2026-09-25 at 17.19.43.jpeg',
            type: 'image',
            title: 'Chassis Electrical Enclosure & Dual-Level Control Boxes',
            caption: 'Integrated vehicle electrical enclosure with custom Equinox PCB, Arduino controller, high-current relay banks, and sealed IP-rated exterior distribution box with compute power brick.',
            badge: 'VEHICLE HARNESS'
          },
          {
            path: '/media/projects/baja/baja-2025/electrical/WhatsApp Image 2026-09-14 at 00.52.50.jpeg',
            type: 'image',
            title: 'Relay Control Box & Power Distribution',
            caption: 'Initial relay-based switching system with 24V relay banks and Arduino R4 Minima logic controller for vehicle power distribution.',
            badge: 'RELAY CONTROL'
          }
        ]
      },
      {
        id: 'team-2025',
        title: 'Team Equinox — 2025 Campaign',
        items: [
          {
            path: '/media/projects/baja/baja-2025/team/Pasted image.png',
            type: 'image',
            title: 'AIR 7 National Honors Poster',
            caption: 'Official institutional honors poster celebrating Team Equinox achieving All India Rank 7 at BAJA SAEINDIA 2025.',
            badge: 'NATIONAL AWARD'
          },
          {
            path: '/media/achievements/certificates/sae-baja-2025-cert.jpg',
            type: 'image',
            title: 'SAEINDIA aBAJA 2025 Certificate',
            caption: 'Official Certificate of Participation awarded to Naveen Shaji George for the aBAJA 2025 national campaign.',
            badge: 'OFFICIAL CREDENTIAL'
          },
          {
            path: '/media/projects/baja/baja-2025/team/spider1.png',
            type: 'image',
            title: 'Team Equinox with Car A12',
            caption: 'Team gathering at the national competition paddock after completing dynamic technical inspection.',
            badge: 'TEAM EQUINOX'
          },
          {
            path: '/media/projects/baja/baja-2025/team/spider2.jpeg',
            type: 'image',
            title: 'Team Photo at Competition Arena',
            caption: 'Team Equinox members at the BAJA SAEINDIA 2025 competition grounds.',
            badge: 'COMPETITION'
          },
          {
            path: '/media/projects/baja/baja-2025/team/WhatsApp Image 2026-09-14 at 00.52.51(1).jpeg',
            type: 'image',
            title: 'Post-Inspection Team Celebration',
            caption: 'Core engineering leads celebrating post-inspection qualification at the 2025 national event.',
            badge: 'QUALIFICATION'
          }
        ]
      }
    ]
  },

  // ============================================================
  // PROJECT 02 — aBAJA SAEINDIA 2026 (Car A18 · AIR 11)
  // ============================================================
  {
    id: 'baja-2026',
    index: '02',
    title: 'aBAJA SAEINDIA 2026',
    featured: true,
    subtitle: 'Custom ECU · CAN Bus · Drive-by-Wire · Car A18 · Team Equinox',
    role: 'Electrical & Electronics Head · Systems Architect',
    shortRole: 'Electrical & Electronics Head',
    keyAreas: ['CAN 2.0B', 'Custom ECU PCBs', 'Drive-by-Wire', 'KiCad PCB Design', 'HV/LV Wiring Harness', 'Galvanic Isolation'],
    skillsUsed: [
      'PCB Design in KiCad',
      'CAN 2.0B Protocol',
      'Drive-by-Wire (TBW / SBW / BBW)',
      'ESP32 & FreeRTOS',
      'Embedded C/C++',
      'Power Electronics & Galvanic Isolation',
      'Wiring Harness Design & Fabrication',
      'Schematic Design & Component Selection',
      'PCB Assembly (SMD & Through-Hole)',
      'Electronics Debugging & PCB Testing',
      'System Integration',
      'Technical Leadership',
      'Technical Documentation'
    ],
    teamSystem: [
      'Custom lightweight 4130 chromoly tubular spaceframe roll cage chassis designed by vehicle dynamics sub-team.',
      'Double A-arm front suspension and custom rear trailing arm geometry.',
      '48V electric traction powertrain and brushless DC motor integration.',
      'NVIDIA Jetson Orin Nano perception computing platform running autonomous state estimators.'
    ],
    personalContributions: [
      'Headed the Electrical & Electronics division as division lead, architecting the complete vehicle electrical system from ground up.',
      'Designed and assembled custom multi-layer ECU PCBs in KiCad with differential CAN transceivers, galvanic isolation, and MOSFET switching.',
      'Led the physical construction of HV and LV wiring harnesses with automotive Deutsch connectors, braided conduit protection, and chassis strain relief.',
      'Personally integrated, wired, and debugged Throttle-by-Wire, Brake-by-Wire, and Steer-by-Wire drive-by-wire systems.',
      'Authored the Engineering Design Dossier and defended electrical safety systems before national SAEINDIA technical judges.'
    ],
    engineeringDecisions: [
      'Dual-rail galvanic isolation between 24V motor traction drives and 3.3V logic rails using optocouplers to eliminate ground bounce from high-current actuators.',
      'Hardware-latching dual-channel normally-closed E-Stop relays arbitrated independently of software MCU state for unconditional fail-safe compliance.',
      'Split 120Ω differential CAN bus termination with 4.7nF common-mode filtering capacitor to suppress off-road inductive spikes at 500 kbps.',
      'Dual-core ESP32 FreeRTOS task scheduling: Core 0 handling high-speed CAN interrupts, Core 1 executing actuator control logic with zero timing jitter.'
    ],
    year: '2026',
    status: 'AIR 11 — NATIONAL',
    domain: 'Autonomous Vehicle / Embedded Systems / CAN 2.0B / PCB Design',
    category: 'autonomous',
    summary: 'Led the end-to-end electrical architecture as Electrical & Electronics Head for Team Equinox\'s autonomous Baja vehicle (Car A18). Designed custom multi-layer ECU PCBs, isolated 500 kbps CAN 2.0B network, full vehicle wiring harness, and complete drive-by-wire electro-mechanical actuation system.',
    challenge: 'Eliminating electromagnetic interference (EMI) from high-current motor draws corrupting low-voltage sensor lines, while guaranteeing sub-10ms deterministic actuator response latency on uneven off-road terrain with violent vibration.',
    approach: 'Engineered dual-rail galvanic isolation for HV and LV systems, designed custom multi-layer ECU PCBs with differential CAN 2.0B transceivers, constructed automotive-grade wiring harnesses, and built fail-safe hardware E-Stop interlocks directly coupled with ROS 2 trajectory controllers.',
    systemArchitecture: [
      'Dual Custom ECUs (Front + Rear) with FreeRTOS Task Scheduling',
      'Deterministic 500 kbps CAN 2.0B Vehicle Bus Network',
      'Galvanically Isolated HV (24V) / LV (3.3V) Power Distribution',
      'Electro-Mechanical Drive-by-Wire Actuation (Throttle, Brake, Steer)',
      'Fail-Safe Dual-Redundant Hardware E-Stop Interlock Circuit',
      'Jetson Orin Nano Perception Compute Gateway'
    ],
    softwareStack: ['ROS 2 Humble', 'Embedded C/C++', 'FreeRTOS', 'CAN 2.0B Protocol Stack', 'Telemetry Logging'],
    hardwareStack: ['Custom Multi-Layer ECU PCBs (KiCad)', 'CAN 2.0B Transceivers (MCP2515 / SN65HVD230)', 'Automotive Wiring Harness (Deutsch DT)', 'Drive-by-Wire Actuators', 'Linear Encoders', 'Hardware E-Stop Interlocks', 'Jetson Orin Nano'],
    keyResults: [
      'All India Rank 11 (AIR 11) at BAJA SAEINDIA 2026 National Competition',
      '100% electrical reliability across national off-road endurance challenges',
      'Successfully passed all technical scrutiny including accumulator isolation, E-Stop, and harness inspections',
      'Zero CAN bus communication failures during competition dynamic events'
    ],
    failuresAndIterations: [
      {
        issue: 'Transient inductive kickback from high-torque steering servos caused brownout resets on logic microcontrollers.',
        rootCause: 'Shared ground plane allowed high di/dt return currents to inject noise into low-voltage digital rails.',
        iteration: 'Redesigned PCB with separated star grounds and optocoupled gate drive stages, completely isolating 24V motor transients from 3.3V logic.'
      },
      {
        issue: 'Differential CAN frame drops during rapid full-lock steering maneuvers on rough terrain.',
        rootCause: 'Improper split termination impedance causing high-frequency reflections on the off-road harness.',
        iteration: 'Recalibrated split termination networks to exact 120Ω differential impedance with 4.7nF common-mode filtering capacitor.'
      }
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'trajectory',
    imagePath: '/media/projects/baja/baja-2026/vehicle/WhatsApp Image 2026-09-14 at 00.14.44.jpeg',
    secondaryImage: '/media/projects/baja/baja-2026/electrical/WhatsApp Image 2026-09-14 at 00.14.57(3).jpeg',
    featuredVideo: {
      path: '/media/projects/baja/baja-2026/electrical/WhatsApp Video 2026-09-14 at 01.00.19(1).mp4',
      poster: '/media/projects/baja/baja-2026/electrical/WhatsApp Image 2026-09-14 at 00.14.57(3).jpeg',
      title: 'Steer-by-Wire & Electronic Brake Actuation Bench Test',
      caption: 'Dynamic bench validation of Steer-by-Wire servo rack positioning and brake thresholding driven by custom ECU commands.',
      badge: 'BENCH TEST TELEMETRY'
    },
    mediaGalleries: [
      {
        id: 'vehicle-2026',
        title: 'Car A18 — Competition Vehicle',
        items: [
          {
            path: '/media/projects/baja/baja-2026/naveen_with_a18_vehicle.jpg',
            type: 'image',
            title: 'Physical Integration & Vehicle Build · Car A18',
            caption: 'Naveen Shaji George at the racing garage workshop sitting on the tyre of the completed autonomous Baja vehicle (Car A18) following electrical, wiring harness, and steer-by-wire system integration.',
            badge: 'PHYSICAL BUILD'
          },
          {
            path: '/media/projects/baja/baja-2026/vehicle/WhatsApp Image 2026-09-14 at 00.14.44.jpeg',
            type: 'image',
            title: 'Car A18 Autonomous Baja Vehicle',
            caption: 'Car A18 rear three-quarter view showing red/black livery, custom roll-cage geometry, high-clearance suspension, and electronics back-box enclosure.',
            badge: 'AIR 11 (2026)'
          },
          {
            path: '/media/projects/baja/baja-2026/vehicle/WhatsApp Image 2026-09-14 at 00.14.57(2).jpeg',
            type: 'image',
            title: 'Car A18 Paddock Position',
            caption: 'Post-inspection paddock view showing full vehicle profile with autonomous sensor suite and steer-by-wire zero-position calibration.',
            badge: 'CAR A18'
          }
        ]
      },
      {
        id: 'ecu-pcb',
        title: 'Custom ECU & PCB Design & Physical Assembly',
        items: [
          {
            path: '/media/projects/baja/baja-2026/WhatsApp Image 2026-09-25 at 23.39.45 (1).jpeg',
            type: 'image',
            title: 'KiCad Multi-Layer PCB Layout & Net Routing',
            caption: 'Computer-aided design layout in KiCad PCB Editor featuring 3 ESP32 headers (DBU, SW/CAN, DEBUG), differential CAN bus traces, optocoupled switching networks, and peripheral terminal connectors.',
            badge: 'KICAD DESIGN'
          },
          {
            path: '/media/projects/baja/baja-2026/WhatsApp Image 2026-09-25 at 23.39.46.jpeg',
            type: 'image',
            title: 'Fabricated Bare PCB Inspection at Spaceframe Chassis',
            caption: 'Inspecting the newly fabricated 2-layer JLCPCB Equinox board directly against the red tubular spaceframe roll cage chassis in the race workshop.',
            badge: 'FABRICATION'
          },
          {
            path: '/media/projects/baja/baja-2026/WhatsApp Image 2026-09-25 at 23.39.45.jpeg',
            type: 'image',
            title: 'SMD Soldering Bench & Assembly Workstation',
            caption: 'Soldering bench setup with green custom PCB, hot air rework wand, solder paste syringe, precision tweezers, IPA flux wash, and SMD component trays.',
            badge: 'PCB ASSEMBLY'
          },
          {
            path: '/media/projects/baja/baja-2026/WhatsApp Image 2026-09-25 at 23.39.45 (2).jpeg',
            type: 'image',
            title: 'Active Bench Power-Up & Firmware Telemetry Flash',
            caption: 'Fully assembled Backbox PCB running in the dark with green power rails, amber telemetry LEDs active, and dual ESP32 microcontrollers connected via USB debugging serial.',
            badge: 'BENCH POWER-ON'
          },
          {
            path: '/media/projects/baja/baja-2026/WhatsApp Image 2026-09-25 at 23.39.46 (1).jpeg',
            type: 'image',
            title: 'Chassis-Mounted Sealed Backbox & Brake-by-Wire Integration',
            caption: 'Sealed IP enclosure bolted into chassis frame, populated with ECU, wire-labeled terminal blocks, conduit cable glands, and Deutsch connectors alongside hydraulic master cylinder.',
            badge: 'IN-CHASSIS MOUNT'
          },
          {
            path: '/media/projects/baja/baja-2026/electrical/WhatsApp Image 2026-09-14 at 00.14.57(3).jpeg',
            type: 'image',
            title: 'Custom Equinox Back-Box ECU Overview',
            caption: 'Multi-layer PCB with dual ESP32 sockets, optocoupled galvanic isolation, terminal blocks, and Deutsch connector pass-throughs mounted in sealed automotive enclosure.',
            badge: 'CUSTOM ECU'
          },
          {
            path: '/media/projects/baja/baja-2026/electrical/WhatsApp Image 2026-09-14 at 00.14.57(1).jpeg',
            type: 'image',
            title: 'In-Vehicle Diagnostics & CAN Debugging',
            caption: 'Debugging CAN bus arbitration, sensor line health, and ECU firmware directly inside the cockpit testbay.',
            badge: 'DIAGNOSTICS'
          }
        ]
      },
      {
        id: 'wiring-harness',
        title: 'Wiring Harness Design & Fabrication',
        items: [
          {
            path: '/media/projects/baja/baja-2026/WiringHarness.jpeg',
            type: 'image',
            title: 'Complete Vehicle Wiring Harness on Board',
            caption: 'Full wiring harness laid out on harness fabrication board showing main trunk routing, labeled branch connectors, and braided conduit protection. Connector pinout labels visible.',
            badge: 'HARNESS ASSEMBLY'
          },
          {
            path: '/media/projects/baja/baja-2026/wring.jpeg',
            type: 'image',
            title: 'Harness Board — Front View',
            caption: 'Wiring harness trunk routing with protective braided conduit sleeving and labeled branch terminations for front and rear ECU connections.',
            badge: 'HARNESS ROUTING'
          },
          {
            path: '/media/projects/baja/baja-2026/wring2.jpeg',
            type: 'image',
            title: 'Harness Board — Full Layout',
            caption: 'Complete harness layout showing all signal branches, power distribution trunks, and labeled endpoint connectors in the workshop.',
            badge: 'FULL LAYOUT'
          },
          {
            path: '/media/projects/baja/baja-2026/wiring3.jpeg',
            type: 'image',
            title: 'Harness Detail — Connector Terminations',
            caption: 'Close-up showing individual wire terminations, heat-shrink insulation, and Deutsch connector crimp assemblies.',
            badge: 'CONNECTORS'
          },
          {
            path: '/media/projects/baja/baja-2026/electrical/WhatsApp Image 2026-09-14 at 00.15.05(1).jpeg',
            type: 'image',
            title: 'Weather-Pack Multi-Pin Connector',
            caption: 'Sealed automotive-grade multi-pin connector with IP67 rating, eliminating moisture and vibration ingress during off-road competition.',
            badge: 'IP67 CONNECTOR'
          },
          {
            path: '/media/projects/baja/baja-2026/electrical/WhatsApp Image 2026-09-14 at 00.15.06.jpeg',
            type: 'image',
            title: 'Braided Conduit on Chassis',
            caption: 'Abrasion-resistant braided conduit routed along chassis roll-cage members with vibration strain relief and secure tie-down points.',
            badge: 'RACE HARNESS'
          }
        ]
      },
      {
        id: 'technical-validation',
        title: 'Technical Inspection & Validation',
        items: [
          {
            path: '/media/projects/baja/baja-2026/electrical/WhatsApp Image 2026-09-14 at 00.15.05.jpeg',
            type: 'image',
            title: 'BAJA SAEINDIA Technical Inspection Pass',
            caption: 'Official signed technical inspection pass sticker verifying accumulator isolation, E-Stop functionality, and electrical safety for Electrical Head Naveen Shaji George.',
            badge: 'TECHNICAL PASS'
          }
        ]
      },
      {
        id: 'tests-2026',
        title: 'Live Hardware & Actuation Testing',
        items: [
          {
            path: '/media/projects/baja/baja-2026/electrical/WhatsApp Video 2026-09-14 at 01.00.19(1).mp4',
            type: 'video',
            title: 'Steer-by-Wire & Brake Actuation Bench Test',
            caption: 'Closed-loop electro-mechanical steer-by-wire and brake actuation responding to trajectory commands during bench validation.',
            badge: 'ACTUATION TEST',
            poster: '/media/projects/baja/baja-2026/electrical/WhatsApp Image 2026-09-14 at 00.14.57(3).jpeg'
          },
          {
            path: '/media/projects/baja/baja-2026/electrical/WhatsApp Video 2026-09-14 at 00.14.56.mp4',
            type: 'video',
            title: 'Custom ECU Power-On Verification',
            caption: 'Dual ESP32 FreeRTOS initialization showing status LEDs, CAN bus arbitration, and deterministic task scheduling.',
            badge: 'ECU RUNTIME',
            poster: '/media/projects/baja/baja-2026/electrical/WhatsApp Image 2026-09-14 at 00.14.57(3).jpeg'
          },
          {
            path: '/media/projects/baja/baja-2026/electrical/WhatsApp Video 2026-09-14 at 00.14.47.mp4',
            type: 'video',
            title: 'Electronics Bay Walkthrough',
            caption: 'Detailed physical inspection of DC-DC buck converters, main contactors, ECU gateway, and telemetry antennas installed in Car A18.',
            badge: 'BAY WALKTHROUGH',
            poster: '/media/projects/baja/baja-2026/vehicle/WhatsApp Image 2026-09-14 at 00.14.44.jpeg'
          }
        ]
      },
      {
        id: 'team-2026',
        title: 'Team Equinox — 2026 Campaign',
        items: [
          {
            path: '/media/projects/baja/baja-2026/team/Electrical-Head.jpeg',
            type: 'image',
            title: 'Naveen Shaji George — Electrical Head',
            caption: 'Wearing the official Team Equinox jersey showing "ELECTRICAL HEAD — NAVEEN" and Car A18 designation. Leading the electrical division for the 2026 national campaign.',
            badge: 'DIVISION HEAD'
          },
          {
            path: '/media/projects/baja/baja-2026/team/WhatsApp Image 2026-09-14 at 00.14.57.jpeg',
            type: 'image',
            title: 'Team at Competition Grounds',
            caption: 'Team Equinox at the BAJA SAEINDIA 2026 competition venue.',
            badge: 'TEAM 2026'
          },
          {
            path: '/media/projects/baja/baja-2026/team/WhatsApp Video 2026-09-14 at 00.59.31.mp4',
            type: 'video',
            title: 'Competition Venue Walkthrough',
            caption: 'Team Equinox members walking through the BAJA SAEINDIA 2026 competition grounds and paddock area.',
            badge: 'VENUE',
            poster: '/media/projects/baja/baja-2026/team/Electrical-Head.jpeg'
          }
        ]
      }
    ]
  },
  {
    id: 'hospital-amr',
    index: '03',
    title: 'Hospital Service AMR',
    featured: true,
    subtitle: 'B.Tech Main Project · Autonomous Healthcare Service Robot',
    role: 'B.Tech Main Project Lead · Autonomy & Embedded Systems',
    shortRole: 'Main Project Lead — Autonomy & Embedded',
    keyAreas: ['Nav2 Autonomy', 'LiDAR SLAM', 'ESP32 Motor Control', 'Dynamic Obstacle Avoidance', 'IoT Telemetry'],
    skillsUsed: [
      'Autonomous Navigation & Nav2',
      'SLAM & Localization',
      'ROS 2 (Humble)',
      '2D LiDAR Perception',
      'ESP32 & FreeRTOS',
      'Hardware-Software Co-Design',
      'Hands-on Prototyping',
      'Python',
      'C++'
    ],
    projectType: 'academic',
    personalContributions: [
      'Architected and engineered the physical autonomous mobile robot platform as my B.Tech College Main Project at Saintgits College of Engineering.',
      'Integrated 360-degree planar LiDAR SLAM with calibrated differential wheel encoders via an Extended Kalman Filter (robot_localization).',
      'Tuned dynamic layered costmaps in Nav2 with custom inflation radiuses for safe pedestrian deceleration and doorway navigation.',
      'Designed and assembled the physical robot chassis, differential drive base, ESP32 real-time motor controller, and power distribution.'
    ],
    engineeringDecisions: [
      'Used asymmetric exponential decay costmap inflation gradients to allow doorway passage without colliding with moving foot traffic.',
      'Implemented Extended Kalman Filter (robot_localization) fusing planar LiDAR scan matching with wheel odometry to eliminate rotational drift during turns.'
    ],
    year: '2024 – 2025',
    status: 'COLLEGE MAIN PROJECT',
    domain: 'Service Robotics / SLAM / Nav2 / College Main Project',
    category: 'robotics',
    summary: 'Architected and developed a physical autonomous mobile robot platform as my B.Tech College Main Project at Saintgits College of Engineering, designed to reliably navigate indoor healthcare corridors, avoid pedestrians, and transport medical payloads.',
    challenge: 'Mitigating odometric drift in feature-sparse hospital hallways, handling reflective glass barriers invisible to standard planar sensors, and executing fluid deceleration around sudden pedestrian paths.',
    approach: 'Integrated 360-degree planar LiDAR SLAM with calibrated differential wheel encoders using an Extended Kalman Filter (EKF). Configured dynamic layered costmaps in Nav2 with custom inflation radiuses and automated recovery behaviors.',
    systemArchitecture: [
      '360-Degree Planar LiDAR Scanning & Filter Layer',
      'SLAM Toolbox & Cartographer Sub-Centimeter Map Matching',
      'Nav2 Dynamic Costmaps with Inflation Recovery Behaviors',
      'Differential Drive Kinematics Controller with ESP32',
      'IoT MQTT Telemetry Gateway for Central Fleet Dispatch'
    ],
    softwareStack: ['ROS 2 Humble', 'Nav2 Navigation Stack', 'Cartographer / SLAM Toolbox', 'Python', 'MQTT Cloud Bridge'],
    hardwareStack: ['Raspberry Pi 4 (Main Compute)', 'Differential / Omnidirectional Chassis', '2D Planar LiDAR', 'ESP32 Motor Controller', 'Ultrasonic Safety Rings', 'Power Distribution Board'],
    keyResults: [
      'Sub-centimeter repeatability across structured indoor hospital waypoint runs',
      'Smooth dynamic pedestrian avoidance in congested corridor testbeds',
      'Low-latency IoT telemetry dispatch over MQTT bridge'
    ],
    failuresAndIterations: [
      {
        issue: 'Local trajectory planner oscillations in narrow doorways with pedestrian traffic.',
        rootCause: 'Symmetric inflation radius caused both sides of doorways to be marked as prohibitive cost zones.',
        iteration: 'Engineered asymmetric exponential decay costmap inflation gradients and reduced robot footprint padding upon detected doorway entrance.'
      }
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'lidar',
    imagePath: '/media/projects/Hospital/Hosptial_robot_side-view.jpeg',
    secondaryImage: '/media/projects/Hospital/WhatsApp Image 2026-09-23 at 16.11.51 (15).jpeg',
    mediaGalleries: [
      {
        id: 'amr-hardware',
        title: 'Robot Hardware & Structure',
        items: [
          {
            path: '/media/projects/Hospital/Hosptial_robot_side-view.jpeg',
            type: 'image',
            title: 'Hospital AMR — Clean Side Profile',
            caption: 'Autonomous mobile robot platform with full chassis enclosure, LiDAR perception mast, and clinical payload deck.',
            badge: 'FULL PROFILE'
          },
          {
            path: '/media/projects/Hospital/WhatsApp Image 2026-09-23 at 16.11.51 (15).jpeg',
            type: 'image',
            title: 'Hospital AMR — Three-Quarter Assembly View',
            caption: 'Three-quarter workshop view showing integrated LiDAR sensor, internal electronics bay, differential drive base, and battery compartment.',
            badge: 'CHASSIS & SENSORS'
          },
          {
            path: '/media/projects/Hospital/Hospfront.jpeg',
            type: 'image',
            title: 'Front View with MedBot Interface',
            caption: 'Front fascia showing differential wheel clearance and onboard MedBot touch telemetry screen display.',
            badge: 'FRONT VIEW'
          },
          {
            path: '/media/projects/Hospital/Hospback.jpeg',
            type: 'image',
            title: 'Rear Service & Access Panel',
            caption: 'Rear perspective showing power distribution access, charging interface, and E-Stop isolation switch.',
            badge: 'REAR ACCESS'
          },
          {
            path: '/media/projects/Hospital/hospside.jpeg',
            type: 'image',
            title: 'Side Profile & Clearance',
            caption: 'Ground clearance and low center of mass engineering for stable indoor hospital transport.',
            badge: 'SIDE ELEVATION'
          },
          {
            path: '/media/projects/Hospital/Hosptop.jpeg',
            type: 'image',
            title: 'Top-Down Payload Deck',
            caption: 'Spacious top payload surface designed for transporting medical supplies and clinical instrumentation.',
            badge: 'PAYLOAD DECK'
          }
        ]
      },
      {
        id: 'amr-sensors',
        title: 'Sensors, Drive Base & Perception Subsystems',
        items: [
          {
            path: '/media/projects/Hospital/Lidar_hosp.jpeg',
            type: 'image',
            title: 'Planar LiDAR Sensor & Standoff Mount',
            caption: 'Close-up of the 360-degree 2D planar LiDAR scanner mounted with vibration dampening standoffs and DC power harness.',
            badge: 'LIDAR SENSOR'
          },
          {
            path: '/media/projects/Hospital/WhatsApp Image 2026-09-25 at 23.39.44 (1).jpeg',
            type: 'image',
            title: 'Differential Drive Base Plate & Battery Bay',
            caption: 'Aluminum treadplate base showing RPLIDAR mount, step-down DC buck converter, Foxin 12V VRLA sealed rechargeable battery, and high-traction rubber drive wheels.',
            badge: 'DRIVE BASE'
          },
          {
            path: '/media/projects/Hospital/WhatsApp Image 2026-09-25 at 23.39.44 (2).jpeg',
            type: 'image',
            title: 'Vertical Sensor & Compute Column',
            caption: 'Front perspective showing the multi-tier aluminum extrusion column with top webcam, intermediate compute controller shelf, battery tray, and base LiDAR scanner.',
            badge: 'SENSOR COLUMN'
          },
          {
            path: '/media/projects/Hospital/Hostpital.jpeg',
            type: 'image',
            title: 'Prototype Development Rig',
            caption: 'Initial prototype structural frame during component layout and sensor calibration trials.',
            badge: 'PROTOTYPE RIG'
          },
          {
            path: '/media/projects/Hospital/Hosp1.jpeg',
            type: 'image',
            title: 'Electronics & Power Integration',
            caption: 'Internal wiring, buck converters, and ESP32 motor controller integration in the workshop.',
            badge: 'INTERNAL ELECTRONICS'
          }
        ]
      },
      {
        id: 'amr-team',
        title: 'B.Tech Engineering Project Team',
        items: [
          {
            path: '/media/projects/Hospital/WhatsApp Image 2026-09-25 at 23.39.44.jpeg',
            type: 'image',
            title: 'B.Tech Project Team with Physical AMR Prototype',
            caption: 'Saintgits College of Engineering B.Tech Final Year project team standing in the department corridor with the completed physical AMR robot. Naveen Shaji George on the far right.',
            badge: 'PROJECT TEAM'
          }
        ]
      }
    ]
  },
  {
    id: 'smart-cctv',
    index: '04',
    title: 'Smart CCTV Edge Vision & Anomaly Intelligence',
    featured: true,
    subtitle: 'National GenAI Hackathon 2024 · Intel AI Top 25 Finalist',
    role: 'Computer Vision & Edge AI Engineer',
    shortRole: 'Computer Vision & Edge AI Engineer',
    keyAreas: ['Intel oneAPI', 'OpenVINO', 'Real-Time YOLO', 'Threat Anomaly Detection', 'Edge AI'],
    skillsUsed: [
      'OpenCV',
      'YOLO & Object Detection',
      'Intel oneAPI & OpenVINO',
      'Real-Time Video Streaming',
      'Python',
      'Technology Benchmarking',
      'Technical Presentation Design'
    ],
    personalContributions: [
      'Developed real-time edge computer vision platform for National GenAI Hackathon 2024 (Intel AI Top 25 Finalist among 300+ teams).',
      'Built asynchronous multi-threaded OpenCV video acquisition pipeline achieving sub-35ms deterministic inference.',
      'Implemented concurrent facial recognition, emotional classification, and weapon/threat anomaly detection on local edge hardware.'
    ],
    engineeringDecisions: [
      'Decoupled RTSP video ingestion and neural inference into asynchronous worker threads with lock-free ring buffers to prevent frame backlog.',
      'Employed Intel OpenVINO INT8 model quantization on the edge CPU/iGPU accelerator to maintain sub-35ms throughput without cloud offloading.'
    ],
    year: '2024',
    status: 'TOP 25 INTEL HACKATHON',
    domain: 'Computer Vision / Edge AI / Intel oneAPI / Real-Time Detection',
    category: 'vision',
    summary: 'Built a high-throughput edge AI computer vision surveillance platform for the National GenAI Hackathon 2024 (organized in association with Intel), performing real-time facial recognition, emotional classification, and weapon/threat anomaly detection on compute-constrained edge accelerators.',
    challenge: 'Minimizing end-to-end inference latency under 40ms across live camera feeds while running concurrent object detection and facial classification pipelines on edge CPU/iGPU hardware without cloud offloading.',
    approach: 'Leveraged Intel oneAPI toolkits and OpenVINO runtime optimizations to quantize neural models and accelerate OpenCV frame pipelines. Built multi-threaded video stream acquisition and low-latency anomaly alert dispatch.',
    systemArchitecture: [
      'Multi-Threaded Video Ingestion Pipeline (OpenCV & RTSP)',
      'Intel oneAPI & OpenVINO Accelerated Neural Inference',
      'Real-Time Facial Landmark & Emotion Classification Model',
      'High-Sensitivity Threat & Weapon Anomaly Detector',
      'Instantaneous On-Premise Event Dispatch & Log Console'
    ],
    softwareStack: ['Intel oneAPI', 'OpenVINO', 'OpenCV', 'Python', 'YOLO Neural Models', 'NumPy'],
    hardwareStack: ['Intel Core Edge Accelerator', 'High-Res Optical Sensors', 'Dedicated Hardware Decoders'],
    keyResults: [
      'Secured Top 25 National Finalist ranking in the National Level GenAI Hackathon 2024 in association with Intel',
      'Sub-35ms deterministic inference latency running real-time detection on local edge hardware',
      '100% on-premise execution with zero cloud dependency or telemetry leakage'
    ],
    failuresAndIterations: [
      {
        issue: 'Inference pipeline bottleneck when concurrently evaluating facial landmarks and threat detection on a single thread.',
        rootCause: 'Sequential frame processing blocked camera buffer queues, inducing frame latency buildup.',
        iteration: 'Decoupled capture and inference stages into asynchronous worker threads with lock-free ring buffers, keeping latency locked at sub-35ms.'
      }
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'vision',
    imagePath: '/media/hackathons/intel-ai/IMG-20241127-WA0009.jpg',
    secondaryImage: '/media/hackathons/intel-ai/Intel .jpeg',
    featuredVideo: {
      path: '/media/hackathons/intel-ai/VID-20241127-WA0001.mp4',
      poster: '/media/hackathons/intel-ai/IMG-20241127-WA0009.jpg',
      title: 'Intel oneAPI Live Edge Video Intrusion Detection',
      caption: 'Live inference session demonstrating real-time computer vision bounding boxes and automated intrusion alerting on Intel edge hardware.',
      badge: 'INTEL AI LIVE DEMO'
    },
    mediaGalleries: [
      {
        id: 'intel-hackathon',
        title: 'Intel Hackathon Validation & Live Inference',
        items: [
          {
            path: '/media/hackathons/intel-ai/IMG-20241127-WA0009.jpg',
            type: 'image',
            title: 'OpenCV Anomaly & Threat Detection Engine',
            caption: 'Linux terminal running oneAPI neural inference with real-time bounding box detection alerts.',
            badge: 'oneAPI RUNTIME'
          },
          {
            path: '/media/hackathons/intel-ai/IMG-20241127-WA0008.jpg',
            type: 'image',
            title: 'Live Face & Emotion Tracking Interface',
            caption: 'Real-time multi-subject facial recognition and emotion classification dashboard running at the hackathon.',
            badge: 'LIVE DETECTION'
          },
          {
            path: '/media/hackathons/intel-ai/IMG-20241127-WA0006.jpg',
            type: 'image',
            title: 'Intel Hackathon Team Award Presentation',
            caption: 'Team Equinox members presenting verified Certificates of Appreciation at the Intel / KPR Institute backdrop.',
            badge: 'TEAM AWARD'
          },
          {
            path: '/media/achievements/certificates/intel-genai-hackathon-top25.jpg',
            type: 'image',
            title: 'Intel GenAI Hackathon 2024 Top 25 Certificate',
            caption: 'Official Certificate of Appreciation awarded to Naveen Shaji George for securing Top 25 in the National Level GenAI Hackathon.',
            badge: 'TOP 25 CERTIFICATE'
          },
          {
            path: '/media/hackathons/intel-ai/VID-20241127-WA0001.mp4',
            type: 'video',
            title: 'Live Real-Time Edge Vision Demonstration',
            caption: 'Video recording of dynamic bounding box tracking and immediate classification responses.',
            badge: 'VIDEO DEMO',
            poster: '/media/hackathons/intel-ai/IMG-20241127-WA0009.jpg'
          }
        ]
      },
      {
        id: 'event-participation',
        title: 'Event & Presentation Highlights',
        items: [
          {
            path: '/media/hackathons/intel-ai/Intel .jpeg',
            type: 'image',
            title: 'Naveen Shaji George at Intel Hackathon Stage',
            caption: 'Naveen at the National GenAI Hackathon banner "Learn Beyond" in association with Intel.',
            badge: 'INTEL EVENT'
          },
          {
            path: '/media/hackathons/intel-ai/IMG-20241127-WA0001.jpg',
            type: 'image',
            title: 'Naveen Shaji George Representing Saintgits',
            caption: 'Naveen Shaji George representing Saintgits College of Engineering at the Intel GenAI Hackathon.',
            badge: 'TEAM LEAD'
          },
          {
            path: '/media/hackathons/intel-ai/IMG-20241127-WA0010.jpg',
            type: 'image',
            title: 'Nighttime Hackathon Engineering Sprint',
            caption: 'Bench workstation developing facial expression recognition models in VS Code with Intel oneAPI environment.',
            badge: 'ENGINEERING SPRINT'
          },
          {
            path: '/media/hackathons/intel-ai/IMG-20241127-WA0004.jpg',
            type: 'image',
            title: 'Hackathon Finalist Presentation',
            caption: 'Official National GenAI Hackathon presentation venue in association with Intel.',
            badge: 'STAGE VENUE'
          }
        ]
      }
    ]
  },
  {
    id: 'railguard-ai',
    index: '05',
    title: 'RailGuard AI: Track Defect & Obstacle Anomaly System',
    featured: true,
    subtitle: 'Edge Vision Anomaly Detection & Autonomous Rover System',
    role: 'Lead AI & Embedded Systems Architect',
    shortRole: 'Lead AI & Embedded Systems Architect',
    keyAreas: ['Autonomous Rover', 'LiDAR Terrain Mapping', 'Neural Track Segmentation', 'Raspberry Pi 4 Compute', 'National Winner'],
    skillsUsed: [
      'Autonomous Mobile Platforms',
      '2D LiDAR Perception',
      'OpenCV',
      'YOLO & Object Detection',
      'Hands-on Prototyping',
      'Mechanical Assembly',
      'Python',
      'Team Coordination'
    ],
    personalContributions: [
      'Designed a 4-wheeled autonomous rover chassis for automated railway track crack and obstacle inspection.',
      'Integrated LiDAR range-finding with an Android mobile telemetry ground station UI for real-time defect geo-tagging.',
      'Won 1st Place National Honors at the Faraway International Hackathon among competitive collegiate teams.'
    ],
    engineeringDecisions: [
      'Optimized lightweight YOLO defect inference on Raspberry Pi 4 edge compute, pairing edge vision with real-time anomaly telemetry.',
      'Implemented local SQLite buffer queues to prevent data loss during transient wireless blackouts along railway tracks.'
    ],
    year: '2024',
    status: 'NATIONAL HACKATHON WINNER',
    domain: 'Edge AI / Computer Vision / Android / Railway Safety',
    category: 'vision',
    summary: 'Built an end-to-end autonomous railway inspection rover utilizing lightweight edge vision models on Raspberry Pi 4 for real-time track anomaly identification, paired with an Android telemetry station for sub-second emergency operator alerts.',
    challenge: 'Detecting subtle track defects and micro-fissures at vehicle velocities under extreme variable outdoor lighting, vibration, and constrained embedded compute availability.',
    approach: 'Deployed customized lightweight YOLO vision models onto onboard Raspberry Pi 4 compute hardware, feeding synchronized GPS tags and defect bounding boxes over a robust telemetry bridge.',
    systemArchitecture: [
      'High-Speed Optical Sensor Mount',
      'Lightweight Edge YOLO Inference & Defect Classifier',
      'Real-Time Telemetry Dispatcher & Local SQLite Buffer',
      'Android Ground Station Companion App',
      'Automated GPS-Tagged Defect Incident Logger'
    ],
    softwareStack: ['Python', 'YOLO', 'Android Kotlin', 'OpenCV', 'SQLite', 'REST API'],
    hardwareStack: ['Raspberry Pi 4 (Edge Compute)', 'Industrial Cameras', 'Wireless Telemetry Bridge', 'Shock-Isolated Enclosure'],
    keyResults: [
      'Real-time defect classification and bounding box localization on Raspberry Pi 4',
      '94.2% precision on rail obstacle and track distortion classification',
      'Instant wireless alert dispatch to maintenance station with sub-meter GPS accuracy'
    ],
    failuresAndIterations: [
      {
        issue: 'Direct sunlight reflections off polished steel rail heads created false positive fissure alerts.',
        rootCause: 'High specular highlights overwhelmed standard 8-bit dynamic range thresholds.',
        iteration: 'Added circular polarizing optical filters and trained a dedicated illumination-invariant HSV gradient augmentation pipeline.'
      }
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'rail',
    imagePath: '/media/projects/railguard-ai/event/WhatsApp Image 2026-09-14 at 00.59.22(1).jpeg',
    secondaryImage: '/media/projects/railguard-ai/app/WhatsApp Image 2026-09-14 at 00.59.28.jpeg',
    featuredVideo: {
      path: '/media/projects/railguard-ai/hardware-testing/WhatsApp Video 2026-09-14 at 01.00.21.mp4',
      poster: '/media/projects/railguard-ai/event/WhatsApp Image 2026-09-14 at 00.59.22(1).jpeg',
      title: 'Autonomous Rail Defect Rover Track Traversal & Testing',
      caption: 'Dynamic track testbed validation showing four-wheel drive rover traversing rail geometry with real-time anomaly detection.',
      badge: 'DYNAMIC TRACK TEST'
    },
    mediaGalleries: [
      {
        id: 'rover-testing',
        title: 'Autonomous Inspection Rover Hardware Testing',
        items: [
          {
            path: '/media/projects/railguard-ai/hardware-testing/WhatsApp Video 2026-09-14 at 00.59.27.mp4',
            type: 'video',
            title: 'Autonomous Inspection Rover Track Navigation',
            caption: 'Physical rover navigating across the testing surface running onboard defect detection.',
            badge: 'ROVER IN MOTION',
            poster: '/media/projects/railguard-ai/app/WhatsApp Image 2026-09-14 at 00.59.23.jpeg'
          },
          {
            path: '/media/projects/railguard-ai/hardware-testing/WhatsApp Video 2026-09-14 at 01.00.21.mp4',
            type: 'video',
            title: 'Dynamic Simulation & Anomaly Trigger Benchmark',
            caption: 'Rover testbed tracking obstacles facing the simulated track display feed.',
            badge: 'BENCHMARK RUN',
            poster: '/media/projects/railguard-ai/app/WhatsApp Image 2026-09-14 at 00.59.28.jpeg'
          }
        ]
      },
      {
        id: 'vision-app',
        title: 'Edge Vision & Ground Telemetry App',
        items: [
          {
            path: '/media/projects/railguard-ai/app/WhatsApp Image 2026-09-14 at 00.59.23.jpeg',
            type: 'image',
            title: 'RailGuard App UI · Neural Segmentation',
            caption: 'Mobile operator interface displaying real-time railway track segmentation and instant anomaly alerts.',
            badge: 'APP UI'
          },
          {
            path: '/media/projects/railguard-ai/app/WhatsApp Image 2026-09-14 at 00.59.28.jpeg',
            type: 'image',
            title: '3D LiDAR Radial Point Cloud Visualizer',
            caption: 'Radial point cloud distance mapping rendered in real-time on the companion ground station.',
            badge: 'POINT CLOUD'
          },
          {
            path: '/media/projects/railguard-ai/app/WhatsApp Video 2026-09-14 at 01.00.23.mp4',
            type: 'video',
            title: 'Real-Time Track Segmentation Demonstration',
            caption: 'Live demonstration of sub-50ms neural rail segmentation identifying boundary distortions.',
            badge: 'LIVE INFERENCE',
            poster: '/media/projects/railguard-ai/app/WhatsApp Image 2026-09-14 at 00.59.23.jpeg'
          },
          {
            path: '/media/projects/railguard-ai/app/WhatsApp Video 2026-09-14 at 01.00.19(3).mp4',
            type: 'video',
            title: 'Mobile App Obstacle Alert & Telemetry Demo',
            caption: 'Sub-second push alert pipeline dispatching classified obstacle tags and GPS coordinates.',
            badge: 'ALERT PIPELINE',
            poster: '/media/projects/railguard-ai/app/WhatsApp Image 2026-09-14 at 00.59.28.jpeg'
          }
        ]
      },
      {
        id: 'hackathon-event',
        title: 'Faraway International Hackathon Validation',
        items: [
          {
            path: '/media/projects/railguard-ai/event/WhatsApp Image 2026-09-14 at 00.59.22(1).jpeg',
            type: 'image',
            title: 'Faraway International Hackathon Main Arena',
            caption: 'The competitive hackathon arena where RailGuard AI competed across multi-stage technical evaluations.',
            badge: 'INTERNATIONAL EVENT'
          },
          {
            path: '/media/projects/railguard-ai/event/WhatsApp Image 2026-09-14 at 00.59.22.jpeg',
            type: 'image',
            title: 'Participant Badge & Hardware Testing Bench',
            caption: 'Official participant credential and live bench setup during round 2 technical review.',
            badge: 'CREDENTIAL'
          },
          {
            path: '/media/projects/railguard-ai/event/WhatsApp Image 2026-09-14 at 00.59.28(2).jpeg',
            type: 'image',
            title: 'Round 2 Evaluation Bench Session',
            caption: 'Bench demonstration of the Edge AI model running on physical accelerator hardware.',
            badge: 'EVALUATION'
          },
          {
            path: '/media/projects/railguard-ai/event/WhatsApp Image 2026-09-14 at 01.00.21.jpeg',
            type: 'image',
            title: 'Live Telemetry Link & Verification',
            caption: 'Demonstrating zero-latency MQTT dispatch to the jury inspection terminal.',
            badge: 'JURY DEMO'
          },
          {
            path: '/media/projects/railguard-ai/event/WhatsApp Image 2026-09-14 at 01.00.22.jpeg',
            type: 'image',
            title: 'Final Stage Hackathon Presentation',
            caption: 'Final stage project presentation prior to receiving top national honors.',
            badge: 'FINAL STAGE'
          }
        ]
      }
    ]
  },
  {
    id: 'swarm-robotics',
    index: '06',
    title: 'Two-Robot Swarm Platform: Decentralized Multi-Agent Mini Project',
    featured: true,
    subtitle: 'B.Tech 3rd Year Mini Project · Two Physical Bots, SMD PCB Assembly, Soldering, Custom Firmware & Inter-Bot Communication',
    role: 'B.Tech Mini Project Lead · Swarm Hardware, Firmware & Systems Integration',
    shortRole: 'Mini Project Lead — Swarm Hardware & Firmware',
    keyAreas: ['Two Physical Swarm Bots', 'SMD PCB Assembly & Soldering', 'ESP32 Firmware & Inter-Bot Comm', 'Peer-to-Peer Protocol', 'Gazebo Multi-Agent Simulation'],
    skillsUsed: [
      'Swarm Robotics',
      'SMD PCB Assembly',
      'PCB Soldering & Debugging',
      'ESP32 & Embedded C++',
      'Peer-to-Peer Communication',
      'ROS 2 (Humble)',
      'Gazebo 3D Simulation',
      'Python',
      'Hands-on Prototyping'
    ],
    projectType: 'academic',
    personalContributions: [
      'Built two physical autonomous micro-robots from the ground up as my 3rd Year B.Tech Mini Project at Saintgits College of Engineering.',
      'Performed hands-on surface-mount (SMD) PCB assembly and precision soldering of octagonal motor-carrier and sensor breakout boards under magnification.',
      'Developed embedded firmware on ESP32 microcontrollers, implementing PWM motor driver control, infrared proximity ring polling, and power management.',
      'Architected peer-to-peer wireless communication between the two physical bots for synchronized multi-agent maneuvers, dynamic leader-follower tracking, and collision evasion.',
      'Simulated and benchmarked decentralized consensus and swarm coordination algorithms in a 16-agent Gazebo 3D simulation arena.'
    ],
    engineeringDecisions: [
      'Hand-soldered compact SMD ICs, passives, and optical IR transceivers with fine-tip temperature control and flux to ensure reliable solder joint integrity on small octagonal PCBs.',
      'Designed a low-overhead peer-to-peer messaging protocol between the two ESP32 microcontrollers over ad-hoc wireless sockets to minimize inter-bot transmission latency.',
      'Optimized Gazebo simulation proximity raycasters into grouped 20 Hz radial collision cones to sustain real-time 60 FPS physics without CPU bottleneck.'
    ],
    year: '2024',
    status: 'COLLEGE MINI PROJECT',
    domain: 'Swarm Robotics / Decentralized Coordination / Multi-Agent Simulation',
    category: 'robotics',
    summary: 'Engineered two physical autonomous micro-robots for my 3rd Year B.Tech Mini Project at Saintgits College of Engineering. Hand-assembled and soldered custom SMD PCB hardware, flashed custom ESP32 firmware for motor drive and peer-to-peer inter-robot communication, and conducted multi-agent coordination simulation in Gazebo.',
    challenge: 'Achieving dependable peer-to-peer communication between two physical micro-robots while soldering dense surface-mount components onto miniature octagonal PCBs and coordinating distributed multi-agent consensus without centralized computing bottlenecks.',
    approach: 'Constructed two physical micro-robots from bare PCBs, performing SMD component soldering and assembly in the workshop. Flashed ESP32 firmware for real-time motor control and peer-to-peer wireless telemetry. Complemented the physical dual-bot deployment with 16-agent Gazebo simulation benchmarks for decentralized consensus and obstacle evasion.',
    systemArchitecture: [
      'Two Physical Autonomous Micro-Robots (ESP32 Compute Cores)',
      'Octagonal SMD Carrier PCB with Dual H-Bridge Motor Drivers',
      'Radial Infrared Proximity & Inter-Agent Sensing Ring',
      'Low-Latency Peer-to-Peer Wireless Messaging Protocol',
      'Gazebo 3D Multi-Agent Simulation Arena with 16 Concurrent Swarm Nodes'
    ],
    softwareStack: ['ESP32 Embedded C++', 'Inter-Robot Wireless Communication', 'FreeRTOS', 'ROS 2 Humble', 'Gazebo 3D Simulation', 'Python'],
    hardwareStack: ['Two Physical Autonomous Bots', 'Custom Octagonal PCBs', 'SMD Component Assembly & Soldering', 'ESP32 Microcontrollers', 'Dual Micro DC Gear Motors', 'Radial Infrared Sensor Rings', 'LiPo Battery Management'],
    keyResults: [
      'Successfully assembled, soldered, and powered two physical autonomous swarm micro-robots',
      'Demonstrated reliable peer-to-peer inter-bot communication for coordinated movement and obstacle evasion',
      'Benchmarked 16-agent distributed swarm simulations in Gazebo with zero inter-agent collision at 60 FPS'
    ],
    failuresAndIterations: [
      {
        issue: 'Bridged solder joints on fine-pitch SMD IC pads during manual PCB assembly.',
        rootCause: 'Excess solder paste and capillary flow across sub-millimeter pin spacings.',
        iteration: 'Used flux pen pre-treatment, fine-tip temperature-controlled soldering, and desoldering braid cleanup under a magnifying inspection fixture to ensure clean trace isolation.'
      },
      {
        issue: 'Simulation frame drops when simulating dense infrared raycaster beams for 16+ simultaneous robots.',
        rootCause: 'High-frequency raycaster collision checks overwhelmed the Gazebo physics thread.',
        iteration: 'Optimized sensor publishing frequencies to 20 Hz and grouped proximity checks into radial sector collision cones, restoring 60 FPS physics runtime.'
      }
    ],
    attribution: {
      source: 'VeRLab (Laboratório de Visão Computacional e Robótica) · UFMG',
      project: 'HeRo Common — Open-source ROS-based Swarm Robotics Platform',
      repository: 'https://github.com/verlab/hero_common',
      website: 'https://verlab.github.io/hero_common/',
      license: 'CC BY-NC-SA 4.0'
    },
    githubUrl: 'https://github.com/verlab/hero_common',
    visualSignature: 'swarm',
    imagePath: '/media/projects/swarm-robotics/hero_swarm_test.png',
    secondaryImage: '/media/projects/swarm-robotics/hero_pcb_assembly.jpg',
    mediaGalleries: [
      {
        id: 'swarm-hardware',
        title: 'Physical Hardware, SMD Assembly & Dual-Bot Swarm',
        items: [
          {
            path: '/media/projects/swarm-robotics/hero_pcb_assembly.jpg',
            type: 'image',
            title: 'SMD PCB Assembly & Soldering Workbench',
            caption: 'Hands-on SMD component soldering and assembly of the octagonal swarm robot circuit boards on the workbench using precision soldering iron, tweezers, flux, and component reels.',
            badge: 'PHYSICAL SMD SOLDERING'
          },
          {
            path: '/media/projects/swarm-robotics/hero_swarm_test.png',
            type: 'image',
            title: 'Physical Micro-Robots with Carrier PCBs & Sensors',
            caption: 'Physical micro-robot platforms equipped with custom soldered octagonal carrier PCBs, IMU modules, and radial IR sensor rings for inter-bot communication.',
            badge: 'PHYSICAL BOTS'
          },
          {
            path: '/media/projects/swarm-robotics/hero_robot_single.jpg',
            type: 'image',
            title: 'Assembled Swarm Bot with Optical Tracking Hat',
            caption: 'Fully assembled physical micro-robot bot featuring 3D-printed enclosure, differential drive wheels, and top ArUco optical marker hat.',
            badge: 'ASSEMBLED BOT'
          },
          {
            path: '/media/projects/swarm-robotics/hero_robot_ehat.jpg',
            type: 'image',
            title: 'Swarm Bot Front Perspective & Sensor Ring',
            caption: 'Front perspective of the assembled micro-robot showing radial infrared proximity sensors, drive wheels, and chassis integration.',
            badge: 'SENSOR INTEGRATION'
          },
          {
            path: '/media/projects/swarm-robotics/hero_pcb.png',
            type: 'image',
            title: 'Octagonal Swarm Robot PCB Architecture',
            caption: 'Octagonal modular PCB hardware design integrating ESP32 compute, motor drive circuitry, and radial sensor ring breakouts.',
            badge: 'PCB ARCHITECTURE'
          },
          {
            path: '/media/projects/swarm-robotics/hero_gazebo_swarm.png',
            type: 'image',
            title: '16-Agent Gazebo Multi-Robot Simulation Arena',
            caption: 'Multi-agent simulation environment benchmarking decentralized consensus, virtual attractor flocking, and collision evasion in Gazebo.',
            badge: 'GAZEBO SIMULATION'
          }
        ]
      }
    ]
  },
  {
    id: 'balancing-robot',
    index: '07',
    title: 'Two-Wheeled Self-Balancing Robot (Revathon 2.0)',
    featured: true,
    subtitle: 'High-Frequency Closed-Loop Postural Stabilization · REV-A-THON 2.0 Hackathon',
    role: 'Embedded Control & Mechatronics Systems Engineer',
    shortRole: 'Embedded Control Systems Engineer',
    keyAreas: ['PID Inverted Pendulum', 'IMU Complementary Filter', 'Closed-Loop Balance', 'Rapid Hackathon Prototyping'],
    skillsUsed: ['Robot Kinematics & Motion Planning', 'Microcontrollers (Arduino/STM32)', 'Hands-on Prototyping', 'C++', 'Electronics Debugging'],
    imagePath: '/media/hackathons/Revathon2.0/WhatsApp Image 2026-09-25 at 23.39.43 (2).jpeg',
    secondaryImage: '/media/hackathons/Revathon2.0/WhatsApp Image 2026-09-25 at 23.39.42 (2).jpeg',
    personalContributions: [
      'Engineered two-wheeled self-stabilizing inverted pendulum testbed executing 200 Hz PID tilt angle regulation during 24-hour REV-A-THON 2.0 sprint.',
      'Implemented discrete complementary and Kalman state estimation fusing 6-DoF MPU6050 accelerometer and gyroscope streams.',
      'Tuned cascaded dual-loop PID controllers (inner angle posture stabilizer and outer velocity/position regulator) to eliminate steady-state creep.',
      'Designed and assembled 3-tier modular physical chassis integrating high-current motor drivers, logic stack, and low-noise isolated power distribution.'
    ],
    engineeringDecisions: [
      'Engineered dampening mounts and implemented a 30 Hz software low-pass Butterworth filter on raw accelerometer data to reject motor vibration noise.',
      'Configured hardware timer interrupts for motor actuation pulses, ensuring deterministic execution with sub-5ms cycle times.'
    ],
    year: '2024',
    status: 'DEPLOYED HACKATHON PROTOTYPE',
    domain: 'Control Theory / Inverted Pendulum / IMU Fusion / REV-A-THON 2.0',
    category: 'robotics',
    summary: 'Engineered a physical self-stabilizing dual-wheeled inverted pendulum robot during the intensive 24-hour REV-A-THON 2.0 robotics hackathon, executing 200 Hz PID tilt angle regulation and dynamic disturbance recovery via complementary and Kalman sensor fusion.',
    challenge: 'Overcoming sensor drift and accelerometer high-frequency motor vibration noise during an intense 24-hour hackathon build, keeping firmware control loop cycle times strictly under 5ms.',
    approach: 'Fused MPU6050 6-DoF accelerometer and gyroscope streams through an optimized Kalman filter, commanding dual DC geared motors via high-current driver bridges and hardware timer interrupts.',
    systemArchitecture: [
      '6-DoF MPU6050 Inertial Measurement Unit (I2C 400 kHz)',
      'Discrete-Time Kalman Filter State Estimator',
      'Dual-Loop Cascaded PID Velocity & Posture Regulator',
      'Hardware Timer Driven Microstepping Motor Controller',
      '3-Tier Laser-Cut / 3D-Printed Modular Vibration-Isolated Chassis'
    ],
    softwareStack: ['Embedded C/C++', 'FreeRTOS', 'Kalman Filter', 'Arduino C++'],
    hardwareStack: ['Arduino / ESP Controller', 'MPU6050 6-DoF IMU', 'High-Current Motor Drivers', 'DC Geared Motors with Encoders', 'Custom Power Distribution Rail'],
    keyResults: [
      'Continuous upright balance maintenance with less than ±0.8° angular wobble',
      'Sub-150ms dynamic impulse recovery from external mechanical push disturbances',
      'Fully operational hardware prototype assembled, programmed, and demonstrated within 24-hour sprint'
    ],
    failuresAndIterations: [
      {
        issue: 'Structural chassis resonance at specific motor RPMs corrupting accelerometer Z-axis readings.',
        rootCause: 'Rigid direct coupling of motor mounts transmitted step vibration directly into the IMU substrate.',
        iteration: 'Engineered dampening grommets and implemented a 30 Hz software low-pass Butterworth filter on raw accelerometer data.'
      }
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'balance',
    mediaGalleries: [
      {
        id: 'revathon-hardware',
        title: 'Revathon 2.0 Physical Hardware & Testing',
        items: [
          {
            path: '/media/hackathons/Revathon2.0/WhatsApp Image 2026-09-25 at 23.39.43 (2).jpeg',
            type: 'image',
            title: 'Two-Wheeled Self-Balancing Robot Testbed',
            caption: '3-tier vertical stack prototype engineered with high-current motor drivers, logic compute layer, isolated battery bay, and 6-DoF IMU.',
            badge: 'HARDWARE PLATFORM'
          },
          {
            path: '/media/hackathons/Revathon2.0/WhatsApp Image 2026-09-25 at 23.39.42 (2).jpeg',
            type: 'image',
            title: 'In-Hand Closed-Loop Postural Stabilization Tuning',
            caption: 'Naveen performing live in-hand verification of high-rate cascaded PID equilibrium response and external impulse disturbance rejection.',
            badge: 'CONTROL VERIFICATION'
          },
          {
            path: '/media/hackathons/Revathon2.0/WhatsApp Image 2026-09-25 at 23.39.43.jpeg',
            type: 'image',
            title: 'Chassis Assembly & Structural Wiring Harness Inspection',
            caption: 'Precision mechanical assembly and low-noise signal wiring inspection during the 24-hour REV-A-THON 2.0 sprint.',
            badge: 'PHYSICAL ASSEMBLY'
          },
          {
            path: '/media/hackathons/Revathon2.0/WhatsApp Image 2026-09-25 at 23.39.43 (1).jpeg',
            type: 'image',
            title: 'Firmware Calibration & Real-Time IMU Telemetry Bench',
            caption: 'Calibrating MPU6050 accelerometer offset bias and tuning complementary filter coefficients via serial telemetry.',
            badge: 'FIRMWARE CALIBRATION'
          },
          {
            path: '/media/hackathons/Revathon2.0/WhatsApp Image 2026-09-25 at 23.39.42 (1).jpeg',
            type: 'image',
            title: 'REV-A-THON 2.0 Rapid Prototyping Engineering Workbench',
            caption: 'Full hardware development station with multimeters, logic analyzers, microcontroller breakout boards, and tools.',
            badge: 'HACKATHON DEPLOYMENT'
          }
        ]
      }
    ]
  },
  {
    id: 'automated-vertical-parking',
    index: '08',
    title: 'Automated Vertical Parking System',
    featured: true,
    subtitle: 'Automated Multi-Level Vehicle Storage & Retrieval System',
    role: 'Robotics & Embedded Systems Engineer',
    shortRole: 'Robotics & Embedded Engineer',
    keyAreas: ['Rotary Lift Mechanism', 'Geared Motor Drive', 'Pallet Alignment', 'Embedded Logic', 'Electromechanical Interlocks', 'Hardware Prototyping'],
    skillsUsed: [
      'Embedded C++',
      'Mechatronics Integration',
      'Motor Control & Drive Electronics',
      'Hardware Prototyping',
      'Team Collaboration',
      'Electrical Wiring'
    ],
    teamSystem: [
      'Multi-tier circular mechanical structure with central rotation spindle and pallet carriages.',
      'High-torque geared transmission system driving rotary position indexing.'
    ],
    personalContributions: [
      'Integrated the electronic drive circuitry, position sensing interlocks, and control logic for automated pallet alignment.',
      'Co-developed the physical prototype assembly and electrical power distribution with the collegiate robotics team.'
    ],
    engineeringDecisions: [
      'Used optical and limit switch feedback for discrete slot indexing to prevent pallet misregistration.',
      'Integrated dual-relay H-bridge with emergency stop brake interlock to guarantee failsafe stoppage.'
    ],
    year: '2023',
    status: 'ACADEMIC PROTOTYPE',
    domain: 'Robotics / Mechatronics / Automation',
    category: 'robotics',
    summary: 'Engineered a functional multi-level automated vertical rotary parking system prototype with sensor-guided pallet alignment, bi-directional rotary indexing, and electromechanical safety interlocks.',
    challenge: 'Achieving repeatable discrete rotational alignment of parking pallets while handling unbalanced mechanical cantilever loads and preventing overshooting.',
    approach: 'Designed position feedback interlocks with limit switches and motor braking circuits, wired a robust power distribution harness, and co-built the physical mechanism with the collegiate project team.',
    systemArchitecture: [
      'Multi-Tier Rotary Spindle Carriage',
      'High-Torque DC Geared Motor & Drive Relays',
      'Pallet Position Sensing Interlocks',
      'Embedded Logic Controller',
      'Operator Push-Button & Safety Interface'
    ],
    softwareStack: ['Embedded C++', 'State Machine Control', 'Position Calibration Routines'],
    hardwareStack: ['Geared DC Drive Motor', 'Limit Switches & Optical Proximity Sensors', 'Relay Switching Board', 'Regulated Power Supply', 'Mechanical Frame & Timber Pallets'],
    keyResults: [
      'Successful continuous rotary multi-car indexing with zero mechanical jam',
      'Precision sensor-guided slot alignment across all tiers',
      'Complete team delivery and functional physical demonstration'
    ],
    failuresAndIterations: [
      {
        issue: 'Rotational inertia caused the loaded pallet to overshoot the target docking slot.',
        rootCause: 'Mechanical coasting after relay de-energization.',
        iteration: 'Added dynamic motor shorting brake circuit via normally-closed relay contacts to halt spindle instantly.'
      }
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'mechatronics',
    imagePath: '/media/projects/parking-system/automated_parking_mechanism.jpg',
    secondaryImage: '/media/projects/parking-system/automated_parking_team.jpg',
    mediaGalleries: [
      {
        id: 'parking-prototype',
        title: 'Rotary Mechanism & Engineering Team',
        items: [
          {
            path: '/media/projects/parking-system/automated_parking_mechanism.jpg',
            type: 'image',
            title: 'Automated Rotary Parking Prototype Mechanism',
            caption: 'Close-up perspective of the multi-tier rotary mechanism showing central drive belt transmission, car parking pallets, and sensor wiring.',
            badge: 'MECHANISM'
          },
          {
            path: '/media/projects/parking-system/automated_parking_team.jpg',
            type: 'image',
            title: 'Automated Vertical Parking System — Engineering Team',
            caption: 'Naveen Shaji George standing with the collegiate engineering team beside the completed functional multi-tier automated rotary parking system prototype.',
            badge: 'TEAM COLLABORATION'
          }
        ]
      }
    ]
  },
  {
    id: 'agv-sensor-fusion',
    index: '09',
    title: 'AGV Industrial Odometry & Sensor Fusion',
    featured: false,
    subtitle: 'Multi-Rate Pose Estimation for Industrial Guided Vehicles',
    role: 'Robotics Software & State Estimation Engineer',
    shortRole: 'Robotics Software & State Estimation Engineer',
    keyAreas: ['Extended Kalman Filter', 'robot_localization', 'Planar Laser Odometry', 'Industrial AGV'],
    skillsUsed: ['Sensor Integration', 'SLAM & Localization', 'Embedded C/C++', 'Hardware Protocols'],
    personalContributions: [
      'Developed industrial AGV multi-sensor state estimation package integrating optical wheel encoders, 6-axis IMU, and 2D planar LiDAR.',
      'Configured robot_localization dual-EKF pipeline with non-linear kinematic motion model and dynamic outlier rejection gates.',
      'Implemented Zero-Velocity Update (ZUPT) detection to lock orientation covariance during vehicle idle and docking phases.',
      'Validated tf2 coordinate transform tree continuity (odom -> base_link -> laser_frame) under simulated high-slip conditions.'
    ],
    engineeringDecisions: [
      'Implemented zero-velocity update (ZUPT) detection thresholding to lock orientation covariance during idle periods and prevent gyroscope bias drift.',
      'Tuned measurement covariance matrices dynamically based on linear velocity thresholds to reject wheel slip during acceleration.'
    ],
    year: '2024 – 2025',
    status: 'ACTIVE BENCHMARK',
    domain: 'Sensor Fusion / EKF / ROS 2 / Industrial Automation',
    category: 'autonomous',
    summary: 'Developed an industrial automated guided vehicle (AGV) pose estimation package combining wheel encoder ticks, high-rate IMU angular rates, and planar laser odometry through robot_localization.',
    challenge: 'Preventing localization drift during wheel slippage on polished factory flooring while keeping state estimation deterministic at 50 Hz.',
    approach: 'Configured a 15-state Extended Kalman Filter fusing non-linear kinematics with outlier rejection gates, eliminating dead-reckoning divergence during sudden high-friction transitions.',
    systemArchitecture: [
      'Optical Wheel Encoders (Quadrature ISR Capture)',
      'Industrial 6-Axis IMU (SPI Interface @ 100 Hz)',
      'Planar Scan Matcher Laser Odometry (20 Hz)',
      'robot_localization Dual-EKF Architecture',
      'ROS 2 tf2 Transform Tree Broadcaster'
    ],
    softwareStack: ['ROS 2 Humble', 'robot_localization', 'rclcpp', 'Foxglove Studio', 'C++17'],
    hardwareStack: ['Industrial AGV Testbed', 'Differential Encoders', 'MEMS IMU', 'Planar LiDAR', 'CAN Industrial IO'],
    keyResults: [
      'Reduced odometric position error from 18.4 cm/m to under 1.2 cm/m under deliberate wheel slip',
      'Deterministic 50 Hz state vector publication with sub-2ms jitter',
      'Seamless coordinate transform continuity across odom -> base_link -> laser frames'
    ],
    failuresAndIterations: [
      {
        issue: 'Covariance matrix divergence during prolonged stationary idle periods.',
        rootCause: 'Gyroscope bias drift accumulating when no physical motion occurred.',
        iteration: 'Implemented zero-velocity update (ZUPT) detection thresholding that locks orientation covariance when wheel encoders report zero velocity.'
      }
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'agv',
    mediaGalleries: [
      {
        id: 'agv-state-estimation',
        title: 'Multi-Rate State Estimation Architecture',
        items: [
          {
            path: '/images/abaja-sbw-architecture.png',
            type: 'image',
            title: 'Industrial Sensor Bus & EKF Estimator Topology',
            caption: 'Multi-rate sensor bus topology bridging wheel odometry, IMU high-rate angular velocity, and planar laser scan matching.',
            badge: 'EKF TOPOLOGY'
          }
        ]
      }
    ]
  },
  {
    id: 'lane-keep-assist',
    index: '10',
    title: 'Autonomous Lane-Keep Assist (LKA) System',
    featured: false,
    subtitle: 'Real-Time Polynomial Lane Boundary Tracking & Steering Feedforward',
    role: 'Autonomous Vehicle Algorithms Engineer',
    shortRole: 'Autonomous Vehicle Algorithms Engineer',
    keyAreas: ['Computer Vision ADAS', 'Sliding Window Polyfit', 'Canny / Hough Transform', 'Steering Feedforward'],
    skillsUsed: ['OpenCV', 'Python', 'Steering Geometry', 'Drive-by-Wire (TBW / SBW / BBW)'],
    personalContributions: [
      'Engineered autonomous computer vision lane detection pipeline applying inverse perspective bird’s-eye mapping and Sobel edge filters.',
      'Implemented adaptive sliding-window histogram tracking with 2nd-degree polynomial regression for real-time road curvature.',
      'Calculated cross-track error (CTE) and heading error feedforward angles mapped directly to steer-by-wire servo targets.',
      'Integrated historical frame-to-frame polynomial smoothing to prevent steering oscillation during temporary dashed line dropouts.'
    ],
    engineeringDecisions: [
      'Integrated Kalman-smoothed polynomial prior predicting next-frame lane coefficients during dashed line mark dropouts.',
      'Mapped cross-track error feedforward angle into CAN 2.0B steering gateway with rate-limiting filters to prevent vehicle instability.'
    ],
    year: '2025',
    status: 'VALIDATED PIPELINE',
    domain: 'Computer Vision / Autonomous Steering / Polynomial Fitting / Python',
    category: 'vision',
    summary: 'Engineered an autonomous vision guidance pipeline applying inverse perspective bird’s-eye mapping, adaptive color thresholding, and 2nd-degree polynomial regression to compute road curvature and steer-by-wire angles.',
    challenge: 'Maintaining reliable lane boundary detection under sudden shadows, worn asphalt markings, and varying road curvatures without frame drops.',
    approach: 'Constructed an efficient sliding-window histogram tracking algorithm with historical lane-history smoothing and cross-track error (CTE) feedforward steering angle calculation.',
    systemArchitecture: [
      'Calibrated Forward-Facing Camera Acquisition',
      'Bird’s-Eye View Homography Transform',
      'Sobel Edge & HLS Channel Adaptive Thresholding',
      'Sliding Window Polynomial Regression',
      'Curvature Radius & Heading Error Calculator'
    ],
    softwareStack: ['Python', 'OpenCV', 'NumPy', 'Matplotlib Analysis', 'CAN Bus Interface'],
    hardwareStack: ['Automotive USB Camera', 'Single-Board Computer', 'Microcontroller Steer Gateway'],
    keyResults: [
      'Sustained 45+ FPS processing speed on standard automotive compute platforms',
      'Accurate curvature calculation within 2% of surveyed test-track radius',
      'Robust lane retention across sharp radius corners and dappled tree shadow conditions'
    ],
    failuresAndIterations: [
      {
        issue: 'Sharp road curves causing sliding windows to lose track of dashed line markings.',
        rootCause: 'Fixed vertical window step size skipped gaps in widely-spaced highway dashed lines.',
        iteration: 'Integrated a Kalman-smoothed polynomial prior that predicts next-frame lane coefficients even during brief line segment dropouts.'
      }
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'lane',
    imagePath: '/images/abaja-lane-pipeline.png',
    mediaGalleries: [
      {
        id: 'lane-detection-pipeline',
        title: 'Computer Vision Perception Pipeline',
        items: [
          {
            path: '/images/abaja-lane-pipeline.png',
            type: 'image',
            title: 'Polynomial Lane Boundary Detection Pipeline',
            caption: 'Sliding window histogram analysis, bird’s-eye inverse perspective mapping, and polynomial curve fitting.',
            badge: 'VISION PIPELINE'
          },
          {
            path: '/images/abaja-sbw-architecture.png',
            type: 'image',
            title: 'Steer-by-Wire Feedforward Command Architecture',
            caption: 'Cross-track error feedforward angle calculation mapped to CAN bus steer-by-wire actuator controller.',
            badge: 'STEER GATEWAY'
          }
        ]
      }
    ]
  },
  {
    id: 'waste-segregator',
    index: '11',
    title: 'Automated Waste Segregation Robot',
    featured: false,
    subtitle: 'Sensor Fusion · Inductive / Capacitive / Ultrasonic · Rotary Diverter',
    role: 'Mechatronics & Embedded Systems Developer',
    shortRole: 'Mechatronics & Embedded Systems Developer',
    keyAreas: ['Sensor Fusion', 'Embedded Microcontrollers', 'PWM Servo Control', 'Physical Prototyping'],
    skillsUsed: ['Embedded C/C++', 'Hands-on Prototyping', 'Power Electronics & Galvanic Isolation', 'Electronics Debugging & PCB Testing'],
    personalContributions: [
      'Designed and assembled physical automated waste segregation bin with multi-stage sensor detection aperture.',
      'Implemented sensor fusion logic combining ultrasonic proximity distance, inductive metallic sensing, and capacitive moisture probes.',
      'Calibrated dual-axis servo motor diverter mechanism to dynamically classify and route waste into segregated containment bays.'
    ],
    engineeringDecisions: [
      'Configured sequential sensor polling window to ensure metal objects trigger inductive thresholding prior to dielectric moisture measurement.',
      'Added hardware debounce and optical isolation to prevent servo EMF kickback from resetting the logic microcontroller.'
    ],
    year: '2024',
    status: 'HARDWARE PROTOTYPE',
    domain: 'Mechatronics / Sensor Fusion / Embedded C / Prototyping',
    category: 'robotics',
    summary: 'Developed an automated benchtop waste segregation robot that leverages multi-sensor fusion (ultrasonic distance, inductive metal detection, and capacitive moisture sensing) with a servo-actuated rotary chute to autonomously identify and separate dry recyclable, metallic, and wet organic waste streams.',
    challenge: 'Discriminating between metallic, dry recyclable, and high-moisture organic waste in real time while preventing mechanical jams in the rotary distribution chute.',
    approach: 'Engineered a cascading sensor evaluation aperture. When an object enters the chute, ultrasonic sensors trigger evaluation; inductive sensors check for ferromagnetism; capacitive probes measure moisture; and high-torque PWM servos index the collection flap to the target compartment.',
    systemArchitecture: [
      'Entrance Detection & Dimension Gating (Ultrasonic Rangefinder)',
      'Metallic Discrimination Stage (Inductive Proximity Sensor)',
      'Organic / Moisture Detection Stage (Capacitive Soil Probe)',
      'Microcontroller Decision Kernel (Embedded C State Machine)',
      'High-Torque PWM Servo Flap Actuator & Chute Diverter'
    ],
    softwareStack: ['Embedded C', 'Arduino Core', 'State Machine Logic', 'Hardware Debounce Algorithms'],
    hardwareStack: ['Ultrasonic Sensor', 'Inductive Proximity Sensor', 'Capacitive Moisture Sensor', 'High-Torque Servo Motor', 'Microcontroller Logic Board', 'Regulated 5V/12V Power Supply'],
    keyResults: [
      'Reliable 3-stream classification across dry paper, aluminum cans, and wet organic food waste',
      'Sub-800ms end-to-end detection and mechanical deflection cycle time',
      'Zero microcontroller resets achieved via inductive kickback suppression circuitry'
    ],
    failuresAndIterations: [
      {
        issue: 'Servo motor rotation induced electrical noise spikes resetting the microcontroller.',
        rootCause: 'Shared 5V power bus dropped voltage during high inrush current servo activation.',
        iteration: 'Separated servo power rail with a dedicated regulator and bulk capacitor filtering, isolating logic from actuator EMF.'
      }
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'mechatronics',
    imagePath: '/media/projects/Waste Segregation robot/waste_robot_poster.jpg',
    featuredVideo: {
      path: '/media/projects/Waste Segregation robot/WhatsApp Video 2026-09-25 at 23.39.41.mp4',
      poster: '/media/projects/Waste Segregation robot/waste_robot_poster.jpg',
      title: 'Automated Waste Segregation Mechanism Demo',
      caption: 'Physical demonstration of sensor aperture detecting waste item, triggering inductive and moisture sensing, and servo-rotating the diverter chute.',
      badge: 'MECHANISM VIDEO'
    },
    mediaGalleries: [
      {
        id: 'waste-robot-testing',
        title: 'Prototype Mechanism & Sensor Aperture',
        items: [
          {
            path: '/media/projects/Waste Segregation robot/WhatsApp Video 2026-09-25 at 23.39.41.mp4',
            poster: '/media/projects/Waste Segregation robot/waste_robot_poster.jpg',
            type: 'video',
            title: 'Automated Waste Segregation Mechanism in Action',
            caption: 'Video demonstrating the multi-sensor detection aperture, ultrasonic proximity gating, and servo diverter mechanism classifying waste.',
            badge: 'PROTOTYPE DEMO'
          }
        ]
      }
    ]
  },
  {
    id: 'arduino-radar',
    index: '12',
    title: 'Arduino Radar — First Robotics Build',
    featured: false,
    subtitle: 'My First-Ever Arduino Project · SG90 Servo & Ultrasonic Sensor with Processing IDE',
    role: 'Maker & Early Robotics Explorer',
    shortRole: 'First Robotics Project',
    keyAreas: ['Arduino Programming', 'SG90 Micro Servo', 'HC-SR04 Ultrasonic Sensor', 'Processing IDE GUI', 'Serial Telemetry', 'Early Experimentation'],
    skillsUsed: [
      'Arduino C++',
      'Processing IDE (Java)',
      'Serial Communication',
      'Sensor Interfacing',
      'PWM Servo Control',
      'Hardware Prototyping'
    ],
    personalContributions: [
      'My first ever hands-on robotics project that sparked my engineering journey.',
      'Wired an SG90 micro-servo and HC-SR04 ultrasonic sensor to an Arduino board on a breadboard.',
      'Wrote the Arduino sketch to sweep the sensor from 15° to 165° and transmit polar distance coordinates over UART.',
      'Programmed a graphical radar display in Processing IDE to visualize obstacle detections in real time.'
    ],
    engineeringDecisions: [
      'Calibrated 15ms step intervals for smooth 1-degree servo increments without ultrasonic acoustic reverberation overlap.',
      'Parsed comma-delimited polar coordinates (angle, distance) over 9600 baud serial into Processing for smooth polar sweeps.'
    ],
    year: '2022',
    status: 'FIRST ROBOTICS BUILD',
    domain: 'Early Experimentation / Embedded Sensing / Robotics Origins',
    category: 'embedded',
    summary: 'My first ever robotics and Arduino project: a rotating ultrasonic radar scanner using an SG90 micro-servo, HC-SR04 ultrasonic distance sensor, and real-time polar sweep visualization in the Processing IDE. This early experimentation marked the very beginning of my hands-on robotics engineering journey.',
    challenge: 'Synchronizing mechanical servo sweep angles with ultrasonic acoustic pulse-echo timings and streaming reliable polar coordinates over serial without packet fragmentation.',
    approach: 'Programmed an Arduino microcontroller to step an SG90 servo in 1-degree increments, trigger acoustic distance measurement, and stream serialized angle/distance strings to a custom Processing IDE radar display.',
    systemArchitecture: [
      'Arduino Microcontroller (Core Logic)',
      'TowerPro SG90 Micro-Servo (180° Sweep)',
      'HC-SR04 Ultrasonic Acoustic Transceiver',
      '9600 Baud UART Serial Bridge',
      'Processing IDE Radar Polar Display GUI'
    ],
    softwareStack: ['Arduino C++', 'Processing IDE', 'Serial Data Streaming', 'Trigonometric Polar Mapping'],
    hardwareStack: ['Arduino Uno', 'SG90 Micro Servo', 'HC-SR04 Ultrasonic Distance Sensor', 'Breadboard & Jumper Harness', 'USB-UART Interface'],
    keyResults: [
      'Reliable real-time obstacle detection up to 40cm across 150-degree field of view',
      'Smooth 60 FPS polar radar beam drawing in Processing IDE',
      'Established the foundational hands-on hardware curiosity that led to autonomous vehicles and robotics'
    ],
    failuresAndIterations: [
      {
        issue: 'Processing radar screen flashed and missed coordinates due to buffer overruns.',
        rootCause: 'Arduino was streaming faster than the Processing serial event buffer was reading strings.',
        iteration: 'Implemented delimiter-terminated strings (angle,distance.) and used bufferUntil(\'.\') in Processing for rock-solid framing.'
      }
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'mechatronics',
    imagePath: '/media/projects/arduino-radar/arduino_radar_poster.jpg',
    featuredVideo: {
      path: '/media/projects/arduino-radar/arduino_radar_first_build.mp4',
      poster: '/media/projects/arduino-radar/arduino_radar_poster.jpg',
      title: 'My First Arduino Radar — Sweep Visualization',
      caption: 'Authentic video showing the rotating SG90 servo and ultrasonic sensor mounted on the Arduino board, with real-time green radar beam visualization on screen.',
      badge: 'FIRST BUILD VIDEO'
    },
    mediaGalleries: [
      {
        id: 'radar-demo',
        title: 'First Robotics Build Video & Workbench',
        items: [
          {
            path: '/media/projects/arduino-radar/arduino_radar_first_build.mp4',
            poster: '/media/projects/arduino-radar/arduino_radar_poster.jpg',
            type: 'video',
            title: 'Arduino Radar Sweep & Processing GUI',
            caption: 'Video of my first-ever robotics build: SG90 servo rotating the HC-SR04 ultrasonic sensor with live radar-style polar sweep in Processing IDE.',
            badge: 'VIDEO'
          },
          {
            path: '/media/projects/arduino-radar/arduino_radar_poster.jpg',
            type: 'image',
            title: 'Arduino Radar Workbench Hardware',
            caption: 'Hardware setup showing Arduino microcontroller, SG90 servo, ultrasonic sensor, and breadboard connections.',
            badge: 'WORKBENCH'
          }
        ]
      }
    ]
  }
];
