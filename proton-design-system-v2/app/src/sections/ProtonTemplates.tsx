import { useState } from 'react';
import { PROTON_RED, PROTON_BLACK, PROTON_SILVER } from '../core/proton-theme';

interface ProtonTemplatesProps {
  isDarkMode: boolean;
}

export default function ProtonTemplates({ isDarkMode }: ProtonTemplatesProps) {
  const [activeTemplate, setActiveTemplate] = useState('homepage');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const templates = [
    { id: 'homepage', name: 'Homepage', desc: 'Hero + Models + Promotions + Services + News + Footer' },
    { id: 'model', name: 'Model Detail', desc: 'Hero + Warranty + Features + Specs + CTA Bar' },
    { id: 'offers', name: 'Offers Page', desc: 'Header + Filter + Campaign Grid' },
    { id: 'purchase', name: 'Purchase Flow', desc: 'Model Select + Configurator + Finance' },
  ];

  const isMobile = previewMode === 'mobile';
  const bg = isDarkMode ? PROTON_BLACK : '#FFFFFF';
  const text = isDarkMode ? '#FFFFFF' : '#000000';
  const surface = isDarkMode ? '#111111' : '#FAFAFA';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white proton-heading mb-1">Page Templates</h2>
        <p className="text-sm" style={{ color: 'var(--proton-fg-muted)' }}>Proton page layouts using the design system</p>
      </div>

      {/* Template Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {templates.map((t) => (
          <button key={t.id} onClick={() => setActiveTemplate(t.id)}
            className="p-4 border text-left transition-all hover:shadow-proton-sm"
            style={{
              borderColor: activeTemplate === t.id ? PROTON_RED : 'var(--proton-border)',
              backgroundColor: activeTemplate === t.id ? 'rgba(227,8,32,0.05)' : surface,
            }}>
            <div className="w-8 h-8 rounded flex items-center justify-center text-white text-sm font-bold mb-2"
              style={{ backgroundColor: activeTemplate === t.id ? PROTON_RED : '#333' }}>
              {t.name.charAt(0)}
            </div>
            <p className="text-sm font-semibold" style={{ color: text }}>{t.name}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--proton-fg-muted)' }}>{t.desc}</p>
          </button>
        ))}
      </div>

      {/* Preview Controls */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">{templates.find(t => t.id === activeTemplate)?.name} Preview</h3>
        <div className="flex items-center gap-1 p-1 rounded border" style={{ backgroundColor: 'var(--proton-bg-subtle)', borderColor: 'var(--proton-border)' }}>
          {(['desktop', 'mobile'] as const).map((mode) => (
            <button key={mode} onClick={() => setPreviewMode(mode)}
              className={`p-1.5 rounded transition-all ${previewMode === mode ? 'shadow-sm' : ''}`}
              style={previewMode === mode ? { backgroundColor: surface } : {}}>
              {mode === 'desktop' ? (
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Preview Frame */}
      <div className="flex justify-center">
        <div className="border overflow-hidden shadow-proton-lg transition-all"
          style={{
            width: isMobile ? '375px' : '100%',
            maxWidth: isMobile ? '375px' : '1100px',
            borderColor: 'var(--proton-border)',
            backgroundColor: bg,
            color: text,
          }}>
          {activeTemplate === 'homepage' && <HomepagePreview isMobile={isMobile} />}
          {activeTemplate === 'model' && <ModelPreview isMobile={isMobile} />}
          {activeTemplate === 'offers' && <OffersPreview isMobile={isMobile} />}
          {activeTemplate === 'purchase' && <PurchasePreview isMobile={isMobile} />}
        </div>
      </div>
    </div>
  );
}

// ==================== TEMPLATE PREVIEWS ====================

function ProtonNav() {
  return (
    <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: PROTON_BLACK }}>
      <div className="flex items-center gap-2">
        <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke={PROTON_SILVER} strokeWidth="1.5" fill="none" />
          <circle cx="16" cy="19" r="2.5" fill={PROTON_SILVER} />
        </svg>
        <span className="text-white text-xs font-bold tracking-wider">PROTON</span>
      </div>
      <div className="hidden sm:flex items-center gap-4">
        {['Models', 'Offers', 'Purchase'].map((item) => (
          <span key={item} className="text-xs text-gray-400 uppercase">{item}</span>
        ))}
      </div>
    </div>
  );
}

function ProtonFooter() {
  return (
    <div className="py-6 px-4" style={{ backgroundColor: PROTON_BLACK }}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {['Corporate', 'Talk to Us', 'Careers', 'Social'].map((section) => (
          <div key={section}>
            <p className="text-xs font-bold uppercase text-white mb-2">{section}</p>
            <p className="text-xs text-gray-500">Link 1</p>
            <p className="text-xs text-gray-500">Link 2</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-600 text-center">2025 Proton Holdings Berhad (623177-A)</p>
    </div>
  );
}

function HomepagePreview({ isMobile }: { isMobile: boolean }) {
  return (
    <div>
      <ProtonNav />
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: isMobile ? '300px' : '250px' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-gray-800" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85) 30%, transparent)' }} />
        <div className="relative h-full flex flex-col justify-center px-6 max-w-md">
          <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: PROTON_RED }}>2026 Model</p>
          <h2 className="text-2xl font-extrabold text-white proton-heading">PROTON S70</h2>
          <p className="text-xs mt-2 text-gray-400">Performance-led driving confidence.</p>
          <div className="flex gap-2 mt-3">
            <button className="angled-right px-4 py-2 text-xs font-semibold uppercase text-white" style={{ backgroundColor: PROTON_RED }}>Book Test Drive</button>
            <button className="angled-right px-4 py-2 text-xs font-semibold uppercase border text-white" style={{ borderColor: PROTON_SILVER }}>Learn More</button>
          </div>
        </div>
      </div>

      {/* Explore Models */}
      <div className="py-6 px-4" style={{ backgroundColor: '#000' }}>
        <h3 className="text-lg font-bold text-white proton-heading mb-4">Explore Models</h3>
        <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          {['S70', 'X50', 'X70', 'X90'].map((model) => (
            <div key={model} className="border p-3 text-center" style={{ borderColor: '#333' }}>
              <div className="h-12 bg-gradient-to-b from-gray-800 to-black mb-2" />
              <p className="text-xs font-bold text-white uppercase">{model}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Promotions */}
      <div className="py-6 px-4" style={{ backgroundColor: '#111' }}>
        <h3 className="text-lg font-bold text-white proton-heading mb-3">Deals Too Good To Pass Up</h3>
        <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
          <div className="border overflow-hidden" style={{ borderColor: '#333' }}>
            <div className="h-24 bg-gradient-to-r from-yellow-900/30 to-orange-900/30" />
            <div className="p-3">
              <p className="text-xs text-red-500 uppercase font-bold">Campaign</p>
              <p className="text-sm font-bold text-white mt-1">Rewards Are Calling</p>
            </div>
          </div>
          <div className="border overflow-hidden" style={{ borderColor: '#333' }}>
            <div className="h-24 bg-gradient-to-r from-green-900/30 to-emerald-900/30" />
            <div className="p-3">
              <p className="text-xs text-red-500 uppercase font-bold">Campaign</p>
              <p className="text-sm font-bold text-white mt-1">Thank You Teachers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="py-4 px-4" style={{ backgroundColor: '#000' }}>
        <div className={`grid gap-2 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          {['Test Drive', 'Service', 'Dealer', 'Brochure'].map((s) => (
            <div key={s} className="angled-both p-3 text-center" style={{ backgroundColor: '#1A1A1A' }}>
              <p className="text-xs font-bold uppercase text-white">{s}</p>
            </div>
          ))}
        </div>
      </div>

      <ProtonFooter />
    </div>
  );
}

function ModelPreview({ isMobile }: { isMobile: boolean }) {
  return (
    <div>
      <ProtonNav />
      {/* Hero */}
      <div className="relative h-48 bg-gradient-to-br from-red-900/30 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-xs text-red-500 uppercase tracking-widest">2026</p>
          <h2 className="text-3xl font-extrabold text-white proton-heading">PROTON S70</h2>
          <p className="text-xs text-gray-400 mt-1">Intelligence That Evolves</p>
          <p className="text-xl font-extrabold text-white mt-2">RM68,800</p>
        </div>
      </div>

      {/* Warranty */}
      <div className="py-6 px-4" style={{ backgroundColor: '#000' }}>
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {[
            { label: '5-YEAR', sub: 'Warranty Unlimited Mileage*' },
            { label: '5-YEAR', sub: 'Data Package 2GB/month*' },
            { label: '6 TIMES', sub: 'Free Labour Service*' },
          ].map((item) => (
            <div key={item.sub} className="text-center p-4 border" style={{ borderColor: '#333' }}>
              <p className="text-lg font-extrabold" style={{ color: PROTON_RED }}>{item.label}</p>
              <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ backgroundColor: '#111', borderColor: '#333' }}>
        {['Features', 'Price & Specs', 'Manual'].map((tab, i) => (
          <button key={tab} className={`flex-1 py-3 text-xs font-medium uppercase ${i === 0 ? 'text-white' : 'text-gray-500'}`}
            style={i === 0 ? { borderBottom: `2px solid ${PROTON_RED}` } : {}}>
            {tab}
          </button>
        ))}
      </div>

      {/* CTA Bar */}
      <div className="sticky bottom-0 flex gap-2 p-3" style={{ backgroundColor: 'rgba(0,0,0,0.95)', borderTop: '1px solid #333' }}>
        <button className="angled-right flex-1 py-2.5 text-xs font-semibold uppercase text-white text-center" style={{ backgroundColor: PROTON_RED }}>Download Brochure</button>
        <button className="angled-right flex-1 py-2.5 text-xs font-semibold uppercase text-white text-center border" style={{ borderColor: PROTON_SILVER }}>Test Drive</button>
        <button className="angled-right flex-1 py-2.5 text-xs font-semibold uppercase text-white text-center border" style={{ borderColor: PROTON_SILVER }}>Register Interest</button>
      </div>

      <ProtonFooter />
    </div>
  );
}

function OffersPreview({ isMobile }: { isMobile: boolean }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  return (
    <div>
      <ProtonNav />
      <div className="py-6 px-4" style={{ backgroundColor: '#000' }}>
        <h2 className="text-2xl font-extrabold text-white proton-heading mb-1">Deals Too Good To Pass Up</h2>
        <p className="text-sm text-gray-400 mb-6">Exclusive promotions, savings, rebates and more.</p>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {['ALL', 'CAMPAIGN', 'HAPPENING'].map((tag) => (
            <button key={tag} onClick={() => setActiveFilter(tag)}
              className="angled-both px-5 py-2 text-xs font-semibold uppercase transition-all"
              style={{
                backgroundColor: activeFilter === tag ? 'white' : 'transparent',
                color: activeFilter === tag ? 'black' : 'white',
                border: activeFilter === tag ? 'none' : '1px solid #555',
              }}>
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {[
            { title: 'REWARDS ARE CALLING', tag: 'CAMPAIGN', color: 'from-yellow-600/20 to-orange-600/20' },
            { title: 'THANK YOU TEACHERS', tag: 'CAMPAIGN', color: 'from-green-600/20 to-emerald-600/20' },
            { title: 'FRESH WHEELS NEXT GEN', tag: 'CAMPAIGN', color: 'from-blue-600/20 to-indigo-600/20' },
            { title: 'ROAR FORWARD', tag: 'CAMPAIGN', color: 'from-red-600/20 to-pink-600/20' },
            { title: 'WIN KAW KAW', tag: 'CAMPAIGN', color: 'from-purple-600/20 to-violet-600/20' },
            { title: 'GENUINE PARTS', tag: 'HAPPENING', color: 'from-cyan-600/20 to-teal-600/20' },
          ].map((promo) => (
            <div key={promo.title} className="border overflow-hidden" style={{ borderColor: '#333' }}>
              <span className="angled-right px-3 py-1 text-xs font-bold uppercase text-white inline-block mt-3" style={{ backgroundColor: PROTON_BLACK }}>{promo.tag}</span>
              <div className="p-4">
                <h4 className="text-sm font-bold text-white proton-heading">{promo.title}</h4>
                <p className="text-xs text-gray-500 mt-2">Upgrade your ride with amazing savings.</p>
              </div>
              <div className={`h-24 bg-gradient-to-br ${promo.color} mx-4 mb-4`} />
            </div>
          ))}
        </div>
      </div>
      <ProtonFooter />
    </div>
  );
}

function PurchasePreview({ isMobile }: { isMobile: boolean }) {
  return (
    <div>
      <ProtonNav />
      <div className="py-6 px-4" style={{ backgroundColor: '#000' }}>
        <h2 className="text-xl font-extrabold text-white proton-heading mb-6">Configure Your Proton</h2>

        {/* Model Select */}
        <div className={`grid gap-3 mb-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
          {['S70', 'X50', 'X70', 'X90'].map((model) => (
            <div key={model} className="border p-3 text-center cursor-pointer hover:border-red-600 transition-colors" style={{ borderColor: '#333' }}>
              <div className="h-10 bg-gradient-to-b from-gray-700 to-black mb-2" />
              <p className="text-xs font-bold text-white uppercase">{model}</p>
            </div>
          ))}
        </div>

        {/* Color */}
        <div className="mb-6">
          <p className="text-xs font-medium uppercase text-gray-400 mb-3">Select Color</p>
          <div className="flex gap-3">
            {['#E30820', '#000000', '#FFFFFF', '#9F9F9F', '#1a3a5c'].map((c) => (
              <div key={c} className="w-8 h-8 rounded-full border-2 cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: c, borderColor: c === '#FFFFFF' ? '#555' : c }} />
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="border p-4 mb-6" style={{ borderColor: '#333' }}>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Base Price</span>
            <span className="text-white">RM68,800</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Accessories</span>
            <span className="text-white">RM0</span>
          </div>
          <div className="border-t pt-2 mt-2" style={{ borderColor: '#333' }}>
            <div className="flex justify-between">
              <span className="text-white font-bold">Total</span>
              <span className="text-xl font-extrabold" style={{ color: PROTON_RED }}>RM68,800</span>
            </div>
          </div>
        </div>

        <button className="angled-right w-full py-3 text-sm font-semibold uppercase text-white" style={{ backgroundColor: PROTON_RED }}>
          Book Test Drive
        </button>
      </div>
      <ProtonFooter />
    </div>
  );
}
