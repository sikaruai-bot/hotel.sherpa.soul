const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');

// Formatted timestamp: YYYY_MM_DD_HHmm
const now = new Date();
const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '_');
const timeStr = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
const backupDirName = `HOTEL_WEBSITE_BACKUP_${dateStr}_${timeStr}`;

const tempBackupDir = path.join(rootDir, backupDirName);
const zipFileName = `${backupDirName}.zip`;
const zipFilePath = path.join(rootDir, zipFileName);
const desktopZipPath = path.join('C:', 'Users', 'lenovo', 'OneDrive', 'Desktop', zipFileName);

console.log('=====================================================');
console.log('    HOTEL SHERPA SOUL - SECURE FULL BACKUP SYSTEM    ');
console.log('=====================================================');
console.log('Root directory:', rootDir);
console.log('Backup archive name:', zipFileName);

// 0. Take Database JSON Snapshot First
console.log('\n[STEP 1/6] Exporting latest MongoDB database snapshot...');
try {
  const dbBackupScript = path.join(rootDir, 'scripts', 'backup_database.cjs');
  if (fs.existsSync(dbBackupScript)) {
    execSync(`node "${dbBackupScript}"`, { cwd: rootDir, stdio: 'inherit' });
  }
} catch (dbErr) {
  console.warn('⚠️ Database export notice:', dbErr.message);
}

// 1. Ensure staging directory is clean
if (fs.existsSync(tempBackupDir)) {
  fs.rmSync(tempBackupDir, { recursive: true, force: true });
}
fs.mkdirSync(tempBackupDir, { recursive: true });

// Helper to copy recursively
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (
      entry.name === 'node_modules' ||
      entry.name === '.git' ||
      entry.name === 'tmp' ||
      entry.name.startsWith('HOTEL_WEBSITE_BACKUP_')
    ) {
      continue;
    }
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyFile(relPath) {
  const src = path.join(rootDir, relPath);
  const dest = path.join(tempBackupDir, relPath);
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log(`[COPIED] ${relPath}`);
  } else {
    console.warn(`[SKIPPED/NOT FOUND] ${relPath}`);
  }
}

// 2. Copy Root Files
console.log('\n[STEP 2/6] Copying configurations and environment files...');
const rootFilesToCopy = [
  'package.json',
  'package-lock.json',
  'vite.config.js',
  'index.html',
  'eslint.config.js',
  'vercel.json',
  '.vercelignore',
  'README.md',
  'restore.bat',
  '.env.local',
  '.env.development',
  '.env.production',
  '.gitignore',
  'EMERGENCY_RECOVERY_GUIDE.md'
];
rootFilesToCopy.forEach(copyFile);

// 3. Copy Directories
console.log('\n[STEP 3/6] Copying source code and assets...');
console.log(' - Copying src directory...');
copyDir(path.join(rootDir, 'src'), path.join(tempBackupDir, 'src'));

console.log(' - Copying public directory...');
copyDir(path.join(rootDir, 'public'), path.join(tempBackupDir, 'public'));

console.log(' - Copying api directory...');
copyDir(path.join(rootDir, 'api'), path.join(tempBackupDir, 'api'));

console.log(' - Copying scripts directory...');
copyDir(path.join(rootDir, 'scripts'), path.join(tempBackupDir, 'scripts'));

console.log(' - Copying database snapshots (backups/)...');
copyDir(path.join(rootDir, 'backups'), path.join(tempBackupDir, 'backups'));

console.log(' - Copying verified production dist directory...');
copyDir(path.join(rootDir, 'dist'), path.join(tempBackupDir, 'dist'));

// 4. Copy Backend
console.log('\n[STEP 4/6] Copying backend server and configurations...');
const backendSrc = path.join(rootDir, 'backend');
const backendDest = path.join(tempBackupDir, 'backend');
fs.mkdirSync(backendDest, { recursive: true });

const backendFiles = [
  'app.js',
  'index.js',
  'package.json',
  'package-lock.json',
  '.env',
  '.gitignore',
  'testMail.js'
];
backendFiles.forEach(f => {
  const s = path.join(backendSrc, f);
  if (fs.existsSync(s)) {
    fs.copyFileSync(s, path.join(backendDest, f));
    console.log(`[COPIED] backend/${f}`);
  }
});

const backendDirs = [
  'Controllers',
  'Database',
  'Helpers',
  'Middlewares',
  'Models',
  'Routes'
];
backendDirs.forEach(d => {
  copyDir(path.join(backendSrc, d), path.join(backendDest, d));
});

