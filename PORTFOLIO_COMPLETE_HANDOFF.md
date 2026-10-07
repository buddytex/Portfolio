# Portfolio Complete Handoff

## 1. Executive Summary

This document provides a comprehensive technical, architectural, visual, and content audit of the personal engineering portfolio for **Naveen Shaji George**, a Robotics & Automation Engineer specializing in autonomous vehicles, 3D LiDAR perception, custom vehicle ECUs, isolated CAN bus networks, and ROS 2 software integration. He served as the **Electrical and Electronics Head** of *Team Equinox* in national BAJA SAEINDIA competitions (achieving All India Rank 7 in 2025 with Car A12, and All India Rank 11 in 2026 with Car A18).

The website is an editorial-grade, performance-conscious engineering portfolio built on **Astro 7.2**, styled with structured **Vanilla CSS** design tokens, and powered by **Anime.js 4.5.x** for scroll-driven animations, FLIP layout morphs, and micro-interactions. The site features two distinct WebGL/Three.js 3D systems:
1. **Hero 3D Mechanical Sculpture**: An aerospace-grade lathe collar and orbital assembly rendered via vanilla Three.js directly in `<canvas id="hero3dCanvas">` behind an authentic portrait cutout.
2. **Interactive 3D PCB Lab**: A manufacturing-accurate CAD and 3D board viewer rendered via **React Three Fiber (R3F)** and **Three.js** that loads preprocessed RS-274X Gerber fabrication data (copper traces, ENIG pads, plated through-holes, solder mask, and silkscreen) directly from the user's KiCad production archives.

The static build compiles **64 pages** (1 homepage, 11 project case studies/index, and 52 skill evidence pages) in ~4.35s with 0 TypeScript errors.

---

## 2. Technology Stack

| Layer | Technology | Version | Purpose & Implementation |
| :--- | :--- | :--- | :--- |
| **Core Framework** | Astro | `^7.2.0` | Static Site Generation (SSG) with Islands Architecture (`client:load` for R3F). |
| **Interactive Islands** | React / React DOM | `^18.3.1` | Used strictly for the complex 3D PCB Gerber viewer (`PCBShowcaseReact.tsx`, `GerberPCBViewer.tsx`). |
| **3D Graphics Engine** | Three.js | `^0.160.1` | WebGL rendering in both Vanilla JS (Hero) and declarative R3F (PCB). |
| **React 3D Bridge** | React Three Fiber (R3F) | `^8.18.0` | Declarative 3D scene management for the PCB showcase. |
| **3D Helpers** | `@react-three/drei` | `^9.122.0` | OrbitControls and PerspectiveCamera for interactive board inspection. |
| **Animation Engine** | Anime.js | `^4.5.0` | Single source of truth for motion (`animate`, `createTimeline`, `onScroll`, `createAnimatable`, `createLayout`, `stagger`, `splitText`). |
| **Smooth Scrolling** | Lenis | `^1.3.26` | Desktop-only inertia scrolling; automatically disabled on touch devices and under `prefers-reduced-motion`. |
| **Gerber Archive Parser**| `node-unrar-js` | `^2.0.2` | Build-time extraction and parsing of RAR/ZIP Gerber archives into optimized JSON (`scripts/preprocess-gerbers.mjs`). |
| **Type Checking** | TypeScript | `^6.0.3` | Strict static typing across all data layers, animations, and components. |
| **CSS Architecture** | Vanilla CSS | CSS3 Custom Properties | Design token system in `src/styles/global.css` (machined metal / graphite / champagne gold palette). No Tailwind. |
| **Icons & Blueprints** | Inline SVG | Scalable Vector Graphics | Circuit paths, technical crosshairs, schematics, and UI icons. |

---

## 3. Repository Structure

### Project Tree

```text
/home/buddy/Portfolio/
├── .git/                                   # Git version control metadata
├── .github/
│   └── workflows/
│       └── deploy.yml                      # GitHub Actions deployment workflow for GitHub Pages
├── circuit-hover-demo.html                 # Standalone experimental prototype
├── package.json                            # Workspace root package definition
└── my-portfolio/                           # Main Astro Application
    ├── astro.config.mjs                    # Astro configuration (React integration, Vite optimizer)
    ├── package.json                        # Dependencies, scripts (dev, build, preview)
    ├── tsconfig.json                       # TypeScript compiler options
    ├── verify_pcb_3d_real_top.png          # Visual verification artifact
    ├── test_three_snap.png                 # Visual verification artifact
    ├── scripts/
    │   ├── build.mjs                       # Production build orchestrator (Gerber preprocess -> astro build)
    │   └── preprocess-gerbers.mjs          # Build-time Gerber RS-274X + Excellon drill parser
    ├── public/
    │   ├── favicon.ico, favicon.svg        # Site favicons
    │   ├── CV_1.pdf                        # Primary downloadable CV (synced with media/MAIN_CV.pdf)
    │   ├── MAIN_CV.pdf                     # Direct mirror of media/MAIN_CV.pdf
    │   ├── Naveen_Shaji_George_CV.pdf      # Legacy CV copy mirror
    │   ├── media -> ../media               # Symlink exposing media library at /media/
    │   ├── images/                         # Static raster images (portrait, schematics)
    │   │   ├── naveen-portrait.png         # Transparent cutout portrait for Hero section
    │   │   ├── naveen-portrait.jpg         # Fallback rectangular portrait
    │   │   ├── abaja-sbw-architecture.png  # Steer-by-wire schematic diagram
    │   │   ├── abaja-lane-pipeline.png     # Computer vision lane detection diagram
    │   │   └── team-equinox-session.jpg    # Team technical debrief photo
    │   └── pcb-data/                       # Preprocessed JSON geometries generated at build time
    │       ├── back-box-2026.json          # Back-Box ECU 2026 (1.38 MB, 12 layers/drills)
    │       └── front-box-2026.json         # Front-Box ECU 2026 (1.50 MB, 12 layers/drills)
    ├── media/                              # 130 authentic engineering photos, videos, and archives
    │   ├── Gerbers/                        # Raw KiCad production archives (Back_Box_2026.zip, Front_Box_2026.rar)
    │   ├── achievements/certificates/      # Competition rank certificates, hackathon honors
    │   ├── activities/
    │   │   ├── anchoring/                  # Nakshatra 2024–2026 hosting photos
    │   │   └── campus-radio/               # Radio jockey studio console photos
    │   ├── hackathons/intel-ai/            # Intel AI hackathon hardware, team, and jury photos
    │   ├── internships/surgical-robotics/  # CMR Versius surgical robot hardware & hospital OT
    │   ├── projects/
    │   │   ├── baja/                       # Baja 2025 & 2026 vehicles, electrical rigs, testing videos
    │   │   ├── Hospital/                   # Hospital AMR chassis, LiDAR mounts, sensor layout
    │   │   ├── railguard-ai/               # Track inspection rover, hardware tests, mobile app
    │   │   └── swarm-robotics/             # HeRo swarm robot platform, Gazebo simulation
    │   └── Workshops/                      # Hands-on automotive & self-driving workshops
    └── src/
        ├── layouts/
        │   └── Layout.astro                # Master HTML layout, SEO tags, datum spine, global scripts
        ├── pages/
        │   ├── index.astro                 # Homepage orchestrator (Hero -> Roles -> Projects -> Skills -> PCB -> Contact)
        │   ├── projects/
        │   │   ├── index.astro             # Full engineering project archive
        │   │   └── [id].astro              # Dynamic project architectural case study route
        │   └── skills/
        │       └── [id].astro              # Dynamic skill validation evidence route
        ├── components/
        │   ├── Navigation.astro            # Sticky header with blur, dynamic condensation, mobile drawer
        │   ├── Hero.astro                  # Centerpiece: Typography + Three.js 3D mechanical scene + Portrait + HUD
        │   ├── CircuitBoard.astro          # Hero-only deterministic 2D canvas circuit with cached static layer
        │   ├── RolesTaken.astro            # Two-column layout: Bio/Academic foundation + Interactive roles accordion
        │   ├── ProjectIndex.astro          # Editorial projects grid with dual-card Baja showcase
        │   ├── SkillsEvidence.astro        # Interactive bubble map (52 skills across 11 disciplines)
        │   ├── PCBShowcase.astro           # Physical PCB Engineering Showcase wrapper & telemetry
        │   ├── Contact.astro               # Contact section with copy clipboard, mailto drafting, verified links
        │   ├── Footer.astro                # Minimalist editorial footer signature
        │   ├── ImageLightbox.astro         # Global uncropped image & video modal dialog
        │   ├── PerformanceDiagnosticHUD.astro # Dev-only performance overlay (?debug=performance)
        │   ├── EngineeringBackground.astro # (Legacy/Unused in index) Earlier biography component
        │   ├── EngineeringTimeline.astro   # (Legacy/Unused in index) Earlier timeline component
        │   ├── RobotPortalIntro.astro      # (Legacy/Unused in index) Cinematic portal loading intro
        │   └── react/
        │       ├── PCBShowcaseReact.tsx    # React island mounting the 3D PCB viewer & board switching
        │       ├── GerberPCBViewer.tsx     # Pure Gerber 3D viewer (FR4, copper, pads, silkscreen, drills)
        │       ├── HeroSculptureReact.tsx  # (Prototype) React Three Fiber prototype of the hero sculpture
        │       ├── SignalField.tsx         # (Prototype) Point cloud / signal field component
        │       └── RobotPortalIntro.tsx    # (Prototype) React version of the intro portal
        ├── data/
        │   ├── pcbArtifacts.ts             # 4 PCB artifact specifications (Back-Box, Front-Box, E-Stop, Swarm)
        │   ├── projects.ts                 # Complete data for all 10 projects, galleries, and decisions
        │   ├── roles.ts                    # 4 leadership & technical roles data and visual credentials
        │   ├── skills.ts                   # 11 categories, 52 competencies, evidence, tools, and connections
        │   └── timeline.ts                 # Chronological milestones data
        ├── animations/                     # Centralized Anime.js 4.5.x animation system
        │   ├── core.ts                     # Core Anime.js re-exports, resetElementStyles, MOTION_TOKENS
        │   ├── accessibility.ts            # Motion preference and device detection utilities
        │   ├── circuits.ts                 # Circuit canvas visibility lifecycle registration
        │   ├── contact.ts                  # Copy feedback micro-animation
        │   ├── cursor.ts                   # Precision desktop custom cursor and magnetic buttons
        │   ├── hero.ts                     # Hero entrance timeline, pointer parallax, scroll parallax, restoration
        │   ├── index.ts                    # Animation module barrel export
        │   ├── lenisScroll.ts              # Lenis smooth scroll lifecycle controller
        │   ├── pcb.ts                      # PCB showcase section reveal and settling
        │   ├── projects.ts                 # Staggered card entrance and hover elevation
        │   ├── roles.ts                    # Accordion expansion via Anime.js FLIP layout
        │   ├── scroll.ts                   # Universal scroll reveal, datum spine tracker, WAYPOINTS
        │   ├── skills.ts                   # Center-out bubble reveal and stagger
        │   └── text.ts                     # Accessible splitText typography reveal
        ├── lib/
        │   ├── gerber/
        │   │   └── gerberToGeometry.ts     # In-browser Three.js geometry generator from Gerber JSON
        │   ├── motion/index.ts             # Re-exports
        │   └── animations/                 # Legacy animation scripts (robotPortal, chronologyMotion)
        └── styles/
            └── global.css                  # Master CSS design system tokens, typography, radii, utilities
```

