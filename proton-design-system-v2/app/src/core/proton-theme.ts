// ============================================================
// Proton Design System - Theme Configuration v2.0
// Source: Proton Figma component update, June 2026
// Brand UI direction: Kanit typography, light editorial canvas,
// angled controls, black/white interaction system with crimson badges.
// ============================================================

import type { BaselineTokens, SemanticTokens, Theme } from './tokens';
import { SCALE_STEPS } from './tokens';

// ========== PROTON CORE PALETTE ==========
export const PROTON_DARK_GREEN = '#004259';
export const PROTON_BLUE = '#125488';
export const PROTON_DEEP_BLUE = '#18273B';
export const PROTON_CRIMSON = '#590103';
export const PROTON_SLATE_BLUE = '#4C5C80';
export const PROTON_GREEN = '#249399';

export const PROTON_WHITE = '#FFFFFF';
export const PROTON_GRAY_2 = '#F9F9F9';
export const PROTON_GRAY_3 = '#F3F3F3';
export const PROTON_GRAY_4 = '#E3E3E3';
export const PROTON_GRAY_5 = '#D3D3D3';
export const PROTON_GRAY_6 = '#B3B3B3';
export const PROTON_GRAY_7 = '#979899';
export const PROTON_GRAY_8 = '#666666';
export const PROTON_GRAY_9 = '#313131';
export const PROTON_BLACK = '#000000';

// Backward compatible aliases for the original app structure.
export const PROTON_RED = PROTON_CRIMSON;
export const PROTON_SILVER = PROTON_GRAY_7;
export const PROTON_LIGHT_GRAY = PROTON_GRAY_3;

export const PROTON_PRIMARY_PALETTE = [
  { name: 'Dark Green', token: 'dark-green', hex: PROTON_DARK_GREEN, usage: 'Automotive depth, dark hero overlays, premium surface accents' },
  { name: 'Blue', token: 'blue', hex: PROTON_BLUE, usage: 'Digital navigation, links, information highlights' },
  { name: 'Deep Blue', token: 'deep-blue', hex: PROTON_DEEP_BLUE, usage: 'Header depth, footer surfaces, formal enterprise sections' },
  { name: 'Crimson', token: 'crimson', hex: PROTON_CRIMSON, usage: 'Brand emphasis, NEW badge, error states where red is required' },
  { name: 'Slate Blue', token: 'slate-blue', hex: PROTON_SLATE_BLUE, usage: 'Secondary panels, data sections, subdued blocks' },
  { name: 'Green', token: 'green', hex: PROTON_GREEN, usage: 'Supportive highlights and selected contextual UI' },
];

export const PROTON_GRAY_SCALE = [
  PROTON_WHITE, PROTON_GRAY_2, PROTON_GRAY_3, PROTON_GRAY_4, PROTON_GRAY_5,
  PROTON_GRAY_6, PROTON_GRAY_7, PROTON_GRAY_8, PROTON_GRAY_9, PROTON_BLACK,
  '#000000'
];

// Keep an 11-step primary scale for token preview and export compatibility.
export const PROTON_RED_SCALE = [
  '#FFF1F1', '#F8D7D7', '#E9AAAA', '#D27A7A', '#AA3B3B',
  PROTON_CRIMSON, '#470102', '#350102', '#240001', '#120000', '#000000'
];

export const PROTON_SUCCESS_SCALE = [
  '#E9F7F7', '#CFEDED', '#A6DEDF', '#79CBCE', '#4CB7BA',
  PROTON_GREEN, '#1E7D81', '#185F63', '#124246', '#0B282B', '#051315'
];

export const PROTON_WARNING_SCALE = [
  '#FFF9E6', '#FFF0B8', '#FFE58A', '#FFD55C', '#F8BE2D',
  '#D99A00', '#A97600', '#7A5300', '#4A3200', '#271900', '#120B00'
];

export const PROTON_DANGER_SCALE = PROTON_RED_SCALE;

