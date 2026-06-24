// ============================================================
// Theme Generator Engine
// Input: brand color + config → Output: complete Theme object
// ============================================================

import {
  generateColorScale,
  generateNeutralScale,
  getForegroundColor,
  adjustLightness,
  parseColor,
  rgbToHsl,
  hslToRgb,
  rgbToHex,
} from './color-utils';
import {
  type Theme,
  type BaselineTokens,
  type SemanticTokens,
  DEFAULT_BASELINE,
  SCALE_STEPS,
} from './tokens';

export interface BrandConfig {
  brandName: string;
  brandColor: string;
  stylePreset?: 'vibrant' | 'corporate' | 'minimal' | 'warm' | 'cool';
}

export interface GeneratorOptions {
  darkMode?: boolean;
  highContrast?: boolean;
  saturationBoost?: number;
}

/** HSL to hex string helper */
function makeHslColor(h: number, s: number, l: number): string {
  return rgbToHex(hslToRgb({ h, s, l }));
}

/** Generate a complete color palette from brand color */
function generatePalette(
  brandColor: string,
  stylePreset: BrandConfig['stylePreset'] = 'vibrant'
) {
  const hsl = rgbToHsl(parseColor(brandColor));
  const hue = hsl.h;
  
  // Derive secondary hues based on preset
  const hueOffsets: Record<string, { success: number; warning: number; danger: number; info: number }> = {
    vibrant:   { success: 145, warning: 35,  danger: 355, info: 200 },
    corporate: { success: 145, warning: 38,  danger: 0,   info: 210 },
    minimal:   { success: 140, warning: 30,  danger: 0,   info: 200 },
    warm:      { success: 130, warning: 25,  danger: 350, info: 195 },
    cool:      { success: 150, warning: 40,  danger: 355, info: 205 },
  };
  
  const offsets = hueOffsets[stylePreset] || hueOffsets.vibrant;
  
  // Generate all scales
  const primaryScale = generateColorScale(brandColor, 11);
  const neutralScale = generateNeutralScale(hue, 11);
  
  // Derive semantic base colors from hue offsets
  const successBase = makeHslColor((hue + offsets.success) % 360, 65, 45);
  const warningBase = makeHslColor((hue + offsets.warning) % 360, 85, 55);
  const dangerBase  = makeHslColor((hue + offsets.danger) % 360,  75, 50);
  const infoBase    = makeHslColor((hue + offsets.info) % 360,    70, 50);
  
  return {
    primary: primaryScale,
    neutral: neutralScale,
    success: generateColorScale(successBase, 11),
    warning: generateColorScale(warningBase, 11),
    danger:  generateColorScale(dangerBase, 11),
    info:    generateColorScale(infoBase, 11),
  };
}

/** Build semantic tokens for light mode */
function buildLightSemantic(
  palette: BaselineTokens['colors'],
  _brandColor: string,
  _options?: GeneratorOptions
): SemanticTokens {
  return {
    // Backgrounds (light to dark)
    'bg':              palette.neutral[0],
    'bg-subtle':       palette.neutral[1],
    'bg-muted':        palette.neutral[2],
    'surface':         '#ffffff',
    'surface-elevated': '#ffffff',
    
    // Borders
    'border':          palette.neutral[4],
    'border-strong':   palette.neutral[6],
    
    // Foregrounds (dark text on light bg)
    'fg':              palette.neutral[10],
    'fg-muted':        palette.neutral[7],
    'fg-subtle':       palette.neutral[6],
    
    // Accent (brand)
    'accent':          palette.primary[5],
    'accent-fg':       getForegroundColor(palette.primary[5]),
    'accent-hover':    palette.primary[6],
    'accent-subtle':   palette.primary[1],
    
    // Status
    'danger':          palette.danger[5],
    'danger-fg':       getForegroundColor(palette.danger[5]),
    'success':         palette.success[5],
    'success-fg':      getForegroundColor(palette.success[5]),
    'warning':         palette.warning[5],
    'warning-fg':      getForegroundColor(palette.warning[5]),
    'info':            palette.info[5],
    'info-fg':         getForegroundColor(palette.info[5]),
  };
}

/** Build semantic tokens for dark mode */
function buildDarkSemantic(
  palette: BaselineTokens['colors'],
  _brandColor: string,
  _options?: GeneratorOptions
): SemanticTokens {
  return {
    // Backgrounds (dark to light)
    'bg':              palette.neutral[10],
    'bg-subtle':       palette.neutral[9],
    'bg-muted':        palette.neutral[8],
    'surface':         adjustLightness(palette.neutral[9], 3),
    'surface-elevated': adjustLightness(palette.neutral[8], 5),
    
    // Borders
    'border':          palette.neutral[7],
    'border-strong':   palette.neutral[5],
    
    // Foregrounds (light text on dark bg)
    'fg':              palette.neutral[0],
    'fg-muted':        palette.neutral[3],
    'fg-subtle':       palette.neutral[4],
    
    // Accent (brand, brighter in dark mode)
    'accent':          palette.primary[4],
    'accent-fg':       '#000000',
    'accent-hover':    palette.primary[3],
    'accent-subtle':   adjustLightness(palette.primary[8], -5),
    
    // Status (brighter in dark mode)
    'danger':          palette.danger[4],
    'danger-fg':       '#000000',
    'success':         palette.success[4],
    'success-fg':      '#000000',
    'warning':         palette.warning[4],
    'warning-fg':      '#000000',
    'info':            palette.info[4],
    'info-fg':         '#000000',
  };
}

