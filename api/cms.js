import { sql } from "./_db.js";
import { verifyAdmin, parseJsonBody } from "./_auth.js";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const rows = await sql`
        SELECT data, updated_at
        FROM cms
        WHERE id = 1
        LIMIT 1
      `;

      if (rows.length === 0) {
        return res.status(404).json({ error: "CMS record not found" });
      }

      res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=60");
      return res.status(200).json({
        data: rows[0].data,
        updatedAt: rows[0].updated_at,
      });
    } catch (err) {
      console.error("GET /api/cms database error:", err);
      return res.status(500).json({ error: "Failed to fetch CMS content" });
    }
  }

  if (req.method === "PUT") {
    const admin = verifyAdmin(req, res);
    if (!admin) return;

    let body;
    try {
      body = await parseJsonBody(req);
    } catch (err) {
      return res.status(400).json({ error: err.message || "Malformed request body" });
    }

    const { data, updatedAt, uploadRefs } = body;

    if (!data || typeof data !== "object") {
      return res.status(400).json({ error: "Field 'data' is required and must be an object" });
    }
    if (!updatedAt) {
      return res.status(400).json({ error: "Field 'updatedAt' is required for concurrency control" });
    }
    if (!Array.isArray(uploadRefs)) {
      return res.status(400).json({ error: "Field 'uploadRefs' is required and must be an array" });
    }

    const dateObj = new Date(updatedAt);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ error: "Field 'updatedAt' must be a valid ISO timestamp" });
    }
    const normalizedUpdatedAt = dateObj.toISOString();
    const serializedData = JSON.stringify(data);

    for (const ref of uploadRefs) {
      if (!ref || typeof ref !== "object") {
        return res.status(400).json({ error: "Each item in uploadRefs must be an object" });
      }
      if (!ref.uploadId || !UUID_REGEX.test(ref.uploadId)) {
        return res.status(400).json({ error: `Invalid uploadId format: ${ref.uploadId}` });
      }
      if (!ref.blobUrl || typeof ref.blobUrl !== "string") {
        return res.status(400).json({ error: `Invalid blobUrl for upload: ${ref.uploadId}` });
      }
      if (!serializedData.includes(ref.blobUrl)) {
        // Skip orphaned or unreferenced upload ref
        continue;
      }

      const uploadRows = await sql`
        SELECT upload_id, status, blob_url
        FROM blob_uploads
        WHERE upload_id = ${ref.uploadId}
        LIMIT 1
      `;
      if (uploadRows.length === 0) {
        return res.status(400).json({ error: `Upload record ${ref.uploadId} not found in database` });
      }
      const uploadRecord = uploadRows[0];
      if (uploadRecord.status !== "ready" && uploadRecord.status !== "referenced") {
        return res.status(400).json({ error: `Upload ${ref.uploadId} status is '${uploadRecord.status}'; expected 'ready' or 'referenced'` });
      }
      if (uploadRecord.blob_url !== ref.blobUrl) {
        return res.status(400).json({ error: `Upload ${ref.uploadId} blobUrl mismatch against recorded upload` });
      }
    }

    const updateResult = await sql`
      UPDATE cms
      SET data = ${data}, updated_at = date_trunc('milliseconds', now())
      WHERE id = 1 AND (
        updated_at = ${normalizedUpdatedAt}::timestamptz
        OR date_trunc('milliseconds', updated_at) = date_trunc('milliseconds', ${normalizedUpdatedAt}::timestamptz)
      )
      RETURNING updated_at
    `;

    if (updateResult.length === 0) {
      const currentRows = await sql`SELECT data, updated_at FROM cms WHERE id = 1 LIMIT 1`;
      if (currentRows.length === 0) {
        return res.status(404).json({ error: "CMS row does not exist" });
      }
      return res.status(409).json({
        conflict: true,
        data: currentRows[0].data,
        updatedAt: currentRows[0].updated_at,
      });
    }

    const nextUpdatedAt = updateResult[0].updated_at;

    for (const ref of uploadRefs) {
      await sql`
        UPDATE blob_uploads
        SET status = 'referenced', referenced_at = now(), updated_at = now()
        WHERE upload_id = ${ref.uploadId} AND status = 'ready'
      `;
    }

    return res.status(200).json({
      data,
      updatedAt: nextUpdatedAt,
    });
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ error: "Method Not Allowed" });
}
