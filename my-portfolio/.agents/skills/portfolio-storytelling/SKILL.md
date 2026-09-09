# Portfolio Storytelling Skill

## Purpose

Communicate engineering work through evidence-based storytelling.
Homepage creates curiosity. Project pages provide evidence.

---

## Homepage Narrative Arc

1. **Hook** (Hero): Name + "I build intelligent robotic systems that perceive, reason, and act"
2. **Credibility** (Hero): AIR 7 & 11, BAJA SAE lead
3. **Evidence** (Projects): 4 project cards with architectural diagrams
4. **Depth** (Skills): Interactive evidence inspector
5. **Context** (About): Philosophy + timeline + education
6. **Action** (Contact): Direct email + verified channels

---

## Project Page Structure (When Implemented)

Each project should eventually explain:

### 1. Problem
What specific challenge? Why hard? Why interesting?

### 2. Motivation
Why this problem? What gap? What impact?

### 3. Constraints
- Hardware (compute, sensors, power, weight)
- Software (real-time, OS, middleware)
- Environmental (outdoor, indoor, lighting, weather)
- Team (solo, small, interdisciplinary)
- Time (competition deadline, research cycle)

### 4. Architecture
- System diagram (hardware + software)
- Data flow
- Compute allocation
- Communication interfaces

### 5. Design Decisions
- Key trade-offs
- Alternatives considered
- Why this approach
- What was rejected

### 6. Implementation
- Algorithms (with references)
- Code structure
- Integration challenges
- Testing strategy

### 7. Failures
- What didn't work
- Why
- What changed

### 8. Iterations
- Version progression
- Lessons each cycle
- Metrics improvement

### 9. Results
- Quantitative (speed, accuracy, range, uptime)
- Qualitative (robustness, usability)
- Competition placement
- Deployment status

### 10. Lessons
- Technical
- Process
- Team
- Would do differently

### 11. Evidence
- Photos (hardware)
- Videos (demos)
- Schematics
- Code links
- Data logs
- Reports

---

## Evidence Standards

| Claim | Required Evidence |
|-------|-------------------|
| "Autonomous navigation" | Trajectory logs, video, map |
| "Custom PCB" | Schematic, board photo, BOM |
| "ROS 2 integration" | Package structure, launch files |
| "Real-time performance" | Latency measurements |
| "LiDAR perception" | Point cloud, detection output |
| "Control system" | Bode plots, step response |

**Never**: Fabricate achievements, exaggerate capability, create fake statistics.

---

## Skills Section Philosophy

Skills are not tags. They are evidence collections.

### Current Structure
- 7 skill categories
- Each: primary artifact + specs + problem/decision + tools + related projects
- Deep link to full evidence page

### When Expanding
```
SKILL CATEGORY
  ├── Artifact 1 (with full evidence)
  ├── Artifact 2
  └── Artifact 3
```

Example: PCB DESIGN → PCB 01, PCB 02, PCB 03 each with:
- Board image
- Schematic
- CAD rendering
- Purpose
- Design decisions
- Manufacturing
- Testing
- Lessons

---

## Tone Guidelines

- **Precise**: "Differential-drive mobile robot using ROS 2 Humble, LiDAR-based SLAM, and Nav2" not "Advanced autonomous robot"
- **Honest**: "Failed to achieve 10Hz loop rate on Raspberry Pi 4; migrated to Jetson Orin"
- **Specific**: "Custom 4-layer PCB, STM32H7, CAN-FD, 12V/5V/3.3V rails" not "Custom electronics"
- **Humble**: "Learned that..." not "Mastered..."
- **Technical**: Use correct terminology

---

## Anti-Patterns

- Generic project cards with only title/tech stack
- "I built X using Y" without problem context
- Skills as keyword clouds
- Metrics without methodology
- Videos without context
- Code snippets without architecture
- "Led team of N" without technical contribution
- Buzzwords without substance