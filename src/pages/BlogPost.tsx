/**
 * BlogPost.tsx — individual article at "/blog/:slug".
 *
 * Renders the post's Markdown content cleanly (720px column for readability)
 * with a "← Back to Blog" link at the top and a conversion CTA at the bottom.
 * Unknown slugs fall back to a friendly "not found" panel.
 */

import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Markdown from "../components/Markdown";
import Seo from "../components/Seo";
import { getPostBySlug } from "../data/blogPosts";

const GRADIENT = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
const SITE_ORIGIN = "https://whosfakeinsights.com";

/** Convert a human date like "May 21, 2026" to ISO "2026-05-21" for schema. */
function toIsoDate(human: string): string {
  const d = new Date(human);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const pageWrap: React.CSSProperties = {
  fontFamily: "system-ui, sans-serif",
  background: GRADIENT,
  minHeight: "100vh",
  width: "100%",
  overflowX: "clip",
};

const backLinkStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.95)",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "1rem",
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    // Scroll to top when navigating between posts. (Per-page <title> /
    // description / canonical are set declaratively via <Seo> below.)
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return (
      <>
      <div style={pageWrap}>
        <Seo
          title="Article not found — WhosFake Insights"
          description="Sorry, we couldn't find that article. Browse the WhosFake Insights blog for Instagram tips and guides."
          path="/blog"
        />
        <NavBar />
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "clamp(112px, 15vh, 140px) clamp(16px, 4vw, 32px) clamp(160px, 16vh, 192px)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "clamp(28px, 5vw, 48px)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.16)",
            }}
          >
            <h1 style={{ fontSize: "1.8rem", color: "#1f2937", marginBottom: 12 }}>
              Article not found
            </h1>
            <p style={{ color: "#6b7280", marginBottom: 24 }}>
              We couldn't find the article you were looking for.
            </p>
            <Link
              to="/blog"
              style={{
                display: "inline-block",
                background: GRADIENT,
                color: "#fff",
                textDecoration: "none",
                fontWeight: 700,
                padding: "12px 26px",
                borderRadius: 10,
              }}
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      </>
    );
  }

  const canonicalPath = `/blog/${post.slug}`;
  const isoDate = toIsoDate(post.publishDate);
  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: isoDate,
    dateModified: isoDate,
    author: {
      "@type": "Organization",
      name: "WhosFake Insights",
      url: SITE_ORIGIN,
    },
    publisher: {
      "@type": "Organization",
      name: "WhosFake Insights",
      logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}/logo.png` },
    },
    image: `${SITE_ORIGIN}/logo.png`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_ORIGIN}${canonicalPath}`,
    },
  };

  return (
    <>
    <div style={pageWrap}>
      <Seo
        title={`${post.title} — WhosFake Insights`}
        description={post.excerpt}
        path={canonicalPath}
        jsonLd={articleSchema}
      />
      <NavBar />

      <article
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "clamp(112px, 15vh, 140px) clamp(16px, 4vw, 28px) clamp(160px, 16vh, 192px)",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ marginBottom: 18 }}>
          <Link to="/blog" style={backLinkStyle}>
            ← Back to Blog
          </Link>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: 22,
            boxShadow: "0 18px 56px rgba(0,0,0,0.16)",
            padding: "clamp(28px, 5vw, 56px)",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
              fontWeight: 800,
              color: "#111827",
              lineHeight: 1.18,
              marginBottom: 14,
            }}
          >
            {post.title}
          </h1>
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              color: "#8b5cf6",
              fontSize: "0.9rem",
              fontWeight: 600,
              marginBottom: 28,
              paddingBottom: 22,
              borderBottom: "1px solid #eef0f5",
              flexWrap: "wrap",
            }}
          >
            <span>{post.publishDate}</span>
            <span style={{ color: "#d1d5db" }}>•</span>
            <span>{post.readTime}</span>
          </div>

          <Markdown content={post.content} />

          {/* Bottom CTA */}
          <div
            style={{
              marginTop: 36,
              padding: "28px 24px",
              borderRadius: 16,
              background: "linear-gradient(135deg, #f5f3ff 0%, #eef2ff 100%)",
              border: "1px solid #e0e7ff",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#1f2937", fontSize: "1.1rem", fontWeight: 700, marginBottom: 16 }}>
              Ready to check your unfollowers?
            </p>
            <Link
              to="/tool"
              style={{
                display: "inline-block",
                background: GRADIENT,
                color: "#fff",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "1.05rem",
                padding: "14px 30px",
                borderRadius: 12,
                boxShadow: "0 8px 22px rgba(102,126,234,0.4)",
              }}
            >
              Try WhosFake Insights free →
            </Link>
          </div>
        </div>
      </article>

    </div>
    <Footer />
    </>
  );
}
