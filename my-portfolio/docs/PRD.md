# Product Requirements Document — Robotics Portfolio v2

## 1. Product Overview

**Product:** Personal Robotics Engineering Portfolio  
**Owner:** Naveen Shaji George  
**Repository:** `buddytex/Portfolio`  
**Current branch:** `redesign/v2`  
**Technology:** Astro + TypeScript + modern CSS/JS  
**Primary goal:** Build a highly polished, technically credible portfolio that presents Naveen as a **robotics engineer/research-oriented developer**, not a generic web developer.

The portfolio should communicate:

> **I build intelligent robotic systems that perceive, reason, and act in the real world.**

The website must combine strong visual design, purposeful animation, technical storytelling, and excellent performance.

---

# 2. Primary Objectives

### O1 — Establish a strong robotics identity

The website should immediately communicate:

* Robotics
* Autonomous systems
* ROS 2
* Computer vision
* LiDAR
* AI/ML
* Embedded systems
* Robot perception
* Navigation
* Simulation
* Research-oriented engineering

Industrial automation should **not** be the dominant identity.

### O2 — Showcase projects as engineering systems

Projects should not appear as simple cards containing:

> Project name + description + GitHub button.

Instead, each important project should communicate:

**Problem → Architecture → Technologies → Implementation → Result → Demonstration**

### O3 — Create a memorable visual experience

The site should have:

* sophisticated motion
* scroll-driven storytelling
* micro-interactions
* responsive animations
* interactive technical diagrams
* smooth transitions
* robotics-inspired visual language

Animations must support the content rather than become visual noise.

### O4 — Make the portfolio useful for international robotics opportunities

The website should be appropriate for applications to:

* Robotics R&D
* Autonomous systems
* Robot software
* Perception
* Computer vision
* ROS 2 development
* Embedded robotics
* Robotics research
* AI/robotics engineering

Particular target regions include:

* Germany
* Japan
* South Korea
* China
* other international robotics markets

---

# 3. Target Audience

## Primary

### Robotics hiring managers

They should understand within approximately 10 seconds:

* who Naveen is
* what he builds
* what technical areas he works in
* where they can see evidence of his work

### Robotics engineers

They should be able to inspect projects and understand the actual engineering involved.

### Researchers

They should see evidence of:

* experimentation
* perception
* algorithms
* robotics research concepts
* system architecture
* technical problem solving

## Secondary

* recruiters
* engineering leads
* startup founders
* university/research groups
* potential collaborators

---

# 4. Core User Journey

The intended journey is:

```text
LAND
 ↓
Understand who Naveen is
 ↓
See robotics-focused visual system
 ↓
Explore featured projects
 ↓
Understand technical depth
 ↓
Inspect robotics demonstrations
 ↓
Learn about skills/research interests
 ↓
Review experience/about
 ↓
Contact / GitHub / LinkedIn / Resume
```

The user should never have to hunt for the important information.

---

# 5. Homepage Requirements

## 5.1 Hero

The hero is the most important section.

It should communicate:

**Naveen Shaji George**

with a strong robotics-focused positioning statement.

Example direction:

> Robotics Engineer building intelligent autonomous systems.

Supporting text should mention areas such as:

> ROS 2 · Autonomous Systems · Computer Vision · LiDAR · Embedded Robotics · AI

### Hero visual

Create an original robotics-inspired visual system rather than a generic stock image.

Possible concept:

```text
                 ROBOT
                   │
        ┌──────────┴──────────┐
        │                     │
     PERCEPTION            CONTROL
        │                     │
      LiDAR                 ROS 2
      Camera               Planning
        │                     │
        └──────────┬──────────┘
                   │
                 ACTION
```

This can be represented visually using animated nodes, paths, sensor sweeps, particles, or SVG.

### Hero animation

On page load:

1. background system initializes
2. subtle grid/environment appears
3. sensor visualization activates
4. robotics network establishes
5. name/title appears
6. supporting content fades/slides into position

Animation should remain performant.

---

# 6. Navigation

Navigation should be minimal.

Suggested:

```text
NAVEEN
Work
About
Research
Contact
```

