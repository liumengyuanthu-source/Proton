# Proton Design System

> **Version:** 2.0.0  
> **Date:** June 2026  
> **Scope:** Client-facing Proton digital design system framework  
> **Update included:** Typography, Primary Colors, Badge Light, Button, Input, Dropdown, Horizontal Tabs

---

## 1. Design Direction

The Proton Design System creates a consistent visual and interaction language for Proton digital touchpoints such as the homepage, model pages, campaigns, aftersales, ProCare, career pages and service forms.

The latest update aligns the system to the live Proton digital look: bold Kanit typography, a structured automotive color palette, light editorial page backgrounds, black/white angled controls and clear form states.

### Core principles

| Principle | Description |
|---|---|
| Bold and automotive | Use confident typography, high contrast and angled geometry to reflect Proton's performance-led tone. |
| Clear for customers | Important actions and form states should be easy to understand without visual ambiguity. |
| Reusable across pages | Components should work across campaign pages, career pages, aftersales forms and content pages. |
| Mobile-ready | Typography and controls should scale cleanly across desktop and mobile. |
| CMS-friendly | Banners, cards, tabs, badges and forms should be simple to configure and validate in CMS delivery. |

---

## 2. Primary Colors

The primary palette should be used consistently across visual identity, content hierarchy and interface states.

| Color | Hex | Recommended Usage |
|---|---:|---|
| Dark Green | `#004259` | Deep automotive surfaces, dark hero overlays, premium editorial accents |
| Blue | `#125488` | Digital navigation, links, information highlights, corporate content |
| Deep Blue | `#18273B` | Header depth, footer surfaces, enterprise sections |
| Crimson | `#590103` | Brand emphasis, NEW badge family, error/danger where red is required |
| Slate Blue | `#4C5C80` | Secondary panels, data areas, subdued blocks |
| Green | `#249399` | Supportive highlights, selected contextual UI, confirmation support |

### Neutral colors

| Token | Hex | Usage |
|---|---:|---|
| Grey-1 | `#FFFFFF` | Main page background, dark button text, content cards |
| Grey-2 | `#F9F9F9` | Light section background |
| Grey-3 | `#F3F3F3` | Disabled/control background, hover menu row |
| Grey-4 | `#E3E3E3` | Dividers and subtle block separation |
| Grey-5 | `#D3D3D3` | Standard border |
| Grey-6 | `#B3B3B3` | Disabled border and disabled text support |
| Grey-7 | `#979899` | Placeholder, tertiary text |
| Grey-8 | `#666666` | Secondary labels and descriptive text |
| Grey-9 | `#313131` | Hover/pressed action fill |
| Grey-10 | `#000000` | Primary text, primary button, header/footer |

### Usage rule

- Use black/white as the primary UI action system.
- Use Crimson selectively for high-attention badges and error states.
- Use Blue and Deep Blue for navigation, corporate or information-heavy areas.
- Avoid using Grey-7 or lighter values as body text on white backgrounds.

---

## 3. Typography

Primary typeface: **Kanit**.

### Desktop typography

| Style | Size | Line Height | Letter Spacing | Weight | Usage |
|---|---:|---:|---:|---:|---|
| H1 | 40px | 60px | 0 | Bold 700 | Bold display, homepage masthead |
| H2 | 28px | 42px | 0 | Bold 700 | Page headers |
| H3 | 24px | 36px | 0 | Medium 500 | Prominent sub-headers, section headers |
| H4 | 16px | 24px | 0 | Regular 400 | Paragraphs, button text, form controls |
| H5 | 14px | 21px | 0 | Regular 400 | Captions, breadcrumbs, footer links |

### Mobile typography

| Style | Size | Line Height | Letter Spacing | Weight | Usage |
|---|---:|---:|---:|---:|---|
| H1 | 28px | 42px | 0 | Bold 700 | Mobile masthead |
| H2 | 24px | 36px | 0 | Medium 500 | Mobile page headers |
| H3 | 16px | 24px | 0 | Regular 400 | Mobile sub-headers |
| H4 | 14px | 21px | 0 | Regular 400 | Mobile paragraphs |
| H5 | 12px | 18px | 0 | Regular 400 | Mobile captions and compact UI |

### Typography usage notes

- Main page titles should use uppercase when used as campaign, product or section headers.
- Body copy should remain sentence case for readability.
- Buttons and tabs should use uppercase for strong automotive UI language.
- Form labels should use 16px bold; input values and placeholders should use 16px regular.

---

## 4. Badge Light

Badge Light is used for compact labels such as NEW and model names.

| Variant | Fill | Text | Shape | Usage |
|---|---|---|---|---|
| Red NEW | Red/Crimson family | White | Angled parallelogram | New product, new campaign or highlighted update |
| Black NEW | Black | White | Angled parallelogram | Neutral new-state badge on light background |
| Model badge | Black | White | Angled parallelogram | Model name such as S70 |

### Implementation rule

```css
.proton-badge {
  height: 28px;
  min-width: 58px;
  padding: 0 14px;
  color: #fff;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  text-transform: uppercase;
  clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
}
```

### Usage notes

- Keep text short: `NEW`, `S70`, `X90`.
- Do not use badges as CTAs.
- Badge should sit close to the related product or content title.

---

## 5. Button

Buttons use Proton's angled shape. The system includes primary, secondary and tertiary styles across desktop, mobile and small sizes.

