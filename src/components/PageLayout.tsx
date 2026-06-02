import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

/**
 * PageLayout — shared chrome for the static content pages (About, Contact,
 * Privacy). Reproduces the homepage theme: full-screen purple gradient,
 * centered column, a white rounded content card, a "Back to Home" link, and
 * the shared Footer. Keeping this in one place guarantees the three pages stay
 * visually consistent with each other and with WhosFakeApp.
 */
interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    /* Neutral white shell — no gradient here. The gradient is scoped only to
       the content band above the footer so the dark footer background sits
       flush against white with no coloured bleed above or below it. */
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        background: "#ffffff",
        color: "#333",
        width: "100%",
        minWidth: 0,
      }}
    >
      {/* Gradient content band — back-link + white card only. */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          padding: "4vw 0 6vw",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "0 2vw",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div style={{ marginBottom: "2vw", paddingTop: "1vw" }}>
            <Link
              to="/"
              style={{
                color: "rgba(255,255,255,0.95)",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              ← Back to Home
            </Link>
          </div>
          <div
            style={{
              background: "white",
              borderRadius: 24,
              boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
              padding: "clamp(24px, 4vw, 48px)",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h1
              style={{
                fontSize: "2rem",
                color: "#333",
                marginBottom: "1.5rem",
                fontWeight: 700,
              }}
            >
              {title}
            </h1>
            {children}
          </div>
        </div>
      </div>
      {/* Footer is outside the gradient band — its dark background sits
          flush against the white shell with no coloured gap. */}
      <Footer />
    </div>
  );
}

/** Shared paragraph style for page body copy. */
export const paragraphStyle: React.CSSProperties = {
  color: "#444",
  fontSize: "1.05rem",
  lineHeight: 1.75,
  marginBottom: "1.1rem",
};

/** Shared sub-heading style for page sections. */
export const sectionHeadingStyle: React.CSSProperties = {
  color: "#333",
  fontSize: "1.2rem",
  fontWeight: 600,
  marginTop: "1.8rem",
  marginBottom: "0.6rem",
};

/** Shared style for inline links within page copy. */
export const inlineLinkStyle: React.CSSProperties = {
  color: "#6d64e8",
  fontWeight: 600,
  textDecoration: "none",
};