Include a persistent CTA such as:

> View Projects

or

> Let's Build

Navigation requirements:

* sticky/floating
* responsive
* mobile friendly
* animated active state
* smooth scrolling
* keyboard accessible

---

# 7. Featured Projects

This is the core of the portfolio.

Each featured project should have a large visual presentation.

## Project card structure

```text
PROJECT
────────────────────────────

Project Name

Short technical description

[visual/demo]

SYSTEM
LiDAR → perception → planning → control

TECHNOLOGIES
ROS 2
Python
C++
OpenCV
LiDAR
ESP32

RESULT
What was achieved?

[GitHub] [Demo] [Details]
```

### Project categories

Projects should emphasize:

* autonomous robots
* LiDAR
* computer vision
* ROS 2
* navigation
* anomaly detection
* embedded systems
* simulation
* AI/ML

Avoid presenting unrelated small projects as equally important.

---

# 8. Project Animation System

Projects should respond to scrolling.

Possible behavior:

```text
PROJECT ENTERS VIEW
       ↓
System diagram initializes
       ↓
Sensor visualization activates
       ↓
Robot/path animation begins
       ↓
Technical information appears
       ↓
Project result becomes visible
```

Use:

* intersection observers
* CSS transitions
* SVG animation
* requestAnimationFrame only where necessary

Avoid excessive JavaScript animation loops.

---

# 9. LiDAR Interactive Visualization

Create a dedicated technical visualization.

Concept:

```text
             •
        •         •
     •       🤖      •
        •         •
             •
```

A robot is positioned in a simulated environment.

LiDAR rays periodically scan around the robot.

Detected obstacles generate points.

The visualization should demonstrate:

* sensor scanning
* obstacle detection
* robot position
* environment representation
* navigation/path

This should visually reinforce robotics expertise.

---

# 10. ROS 2 Section

Create a section explaining the user's ROS 2 experience.

Possible visualization:

```text
       SENSOR NODE
            │
            ▼
      /scan topic
            │
            ▼
     PERCEPTION NODE
            │
            ▼
    /cmd_vel / planner
            │
            ▼
      ROBOT CONTROL
```

Animate messages travelling between nodes.

The purpose is not to teach ROS 2.

The purpose is to demonstrate that the portfolio owner understands robotic software architecture.

---

# 11. Technical Architecture Visualization

Create an interactive architecture section.

Example:

```text
Sensors
 ├── LiDAR
 ├── Camera
 └── Encoders
       │
       ▼
Perception
       │
       ▼
Localization
       │
       ▼
Planning
       │
       ▼
Control
       │
       ▼
Robot
```

Hovering/clicking a component can reveal a concise explanation.

---

# 12. Research Section

Create a research-oriented section.

It should communicate interest in:

* robot perception
* autonomous navigation
* VLA / embodied AI
* computer vision
* sensor fusion
* robot learning
* intelligent robotic systems

Do not claim research achievements that cannot be demonstrated.

The section should distinguish between:

**Current work**

and

**Research interests**

and

**Future exploration**

---

# 13. Skills

Skills should be grouped by engineering function rather than presented as a giant logo wall.

### Robotics

* ROS 2
* Robot Operating System
* Navigation
* SLAM
* LiDAR
* Sensor integration

### AI / Perception

* Computer Vision
* OpenCV
* Machine Learning
* Object Detection
* Anomaly Detection

### Software

* Python
* C++
* TypeScript
* Linux
* Git

### Embedded

* ESP32
* Microcontrollers
* Motor control
* Sensors
* Communication

### Simulation

* Gazebo
* RViz
* robotics simulation

Only include technologies that the portfolio owner can genuinely discuss.

---

# 14. About Section

Keep it concise.

It should answer:

* Who is Naveen?
* What does he build?
* What problems interest him?
* What direction is he pursuing?

Avoid a generic biography.

Use engineering evidence rather than adjectives.

Bad:

> Passionate and hardworking robotics enthusiast.

Better:

> I build robotic systems combining perception, embedded hardware and autonomous software, with a particular interest in ROS 2 and intelligent navigation.

---

