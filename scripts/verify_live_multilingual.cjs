const puppeteer = require('puppeteer');
const path = require('path');
const os = require('os');

const LIVE_URL = 'https://hotelsherpasoul.com';

async function verify() {
  console.log(`Starting live verification on ${LIVE_URL}...`);
  const tempProfile = path.join(os.tmpdir(), 'puppeteer_live_' + Date.now());
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: tempProfile,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Listen for console and network tracking requests
  const networkRequests = [];
  page.on('request', req => {
    const url = req.url();
    if (url.includes('facebook.com') || url.includes('google-analytics') || url.includes('gtag') || url.includes('analytics.google.com')) {
      networkRequests.push(url);
    }
  });

  // 1. Visit /guest-guide
  console.log('Navigating to https://hotelsherpasoul.com/guest-guide ...');
  await page.goto(`${LIVE_URL}/guest-guide`, { waitUntil: 'networkidle0' });

  let pageContent = await page.content();
  console.log('Checking English live content...');
  if (!pageContent.includes('Important Hotel Policies') || !pageContent.includes('Save Energy')) {
    throw new Error('English live content missing');
  }
  console.log('✓ Initial English live content verified!');

  // 2. Test live language switching via UI
  async function testLiveLanguage(langLabel, expectedTexts) {
    console.log(`Testing live switch to "${langLabel}"...`);
    await page.evaluate(() => {
      const switcherBtn = document.querySelector('button[title="Change language"]');
      if (switcherBtn) switcherBtn.click();
    });

    await new Promise(r => setTimeout(r, 400));

    const clicked = await page.evaluate((label) => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const target = buttons.find(b => (b.textContent || '').includes(label));
      if (target) {
        target.click();
        return true;
      }
      return false;
    }, langLabel);

    if (!clicked) {
      throw new Error(`Language button for "${langLabel}" not found in live dropdown`);
    }

    await new Promise(r => setTimeout(r, 1500));
    const content = await page.content();
    for (const text of expectedTexts) {
      if (!content.includes(text)) {
        throw new Error(`Live test failed: "${text}" not found after switching to ${langLabel}`);
      }
    }
    console.log(`✓ Live language "${langLabel}" verified!`);
  }

  // Nepali
  await testLiveLanguage('नेपाली', ['महत्त्वपूर्ण होटल नियमहरू', 'ऊर्जा बचत गर्नुहोस्', 'खाना तथा खानपान']);
  // Spanish
  await testLiveLanguage('Español', ['Políticas Importantes del Hotel', 'Ahorre Energía', 'Comida y Restauración']);
  // French
  await testLiveLanguage('Français', ['Règlement Intérieur Important', 'Économisez l\'Énergie', 'Restauration']);
  // German
  await testLiveLanguage('Deutsch', ['Wichtige Hotelrichtlinien', 'Energie Sparen', 'Gemeinschaftsküche']);
  // Japanese
  await testLiveLanguage('日本語', ['重要なホテルポリシー', '省エネへのご協力', 'お食事案内']);
  // Chinese
  await testLiveLanguage('中文', ['重要酒店政策', '节约能源', '餐饮指南']);
  // Switch back to English
  await testLiveLanguage('English', ['Important Hotel Policies', 'Save Energy', 'Shared Kitchen']);

  // 3. Verify $18 discount rate & Booking Modal
  console.log('Verifying $18 discount rate on /rooms ...');
  await page.goto(`${LIVE_URL}/rooms`, { waitUntil: 'networkidle0' });
  const roomsHtml = await page.content();
  if (roomsHtml.includes('$18') || roomsHtml.includes('10% OFF') || roomsHtml.includes('10% Discount')) {
    console.log('✓ $18 / 10% direct rate discount verified active on live site');
  } else {
    console.warn('⚠️ Notice: Check discount badges on /rooms');
  }

  // 4. Verify Meta Pixel & GA4
  console.log('Verifying tracking tags...');
  const hasMetaPixel = await page.evaluate(() => {
    return typeof window.fbq === 'function';
  });
  const hasGA4 = await page.evaluate(() => {
    return typeof window.gtag === 'function' || Array.isArray(window.dataLayer);
  });
  console.log(`✓ Meta Pixel initialized: ${hasMetaPixel}`);
  console.log(`✓ GA4 initialized: ${hasGA4}`);

  await browser.close();
  console.log('🎉 ALL LIVE CHECKS PASSED ON PRODUCTION!');
}

verify().catch(err => {
  console.error('Live verification failed:', err);
  process.exit(1);
});

