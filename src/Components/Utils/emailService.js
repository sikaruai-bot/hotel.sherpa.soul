/**
 * Fail-safe email dispatcher for Hotel Sherpa Soul.
 * Handles production cPanel static hosting (hotelsherpasoul.com),
 * Vercel serverless (hotel-sherpa-soul.vercel.app), and local development.
 */
export async function sendEmailNotification(payload) {
  const endpoints = [];

  // 1. Same-origin relative endpoint (fastest and directly handles hotelsherpasoul.com)
  if (typeof window !== "undefined") {
    endpoints.push("/api/send-email");
  }

  // 2. Primary production endpoint (hotelsherpasoul.com)
  endpoints.push("https://hotelsherpasoul.com/api/send-email");

  // 3. Backup cloud endpoint (hotel-sherpa-soul.vercel.app)
  endpoints.push("https://hotel-sherpa-soul.vercel.app/api/send-email");

  // Deduplicate endpoints preserving priority order
  const uniqueEndpoints = [...new Set(endpoints)];

  let lastError = null;

  for (const endpoint of uniqueEndpoints) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (res.ok && data?.success) {
          return data;
        }
        lastError = data?.error || `HTTP ${res.status}`;
      } else {
        lastError = `Unexpected content-type (${res.status}): ${contentType}`;
      }
    } catch (err) {
      lastError = err.message;
      console.warn(`[emailService] Dispatch attempt failed at ${endpoint}:`, err);
    }
  }

  console.error("[emailService] All email dispatch endpoints failed. Last error:", lastError);
  return { success: false, error: lastError || "Email delivery failed" };
}
