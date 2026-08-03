import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/ui/Primitives';
import { Reveal } from '@/components/Reveal';
import { BoltIcon, PlugIcon, ProMallMark, ShieldIcon, TrendIcon } from '@/components/icons';
import type { IntegrationFeature } from '@/types/content';

const DIAGRAM_WIDTH = 1080;
const DIAGRAM_HEIGHT = 540;
const HUB_X = 540;
const HUB_Y = 540;
const ARC_RADII = [221, 354, 492];
const SPOKE_LENGTH = 492;
const TILT_RATIO = 0.4;
const MAX_TILT = 28;

const NODE_PLACEMENTS = [
  { angle: -67, radius: 352, keepWhenCompact: false },
  { angle: -45, radius: 492, keepWhenCompact: true },
  { angle: -22.4, radius: 354, keepWhenCompact: true },
  { angle: 0, radius: 492, keepWhenCompact: true },
  { angle: 22.4, radius: 354, keepWhenCompact: true },
  { angle: 45, radius: 492, keepWhenCompact: true },
  { angle: 67, radius: 352, keepWhenCompact: false },
];

const FEATURE_ICONS = {
  plug: PlugIcon,
  bolt: BoltIcon,
  shield: ShieldIcon,
  trend: TrendIcon,
};

function polar(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: HUB_X + Math.sin(radians) * radius,
    y: HUB_Y - Math.cos(radians) * radius,
  };
}

function arcPath(radius: number) {
  return `M ${HUB_X - radius} ${HUB_Y} A ${radius} ${radius} 0 0 1 ${HUB_X + radius} ${HUB_Y}`;
}

function spokePath(angle: number) {
  const end = polar(angle, SPOKE_LENGTH);
  return `M ${HUB_X} ${HUB_Y} L ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

function tiltFor(angle: number) {
  const tilt = angle * TILT_RATIO;
  return Math.max(-MAX_TILT, Math.min(MAX_TILT, tilt));
}

function RadialGuides() {
  return (
    <svg
      viewBox={`0 0 ${DIAGRAM_WIDTH} ${DIAGRAM_HEIGHT}`}
      aria-hidden
      className="absolute inset-0 size-full"
      fill="none"
      stroke="rgb(var(--white-rgb) / 7%)"
      strokeWidth={1}
      vectorEffect="non-scaling-stroke"
    >
      {ARC_RADII.map((radius) => (
        <path key={`arc-${radius}`} d={arcPath(radius)} vectorEffect="non-scaling-stroke" />
      ))}
      {NODE_PLACEMENTS.map(({ angle }) => (
        <path key={`spoke-${angle}`} d={spokePath(angle)} vectorEffect="non-scaling-stroke" />
      ))}
      <path
        d={`M 0 ${HUB_Y - 0.5} H ${DIAGRAM_WIDTH}`}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function RadialDiagram({ nodes, hubLabel }: { nodes: string[]; hubLabel: string }) {
  return (
    <figure className="w-full">
      <div className="relative w-full pb-11 min-[810px]:pb-16">
        <div
          dir="ltr"
          className="relative aspect-[1080/540] w-full overflow-hidden"
        >
          <RadialGuides />

          {nodes.map((node, index) => {
            const placement = NODE_PLACEMENTS[index];
            if (!placement) {
              return null;
            }

            const point = polar(placement.angle, placement.radius);
            const visibility = placement.keepWhenCompact
              ? 'flex'
              : 'hidden min-[810px]:flex';

            return (
              <span
                key={node}
                className={`${visibility} absolute size-[72px] items-center justify-center rounded-full bg-[var(--pw-surface-2)] px-1.5 text-center ring-1 ring-[var(--pw-line)] min-[810px]:size-24 min-[810px]:px-2.5`}
                style={{
                  insetInlineStart: `${(point.x / DIAGRAM_WIDTH) * 100}%`,
                  insetBlockStart: `${(point.y / DIAGRAM_HEIGHT) * 100}%`,
                  transform: `translate(-50%, -50%) rotate(${tiltFor(placement.angle)}deg)`,
                }}
              >
                <span
                  aria-hidden
                  className="text-[10px] leading-[1.35] text-[var(--pw-text-faint)] min-[810px]:text-[11px]"
                >
                  {node}
                </span>
              </span>
            );
          })}
        </div>

        <div className="pointer-events-none absolute bottom-11 start-0 end-0 flex translate-y-1/2 justify-center min-[810px]:bottom-16">
          <span
            className="flex size-[88px] items-center justify-center rounded-full bg-[var(--pw-surface-3)] text-[var(--pw-cream)] ring-1 ring-[var(--pw-line-strong)] min-[810px]:size-32"
            style={{ boxShadow: 'var(--pw-shadow-glow)' }}
          >
            <ProMallMark size={40} />
          </span>
        </div>
      </div>

      <figcaption className="sr-only">
        {hubLabel}
        <ul>
          {nodes.map((node) => (
            <li key={node}>{node}</li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}

function IntegrationFeatureCell({ feature }: { feature: IntegrationFeature }) {
  const Icon = FEATURE_ICONS[feature.icon];

  return (
    <li className="flex flex-col border-t border-[var(--pw-line)] px-0 py-4 min-[391px]:px-6 min-[810px]:border-t-0 min-[810px]:border-s min-[810px]:px-9">
      <h3 className="text-base leading-[1.5] text-[var(--pw-cream)]">{feature.title}</h3>
      <p className="mt-1 max-w-[26ch] text-sm leading-[1.5] text-[var(--pw-text-dim)]">
        {feature.description}
      </p>
      <span className="mt-8 text-[var(--pw-text-faint)] min-[810px]:mt-9">
        <Icon width={20} height={20} />
      </span>
    </li>
  );
}

export async function Integrations() {
  const t = await getTranslations('sections.integrations');
  const nodes = t.raw('nodes') as string[];
  const features = t.raw('features') as IntegrationFeature[];

  return (
    <section id="integrations" className="pw-section">
      <div className="pw-container pw-section-top">
        <Reveal>
          <SectionHeading
            eyebrow={t('eyebrow')}
            lead={t('titleLead')}
            trail={t('titleTrail')}
            description={t('description')}
          />
        </Reveal>

        <Reveal className="mt-16" delay={0.08}>
          <RadialDiagram nodes={nodes} hubLabel={t('hubLabel')} />
        </Reveal>

        <Reveal className="mt-16" delay={0.12}>
          <ul className="grid grid-cols-1 min-[391px]:grid-cols-2 min-[810px]:grid-cols-4">
            {features.map((feature) => (
              <IntegrationFeatureCell key={feature.title} feature={feature} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
