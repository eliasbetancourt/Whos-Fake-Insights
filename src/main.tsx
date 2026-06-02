import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import './index.css'

// Code-splitting: the landing page (Home) ships in the main bundle for the
// fastest possible first paint / AdSense crawl. Every other route is lazy
// loaded, so Vite emits each as its own chunk and heavy dependencies only
// download when needed — e.g. JSZip is pulled in only when /tool is visited.
const Tool = lazy(() => import('./pages/Tool'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Tutorial = lazy(() => import('./pages/Tutorial'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))

// Themed placeholder shown while a lazy route chunk loads (matches the site
// gradient so there is no white flash between routes).
function RouteFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    />
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* Content-rich landing page (eager, in the main bundle). */}
          <Route path="/" element={<Home />} />
          {/* The existing unfollower tool. */}
          <Route path="/tool" element={<Tool />} />
          {/* Blog index + individual articles. */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* Tutorial (video + step-by-step export instructions). */}
          <Route path="/tutorial" element={<Tutorial />} />
          {/* Static informational pages. */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* Any unknown client-side path falls back to the home page. The
              Netlify SPA redirect (see netlify.toml) ensures a hard refresh on
              these paths also serves index.html so this router can take over. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
)
