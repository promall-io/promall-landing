import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/api-config';
import {
  DEMO_REQUEST,
  DEMO_REQUEST_ERROR_CODES,
  normalizeInstagramHandle,
  normalizeIranMobile,
  normalizeVerificationCode,
  type DemoRequestErrorCode,
} from '@/lib/demo-form';
import { isLikelyBot } from '@/lib/demo-request-guard';
import { buildForwardedClientHeaders } from '@/lib/proxy-headers';

const UPSTREAM_ERROR_CODES: Record<string, DemoRequestErrorCode> = {
  DEMO_REQUEST_VERIFICATION_CODE_INVALID: DEMO_REQUEST_ERROR_CODES.CODE_INVALID,
  DEMO_REQUEST_VERIFICATION_NOT_FOUND: DEMO_REQUEST_ERROR_CODES.CODE_EXPIRED,
};

async function readUpstreamErrorCode(
  upstream: Response,
): Promise<DemoRequestErrorCode> {
  const body: unknown = await upstream.json().catch(() => null);
  const message = (body as { data?: { message?: unknown } } | null)?.data?.message;
  if (typeof message === 'string' && UPSTREAM_ERROR_CODES[message]) {
    return UPSTREAM_ERROR_CODES[message];
  }
  return DEMO_REQUEST_ERROR_CODES.SUBMIT_FAILED;
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: DEMO_REQUEST_ERROR_CODES.BAD_REQUEST },
      { status: 400 },
    );
  }

  const body = payload as {
    phoneNumber?: unknown;
    instagramHandle?: unknown;
    verificationCode?: unknown;
    locale?: unknown;
    honeypot?: unknown;
    elapsedMs?: unknown;
  };
  const phoneNumber = normalizeIranMobile(String(body.phoneNumber ?? ''));
  const instagramHandle = normalizeInstagramHandle(String(body.instagramHandle ?? ''));
  const verificationCode = normalizeVerificationCode(String(body.verificationCode ?? ''));

  if (!phoneNumber || !instagramHandle || !verificationCode) {
    return NextResponse.json(
      { ok: false, code: DEMO_REQUEST_ERROR_CODES.INVALID_SUBMISSION },
      { status: 422 },
    );
  }

  if (isLikelyBot({ honeypot: body.honeypot, elapsedMs: body.elapsedMs })) {
    return NextResponse.json(
      { ok: false, code: DEMO_REQUEST_ERROR_CODES.CODE_INVALID },
      { status: 400 },
    );
  }

  const source = body.locale === 'en' ? 'landing-en' : 'landing';

  try {
    const upstream = await fetch(`${API_BASE_URL}/demo-requests`, {
      method: 'POST',
      headers: buildForwardedClientHeaders(request),
      body: JSON.stringify({ phoneNumber, instagramHandle, verificationCode, source }),
      cache: 'no-store',
      signal: AbortSignal.timeout(DEMO_REQUEST.UPSTREAM_TIMEOUT_MS),
    });

    if (upstream.status === 429) {
      return NextResponse.json(
        { ok: false, code: DEMO_REQUEST_ERROR_CODES.TOO_MANY_REQUESTS },
        { status: 429 },
      );
    }

    if (upstream.status === 400) {
      return NextResponse.json(
        { ok: false, code: await readUpstreamErrorCode(upstream) },
        { status: 400 },
      );
    }

    if (!upstream.ok) {
      console.error('[demo-request] Upstream rejected the submission', {
        status: upstream.status,
      });
      return NextResponse.json(
        { ok: false, code: DEMO_REQUEST_ERROR_CODES.SUBMIT_FAILED },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[demo-request] Upstream submission failed', {
      message: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { ok: false, code: DEMO_REQUEST_ERROR_CODES.SUBMIT_FAILED },
      { status: 502 },
    );
  }
}
