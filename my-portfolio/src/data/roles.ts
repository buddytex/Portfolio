export interface RoleVisualEvidence {
  image: string;
  badge: string;
  caption: string;
  secondaryImage?: string;
  secondaryBadge?: string;
  secondaryCaption?: string;
}

export interface RoleItem {
  id: string;
  num: string;
  title: string;
  domainCategory: string;
  organization?: string;
  period?: string;
  description?: string;
  responsibilities?: string[];
  focusAreas?: string[];
  visualEvidence?: RoleVisualEvidence;
}

export const rolesData: RoleItem[] = [
  {
    id: 'electrical-electronics-head',
    num: '01',
    title: 'Electrical and Electronics Head',
    domainCategory: 'Technical / Engineering',
    organization: 'Team Equinox · BAJA SAE India',
    period: '2025 – 2026',
    description: 'Headed electrical architecture, custom multi-layer ECUs, and full-vehicle systems integration for competition vehicle engineering.',
    responsibilities: [
      'Engineered dual-rail galvanic isolation across high-voltage powertrain and low-voltage harnesses.',
      'Designed custom multi-layer automotive ECUs with differential CAN 2.0B transceivers.',
      'Architected fail-safe dual-redundant hardware E-Stop interlock circuits.',
      'Led electrical and electronics division in national collegiate engineering campaigns (AIR 7 & AIR 11).'
    ],
    focusAreas: [
      'CAN 2.0B Bus',
      'Custom ECUs',
      'Drive-by-Wire Actuation',
      'Galvanic Isolation',
      'Hardware E-Stop'
    ],
    visualEvidence: {
      image: '/media/projects/baja/baja-2026/team/Electrical-Head.jpeg',
      badge: 'LEADERSHIP CREDENTIAL',
      caption: 'Naveen Shaji George in Team Equinox Electrical Head team jersey (Car A18)',
      secondaryImage: '/media/projects/baja/baja-2026/electrical/WhatsApp Image 2026-09-14 at 00.15.05.jpeg',
      secondaryBadge: 'TECHNICAL INSPECTION PASS',
      secondaryCaption: 'Accumulator Check technical inspection pass sticker verified and signed for Electrical Head Naveen'
    }
  },
  {
    id: 'vice-president-anchoring-club',
    num: '02',
    title: 'Vice President of Anchoring Club',
    domainCategory: 'Event Leadership & Stage Direction',
    organization: 'Anchoring Club · Saintgits College of Engineering',
    period: '2023 – 2025',
    description: 'Began anchoring in 10th grade and have hosted ~10 major events. As Vice President, directed anchoring operations, groomed collegiate talent, wrote scripts, secured permissions, and managed main-stage flow and celebrity guest coordination for Nakshatra—Saintgits College of Engineering\'s premier national-level cultural fest.',
    responsibilities: [
      'Groomed, trained, and mentored new anchors across voice modulation, pacing, and spontaneous stage recovery.',
      'Scripted full-length event rundowns, wrote speaker intros, and secured institutional and venue permissions.',
      'Coordinated the anchoring team, stage crews, contestants, and event coordinators across simultaneous venues.',
      'Managed celebrity guests and VIP dignitaries backstage and conducted live on-stage protocol introductions.',
      'Directed live main-stage energy, microphone transitions, and dynamic crowd engagement during national-scale Nakshatra cultural fests.'
    ],
    focusAreas: [
      'Team Mentorship & Grooming',
      'Scriptwriting & Permissions',
      'Celebrity & VIP Coordination',
      'Multi-Venue Stage Direction',
      'Live Audience Crowd Dynamics'
    ],
    visualEvidence: {
      image: '/media/activities/anchoring/Nakshatra_25/WhatsApp Image 2026-09-14 at 00.37.50.jpeg',
      badge: 'STAGE LEADERSHIP · NAKSHATRA',
      caption: 'Leading live stage hosting in formal tuxedo under main auditorium lights at national-level Nakshatra Cultural Fest',
      secondaryImage: '/media/activities/anchoring/Nakshatra_26/IMG_0824.JPG',
      secondaryBadge: 'NATIONAL CULTURAL FESTIVAL',
      secondaryCaption: 'Backstage and on-stage live coordination during the Nakshatra cultural festival at Saintgits College of Engineering'
    }
  },
  {
    id: 'campus-radio-jockey-coordinator',
    num: '03',
    title: 'Campus Radio Jockey & Coordinator',
    domainCategory: 'Media & Vocal Broadcasting',
    organization: 'Campus Radio · Saintgits',
    period: '2022 – 2024',
    description: 'Involved for approximately two years: joined as an on-air RJ, hosted broadcasts, aired vocal recordings, and coordinated club operations, studio sessions, and collegiate audio programming.',
    responsibilities: [
      'Hosted on-air radio broadcasts and thematic shows, maintaining crisp voice delivery and listener engagement.',
      'Scripted episode concepts, conversational transitions, interview prompts, and audio segment cues.',
      'Managed audio recordings, studio session bookings, and acoustic console production timelines.',
      'Coordinated club activities, scheduling between student RJs, sound engineers, and campus departments.'
    ],
    focusAreas: [
      'On-Air Voice Delivery',
      'Scriptwriting & Narrative Flow',
      'Studio Recording Operations',
      'Broadcast Scheduling & Coordination'
    ],
    visualEvidence: {
      image: '/media/activities/campus-radio/WhatsApp Image 2026-09-14 at 01.05.29(1).jpeg',
      badge: 'STUDIO & BROADCAST OPERATIONS',
      caption: 'Live on-air vocal broadcasting and acoustic studio console coordination during campus radio transmissions'
    }
  }
];
