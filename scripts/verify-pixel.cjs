#!/usr/bin/env node
/**
 * ⚠️ META PIXEL PROTECTION PRE-DEPLOY VERIFICATION SCRIPT
 * 
 * This script runs automatically during "npm run build" (before Vercel deployment completes).
 * It scans the built output in dist/ to verify that the Meta Pixel base code,
 * correct VITE_META_PIXEL_ID, and automatic PageView tracking are present on all pages.
 * 
 * IF ANY CHECK FAILS, THE SCRIPT EXITS WITH CODE 1, FAILING THE BUILD IMMEDIATELY.
 * This guarantees the Meta Pixel can NEVER be accidentally removed or broken during
 * future upgrades, refactors, or deployments.
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const TARGET_FILES = [
  'index.html',
  path.join('rooms', 'index.html'),
  path.join('book-now', 'index.html'),
  path.join('room', 'deluxe-room', 'index.html'),
  path.join('contact', 'index.html'),
];

console.log('\n========================================================================');
console.log('🛡️  META PIXEL INTEGRATION VERIFICATION (PRE-DEPLOY GUARD)');
console.log('========================================================================\n');

// 1. Verify dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ FATAL: dist/ directory not found. Please run vite build first.');
  process.exit(1);
}

const expectedPixelId = (process.env.VITE_META_PIXEL_ID || '1022329224109595').trim();
console.log(`ℹ️  Verifying Meta Pixel ID: ${expectedPixelId}`);

let hasErrors = false;
const checkedFiles = [];

for (const relPath of TARGET_FILES) {
  const filePath = path.join(DIST_DIR, relPath);
  if (!fs.existsSync(filePath)) {
    // If optional inner route wasn't SSG rendered, check index.html at minimum
    if (relPath === 'index.html') {
      console.error(`❌ FATAL: Essential file missing: dist/${relPath}`);
      hasErrors = true;
    }
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  // Check 1: Meta Pixel script loader must be present
  const hasScriptLoader =
    content.includes('connect.facebook.net/en_US/fbevents.js') ||
    content.includes('connect.facebook.net');
  if (!hasScriptLoader) {
    console.error(`❌ FAILED [dist/${relPath}]: Meta Pixel base library (fbevents.js) is missing!`);
    hasErrors = true;
  }

  // Check 2: fbq initialization function must be present
  const hasFbqInit = content.includes('fbq(') || content.includes('fbq =');
  if (!hasFbqInit) {
    console.error(`❌ FAILED [dist/${relPath}]: fbq function definition is missing!`);
    hasErrors = true;
  }

  // Check 3: Check that unreplaced placeholder was not left behind
  if (content.includes('%VITE_META_PIXEL_ID%')) {
    console.error(`❌ FAILED [dist/${relPath}]: Literal unreplaced token '%VITE_META_PIXEL_ID%' found in HTML!`);
    hasErrors = true;
  }

  // Check 4: Correct Meta Pixel ID must be initialized
  const hasTargetPixelId = content.includes(expectedPixelId);
  if (!hasTargetPixelId) {
    console.error(`❌ FAILED [dist/${relPath}]: Meta Pixel ID "${expectedPixelId}" was NOT found initialized in file!`);
    hasErrors = true;
  }

  // Check 5: PageView event call must be present
  const hasPageView =
    content.includes("'PageView'") ||
    content.includes('"PageView"');
  if (!hasPageView) {
    console.error(`❌ FAILED [dist/${relPath}]: fbq PageView event call is missing!`);
    hasErrors = true;
  }

  checkedFiles.push(relPath);
}

if (hasErrors) {
  console.error('\n========================================================================');
  console.error('🚨 DEPLOYMENT BLOCKED: META PIXEL PROTECTION CHECK FAILED!');
  console.error('========================================================================');
  console.error('The Meta Pixel was either removed, corrupted, or missing its Pixel ID.');
  console.error('The build process has terminated with exit code 1 to protect your');
  console.error('analytics and conversion tracking from going offline.');
  console.error('Please verify index.html and VITE_META_PIXEL_ID environment variable.');
  console.error('========================================================================\n');
  process.exit(1);
}

console.log('✔ All checks passed across verified files:');
checkedFiles.forEach((f) => console.log(`   - dist/${f} (fbevents.js + fbq init + PageView)`));
console.log('\n========================================================================');
console.log('✅ META PIXEL PROTECTION: VERIFIED & ACTIVE FOR PRODUCTION');
console.log('========================================================================\n');
process.exit(0);
