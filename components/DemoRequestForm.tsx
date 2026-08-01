'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { REVEAL_EASE } from '@/components/Reveal';
import { ArrowRightIcon, ShieldIcon } from '@/components/icons';
import {
  DEMO_REQUEST_ERROR_CODES,
  groupIranMobile,
  localizeDigits,
  normalizeInstagramHandle,
  normalizeIranMobile,
  sanitizeInstagramInput,
  sanitizePhoneInput,
  type DemoRequestErrorCode,
} from '@/lib/demo-form';

export type DemoFormLabels = {
  formTitle: string;
  formSubtitle: string;
  phoneLabel: string;
  phonePlaceholder: string;
  phoneError: string;
  instagramLabel: string;
  instagramPlaceholder: string;
  instagramError: string;
  sendCode: string;
  sendingCode: string;
  codeTitle: string;
  codeSubtitle: string;
  codeLabel: string;
  codePlaceholder: string;
  codeError: string;
  codeExpiredError: string;
  editPhone: string;
  resend: string;
  resendCountdown: string;
  submit: string;
  submitting: string;
  rateLimitError: string;
  sendFailedError: string;
  submitError: string;
  privacyNote: string;
  successTitle: string;
  successSubtitle: string;
  successPhoneLabel: string;
  successHandleLabel: string;
  successCta: string;
};

type FormStep = 'details' | 'success';

type FormStatus = 'idle' | 'pending';

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

function FormAlert({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="rounded-2xl bg-[rgba(229,115,106,0.1)] px-4 py-3 text-sm text-[var(--pw-danger)]"
    >
      {message}
    </p>
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
  const mountedAtRef = useRef(0);

  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [step, setStep] = useState<FormStep>('details');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [alertCode, setAlertCode] = useState<DemoRequestErrorCode | null>(null);
  const [submitted, setSubmitted] = useState<{ phone: string; instagram: string } | null>(
    null,
  );

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  const alertMessage = (() => {
    switch (alertCode) {
      case DEMO_REQUEST_ERROR_CODES.TOO_MANY_REQUESTS:
        return labels.rateLimitError;
      case null:
        return null;
      default:
        return labels.submitError;
    }
  })();

  const postJson = useCallback(
    async (url: string, payload: Record<string, unknown>) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          honeypot,
          elapsedMs: Date.now() - mountedAtRef.current,
        }),
      });
      const body: unknown = await response.json().catch(() => null);
      const errorCode = (body as { code?: DemoRequestErrorCode } | null)?.code;
      return { ok: response.ok, errorCode: errorCode ?? null };
    },
    [honeypot],
  );

  const handlePhoneChange = (value: string) => {
    setPhone(sanitizePhoneInput(value));
    if (errors.phone) {
      setErrors((previous) => ({ ...previous, phone: false }));
    }
  };

  const handleInstagramChange = (value: string) => {
    setInstagram(sanitizeInstagramInput(value));
    if (errors.instagram) {
      setErrors((previous) => ({ ...previous, instagram: false }));
    }
  };

  const handleDetailsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'pending') {
      return;
    }

    const normalizedPhone = normalizeIranMobile(phone);
    const normalizedHandle = normalizeInstagramHandle(instagram);
    setErrors({ phone: !normalizedPhone, instagram: !normalizedHandle });

    if (!normalizedPhone || !normalizedHandle) {
      return;
    }

    setStatus('pending');
    setAlertCode(null);
    try {
      const { ok, errorCode } = await postJson('/api/demo-request', {
        phoneNumber: normalizedPhone,
        instagramHandle: normalizedHandle,
        locale,
      });

      if (!ok) {
        setAlertCode(errorCode ?? DEMO_REQUEST_ERROR_CODES.SUBMIT_FAILED);
        return;
      }

      setSubmitted({ phone: normalizedPhone, instagram: normalizedHandle });
      setStep('success');
    } catch {
      setAlertCode(DEMO_REQUEST_ERROR_CODES.SUBMIT_FAILED);
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div className="pw-card p-7 min-[391px]:p-9">
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

      <AnimatePresence mode="wait" initial={false}>
        {step === 'success' && submitted ? (
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
            key="details"
            noValidate
            onSubmit={handleDetailsSubmit}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: REVEAL_EASE }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="pw-h3">{labels.formTitle}</h2>
              <p className="pw-small mt-2">{labels.formSubtitle}</p>
            </div>

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

            {alertMessage ? <FormAlert message={alertMessage} /> : null}

            <button
              type="submit"
              disabled={status === 'pending'}
              className="pw-button pw-button-primary w-full gap-2 disabled:cursor-wait disabled:opacity-70"
            >
              {status === 'pending' ? labels.submitting : labels.submit}
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
