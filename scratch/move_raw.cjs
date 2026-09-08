const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const backupDir = path.join(__dirname, 'original_images_backup');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

function processDir(dir, relDir = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(relDir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath, relPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const destPath = path.join(backupDir, relPath);
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.renameSync(fullPath, destPath);
        console.log(`Moved: ${relPath}`);
      }
    }
  }
}

processDir(publicDir);
console.log('All uncompressed raw images moved safely to backup!');
