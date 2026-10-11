#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");
const crypto = require("node:crypto");

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 4 * 1024 * 1024;

function askConfirmation(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim().toLowerCase() === "yes");
    });
  });
}

function setNestedValue(obj, keyPath, value) {
  let cur = obj;
  for (let i = 0; i < keyPath.length - 1; i++) {
    const part = keyPath[i];
    cur = cur[part];
  }
  cur[keyPath[keyPath.length - 1]] = value;
}

async function main() {
  const args = process.argv.slice(2);
  const isApply = args.includes("--apply");

  let inputPath = "./cms-data/cms-backup.json";
  const inputIndex = args.indexOf("--input");
  if (inputIndex !== -1 && args[inputIndex + 1]) {
    inputPath = args[inputIndex + 1];
  }

  const resolvedInput = path.resolve(process.cwd(), inputPath);
  if (!fs.existsSync(resolvedInput)) {
    console.error(`Input file not found at: ${resolvedInput}`);
    process.exit(1);
  }

  console.log(`[Migration] Source file: ${resolvedInput}`);
  console.log(`[Migration] Mode: ${isApply ? "APPLY" : "DRY-RUN (zero writes/network)"}`);

  const rawContent = fs.readFileSync(resolvedInput, "utf8");
  let cmsJson;
  try {
    cmsJson = JSON.parse(rawContent);
  } catch (err) {
    console.error("Invalid JSON content in input file:", err.message);
    process.exit(1);
  }

  const ALLOWED_DIRECTORIES = [
    path.resolve(process.cwd(), "public"),
    path.resolve(process.cwd(), "dist", "assets"),
    path.resolve(process.cwd(), "src", "assets"),
  ];

  function resolveLegitimateProjectAsset(val) {
    if (!val.startsWith("/") || !/\.(webp|jpg|jpeg|png)$/i.test(val)) {
      return null;
    }
    const relativePath = val.replace(/^\/+/, "");

    // 1. Check public/
    const candidatePublic = path.normalize(path.join(ALLOWED_DIRECTORIES[0], relativePath));
    if (candidatePublic.startsWith(ALLOWED_DIRECTORIES[0]) && fs.existsSync(candidatePublic)) {
      return candidatePublic;
    }

    // 2. Check dist/assets/ and src/assets/ for bundled assets
    if (relativePath.startsWith("assets/")) {
      const assetSubPath = relativePath.slice("assets/".length);
      const candidateDist = path.normalize(path.join(ALLOWED_DIRECTORIES[1], assetSubPath));
      if (candidateDist.startsWith(ALLOWED_DIRECTORIES[1]) && fs.existsSync(candidateDist)) {
        return candidateDist;
      }

      // Check src/assets/ (matching base asset name without Vite hash)
      const baseName = assetSubPath.replace(/-[A-Za-z0-9_-]{8}\./, ".");
      const candidateSrc = path.normalize(path.join(ALLOWED_DIRECTORIES[2], baseName));
      if (candidateSrc.startsWith(ALLOWED_DIRECTORIES[2]) && fs.existsSync(candidateSrc)) {
        return candidateSrc;
      }
    }

    return null;
  }

  const discoveredImages = [];
  const unresolvedImages = [];

  function scanValue(val, keyPath = []) {
    if (typeof val === "string") {
      if (val.startsWith("data:image/")) {
        const match = val.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
        if (match) {
          const mime = match[1].toLowerCase();
          if (ALLOWED_MIME_TYPES.includes(mime)) {
            const buffer = Buffer.from(match[2], "base64");
            if (buffer.length <= MAX_SIZE_BYTES) {
              const hash = crypto.createHash("sha256").update(buffer).digest("hex");
              discoveredImages.push({
                keyPath,
                type: "base64",
                mime,
                buffer,
                hash,
                originalValue: val,
              });
              return;
            }
          }
        }
        unresolvedImages.push({ keyPath, reason: "Invalid mime or exceeds 4 MiB", value: val.slice(0, 40) + "..." });
      } else if (val.startsWith("/") && /\.(webp|jpg|jpeg|png)$/i.test(val)) {
        const resolvedFile = resolveLegitimateProjectAsset(val);
        if (resolvedFile) {
          const buffer = fs.readFileSync(resolvedFile);
          const ext = path.extname(resolvedFile).toLowerCase().replace(".", "");
          const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : `image/${ext}`;
          if (ALLOWED_MIME_TYPES.includes(mime) && buffer.length <= MAX_SIZE_BYTES) {
            const hash = crypto.createHash("sha256").update(buffer).digest("hex");
            discoveredImages.push({
              keyPath,
              type: "localFile",
              filePath: resolvedFile,
              mime,
              buffer,
              hash,
              originalValue: val,
            });
            return;
          }
        }
        unresolvedImages.push({ keyPath, reason: "Local file not found in allowed directories or disallowed mime", value: val });
      }
    } else if (Array.isArray(val)) {
      val.forEach((item, idx) => scanValue(item, [...keyPath, idx]));
    } else if (val && typeof val === "object") {
      for (const [k, v] of Object.entries(val)) {
        scanValue(v, [...keyPath, k]);
      }
    }
  }

  scanValue(cmsJson);

  console.log(`[Migration] Detected ${discoveredImages.length} valid images. Unresolved: ${unresolvedImages.length}`);

  const uniqueBuffers = new Map();
  for (const img of discoveredImages) {
    if (!uniqueBuffers.has(img.hash)) {
      uniqueBuffers.set(img.hash, {
        mime: img.mime,
        buffer: img.buffer,
        references: [img],
      });
    } else {
      uniqueBuffers.get(img.hash).references.push(img);
    }
  }

  console.log(`[Migration] Deduplicated to ${uniqueBuffers.size} unique uploads.`);

  if (!isApply) {
    const dryReport = {
      timestamp: new Date().toISOString(),
      mode: "dry-run",
      source: resolvedInput,
      totalFound: discoveredImages.length,
      uniqueUploads: uniqueBuffers.size,
      unresolvedCount: unresolvedImages.length,
      unresolvedImages,
    };
    fs.writeFileSync("migration-report.json", JSON.stringify(dryReport, null, 2));
    console.log("[Migration] DRY-RUN complete. Output saved to migration-report.json.");
    return;
  }

  const confirmed = await askConfirmation("Are you sure you want to apply migrations to Vercel Blob and Neon DB? (yes/no): ");
  if (!confirmed) {
    console.log("[Migration] Cancelled by user.");
    return;
  }

  const backupFile = `${resolvedInput}.backup-${Date.now()}.json`;
  fs.writeFileSync(backupFile, rawContent);
  console.log(`[Migration] Backup saved: ${backupFile}`);

  const { neon } = await import("@neondatabase/serverless");
  const { put } = await import("@vercel/blob");

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL environment variable is required for --apply");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);

  const existingRow = await sql`SELECT id, updated_at FROM cms WHERE id = 1 LIMIT 1`;
  if (existingRow.length > 0) {
    const overwriteConfirm = await askConfirmation(`Row id=1 already exists (updated at ${existingRow[0].updated_at}). Replace it? (yes/no): `);
    if (!overwriteConfirm) {
      console.log("[Migration] Aborted by user to protect existing CMS row.");
      return;
    }
  }

  const uploadedMap = new Map();
  const orphanUploads = [];

  try {
    for (const [hash, entry] of uniqueBuffers.entries()) {
      const uploadId = crypto.randomUUID();
      const ext = entry.mime === "image/jpeg" ? "jpg" : entry.mime.split("/")[1];
      const pathname = `cms-uploads/${uploadId}.${ext}`;

      await sql`
        INSERT INTO blob_uploads (
          upload_id,
          pathname,
          status,
          created_at,
          updated_at
        ) VALUES (
          ${uploadId},
          ${pathname},
          'pending',
          now(),
          now()
        )
      `;

      let blobResult;
      try {
        blobResult = await put(pathname, entry.buffer, {
          access: "public",
          contentType: entry.mime,
        });
      } catch (uploadErr) {
        await sql`
          UPDATE blob_uploads
          SET status = 'failed', error_reason = ${uploadErr.message}, updated_at = now()
          WHERE upload_id = ${uploadId}
        `;
        throw uploadErr;
      }

      await sql`
        UPDATE blob_uploads
        SET blob_url = ${blobResult.url},
            content_type = ${entry.mime},
            size_bytes = ${entry.buffer.length},
            status = 'ready',
            updated_at = now()
        WHERE upload_id = ${uploadId}
      `;

      uploadedMap.set(hash, { uploadId, blobUrl: blobResult.url });
      orphanUploads.push({ uploadId, pathname, blobUrl: blobResult.url });
    }

    for (const img of discoveredImages) {
      const uploadRecord = uploadedMap.get(img.hash);
      if (uploadRecord) {
        setNestedValue(cmsJson, img.keyPath, uploadRecord.blobUrl);
      }
    }

    await sql`
      INSERT INTO cms (id, data, updated_at)
      VALUES (1, ${cmsJson}, now())
      ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()
    `;

    for (const item of orphanUploads) {
      await sql`
        UPDATE blob_uploads
        SET status = 'referenced', referenced_at = now(), updated_at = now()
        WHERE upload_id = ${item.uploadId}
      `;
    }

    console.log("[Migration] CMS data migration completed successfully.");
    fs.writeFileSync("migration-report.json", JSON.stringify({
      timestamp: new Date().toISOString(),
      mode: "applied",
      backupFile,
      totalUploaded: orphanUploads.length,
      unresolvedCount: unresolvedImages.length,
      unresolvedImages,
      success: true,
    }, null, 2));
  } catch (err) {
    console.error("[Migration] Error during migration execution:", err);
    fs.writeFileSync("migration-report.json", JSON.stringify({
      timestamp: new Date().toISOString(),
      mode: "applied-failed",
      backupFile,
      orphanUploads,
      unresolvedImages,
      error: err.message,
    }, null, 2));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error during migration:", err);
  process.exit(1);
});
