import {
  PROTON_PRIMARY_PALETTE,
  PROTON_TYPOGRAPHY_DESKTOP,
  PROTON_TYPOGRAPHY_MOBILE,
  PROTON_BLACK,
  PROTON_GRAY_2,
  PROTON_GRAY_5,
} from '../core/proton-theme';

function ColorCard({ name, hex, usage }: { name: string; hex: string; usage: string }) {
  const darkText = ['#FFFFFF', '#F9F9F9', '#F3F3F3', '#E3E3E3', '#D3D3D3', '#B3B3B3'].includes(hex.toUpperCase());
  return (
    <div className="overflow-hidden border" style={{ borderColor: 'var(--proton-border)' }}>
      <div className="h-28 p-5 flex flex-col justify-end" style={{ backgroundColor: hex, color: darkText ? '#000' : '#fff' }}>
        <div className="text-xl font-medium">{name}</div>
        <div className="text-base mt-1">{hex}</div>
      </div>
      <div className="p-4 bg-white">
        <p className="text-sm leading-6" style={{ color: '#666' }}>{usage}</p>
      </div>
    </div>
  );
}

function TypeRow({ item }: { item: { name: string; size: string; lineHeight: string; weight: number; usage: string } }) {
  return (
    <div className="grid grid-cols-[70px_1fr_1.2fr] gap-5 items-center py-4 border-b last:border-b-0" style={{ borderColor: PROTON_GRAY_5 }}>
      <div className="text-sm" style={{ color: '#666' }}>{item.name}</div>
      <div style={{ fontSize: item.size, lineHeight: item.lineHeight, fontWeight: item.weight }} className="truncate">
        Loremipsum...
      </div>
      <div className="text-sm leading-6" style={{ color: '#888' }}>
        size: {item.size.replace('px','')} / l-height: {item.lineHeight.replace('px','')} / Letter spacing 0 / {item.weight === 700 ? 'bold' : item.weight === 500 ? 'medium' : 'regular'} · {item.usage}
      </div>
    </div>
  );
}

export default function Overview() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden" style={{ backgroundColor: PROTON_BLACK }}>
        <div className="px-8 py-12 sm:px-12 sm:py-16 text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5" style={{ backgroundColor: 'rgba(255,255,255,.1)' }}>
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="text-xs uppercase tracking-widest">Design System v2.0</span>
          </div>
          <h1 className="type-h1 mb-4">Proton Design System</h1>
          <p className="type-h4 max-w-2xl" style={{ color: '#B3B3B3' }}>
            Updated with the latest Proton component specification: Kanit typography, primary color palette, angled badge light, button, input, dropdown and horizontal tabs. The system is prepared for customer-facing pages such as Career, Aftersales, ProCare and campaign pages.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <button className="proton-button proton-button--primary" style={{ background: '#fff', color: '#000', borderColor: '#fff' }}>View Tokens</button>
            <button className="proton-button proton-button--secondary" style={{ background: '#000', color: '#fff', borderColor: '#fff' }}>View Components</button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="type-h2 mb-2">Primary colors</h2>
        <p className="type-h5 mb-6" style={{ color: '#666' }}>The primary palette defines Proton's digital tone: premium depth, automotive trust and a strong black/white interaction system.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROTON_PRIMARY_PALETTE.map(color => <ColorCard key={color.hex} name={color.name} hex={color.hex} usage={color.usage} />)}
        </div>
        <div className="mt-6 flex overflow-hidden border" style={{ borderColor: 'var(--proton-border)' }}>
          {[
            ['Grey-1', '#FFFFFF'], ['Grey-2', '#F9F9F9'], ['Grey-3', '#F3F3F3'], ['Grey-4', '#E3E3E3'], ['Grey-5', '#D3D3D3'],
            ['Grey-6', '#B3B3B3'], ['Grey-7', '#979899'], ['Grey-8', '#666666'], ['Grey-9', '#313131'], ['Grey-10', '#000000'],
          ].map(([name, hex], index) => (
            <div key={name} className="flex-1 min-w-[96px] h-24 p-3 flex flex-col justify-end" style={{ background: hex, color: index < 6 ? '#000' : '#fff' }}>
              <div className="font-medium">{name}</div>
              <div className="text-xs">{hex}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="type-h2 mb-2">Typography</h2>
        <p className="type-h5 mb-6" style={{ color: '#666' }}>Kanit is used as the primary typeface. Titles use bold uppercase treatment where needed; body copy remains regular for clarity.</p>
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-6 items-start">
          <div className="design-section p-8">
            <h3 className="text-xl font-bold mb-5" style={{ color: '#125488' }}>Kanit</h3>
            <p className="type-h5 mb-10">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />1234567890</p>
            <div className="flex gap-8 items-end">
              <div><div className="text-6xl font-normal">Aa</div><p className="text-xs text-center" style={{ color: '#979899' }}>Regular</p></div>
              <div><div className="text-6xl font-medium">Aa</div><p className="text-xs text-center" style={{ color: '#979899' }}>Medium</p></div>
              <div><div className="text-6xl font-bold">Aa</div><p className="text-xs text-center" style={{ color: '#979899' }}>Bold</p></div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-lg" style={{ backgroundColor: PROTON_GRAY_2 }}>
              <h3 className="font-bold mb-4">Desktop Font size</h3>
              {PROTON_TYPOGRAPHY_DESKTOP.map(item => <TypeRow key={item.name} item={item} />)}
            </div>
            <div className="p-6 rounded-lg" style={{ backgroundColor: PROTON_GRAY_2 }}>
              <h3 className="font-bold mb-4">Mobile Font size</h3>
              {PROTON_TYPOGRAPHY_MOBILE.map(item => <TypeRow key={item.name} item={item} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {[
          ['Component shape', 'Angled parallelogram geometry is used for buttons, badges and tabs to match Proton live-site styling.'],
          ['Form clarity', 'Input and dropdown states are separated into default, valid, focus, disabled and error, with consistent label weight and 16px body control text.'],
          ['Client usage', 'Each component includes implementation notes so page teams can apply the same rule across Career, ProCare, campaigns and aftersales pages.'],
        ].map(([title, body]) => (
          <div key={title} className="design-section p-6">
            <h3 className="type-h3 mb-3">{title}</h3>
            <p className="type-h5" style={{ color: '#666' }}>{body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
