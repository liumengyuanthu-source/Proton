// ============================================================
// Color Utilities - Core color manipulation engine
// Converts between color spaces, generates scales, calculates luminance
// ============================================================

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

/** Parse any common color format to RGB */
export function parseColor(input: string): RGB {
  const trimmed = input.trim();
  
  // Hex format
  if (trimmed.startsWith('#')) {
    let hex = trimmed.slice(1);
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (hex.length === 4) hex = hex.slice(0, 3).split('').map(c => c + c).join('') + hex.slice(3) + hex.slice(3);
    if (hex.length === 8) hex = hex.slice(0, 6);
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  }
  
  // RGB/RGBA format
  const rgbMatch = trimmed.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1]),
      g: parseInt(rgbMatch[2]),
      b: parseInt(rgbMatch[3]),
    };
  }
  
  // HSL format
  const hslMatch = trimmed.match(/hsl\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/i);
  if (hslMatch) {
    return hslToRgb({
      h: parseInt(hslMatch[1]),
      s: parseInt(hslMatch[2]),
      l: parseInt(hslMatch[3]),
    });
  }
  
  throw new Error(`Unsupported color format: ${input}`);
}

/** RGB to Hex */
export function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(Math.round(r))}${toHex(Math.round(g))}${toHex(Math.round(b))}`;
}

/** RGB to HSL */
export function rgbToHsl({ r, g, b }: RGB): HSL {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/** HSL to RGB */
export function hslToRgb({ h, s, l }: HSL): RGB {
  h /= 360; s /= 100; l /= 100;
  
  if (s === 0) {
    const v = l * 255;
    return { r: v, g: v, b: v };
  }
  
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  
  return {
    r: Math.round(hue2rgb(p, q, h + 1/3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1/3) * 255),
  };
}

/** Calculate relative luminance (WCAG formula) */
export function getLuminance({ r, g, b }: RGB): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/** Get contrast ratio between two colors */
export function getContrastRatio(color1: string, color2: string): number {
  const l1 = getLuminance(parseColor(color1));
  const l2 = getLuminance(parseColor(color2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Determine if text should be dark or light on a given background */
export function getForegroundColor(backgroundColor: string): '#000000' | '#ffffff' {
  const lum = getLuminance(parseColor(backgroundColor));
  return lum > 0.5 ? '#000000' : '#ffffff';
}

/** Generate a color scale from a base color (like Tailwind's 50-950 scale) */
export function generateColorScale(baseColor: string, steps: number = 11): string[] {
  const rgb = parseColor(baseColor);
  const hsl = rgbToHsl(rgb);
  
  const scale: string[] = [];
  // Generate from light (high luminosity) to dark (low luminosity)
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    // Lightness curve: ease-in-out for better perceptual distribution
    const lightness = 97 - t * t * 92; // 97% down to ~5%
    const saturation = Math.max(5, hsl.s * (1 - Math.abs(t - 0.3) * 0.5));
    
    const color = hslToRgb({
      h: hsl.h,
      s: Math.round(saturation),
      l: Math.round(lightness),
    });
    scale.push(rgbToHex(color));
  }
  
  return scale;
}

/** Generate a neutral scale (gray) from a base hue for subtle tinting */
export function generateNeutralScale(hue: number, steps: number = 11): string[] {
  const scale: string[] = [];
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const lightness = 98 - t * 94;
    const saturation = 3 + Math.sin(t * Math.PI) * 4; // Subtle chromatic variation
    
    const color = hslToRgb({
      h: hue,
      s: Math.round(saturation),
      l: Math.round(lightness),
    });
    scale.push(rgbToHex(color));
  }
  return scale;
}

/** Blend two colors */
export function blendColors(color1: string, color2: string, ratio: number): string {
  const c1 = parseColor(color1);
  const c2 = parseColor(color2);
  return rgbToHex({
    r: Math.round(c1.r * (1 - ratio) + c2.r * ratio),
    g: Math.round(c1.g * (1 - ratio) + c2.g * ratio),
    b: Math.round(c1.b * (1 - ratio) + c2.b * ratio),
  });
}

/** Adjust color lightness */
export function adjustLightness(color: string, delta: number): string {
  const rgb = parseColor(color);
  const hsl = rgbToHsl(rgb);
  return rgbToHex(hslToRgb({
    h: hsl.h,
    s: hsl.s,
    l: Math.max(0, Math.min(100, hsl.l + delta)),
  }));
}

/** Adjust color saturation */
export function adjustSaturation(color: string, delta: number): string {
  const rgb = parseColor(color);
  const hsl = rgbToHsl(rgb);
  return rgbToHex(hslToRgb({
    h: hsl.h,
    s: Math.max(0, Math.min(100, hsl.s + delta)),
    l: hsl.l,
  }));
}

/** Generate CSS custom property string */
export function toCssVar(name: string, value: string): string {
  return `--${name}: ${value};`;
}

/** Generate HSL CSS value from hex */
export function hexToHslValue(hex: string): string {
  const hsl = rgbToHsl(parseColor(hex));
  return `${hsl.h} ${hsl.s}% ${hsl.l}%`;
}
