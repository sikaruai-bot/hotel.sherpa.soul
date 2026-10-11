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

  const { uploadId, pathname, blobUrl, contentType, sizeBytes } = body;

  if (!uploadId || !UUID_REGEX.test(uploadId)) {
    return res.status(400).json({ error: "A valid UUID uploadId is required" });
  }
  if (!pathname || typeof pathname !== "string" || !pathname.startsWith("cms-uploads/")) {
    return res.status(400).json({ error: "Pathname must start with 'cms-uploads/'" });
  }
  if (!blobUrl || typeof blobUrl !== "string") {
    return res.status(400).json({ error: "blobUrl must be a valid string URL" });
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(blobUrl);
  } catch {
    return res.status(400).json({ error: "blobUrl is not a valid URL" });
  }

  if (!parsedUrl.hostname.endsWith(".blob.vercel-storage.com") && parsedUrl.hostname !== "blob.vercel-storage.com") {
    return res.status(400).json({ error: "blobUrl must reside on *.blob.vercel-storage.com" });
  }
  if (!parsedUrl.pathname.includes(pathname)) {
    return res.status(400).json({ error: "blobUrl path does not match submitted pathname" });
  }

  if (!Number.isInteger(sizeBytes) || sizeBytes <= 0 || sizeBytes > MAX_FILE_SIZE_BYTES) {
    return res.status(400).json({ error: `sizeBytes must be an integer between 1 and ${MAX_FILE_SIZE_BYTES}` });
  }
  if (!contentType || !ALLOWED_MIME_TYPES.includes(contentType)) {
    return res.status(400).json({ error: `contentType must be one of: ${ALLOWED_MIME_TYPES.join(", ")}` });
  }

  const existingRows = await sql`
    SELECT upload_id, pathname, blob_url, content_type, size_bytes, status
    FROM blob_uploads
    WHERE upload_id = ${uploadId}
    LIMIT 1
  `;

  if (existingRows.length === 0) {
    return res.status(404).json({ error: "Pending upload record not found" });
  }

  const row = existingRows[0];

  if (row.status === "ready") {
    if (row.blob_url === blobUrl && row.pathname === pathname && row.size_bytes === sizeBytes && row.content_type === contentType) {
      return res.status(200).json({ success: true, ready: true, uploadId, blobUrl });
    }
    return res.status(409).json({ error: "Upload has already completed with different parameters" });
  }

  if (row.status !== "pending") {
    return res.status(400).json({ error: `Cannot transition upload in status: '${row.status}'` });
  }

  await sql`
    UPDATE blob_uploads
    SET blob_url = ${blobUrl},
        content_type = ${contentType},
        size_bytes = ${sizeBytes},
        status = 'ready',
        updated_at = now()
    WHERE upload_id = ${uploadId} AND status = 'pending'
  `;

  return res.status(200).json({ success: true, uploadId, blobUrl });
}
