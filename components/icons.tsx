import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function Icon({ children, size = 20, ...rest }: IconProps & { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden {...base} {...rest}>
      {children}
    </svg>
  );
}

export const ArrowLeftIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
  </Icon>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14m0 0-6-6m6 6-6 6" />
  </Icon>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Icon>
);

export const CrossIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const PlugIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8ZM12 17v4" />
  </Icon>
);

export const BoltIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" />
  </Icon>
);

export const ShieldIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3 5 6v6c0 4 3 7.2 7 9 4-1.8 7-5 7-9V6l-7-3Z" />
  </Icon>
);

export const TrendIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 18h16M7 15l3.5-4 3 2.5L18 8" />
  </Icon>
);

export const ClockIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4.5l3 1.8" />
  </Icon>
);

export const SparkIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 4v6M12 14v6M4 12h6M14 12h6M7 7l3 3M14 14l3 3M17 7l-3 3M10 14l-3 3" />
  </Icon>
);

export const CheckCircleIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="m8.5 12.2 2.4 2.4 4.6-5" />
  </Icon>
);

export const GaugeIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 12l3.5-3.5" />
  </Icon>
);

export const ChatIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 12a7 7 0 0 1-7 7H8l-4 3v-4.6A7 7 0 0 1 11 5h2a7 7 0 0 1 7 7Z" />
  </Icon>
);

export const CartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 4h2l2.2 10.2A2 2 0 0 0 9.2 16h7.9a2 2 0 0 0 2-1.6L21 7H6" />
    <circle cx="10" cy="20" r="1.2" />
    <circle cx="18" cy="20" r="1.2" />
  </Icon>
);

export const BoxIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m12 3 8 4.2v9.6L12 21l-8-4.2V7.2L12 3Zm0 0v18M4 7.2l8 4.3 8-4.3" />
  </Icon>
);

export const SearchIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="6" />
    <path d="m16 16 4 4" />
  </Icon>
);

export const PlayIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 6.5 17 12l-8 5.5V6.5Z" fill="currentColor" stroke="none" />
  </Icon>
);

export const SunIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3.5v1.7M12 18.8v1.7M20.5 12h-1.7M5.2 12H3.5M18 6l-1.2 1.2M7.2 16.8 6 18M18 18l-1.2-1.2M7.2 7.2 6 6" />
  </Icon>
);

export const MoonIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 13.4A8.2 8.2 0 0 1 10.6 4a8.2 8.2 0 1 0 9.4 9.4Z" />
  </Icon>
);

export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 8h16M4 16h16" />
  </Icon>
);

export const CloseIcon = CrossIcon;

export const InstagramIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="4" width="16" height="16" rx="5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
  </Icon>
);

export const TelegramIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M21 5 3.5 11.4l4.8 1.6L19 7l-8.4 8.1.3 4.4 2.7-3.4 4.2 3L21 5Z" />
  </Icon>
);

export const LinkedinIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 9v10M6 5.5v.5M11 19v-5.5a2.5 2.5 0 0 1 5 0V19" />
    <path d="M11 9v10" />
  </Icon>
);

export const XIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 5 14 14M19 5 5 19" />
  </Icon>
);

const MARK_WIDTH = 580;
const MARK_HEIGHT = 660;

const MARK_BOWL =
  'M 190 42 L 392 42 A 150 150 0 0 1 538 192 L 538 300 C 538 372 496 426 410 456 L 214 458 L 398 268 L 402 248 C 402 210 398 192 378 182 L 120 176 C 92 175 78 170 70 162 L 190 42 Z';
const MARK_STEM =
  'M 42 246 Q 42 234 54 234 L 179 234 Q 191 234 191 246 L 191 468 L 44 616 L 42 612 L 42 246 Z';

export const ProMallMark = ({ size = 28, ...rest }: IconProps & { size?: number }) => (
  <svg
    viewBox={`0 0 ${MARK_WIDTH} ${MARK_HEIGHT}`}
    width={size}
    height={Math.round((size * MARK_HEIGHT) / MARK_WIDTH)}
    fill="none"
    aria-hidden
    style={{ flexShrink: 0 }}
    {...rest}
  >
    <path d={MARK_BOWL} fill="currentColor" />
    <path d={MARK_STEM} fill="var(--pw-mark-stem)" />
  </svg>
);
