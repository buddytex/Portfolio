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
    domainCategory: 'Leadership',
    organization: 'Anchoring Club · Saintgits College of Engineering',
    period: '2023 – 2025',
    description: 'I groomed and led anchoring teams for Nakshatra Cultural Fest at Saintgits College of Engineering, a national-level cultural fest, coordinating stage operations, audience flow, anchoring teams, celebrity guests, and live event execution.',
    responsibilities: [
      'Groomed, trained, and directed collegiate anchoring teams for Nakshatra, a national-level cultural fest at Saintgits College of Engineering.',
      'Managed the main auditorium stage, run of show, microphone transitions, and minute-by-minute rundown flow.',
      'Commanded large-scale audience engagement and real-time crowd dynamics throughout high-energy sessions.',
      'Coordinated directly with celebrity guests and institutional VIP dignitaries for on-stage introductions and protocols.',
      'Spearheaded event coordination, team communication, and live execution contingency during peak show moments.'
    ],
    focusAreas: [
      'Team Leadership & Grooming',
      'Stage & Audience Management',
      'Celebrity Guest Coordination',
      'Stage Flow & Coordination',
      'Live Event Execution'
    ],
    visualEvidence: {
      image: '/media/activities/anchoring/Nakshatra_25/WhatsApp Image 2026-09-14 at 00.37.50.jpeg',
      badge: 'STAGE LEADERSHIP · NAKSHATRA',
      caption: 'Leading live stage hosting in formal tuxedo with warm gold auditorium lighting at national-level Nakshatra Cultural Fest',
      secondaryImage: '/media/achievements/certificates/1156ae7c-fc50-424e-af60-4bcc8e38810b_page-0001.jpg',
      secondaryBadge: 'BEST ANCHOR AWARD',
      secondaryCaption: 'Official Certificate of Recognition: Awarded Best Anchor for Nakshatra 2024 at Saintgits College of Engineering'
    }
  },
  {
    id: 'coordinator-campus-radio-jockey',
    num: '03',
    title: 'Coordinator of Campus Radio Jockey',
    domainCategory: 'Coordination / Communication',
    organization: 'Campus Radio',
    period: '2023 – 2024',
    description: 'Operational coordination for campus radio broadcasting sessions, show schedules, and talent operations.',
    responsibilities: [
      'Managed broadcasting rosters, studio session bookings, and programming timelines.',
      'Coordinated between radio jockeys, technical sound operators, and campus departments.',
      'Facilitated recorded and live segment production workflows and acoustic studio setup.'
    ],
    focusAreas: [
      'Operations Coordination',
      'Broadcast Scheduling',
      'Team Liaison',
      'Show Management'
    ],
    visualEvidence: {
      image: '/media/activities/campus-radio/WhatsApp Image 2026-09-14 at 01.05.29(1).jpeg',
      badge: 'STUDIO OPERATIONS',
      caption: 'Managing broadcast studio programming, studio microphone setup, and acoustic console production'
    }
  },
  {
    id: 'radio-jockey',
    num: '04',
    title: 'Radio Jockey',
    domainCategory: 'Communication / Media',
    organization: 'Campus Radio',
    period: '2022 – 2024',
    description: 'On-air broadcasting, vocal delivery, and live listener engagement across campus transmissions.',
    responsibilities: [
      'Hosted on-air radio segments, curated campus announcements, and presented thematic shows.',
      'Scripted episode concepts, conversational transitions, and interactive segment cues.',
      'Maintained consistent voice modulation, pacing, and clear verbal communication.'
    ],
    focusAreas: [
      'On-Air Broadcasting',
      'Voice Modulation',
      'Scriptwriting',
      'Audience Engagement'
    ],
    visualEvidence: {
      image: '/media/activities/campus-radio/WhatsApp Image 2026-09-14 at 01.05.29(1).jpeg',
      badge: 'ON-AIR BROADCASTING',
      caption: 'Live on-air voice delivery and thematic storytelling over collegiate radio transmitters'
    }
  }
];
