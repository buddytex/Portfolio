# Evidence-Driven Design Skill

## Purpose

Skills, capabilities, and achievements must be represented through
evidence — not text labels. Every claim should be verifiable.

---

## Core Principle

> If evidence can be shown, never represent as merely a text label.

---

## Evidence Hierarchy

| Level | Example | Strength |
|-------|---------|----------|
| 1. Artifact | PCB photo, schematic, CAD | Strongest |
| 2. Demonstration | Video of robot operating | Strong |
| 3. Data | Logs, metrics, benchmarks | Strong |
| 4. Documentation | Design doc, report, thesis | Medium |
| 5. Code | Repository link (if public) | Medium |
| 6. Diagram | Architecture, block diagram | Medium |
| 7. Testimonial | Supervisor/client quote | Weak |
| 8. Text claim | "Experienced in ROS 2" | Weakest |

**Target**: Every skill at Level 1-3.

---

## Current Skills Structure (Reference)

### Skills Data (`src/data/skills.ts`)
```typescript
{
  id: 'lidar-perception',
  title: '3D LiDAR Perception',
  category: 'Perception',
  shortDesc: '...',
  evidenceItems: [{
    title: 'Velodyne VLP-16 Integration',
    description: '...',
    specs: ['640k points/sec', '100m range', '±3cm accuracy'],
    problemSolved: '...',
    designDecisions: '...',
    tools: ['ROS 2', 'PCL', 'C++', 'Python'],
  }],
  relatedProjects: [...]
}
```

### Evidence Inspector (`SkillsEvidence.astro`)
- Left: Skill selector (tabs)
- Right: Evidence panel (sticky)
- Artifact card: specs, problem, decisions, tools
- Related projects links
- Deep link to full skill page

---

## Evidence Standards by Domain

### PCB DESIGN
- Board photos (top/bottom)
- Schematic PDF
- CAD renders (3D)
- Layer stackup
- BOM with rationale
- Manufacturing files (Gerber)
- Test results (signal integrity, thermal)

### EMBEDDED SYSTEMS
- Hardware photos
- Block diagram
- Firmware architecture
- RTOS/bare-metal choice justification
- Peripheral integration (CAN, SPI, I2C, UART)
- Boot time, memory usage, latency
- Power profiling

### ROS 2
- Package structure
- Node graph (rqt_graph)
- Launch files
- Parameter configs
- QoS policies chosen
- Real-time executor config
- Integration test results

### COMPUTER VISION
- Model architecture
- Training data / augmentation
- Inference latency (on target hardware)
- Accuracy metrics (mAP, IoU, etc.)
- Failure case analysis
- ONNX/TensorRT optimization

### LIDAR PERCEPTION
- Sensor specs
- Preprocessing pipeline
- Detection/clustering algorithm
- Range/accuracy validation
- Compute budget
- Environmental robustness

### AUTONOMOUS NAVIGATION
- Planner algorithm (A*, RRT*, MPC, etc.)
- Local planner / controller
- Costmap configuration
- Recovery behaviors
- Simulation vs real-world gap
- Metrics (path length, time, clearance)

### CAN BUS
- Network topology
- Bit rate, arbitration
- Frame IDs, signals
- DBC file
- Error handling
- Latency measurements

### SWARM ROBOTICS
- Communication protocol
- Mesh topology
- Consensus algorithm
- Scalability tests
- Failure recovery
- Bandwidth usage

---

## Implementation Checklist

For each skill evidence item:

- [ ] Primary artifact exists (photo, schematic, video, data)
- [ ] Specs are specific and measurable
- [ ] Problem solved is clearly stated
- [ ] Design decisions explain WHY
- [ ] Tools are specific versions where relevant
- [ ] Related projects link correctly
- [ ] Deep link page exists with full evidence

---

## Anti-Patterns

- Skill tags without evidence pages
- "Proficient in X" without artifact
- Evidence pages with only text
- Diagrams without real data
- Metrics without methodology
- Photos without context
- Code links to empty/private repos
- Generic stock images
- Placeholder evidence