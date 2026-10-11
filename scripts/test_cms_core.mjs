import assert from "node:assert";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { Readable } from "node:stream";

import {
  COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
  parseCookies,
  getSessionCookieHeader,
  getClearCookieHeader,
  verifyAdmin,
  parseJsonBody,
} from "../api/_auth.js";

async function runTests() {
  console.log("==================================================");
  console.log("       HOTEL SHERPA SOUL - CMS TEST SUITE         ");
  console.log("==================================================");

  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log(`✓ PASS: ${name}`);
      passed++;
    } catch (e) {
      console.error(`✗ FAIL: ${name}`, e.message);
      failed++;
    }
  }

  async function testAsync(name, fn) {
    try {
      await fn();
      console.log(`✓ PASS: ${name}`);
      passed++;
    } catch (e) {
      console.error(`✗ FAIL: ${name}`, e.message);
      failed++;
    }
  }

  // 1. Cookie & Auth Helpers
  test("Cookie parser handles empty, single, and multiple cookies", () => {
    assert.deepStrictEqual(parseCookies(""), {});
    const single = parseCookies("CMS_SESSION=testtoken123");
    assert.strictEqual(single.CMS_SESSION, "testtoken123");
    const multi = parseCookies("user=guest; CMS_SESSION=token456; other=val");
    assert.strictEqual(multi.CMS_SESSION, "token456");
    assert.strictEqual(multi.user, "guest");
  });

  test("Session cookie header has HttpOnly, SameSite=Lax, and Max-Age", () => {
    const header = getSessionCookieHeader("sample_token");
    assert.ok(header.includes("CMS_SESSION=sample_token"));
    assert.ok(header.includes("HttpOnly"));
    assert.ok(header.includes("SameSite=Lax"));
    assert.ok(header.includes(`Max-Age=${SESSION_MAX_AGE_SECONDS}`));
    assert.ok(header.includes("Path=/"));
  });

  test("Clear cookie header has Max-Age=0", () => {
    const header = getClearCookieHeader();
    assert.ok(header.includes("CMS_SESSION="));
    assert.ok(header.includes("Max-Age=0"));
  });

  // 2. JWT Verification
  test("verifyAdmin accepts valid admin token and rejects invalid/expired token", () => {
    const secret = "test_secret_for_suite_1234567890";
    process.env.CMS_SESSION_SECRET = secret;

    const validToken = jwt.sign({ admin: true }, secret, { expiresIn: 3600 });
    const fakeReq = { headers: { cookie: `CMS_SESSION=${validToken}` } };
    const fakeRes = { status: () => ({ json: () => {} }) };

    const decoded = verifyAdmin(fakeReq, fakeRes);
    assert.ok(decoded);
    assert.strictEqual(decoded.admin, true);

    // Non-admin token
    const nonAdminToken = jwt.sign({ admin: false }, secret, { expiresIn: 3600 });
    let statusCode = null;
    let errorJson = null;
    const resSpy = {
      status: (code) => {
        statusCode = code;
        return { json: (data) => { errorJson = data; } };
      },
    };

    const rejectNonAdmin = verifyAdmin({ headers: { cookie: `CMS_SESSION=${nonAdminToken}` } }, resSpy);
    assert.strictEqual(rejectNonAdmin, null);
    assert.strictEqual(statusCode, 403);

    // Missing token
    const rejectMissing = verifyAdmin({ headers: { cookie: "" } }, resSpy);
    assert.strictEqual(rejectMissing, null);
    assert.strictEqual(statusCode, 401);
  });

  // 3. Body Parsing & Security
  await testAsync("parseJsonBody parses raw JSON stream safely", async () => {
    const req = new Readable({
      read() {
        this.push(JSON.stringify({ hello: "world" }));
        this.push(null);
      },
    });
    const result = await parseJsonBody(req, 1024);
    assert.deepStrictEqual(result, { hello: "world" });
  });

  await testAsync("parseJsonBody rejects payload exceeding byte limit", async () => {
    const req = new Readable({
      read() {
        this.push("x".repeat(200));
        this.push(null);
      },
    });
    await assert.rejects(
      async () => {
        await parseJsonBody(req, 100);
      },
      /Payload too large/
    );
  });

  // 4. Password Hashing & Verification
  await testAsync("Bcrypt password verification succeeds with correct password", async () => {
    const password = "secureTestPassword2026";
    const hash = await bcryptjs.hash(password, 10);
    const matches = await bcryptjs.compare(password, hash);
    const wrong = await bcryptjs.compare("wrongPassword", hash);
    assert.strictEqual(matches, true);
    assert.strictEqual(wrong, false);
  });

  // 5. MIME Types & Size Constants
  test("MIME whitelist contains only JPEG, PNG, and WebP; excludes GIF", () => {
    assert.deepStrictEqual(ALLOWED_MIME_TYPES, ["image/jpeg", "image/png", "image/webp"]);
    assert.strictEqual(ALLOWED_MIME_TYPES.includes("image/gif"), false);
    assert.strictEqual(MAX_FILE_SIZE_BYTES, 4194304);
  });

  // 6. Concurrency Timestamp Normalization
  test("ISO timestamp normalization prevents false precision mismatches", () => {
    const rawIso = "2026-10-11T10:20:30.456Z";
    const d = new Date(rawIso);
    assert.strictEqual(isNaN(d.getTime()), false);
    assert.strictEqual(d.toISOString(), rawIso);

    const invalid = new Date("not-a-timestamp");
    assert.strictEqual(isNaN(invalid.getTime()), true);
  });

  // 7. Vercel Blob URL verification logic
  test("Blob URL validation enforces .blob.vercel-storage.com host and pathname", () => {
    const validUrl = "https://public.blob.vercel-storage.com/cms-uploads/12345.webp";
    const parsed = new URL(validUrl);
    assert.ok(parsed.hostname.endsWith(".blob.vercel-storage.com") || parsed.hostname === "blob.vercel-storage.com");
    assert.ok(parsed.pathname.includes("cms-uploads/12345.webp"));

    const forgedUrl = "https://malicious-site.com/cms-uploads/12345.webp";
    const parsedForged = new URL(forgedUrl);
    const isAllowed = parsedForged.hostname.endsWith(".blob.vercel-storage.com") || parsedForged.hostname === "blob.vercel-storage.com";
    assert.strictEqual(isAllowed, false);
  });

  console.log("==================================================");
  console.log(`Results: ${passed} Passed, ${failed} Failed`);
  console.log("==================================================");

  if (failed > 0) process.exit(1);
}

runTests().catch((err) => {
  console.error("Test runner encountered fatal error:", err);
  process.exit(1);
});
