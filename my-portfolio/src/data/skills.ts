export interface SkillEvidence {
  id: string;
  title: string;
  category: string;
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
  }[];
}

export const skillsData: SkillEvidence[] = [
  {
    id: 'pcb-design',
    title: 'PCB Design & Custom ECUs',
    category: 'Hardware & Embedded Electronics',
    shortDesc: 'Custom multi-layer ECUs with integrated differential CAN 2.0B transceivers, galvanically isolated power rails, and fail-safe hardware E-Stop interlocks.',
    evidenceItems: [
      {
        title: 'Custom Multi-Layer Vehicle ECU',
        description: 'Designed and fabricated custom microcontroller boards commanding all-terrain vehicle steer-by-wire actuation under high vibration.',
        specs: ['4-Layer FR4 Stackup', 'Dual Isolated Power Planes (24V HV / 5V LV / 3.3V Logic)', 'Differential CAN 2.0B Transceivers', 'Transient Voltage Suppressors (TVS)'],
        problemSolved: 'Eliminated high-current electrical noise and transient inductive spikes from off-road steering servos corrupting low-voltage microcontroller logic.',
        designDecisions: 'Employed optocouplers for galvanic isolation between HV motor power and LV logic rails. Routed differential CAN traces with matched 120Ω termination resistors.',
        tools: ['KiCad', 'Oscilloscope Signal Analysis', 'SMD Soldering', 'Thermal Imaging']
      },
      {
        title: 'Fail-Safe Hardware E-Stop Circuit',
        description: 'Dedicated safety interlock PCB interrupting actuator power relays within sub-5ms upon wireless or physical button trigger.',
        specs: ['Dual-Channel Normally-Closed Relays', 'Hardware Latching Circuit', 'Sub-5ms Actuation Latency'],
        problemSolved: 'Prevented vehicle runaway conditions during autonomous trajectory tracking failures.',
        designDecisions: 'Purely hardware-arbitrated latching relays that require active manual reset, independent of software microcontroller state.',
        tools: ['KiCad', 'Bench Power Supplies', 'Automotive Deutsch Connectors']
      }
    ],
    relatedProjects: [
      { name: 'Autonomous aBAJA Vehicle (AIR 7 & AIR 11)', id: 'abaja' }
    ]
  },
  {
    id: 'ros2',
    title: 'ROS 2 & Middleware Architecture',
    category: 'Robotics Middleware & Distributed Autonomy',
    shortDesc: 'Production DDS middleware integration, deterministic node lifecycles, action servers, and coordinate frame management (TF2).',
    evidenceItems: [
      {
        title: 'Humble Computational Node Pipeline',
        description: 'Engineered modular multi-node architecture connecting high-level planners with low-level microcontrollers over serial and CAN.',
        specs: ['ROS 2 Humble LTS', 'rclcpp / rclpy', 'DDS Cyclone DDS', 'Custom Interface Messages'],
        problemSolved: 'Achieved deterministic data flow between 10 Hz LiDAR perception, 50 Hz EKF state estimation, and 100 Hz motor CAN gateways.',
        designDecisions: 'Used Best-Effort QoS for sensor streams to avoid queue lag and Reliable QoS for actuation cmd_vel commands.',
        tools: ['ROS 2 Humble', 'Foxglove Studio', 'RViz 2', 'Linux Ubuntu LTS']
      }
    ],
    relatedProjects: [
      { name: 'Autonomous aBAJA Vehicle', id: 'abaja' },
      { name: 'Hospital Service AMR', id: 'hospital-amr' }
    ]
  },
  {
    id: 'autonomous-navigation',
    title: 'Autonomous Navigation & Nav2',
    category: 'Mobile Autonomy & Motion Planning',
    shortDesc: 'Global path planners, local trajectory rollout algorithms, dynamic costmap tuning, and recovery behaviors.',
    evidenceItems: [
      {
        title: 'Nav2 Hospital Corridor Autonomy',
        description: 'Tuned dynamic layered costmaps in Nav2 to guide a differential mobile robot around dynamic pedestrian paths and glass walls.',
        specs: ['Global A* Search Planner', 'Local DWB Trajectory Generator', 'Layered Costmap2D', 'Static & Dynamic Inflation Layers'],
        problemSolved: 'Prevented local planner freezing in narrow hospital hallways with moving carts and pedestrian foot traffic.',
        designDecisions: 'Calibrated asymmetric inflation decay parameters to allow tight door clearance while maintaining safe deceleration around moving people.',
        tools: ['Nav2', 'SLAM Toolbox', 'Python', 'ROS 2']
      }
    ],
    relatedProjects: [
      { name: 'Hospital Service AMR', id: 'hospital-amr' }
    ]
  },
  {
    id: 'lidar-perception',
    title: '3D & 2D LiDAR Perception',
    category: 'Spatial Perception & Sensor Geometry',
    shortDesc: 'Planar laser scanning, range array filtering, spatial point-cloud clustering, and multi-sensor odometry fusion.',
    evidenceItems: [
      {
        title: 'Planar LiDAR SLAM & Spatial Clustering',
        description: 'Real-time range packet ingestion, outlier filtering, and Euclidean obstacle segmentation.',
        specs: ['Planar 360° LiDAR', '10 Hz Scan Ingestion', 'Sub-Centimeter Map Matching', 'Euclidean Cluster Extraction'],
        problemSolved: 'Accurate indoor localization without GPS in uniform, feature-sparse hospital corridors.',
        designDecisions: 'Fused LiDAR scan matching with wheel odometry using an Extended Kalman Filter to eliminate rotational drift during turns.',
        tools: ['SLAM Toolbox', 'PCL (Point Cloud Library)', 'Python', 'C++']
      }
    ],
    relatedProjects: [
      { name: 'Hospital Service AMR', id: 'hospital-amr' },
      { name: 'Autonomous aBAJA Vehicle', id: 'abaja' }
    ]
  },
  {
    id: 'embedded-systems',
    title: 'Embedded Systems & Microcontrollers',
    category: 'Bare-Metal Firmware & Real-Time Control',
    shortDesc: 'Dual-core FreeRTOS firmware, bare-metal hardware timers, PWM motor drives, and sensor bus communication (UART/SPI/I2C).',
    evidenceItems: [
      {
        title: 'ESP32 Dual-Core Motor & Mesh Controller',
        description: 'Firmware managing closed-loop PID wheel velocity on Core 0 while processing peer-to-peer Wi-Fi mesh consensus packets on Core 1.',
        specs: ['Dual-Core Tensilica Xtensa @ 240 MHz', 'FreeRTOS Multi-Tasking', 'Hardware PWM Generators', 'Quadrature Encoder ISRs'],
        problemSolved: 'Zero latency jitter between motor PID feedback loops and asynchronous network telemetry broadcasts.',
        designDecisions: 'Dedicated Core 0 exclusively to hard real-time interrupt service routines and Core 1 to network protocol communications.',
        tools: ['ESP-IDF', 'Embedded C/C++', 'FreeRTOS', 'Logic Analyzer']
      }
    ],
    relatedProjects: [
      { name: 'Hospital Service AMR', id: 'hospital-amr' },
      { name: 'Swarm Robotics Platform', id: 'swarm-robotics' }
    ]
  },
  {
    id: 'can-bus',
    title: 'Vehicle Bus Networks (CAN 2.0B)',
    category: 'Automotive Communication & Industrial Control',
    shortDesc: 'Deterministic 500 kbps differential CAN communication, frame ID prioritization, DBC parsing, and automotive Deutsch harnessing.',
    evidenceItems: [
      {
        title: 'Deterministic Vehicle CAN Architecture',
        description: 'Designed the complete vehicle communications bus interconnecting steering actuators, brake solenoids, and autonomous trajectory nodes.',
        specs: ['500 kbps Baud Rate', '11-bit Standard & 29-bit Extended Identifiers', 'Hardware Acceptance Filters', 'Shielded Twisted-Pair Harnessing'],
        problemSolved: 'Ensured high-priority steering and emergency brake frames (0x100, 0x120) are never delayed by low-priority telemetry frames (0x400).',
        designDecisions: 'Strict ID bit-mask allocation granting emergency commands highest arbitration priority on the differential bus wire.',
        tools: ['CAN Transceivers', 'USB-to-CAN Analyzers', 'Oscilloscope', 'Deutsch Connectors']
      }
    ],
    relatedProjects: [
      { name: 'Autonomous aBAJA Vehicle (AIR 7 & AIR 11)', id: 'abaja' }
    ]
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision & Edge AI',
    category: 'Real-Time Perception & Edge Neural Inference',
    shortDesc: 'Hardware-accelerated OpenCV frame decoders, multi-threaded RTSP ingestion, quantized YOLO neural networks, and spatial anomaly tracking.',
    evidenceItems: [
      {
        title: 'High-Throughput Multi-Stream Vision Pipeline',
        description: 'Engineered multi-camera edge vision engine executing real-time object detection and perimeter tracking without cloud roundtrips.',
        specs: ['Sustained 30 FPS Throughput', 'Quantized YOLO Inference', 'OpenCV Hardware Decoders', 'Multi-Threaded Queue Engine'],
        problemSolved: 'Eliminated frame drop and thermal throttling on compute-constrained edge accelerators under concurrent camera streams.',
        designDecisions: 'Decoupled frame capture from neural inference using circular ring buffers across asynchronous worker threads.',
        tools: ['OpenCV', 'Python', 'YOLO / PyTorch', 'NumPy']
      }
    ],
    relatedProjects: [
      { name: 'Smart CCTV Edge Vision', id: 'smart-cctv' }
    ]
  }
];
