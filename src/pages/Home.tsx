/**
 * Home.tsx — content-rich landing page at "/".
 *
 * Sections (in order): Hero, How It Works, Why WhosFake Insights, Preview,
 * Blog preview, Trust/stats. Styled to match the site's purple/blue gradient.
 */

import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ResultsTable from "../components/ResultsTable";
import Seo from "../components/Seo";
import { blogPosts } from "../data/blogPosts";

const GRADIENT = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

const sectionWrap: React.CSSProperties = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "0 clamp(16px, 4vw, 32px)",
  width: "100%",
  boxSizing: "border-box",
};

const whiteCard: React.CSSProperties = {
  background: "#fff",
  borderRadius: 24,
  boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
  padding: "clamp(28px, 5vw, 56px)",
  boxSizing: "border-box",
};

const sectionTitleOnGradient: React.CSSProperties = {
  color: "#fff",
  fontSize: "clamp(1.7rem, 4vw, 2.3rem)",
  fontWeight: 800,
  textAlign: "center",
  marginBottom: 12,
  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
};

const sectionTitleDark: React.CSSProperties = {
  color: "#1f2937",
  fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
  fontWeight: 800,
  textAlign: "center",
  marginBottom: 8,
};

function ctaPrimary(extra?: React.CSSProperties): React.CSSProperties {
  return {
    display: "inline-block",
    background: "#fff",
    color: "#6d3fb8",
    textDecoration: "none",
    fontWeight: 800,
    fontSize: "1.05rem",
    padding: "16px 32px",
    borderRadius: 12,
    boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
    ...extra,
  };
}

const previewData = {
  summary: { totalFollowers: 69, totalFollowing: 42, unfollowers: 3 },
  unfollowers: [
    { username: "example.user1", profileUrl: "instagram.com/example.user1", timestamp: 1700000000 },
    { username: "example.user2", profileUrl: "instagram.com/example.user2", timestamp: 1710000000 },
    { username: "example.user3", profileUrl: "instagram.com/example.user3", timestamp: 1720000000 },
  ],
};

const HOW_IT_WORKS = [
  {
    n: 1,
    title: "Download your Instagram data",
    text: "Instagram lets you export your followers and following lists directly from settings.",
  },
  {
    n: 2,
    title: "Upload your export",
    text: "Drag and drop your ZIP file or JSON files into WhosFake Insights.",
  },
  {
    n: 3,
    title: "See your unfollowers",
    text: "Instantly see who doesn't follow you back with links to their profiles.",
  },
];

const WHY = [
  { icon: "🔒", title: "100% Private", text: "All processing happens in your browser. Nothing is sent to a server." },
  { icon: "🎯", title: "100% Accurate", text: "Data comes straight from Instagram's own export." },
  { icon: "⚡", title: "Instant Results", text: "Our tool processes your data and produces results instantly." },
  { icon: "✅", title: "No Login Required", text: "We never ask for your Instagram password." },
];

