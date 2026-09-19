/**
 * Renders the static assets that are authored as HTML but shipped as binaries:
 * the resume PDF, the social share card, and the apple-touch-icon.
 *
 *   npm install --no-save playwright && npx playwright install chromium
 *   npm run assets           # everything
 *   npm run assets resume    # just one target
 *
 * Playwright is deliberately not a dependency — it would add ~100 MB to every
 * CI install for something only run by hand a few times a year.
 */
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const url = (p) => pathToFileURL(path.resolve(p)).href;

const targets = {
  /**
   * Resume: A4 PDF. Page margins come from the @page rule in the stylesheet.
   *
   * The resume is meant to be one page, and it is easy to push it to two by
   * adding a sentence — so this measures the rendered height at the real print
   * width first and says how much room is left. Without that check a second,
   * nearly-empty page appears silently.
   */
  async resume(browser) {
    const out = 'public/BorislavTsvetkovResume.pdf';
    const mm = (v) => (v / 25.4) * 96;
    const PAGE = { width: mm(210 - 28), height: mm(297 - 20) }; // A4 less @page margins

    const page = await browser.newPage({
      viewport: { width: Math.round(PAGE.width), height: Math.round(PAGE.height) },
    });
    await page.goto(url('tools/resume.html'), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: 'print' });

    const height = await page.evaluate(() => document.body.scrollHeight);
    const spare = Math.round(PAGE.height - height);
    console.log(
      spare >= 0
        ? `  fit: ${spare}px of vertical room left on page 1`
        : `  WARNING: content overflows page 1 by ${-spare}px — it will render as 2 pages`,
    );

    await page.pdf({
      path: out,
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      preferCSSPageSize: true,
    });
    await page.close();
    return out;
  },

  /** Share card: 1200x630 is what LinkedIn, Slack and X expect. */
  async og(browser) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await page.goto(url('tools/og.html'), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'public/og.png' });
    await page.close();
    return 'public/og.png';
  },

  /** iOS ignores SVG favicons, so the touch icon is rasterised from the same file. */
  async icon(browser) {
    const page = await browser.newPage({ viewport: { width: 180, height: 180 } });
    await page.goto(url('public/favicon.svg'), { waitUntil: 'load' });
    await page.waitForTimeout(200);
    await page.screenshot({ path: 'public/apple-touch-icon.png' });
    await page.close();
    return 'public/apple-touch-icon.png';
  },
};

const requested = process.argv.slice(2);
const unknown = requested.filter((t) => !(t in targets));
if (unknown.length) {
  console.error(`unknown target(s): ${unknown.join(', ')}`);
  console.error(`available: ${Object.keys(targets).join(', ')}`);
  process.exit(1);
}

const run = requested.length ? requested : Object.keys(targets);
const browser = await chromium.launch();
for (const name of run) {
  console.log(`wrote ${await targets[name](browser)}`);
}
await browser.close();
