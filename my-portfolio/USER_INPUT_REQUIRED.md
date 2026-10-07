# User Input Required

This document categorizes all missing, unverified, or ambiguous information needed to make your robotics engineering portfolio 100% complete and recruiter-credible. Information that could already be verified from your CV (`CV_1.pdf`), project archives, or certificates has been excluded.

---

## 1. Critical Information (Essential for Professional Credibility)

### Question 1: Surgical Robotics Internship Scope & Mentor
- **Question**: During your internship at Muthoot Hospitals, Kozhencherry (Jun–Jul 2025) with the CMR Versius Surgical Robotic System, who was your primary clinical mentor or department, and what were the specific surgical procedures you observed?
- **Why it matters**: Recruiters look for specific clinical/surgical context (e.g., general laparoscopic, gynecological, urological procedures) and want to understand the exact clinical department to confirm the technical rigor of your hospital immersion.
- **Where it will be used**: In the newly dedicated **Professional Experience** section (`/experience` and homepage experience card) under *Clinical Surgical Robotics Internship*.
- **Example Answer Format**:
  ```text
  Department: Department of Minimally Invasive & Laparoscopic Surgery, Muthoot Hospitals
  Procedures Observed: Robotic cholecystectomy, laparoscopic hernia repairs (approx. 8–10 live cases)
  Clinical Activities: Observed preoperative arm docking, sterile drape barrier setups, robotic instrument calibration checks, and surgeon console teleoperation.
  ```

---

### Question 2: Hospital Service AMR — Current Status & Video Availability
- **Question**: Your CV lists the Hospital Service Robot as your B.Tech Final Year Project (2025–2026). What is its current build and validation milestone, and do you have a video of the robot navigating or performing indoor mapping?
- **Why it matters**: You have 15 detailed photos of the physical chassis, LiDAR mount, and differential drive platform, but live autonomous movement or SLAM mapping video provides the strongest proof for robotics recruiters.
- **Where it will be used**: On the `/projects/hospital-amr` case study page in the *Live Testing Dossier* section.
- **Example Answer Format**:
  ```text
  Current Status: Autonomous navigation testing phase / Teleoperation complete / SLAM mapping validated
  Testing Environment: Saintgits College of Engineering Robotics Lab / Hospital test corridor
  Video Available: [Yes, path to video file / No, currently undergoing testing]
  ```

---

### Question 3: RailGuard AI Rover — Competition Award & Hardware Specs [CONFIRMED COMPUTE: Raspberry Pi 4]
- **Question**: For the RailGuard AI track defect rover: Which competition or event was this demonstrated at (Faraway International Hackathon?), and what was the official team rank/award?
- **Status**: Onboard compute confirmed as **Raspberry Pi 4**.
- **Why it matters**: The project has excellent hardware testing videos (`media/projects/railguard-ai/hardware-testing/`) and a mobile telemetry dashboard, but the competition standing needs exact verification so we don't understate or overstate it.
- **Where it will be used**: In the **Achievements** section and `/projects/railguard-ai` case study overview.
- **Verified Specs**:
  ```text
  Onboard Compute: Raspberry Pi 4 (Edge Compute) running lightweight YOLO vision models
  Sensors & Telemetry: Industrial Cameras, LiDAR range-finding, Android Ground Station
  ```

---

## 2. High Value Information (Significantly Strengthens Case Studies)

### Question 4: Baja 2026 Steer-by-Wire (SBW) & CAN Bus Exact Metrics
- **Question**: What was the peak current rating and actuation speed of the Steer-by-Wire servo motor, and what CAN bus bit rate did you operate at (500 kbps or 1 Mbps)?
- **Why it matters**: Hardware and automotive recruiters look for quantitative engineering numbers (e.g., "Full lock-to-lock in 450ms under 65 Nm stall torque at 500 kbps").
- **Where it will be used**: In the `/projects/baja-2026` case study under *Engineering Decisions & Quantitative Constraints* and in the *PCB Lab* telemetry.
- **Example Answer Format**:
  ```text
  SBW Actuator: 24V 350W brushless DC servomotor with planetary gearbox
  Actuation Speed: Lock-to-lock (-28° to +28°) in 480 ms
  CAN Bus: Standard CAN 2.0B operating at 500 kbps with 120Ω split termination
  DC-DC Converter: 48V to 12V/24V 300W isolated step-down module
  ```

---

### Question 5: GitHub Repositories for Public Inspection
- **Question**: Which of your projects have public or recruiter-viewable GitHub repositories on your profile (`github.com/buddytex`)?
- **Why it matters**: Direct repository links to real C++, Python, ROS 2, or KiCad code are highly valued by engineering hiring managers.
- **Where it will be used**: In the *Repository / Source Code* badges on project case study pages.
- **Example Answer Format**:
  ```text
  Smart CCTV: https://github.com/buddytex/smart-cctv-oneapi (Public)
  Hospital AMR: https://github.com/buddytex/hospital-service-robot (Public / Private upon request)
  Baja 2026 ECUs: KiCad hardware files available in portfolio PCB viewer (Repository: Private team repo)
  ```

---

### Question 6: Target Roles & Geographic Flexibility
- **Question**: What exact job titles or specializations are you targeting for full-time engineering employment, and what geographic locations are you open to?
- **Why it matters**: Tailors the Contact section CTA and meta descriptions so recruiters immediately know if you match their opening.
- **Where it will be used**: In the **Contact Section** and **Hero Eyebrow** metadata.
- **Example Answer Format**:
  ```text
  Target Roles: Robotics Engineer, Autonomous Systems Engineer, Embedded Hardware Engineer, Robotics Integration Engineer
  Locations: Open worldwide (India, Europe, North America, Japan, Singapore, UAE)
  Availability: Immediate full-time employment (B.Tech Graduated)
  ```

---

## 3. Optional Information (Refinements & Nice-to-Haves)

### Question 7: Unused Workshop Photos Context
- **Question**: The folder `media/Workshops /Self-driving Sae/` contains 12 photos of camera calibration and autonomous vehicle setup from the SAEINDIA Southern Section workshop. Would you like a dedicated card in the **Achievements & Certifications** section highlighting this 4-day intensive?
- **Why it matters**: Connects the workshop certificate (`sae-self-driving-car-cert.jpg`) to authentic hands-on workshop photographs.
- **Where it will be used**: In the **Achievements & Continuous Learning** section.
- **Example Answer Format**:
  ```text
  Include in Achievements: Yes, feature 2–3 photos alongside the SAEINDIA Southern Section certificate.
  ```
