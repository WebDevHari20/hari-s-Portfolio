export type ActiveTab = 'work' | 'twin' | 'book';

export type VibeTheme =
  | 'neo-acid'
  | 'cyber-violet'
  | 'clean-matrix'
  | 'mono-noir'
  | 'retro-cyberpunk'
  | 'tokyo-night';

export type DensityMode = 'DEV' | 'NEO' | 'MIN';

export interface CaseStudy {
  id: string;
  number: string;
  category: string;
  badge: string;
  badgeType: 'primary' | 'secondary' | 'tertiary';
  title: string;
  location?: string;
  description: string;
  image: string;
  altText: string;
  tags: string[];
  metrics: string;
  deliveryTimeline: string;
  actionText: string;
  details: {
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    impact: string[];
    lighthouse: {
      performance: number;
      accessibility: number;
      bestPractices: number;
      seo: number;
    };
    techStack: string[];
  };
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user' | 'system';
  timestamp: string;
  tag?: string;
  text?: string;
  isStructuredReport?: boolean;
  structuredData?: {
    sections: {
      num: string;
      title: string;
      type: string;
      accent: 'primary' | 'secondary' | 'tertiary';
      description: string;
      chips?: string[];
      listItems?: { icon: string; text: string }[];
      callout?: string;
    }[];
  };
}

export interface BookingFormState {
  projectType: string;
  timeline: string;
  budgetTier: string;
  businessName: string;
  contactName: string;
  contactHandle: string;
  currentSite: string;
  projectLore: string;
}
