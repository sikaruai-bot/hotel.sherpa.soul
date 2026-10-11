#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL environment variable is required to take a CMS database snapshot.");
    process.exit(1);
  }

  const { neon } = await import("@neondatabase/serverless");
  const sql = neon(process.env.DATABASE_URL);

  console.log("Connecting to Neon PostgreSQL to fetch CMS snapshot...");
  
  let rows;
  try {
    rows = await sql`SELECT id, data, updated_at, created_at FROM cms WHERE id = 1 LIMIT 1`;
  } catch (err) {
    console.error("Failed to query cms table:", err.message);
    process.exit(1);
  }

  if (rows.length === 0) {
    console.log("No record found for id=1 in cms table (database is currently unseeded).");
    return;
  }

  const record = rows[0];
  const dataString = JSON.stringify(record.data);
  const dataHash = crypto.createHash("sha256").update(dataString).digest("hex");

  const snapshot = {
    snapshotType: "neon_cms_row",
    version: "1.0",
    capturedAt: new Date().toISOString(),
    id: record.id,
    updatedAt: record.updated_at,
    createdAt: record.created_at,
    dataHash,
    data: record.data,
  };

  const backupDir = path.resolve(process.cwd(), "backups", "cms_db_snapshots");
  fs.mkdirSync(backupDir, { recursive: true });

  const safeTs = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `cms_db_snapshot_${safeTs}.json`;
  const fullPath = path.join(backupDir, filename);

  fs.writeFileSync(fullPath, JSON.stringify(snapshot, null, 2));
  console.log(`✓ CMS Database snapshot successfully captured at:`);
  console.log(`  Path: ${fullPath}`);
  console.log(`  Server Updated At: ${record.updated_at}`);
  console.log(`  SHA-256 Hash: ${dataHash}`);
}

main().catch((err) => {
  console.error("CMS database backup encountered fatal error:", err);
  process.exit(1);
});