# 15. Contact Section

Contact should feel like the final step of the robotics narrative.

Possible concept:

```text
READY TO BUILD SOMETHING?

[Email]
[LinkedIn]
[GitHub]
[Resume]
```

Optional animated robotics visualization can transition from the system diagram into the contact section.

---

# 16. Visual Design Direction

## Overall aesthetic

Target:

**Technical + futuristic + restrained + premium**

Not:

* gaming UI
* excessive neon
* generic AI website
* template portfolio
* cyberpunk cliché

### Visual language

Use:

* dark interface
* strong typography
* controlled contrast
* technical grids
* thin lines
* subtle gradients
* restrained glow
* precise spacing
* schematic-style graphics

---

# 17. Animation Requirements

Animation should have three levels.

## Level 1 — Micro-interactions

Examples:

* button hover
* navigation transitions
* card hover
* icon movement
* cursor interactions

## Level 2 — Section transitions

Examples:

* project reveal
* typography entrance
* diagram activation
* progressive disclosure

## Level 3 — Hero/technical storytelling

Examples:

* LiDAR scan
* robot movement
* data flow
* ROS node communication
* system initialization

### Critical rule

**Do not animate everything.**

Animation should communicate:

> something is happening

rather than:

> look, an animation exists.

---

# 18. Performance Requirements

The portfolio must remain fast despite animations.

Requirements:

* avoid unnecessary frameworks
* prefer Astro components
* use CSS where possible
* lazy-load heavy assets
* optimize images
* avoid unnecessary WebGL
* avoid giant animation libraries unless justified
* respect `prefers-reduced-motion`
* minimize JavaScript hydration
* avoid continuous CPU-heavy animations

Target:

```text
Fast initial load
Smooth scrolling
60 FPS where practical
Minimal JS
Responsive on laptops and mobile
```

---

# 19. Responsive Design

The website must support:

### Desktop

1920px
1440px
1366px
1280px

### Laptop

1024px

### Mobile

768px
480px
375px

Technical diagrams must degrade gracefully.

For mobile:

* simplify complex diagrams
* reduce particle counts
* reduce animation intensity
* stack project information
* maintain readable typography

---

# 20. Accessibility

Implement:

* semantic HTML
* keyboard navigation
* visible focus states
* accessible buttons
* sufficient contrast
* alt text
* reduced-motion support
* meaningful heading hierarchy

Animations must never prevent navigation or reading.

---

# 21. SEO

Implement:

* meaningful `<title>`
* meta description
* Open Graph metadata
* canonical URL when deployment URL is known
* semantic headings
* descriptive project content
* favicon
* robots.txt
* sitemap where appropriate

---

# 22. Technology Constraints

Use the existing Astro architecture.

Preferred:

```text
Astro
TypeScript
CSS
SVG
Vanilla JavaScript where necessary
```

Do not introduce React/Three.js/GSAP/etc. simply because they are popular.

Only introduce a dependency when there is a clear technical reason.

---

# 23. Repository Structure

Target structure:

```text
src/
├── components/
│   ├── Navigation.astro
│   ├── Hero.astro
│   ├── ProjectCard.astro
│   ├── ProjectShowcase.astro
│   ├── RoboticsVision.astro
│   ├── LidarVisualization.astro
│   ├── ROSArchitecture.astro
│   ├── Skills.astro
│   ├── Research.astro
│   ├── About.astro
│   └── Contact.astro
│
├── layouts/
│   └── Layout.astro
│
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── projects.astro
│   ├── research.astro
│   └── contact.astro
│
├── styles/
│   ├── global.css
│   ├── animations.css
│   └── components.css
│
└── assets/
    ├── projects/
    ├── robotics/
    └── icons/
```

The architecture can be changed if the implementation provides a better solution.

---

# 24. Existing Agent Skills

The repository already contains:

```text
.agents/skills/web-design/SKILL.md
.agents/skills/animation/SKILL.md
.agents/plans/portfolio-audit.md
```

These should be treated as design references.

Do not blindly follow them if they conflict with:

* actual repository structure
* technical correctness
* performance
* accessibility
* maintainability

---

