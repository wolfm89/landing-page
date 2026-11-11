#!/usr/bin/env python3
"""Validate the landing page's JSON-LD, local assets, deployment list, sitemap and CNAME."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PAGES = (
    "index.html",
    "404.html",
    "legal-notice/index.html",
    "privacy-policy/index.html",
)

# The privacy policy promises that no third party is contacted to render text.
FORBIDDEN_HOSTS = ("fonts.googleapis.com", "fonts.gstatic.com")


def fail(message: str) -> None:
    print(message, file=sys.stderr)
    raise SystemExit(1)


def check_json_ld() -> None:
    source = (ROOT / "index.html").read_text(encoding="utf-8")
    blocks = re.findall(
        r'<script type="application/ld\+json">(.*?)</script>',
        source,
        re.S,
    )
    for index, block in enumerate(blocks, 1):
        try:
            json.loads(block)
        except json.JSONDecodeError as error:
            fail(f"index.html: JSON-LD block {index} is invalid: {error}")


def check_local_references() -> None:
    for name in PAGES:
        text = (ROOT / name).read_text(encoding="utf-8")
        refs = re.findall(r'(?:href|src)="(/[^"#?]*)', text)
        missing = [ref for ref in refs if not (ROOT / ref.lstrip("/")).exists()]
        if missing:
            fail(f"{name}: missing local assets: {missing}")

    css = (ROOT / "styles.css").read_text(encoding="utf-8")
    urls = re.findall(r'url\("?(/[^")]+)"?\)', css)
    missing = [url for url in urls if not (ROOT / url.lstrip("/")).exists()]
    if missing:
        fail(f"styles.css: missing local assets: {missing}")


def check_no_third_party_fonts() -> None:
    for name in (*PAGES, "styles.css"):
        text = (ROOT / name).read_text(encoding="utf-8")
        hosts = [host for host in FORBIDDEN_HOSTS if host in text]
        if hosts:
            fail(f"{name}: loads fonts from {hosts}; fonts must stay self-hosted")


def check_deployment_and_sitemap() -> None:
    workflow = (ROOT / ".github/workflows/pages.yml").read_text(encoding="utf-8")
    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    for name in PAGES:
        if "/" in name:
            directory = name.split("/", 1)[0]
            if not re.search(rf"cp -r [^\n]*\b{re.escape(directory)}\b", workflow):
                fail(f".github/workflows/pages.yml does not deploy {directory}/")

        text = (ROOT / name).read_text(encoding="utf-8")
        canonical = re.search(r'<link rel="canonical" href="([^"]+)">', text)
        indexable = not re.search(r'<meta name="robots" content="[^"]*noindex', text)
        if canonical and indexable and f"<loc>{canonical.group(1)}</loc>" not in sitemap:
            fail(f"sitemap.xml is missing {canonical.group(1)}")


def main() -> None:
    check_json_ld()
    check_local_references()
    check_no_third_party_fonts()
    check_deployment_and_sitemap()

    cname = (ROOT / "CNAME").read_text(encoding="utf-8").strip()
    if cname != "wolfgangmoser.eu":
        fail(f"CNAME contains {cname!r}, expected 'wolfgangmoser.eu'")

    print("JSON-LD, local assets, fonts, deployment list, sitemap and CNAME OK")


if __name__ == "__main__":
    main()
