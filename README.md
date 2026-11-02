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
KAIST Humanoid, and MARVEL's adaptive magnetic foot. Five video highlights
appear above the detailed research rows. All abstract decorative diagrams have
been removed.

- GCS uses the existing published TORO teaser, unchanged.
- PiPER uses the project's continuous four-transfer GIF, transcoded to muted
  H.264 with the original 4× playback. Boxes are hand-fed between transfers.
- Hopper uses one continuous preview: outdoor trial source interval 2–10 seconds,
  then indoor trial source interval 20–30 seconds, both at 1×. The 18-second
  sequence loops as a single video. Operators and the indoor rolling test frame
  remain visible. Full recordings are accessible in the project repository.
- KAIST Humanoid embeds the official DRCD Lab v0.9 whole-body locomanipulation
  video, with a 20–34 second preview segment. The player is revealed only after
  playback starts, so the lab photograph and direct YouTube link remain available
  when an embed cannot play.
- MARVEL uses the two author-uploaded climbing experiment videos in their
  requested order: `미디어3.mp4`, then `미디어1.mp4`. Both complete videos are
  concatenated without trimming or changing playback speed into one 117.87-second
  muted preview at 640×360 and 30 fps. The sequence loops after the second clip.
  The previous tabletop adaptive-foot preview and its poster have been removed.
  No MARVEL YouTube embed or link is used.

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
