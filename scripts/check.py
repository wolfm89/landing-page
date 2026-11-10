#!/usr/bin/env python3
"""Validate the landing page's JSON-LD, local assets and CNAME."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    print(message, file=sys.stderr)
    raise SystemExit(1)


def main() -> None:
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

    for name in (
        "index.html",
        "404.html",
        "legal-notice/index.html",
        "privacy-policy/index.html",
    ):
        text = (ROOT / name).read_text(encoding="utf-8")
        refs = re.findall(r'(?:href|src)="(/[^"#?]*)', text)
        missing = [ref for ref in refs if not (ROOT / ref.lstrip("/")).exists()]
        if missing:
            fail(f"{name}: missing local assets: {missing}")

    cname = (ROOT / "CNAME").read_text(encoding="utf-8").strip()
    if cname != "wolfgangmoser.eu":
        fail(f"CNAME contains {cname!r}, expected 'wolfgangmoser.eu'")

    print("JSON-LD, local assets and CNAME OK")


if __name__ == "__main__":
    main()
