import { createRequire } from 'node:module';
import { mkdir, copyFile, access, stat } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const SOURCE = path.join(PUBLIC, '_source');
const QA = path.join(ROOT, 'docs', 'qa');

const TOKENS = readTokens();

function readTokens() {
  const css = readFileSync(path.join(ROOT, 'app', 'globals.css'), 'utf8');
  const tokens = new Map();
  for (const [, name, value] of css.matchAll(/^\s*(--[a-z0-9-]+):\s*(#[0-9a-f]{6});\s*$/gim)) {
    tokens.set(name, value.toLowerCase());
  }
  return tokens;
}

function token(name) {
  const value = TOKENS.get(name);
  if (!value) throw new Error(`${name} is not authored in app/globals.css`);
  return value;
}

const PAGE_BG = token('--pw-black');

/* Luminance→colour ramp every landscape and blog asset is remapped onto: the
   page canvas at black, the ink surfaces through the midtones, sky and gold at
   the highlights. */
const INK_RAMP = [
  [0.0, PAGE_BG],
  [0.16, token('--pw-retint-deep')],
  [0.34, token('--surface-card')],
  [0.5, token('--ink-700')],
  [0.66, token('--pw-rose')],
  [0.8, token('--pw-retint-steel')],
  [0.9, token('--sky')],
  [1.0, token('--gold')],
];

const PALETTE = [
  '--pw-black',
  '--pw-paper',
  '--pw-surface-1',
  '--surface-card',
  '--ink-700',
  '--pw-rose',
  '--sky',
  '--text-body',
  '--gold',
].map((name) => [name, token(name)]);

const ASSETS = [
  { src: 'landscape/hill-back.png', lo: 0.002, hi: 0.999, gamma: 1.5, lift: 0.02, top: 0.92, chroma: 0.14 },
  { src: 'landscape/hill-mid.png', lo: 0.002, hi: 0.998, gamma: 1.45, lift: 0.015, top: 0.74, chroma: 0.14 },
  { src: 'landscape/hill-front.png', lo: 0.002, hi: 0.998, gamma: 1.45, lift: 0.01, top: 0.62, chroma: 0.12 },
  { src: 'landscape/dunes.png', lo: 0.002, hi: 0.999, gamma: 1.25, lift: 0.02, top: 1.0, chroma: 0.16 },
  { src: 'landscape/stat-card-a.png', solid: token('--pw-retint-card-a') },
  { src: 'landscape/stat-card-b.png', solid: token('--pw-retint-card-b') },
  { src: 'blog/post-1.jpg', lo: 0.004, hi: 0.996, gamma: 1.12, lift: 0.03, top: 0.95, chroma: 0.18 },
  { src: 'blog/post-2.jpg', lo: 0.004, hi: 0.996, gamma: 1.18, lift: 0.03, top: 0.88, chroma: 0.18 },
  { src: 'blog/post-3.jpg', lo: 0.004, hi: 0.997, gamma: 1.05, lift: 0.03, top: 0.96, chroma: 0.18 },
];

const clamp255 = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function buildRampLut(ramp) {
  const stops = ramp.map(([pos, hex]) => [pos, hexToRgb(hex)]);
  const lut = new Uint8Array(256 * 3);
  for (let i = 0; i < 256; i++) {
    const t = i / 255;
    let a = stops[0];
    let b = stops[stops.length - 1];
    for (let s = 0; s < stops.length - 1; s++) {
      if (t >= stops[s][0] && t <= stops[s + 1][0]) {
        a = stops[s];
        b = stops[s + 1];
        break;
      }
    }
    const span = b[0] - a[0];
    const k = span <= 0 ? 0 : (t - a[0]) / span;
    const e = k * k * (3 - 2 * k);
    for (let c = 0; c < 3; c++) {
      lut[i * 3 + c] = clamp255(Math.round(a[1][c] + (b[1][c] - a[1][c]) * e));
    }
  }
  return lut;
}

function luminanceHistogram(data, channels) {
  const hist = new Float64Array(256);
  let total = 0;
  for (let i = 0; i < data.length; i += channels) {
    const alpha = channels === 4 ? data[i + 3] : 255;
    if (alpha < 8) continue;
    const weight = alpha / 255;
    const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    hist[Math.round(clamp255(lum))] += weight;
    total += weight;
  }
  return { hist, total };
}

function percentile({ hist, total }, p) {
  const target = total * p;
  let acc = 0;
  for (let i = 0; i < 256; i++) {
    acc += hist[i];
    if (acc >= target) return i / 255;
  }
  return 1;
}

function buildToneLut({ black, white, gamma, lift, top }) {
  const lut = new Uint8Array(256);
  const span = Math.max(white - black, 0.02);
  for (let i = 0; i < 256; i++) {
    let t = clamp01((i / 255 - black) / span);
    t = Math.pow(t, gamma);
    t = lift + t * (top - lift);
    lut[i] = clamp255(Math.round(clamp01(t) * 255));
  }
  return lut;
}

function retintPixels(data, channels, cfg, levels) {
  const rampLut = buildRampLut(INK_RAMP);
  const toneLut = buildToneLut({ ...cfg, ...levels });
  const chroma = cfg.chroma;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const base = toneLut[Math.round(clamp255(lum))] * 3;
    const cr = r - lum;
    const cg = g - lum;
    const cb = b - lum;
    data[i] = clamp255(Math.round(rampLut[base] + cb * chroma));
    data[i + 1] = clamp255(Math.round(rampLut[base + 1] + cg * chroma * 0.7));
    data[i + 2] = clamp255(Math.round(rampLut[base + 2] + cr * chroma));
  }
}

function paintSolid(data, channels, hex) {
  const [r, g, b] = hexToRgb(hex);
  for (let i = 0; i < data.length; i += channels) {
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function ensureSource() {
  for (const dir of ['landscape', 'blog']) {
    await mkdir(path.join(SOURCE, dir), { recursive: true });
  }
  for (const asset of ASSETS) {
    const dest = path.join(SOURCE, asset.src);
    if (!(await exists(dest))) {
      await copyFile(path.join(PUBLIC, asset.src), dest);
      console.log(`seeded pristine source: ${asset.src}`);
    }
  }
}

async function retintAsset(asset) {
  const srcPath = path.join(SOURCE, asset.src);
  const outPath = path.join(PUBLIC, asset.src);
  const image = sharp(srcPath);
  const meta = await image.metadata();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  let levels = null;
  if (asset.solid) {
    paintSolid(data, info.channels, asset.solid);
  } else {
    const histogram = luminanceHistogram(data, info.channels);
    levels = { black: percentile(histogram, asset.lo), white: percentile(histogram, asset.hi) };
    retintPixels(data, info.channels, asset, levels);
  }

  const pipeline = sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  });

  if (meta.format === 'jpeg') {
    await pipeline.jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(outPath);
  } else {
    await pipeline.png({ compressionLevel: 9, effort: 10 }).toFile(outPath);
  }

  const outMeta = await sharp(outPath).metadata();
  return {
    src: asset.src,
    hasAlpha: Boolean(outMeta.hasAlpha),
    channels: outMeta.channels,
    before: (await stat(srcPath)).size,
    after: (await stat(outPath)).size,
    levels,
  };
}

async function contactSheet(items, outPath, { cols = 3, cellW = 560, withPalette = false } = {}) {
  const tiles = [];
  for (const it of items) {
    const buf = await sharp(it.file).resize({ width: cellW, withoutEnlargement: true }).toBuffer();
    const m = await sharp(buf).metadata();
    tiles.push({ buf, w: m.width, h: m.height, label: it.label });
  }
  const rows = Math.ceil(tiles.length / cols);
  const rowH = [];
  for (let r = 0; r < rows; r++) {
    let h = 0;
    for (let c = 0; c < cols; c++) {
      const t = tiles[r * cols + c];
      if (t) h = Math.max(h, t.h);
    }
    rowH.push(h + 32);
  }
  const width = cols * (cellW + 14) + 14;
  const paletteH = withPalette ? 92 : 0;
  const height = rowH.reduce((a, b) => a + b, 0) + 14 + paletteH;
  const composites = [];
  let y = 14;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const t = tiles[r * cols + c];
      if (!t) continue;
      const x = 14 + c * (cellW + 14);
      composites.push({ input: t.buf, left: x, top: y + 24 });
      composites.push({
        input: Buffer.from(
          `<svg width="${cellW}" height="22"><text x="0" y="16" font-family="monospace" font-size="14" fill="${token('--sky')}">${t.label}</text></svg>`,
        ),
        left: x,
        top: y,
      });
    }
    y += rowH[r];
  }
  if (withPalette) {
    composites.push({ input: await paletteStrip(width - 28), left: 14, top: y + 6 });
  }
  await sharp({ create: { width, height, channels: 4, background: PAGE_BG } })
    .composite(composites)
    .png()
    .toFile(outPath);
}

