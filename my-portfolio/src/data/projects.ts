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
  failuresAndIterations?: {
    issue: string;
    rootCause: string;
    iteration: string;
  }[];
  githubUrl?: string;
  visualSignature: 'trajectory' | 'lidar' | 'vision' | 'swarm' | 'rail' | 'balance' | 'agv' | 'lane' | 'surgical';
  featured?: boolean;
  imagePath?: string;
  secondaryImage?: string;
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
    keyAreas: ['Vehicle Electrical', 'Relay Control Systems', 'Sensor Integration', 'Wiring', 'Team Collaboration'],
    skillsUsed: [
      'Wiring Harness Fabrication',
      'Mechanical Fabrication',
      'Hands-on Prototyping',
      'Mechanical Assembly',
      'Electronics Debugging',
      'Team Coordination',
      'C++',
      'Python'
    ],
    personalContributions: [
      'Contributed to the electrical and electronics division of Team Equinox for the inaugural autonomous Baja campaign.',
      'Assisted in vehicle electrical system assembly, relay control wiring, and sensor integration on Car A12.',
      'Participated in national-level BAJA SAEINDIA competition dynamic and endurance events.',
      'Gained foundational experience in automotive electrical systems, competition engineering, and team-based vehicle development.'
    ],
    engineeringDecisions: [
      'Relay-based switching architecture selected for initial prototype simplicity and rapid integration timeline.',
      'Direct sensor wiring approach used to establish baseline data acquisition before migrating to bus-based communication in the 2026 campaign.'
    ],
    year: '2025',
    status: 'AIR 7 — NATIONAL',
    domain: 'Autonomous Vehicle / Competition Engineering / Team Development',
    category: 'autonomous',
    summary: 'Contributed to the electrical and electronics division of Team Equinox\'s inaugural autonomous Baja vehicle (Car A12), competing at BAJA SAEINDIA 2025 and achieving All India Rank 7 nationally.',
    challenge: 'Developing a functional autonomous vehicle electrical system within aggressive competition timelines while learning automotive engineering fundamentals as a team.',
    approach: 'Built relay-based switching systems, integrated sensors, assembled vehicle wiring, and supported the broader team through fabrication, testing, and competition events.',
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
        title: 'Electrical Systems',
        items: [
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
    mediaGalleries: [
      {
        id: 'vehicle-2026',
        title: 'Car A18 — Competition Vehicle',
        items: [
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
        title: 'Custom ECU & PCB Design',
        items: [
          {
            path: '/media/projects/baja/baja-2026/electrical/WhatsApp Image 2026-09-14 at 00.14.57(3).jpeg',
            type: 'image',
            title: 'Custom Equinox Back-Box ECU',
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
    subtitle: 'Autonomous Indoor Clinical Transport Platform',
    role: 'Autonomy & Embedded Systems Developer',
    shortRole: 'Autonomy & Embedded Systems Lead',
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
    personalContributions: [
      'Architected autonomous mobile robot platform for indoor hospital corridors to assist staff and transport supplies.',
      'Integrated 360-degree planar LiDAR SLAM with calibrated differential wheel encoders via an Extended Kalman Filter.',
      'Tuned dynamic layered costmaps in Nav2 with custom inflation radiuses for safe pedestrian deceleration.'
    ],
    engineeringDecisions: [
      'Used asymmetric exponential decay costmap inflation gradients to allow doorway passage without colliding with moving foot traffic.',
      'Implemented Extended Kalman Filter (robot_localization) fusing planar LiDAR scan matching with wheel odometry to eliminate rotational drift during turns.'
    ],
    year: '2024 – 2025',
    status: 'DEPLOYED TESTBED',
    domain: 'Service Robotics / SLAM / Nav2 / IoT Fleet',
    category: 'robotics',
    summary: 'Engineered an autonomous mobile robot platform to reliably navigate indoor healthcare corridors, transporting medical payloads alongside staff and patients with zero collision tolerance.',
    challenge: 'Mitigating odometric drift in feature-sparse hospital hallways, handling reflective glass barriers invisible to standard planar sensors, and executing fluid deceleration around sudden pedestrian paths.',
    approach: 'Integrated 360-degree planar LiDAR SLAM with calibrated differential wheel encoders using an Extended Kalman Filter (EKF). Configured dynamic layered costmaps in Nav2 with custom inflation radiuses and automated recovery behaviors.',
    systemArchitecture: [
      '360-Degree Planar LiDAR Scanning & Filter Layer',
      'SLAM Toolbox Sub-Centimeter Map Matching',
      'Nav2 Dynamic Costmaps with Inflation Recovery Behaviors',
      'Differential Drive Kinematics Controller with ESP32',
      'IoT MQTT Telemetry Gateway for Central Fleet Dispatch'
    ],
    softwareStack: ['ROS 2 Humble', 'Nav2 Navigation Stack', 'SLAM Toolbox', 'Python', 'MQTT Cloud Bridge'],
    hardwareStack: ['Differential Chassis', '2D Planar LiDAR', 'ESP32 Motor Controller', 'Ultrasonic Safety Rings', 'Power Distribution Board'],
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
        title: 'Sensors & Perception Subsystems',
        items: [
          {
            path: '/media/projects/Hospital/Lidar_hosp.jpeg',
            type: 'image',
            title: 'Planar LiDAR Sensor & Power Subsystem',
            caption: 'Close-up of the 360-degree 2D planar LiDAR scanner mounted with lithium battery pack and power distribution harness.',
            badge: 'LIDAR SENSOR'
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
    keyAreas: ['Autonomous Rover', 'LiDAR Terrain Mapping', 'Neural Track Segmentation', 'Sub-50ms Inference', 'National Winner'],
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
      'Deployed TensorRT INT8 model quantization on the Jetson edge accelerator, reducing defect inference latency under 50ms.',
      'Implemented local SQLite buffer queues to prevent data loss during transient cellular blackouts along railway tracks.'
    ],
    year: '2026',
    status: 'NATIONAL HACKATHON WINNER',
    domain: 'Edge AI / Computer Vision / Android / Railway Safety',
    category: 'vision',
    summary: 'Built an end-to-end autonomous railway inspection rover utilizing quantized edge vision models for real-time track anomaly identification, paired with an Android telemetry station for sub-second emergency operator alerts.',
    challenge: 'Detecting subtle track defects and micro-fissures at high vehicle velocities under extreme variable outdoor lighting, vibration, and low compute availability.',
    approach: 'Deployed customized YOLO vision models optimized with TensorRT INT8 quantization onto onboard compute hardware, feeding synchronized GPS tags and defect bounding boxes over a robust cellular bridge.',
    systemArchitecture: [
      'High-Speed Global Shutter Optical Sensor Mount',
      'Quantized Edge YOLO Inference & Defect Classifier',
      'Real-Time Telemetry Dispatcher & Local SQLite Buffer',
      'Android Ground Station Companion App',
      'Automated GPS-Tagged Defect Incident Logger'
    ],
    softwareStack: ['Python', 'YOLO / TensorRT', 'Android Kotlin', 'OpenCV', 'SQLite', 'REST API'],
    hardwareStack: ['Jetson Edge Accelerator', 'Global Shutter Industrial Cameras', 'High-Gain 4G/LTE Bridge', 'Shock-Isolated Enclosure'],
    keyResults: [
      'Sub-50ms inference latency at 1080p stream resolution',
      '94.2% precision on rail obstacle and track distortion classification',
      'Instant cellular alert dispatch to track maintenance crews with sub-meter GPS accuracy'
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
    id: 'surgical-robotics',
    index: '06',
    title: 'CMR Versius Surgical Robotics Internship',
    featured: true,
    subtitle: 'Clinical Teleoperation & Bedside Robotic Articulation · Muthoot Hospitals',
    role: 'Surgical Robotics Engineering Intern',
    shortRole: 'Surgical Robotics Engineering Intern',
    keyAreas: ['CMR Versius', 'Clinical Teleoperation', '7-DoF Kinematics', 'Sterile OR Protocols', 'Medical Robotics'],
    skillsUsed: [
      'Clinical Robotics Immersion',
      'Rapid System Onboarding',
      'System Integration Observation',
      'Safety & Sterilization Standards'
    ],
    personalContributions: [
      'Completed clinical engineering immersion at Muthoot Hospitals observing CMR Versius surgical robotic systems in active OR suites.',
      'Studied multi-arm inverse kinematics, sterile drape instrument coupling, and 3D stereoscopic surgeon console teleoperation.',
      'Transferred clinical fail-safe and patient-proximity safety paradigms into the Hospital Service AMR design.'
    ],
    engineeringDecisions: [
      'Documented and verified dual-channel foot pedal safety cutoffs and optical sensor interlocks preventing accidental instrument drift.',
      'Analyzed master-slave latency compensation algorithms for high-dexterity surgical micro-suturing.'
    ],
    year: '2024 – 2025',
    status: 'CLINICAL DEPLOYMENT TESTBED',
    domain: 'Medical Robotics / Teleoperation / Kinematics / Clinical Validation',
    category: 'robotics',
    summary: 'Engaged in clinical engineering evaluation, master-slave manipulator teleoperation, and bedside robotic arm calibration of the advanced CMR Versius next-generation surgical robotic platform at Muthoot Hospitals.',
    challenge: 'Achieving sub-millimeter instrument placement accuracy, zero-backlash joint kinematics, and ergonomic master manipulator feedback within sterile operating room constraints.',
    approach: 'Analyzed closed-loop teleoperation joint coordinate transformations, verified multi-DoF wrist articulation safety interlocks, and evaluated 3D stereoscopic surgeon console feedback during clinical surgical simulations.',
    systemArchitecture: [
      'Multi-Arm Modular Bedside Robotic Units',
      'Open 3D High-Definition Ergonomic Surgeon Console',
      'Multi-DoF Articulated Master Teleoperation Joysticks',
      'Sub-Millimeter Instrument Joint Actuation Encoders',
      'Optical Safety & Dual-Channel Foot Pedal Interlocks'
    ],
    softwareStack: ['Teleoperation Kinematics', 'Closed-Loop Joint Control', 'Safety Interlock Firmware', 'Stereoscopic 3D Vision'],
    hardwareStack: ['CMR Versius Robotic Arms', '3D HD Surgeon Console', 'Master Controllers', 'Endowrist Surgical Instruments', 'Sterile Drape Adapters'],
    keyResults: [
      'Mastered intuitive 7-DoF teleoperation manipulation on the Versius surgical console',
      'Documented and verified sterile drape robotic arm docking protocols in active hospital OR suites',
      'Completed comprehensive clinical robotics orientation in operating theatre procedures'
    ],
    failuresAndIterations: [
      {
        issue: 'Master manipulator tracking lag during rapid micro-suturing wrist rotations.',
        rootCause: 'Optical joint encoder packet queueing over high-traffic internal controller CAN links.',
        iteration: 'Verified priority-arbitrated CAN frame prioritization for manipulator end-effector state packets.'
      }
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'surgical',
    imagePath: '/media/internships/surgical-robotics/robot-hardware/WhatsApp Image 2026-09-14 at 01.05.35.jpeg',
    secondaryImage: '/media/internships/surgical-robotics/hospital-experience/WhatsApp Image 2026-09-14 at 01.05.36(1).jpeg',
    mediaGalleries: [
      {
        id: 'robot-hardware',
        title: 'CMR Versius Robotic System & Surgeon Console',
        items: [
          {
            path: '/media/internships/surgical-robotics/robot-hardware/WhatsApp Video 2026-09-14 at 01.05.33.mp4',
            type: 'video',
            title: 'Master Manipulator Teleoperation Joystick Operation',
            caption: 'Naveen operating the CMR Versius 3D console master joysticks demonstrating fine articulation control.',
            badge: 'TELEOPERATION DEMO',
            poster: '/media/internships/surgical-robotics/robot-hardware/WhatsApp Image 2026-09-14 at 01.05.35(1).jpeg'
          },
          {
            path: '/media/internships/surgical-robotics/robot-hardware/WhatsApp Video 2026-09-14 at 01.05.34.mp4',
            type: 'video',
            title: 'Surgeon Console Dexterity & Multi-DoF Articulation Test',
            caption: 'Testing tremor-filtered fine manipulation and robotic wrist articulation.',
            badge: 'WRIST DEXTERITY',
            poster: '/media/internships/surgical-robotics/robot-hardware/WhatsApp Image 2026-09-14 at 01.05.35(1).jpeg'
          },
          {
            path: '/media/internships/surgical-robotics/robot-hardware/WhatsApp Image 2026-09-14 at 01.05.35.jpeg',
            type: 'image',
            title: 'CMR Versius Bedside Robotic Arm Units',
            caption: 'Modular bedside robotic units configured with multi-axis articulated surgical instruments.',
            badge: 'BEDSIDE ARMS'
          },
          {
            path: '/media/internships/surgical-robotics/robot-hardware/WhatsApp Image 2026-09-14 at 01.05.35(1).jpeg',
            type: 'image',
            title: 'Versius 3D Stereoscopic Surgeon Console',
            caption: 'Open ergonomic surgeon console featuring 3D polarized display and dual master grip controllers.',
            badge: '3D CONSOLE'
          },
          {
            path: '/media/internships/surgical-robotics/robot-hardware/WhatsApp Image 2026-09-14 at 01.05.35(2).jpeg',
            type: 'image',
            title: 'Instrument Joint Mechanics & Sterilization Coupling',
            caption: 'Precision mechanical coupling and sterile drape interface for laparoscopic robotic tools.',
            badge: 'JOINT MECHANICS'
          },
          {
            path: '/media/internships/surgical-robotics/robot-hardware/WhatsApp Image 2026-09-14 at 01.05.36.jpeg',
            type: 'image',
            title: 'Clinical Operating Theatre System Alignment',
            caption: 'Full multi-arm cart positioning around the surgical operating table in Muthoot Hospitals.',
            badge: 'OR SYSTEM SETUP'
          }
        ]
      },
      {
        id: 'clinical-experience',
        title: 'Clinical Hospital Operating Theatre Immersion',
        items: [
          {
            path: '/media/internships/surgical-robotics/hospital-experience/WhatsApp Image 2026-09-14 at 01.05.36(1).jpeg',
            type: 'image',
            title: 'Naveen Shaji George in Surgical Operating Theatre',
            caption: 'Wearing surgical scrubs, cap, and mask in the sterile operating suite at Muthoot Hospitals.',
            badge: 'CLINICAL SUITE'
          },
          {
            path: '/media/internships/surgical-robotics/hospital-experience/WhatsApp Image 2026-09-14 at 01.05.37.jpeg',
            type: 'image',
            title: 'Pre-Operative Robotics Protocol Review',
            caption: 'Participating in sterile operating protocols and robotic surgery checklist procedures.',
            badge: 'STERILE PROTOCOL'
          },
          {
            path: '/media/internships/surgical-robotics/hospital-experience/WhatsApp Image 2026-09-14 at 01.05.38.jpeg',
            type: 'image',
            title: 'Robotic Surgery Clinical Observation',
            caption: 'Observing surgical procedure workflow and robotic instrument tool changes under sterile conditions.',
            badge: 'OR OBSERVATION'
          },
          {
            path: '/media/internships/surgical-robotics/hospital-experience/WhatsApp Video 2026-09-14 at 01.05.36.mp4',
            type: 'video',
            title: 'Hospital Surgical Wing Corridor Walkthrough',
            caption: 'Clinical environment walkthrough between robotic surgical theatre suites.',
            badge: 'CLINICAL WING',
            poster: '/media/internships/surgical-robotics/hospital-experience/WhatsApp Image 2026-09-14 at 01.05.36(1).jpeg'
          }
        ]
      }
    ]
  },
  {
    id: 'swarm-robotics',
    index: '07',
    title: 'HERO Common Swarm Robotics Platform',
    featured: true,
    subtitle: 'ROS-Based Distributed Swarm Framework & Experimental Study · VeRLab HeRo',
    role: 'Swarm Systems Architecture & Simulation Research',
    shortRole: 'Swarm Systems & Simulation Researcher',
    keyAreas: ['Multi-Agent Consensus', 'ROS 2 Swarm Arena', 'Gazebo 16-Agent Simulation', 'HeRo Open-Source', 'Two-Robot Master-Slave'],
    skillsUsed: [
      'Swarm Robotics',
      'ROS 2 (Humble)',
      'Gazebo 3D Simulation',
      'Peer-to-Peer Communication',
      'Technology Benchmarking',
      'C++',
      'Python'
    ],
    personalContributions: [
      'Benchmarked open-source ROS-based HeRo Common framework (VeRLab / UFMG) across 16-agent Gazebo simulation arenas.',
      'Designed a two-robot master-slave coordination system using TCP/HTTP sockets for B.Tech minor project.',
      'Analyzed decentralized flocking dynamics, obstacle avoidance consensus, and modular micro-robot PCB hardware.'
    ],
    engineeringDecisions: [
      'Grouped high-frequency infrared proximity raycasters into radial sector collision cones at 20 Hz to sustain 60 FPS in Gazebo physics.',
      'Employed virtual attractor potential fields to guide decentralized agent clusters around irregular arena obstacles.'
    ],
    year: '2024 – 2025',
    status: 'VERIFIED REFERENCE STUDY',
    domain: 'Swarm Robotics / ROS / VeRLab HeRo / Multi-Agent Simulation',
    category: 'robotics',
    summary: 'Conducted architectural analysis, multi-agent Gazebo simulation benchmarking, and modular hardware PCB node evaluation based on the open-source HeRo Common swarm robotics framework developed by VeRLab / UFMG.',
    challenge: 'Understanding scalable multi-robot consensus, peer-to-peer decentralized communication constraints, and coordinate frame alignment across 16+ simultaneous autonomous agents without centralized bottleneck controllers.',
    approach: 'Studied the open-source ROS-based HeRo framework, set up Gazebo multi-agent simulation arenas with custom proximity-sensing cones, benchmarked virtual attractor flocking dynamics, and analyzed the octagonal modular micro-robot PCB architecture.',
    systemArchitecture: [
      'ROS-Based Distributed Multi-Agent Node Architecture',
      'Decentralized Peer-to-Peer Consensus & Flocking Protocol',
      'Gazebo 3D Simulation Arena with 16+ Concurrent Swarm Agents',
      'ArUco Marker Optical Ground-Truth Position Tracking Hat',
      'Modular Octagonal PCB Architecture with Integrated Motor Drivers'
    ],
    softwareStack: ['ROS / ROS 2', 'Gazebo 3D Simulation', 'Python', 'C++', 'VeRLab HeRo Common Stack'],
    hardwareStack: ['HeRo v2.5 Micro-Robot Architecture', 'ESP32 Compute Core', 'Modular Octagonal PCB', 'Infrared Ring Sensors', 'Dual DC Micro-Motors'],
    keyResults: [
      'Successfully benchmarked 16-agent distributed swarm simulations in Gazebo with zero inter-agent collision',
      'Analyzed peer-to-peer ad-hoc messaging protocols for decentralized agent consensus',
      'Documented modular PCB architecture and power distribution for low-cost swarm micro-robots'
    ],
    failuresAndIterations: [
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
    secondaryImage: '/media/projects/swarm-robotics/hero_gazebo_swarm.png',
    mediaGalleries: [
      {
        id: 'swarm-platform',
        title: 'HeRo Platform & Multi-Agent Swarm Arena',
        items: [
          {
            path: '/media/projects/swarm-robotics/hero_swarm_test.png',
            type: 'image',
            title: 'HeRo v2.5 Physical Micro-Robot Swarm',
            caption: 'Physical HeRo swarm micro-robots in formation (Source: VeRLab / hero_common).',
            badge: 'PHYSICAL SWARM'
          },
          {
            path: '/media/projects/swarm-robotics/hero_gazebo_swarm.png',
            type: 'image',
            title: '16-Agent Gazebo Swarm Simulation Arena',
            caption: 'Multi-agent simulation environment showing sensor cones and distributed swarm paths (Source: VeRLab / hero_common).',
            badge: 'GAZEBO SIMULATION'
          },
          {
            path: '/media/projects/swarm-robotics/hero_pcb.png',
            type: 'image',
            title: 'Modular Octagonal Swarm Robot PCB Hardware',
            caption: 'White octagonal modular PCB architecture for HeRo micro-robots (Source: VeRLab / hero_common).',
            badge: 'MODULAR PCB'
          },
          {
            path: '/media/projects/swarm-robotics/hero_robot_single.jpg',
            type: 'image',
            title: 'Single HeRo Agent with Optical Tracking Hat',
            caption: 'Individual HeRo robot featuring ArUco optical marker for overhead camera tracking (Source: VeRLab / hero_common).',
            badge: 'SINGLE AGENT'
          },
          {
            path: '/media/projects/swarm-robotics/hero_robot_ehat.jpg',
            type: 'image',
            title: 'HeRo 08 Micro-Robot with Ring Sensors',
            caption: 'Front perspective of physical 3D-printed HeRo 08 showing infrared proximity sensor ring and ArUco marker top hat (Source: VeRLab / hero_common).',
            badge: 'ROBOT ANATOMY'
          }
        ]
      }
    ]
  },
  {
    id: 'balancing-robot',
    index: '08',
    title: 'Two-Wheeled Inverted Pendulum Robot',
    featured: false,
    subtitle: 'High-Frequency Closed-Loop Postural Stabilization',
    role: 'Embedded Control Systems Engineer',
    shortRole: 'Embedded Control Systems Engineer',
    keyAreas: ['PID Inverted Pendulum', 'IMU Complementary Filter', 'Closed-Loop Balance', 'DC Steppers'],
    skillsUsed: ['Robot Kinematics & Motion Planning', 'Microcontrollers (Arduino/STM32)', 'Hands-on Prototyping', 'C++', 'Electronics Debugging'],
    personalContributions: ['Engineered two-wheeled self-stabilizing inverted pendulum robot executing 200 Hz PID tilt angle regulation.'],
    engineeringDecisions: ['Designed 3D-printed TPU dampening grommets and 30 Hz software low-pass Butterworth filter on raw accelerometer data.'],
    year: '2024',
    status: 'DEPLOYED BENCH TESTBED',
    domain: 'Control Theory / Embedded Systems / ESP8266 / Kalman Filter',
    category: 'embedded',
    summary: 'Engineered a self-stabilizing dual-wheeled inverted pendulum robot executing 200 Hz PID tilt angle regulation and dynamic disturbance recovery via complementary and Kalman sensor fusion.',
    challenge: 'Overcoming sensor drift and accelerometer high-frequency motor vibration noise while keeping firmware control loop cycle times strictly under 5ms.',
    approach: 'Fused MPU6050 6-DoF accelerometer and gyroscope streams through an optimized Kalman filter on an ESP8266 microcontroller, commanding high-torque stepper drivers via hardware timer interrupts.',
    systemArchitecture: [
      '6-DoF MPU6050 Inertial Measurement Unit (I2C 400 kHz)',
      'Discrete-Time Kalman Filter State Estimator',
      'Dual-Loop Cascaded PID Velocity & Posture Regulator',
      'Hardware Timer Driven Microstepping Motor Controller',
      'Web-Based Real-Time PID Gain Tuning Interface'
    ],
    softwareStack: ['Embedded C/C++', 'FreeRTOS', 'Kalman Filter', 'WebSockets Telemetry'],
    hardwareStack: ['ESP8266 Microcontroller', 'MPU6050 6-DoF IMU', 'A4988 Stepper Drivers', 'NEMA 17 Steppers', 'Custom Power Distribution PCB'],
    keyResults: [
      'Continuous upright balance maintenance with less than ±0.8° angular wobble',
      'Sub-150ms dynamic impulse recovery from external mechanical push disturbances',
      'Zero cumulative drift over extended stationary balancing trials'
    ],
    failuresAndIterations: [
      {
        issue: 'Structural chassis resonance at specific motor RPMs corrupting accelerometer Z-axis readings.',
        rootCause: 'Rigid direct coupling of stepper mounts transmitted step vibration directly into the IMU substrate.',
        iteration: 'Designed 3D-printed TPU dampening grommets and implemented a 30 Hz software low-pass Butterworth filter on raw accelerometer data.'
      }
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'balance'
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
    personalContributions: ['Developed industrial AGV pose estimation package combining wheel encoders, high-rate IMU, and planar laser odometry through robot_localization.'],
    engineeringDecisions: ['Implemented zero-velocity update (ZUPT) detection thresholding to lock orientation covariance during idle periods.'],
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
    visualSignature: 'agv'
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
    personalContributions: ['Engineered autonomous vision guidance pipeline applying inverse perspective bird’s-eye mapping and 2nd-degree polynomial regression to compute road curvature.'],
    engineeringDecisions: ['Integrated Kalman-smoothed polynomial prior predicting next-frame lane coefficients during dashed line mark dropouts.'],
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
    imagePath: '/images/abaja-lane-pipeline.png'
  }
];
