import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Footer — dark charcoal background, 3-column grid on desktop, stacked on
 * mobile. Uses react-router <Link> for client-side navigation so it must
 * render inside <BrowserRouter>.
 */

const BRAND_BLUE = "#29b6f6";
const MUTED = "#9ca3af";
const COL_HEADER_STYLE: React.CSSProperties = {
  color: MUTED,
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  marginBottom: 16,
};

/** Internal nav link with hover colour. */
function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={to}
      style={{
        display: "block",
        color: hover ? BRAND_BLUE : "#e5e7eb",
        textDecoration: "none",
        fontSize: "0.95rem",
        marginBottom: 10,
        transition: "color 0.18s",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </Link>
  );
}

/** External anchor with hover colour. */
function ExtLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        color: hover ? BRAND_BLUE : "#e5e7eb",
        textDecoration: "none",
        fontSize: "0.95rem",
        transition: "color 0.18s",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "#111827",
        /* Break out of any centered max-width container so the background
           stretches edge-to-edge. calc(50% - 50vw) shifts left by exactly
           the amount the parent is inset from the viewport left edge. */
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        color: "#e5e7eb",
      }}
    >
      {/* Main grid */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "64px 24px 48px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "48px 32px",
          alignItems: "start",
        }}
      >
        {/* Column 1 — Brand */}
        <div>
          <div
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}
          >
            <img
              src="/favicon.png"
              alt="WhosFake Insights logo"
              width={30}
              height={30}
              loading="lazy"
              decoding="async"
              style={{ display: "block" }}
            />
            <span style={{ fontWeight: 800, fontSize: "1.05rem", color: "#fff" }}>
              WhosFake Insights
            </span>
          </div>
          <p
            style={{
              color: MUTED,
              fontSize: "0.9rem",
              lineHeight: 1.65,
              margin: "0 0 16px",
              maxWidth: 260,
            }}
          >
            The free, private way to see who isn't following you back on
            Instagram. All in your browser.
          </p>
          <ExtLink href="https://instagram.com/whosfakeinsights">
            @whosfakeinsights
          </ExtLink>
          <div style={{ marginTop: 12 }}>
            <ExtLink href="https://buymeacoffee.com/whosfakeinsights">
              ☕ Support this project
            </ExtLink>
          </div>
        </div>

        {/* Column 2 — Navigate */}
        <div>
          <p style={COL_HEADER_STYLE}>Navigate</p>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/tool">Tool</NavLink>
          <NavLink to="/tutorial">Tutorial</NavLink>
          <NavLink to="/blog">Blog</NavLink>
        </div>

        {/* Column 3 — Legal */}
        <div>
          <p style={COL_HEADER_STYLE}>Legal</p>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/privacy">Privacy Policy</NavLink>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid #1f2937",
          padding: "20px 24px",
          textAlign: "center",
          fontSize: "0.8rem",
          color: MUTED,
        }}
      >
        © 2026 WhosFake Insights. Not affiliated with Instagram or Meta.
      </div>
    </footer>
  );
}
