import { NextResponse } from "next/server";
import { normalizeInstagramHandle, normalizeIranMobile } from "@/lib/demo-form";
import { API_BASE_URL } from "@/lib/api-config";

const UPSTREAM_TIMEOUT_MS = 8_000;

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const body = payload as {
    phoneNumber?: unknown;
    instagramHandle?: unknown;
    locale?: unknown;
  };
  const phoneNumber = normalizeIranMobile(String(body.phoneNumber ?? ""));
  const instagramHandle = normalizeInstagramHandle(String(body.instagramHandle ?? ""));

  if (!phoneNumber || !instagramHandle) {
    return NextResponse.json({ ok: false }, { status: 422 });
  }

  const source = body.locale === "en" ? "landing-en" : "landing";

  try {
    const upstream = await fetch(`${API_BASE_URL}/demo-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, instagramHandle, source }),
      cache: "no-store",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (!upstream.ok) {
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
