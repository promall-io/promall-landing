import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/api-config';
import {
  DEMO_REQUEST,
  DEMO_REQUEST_ERROR_CODES,
  normalizeInstagramHandle,
  normalizeIranMobile,
} from '@/lib/demo-form';
import { isLikelyBot } from '@/lib/demo-request-guard';
import { buildForwardedClientHeaders } from '@/lib/proxy-headers';

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
    locale?: unknown;
    honeypot?: unknown;
    elapsedMs?: unknown;
  };
  const phoneNumber = normalizeIranMobile(String(body.phoneNumber ?? ''));
  const instagramHandle = normalizeInstagramHandle(String(body.instagramHandle ?? ''));

  if (!phoneNumber || !instagramHandle) {
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
      body: JSON.stringify({ phoneNumber, instagramHandle, source }),
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
