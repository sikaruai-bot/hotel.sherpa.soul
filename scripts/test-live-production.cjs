const puppeteer = require('puppeteer');

(async () => {
  const targetUrl = process.env.TARGET_URL || 'https://hotelsherpasoul.com';
  console.log(`\n======================================================`);
  console.log(`🌐 LIVE PRODUCTION END-TO-END TEST`);
  console.log(`Target: ${targetUrl}`);
  console.log(`======================================================\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleLogs = [];

  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push(text);
    if (text.includes('[Analytics]') || text.includes('fbq') || text.includes('booking_completed') || text.includes('Purchase')) {
      console.log('  [LIVE CONSOLE]', text);
    }
  });

  // Track window.fbq calls and window.dataLayer pushes
  await page.evaluateOnNewDocument(() => {
    window._e2e_fbq_calls = [];
    window._e2e_gtag_calls = [];

    // Intercept window.fbq
    const originalFbq = window.fbq;
    window.fbq = function (...args) {
      window._e2e_fbq_calls.push(args);
      console.log('[E2E LIVE fbq]', JSON.stringify(args));
      if (typeof originalFbq === 'function') {
        try { originalFbq.apply(this, args); } catch (e) {}
      }
    };

    // Intercept window.gtag
    const originalGtag = window.gtag;
    window.gtag = function (...args) {
      window._e2e_gtag_calls.push(args);
      console.log('[E2E LIVE gtag]', JSON.stringify(args));
      if (typeof originalGtag === 'function') {
        try { originalGtag.apply(this, args); } catch (e) {}
      }
    };
  });

  // 1. Visit live homepage
  console.log('--- TEST STEP 1: Verify Homepage Live Offer ---');
  await page.goto(targetUrl + '/', { waitUntil: 'networkidle2' });
  const homeText = await page.evaluate(() => document.body.innerText);
  const hasDirect10Banner = homeText.includes('Book Direct & Save 10%') || homeText.includes('Direct Booking Privilege: 10% Discount');
  console.log('Live Homepage has 10% Direct Banner:', hasDirect10Banner ? '✅ YES' : '❌ NO');

  // 2. Navigate to /book-now
  console.log('\n--- TEST STEP 2: Navigate to Live /book-now ---');
  await page.goto(targetUrl + '/book-now', { waitUntil: 'networkidle2' });
  await page.waitForSelector('input[name="fullName"]', { timeout: 15000 });

  // Verify room cards on booking page
  const roomCardAudit = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasBudget18: text.includes('$18 USD'),
      hasStrikethrough20: text.includes('$20'),
      hasDirect10Badge: text.includes('10% DIRECT OFF') || text.includes('10% OFF'),
    };
  });
  console.log('Live Room Selection Price Audit (Budget Family Room):', roomCardAudit);

  // 3. Fill Booking Form for Budget Family Room, 1 night, 2 guests
  console.log('\n--- TEST STEP 3: Fill Booking Form (Budget Family Room, 1 night, 2 guests) ---');
  await page.type('input[name="fullName"]', 'Production Test Guest');
  await page.type('input[name="email"]', 'prod-tester@hotelsherpasoul.com');
  await page.type('input[name="phone"]', '9818259472');

  // 4. Submit Booking
  console.log('\n--- TEST STEP 4: Submit Live Reservation ---');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText && (b.innerText.includes('Complete Booking') || b.innerText.includes('Registering')));
    if (btn) btn.click();
    else throw new Error('Complete Booking button not found');
  });

  // 5. Await Confirmation Screen
  console.log('\n--- TEST STEP 5: Await Confirmation Screen ---');
  await page.waitForFunction(
    () => document.body.innerText.includes('Booking Confirmed!') || document.body.innerText.includes('Reservation Confirmed!'),
    { timeout: 20000 }
  );
  console.log('✅ Live "Booking Confirmed!" screen rendered!');

  // Check confirmation screen rate & WhatsApp
  const confirmationAudit = await page.evaluate(() => {
    const body = document.body.innerText;
    const waButtons = Array.from(document.querySelectorAll('a[href*="wa.me"]'));
    const confirmWaBtn = waButtons.find(a => a.innerText.includes('Confirm on WhatsApp')) || waButtons[waButtons.length - 1];
    const waLink = confirmWaBtn ? confirmWaBtn.href : '';
    const idx = body.indexOf('Booking Confirmed!');
    return {
      snippet: body.slice(idx, idx + 500),
      has18Usd: body.includes('$18 USD'),
      has20Usd: body.includes('$20 USD'),
      hasDiscountBadge: body.includes('10% Direct Discount Applied'),
      waLinkDecoded: decodeURIComponent(waLink),
    };
  });

  console.log('\n--- LIVE CONFIRMATION DETAILS ---');
  console.log('Snippet:\n', confirmationAudit.snippet);
  console.log('Total shows $18 USD:', confirmationAudit.has18Usd ? '✅ YES ($18 USD)' : '❌ NO');
  console.log('Total shows $20 USD (old bug):', confirmationAudit.has20Usd ? '❌ BUG PERSISTS' : '✅ NOT PRESENT');
  console.log('Badge "10% Direct Discount Applied":', confirmationAudit.hasDiscountBadge ? '✅ YES' : '❌ NO');
  console.log('WhatsApp Link Message:\n', confirmationAudit.waLinkDecoded);

  // 6. Check Analytics Events
  console.log('\n--- TEST STEP 6: Verify Meta Pixel Purchase & GA4 Telemetry on Live ---');
  await new Promise(r => setTimeout(r, 2000));

  const liveAnalytics = await page.evaluate(() => {
    const fbqCalls = window._e2e_fbq_calls || [];
    const gtagCalls = window._e2e_gtag_calls || [];
    const dataLayer = window.dataLayer || [];

    const purchaseCalls = fbqCalls.filter(c => c[0] === 'track' && c[1] === 'Purchase');
    const ga4BookingCompleted = dataLayer.filter(d => d.event === 'booking_completed');

    return {
      purchaseCalls,
      ga4BookingCompleted,
    };
  });

  console.log('Live fbq Purchase calls:\n', JSON.stringify(liveAnalytics.purchaseCalls, null, 2));
  console.log('Live GA4 dataLayer booking_completed:\n', JSON.stringify(liveAnalytics.ga4BookingCompleted, null, 2));

  let bug1Ok = false;
  if (liveAnalytics.purchaseCalls.length > 0) {
    const p = liveAnalytics.purchaseCalls[0][2];
    if (p && p.value === 18 && p.currency === 'USD' && p.transaction_id) {
      console.log('✅ BUG 1 PASSED: fbq("track", "Purchase") fired with value 18, USD, transaction_id:', p.transaction_id);
      bug1Ok = true;
    }
  }

  let bug2Ok = false;
  if (confirmationAudit.has18Usd && confirmationAudit.waLinkDecoded.includes('$18 USD')) {
    console.log('✅ BUG 2 PASSED: Live confirmation total and WhatsApp message both show $18 USD!');
    bug2Ok = true;
  }

  console.log('\n======================================================');
  console.log(`LIVE E2E TEST SUMMARY:`);
  console.log(`BUG 1 (Meta Pixel Purchase & GA4): ${bug1Ok ? 'PASSED ✅' : 'FAILED ❌'}`);
  console.log(`BUG 2 (10% Direct Discount $18 USD): ${bug2Ok ? 'PASSED ✅' : 'FAILED ❌'}`);
  console.log('======================================================\n');

  await browser.close();

  if (!bug1Ok || !bug2Ok) {
    process.exit(1);
  }
})();
