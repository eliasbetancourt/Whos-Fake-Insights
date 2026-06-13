/**
 * Tutorial.tsx — "/tutorial".
 *
 * Hosts the existing VideoSection + HowToSteps components under a page header,
 * so users have a dedicated place to learn how to export their Instagram data.
 */

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import VideoSection from "../components/VideoSection";
import HowToSteps from "../components/HowToSteps";
import Seo from "../components/Seo";

const GRADIENT = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

export default function Tutorial() {
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
          title="How to Export Your Instagram Data — WhosFake Insights"
          description="Step-by-step guide, with video, to downloading your Instagram data export so you can check who isn't following you back with WhosFake Insights."
          path="/tutorial"
        />
        <NavBar />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "clamp(112px, 15vh, 140px) clamp(16px, 4vw, 32px) 160px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <header style={{ textAlign: "center", marginBottom: 8 }}>
            <h1
              style={{
                color: "#fff",
                fontSize: "clamp(1.9rem, 5vw, 2.8rem)",
                fontWeight: 800,
                marginBottom: 12,
                textShadow: "0 2px 12px rgba(0,0,0,0.2)",
              }}
            >
              How to Export Your Instagram Data
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: "clamp(1.02rem, 2.5vw, 1.2rem)",
                maxWidth: 640,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Follow these steps to download your Instagram data and use WhosFake Insights.
            </p>
          </header>

          <VideoSection />
          <HowToSteps />


        </div>

      </div>

      <Footer />
    </>
  );
}
