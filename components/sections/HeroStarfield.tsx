import type { CSSProperties } from 'react';

type Star = {
  top: string;
  left: string;
  size: number;
  max: number;
  duration: number;
  delay: number;
  tone?: 'gold' | 'cool';
  glint?: boolean;
  blaze?: boolean;
};

type Comet = {
  top: string;
  left: string;
  width: number;
  angle: number;
  travelX: number;
  travelY: number;
  delay: number;
};

type Dust = {
  top: number;
  left: number;
  size: number;
  max: number;
  tone?: 'gold' | 'cool';
};

/* jittered grid rather than an even one, thinning and dimming toward the lit
   lower sky — a uniform field reads as a texture, not as stars */
const STARS: Star[] = [
  { top: '4.9%', left: '5.1%', size: 1, max: 0.21, tone: 'gold', duration: 11.8, delay: 4.5 },
  { top: '5.3%', left: '12.4%', size: 1, max: 0.5, tone: 'gold', duration: 15.3, delay: 10.9 },
  { top: '6.1%', left: '15.3%', size: 1, max: 0.24, duration: 14.2, delay: 12.9 },
  { top: '2.8%', left: '19.4%', size: 1.5, max: 0.6, duration: 12.4, delay: 6.1, glint: true },
  { top: '4.2%', left: '23.5%', size: 1, max: 0.54, duration: 16.7, delay: 8.8 },
  { top: '7.4%', left: '32.2%', size: 1.5, max: 0.7, tone: 'cool', duration: 11.7, delay: 7.4 },
  { top: '6.3%', left: '35.3%', size: 1, max: 0.43, duration: 13.2, delay: 9.7 },
  { top: '3.6%', left: '40.2%', size: 1, max: 0.33, tone: 'cool', duration: 15.1, delay: 11.2 },
  { top: '6.5%', left: '44.4%', size: 1, max: 0.24, duration: 16.4, delay: 12.5 },
  { top: '5.0%', left: '49.1%', size: 1, max: 0.25, tone: 'cool', duration: 11.7, delay: 15.6 },
  { top: '3.3%', left: '56.6%', size: 1, max: 0.48, duration: 14.8, delay: 4.2 },
  { top: '7.9%', left: '52.6%', size: 1, max: 0.29, duration: 13.8, delay: 2.6 },
  { top: '6.3%', left: '63.8%', size: 1, max: 0.41, tone: 'cool', duration: 11.7, delay: 8.3 },
  { top: '7.3%', left: '68.4%', size: 1, max: 0.44, duration: 10.8, delay: 0.7 },
  { top: '5.7%', left: '75.7%', size: 1.5, max: 0.67, duration: 13.6, delay: 15.6, glint: true },
  { top: '9.1%', left: '79.6%', size: 2, max: 0.84, tone: 'gold', duration: 12.8, delay: 12.1, glint: true, blaze: true },
  { top: '5.6%', left: '84.0%', size: 1, max: 0.18, tone: 'cool', duration: 11.9, delay: 2.2 },
  { top: '5.8%', left: '90.3%', size: 1.5, max: 0.63, duration: 12.2, delay: 3.4 },
  { top: '4.9%', left: '96.5%', size: 1, max: 0.45, duration: 17.2, delay: 6.7 },

  { top: '10.3%', left: '3.8%', size: 1, max: 0.5, duration: 14.9, delay: 13.2 },
  { top: '16.4%', left: '7.9%', size: 1.5, max: 0.58, duration: 15.8, delay: 10.4, glint: true },
  { top: '11.6%', left: '11.7%', size: 1, max: 0.18, tone: 'gold', duration: 14.4, delay: 0.7 },
  { top: '13.3%', left: '18.8%', size: 1, max: 0.2, duration: 14.6, delay: 14.9 },
  { top: '10.2%', left: '25.6%', size: 1, max: 0.3, duration: 16.6, delay: 13.6 },
  { top: '15.6%', left: '25.1%', size: 1, max: 0.27, duration: 12.2, delay: 14.1 },
  { top: '10.6%', left: '29.4%', size: 1, max: 0.54, duration: 10.9, delay: 0.2 },
  { top: '14.8%', left: '35.0%', size: 1, max: 0.26, tone: 'cool', duration: 13.3, delay: 4.9 },
  { top: '12.9%', left: '41.4%', size: 1, max: 0.24, duration: 12.6, delay: 7.6 },
  { top: '14.6%', left: '48.3%', size: 1, max: 0.31, duration: 11.4, delay: 8.4 },
  { top: '11.3%', left: '56.1%', size: 1, max: 0.26, duration: 15.3, delay: 1.6 },
  { top: '11.7%', left: '61.9%', size: 1, max: 0.16, duration: 12.0, delay: 9.4 },
  { top: '11.1%', left: '72.0%', size: 1, max: 0.37, duration: 10.8, delay: 5.3 },
  { top: '14.2%', left: '73.8%', size: 1, max: 0.43, tone: 'gold', duration: 14.5, delay: 2.0 },
  { top: '11.2%', left: '83.8%', size: 1, max: 0.19, duration: 11.3, delay: 14.2 },
  { top: '15.1%', left: '91.0%', size: 1.5, max: 0.77, duration: 10.6, delay: 9.2 },
  { top: '13.0%', left: '94.9%', size: 1, max: 0.4, tone: 'cool', duration: 16.9, delay: 7.3 },

  { top: '19.8%', left: '2.5%', size: 1, max: 0.22, duration: 13.6, delay: 2.4 },
  { top: '21.2%', left: '10.0%', size: 1, max: 0.37, duration: 15.2, delay: 6.1 },
  { top: '17.1%', left: '18.3%', size: 1, max: 0.35, tone: 'gold', duration: 15.6, delay: 13.7 },
  { top: '17.2%', left: '32.5%', size: 1, max: 0.17, tone: 'cool', duration: 13.4, delay: 15.7 },
  { top: '17.9%', left: '34.6%', size: 2, max: 0.87, tone: 'cool', duration: 11.3, delay: 6.3, glint: true, blaze: true },
  { top: '18.2%', left: '43.0%', size: 1, max: 0.49, duration: 12.1, delay: 3.3 },
  { top: '22.7%', left: '39.1%', size: 1, max: 0.31, tone: 'gold', duration: 16.2, delay: 1.9 },
  { top: '20.0%', left: '52.4%', size: 1, max: 0.47, duration: 15.9, delay: 3.4 },
  { top: '20.8%', left: '55.3%', size: 1.5, max: 0.65, tone: 'cool', duration: 13.4, delay: 4.7, glint: true },
  { top: '19.9%', left: '64.3%', size: 1, max: 0.2, duration: 14.6, delay: 6.5 },
  { top: '20.4%', left: '71.2%', size: 1, max: 0.29, duration: 11.4, delay: 5.6 },
  { top: '19.3%', left: '77.9%', size: 1, max: 0.46, duration: 17.1, delay: 7.4 },
  { top: '17.9%', left: '88.6%', size: 1.5, max: 0.57, duration: 11.6, delay: 8.3 },
  { top: '23.4%', left: '83.2%', size: 1, max: 0.36, duration: 13.1, delay: 7.8 },
  { top: '20.3%', left: '97.1%', size: 1.5, max: 0.63, tone: 'gold', duration: 11.0, delay: 11.9, glint: true },

  { top: '28.0%', left: '4.1%', size: 1, max: 0.27, duration: 14.8, delay: 7.1 },
  { top: '25.0%', left: '11.2%', size: 1, max: 0.28, tone: 'cool', duration: 17.4, delay: 7.3 },
  { top: '24.0%', left: '17.1%', size: 1, max: 0.38, duration: 17.3, delay: 9.4 },
  { top: '26.1%', left: '22.4%', size: 1, max: 0.16, duration: 11.0, delay: 2.1 },
  { top: '27.1%', left: '31.3%', size: 1, max: 0.44, duration: 11.2, delay: 0.3 },
  { top: '29.6%', left: '40.4%', size: 1.5, max: 0.55, tone: 'cool', duration: 11.9, delay: 12.8, glint: true },
  { top: '26.9%', left: '50.2%', size: 1, max: 0.42, duration: 16.2, delay: 4.0 },
  { top: '27.1%', left: '64.5%', size: 1, max: 0.28, tone: 'cool', duration: 17.2, delay: 12.1 },
  { top: '28.8%', left: '69.2%', size: 1, max: 0.22, tone: 'gold', duration: 16.1, delay: 5.0 },
  { top: '24.0%', left: '76.1%', size: 1, max: 0.2, duration: 16.5, delay: 2.8 },
  { top: '25.1%', left: '84.7%', size: 1, max: 0.35, tone: 'gold', duration: 14.0, delay: 3.8 },
  { top: '26.3%', left: '90.6%', size: 1, max: 0.4, duration: 13.7, delay: 5.3 },
  { top: '26.1%', left: '95.5%', size: 1, max: 0.5, tone: 'cool', duration: 11.2, delay: 10.4 },

  { top: '31.0%', left: '2.0%', size: 1, max: 0.32, duration: 10.9, delay: 15.8 },
  { top: '31.5%', left: '10.7%', size: 1, max: 0.46, duration: 16.8, delay: 3.8 },
  { top: '34.4%', left: '15.9%', size: 1, max: 0.3, duration: 14.9, delay: 5.4 },
  { top: '35.9%', left: '36.4%', size: 1, max: 0.46, tone: 'cool', duration: 16.7, delay: 8.0 },
  { top: '31.8%', left: '48.6%', size: 1, max: 0.19, duration: 12.4, delay: 13.7 },
  { top: '31.3%', left: '58.8%', size: 1, max: 0.16, tone: 'gold', duration: 16.8, delay: 0.4 },
  { top: '32.2%', left: '65.4%', size: 1, max: 0.45, tone: 'cool', duration: 10.8, delay: 13.7 },
  { top: '31.7%', left: '67.7%', size: 1, max: 0.45, duration: 14.3, delay: 12.4 },
  { top: '32.3%', left: '81.7%', size: 1, max: 0.28, duration: 14.8, delay: 9.2 },
  { top: '36.2%', left: '86.3%', size: 1.5, max: 0.5, tone: 'gold', duration: 13.3, delay: 9.9 },
  { top: '32.1%', left: '91.6%', size: 1, max: 0.23, tone: 'cool', duration: 11.9, delay: 16.0 },

  { top: '41.2%', left: '5.2%', size: 1, max: 0.22, duration: 15.7, delay: 3.6 },
  { top: '41.1%', left: '10.4%', size: 1.5, max: 0.57, tone: 'gold', duration: 11.7, delay: 2.4, glint: true },
  { top: '40.5%', left: '21.4%', size: 1, max: 0.34, duration: 16.3, delay: 13.6 },
  { top: '43.5%', left: '32.8%', size: 1, max: 0.26, tone: 'cool', duration: 15.4, delay: 3.1 },
  { top: '41.1%', left: '45.0%', size: 1, max: 0.39, tone: 'gold', duration: 14.2, delay: 1.3 },
  { top: '38.7%', left: '58.7%', size: 1, max: 0.19, duration: 11.5, delay: 11.7 },
  { top: '38.8%', left: '64.2%', size: 1.5, max: 0.54, tone: 'cool', duration: 14.6, delay: 11.7 },
  { top: '39.3%', left: '69.6%', size: 1, max: 0.42, duration: 12.4, delay: 8.9 },
  { top: '40.5%', left: '74.7%', size: 2, max: 0.82, tone: 'cool', duration: 16.6, delay: 4.7, glint: true, blaze: true },
  { top: '39.2%', left: '81.8%', size: 1, max: 0.19, duration: 14.5, delay: 4.1 },
  { top: '42.9%', left: '90.5%', size: 1.5, max: 0.54, duration: 11.6, delay: 6.6, glint: true },
  { top: '38.2%', left: '96.8%', size: 1.5, max: 0.52, duration: 10.7, delay: 7.6 },

  { top: '49.4%', left: '10.2%', size: 1, max: 0.37, tone: 'cool', duration: 16.9, delay: 14.9 },
  { top: '47.2%', left: '21.5%', size: 1, max: 0.13, tone: 'cool', duration: 14.5, delay: 2.3 },
  { top: '46.5%', left: '30.6%', size: 1, max: 0.37, duration: 14.9, delay: 10.5 },
  { top: '47.9%', left: '49.2%', size: 1, max: 0.17, duration: 11.7, delay: 10.6 },
  { top: '50.6%', left: '43.7%', size: 1, max: 0.19, duration: 12.7, delay: 6.8 },
  { top: '45.2%', left: '58.2%', size: 1, max: 0.23, duration: 13.6, delay: 9.4 },
  { top: '45.1%', left: '65.5%', size: 1, max: 0.41, duration: 14.4, delay: 11.3 },
  { top: '45.2%', left: '70.3%', size: 1, max: 0.34, duration: 14.5, delay: 13.3 },
  { top: '46.7%', left: '75.8%', size: 1, max: 0.14, tone: 'gold', duration: 14.0, delay: 13.1 },
  { top: '49.0%', left: '85.0%', size: 1, max: 0.2, tone: 'cool', duration: 16.0, delay: 12.1 },
  { top: '47.7%', left: '96.1%', size: 1, max: 0.25, tone: 'gold', duration: 16.7, delay: 8.3 },

  { top: '54.9%', left: '2.4%', size: 1, max: 0.19, duration: 16.0, delay: 15.9 },
  { top: '53.5%', left: '11.7%', size: 1, max: 0.32, duration: 15.3, delay: 13.0 },
  { top: '56.5%', left: '19.6%', size: 1, max: 0.17, duration: 11.9, delay: 3.6 },
  { top: '55.3%', left: '22.4%', size: 1, max: 0.17, tone: 'cool', duration: 16.7, delay: 5.9 },
  { top: '54.9%', left: '36.9%', size: 1, max: 0.13, duration: 12.6, delay: 5.5 },
  { top: '55.1%', left: '41.9%', size: 1, max: 0.14, tone: 'gold', duration: 11.4, delay: 9.5 },
  { top: '53.2%', left: '54.8%', size: 1, max: 0.14, duration: 14.6, delay: 6.9 },
  { top: '52.4%', left: '62.0%', size: 1, max: 0.16, duration: 10.8, delay: 11.9 },
  { top: '55.1%', left: '70.0%', size: 1, max: 0.31, tone: 'cool', duration: 17.3, delay: 10.7 },
  { top: '54.9%', left: '76.8%', size: 1, max: 0.23, duration: 11.8, delay: 9.1 },
  { top: '54.7%', left: '82.0%', size: 1, max: 0.32, duration: 15.7, delay: 8.3 },
  { top: '54.6%', left: '87.0%', size: 1.5, max: 0.48, tone: 'cool', duration: 14.5, delay: 10.0 },
  { top: '51.2%', left: '90.8%', size: 1, max: 0.24, duration: 16.4, delay: 11.5 },
  { top: '56.3%', left: '96.9%', size: 1, max: 0.36, duration: 14.2, delay: 3.3 },
];

