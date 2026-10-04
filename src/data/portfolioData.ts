import { CaseStudy } from '../types';

export const HN_LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1UMMdJb9E5WSK4bORqxnLkKwPxMNR03bnuE3hS9H5vu_LngOpQaYZTxF8_cPK5006n4Ven2AyuzcvgZ2q2uuv3CGWTNE3wI1vSSL2A58Qh99JZByM-STS51P27x_pL4hxg85R5lRTp2tnIY7J__sTewx4OJ45MCTOdB7ZrdLKcHP4fVoeIZ6XSHsMRt65cWXUw12XAhCPgip39XfXa1mBH9HUwK0QB6Nz6hOrxPV0UcLwjWjhp9_x3oZPA';

export const HN_AVATAR_URL = 'https://avatars.githubusercontent.com/u/236408819?v=4';
export const HN_AVATAR_FALLBACK = '/hari-avatar.png';

export const HARI_CONTACT = {
  name: 'Hari Bahadur Narzary',
  title: 'Web Dev Architect & Full-Stack Engineer',
  email: 'harinarzary22@gmail.com',
  github: 'https://github.com/webdevhari20',
  githubHandle: 'webdevhari20',
  linkedin: 'https://linkedin.com/in/hari583/',
  linkedinHandle: 'in/hari583',
  location: 'Assam, India (Global Remote)',
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'bakehouse',
    number: 'BUILD_01',
    category: 'E-COMMERCE',
    badge: '+180% WEEKEND ORDERS',
    badgeType: 'primary',
    title: 'Artisan Bakehouse & Cafe',
    location: 'San Francisco, CA',
    description: 'Engineered a bespoke local ordering portal with a live time-slot inventory engine, Stripe checkout, and localized neighborhood SEO. Eliminated costly 3rd-party marketplace commissions and streamlined morning rush-hour pickup schedules.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYniJb4ad1JQdgVVzNjKKKI5HSPmdEV8s9xrel0BJchbG6K_2R4mytVp1D-djV0Y2qv6-tFs_q6VY4n1vo7hgB2R2t1zsuLwUn5iAmTovwgrpDNCcfeln9vFS9tiStHHh4GLUuN_7MVxAdNW7kObs90t9quM3WtGKNzSSPU4--JibBj7gMsuf8d0DdyTHcy0vM9JbevysQ9LektqwM2FMOGO5auw95byVpGRgoQXKUIq4U87g0By9A',
    altText: 'Modern artisanal bakery and sourdough cafe website interface preview',
    tags: ['Next.js', 'Stripe API', 'Tailwind'],
    metrics: '+180% Weekend Orders • 0.6s FCP',
    deliveryTimeline: '10 CALENDAR DAYS',
    actionText: 'EXPLORE ARCHITECTURE',
    details: {
      client: 'Hearth & Crumb Bakery',
      industry: 'Artisanal Food & Hospitality',
      challenge: 'The client was losing 28% in commission fees to third-party delivery apps. Their existing WordPress site crashed during holiday morning ordering rush.',
      solution: 'Built a headless Next.js 14 web app connected to a real-time inventory management engine. Implemented slot-based local pickup, Apple Pay / Google Pay one-tap checkout, and automated SMS receipt alerts.',
      impact: [
        '+180% surge in direct online pre-orders within 30 days',
        '$14,200 saved in marketplace commissions during Q4 alone',
        'Lighthouse mobile performance went from 38/100 to 99/100'
      ],
      lighthouse: {
        performance: 99,
        accessibility: 100,
        bestPractices: 100,
        seo: 100
      },
      techStack: ['Next.js 14 App Router', 'Tailwind CSS v4', 'Stripe Elements', 'Upstash Redis Rate-limiting', 'Vercel Edge Functions']
    }
  },
  {
    id: 'fitness',
    number: 'BUILD_02',
    category: 'HYBRID_BOOKING_SYS',
    badge: 'CONVERSION 4.1X',
    badgeType: 'secondary',
    title: 'Apex Fitness & Training',
    location: 'Portland, OR',
    description: 'High-conversion sales funnel paired with an automated client onboarding quiz that syncs direct to trainer calendars. Replaced unorganized email chains with real-time class booking.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoKzAeTMHmornbbbUCg1QoQt5g2Mr4UJycRtRfrtWIYf_S9jnTCmRilcPE-SO-8Gj--HzXZ2vEJL3ST-A8P5yiaOZ7m0I155gz-fx2a50C9DreHGCtolWUZ6hX1AClr1m76BODZzMrzxzc0Wh6K2qLAUzLKwHe7BXKfvdpI_q9xrAREJozetISPcsozdTHsUpfPkGq_RLdhRpasSda-kUz57-xrBxogxiWcbJ7nQxDEM81h_GJCqVp',
    altText: 'Athletic gym and personal training mobile web app interface with schedule booking',
    tags: ['React', 'Supabase Auth'],
    metrics: '4.1x Higher Member Conversion • Sub-second load',
    deliveryTimeline: '12 CALENDAR DAYS',
    actionText: 'SPECS',
    details: {
      client: 'Apex Athletic Club',
      industry: 'Boutique Fitness & Performance',
      challenge: 'Manual Google Sheets scheduling created double-bookings and heavy admin overhead. Prospective members dropped off during lengthy contact forms.',
      solution: 'Designed an interactive onboarding quiz calculating personalized training tracks with instant Cal.com/Google Calendar sync, automated recurring membership deposits, and a member dashboard.',
      impact: [
        '4.1x increase in trial pass bookings within 6 weeks',
        'Admin scheduling hours cut from 14 hrs/week to under 30 minutes',
        'Zero drop-off mobile booking flow with instant biometric assessment'
      ],
      lighthouse: {
        performance: 98,
        accessibility: 100,
        bestPractices: 96,
        seo: 100
      },
      techStack: ['React 19', 'Supabase Postgres & Auth', 'Cal.com API', 'Tailwind CSS', 'Framer Motion']
    }
  },
  {
    id: 'lumina',
    number: 'BUILD_03',
    category: 'HIGH_END_EDITORIAL',
    badge: 'WEBGL SMOOTH',
    badgeType: 'tertiary',
    title: 'Lumina Studio Architecture',
    location: 'San Francisco, CA',
    description: 'Ultra-slick portfolio engineered with sub-second image asset optimization, bespoke fluid transitions, and tactile hover physics. Won multiple design accolades while maintaining 100/100 performance index.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuOEEC31QAscBqjtJrT_xi0oSeq4n5EPCjw_hf7_ZSrFb2uvKO5BIrq7-2y5WKdPkA0fF7RdWQ1lsTD_-nHz8_6JCkpm3o1ah5jdAjrmADbhN3v8TDoYwpJTnNu57pylX_WlgG_qqoabHiWM7fV1Q0AN1G0xr-rYxtfGyggByESpDtt617uBcPmcPiF-9ccNXZ93nXXPxPVxuN4-sgNj8G0s2zSpfq5CW3CX1rvuCv-ED1-oKtjJlU',
    altText: 'Brutalist architectural concrete residential studio portfolio showcase website',
    tags: ['WebGL', 'Next.js 14'],
    metrics: '60FPS Transitions • 100/100 Lighthouse Performance',
    deliveryTimeline: '14 CALENDAR DAYS',
    actionText: 'LIVE PREVIEW',
    details: {
      client: 'Lumina Architectural Atelier',
      industry: 'Contemporary Architecture & Urban Design',
      challenge: 'High-resolution architectural photography slowed down their previous website, causing 6-second load times that drove away high-net-worth residential clients.',
      solution: 'Implemented progressive image hydration, GPU-accelerated WebGL smooth scroll canvas, interactive blueprint modal viewer, and headless Sanity CMS for easy project uploads.',
      impact: [
        'Average load time dropped from 6.2s to 0.45s globally',
        'Awarded Site of the Day in brutalist web design circles',
        '3 new commercial studio commissions landed via direct inquiry form'
      ],
      lighthouse: {
        performance: 100,
        accessibility: 100,
        bestPractices: 100,
        seo: 100
      },
      techStack: ['Next.js 14', 'Three.js / WebGL shaders', 'Sanity CMS', 'Lenis Smooth Scroll', 'Tailwind']
    }
  },
  {
    id: 'pulse',
    number: 'BUILD_04',
    category: 'URGENT_HEALTHCARE_PORTAL',
    badge: 'TRIAGE INTAKE ACTIVE',
    badgeType: 'primary',
    title: 'Pulse Veterinary Clinic',
    location: 'Austin, TX',
    description: 'Engineered an immediate triage intake form that alerts clinic staff instantly, plus an interactive appointment scheduler synced directly with their internal CRM. Boosted walk-in conversions by 95% via Google Local map integration.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLYGO3DKhPnsnWJJv2q9Y3F5VPMe4R1ohjBfKCJOBmJgEGa472B1mrUeoocXmrfdjUydMdtN_oVs62wEEGnFMNg2EODLmQai68Vv8xNsSVOJULIt0r81wR0tvL4LImviFZRGmxRe-SmSV3a4vxjZqLOw152ssWn3KrGafXHFTYvvKJ7HMTtWhhSf3YDRa6AiGN3UuXdCkgoPAC5-1E0ZY5MjoyhBVp2I6iulWPgb0DgdGFgjVhASxn',
    altText: 'Veterinary clinic website UI with emergency pet intake scheduler and map',
    tags: ['Tailwind', 'Vercel Edge', 'Google Maps API'],
    metrics: '+95% Urgent Intake Bookings • Zero Crash SLA',
    deliveryTimeline: '10 CALENDAR DAYS',
    actionText: 'CASE TELEMETRY',
    details: {
      client: 'Pulse Emergency Animal Hospital',
      industry: 'Veterinary & Emergency Healthcare',
      challenge: 'Distressed pet owners could not quickly find emergency hours or symptoms intake on mobile. Phone lines were jammed with routine appointment questions.',
      solution: 'Engineered an emergency triage wizard with 1-tap dispatch to on-call vets, integrated Google Maps live directions, and insurance verification workflows.',
      impact: [
        '+95% increase in online emergency admissions before arrival',
        'Phone queue congestion reduced by 60%',
        'Ranked #1 on Google Local Map Pack across metropolitan area'
      ],
      lighthouse: {
        performance: 99,
        accessibility: 98,
        bestPractices: 100,
        seo: 100
      },
      techStack: ['Next.js', 'Vercel Edge KV', 'Google Maps Platform APIs', 'Twilio SMS Webhooks', 'Tailwind CSS']
    }
  }
];

