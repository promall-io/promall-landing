import { mkdir } from 'node:fs/promises';

const BASE = process.env.QA_BASE_URL ?? 'http://localhost:4526';
const OUT = 'docs/qa';

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

const { chromium } = await import('playwright').catch(() => ({ chromium: null }));

if (!chromium) {
  console.error('playwright is not installed here — capture the clone with the MCP browser instead.');
  process.exit(1);
}

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();

for (const viewport of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const height = await page.evaluate(async () => {
    const total = document.body.scrollHeight;
    for (let y = 0; y < total; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 700));
    return document.body.scrollHeight;
  });
  await page.screenshot({ path: `${OUT}/clone-${viewport.name}.png`, fullPage: true });
  console.log(`${viewport.name}: ${viewport.width}x${height}`);
  await page.close();
}

await browser.close();
