import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const BASE = 'https://framerusercontent.com/images/';
const OUT = new URL('../public/', import.meta.url).pathname.replace(/^\//, '');

const ASSETS = [
  ['h5VHoQg2qBhfygdenEQ0WUtEZU.png', 'landscape/hill-back.png'],
  ['T6hTfVKiQ81oLHCljxjb0WPLHY8.png', 'landscape/hill-mid.png'],
  ['rNwNiQxFN2tkAEI5eUdmAxB9v4.png', 'landscape/hill-front.png'],
  ['KEyElslPaeEXTKlix9xtVlt4.png', 'landscape/dunes.png'],
  ['aRv3jqYDAlyQCUXY7Jl64Eyxg.png', 'landscape/stat-card-a.png'],
  ['EG7BPStQoUGiY6wROxZ4Q7GJKiU.png', 'landscape/stat-card-b.png'],
  ['ZCUolRzdTgZF2qcr3flePPx2dk.jpg', 'mockups/feature-ask.jpg'],
  ['v9Yr4trFZsygSFKIZye6oMUY4.jpg', 'mockups/feature-verify.jpg'],
  ['hg3Tg24LlqTuZEp7hHXSGwPQ9U.jpg', 'mockups/feature-execute.jpg'],
  ['eFufq0tptTi9Qq7gFHic5a5E.jpg', 'mockups/feature-measure.jpg'],
  ['D7e4TugadmJTFjHpPSKhXEtOnk.jpg', 'mockups/about-context.jpg'],
  ['egCROtkGjJt43Q9SunwaHjvGUL4.jpg', 'mockups/about-action.jpg'],
  ['jwCVtbSWlvsuvrIejVWwVB7mAU.jpg', 'mockups/about-trends.jpg'],
  ['pepH1APN2yML7ExisXYWgAZwSH0.jpg', 'avatars/a1.jpg'],
  ['8PPauCURBfmckfonpgSJY9NbDQ.jpg', 'avatars/a2.jpg'],
  ['PahuPLrBYO2JdmGOgzCORNG7Q.jpg', 'avatars/a3.jpg'],
  ['6qMq4KZghjDbviFxb8hhxGW0fT0.jpg', 'avatars/a4.jpg'],
  ['2uayq1aC9XZcwLgTTRK6M2ok8KE.jpg', 'avatars/a5.jpg'],
  ['ynhYjI9b7gEqESVHaqk4kb82qf4.jpg', 'blog/post-1.jpg'],
  ['5rGlW7xtbsUz4PnBAtaaAwvqGmk.jpg', 'blog/post-2.jpg'],
  ['dvjihLhp9whD26v7qSJT2pbwPo.png', 'misc/cta-icon.png'],
  ['027B2NJZowoMM4YvobleMlZAhk.png', 'misc/cta-badge.png'],
];

const batch = async (items, size, fn) => {
  for (let i = 0; i < items.length; i += size) await Promise.all(items.slice(i, i + size).map(fn));
};

let ok = 0;
let failed = 0;
await batch(ASSETS, 4, async ([remote, local]) => {
  const target = join(OUT, local);
  try {
    const res = await fetch(BASE + remote);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, Buffer.from(await res.arrayBuffer()));
    ok += 1;
    console.log(`ok   ${local}`);
  } catch (error) {
    failed += 1;
    console.log(`FAIL ${local} — ${error instanceof Error ? error.message : String(error)}`);
  }
});
console.log(`\n${ok} downloaded, ${failed} failed`);
