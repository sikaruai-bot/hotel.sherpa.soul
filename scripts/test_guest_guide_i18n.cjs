const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');

// Simple static file server for dist
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  
  let filePath = path.join(DIST_DIR, reqPath);
  if (!path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    } else {
      filePath = path.join(DIST_DIR, 'index.html');
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

async function run() {
  await new Promise((resolve) => server.listen(4174, resolve));
  console.log('Test server running at http://localhost:4174');

  const os = require('os');
  const tempProfile = path.join(os.tmpdir(), 'puppeteer_test_' + Date.now());
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: tempProfile,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Test 1: Load /guest-guide
  await page.goto('http://localhost:4174/guest-guide', { waitUntil: 'networkidle0' });
  let html = await page.content();

  console.log('Testing English initial state...');
  if (!html.includes('Important Hotel Policies') || !html.includes('Save Energy')) {
    throw new Error('English content missing on initial load');
  }
  console.log('✓ Initial English content verified');

  // Helper to change language via UI click
  async function testLang(langLabel, expectedStrings) {
    console.log(`Testing switch to "${langLabel}" via UI click...`);
    
    // Click the language switcher trigger button
    await page.evaluate(() => {
      const switcherBtn = document.querySelector('button[title="Change language"]');
      if (switcherBtn) switcherBtn.click();
    });

    // Wait a moment for dropdown to render
    await new Promise(r => setTimeout(r, 400));

    // Find and click the button for the specific language in the dropdown
    const clicked = await page.evaluate((label) => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const target = buttons.find(b => {
        const text = b.textContent || '';
        return text.includes(label);
      });
      if (target) {
        target.click();
        return true;
      }
      return false;
    }, langLabel);

    if (!clicked) {
      throw new Error(`Could not find language option button with label "${langLabel}"`);
    }

    // Wait for the async locale chunk to fetch and React to re-render
    await new Promise((r) => setTimeout(r, 1200));

    const content = await page.content();
    for (const str of expectedStrings) {
      if (!content.includes(str)) {
        throw new Error(`Expected string "${str}" not found for language ${langLabel}`);
      }
    }
    console.log(`✓ Language "${langLabel}" successfully verified with ${expectedStrings.length} target strings!`);
  }

  // Nepali (NE)
  await testLang('नेपाली', ['महत्त्वपूर्ण होटल नियमहरू', 'ऊर्जा बचत गर्नुहोस्', 'खाना तथा खानपान', 'साझा भान्सा']);
  
  // Spanish (ES)
  await testLang('Español', ['Políticas Importantes del Hotel', 'Ahorre Energía', 'Comida y Restauración', 'Cocina Compartida']);
  
  // French (FR)
  await testLang('Français', ['Règlement Intérieur Important', 'Économisez l\'Énergie', 'Restauration', 'Cuisine Partagée']);

  // German (DE)
  await testLang('Deutsch', ['Wichtige Hotelrichtlinien', 'Energie Sparen', 'Gemeinschaftsküche', 'Ruhezeiten']);

  // Japanese (JA)
  await testLang('日本語', ['重要なホテルポリシー', '省エネへのご協力', 'お食事案内', '共用キッチン']);

  // Chinese (ZH)
  await testLang('中文', ['重要酒店政策', '节约能源', '餐饮指南', '共享厨房']);

  // Switch back to English (EN)
  await testLang('English', ['Important Hotel Policies', 'Save Energy', 'Shared Kitchen', 'Quiet Hours']);

  await browser.close();
  server.close();
  console.log('🎉 ALL MULTILINGUAL TESTS PASSED LOCALLY!');
}

run().catch((err) => {
  console.error('Test failed:', err);
  if (server) server.close();
  process.exit(1);
});