# 25. Development Workflow

Before modifying the project:

1. inspect repository
2. inspect existing pages/components
3. inspect `portfolio-audit.md`
4. inspect web-design skill
5. inspect animation skill
6. identify what already exists
7. create implementation plan
8. implement incrementally

Never overwrite working functionality unnecessarily.

---

# 26. Git Strategy

Current branch:

```text
redesign/v2
```

Never modify `main` directly.

Use meaningful commits:

```text
feat: redesign portfolio hero
feat: add project showcase
feat: add lidar visualization
feat: add ros architecture visualization
feat: implement responsive navigation
perf: optimize portfolio animations
fix: improve mobile layout
```

Before every commit:

```bash
git status
npm run build
```

Do not commit broken builds.

---

# 27. Deployment

Deployment should ultimately support GitHub Pages.

Required documentation:

```text
docs/
├── DEVELOPMENT.md
└── DEPLOYMENT.md
```

Deployment documentation must contain:

* local development
* production build
* GitHub Pages setup
* repository settings
* deployment workflow
* troubleshooting
* rollback procedure

Do not assume Astro outputs `out/` without verifying the actual Astro configuration/version.

---

# 28. Quality Gates

Before considering the portfolio complete:

### Functional

* [ ] navigation works
* [ ] all links work
* [ ] projects render
* [ ] contact links work
* [ ] responsive layouts work
* [ ] production build succeeds

### Visual

* [ ] strong hero
* [ ] consistent typography
* [ ] coherent visual system
* [ ] animations feel intentional
* [ ] project visuals are compelling
* [ ] no default Astro branding remains

### Technical

* [ ] no unnecessary dependencies
* [ ] no console errors
* [ ] no broken assets
* [ ] no excessive hydration
* [ ] reduced-motion support
* [ ] accessible interactions

### Professional

* [ ] projects contain real technical information
* [ ] claims are accurate
* [ ] GitHub links work
* [ ] resume link works
* [ ] contact information works
* [ ] portfolio communicates robotics expertise immediately

---

# 29. Agent Operating Instructions

The AI coding agent should behave as an autonomous senior frontend engineer + robotics portfolio designer.

It should:

1. Inspect before modifying.
2. Preserve working code.
3. Make changes incrementally.
4. Run validation after significant changes.
5. Fix errors rather than stopping at the first failure.
6. Use existing skills and project documentation.
7. Prefer simple, performant implementations.
8. Avoid unnecessary dependencies.
9. Test desktop and mobile behavior.
10. Continue from the last successful state after interruptions.

If the development server stops:

```text
detect → diagnose → restart → continue
```

If an AI backend temporarily fails:

```text
wait → retry → continue
```

Do not treat a temporary backend/server failure as completion.

If a permission is available through the agent environment, use it.

If a permission requires explicit user authorization, request only that authorization and continue with everything else possible.

---

# 30. Definition of Done

The project is complete when the repository contains a **production-quality robotics portfolio**, not merely a redesigned Astro template.

A visitor should be able to answer these questions within the first minute:

> Who is Naveen?  
> What does he build?  
> What robotics technologies does he use?  
> What actual systems has he built?  
> How technically capable is he?  
> Where can I see his work?  
> How can I contact him?  

The final experience should feel like the portfolio of a **serious robotics engineer/research-oriented developer**, rather than a generic developer portfolio with robotics terminology added to it.

---

## Immediate Implementation Priority

Do **not** attempt to build every section simultaneously.

Implement in this order:

```text
1. Global design system
        ↓
2. Navigation
        ↓
3. Hero
        ↓
4. Featured projects
        ↓
5. Project animations
        ↓
6. LiDAR visualization
        ↓
7. ROS 2 architecture
        ↓
8. Skills / research
        ↓
9. About
        ↓
10. Contact
        ↓
11. Mobile optimization
        ↓
12. Performance optimization
        ↓
13. SEO/accessibility
        ↓
14. Production build
        ↓
15. GitHub Pages deployment
```

**The first milestone is not deployment. The first milestone is a convincing homepage that immediately looks and feels like a robotics engineer's portfolio.**
