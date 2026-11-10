<p align="center">
  <img src="assets/logo.svg" alt="Wolfgang Moser growth-rings logo" width="72" height="72">
</p>

<h1 align="center">wolfgangmoser.eu</h1>

<p align="center">Personal landing page for Wolfgang Moser — cloud, data and AI.</p>

Plain HTML, CSS and a few lines of JavaScript. No build step, no framework. The page is
served by GitHub Pages from the root of the `main` branch.

## Local preview

```sh
python3 -m http.server 8000
```

Then open <http://127.0.0.1:8000/>.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Landing page, metadata and `Person`/`ProfilePage` JSON-LD |
| `styles.css` | Warm paper, forest palette, wood grain and motion |
| `script.js` | Theme toggle and footer year |
| `404.html` | Not-found page |
| `CNAME` | Custom domain for GitHub Pages |
| `robots.txt` | Crawl rules and sitemap reference |
| `sitemap.xml` | Single canonical URL |
| `assets/` | Portrait, logo, favicons, social image |
| `assets/logo.svg` | Primary growth-rings logo (SVG source) |
| `assets/logo-small.svg` | Simplified 16px favicon variant |
| `assets/me.png` | Portrait, copied from the blog's source image |
| `assets/og-image.png` | 1200×630 social sharing card |

## Deployment

1. GitHub Pages: **Settings → Pages → Deploy from a branch → `main` / `/ (root)`**.
2. Custom domain: `wolfgangmoser.eu` (also stored in `CNAME`).
3. At your DNS provider:
   - `A @` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME www` → `wolfm89.github.io`
   - Leave unrelated records (subdomains, MX, TXT and validation records) unchanged.
4. After the DNS check passes, enable **Enforce HTTPS**.

## Content notes

The page intentionally exposes only public professional information: name, role, city,
topics, one certification, and links. It does **not** publish the postal address,
phone number, private email, employer, full CV, client names, or project metrics.
