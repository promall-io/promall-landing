'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { REVEAL_EASE } from '@/components/Reveal';
import { ArrowRightIcon, ShieldIcon } from '@/components/icons';
import {
  groupIranMobile,
  localizeDigits,
  normalizeInstagramHandle,
  normalizeIranMobile,
  toEnglishDigits,
} from '@/lib/demo-form';

const INSTAGRAM_URL_PREFIX = /^(?:https?:\/\/)?(?:www\.)?instagram\.com\//i;

export type DemoFormLabels = {
  formTitle: string;
  formSubtitle: string;
  phoneLabel: string;
  phonePlaceholder: string;
  phoneError: string;
  instagramLabel: string;
  instagramPlaceholder: string;
  instagramError: string;
  submit: string;
  submitting: string;
  submitError: string;
  privacyNote: string;
  successTitle: string;
  successSubtitle: string;
  successPhoneLabel: string;
  successHandleLabel: string;
  successCta: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

type FieldErrors = { phone?: boolean; instagram?: boolean };

function Field({
  id,
  label,
  error,
  prefix,
  children,
}: {
  id: string;
  label: string;
  error: string | null;
  prefix?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="pw-micro mb-2 block text-[var(--pw-text-dim)]">
        {label}
      </label>
      <div
        dir="ltr"
        className={`flex items-center rounded-2xl bg-[var(--pw-surface-2)] px-4 py-3.5 ring-1 [transition:box-shadow_0.4s_var(--pw-ease)] focus-within:ring-[var(--pw-line-strong)] ${
          error ? 'ring-[var(--pw-danger)]' : 'ring-[var(--pw-line)]'
        }`}
      >
        {prefix ? (
          <span className="pw-latin select-none text-sm text-[var(--pw-text-faint)]">{prefix}</span>
        ) : null}
        {children}
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-[var(--pw-danger)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-[var(--pw-surface-2)] px-4 py-3 ring-1 ring-[var(--pw-line)]">
      <span className="pw-micro">{label}</span>
      <span dir="ltr" className="pw-num text-sm text-[var(--pw-cream)]">
        {value}
      </span>
    </div>
  );
}

function SuccessMark() {
  const reduceMotion = useReducedMotion();

  return (
    <span className="flex size-16 items-center justify-center rounded-full bg-[rgba(127,214,164,0.12)]">
      <svg viewBox="0 0 52 52" className="size-9" aria-hidden>
        <motion.path
          d="M15.5 27.5l7 7L37 19.5"
          fill="none"
          stroke="var(--pw-success)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: REVEAL_EASE, delay: 0.15 }}
        />
      </svg>
    </span>
  );
}

type DemoRequestFormProps = {
  labels: DemoFormLabels;
  locale: string;
  homeHref: string;
};

export function DemoRequestForm({ labels, locale, homeHref }: DemoRequestFormProps) {
  const reduceMotion = useReducedMotion();

  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [submitted, setSubmitted] = useState<{ phone: string; instagram: string } | null>(null);

  const handlePhoneChange = (value: string) => {
    const english = toEnglishDigits(value);
    const hasPlus = english.trimStart().startsWith('+');
    const digits = english.replace(/\D/g, '').slice(0, hasPlus ? 12 : 11);
    setPhone(hasPlus ? `+${digits}` : digits);
    if (errors.phone) {
      setErrors((previous) => ({ ...previous, phone: false }));
    }
  };

  const handleInstagramChange = (value: string) => {
    const handle = toEnglishDigits(value)
      .trim()
      .replace(INSTAGRAM_URL_PREFIX, '')
      .replace(/^@+/, '')
      .split(/[/?#\s]/)[0]
      .toLowerCase()
      .replace(/[^a-z0-9._]/g, '')
      .slice(0, 30);
    setInstagram(handle);
    if (errors.instagram) {
      setErrors((previous) => ({ ...previous, instagram: false }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') {
      return;
    }

    const normalizedPhone = normalizeIranMobile(phone);
    const normalizedHandle = normalizeInstagramHandle(instagram);
    setErrors({ phone: !normalizedPhone, instagram: !normalizedHandle });

    if (!normalizedPhone || !normalizedHandle) {
      return;
    }

    if (honeypot) {
      setSubmitted({ phone: normalizedPhone, instagram: normalizedHandle });
      setStatus('success');
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: normalizedPhone,
          instagramHandle: normalizedHandle,
          locale,
        }),
      });
      if (!response.ok) {
        throw new Error(`demo request failed: ${response.status}`);
      }
      setSubmitted({ phone: normalizedPhone, instagram: normalizedHandle });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="pw-card p-7 min-[391px]:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' && submitted ? (
          <motion.div
            key="success"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: REVEAL_EASE }}
            className="flex flex-col items-center py-2 text-center"
          >
            <SuccessMark />
            <h2 className="pw-h3 mt-6">{labels.successTitle}</h2>
            <p className="pw-small mt-3 max-w-[36ch]">{labels.successSubtitle}</p>

            <div className="mt-8 flex w-full flex-col gap-2.5">
              <SummaryRow
                label={labels.successPhoneLabel}
                value={localizeDigits(groupIranMobile(submitted.phone), locale)}
              />
              <SummaryRow
                label={labels.successHandleLabel}
                value={<span className="pw-latin">@{submitted.instagram}</span>}
              />
            </div>

            <Link href={homeHref} className="pw-button pw-button-primary mt-8">
              {labels.successCta}
            </Link>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: REVEAL_EASE }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="pw-h3">{labels.formTitle}</h2>
              <p className="pw-small mt-2">{labels.formSubtitle}</p>
            </div>

            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              className="hidden"
            />

            <Field
              id="demo-phone"
              label={labels.phoneLabel}
              error={errors.phone ? labels.phoneError : null}
            >
              <input
                id="demo-phone"
                type="tel"
                dir="ltr"
                inputMode="tel"
                autoComplete="tel"
                placeholder={labels.phonePlaceholder}
                value={localizeDigits(phone, locale)}
                onChange={(event) => handlePhoneChange(event.target.value)}
                aria-invalid={errors.phone || undefined}
                aria-describedby={errors.phone ? 'demo-phone-error' : undefined}
                className="pw-num w-full bg-transparent text-base text-[var(--pw-cream)] outline-none placeholder:text-[var(--pw-text-faint)]"
              />
            </Field>

            <Field
              id="demo-instagram"
              label={labels.instagramLabel}
              error={errors.instagram ? labels.instagramError : null}
              prefix="instagram.com/"
            >
              <input
                id="demo-instagram"
                type="text"
                dir="ltr"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                placeholder={labels.instagramPlaceholder}
                value={instagram}
                onChange={(event) => handleInstagramChange(event.target.value)}
                aria-invalid={errors.instagram || undefined}
                aria-describedby={errors.instagram ? 'demo-instagram-error' : undefined}
                className="pw-latin w-full bg-transparent text-base text-[var(--pw-cream)] outline-none placeholder:text-[var(--pw-text-faint)]"
              />
            </Field>

            {status === 'error' ? (
              <p
                role="alert"
                className="rounded-2xl bg-[rgba(229,115,106,0.1)] px-4 py-3 text-sm text-[var(--pw-danger)]"
              >
                {labels.submitError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="pw-button pw-button-primary w-full gap-2 disabled:cursor-wait disabled:opacity-70"
            >
              {status === 'submitting' ? labels.submitting : labels.submit}
              <ArrowRightIcon width={17} height={17} className="rtl:-scale-x-100" />
            </button>

            <p className="pw-micro flex items-center justify-center gap-2 text-center">
              <ShieldIcon width={14} height={14} />
              {labels.privacyNote}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
