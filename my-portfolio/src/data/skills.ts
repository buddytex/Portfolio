export type SkillTier = 'core' | 'complementary';
export type SkillProficiency = 'strong' | 'working' | 'experience' | 'awareness';

export interface ConnectedEntity {
  id: string;
  name: string;
  type: 'project' | 'role' | 'hardware' | 'activity' | 'experience';
  badge?: string;
  url?: string;
  detail?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  tier: SkillTier;
  proficiency: SkillProficiency;
  category: string;
  categoryIndex: string;
  evidence: string;
  context: string;
  connectedEntities: ConnectedEntity[];
  tools?: string[];
}

export interface SkillEvidence {
  id: string;
  title: string;
  category: string;
  categoryIndex?: string;
  tier?: SkillTier;
  proficiency?: SkillProficiency;
  shortDesc: string;
  evidenceItems: {
    title: string;
    description: string;
    specs: string[];
    problemSolved: string;
    designDecisions: string;
    tools: string[];
  }[];
  relatedProjects: {
    name: string;
    id: string;
    url?: string;
  }[];
  connectedEntities?: ConnectedEntity[];
}

export interface SkillCategory {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  tier: SkillTier;
  description: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'robotics-autonomy',
    index: '01',
    title: 'Robotics & Autonomous Systems',
    shortTitle: 'Robotics',
    tier: 'core',
    description: 'ROS 2 DDS middleware, planar LiDAR SLAM, Nav2 trajectory planning, multi-agent consensus, and mobile autonomy.',
    skills: [
      {
        id: 'ros2',
        name: 'ROS 2 (Humble)',
        tier: 'core',
        proficiency: 'strong',
        category: 'Robotics & Autonomous Systems',
        categoryIndex: '01',
        evidence: 'Architected ROS 2 nodes, TF2 transforms, and serial/CAN bridge nodes for aBAJA, Hospital AMR, and Swarm Robotics.',
        context: 'Deterministic node lifecycles, action servers, and custom message types running on Ubuntu Linux.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'AIR 11 (2026)', url: '/projects/baja-2026' },
          { id: 'hospital-amr', name: 'Hospital Service AMR', type: 'project', badge: 'MAIN PROJECT', url: '/projects/hospital-amr' },
          { id: 'swarm-robotics', name: 'Swarm Robotics Platform', type: 'project', badge: 'MINI PROJECT', url: '/projects/swarm-robotics' }
        ],
        tools: ['ROS 2 Humble', 'rclcpp', 'rclpy', 'RViz 2', 'Foxglove Studio']
      },
      {
        id: 'autonomous-navigation',
        name: 'Autonomous Navigation & Nav2',
        tier: 'core',
        proficiency: 'strong',
        category: 'Robotics & Autonomous Systems',
        categoryIndex: '01',
        evidence: 'Tuned Nav2 costmaps, asymmetric inflation layers, DWB local planners, and recovery behaviors for clinical hallway navigation.',
        context: 'Zero-collision tolerance in tight doorways and dynamic avoidance around moving pedestrians.',
        connectedEntities: [
          { id: 'hospital-amr', name: 'Hospital Service AMR', type: 'project', badge: 'CLINICAL AMR', url: '/projects/hospital-amr' },
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'ALL-TERRAIN DBW', url: '/projects/baja-2026' }
        ],
        tools: ['Nav2', 'Costmap2D', 'DWB Planner', 'Recovery Behaviors']
      },
      {
        id: 'lidar-perception',
        name: '2D & 3D LiDAR Perception',
        tier: 'core',
        proficiency: 'strong',
        category: 'Robotics & Autonomous Systems',
        categoryIndex: '01',
        evidence: 'Ingested planar laser scans at 10 Hz for SLAM mapping and mobile rover radial obstacle mapping.',
        context: 'Euclidean point clustering, outlier filtering, and laser odometry scan-matching.',
        connectedEntities: [
          { id: 'hospital-amr', name: 'Hospital Service AMR', type: 'project', badge: 'SLAM TOOLBOX', url: '/projects/hospital-amr' },
          { id: 'railguard-ai', name: 'RailGuard AI Rover', type: 'project', badge: 'HACKATHON WINNER', url: '/projects/railguard-ai' }
        ],
        tools: ['Planar LiDAR', 'SLAM Toolbox', 'Point Cloud Filtering']
      },
      {
        id: 'slam-localization',
        name: 'SLAM & State Estimation',
        tier: 'core',
        proficiency: 'working',
        category: 'Robotics & Autonomous Systems',
        categoryIndex: '01',
        evidence: 'Sub-centimeter 2D map generation and EKF pose tracking fusing wheel encoders with IMU and laser odometry.',
        context: 'Eliminated dead-reckoning rotational drift in feature-sparse indoor corridors.',
        connectedEntities: [
          { id: 'hospital-amr', name: 'Hospital Service AMR', type: 'project', badge: 'INDOOR SLAM', url: '/projects/hospital-amr' },
          { id: 'agv-sensor-fusion', name: 'AGV Odometry Fusion', type: 'project', badge: 'EKF BENCHMARK', url: '/projects/agv-sensor-fusion' }
        ],
        tools: ['SLAM Toolbox', 'robot_localization', 'Extended Kalman Filter']
      },
      {
        id: 'swarm-robotics',
        name: 'Swarm Robotics & Inter-Bot Communication',
        tier: 'core',
        proficiency: 'strong',
        category: 'Robotics & Autonomous Systems',
        categoryIndex: '01',
        evidence: 'Built two physical autonomous micro-robots for B.Tech mini project with hands-on SMD PCB assembly, soldering, ESP32 firmware, and peer-to-peer wireless communication, coupled with 16-agent Gazebo simulations.',
        context: 'Decentralized peer-to-peer consensus, virtual attractor potential fields, SMD assembly, and inter-bot telemetry.',
        connectedEntities: [
          { id: 'swarm-robotics', name: 'Two-Robot Swarm Platform', type: 'project', badge: 'MINI PROJECT', url: '/projects/swarm-robotics' }
        ],
        tools: ['ESP32 C++', 'Peer-to-Peer Sockets', 'SMD Soldering', 'Gazebo 3D', 'ROS 2 Humble']
      },
      {
        id: 'robot-kinematics',
        name: 'Robot Kinematics & Control',
        tier: 'core',
        proficiency: 'working',
        category: 'Robotics & Autonomous Systems',
        categoryIndex: '01',
        evidence: 'Differential drive mobile kinematics, inverted pendulum angle stabilization (200 Hz PID), and surgical 7-DoF teleoperation.',
        context: 'Closed-loop velocity control, feedforward steering, and coordinate frame transformations.',
        connectedEntities: [
          { id: 'balancing-robot', name: 'Inverted Pendulum Robot', type: 'project', badge: '200 Hz PID', url: '/projects/balancing-robot' },
          { id: 'surgical-robotics', name: 'Clinical Surgical Robotics Internship', type: 'experience', badge: '7-DoF TELEOP', url: '/experience/surgical-robotics' }
        ],
        tools: ['Kinematic Models', 'Cascaded PID', 'TF2 Transforms']
      }
    ]
  },
  {
    id: 'embedded-systems',
    index: '02',
    title: 'Embedded Systems & Hardware Protocols',
    shortTitle: 'Embedded',
    tier: 'core',
    description: 'Custom multi-layer microcontrollers, FreeRTOS deterministic task scheduling, automotive CAN 2.0B, and industrial hardware buses.',
    skills: [
      {
        id: 'esp32-embedded',
        name: 'ESP32 & FreeRTOS',
        tier: 'core',
        proficiency: 'strong',
        category: 'Embedded Systems & Hardware Protocols',
        categoryIndex: '02',
        evidence: 'Dual-core FreeRTOS task scheduling for vehicle back-box ECU, drive-by-wire servos, and hospital AMR low-level controller.',
        context: 'Core 0 handling high-speed CAN/interrupts, Core 1 executing control logic with zero timing jitter.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'BACK-BOX ECU', url: '/projects/baja-2026' },
          { id: 'hospital-amr', name: 'Hospital Service AMR', type: 'project', badge: 'MOTOR DRIVE', url: '/projects/hospital-amr' },
          { id: 'role-01', name: 'Electrical & Electronics Head', type: 'role', badge: 'DIV HEAD' }
        ],
        tools: ['ESP32', 'FreeRTOS', 'ESP-IDF', 'Arduino IDE', 'PlatformIO']
      },
      {
        id: 'can-bus',
        name: 'CAN 2.0B Protocol',
        tier: 'core',
        proficiency: 'strong',
        category: 'Embedded Systems & Hardware Protocols',
        categoryIndex: '02',
        evidence: 'Designed 500 kbps differential CAN bus linking Front ECU, Rear ECU, motor controller, and Jetson Orin Nano in aBAJA Car A18.',
        context: 'Differential transceivers, split 120Ω termination, hardware message ID filters, and error frame recovery.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: '500 kbps BUS', url: '/projects/baja-2026' },
          { id: 'role-01', name: 'Electrical & Electronics Head', type: 'role', badge: 'CAN ARCHITECT' }
        ],
        tools: ['CAN 2.0B', 'MCP2515', 'SN65HVD230', 'Logic Analyzer']
      },
      {
        id: 'microcontrollers',
        name: 'Microcontrollers (Arduino / STM32)',
        tier: 'core',
        proficiency: 'working',
        category: 'Embedded Systems & Hardware Protocols',
        categoryIndex: '02',
        evidence: 'Programmed low-level timer interrupts and sensor polling routines across AVR and ARM Cortex processors.',
        context: 'Hardware PWM, register-level GPIO configuration, and analog sensor calibration.',
        connectedEntities: [
          { id: 'balancing-robot', name: 'Inverted Pendulum Robot', type: 'project', badge: 'STEPPER DRIVER', url: '/projects/balancing-robot' },
          { id: 'baja-2025', name: 'aBAJA SAEINDIA 2025', type: 'project', badge: 'RELAY DAQ', url: '/projects/baja-2025' }
        ],
        tools: ['Arduino C++', 'STM32', 'Hardware Interrupts', 'Hardware PWM']
      },
      {
        id: 'jetson-edge',
        name: 'Edge Accelerators (Jetson Orin Nano)',
        tier: 'core',
        proficiency: 'working',
        category: 'Embedded Systems & Hardware Protocols',
        categoryIndex: '02',
        evidence: 'Configured Jetson Orin Nano for onboard aBAJA perception processing and sensor integration in Car A18.',
        context: 'Linux GPIO, camera CSI/USB interfaces, and UART/CAN gateway links.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'AUTONOMY COMPUTE', url: '/projects/baja-2026' }
        ],
        tools: ['NVIDIA Jetson Orin Nano', 'JetPack Linux', 'TensorRT']
      },
      {
        id: 'embedded-protocols',
        name: 'Hardware Protocols (I2C, SPI, UART)',
        tier: 'core',
        proficiency: 'strong',
        category: 'Embedded Systems & Hardware Protocols',
        categoryIndex: '02',
        evidence: 'Configured high-speed SPI for CAN controllers, 400 kHz I2C for IMUs, and DMA UART telemetry links.',
        context: 'Oscilloscope bus verification, clock line pull-up tuning, and ring-buffer data handling.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'SENSOR BUS', url: '/projects/baja-2026' },
          { id: 'balancing-robot', name: 'Inverted Pendulum Robot', type: 'project', badge: 'MPU6050 I2C', url: '/projects/balancing-robot' }
        ],
        tools: ['I2C Fast Mode', 'SPI DMA', 'UART Ring Buffers', 'Digital Oscilloscope']
      },
      {
        id: 'timers-watchdogs',
        name: 'Hardware Timers, Interrupts & Watchdogs',
        tier: 'core',
        proficiency: 'strong',
        category: 'Embedded Systems & Hardware Protocols',
        categoryIndex: '02',
        evidence: 'Implemented hardware watchdog timers (WDT) and sub-microsecond timer interrupts on aBAJA ECUs for fail-safe watchdog resets.',
        context: 'Guaranteed automatic ECU reset within 50ms if CAN communication or control loops lock up.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'SAFETY RESET', url: '/projects/baja-2026' }
        ],
        tools: ['Hardware WDT', 'ISR Handler', 'Hardware Timers']
      }
    ]
  },
  {
    id: 'electronics-pcb',
    index: '03',
    title: 'Electronics, PCB & Harness Design',
    shortTitle: 'Electronics',
    tier: 'core',
    description: 'Custom multi-layer PCB layout in KiCad, galvanic HV/LV isolation, automotive wiring harness fabrication, and SMD assembly.',
    skills: [
      {
        id: 'pcb-design',
        name: 'PCB Design in KiCad',
        tier: 'core',
        proficiency: 'strong',
        category: 'Electronics, PCB & Harness Design',
        categoryIndex: '03',
        evidence: 'Designed multi-layer automotive ECU boards for aBAJA Car A18, including power planes, differential traces, and star ground returns.',
        context: 'Generated production-ready Gerbers, drill files, BOM, and pick-and-place files for PCB fabrication.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'BACK-BOX ECU', url: '/projects/baja-2026' },
          { id: 'pcb-lab', name: 'PCB Lab Showcase', type: 'hardware', badge: '3D VIEWER', url: '/#hardware' },
          { id: 'role-01', name: 'Electrical & Electronics Head', type: 'role', badge: 'HARDWARE LEAD' }
        ],
        tools: ['KiCad 8', 'EasyEDA', 'Gerber RS-274X', 'DRC / DFM Rules', 'Differential Pairs']
      },
      {
        id: 'schematic-design',
        name: 'Schematic Design & Component Selection',
        tier: 'core',
        proficiency: 'strong',
        category: 'Electronics, PCB & Harness Design',
        categoryIndex: '03',
        evidence: 'Created comprehensive electrical schematics specifying automotive-grade regulators, CAN transceivers, optocouplers, and TVS diodes.',
        context: 'Thermal dissipation calculation, current derating, and voltage drop analysis under high-vibration conditions.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'SCHEMATICS', url: '/projects/baja-2026' }
        ],
        tools: ['KiCad Eeschema', 'Datasheet Analysis', 'Component Sizing']
      },
      {
        id: 'pcb-assembly',
        name: 'PCB Assembly (SMD & Through-Hole)',
        tier: 'core',
        proficiency: 'strong',
        category: 'Electronics, PCB & Harness Design',
        categoryIndex: '03',
        evidence: 'Personally hand-soldered SMD passive components (0805/0603), SOIC ICs, and motor driver headers for aBAJA ECUs and Swarm Robotics octagonal boards.',
        context: 'Fine-pitch soldering, flux application, hot-air rework, and microscope solder joint inspection.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'PHYSICAL BUILDS', url: '/projects/baja-2026' },
          { id: 'swarm-robotics', name: 'Two-Robot Swarm Platform', type: 'project', badge: 'SMD ASSEMBLY', url: '/projects/swarm-robotics' }
        ],
        tools: ['SMD Soldering Station', 'Hot Air Rework', 'Desoldering Braid', 'Flux']
      },
      {
        id: 'electronics-debugging',
        name: 'Electronics Debugging & PCB Testing',
        tier: 'core',
        proficiency: 'strong',
        category: 'Electronics, PCB & Harness Design',
        categoryIndex: '03',
        evidence: 'Diagnosed ground loop oscillations, CAN frame collisions, and brownout resets using multimeters and digital storage oscilloscopes.',
        context: 'Signal integrity probing, continuity checks, thermal profiling, and power rail ripple measurement.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'LAB VERIFIED', url: '/projects/baja-2026' }
        ],
        tools: ['Digital Multimeter', 'Digital Oscilloscope', 'Bench Power Supply', 'Signal Probing']
      },
      {
        id: 'power-electronics',
        name: 'Power Electronics & Galvanic Isolation',
        tier: 'core',
        proficiency: 'strong',
        category: 'Electronics, PCB & Harness Design',
        categoryIndex: '03',
        evidence: 'Engineered dual-rail galvanic isolation separating 24V motor traction circuits from 3.3V logic via optocouplers and isolated DC-DC converters.',
        context: 'Eliminated inductive ground bounce and protected logic microcontrollers from actuator transient kickbacks.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'HV/LV ISOLATION', url: '/projects/baja-2026' }
        ],
        tools: ['Optocouplers', 'Isolated DC-DC', 'Buck Regulators', 'TVS Protection Diodes']
      },
      {
        id: 'wiring-harness',
        name: 'Wiring Harness Design & Fabrication',
        tier: 'core',
        proficiency: 'strong',
        category: 'Electronics, PCB & Harness Design',
        categoryIndex: '03',
        evidence: 'Led the construction of high-voltage and low-voltage wiring harnesses across aBAJA Car A12 (2025) and Car A18 (2026).',
        context: 'Braided conduit routing, automotive Deutsch / Weather-pack sealed connectors, ratcheting crimp tooling, and chassis strain relief.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'AIR 11 (2026)', url: '/projects/baja-2026' },
          { id: 'baja-2025', name: 'aBAJA SAEINDIA 2025', type: 'project', badge: 'AIR 7 (2025)', url: '/projects/baja-2025' },
          { id: 'role-01', name: 'Electrical & Electronics Head', type: 'role', badge: 'HARNESS CHIEF' }
        ],
        tools: ['Deutsch DT Connectors', 'Weather-pack Connectors', 'Braided Conduit', 'Ratcheting Crimpers']
      }
    ]
  },
  {
    id: 'mechanical-fabrication',
    index: '04',
    title: 'Mechanical Fabrication & Prototyping',
    shortTitle: 'Mechanical',
    tier: 'core',
    description: 'Hands-on workshop machining, power tool fabrication, vehicle steering geometry calibration, and physical electro-mechanical assembly.',
    skills: [
      {
        id: 'mechanical-fabrication-skill',
        name: 'Mechanical Fabrication',
        tier: 'core',
        proficiency: 'working',
        category: 'Mechanical Fabrication & Prototyping',
        categoryIndex: '04',
        evidence: 'Fabricated custom aluminum mounting brackets, sensor enclosures, and protective ECU housings for all-terrain competition vehicles.',
        context: 'Metal cutting, bending, drilling, tapping, and finishing within tolerance constraints.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'CHASSIS BRACKETS', url: '/projects/baja-2026' },
          { id: 'railguard-ai', name: 'RailGuard AI Rover', type: 'project', badge: 'ROVER FRAME', url: '/projects/railguard-ai' }
        ],
        tools: ['Angle Grinder', 'Drill Press', 'Metal Shears', 'Taps & Dies']
      },
      {
        id: 'workshop-practices',
        name: 'Mechanical Workshop Practices',
        tier: 'core',
        proficiency: 'working',
        category: 'Mechanical Fabrication & Prototyping',
        categoryIndex: '04',
        evidence: 'Collaborated in the Saintgits engineering fabrication workshops adhering to strict mechanical safety and precision machining guidelines.',
        context: 'Material selection (aluminum 6061, mild steel), workholding, and safe workshop operations.',
        connectedEntities: [
          { id: 'baja-2025', name: 'aBAJA SAEINDIA 2025', type: 'project', badge: 'WORKSHOP BUILDS', url: '/projects/baja-2025' }
        ],
        tools: ['Bench Vises', 'Measuring Calipers', 'Surface Plates', 'Workshop Safety']
      },
      {
        id: 'power-tools',
        name: 'Power Tool Usage',
        tier: 'core',
        proficiency: 'working',
        category: 'Mechanical Fabrication & Prototyping',
        categoryIndex: '04',
        evidence: 'Extensive hands-on operation of rotary tools, drill presses, band saws, and power sanders during vehicle integration sprints.',
        context: 'Rapid modification of chassis mounts, enclosure pass-throughs, and sensor brackets.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'CHASSIS MODS', url: '/projects/baja-2026' }
        ],
        tools: ['Drill Press', 'Rotary Dremel', 'Impact Driver', 'Hand Drills']
      },
      {
        id: 'hands-on-prototyping',
        name: 'Hands-on Prototyping',
        tier: 'core',
        proficiency: 'strong',
        category: 'Mechanical Fabrication & Prototyping',
        categoryIndex: '04',
        evidence: 'Built physical rapid prototypes for four distinct systems: aBAJA steer-by-wire linkage, RailGuard AI track rover, Hospital AMR chassis, and inverted pendulum.',
        context: 'Iterative physical build-test-learn cycle from cardboard conceptual mockups to machined competition assemblies.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'DBW TESTBED', url: '/projects/baja-2026' },
          { id: 'railguard-ai', name: 'RailGuard AI Rover', type: 'project', badge: 'PROTOTYPE', url: '/projects/railguard-ai' },
          { id: 'balancing-robot', name: 'Inverted Pendulum Robot', type: 'project', badge: 'BENCH MODEL', url: '/projects/balancing-robot' }
        ],
        tools: ['SolidWorks', 'Fusion 360', '3D Printing (TPU/PLA)', 'Fast Prototyping Hardware', 'Bench Alignment Tools']
      },
      {
        id: 'mechanical-assembly',
        name: 'Mechanical Assembly',
        tier: 'core',
        proficiency: 'strong',
        category: 'Mechanical Fabrication & Prototyping',
        categoryIndex: '04',
        evidence: 'Assembled ruggedized electronic back-boxes, linear steering actuators, suspension linkages, and sensor brackets on Car A18.',
        context: 'Fastener torque ratings, thread-locking compounds (Loctite), and vibration-dampened rubber isolators.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'CAR A18 ASSEMBLY', url: '/projects/baja-2026' }
        ],
        tools: ['Torque Wrenches', 'Hex Key Sets', 'Threadlockers', 'Vibration Isolators']
      },
      {
        id: 'steering-geometry',
        name: 'Steering Geometry & Alignment',
        tier: 'core',
        proficiency: 'working',
        category: 'Mechanical Fabrication & Prototyping',
        categoryIndex: '04',
        evidence: 'Calibrated Ackermann steering linkage travel, tie-rod lengths, and closed-loop steer-by-wire actuator stroke limits on Car A18.',
        context: 'Zero-point linear encoder calibration, bump steer minimization, and full-lock mechanical limit stops.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'STEER-BY-WIRE', url: '/projects/baja-2026' },
          { id: 'lane-keep-assist', name: 'Lane-Keep Assist (LKA)', type: 'project', badge: 'FEEDFORWARD', url: '/projects/lane-keep-assist' }
        ],
        tools: ['Linear Encoders', 'Ackermann Linkage', 'Alignment Gauges']
      }
    ]
  },
  {
    id: 'software-development',
    index: '05',
    title: 'Software & Systems Development',
    shortTitle: 'Software',
    tier: 'core',
    description: 'Modern C++17/20, Python algorithms, Linux system programming, Git collaborative pipelines, and Astro modern front-end engineering.',
    skills: [
      {
        id: 'cpp-development',
        name: 'C++',
        tier: 'core',
        proficiency: 'strong',
        category: 'Software & Systems Development',
        categoryIndex: '05',
        evidence: 'Authored ROS 2 rclcpp nodes, high-speed sensor ingestion, differential CAN gateways, and FreeRTOS microcontroller firmware.',
        context: 'Modern C++ memory management, smart pointers, RAII, concurrency, and real-time loop execution.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'FIRMWARE / ROS2', url: '/projects/baja-2026' },
          { id: 'hospital-amr', name: 'Hospital Service AMR', type: 'project', badge: 'CONTROLLER', url: '/projects/hospital-amr' },
          { id: 'swarm-robotics', name: 'Swarm Robotics Platform', type: 'project', badge: 'SWARM NODES', url: '/projects/swarm-robotics' }
        ],
        tools: ['C++17 / C++20', 'GCC / Clang', 'CMake', 'GDB']
      },
      {
        id: 'python-development',
        name: 'Python',
        tier: 'core',
        proficiency: 'strong',
        category: 'Software & Systems Development',
        categoryIndex: '05',
        evidence: 'Developed OpenCV computer vision pipelines, OpenVINO neural inference scripts, ROS 2 rclpy nodes, and data telemetry parsers.',
        context: 'NumPy matrix operations, multi-threaded video stream acquisition, and automation scripts.',
        connectedEntities: [
          { id: 'smart-cctv', name: 'Smart CCTV Platform', type: 'project', badge: 'oneAPI / OPENCV', url: '/projects/smart-cctv' },
          { id: 'railguard-ai', name: 'RailGuard AI Rover', type: 'project', badge: 'EDGE PIPELINE', url: '/projects/railguard-ai' },
          { id: 'hospital-amr', name: 'Hospital Service AMR', type: 'project', badge: 'TELEMETRY BRIDGE', url: '/projects/hospital-amr' }
        ],
        tools: ['Python 3.10+', 'NumPy', 'OpenCV Python', 'AsyncIO']
      },
      {
        id: 'linux-development',
        name: 'Linux / Ubuntu',
        tier: 'core',
        proficiency: 'strong',
        category: 'Software & Systems Development',
        categoryIndex: '05',
        evidence: 'Primary operating environment across all autonomous compute platforms (Ubuntu on Raspberry Pi 4, Jetson Orin Nano, and workstations).',
        context: 'Systemd service management, serial tty permissions, udev rules for sensors, bash automation, and networking.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'JETSON UBUNTU', url: '/projects/baja-2026' },
          { id: 'railguard-ai', name: 'RailGuard AI Rover', type: 'project', badge: 'RPI 4 LINUX', url: '/projects/railguard-ai' },
          { id: 'smart-cctv', name: 'Smart CCTV Platform', type: 'project', badge: 'LINUX EDGE', url: '/projects/smart-cctv' }
        ],
        tools: ['Ubuntu LTS', 'Raspberry Pi OS', 'Bash Shell', 'systemd', 'udev Rules', 'SSH / SCP']
      },
      {
        id: 'git-github',
        name: 'Git & GitHub',
        tier: 'core',
        proficiency: 'strong',
        category: 'Software & Systems Development',
        categoryIndex: '05',
        evidence: 'Maintained collaborative engineering repositories for Team Equinox, managing feature branching, pull requests, and releases.',
        context: 'Branch management, merge conflict resolution, semantic versioning, and open-source contribution.',
        connectedEntities: [
          { id: 'github-profile', name: 'GitHub: @buddytex', type: 'activity', badge: 'SOURCE REPOS', url: 'https://github.com/buddytex' }
        ],
        tools: ['Git CLI', 'GitHub', 'Feature Branching', 'Release Tags']
      },
      {
        id: 'frontend-astro',
        name: 'Front-end Development & Astro',
        tier: 'complementary',
        proficiency: 'working',
        category: 'Software & Systems Development',
        categoryIndex: '05',
        evidence: 'Engineered this complete interactive engineering portfolio utilizing Astro, HTML5 semantic structure, Vanilla CSS tokens, and TypeScript.',
        context: 'Component-driven static site generation, responsive layouts, client-side interaction, and high performance.',
        connectedEntities: [
          { id: 'portfolio', name: 'Engineering Portfolio', type: 'project', badge: 'ASTRO / TS', url: '/' }
        ],
        tools: ['Astro', 'TypeScript', 'HTML5', 'Vanilla CSS', 'Responsive Grid']
      },
      {
        id: 'docker-tools',
        name: 'Docker & Containerization',
        tier: 'complementary',
        proficiency: 'working',
        category: 'Software & Systems Development',
        categoryIndex: '05',
        evidence: 'Utilized containerized environments for reproducible ROS 2 builds and autonomous middleware deployments.',
        context: 'Dockerfiles, container volume mounts, and network port exposure.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'ROS2 WORKFLOW', url: '/projects/baja-2026' }
        ],
        tools: ['Docker CLI', 'Docker Compose', 'Multi-Stage Builds']
      }
    ]
  },
  {
    id: 'ai-computer-vision',
    index: '06',
    title: 'Computer Vision & Edge AI',
    shortTitle: 'Vision & AI',
    tier: 'core',
    description: 'Real-time multi-threaded video stream acquisition, OpenCV feature extraction, YOLO object detection, and Intel oneAPI OpenVINO optimization.',
    skills: [
      {
        id: 'opencv-vision',
        name: 'OpenCV',
        tier: 'core',
        proficiency: 'working',
        category: 'Computer Vision & Edge AI',
        categoryIndex: '06',
        evidence: 'Implemented image preprocessing, color space thresholding, edge filtering (Sobel/Canny), and bounding box annotations.',
        context: 'Sub-35ms frame processing pipelines for Smart CCTV and autonomous lane boundary detection.',
        connectedEntities: [
          { id: 'smart-cctv', name: 'Smart CCTV Platform', type: 'project', badge: 'oneAPI HACKATHON', url: '/projects/smart-cctv' },
          { id: 'lane-keep-assist', name: 'Lane-Keep Assist (LKA)', type: 'project', badge: 'VISION GUIDANCE', url: '/projects/lane-keep-assist' }
        ],
        tools: ['OpenCV (C++ / Python)', 'Sobel Filter', 'Hough Transform', 'Color Space Filtering']
      },
      {
        id: 'yolo-detection',
        name: 'YOLO & Object Detection',
        tier: 'core',
        proficiency: 'working',
        category: 'Computer Vision & Edge AI',
        categoryIndex: '06',
        evidence: 'Deployed quantized YOLO neural detection models for real-time track fissure identification and surveillance anomaly detection.',
        context: 'Bounding box regression, confidence thresholding, non-maximum suppression (NMS), and class labeling.',
        connectedEntities: [
          { id: 'smart-cctv', name: 'Smart CCTV Platform', type: 'project', badge: 'THREAT DETECT', url: '/projects/smart-cctv' },
          { id: 'railguard-ai', name: 'RailGuard AI Rover', type: 'project', badge: 'TRACK ANOMALY', url: '/projects/railguard-ai' }
        ],
        tools: ['YOLO Models', 'Bounding Box Tracking', 'NMS', 'Inference Pipelines']
      },
      {
        id: 'intel-oneapi',
        name: 'Intel oneAPI & OpenVINO',
        tier: 'core',
        proficiency: 'working',
        category: 'Computer Vision & Edge AI',
        categoryIndex: '06',
        evidence: 'Leveraged Intel oneAPI toolkits and OpenVINO runtime to quantize neural models and accelerate edge computer vision inference.',
        context: 'Ranked Top 25 National Finalist among 300+ collegiate teams in the National GenAI Hackathon 2024.',
        connectedEntities: [
          { id: 'smart-cctv', name: 'Smart CCTV Platform', type: 'project', badge: 'INTEL TOP 25', url: '/projects/smart-cctv' }
        ],
        tools: ['Intel oneAPI', 'OpenVINO Toolkit', 'Model Optimizer', 'INT8 Quantization']
      },
      {
        id: 'video-streaming',
        name: 'Real-Time Video Streaming Pipelines',
        tier: 'core',
        proficiency: 'working',
        category: 'Computer Vision & Edge AI',
        categoryIndex: '06',
        evidence: 'Engineered asynchronous multi-threaded RTSP and USB camera frame ingestion with lock-free buffer queues.',
        context: 'Prevented camera buffer overflow and suppressed frame latency accumulation under 40ms.',
        connectedEntities: [
          { id: 'smart-cctv', name: 'Smart CCTV Platform', type: 'project', badge: 'SUB-35ms STREAM', url: '/projects/smart-cctv' }
        ],
        tools: ['RTSP Streaming', 'Multi-Threaded Capture', 'Ring Buffers']
      }
    ]
  },
  {
    id: 'system-integration',
    index: '07',
    title: 'System Integration & Vehicle Architecture',
    shortTitle: 'Integration',
    tier: 'core',
    description: 'Full-vehicle electro-mechanical integration, hardware-software co-design, drive-by-wire actuation, and fail-safe safety interlocks.',
    skills: [
      {
        id: 'vehicle-system-integration',
        name: 'Autonomous Vehicle Integration',
        tier: 'core',
        proficiency: 'strong',
        category: 'System Integration & Vehicle Architecture',
        categoryIndex: '07',
        evidence: 'Led the total physical and logical integration of an autonomous electric Baja racing car across two national campaigns.',
        context: 'Bringing together chassis, suspension, actuators, ECUs, battery accumulator, motor controller, and compute stack into a cohesive race-ready vehicle.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'AIR 11 (2026)', url: '/projects/baja-2026' },
          { id: 'baja-2025', name: 'aBAJA SAEINDIA 2025', type: 'project', badge: 'AIR 7 (2025)', url: '/projects/baja-2025' },
          { id: 'role-01', name: 'Electrical & Electronics Head', type: 'role', badge: 'CHIEF ARCHITECT' }
        ],
        tools: ['System Integration', 'Cross-Discipline Alignment', 'Physical Vehicle Commissioning']
      },
      {
        id: 'hardware-software-codesign',
        name: 'Hardware-Software Co-Design',
        tier: 'core',
        proficiency: 'strong',
        category: 'System Integration & Vehicle Architecture',
        categoryIndex: '07',
        evidence: 'Simultaneously specified PCB hardware protections (opto-isolation, flyback diodes) to match software interrupt timing and latency requirements.',
        context: 'Ensured software state machines accurately reflect physical hardware electrical states under all operating conditions.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'ECU CO-DESIGN', url: '/projects/baja-2026' },
          { id: 'hospital-amr', name: 'Hospital Service AMR', type: 'project', badge: 'EMBEDDED CO-DESIGN', url: '/projects/hospital-amr' }
        ],
        tools: ['Hardware-Software Boundary Mapping', 'Timing Analysis', 'Fail-Safe Logic']
      },
      {
        id: 'drive-by-wire',
        name: 'Drive-by-Wire Architecture (TBW, BBW, SBW)',
        tier: 'core',
        proficiency: 'strong',
        category: 'System Integration & Vehicle Architecture',
        categoryIndex: '07',
        evidence: 'Engineered electro-mechanical Throttle-by-Wire, Brake-by-Wire, and Steer-by-Wire control for an autonomous off-road vehicle.',
        context: 'APPS dual-potentiometer plausibility checks, linear encoder feedback, and high-torque servomotor angle regulation.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'DBW TESTED', url: '/projects/baja-2026' }
        ],
        tools: ['APPS Plausibility Check', 'Steering Servos', 'Linear Encoders', 'Brake Actuators']
      },
      {
        id: 'safety-estop',
        name: 'Fail-Safe & Safety Interlocks',
        tier: 'core',
        proficiency: 'strong',
        category: 'System Integration & Vehicle Architecture',
        categoryIndex: '07',
        evidence: 'Designed dedicated hardware E-Stop latching circuits and Accumulator Isolation Relays (AIR) interrupting traction power within sub-5ms.',
        context: 'Purely hardware-arbitrated normally-closed safety loops that guarantee vehicle shutdown independently of software microcontroller state.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'SUB-5ms SHUTDOWN', url: '/projects/baja-2026' }
        ],
        tools: ['AIR Relays', 'Normally-Closed Loops', 'Hardware Latching', 'HVIL Safety Loop']
      }
    ]
  },
  {
    id: 'engineering-research',
    index: '08',
    title: 'Engineering Research & Problem Solving',
    shortTitle: 'Research',
    tier: 'core',
    description: 'Systematic technical investigation, technology benchmarking, deep datasheet analysis, and rapid unfamiliar system onboarding.',
    skills: [
      {
        id: 'engineering-research-skill',
        name: 'Technical Research & Problem Solving',
        tier: 'core',
        proficiency: 'strong',
        category: 'Engineering Research & Problem Solving',
        categoryIndex: '08',
        evidence: 'Investigated and solved complex physical failure modes: transient motor inductive ground bounce, CAN bus termination reflections, and SLAM doorway inflation.',
        context: 'Applied rigorous engineering root-cause analysis rather than ad-hoc trial-and-error.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'ROOT-CAUSE ANALYSIS', url: '/projects/baja-2026' },
          { id: 'hospital-amr', name: 'Hospital Service AMR', type: 'project', badge: 'INFLATION RESEARCH', url: '/projects/hospital-amr' }
        ],
        tools: ['FMEA Analysis', 'Technical Root-Cause Analysis', 'Scientific Debugging']
      },
      {
        id: 'technology-benchmarking',
        name: 'Technology Benchmarking & Solution Trade-offs',
        tier: 'core',
        proficiency: 'strong',
        category: 'Engineering Research & Problem Solving',
        categoryIndex: '08',
        evidence: 'Evaluated alternative swarm communication architectures (centralized vs. peer-to-peer ad-hoc) and open-source ROS framework implementations.',
        context: 'Benchmarked CPU overhead, latency, message throughput, and hardware cost trade-offs.',
        connectedEntities: [
          { id: 'swarm-robotics', name: 'Swarm Robotics Platform', type: 'project', badge: 'VeRLab BENCHMARK', url: '/projects/swarm-robotics' }
        ],
        tools: ['Benchmarking Metrics', 'Comparative Trade-off Matrices', 'Cost-Performance Analysis']
      },
      {
        id: 'engineering-documentation',
        name: 'Technical Documentation & Design Dossiers',
        tier: 'core',
        proficiency: 'strong',
        category: 'Engineering Research & Problem Solving',
        categoryIndex: '08',
        evidence: 'Authored complete Engineering Design Dossiers, electrical schematics, and wiring harness drawings for national BAJA SAE technical inspections.',
        context: 'Structured technical reports explaining design calculations, safety factors, and component ratings.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'SAE SCRUTINY PASS', url: '/projects/baja-2026' },
          { id: 'role-01', name: 'Electrical & Electronics Head', type: 'role', badge: 'DOCUMENTATION CHIEF' }
        ],
        tools: ['Engineering Design Reports', 'Technical Drawings', 'Schematic Documentation']
      },
      {
        id: 'rapid-system-onboarding',
        name: 'Rapid Unfamiliar System Onboarding',
        tier: 'core',
        proficiency: 'strong',
        category: 'Engineering Research & Problem Solving',
        categoryIndex: '08',
        evidence: 'Rapidly absorbed and evaluated complex clinical robotic surgery workflows (CMR Versius) and Intel oneAPI development environments within tight sprint windows.',
        context: 'Studied unfamiliar documentation, analyzed architecture diagrams, and quickly extracted actionable technical insights.',
        connectedEntities: [
          { id: 'surgical-robotics', name: 'Clinical Surgical Robotics Internship', type: 'experience', badge: 'CLINICAL ONBOARDING', url: '/experience/surgical-robotics' },
          { id: 'smart-cctv', name: 'Smart CCTV Platform', type: 'project', badge: 'oneAPI SPRINT', url: '/projects/smart-cctv' }
        ],
        tools: ['Rapid Documentation Ingestion', 'Systemic Deconstruction', 'Workflow Modeling']
      }
    ]
  },
  {
    id: 'leadership-team-management',
    index: '09',
    title: 'Leadership & Team Management',
    shortTitle: 'Leadership',
    tier: 'core',
    description: 'Technical divisional leadership, engineering task delegation, collegiate mentoring, and high-stakes operational coordination.',
    skills: [
      {
        id: 'technical-leadership',
        name: 'Technical Leadership',
        tier: 'core',
        proficiency: 'strong',
        category: 'Leadership & Team Management',
        categoryIndex: '09',
        evidence: 'Headed the Electrical and Electronics division for Team Equinox across two consecutive national campaigns (AIR 7 in 2025, AIR 11 in 2026).',
        context: 'Set the technical roadmap, enforced safety and engineering quality standards, and defended designs before national jury panels.',
        connectedEntities: [
          { id: 'role-01', name: 'Electrical & Electronics Head', type: 'role', badge: 'TEAM EQUINOX' },
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'AIR 11 (2026)', url: '/projects/baja-2026' },
          { id: 'baja-2025', name: 'aBAJA SAEINDIA 2025', type: 'project', badge: 'AIR 7 (2025)', url: '/projects/baja-2025' }
        ],
        tools: ['Engineering Direction', 'Safety Oversight', 'Technical Defense']
      },
      {
        id: 'team-management',
        name: 'Team Management & Coordination',
        tier: 'core',
        proficiency: 'strong',
        category: 'Leadership & Team Management',
        categoryIndex: '09',
        evidence: 'Managed multi-member technical sub-teams in the workshop and large operational anchoring teams during national cultural festivals.',
        context: 'Work breakdown structures, sprint timelines, accountability, and resource allocation.',
        connectedEntities: [
          { id: 'role-01', name: 'Electrical & Electronics Head', type: 'role', badge: 'ENGINEERING TEAM' },
          { id: 'role-02', name: 'Vice President of Anchoring Club', type: 'role', badge: 'FEST LEADERSHIP' }
        ],
        tools: ['Sprint Planning', 'Task Delegation', 'Timeline Management']
      },
      {
        id: 'team-grooming',
        name: 'Team Grooming & Mentoring',
        tier: 'core',
        proficiency: 'strong',
        category: 'Leadership & Team Management',
        categoryIndex: '09',
        evidence: 'Personally trained and mentored junior engineering team members in KiCad, PCB soldering, and CAN wiring; groomed stage anchors for live national events.',
        context: 'Hands-on skill transfer, constructive review, building confidence, and fostering technical independence.',
        connectedEntities: [
          { id: 'role-02', name: 'Vice President of Anchoring Club', type: 'role', badge: 'ANCHOR GROOMING' },
          { id: 'role-01', name: 'Electrical & Electronics Head', type: 'role', badge: 'E&E MENTORSHIP' }
        ],
        tools: ['Technical Mentoring', 'Public Speaking Coaching', 'Code & Hardware Reviews']
      }
    ]
  },
  {
    id: 'communication-presentation',
    index: '10',
    title: 'Communication & Live Presentation',
    shortTitle: 'Communication',
    tier: 'complementary',
    description: 'National-level cultural fest anchoring, live audience management, technical jury presentations, and collegiate radio broadcasting.',
    skills: [
      {
        id: 'public-speaking',
        name: 'Public Speaking & Anchoring',
        tier: 'complementary',
        proficiency: 'strong',
        category: 'Communication & Live Presentation',
        categoryIndex: '10',
        evidence: 'Served as lead stage anchor and Vice President of the Anchoring Club, addressing audiences of thousands at institutional and national ceremonies.',
        context: 'Impromptu speaking, executive presence, voice modulation, and audience engagement under pressure.',
        connectedEntities: [
          { id: 'role-02', name: 'Vice President of Anchoring Club', type: 'role', badge: 'NAKSHATRA' },
          { id: 'role-04', name: 'Radio Jockey', type: 'role', badge: 'GITSWAVE' }
        ],
        tools: ['Stage Presence', 'Microphone Technique', 'Impromptu Delivery']
      },
      {
        id: 'stage-management',
        name: 'Stage Management & Live Execution',
        tier: 'complementary',
        proficiency: 'strong',
        category: 'Communication & Live Presentation',
        categoryIndex: '10',
        evidence: 'Managed stage flow, live timing, anchoring cue sheets, and celebrity guest transitions at the national-level Nakshatra Cultural Fest.',
        context: 'High-stakes real-time coordination behind the curtains ensuring seamless ceremony execution.',
        connectedEntities: [
          { id: 'role-02', name: 'Vice President of Anchoring Club', type: 'role', badge: 'STAGE CHIEF' }
        ],
        tools: ['Cue Sheet Management', 'Live Timing Control', 'Celebrity Protocol']
      },
      {
        id: 'technical-presentation',
        name: 'Technical Presentation & Scrutiny Defense',
        tier: 'complementary',
        proficiency: 'strong',
        category: 'Communication & Live Presentation',
        categoryIndex: '10',
        evidence: 'Delivered technical design presentations and successfully defended electrical safety systems before national SAEINDIA judges and Intel hackathon juries.',
        context: 'Clear articulation of engineering trade-offs, schematic walk-throughs, and quantitative evidence.',
        connectedEntities: [
          { id: 'role-01', name: 'Electrical & Electronics Head', type: 'role', badge: 'SAE SCRUTINY' },
          { id: 'smart-cctv', name: 'Smart CCTV Platform', type: 'project', badge: 'INTEL JURY', url: '/projects/smart-cctv' }
        ],
        tools: ['Engineering Scrutiny', 'Q&A Defense', 'Slide Presentations']
      },
      {
        id: 'radio-jockeying',
        name: 'Radio Jockeying & On-Air Broadcasting',
        tier: 'complementary',
        proficiency: 'strong',
        category: 'Communication & Live Presentation',
        categoryIndex: '10',
        evidence: 'Lead Radio Jockey and Coordinator for GITSwave 20.22, hosting on-air thematic shows and operating studio audio consoles.',
        context: 'Voice delivery, soundboard production, listener engagement, and collegiate programming.',
        connectedEntities: [
          { id: 'role-03', name: 'Coordinator of Campus Radio Jockey', type: 'role', badge: 'STUDIO OPS' },
          { id: 'role-04', name: 'Radio Jockey', type: 'role', badge: 'ON-AIR HOST' }
        ],
        tools: ['Audio Mixing Consoles', 'Condenser Microphones', 'Broadcast Production']
      }
    ]
  },
  {
    id: 'creative-digital-tools',
    index: '11',
    title: 'Creative & Digital Tools',
    shortTitle: 'Digital Tools',
    tier: 'complementary',
    description: 'Technical slide design, visual communication assets, demonstration video editing, and clear digital content creation.',
    skills: [
      {
        id: 'presentation-design',
        name: 'Technical Presentation Design (PowerPoint)',
        tier: 'complementary',
        proficiency: 'strong',
        category: 'Creative & Digital Tools',
        categoryIndex: '11',
        evidence: 'Designed high-clarity technical slide decks, system diagrams, and competition presentations for aBAJA and Intel hackathons.',
        context: 'Translating complex electrical schematics and state machines into clean visual explanations for judges.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'SLIDE DECKS', url: '/projects/baja-2026' },
          { id: 'smart-cctv', name: 'Smart CCTV Platform', type: 'project', badge: 'HACKATHON DECK', url: '/projects/smart-cctv' }
        ],
        tools: ['Microsoft PowerPoint', 'Technical Slide Architecture', 'Data Flow Diagrams']
      },
      {
        id: 'canva-visual',
        name: 'Canva & Visual Communication',
        tier: 'complementary',
        proficiency: 'working',
        category: 'Creative & Digital Tools',
        categoryIndex: '11',
        evidence: 'Crafted visual event announcements, team identity posters, and social communication assets for institutional clubs.',
        context: 'Layout hierarchy, typographic pairing, and clean digital graphics.',
        connectedEntities: [
          { id: 'role-02', name: 'Vice President of Anchoring Club', type: 'role', badge: 'EVENT ASSETS' },
          { id: 'role-03', name: 'Coordinator of Campus Radio Jockey', type: 'role', badge: 'PROMO GRAPHICS' }
        ],
        tools: ['Canva', 'Visual Layout', 'Graphic Hierarchy']
      },
      {
        id: 'video-editing',
        name: 'Video Editing & Demonstration Media',
        tier: 'complementary',
        proficiency: 'working',
        category: 'Creative & Digital Tools',
        categoryIndex: '11',
        evidence: 'Cut and produced testing demonstration videos for steer-by-wire bench trials, rover hardware testing, and clinical robotic walkthroughs.',
        context: 'Timing cuts, telemetry callout overlays, and technical pacing for evaluation juries.',
        connectedEntities: [
          { id: 'baja-2026', name: 'aBAJA SAEINDIA 2026', type: 'project', badge: 'BENCH VIDEOS', url: '/projects/baja-2026' },
          { id: 'railguard-ai', name: 'RailGuard AI Rover', type: 'project', badge: 'ROVER VIDEO', url: '/projects/railguard-ai' },
          { id: 'surgical-robotics', name: 'Clinical Surgical Robotics Internship', type: 'experience', badge: 'CLINICAL VIDEO', url: '/experience/surgical-robotics' }
        ],
        tools: ['Video Editing', 'Clip Trimming', 'Pacing & Transitions']
      }
    ]
  }
];

// Flatten all skills for quick lookups
export const allSkills: SkillItem[] = skillCategories.flatMap(cat => cat.skills);

// Backward-compatible skillsData array for /skills/[id] static routes
export const skillsData: SkillEvidence[] = allSkills.map(skill => ({
  id: skill.id,
  title: skill.name,
  category: skill.category,
  categoryIndex: skill.categoryIndex,
  tier: skill.tier,
  proficiency: skill.proficiency,
  shortDesc: skill.context,
  evidenceItems: [
    {
      title: `${skill.name} Engineering Validation`,
      description: skill.evidence,
      specs: skill.tools || [skill.name, skill.category],
      problemSolved: skill.context,
      designDecisions: `Selected and applied based on empirical constraints in ${skill.connectedEntities.map(e => e.name).join(', ')}.`,
      tools: skill.tools || []
    }
  ],
  relatedProjects: skill.connectedEntities
    .filter(e => e.type === 'project' || e.type === 'experience')
    .map(e => ({ name: e.name, id: e.id, url: e.url })),
  connectedEntities: skill.connectedEntities
}));
