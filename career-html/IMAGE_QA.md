# Career HTML Image QA

## Summary

Second pass completed after comparing against the live Proton site.

## Asset Decisions

- `career-hero.png`: Kept. Good resolution and relevant to people/career, but treated with a stronger Proton-style dark overlay for text legibility.
- `internship-hero.png`: Kept with contrast/saturation treatment. Subject is more corporate than automotive, so a Proton model strip was added immediately after the hero to restore brand context.
- `proton-live-x90-hero.jpg`: Added from the live site. Used for Job Listing hero and Career CTA because it has strong Proton automotive identity and wide hero composition.
- `proton-live-s70-hero.jpg`: Added from the live site. Used for Internship/Application CTA and one news image to avoid repeating weak award images.
- `award-2.png`, `award-3.png`: Kept only in the awards section. `award-1.png` was removed because the downloaded file was not a valid image.
- `story-1.png`, `story-2.png`: Kept. Resolution is acceptable; used in story/news areas where people/culture context matters.
- `footer-career.png`: No longer used for repeated CTA areas. It was visually too generic for the footer/CTA role.
- `model-x50.png`, `model-x70.png`, `model-x90.png`, `model-s70.png`: Added from the live site to create a Proton-style model strip and improve brand recognition.
- `proton-logo.png`: Added from the live site and used in the header.

## QA Criteria

- Resolution: displayed images should render at 1.5x or higher source-to-display ratio where possible.
- Composition: hero images need clear negative space for copy and visible subject matter.
- Brand fit: pages should show either Proton products, Proton corporate environment or people/talent context.
- Repetition: repeated placeholder images should be avoided unless they represent a carousel/mock state.
- Contrast: hero and CTA copy must remain readable over imagery.

## Final Browser Check

- All four HTML pages returned successfully from the local server.
- No missing local image/page references were found.
- In-browser QA found no broken images across Career, Internship, Job Listing and Application pages.
- Current narrow viewport check found no horizontal overflow.
- Header and footer now use the live Proton logo, black header/footer treatment, live-site nav labels, quick-link footer structure and Proton model imagery.

## Remaining Follow-Up

- Replace awards with final approved award artwork if available.
- Replace social/app placeholder badges with official SVG/icon assets when brand asset files are provided.
- If a dedicated Proton HR photo set exists, use those for Career and Internship hero images instead of generic/cropped Figma imagery.
