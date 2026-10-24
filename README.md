# Gabriela Chavgova — AI & ML portfolio

A static Astro + TypeScript portfolio with Tailwind CSS 4’s Vite plugin, Markdown case studies, original archival images, and a keyboard/touch-accessible project timeline. No CMS, backend, analytics, or external font service.

## Local setup

In VS Code, open **Terminal → New Terminal** and select **PowerShell**. This checkout already has a portable Node.js 24 runtime in ignored `.tools/`, so you can run:

```powershell
Set-Location -LiteralPath 'C:\Users\chavg\Documents\github_website\chavgova.github.io'
$portfolioNodeDir = (Get-ChildItem .tools -Directory -Filter 'node-*-win-x64' | Select-Object -First 1).FullName
$env:Path = "$portfolioNodeDir;$env:Path"
node --version
npm.cmd ci
npm.cmd run dev
```

Open **http://localhost:4321** in your browser (or the Local URL printed by Astro if the port changes). Keep the terminal running. Saving source files updates the preview automatically. Press **Ctrl+C** in that terminal to stop it. These commands do not push or publish the site.

Run `npm.cmd ci` on first setup or when the lockfile changes; it is unnecessary for ordinary content edits. The PATH line applies to that terminal session, so repeat it when opening a new terminal if you use the portable runtime. For another checkout/computer, install **Node.js 24** from [nodejs.org](https://nodejs.org/en/download), reopen VS Code, and use `npm.cmd ci` followed by `npm.cmd run dev` without the portable PATH setup.

For a production-like preview, stop the dev server first, then run:

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run preview
```

Open the printed preview URL. After source changes, run the build again to update this production preview. **`dist/` is generated output and is overwritten by builds. Make content/layout edits in `src/`, rather than editing the `dist/index.html` or `dist/about/index.html` tabs.** Use the local HTTP server to view the site; opening built HTML as a file does not reproduce hosted asset paths.

Optional browser checks:

```powershell
npx.cmd playwright install chromium
npm.cmd run test:browser
```

The portable runtime is local tooling, not a runtime dependency of the deployed website. Test artifacts belong in ignored `.qa/`, `test-results/`, and `playwright-report/`. Dependencies are local to this project in `node_modules/` and are reproduced from `package-lock.json`.

## What to edit

| Content | File |
| --- | --- |
| Project metadata, timeline inclusion, expanded descriptions | `src/content/projects/*.md` |
| Typed metadata rules | `src/content.config.ts` |
| Profile, navigation, contacts, portrait/CV detection | `src/data/site.ts` |
| Professional experience and education | `src/data/experience.ts` |
| Selected and earlier awards | `src/data/awards.ts` |
| Confirmed publications and supporting records | `src/data/publications.ts` |
| Palette, typography, responsive layout | `src/styles/global.css` |
| Timeline rendering and lightweight interactions | `src/components/ProjectTimeline.astro`, `TimelineNode.astro`, `ProjectPreview.astro` |
| Expandable project cards, descriptions and media | `src/components/ProjectCard.astro`, `ProjectDetails.astro` |
| Project catalogue, filters and links to open cards | `src/pages/projects/index.astro` |
| Homepage intro and closing text | `src/components/Hero.astro`, `Contact.astro` |
| Deployment URL and optional project base | `astro.config.mjs` |

Detailed editing instructions: [Content guide](docs/CONTENT_GUIDE.md). Outstanding personal facts/assets: [Editorial review](docs/EDITORIAL_REVIEW.md).

Local verification covers strict checks, production/root and project-base builds, generated link/asset/fragment checks, and Chromium tests across three viewport sizes. See [verification details and limits](docs/VERIFICATION.md).

## Portrait, CV, and contacts

- Your supplied transparent portrait is installed at `public/images/portrait-transparent.webp`, optimized to 720 × 1279px (about 150KB). Its original composition and transparency are preserved. Replace this file to update the portrait and set its pixel dimensions in `site.portraitDimensions` in `src/data/site.ts`. Removing it restores the monogram on the next build.
- The supplied **current, approved PDF** is installed unchanged at `public/cv/gabriela-chavgova-cv.pdf`; Download CV and navigation CV actions are enabled. Replace this file with a newly approved PDF to update it. Removing it restores View Experience automatically. The old 2024 CV is never used.
- Confirmed GitHub, LinkedIn, and public email links are configured centrally in `src/data/site.ts`. The user explicitly approved the exact PDF, including its contact details and future-role/availability information. The phone number is not repeated in page copy.
- Current PDF and LaTeX facts have been reconciled where consistent. The MSc start month differs between them, so education uses year-level dates and an explicitly expected July 2027 completion. The source files remain outside the repository; only the approved PDF is installed.

## GitHub Pages deployment

The inspected remote is `https://github.com/chavgova/chavgova.github.io.git`, branch `main`. `site` is therefore `https://chavgova.github.io`, with **no repository base path**.

1. Review the content and missing assets in `docs/EDITORIAL_REVIEW.md`.
2. On GitHub, select **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. When you choose to publish, commit the reviewed source **including `package-lock.json`**, then push to `main` or run the workflow manually. `.github/workflows/deploy.yml` runs type checks and the static build/link checks, then deploys with the official Astro and GitHub Pages actions.

The initial implementation is **local only**: no commit, push, workflow dispatch, DNS change, or publication was performed.

For a project repository, set `SITE_BASE=/repository-name` for the build; all internal links/assets use the configured prefix. Verify with a build using that environment variable. `SITE_URL` can override the origin. For an **optional custom domain**, configure the verified domain in GitHub Pages and update `site` (or `SITE_URL`) to that HTTPS origin with no project base; add a matching `public/CNAME` only after you own and configure the domain. DNS setup is separate and was not changed.

The build publishes only `dist/`. The migration notes, raw archive text, original unused photographs, tooling, tests, and documentation are not copied to Pages. Keep archive ZIPs, old PDFs, personal information, and secrets out of Git history.

## Design and content behavior

Seven dated projects appear oldest-to-newest on the homepage; **the latest entry is selected initially** and entries sharing a year remain distinct. Desktop supports hover, keyboard focus, selection, Escape, and outside dismissal. Mobile uses vertical tap disclosures. Native `<details>` keeps project previews and expandable catalogue content available without JavaScript. Catalogue filtering uses one active category and includes each matching project once.

Eleven Markdown entries cover the supplied recent and historical work, including the LaTeX source’s ongoing thoracic-organ segmentation project. **There are no separate project pages.** “View project details” expands the card to reveal its Markdown description, images and public links. Only one card is open at a time; Escape closes it. Timeline/experience/about links use `/projects/#project-slug` and open the matching card. Opening a card updates the shareable URL; direct links reset filters so the linked work is visible. Without JavaScript, the native disclosure still opens by clicking its summary.

Seven dated projects remain on the homepage timeline; the imaging study is in the catalogue. Diffusion research includes the CV’s creativity-evaluation framework, HPC experiments, and scorer calibration. TNO appears only as an explicitly upcoming role on Experience, with the owner-approved high-level thesis topic.

Draft entries are excluded everywhere. Missing dates/images/links are supported; timeline inclusion requires a verified year. Original images are optimized through Astro and used only with their historical topic. Industry descriptions omit private data, unexplained performance/cost percentages, and unapproved implementation detail. Publication authorship is supported by the book’s contents and the National Library record.

The handwritten “I'm” uses a small self-hosted Caveat font subset at `src/assets/fonts/caveat-intro.ttf`, under the [SIL Open Font License](public/fonts/Caveat-OFL.txt). It was obtained from Google Fonts and makes no external font request at runtime. The portrait glow and edge blending use CSS; the source portrait file is unchanged.

Implementation references: [Astro content collections](https://docs.astro.build/en/guides/content-collections/), [Tailwind’s Astro Vite setup](https://tailwindcss.com/docs/installation/framework-guides/astro), [Astro’s GitHub Pages deployment guide](https://docs.astro.build/en/guides/deploy/github/).
