import { useState } from 'react';
import type { ReactNode } from 'react';
import { PROTON_GRAY_2, PROTON_GRAY_3, PROTON_GRAY_4, PROTON_GRAY_5, PROTON_GRAY_8 } from '../core/proton-theme';

interface ProtonComponentsProps { isDarkMode: boolean; }

type ComponentSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
  notes?: string[];
};

function ComponentSection({ title, description, children, notes = [] }: ComponentSectionProps) {
  return (
    <section className="design-section overflow-hidden">
      <div className="design-section__header px-6 py-5">
        <h3 className="type-h2">{title}</h3>
        <p className="type-h5 mt-1" style={{ color: '#666' }}>{description}</p>
      </div>
      <div className="p-6 lg:p-8">{children}</div>
      {notes.length > 0 && (
        <div className="px-6 lg:px-8 py-5 border-t" style={{ borderColor: 'var(--proton-border)', background: PROTON_GRAY_2 }}>
          <h4 className="font-bold mb-2">Usage notes</h4>
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm leading-6" style={{ color: '#666' }}>
            {notes.map(note => <li key={note}>• {note}</li>)}
          </ul>
        </div>
      )}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-sm mb-3" style={{ color: '#979899' }}>{children}</div>;
}

function FieldDemo({ state, value, placeholder }: { state: 'Default' | 'Valid' | 'Focus' | 'Disabled' | 'Error'; value?: string; placeholder?: string }) {
  const isDisabled = state === 'Disabled';
  const isError = state === 'Error';
  const isFocus = state === 'Focus';
  return (
    <div className="grid grid-cols-[90px_1fr] items-center gap-8">
      <div className="form-row-label">{state}</div>
      <div>
        <label className="form-label">Label *</label>
        <input
          className={`form-control ${isError ? 'form-control--error' : ''}`}
          placeholder={placeholder || 'Please enter...'}
          value={value ?? ''}
          disabled={isDisabled}
          readOnly
          style={isFocus ? { borderColor: '#000', boxShadow: '0 0 0 2px rgba(0,0,0,.08)' } : {}}
        />
      </div>
    </div>
  );
}

function DropdownField({ state, open = false, multi = false }: { state: 'Default' | 'Valid' | 'Focus' | 'Disabled'; open?: boolean; multi?: boolean }) {
  const isDisabled = state === 'Disabled';
  const isFocus = state === 'Focus';
  const text = state === 'Default' ? 'Please select...' : multi ? 'Label 1, label 2, label 3, label 4, label 5...' : 'A';
  return (
    <div className="grid grid-cols-[90px_1fr] items-center gap-8 relative">
      <div className="form-row-label">{state}</div>
      <div className="relative">
        <label className="form-label">Label *</label>
        <button
          className="form-control flex items-center justify-between text-left"
          disabled={isDisabled}
          style={isFocus ? { borderColor: '#000', boxShadow: '0 0 0 2px rgba(0,0,0,.08)' } : {}}
        >
          <span style={{ color: state === 'Default' ? '#979899' : isDisabled ? '#979899' : '#000' }}>{text}</span>
          <span style={{ color: '#666' }}>⌄</span>
        </button>
        {open && (
          <div className="dropdown-menu-demo mt-2">
            {['Label', 'Label', 'Label'].map((item, index) => <div key={index} className={index === 1 ? 'active' : ''}>{item}</div>)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProtonComponents(_: ProtonComponentsProps) {
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedDropdown, setSelectedDropdown] = useState('Label');

  return (
    <div className="space-y-10">
      <div>
        <h2 className="type-h1">Components</h2>
        <p className="type-h5 mt-1" style={{ color: '#666' }}>Updated with the latest Proton Figma component references.</p>
      </div>

      <ComponentSection
        title="Badge Light"
        description="Compact angled labels used for vehicle status, new launch tags and model names."
        notes={[
          'Use crimson NEW badge for product launch highlights and campaign freshness.',
          'Use black badge for neutral vehicle model names such as S70 or X90.',
          'Keep copy short: one word or compact model name only.',
          'Do not use badges as primary CTA buttons.'
        ]}
      >
        <div className="grid md:grid-cols-[260px_1fr] gap-10 items-start">
          <div>
            <h4 className="type-h3 mb-8">Badge Light</h4>
            <div className="flex items-center gap-8 mb-10">
              <span className="proton-badge proton-badge--red">NEW</span>
              <span className="proton-badge proton-badge--black">NEW</span>
            </div>
            <span className="proton-badge proton-badge--black">S70</span>
          </div>
          <div className="p-6" style={{ background: PROTON_GRAY_2 }}>
            <div className="text-sm font-bold mb-4">Example usage on a model card</div>
            <div className="border bg-white w-full max-w-md" style={{ borderColor: PROTON_GRAY_5 }}>
              <div className="h-32 relative" style={{ background: 'linear-gradient(135deg,#F9F9F9,#E3E3E3)' }}>
                <span className="proton-badge proton-badge--red absolute left-4 top-4">NEW</span>
              </div>
              <div className="p-5">
                <span className="proton-badge proton-badge--black mb-4">S70</span>
                <h5 className="type-h3">Intelligence that moves you</h5>
                <p className="type-h5 mt-2" style={{ color: '#666' }}>Badge sits above model title without competing with CTA.</p>
              </div>
            </div>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Button"
        description="Primary, secondary and tertiary actions use Proton's angled geometry."
        notes={[
          'Primary: black fill on light background. Use for the main action only.',
          'Secondary: white fill with black border. Use for supporting actions.',
          'Tertiary: text link with underline. Use where visual weight should stay low.',
          'On dark backgrounds, white button has the clearest readability.'
        ]}
      >
        {[
          ['Desktop', ''], ['Mobile', 'proton-button--mobile'], ['Small', 'proton-button--small']
        ].map(([label, sizeClass]) => (
          <div key={label} className="mb-10 pb-10 border-b last:border-b-0" style={{ borderColor: PROTON_GRAY_4 }}>
            <h4 className="type-h3 mb-8">{label}</h4>
            <div className="grid md:grid-cols-3 gap-12">
              <div><Label>Primary</Label><button className={`proton-button proton-button--primary ${sizeClass}`}>Button</button></div>
              <div><Label>Secondary</Label><button className={`proton-button proton-button--secondary ${sizeClass}`}>Button</button></div>
              <div><Label>Tertiary (Link)</Label><button className={`proton-button proton-button--tertiary ${sizeClass}`}>Button</button></div>
            </div>
          </div>
        ))}

        <div className="mt-4">
          <h4 className="type-h3 mb-8">Button States</h4>
          <div className="grid md:grid-cols-4 gap-5 mb-6">
            {['Default', 'Hover', 'Press', 'Disabled'].map((state, index) => (
              <div key={state}>
                <Label>{state}</Label>
                <button disabled={state === 'Disabled'} className="proton-button proton-button--primary" style={index === 1 || index === 2 ? { background: '#313131', borderColor: '#313131' } : {}}>Button</button>
                <div className="h-5" />
                <button disabled={state === 'Disabled'} className="proton-button proton-button--secondary" style={index === 1 || index === 2 ? { background: '#313131', color: '#fff', borderColor: '#313131' } : {}}>Button</button>
                <div className="h-5" />
                <button disabled={state === 'Disabled'} className="proton-button proton-button--tertiary">Button</button>
              </div>
            ))}
          </div>
          <div className="p-8" style={{ background: '#000', color: '#fff' }}>
            <div className="grid md:grid-cols-4 gap-5">
              {['Default', 'Hover', 'Press', 'Disabled'].map(state => (
                <div key={state}>
                  <div className="text-sm font-bold mb-4">{state}</div>
                  <button disabled={state === 'Disabled'} className="proton-button proton-button--secondary" style={{ background: state === 'Disabled' ? '#B3B3B3' : '#fff', color: state === 'Disabled' ? '#fff' : '#000' }}>Button</button>
                </div>
              ))}
            </div>
            <p className="text-sm mt-5">The white button is clearer on a dark background.</p>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Input"
        description="Input states for web and mobile forms."
        notes={[
          'Labels use 16px bold to maintain readability in forms.',
          'Control text and placeholder use 16px regular.',
          'Error state uses red border and red input text.',
          'Disabled state uses light grey background and muted text.'
        ]}
      >
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h4 className="text-3xl tracking-widest mb-8" style={{ color: PROTON_GRAY_8 }}>WEB</h4>
            <div className="space-y-7 max-w-xl">
              <FieldDemo state="Default" />
              <FieldDemo state="Valid" value="John" />
              <FieldDemo state="Focus" value="John" />
              <FieldDemo state="Disabled" placeholder="Please enter..." />
              <FieldDemo state="Error" value="John" />
            </div>
          </div>
          <div>
            <h4 className="text-3xl tracking-widest mb-8" style={{ color: PROTON_GRAY_8 }}>MOBILE</h4>
            <div className="space-y-7 max-w-xl">
              <FieldDemo state="Default" />
              <FieldDemo state="Valid" value="John" />
              <FieldDemo state="Focus" value="John" />
              <FieldDemo state="Disabled" placeholder="Please enter..." />
              <FieldDemo state="Error" value="John" />
            </div>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Dropdown"
        description="Dropdown states and desktop/mobile selection pattern."
        notes={[
          'Dropdown controls align with input height, label weight and border treatment.',
          'Desktop menu appears as an elevated list under the field.',
          'Mobile selection should appear as a modal sheet with clear title and close action.',
          'For multi-select, truncate long selections with ellipsis.'
        ]}
      >
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h4 className="text-3xl tracking-widest mb-8" style={{ color: PROTON_GRAY_8 }}>WEB</h4>
            <div className="space-y-7 max-w-xl">
              <DropdownField state="Default" />
              <DropdownField state="Valid" />
              <DropdownField state="Focus" />
              <DropdownField state="Disabled" />
            </div>
          </div>
          <div>
            <h4 className="text-3xl tracking-widest mb-8" style={{ color: PROTON_GRAY_8 }}>MOBILE</h4>
            <div className="space-y-7 max-w-xl">
              <DropdownField state="Default" />
              <DropdownField state="Valid" />
              <DropdownField state="Focus" />
              <DropdownField state="Disabled" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative min-h-48">
            <h4 className="text-3xl tracking-widest mb-8" style={{ color: PROTON_GRAY_8 }}>WEB</h4>
            <div className="dropdown-menu-demo static">
              {['Label', selectedDropdown, 'Label'].map((item, index) => (
                <div key={index} className={index === 1 ? 'active' : ''} onClick={() => setSelectedDropdown(item)}>{item}</div>
              ))}
            </div>
          </div>
          <div className="relative min-h-80">
            <h4 className="text-3xl tracking-widest mb-8" style={{ color: PROTON_GRAY_8 }}>MOBILE</h4>
            <div className="w-full max-w-md bg-white shadow-proton-lg p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="type-h4">Title</span><button className="text-2xl leading-none">×</button>
              </div>
              {['Label', 'Label', 'Label', 'Label', 'Label'].map((item, index) => (
                <div key={index} className="h-11 flex items-center justify-center" style={{ background: index === 2 ? PROTON_GRAY_3 : '#fff' }}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Horizontal Tabs"
        description="Angled filter tabs for campaign, happening and content listing pages."
        notes={[
          'Use one active tab at a time.',
          'Active tab uses black fill and white text.',
          'Inactive tabs use white fill, grey border and grey text.',
          'Recommended for content category filters, not for primary navigation.'
        ]}
      >
        <div className="space-y-7">
          {[['ALL', 'CAMPAIGN', 'HAPPENING'], ['ALL', 'CAMPAIGN', 'HAPPENING'], ['ALL', 'CAMPAIGN', 'HAPPENING']].map((row, rowIndex) => (
            <div className="flex flex-wrap gap-2" key={rowIndex}>
              {row.map(label => {
                const active = activeTab === label || (rowIndex === 0 && activeTab === 'ALL' && label === 'ALL');
                return (
                  <button
                    key={`${rowIndex}-${label}`}
                    onClick={() => setActiveTab(label)}
                    className={`proton-tab ${active ? 'proton-tab--active' : ''}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </ComponentSection>
    </div>
  );
}
