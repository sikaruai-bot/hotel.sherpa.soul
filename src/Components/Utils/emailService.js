/**
 * Fail-safe email dispatcher for Hotel Sherpa Soul.
 * Handles production cPanel static hosting (hotelsherpasoul.com),
 * Vercel serverless (hotel-sherpa-soul.vercel.app), and local development.
 */
export async function sendEmailNotification(payload) {
  const isCpanelDomain =
    typeof window !== "undefined" &&
    (window.location.hostname === "hotelsherpasoul.com" ||
      window.location.hostname === "www.hotelsherpasoul.com");

  const primaryEndpoint = isCpanelDomain
    ? "https://hotel-sherpa-soul.vercel.app/api/send-email"
    : "/api/send-email";

  try {
    const res = await fetch(primaryEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Check if the response is valid JSON (cPanel might return HTML on 404/rewrite)
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const data = await res.json();
      if (res.ok && data?.success) {
        return data;
      }
    }

    // If primary returned non-JSON or error and wasn't already the direct Vercel URL, fallback
    if (primaryEndpoint !== "https://hotel-sherpa-soul.vercel.app/api/send-email") {
      console.warn("Primary email route did not succeed, attempting Vercel cloud fallback...");
      const fallbackRes = await fetch("https://hotel-sherpa-soul.vercel.app/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return await fallbackRes.json();
    }

    return { success: false, error: "Email delivery failed" };
  } catch (err) {
    console.warn("Email network attempt error, attempting direct Vercel fallback:", err);
    try {
      const fallbackRes = await fetch("https://hotel-sherpa-soul.vercel.app/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return await fallbackRes.json();
    } catch (fallbackErr) {
      console.error("All email endpoints failed:", fallbackErr);
      return { success: false, error: fallbackErr.message };
    }
  }
}
