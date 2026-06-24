// ============================================================
// Token System - Design Token definitions and architecture
// Based on PRIZM 4.0's two-layer system: Baseline + Semantic
// ============================================================

/** 
 * BASELINE TOKENS
 * Raw color scales, radii, shadows - the physical materials
 */
export interface BaselineTokens {
  // Color scales (50-950, 11 steps like Tailwind)
  colors: {
    primary: string[];    // Brand color scale
    neutral: string[];    // Gray/neutral scale  
    success: string[];    // Green scale
    warning: string[];    // Amber/orange scale
    danger: string[];     // Red scale
    info: string[];       // Blue/cyan scale
  };
  // Surface properties
  radius: {
    xs: string;  // 2px
    sm: string;  // 4px
    md: string;  // 6px
    lg: string;  // 8px
    xl: string;  // 12px
  };
  shadow: {
    sm: string;  // Subtle elevation
    md: string;  // Default elevation
    lg: string;  // Maximum elevation
  };
  typography: {
    fontSans: string;
    fontMono: string;
    scale: Record<string, { size: string; lineHeight: string; letterSpacing: string; weight: number }>;
  };
}

/**
 * SEMANTIC TOKENS
 * Meaning-based variables that map onto baseline tokens
 * These are theme-aware and change per variant
 */
export interface SemanticTokens {
  // Backgrounds & surfaces
  'bg': string;
  'bg-subtle': string;
  'bg-muted': string;
  'surface': string;
  'surface-elevated': string;
  
  // Borders
  'border': string;
  'border-strong': string;
  
  // Foreground (text)
  'fg': string;
  'fg-muted': string;
  'fg-subtle': string;
  
  // Accent (brand)
  'accent': string;
  'accent-fg': string;
  'accent-hover': string;
  'accent-subtle': string;
  
  // Status colors
  'danger': string;
  'danger-fg': string;
  'success': string;
  'success-fg': string;
  'warning': string;
  'warning-fg': string;
  'info': string;
  'info-fg': string;
}

/** Complete theme with both token layers */
export interface Theme {
  name: string;
  mode: 'light' | 'dark';
  baseline: BaselineTokens;
  semantic: SemanticTokens;
}

/** Token category for UI display */
export interface TokenCategory {
  id: string;
  label: string;
  description: string;
  tokens: TokenDefinition[];
}

export interface TokenDefinition {
  name: string;
  description: string;
  tailwindUtility: string;
  category: 'background' | 'border' | 'foreground' | 'accent' | 'status';
}

// ============================================================
// Token Catalog - Reference definitions
// ============================================================