export const TESTIMONIALS = [
  {
    quote: '“Hari rebuilt our local cafe site in 10 days. Online orders exploded immediately and the design is super fresh. Customers comment on how fast it loads constantly.”',
    author: 'SARAH K.',
    role: 'Owner, Bakehouse & Cafe',
    rating: 5,
    tag: '10-DAY SPRINT',
    initials: 'SK',
    accentColor: 'text-[#10e57a]'
  },
  {
    quote: '“Best freelance developer we ever hired. No agency jargon, delivers clean code on time, and our site loads in under a second. Our member signup rate literally quadrupled.”',
    author: 'RAJESH M.',
    role: 'Founder, Apex Fitness',
    rating: 5,
    tag: 'SUB-SECOND LOAD',
    initials: 'RM',
    accentColor: 'text-[#d0bcff]'
  },
  {
    quote: '“Our architecture firm finally has a website that matches our aesthetic standards. Hari is a magician with modern web tech. Highly recommended for any serious business.”',
    author: 'DAVID L.',
    role: 'Principal Architect, Lumina',
    rating: 5,
    tag: 'DESIGN-FORWARD',
    initials: 'DL',
    accentColor: 'text-[#ffb2ce]'
  }
];

export const SERVICES_LIST = [
  {
    id: 'mod_01',
    code: 'MOD_01 // GROWTH',
    volume: '5–8 CUSTOM PAGES',
    title: 'Small Business Marketing Site',
    description: 'Engineered for local organic discovery and high lead-conversion. Fully responsive, schema-structured for Google Maps, and built on zero-bloat modern stacks.',
    tags: ['Lead Capture Engine', 'Local Map Pack SEO', 'Sub-second Load'],
    color: 'text-[#10e57a]'
  },
  {
    id: 'mod_02',
    code: 'MOD_02 // RETAIL',
    volume: 'SHOPIFY / STRIPE',
    title: 'Modern E-Commerce & Storefronts',
    description: 'Eliminate checkout abandonment with ultra-responsive headless Shopify setups and instant single-tap payment funnels that outperform stock themes.',
    tags: ['Headless Cart', 'Instant Filter Sort', 'Apple Pay Ready'],
    color: 'text-[#d0bcff]'
  },
  {
    id: 'mod_03',
    code: 'MOD_03 // OPS',
    volume: 'AUTOMATED BOOKINGS',
    title: 'Service Booking & Appointments',
    description: 'Direct calendar synchronizations (Cal.com / Google Calendar) coupled with upfront deposit gateways and automatic SMS reminders for salons, clinics, and studios.',
    tags: ['Cal.com Integration', 'Deposit Paywall', 'Automated Alerts'],
    color: 'text-[#10e57a]'
  },
  {
    id: 'mod_04',
    code: 'MOD_04 // RESCUE',
    volume: 'REBUILD & SPEED',
    title: 'Website Redesign & Speed Overhaul',
    description: 'Ditch slow, brittle WordPress or Wix builders. I safely export your brand equity into a blazingly swift, secure Next.js architecture with zero maintenance headache.',
    tags: ['WP to Next.js', 'Zero Plugin Vulnerabilities', 'SEO Retention'],
    color: 'text-[#ffb2ce]'
  }
];

