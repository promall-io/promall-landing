import { Reveal } from '@/components/Reveal';
import type { ArticleBlock } from '@/types/blog';

function Paragraph({ text }: { text: string }) {
  return <p className="pw-body text-[var(--pw-text)]">{text}</p>;
}

function Heading({ id, text }: { id: string; text: string }) {
  return (
    <h2 id={id} className="pw-h2 scroll-mt-28 pt-6 text-balance">
      {text}
    </h2>
  );
}

function Subheading({ text }: { text: string }) {
  return <h3 className="pw-h3 pt-2 text-balance">{text}</h3>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="pw-body flex gap-3 text-[var(--pw-text)]">
          <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-[var(--pw-gold)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function StepList({ items }: { items: string[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {items.map((item, index) => (
        <li key={item} className="pw-body flex gap-3.5 text-[var(--pw-text)]">
          <span className="pw-num mt-[0.15em] flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--pw-surface-2)] text-xs text-[var(--pw-gold)] ring-1 ring-[var(--pw-line)]">
            {index + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function Callout({ title, text }: { title: string; text: string }) {
  return (
    <aside className="pw-card border-s-2 border-s-[var(--pw-gold)] p-6">
      <p className="text-sm text-[var(--pw-gold)]">{title}</p>
      <p className="pw-body mt-2 text-[var(--pw-text)]">{text}</p>
    </aside>
  );
}

function DataTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div data-lenis-prevent-wheel className="pw-card overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-start">
        <thead>
          <tr>
            {head.map((cell, index) => (
              <th
                key={`${cell}-${index}`}
                scope="col"
                className="border-b border-[var(--pw-line)] px-5 py-4 text-start text-sm font-medium text-[var(--pw-cream)]"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('|')} className="border-b border-[var(--pw-line)] last:border-b-0">
              {row.map((cell, index) => (
                <td
                  key={`${cell}-${index}`}
                  className={
                    index === 0
                      ? 'px-5 py-4 text-sm leading-[1.7] text-[var(--pw-cream)]'
                      : 'px-5 py-4 text-sm leading-[1.7] text-[var(--pw-text-dim)]'
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.kind) {
    case 'heading':
      return <Heading id={block.id} text={block.text} />;
    case 'subheading':
      return <Subheading text={block.text} />;
    case 'list':
      return <BulletList items={block.items} />;
    case 'steps':
      return <StepList items={block.items} />;
    case 'callout':
      return <Callout title={block.title} text={block.text} />;
    case 'table':
      return <DataTable head={block.head} rows={block.rows} />;
    default:
      return <Paragraph text={block.text} />;
  }
}

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, index) => (
        <Reveal key={`${block.kind}-${index}`} distance={20}>
          <Block block={block} />
        </Reveal>
      ))}
    </div>
  );
}
