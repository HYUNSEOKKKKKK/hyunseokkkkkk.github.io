# Hyunseok Kim — Robotics portfolio

Live site: https://hyunseokkkkkk.github.io/

A static academic homepage with a short About, six recorded highlights, news,
and a filterable list of five research projects. The layout follows the light,
compact academic format of [Xuxin Cheng's homepage](https://xuxin.ai/).
All research descriptions, photos, and recordings refer to Hyunseok's projects
or the explicitly labelled DRCD Lab collaboration.

## Edit the homepage

- `index.html`: biography, education and experience, highlights, news, project
  descriptions, resource links, and the author-supplied BibTeX.
- `assets/css/styles.css`: responsive layout, typography, and visual design.
- `assets/js/main.js`: project filters, CV disclosure, citation copying, and
  visibility-aware video previews.
- `assets/media/sources.json`: recording provenance and preview hashes.

No build tools or frontend dependencies are needed. Open `index.html` or serve
the repository with `python3 -m http.server 8000`. GitHub Pages deploys the root
through `.github/workflows/pages.yml` whenever `main` changes.

## Content and media

The featured projects are GCS footstep planning, PiPER manipulation, Hopper,
KAIST Humanoid, and MARVEL's adaptive magnetic foot. Six video highlights
appear above the detailed research rows. All abstract decorative diagrams have
been removed.

- GCS uses the existing published TORO teaser, unchanged.
- PiPER uses the project's continuous four-transfer GIF, transcoded to muted
  H.264 with the original 4× playback. Boxes are hand-fed between transfers.
- Hopper uses the published outdoor trial excerpt at 1×, with an operator
  visible. The full recording and recovery remain accessible in its repository.
- KAIST Humanoid embeds the official DRCD Lab v0.7 field-test video, with a
  20–34 second preview segment. The player is revealed only after playback
  starts, so the lab photograph and direct YouTube link remain available when
  an embed cannot play.
- MARVEL includes the official DRCD Lab climbing video (2022), with a 10–26 second preview. The adaptive-foot project retains its own photographs; the official lab demo is labelled separately.
- A second Hopper highlight shows the indoor trial, source interval 20–30 seconds at 1×, with a rolling test frame and nearby operators.

Previews pause off screen and when the tab is hidden. The global preview toggle
and the visitor's reduced-motion preference are respected. Image posters and
links to the original resources remain available without autoplay.

## Biography and citations

The About text and expandable background retain the education and DLR research
experience from the previous homepage. The CV link opens this on-page background;
no downloadable CV PDF was present in the source.

The GCS citation is the exact BibTeX supplied by the author, with citation key
`kim2026humanoid` and publisher `IEEE`. Keep it synchronized with the paper
project page and repository when publication metadata changes.

Only verified public repositories are linked. KAIST Humanoid is labelled as a
DRCD Lab collaborative project; no private humanoid code is published here.
