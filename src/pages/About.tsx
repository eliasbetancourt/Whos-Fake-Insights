import PageLayout, { paragraphStyle } from "../components/PageLayout";
import Seo from "../components/Seo";

/**
 * About page — static informational content. No user data is processed here.
 */
export default function About() {
  return (
    <>
      <Seo
        title="About WhosFake Insights"
        description="WhosFake Insights is a free, privacy-first tool that shows which Instagram accounts don't follow you back — all processed locally in your browser."
        path="/about"
      />
      <PageLayout title="About WhosFake Insights">
      <p style={paragraphStyle}>
        WhosFake Insights is a free tool that helps Instagram users discover who
        isn't following them back. We built this web app because checking your followers
        manually is tedious—our tool does it instantly.
      </p>
      <p style={paragraphStyle}>
        <strong>How it works:</strong> Instagram lets you download your own data,
        including your followers and following lists. You upload that data export
        to our site, and we compare the two lists right in your browser to show
        you exactly who doesn't follow you back.
      </p>
      <p style={paragraphStyle}>
        <strong>Your privacy comes first.</strong> All processing happens locally
        on your device. Your data is never uploaded to a server, never stored, and
        never seen by anyone but you. When you close the tab, it's gone.
      </p>
      <p style={{ ...paragraphStyle, marginBottom: 0, color: "#666", fontSize: "0.98rem" }}>
        WhosFake Insights is an independent tool and is not affiliated with,
        endorsed by, or connected to Instagram or Meta Platforms, Inc.
      </p>
      </PageLayout>
    </>
  );
}