### Directory Responsibilities

- **`src/layouts/`**: Defines global document layout, HTML `<head>`, metadata, fonts, datum navigation spine, and lifecycle script triggers for client navigation (`astro:page-load`).
- **`src/pages/`**: File-based routing. Generates `/` (homepage), `/projects/` (archive), `/projects/[id]` (10 case studies), and `/skills/[id]` (52 skill validation pages).
- **`src/components/`**: Presentation modules. Combines fast-rendering `.astro` components with targeted React islands (`client:load`) for WebGL.
- **`src/components/react/`**: React components. Primary active component is `PCBShowcaseReact.tsx` / `GerberPCBViewer.tsx`.
- **`src/data/`**: Canonical data store. Strongly typed TypeScript files that drive all content on pages and components.
- **`src/animations/`**: Motion controllers. All animations are encapsulated here, powered by Anime.js 4.5.x, with strict cleanup and lifecycle methods.
- **`src/lib/gerber/`**: Algorithmic conversion of preprocessed Gerber geometric data into Three.js `BufferGeometry` and extruded meshes.
- **`scripts/`**: Build utilities. `preprocess-gerbers.mjs` extracts raw Gerber archives and parses them ahead of the Astro build to avoid client-side parsing overhead.
- **`public/pcb-data/`**: Static JSON data consumed by the browser via `fetch('/pcb-data/...')`.
- **`media/`**: Authentic project photos, inspection stickers, test videos, and CAD archives.

---

## 4. Website Structure

### Homepage Section Sequence

