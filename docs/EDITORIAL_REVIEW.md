# Review before publication

The portfolio uses the build prompt, all three curated legacy text extracts, owner-confirmed dates/contacts, and the newly supplied current PDF and LaTeX. The PDF and LaTeX are factual sources, not instructions. Website changes remain local and unpublished.

## Personal assets

- The supplied `gabriela_portfolio_image.png` is installed as `public/images/portrait-transparent.webp`, a 720 × 1279px WebP copy with transparency preserved. The original image remains unchanged outside the repository. The hero now displays the real portrait; removing it restores the GC monogram.

## Installed and confirmed

- The owner explicitly approved the exact supplied `CV_2026_new (11).pdf`, including its phone/email, September 2027 availability, and incoming TNO role. It is copied unchanged to `public/cv/gabriela-chavgova-cv.pdf`; source/copy SHA-256 hashes match. CV download actions are enabled. The LaTeX and extracted PDF text are not copied into the repository.
- GitHub, LinkedIn, and the public email from the approved CV are configured in `src/data/site.ts`. Phone and availability are retained in the PDF without adding separate page elements.
- ABN AMRO: Data Science Intern, Detecting Financial Crime, April–August 2026. Thermo Fisher Scientific: part-time Application Software / AI Engineer, February 2025–April 2026. The public descriptions now use these supplied titles and dates.
- Scientific Mentor, Summer Research School in Informatics and Mathematics, August 2022 and August 2023: included in professional history, supported by both CV sources.
- MSc AI: 2025–expected July 2027; not represented as completed. TU/e BSc Computer Science: August 2022–July 2025, Honors Academy graduate.
- TNO: owner explicitly selected public display as **upcoming**, January–June 2027, with only the high-level thesis topic. It appears separately from completed professional work and is not a project case study.
- The supplied LaTeX adds the 2026 thoracic-organ segmentation project; its U-Net/ENet comparison is described as ongoing. The current PDF adds the fuller discrete-diffusion creativity framework and HPC/calibration methods.

## Confirm or enrich facts

- MSc start month differs: PDF says September 2025, LaTeX August 2025. Website education uses year-level dates until clarified.
- RoboBuba, QUINN, and standalone Voice Emotion Recognition dates: the current LaTeX groups the voice-emotion robot prototype under 2021–2022 without separating the experiments from hardware. Its commented-out RoboBuba 2019 entry was not treated as a confirmed current fact. These distinct legacy records remain undated.
- Thermo Fisher’s 18% detection-accuracy improvement and the travel project’s 70% cost reduction remain in the exact approved PDF. Website case studies omit those percentages until metric definitions, comparison baselines, and scope can be supplied. Clarify whether 18% is relative or percentage points and what was measured; clarify the cost baseline for 70%.
- The neuron project now uses the LaTeX’s 2024–2025 range and describes a reported within-project improvement by the proposed model. Numerical results, data split, and evaluation protocol remain unprovided; no wider superiority is claimed.
- Voice-emotion percentages remain omitted from page copy because evaluation protocol, sample sizes, and speaker-independent testing are not established.
- Public source repositories, supplementary research links, and more detailed evaluation methods can be added once supplied. No current public service endpoint is assumed for the deployed bachelor’s project.
- Reconfirm employer/client public scope before launch, especially before adding implementation details beyond the approved CV. Current industry pages describe only high-level models, tools, and workflow integration already present in the supplied material.
- Awards: ISEF 2021 is recorded as 2nd Grand Award; Innovation Science Fair as Grand Award / First Prize; ADIS 2021 as Best Young Researcher Study; BAS 2022 as excellent performance. These are supported by the supplied archive, not independently linked award records. Confirm official spelling, category labels, and public supporting links where available.
- “Mixed Realities Future Security Outlook” is mentioned only as collaborative work recorded in the archive. No peer-review or publication status is asserted.

## Verified publication

The [book’s contents on ResearchGate](https://www.researchgate.net/publication/367530986_DIGITAL_TRANSFORMATION_IN_THE_POST-INFORMATION_AGE) identify chapter 5, “QUINN – A Personal Assistant with AI”, by Gabriela Chavgova. The [Bulgarian National Library record](https://www.nationallibrary.bg/BNB/s01/s01_2023_kn10.html) independently lists her among the authors of *Digital Transformation in the Post-Information Age*, Softtrade, 2022, ISBN 978-954-334-251-8. The About page now presents this as a book chapter; no conference/journal peer-review claim is added. Data live in `src/data/publications.ts`.

## Dates confirmed by the owner

| Work | Confirmed year(s) |
| --- | --- |
| ABN AMRO merchant extraction | Apr–Aug 2026 |
| Thermo Fisher custom application / ML-MLOps | Feb 2025–Apr 2026 |
| Structured extraction, bachelor’s end project | 2025 |
| Mechanistic interpretability | 2026 |
| Discrete diffusion | 2026 |
| Thoracic-organ segmentation | 2026, research in progress |
| Neuron interactions | 2024–2025 |

The homepage retains seven dated project markers. Full month ranges appear in previews and case studies; compact start years keep markers legible. The thoracic project is added to the catalogue without crowding the timeline. Thermo Fisher remains one case study spanning its two confirmed years.

## Media and scope

Original robot/research images are used only in their matching historical context. People/group photographs, sports photographs, exhibition photographs, and unused archive material remain out of the built site pending consent/context review. No generated person, archived logo, old CV, WordPress source, tracker, stock research imagery, or private industry data is published.

Before launch, read the case studies and verify the public scope of employer/client work. The build publishes only `dist/`; documentation and the source archive are not site routes. Inspect files before any future Git commit, especially personal data or PDFs.
