import { useState } from 'react';
import { generateProtonCSS, PROTON_RED } from '../core/proton-theme';
import type { Theme } from '../core/tokens';

interface ExportPanelProps {
  lightTheme: Theme;
  darkTheme: Theme;
  brandName: string;
}

type ExportFormat = 'css' | 'tailwind' | 'scss' | 'json';

export default function ExportPanel({ lightTheme, darkTheme, brandName }: ExportPanelProps) {
  const [activeFormat, setActiveFormat] = useState<ExportFormat>('css');
  const [copied, setCopied] = useState(false);

  const darkCSS = generateProtonCSS(darkTheme, 'proton');
  const lightCSS = generateProtonCSS(lightTheme, 'proton');

  const getExportContent = (): { code: string; filename: string } => {
    switch (activeFormat) {
      case 'css':
        return {
          filename: 'proton-design-system.css',
          code: `/* ${brandName} Design System Tokens */
/* Based on PRIZM 4.0 Two-Layer Token Architecture */

:root {
${darkCSS}
}

[data-theme="light"] {
${lightCSS}
}

/* Utility Classes */
.proton-bg { background-color: var(--proton-bg); }
.proton-surface { background-color: var(--proton-surface); }
.proton-fg { color: var(--proton-fg); }
.proton-accent { background-color: var(--proton-accent); }
.proton-accent-fg { color: var(--proton-accent-fg); }

/* Angled Button Clip Paths */
.angled-right { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%); }
.angled-left { clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%); }
.angled-both { clip-path: polygon(8px 0, calc(100% - 8px) 0, 100% 100%, 0 100%); }`,
        };
      case 'tailwind':
        return {
          filename: 'tailwind.config.js',
          code: `/** @type {import('tailwindcss').Config} */
// ${brandName} Design System - Tailwind Config
// Based on PRIZM 4.0 Two-Layer Token Architecture

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        proton: {
          red: {
            DEFAULT: '#E30820',
            hover: '#FF1A33',
            active: '#C00018',
            50: '#E30820', 100: '#E5071D', 200: '#E8061A',
            300: '#EA0517', 400: '#ED0514', 500: '#EF0411',
            600: '#F2030E', 700: '#F4020B', 800: '#F70208',
            900: '#F90106', 950: '#FC0003',
          },
          gray: {
            50: '#FAFAFA', 100: '#ECECEC', 200: '#DEDEDE',
            300: '#D0D0D0', 400: '#C2C2C2', 500: '#B4B4B4',
            600: '#A6A6A6', 700: '#989898', 800: '#8A8A8A',
            900: '#7C7C7C', 950: '#6E6E6E',
          },
          bg: 'var(--proton-bg)',
          'bg-subtle': 'var(--proton-bg-subtle)',
          'bg-muted': 'var(--proton-bg-muted)',
          surface: 'var(--proton-surface)',
          'surface-elevated': 'var(--proton-surface-elevated)',
          border: 'var(--proton-border)',
          'border-strong': 'var(--proton-border-strong)',
          fg: 'var(--proton-fg)',
          'fg-muted': 'var(--proton-fg-muted)',
          'fg-subtle': 'var(--proton-fg-subtle)',
          accent: 'var(--proton-accent)',
          'accent-hover': 'var(--proton-accent-hover)',
          'accent-subtle': 'var(--proton-accent-subtle)',
          danger: 'var(--proton-danger)',
          success: 'var(--proton-success)',
          warning: 'var(--proton-warning)',
          info: 'var(--proton-info)',
        },
      },
      borderRadius: {
        'proton-sm': '2px',
        'proton-md': '4px',
        'proton-lg': '8px',
      },
      boxShadow: {
        'proton-sm': '0 1px 2px rgba(0,0,0,0.3)',
        'proton-md': '0 4px 12px rgba(0,0,0,0.4)',
        'proton-lg': '0 8px 24px rgba(0,0,0,0.5)',
        'proton-accent': '0 4px 20px rgba(227,8,32,0.3)',
      },
    },
  },
  plugins: [],
};`,
        };
      case 'scss':
        return {
          filename: 'proton-tokens.scss',
          code: `// ${brandName} Design System Tokens
// Based on PRIZM 4.0 Two-Layer Token Architecture

// Brand Colors
$proton-red: #E30820;
$proton-red-hover: #FF1A33;
$proton-red-active: #C00018;
$proton-black: #000000;
$proton-silver: #9F9F9F;
$proton-light-gray: #F1F1F1;
$proton-white: #FFFFFF;

// Red Scale
$proton-red-50: #E30820; $proton-red-500: #EF0411;
$proton-red-100: #E5071D; $proton-red-600: #F2030E;
$proton-red-200: #E8061A; $proton-red-700: #F4020B;
$proton-red-300: #EA0517; $proton-red-800: #F70208;
$proton-red-400: #ED0514; $proton-red-900: #F90106;

// Gray Scale
$proton-gray-50: #FAFAFA; $proton-gray-500: #B4B4B4;
$proton-gray-100: #ECECEC; $proton-gray-600: #A6A6A6;
$proton-gray-200: #DEDEDE; $proton-gray-700: #989898;
$proton-gray-300: #D0D0D0; $proton-gray-800: #8A8A8A;
$proton-gray-400: #C2C2C2; $proton-gray-900: #7C7C7C;

// Semantic Tokens (Dark - Default)
$proton-bg: #000000;
$proton-bg-subtle: #1A1A1A;
$proton-bg-muted: #2A2A2A;
$proton-surface: #111111;
$proton-border: #333333;
$proton-border-strong: #555555;
$proton-fg: #FFFFFF;
$proton-fg-muted: #9F9F9F;
$proton-fg-subtle: #6E6E6E;
$proton-accent: #E30820;
$proton-accent-hover: #FF1A33;

// Mixins
@mixin proton-heading {
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

@mixin angled-right {
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%);
}

@mixin angled-both {
  clip-path: polygon(8px 0, calc(100% - 8px) 0, 100% 100%, 0 100%);
}`,
        };
      case 'json':
        return {
          filename: 'proton-tokens.json',
          code: JSON.stringify({
            name: brandName,
            version: '1.0.0',
            architecture: 'PRIZM 4.0 Two-Layer Token System',
            brand: {
              primary: '#E30820',
              black: '#000000',
              silver: '#9F9F9F',
              lightGray: '#F1F1F1',
              white: '#FFFFFF',
            },
            tokens: {
              colors: darkTheme.baseline.colors,
              semantic: {
                dark: darkTheme.semantic,
                light: lightTheme.semantic,
              },
              radius: darkTheme.baseline.radius,
              shadow: darkTheme.baseline.shadow,
              typography: darkTheme.baseline.typography,
            },
          }, null, 2),
        };
    }
  };

  const { code, filename } = getExportContent();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formats: { id: ExportFormat; label: string; desc: string }[] = [
    { id: 'css', label: 'CSS Variables', desc: 'Standard CSS custom properties' },
    { id: 'tailwind', label: 'Tailwind Config', desc: 'Ready-to-use Tailwind theme' },
    { id: 'scss', label: 'SCSS Variables', desc: 'Sass with mixins' },
    { id: 'json', label: 'JSON Tokens', desc: 'Portable token format' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white proton-heading">Export Design System</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--proton-fg-muted)' }}>
          Export the Proton Design System in multiple formats
        </p>
      </div>

      <div className="grid sm:grid-cols-4 gap-3">
        {formats.map((fmt) => (
          <button key={fmt.id} onClick={() => setActiveFormat(fmt.id)}
            className="p-4 border text-left transition-all hover:shadow-proton-sm"
            style={{
              borderColor: activeFormat === fmt.id ? PROTON_RED : 'var(--proton-border)',
              backgroundColor: activeFormat === fmt.id ? 'rgba(227,8,32,0.05)' : 'var(--proton-surface)',
            }}>
            <p className="text-sm font-semibold text-white">{fmt.label}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--proton-fg-muted)' }}>{fmt.desc}</p>
          </button>
        ))}
      </div>

      {/* Code Preview */}
      <div className="rounded overflow-hidden border shadow-proton-sm" style={{ borderColor: 'var(--proton-border)' }}>
        <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: 'var(--proton-bg-subtle)', borderBottom: '1px solid var(--proton-border)' }}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs font-mono ml-2" style={{ color: 'var(--proton-fg-muted)' }}>{filename}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all text-white"
              style={{ backgroundColor: PROTON_RED }}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={downloadFile}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-all"
              style={{ borderColor: 'var(--proton-border)', color: 'var(--proton-fg)' }}>
              Download
            </button>
          </div>
        </div>
        <div className="p-4 overflow-auto max-h-[500px]" style={{ backgroundColor: 'var(--proton-bg)' }}>
          <pre className="text-xs font-mono leading-relaxed whitespace-pre" style={{ color: 'var(--proton-fg-muted)' }}>
            {code}
          </pre>
        </div>
      </div>
    </div>
  );
}
