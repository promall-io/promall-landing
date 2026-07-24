import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api-config";

const PROXY_SECRET = process.env.WEB_ANALYTICS_PROXY_SECRET;
const UPSTREAM_TIMEOUT_MS = 3_000;

const LIMITS = {
  path: 512,
  referrer: 1024,
  utm: 100,
  locale: 10,
} as const;

function asTrimmedString(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : undefined;
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  const body = payload as Record<string, unknown>;
  const path = asTrimmedString(body.path, LIMITS.path);
  if (!path || !path.startsWith("/")) {
    return new NextResponse(null, { status: 204 });
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (PROXY_SECRET) {
    headers["x-analytics-secret"] = PROXY_SECRET;
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor?.split(",")[0]?.trim();
    if (clientIp) headers["x-analytics-ip"] = clientIp;
    const userAgent = request.headers.get("user-agent");
    if (userAgent) headers["x-analytics-ua"] = userAgent;
    const country = request.headers.get("x-vercel-ip-country");
    if (country) headers["x-analytics-country"] = country;
  }

  try {
    await fetch(`${API_BASE_URL}/web-analytics/events`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        site: "landing",
        path,
        referrer: asTrimmedString(body.referrer, LIMITS.referrer),
        locale: asTrimmedString(body.locale, LIMITS.locale),
        utmSource: asTrimmedString(body.utmSource, LIMITS.utm),
        utmMedium: asTrimmedString(body.utmMedium, LIMITS.utm),
        utmCampaign: asTrimmedString(body.utmCampaign, LIMITS.utm),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (error) {
    console.error("[track] Upstream analytics forward failed", {
      message: error instanceof Error ? error.message : String(error),
    });
  }

  return new NextResponse(null, { status: 204 });
}
