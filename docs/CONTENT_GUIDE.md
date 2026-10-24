# Maintaining the portfolio

## Add or edit a project

Edit `src/content/projects/<slug>.md`. The filename defines its shareable catalogue link, `/projects/#<slug>`. Keep filenames stable to preserve links. Each non-draft record supplies an expandable catalogue card and (when enabled) a timeline preview. There are no separate project pages.

```yaml
---
title: A specific project title
shortTitle: Compact timeline label
summary: One or two sentences explaining the problem and your contribution.
year: 2026
dateLabel: '2026'
sortKey: 110
categories: [Research, Computer Vision]
tags: [Model evaluation, Computer vision]
featured: true
showOnTimeline: true
role: Research contribution
context: Institution or public project setting
provenance: Owner-confirmed facts, with the source and verification context.
confidential: false
draft: true
diagram: [Input, Method, Output]
---
```

Write context/problem, personal contribution, technical method, results/lessons, and limitations as Markdown headings and prose below the metadata. Use `draft: true` while preparing a new entry; set it to false to include it. Do not copy example text as claims about real work.

Allowed categories: `Industry ML`, `NLP / LLMs`, `Computer Vision`, `Research`, `Robotics`, `Earlier Work`. Multiple categories are allowed. The catalogue shows only filters with matching public entries. Selecting a filter replaces the previous selection and includes each matching project once.

Catalogue order uses descending `sortKey`, then title. The Earlier Work group is separate. A sort key is an editorial priority, never a substitute for a date.

## Timeline inclusion and ordering

Set `showOnTimeline: true` **only with a verified `year`**. The schema rejects an undated timeline entry. Use `year` as the start year for a verified range; markers show this compact year. `dateLabel` supplies the full range/months in previews and cards. The timeline sorts by ascending year, then ascending sort key, then slug. **The final/latest entry is selected by default.** For same-year entries, a higher sort key appears later and can determine that initial selection. The seven markers include confirmed 2025–2026 work and the archive’s dated 2022/2024 research. The current CV extends the neuron study’s displayed period to 2024–2025.

Keep around five to seven entries on the home timeline. When adding a featured project, consider removing another from the timeline while keeping its card and description. Undated featured entries appear in a separate, explicitly undated list. Earlier undated projects remain in the catalogue. Never infer a project date from an award, file timestamp, or archive capture date.

## Images and diagrams

Keep original project media under `src/assets/` and reference it relative to the Markdown file:

```yaml
cover: ../../assets/legacy/robobuba-iterations.png
coverAlt: Describe what the image actually shows.
coverCaption: Explain its source and relevance.
gallery:
  - image: ../../assets/your-project/method.png
    alt: A concise description of the diagram.
    caption: What the diagram establishes, and what it does not.
```

Astro resolves these imports, knows their dimensions, and creates responsive WebP variants. Covers need meaningful alt text. Avoid private screenshots, transaction examples, and people/group photos without permission. Original supplied media are documented in `migration/legacy-site/ASSET_PROVENANCE.md`; source notes and the three original text extracts remain under `migration/legacy-site/` and never enter `dist/`.

Projects without photographs can use a three-step `diagram` array. These are explicitly conceptual method diagrams, not experimental plots, product screenshots, or evidence of results. Omit `cover` and `diagram` for the neutral default method graphic. A project does not need an image, year, or external link to render.

## External links and confidentiality

Use only confirmed public URLs:

```yaml
links:
  - label: Source code
    url: https://github.com/your-confirmed-account/your-real-project
```

Omit `links` when none are available; no disabled GitHub button is rendered. `confidential: true` displays “Code not public” and a short public-scope note. It does not enforce confidentiality: review the Markdown and all media before publication.

## Profile, professional history, education, awards

- `src/data/site.ts`: name, title, description, location, navigation, contacts. Empty contact values are omitted. Supply an email address without the `mailto:` prefix.
- `src/data/experience.ts`: organization, confirmed month/year range, CV-supported role title, context, summary, skills, and optional project slug. Education and the separately rendered upcoming TNO role are edited here too. Homepage snapshots use the first two entries with supporting project links.
- `src/data/awards.ts`: selected research recognition first, then optional earlier mathematics awards. Keep exact labels grounded in the archive or a verified record.
- `src/pages/about.astro`: biography, research questions, grouped skills and small personal note. Link skill groups to actual supporting work.
- `src/components/Hero.astro` and `Contact.astro`: personal introduction and closing message. The headline/title itself is in `site.ts`.
- `src/components/ProjectCard.astro` and `ProjectDetails.astro`: collapsed project summary and full inline descriptions/media. The catalogue script handles fragments, filtering, and keyboard dismissal.
- `src/data/publications.ts`: publication title, venue, date/ISBN, and confirmed public links. The current QUINN book chapter is supported by the book’s contents and the National Library catalogue.

Do not mark the MSc as completed: July 2027 is expected. TNO is explicitly upcoming for January–June 2027; show only the approved thesis topic and do not add completed-work claims. Future transitions to active/completed status require confirmation. Add publications only with confirmed authorship/status and real supporting links.

## Portrait and CV

1. Replace the real transparent WebP portrait at `public/images/portrait-transparent.webp` when needed. Preserve the image’s natural proportions and update `site.portraitDimensions` in `src/data/site.ts` to match its pixel width/height. The current file is 720 × 1279px; CSS fits it without cropping. Change `portraitPath` in `site.ts` if needed.
2. Install the approved current PDF at `public/cv/gabriela-chavgova-cv.pdf`. An existing file is treated as approved, so check it before copying. Do not install an old archived CV.
3. Rebuild/restart Astro: availability is determined at build time. Missing assets produce the intentional monogram and View Experience action, never broken links.

The currently installed PDF was explicitly approved unchanged, including its contact details, availability, and upcoming role. PDF source and extracted text are not stored in the repository. The owner-supplied portrait is installed as an optimized WebP; the original PNG is preserved at its external source path.

## Validate and deploy

Run `npm run check`, `npm run build`, then `npm run preview`. Run `npx playwright install chromium` once and `npm run test:browser` after interaction/layout changes. Browser checks cover mobile/tablet/desktop, no-JavaScript content, accessible disclosures/filters/navigation, contrast/semantic checks, images and overflow. Automation supplements human visual and content review.

All internal site URLs use `withBase()` from `site.ts`. Project links point to `projects/#<slug>`; `projectUrl()` in `src/lib/projects.ts` builds this path from a content entry. A direct hash link opens the right card and resets filters. Avoid reintroducing `/projects/<slug>/` routes or links. After changing the deployment base, run the production build with `SITE_BASE` set and inspect the link checker’s result.

For local setup, see the exact Windows PowerShell commands in the README. Edit source files under `src/`; `dist/` is generated and will be replaced on the next build. The dev server updates as you save, whereas the production preview needs a fresh build after edits.

GitHub Pages must use **Settings → Pages → GitHub Actions**. The workflow builds on `main` pushes and supports manual dispatch. Only push when you are ready to publish. The workflow versions follow the official Astro guide; review that guide when upgrading them. Update packages intentionally, retain `package-lock.json`, and run the checks after an upgrade.
