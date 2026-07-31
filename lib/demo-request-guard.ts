import { DEMO_REQUEST } from '@/lib/demo-form';

export type DemoRequestGuardInput = {
  honeypot?: unknown;
  elapsedMs?: unknown;
};

export function isLikelyBot({ honeypot, elapsedMs }: DemoRequestGuardInput): boolean {
  if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
    return true;
  }

  const elapsed = Number(elapsedMs);
  if (!Number.isFinite(elapsed)) {
    return true;
  }

  return (
    elapsed < DEMO_REQUEST.MIN_FILL_DURATION_MS ||
    elapsed > DEMO_REQUEST.MAX_FILL_DURATION_MS
  );
}
