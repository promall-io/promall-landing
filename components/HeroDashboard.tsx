import { AppReplica } from '@/components/app-replica';

export function HeroDashboard({ alt }: { alt: string }) {
  return (
    <div className="relative w-full max-w-[1080px] shrink-0 rounded-t-3xl bg-[rgba(24,35,58,0.55)] p-2 ring-1 ring-[var(--pw-line)] backdrop-blur-[24px] max-[810px]:w-[820px] max-[810px]:max-w-none sm:p-3">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent, var(--pw-cream) 30%, var(--pw-cream) 70%, transparent)',
        }}
      />

      <div className="overflow-hidden rounded-[18px] ring-1 ring-[var(--pw-line)]">
        <div className="relative aspect-[1280/860] w-full">
          <AppReplica label={alt} />
        </div>
      </div>
    </div>
  );
}
