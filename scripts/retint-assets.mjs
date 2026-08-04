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

const THEMES = ['dark', 'light'];

const TOKENS = readTokens();

/* Both themes author the same token NAMES, so the two blocks are read
   separately — a flat sweep of the file would let the light block silently
   overwrite the dark ramp. Anything the light block does not re-author falls
   through to its dark value, exactly as the cascade resolves it. */
function readTokens() {
  const css = readFileSync(path.join(ROOT, 'app', 'globals.css'), 'utf8');
  /* anchored to the start of a line so the selector named in the file's
     header comment is not mistaken for the block itself */
  const split = css.search(/^\[data-theme='light'\]\s*\{/m);
  if (split < 0) throw new Error("no [data-theme='light'] block in app/globals.css");

  const parse = (block) => {
    const tokens = new Map();
    for (const [, name, value] of block.matchAll(
      /^\s*(--[a-z0-9-]+):\s*(#[0-9a-f]{6}|var\(--[a-z0-9-]+\));\s*$/gim,
    )) {
      tokens.set(name, value.toLowerCase());
    }
    return tokens;
  };

  const lightBlock = css.slice(split);
  const lightEnd = lightBlock.search(/^\}/m);
  if (lightEnd < 0) throw new Error("unterminated [data-theme='light'] block");

  const dark = parse(css.slice(0, split));
  const light = parse(lightBlock.slice(0, lightEnd));
  for (const [name, value] of dark) {
    if (!light.has(name)) light.set(name, value);
  }
  /* a token may alias another rather than state a hex (--pw-canvas is
     var(--paper) in light); follow the chain so the ramp always gets paint */
  for (const tokens of [dark, light]) {
    for (const name of tokens.keys()) {
      const seen = new Set([name]);
      let value = tokens.get(name);
      while (value?.startsWith('var(')) {
        const next = value.slice(4, -1);
        if (seen.has(next)) throw new Error(`circular token alias at ${name}`);
        seen.add(next);
        value = tokens.get(next);
      }
      if (value) tokens.set(name, value);
      else tokens.delete(name);
    }
  }
  return { dark, light };
}

function token(theme, name) {
  const value = TOKENS[theme].get(name);
  if (!value) throw new Error(`${name} is not authored for the ${theme} theme in app/globals.css`);
  return value;
}

/* Luminance→colour ramp every landscape and blog asset is remapped onto.
   DARK reads the source as a silhouette lit from above: page canvas at the
   shadows, ink surfaces through the midtones, sky and gold at the highlights.
   LIGHT inverts the polarity, because on paper the hills are masses seen
   against a pale sky rather than shapes catching light — so the ramp climbs
   from the canvas into slate and each asset's tone curve is re-aimed to put
   its BODY on the ramp and its ridge back on the canvas. */
const RAMPS = {
  dark: [
    [0.0, '--pw-canvas'],
    [0.16, '--pw-retint-deep'],
    [0.34, '--surface-card'],
    [0.5, '--ink-700'],
    [0.66, '--pw-rose'],
    [0.8, '--pw-retint-steel'],
    [0.9, '--sky'],
    [1.0, '--gold'],
  ],
  light: [
    [0.0, '--pw-canvas'],
    [0.2, '--pw-retint-haze'],
    [0.42, '--pw-retint-mist'],
    [0.62, '--sky'],
    [0.78, '--pw-retint-steel'],
    [0.9, '--pw-retint-slate'],
    [1.0, '--slate'],
  ],
};

const PALETTES = {
  dark: [
    '--pw-canvas',
    '--pw-canvas-2',
    '--pw-surface-1',
    '--surface-card',
    '--ink-700',
    '--pw-rose',
    '--sky',
    '--text-body',
    '--gold',
  ],
  light: [
    '--pw-canvas',
    '--pw-canvas-2',
    '--pw-retint-haze',
    '--pw-retint-mist',
    '--sky',
    '--pw-retint-steel',
    '--pw-retint-slate',
    '--slate',
    '--ink',
  ],
};

/* `lift` is where the asset's darkest pixel lands on the ramp and `top` where
   its brightest does. Dark parks the bases on the canvas so the silhouettes
   dissolve into the page instead of stepping against it at a section edge;
   light parks the RIDGES there for the same reason and walks the mass down the
   ramp by distance, which is what atmospheric perspective does in daylight. */
const ASSETS = [
  {
    src: 'landscape/hill-back.png',
    lo: 0.002,
    hi: 0.999,
    condition: true,
    dark: { gamma: 1.5, lift: 0.02, top: 0.92, chroma: 0.14 },
    light: { gamma: 1.7, lift: 0.4, top: 0.03, chroma: 0.08 },
  },
  {
    src: 'landscape/hill-mid.png',
    lo: 0.002,
    hi: 0.998,
    condition: true,
    dark: { gamma: 1.45, lift: 0.015, top: 0.74, chroma: 0.14 },
    light: { gamma: 2.0, lift: 0.62, top: 0.03, chroma: 0.08 },
  },
  {
    src: 'landscape/hill-front.png',
    lo: 0.002,
    hi: 0.998,
    condition: true,
    dark: { gamma: 1.45, lift: 0.01, top: 0.62, chroma: 0.12 },
    light: { gamma: 2.4, lift: 0.95, top: 0.04, chroma: 0.07 },
  },
  {
    src: 'landscape/dunes.png',
    lo: 0.002,
    hi: 0.999,
    condition: true,
    dark: { gamma: 1.25, lift: 0.02, top: 1.0, chroma: 0.16 },
    light: { gamma: 2.0, lift: 0.74, top: 0.03, chroma: 0.08 },
  },
  {
    src: 'landscape/stat-card-a.png',
    solid: '--pw-retint-card-a',
  },
  {
    src: 'landscape/stat-card-b.png',
    solid: '--pw-retint-card-b',
  },
  {
    src: 'blog/post-1.jpg',
    lo: 0.004,
    hi: 0.996,
    dark: { gamma: 1.12, lift: 0.03, top: 0.95, chroma: 0.18 },
    light: { gamma: 1.05, lift: 0.9, top: 0.04, chroma: 0.1 },
  },
  {
    src: 'blog/post-2.jpg',
    lo: 0.004,
    hi: 0.996,
    dark: { gamma: 1.18, lift: 0.03, top: 0.88, chroma: 0.18 },
    light: { gamma: 1.08, lift: 0.86, top: 0.04, chroma: 0.1 },
  },
  {
    src: 'blog/post-3.jpg',
    lo: 0.004,
    hi: 0.997,
    dark: { gamma: 1.05, lift: 0.03, top: 0.96, chroma: 0.18 },
    light: { gamma: 1.02, lift: 0.92, top: 0.04, chroma: 0.1 },
  },
];

/* The light variant sits beside its dark original under a -light suffix.
   lib/themed-asset.ts is the only reader; keep the two in step. */
function variantPath(src, theme) {
  return theme === 'dark' ? src : src.replace(/(\.[a-z0-9]+)$/i, '-light$1');
}

/* The stock landscape is a Framer PNG-8: hill-front carries 15 distinct
   colours across 821k pixels, error-diffused, and its mask is 1-bit — 2,464 px
   of ridge go 0→255 alpha inside a single row. So the grain on a slope is
   dither, a contour is a palette step, and the horizon stair-steps at every
   scale Next serves. Conditioning runs once per asset, ahead of and
   independent of the two theme passes. */
const CONDITIONING = {
  dedither: { radius: 2, passes: 2, detailFloor: 1.0, detailCeiling: 2.6 },
  feather: { radius: 1, passes: 2, low: 0.22, high: 0.78 },
  bleed: 40,
};

const RAMP_STEPS = 2048;
const DITHER = 0.75;

const clamp255 = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const clampIndex = (i, n) => (i < 0 ? 0 : i >= n ? n - 1 : i);
const luminance = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/* Quantising a smooth ramp into 8 bits re-lays the very contours the dedither
   just removed, so the last step before packing carries ±1 level of triangular
   noise. Hashed off the pixel index rather than drawn, because the sheets in
   docs/qa are only worth diffing if two runs of the script agree. */
function hash01(i) {
  let h = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

const triangularNoise = (i) => hash01(i) - hash01(i ^ 0x5bf03635);

function toPlanes(data, channels, width, height) {
  const n = width * height;
  const rgb = new Float32Array(n * 3);
  const alpha = new Float32Array(n);
  for (let p = 0; p < n; p++) {
    const s = p * channels;
    rgb[p * 3] = data[s];
    rgb[p * 3 + 1] = data[s + 1];
    rgb[p * 3 + 2] = data[s + 2];
    alpha[p] = channels === 4 ? data[s + 3] : 255;
  }
  return { rgb, alpha };
}

function packPlanes(rgb, alpha, channels, n) {
  const out = Buffer.allocUnsafe(n * channels);
  for (let p = 0; p < n; p++) {
    const d = p * channels;
    out[d] = clamp255(Math.round(rgb[p * 3]));
    out[d + 1] = clamp255(Math.round(rgb[p * 3 + 1]));
    out[d + 2] = clamp255(Math.round(rgb[p * 3 + 2]));
    if (channels === 4) out[d + 3] = clamp255(Math.round(alpha[p]));
  }
  return out;
}

function boxBlur(plane, width, height, radius) {
  const span = radius * 2 + 1;
  const tmp = new Float32Array(plane.length);
  for (let y = 0; y < height; y++) {
    const row = y * width;
    let sum = 0;
    for (let d = -radius; d <= radius; d++) sum += plane[row + clampIndex(d, width)];
    for (let x = 0; x < width; x++) {
      tmp[row + x] = sum / span;
      sum +=
        plane[row + clampIndex(x + radius + 1, width)] - plane[row + clampIndex(x - radius, width)];
    }
  }
  for (let x = 0; x < width; x++) {
    let sum = 0;
    for (let d = -radius; d <= radius; d++) sum += tmp[clampIndex(d, height) * width + x];
    for (let y = 0; y < height; y++) {
      plane[y * width + x] = sum / span;
      sum +=
        tmp[clampIndex(y + radius + 1, height) * width + x] -
        tmp[clampIndex(y - radius, height) * width + x];
    }
  }
}

/* How far apart the asset's palette entries sit. Dither can only ever swing a
   pixel by about one of these, so it is also the line between the noise this
   stage removes and the detail it has to keep. */
function paletteStep(rgb, alpha) {
  const present = new Uint8Array(256);
  for (let p = 0; p < alpha.length; p++) {
    if (alpha[p] < 250) continue;
    present[Math.round(clamp255(luminance(rgb[p * 3], rgb[p * 3 + 1], rgb[p * 3 + 2])))] = 1;
  }
  const gaps = [];
  let last = -1;
  for (let i = 0; i < 256; i++) {
    if (!present[i]) continue;
    if (last >= 0) gaps.push(i - last);
    last = i;
  }
  if (!gaps.length) return 1;
  gaps.sort((a, b) => a - b);
  return gaps[gaps.length >> 1];
}

/* Low-passing the asset averages the error diffusion back into the continuous
   tone it was standing in for, and would take the tree line with it — so the
   detail the blur removed is measured and put back wherever it swings further
   than the palette could have dithered. Weighted by alpha throughout, so the
   un-matted sky is never what gets averaged into the ridge. */
function dedither(rgb, alpha, width, height, { radius, passes, detailFloor, detailCeiling }) {
  const n = width * height;
  const step = paletteStep(rgb, alpha);
  const floor = step * detailFloor;
  const ceiling = step * detailCeiling;

  const weight = Float32Array.from(alpha, (a) => a / 255);
  const smooth = new Float32Array(n * 3);
  for (let c = 0; c < 3; c++) {
    const plane = new Float32Array(n);
    for (let p = 0; p < n; p++) plane[p] = rgb[p * 3 + c] * weight[p];
    for (let i = 0; i < passes; i++) boxBlur(plane, width, height, radius);
    for (let p = 0; p < n; p++) smooth[p * 3 + c] = plane[p];
  }
  const cover = Float32Array.from(weight);
  for (let i = 0; i < passes; i++) boxBlur(cover, width, height, radius);

  const out = new Float32Array(n * 3);
  for (let p = 0; p < n; p++) {
    if (alpha[p] === 0 || cover[p] <= 0) {
      out[p * 3] = rgb[p * 3];
      out[p * 3 + 1] = rgb[p * 3 + 1];
      out[p * 3 + 2] = rgb[p * 3 + 2];
      continue;
    }
    const sr = smooth[p * 3] / cover[p];
    const sg = smooth[p * 3 + 1] / cover[p];
    const sb = smooth[p * 3 + 2] / cover[p];
    const swing = Math.abs(
      luminance(rgb[p * 3], rgb[p * 3 + 1], rgb[p * 3 + 2]) - luminance(sr, sg, sb),
    );
    const k = clamp01((swing - floor) / Math.max(ceiling - floor, 0.001));
    const keep = k * k * (3 - 2 * k);
    out[p * 3] = sr + (rgb[p * 3] - sr) * keep;
    out[p * 3 + 1] = sg + (rgb[p * 3 + 1] - sg) * keep;
    out[p * 3 + 2] = sb + (rgb[p * 3 + 2] - sb) * keep;
  }
  return out;
}

/* Rebuilds the sub-pixel edge the 1-bit mask never had: blur puts a real ramp
   across the boundary, the smoothstep pulls it back to roughly a pixel and a
   half so the ridge stays a ridge rather than a haze. */
function featherAlpha(alpha, width, height, { radius, passes, low, high }) {
  const soft = new Float32Array(alpha.length);
  for (let p = 0; p < alpha.length; p++) soft[p] = alpha[p] / 255;
  for (let i = 0; i < passes; i++) boxBlur(soft, width, height, radius);
  const span = high - low;
  for (let p = 0; p < alpha.length; p++) {
    const t = clamp01((soft[p] - low) / span);
    alpha[p] = t * t * (3 - 2 * t) * 255;
  }
}

/* Un-matted sky sits under every transparent pixel, and both the resize Next
   serves and AVIF's chroma pass reach for it — that pale fringe along the
   ridge is it, arriving after the asset left the pipeline. Flooding hill
   colour outwards leaves the resampler nothing else to find; past the flood
   the field goes flat so the encoder spends no bytes on pixels no one sees. */
function bleedEdgeColour(rgb, alpha, width, height, depth, canvasHex) {
  const n = width * height;
  const filled = new Uint8Array(n);
  for (let p = 0; p < n; p++) if (alpha[p] >= 250) filled[p] = 1;

  let frontier = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x;
      if (!filled[p]) continue;
      const open =
        (x > 0 && !filled[p - 1]) ||
        (x < width - 1 && !filled[p + 1]) ||
        (y > 0 && !filled[p - width]) ||
        (y < height - 1 && !filled[p + width]);
      if (open) frontier.push(p);
    }
  }

  const accR = new Float32Array(n);
  const accG = new Float32Array(n);
  const accB = new Float32Array(n);
  const accN = new Uint16Array(n);
  const queued = new Uint8Array(n);

  for (let d = 0; d < depth && frontier.length; d++) {
    const next = [];
    for (const p of frontier) {
      const x = p % width;
      const y = (p / width) | 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const q = ny * width + nx;
          if (filled[q]) continue;
          accR[q] += rgb[p * 3];
          accG[q] += rgb[p * 3 + 1];
          accB[q] += rgb[p * 3 + 2];
          accN[q] += 1;
          if (!queued[q]) {
            queued[q] = 1;
            next.push(q);
          }
        }
      }
    }
    for (const q of next) {
      rgb[q * 3] = accR[q] / accN[q];
      rgb[q * 3 + 1] = accG[q] / accN[q];
      rgb[q * 3 + 2] = accB[q] / accN[q];
      filled[q] = 1;
    }
    frontier = next;
  }

  const [cr, cg, cb] = hexToRgb(canvasHex);
  for (let p = 0; p < n; p++) {
    if (filled[p]) continue;
    rgb[p * 3] = cr;
    rgb[p * 3 + 1] = cg;
    rgb[p * 3 + 2] = cb;
  }
}

