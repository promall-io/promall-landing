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
import { AnimatePresence, motion } from 'framer-motion';
import { REVEAL_EASE } from '@/components/Reveal';
import { ArrowRightIcon, ShieldIcon } from '@/components/icons';
import {
  DEMO_REQUEST,
  DEMO_REQUEST_ERROR_CODES,
  groupIranMobile,
  localizeDigits,
  normalizeInstagramHandle,
  normalizeIranMobile,
  normalizeVerificationCode,
  RESEND_SECONDS_TOKEN,
  sanitizeInstagramInput,
  sanitizePhoneInput,
  sanitizeVerificationCodeInput,
  type DemoRequestErrorCode,
} from '@/lib/demo-form';
import { useSmsOtpAutofill } from '@/lib/use-sms-otp-autofill';

export type DemoFormLabels = {
  formTitle: string;
  formSubtitle: string;
  phoneLabel: string;
  phonePlaceholder: string;
  phoneHint: string;
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

type FormStep = 'details' | 'code' | 'success';

type FormStatus = 'idle' | 'pending';

type FieldErrors = { phone?: boolean; instagram?: boolean; code?: boolean };

function Field({
  id,
  label,
  error,
  hint,
  prefix,
  children,
}: {
  id: string;
  label: string;
  error: string | null;
  hint?: string;
  prefix?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="pw-micro mb-2 block text-[var(--pw-text-dim)]">
        {label}
      </label>
      {/* The field's height comes from the input's own padding, not the
          wrapper's. Both draw the same box, but only this way does the whole
          52px answer to a tap — with the padding on the wrapper the input is a
          24px line of text floating in dead space. */}
      <div
        dir="ltr"
        className={`flex items-stretch rounded-2xl bg-[var(--pw-surface-2)] px-4 ring-1 [transition:box-shadow_0.4s_var(--pw-ease)] focus-within:ring-[var(--ring)] ${
          error ? 'ring-[var(--pw-danger)]' : 'ring-[var(--pw-line)]'
        }`}
      >
        {prefix ? (
          <span className="pw-latin flex select-none items-center text-sm text-[var(--pw-text-faint)]">
            {prefix}
          </span>
        ) : null}
        {children}
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-[var(--danger-ink)]">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="pw-micro mt-2 text-[var(--pw-text-faint)]">
          {hint}
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
      className="rounded-2xl bg-[var(--danger-soft)] px-4 py-3 text-sm text-[var(--danger-ink)]"
    >
      {message}
    </p>
  );
}

function SuccessMark() {
  return (
    <span className="flex size-16 items-center justify-center rounded-full bg-[var(--success-soft)]">
      <svg viewBox="0 0 52 52" className="size-9" aria-hidden>
        <motion.path
          d="M15.5 27.5l7 7L37 19.5"
          fill="none"
          stroke="var(--pw-success)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
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
  const mountedAtRef = useRef(0);
  const codeInputRef = useRef<HTMLInputElement>(null);

  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [code, setCode] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [step, setStep] = useState<FormStep>('details');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [alertCode, setAlertCode] = useState<DemoRequestErrorCode | null>(null);
  const [resendIn, setResendIn] = useState(0);
  const [codeRequestToken, setCodeRequestToken] = useState(0);
  const [submitted, setSubmitted] = useState<{ phone: string; instagram: string } | null>(
    null,
  );

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (resendIn <= 0) {
      return;
    }
    const timer = window.setTimeout(() => setResendIn((seconds) => seconds - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [resendIn]);

  const alertMessage = (() => {
    switch (alertCode) {
      case DEMO_REQUEST_ERROR_CODES.TOO_MANY_REQUESTS:
        return labels.rateLimitError;
      case DEMO_REQUEST_ERROR_CODES.SEND_FAILED:
        return labels.sendFailedError;
      case DEMO_REQUEST_ERROR_CODES.CODE_EXPIRED:
        return labels.codeExpiredError;
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
      const parsed = body as {
        code?: DemoRequestErrorCode;
        resendAfterSeconds?: unknown;
      } | null;
      const resendAfterSeconds = Number(parsed?.resendAfterSeconds);
      return {
        ok: response.ok,
        errorCode: parsed?.code ?? null,
        resendAfterSeconds:
          Number.isFinite(resendAfterSeconds) && resendAfterSeconds > 0
            ? Math.ceil(resendAfterSeconds)
            : DEMO_REQUEST.FALLBACK_RESEND_AFTER_SECONDS,
      };
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

  const handleCodeChange = (value: string) => {
    setCode(sanitizeVerificationCodeInput(value));
    if (errors.code) {
      setErrors((previous) => ({ ...previous, code: false }));
    }
  };

  useSmsOtpAutofill({
    enabled: step === 'code' && status !== 'pending',
    length: DEMO_REQUEST.VERIFICATION_CODE_LENGTH,
    requestToken: codeRequestToken,
    onCode: handleCodeChange,
  });

  const requestCode = async (normalizedPhone: string) => {
    setStatus('pending');
    setAlertCode(null);
    try {
      const { ok, errorCode, resendAfterSeconds } = await postJson(
        '/api/demo-request/verification',
        { phoneNumber: normalizedPhone },
      );
      if (!ok) {
        setAlertCode(errorCode ?? DEMO_REQUEST_ERROR_CODES.SEND_FAILED);
        return false;
      }
      setResendIn(resendAfterSeconds);
      setCodeRequestToken((token) => token + 1);
      return true;
    } catch {
      setAlertCode(DEMO_REQUEST_ERROR_CODES.SEND_FAILED);
      return false;
    } finally {
      setStatus('idle');
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

    if (await requestCode(normalizedPhone)) {
      setCode('');
      setStep('code');
      window.setTimeout(() => codeInputRef.current?.focus(), 0);
    }
  };

  const handleResend = async () => {
    const normalizedPhone = normalizeIranMobile(phone);
    if (status === 'pending' || resendIn > 0 || !normalizedPhone) {
      return;
    }
    await requestCode(normalizedPhone);
  };

  const handleCodeSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'pending') {
      return;
    }

    const normalizedPhone = normalizeIranMobile(phone);
    const normalizedHandle = normalizeInstagramHandle(instagram);
    const normalizedCode = normalizeVerificationCode(code);
    setErrors({ code: !normalizedCode });

    if (!normalizedPhone || !normalizedHandle || !normalizedCode) {
      return;
    }

    setStatus('pending');
    setAlertCode(null);
    try {
      const { ok, errorCode } = await postJson('/api/demo-request', {
        phoneNumber: normalizedPhone,
        instagramHandle: normalizedHandle,
        verificationCode: normalizedCode,
        locale,
      });

      if (!ok) {
        if (errorCode === DEMO_REQUEST_ERROR_CODES.CODE_INVALID) {
          setErrors({ code: true });
        } else {
          setAlertCode(errorCode ?? DEMO_REQUEST_ERROR_CODES.SUBMIT_FAILED);
        }
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

  const backToDetails = () => {
    setStep('details');
    setAlertCode(null);
    setErrors({});
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
            initial={{ opacity: 0, y: 18 }}
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
        ) : step === 'code' ? (
          <motion.form
            key="code"
            noValidate
            onSubmit={handleCodeSubmit}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: REVEAL_EASE }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="pw-h3">{labels.codeTitle}</h2>
              <p className="pw-small mt-2">
                {labels.codeSubtitle}{' '}
                <span dir="ltr" className="pw-num text-[var(--pw-cream)]">
                  {localizeDigits(groupIranMobile(normalizeIranMobile(phone) ?? phone), locale)}
                </span>
              </p>
              <button
                type="button"
                onClick={backToDetails}
                className="pw-link pw-micro -mb-3 mt-1 inline-flex min-h-[var(--pw-touch)] items-center"
              >
                {labels.editPhone}
              </button>
            </div>

            <Field
              id="demo-code"
              label={labels.codeLabel}
              error={errors.code ? labels.codeError : null}
            >
              <input
                id="demo-code"
                ref={codeInputRef}
                type="text"
                dir="ltr"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder={labels.codePlaceholder}
                value={localizeDigits(code, locale)}
                onChange={(event) => handleCodeChange(event.target.value)}
                aria-invalid={errors.code || undefined}
                aria-describedby={errors.code ? 'demo-code-error' : undefined}
                className="pw-num w-full bg-transparent py-3.5 text-center text-lg tracking-[0.4em] text-[var(--pw-cream)] outline-none placeholder:tracking-normal placeholder:text-[var(--pw-text-faint)]"
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

            <button
              type="button"
              onClick={handleResend}
              disabled={resendIn > 0 || status === 'pending'}
              className="pw-link pw-micro -my-3 flex min-h-[var(--pw-touch)] items-center justify-center text-center disabled:cursor-default disabled:opacity-60"
            >
              {resendIn > 0
                ? labels.resendCountdown.replace(
                    RESEND_SECONDS_TOKEN,
                    localizeDigits(String(resendIn), locale),
                  )
                : labels.resend}
            </button>
          </motion.form>
        ) : (
          <motion.form
            key="details"
            noValidate
            onSubmit={handleDetailsSubmit}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
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
              hint={labels.phoneHint}
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
                aria-describedby={errors.phone ? 'demo-phone-error' : 'demo-phone-hint'}
                className="pw-num w-full bg-transparent py-3.5 text-base text-[var(--pw-cream)] outline-none placeholder:text-[var(--pw-text-faint)]"
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
                className="pw-latin w-full bg-transparent py-3.5 text-base text-[var(--pw-cream)] outline-none placeholder:text-[var(--pw-text-faint)]"
              />
            </Field>

            {alertMessage ? <FormAlert message={alertMessage} /> : null}

            <button
              type="submit"
              disabled={status === 'pending'}
              className="pw-button pw-button-primary w-full gap-2 disabled:cursor-wait disabled:opacity-70"
            >
              {status === 'pending' ? labels.sendingCode : labels.sendCode}
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
