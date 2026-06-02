/**
 * Seo.tsx — per-page metadata using React 19's NATIVE metadata support.
 *
 * In React 19 you can render <title>, <meta> and <link> anywhere in a
 * component and React automatically hoists them into <head>. No react-helmet
 * or other library is required. We use that here to give every route a unique
 * <title>, meta description and canonical URL.
 *
 *   • <title>     — React hoists this to the FRONT of <head>, so document.title
 *                   resolves to the per-page value (verified against React 19.2).
 *   • description — owned exclusively here; index.html intentionally has NO
 *                   static <meta name="description"> so the per-page value wins.
 *   • canonical   — single source of truth (index.html has no static canonical),
 *                   so there is never a conflicting/duplicate canonical tag.
 *
 * Optional `jsonLd` renders Schema.org structured data as an
 * application/ld+json <script>. The JSON is emitted as a normal text child
 * (NOT dangerouslySetInnerHTML) with every "<" escaped to < so the data
 * can never terminate the <script> element early — preserving the codebase's
 * "no innerHTML" security posture.
 */

const SITE_ORIGIN = "https://whosfakeinsights.com";

interface SeoProps {
  /** Full <title> text for the page. */
  title: string;
  /** Meta description (aim for < 160 characters). */
  description: string;
  /** Absolute path starting with "/", e.g. "/blog/why-people-unfollow". */
  path: string;
  /** Optional Schema.org JSON-LD object (e.g. Article schema). */
  jsonLd?: Record<string, unknown>;
}

export default function Seo({ title, description, path, jsonLd }: SeoProps) {
  const canonical = `${SITE_ORIGIN}${path}`;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {jsonLd ? (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd).replace(/</g, "\\u003c")}
        </script>
      ) : null}
    </>
  );
}
