import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "ProMall — Instagram store builder with an AI DM sales agent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background:
            "linear-gradient(135deg, #0c0f17 0%, #1c2233 55%, #0c0f17 100%)",
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
              background: "#e7b850",
            }}
          />
          <div style={{ fontSize: "40px", fontWeight: 800, letterSpacing: -1 }}>
            ProMall
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: "950px",
            }}
          >
            An AI that answers your Instagram DMs and closes the sale.
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#aab2c2",
              maxWidth: "900px",
              lineHeight: 1.35,
            }}
          >
            Build your online store, sell by hand with one clean payment link —
            or let the AI sell at scale. Even at midnight.
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
            {["AI DM agent", "Payments", "Auto-print", "Storefront"].map(
              (chip) => (
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
              ),
            )}
          </div>
          <div style={{ fontSize: "30px", fontWeight: 700, color: "#e7b850" }}>
            promall.io
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
