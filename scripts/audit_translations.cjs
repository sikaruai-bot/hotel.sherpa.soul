const puppeteer = require('puppeteer');
const path = require('path');
const os = require('os');
const fs = require('fs');

const BASE_URL = 'https://hotelsherpasoul.com';

const PAGES = [
  { path: '/', name: 'Home' },
  { path: '/rooms', name: 'Rooms' },
  { path: '/about', name: 'About' },
  { path: '/gallery', name: 'Gallery' },
  { path: '/blog', name: 'Blog' },
  { path: '/contact', name: 'Contact' },
  { path: '/services', name: 'Services' },
];

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ne', label: 'नेपाली' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'es', label: 'Español' },
  { code: 'fra', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'rs', label: 'Русский' },
  { code: 'ch', label: '中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'ar', label: 'العربية' },
  { code: 'he', label: 'עברית' },
];

// Untranslated brand terms to ignore during string matching
const BRAND_TERMS = ['Hotel Sherpa Soul', 'Sherpa Soul', 'Thamel', 'Kathmandu', 'Nepal', 'Wi-Fi', 'AC', 'WhatsApp', 'Google'];

function isStringTranslated(currentStr, enStr, langCode) {
  if (!currentStr || !enStr) return false;
  const c = currentStr.trim();
  const e = enStr.trim();
  if (c.length < 3) return true; // short acronyms or numbers
  if (!/[a-zA-Z]/.test(e)) return true; // purely numbers or symbols
  if (BRAND_TERMS.includes(e) || e.includes('@') || e.startsWith('+977')) return true;
  
  // Non-Latin scripts check: if target language is non-Latin, any non-Latin char means translated
  const nonLatinLangs = ['ne', 'hi', 'ch', 'ja', 'ko', 'ar', 'he', 'rs', 'zh'];
  if (nonLatinLangs.includes(langCode)) {
    // Check if contains non-ASCII characters
    return /[^\u0000-\u007F]/.test(c);
  }
  
  // For Latin languages (es, fra, de, it, pt, nl): compare directly with English baseline
  return c.toLowerCase() !== e.toLowerCase();
}

