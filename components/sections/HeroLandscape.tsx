import type { CSSProperties } from 'react';
import { HERO_PARALLAX_RATE } from '@/lib/hero-parallax';
import { HeroParallax } from '@/components/HeroParallax';
import { ThemedImage } from '@/components/ThemedImage';

type Hill = {
  src: string;
  width: number;
  height: number;
  rate: number;
  rise: number;
  fade: boolean;
  minHeight: number;
};

const HILL_QUALITY = 85;

const BACKDROP_HILLS: Hill[] = [
  {
    src: '/landscape/hill-back.png',
    width: 2464,
    height: 909,
    rate: HERO_PARALLAX_RATE.hillBack,
    rise: 72,
    fade: true,
    minHeight: 260,
  },
  {
    src: '/landscape/hill-mid.png',
    width: 2464,
    height: 848,
    rate: HERO_PARALLAX_RATE.hillMid,
    rise: 48,
    fade: false,
    minHeight: 230,
  },
];

const FOREGROUND_HILL: Hill = {
  src: '/landscape/hill-front.png',
  width: 2464,
  height: 488,
  rate: HERO_PARALLAX_RATE.hillFront,
  rise: 36,
  fade: false,
  minHeight: 120,
};

function HillLayer({ hill }: { hill: Hill }) {
  return (
    <div
      className="pw-hill"
      style={
        {
          '--pw-hill-rise': `${hill.rise}px`,
          '--pw-hill-opacity': hill.fade ? '0.001' : '1',
        } as CSSProperties
      }
    >
      <HeroParallax rate={hill.rate}>
        <ThemedImage
          src={hill.src}
          alt=""
          width={hill.width}
          height={hill.height}
          sizes="100vw"
          quality={HILL_QUALITY}
          loading="eager"
          fetchPriority="low"
          className="h-auto w-full object-cover"
          style={{ minHeight: hill.minHeight }}
        />
      </HeroParallax>
    </div>
  );
}

export function HeroLandscape() {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {BACKDROP_HILLS.map((hill) => (
          <HillLayer key={hill.src} hill={hill} />
        ))}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <HillLayer hill={FOREGROUND_HILL} />
      </div>
      <div aria-hidden className="pw-hill-fade" />
    </>
  );
}
