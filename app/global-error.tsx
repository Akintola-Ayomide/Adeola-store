"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-NG">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f4f0e6",
          color: "#17130e",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ maxWidth: "32rem", padding: "2rem" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#a44730",
            }}
          >
            ÀRÌKÉ
          </p>
          <h1 style={{ fontSize: "2rem", fontWeight: 400, margin: "1rem 0" }}>
            The boutique is taking a moment.
          </h1>
          <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#625a4e" }}>
            Something unexpected interrupted the page. Please reload and try
            again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              padding: "0.9rem 1.5rem",
              border: "1px solid #17130e",
              background: "#17130e",
              color: "#fbf8f1",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