export const PROTON_INFO_SCALE = [
  '#E8F3FA', '#C9E2F1', '#9CCBE4', '#6DB0D3', '#3F92BF',
  PROTON_BLUE, '#0F446F', '#0B3455', '#07253D', '#041727', '#020C15'
];

export const PROTON_TYPOGRAPHY_DESKTOP = [
  { name: 'H1', size: '40px', lineHeight: '60px', letterSpacing: '0', weight: 700, usage: 'Bold display, home page masthead' },
  { name: 'H2', size: '28px', lineHeight: '42px', letterSpacing: '0', weight: 700, usage: 'Page headers' },
  { name: 'H3', size: '24px', lineHeight: '36px', letterSpacing: '0', weight: 500, usage: 'Prominent sub-headers, section headers' },
  { name: 'H4', size: '16px', lineHeight: '24px', letterSpacing: '0', weight: 400, usage: 'Paragraphs and control text' },
  { name: 'H5', size: '14px', lineHeight: '21px', letterSpacing: '0', weight: 400, usage: 'Captions, breadcrumbs, footer links' },
];

export const PROTON_TYPOGRAPHY_MOBILE = [
  { name: 'H1', size: '28px', lineHeight: '42px', letterSpacing: '0', weight: 700, usage: 'Bold display, mobile masthead' },
  { name: 'H2', size: '24px', lineHeight: '36px', letterSpacing: '0', weight: 500, usage: 'Mobile page headers' },
  { name: 'H3', size: '16px', lineHeight: '24px', letterSpacing: '0', weight: 400, usage: 'Mobile prominent sub-headers' },
  { name: 'H4', size: '14px', lineHeight: '21px', letterSpacing: '0', weight: 400, usage: 'Mobile paragraphs' },
  { name: 'H5', size: '12px', lineHeight: '18px', letterSpacing: '0', weight: 400, usage: 'Mobile captions and compact UI' },
];

// ========== PROTON BASELINE TOKENS ==========
export function createProtonBaseline(): BaselineTokens {
  return {
    colors: {
      primary: PROTON_RED_SCALE,
      neutral: PROTON_GRAY_SCALE,
      success: PROTON_SUCCESS_SCALE,
      warning: PROTON_WARNING_SCALE,
      danger: PROTON_DANGER_SCALE,
      info: PROTON_INFO_SCALE,
    },
    radius: {
      xs: '0px',
      sm: '0px',
      md: '2px',
      lg: '4px',
      xl: '9999px',
    },
    shadow: {
      sm: '0 2px 8px rgba(0,0,0,0.08)',
      md: '0 8px 24px rgba(0,0,0,0.12)',
      lg: '0 18px 48px rgba(0,0,0,0.16)',
    },
    typography: {
      fontSans: 'Kanit, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontMono: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace',
      scale: {
        'h1':    { size: '40px', lineHeight: '60px', letterSpacing: '0', weight: 700 },
        'h2':    { size: '28px', lineHeight: '42px', letterSpacing: '0', weight: 700 },
        'h3':    { size: '24px', lineHeight: '36px', letterSpacing: '0', weight: 500 },
        'h4':    { size: '16px', lineHeight: '24px', letterSpacing: '0', weight: 400 },
        'h5':    { size: '14px', lineHeight: '21px', letterSpacing: '0', weight: 400 },
        'mobile-h1': { size: '28px', lineHeight: '42px', letterSpacing: '0', weight: 700 },
        'mobile-h2': { size: '24px', lineHeight: '36px', letterSpacing: '0', weight: 500 },
        'mobile-h3': { size: '16px', lineHeight: '24px', letterSpacing: '0', weight: 400 },
        'mobile-h4': { size: '14px', lineHeight: '21px', letterSpacing: '0', weight: 400 },
        'mobile-h5': { size: '12px', lineHeight: '18px', letterSpacing: '0', weight: 400 },
      },
    },
  };
}