async function paletteStrip(width) {
  const swatchW = Math.floor(width / PALETTE.length);
  const height = 78;
  const composites = PALETTE.map(([name, hex], i) => ({
    input: Buffer.from(
      `<svg width="${swatchW - 6}" height="${height}">` +
        `<rect width="${swatchW - 6}" height="52" fill="${hex}" rx="4"/>` +
        `<text x="0" y="70" font-family="monospace" font-size="11" fill="${token('--text-muted')}">${name} ${hex}</text>` +
        `</svg>`,
    ),
    left: i * swatchW,
    top: 0,
  }));
  return sharp({ create: { width, height, channels: 4, background: PAGE_BG } })
    .composite(composites)
    .png()
    .toBuffer();
}

async function heroStack() {
  const width = 1400;
  const height = 620;
  const layers = ['hill-back.png', 'hill-mid.png', 'hill-front.png'];
  const composites = [];
  let top = 150;
  for (const layer of layers) {
    const buf = await sharp(path.join(PUBLIC, 'landscape', layer)).resize({ width }).toBuffer();
    const m = await sharp(buf).metadata();
    composites.push({ input: buf, left: 0, top: Math.min(top, height - m.height) });
    top += 110;
  }
  await sharp({ create: { width, height, channels: 4, background: PAGE_BG } })
    .composite(composites)
    .png()
    .toFile(path.join(QA, 'retint-hero-stack.png'));
}