/* staggered across one 32s cycle so a streak crosses roughly every four
   seconds; travelY tracks tan(angle) so each trail points where it travels */
const COMETS: Comet[] = [
  { top: '5%', left: '4%', width: 110, angle: 14, travelX: 360, travelY: 90, delay: 1.5 },
  { top: '11%', left: '26%', width: 86, angle: 11, travelX: 300, travelY: 58, delay: 5.2 },
  { top: '7%', left: '48%', width: 100, angle: 17, travelX: 330, travelY: 101, delay: 9.8 },
  { top: '15%', left: '68%', width: 78, angle: 9, travelX: 280, travelY: 44, delay: 13.4 },
  { top: '4%', left: '80%', width: 118, angle: 15, travelX: 390, travelY: 105, delay: 17.9 },
  { top: '20%', left: '12%', width: 72, angle: 12, travelX: 260, travelY: 55, delay: 21.6 },
  { top: '9%', left: '58%', width: 94, angle: 19, travelX: 350, travelY: 120, delay: 26.3 },
  { top: '17%', left: '38%', width: 82, angle: 10, travelX: 310, travelY: 55, delay: 30.1 },
];

const DUST_ROWS = 14;
const DUST_COLUMNS = 16;

/* Laid out from a fixed seed rather than drawn, so the server and the client
   scatter the field identically — a drawn one re-rolls at hydration and every
   dust star jumps. */