/** Main entry point: generate complete theme from brand config */
export function generateTheme(
  config: BrandConfig,
  options: GeneratorOptions = {}
): { light: Theme; dark: Theme } {
  const { brandName, brandColor, stylePreset = 'vibrant' } = config;
  
  // Generate color palette from brand color
  const colors = generatePalette(brandColor, stylePreset);
  
  // Build baseline tokens
  const baseline: BaselineTokens = {
    ...DEFAULT_BASELINE,
    colors,
  };
  
  // Build semantic tokens for both modes
  const lightSemantic = buildLightSemantic(colors, brandColor, options);
  const darkSemantic = buildDarkSemantic(colors, brandColor, options);
  
  return {
    light: {
      name: `${brandName} Light`,
      mode: 'light',
      baseline,
      semantic: lightSemantic,
    },
    dark: {
      name: `${brandName} Dark`,
      mode: 'dark',
      baseline,
      semantic: darkSemantic,
    },
  };
}

/** Generate CSS custom properties from theme */
export function generateCSS(theme: Theme, prefix: string = 'ds'): string {
  const lines: string[] = [];
  
  // Baseline color scales
  Object.entries(theme.baseline.colors).forEach(([name, scale]) => {
    scale.forEach((color, i) => {
      const step = SCALE_STEPS[i];
      lines.push(`  --${prefix}-color-${name}-${step}: ${color};`);
    });
  });
  
  lines.push('');
  
  // Semantic tokens
  Object.entries(theme.semantic).forEach(([name, value]) => {
    const cssName = name.replace(/([A-Z])/g, '-$1').toLowerCase();
    lines.push(`  --${prefix}-${cssName}: ${value};`);
  });
  
  // Radii
  lines.push('');
  Object.entries(theme.baseline.radius).forEach(([name, value]) => {
    lines.push(`  --${prefix}-radius-${name}: ${value};`);
  });
  
  // Shadows
  lines.push('');
  Object.entries(theme.baseline.shadow).forEach(([name, value]) => {
    lines.push(`  --${prefix}-shadow-${name}: ${value};`);
  });
  
  return lines.join('\n');
}

/** Generate Tailwind config extension */
export function generateTailwindConfig(_theme: Theme, prefix: string = 'ds'): object {
  return {
    theme: {
      extend: {
        colors: {
          [prefix]: {
            bg: `var(--${prefix}-bg)`,
            'bg-subtle': `var(--${prefix}-bg-subtle)`,
            'bg-muted': `var(--${prefix}-bg-muted)`,
            surface: `var(--${prefix}-surface)`,
            'surface-elevated': `var(--${prefix}-surface-elevated)`,
            border: `var(--${prefix}-border)`,
            'border-strong': `var(--${prefix}-border-strong)`,
            fg: `var(--${prefix}-fg)`,
            'fg-muted': `var(--${prefix}-fg-muted)`,
            'fg-subtle': `var(--${prefix}-fg-subtle)`,
            accent: {
              DEFAULT: `var(--${prefix}-accent)`,
              fg: `var(--${prefix}-accent-fg)`,
              hover: `var(--${prefix}-accent-hover)`,
              subtle: `var(--${prefix}-accent-subtle)`,
            },
            danger: {
              DEFAULT: `var(--${prefix}-danger)`,
              fg: `var(--${prefix}-danger-fg)`,
            },
            success: {
              DEFAULT: `var(--${prefix}-success)`,
              fg: `var(--${prefix}-success-fg)`,
            },
            warning: {
              DEFAULT: `var(--${prefix}-warning)`,
              fg: `var(--${prefix}-warning-fg)`,
            },
            info: {
              DEFAULT: `var(--${prefix}-info)`,
              fg: `var(--${prefix}-info-fg)`,
            },
          },
        },
        borderRadius: {
          xs: `var(--${prefix}-radius-xs)`,
          sm: `var(--${prefix}-radius-sm)`,
          md: `var(--${prefix}-radius-md)`,
          lg: `var(--${prefix}-radius-lg)`,
          xl: `var(--${prefix}-radius-xl)`,
        },
        boxShadow: {
          sm: `var(--${prefix}-shadow-sm)`,
          md: `var(--${prefix}-shadow-md)`,
          lg: `var(--${prefix}-shadow-lg)`,
        },
      },
    },
  };
}
