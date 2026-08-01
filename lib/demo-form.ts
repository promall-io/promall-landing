const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

const INSTAGRAM_URL_PREFIX = /^(?:https?:\/\/)?(?:www\.)?instagram\.com\//i;
const INSTAGRAM_HANDLE_PATTERN = /^[a-z0-9._]{1,30}$/;

export const RESEND_SECONDS_TOKEN = '__seconds__';

export const DEMO_REQUEST = {
  INSTAGRAM_HANDLE_MAX_LENGTH: 30,
  PHONE_MAX_DIGITS: 11,
  PHONE_MAX_DIGITS_WITH_COUNTRY_CODE: 12,
  VERIFICATION_CODE_LENGTH: 6,
  MIN_FILL_DURATION_MS: 2_500,
  MAX_FILL_DURATION_MS: 60 * 60 * 1000,
  UPSTREAM_TIMEOUT_MS: 12_000,
  FALLBACK_EXPIRES_IN_SECONDS: 300,
  FALLBACK_RESEND_AFTER_SECONDS: 60,
} as const;

export const DEMO_REQUEST_ERROR_CODES = {
  BAD_REQUEST: 'BAD_REQUEST',
  INVALID_PHONE: 'INVALID_PHONE',
  INVALID_SUBMISSION: 'INVALID_SUBMISSION',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  SEND_FAILED: 'SEND_FAILED',
  CODE_INVALID: 'CODE_INVALID',
  CODE_EXPIRED: 'CODE_EXPIRED',
  SUBMIT_FAILED: 'SUBMIT_FAILED',
} as const;

export type DemoRequestErrorCode =
  (typeof DEMO_REQUEST_ERROR_CODES)[keyof typeof DEMO_REQUEST_ERROR_CODES];

export function toEnglishDigits(value: string): string {
  return value.replace(/[۰-۹٠-٩]/g, (char) => {
    const persianIndex = PERSIAN_DIGITS.indexOf(char);
    if (persianIndex > -1) {
      return String(persianIndex);
    }
    const arabicIndex = ARABIC_DIGITS.indexOf(char);
    return arabicIndex > -1 ? String(arabicIndex) : char;
  });
}

export function toPersianDigits(value: string): string {
  return value.replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

export function localizeDigits(value: string, locale: string): string {
  return locale === 'fa' ? toPersianDigits(value) : value;
}

export function sanitizePhoneInput(value: string): string {
  const english = toEnglishDigits(value);
  const hasCountryCode = english.trimStart().startsWith('+');
  const digits = english
    .replace(/\D/g, '')
    .slice(
      0,
      hasCountryCode
        ? DEMO_REQUEST.PHONE_MAX_DIGITS_WITH_COUNTRY_CODE
        : DEMO_REQUEST.PHONE_MAX_DIGITS,
    );
  return hasCountryCode ? `+${digits}` : digits;
}

export function sanitizeInstagramInput(value: string): string {
  return toEnglishDigits(value)
    .trim()
    .replace(INSTAGRAM_URL_PREFIX, '')
    .replace(/^@+/, '')
    .split(/[/?#\s]/)[0]
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, '')
    .slice(0, DEMO_REQUEST.INSTAGRAM_HANDLE_MAX_LENGTH);
}

export function sanitizeVerificationCodeInput(value: string): string {
  return toEnglishDigits(value)
    .replace(/\D/g, '')
    .slice(0, DEMO_REQUEST.VERIFICATION_CODE_LENGTH);
}

export function normalizeIranMobile(value: string): string | null {
  const compact = toEnglishDigits(value).replace(/[\s\-().]/g, '');
  const candidate = compact
    .replace(/^\+98/, '0')
    .replace(/^0098/, '0')
    .replace(/^98(?=9\d{9}$)/, '0')
    .replace(/^(?=9\d{9}$)/, '0');
  return /^09\d{9}$/.test(candidate) ? candidate : null;
}

export function groupIranMobile(value: string): string {
  const match = /^(09\d{2})(\d{3})(\d{4})$/.exec(value);
  return match ? `${match[1]} ${match[2]} ${match[3]}` : value;
}

export function normalizeInstagramHandle(value: string): string | null {
  const withoutUrl = toEnglishDigits(value).trim().replace(INSTAGRAM_URL_PREFIX, '');
  const handle = withoutUrl
    .replace(/^@+/, '')
    .split(/[/?#]/)[0]
    .toLowerCase();

  if (!INSTAGRAM_HANDLE_PATTERN.test(handle)) {
    return null;
  }
  if (handle.startsWith('.') || handle.endsWith('.') || handle.includes('..')) {
    return null;
  }
  return handle;
}

export function normalizeVerificationCode(value: string): string | null {
  const digits = sanitizeVerificationCodeInput(value);
  return digits.length === DEMO_REQUEST.VERIFICATION_CODE_LENGTH ? digits : null;
}
