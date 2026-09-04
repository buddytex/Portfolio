export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  status: string;
  domain: string;
  summary: string;
  challenge: string;
  approach: string;
  systemArchitecture: string[];
  softwareStack: string[];
  hardwareStack: string[];
  keyResults: string[];
  githubUrl?: string;
  visualSignature: 'trajectory' | 'lidar' | 'vision' | 'swarm';
}

export const projects: Project[] = [
  {
    id: 'abaja',
    index: '01',
    title: 'Autonomous aBAJA Vehicle',
    subtitle: 'All-Terrain Drive-by-Wire Architecture · Team Equinox',
    role: 'Electrical & Electronics Head · Systems Integration',
    year: '2025 – 2026',
    status: 'AIR 7 (2025) · AIR 11 (2026)',
    domain: 'Autonomous Vehicle / Embedded / ROS 2 / CAN 2.0B',
    summary: 'Spearheaded end-to-end electrical architecture, custom multi-layer ECUs, isolated CAN 2.0B network, and steer/brake-by-wire electro-mechanical actuation for an autonomous all-terrain competition vehicle competing nationally in BAJA SAE India.',
    challenge: 'Eliminating electromagnetic interference (EMI) from high-current motor draws corrupting low-voltage sensor lines, while guaranteeing sub-10ms deterministic actuator response latency on uneven off-road terrain with violent vibration.',
    approach: 'Engineered dual-rail galvanic isolation for HV and LV wiring harnesses, designed custom multi-layer ECUs with differential CAN 2.0B transceivers, and built fail-safe hardware E-Stop interlocks directly coupled with ROS 2 trajectory controllers.',
    systemArchitecture: [
      'High-Level ROS 2 Perception & Trajectory Planner',
      'Deterministic 500 kbps CAN 2.0B Vehicle Bus Gateway',
      'Dual Custom ECUs with Dedicated Driver Microcontrollers',
      'Electro-Mechanical Steer-by-Wire Actuator & Feedback Linear Encoders',
      'Fail-Safe Dual-Redundant Hardware E-Stop Interlock Circuit'
    ],
    softwareStack: ['ROS 2 Humble', 'Embedded C/C++', 'CAN 2.0B Protocol Stack', 'RTOS Motor Control', 'Telemetry Logging'],
    hardwareStack: ['Custom Multi-Layer ECUs', 'CAN 2.0B Transceivers', 'Isolated HV/LV Harnesses', 'Drive-by-Wire Actuators', 'Linear Encoders', 'Hardware E-Stop Interlocks'],
    keyResults: [
      'All India Rank AIR 7 in BAJA SAE India 2025 National Campaign',
      'All India Rank AIR 11 in BAJA SAE India 2026 National Campaign',
      '100% electrical reliability across national off-road endurance challenges'
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'trajectory'
  },
  {
    id: 'hospital-amr',
    index: '02',
    title: 'Hospital Service AMR',
    subtitle: 'Autonomous Indoor Clinical Transport Platform',
    role: 'Autonomy & Embedded Systems Developer',
    year: '2024 – 2025',
    status: 'DEPLOYED TESTBED',
    domain: 'Service Robotics / SLAM / Nav2 / IoT Fleet',
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
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'lidar'
  },
  {
    id: 'smart-cctv',
    index: '03',
    title: 'Smart CCTV Edge Vision',
    subtitle: 'High-Throughput Multi-Stream Edge AI Inference',
    role: 'Computer Vision & Edge AI Engineer',
    year: '2024',
    status: 'ACTIVE RUNTIME',
    domain: 'Computer Vision / Edge AI / OpenCV / YOLO',
    summary: 'Built a real-time edge computer vision engine processing multiple concurrent RTSP video streams for object detection, bounding-box tracking, and perimeter anomaly alert dispatch without relying on cloud processing.',
    challenge: 'Achieving sustained 30 FPS inference throughput across simultaneous camera streams without frame drops, memory leaks, or thermal throttling on compute-constrained edge accelerators.',
    approach: 'Implemented a multi-threaded frame acquisition pipeline with hardware-accelerated OpenCV decoders, quantized YOLO neural inference, and spatial Kalman-filter multi-object tracking.',
    systemArchitecture: [
      'Multi-Threaded RTSP Video Ingestion Pipeline',
      'Hardware-Accelerated Frame Preprocessing (OpenCV)',
      'Quantized YOLO Neural Network Inference Engine',
      'Multi-Object Spatial Kalman Filter Tracker',
      'Automated Low-Latency Perimeter Alert Dispatch'
    ],
    softwareStack: ['OpenCV', 'Python', 'YOLO / PyTorch', 'NumPy', 'Multi-Threaded Video Engine'],
    hardwareStack: ['Edge Compute Accelerator Unit', 'High-Res IP Cameras', 'Hardware Video Decoders'],
    keyResults: [
      'Sustained 30 FPS real-time inference on edge compute hardware',
      'Sub-150ms automated spatial perimeter breach alert dispatch',
      'Fully autonomous on-premise execution with zero cloud dependency'
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'vision'
  },
  {
    id: 'swarm-robotics',
    index: '04',
    title: 'Swarm Robotics Platform',
    subtitle: 'Decentralized Consensus & Ad-Hoc Mesh Coordination',
    role: 'Distributed Systems & Robotics Researcher',
    year: '2023 – 2024',
    status: 'RESEARCH PROTOTYPE',
    domain: 'Distributed Systems / Multi-Agent / ESP32 / Sockets',
    summary: 'Developed a physical multi-agent robotics platform demonstrating decentralized spatial dispersion, target encirclement, and dynamic flocking over peer-to-peer wireless ad-hoc networks without a centralized server.',
    challenge: 'Handling severe packet loss, network latency jitter, and dynamic topology changes when individual nodes temporarily disconnect or join mid-operation.',
    approach: 'Developed an ad-hoc TCP/IP broadcast protocol on dual-core ESP32 microcontrollers. Implemented potential-field based consensus algorithms where agents calculate velocity vectors based on neighbor state vectors.',
    systemArchitecture: [
      'Local Proximity & Distance Sensing Nodes',
      'Peer-to-Peer TCP/IP Ad-Hoc Wi-Fi Mesh Protocol',
      'Decentralized Potential-Field Consensus State Machine',
      'Coordinated Multi-Agent Velocity Vector Regulator',
      'Live Python Swarm Telemetry Visualizer'
    ],
    softwareStack: ['ROS', 'Embedded C++', 'TCP/IP Sockets Protocol', 'Python Swarm Telemetry Visualizer'],
    hardwareStack: ['Differential Swarm Robot Nodes', 'ESP32 Wi-Fi Modules', 'Proximity Sensors', 'Custom Node PCB'],
    keyResults: [
      'Decentralized formation maintenance without single point of failure',
      'Rapid mesh self-healing upon unexpected node drop-outs or link degradations',
      'Real-time Python telemetry visualizer rendering live node topologies'
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'swarm'
  }
];
