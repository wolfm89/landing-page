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
whitespace and line endings, large files, private keys and workflow linting. The same
configuration runs in CI through `pre-commit/action`.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Landing page, metadata and `Person`/`ProfilePage` JSON-LD |
| `styles.css` | Warm paper, forest palette, wood grain and motion |
| `script.js` | Theme toggle and footer year |
| `404.html` | Not-found page |
| `.github/workflows/pages.yml` | Pull request checks and GitHub Pages deployment |
| `.pre-commit-config.yaml` | Local pre-commit hooks |
| `scripts/check.py` | JSON-LD, local asset and CNAME checks |
| `CNAME` | Custom domain for GitHub Pages |
| `robots.txt` | Crawl rules and sitemap reference |
| `sitemap.xml` | Single canonical URL |
| `assets/` | Portrait, logo, favicons, social image |
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

## Content notes

The page intentionally exposes only public professional information: name, role, city,
topics, one certification, and links. It does **not** publish the postal address,
phone number, private email, employer, full CV, client names, or project metrics.
