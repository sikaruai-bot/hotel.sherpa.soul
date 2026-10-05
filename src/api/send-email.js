export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  const { to, subject, html, text } = req.body;

  // Use Resend (or any email service) via environment variable RESEND_API_KEY.
  // If not set, fallback to a placeholder response.
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey);
      const data = await resend.emails.send({
        from: "no-reply@hotelsherpasoul.com",
        to,
        subject,
        html,
        text,
      });
      return res.status(200).json({ success: true, data });
    } catch (e) {
      console.error("Resend email error:", e);
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  // Placeholder: pretend email sent successfully.
  console.warn("RESEND_API_KEY not set – email not actually sent.");
  return res.status(200).json({ success: true, message: "Email sent (placeholder)" });
}
