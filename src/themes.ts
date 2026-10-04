import { VibeTheme } from './types';

export interface ThemeConfig {
  id: VibeTheme;
  name: string;
  shortName: string;
  tagline: string;
  primary: string;
  primaryHover: string;
  primaryContrast: string;
  primaryGlow: string;
  secondary: string;
  secondaryHover: string;
  secondaryContrast: string;
  tertiary: string;
  bgMain: string;
  bgCard: string;
  bgCardAlt: string;
  borderSubtle: string;
  borderStrong: string;
}

export const THEMES: Record<VibeTheme, ThemeConfig> = {
  'neo-acid': {
    id: 'neo-acid',
    name: 'Neo-Acid Streetwear',
    shortName: 'Neo-Acid',
    tagline: 'Acid Green & Electric Purple Neo-Brutalist',
    primary: '#10e57a',
    primaryHover: '#3df797',
    primaryContrast: '#003919',
    primaryGlow: 'rgba(16, 229, 122, 0.35)',
    secondary: '#571bc1',
    secondaryHover: '#6e27ec',
    secondaryContrast: '#ffffff',
    tertiary: '#ffb2ce',
    bgMain: '#121318',
    bgCard: '#1a1b21',
    bgCardAlt: '#0d0e13',
    borderSubtle: '#292a2f',
    borderStrong: '#10e57a',
  },
  'cyber-violet': {
    id: 'cyber-violet',
    name: 'Cyber Violet Synthwave',
    shortName: 'Cyber-Violet',
    tagline: 'Neon Violet & Electric Cyan',
    primary: '#a855f7',
    primaryHover: '#c084fc',
    primaryContrast: '#ffffff',
    primaryGlow: 'rgba(168, 85, 247, 0.35)',
    secondary: '#06b6d4',
    secondaryHover: '#22d3ee',
    secondaryContrast: '#083344',
    tertiary: '#f43f5e',
    bgMain: '#0e0c1a',
    bgCard: '#171429',
    bgCardAlt: '#0a0814',
    borderSubtle: '#2b2348',
    borderStrong: '#a855f7',
  },
  'clean-matrix': {
    id: 'clean-matrix',
    name: 'Clean Matrix Emerald',
    shortName: 'Clean Matrix',
    tagline: 'Hyper Terminal Emerald & Digital Sky',
    primary: '#00ff66',
    primaryHover: '#33ff85',
    primaryContrast: '#022c15',
    primaryGlow: 'rgba(0, 255, 102, 0.35)',
    secondary: '#0284c7',
    secondaryHover: '#0369a1',
    secondaryContrast: '#ffffff',
    tertiary: '#eab308',
    bgMain: '#070f0b',
    bgCard: '#0f1d16',
    bgCardAlt: '#040b07',
    borderSubtle: '#183426',
    borderStrong: '#00ff66',
  },
  'mono-noir': {
    id: 'mono-noir',
    name: 'Monochrome Noir',
    shortName: 'Mono Noir',
    tagline: 'High-Contrast White & Deep Obsidian',
    primary: '#ffffff',
    primaryHover: '#e4e4e7',
    primaryContrast: '#09090b',
    primaryGlow: 'rgba(255, 255, 255, 0.3)',
    secondary: '#71717a',
    secondaryHover: '#a1a1aa',
    secondaryContrast: '#ffffff',
    tertiary: '#ef4444',
    bgMain: '#09090b',
    bgCard: '#18181b',
    bgCardAlt: '#000000',
    borderSubtle: '#27272a',
    borderStrong: '#ffffff',
  },
  'retro-cyberpunk': {
    id: 'retro-cyberpunk',
    name: 'Retro Cyberpunk',
    shortName: 'Cyberpunk',
    tagline: 'Night City Amber Gold & Radioactive Orange',
    primary: '#fbbf24',
    primaryHover: '#fcd34d',
    primaryContrast: '#451a03',
    primaryGlow: 'rgba(251, 191, 36, 0.35)',
    secondary: '#ea580c',
    secondaryHover: '#f97316',
    secondaryContrast: '#ffffff',
    tertiary: '#e11d48',
    bgMain: '#0e0b08',
    bgCard: '#1d1712',
    bgCardAlt: '#080605',
    borderSubtle: '#33271e',
    borderStrong: '#fbbf24',
  },
  'tokyo-night': {
    id: 'tokyo-night',
    name: 'Tokyo Night Magenta',
    shortName: 'Tokyo Night',
    tagline: 'Akihabara Neon Pink & Electric Indigo',
    primary: '#ec4899',
    primaryHover: '#f472b6',
    primaryContrast: '#ffffff',
    primaryGlow: 'rgba(236, 72, 153, 0.35)',
    secondary: '#6366f1',
    secondaryHover: '#818cf8',
    secondaryContrast: '#ffffff',
    tertiary: '#06b6d4',
    bgMain: '#0c0e1b',
    bgCard: '#151930',
    bgCardAlt: '#070914',
    borderSubtle: '#23294c',
    borderStrong: '#ec4899',
  },
};

export const applyThemeToDom = (themeId: VibeTheme) => {
  const theme = THEMES[themeId] || THEMES['neo-acid'];
  const root = document.documentElement;

  // Set CSS Variables directly on root
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--primary-hover', theme.primaryHover);
  root.style.setProperty('--primary-contrast', theme.primaryContrast);
  root.style.setProperty('--primary-glow', theme.primaryGlow);
  root.style.setProperty('--secondary', theme.secondary);
  root.style.setProperty('--secondary-hover', theme.secondaryHover);
  root.style.setProperty('--secondary-contrast', theme.secondaryContrast);
  root.style.setProperty('--tertiary', theme.tertiary);
  root.style.setProperty('--bg-main', theme.bgMain);
  root.style.setProperty('--bg-card', theme.bgCard);
  root.style.setProperty('--bg-card-alt', theme.bgCardAlt);
  root.style.setProperty('--border-subtle', theme.borderSubtle);
  root.style.setProperty('--border-strong', theme.borderStrong);

  // Sync body and document background
  if (document.body) {
    document.body.style.backgroundColor = theme.bgMain;
  }
};