function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (value: number) => Math.round(value * 100) / 100;

/* The field above carries the sky's shape; this is the depth behind it, on the
   same jittered grid and thinning and dimming toward the lit lower sky the
   same way. Dust is never the brightest thing in its own neighbourhood — the
   tuned stars have to stay the ones the eye lands on. */
function buildDust(): Dust[] {
  const random = seededRandom(0x5eed);
  const dust: Dust[] = [];
  for (let row = 0; row < DUST_ROWS; row += 1) {
    const depth = row / (DUST_ROWS - 1);
    for (let column = 0; column < DUST_COLUMNS; column += 1) {
      if (random() > 1 - depth * 0.5) continue;
      const tint = random();
      dust.push({
        top: round(((row + random()) / DUST_ROWS) * 82),
        left: round(((column + random()) / DUST_COLUMNS) * 100),
        size: tint > 0.94 ? 1.5 : 1,
        max: round((0.06 + random() * 0.2) * (1 - depth * 0.4)),
        tone: tint < 0.14 ? 'cool' : tint > 0.9 ? 'gold' : undefined,
      });
    }
  }
  return dust;
}

const DUST = buildDust();

export function HeroStarfield() {
  return (
    <div className="pw-starfield" aria-hidden>
      <div className="pw-starfield-layer">
        <i className="pw-galaxy" />
        {DUST.map((star, index) => (
          <span
            key={`dust-${index}`}
            className={['pw-star', 'pw-star-dust', star.tone ? `pw-star-${star.tone}` : '']
              .filter(Boolean)
              .join(' ')}
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              '--pw-star-max': String(star.max),
            } as CSSProperties}
          />
        ))}
        {STARS.map((star, index) => (
          <span
            key={index}
            className={[
              'pw-star',
              star.tone ? `pw-star-${star.tone}` : '',
              star.glint ? 'pw-star-glint' : '',
              star.blaze ? 'pw-star-blaze' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              '--pw-star-max': String(star.max),
            } as CSSProperties}
          />
        ))}
        {COMETS.map((comet, index) => (
          <i
            key={index}
            className="pw-comet"
            style={{
              top: comet.top,
              left: comet.left,
              width: `${comet.width}px`,
              animationDelay: `${comet.delay}s`,
              '--pw-comet-angle': `${comet.angle}deg`,
              '--pw-comet-x': `${comet.travelX}px`,
              '--pw-comet-y': `${comet.travelY}px`,
            } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
