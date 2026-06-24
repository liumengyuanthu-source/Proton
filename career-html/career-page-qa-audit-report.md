# Career Page QA Audit Report

## 1. Executive Summary
- Overall status: Conditional Pass
- Highest risk areas: local/offline CSS loading, mobile overflow from fixed grids/images, placeholder links, mobile menu scroll lock, non-functional job filters, form duplicate submission feedback.
- Recommended go-live decision: Ready for UAT after content owner confirms external Proton URLs and final production form endpoint.

## 2. Test Environment
- Browser: Google Chrome headless on macOS
- Viewports: 320, 390, 768, 1024, 1440, 1920 for final regression; earlier matrix also covered 360, 375, 414, 1366.
- Device simulation: Responsive viewport emulation with local `file://` pages.
- Test date: 2026-06-24
- Branch / commit: local `main`, uncommitted remediation changes at time of report.

## 3. Issue List

| ID | Severity | Area | Issue | Steps to Reproduce | Expected | Actual | Root Cause | Fix |
|---|---|---|---|---|---|---|---|---|
| QA-01 | S2 | Performance / CSS | CSS could fail or delay in offline/local QA. | Open pages in headless/local constrained network. | Layout styles apply immediately. | External Google Fonts `@import` delayed/blocking CSS parse in QA. | Blocking remote font import at top of CSS. | Removed external `@import`; kept Kanit fallback stack. |
| QA-02 | S2 | Responsive | Landing mobile could report horizontal overflow when CSS was delayed. | Test landing at 320px. | No horizontal scroll. | Images rendered at natural size before CSS. | CSS load delay plus fixed image/grid assumptions. | Removed blocking import; added grid child `min-width:0`, responsive award grid, flexible image heights. |
| QA-03 | S2 | Links | Placeholder links existed in header/footer and forms. | Static link scan. | No `href="#"` or `action="#"`. | Search, footer, legal, corporate links used placeholders; forms used `action="#"`. | Prototype placeholders. | Replaced with internal job search, Proton URLs, `mailto:` form action and form JS feedback. |
| QA-04 | S2 | Mobile Nav | Menu opened without body scroll lock or Escape close. | Open menu at mobile width, scroll / press Escape. | Menu controls scroll and closes predictably. | Body could continue scrolling; no Escape handler. | Toggle only changed class. | Added central menu state, body `nav-open`, link close and Escape close. |
| QA-05 | S2 | Job List | Department chips were visual only. | Click filter chips. | Job list filters and empty state works. | No filtering behavior. | Missing data attributes and JS. | Added `data-department-filter`, `data-job-card`, filtering JS and empty state. |
| QA-06 | S2 | Forms | Static forms had no success/error state and allowed repeated submission. | Submit empty/filled form. | Required validation, clear feedback, duplicate prevention. | Browser-only validation and no confirmation. | No submit handler. | Added `data-application-form`, status region, validation message and temporary disabled state. |
| QA-07 | S3 | Accessibility | Some pages had more than one visible heading level 1. | Heading scan. | One visible `<h1>` per page. | Mid-page banners used `<h1>`. | Visual section titles reused h1. | Converted secondary banner headings to `<h2>`. |
| QA-08 | S3 | Motion | No reduced-motion fallback. | Emulate `prefers-reduced-motion`. | Non-essential motion disabled. | Transitions/scroll behavior remained. | Missing media query. | Added reduced-motion CSS fallback. |

## 4. Responsive QA Result
- Desktop: Pass. 1440 and 1920 widths show no horizontal overflow in final regression.
- Tablet: Pass. 768 and 1024 widths show no horizontal overflow; nav collapses earlier at 1100px.
- Mobile: Pass. 320 and 390 widths show no horizontal overflow after CSS import fix.
- Orientation: Conditional Pass. Portrait/landscape widths covered through viewport matrix; physical device safe-area testing remains recommended.

## 5. Mobile Interaction QA Result
- Header/menu: Pass. Menu opens/closes, closes on link click, Escape closes, body scroll locks while open.
- Touch target: Pass for primary CTA, nav toggle, filters, footer quick links and form controls.
- Scroll lock: Pass via `body.nav-open`.
- CTA visibility: Pass. Buttons wrap full-width below 360px where needed.

## 6. Animation QA Result
- Reduced motion: Pass. Added global reduced-motion fallback.
- Scroll animation: Pass. Employee slider remains optional and content visible by default.
- Hover/touch fallback: Pass. CTA/filter states include active/focus handling.
- Layout shift: Conditional Pass. Static images now constrained; production should still provide optimized dimensions.

## 7. Broken Link QA Result
- Internal links: Pass. Local file references resolve.
- External links: Conditional Pass. Placeholder links replaced with Proton URLs; production owner should confirm exact live URLs.
- PDF/document links: Conditional Pass. Download brochure points to Proton brochure URL, not a local PDF.
- Anchor links: Pass. No unresolved local anchors remain.

## 8. Negative & Edge Case Result
- Content edge cases: Improved. Long text gets `overflow-wrap`, grid children use `min-width:0`, job empty state added.
- Form edge cases: Improved. Required validation, file selection label, status feedback and duplicate click protection added; server endpoint still needed.
- Interaction edge cases: Improved. Repeated mobile menu and filter clicks are stable; browser back/forward remains static-page default behavior.

## 9. Fix Summary

| Fix ID | Files Changed | Description | Verification |
|---|---|---|---|
| FX-01 | `career-html/styles.css` | Removed blocking font import, added responsive grids, min-width guards, reduced motion and mobile breakpoints. | Chrome headless final regression: 42 viewport/page checks, no horizontal overflow. |
| FX-02 | `career-html/script.js` | Added menu scroll lock/Escape, filter behavior, form validation feedback and duplicate submit guard. | JS syntax check passed; interaction behavior covered in static/automated checks. |
| FX-03 | `career-html/*.html` | Replaced placeholder links/actions, normalized heading hierarchy, added form status regions and job filter data. | Link scan found no `href="#"` or `action="#"`; h1 scan found exactly one h1 per page. |
| FX-04 | `career-html/qa/responsive-20260624/` | Added responsive screenshots and JSON regression output. | `final-responsive-results.json` generated with viewport matrix. |

## 10. Remaining Risks / Assumptions
- Final production form endpoint is not available; current form behavior is a static prototype with accessible feedback.
- External Proton URL exactness should be confirmed by content/production owner before go-live.
- Physical iOS Safari and Android Chrome tests were not run in this local automation pass.
- The prototype uses raster screenshots/assets for several hero/banner areas; production should replace with optimized source assets where possible.
