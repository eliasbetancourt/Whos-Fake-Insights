import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "whosfake_visited_tool";
const GRADIENT = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

export default function FirstTimeModal() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  const goToTutorial = () => {
    dismiss();
    navigate("/tutorial");
  };

  if (!open) return null;

  return (
    <div
      onClick={dismiss}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#ffffff",
          borderRadius: 16,
          padding: "36px 32px 28px",
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          position: "relative",
          textAlign: "center",
        }}
      >
        {/* X button */}
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 12,
            right: 14,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "1.4rem",
            color: "#9ca3af",
            lineHeight: 1,
            padding: "4px 6px",
          }}
        >
          ×
        </button>

        {/* Logo */}
        <img
          src="/favicon/favicon-96x96.png"
          alt="WhosFake Insights"
          width={64}
          height={64}
          style={{ borderRadius: 12, marginBottom: 16 }}
        />

        {/* Headline */}
        <h2
          style={{
            margin: "0 0 10px",
            fontSize: "1.45rem",
            fontWeight: 800,
            color: "#1f2937",
            letterSpacing: "-0.01em",
          }}
        >
          First time here? 👋
        </h2>

        {/* Subtext */}
        <p
          style={{
            margin: "0 0 24px",
            fontSize: "0.97rem",
            lineHeight: 1.6,
            color: "#6b7280",
          }}
        >
          Check out our step-by-step tutorial to learn how to download your
          Instagram data and get the most out of WhosFake Insights.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={goToTutorial}
            style={{
              background: GRADIENT,
              color: "#ffffff",
              border: "none",
              borderRadius: 10,
              padding: "13px 20px",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(102,126,234,0.4)",
            }}
          >
            Show Me How →
          </button>
          <button
            onClick={dismiss}
            style={{
              background: "transparent",
              color: "#6d64e8",
              border: "2px solid #6d64e8",
              borderRadius: 10,
              padding: "11px 20px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            I Know What To Do
          </button>
        </div>
      </div>
    </div>
  );
}
