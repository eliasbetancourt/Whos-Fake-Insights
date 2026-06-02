/**
 * NavBar.tsx
 *
 * Global top navigation shown on every page.
 *   • Logo (cracked magnifying glass) + "WhosFake Insights" → /
 *   • Links: Home, Tool, Blog, Tutorial
 *   • CTA button "Check Unfollowers" → /tool
 *   • Hamburger menu under 768px
 *   • transparentOnTop: starts transparent over the homepage hero, turns
 *     solid white (with shadow) once the user scrolls.
 */

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const GRADIENT = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

const NAV_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "Tool", to: "/tool" },
  { label: "Blog", to: "/blog" },
  { label: "Tutorial", to: "/tutorial" },
];

interface NavBarProps {
  /** When true the bar overlays the hero transparently until the user scrolls. */
  transparentOnTop?: boolean;
}

export default function NavBar({ transparentOnTop = false }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!transparentOnTop) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentOnTop]);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const solid = !transparentOnTop || scrolled;
  const textColor = solid ? "#374151" : "rgba(255,255,255,0.95)";

  const linkStyle: React.CSSProperties = {
    color: textColor,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.98rem",
    padding: "6px 4px",
    transition: "color 0.2s",
  };

  const activeLinkStyle: React.CSSProperties = {
    ...linkStyle,
    color: solid ? "#6d64e8" : "#ffffff",
    borderBottom: `2px solid ${solid ? "#6d64e8" : "#ffffff"}`,
  };

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header
      style={{
        position: transparentOnTop ? "fixed" : "sticky",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 1000,
        background: solid ? "#ffffff" : "transparent",
        boxShadow: solid ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
        transition: "background 0.25s, box-shadow 0.25s",
        boxSizing: "border-box",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 32px)",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <img
            src="/favicon.png"
            alt="WhosFake Insights logo"
            width={34}
            height={34}
            style={{ display: "block" }}
          />
          <span
            style={{
              fontWeight: 800,
              fontSize: "1.15rem",
              color: solid ? "#1f2937" : "#ffffff",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
            }}
          >
            WhosFake Insights
          </span>
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                style={isActive(l.to) ? activeLinkStyle : linkStyle}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/tool"
              style={{
                background: GRADIENT,
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "10px 20px",
                borderRadius: 10,
                boxShadow: "0 4px 14px rgba(102,126,234,0.35)",
                whiteSpace: "nowrap",
              }}
            >
              Check Unfollowers
            </Link>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: "transparent",
              border: "none",
              padding: 8,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 5,
              width: 40,
              height: 40,
            }}
          >
            {[0, 1, 2].map((n) => (
              <span
                key={n}
                style={{
                  display: "block",
                  width: 24,
                  height: 2.5,
                  borderRadius: 2,
                  background: solid ? "#374151" : "#ffffff",
                }}
              />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile dropdown panel */}
      {isMobile && menuOpen && (
        <div
          style={{
            background: "#ffffff",
            borderTop: "1px solid #eef0f5",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            padding: "12px 16px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                color: isActive(l.to) ? "#6d64e8" : "#374151",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "1.05rem",
                padding: "12px 6px",
                borderBottom: "1px solid #f3f4f6",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/tool"
            style={{
              marginTop: 10,
              background: GRADIENT,
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "12px 20px",
              borderRadius: 10,
              textAlign: "center",
              boxShadow: "0 4px 14px rgba(102,126,234,0.35)",
            }}
          >
            Check Unfollowers
          </Link>
        </div>
      )}
    </header>
  );
}
