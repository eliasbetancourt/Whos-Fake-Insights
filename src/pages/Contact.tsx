import PageLayout, { paragraphStyle, inlineLinkStyle } from "../components/PageLayout";
import Seo from "../components/Seo";

/**
 * Contact page — static content with a mailto link.
 */
export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Us — WhosFake Insights"
        description="Questions, feedback, or found a bug? Get in touch with the WhosFake Insights team."
        path="/contact"
      />
      <PageLayout title="Contact Us">
      <p style={paragraphStyle}>
        Have a question, found a bug, or want to share feedback? We'd love to hear
        from you.
      </p>
      <p style={{ ...paragraphStyle, fontWeight: 600 }}>
        📧 Email:{" "}
        <a href="mailto:whosfakeinsights@gmail.com" style={inlineLinkStyle}>
          whosfakeinsights@gmail.com
        </a>
      </p>
      <p style={{ ...paragraphStyle, marginBottom: 0 }}>
        We aim to respond to all messages within 2–3 business days.
      </p>
      </PageLayout>
    </>
  );
}
