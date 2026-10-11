#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");
const crypto = require("node:crypto");

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

async function main() {
  const args = process.argv.slice(2);
  const inputIndex = args.indexOf("--input");
  
  if (inputIndex === -1 || !args[inputIndex + 1]) {
    console.error("Usage: node scripts/restore_cms_db.cjs --input <snapshot-file.json>");
    process.exit(1);
  }

  const snapshotFile = path.resolve(process.cwd(), args[inputIndex + 1]);
  if (!fs.existsSync(snapshotFile)) {
    console.error(`Snapshot file not found at: ${snapshotFile}`);
    process.exit(1);
  }

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL environment variable is required to restore CMS database.");
    process.exit(1);
  }

  const raw = fs.readFileSync(snapshotFile, "utf8");
  let snapshot;
  try {
    snapshot = JSON.parse(raw);
  } catch (err) {
    console.error("Malformed JSON in snapshot file:", err.message);
    process.exit(1);
  }

  const payloadData = snapshot.data || snapshot;
  if (!payloadData || typeof payloadData !== "object" || Array.isArray(payloadData)) {
    console.error("Invalid snapshot: data must be a JSON object.");
    process.exit(1);
  }

  const snapshotUpdatedAt = snapshot.updatedAt || null;

  const { neon } = await import("@neondatabase/serverless");
  const sql = neon(process.env.DATABASE_URL);

  console.log("==================================================");
  console.log("       HOTEL SHERPA SOUL - CMS DB RESTORE         ");
  console.log("==================================================");
  console.log(`Source Snapshot: ${snapshotFile}`);
  console.log(`Snapshot Timestamp: ${snapshotUpdatedAt || "N/A"}`);

  // 1. Fetch current production state
  const currentRows = await sql`SELECT id, data, updated_at, created_at FROM cms WHERE id = 1 LIMIT 1`;
  const currentRowExists = currentRows.length > 0;
  const currentRow = currentRowExists ? currentRows[0] : null;

  if (currentRowExists) {
    console.log(`Current Production Row: id=1, updated_at=${currentRow.updated_at}`);

    // Create automatic safety backup before performing restore
    const safetyDir = path.resolve(process.cwd(), "backups", "cms_db_snapshots");
    fs.mkdirSync(safetyDir, { recursive: true });
    const safetyPath = path.join(safetyDir, `pre_restore_backup_${Date.now()}.json`);
    fs.writeFileSync(safetyPath, JSON.stringify({
      snapshotType: "pre_restore_backup",
      capturedAt: new Date().toISOString(),
      updatedAt: currentRow.updated_at,
      data: currentRow.data,
    }, null, 2));
    console.log(`✓ Automatic pre-restore backup saved to: ${safetyPath}`);

    // Check concurrency
    if (snapshotUpdatedAt) {
      const snapDate = new Date(snapshotUpdatedAt).getTime();
      const currDate = new Date(currentRow.updated_at).getTime();
      if (currDate > snapDate) {
        console.warn("\n⚠️ WARNING: The current database record is NEWER than the snapshot being restored!");
        console.warn(`  Current DB updated at: ${currentRow.updated_at}`);
        console.warn(`  Snapshot updated at:   ${snapshotUpdatedAt}`);
        console.warn("  Proceeding will overwrite newer live CMS edits.\n");
      }
    }
  } else {
    console.log("No existing record found for id=1 (database is empty).");
  }

  // 2. Explicit confirmation
  const confirmed = await askConfirmation(
    `Are you sure you want to RESTORE the CMS table from this snapshot? (Type 'yes' to confirm): `
  );

  if (!confirmed) {
    console.log("Restore operation aborted by user.");
    return;
  }

  // 3. Perform atomic restore
  if (currentRowExists) {
    await sql`
      UPDATE cms
      SET data = ${payloadData}, updated_at = now()
      WHERE id = 1
    `;
    console.log("✓ CMS record successfully restored (row 1 updated).");
  } else {
    await sql`
      INSERT INTO cms (id, data, updated_at, created_at)
      VALUES (1, ${payloadData}, now(), now())
    `;
    console.log("✓ CMS record successfully restored (row 1 created).");
  }

  console.log("==================================================");
  console.log("Database restore completed successfully.");
}

main().catch((err) => {
  console.error("Fatal error during database restore:", err);
  process.exit(1);
});
