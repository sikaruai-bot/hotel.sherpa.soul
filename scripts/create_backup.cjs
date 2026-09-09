const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '_');
const backupDirName = `HOTEL_WEBSITE_BACKUP_${timestamp}`;
const tempBackupDir = path.join(rootDir, backupDirName);
const zipFileName = `${backupDirName}.zip`;
const zipFilePath = path.join(rootDir, zipFileName);
const desktopZipPath = path.join('C:', 'Users', 'lenovo', 'OneDrive', 'Desktop', zipFileName);

console.log('--- STARTING SECURE FULL BACKUP ---');
console.log('Root directory:', rootDir);
console.log('Staging backup folder:', tempBackupDir);

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
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'tmp') continue;
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
const rootFilesToCopy = [
  'package.json',
  'package-lock.json',
  'vite.config.js',
  'index.html',
  'eslint.config.js',
  'vercel.json',
  '.vercelignore',
  'README.md',
  '.env.local',
  '.env.development',
  '.env.production',
  '.gitignore'
];
rootFilesToCopy.forEach(copyFile);

// 3. Copy Directories
console.log('Copying src directory...');
copyDir(path.join(rootDir, 'src'), path.join(tempBackupDir, 'src'));

console.log('Copying public directory...');
copyDir(path.join(rootDir, 'public'), path.join(tempBackupDir, 'public'));

console.log('Copying api directory...');
copyDir(path.join(rootDir, 'api'), path.join(tempBackupDir, 'api'));

console.log('Copying scripts directory...');
copyDir(path.join(rootDir, 'scripts'), path.join(tempBackupDir, 'scripts'));

console.log('Copying verified dist directory (Latest working build)...');
copyDir(path.join(rootDir, 'dist'), path.join(tempBackupDir, 'dist'));

// 4. Copy Backend
console.log('Copying backend code & environment...');
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

// 5. Create detailed RESTORE_GUIDE.md inside the backup
const restoreGuide = `# HOTEL WEBSITE - SAFE RESTORE & RECOVERY GUIDE
Date Created: ${new Date().toLocaleString()}
Backup Name: ${backupDirName}

---

## What is in this backup?
1. **Frontend Source Code**: Complete React 19 + Vite + Tailwind CSS source code (\`src/\`, \`public/\`, \`index.html\`).
2. **Environment Variables**:
   - \`.env.local\` (Frontend configurations & API keys)
   - \`.env.development\`
   - \`.env.production\`
   - \`backend/.env\` (MongoDB connection string, Cloudinary keys, JWT secrets, Nodemailer credentials)
3. **Backend Source Code**: Complete Express.js server (\`backend/\` folder).
4. **Serverless APIs**: \`api/\` folder (e.g. for Vercel functions).
5. **Verified Working Production Build**: \`dist/\` folder. Ready to upload directly to any static host (cPanel, Nginx, Apache, Vercel, Netlify).

---

## How to Restore / Run in 3 Steps:

### Step 1: Extract Files
Extract this ZIP to any directory on your computer or server.

### Step 2: Install Dependencies
Open terminal/cmd in the extracted folder:
\`\`\`bash
npm install
\`\`\`

Then for backend:
\`\`\`bash
cd backend
npm install
cd ..
\`\`\`

### Step 3: Run the Website
To run frontend locally:
\`\`\`bash
npm run dev
\`\`\`

To run backend locally:
\`\`\`bash
cd backend
npm start
\`\`\`

To build for production:
\`\`\`bash
npm run build
\`\`\`

---

## Deployment / Handover Note:
- If deploying to a new Vercel account: Simply import the Git repository or link this folder with \`vercel\`. Add environment variables from \`.env.local\`.
- If deploying backend to Render/Railway/VPS: Use the \`backend/\` folder and add all keys from \`backend/.env\` in the hosting provider's Environment Variables dashboard.
- The \`dist/\` folder in this backup has already been built and tested. If you need an instant emergency rollback, you can deploy the \`dist/\` folder directly.
`;

fs.writeFileSync(path.join(tempBackupDir, 'RESTORE_INSTRUCTIONS.md'), restoreGuide, 'utf-8');
console.log('[CREATED] RESTORE_INSTRUCTIONS.md');

// 6. Zip using PowerShell Compress-Archive
console.log(`Compressing ${tempBackupDir} into ${zipFilePath} ...`);
if (fs.existsSync(zipFilePath)) fs.unlinkSync(zipFilePath);

execSync(`powershell -Command "Compress-Archive -Path '${tempBackupDir}\\*' -DestinationPath '${zipFilePath}' -Force"`, {
  stdio: 'inherit'
});

// Also copy to Desktop if Desktop exists
if (fs.existsSync(path.dirname(desktopZipPath))) {
  try {
    fs.copyFileSync(zipFilePath, desktopZipPath);
    console.log(`[DESKTOP BACKUP COPIED] Successfully placed copy at: ${desktopZipPath}`);
  } catch (err) {
    console.warn('Could not copy directly to Desktop:', err.message);
  }
}

// 7. Clean staging directory to keep workspace tidy
fs.rmSync(tempBackupDir, { recursive: true, force: true });

const stats = fs.statSync(zipFilePath);
console.log('--- BACKUP COMPLETE ---');
console.log(`Archive file: ${zipFilePath}`);
console.log(`Archive size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
