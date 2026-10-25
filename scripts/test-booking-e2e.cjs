const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Starting E2E Puppeteer Verification for Bug 1 and Bug 2...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleLogs = [];

  // Capture all console messages
  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push(text);
    if (text.includes('[Analytics]') || text.includes('fbq') || text.includes('booking_completed') || text.includes('Purchase')) {
      console.log('  [BROWSER CONSOLE]', text);
    }
  });

  // Track window.fbq calls and window.dataLayer pushes
  await page.evaluateOnNewDocument(() => {
    window._e2e_fbq_calls = [];
    window._e2e_gtag_calls = [];

    // Intercept or hook window.fbq
    const originalFbq = window.fbq;
    window.fbq = function (...args) {
      window._e2e_fbq_calls.push(args);
      console.log('[E2E HOOK fbq]', JSON.stringify(args));
      if (typeof originalFbq === 'function') {
        try { originalFbq.apply(this, args); } catch (e) {}
      }
    };

    // Intercept window.gtag
    const originalGtag = window.gtag;
    window.gtag = function (...args) {
      window._e2e_gtag_calls.push(args);
      console.log('[E2E HOOK gtag]', JSON.stringify(args));
      if (typeof originalGtag === 'function') {
        try { originalGtag.apply(this, args); } catch (e) {}
      }
    };
  });

  // Test 1: Load Homepage and verify Direct Offer banner
  console.log('\n--- STEP 1: Verify Homepage Direct Booking Offer ---');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  const pageTitle = await page.title();
  console.log('Page Title:', pageTitle);

  // Check if Direct Booking banner text exists
  const bodyText = await page.evaluate(() => document.body.innerText);
  const hasDirectBanner = bodyText.includes('Book Direct & Save 10%') || bodyText.includes('Direct Booking Privilege: 10% Discount');
  console.log('Has "Book Direct & Save 10%" banner/button:', hasDirectBanner ? '✅ YES' : '❌ NO');

  // Test 2: Navigate to Book Now Page
  console.log('\n--- STEP 2: Navigate to /book-now ---');
  await page.goto('http://localhost:5173/book-now', { waitUntil: 'networkidle2' });
  await page.waitForSelector('input[name="fullName"]', { timeout: 10000 });

  // Verify room selection prices: Budget Family Room should be $18 USD (strikethrough $20)
  const roomPrices = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasBudget18: text.includes('$18 USD'),
      hasStrikethrough20: text.includes('$20'),
      hasDirectOff: text.includes('10% DIRECT OFF') || text.includes('10% OFF'),
    };
  });
  console.log('Budget Family Room price checks in selection:', roomPrices);

  // Check Estimated Total for Budget Family Room (default 1 night, 1 room)
  const estimatedTotal = await page.evaluate(() => {
    const el = document.querySelector('.bg-gradient-to-r.from-amber-50');
    return el ? el.innerText : 'Not found';
  });
  console.log('Estimated Total text:\n', estimatedTotal);

  // Fill in form details for Budget Family Room (1 night, 2 guests)
  console.log('\n--- STEP 3: Fill Booking Form for Budget Family Room (1 night, 2 guests) ---');
  await page.type('input[name="fullName"]', 'Antigravity Live Tester');
  await page.type('input[name="email"]', 'tester@sherpasoul.com');
  await page.type('input[name="phone"]', '9818259472');

  // Submit the booking form
  console.log('\n--- STEP 4: Submit Booking Form ---');
  const clicked = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText && (b.innerText.includes('Complete Booking') || b.innerText.includes('Registering')));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  console.log('Complete Booking clicked:', clicked);

  // Wait for Confirmation screen: "Booking Confirmed!"
  console.log('\n--- STEP 5: Await Confirmation Screen ---');
  await page.waitForFunction(
    () => document.body.innerText.includes('Booking Confirmed!') || document.body.innerText.includes('Reservation Confirmed!'),
    { timeout: 15000 }
  );
  console.log('✅ "Booking Confirmed!" screen rendered successfully!');

  // Check Confirmation Screen details
  const confirmationDetails = await page.evaluate(() => {
    const body = document.body.innerText;
    const waButtons = Array.from(document.querySelectorAll('a[href*="wa.me"]'));
    const confirmWaBtn = waButtons.find(a => a.innerText.includes('Confirm on WhatsApp')) || waButtons[waButtons.length - 1];
    const waLink = confirmWaBtn ? confirmWaBtn.href : '';
    const idx = body.indexOf('Booking Confirmed!');
    return {
      bodySnippet: body.slice(idx, idx + 600),
      has18Usd: body.includes('$18 USD'),
      has20Usd: body.includes('$20 USD'),
      hasDiscountBadge: body.includes('10% Direct Discount Applied'),
      waLinkDecoded: decodeURIComponent(waLink),
    };
  });

  console.log('\n--- CONFIRMATION SCREEN AUDIT ---');
  console.log('Snippet:', confirmationDetails.bodySnippet);
  console.log('Has $18 USD Total:', confirmationDetails.has18Usd ? '✅ YES ($18 USD)' : '❌ NO');
  console.log('Has $20 USD Total (Bug 2 check):', confirmationDetails.has20Usd ? '❌ FAILED ($20 USD still present)' : '✅ PASS ($20 not showing as total)');
  console.log('Has "10% Direct Discount Applied" badge:', confirmationDetails.hasDiscountBadge ? '✅ YES' : '❌ NO');
  console.log('WhatsApp Link:\n', confirmationDetails.waLinkDecoded);

  // Check Analytics Events
  console.log('\n--- STEP 6: Verify Meta Pixel Purchase & GA4 booking_completed Telemetry ---');
  // Wait a moment for effects to execute
  await new Promise(r => setTimeout(r, 1500));

  const analyticsAudit = await page.evaluate(() => {
    const fbqCalls = window._e2e_fbq_calls || [];
    const gtagCalls = window._e2e_gtag_calls || [];
    const dataLayer = window.dataLayer || [];

    const purchaseCalls = fbqCalls.filter(c => c[0] === 'track' && c[1] === 'Purchase');
    const ga4BookingCalls = gtagCalls.filter(c => c[0] === 'event' && c[1] === 'booking_completed');
    const ga4PurchaseCalls = gtagCalls.filter(c => c[0] === 'event' && c[1] === 'purchase');
    const dataLayerBookingCompleted = dataLayer.filter(d => d.event === 'booking_completed');
    const dataLayerPurchase = dataLayer.filter(d => d.event === 'purchase');

    return {
      fbqPurchaseCalls: purchaseCalls,
      ga4BookingCompleted: ga4BookingCalls,
      ga4Purchase: ga4PurchaseCalls,
      dataLayerBookingCompleted,
      dataLayerPurchase,
    };
  });

  console.log('\n[META PIXEL FBQ CALLS]:', JSON.stringify(analyticsAudit.fbqPurchaseCalls, null, 2));
  console.log('\n[GA4 GTAG CALLS]:', JSON.stringify(analyticsAudit.ga4BookingCompleted, null, 2));
  console.log('\n[GA4 DATA LAYER]:', JSON.stringify(analyticsAudit.dataLayerBookingCompleted, null, 2));

  let bug1Passed = false;
  if (analyticsAudit.fbqPurchaseCalls.length > 0) {
    const purchase = analyticsAudit.fbqPurchaseCalls[0][2];
    if (purchase && purchase.value === 18 && purchase.currency === 'USD' && purchase.transaction_id) {
      console.log('✅ BUG 1 FIX VERIFIED: fbq("track", "Purchase") fired with value: 18, currency: "USD", transaction_id:', purchase.transaction_id);
      bug1Passed = true;
    } else {
      console.log('⚠️ fbq Purchase fired but parameters unexpected:', purchase);
    }
  } else {
    console.log('❌ BUG 1 FAILED: fbq("track", "Purchase") did NOT fire!');
  }

  let bug2Passed = false;
  if (confirmationDetails.has18Usd && confirmationDetails.waLinkDecoded.includes('$18 USD')) {
    console.log('✅ BUG 2 FIX VERIFIED: Total shows $18 USD (10% direct discount off $20) in confirmation and WhatsApp!');
    bug2Passed = true;
  } else {
    console.log('❌ BUG 2 FAILED: Total rate is not $18 USD in confirmation / WhatsApp');
  }

  console.log('\n==========================================');
  console.log(`FINAL RESULT: BUG 1: ${bug1Passed ? 'PASSED ✅' : 'FAILED ❌'} | BUG 2: ${bug2Passed ? 'PASSED ✅' : 'FAILED ❌'}`);
  console.log('==========================================\n');

  await browser.close();

  if (!bug1Passed || !bug2Passed) {
    process.exit(1);
  }
})();
