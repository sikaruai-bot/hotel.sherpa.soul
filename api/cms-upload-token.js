import { randomUUID } from "node:crypto";
import { handleUpload } from "@vercel/blob/client";
import { sql } from "./_db.js";
import { verifyAdmin, parseJsonBody, ALLOWED_MIME_TYPES, MAX_FILE_SIZE_BYTES } from "./_auth.js";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function handler(req, res) {
  const admin = verifyAdmin(req, res);
  if (!admin) return;

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

  let createdUploadId = null;
  let createdPathname = null;

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        let requestedUploadId = null;
        if (clientPayload) {
          try {
            const parsedPayload = JSON.parse(clientPayload);
            if (parsedPayload.uploadId && UUID_REGEX.test(parsedPayload.uploadId)) {
              requestedUploadId = parsedPayload.uploadId;
            }
          } catch {
            // Ignore malformed client payload and generate fresh UUID
          }
        }

        createdUploadId = requestedUploadId || randomUUID();
        const rawExt = (pathname.split(".").pop() || "webp").toLowerCase().replace(/[^a-z0-9]/g, "");
        const ext = ["jpeg", "jpg", "png", "webp"].includes(rawExt) ? rawExt : "webp";
        createdPathname = pathname.startsWith("cms-uploads/")
          ? pathname
          : `cms-uploads/${createdUploadId}.${ext}`;

        await sql`
          INSERT INTO blob_uploads (
            upload_id,
            pathname,
            status,
            created_at,
            updated_at
          ) VALUES (
            ${createdUploadId},
            ${createdPathname},
            'pending',
            now(),
            now()
          )
          ON CONFLICT (upload_id) DO UPDATE SET updated_at = now()
        `;

        return {
          allowedContentTypes: ALLOWED_MIME_TYPES,
          maximumSizeInBytes: MAX_FILE_SIZE_BYTES,
          addRandomSuffix: false,
          tokenPayload: JSON.stringify({
            uploadId: createdUploadId,
            pathname: createdPathname,
          }),
        };
      },
      onUploadCompleted: async () => {
        // Handled via /api/cms-upload-complete
      },
    });

    return res.status(200).json({ ...jsonResponse, uploadId: createdUploadId });
  } catch (err) {
    console.error("handleUpload error in /api/cms-upload-token:", err);
    return res.status(400).json({ error: err.message || "Failed to generate upload token" });
  }
}
