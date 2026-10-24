# Local verification

Performed locally on Windows with the portable Node.js 24 runtime, using the repository dependency lockfile. Repeated after integrating the current CV, portrait, hero refinements, larger desktop text, and expandable project catalogue. No GitHub push, workflow dispatch, publication, or DNS change was performed.

- `npm install`: completed; `package-lock.json` created and updated to match explicit compatible dependency ranges.
- `npm run check`: passed, with zero errors, warnings, or hints.
- `npm run build`: passed; generated five HTML pages (Home, Projects, Experience, About, 404) plus robots/sitemaps, the approved CV, local handwritten font, and optimized original project media. All eleven projects render as expandable cards within the catalogue; individual project routes were removed as requested.
- Built-output sanity check: 127 local URLs/assets/fragments/CSS resources validated across the five HTML pages and stylesheet, including the portrait, project anchors, and local font. Required routes present; archive text, archive ZIPs, and the old CV absent from published output.
- A separate `SITE_BASE=/portfolio-test` build passed the same checks. The final `dist/` was restored to the root configuration for `chavgova.github.io`.
- `npm run test:browser`: 22 passing Chromium tests; two mobile-only menu tests intentionally skipped in desktop/tablet projects. Viewports: 375px phone (touch emulation), 768px tablet, and 1440px desktop.
- Browser checks covered latest-project default selection, hover/focus/touch, same-year timeline markers, keyboard access to See more, Escape/outside dismissal, inline project expansion, direct hash links, filter resets for linked work, exclusive open cards, mobile navigation, no-JavaScript content/disclosures, and reduced-motion CSS.
- The newly approved CV was copied without modification: source and installed SHA-256 hashes matched. Browser tests downloaded it at all three viewports, checked the PDF signature, and verified downloaded-file hashes against the approved installed copy. TNO’s upcoming label/date and separation from completed work were also asserted.
- Every page and every expanded project was checked at all three viewports for document overflow, image loading, browser runtime errors, and axe WCAG A/AA automated accessibility violations. No violations remained. Automation does not replace assistive-technology testing or editorial review.
- Desktop/tablet/mobile home and catalogue screenshots were captured under ignored `.qa/` for visual review.
- Portrait integration: the supplied 941 × 1672 PNG was converted to a 720 × 1279 WebP (150,122 bytes) with its alpha channel and composition preserved. The source remains unchanged. Hero dimensions match the asset, with proportional, uncropped rendering. Strict checks/build and the three all-page browser accessibility/image/layout tests were repeated after this change.
- The refreshed hero uses CSS lighting and masks to blend the portrait with the page. Desktop/tablet secondary text was enlarged, and the handwritten introduction uses a local Caveat subset under the included SIL Open Font License. Desktop and tablet screenshots were visually reviewed after the changes.
- `git diff --check`: passed for tracked changes. All created source files remain uncommitted.

The first audit found a broken 404 canonical path and insufficient contrast on small red section labels. Both were corrected and checked again. The specified red remains on interactive accents; small section-number text uses a lighter accessible token.

Browser checks used Chromium, including touch emulation. Native Safari/Firefox and real-device/screen-reader testing were not performed. The GitHub Pages workflow is configured but has not been executed remotely.
