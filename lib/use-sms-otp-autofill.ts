'use client';

import { useEffect, useRef } from 'react';
import { toEnglishDigits } from '@/lib/demo-form';

type UseSmsOtpAutofillOptions = {
  enabled: boolean;
  length: number;
  requestToken?: number;
  onCode: (code: string) => void;
};

function isOtpCredential(credential: Credential | null): credential is OTPCredential {
  return credential !== null && 'code' in credential;
}

/**
 * Mirrors `promall-ui/src/hooks/use-sms-otp-autofill.ts` — keep them in lock-step.
 * Reads the incoming verification SMS through the WebOTP API (Chrome on Android) so the
 * code lands in the field without the visitor leaving the page. Requires the SMS body to
 * end with `@<origin-host> #<code>`; iOS/Safari is covered by the input's native
 * `autocomplete="one-time-code"` instead. `requestToken` re-arms the listener whenever a
 * fresh code is sent, so a resend still autofills after a dismissed browser prompt.
 */
export function useSmsOtpAutofill({
  enabled,
  length,
  requestToken,
  onCode,
}: UseSmsOtpAutofillOptions): void {
  const onCodeRef = useRef(onCode);
  onCodeRef.current = onCode;

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined' || !('OTPCredential' in window) || !window.isSecureContext) {
      return;
    }

    const controller = new AbortController();

    navigator.credentials
      .get({ otp: { transport: ['sms'] }, signal: controller.signal })
      .then((credential) => {
        if (!isOtpCredential(credential)) return;
        const digits = toEnglishDigits(credential.code).replace(/\D/g, '');
        if (digits.length === length) onCodeRef.current(digits);
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, [enabled, length, requestToken]);
}
