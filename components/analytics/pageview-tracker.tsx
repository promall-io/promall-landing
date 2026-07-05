"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const TRACK_ENDPOINT = "/api/track";

type Props = {
  locale: string;
};

export function PageviewTracker({ locale }: Props) {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!pathname || lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    const params = new URLSearchParams(window.location.search);
    const payload = JSON.stringify({
      path: pathname,
      referrer: document.referrer || undefined,
      locale,
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
    });

    const beaconSent =
      typeof navigator.sendBeacon === "function" &&
      navigator.sendBeacon(TRACK_ENDPOINT, new Blob([payload], { type: "application/json" }));

    if (!beaconSent) {
      void fetch(TRACK_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => undefined);
    }
  }, [pathname, locale]);

  return null;
}
