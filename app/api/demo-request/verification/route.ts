import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/api-config';
import {
  DEMO_REQUEST,
  DEMO_REQUEST_ERROR_CODES,
  normalizeIranMobile,
} from '@/lib/demo-form';
import { isLikelyBot } from '@/lib/demo-request-guard';
import { buildForwardedClientHeaders } from '@/lib/proxy-headers';

type VerificationPayload = {
  expiresInSeconds: number;
  resendAfterSeconds: number;
};

const FALLBACK_PAYLOAD: VerificationPayload = {
  expiresInSeconds: DEMO_REQUEST.FALLBACK_EXPIRES_IN_SECONDS,
  resendAfterSeconds: DEMO_REQUEST.FALLBACK_RESEND_AFTER_SECONDS,
};

function readPayload(upstreamBody: unknown): VerificationPayload {
  const data = (upstreamBody as { data?: Record<string, unknown> } | null)?.data;
  const expiresInSeconds = Number(data?.expiresInSeconds);
  const resendAfterSeconds = Number(data?.resendAfterSeconds);

  return {
    expiresInSeconds: Number.isFinite(expiresInSeconds)
      ? expiresInSeconds
      : FALLBACK_PAYLOAD.expiresInSeconds,
    resendAfterSeconds: Number.isFinite(resendAfterSeconds)
      ? resendAfterSeconds
      : FALLBACK_PAYLOAD.resendAfterSeconds,
  };
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
    honeypot?: unknown;
    elapsedMs?: unknown;
  };
  const phoneNumber = normalizeIranMobile(String(body.phoneNumber ?? ''));

  if (!phoneNumber) {
    return NextResponse.json(
      { ok: false, code: DEMO_REQUEST_ERROR_CODES.INVALID_PHONE },
      { status: 422 },
    );
  }

  if (isLikelyBot({ honeypot: body.honeypot, elapsedMs: body.elapsedMs })) {
    return NextResponse.json({ ok: true, ...FALLBACK_PAYLOAD });
  }

  try {
    const upstream = await fetch(`${API_BASE_URL}/demo-requests/verification`, {
      method: 'POST',
      headers: buildForwardedClientHeaders(request),
      body: JSON.stringify({ phoneNumber }),
      cache: 'no-store',
      signal: AbortSignal.timeout(DEMO_REQUEST.UPSTREAM_TIMEOUT_MS),
    });

    if (upstream.status === 429) {
      return NextResponse.json(
        { ok: false, code: DEMO_REQUEST_ERROR_CODES.TOO_MANY_REQUESTS },
        { status: 429 },
      );
    }

    if (!upstream.ok) {
      console.error('[demo-request] Verification rejected upstream', {
        status: upstream.status,
      });
      return NextResponse.json(
        { ok: false, code: DEMO_REQUEST_ERROR_CODES.SEND_FAILED },
        { status: 502 },
      );
    }

    const upstreamBody: unknown = await upstream.json().catch(() => null);
    return NextResponse.json({ ok: true, ...readPayload(upstreamBody) });
  } catch (error) {
    console.error('[demo-request] Verification request failed', {
      message: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { ok: false, code: DEMO_REQUEST_ERROR_CODES.SEND_FAILED },
      { status: 502 },
    );
  }
}