// ========== SEMANTIC TOKENS - LIGHT MODE DEFAULT ==========
export function createProtonLightSemantic(): SemanticTokens {
  return {
    'bg': PROTON_WHITE,
    'bg-subtle': PROTON_GRAY_2,
    'bg-muted': PROTON_GRAY_3,
    'surface': PROTON_WHITE,
    'surface-elevated': PROTON_WHITE,
    'border': PROTON_GRAY_5,
    'border-strong': PROTON_BLACK,
    'fg': PROTON_BLACK,
    'fg-muted': PROTON_GRAY_8,
    'fg-subtle': PROTON_GRAY_7,
    'accent': PROTON_BLACK,
    'accent-fg': PROTON_WHITE,
    'accent-hover': PROTON_GRAY_9,
    'accent-subtle': PROTON_GRAY_3,
    'danger': PROTON_CRIMSON,
    'danger-fg': PROTON_WHITE,
    'success': PROTON_GREEN,
    'success-fg': PROTON_WHITE,
    'warning': '#D99A00',
    'warning-fg': PROTON_BLACK,
    'info': PROTON_BLUE,
    'info-fg': PROTON_WHITE,
  };
}

export function createProtonDarkSemantic(): SemanticTokens {
  return {
    'bg': PROTON_BLACK,
    'bg-subtle': '#0B0B0B',
    'bg-muted': PROTON_GRAY_9,
    'surface': '#111111',
    'surface-elevated': '#181818',
    'border': PROTON_GRAY_8,
    'border-strong': PROTON_WHITE,
    'fg': PROTON_WHITE,
    'fg-muted': PROTON_GRAY_6,
    'fg-subtle': PROTON_GRAY_7,
    'accent': PROTON_WHITE,
    'accent-fg': PROTON_BLACK,
    'accent-hover': PROTON_GRAY_4,
    'accent-subtle': 'rgba(255,255,255,0.12)',
    'danger': '#E00012',
    'danger-fg': PROTON_WHITE,
    'success': PROTON_GREEN,
    'success-fg': PROTON_WHITE,
    'warning': '#F8BE2D',
    'warning-fg': PROTON_BLACK,
    'info': PROTON_BLUE,
    'info-fg': PROTON_WHITE,
  };
}

export const PROTON_LIGHT_THEME: Theme = {
  name: 'Proton Light',
  mode: 'light',
  baseline: createProtonBaseline(),
  semantic: createProtonLightSemantic(),
};

export const PROTON_DARK_THEME: Theme = {
  name: 'Proton Dark',
  mode: 'dark',
  baseline: createProtonBaseline(),
  semantic: createProtonDarkSemantic(),
};