/* Sampled continuously rather than through a 256-entry table: the tone curve
   compresses a hill into a narrow stretch of the ramp, so an 8-bit index there
   is what collapsed the slopes into a handful of colours in the first place. */
function buildRampLut(theme) {
  const stops = RAMPS[theme].map(([pos, name]) => [pos, hexToRgb(token(theme, name))]);
  const lut = new Float32Array(RAMP_STEPS * 3);
  for (let i = 0; i < RAMP_STEPS; i++) {
    const t = i / (RAMP_STEPS - 1);
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
    for (let c = 0; c < 3; c++) lut[i * 3 + c] = a[1][c] + (b[1][c] - a[1][c]) * e;
  }
  return lut;
}

function luminanceHistogram(rgb, alpha) {
  const hist = new Float64Array(256);
  let total = 0;
  for (let p = 0; p < alpha.length; p++) {
    if (alpha[p] < 8) continue;
    const weight = alpha[p] / 255;
    const lum = luminance(rgb[p * 3], rgb[p * 3 + 1], rgb[p * 3 + 2]);
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

function retintPlanes(rgb, alpha, theme, curve, levels) {
  const ramp = buildRampLut(theme);
  const { black, white } = levels;
  const { gamma, lift, top, chroma } = curve;
  const span = Math.max(white - black, 0.02);
  for (let p = 0; p < alpha.length; p++) {
    const r = rgb[p * 3];
    const g = rgb[p * 3 + 1];
    const b = rgb[p * 3 + 2];
    const lum = luminance(r, g, b);
    let t = clamp01((lum / 255 - black) / span);
    t = Math.pow(t, gamma);
    t = clamp01(lift + t * (top - lift));
    const f = t * (RAMP_STEPS - 1);
    const i0 = Math.floor(f);
    const i1 = i0 + 1 < RAMP_STEPS ? i0 + 1 : i0;
    const k = f - i0;
    const noise = triangularNoise(p) * DITHER;
    rgb[p * 3] = ramp[i0 * 3] + (ramp[i1 * 3] - ramp[i0 * 3]) * k + (b - lum) * chroma + noise;
    rgb[p * 3 + 1] =
      ramp[i0 * 3 + 1] + (ramp[i1 * 3 + 1] - ramp[i0 * 3 + 1]) * k + (g - lum) * chroma * 0.7 + noise;
    rgb[p * 3 + 2] =
      ramp[i0 * 3 + 2] + (ramp[i1 * 3 + 2] - ramp[i0 * 3 + 2]) * k + (r - lum) * chroma + noise;
  }
}

function paintSolid(rgb, n, hex) {
  const [r, g, b] = hexToRgb(hex);
  for (let p = 0; p < n; p++) {
    rgb[p * 3] = r;
    rgb[p * 3 + 1] = g;
    rgb[p * 3 + 2] = b;
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

/* Conditioning and the level probe are theme-invariant, so both happen once
   and the two passes clone the result — retinting mutates the plane in place. */
const prepared = new Map();

async function prepareSource(asset) {
  const cached = prepared.get(asset.src);
  if (cached) return cached;

  const srcPath = path.join(SOURCE, asset.src);
  const image = sharp(srcPath);
  const format = (await image.metadata()).format;
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  let { rgb, alpha } = toPlanes(data, channels, width, height);

  if (asset.condition) {
    rgb = dedither(rgb, alpha, width, height, CONDITIONING.dedither);
    if (channels === 4) featherAlpha(alpha, width, height, CONDITIONING.feather);
  }

  const levels = asset.solid
    ? null
    : (() => {
        const histogram = luminanceHistogram(rgb, alpha);
        return { black: percentile(histogram, asset.lo), white: percentile(histogram, asset.hi) };
      })();

  const entry = { rgb, alpha, width, height, channels, format, levels, bytes: (await stat(srcPath)).size };
  prepared.set(asset.src, entry);
  return entry;
}

async function retintAsset(asset, theme) {
  const outPath = path.join(PUBLIC, variantPath(asset.src, theme));
  const source = await prepareSource(asset);
  const { width, height, channels, format, levels } = source;
  const n = width * height;
  const rgb = Float32Array.from(source.rgb);

  if (asset.solid) {
    paintSolid(rgb, n, token(theme, asset.solid));
  } else {
    retintPlanes(rgb, source.alpha, theme, asset[theme], levels);
    if (asset.condition && channels === 4) {
      bleedEdgeColour(rgb, source.alpha, width, height, CONDITIONING.bleed, token(theme, '--pw-canvas'));
    }
  }

  const pipeline = sharp(packPlanes(rgb, source.alpha, channels, n), {
    raw: { width, height, channels },
  });

  if (format === 'jpeg') {
    await pipeline.jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(outPath);
  } else {
    await pipeline.png({ compressionLevel: 9, effort: 10 }).toFile(outPath);
  }

  const outMeta = await sharp(outPath).metadata();
  return {
    src: variantPath(asset.src, theme),
    theme,
    hasAlpha: Boolean(outMeta.hasAlpha),
    channels: outMeta.channels,
    before: source.bytes,
    after: (await stat(outPath)).size,
    levels,
  };
}

async function contactSheet(items, outPath, theme, { cols = 3, cellW = 560, withPalette = false } = {}) {
  const pageBg = token(theme, '--pw-canvas');
  const labelInk = token(theme, theme === 'dark' ? '--sky' : '--slate');
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
          `<svg width="${cellW}" height="22"><text x="0" y="16" font-family="monospace" font-size="14" fill="${labelInk}">${t.label}</text></svg>`,
        ),
        left: x,
        top: y,
      });
    }
    y += rowH[r];
  }
  if (withPalette) {
    composites.push({ input: await paletteStrip(width - 28, theme), left: 14, top: y + 6 });
  }
  await sharp({ create: { width, height, channels: 4, background: pageBg } })
    .composite(composites)
    .png()
    .toFile(outPath);
}