export default function Home() {
  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const previewPosts = blogPosts.slice(0, 3);

  return (
    <>
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        background: GRADIENT,
        minHeight: "100vh",
        width: "100%",
        overflowX: "clip",
        color: "#333",
      }}
    >
      <Seo
        title="WhosFake Insights — Find Out Who Isn't Following You Back on Instagram"
        description="See who isn't following you back on Instagram — free, private, and 100% in your browser. No login, no password, and your data never leaves your device."
        path="/"
      />
      <NavBar transparentOnTop />

      {/* ----------------------------------------------------------------- */}
      {/* Hero */}
      {/* ----------------------------------------------------------------- */}
      <section
        style={{
          ...sectionWrap,
          paddingTop: "clamp(96px, 14vh, 150px)",
          paddingBottom: "clamp(48px, 8vh, 90px)",
          textAlign: "center",
        }}
      >
        <img
          src="/logo.png"
          alt="WhosFake Insights cracked magnifying glass logo"
          width={128}
          height={128}
          style={{
            width: "clamp(96px, 18vw, 132px)",
            height: "auto",
            margin: "0 auto 24px",
            display: "block",
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.25))",
          }}
        />
        <h1
          style={{
            color: "#fff",
            fontSize: "clamp(2rem, 6vw, 3.4rem)",
            fontWeight: 800,
            lineHeight: 1.12,
            margin: "0 auto 18px",
            maxWidth: 820,
            textShadow: "0 2px 16px rgba(0,0,0,0.25)",
          }}
        >
          Find Out Who Isn't Following You Back on Instagram
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.92)",
            fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)",
            maxWidth: 640,
            margin: "0 auto 36px",
            lineHeight: 1.6,
          }}
        >
          Free, private, and 100% safe. Your data never leaves your device.
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link to="/tool" style={ctaPrimary()}>
            Check My Unfollowers →
          </Link>
          <a
            href="#how-it-works"
            onClick={scrollToHowItWorks}
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "1.05rem",
              padding: "16px 32px",
              borderRadius: 12,
              border: "2px solid rgba(255,255,255,0.6)",
            }}
          >
            How It Works
          </a>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* How It Works */}
      {/* ----------------------------------------------------------------- */}
      <section id="how-it-works" style={{ ...sectionWrap, paddingBottom: "clamp(40px, 7vh, 80px)" }}>
        <div style={whiteCard}>
          <h2 style={sectionTitleDark}>How It Works</h2>
          <p style={{ textAlign: "center", color: "#6b7280", fontSize: "1.05rem", marginBottom: 36 }}>
            Three simple steps! No app install. No password.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 28,
            }}
          >
            {HOW_IT_WORKS.map((s) => (
              <div key={s.n} style={{ textAlign: "center", padding: "8px 6px" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    margin: "0 auto 18px",
                    borderRadius: "50%",
                    background: GRADIENT,
                    color: "#fff",
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 18px rgba(102,126,234,0.4)",
                  }}
                >
                  {s.n}
                </div>
                <h3 style={{ color: "#1f2937", fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>
                  {s.title}
                </h3>
                <p style={{ color: "#6b7280", fontSize: "1rem", lineHeight: 1.6, margin: 0 }}>
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Why WhosFake Insights */}
      {/* ----------------------------------------------------------------- */}
      <section style={{ ...sectionWrap, paddingBottom: "clamp(40px, 7vh, 80px)" }}>
        <h2 style={sectionTitleOnGradient}>Why WhosFake Insights</h2>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.88)", fontSize: "1.05rem", marginBottom: 32 }}>
          Built privacy-first, from the ground up.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 22,
          }}
        >
          {WHY.map((w) => (
            <div
              key={w.title}
              style={{
                background: "#fff",
                borderRadius: 18,
                padding: "26px 22px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2.4rem", marginBottom: 12 }}>{w.icon}</div>
              <h3 style={{ color: "#1f2937", fontSize: "1.15rem", fontWeight: 700, marginBottom: 8 }}>
                {w.title}
              </h3>
              <p style={{ color: "#6b7280", fontSize: "0.98rem", lineHeight: 1.55, margin: 0 }}>
                {w.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Trust / stats */}
      {/* ----------------------------------------------------------------- */}
      <section style={{ ...sectionWrap, paddingBottom: "clamp(20px, 4vh, 50px)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 18,
            textAlign: "center",
          }}
        >
          {[
            { big: "30+", small: "Countries with Instagram users using WhosFake Insights" },
            { big: "100%", small: "Free! No account required" },
            { big: "0", small: "Bytes of your data ever leave your device" },
          ].map((t) => (
            <div
              key={t.small}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 16,
                padding: "26px 20px",
              }}
            >
              <div style={{ color: "#fff", fontSize: "2.4rem", fontWeight: 800, marginBottom: 6 }}>
                {t.big}
              </div>
              <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.98rem", lineHeight: 1.5 }}>
                {t.small}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Preview */}
      {/* ----------------------------------------------------------------- */}
      <section style={{ ...sectionWrap, paddingBottom: "clamp(40px, 7vh, 80px)" }}>
        <div style={whiteCard}>
          <h2 style={sectionTitleDark}>See It In Action</h2>
          <p
            style={{
              textAlign: "center",
              color: "#6b7280",
              fontSize: "1.05rem",
              maxWidth: 640,
              margin: "0 auto 8px",
              lineHeight: 1.6,
            }}
          >
            See exactly who isn't following you back, with links to their profiles and the date you
            started following them.
          </p>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <span
              style={{
                display: "inline-block",
                background: "#e0e7ff",
                color: "#4338ca",
                borderRadius: 8,
                padding: "4px 14px",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              PREVIEW — Upload your file to see real results
            </span>
          </div>
          <div style={{ pointerEvents: "none", userSelect: "none" }}>
            <ResultsTable results={previewData} />
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Link to="/tool" style={ctaPrimary({ background: GRADIENT, color: "#fff" })}>
              Try It Free →
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Blog preview */}
      {/* ----------------------------------------------------------------- */}
      <section style={{ ...sectionWrap, paddingBottom: "clamp(40px, 7vh, 80px)" }}>
        <h2 style={sectionTitleOnGradient}>Instagram Growth Tips</h2>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.88)", fontSize: "1.05rem", marginBottom: 32 }}>
          Guides to grow a real audience and keep the followers you have.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {previewPosts.map((post) => (
            <article
              key={post.slug}
              style={{
                background: "#fff",
                borderRadius: 18,
                padding: "26px 24px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ color: "#8b5cf6", fontSize: "0.82rem", fontWeight: 700, marginBottom: 10 }}>
                {post.readTime}
              </div>
              <h3 style={{ color: "#1f2937", fontSize: "1.18rem", fontWeight: 700, lineHeight: 1.35, marginBottom: 12 }}>
                {post.title}
              </h3>
              <p style={{ color: "#6b7280", fontSize: "0.97rem", lineHeight: 1.6, marginBottom: 18, flexGrow: 1 }}>
                {post.excerpt}
              </p>
              <Link
                to={`/blog/${post.slug}`}
                style={{ color: "#6d64e8", fontWeight: 700, textDecoration: "none", fontSize: "0.98rem" }}
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link
            to="/blog"
            style={{
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "1.02rem",
              borderBottom: "2px solid rgba(255,255,255,0.7)",
              paddingBottom: 2,
            }}
          >
            View all articles →
          </Link>
        </div>
      </section>

    </div>
    <Footer />
    </>
  );
}