export const PROTON_TOKEN_CATEGORIES = [
  {
    id: 'backgrounds',
    label: 'Backgrounds & Surfaces',
    description: 'Page backgrounds, containers, and elevation layers',
    tokens: [
      { name: 'bg', description: 'Page background', tailwindUtility: 'bg-[var(--proton-bg)]', category: 'background' as const },
      { name: 'bg-subtle', description: 'Subtle section background', tailwindUtility: 'bg-[var(--proton-bg-subtle)]', category: 'background' as const },
      { name: 'bg-muted', description: 'Muted fills and disabled backgrounds', tailwindUtility: 'bg-[var(--proton-bg-muted)]', category: 'background' as const },
      { name: 'surface', description: 'Standard component surface', tailwindUtility: 'bg-[var(--proton-surface)]', category: 'background' as const },
      { name: 'surface-elevated', description: 'Floating surfaces such as menus and dialogs', tailwindUtility: 'bg-[var(--proton-surface-elevated)]', category: 'background' as const },
    ],
  },
  {
    id: 'borders',
    label: 'Borders',
    description: 'Border colors for controls and section separation',
    tokens: [
      { name: 'border', description: 'Default control border', tailwindUtility: 'border-[var(--proton-border)]', category: 'border' as const },
      { name: 'border-strong', description: 'Focus and selected border', tailwindUtility: 'border-[var(--proton-border-strong)]', category: 'border' as const },
    ],
  },
  {
    id: 'foregrounds',
    label: 'Foreground Text',
    description: 'Text colors at different emphasis levels',
    tokens: [
      { name: 'fg', description: 'Primary text', tailwindUtility: 'text-[var(--proton-fg)]', category: 'foreground' as const },
      { name: 'fg-muted', description: 'Secondary text and labels', tailwindUtility: 'text-[var(--proton-fg-muted)]', category: 'foreground' as const },
      { name: 'fg-subtle', description: 'Placeholder and tertiary text', tailwindUtility: 'text-[var(--proton-fg-subtle)]', category: 'foreground' as const },
    ],
  },
  {
    id: 'accents',
    label: 'Action Accent',
    description: 'Black/white action system with angled geometry',
    tokens: [
      { name: 'accent', description: 'Primary action fill', tailwindUtility: 'bg-[var(--proton-accent)]', category: 'accent' as const },
      { name: 'accent-fg', description: 'Text on primary action fill', tailwindUtility: 'text-[var(--proton-accent-fg)]', category: 'accent' as const },
      { name: 'accent-hover', description: 'Primary action hover', tailwindUtility: 'hover:bg-[var(--proton-accent-hover)]', category: 'accent' as const },
      { name: 'accent-subtle', description: 'Subtle selected/hover background', tailwindUtility: 'bg-[var(--proton-accent-subtle)]', category: 'accent' as const },
    ],
  },
  {
    id: 'status',
    label: 'Status',
    description: 'Semantic status colors for feedback states',
    tokens: [
      { name: 'danger', description: 'Error and NEW badge red', tailwindUtility: 'bg-[var(--proton-danger)]', category: 'status' as const },
      { name: 'danger-fg', description: 'Text on danger fill', tailwindUtility: 'text-[var(--proton-danger-fg)]', category: 'status' as const },
      { name: 'success', description: 'Positive confirmation', tailwindUtility: 'bg-[var(--proton-success)]', category: 'status' as const },
      { name: 'success-fg', description: 'Text on success fill', tailwindUtility: 'text-[var(--proton-success-fg)]', category: 'status' as const },
      { name: 'warning', description: 'Caution state', tailwindUtility: 'bg-[var(--proton-warning)]', category: 'status' as const },
      { name: 'warning-fg', description: 'Text on warning fill', tailwindUtility: 'text-[var(--proton-warning-fg)]', category: 'status' as const },
      { name: 'info', description: 'Information state', tailwindUtility: 'bg-[var(--proton-info)]', category: 'status' as const },
      { name: 'info-fg', description: 'Text on info fill', tailwindUtility: 'text-[var(--proton-info-fg)]', category: 'status' as const },
    ],
  },
];

export function generateProtonCSS(theme: Theme, prefix: string = 'proton'): string {
  const lines: string[] = [];
  Object.entries(theme.baseline.colors).forEach(([name, scale]) => {
    scale.forEach((color, i) => {
      const step = SCALE_STEPS[i];
      lines.push(`  --${prefix}-color-${name}-${step}: ${color};`);
    });
  });
  lines.push('');
  Object.entries(theme.semantic).forEach(([name, value]) => {
    lines.push(`  --${prefix}-${name}: ${value};`);
  });
  lines.push('');
  Object.entries(theme.baseline.radius).forEach(([name, value]) => {
    lines.push(`  --${prefix}-radius-${name}: ${value};`);
  });
  lines.push('');
  Object.entries(theme.baseline.shadow).forEach(([name, value]) => {
    lines.push(`  --${prefix}-shadow-${name}: ${value};`);
  });
  lines.push('');
  lines.push(`  --${prefix}-font-family: ${theme.baseline.typography.fontSans};`);
  Object.entries(theme.baseline.typography.scale).forEach(([name, token]) => {
    lines.push(`  --${prefix}-type-${name}-size: ${token.size};`);
    lines.push(`  --${prefix}-type-${name}-line-height: ${token.lineHeight};`);
    lines.push(`  --${prefix}-type-${name}-weight: ${token.weight};`);
  });
  return lines.join('\n');
}
