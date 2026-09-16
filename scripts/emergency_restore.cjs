const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const desktopDir = path.join('C:', 'Users', 'lenovo', 'OneDrive', 'Desktop');

console.log('==================================================');
console.log('  HOTEL SHERPA SOUL - EMERGENCY RESTORE SYSTEM   ');
console.log('==================================================');
console.log('Current directory:', rootDir);

function findLatestBackup() {
  const candidateDirs = [rootDir, desktopDir];
  let latestFile = null;
  let latestMtime = 0;

  for (const dir of candidateDirs) {
    if (!fs.existsSync(dir)) continue;
    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        if (file.startsWith('HOTEL_WEBSITE_BACKUP_') && file.endsWith('.zip')) {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);
          if (stat.mtimeMs > latestMtime) {
            latestMtime = stat.mtimeMs;
            latestFile = fullPath;
          }
        }
      }
    } catch (e) {
      // ignore read error
    }
  }

  return latestFile;
}

async function runEmergencyRestore() {
  const latestBackup = findLatestBackup();

  if (latestBackup) {
    const backupStats = fs.statSync(latestBackup);
    console.log(`\n📦 Latest Backup Archive Found:`);
    console.log(`   Path: ${latestBackup}`);
    console.log(`   Size: ${(backupStats.size / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`   Date: ${backupStats.mtime.toLocaleString()}`);
  } else {
    console.warn('\n⚠️ No HOTEL_WEBSITE_BACKUP_*.zip found on Desktop or Root. Proceeding with workspace self-repair.');
  }

  // 1. Verify Environment Files
  console.log('\n[1/5] Checking Critical Environment Files...');
  const envLocal = path.join(rootDir, '.env.local');
  const backendEnv = path.join(rootDir, 'backend', '.env');

  if (fs.existsSync(envLocal)) {
    console.log('   ✅ Frontend .env.local exists.');
  } else {
    console.warn('   ⚠️ .env.local missing! Checking for backup template...');
    if (fs.existsSync(path.join(rootDir, '.env.production'))) {
      fs.copyFileSync(path.join(rootDir, '.env.production'), envLocal);
      console.log('   ✅ Recreated .env.local from .env.production template.');
    }
  }

  if (fs.existsSync(backendEnv)) {
    console.log('   ✅ Backend .env exists.');
  } else {
    console.warn('   ⚠️ backend/.env missing! Please ensure database connection string is placed in backend/.env');
  }

  // 2. Verify Frontend Dependencies
  console.log('\n[2/5] Verifying Frontend Dependencies (npm install)...');
  try {
    if (!fs.existsSync(path.join(rootDir, 'node_modules'))) {
      console.log('   Installing missing frontend dependencies, please wait...');
      execSync('npm install --prefer-offline', { cwd: rootDir, stdio: 'inherit' });
    } else {
      console.log('   ✅ Frontend node_modules verified.');
    }
  } catch (err) {
    console.error('   ❌ Frontend dependency install issue:', err.message);
  }

  // 3. Verify Backend Dependencies
  console.log('\n[3/5] Verifying Backend Dependencies...');
  const backendDir = path.join(rootDir, 'backend');
  try {
    if (fs.existsSync(backendDir)) {
      if (!fs.existsSync(path.join(backendDir, 'node_modules'))) {
        console.log('   Installing missing backend dependencies, please wait...');
        execSync('npm install --prefer-offline', { cwd: backendDir, stdio: 'inherit' });
      } else {
        console.log('   ✅ Backend node_modules verified.');
      }
    }
  } catch (err) {
    console.error('   ❌ Backend dependency install issue:', err.message);
  }

  // 4. Test Production Build
  console.log('\n[4/5] Testing Production Build (npm run build)...');
  try {
    execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });
    console.log('   ✅ Production build successful! dist/ is ready for instant live deployment.');
  } catch (err) {
    console.error('   ❌ Build error detected:', err.message);
  }

  // 5. Database Snapshot Check
  console.log('\n[5/5] Checking Database Snapshots...');
  const dbSnapshotDir = path.join(rootDir, 'backups', 'db_snapshot');
  if (fs.existsSync(dbSnapshotDir)) {
    const files = fs.readdirSync(dbSnapshotDir);
    console.log(`   ✅ Database snapshot exists (${files.join(', ')}).`);
  } else {
    console.log('   ℹ️ No local database snapshot folder found. Running backup_database.cjs...');
    try {
      execSync('node scripts/backup_database.cjs', { cwd: rootDir, stdio: 'inherit' });
    } catch (e) {}
  }

  console.log('\n==================================================');
  console.log('     RESTORE & RECOVERY VERIFICATION COMPLETE     ');
  console.log('==================================================');
  console.log('To start website locally:');
  console.log('  1. Frontend: npm run dev');
  console.log('  2. Backend:  cd backend && npm start');
  console.log('\nTo deploy live directly to Vercel:');
  console.log('  npx vercel --prod');
  console.log('==================================================\n');
}

runEmergencyRestore().catch(console.error);
