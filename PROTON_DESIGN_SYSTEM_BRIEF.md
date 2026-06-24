# Proton Design System Brief

Source package: `Proton_design_system_v2_updated.zip`
Extracted reference: `proton-design-system-v2/`
Version: 2.0.0, June 2026

## Design Direction

Use this system for Proton customer-facing digital pages: homepage, model pages, campaigns, aftersales, ProCare, career pages and service forms.

The visual language is bold, structured and automotive:

- Kanit is the primary typeface.
- Black and white are the primary interaction colors.
- Angled parallelogram geometry is used for buttons, badges and horizontal tabs.
- Pages should feel premium, clear and CMS-friendly.
- Forms must make state and validation obvious.
- Mobile layouts need clean type scaling and generous tap targets.

## Core Colors

Primary palette:

- Dark Green `#004259`: deep hero overlays, premium editorial accents.
- Blue `#125488`: navigation, links, information highlights.
- Deep Blue `#18273B`: header/footer depth, enterprise sections.
- Crimson `#590103`: brand emphasis, NEW badge family, error/danger when red is needed.
- Slate Blue `#4C5C80`: secondary panels, data areas.
- Green `#249399`: supportive highlights, selected contextual UI, confirmation support.

Neutral scale:

- Grey-1 `#FFFFFF`
- Grey-2 `#F9F9F9`
- Grey-3 `#F3F3F3`
- Grey-4 `#E3E3E3`
- Grey-5 `#D3D3D3`
- Grey-6 `#B3B3B3`
- Grey-7 `#979899`
- Grey-8 `#666666`
- Grey-9 `#313131`
- Grey-10 `#000000`

Usage rules:

- Use black/white for the main action system.
- Use Crimson sparingly for NEW/high-attention/error states.
- Use Blue and Deep Blue for navigation, corporate or information-heavy areas.
- Do not use Grey-7 or lighter values as body text on white.

## Typography

Font family: `Kanit, system-ui, sans-serif`

Desktop:

- H1: 40px / 60px / 700
- H2: 28px / 42px / 700
- H3: 24px / 36px / 500
- H4: 16px / 24px / 400
- H5: 14px / 21px / 400

Mobile:

- H1: 28px / 42px / 700
- H2: 24px / 36px / 500
- H3: 16px / 24px / 400
- H4: 14px / 21px / 400
- H5: 12px / 18px / 400

Usage rules:

- Main product/campaign/section titles may be uppercase.
- Body copy stays sentence case.
- Buttons and tabs use uppercase.
- Form labels are 16px bold; input/dropdown text is 16px regular.
- Letter spacing is 0.

## Component Rules

Badge Light:

- Height 28px, min width 58px, horizontal padding 14px.
- Text: 16px / 24px / 700 / uppercase / white.
- Shape: angled parallelogram, 8px diagonal offset.
- Red NEW uses Crimson/red family; black NEW/model badges use black.
- Keep text short: `NEW`, `S70`, `X90`.
- Do not use badges as CTAs.

Buttons:

- Primary: black fill, white text.
- Secondary: white fill, black border, black text.
- Tertiary: underlined text link.
- Desktop: 48px height, min width 142px, 16px uppercase.
- Mobile: 38px height, min width 132px, 14px uppercase.
- Small: 32px height, min width 116px, 14px.
- Hover/pressed primary and secondary use Grey-9 `#313131`; secondary text becomes white.
- Disabled uses Grey-6/low opacity.
- On dark backgrounds, prefer white filled buttons with black text.

Inputs:

- Always show labels above inputs.
- Required marker is `*` after label.
- Default border Grey-9, white fill, placeholder Grey-7.
- Focus border black, white fill, black text.
- Disabled border Grey-6, fill Grey-3, text Grey-7.
- Error border and value text red.
- Placeholder must not replace the label.

Dropdowns:

- Match input dimensions and typography.
- Desktop menu appears below field as elevated list; hover/active row uses Grey-3.
- Mobile selection should use a modal sheet with title, close button and large tap rows.
- Long multi-select content truncates with ellipsis.

Horizontal Tabs:

- Use for category filters such as `ALL`, `CAMPAIGN`, `HAPPENING`.
- Do not use as primary website navigation.
- Active: black fill, black border, white text.
- Inactive: white fill, Grey-7 border, Grey-8 text.
- Hover: white fill, black border, black text.
- Labels should be short and uppercase.

## HTML/CSS Implementation Notes

Prefer CSS variables from `app/src/index.css`:

- `--proton-bg`, `--proton-bg-subtle`, `--proton-bg-muted`
- `--proton-surface`, `--proton-surface-elevated`
- `--proton-border`, `--proton-border-strong`
- `--proton-fg`, `--proton-fg-muted`, `--proton-fg-subtle`
- `--proton-accent`, `--proton-accent-fg`, `--proton-accent-hover`, `--proton-accent-subtle`
- `--proton-danger`, `--proton-success`, `--proton-warning`, `--proton-info`

Use the provided utility classes as references:

- `.type-h1` through `.type-h5`
- `.proton-button`, `.proton-button--primary`, `.proton-button--secondary`, `.proton-button--tertiary`
- `.proton-badge`, `.proton-badge--red`, `.proton-badge--black`
- `.form-label`, `.form-control`, `.form-control--error`
- `.proton-tab`, `.proton-tab--active`
- `.angled-right`, `.angled-left`, `.angled-both`, `.angled-tab`, `.angled-badge`

Reference files:

- `proton-design-system-v2/proton-design-system.md`
- `proton-design-system-v2/app/src/index.css`
- `proton-design-system-v2/app/src/core/proton-theme.ts`
- `proton-design-system-v2/app/src/sections/ProtonComponents.tsx`
- `proton-design-system-v2/app/src/sections/ProtonTemplates.tsx`

## QA Calibration Checklist

Before calling a page Proton-aligned, check:

- Kanit is loaded and applied.
- Desktop and mobile type sizes match the scale.
- Main CTAs use angled Proton button geometry.
- Button states exist: default, hover, pressed, disabled.
- Dark backgrounds use white filled CTAs where needed.
- Badges are short, uppercase and not used as buttons.
- Inputs/dropdowns show labels and all relevant states.
- Error state is visible through both border and text color.
- Tabs are angled, uppercase, short and single-select.
- Grey-7 or lighter text is not used as body text on white.
- Keyboard focus is visible.
- Mobile tap targets are comfortable.
- Text does not overflow or overlap on mobile and desktop.
