export function SkipLink({ label }: { label: string }) {
  return (
    <a href="#main" className="pw-skip-link">
      {label}
    </a>
  );
}
