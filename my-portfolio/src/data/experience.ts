// Professional & Internship Experience Data Model
// Verified from primary sources (CV_1.pdf & institutional records)

export interface ExperienceItem {
  id: string;
  title: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'internship' | 'professional' | 'research';
  summary: string;
  systemsExposed: string[];
  observedActivities: string[];
  appliedLearnings: string[];
  imagePath: string;
  secondaryImage?: string;
  videoPath?: string;
  badge: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: 'surgical-robotics',
    title: 'Clinical Surgical Robotics Internship',
    role: 'Versius Surgical Robot Intern',
    organization: 'Muthoot Hospitals, Kozhencherry',
    location: 'Kozhencherry, Kerala, India',
    period: 'Jun – Jul 2025',
    type: 'internship',
    summary: 'Clinical immersion and technical observation internship focused on the CMR Versius Surgical Robotic System during live operating theatre procedures, equipment safety interlocks, and sterile peri-operative coordination.',
    systemsExposed: [
      'CMR Versius Modular Bedside Robotic Arms',
      'Open Ergonomic 3D HD Surgeon Teleoperation Console',
      'Multi-axis high-dexterity surgical endo-instruments',
      'Optical data communication bus and console-to-arm interfaces',
      'Real-time kinematic joint resolvers and torque safety interlocks',
    ],
    observedActivities: [
      'Observed live robot-assisted surgical workflows and surgeon hand-controller teleoperation from the master console.',
      'Studied pre-operative device initialization, multi-point calibration routines, and electronic system health checks.',
      'Documented sterile drape barrier protocols, port placement geometry, and bedside robotic arm docking sequences.',
      'Examined fail-safe emergency stop protocols and redundant safety supervision architectures required for human-in-the-loop medical robotics.',
    ],
    appliedLearnings: [
      'Applied clinical safety interlock principles and fail-safe hardware states directly to the emergency E-Stop circuits of Team Equinox competition vehicles.',
      'Adapted medical-grade sensor cleanliness and physical enclosure isolation concepts into the design of the Hospital Service AMR (B.Tech College Main Project).',
      'Developed a deep appreciation for latency-critical human-machine interfaces (HMI) in teleoperated and autonomous robotic systems.',
    ],
    imagePath: '/media/internships/surgical-robotics/robot-hardware/WhatsApp Image 2026-09-14 at 01.05.35.jpeg',
    secondaryImage: '/media/internships/surgical-robotics/hospital-experience/WhatsApp Image 2026-09-14 at 01.05.36(1).jpeg',
    videoPath: '/media/internships/surgical-robotics/robot-hardware/WhatsApp Video 2026-09-14 at 01.05.33.mp4',
    badge: 'CLINICAL ROBOTICS INTERNSHIP',
  },
];
