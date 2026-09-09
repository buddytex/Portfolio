# Robotics Visual Language Skill

## Purpose

Use robotics concepts intelligently as visual language. Communicate
precision, engineering, perception, systems thinking — without turning
the website into a fake dashboard, military UI, cyberpunk template, or
gaming HUD.

---

## Valid Concepts & Visual Expressions

### Spatial Fields / Point Clouds
- **Concept**: Robot perceives world as 3D point cloud
- **Expression**: SpatialField — ambient, responsive, continuous
- **Not**: Rotating LiDAR scan, fake sensor readouts

### Trajectories / Paths
- **Concept**: Planned vs. actual motion
- **Expression**: SVG path with planned (dashed) vs. actual (solid)
- **Not**: Animating vehicle icon along path

### Perception / Detection
- **Concept**: Bounding boxes, segmentation, classification
- **Expression**: Clean SVG rectangles with labels
- **Not**: Pulsing "SCANNING" text, fake confidence bars

### Coordinate Frames
- **Concept**: Transforms between sensor/robot/world frames
- **Expression**: Subtle grid with origin, axis labels
- **Not**: 3D gizmo widgets

### State Machines
- **Concept**: Discrete states with transitions
- **Expression**: Diagram with states, edges, conditions
- **Not**: Blinking status lights

### Sensor Fusion
- **Concept**: Multiple sensors → unified representation
- **Expression**: Layered visual elements merging
- **Not**: "FUSION" label with arrows

### SLAM / Mapping
- **Concept**: Simultaneous localization and mapping
- **Expression**: Growing map structure, loop closure
- **Not**: Fake occupancy grid updating

### Control Systems
- **Concept**: Feedback loops, PID, MPC
- **Expression**: Block diagrams, response curves
- **Not**: Fake oscilloscope

### Computational Graphs
- **Concept**: Data flow through perception/planning/control
- **Expression**: Node-edge diagrams
- **Not**: Fake neural network visualization

---

## Design Principles

### Accuracy Over Aesthetics
- If showing a trajectory, it should be a real trajectory
- If showing a point cloud, it should behave like one
- No fake data, no fabricated metrics

### Conceptual Integrity
- Visual element maps to real engineering concept
- Viewer learns something about the work
- Not decoration disguised as technical

### Restraint
- One robotics concept per section max
- SpatialField is the continuous thread
- Project cards: one diagram type each

### Professional Tone
- Precision, not playfulness
- Engineering publication aesthetic
- Research lab documentation style

---

## What NOT to Build

| Anti-Pattern | Why |
|--------------|-----|
| Military HUD | Not a weapon system |
| Cyberpunk UI | Not a game |
| Gaming dashboard | Not a game |
| Autonomous vehicle dashboard | Not a vehicle UI |
| Fake telemetry panels | Misrepresents work |
| Scanning animations | No purpose |
| Glowing "AI" effects | Meaningless |
| Neural network animations | Unless actual ML work |
| 3D robot models rotating | Unless showing CAD |

---

## Project Card Visual Signatures (Current)

| Signature | Concept | Implementation |
|-----------|---------|----------------|
| `trajectory` | Path planning | Planned vs actual path, waypoints |
| `lidar` | Perception | Range rings, beam, obstacles |
| `vision` | Computer vision | Camera frame, detections |
| `swarm` | Multi-agent | Mesh topology, communication |

Each is a clean SVG — no animation unless hover.

---

## SpatialField as Visual Identity

The SpatialField IS the robotics visual language:
- Continuous across entire site
- Responds to cursor as physical obstacle
- Morphs per section (spatial continuity)
- Grid = coordinate system
- Particles = perception field
- No fake data — it's a real particle system

---

## Future Extensions (When Evidence Exists)

When real project evidence exists, consider:

- Actual LiDAR point cloud (WebGL, downsampled)
- Real trajectory playback (from logs)
- Actual perception output (bounding boxes from model)
- Real SLAM map (occupancy grid)
- Control loop response (from hardware)
- Hardware schematics (SVG from CAD)

**Rule**: Only with real evidence. Never fabricated.

---

## Color Coding (If Used)

| Meaning | Color |
|---------|-------|
| Planned/Reference | Muted/Dashed |
| Actual/Measured | Primary/Cyan |
| Obstacle/Warning | Amber/Red |
| Safe/Free | Green |
| Uncertainty | Opacity/Blur |

Used sparingly, semantically, accessibly.