export const FAQS = [
  {
    question: 'How does payment work?',
    answer: 'Standard structure is a 50/50 milestone agreement. Websites start from just $300. For standard projects, 50% invoice upfront locks your sprint slot and kicks off architecture and wireframing. The remaining 50% is only invoiced once the final staging site is fully reviewed and approved by you.'
  },
  {
    question: 'Do I own the code and assets?',
    answer: '100% full intellectual property and code ownership is transferred to your GitHub or repository host immediately after final invoice clearance. You receive repository access, production builds, and design assets with zero vendor lock-in or ongoing proprietary license fees.'
  },
  {
    question: 'What about website maintenance and hosting renewals?',
    answer: 'You have two flexible options: 1) Monthly Maintenance Care at ~₹10,000/mo (approx $99 – $100/mo in USD) where Hari manages speed audits, security updates, uptime, and content edits. 2) Zero Maintenance Fee ($0): If you do not need monthly maintenance, we transfer 100% full ownership to you. You can renew your hosting directly and maintain your website completely on your own with zero recurring charges.'
  },
  {
    question: 'Can my team update content later?',
    answer: 'Yes! Every business site is wired to a straightforward headless CMS (such as Sanity, Strapi, or Supabase Studio) tailored specifically to your marketing team’s day-to-day text, pricing, and image updates. Anyone on your team can edit content with zero coding knowledge.'
  },
  {
    question: 'What is your typical project timeline?',
    answer: 'Standard small business website builds wrap up in 10 to 14 calendar days from kickoff to deployment. Starter sites ($300–$1,200) can frequently launch within 7–10 business days. Week 1 is wireframing and design; Week 2 is custom coding, responsive testing, and zero-downtime DNS cutover.'
  }
];

