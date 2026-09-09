export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  role: string;
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
  visualSignature: 'trajectory' | 'lidar' | 'vision' | 'swarm' | 'rail' | 'balance' | 'agv' | 'lane';
  featured?: boolean;
  imagePath?: string;
  secondaryImage?: string;
}

export const projects: Project[] = [
  {
    id: 'abaja',
    index: '01',
    title: 'Autonomous aBAJA Vehicle',
    featured: true,
    subtitle: 'All-Terrain Drive-by-Wire Architecture · Team Equinox',
    role: 'Electrical & Electronics Head · Systems Integration',
    year: '2025 – 2026',
    status: 'AIR 7 (2025) · AIR 11 (2026)',
    domain: 'Autonomous Vehicle / Embedded / ROS 2 / CAN 2.0B',
    category: 'autonomous',
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
    failuresAndIterations: [
      {
        issue: 'Transient inductive kickback from high-torque steering servos caused brownout resets on logic microcontrollers.',
        rootCause: 'Shared ground plane allowed high di/dt return currents to inject noise into low-voltage digital rails.',
        iteration: 'Redesigned PCB with separated star grounds and optocoupled gate drive stages, completely isolating 24V motor transients from 3.3V logic.'
      },
      {
        issue: 'Differential CAN frame drops during rapid full-lock steering maneuvers.',
        rootCause: 'Improper split termination impedance causing high-frequency reflections on the off-road harness.',
        iteration: 'Recalibrated split termination networks to exact 120Ω differential impedance with 4.7nF common-mode filtering capacitor.'
      }
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'trajectory',
    imagePath: '/images/abaja-sbw-architecture.png',
    secondaryImage: '/images/team-equinox-session.jpg'
  },
  {
    id: 'hospital-amr',
    index: '02',
    title: 'Hospital Service AMR',
    featured: true,
    subtitle: 'Autonomous Indoor Clinical Transport Platform',
    role: 'Autonomy & Embedded Systems Developer',
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
    visualSignature: 'lidar'
  },
  {
    id: 'smart-cctv',
    index: '03',
    title: 'Smart CCTV Edge Vision',
    featured: true,
    subtitle: 'High-Throughput Multi-Stream Edge AI Inference',
    role: 'Computer Vision & Edge AI Engineer',
    year: '2024',
    status: 'ACTIVE RUNTIME',
    domain: 'Computer Vision / Edge AI / OpenCV / YOLO',
    category: 'vision',
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
    failuresAndIterations: [
      {
        issue: 'Frame capture blocking neural inference worker thread causing latency spikes.',
        rootCause: 'Synchronous OpenCV VideoCapture calls locked the main processing loop on RTSP network jitter.',
        iteration: 'Implemented lock-free ring buffer queue across asynchronous ingestion threads, dropping stale frames when inference backlog exceeded 33ms.'
      }
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'vision',
    imagePath: '/images/abaja-lane-pipeline.png'
  },
  {
    id: 'swarm-robotics',
    index: '04',
    title: 'Swarm Robotics Platform',
    featured: true,
    subtitle: 'Decentralized Consensus & Ad-Hoc Mesh Coordination',
    role: 'Distributed Systems & Robotics Researcher',
    year: '2023 – 2024',
    status: 'RESEARCH PROTOTYPE',
    domain: 'Distributed Systems / Multi-Agent / ESP32 / Sockets',
    category: 'robotics',
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
    failuresAndIterations: [
      {
        issue: 'Swarm agents locking into local potential minima during tight obstacle avoidance.',
        rootCause: 'Standard attractive-repulsive potential fields produce zero-gradient equilibrium points near concave boundaries.',
        iteration: 'Integrated rotational vortex vector fields around detected obstacles, breaking symmetry and guiding agents along laminar streamlines.'
      }
    ],
    githubUrl: 'https://github.com/buddytex',
    visualSignature: 'swarm'
  },
  {
    id: 'railguard-ai',
    index: '05',
    title: 'RailGuard AI: Track Defect & Obstacle Anomaly System',
    featured: false,
    subtitle: 'Edge Vision Anomaly Detection & Companion Telemetry System',
    role: 'Lead AI & Embedded Systems Architect',
    year: '2026',
    status: 'NATIONAL HACKATHON WINNER',
    domain: 'Edge AI / Computer Vision / Android / Railway Safety',
    category: 'vision',
    summary: 'Built an end-to-end autonomous railway inspection system utilizing quantized edge vision models for real-time track anomaly identification, paired with an Android telemetry station for sub-second emergency operator alerts.',
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
    visualSignature: 'rail'
  },
  {
    id: 'balancing-robot',
    index: '06',
    title: 'Two-Wheeled Inverted Pendulum Robot',
    featured: false,
    subtitle: 'High-Frequency Closed-Loop Postural Stabilization',
    role: 'Embedded Control Systems Engineer',
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
    index: '07',
    title: 'AGV Industrial Odometry & Sensor Fusion',
    featured: false,
    subtitle: 'Multi-Rate Pose Estimation for Industrial Guided Vehicles',
    role: 'Robotics Software & State Estimation Engineer',
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
    index: '08',
    title: 'Autonomous Lane-Keep Assist (LKA) System',
    featured: false,
    subtitle: 'Real-Time Polynomial Lane Boundary Tracking & Steering Feedforward',
    role: 'Autonomous Vehicle Algorithms Engineer',
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
