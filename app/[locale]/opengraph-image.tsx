import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ProMall — پرومال";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: { locale: string };
};

const EN = {
  brand: "ProMall",
  title: "An AI that answers your Instagram DMs and closes the sale.",
  subtitle:
    "Build your online store, sell by hand with one clean payment link — or let the AI sell at scale with your real prices and stock.",
  chips: ["AI DM agent", "Payments", "Auto-print", "Storefront"],
};

export default async function OpengraphImage({ params }: Props) {
  if (params.locale !== "en") {
    const card = await fetch(
      new URL("./og-card-fa.png", import.meta.url),
    ).then((res) => res.arrayBuffer());
    return new Response(card, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, immutable, no-transform, max-age=31536000",
      },
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#11192a",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              width: "20px",
              height: "20px",
              borderRadius: "9999px",
              background: "#d9d0b8",
            }}
          />
          <div style={{ fontSize: "40px", fontWeight: 800 }}>{EN.brand}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.15,
              maxWidth: "980px",
            }}
          >
            {EN.title}
          </div>
          <div
            style={{
              fontSize: "30px",
              color: "#aab2c2",
              maxWidth: "920px",
              lineHeight: 1.6,
            }}
          >
            {EN.subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            {EN.chips.map((chip) => (
              <div
                key={chip}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  borderRadius: "9999px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  fontSize: "24px",
                  color: "#dfe3ea",
                }}
              >
                {chip}
              </div>
            ))}
          </div>
          <div style={{ fontSize: "30px", fontWeight: 700, color: "#d9d0b8" }}>
            promall.io
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