async function paletteStrip(width, theme) {
  const entries = PALETTES[theme].map((name) => [name, token(theme, name)]);
  const swatchW = Math.floor(width / entries.length);
  const height = 78;
  const composites = entries.map(([name, hex], i) => ({
    input: Buffer.from(
      `<svg width="${swatchW - 6}" height="${height}">` +
        `<rect width="${swatchW - 6}" height="52" fill="${hex}" rx="4"/>` +
        `<text x="0" y="70" font-family="monospace" font-size="11" fill="${token(theme, theme === 'dark' ? '--text-body' : '--ink')}">${name} ${hex}</text>` +
        `</svg>`,
    ),
    left: i * swatchW,
    top: 0,
  }));
  return sharp({ create: { width, height, channels: 4, background: token(theme, '--pw-canvas') } })
    .composite(composites)
    .png()
    .toBuffer();
}

async function heroStack(theme) {
  const width = 1400;
  const height = 620;
  const layers = ['hill-back.png', 'hill-mid.png', 'hill-front.png'];
  const composites = [];
  let top = 150;
  for (const layer of layers) {
    const file = path.join(PUBLIC, variantPath(`landscape/${layer}`, theme));
    const buf = await sharp(file).resize({ width }).toBuffer();
    const m = await sharp(buf).metadata();
    composites.push({ input: buf, left: 0, top: Math.min(top, height - m.height) });
    top += 110;
  }
  await sharp({ create: { width, height, channels: 4, background: token(theme, '--pw-canvas') } })
    .composite(composites)
    .png()
    .toFile(path.join(QA, `retint-hero-stack-${theme}.png`));
}

