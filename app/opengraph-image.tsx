import { ImageResponse } from "next/og";

export const alt = "ÀRÌKÉ — Nigerian occasion wear, made in Lagos";
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
          backgroundColor: "#17130e",
          color: "#f4f0e6",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: 12,
              textTransform: "uppercase",
            }}
          >
            ÀRÌKÉ
          </div>
          <div
            style={{
              fontSize: 15,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#c9bda9",
            }}
          >
            Lagos · Nigeria
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 92,
              height: 4,
              backgroundColor: "#a44730",
              marginBottom: 34,
            }}
          />
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.04,
              letterSpacing: -2,
              maxWidth: 920,
            }}
          >
            Nigerian occasion wear,
            <br />
            made to be worn.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 24,
              lineHeight: 1.5,
              color: "#c9bda9",
              maxWidth: 760,
            }}
          >
            Aso-ebi, lace, aso-oke, ankara and iro &amp; buba. Order personally
            on WhatsApp.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 16,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#8f8576",
          }}
        >
          Made in Lagos
        </div>
      </div>
    ),
    size,
  );
}
