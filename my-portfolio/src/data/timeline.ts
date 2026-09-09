export interface TimelineMilestone {
  year: string;
  period: string;
  role: string;
  organization: string;
  achievement?: string;
  whatIBuilt: string;
  engineeringSignificance: string;
  technologies: string[];
}

export const engineeringTimeline: TimelineMilestone[] = [
  {
    year: '2026',
    period: '2025 – 2026',
    role: 'Electrical & Electronics Head · Systems Integration',
    organization: 'Team Equinox · BAJA SAE India National Campaign',
    achievement: 'AIR 7 (2025) · AIR 11 (2026)',
    whatIBuilt: 'Custom multi-layer ECUs with differential CAN 2.0B transceivers, steer-by-wire electro-mechanical actuation, fail-safe hardware E-Stop latching circuits, and dual-rail HV/LV isolated harnesses for an autonomous all-terrain competition vehicle.',
    engineeringSignificance: 'Eliminated inductive brownout resets during high-current steering actuation through optocoupled galvanic isolation and matched 120Ω differential impedance termination, achieving 100% electrical reliability under violent off-road competition endurance conditions.',
    technologies: ['CAN 2.0B', 'Custom Multi-Layer ECUs', 'Drive-by-Wire Actuation', 'Galvanic Isolation', 'ROS 2 Humble', 'Hardware E-Stop'],
  },
  {
    year: '2025',
    period: '2024 – 2025',
    role: 'Autonomy & Embedded Systems Developer',
    organization: 'Hospital Service Autonomous Mobile Robot (AMR)',
    achievement: 'Closed-Loop Healthcare Testbed',
    whatIBuilt: 'Sub-centimeter planar LiDAR SLAM with SLAM Toolbox, dynamic layered costmaps with custom asymmetric inflation gradients in Nav2, and ESP32 closed-loop PID differential drive motor control.',
    engineeringSignificance: 'Solved narrow hospital doorway oscillations and odometric drift in feature-sparse corridors by fusing planar laser scan matching with wheel encoders via an Extended Kalman Filter (EKF), delivering zero-collision pedestrian navigation.',
    technologies: ['ROS 2 Humble', 'Nav2 Stack', 'SLAM Toolbox', 'Extended Kalman Filter', '360° Planar LiDAR', 'ESP32 PID'],
  },
  {
    year: '2024',
    period: '2023 – 2024',
    role: 'Computer Vision & Edge AI Engineer',
    organization: 'Smart CCTV & Perimeter Surveillance Pipeline',
    achievement: 'Real-Time Edge Runtime (30 FPS)',
    whatIBuilt: 'Multi-threaded RTSP video streaming engine with OpenCV hardware decoders, quantized YOLO neural network inference, and spatial Kalman-filter multi-object tracking.',
    engineeringSignificance: 'Achieved sustained 30 FPS inference throughput across simultaneous camera streams on compute-constrained edge accelerators without frame drops or thermal throttling using lock-free ring-buffer asynchronous worker threads.',
    technologies: ['OpenCV', 'Python', 'YOLO Inference', 'Kalman Filter', 'Multi-Threading', 'RTSP Stream Decoding'],
  },
  {
    year: '2023',
    period: '2023',
    role: 'Distributed Systems & Robotics Researcher',
    organization: 'Swarm Robotics & Academic Research Foundation',
    achievement: 'Decentralized Multi-Agent Mesh',
    whatIBuilt: 'Ad-hoc peer-to-peer TCP/IP broadcast mesh protocol on dual-core ESP32 microcontrollers, decentralized potential-field consensus algorithms, and live Python telemetry visualizer.',
    engineeringSignificance: 'Overcame packet loss and dynamic topology disruptions in ad-hoc robotics mesh networks; incorporated rotational vortex vector fields around concave obstacles to prevent agents locking into local zero-gradient potential minima.',
    technologies: ['Embedded C/C++', 'FreeRTOS', 'ESP32 Dual-Core', 'Potential-Field Consensus', 'TCP/IP Sockets', 'Python Visualizer'],
  },
];