async function writeSheets(theme) {
  await mkdir(QA, { recursive: true });
  const before = ASSETS.map((a) => ({ file: path.join(SOURCE, a.src), label: `BEFORE ${a.src}` }));
  const after = ASSETS.map((a) => ({
    file: path.join(PUBLIC, variantPath(a.src, theme)),
    label: `AFTER  ${variantPath(a.src, theme)}`,
  }));
  await contactSheet(after, path.join(QA, `retint-after-${theme}.png`), theme, { withPalette: true });
  const pairs = [];
  for (let i = 0; i < ASSETS.length; i++) pairs.push(before[i], after[i]);
  await contactSheet(pairs, path.join(QA, `retint-compare-${theme}.png`), theme, {
    cols: 2,
    cellW: 620,
  });
  await heroStack(theme);
}

/* Every raster here is served through next/image, so the on-disk PNG is a build
   artefact and its size answers the wrong question — conditioning trades a
   fatter lossless file for tone an encoder can actually predict. What a visitor
   pays is the avif, and against the pristine palette source that is the number
   this run has to beat. */
async function deliveredBytes(results) {
  const encode = (file) =>
    sharp(file)
      .resize({ width: 1920, withoutEnlargement: true })
      .avif({ quality: 75, effort: 3 })
      .toBuffer()
      .then((buf) => buf.length);

  const rows = [];
  for (const asset of ASSETS.filter((a) => a.condition)) {
    const source = await encode(path.join(SOURCE, asset.src));
    for (const r of results.filter((x) => x.src === variantPath(asset.src, x.theme))) {
      rows.push({ src: r.src, source, output: await encode(path.join(PUBLIC, r.src)) });
    }
  }
  return rows;
}

