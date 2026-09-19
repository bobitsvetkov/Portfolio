# tools

Assets that ship as binaries but are authored as HTML, so changes show up as a
readable diff instead of an opaque blob.

| Source | Output | Used by |
| --- | --- | --- |
| `resume.html` | `public/BorislavTsvetkovResume.pdf` | Resume link, terminal `resume` command |
| `og.html` | `public/og.png` | `og:image` / `twitter:image` link previews |
| `../public/favicon.svg` | `public/apple-touch-icon.png` | iOS home screen |

Outputs land in `public/`, which is Vite's public directory, so they ship to
`dist/` as-is and are committed to the repo.

## Regenerating

Playwright is not a project dependency — it would add ~100 MB to every CI
install for something run by hand a few times a year:

```bash
npm install --no-save playwright
npx playwright install chromium

npm run assets          # all three
npm run assets og       # or a single target: resume | og | icon
```

## Resume layout notes

Serif throughout (Source Serif 4) with oldstyle figures, so dates sit into the
text instead of shouting. `photo.jpg` is kept but unused — the current design
has no portrait; re-add an `<img>` in the header if you want one back.

Two deliberate choices, both about how applicant tracking systems read PDFs:

- **Single column.** Multi-column resumes are frequently scrambled by ATS
  parsers, which follow the PDF text stream rather than the visual layout.
- **Native `list-style` bullets.** Custom bullets drawn with an absolutely
  positioned `::before` put each `<li>` into its own paint layer, which makes
  Chromium emit that text out of document order. The result looks correct to a
  human and parses as nonsense to a machine.

After editing the resume, check the machine-readable order, not just the render:

```bash
pdftotext -layout public/BorislavTsvetkovResume.pdf -
```

Bullets should appear directly beneath the job they belong to, and the whole
thing should still fit on one page.

## Share card notes

`og.png` states the current role and stack, so it goes stale when those change —
regenerate it alongside the resume. Absolute URLs are required in `index.html`;
crawlers do not resolve relative `og:image` paths.
