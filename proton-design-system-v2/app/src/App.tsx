import { useState, useEffect } from 'react';
import {
  PROTON_DARK_THEME, PROTON_LIGHT_THEME,
  PROTON_BLACK, PROTON_SILVER,
} from './core/proton-theme';
import type { Theme } from './core/tokens';
import TokenPreview from './sections/TokenPreview';
import ProtonComponents from './sections/ProtonComponents';
import ProtonTemplates from './sections/ProtonTemplates';
import ExportPanel from './sections/ExportPanel';
import Overview from './sections/Overview';
import './App.css';

type TabId = 'overview' | 'tokens' | 'components' | 'templates' | 'export';

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'components', label: 'Components' },
  { id: 'templates', label: 'Templates' },
  { id: 'export', label: 'Export' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(PROTON_LIGHT_THEME);

  useEffect(() => {
    const theme = isDarkMode ? PROTON_DARK_THEME : PROTON_LIGHT_THEME;
    setCurrentTheme(theme);
    const root = document.documentElement;
    Object.entries(theme.semantic).forEach(([key, value]) => {
      root.style.setProperty(`--proton-${key}`, value);
    });
    Object.entries(theme.baseline.colors).forEach(([name, scale]) => {
      scale.forEach((color, i) => {
        const step = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950][i];
        root.style.setProperty(`--proton-color-${name}-${step}`, color);
      });
    });
    if (isDarkMode) root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
  }, [isDarkMode]);

  return (
    <div className="min-h-screen proton-bg proton-fg">
      <nav className="sticky top-0 z-50" style={{ backgroundColor: PROTON_BLACK }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="14" stroke={PROTON_SILVER} strokeWidth="1.5" fill="none" />
                <path d="M10 16C10 12.5 12.5 10 16 10C19.5 10 22 12.5 22 16" stroke={PROTON_SILVER} strokeWidth="1.5" fill="none" />
                <circle cx="16" cy="19" r="2.5" fill={PROTON_SILVER} />
              </svg>
              <div className="flex flex-col">
                <span className="text-white text-sm font-bold tracking-wider leading-tight">PROTON</span>
                <span className="text-[8px] tracking-widest" style={{ color: PROTON_SILVER }}>DESIGN SYSTEM V2.0</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-xs font-medium uppercase tracking-wide transition-all duration-150 ${activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  {tab.label}
                  {activeTab === tab.id && <div className="h-0.5 mt-1 mx-auto bg-white" style={{ width: '60%' }} />}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="proton-button proton-button--small"
              style={{ background: 'transparent', borderColor: '#666', color: '#fff' }}
              title="Toggle theme"
            >
              {isDarkMode ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
        <div className="md:hidden flex overflow-x-auto px-4 gap-1 pb-2 border-t" style={{ borderColor: '#333' }}>
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-3 py-2 text-xs font-medium uppercase whitespace-nowrap ${activeTab === tab.id ? 'text-white' : 'text-gray-500'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-fade-in">
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'tokens' && <TokenPreview theme={currentTheme} brandColor={currentTheme.semantic.accent} />}
          {activeTab === 'components' && <ProtonComponents isDarkMode={isDarkMode} />}
          {activeTab === 'templates' && <ProtonTemplates isDarkMode={isDarkMode} />}
          {activeTab === 'export' && <ExportPanel lightTheme={PROTON_LIGHT_THEME} darkTheme={PROTON_DARK_THEME} brandName="Proton" />}
        </div>
      </main>

      <footer className="mt-20 py-8" style={{ backgroundColor: PROTON_BLACK, borderTop: '1px solid #333' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-gray-400">Proton Design System v2.0 — Figma component update integrated</p>
          <p className="text-xs text-gray-600 mt-1">Typography, Primary Colors, Badge Light, Button, Input, Dropdown and Horizontal Tabs</p>
        </div>
      </footer>
    </div>
  );
}
