const fs = require('fs');
const path = require('path');

let mongoose;
try {
  mongoose = require('mongoose');
} catch (e) {
  try {
    mongoose = require(path.resolve(__dirname, '..', 'backend', 'node_modules', 'mongoose'));
  } catch (err) {
    console.warn('Mongoose package not found in backend or root.');
  }
}


// Load environment variables from backend/.env
const backendEnvPath = path.resolve(__dirname, '..', 'backend', '.env');
let dotenv;
try {
  dotenv = require('dotenv');
} catch (e) {
  try {
    dotenv = require(path.resolve(__dirname, '..', 'backend', 'node_modules', 'dotenv'));
  } catch (err) {}
}

if (dotenv && fs.existsSync(backendEnvPath)) {
  dotenv.config({ path: backendEnvPath });
} else if (dotenv) {
  dotenv.config();
}


const mongoUri = process.env.MONGODB_URL;
const outputDir = path.resolve(__dirname, '..', 'backups', 'db_snapshot');

async function backupDatabase() {
  console.log('--- STARTING DATABASE SNAPSHOT EXPORT ---');

  if (!mongoUri) {
    console.warn('⚠️ MONGODB_URL not found in backend/.env. Skipping database JSON export.');
    return { success: false, reason: 'No MONGODB_URL found' };
  }

  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log('Connecting to MongoDB database...');
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
    });

    const db = conn.connection.db;
    const collections = await db.listCollections().toArray();

    console.log(`Found ${collections.length} database collections.`);
    const exportedSummary = [];

    for (const collInfo of collections) {
      const collName = collInfo.name;
      try {
        const docs = await db.collection(collName).find({}).toArray();
        const exportFilePath = path.join(outputDir, `${collName}.json`);
        fs.writeFileSync(exportFilePath, JSON.stringify(docs, null, 2), 'utf-8');
        console.log(`✅ Exported collection [${collName}]: ${docs.length} documents -> ${collName}.json`);
        exportedSummary.push({ collection: collName, count: docs.length });
      } catch (collErr) {
        console.warn(`Could not export collection ${collName}:`, collErr.message);
      }
    }

    // Write a metadata info file
    const meta = {
      exportTimestamp: new Date().toISOString(),
      exportLocalTime: new Date().toLocaleString(),
      collections: exportedSummary,
    };
    fs.writeFileSync(path.join(outputDir, 'SNAPSHOT_META.json'), JSON.stringify(meta, null, 2), 'utf-8');

    await mongoose.disconnect();
    console.log('✅ Database JSON Snapshot complete! Saved to:', outputDir);
    return { success: true, count: exportedSummary.length };
  } catch (error) {
    console.warn('⚠️ Warning: MongoDB backup failed or timed out:', error.message);
    return { success: false, error: error.message };
  }
}

// Allow standalone execution: node scripts/backup_database.cjs
if (require.main === module) {
  backupDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { backupDatabase };
