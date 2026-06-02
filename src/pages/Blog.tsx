/**
 * Blog.tsx — blog index at "/blog".
 *
 * A responsive grid of cards, one per article: title, short excerpt, estimated
 * read time, and a "Read Article →" link to /blog/:slug.
 */

import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { blogPosts } from "../data/blogPosts";

const GRADIENT = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

export default function Blog() {
  return (
    <>
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        background: GRADIENT,
        minHeight: "100vh",
        width: "100%",
        overflowX: "clip",
      }}
    >
      <Seo
        title="Instagram Growth Tips & Guides — WhosFake Insights Blog"
        description="Guides and tips on Instagram followers, unfollowers, and building a real, engaged audience — from the team behind WhosFake Insights."
        path="/blog"
      />
      <NavBar />

      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "clamp(40px, 7vh, 72px) clamp(16px, 4vw, 32px) clamp(40px, 7vh, 80px)",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <header style={{ textAlign: "center", marginBottom: 40 }}>
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(1.9rem, 5vw, 2.8rem)",
              fontWeight: 800,
              marginBottom: 12,
              textShadow: "0 2px 12px rgba(0,0,0,0.2)",
            }}
          >
            Instagram Growth Blog
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "clamp(1.02rem, 2.5vw, 1.2rem)",
              maxWidth: 620,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Practical, privacy-first guides on unfollowers, growth, and getting the most out of your
            Instagram data.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 26,
          }}
        >
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              style={{
                background: "#fff",
                borderRadius: 18,
                padding: "28px 26px",
                boxShadow: "0 12px 34px rgba(0,0,0,0.14)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  color: "#8b5cf6",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  letterSpacing: 0.3,
                  marginBottom: 12,
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <span>{post.readTime}</span>
                <span style={{ color: "#d1d5db" }}>•</span>
                <span style={{ color: "#9ca3af", fontWeight: 600 }}>{post.publishDate}</span>
              </div>
              <h2
                style={{
                  color: "#1f2937",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  lineHeight: 1.35,
                  marginBottom: 12,
                }}
              >
                {post.title}
              </h2>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  marginBottom: 20,
                  flexGrow: 1,
                }}
              >
                {post.excerpt}
              </p>
              <Link
                to={`/blog/${post.slug}`}
                style={{
                  color: "#6d64e8",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "1rem",
                }}
              >
                Read Article →
              </Link>
            </article>
          ))}
        </div>
      </section>

    </div>
    <Footer />
    </>
  );
}
