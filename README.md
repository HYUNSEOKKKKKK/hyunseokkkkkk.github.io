# Hyunseok Kim - Academic Robotics Portfolio

Static personal research website for Hyunseok Kim, Ph.D. Candidate in Mechanical Engineering at KAIST and a member of the Dynamic Robot Control & Design Lab.

Live URL: [https://hyunseokkkkkk.github.io](https://hyunseokkkkkk.github.io)

## Structure

```text
.
|-- index.html                    # All homepage content and metadata
|-- assets/
|   |-- css/styles.css            # Responsive layout and visual system
|   |-- js/main.js                # Navigation, active links, and reveal behavior
|   |-- images/                   # Hero, favicon, and future media
|   `-- cv/                       # CV PDF destination
|-- projects/                     # Future dedicated project pages
|-- .github/workflows/pages.yml   # GitHub Pages deployment
|-- .nojekyll                     # Disables Jekyll processing
|-- robots.txt
`-- sitemap.xml
```

The site has no framework, package manager, build step, or third-party JavaScript dependency.

## Run locally

You can open `index.html` directly, or serve the directory locally for the closest match to GitHub Pages:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Add a publication

1. Open `index.html` and find the `PUBLICATION ITEM` comment.
2. Duplicate the `<article class="publication-item">` block.
3. Replace the title and verified author, venue, year, and status details.
4. Replace a disabled resource button with an `<a>` only after its destination exists.
5. Keep Hyunseok Kim inside `<strong>` in the author list.

Do not add a venue, acceptance status, DOI, author, or resource URL until it is verified.

## Add a project

1. Open `index.html` and find the `PROJECT ITEM` comment or the `.project-grid` block.
2. Duplicate the appropriate project article.
3. Add media under `assets/images/projects/`.
4. Replace the matching `.project-media` or `.project-visual` placeholder with an `<img>`, `<video>`, or `<picture>` element.
5. Add resource links only when their destinations exist.

Use `projects/project-slug/index.html` for a dedicated project page. The `projects/README.md` file records the expected path convention.

### Private research repositories

Several project descriptions are derived from private research implementations. Keep those repositories private unless they have been reviewed for release. On the public website:

1. Describe only research goals, methods, and systems that are safe to disclose.
2. Do not link visitors to a private repository.
3. Keep the code control disabled or label it as private until a public release exists.
4. Review images, videos, datasets, benchmark numbers, and paper status before publishing them.

## Replace the profile image

The About section currently uses the public GitHub avatar URL. To use a local portrait:

1. Add the image as `assets/images/profile.jpg`.
2. In `index.html`, replace the `src` in `.profile-image-frame img` with `assets/images/profile.jpg`.
3. Keep the image square or use a portrait with enough room for a square crop.

## Add the CV

1. Add the PDF at `assets/cv/Hyunseok_Kim_CV.pdf`.
2. Replace the disabled button in the `#cv` section with the link shown in `assets/cv/README.md`.

Until the PDF exists, the website deliberately shows a disabled CV button and does not create a broken link.

## Add social links

In the `#contact` section of `index.html`, the Google Scholar, LinkedIn, and YouTube rows are marked `contact-placeholder`. Replace each known placeholder with an anchor using the same structure as the GitHub row:

```html
<a href="VERIFIED_URL" target="_blank" rel="noreferrer">
  <span>Service name</span><span aria-hidden="true">&#8599;</span>
</a>
```

## GitHub Pages deployment

The workflow in `.github/workflows/pages.yml` deploys the repository root whenever a commit reaches `main`. It can also be run manually from the Actions tab.

For the first deployment, confirm **Settings > Pages > Source** is set to **GitHub Actions**. After that, every push to `main` publishes the current static files to `https://hyunseokkkkkk.github.io`.

The `.nojekyll` file ensures GitHub Pages serves the repository as plain static files.
