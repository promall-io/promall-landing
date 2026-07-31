const PROXY_SECRET = process.env.WEB_ANALYTICS_PROXY_SECRET;

export const PROXY_HEADERS = {
  SECRET: 'x-analytics-secret',
  CLIENT_IP: 'x-analytics-ip',
  CLIENT_UA: 'x-analytics-ua',
  CLIENT_COUNTRY: 'x-analytics-country',
} as const;

export function buildForwardedClientHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (!PROXY_SECRET) {
    return headers;
  }

  headers[PROXY_HEADERS.SECRET] = PROXY_SECRET;

  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (clientIp) {
    headers[PROXY_HEADERS.CLIENT_IP] = clientIp;
  }

  const userAgent = request.headers.get('user-agent');
  if (userAgent) {
    headers[PROXY_HEADERS.CLIENT_UA] = userAgent;
  }

  const country = request.headers.get('x-vercel-ip-country');
  if (country) {
    headers[PROXY_HEADERS.CLIENT_COUNTRY] = country;
  }

  return headers;
}