async function runAudit() {
  console.log(`Starting Translation-Coverage Audit on ${BASE_URL}...`);
  const browser = await puppeteer.launch({
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // Step 1: Collect English Baselines for each page
  console.log('--- Collecting English Baselines ---');
  const baselines = {};

  for (const p of PAGES) {
    const url = `${BASE_URL}${p.path}`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    // Ensure English and trigger deferred sections
    await page.evaluate(() => {
      localStorage.setItem('i18nextLng', 'en');
      window.scrollTo(0, document.body.scrollHeight / 2);
    });
    await new Promise(r => setTimeout(r, 200));
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await new Promise(r => setTimeout(r, 200));
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await new Promise(r => setTimeout(r, 500));

    // Extract elements
    baselines[p.path] = await page.evaluate(() => {
      const getText = sel => Array.from(document.querySelectorAll(sel)).map(el => el.innerText.trim()).filter(Boolean);
      return {
        hero: getText('h1, [data-testid="hero-title"], .hero-title'),
        sections: getText('main h2, section h2, main h3'),
        body: getText('main p, section p'),
        cards: getText('.room-card, [data-testid="room-card"], .grid > div, .card'),
        faq: getText('[data-testid="faq-item"], .faq-item, details, summary'),
        buttons: getText('main button, main a.btn, main a[role="button"], header button, .cta-button'),
        footer: getText('footer p, footer a, footer h3, footer span')
      };
    });
    console.log(`✓ Baseline captured for ${p.name} (${p.path})`);
  }

  // Step 2: Test Each Page x Language
  const auditResults = [];

  for (const p of PAGES) {
    console.log(`\nAuditing page: ${p.name} (${p.path}) ...`);
    const enBase = baselines[p.path];

    for (const lang of LANGUAGES) {
      if (lang.code === 'en') {
        auditResults.push({
          page: p.name,
          path: p.path,
          lang: 'en',
          hero: '✅',
          sections: '✅',
          body: '✅',
          cards: '✅',
          faq: enBase.faq.length > 0 ? '✅' : 'N/A',
          buttons: '✅',
          footer: '✅',
          coverage: '100%'
        });
        continue;
      }

      // Switch language
      await page.goto(`${BASE_URL}${p.path}`, { waitUntil: 'networkidle0', timeout: 30000 });
      // Trigger lazy deferred sections
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight / 2);
      });
      await new Promise(r => setTimeout(r, 200));
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await new Promise(r => setTimeout(r, 200));
      await page.evaluate(() => {
        window.scrollTo(0, 0);
      });
      await new Promise(r => setTimeout(r, 300));

      const switcherBtn = await page.$('button[title="Change language"]');
      if (switcherBtn) await switcherBtn.click();
      await new Promise(r => setTimeout(r, 400));

      await page.evaluate((label) => {
        const dropdown = document.querySelector('[class*="max-h-80"]') || document.body;
        const buttons = Array.from(dropdown.querySelectorAll('button'));
        const target = buttons.find(b => (b.textContent || '').includes(label));
        if (target) target.click();
      }, lang.label);

      // Wait for bundle download and hydration
      await new Promise(r => setTimeout(r, 1200));

      // Extract current text
      const current = await page.evaluate(() => {
        const getText = sel => Array.from(document.querySelectorAll(sel)).map(el => el.innerText.trim()).filter(Boolean);
        return {
          hero: getText('h1, [data-testid="hero-title"], .hero-title'),
          sections: getText('main h2, section h2, main h3'),
          body: getText('main p, section p'),
          cards: getText('.room-card, [data-testid="room-card"], .grid > div, .card'),
          faq: getText('[data-testid="faq-item"], .faq-item, details, summary'),
          buttons: getText('main button, main a.btn, main a[role="button"], header button, .cta-button'),
          footer: getText('footer p, footer a, footer h3, footer span')
        };
      });

      // Score each category
      function scoreCategory(currentList, baseList) {
        if (!baseList || baseList.length === 0) return { status: 'N/A', ratio: 1.0 };
        let transCount = 0;
        let compCount = 0;
        for (let i = 0; i < Math.min(currentList.length, baseList.length); i++) {
          const cur = currentList[i];
          const base = baseList[i];
          if (!base || base.length < 4) continue;
          compCount++;
          if (isStringTranslated(cur, base, lang.code)) {
            transCount++;
          }
        }
        if (compCount === 0) return { status: 'N/A', ratio: 1.0 };
        const ratio = transCount / compCount;
        let status = '❌';
        if (ratio >= 0.75) status = '✅';
        else if (ratio >= 0.25) status = '⚠️';
        return { status, ratio };
      }

      const heroScore = scoreCategory(current.hero, enBase.hero);
      const secScore = scoreCategory(current.sections, enBase.sections);
      const bodyScore = scoreCategory(current.body, enBase.body);
      const cardScore = scoreCategory(current.cards, enBase.cards);
      const faqScore = scoreCategory(current.faq, enBase.faq);
      const btnScore = scoreCategory(current.buttons, enBase.buttons);
      const footScore = scoreCategory(current.footer, enBase.footer);

      // Average valid ratios
      const validRatios = [heroScore, secScore, bodyScore, cardScore, faqScore, btnScore, footScore]
        .filter(s => s.status !== 'N/A')
        .map(s => s.ratio);
      
      const avgRatio = validRatios.length > 0 ? (validRatios.reduce((a, b) => a + b, 0) / validRatios.length) : 0;
      const coveragePct = Math.round(avgRatio * 100);

      auditResults.push({
        page: p.name,
        path: p.path,
        lang: lang.code,
        hero: heroScore.status,
        sections: secScore.status,
        body: bodyScore.status,
        cards: cardScore.status,
        faq: faqScore.status,
        buttons: btnScore.status,
        footer: footScore.status,
        coverage: `${coveragePct}%`
      });

      process.stdout.write(`  [${lang.code}] ${coveragePct}% `);
    }
    console.log('');
  }

  await browser.close();

  // Print results as JSON and Markdown Table
  console.log('\n================ AUDIT SUMMARY TABLE ================');
  console.log('| Page | Language | Hero | Sections | Body | Cards | FAQ | Buttons | Footer | Coverage % |');
  console.log('| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |');
  for (const r of auditResults) {
    console.log(`| ${r.page} (${r.path}) | ${r.lang} | ${r.hero} | ${r.sections} | ${r.body} | ${r.cards} | ${r.faq} | ${r.buttons} | ${r.footer} | ${r.coverage} |`);
  }

  const outFile = process.argv[2] || 'audit_results_after.json';
  const outPath = path.resolve(__dirname, outFile);
  fs.writeFileSync(outPath, JSON.stringify(auditResults, null, 2), 'utf-8');
  console.log(`\nAudit saved to ${outPath}`);
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
