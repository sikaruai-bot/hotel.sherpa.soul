import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { parseJsonBody, getSessionCookieHeader, SESSION_MAX_AGE_SECONDS } from "./_auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  let body;
  try {
    body = await parseJsonBody(req);
  } catch (err) {
    return res.status(400).json({ error: err.message || "Invalid JSON request body" });
  }

  const { password } = body;
  if (!password || typeof password !== "string") {
    return res.status(400).json({ error: "Password string is required" });
  }

  const passwordHash = process.env.CMS_ADMIN_PASSWORD_HASH;
  const sessionSecret = process.env.CMS_SESSION_SECRET;

  if (!passwordHash || !sessionSecret) {
    console.error("Missing CMS_ADMIN_PASSWORD_HASH or CMS_SESSION_SECRET");
    return res.status(500).json({ error: "Server authentication is misconfigured" });
  }

  const passwordMatches = await bcryptjs.compare(password, passwordHash);
  if (!passwordMatches) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { admin: true },
    sessionSecret,
    { expiresIn: SESSION_MAX_AGE_SECONDS }
  );

  res.setHeader("Set-Cookie", getSessionCookieHeader(token));
  return res.status(200).json({ success: true });
}
