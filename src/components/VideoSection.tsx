import { useState } from "react";

/**
 * VideoSection — embeds two hard-coded YouTube tutorial videos.
 *
 * Security notes:
 *   • URLs are compile-time constants; no user input ever reaches the iframe
 *     src attribute (no open-redirect or XSS exposure).
 *   • We use youtube-nocookie.com to minimize third-party tracking on first
 *     load and align with privacy expectations (NIST PR.DS-5).
 *   • The CSP `frame-src` directive in index.html restricts <iframe> to the
 *     youtube.com / youtube-nocookie.com origins — defense in depth in case
 *     this list of URLs is ever changed.
 *   • On mobile browsers YouTube blocks iframe playback; a thumbnail link is
 *     shown instead, opening the video in the YouTube app / mobile site.
 *   • Subresource Integrity (SRI) does not apply to <iframe>; the equivalent
 *     guarantee is the strict origin allow-list above.
 */
export default function VideoSection() {
  const [mode, setMode] = useState<'browser' | 'mobile'>('browser');

  const browserVideoId = "4eh8eJAUEdk";
  const mobileVideoId = "EJGduqb2zx4";

  const videoId = mode === 'browser' ? browserVideoId : mobileVideoId;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '40px 0',
      width: '100%',
    }}>
      <div style={{
        background: 'white',
        borderRadius: 28,
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
        padding: 'clamp(16px, 5vw, 48px) clamp(12px, 4vw, 40px) clamp(16px, 3vw, 32px)',
        maxWidth: '720px',
        width: '98%',
        margin: '0 auto',
        textAlign: 'center',
        boxSizing: 'border-box',
      }}>
        <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: 18 }}>
          {mode === 'browser'
            ? "Instagram Browser Tutorial Video"
            : "Instagram Mobile Tutorial Video"}
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>
            <iframe
              src={embedUrl}
              title="Tutorial Video"
              frameBorder="0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 18 }}
            />
          </div>
        </div>
        {/* Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <button
            onClick={() => setMode('browser')}
            style={{
              padding: '10px 24px',
              borderRadius: 8,
              border: mode === 'browser' ? '2px solid #764ba2' : '2px solid #e0e7ff',
              background: mode === 'browser' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8faff',
              color: mode === 'browser' ? 'white' : '#333',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Browser
          </button>
          <button
            onClick={() => setMode('mobile')}
            style={{
              padding: '10px 24px',
              borderRadius: 8,
              border: mode === 'mobile' ? '2px solid #764ba2' : '2px solid #e0e7ff',
              background: mode === 'mobile' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8faff',
              color: mode === 'mobile' ? 'white' : '#333',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Mobile
          </button>
        </div>
      </div>
    </div>
  );
}