import PageLayout, {
  paragraphStyle,
  sectionHeadingStyle,
  inlineLinkStyle,
} from "../components/PageLayout";
import Seo from "../components/Seo";

/**
 * Privacy Policy page — static content. External links open in a new tab with
 * rel="noopener noreferrer" (reverse-tabnabbing protection). These are plain
 * link navigations, not resource loads, so they are unaffected by the CSP.
 */
export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy — WhosFake Insights"
        description="How WhosFake Insights handles your data: everything is processed locally in your browser and never uploaded, stored, or shared."
        path="/privacy"
      />
      <PageLayout title="Privacy Policy">
      <p style={{ ...paragraphStyle, color: "#888", fontSize: "0.95rem" }}>
        Last updated: May 24, 2026
      </p>

      <h2 style={sectionHeadingStyle}>Data Processing</h2>
      <p style={paragraphStyle}>
        WhosFake Insights processes all data entirely within your browser. When
        you upload your Instagram data export, the files are read and analyzed
        locally on your device. We do not upload, transmit, store, or have access
        to any of your Instagram data at any time.
      </p>

      <h2 style={sectionHeadingStyle}>Information We Do Not Collect</h2>
      <p style={paragraphStyle}>
        We do not collect, store, or sell your personal information, Instagram
        data, follower lists, or usernames.
      </p>

      <h2 style={sectionHeadingStyle}>Cookies and Advertising</h2>
      <p style={paragraphStyle}>
        We use Google AdSense to display ads. Google and its partners may use
        cookies to serve ads based on your prior visits to this and other
        websites. You can opt out of personalized advertising by visiting{" "}
        <a
          href="https://adssettings.google.com"
          target="_blank"
          rel="noopener noreferrer"
          style={inlineLinkStyle}
        >
          Google's Ads Settings
        </a>
        . For users in the EEA, UK, and Switzerland, a consent banner is shown
        before personalized ads are served.
      </p>

      <h2 style={sectionHeadingStyle}>Third-Party Services</h2>
      <p style={paragraphStyle}>
        Our site embeds YouTube videos for tutorials. YouTube may collect data
        according to{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          style={inlineLinkStyle}
        >
          Google's Privacy Policy
        </a>
        .
      </p>

      <h2 style={sectionHeadingStyle}>Changes to This Policy</h2>
      <p style={paragraphStyle}>
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with an updated date.
      </p>

      <h2 style={sectionHeadingStyle}>Contact</h2>
      <p style={{ ...paragraphStyle, marginBottom: 0 }}>
        Questions about this policy? Reach us at{" "}
        <a href="mailto:whosfakeinsights@gmail.com" style={inlineLinkStyle}>
          whosfakeinsights@gmail.com
        </a>
        .
      </p>
      </PageLayout>
    </>
  );
}
