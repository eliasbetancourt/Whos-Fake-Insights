/**
 * Markdown.tsx
 *
 * A tiny, dependency-free Markdown renderer that returns React nodes — NOT
 * dangerouslySetInnerHTML. Blog content is trusted (it ships in the bundle),
 * but rendering to real React elements keeps us consistent with the app's
 * "no innerHTML" security posture and lets internal links use react-router.
 *
 * Supported syntax (all the blog content needs):
 *   #  / ## / ###      headings
 *   ---                horizontal rule
 *   1. 2. 3.           ordered lists
 *   - / *              unordered lists
 *   **bold**           inline bold
 *   [text](url)        inline links
 *   blank line         paragraph break
 */

import React from "react";
import { Link } from "react-router-dom";

const SITE_ORIGIN = "https://whosfakeinsights.com";

/** Parse inline **bold** and [text](url) spans into React nodes. */
function renderInline(text: string, keyBase: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let n = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const key = `${keyBase}-i${n++}`;
    if (match[1] !== undefined) {
      // **bold**
      nodes.push(<strong key={key}>{match[1]}</strong>);
    } else {
      // [label](href)
      const label = match[2];
      const href = match[3].trim();
      nodes.push(renderLink(label, href, key));
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

const linkStyle: React.CSSProperties = {
  color: "#6d64e8",
  fontWeight: 600,
  textDecoration: "underline",
  textUnderlineOffset: 2,
};

/** Internal whosfakeinsights.com links use react-router; everything else is a safe external anchor. */
function renderLink(label: string, href: string, key: string): React.ReactNode {
  // Treat as first-party ONLY when href is exactly the origin or the origin
  // followed by a path/query/hash boundary. This stops look-alike hosts such as
  // "https://whosfakeinsights.com.evil.com" from being routed through react-router.
  const isInternal =
    href === SITE_ORIGIN ||
    href.startsWith(`${SITE_ORIGIN}/`) ||
    href.startsWith(`${SITE_ORIGIN}?`) ||
    href.startsWith(`${SITE_ORIGIN}#`);
  if (isInternal) {
    const path = href.slice(SITE_ORIGIN.length) || "/";
    return (
      <Link key={key} to={path} style={linkStyle}>
        {label}
      </Link>
    );
  }
  if (href.startsWith("https://") || href.startsWith("http://")) {
    return (
      <a
        key={key}
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        style={linkStyle}
      >
        {label}
      </a>
    );
  }
  // Anything else (relative/unknown) is rendered as plain text — never an href.
  return <span key={key}>{label}</span>;
}

interface MarkdownProps {
  content: string;
}

const h2Style: React.CSSProperties = {
  fontSize: "1.6rem",
  fontWeight: 700,
  color: "#1f2937",
  margin: "2.2rem 0 0.9rem",
  lineHeight: 1.25,
};
const h3Style: React.CSSProperties = {
  fontSize: "1.2rem",
  fontWeight: 700,
  color: "#374151",
  margin: "1.6rem 0 0.6rem",
};
const pStyle: React.CSSProperties = {
  fontSize: "1.08rem",
  lineHeight: 1.8,
  color: "#374151",
  margin: "0 0 1.2rem",
};
const liStyle: React.CSSProperties = {
  fontSize: "1.08rem",
  lineHeight: 1.7,
  color: "#374151",
  marginBottom: "0.55rem",
};
const listStyle: React.CSSProperties = {
  margin: "0 0 1.4rem",
  paddingLeft: "1.4rem",
};
const hrStyle: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e5e7eb",
  margin: "2rem 0",
};

export default function Markdown({ content }: MarkdownProps) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  const isOrdered = (l: string) => /^\d+\.\s+/.test(l);
  const isUnordered = (l: string) => /^[-*]\s+/.test(l);
  const isHeading = (l: string) => /^#{1,3}\s+/.test(l);
  const isHr = (l: string) => /^---\s*$/.test(l);

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (isHr(line)) {
      blocks.push(<hr key={`b${key++}`} style={hrStyle} />);
      i++;
      continue;
    }

    if (isHeading(line)) {
      const m = /^(#{1,3})\s+(.*)$/.exec(line)!;
      const level = m[1].length;
      const text = m[2];
      const k = `b${key++}`;
      if (level === 1) {
        blocks.push(
          <h2 key={k} style={{ ...h2Style, fontSize: "1.9rem" }}>
            {renderInline(text, k)}
          </h2>
        );
      } else if (level === 2) {
        blocks.push(
          <h2 key={k} style={h2Style}>
            {renderInline(text, k)}
          </h2>
        );
      } else {
        blocks.push(
          <h3 key={k} style={h3Style}>
            {renderInline(text, k)}
          </h3>
        );
      }
      i++;
      continue;
    }

    if (isOrdered(line)) {
      const items: string[] = [];
      while (i < lines.length && isOrdered(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      const k = `b${key++}`;
      blocks.push(
        <ol key={k} style={listStyle}>
          {items.map((it, idx) => (
            <li key={`${k}-${idx}`} style={liStyle}>
              {renderInline(it, `${k}-${idx}`)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    if (isUnordered(line)) {
      const items: string[] = [];
      while (i < lines.length && isUnordered(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      const k = `b${key++}`;
      blocks.push(
        <ul key={k} style={listStyle}>
          {items.map((it, idx) => (
            <li key={`${k}-${idx}`} style={liStyle}>
              {renderInline(it, `${k}-${idx}`)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Paragraph: collect consecutive plain lines.
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !isHeading(lines[i]) &&
      !isHr(lines[i]) &&
      !isOrdered(lines[i]) &&
      !isUnordered(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    const k = `b${key++}`;
    blocks.push(
      <p key={k} style={pStyle}>
        {renderInline(paraLines.join(" "), k)}
      </p>
    );
  }

  return <>{blocks}</>;
}
