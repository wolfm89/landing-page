<p align="center">
  <img src="assets/logo.svg" alt="Wolfgang Moser growth-rings logo" width="72" height="72">
</p>

<h1 align="center">wolfgangmoser.eu</h1>

<p align="center">Personal landing page for Wolfgang Moser — cloud, data and AI.</p>

Plain HTML, CSS and a few lines of JavaScript. No build step, no framework. The page is
validated and deployed by the GitHub Actions workflow in `.github/workflows/pages.yml`
on pushes to `main`.

## Local preview

```sh
python3 -m http.server 8000
```

Then open <http://127.0.0.1:8000/>.

## Pre-commit

The repository uses [pre-commit](https://pre-commit.com/) for local checks that mirror CI.

```sh
pre-commit install
pre-commit run --all-files
```

The hooks cover HTML validation, JSON-LD and local asset checks, YAML/JSON syntax,
whitespace and line endings, large files, private keys and workflow linting. `scripts/check.py`
also fails if a page loads fonts from Google, if a page directory is missing from the deploy
step in `pages.yml`, or if an indexable page is missing from `sitemap.xml`. The same
configuration runs in CI through `pre-commit/action`.

## Pull requests

Use [Conventional Commits](https://www.conventionalcommits.org/) for pull request titles,
for example `feat: add ...`, `fix: ...`, `docs: ...` or `ci: ...`. Squash merges use the
PR title as the commit title, and the `title` check enforces the convention.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Landing page, metadata and `Person`/`ProfilePage` JSON-LD |
| `styles.css` | Warm paper, forest palette, wood grain and motion |
| `script.js` | Theme toggle and footer year |
| `404.html` | Not-found page |
| `legal-notice/index.html` | Bilingual Impressum / Legal Notice |
| `privacy-policy/index.html` | Bilingual Datenschutz / Privacy Policy |
| `.github/workflows/pages.yml` | Pull request checks and GitHub Pages deployment |
| `.github/workflows/pr-title.yml` | Conventional Commit PR title check |
| `.pre-commit-config.yaml` | Local pre-commit hooks |
| `scripts/check.py` | JSON-LD, local asset, font, deploy-list, sitemap and CNAME checks |
| `CNAME` | Custom domain for GitHub Pages |
| `robots.txt` | Crawl rules and sitemap reference |
| `sitemap.xml` | Canonical URLs of the landing page and the legal pages |
| `assets/` | Portrait, logo, favicons, social image, fonts |
| `assets/fonts/` | Self-hosted Fraunces and IBM Plex Sans (WOFF2) with their OFL licences |
| `assets/logo.svg` | Primary growth-rings logo (SVG source) |
| `assets/logo-small.svg` | Simplified 16px favicon variant |
| `assets/me.png` | Portrait, copied from the blog's source image |
| `assets/og-image.png` | 1200×630 social sharing card |

## Deployment

1. GitHub Pages: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
   The `pages.yml` workflow validates pull requests and deploys `main`.
2. Custom domain: `wolfgangmoser.eu` (also stored in `CNAME`).
3. At your DNS provider, point the apex domain and `www` to GitHub Pages. GitHub requires
   specific `A`/`AAAA` records for the apex and a `CNAME` for `www`; use the values in
   [GitHub's custom domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site),
   as they can change. Leave unrelated records (subdomains, MX, TXT and validation records)
   unchanged.
4. After GitHub verifies the domain, enable **Enforce HTTPS**.

A repository ruleset protects `main`: pull requests are required, the `check` job must
pass, linear history is enforced, and force pushes and deletions are blocked. Only squash
merges are enabled.

## Fonts

Fraunces and IBM Plex Sans are self-hosted from `assets/fonts/`, declared with `@font-face`
at the top of `styles.css`, and the two used on every page are preloaded. They are the Latin
and Latin Extended subsets from Fontsource 5.3.0 under the SIL Open Font License; Fraunces
is instanced at weight 600 with its optical-size axis kept, matching what the page used from
Google Fonts:

```sh
fonttools varLib.instancer fraunces-latin-opsz-normal.woff2 wght=600 -o fraunces-latin-opsz-600.woff2
```

The blog uses the same files. Bump the `styles.css?v=` query in every HTML file when the CSS
changes.

## Legal pages

`/legal-notice/` and `/privacy-policy/` cover all three sites: this page, the blog and
Train Price Monitor. Both are bilingual; in the privacy policy the German version prevails.
The policy describes what the three sites actually do, so update it, including the
"Stand / Last updated" date, before or together with any change to hosting, fonts, browser
storage, logging, third parties or retention in any of the three repositories. Train Price
Monitor keeps the matching engineering notes in `docs/privacy.md`.

## Content notes

The landing page intentionally exposes only public professional information: name, role,
city, topics, one certification, and links. The legal pages additionally publish the
serviceable postal address and the role address `legal@wolfgangmoser.eu` for legal
contact. The site does **not** publish a phone number, private email address, employer,
full CV, client names, or project metrics.