// 5. Create detailed RESTORE_INSTRUCTIONS.md inside the backup
console.log('\n[STEP 5/6] Generating bilingual restore documentation...');
const restoreGuide = `# HOTEL SHERPA SOUL - INSTANT RESTORE & DISASTER RECOVERY GUIDE
(होटल शेर्पा सोल - आपतकालीन रिस्टोर तथा रिकभरी गाइड)

📅 Backup Date & Time: ${now.toLocaleString()}
📦 Backup Name: ${backupDirName}

---

## 🇳🇵 नेपालीमा तत्काल रिस्टोर गर्ने सजिलो ३ तरिका:

### तरिका १: Windows मा १-क्लिक अटोमेटिक रिस्टोर
1. यो ZIP फाइललाई आफ्नो कम्प्युटरको कुनै पनि फोल्डरमा Extract (अनजिप) गर्नुहोस्।
2. फोल्डरभित्र रहेको **\`restore.bat\`** फाइलमा डबल-क्लिक गर्नुहोस्!
3. यसले सबै डिपेन्डेन्सी स्वतः इन्स्टल गरी बिल्ड तयार गरिदिनेछ।

### तरिका २: कमान्डबाट लोकल चलाउने
\`\`\`bash
# १. डिपेन्डेन्सी इन्स्टल
npm install

# २. ब्याकइन्ड डिपेन्डेन्सी इन्स्टल
cd backend
npm install
cd ..

# ३. वेबसाइट सुरु गर्ने
npm run dev
\`\`\`

### तरिका ३: Vercel मा सिधै लाइभ गर्ने
\`\`\`bash
npx vercel --prod
\`\`\`
*(वा Vercel ड्यासबोर्डमा यो फोल्डर वा GitHub रिपोजिटरी इम्पार्ट गर्नुहोस्)*

---

## 🇬🇧 English Recovery Instructions:

### Step 1: Extract Files
Extract this ZIP archive into any folder on your computer or cloud server.

### Step 2: Automated 1-Click Restore
Double-click **\`restore.bat\`** on Windows, OR run:
\`\`\`bash
npm run restore
\`\`\`

### Step 3: Run Locally or Deploy
- **Frontend Local**: \`npm run dev\`
- **Backend Local**: \`cd backend && npm start\`
- **Instant Vercel Live**: \`npx vercel --prod\`

---

## 📂 Backup Contents Summary:
1. **Frontend Source Code**: Complete React 19 + Tailwind CSS source code (\`src/\`, \`public/\`, \`index.html\`).
2. **Backend Express Server**: Hardened API server with Helmet & Rate-Limiting (\`backend/\`).
3. **Verified Production Build**: Pre-compiled and ready-to-deploy \`dist/\` folder.
4. **Database Snapshots**: Fresh JSON exports of all rooms and guest bookings (\`backups/db_snapshot/\`).
5. **Environment Configurations**: Complete \`.env.local\` and \`backend/.env\` credentials.
`;

fs.writeFileSync(path.join(tempBackupDir, 'RESTORE_INSTRUCTIONS.md'), restoreGuide, 'utf-8');
console.log('[CREATED] RESTORE_INSTRUCTIONS.md');

// 6. Zip using PowerShell Compress-Archive
console.log(`\n[STEP 6/6] Compressing archive into ${zipFilePath} ...`);
if (fs.existsSync(zipFilePath)) fs.unlinkSync(zipFilePath);

execSync(`powershell -Command "Compress-Archive -Path '${tempBackupDir}\\*' -DestinationPath '${zipFilePath}' -Force"`, {
  stdio: 'inherit'
});

// Also copy to Desktop if Desktop exists
if (fs.existsSync(path.dirname(desktopZipPath))) {
  try {
    fs.copyFileSync(zipFilePath, desktopZipPath);
    console.log(`\n[DESKTOP BACKUP COPIED] Successfully placed copy at:\n  -> ${desktopZipPath}`);
  } catch (err) {
    console.warn('Could not copy directly to Desktop:', err.message);
  }
}

// Clean staging directory to keep workspace tidy
fs.rmSync(tempBackupDir, { recursive: true, force: true });

const stats = fs.statSync(zipFilePath);
console.log('\n=====================================================');
console.log('             FULL BACKUP COMPLETED SUCCESSFULLY      ');
console.log('=====================================================');
console.log(`Archive file: ${zipFilePath}`);
console.log(`Archive size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
console.log('=====================================================\n');
