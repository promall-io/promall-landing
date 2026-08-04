'use client';

import Image from 'next/image';
import { useState } from 'react';

const ENAMAD_ID = '650462';
const ENAMAD_CODE = 'b6cJOzpyayyExJwFHb8LSZv4ZdAJ24MB';

const sealHref = `https://trustseal.enamad.ir/?id=${ENAMAD_ID}&Code=${ENAMAD_CODE}`;
const sealLogo = `https://trustseal.enamad.ir/logo.aspx?id=${ENAMAD_ID}&Code=${ENAMAD_CODE}`;

interface EnamadSealProps {
  label: string;
  alt: string;
}

export function EnamadSeal({ label, alt }: EnamadSealProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return null;
  }

  return (
    <a
      href={sealHref}
      target="_blank"
      rel="noreferrer"
      referrerPolicy="origin"
      aria-label={label}
      className="inline-flex h-[84px] w-[84px] items-center justify-center rounded-[20px] border border-[var(--partner-mark-border)] bg-[var(--partner-mark-surface)] p-2 transition-colors duration-300 hover:border-[var(--partner-mark-border-strong)]"
    >
      <Image
        src={sealLogo}
        alt={alt}
        width={68}
        height={68}
        unoptimized
        loading="lazy"
        referrerPolicy="origin"
        onError={() => setFailed(true)}
        className="h-full w-full object-contain"
      />
    </a>
  );
}