### Button types

| Type | Style | Usage |
|---|---|---|
| Primary | Black fill, white text | Main action: Book Test Drive, Apply Now, Submit |
| Secondary | White fill, black border, black text | Supporting action: Learn More, View Details |
| Tertiary | Underlined text link | Low-emphasis inline action |

### Button sizes

| Size | Height | Min Width | Font | Usage |
|---|---:|---:|---|---|
| Desktop | 48px | 142px | H4 / 16px Regular / Uppercase | Standard desktop CTA |
| Mobile | 38px | 132px | 14px Regular / Uppercase | Mobile CTA |
| Small | 32px | 116px | 14px Regular | Compact controls |

### States

| State | Primary | Secondary | Tertiary |
|---|---|---|---|
| Default | Black fill | White fill, black border | Black underlined text |
| Hover | Grey-9 fill | Grey-9 fill, white text | Underline retained |
| Press | Grey-9 fill | Grey-9 fill, white text | Underline retained |
| Disabled | Grey-6 fill / low opacity | Grey border / low opacity | Grey text |

### Dark background rule

On dark backgrounds, a white filled button gives the clearest visibility. Use black text on white fill.

---

## 6. Input

Input controls support web and mobile states.

### States

| State | Border | Fill | Text | Description |
|---|---|---|---|---|
| Default | Grey-9 | White | Placeholder Grey-7 | Empty field |
| Valid | Grey-9 | White | Black | Valid input value |
| Focus | Black | White | Black | Active field with focus treatment |
| Disabled | Grey-6 | Grey-3 | Grey-7 | Non-editable field |
| Error | Red | White | Red | Validation failure |

### Input typography

| Element | Font |
|---|---|
| Label | 16px / 24px / Bold |
| Placeholder | 16px / 24px / Regular |
| Input value | 16px / 24px / Regular |
| Error value | 16px / 24px / Regular, red |

### Usage notes

- Always show labels above inputs.
- Keep required marker as `*` after label.
- Error state must be visible through both border and text color.
- Placeholder should not replace the label.

---

## 7. Dropdown

Dropdown controls follow the same dimensions and typography as input controls.

### States

| State | Border | Fill | Text |
|---|---|---|---|
| Default | Grey-9 | White | Placeholder Grey-7 |
| Valid | Grey-9 | White | Black |
| Focus | Black | White | Black |
| Disabled | Grey-6 | Grey-3 | Grey-7 |

### Menu behavior

| Platform | Behavior |
|---|---|
| Web | Elevated dropdown list appears under the field. Active/hover row uses Grey-3. |
| Mobile | Use a modal sheet with title, close button and large tap rows. |

### Usage notes

- Long multi-select content should truncate with ellipsis.
- Use 16px labels and 16px dropdown text.
- Do not mix dropdown and free text input behavior in the same component.

---

## 8. Horizontal Tabs

Horizontal tabs are angled filter controls used for content categories such as campaign and happening listings.

### Tab specs

| State | Fill | Border | Text |
|---|---|---|---|
| Active | Black | Black | White |
| Inactive | White | Grey-7 | Grey-8 |
| Hover | White | Black | Black |

### Recommended usage

- Use for category filters: `ALL`, `CAMPAIGN`, `HAPPENING`.
- Keep one active tab at a time.
- Do not use horizontal tabs as the main website navigation.
- Keep labels short and uppercase.

---

## 9. Implementation Checklist

| Area | Checklist |
|---|---|
| Typography | Kanit loaded, desktop/mobile scale applied, labels and buttons use correct size |
| Colors | Primary colors and neutral scale match tokens above |
| Buttons | Angled shape, correct sizes, primary/secondary/tertiary states covered |
| Badge Light | NEW and model badges use angled shape and short uppercase copy |
| Forms | Input/dropdown states implemented for default, valid, focus, disabled and error |
| Tabs | Active/inactive/hover states implemented with angled geometry |
| CMS | Labels and tab names should be configurable but constrained to short copy |
| QA | Check contrast, keyboard focus, disabled states and mobile tap size |

---

## 10. CSS Token Starter

```css
:root {
  --proton-dark-green: #004259;
  --proton-blue: #125488;
  --proton-deep-blue: #18273B;
  --proton-crimson: #590103;
  --proton-slate-blue: #4C5C80;
  --proton-green: #249399;

  --proton-grey-1: #FFFFFF;
  --proton-grey-2: #F9F9F9;
  --proton-grey-3: #F3F3F3;
  --proton-grey-4: #E3E3E3;
  --proton-grey-5: #D3D3D3;
  --proton-grey-6: #B3B3B3;
  --proton-grey-7: #979899;
  --proton-grey-8: #666666;
  --proton-grey-9: #313131;
  --proton-grey-10: #000000;

  --proton-font-family: 'Kanit', system-ui, sans-serif;
  --proton-type-h1-size: 40px;
  --proton-type-h1-line-height: 60px;
  --proton-type-h2-size: 28px;
  --proton-type-h2-line-height: 42px;
  --proton-type-h3-size: 24px;
  --proton-type-h3-line-height: 36px;
  --proton-type-h4-size: 16px;
  --proton-type-h4-line-height: 24px;
  --proton-type-h5-size: 14px;
  --proton-type-h5-line-height: 21px;
}
```