async function writeSheets() {
  await mkdir(QA, { recursive: true });
  const before = ASSETS.map((a) => ({ file: path.join(SOURCE, a.src), label: `BEFORE ${a.src}` }));
  const after = ASSETS.map((a) => ({ file: path.join(PUBLIC, a.src), label: `AFTER  ${a.src}` }));
  await contactSheet(after, path.join(QA, 'retint-after.png'), { withPalette: true });
  const pairs = [];
  for (let i = 0; i < ASSETS.length; i++) pairs.push(before[i], after[i]);
  await contactSheet(pairs, path.join(QA, 'retint-compare.png'), { cols: 2, cellW: 620 });
  await heroStack();
}

async function main() {
  await ensureSource();
  const results = [];
  for (const asset of ASSETS) {
    results.push(await retintAsset(asset));
  }
  await writeSheets();

  console.log('\nasset                          alpha  ch   before      after   levels');
  for (const r of results) {
    const lv = r.levels ? `black=${r.levels.black.toFixed(3)} white=${r.levels.white.toFixed(3)}` : 'solid';
    console.log(
      `${r.src.padEnd(30)} ${String(r.hasAlpha).padEnd(6)} ${String(r.channels).padEnd(4)} ${String(r.before).padStart(8)} ${String(r.after).padStart(9)}   ${lv}`,
    );
  }
  const brokenAlpha = results.filter((r) => r.src.endsWith('.png') && !r.hasAlpha);
  if (brokenAlpha.length) {
    console.error('\nALPHA LOST on:', brokenAlpha.map((r) => r.src).join(', '));
    process.exitCode = 1;
  }
  const bloated = results.filter((r) => r.after > r.before * 1.6);
  if (bloated.length) console.error('\nSIZE BLOAT on:', bloated.map((r) => r.src).join(', '));
  console.log(`\nQA sheets in ${QA}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