export const TOKEN_CATEGORIES: TokenCategory[] = [
  {
    id: 'backgrounds',
    label: 'Backgrounds & Surfaces',
    description: 'Page backgrounds, containers, and elevation layers',
    tokens: [
      { name: 'bg', description: 'Page background', tailwindUtility: 'bg-[var(--ds-bg)]', category: 'background' },
      { name: 'bg-subtle', description: 'Slightly recessed background tier', tailwindUtility: 'bg-[var(--ds-bg-subtle)]', category: 'background' },
      { name: 'bg-muted', description: 'Muted fills — hovered rows, inactive states', tailwindUtility: 'bg-[var(--ds-bg-muted)]', category: 'background' },
      { name: 'surface', description: 'Cards, panels, standard container fill', tailwindUtility: 'bg-[var(--ds-surface)]', category: 'background' },
      { name: 'surface-elevated', description: 'Floating elements — popovers, dialogs', tailwindUtility: 'bg-[var(--ds-surface-elevated)]', category: 'background' },
    ],
  },
  {
    id: 'borders',
    label: 'Borders',
    description: 'Border colors for regions and controls',
    tokens: [
      { name: 'border', description: 'Default border between regions', tailwindUtility: 'border-[var(--ds-border)]', category: 'border' },
      { name: 'border-strong', description: 'Emphasised border for focus/selected', tailwindUtility: 'border-[var(--ds-border-strong)]', category: 'border' },
    ],
  },
  {
    id: 'foregrounds',
    label: 'Foreground (Text)',
    description: 'Text colors at different emphasis levels',
    tokens: [
      { name: 'fg', description: 'Primary body text — highest contrast', tailwindUtility: 'text-[var(--ds-fg)]', category: 'foreground' },
      { name: 'fg-muted', description: 'Secondary text — captions, descriptions', tailwindUtility: 'text-[var(--ds-fg-muted)]', category: 'foreground' },
      { name: 'fg-subtle', description: 'Tertiary text — metadata, placeholders', tailwindUtility: 'text-[var(--ds-fg-subtle)]', category: 'foreground' },
    ],
  },
  {
    id: 'accents',
    label: 'Accent (Brand)',
    description: 'Brand accent colors for primary actions',
    tokens: [
      { name: 'accent', description: 'Brand accent — buttons, links, highlights', tailwindUtility: 'bg-[var(--ds-accent)]', category: 'accent' },
      { name: 'accent-fg', description: 'Text rendered on accent fill', tailwindUtility: 'text-[var(--ds-accent-fg)]', category: 'accent' },
      { name: 'accent-hover', description: 'Hover state for accent elements', tailwindUtility: 'hover:bg-[var(--ds-accent-hover)]', category: 'accent' },
      { name: 'accent-subtle', description: 'Subtle accent tint — backgrounds, badges', tailwindUtility: 'bg-[var(--ds-accent-subtle)]', category: 'accent' },
    ],
  },
  {
    id: 'status',
    label: 'Status',
    description: 'Semantic status colors for feedback states',
    tokens: [
      { name: 'danger', description: 'Destructive actions, error states', tailwindUtility: 'bg-[var(--ds-danger)]', category: 'status' },
      { name: 'danger-fg', description: 'Text on danger fill', tailwindUtility: 'text-[var(--ds-danger-fg)]', category: 'status' },
      { name: 'success', description: 'Confirmation, positive state', tailwindUtility: 'bg-[var(--ds-success)]', category: 'status' },
      { name: 'success-fg', description: 'Text on success fill', tailwindUtility: 'text-[var(--ds-success-fg)]', category: 'status' },
      { name: 'warning', description: 'Caution, requires attention', tailwindUtility: 'bg-[var(--ds-warning)]', category: 'status' },
      { name: 'warning-fg', description: 'Text on warning fill', tailwindUtility: 'text-[var(--ds-warning-fg)]', category: 'status' },
      { name: 'info', description: 'Neutral informational state', tailwindUtility: 'bg-[var(--ds-info)]', category: 'status' },
      { name: 'info-fg', description: 'Text on info fill', tailwindUtility: 'text-[var(--ds-info-fg)]', category: 'status' },
    ],
  },
];

// ============================================================
// Default baseline values (PRIZM-inspired)
// ============================================================

export const DEFAULT_BASELINE: Omit<BaselineTokens, 'colors'> = {
  radius: {
    xs: '0.125rem',  // 2px
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
  },
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05), 0 1px 3px 0 rgb(0 0 0 / 0.08)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.08)',
  },
  typography: {
    fontSans: 'Inter, system-ui, -apple-system, sans-serif',
    fontMono: 'JetBrains Mono, ui-monospace, monospace',
    scale: {
      'xs':    { size: '0.75rem',  lineHeight: '1rem',    letterSpacing: '0.01em',  weight: 400 },
      'sm':    { size: '0.875rem', lineHeight: '1.25rem',  letterSpacing: '0',       weight: 400 },
      'base':  { size: '1rem',     lineHeight: '1.5rem',   letterSpacing: '-0.01em', weight: 400 },
      'lg':    { size: '1.125rem', lineHeight: '1.75rem',  letterSpacing: '-0.01em', weight: 400 },
      'xl':    { size: '1.25rem',  lineHeight: '1.75rem',  letterSpacing: '-0.02em', weight: 500 },
      '2xl':   { size: '1.5rem',   lineHeight: '2rem',     letterSpacing: '-0.02em', weight: 600 },
      '3xl':   { size: '1.875rem', lineHeight: '2.25rem',  letterSpacing: '-0.02em', weight: 600 },
      '4xl':   { size: '2.25rem',  lineHeight: '2.5rem',   letterSpacing: '-0.03em', weight: 700 },
      '5xl':   { size: '3rem',     lineHeight: '1.1',      letterSpacing: '-0.03em', weight: 700 },
    },
  },
};

// Scale step labels (50-950)
export const SCALE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
