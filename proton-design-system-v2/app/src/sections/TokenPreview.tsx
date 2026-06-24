import { useState } from 'react';
import type { Theme } from '../core/tokens';
import { PROTON_TOKEN_CATEGORIES, PROTON_RED } from '../core/proton-theme';
import { getContrastRatio, getForegroundColor } from '../core/color-utils';

interface TokenPreviewProps {
  theme: Theme;
  brandColor: string;
}

type ViewMode = 'swatches' | 'table' | 'contrast';

export default function TokenPreview({ theme, brandColor }: TokenPreviewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('swatches');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToken = (name: string, value: string) => {
    navigator.clipboard.writeText(`${name}: ${value}`);
    setCopiedToken(name);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  const renderSwatch = (tokenName: string, value: string, description: string) => {
    const isBg = tokenName.includes('bg') || tokenName.includes('surface') || ['accent', 'danger', 'success', 'warning', 'info'].some(s => tokenName === s);
    const fg = isBg ? getForegroundColor(value) : value;
    const contrast = isBg ? getContrastRatio(value, fg).toFixed(2) : null;

    return (
      <div
        key={tokenName}
        className="group relative overflow-hidden cursor-pointer transition-all hover:shadow-proton-md hover:scale-[1.02] border"
        style={{ borderColor: 'var(--proton-border)' }}
        onClick={() => copyToken(`--proton-${tokenName}`, value)}
      >
        <div className="h-20 flex items-center justify-center transition-all" style={{ backgroundColor: value }}>
          {isBg && <span style={{ color: fg }} className="text-sm font-semibold">Aa</span>}
        </div>
        <div className="p-3" style={{ backgroundColor: 'var(--proton-surface)' }}>
          <div className="flex items-center justify-between">
            <code className="text-xs font-mono font-medium " style={{ color: 'var(--proton-fg)' }}>--proton-{tokenName}</code>
            {copiedToken === `--proton-${tokenName}` && (
              <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: 'rgba(0,200,83,0.2)', color: '#00C853' }}>Copied!</span>
            )}
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--proton-fg-muted)' }}>{description}</p>
          <div className="flex items-center justify-between mt-2">
            <code className="text-xs font-mono" style={{ color: 'var(--proton-fg-muted)' }}>{value}</code>
            {contrast && (
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                parseFloat(contrast) >= 4.5 
                  ? '' : ''
              }`}
              style={{ 
                backgroundColor: parseFloat(contrast) >= 4.5 ? 'rgba(0,200,83,0.2)' : 'rgba(255,179,0,0.2)',
                color: parseFloat(contrast) >= 4.5 ? '#00C853' : '#FFB300'
              }}>
                {contrast}:1
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold proton-heading">Token Preview</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--proton-fg-muted)' }}>
            {theme.name} — 22 semantic tokens
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded border" style={{ backgroundColor: 'var(--proton-bg-subtle)', borderColor: 'var(--proton-border)' }}>
          {(['swatches', 'table', 'contrast'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 rounded text-sm font-medium capitalize transition-all ${
                viewMode === mode ? 'text-white shadow-sm' : ''
              }`}
              style={viewMode === mode ? { backgroundColor: 'var(--proton-bg-muted)' } : { color: 'var(--proton-fg-muted)' }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'swatches' && (
        <div className="space-y-8">
          {PROTON_TOKEN_CATEGORIES.map((category) => (
            <div key={category.id}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ backgroundColor: brandColor }} />
                <h3 className="font-semibold">{category.label}</h3>
                <span className="text-xs" style={{ color: 'var(--proton-fg-muted)' }}>— {category.description}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {category.tokens.map((token) => {
                  const value = theme.semantic[token.name as keyof typeof theme.semantic];
                  if (!value) return null;
                  return renderSwatch(token.name, value, token.description);
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'table' && (
        <div className="rounded overflow-hidden border" style={{ borderColor: 'var(--proton-border)' }}>
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: 'var(--proton-bg-subtle)' }}>
              <tr style={{ borderBottom: `1px solid var(--proton-border)` }}>
                <th className="text-left px-4 py-3 font-semibold text-xs">Token</th>
                <th className="text-left px-4 py-3 font-semibold text-xs">Value</th>
                <th className="text-left px-4 py-3 font-semibold text-xs">Preview</th>
                <th className="text-left px-4 py-3 font-semibold text-xs">Tailwind</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--proton-border)' }}>
              {(PROTON_TOKEN_CATEGORIES as any).flatMap((cat: any) => cat.tokens).map((token: any) => {
                const value = theme.semantic[token.name as keyof typeof theme.semantic];
                if (!value) return null;
                return (
                  <tr key={token.name} className="hover:bg-white/5 cursor-pointer transition-colors"
                    onClick={() => copyToken(`--proton-${token.name}`, value)}>
                    <td className="px-4 py-3 font-mono text-xs " style={{ color: 'var(--proton-fg)' }}>--proton-{token.name}</td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--proton-fg-muted)' }}>{value}</td>
                    <td className="px-4 py-3">
                      <div className="w-10 h-6 rounded border" style={{ backgroundColor: value, borderColor: 'var(--proton-border)' }} />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--proton-fg-muted)' }}>{token.tailwindUtility}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === 'contrast' && (
        <div className="space-y-4">
          <p className="text-sm" style={{ color: 'var(--proton-fg-muted)' }}>
            WCAG contrast ratios. 
            <span className="px-1.5 py-0.5 rounded text-xs font-medium ml-2" style={{ backgroundColor: 'rgba(0,200,83,0.2)', color: '#00C853' }}>4.5:1+ AA</span>
            <span className="px-1.5 py-0.5 rounded text-xs font-medium ml-1" style={{ backgroundColor: 'rgba(227,8,32,0.2)', color: PROTON_RED }}>7:1+ AAA</span>
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PROTON_TOKEN_CATEGORIES.filter(c => c.id === 'backgrounds' || c.id === 'accents' || c.id === 'status').map((category) =>
              category.tokens.map((token) => {
                const bg = theme.semantic[token.name as keyof typeof theme.semantic];
                if (!bg) return null;
                const fg = theme.semantic['fg'];
                const ratio = getContrastRatio(bg, fg);
                const isAA = ratio >= 4.5;
                const isAAA = ratio >= 7;

                return (
                  <div key={token.name} className="rounded overflow-hidden border" style={{ borderColor: 'var(--proton-border)' }}>
                    <div className="p-4" style={{ backgroundColor: bg, color: fg }}>
                      <p className="text-sm font-medium">The quick brown fox</p>
                      <p className="text-xs opacity-80 mt-1">--proton-{token.name}</p>
                    </div>
                    <div className="p-3 flex items-center justify-between" style={{ backgroundColor: 'var(--proton-bg)' }}>
                      <span className="text-xs font-mono" style={{ color: 'var(--proton-fg-muted)' }}>vs --proton-fg</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{ 
                          backgroundColor: isAAA ? 'rgba(227,8,32,0.2)' : (isAA ? 'rgba(0,200,83,0.2)' : 'rgba(255,179,0,0.2)'),
                          color: isAAA ? PROTON_RED : (isAA ? '#00C853' : '#FFB300')
                        }}>
                        {ratio.toFixed(2)}:1
                        {isAAA && ' AAA'}
                        {isAA && !isAAA && ' AA'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
