
import { howToSteps, howToStepsMobile } from './howToStepsData';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const HowToSteps: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  const allSteps = isMobile ? howToStepsMobile : howToSteps;
  const steps = allSteps;

  const toggleButtonStyle = (active: boolean): React.CSSProperties => ({
    background: active ? '#764ba2' : '#e0e7ff',
    color: active ? 'white' : '#333',
    border: 'none',
    borderRadius: 8,
    padding: '10px 24px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: active ? '0 2px 8px rgba(102,126,234,0.08)' : undefined,
  });

  return (
    <div style={{ background: 'white', borderRadius: 20, padding: '3vw', marginTop: '3vw', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#333', fontSize: '2rem', marginBottom: '2vw', textAlign: 'center' }}>Text Instructions</h1>

      {/* Mobile / Browser toggle (unchanged behavior) */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <button style={{ ...toggleButtonStyle(isMobile), marginRight: 10 }} onClick={() => setIsMobile(true)}>Mobile</button>
        <button style={toggleButtonStyle(!isMobile)} onClick={() => setIsMobile(false)}>Browser</button>
      </div>

      {/* Estimated Time */}
      <div
        style={{
          maxWidth: 640,
          margin: '0 auto 32px',
          background: 'linear-gradient(135deg, #f3f0ff 0%, #ede9fe 100%)',
          border: '1px solid #ddd6fe',
          borderRadius: 14,
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
        }}
      >
        <span style={{ fontSize: '1.5rem', lineHeight: 1.2 }} aria-hidden="true">⚡</span>
        <p style={{ color: '#4c1d95', fontSize: '0.98rem', margin: 0, lineHeight: 1.55 }}>
          <strong>Estimated time:</strong> Steps 1-12 will take 1-3 minutes. Instagram may take 2-7 minutes to email you your data export. Downloading and uploading your file to our tool may take a few moments, then results are instant!
        </p>
      </div>

      {/* Vertical step list */}
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
              {/* Numbered circle + connector line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch' }}>
                <div
                  style={{
                    flexShrink: 0,
                    width: 44,
                    height: 44,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: '50%',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 8px rgba(102,126,234,0.25)',
                  }}
                >
                  {idx + 1}
                </div>
                {!isLast && <div style={{ flex: 1, width: 2, background: '#e0e7ff', marginTop: 4 }} />}
              </div>
              {/* Title + description */}
              <div style={{ paddingBottom: isLast ? 0 : 28, paddingTop: 6 }}>
                <h3 style={{ color: '#333', margin: '0 0 6px', fontSize: '1.1rem' }}>{step.title}</h3>
                <p style={{ color: '#666', fontSize: '0.95rem', margin: 0, lineHeight: 1.55 }}>{step.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 36 }}>
        <Link
          to="/tool"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            padding: '12px 28px',
            borderRadius: 10,
            boxShadow: '0 4px 14px rgba(102,126,234,0.3)',
          }}
        >
          Got your file? Go to the tool →
        </Link>
        <span style={{ color: '#888', fontSize: '0.9rem' }}>Prefer video? Watch the tutorial above.</span>
      </div>
    </div>
  );
};

export default HowToSteps;
