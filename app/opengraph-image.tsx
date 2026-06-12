import { ImageResponse } from "next/og";

// Generates a raster PNG share card (social crawlers reject SVG previews).
// Drawn from the same artwork as public/og.svg, using next/og's bundled font.
export const alt =
  "Harb Trucking — B2B dry-van freight across 48 states. USDOT #3822610.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#10131c",
          padding: "76px 96px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 30, height: 30, borderRadius: 6, background: "#ef8a3c" }} />
          <div
            style={{
              color: "#9aa0ad",
              fontSize: 26,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Licensed dry-van carrier
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.04,
            }}
          >
            Harb Trucking
          </div>
          <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 34 }}>
            B2B freight across 48 states
          </div>
        </div>

        <div style={{ display: "flex", gap: 30, fontSize: 24 }}>
          <div style={{ color: "#ef8a3c" }}>USDOT #3822610</div>
          <div style={{ color: "rgba(255,255,255,0.5)" }}>MC #1383751</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