The homepage ([src/pages/index.astro](file:///home/buddy/Portfolio/my-portfolio/src/pages/index.astro)) contains exactly six sections in the following strict order:

```text
[ Sticky Top Navigation ]
  01 // HERO (Monumental Typography + Portrait + 3D Scene + 2D Circuit)
  02 // ROLES I'VE TAKEN (Journey Bio + Verified Credentials + Roles Accordion)
  03 // SELECTED SYSTEMS (Baja Dual Showcase + Featured Projects Grid)
  04 // ENGINEERING COMPETENCIES (Interactive 52-Skill Bubble Map + Telemetry)
  05 // PCB LAB (#hardware: 3D Gerber Inspector + Fabrication Telemetry)
  06 // CONTACT (Direct Email + Copy Action + Verified Social Channels)
[ Editorial Footer ]
```

### Detailed Section Breakdown

#### 01 // HERO (`Hero.astro`)
- **Purpose**: Monumental visual introduction establishing identity, technical engineering focus, and hardware/software breadth.
- **Visuals**: Light cream canvas (`#F7F5F0`), monumental dark typography ("NAVEEN SHAJI GEORGE"), authentic portrait cutout, fine champagne gold circuit traces, and a real 3D gunmetal/gold lathe mechanical collar.
- **Interactions**: Subtle mouse pointer parallax, interactive pulse acceleration on scroll, CTA buttons navigating to `#work` and `#skills`.
- **Transitions**: As the user scrolls, the hero circuitry gently shifts Y by 38px and dims to 0.40 opacity; 3D canvas shifts by 24px; portrait shifts by 14px. When scrolling back upward, full opacity and scale are smoothly restored.

#### 02 // ROLES I'VE TAKEN (`RolesTaken.astro`)
- **Purpose**: Establishes origin story, academic foundation, verified team credentials, and leadership track record.
- **Visuals**: Two-column layout. Left: Bio narrative ("Hooked on building robotics from a very young age..."), B.Tech degree at Saintgits College of Engineering, verified credentials preview card with interactive micro-selector, and CV download. Right: Four collapsed-by-default role accordion cards.
- **Content**:
  1. *Electrical and Electronics Head* (Team Equinox · BAJA SAE India, 2025–2026)
  2. *Vice President of Anchoring Club* (Saintgits College of Engineering, Nakshatra Cultural Fest, 2023–2025)
  3. *Coordinator of Campus Radio Jockey* (Campus Radio, 2023–2024)
  4. *Radio Jockey* (Campus Radio, 2022–2024)
- **Transitions**: Smoothly enters via Anime.js scroll reveal; accordion expands cleanly using Anime.js `createLayout()` FLIP mechanics without popping.

#### 03 // PROJECTS (`ProjectIndex.astro`)
- **Purpose**: Demonstrates physical engineering capability across autonomous vehicles, edge vision, surgical robotics, and swarm platforms.
- **Visuals**: Asymmetrical editorial grid with 75–80% image area:
  - Top row: Monumental side-by-side dual card comparing **aBAJA 2025 (Car A12 · AIR 7)** and **aBAJA 2026 (Car A18 · AIR 11)**.
  - Middle row: Featured duo: **Hospital Service AMR** and **Smart CCTV Edge Vision**.
  - Bottom row: Featured trio: **RailGuard AI Rover**, **CMR Versius Surgical Robotics**, and **HeRo Swarm Robotics**.
- **Interactions**: Card hover elevation (`translateY(-4px)`), dark glass overlay displaying key technical tags, status badge, and direct click routing to `/projects/[id]`.

#### 04 // SKILLS & EVIDENCE (`SkillsEvidence.astro`)
- **Purpose**: Comprehensive competency map linking theoretical and practical skills directly to verified projects and roles.
- **Visuals**: Interactive bubble cluster composition organized into 11 domain clusters, separated into *Core Engineering* (gold/dark) and *Complementary* (slate) tiers.
- **Interactions**: Hovering or clicking any bubble highlights connected project and role chips, updating the telemetry inspector panel with real-world evidence and tools used. Clicking a skill routes to its dedicated validation case study at `/skills/[id]`.

#### 05 // PCB LAB (`PCBShowcase.astro` inside `<section id="hardware">`)
- **Purpose**: Physical hardware verification proving the ability to take schematics to fabricated, multi-layer, competition-grade ECUs.
- **Visuals**: Two-column interactive engineering test bench. Left: Interactive WebGL 3D PCB viewport (`PCBShowcaseReact.tsx` / `GerberPCBViewer.tsx`). Right: Engineering telemetry panel with board dimensions, stackup, TVS/CAN/isolation design rationale, and test points.
- **Interactions**: Board carousel selector (`★ BACK-BOX ECU (2026)`, `FRONT-BOX ECU (2026)`, etc.), full 3D OrbitControls (pan, zoom, rotate), CAD layer toggle buttons (`F.Cu`, `B.Cu`, `F.Mask`, `Silkscreen`, `Drills`), camera angle presets (Isometric, Top, Bottom), and Gerber archive download.

#### 06 // CONTACT (`Contact.astro`)
- **Purpose**: Facilitates direct technical communication, recruitment inquiries, and professional networking.
- **Visuals**: Two-column card grid. Left: Primary communication hub featuring email display (`ngbuddy5@gmail.com`), "Draft Email ↗" CTA, and "Copy Address" button with live micro-animation feedback. Right: Verified networks card linking to LinkedIn, GitHub (`@buddytex`), and direct PDF CV download (`/CV_1.pdf`).
- **Footer**: Minimalist signature: "Naveen Shaji George · Robotics Engineer · Kottayam, Kerala, India · Open Worldwide · © 2026".

---

## 5. Hero System

### Architecture Overview

The Hero is a hybrid visual system combining four coordinated layers:
1. **Background Layer (`CircuitBoard.astro`)**: Full-bleed `<canvas id="circuitBoardCanvas">` rendering deterministic 2D copper traces, glow vias, IC footprints, and traveling electrical pulses.
2. **3D WebGL Layer (`Hero.astro`)**: Dedicated `<canvas id="hero3dCanvas">` rendering an aerospace-grade mechanical lathe collar, glowing gold filament, and floating orbital beads in Three.js.
3. **Portrait Layer (`Hero.astro`)**: High-resolution transparent cutout image of Naveen Shaji George (`/images/naveen-portrait.png`) with an ambient occlusion shadow behind it and floating glass HUD badges on its periphery.
4. **Foreground Content (`Hero.astro`)**: Left column typography containing technical eyebrow pill, monumental name lines, discipline list, and pill CTAs.

### 2D Circuit Board Implementation (`CircuitBoard.astro`)

- **Deterministic Routing**: Contains zero random numbers (`Math.random`). All trace coordinates are defined in normalized UV units (`[u, v]`) mapped to the container's width and height.
- **Hierarchy & Trace Tiers**:
  - *Primary Highways (~10%)*: 2.4px width, `#B8924A` at 0.78 alpha. Embossed appearance, hosts primary high-speed signal flow.
  - *Secondary Routes (~20%)*: 1.35px width, `#C5A059` at 0.38 alpha. Medium-width data buses.
  - *Hairlines (~70%)*: 0.85px width, `#D8BE8A` at 0.18 alpha. Subtle background grounding mesh.
- **Static Canvas Caching Optimization**: To guarantee 60 FPS performance, all hairlines, medium traces, highways, technical crosshairs, and standard vias are pre-rendered onto an offscreen canvas (`staticCanvas`) once during `resize()`. The active `requestAnimationFrame` loop performs a single lightweight `drawImage(staticCanvas, 0, 0)` call before drawing active pulses.
- **Multi-Channel Traveling Signal Flow**:
  - Contains **8 deterministic pulse channels** (`PULSE_CHANNELS`) routed along existing physical traces:
    - *Channel 0*: Top Left $\rightarrow$ feeds 3D Core (speed: 320 px/s, length: 55px, forward)
    - *Channel 1*: Baseline Bus $\rightarrow$ CTA Bridge $\rightarrow$ into 3D Core (speed: 260 px/s, length: 48px, forward)
    - *Channel 2*: Bottom Power Bus rising into 3D Core (speed: 280 px/s, length: 52px, forward)
    - *Channel 3*: Outbound Telemetry from 3D Core $\rightarrow$ Top Left (speed: 210 px/s, length: 45px, reverse)
    - *Channel 4*: Left Edge Industrial Bus $\rightarrow$ Ground Plane (speed: 185 px/s, length: 64px, forward)
    - *Channel 5*: Right Perimeter Actuator Bus (speed: 360 px/s, length: 50px, forward)
    - *Channel 6*: CTA Underline $\rightarrow$ Outward Left (speed: 230 px/s, length: 42px, reverse)
    - *Channel 7*: Bottom Finger 3 $\rightarrow$ into 3D Core (speed: 300 px/s, length: 44px, forward)
  - *Visual Styling*: Dual-stop gradient (`#FFFFFF` $\rightarrow$ `#FCD34D` $\rightarrow$ `#D97706`) with a 0.35 alpha outer glow and a brilliant white-hot spark at the pulse head (`sparkRadius` 2.4–3.0px).
  - *Responsive Density*:
    - Ultrawide / Large Desktop ($\ge 1440\text{px}$): 7 active pulses
    - Desktop ($1024\text{px} - 1439\text{px}$): 6 active pulses
    - Tablet ($640\text{px} - 1023\text{px}$): 4 active pulses
    - Mobile ($< 640\text{px}$): 3 active pulses
  - *Offscreen Suspension*: Uses `registerCircuitVisibility` to disconnect the rAF loop immediately when the hero leaves the viewport.

### 3D WebGL Scene (`Hero.astro`)

- **Renderer**: Vanilla Three.js `WebGLRenderer` configured with `alpha: true`, `antialias: true`, `powerPreference: 'high-performance'`, and clamped device pixel ratio (`Math.min(devicePixelRatio, 1.75)`).
- **Camera**: `PerspectiveCamera` with 40° FOV, positioned at `[0, 0, 8.4]`.
- **Geometries**:
  - *Primary Mechanical Collar*: Custom `LatheGeometry` (120 segments) with chamfered inner/outer bevels and an interior recessed groove, tilted at $(0.38\pi, -0.10\pi, 0.36\pi)$.
  - *Luminous Gold Filament*: `TorusGeometry` recessed inside the primary collar groove, emitting warm gold illumination.
  - *Secondary Nested Collar*: Smaller `LatheGeometry` (96 segments) interlocking behind the main collar.
  - *Floating Spheres*: Three precision spheres positioned around the head and collar: Sphere 1 (Champagne Gold), Sphere 2 (Gunmetal), Sphere 3 (Metallic Gold).
  - *Orbital Rings*: Two concentric `TorusGeometry` wires (3.85 and 3.35 radius) with miniature gold orbital beads rotating in opposite directions.
- **Lighting**:
  - Ambient: Warm studio fill (`0xFFFDF8`, intensity 1.25)
  - Key Light: Directional top-left (`0xFFFFFF`, intensity 3.8) at `[-5, 5, 4.5]`
  - Specular Rim: Directional rear-right (`0xFFDE90`, intensity 5.8) at `[5.5, 4.2, -2.8]`
  - Fill Light: Front-right directional (`0xF0CB74`, intensity 2.2) at `[4.0, -2.0, 3.5]`
  - Point Light: Warm interior point light inside the filament (`0xFFE599`, intensity 3.8, distance 6.0)
- **Lifecycle & Visibility**: An `IntersectionObserver` on `#hero` toggles `startLoop()` and `stopLoop()`. When the hero scrolls out of view, the loop calls `cancelAnimationFrame(hero3dCancelId)`, stopping all WebGL GPU workloads.

### Hero Parallax & Scroll Integration (`src/animations/hero.ts`)

- **Pointer Parallax**: Uses Anime.js `createAnimatable()` on `parallaxState` to interpolate mouse movements without instantiating new objects on `mousemove`. Shifts the portrait cutout within a subtle 4.5px X / 3.5px Y boundary.
- **Scroll Parallax Hierarchy**: Handled by a single rAF-ticked scroll listener:
  1. *Circuit Canvas*: Moves down by up to 38px, scales gently to 0.985, and dims from 1.0 to 0.40.
  2. *3D Canvas*: Moves down by up to 24px, dims from 1.0 to 0.50.
  3. *Portrait Cutout*: Moves down by up to 14px, dims from 1.0 to 0.55.
  4. *Left Column Content*: Moves down by up to 8px, dims from 1.0 to 0.65.
- **Dynamic Pulse Acceleration**: As the user begins scrolling, `window.__HERO_CIRCUIT_SPEED_BOOST__` scales smoothly from `1.0x` up to `1.5x`, conveying energy transfer from the hero into the rest of the site.
- **The Hero Disappearance Bug & Solution**:
  - *Root Cause of Previous Bug*: Earlier scroll-trigger scripts set `opacity: 0` or called destructive hide animations when scrolling past the hero. When returning rapidly or across boundary triggers, elements failed to remount or remained permanently invisible at `opacity: 0`.
  - *Current Solution*:
    1. During scroll-out, opacity is **never** set to 0. It is gently clamped between 0.35 and 0.55.
    2. The Anime.js `onScroll` hook implements `onEnterBackward`:
       ```typescript
       onEnterBackward: () => {
         if (circuitCanvas) animate(circuitCanvas, { opacity: 1, translateY: 0, scale: 1, duration: 400, ease: 'outQuad' });
         if (canvas3d) animate(canvas3d, { opacity: 1, duration: 400, ease: 'outQuad' });
         if (portraitImg) animate(portraitImg, { opacity: 1, translateY: 0, duration: 400, ease: 'outQuad' });
         if (heroLeft) animate(heroLeft, { opacity: 1, translateY: 0, duration: 400, ease: 'outQuad' });
       }
       ```
    3. Guarantees 100% visible restoration whenever entering from either direction.

---

## 6. Animation Architecture

### Core Design Philosophy (`src/animations/core.ts`)

All animations across the application use **Anime.js 4.5.x**. Motion tokens enforce crisp, critically damped engineering physics without bouncy, floaty, or sluggish transitions.

```typescript
export const MOTION_TOKENS = {
  duration: {
    micro: 180,       // Hover, active, status pips, button clicks
    fast: 280,        // Tag reveals, small icon shifts, badge fades
    normal: 420,      // Card elevations, content reveals, tab transitions
    section: 650,     // Section titles, major domain reveals
    hero: 950,        // Monumental hero title, initial scene settling
  },
  easing: {
    technical: 'outExpo',       // Crisp, confident engineering entrance
    smooth: 'outQuad',          // Gentle settling
    inOut: 'inOutQuad',         // Continuous layout transitions
    springMicro: 'spring(1, 90, 12, 0)', // Restrained physical interaction
  },
  stagger: {
    tight: 30,        // Character reveals, skill bubbles
    card: 65,         // Projects grid, role items
    domain: 90,       // Major cluster sections
  },
} as const;
```

### Module Audit (`src/animations/`)

| File | Purpose | Key Anime.js APIs | Execution Mode | Lifecycle & Pausing |
| :--- | :--- | :--- | :--- | :--- |
| **`core.ts`** | Central re-export of Anime.js 4.5 engine, tokens, and `resetElementStyles`. | `animate`, `createTimeline`, `createScope`, `createAnimatable`, `onScroll`, `stagger`, `splitText`, `createLayout`, `cleanInlineStyles` | Module definition | N/A |
| **`accessibility.ts`**| Utility functions for motion reduction and device sniffing. | None | Synchronous | Evaluates `prefers-reduced-motion` and screen width. |
| **`circuits.ts`** | Bridges CircuitBoard canvas visibility to scroll state. | `onScroll` | Scroll-driven | Sets `isCircuitVisible` and suspends rAF when offscreen. |
| **`contact.ts`** | Provides tactile feedback when copying email. | `animate` | Event-driven (click) | One-shot micro-animation restoring copy label after 2s. |
| **`cursor.ts`** | Desktop custom cursor (dot + ring) and magnetic CTAs. | `createAnimatable`, `animate` | Event-driven (`mousemove`) | Bypassed on touch/mobile; uses `createAnimatable` to avoid per-event allocations. |
| **`hero.ts`** | Controls hero entrance sequence, pointer parallax, and scroll reaction. | `animate`, `createTimeline`, `createAnimatable`, `onScroll`, `stagger`, `cleanInlineStyles` | Sequence + continuous | Parallax throttled via rAF; lifecycle observer restores full visibility on return. |
| **`lenisScroll.ts`** | Initializes smooth inertia scrolling on desktop. | None (uses Lenis) | Continuous (rAF loop) | Paused/destroyed on mobile or under reduced motion. |
| **`pcb.ts`** | Handles PCB section reveal, board switching, and telemetry fade. | `animate`, `onScroll`, `resetElementStyles` | Scroll + event-driven | Fades telemetry card on tab switch; reveals viewport on entry. |
| **`projects.ts`** | Staggered entrance for editorial project cards and detail page headers. | `animate`, `createTimeline`, `onScroll`, `stagger`, `resetElementStyles` | Scroll-driven | Reveals cards with staggered upward slide and unsets inline styles on completion. |
| **`roles.ts`** | Controls roles accordion expansion and biography sidebar reveal. | `animate`, `createLayout`, `onScroll`, `stagger`, `resetElementStyles` | Scroll + event-driven | Uses `createLayout()` for smooth FLIP morphing between collapsed and expanded states. |
| **`scroll.ts`** | Master scroll reveal system, datum spine progress, and section waypoints. | `animate`, `onScroll`, `resetElementStyles`, `cleanInlineStyles` | Scroll-driven | Couples Anime.js `onScroll` with native `IntersectionObserver` to ensure elements never remain stuck at `opacity: 0`. |
| **`skills.ts`** | Staggered center-out bubble map reveal and hover elevation. | `animate`, `onScroll`, `stagger`, `resetElementStyles` | Scroll-driven | Staggers 52 bubbles from center outward; handles hover scaling. |
| **`text.ts`** | Splitting text by characters/words for editorial headlines. | `animate`, `splitText`, `stagger`, `resetElementStyles` | One-shot / Scroll | Splits headlines into spans and slides them up cleanly. |

---

## 7. Performance Architecture

### Render Loop Audit

The portfolio strictly isolates continuous animation loops to prevent frame drops or CPU/GPU contention:

1. **Hero 3D Canvas Loop (`Hero.astro`)**:
   - Engine: Three.js `requestAnimationFrame` loop.
   - Status: **Strictly pauses when offscreen**. Controlled by an `IntersectionObserver` on `#hero` (threshold 0.05).
   - Metrics: Sets `window.__PERF_METRICS__.hero3dRunning`.
2. **Hero 2D Circuit Board Loop (`CircuitBoard.astro`)**:
   - Engine: Canvas 2D `requestAnimationFrame` loop.
   - Status: **Strictly pauses when offscreen**. Controlled by `registerCircuitVisibility` via Anime.js `onScroll`.
   - Metrics: Sets `window.__PERF_METRICS__.circuitRunning`.
3. **3D PCB Lab Viewer Loop (`GerberPCBViewer.tsx`)**:
   - Engine: React Three Fiber (R3F) render loop.
   - Status: **Strictly pauses when offscreen**. Frameloop is conditionally set: `frameloop={isInView ? 'always' : 'never'}` via an `IntersectionObserver` with a `300px` root margin.
   - Metrics: Sets `window.__PERF_METRICS__.pcb3dRunning`.
4. **Lenis Scroll Loop (`lenisScroll.ts`)**:
   - Engine: `requestAnimationFrame(raf)` calling `lenisInstance.raf(time)`.
   - Status: Continuous on desktop; **completely destroyed and disabled** on touch devices or under `prefers-reduced-motion`.
5. **Scroll Progress & Parallax Listeners**:
   - Engine: Single passive `window.addEventListener('scroll', ...)` throttled via `requestAnimationFrame` flags (`scrollTicking`).
   - Rule: **Zero** Anime.js animation instances are spawned inside scroll events.

### Performance Caching & Offscreen Architecture

- **Offscreen Static Canvas (`CircuitBoard.astro`)**: Pre-draws all complex circuit hairlines, buses, IC packages, and test points once. The active loop renders only the 4–7 moving pulse sparks onto the visible canvas.
- **Preprocessed Gerber JSON**: Raw Gerber RS-274X archives are parsed during the build step (`preprocess-gerbers.mjs`). The browser downloads compact, optimized JSON (`back-box-2026.json`, 1.38 MB), eliminating runtime parsing latency.
- **Passive Event Listeners**: All `mousemove`, `scroll`, and `resize` listeners specify `{ passive: true }` to keep the main thread unblocked.
- **Hardware-Accelerated Compositing**: Critical animated containers use `will-change: transform` and `translate3d(x, y, 0)` for direct GPU blitting.

---

## 8. PCB / Gerber System

### Source of Truth: Actual RS-274X Gerber Archives

The 3D PCB visualization represents **actual manufactured hardware** derived directly from the user's KiCad production archives:
- **`media/Gerbers/Back_Box_2026.zip`** (RAR v5 archive containing KiCad production files for Car A18's Back-Box ECU)
- **`media/Gerbers/Front_Box_2026.rar`** (RAR archive containing KiCad production files for Car A18's Front-Box ECU)

### Build-Time Preprocessor (`scripts/preprocess-gerbers.mjs`)

The preprocessor runs automatically prior to `astro build`:
1. Extracts RAR/ZIP archives into a temporary directory using `node-unrar-js`.
2. Matches files to standard KiCad layer conventions:
   - `-F_Cu.gtl` $\rightarrow$ Front Copper (`F.Cu`)
   - `-B_Cu.gbl` $\rightarrow$ Back Copper (`B.Cu`)
   - `-F_Mask.gts` $\rightarrow$ Front Solder Mask (`F.Mask`)
   - `-B_Mask.gbs` $\rightarrow$ Back Solder Mask (`B.Mask`)
   - `-F_Silkscreen.gto` $\rightarrow$ Front Silkscreen (`F.Silkscreen`)
   - `-B_Silkscreen.gbo` $\rightarrow$ Back Silkscreen (`B.Silkscreen`)
   - `-Edge_Cuts.gm1` $\rightarrow$ Board Outline (`Edge.Cuts`)
   - `-PTH.drl` $\rightarrow$ Plated Through-Holes (`PTH`)
   - `-NPTH.drl` $\rightarrow$ Non-Plated Through-Holes (`NPTH`)
3. Evaluates RS-274X aperture definitions (Circle, Rectangle, Obround, Aperture Macros).
4. Converts Gerber commands into three core drawing primitives:
   - `draws`: Linear vector segments between coordinates with specific aperture line widths.
   - `flashes`: Component pads flashed at specific coordinates with defined geometry.
   - `regions`: Polygonal copper pours and ground plane fills.
5. Evaluates Excellon drill tools, generating hole coordinates and exact drill diameters.
6. Writes compact JSON to `public/pcb-data/{board-id}.json`.

### In-Browser Geometry Generation (`src/lib/gerber/gerberToGeometry.ts`)

The browser converts the JSON into Three.js 3D meshes:
- **Substrate (`buildBoardSubstrate`)**: Extrudes the `Edge.Cuts` boundary polygon to a realistic 1.6mm board thickness, punching out all PTH and NPTH drill holes using `THREE.Path` hole definitions. Rendered in a deep matte dark green FR4 material (`#133824`, roughness: 0.65).
- **Copper & Pads (`buildLayerGeometry`)**: Constructs `BufferGeometry` for `F.Cu` and `B.Cu` traces, flashed pads, and polygon pours offset by $+0.001$ mm above/below the substrate. Rendered in realistic semi-specular copper (`#C87830`).
- **Pads & Solder Mask Openings (`F.Mask` / `B.Mask`)**: Renders ENIG gold finish pads (`#F3C958`, metalness: 0.95, roughness: 0.15) representing exposed component soldering surfaces.
- **Silkscreen (`F.Silkscreen` / `B.Silkscreen`)**: Crisp off-white component legends, pin labels, and logos (`#FAF8F2`).
- **Plated Vias & Barrels (`buildViaBarrels`)**: Generates interior cylindrical copper sleeves inside through-holes to represent genuine electroplated via barrels.

### 3D Viewer (`src/components/react/GerberPCBViewer.tsx`)

- **Rendering Stack**: React Three Fiber `<Canvas>` with `ACESFilmicToneMapping`.
- **Lighting**: Five-point engineering studio lighting (crisp overhead directional, soft ambient, specular rim, and underside golden fill).
- **Controls**: `OrbitControls` with smooth damping (0.08) and auto-rotation (speed 0.6) that pauses during mouse drag and resumes after 2.5s of inactivity.
- **Camera Presets**: Smoothly animates camera between *Isometric* `[1.6, 1.3, 1.8]`, *Top* `[0, 0, 2.6]`, and *Bottom* `[0, 0, -2.6]`.
- **Mode Toggle**:
  - `● FABRICATED PCB`: Displays substrate, copper, ENIG pads, silkscreen, and vias as a finished physical board.
  - `■ CAD LAYERS`: Displays interactive toggle buttons for individual layers (`F.Cu`, `B.Cu`, `F.Mask`, `Silkscreen`, `Drills`).
- **Verification of Authenticity**:
  - **No AI-generated or fake 3D electronic components exist in the viewer**.
  - All fabricated component models (`ESP32DevKit`, `DeutschConnector`, `TerminalBlock`, `AutomotiveRelay`, `ElectrolyticCap`, `SOICPackage`, and `StatusLED`) were completely removed from the code.
  - The viewer visualizes strictly genuine Gerber-derived manufacturing data.

### PCB Inventory

| Artifact ID | Name | Project | Dimensions | Layer Stackup & Finish | Gerber Source File |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`vehicle-ecu`** *(Primary)* | Custom Multi-Layer Vehicle ECU (Back-Box) | aBAJA 2026 (Car A18) | 201.5 × 138.5 mm | 2-Layer FR4 (1.6mm), ENIG Gold | `Back_Box_2026.zip` $\rightarrow$ `back-box-2026.json` |
| **`front-box-ecu`** | Front-Box ECU (Sensor Hub & SBW Interface) | aBAJA 2026 (Car A18) | 224.5 × 180.0 mm | 2-Layer FR4 (1.6mm), ENIG Gold | `Front_Box_2026.rar` $\rightarrow$ `front-box-2026.json` |
| **`estop-interlock`** | Fail-Safe Hardware E-Stop Interlock Board | aBAJA 2026 Safety | 82 × 64 mm | 2-Layer 2oz Heavy Copper, HASL | Schematic/spec documented (no raw archive in media) |
| **`swarm-node`** | Swarm Robotics Mesh & Motor Node | HeRo Platform | 62 × 62 mm | 2-Layer FR4, ENIG Gold | Schematic/spec documented (no raw archive in media) |

---

## 9. Media Library

The project contains **130 media files** located under `my-portfolio/media/` (symlinked to `/media/` for web serving).

### Category Breakdown

| Folder Category | File Count | Media Types | Contents & Engineering Subject Matter |
| :--- | :---: | :--- | :--- |
| **`Gerbers/`** | 2 | `.zip`, `.rar` | Raw KiCad production archives (`Back_Box_2026.zip`, `Front_Box_2026.rar`). |
| **`projects/baja/baja-2026/`** | 24 | `.jpeg`, `.mp4` | Car A18 complete vehicle, Electrical Head team jersey, accumulator inspection stickers, custom ECU boards, HV/LV wiring harness, steer-by-wire bench tests. |
| **`projects/baja/baja-2025/`** | 10 | `.jpeg`, `.png` | Car A12 vehicle on track, Team Equinox endurance group photos, initial electrical relay harness. |
| **`projects/Hospital/`** | 15 | `.jpeg` | Hospital service AMR chassis, omnidirectional wheel layout, planar LiDAR mount, top/side structural engineering views. |
| **`projects/railguard-ai/`** | 11 | `.jpeg`, `.mp4` | Track inspection autonomous rover, outdoor rail hardware trials, ground telemetry mobile app, international hackathon presentation. |
| **`projects/swarm-robotics/`** | 6 | `.png`, `.jpg`, `.md` | HeRo swarm robot hardware, Gazebo multi-agent simulation arenas, custom PCB hat, attribution document. |
| **`internships/surgical-robotics/`**| 14 | `.jpeg`, `.mp4` | CMR Versius surgical robotics master surgeon console, multi-axis robotic arms, hospital operating theatre clinical immersion. |
| **`hackathons/intel-ai/`** | 16 | `.jpg`, `.jpeg`, `.mp4`| Intel Edge AI Hackathon team, live inference benchmarking on Intel hardware, jury defense, certificate presentations. |
| **`activities/anchoring/`** | 9 | `.jpeg`, `.JPG` | Nakshatra 2024–2026 national cultural fest hosting, lead stage anchoring in tuxedo, celebrity guest introductions, crowd management. |
| **`activities/campus-radio/`** | 1 | `.jpeg` | Campus radio broadcasting console, studio condenser microphones, programming control. |
| **`achievements/certificates/`** | 10 | `.jpg`, `.jpeg` | BAJA SAEINDIA 2025 AIR 7 certificate, Best Anchor Award, Intel Top 25 Hackathon honor, SAE self-driving certificate. |
| **`Workshops /Self-driving Sae/`**| 12 | `.jpg` | Autonomous driving perception workshop, camera calibration, vehicle sensor rigging. |

---

## 10. Projects

The portfolio documents **10 distinct engineering projects** in [src/data/projects.ts](file:///home/buddy/Portfolio/my-portfolio/src/data/projects.ts). The first seven are **featured** on the homepage; all ten have comprehensive static case study pages under `/projects/[id]`.

### Project Matrix

| ID | Title & Year | Domain & Category | Role | Key Hardware / Software | Primary Media Artifact |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`baja-2025`** | aBAJA SAEINDIA 2025 (Car A12) | Autonomous Vehicle / Competition (AIR 7) | Electrical Division | Relays, wiring harnesses, sensors, C++, Python | `/media/projects/baja/baja-2025/vehicle/CAR_best_2025.jpeg` |
| **`baja-2026`** | aBAJA SAEINDIA 2026 (Car A18) | Autonomous Vehicle / Competition (AIR 11)| Electrical & Electronics Head | Custom ECUs, CAN 2.0B, SBW/TBW, ESP32, FreeRTOS | `/media/projects/baja/baja-2026/vehicle/WhatsApp Image 2026-09-14 at 00.14.44.jpeg` |
| **`hospital-amr`** | Hospital Service AMR (2024–2025) | Autonomous Robotics / Healthcare | Perception & Systems Lead | 2D/3D LiDAR, ROS 2 Humble, Nav2, Cartographer | `/media/projects/Hospital/Hosptial_robot_side-view.jpeg` |
| **`smart-cctv`** | Smart CCTV Edge Vision (2024) | Computer Vision / Edge AI (Intel Top 25) | Edge AI Engineer | Intel oneAPI, OpenVINO, YOLOv8, RTSP, C++ | `/media/hackathons/intel-ai/IMG-20241127-WA0009.jpg` |
| **`railguard-ai`** | RailGuard AI Anomaly Rover (2024) | Edge AI / Inspection Robotics (Top 10) | Robotics Hardware Lead | Autonomous rover, YOLOv8, Flutter telemetry, Raspberry Pi 4 | `/media/projects/railguard-ai/event/WhatsApp Image 2026-09-14 at 00.59.22(1).jpeg` |
| **`surgical-robotics`**| CMR Versius Surgical Robotics (2024) | Medical Robotics / Clinical Systems | Clinical Robotics Intern | Multi-joint robotic arms, surgeon console, kinematics | `/media/internships/surgical-robotics/robot-hardware/WhatsApp Image 2026-09-14 at 01.05.35.jpeg` |
| **`swarm-robotics`** | Two-Robot Swarm Platform (2024) | B.Tech Mini Project / Multi-Agent | Mini Project Lead | Two physical bots, SMD soldering, ESP32 firmware, inter-bot comm, Gazebo | `/media/projects/swarm-robotics/hero_swarm_test.png` |
| **`balancing-robot`**| Two-Wheeled Inverted Pendulum (2023) | Mechatronics / Control Systems | Control Systems Lead | MPU-6050, PID control, high-torque DC motors, C++ | `/images/abaja-lane-pipeline.png` |
| **`agv-sensor-fusion`**| AGV Industrial Sensor Fusion (2023) | Industrial Robotics / Navigation | Embedded Systems Engineer | Extended Kalman Filter (EKF), wheel encoders, IMU | `/images/abaja-lane-pipeline.png` |
| **`lane-keep-assist`**| Autonomous Lane-Keep Assist (2023) | Autonomous Systems / ADAS | Algorithm Developer | OpenCV, perspective transform, PID steering | `/images/abaja-lane-pipeline.png` |

---

## 11. Baja 2025 (Car A12)

- **Role**: Electrical & Electronics Division · Vehicle Development (Team Equinox).
- **Achievement**: **All India Rank 7 (AIR 7)** at BAJA SAEINDIA 2025.
- **Vehicle**: Car A12, an all-terrain competition vehicle engineered for rough off-road endurance and dynamic events.
- **Electrical Architecture**:
  - Relay-based switching architecture chosen for rapid integration and prototype durability.
  - Direct point-to-point sensor wiring harness establishing baseline telemetry before the team migrated to bus-based architectures in 2026.
  - Physical cockpit master kill switch and starter interlock circuits.
- **Key Media**:
  - Primary: `/media/projects/baja/baja-2025/vehicle/CAR_best_2025.jpeg` (Car A12 dynamic on-track action).
  - Secondary: `/media/projects/baja/baja-2025/team/spider1.png` (Team Equinox debrief photo).
  - Certificate: `/media/achievements/certificates/sae-baja-2025-cert.jpg` (Official SAEINDIA AIR 7 certificate).
- **Case Study**: Accessible at `/projects/baja-2025`.

---

## 12. Baja 2026 (Car A18)

- **Role**: **Electrical & Electronics Head · Systems Architect** (Team Equinox).
- **Achievement**: **All India Rank 11 (AIR 11)** at BAJA SAEINDIA 2026; passed all rigorous SAE technical inspections.
- **Vehicle**: Car A18, an advanced autonomous-capable competition vehicle featuring full Drive-by-Wire (DBW).
- **Electrical & Autonomous Systems Architecture**:
  - **Custom Multi-Layer ECUs**: Designed in KiCad. Includes Back-Box ECU (isolated CAN gateway, power management) and Front-Box ECU (steering actuator bridge and front sensor hub).
  - **CAN 2.0B Bus Network**: Differential CAN bus running at 500 kbps with split 120Ω termination and TVS common-mode suppression.
  - **Drive-by-Wire Actuation**:
    - *Throttle-by-Wire (TBW)*: Closed-loop electronic throttle control.
    - *Brake-by-Wire (BBW)*: Linear actuator electro-mechanical braking.
    - *Steer-by-Wire (SBW)*: High-torque 24V servomotor with absolute rotary encoder feedback.
  - **Galvanic Isolation**: Optocoupled dual-rail isolation separating 24V high-current actuator noise from sensitive 3.3V/5V logic rails.
  - **Fail-Safe Hardware E-Stop**: Dual-channel normally closed hardware-latching relay circuit severing high-current traction lines in $< 5\text{ms}$, operating completely independent of microcontroller firmware.
  - **Wiring Harness**: Hand-fabricated military-grade automotive harness with Deutsch DT connectors, braided conduit sleeving, and chassis strain reliefs.
  - **Embedded Control Stack**: Dual-core ESP32 microcontrollers running FreeRTOS (Core 0: CAN interrupt processing; Core 1: PID control loops).
- **Key Media**:
  - Primary Vehicle: `/media/projects/baja/baja-2026/vehicle/WhatsApp Image 2026-09-14 at 00.14.44.jpeg`
  - Electrical Lead Credential: `/media/projects/baja/baja-2026/team/Electrical-Head.jpeg` (Naveen in official jersey)
  - Accumulator Technical Inspection Pass: `/media/projects/baja/baja-2026/electrical/WhatsApp Image 2026-09-14 at 00.15.05.jpeg`
  - Steer-by-Wire Testing Video: `/media/projects/baja/baja-2026/electrical/WhatsApp Video 2026-09-14 at 00.14.47.mp4`
- **Case Study**: Accessible at `/projects/baja-2026`.

---

## 13. Roles

Configured in [src/data/roles.ts](file:///home/buddy/Portfolio/my-portfolio/src/data/roles.ts) and rendered in [src/components/RolesTaken.astro](file:///home/buddy/Portfolio/my-portfolio/src/components/RolesTaken.astro).

### 1. Electrical and Electronics Head (2025–2026)
- **Organization**: Team Equinox · BAJA SAE India
- **Focus**: CAN 2.0B Bus, Custom ECUs, Drive-by-Wire, Galvanic Isolation, Hardware E-Stop.
- **Responsibilities**: Directed the electrical division in two national campaigns (AIR 7 & AIR 11), engineered multi-layer ECUs in KiCad, authored the Engineering Design Dossier, and defended systems before SAE technical judges.
- **Visual Evidence**: Official jersey photograph (`Electrical-Head.jpeg`) and Accumulator Check signed inspection sticker (`WhatsApp Image 2026-09-14 at 00.15.05.jpeg`).

### 2. Vice President of Anchoring Club (2023–2025)
- **Organization**: Anchoring Club · Saintgits College of Engineering
- **Focus**: Team Leadership & Grooming, Stage & Audience Management, Celebrity Guest Coordination, Live Event Execution.
- **Nakshatra Cultural Fest Responsibilities**:
  - Groomed, trained, and directed student anchoring teams for **Nakshatra**, a national-level cultural fest at Saintgits College of Engineering.
  - Commanded main auditorium stage operations, minute-by-minute rundown flow, and crowd dynamics for audiences of thousands.
  - Coordinated directly with celebrity guests and institutional VIPs for protocol on-stage introductions.
- **Visual Evidence**: Stage hosting in formal tuxedo (`WhatsApp Image 2026-09-14 at 00.37.50.jpeg`) and official **Best Anchor Award Certificate** for Nakshatra 2024 (`1156ae7c-fc50-424e-af60-4bcc8e38810b_page-0001.jpg`).

### 3. Coordinator of Campus Radio Jockey (2023–2024)
- **Organization**: Campus Radio
- **Focus**: Operations Coordination, Broadcast Scheduling, Team Liaison, Show Management.
- **Responsibilities**: Managed studio session bookings, broadcasting rosters, and liaison between radio jockeys and technical sound console operators.
- **Visual Evidence**: Broadcast studio console and acoustic setup (`WhatsApp Image 2026-09-14 at 01.05.29(1).jpeg`).

### 4. Radio Jockey (2022–2024)
- **Organization**: Campus Radio
- **Focus**: On-Air Broadcasting, Voice Modulation, Scriptwriting, Audience Engagement.
- **Responsibilities**: Hosted live on-air thematic shows, structured interactive cues, and delivered clear spoken-word broadcasting.
- **Visual Evidence**: On-air broadcast studio photograph (`WhatsApp Image 2026-09-14 at 01.05.29(1).jpeg`).

---

## 14. Skills

Configured in [src/data/skills.ts](file:///home/buddy/Portfolio/my-portfolio/src/data/skills.ts) and rendered in [src/components/SkillsEvidence.astro](file:///home/buddy/Portfolio/my-portfolio/src/components/SkillsEvidence.astro).

### Competency Map Architecture

The skill system encompasses **52 competencies** classified into **11 domain categories** and two main tiers:
- **Core Engineering Tier**: Domains 01 through 08 (Robotics, Embedded, Hardware, Mechanical, Software, Vision, Integration, Research).
- **Complementary Tier**: Domains 09 through 11 (Leadership, Communication, Digital Tools).

### Domain Categories & Skill Counts

1. **`01. Robotics & Autonomous Systems` (7 skills)**: `ros2`, `autonomous-navigation`, `lidar-perception`, `slam-localization`, `swarm-robotics`, `robot-kinematics`, `lane-keep-assist`
2. **`02. Embedded Systems & Hardware Protocols` (5 skills)**: `esp32-embedded`, `can-bus`, `microcontrollers`, `jetson-edge`, `embedded-protocols`
3. **`03. Electronics, PCB & Harness Design` (6 skills)**: `pcb-design`, `schematic-design`, `pcb-assembly`, `electronics-debugging`, `power-electronics`, `wiring-harness`
4. **`04. Mechanical Fabrication & Prototyping` (6 skills)**: `mechanical-fabrication-skill`, `workshop-practices`, `power-tools`, `hands-on-prototyping`, `mechanical-assembly`, `steering-geometry`
5. **`05. Software & Systems Development` (6 skills)**: `cpp-development`, `python-development`, `linux-development`, `git-github`, `frontend-astro`, `docker-tools`
6. **`06. Computer Vision & Edge AI` (4 skills)**: `opencv-vision`, `yolo-detection`, `intel-oneapi`, `video-streaming`
7. **`07. System Integration & Vehicle Architecture` (4 skills)**: `vehicle-system-integration`, `hardware-software-codesign`, `drive-by-wire`, `safety-estop`
8. **`08. Engineering Research & Problem Solving` (4 skills)**: `engineering-research-skill`, `technology-benchmarking`, `engineering-documentation`, `rapid-system-onboarding`
9. **`09. Leadership & Team Management` (3 skills)**: `technical-leadership`, `team-management`, `team-grooming`
10. **`10. Communication & Live Presentation` (4 skills)**: `public-speaking`, `stage-management`, `technical-presentation`, `radio-jockeying`
11. **`11. Creative & Digital Tools` (3 skills)**: `presentation-design`, `canva-visual`, `video-editing`

### Interactive Behavior & Telemetry

- **Bubble Visualization**: Rendered with variable bubble sizes matching proficiency (`strong`, `working`, `exposure`).
- **Telemetry Inspector**: Hovering any bubble displays its category index, proficiency badge, concise empirical evidence summary, context, tools, and direct clickable badges to connected projects and roles.

---

## 15. Contact System

Located in [src/components/Contact.astro](file:///home/buddy/Portfolio/my-portfolio/src/components/Contact.astro):
- **Email Address**: `ngbuddy5@gmail.com`
- **Drafting Action**: "Draft Email ↗" launches a pre-formatted `mailto:` URI:
  ```text
  mailto:ngbuddy5@gmail.com?subject=Engineering%20Collaboration%20%2F%20Inquiry&body=Hi%20Naveen%2C%0A%0AI%20reviewed%20your%20robotics%20and%20hardware%20portfolio...
  ```
- **Copy Action**: Clicking "Copy Address" invokes `navigator.clipboard.writeText('ngbuddy5@gmail.com')` and triggers `animateCopyFeedback` in `src/animations/contact.ts`, transforming the label into `✓ COPIED TO CLIPBOARD` in green with a 180ms Anime.js ease.
- **Verified Networks**:
  - LinkedIn: `https://www.linkedin.com/in/naveen-shaji-george-a55b55243`
  - GitHub: `https://github.com/buddytex`
  - CV Download: Direct static link to `/CV_1.pdf`

---

## 16. Responsive Design

### Breakpoint Strategy

| Breakpoint | Target Devices | Layout & Behavior Adjustments |
| :--- | :--- | :--- |
| **`> 1440px`** | Ultrawide / Large Desktop | Full max-width 1520px container; 7 traveling pulses on hero circuit; 3-column project cards. |
| **`1100px`** | Standard Desktop | Left floating **datum spine** navigation is visible above 1100px and hidden below. |
| **`860px`** | Tablet Landscape | Desktop nav links and resume CTA collapse; mobile hamburger toggle button activates full-screen drawer. |
| **`768px`** | Tablet Portrait | Roles two-column grid collapses to single column; footer stacks vertically; contact grid collapses to single column. |
| **`640px`** | Mobile | Circuit pulse density reduces to 3 pulses; 3D canvas scales down; typography uses `clamp()` scales; custom cursor is completely disabled in favor of native touch gestures. |

---

## 17. Accessibility

- **Prefers-Reduced-Motion**: Enforced throughout.
  - Three.js hero rotation and floating spheres pause.
  - CircuitBoard canvas cancels pulse animation and displays static traces.
  - Lenis smooth scroll is completely bypassed.
  - Custom cursor is hidden in favor of standard OS cursor.
  - Scroll reveals instantly render elements at `opacity: 1`, `transform: none`.
- **Keyboard Navigation & Focus**:
  - All interactive elements have descriptive `:focus-visible` styling (`outline: 2px solid var(--accent-primary); outline-offset: 2px`).
  - Image Lightbox traps focus, supports `Escape` to close, and has `aria-modal="true"`.
- **Semantic HTML**:
  - Exactly one `<h1>` per page (Hero title on homepage, Case study title on subpages).
  - Proper `<main>`, `<section>`, `<nav>`, `<aside>`, `<header>`, and `<footer>` elements.
  - Clean ARIA attributes (`aria-label`, `aria-labelledby`, `role="tablist"`, `role="tab"`, `aria-selected`).

---

## 18. Deployment

- **Static Generation**: Configured as `output: 'static'` in `astro.config.mjs`.
- **Site URL**: `https://buddytex.github.io` (configured via `ASTRO_SITE`).
- **Build Script**: `npm run build` triggers `node scripts/build.mjs`, which runs `scripts/preprocess-gerbers.mjs` before executing `astro build`.
- **CI/CD Pipeline**: GitHub Actions workflow defined in `.github/workflows/deploy.yml`:
  - Triggers on push to `main` and `redesign/v2` branches.
  - Installs Node 22, runs `npm ci`, executes `npm run build`, and uploads `./my-portfolio/dist` to **GitHub Pages**.

---

## 19. Dependencies

### Categorized Dependency Summary

```json
{
  "dependencies": {
    "astro": "^7.2.0",            // Core SSG framework
    "@astrojs/react": "^4.4.2",    // React integration island renderer
    "react": "^18.3.1",            // UI library for 3D PCB component
    "react-dom": "^18.3.1",        // DOM renderer for React
    "three": "^0.160.1",           // WebGL library (Hero scene & PCB viewer)
    "@react-three/fiber": "^8.18.0", // Declarative Three.js wrapper
    "@react-three/drei": "^9.122.0", // 3D OrbitControls and camera utilities
    "animejs": "^4.5.0",           // Master motion engine
    "lenis": "^1.3.26",            // Desktop smooth inertia scrolling
    "node-unrar-js": "^2.0.2",     // Build-time KiCad RAR/ZIP extractor
    "motion": "^13.2.0",           // Installed motion package (Anime.js is primary)
    "gsap": "^3.15.0"              // Installed package (Anime.js is primary)
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.10",   // Static type/syntax analysis
    "typescript": "^6.0.3"         // Strict TypeScript compiler
  }
}
```

---

## 20. Visual Design System

- **Design Philosophy**: High-precision engineering laboratory aesthetic. Restrained machined graphite, warm off-white canvas, and metallic champagne gold accents.
- **Palette**:
  - Ink (Primary Typography & Dark Surfaces): `#141822`
  - Paper (Canvas Background): `#F7F5F0`
  - Secondary Surface: `#F3F0EA` / Elevated Surface: `#FFFFFF`
  - Metallic Gold (Interactive & Circuitry): `#B8924A`
  - Bright Gold (Active/Pulse State): `#E4C87A` / Core Pulse: `#FFF9E6`
  - Muted Text: `#6B7280` / Subtle Border: `rgba(20, 24, 34, 0.08)`
- **Typography**:
  - Display / Sans: `Space Grotesk` paired with `Inter`
  - Monospace (Technical kickers, badges, HUD): `JetBrains Mono`
- **Radii**: `--r-xs: 4px`, `--r-sm: 8px`, `--r-md: 12px`, `--r-card: 16px`, `--r-pill: 9999px`.

---

## 21. Animation Map

```text
HERO
├── Entrance Timeline (Anime.js createTimeline)
│   ├── 0ms: Circuit canvas reveal (opacity [0, 1])
│   ├── 120ms: 3D mechanical collar settling (opacity [0, 1], scale [0.94, 1])
│   ├── 240ms: Portrait cutout slide-in (translateY [24, 0], scale [0.97, 1])
│   ├── 350ms: Monumental name lines stagger (translateY [22, 0], outExpo)
│   ├── 520ms: Supporting disciplines fade
│   ├── 620ms: Top HUD badge & lower HUD panel scale-in
│   └── 750ms: Pill CTA buttons reveal
├── Pointer Parallax (Anime.js createAnimatable)
│   └── Restrained mouse interpolation: 4.5px X, 3.5px Y
├── 2D Circuit Pulses (Canvas rAF loop)
│   └── 4–7 simultaneous pulses traveling along existing traces at 185–360 px/s
├── 3D Mechanical Idle (Three.js rAF loop)
│   └── Collar rotation, counter-rotating orbitals, breathing gold filament
└── Scroll Reaction & Restoration (rAF + onScroll)
    ├── Circuit, 3D, portrait, text parallax hierarchy
    ├── Dynamic pulse speed acceleration (1.0x -> 1.5x)
    └── onEnterBackward: smooth restoration to 1.0 opacity

ROLES I'VE TAKEN
├── Biography Sidebar Reveal (registerScrollReveal, 20px slide)
└── Accordion Expansion (Anime.js createLayout FLIP)
    └── Height & opacity morph on click without abrupt layout popping

PROJECTS
├── Editorial Grid Reveal (registerScrollReveal, staggered upward slide)
└── Card Hover Interaction (CSS transform -4px, shadow elevation, glass overlay fade)

SKILLS & EVIDENCE
├── Bubble Map Entrance (Anime.js center-out stagger)
├── Bubble Hover Elevation (spring micro-interaction)
└── Telemetry Panel Fade (data inspection update)

PCB LAB
├── Viewport Reveal (registerScrollReveal)
├── 3D Auto-Rotation (OrbitControls speed 0.6, pause on drag, resume after 2.5s)
├── Camera View Transitions (Isometric / Top / Bottom 600ms cubic lerp)
└── Telemetry Card Fade (cross-fade on board selection)

CONTACT
├── Section Reveal (registerScrollReveal)
└── Copy Button Micro-Animation (Anime.js scale & label morph)
```

---

## 22. Data Flow

```text
Build Time:
  media/Gerbers/*.zip/*.rar
      ↓
  scripts/preprocess-gerbers.mjs (node-unrar-js)
      ↓
  public/pcb-data/{board-id}.json
      ↓
  astro build (SSG)
      ↓
  dist/ (HTML, JS, CSS, Media)

Client Runtime:
  Astro Static Shell (SSR/HTML)
      ├── Loads Layout.astro (styles, fonts, datum spine)
      ├── Mounts Hero.astro (Vanilla Three.js + CircuitBoard.astro 2D canvas)
      ├── Mounts RolesTaken.astro & ProjectIndex.astro (static markup)
      ├── Mounts SkillsEvidence.astro (52 bubble items)
      └── Hydrates PCBShowcaseReact.tsx (client:load)
            ↓
          Fetches /pcb-data/back-box-2026.json
            ↓
          gerberToGeometry.ts generates Three.js BufferGeometry
            ↓
          R3F Canvas renders manufactured PCB substrate, copper, ENIG pads, drills
```

---

## 23. Current Known Issues

### Confirmed Bugs
- **None**. The previous critical bug where hero elements permanently disappeared when scrolling down was completely resolved via `onEnterBackward` restoration hooks and clamped non-zero scroll-out opacities.

### Possible Issues / Edge Cases
- **Initial R3F Viewport Intersection Margin**: On ultra-slow network connections, if the user scrolls immediately to `#hardware` before `back-box-2026.json` (1.38 MB) finishes fetching, the loading spinner is displayed until the JSON resolves.

### Design / UX Notes
- **Desktop-Only Datum Navigation**: The left datum navigation spine is deliberately hidden below 1100px screen widths to avoid encroaching on primary editorial content.

### Performance Observations
- **GPU Usage**: On low-end mobile devices, rendering both WebGL scenes simultaneously could increase thermals; this is mitigated because the Hero WebGL loop pauses when scrolled past, and the PCB WebGL loop only activates when near `#hardware`.

---

## 24. Unused Assets

The media folder contains 130 files. Exactly **76 assets are actively referenced** in components or data files, and **54 assets are currently unused** (reserved for future case study expansions or supplementary galleries):
- `media/Workshops /Self-driving Sae/`: 12 photos (`IMG-20241127-WA0012.jpg` through `WA0023.jpg`).
- `media/activities/anchoring/Nakshatra_26/`: 7 high-res stage photos (`IMG_0824.JPG`, `IMG_0825.JPG`, `IMG_5709.JPG` through `IMG_5713.JPG`).
- `media/hackathons/intel-ai/`: 8 supplementary hackathon photos (`IMG-20241127-WA0002.jpg`, `WA0003.jpg`, etc.).
- `media/internships/surgical-robotics/`: 4 supplementary hospital OT photos (`WhatsApp Image 2026-09-14 at 01.05.37(1).jpeg`, etc.).
- `media/projects/Hospital/`: 6 supplementary AMR chassis angles (`Hosp.jpeg`, `Hosp2.jpeg` through `Hosp5.jpeg`, `hosp6.jpeg`).
- `media/projects/baja/baja-2025/team/`: 4 supplementary team photos.
- `media/projects/baja/baja-2026/electrical/`: 7 supplementary wiring and bench testing video clips.
- `media/achievements/certificates/`: 4 supplementary scanned certificates.

---

## 25. Current Git State

- **Active Branch**: `redesign/v2`
- **Branch Tracking**: Ahead of `origin/redesign/v2` by 6 commits.
- **Recent Commit History**:
  - `96fa382`: `perf: targeted render loop pausing, static canvas caching, and deployment workflow`
  - `4efb15c`: `checkpoint: unified anime.js 4.5 architecture, pcb 3d showcase, and baseline components`
  - `4b11c9f`: `fix(layout): simplify section headers and typography, remove sticky constraints and overflow clipping`
  - `65c2ccd`: `feat(motion): implement complete animation & transition system per spec`
  - `5f65684`: `fix(redesign): restore circuit background on hero and eliminate scroll-snapping / section paging`

---

## 26. Build & Test Results

Both validation commands execute cleanly with zero errors:

### TypeScript Check (`npx tsc --noEmit`)
```text
Exit code: 0
Output: Clean (0 errors across all .ts and .tsx files).
```

### Static Build (`npm run build`)
```text
[build] Preprocessing Gerber fabrication data...
Processing: Back-Box ECU 2026 (12 layers, 1.38 MB JSON output)
Processing: Front-Box ECU 2026 (12 layers, 1.50 MB JSON output)
[build] Starting Astro build...
output: "static"
64 page(s) built in 4.35s
Complete!
Exit code: 0
```

---

## 27. Important Future Context

For any AI assistant or developer continuing work on this codebase:
1. **Never Re-Introduce Fabricated PCB Components**: The user explicitly requires that the 3D PCB showcase represents **only** the actual board, copper traces, ENIG pads, vias, and silkscreen derived from genuine Gerber archives. Do not add 3D ESP32 chips, relays, or terminal blocks to the PCB viewer.
2. **Preserve Render Loop Suspension**: The continuous `IntersectionObserver` loops in `Hero.astro`, `CircuitBoard.astro`, and `GerberPCBViewer.tsx` are critical for maintaining 60 FPS scrolling and preventing background GPU drain.
3. **Respect Static Circuit Caching**: In `CircuitBoard.astro`, all background lines and vias must remain cached in `staticCanvas`. Only active traveling pulses should be drawn in the animation loop.
4. **Maintain Clamped Hero Scroll Opacity**: The hero disappearance fix relies on never setting hero elements to `opacity: 0` during downward scrolling, and re-animating them via `onEnterBackward`. Do not revert to binary display toggles.
5. **Astro Islands**: Keep React usage restricted to the 3D PCB viewer (`client:load`) to retain Astro's lightweight HTML footprint across the rest of the site.