export const TWIN_KNOWLEDGE_BASE: Record<string, { title: string; accent: string; content: string }> = {
  'what do you actually do?': {
    title: 'WHAT HARI DOES // CORE_OFFERING',
    accent: 'text-[#10e57a]',
    content: 'Hari crafts end-to-end modern web presences for growing businesses starting from just $300: bespoke Next.js marketing sites, lightning-fast Headless Shopify storefronts, local service booking apps, and headless CMS integrations. Everything is engineered with sub-second page loads, mobile fluidity, and technical SEO structure built from day zero.'
  },
  'what else can you do besides coding?': {
    title: 'PERIPHERAL CAPABILITIES // VALUE_ADD',
    accent: 'text-[#d0bcff]',
    content: 'Beyond raw engineering: Core Web Vitals performance tuning (95+ score audits), secure Stripe/Razorpay payment flows, domain registration & Cloudflare CDN setup, high-impact minimalist identity design, Google Business Schema integration, and monthly maintenance options with direct developer access.'
  },
  'when are you available to start?': {
    title: 'CURRENT SCHEDULE // QUEUE_STATUS',
    accent: 'text-[#10e57a]',
    content: 'Hari has 1 client slot open for the cycle starting this coming Monday! Typical small business marketing websites wrap up in 7 to 14 business days from scope confirmation.'
  },
  'how much does a website cost?': {
    title: 'PRICING ARCHITECTURE // STARTING AT $300',
    accent: 'text-[#d0bcff]',
    content: 'Websites start from just $300! Starter websites range between $300 – $1,200 for clean, ultra-fast 1–5 section marketing presences. Growth e-commerce and booking platforms run between $1,200 – $2,800, and full custom web apps start at $3,500+. Hari works strictly on fixed milestone quotes with zero hidden hourly creep.'
  },
  'how much does a small business website cost?': {
    title: 'PRICING ARCHITECTURE // STARTING AT $300',
    accent: 'text-[#d0bcff]',
    content: 'Websites start from just $300! Starter websites range between $300 – $1,200 for clean, ultra-fast 1–5 section marketing presences. Growth e-commerce and booking platforms run between $1,200 – $2,800, and full custom web apps start at $3,500+. Hari works strictly on fixed milestone quotes with zero hidden hourly creep.'
  },
  'timeline breakdown?': {
    title: 'TIMELINE & SPRINT PHASES',
    accent: 'text-[#10e57a]',
    content: 'Week 1: Wireframing, visual direction, brand asset ingesting, and core architecture build. Week 2: Content population, responsive cross-device testing, payment gateway tests, and zero-downtime DNS cutover.'
  },
  'monthly retainers?': {
    title: 'MAINTENANCE & RETAINER OPTIONS',
    accent: 'text-[#d0bcff]',
    content: 'We offer two clear choices for maintenance:\n1) Dedicated Care: ~₹10,000/month (which in dollars is around $99 or $100/mo) covering continuous security patches, speed audits, uptime monitoring, and content updates.\n2) Zero Maintenance Fee ($0): If you do not need maintenance, we give 100% full ownership to you. You can renew your hosting, website, and maintain it on your own with no recurring fees.'
  },
  'maintenance options?': {
    title: 'MAINTENANCE & OWNERSHIP TERMS',
    accent: 'text-[#10e57a]',
    content: 'If you want maintenance, the charge is ~10k per month (in dollars that is $99 or $100/mo) for security, speed audits, and updates. Or, if you don’t need maintenance, you pay $0! We hand over 100% ownership to you—you can renew your hosting and maintain your website on your own.'
  },
  'what about maintenance and ownership?': {
    title: 'MAINTENANCE & OWNERSHIP TERMS',
    accent: 'text-[#10e57a]',
    content: 'Maintenance charge is ~10k/month (which is $99 or $100 in dollars). However, there is another option: if you don’t need any maintenance, we give 100% full ownership to the client. You can renew your hosting, domain, and website, and maintain everything on your own with zero ongoing fees.'
  },
  'wordpress to next.js migration?': {
    title: 'WP TO NEXT.JS MIGRATION',
    accent: 'text-[#10e57a]',
    content: 'Absolutely. Hari frequently executes seamless WordPress migrations starting from $300: preserving existing URL slugs & SEO equity while delivering a 4x increase in mobile page speed and stripping away fragile plugin vulnerabilities.'
  },
  'hosting & domains?': {
    title: 'INFRASTRUCTURE, HOSTING & RENEWALS',
    accent: 'text-[#e3e1e9]',
    content: 'Hari deploys production sites to Vercel or AWS edge networks paired with Cloudflare DNS. Clients maintain 100% full root ownership of their domains, repositories, and hosting accounts, allowing easy self-renewal or optional maintenance at ~$99–$100/mo (~10k INR).'
  }
};