async function main() {
  await ensureSource();
  const results = [];
  for (const theme of THEMES) {
    for (const asset of ASSETS) {
      results.push(await retintAsset(asset, theme));
    }
    await writeSheets(theme);
  }

  console.log('\nasset                                alpha  ch   before      after   levels');
  for (const r of results) {
    const lv = r.levels ? `black=${r.levels.black.toFixed(3)} white=${r.levels.white.toFixed(3)}` : 'solid';
    console.log(
      `${r.src.padEnd(36)} ${String(r.hasAlpha).padEnd(6)} ${String(r.channels).padEnd(4)} ${String(r.before).padStart(8)} ${String(r.after).padStart(9)}   ${lv}`,
    );
  }
  const brokenAlpha = results.filter((r) => r.src.endsWith('.png') && !r.hasAlpha);
  if (brokenAlpha.length) {
    console.error('\nALPHA LOST on:', brokenAlpha.map((r) => r.src).join(', '));
    process.exitCode = 1;
  }

  const delivered = await deliveredBytes(results);
  console.log('\ndelivered (avif @1920, what next/image actually serves)');
  let sourceTotal = 0;
  let outputTotal = 0;
  for (const d of delivered) {
    sourceTotal += d.source;
    outputTotal += d.output;
    console.log(
      `${d.src.padEnd(36)} ${String(Math.round(d.source / 1024)).padStart(5)} KB -> ${String(Math.round(d.output / 1024)).padStart(5)} KB`,
    );
  }
  console.log(
    `${'TOTAL'.padEnd(36)} ${String(Math.round(sourceTotal / 1024)).padStart(5)} KB -> ${String(Math.round(outputTotal / 1024)).padStart(5)} KB`,
  );
  const bloated = delivered.filter((d) => d.output > d.source * 1.1);
  if (bloated.length) console.error('\nSIZE BLOAT on:', bloated.map((d) => d.src).join(', '));

  console.log(`\nQA sheets in ${QA}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
