import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Coming Soon — Medha Procure",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: "100vh",
            background: "#fff",
            color: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          <header
            style={{
              padding: "20px 48px",
              borderBottom: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                color: "inherit",
                width: "fit-content",
              }}
            >
              <div
                style={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "6px",
                  background: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                M
              </div>
              <span style={{ fontSize: "20px", fontWeight: 500 }}>
                Medha <span style={{ color: "#e94e3c" }}>Procure</span>
              </span>
            </Link>
          </header>

          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 24px",
            }}
          >
            <div style={{ maxWidth: "448px", textAlign: "center" }}>
              <p
                style={{
                  color: "#e94e3c",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Coming soon
              </p>
              <h1
                style={{
                  fontSize: "36px",
                  fontWeight: 500,
                  marginBottom: "16px",
                  letterSpacing: "-0.02em",
                }}
              >
                This page is on its way.
              </h1>
              <p
                style={{
                  color: "rgba(0,0,0,0.55)",
                  lineHeight: 1.6,
                  marginBottom: "32px",
                }}
              >
                This section will be available once the requirements are
                confirmed. Check back soon.
              </p>
              <Link
                href="/"
                style={{
                  display: "inline-block",
                  padding: "10px 24px",
                  borderRadius: "999px",
                  background: "#000",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Back to home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
