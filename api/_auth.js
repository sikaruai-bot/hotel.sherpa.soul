import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const COOKIE_NAME = "CMS_SESSION";
export const SESSION_MAX_AGE_SECONDS = 28800; // 8 hours
export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];
export const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024; // 4 MiB

export function parseCookies(cookieHeader = "") {
  if (!cookieHeader) return {};
  return cookieHeader.split(";").reduce((acc, part) => {
    const [rawKey, ...rawVal] = part.trim().split("=");
    if (rawKey) {
      acc[rawKey.trim()] = decodeURIComponent(rawVal.join("=").trim());
    }
    return acc;
  }, {});
}

export function getSessionCookieHeader(token) {
  const isProd = process.env.NODE_ENV === "production";
  const parts = [
    `${COOKIE_NAME}=${token}`,
    "HttpOnly",
    "SameSite=Lax",
    "Path=/",
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
  ];
  if (isProd) {
    parts.push("Secure");
  }
  return parts.join("; ");
}

export function getClearCookieHeader() {
  const isProd = process.env.NODE_ENV === "production";
  const parts = [
    `${COOKIE_NAME}=`,
    "HttpOnly",
    "SameSite=Lax",
    "Path=/",
    "Max-Age=0",
  ];
  if (isProd) {
    parts.push("Secure");
  }
  return parts.join("; ");
}

export function verifyAdmin(req, res) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[COOKIE_NAME];

  if (!token) {
    res.status(401).json({ error: "Authentication required" });
    return null;
  }

  const secret = process.env.CMS_SESSION_SECRET;
  if (!secret) {
    res.status(500).json({ error: "CMS_SESSION_SECRET is not configured on server" });
    return null;
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (!decoded || decoded.admin !== true) {
      res.status(403).json({ error: "Forbidden: Admin privilege required" });
      return null;
    }
    return decoded;
  } catch (err) {
    res.status(401).json({ error: "Session invalid or expired" });
    return null;
  }
}

export async function parseJsonBody(req, maxSizeBytes = 5 * 1024 * 1024) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      throw new Error("Invalid JSON body");
    }
  }
  return new Promise((resolve, reject) => {
    let raw = "";
    let settled = false;

    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > maxSizeBytes && !settled) {
        settled = true;
        req.destroy();
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      if (settled) return;
      settled = true;
      if (!raw.trim()) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", (err) => {
      if (settled) return;
      settled = true;
      reject(err);
    });
  });
}
