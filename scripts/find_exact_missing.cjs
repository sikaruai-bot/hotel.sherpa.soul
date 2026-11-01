const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://hotelsherpasoul.com';

const TARGET_PAGES = [
  { path: '/rooms', name: 'Rooms' },
  { path: '/contact', name: 'Contact' },
  { path: '/about', name: 'About' },
  { path: '/', name: 'Home' },
  { path: '/gallery', name: 'Gallery' }
];

const TARGET_LANGS = [
  { code: 'es', label: 'Español' },
  { code: 'fra', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'rs', label: 'Русский' },
  { code: 'ar', label: 'العربية' },
  { code: 'ko', label: '한국어' },
  { code: 'he', label: 'עברית' },
];

const BRAND_TERMS = ['Hotel Sherpa Soul', 'Sherpa Soul', 'Thamel', 'Kathmandu', 'Nepal', 'Wi-Fi', 'AC', 'WhatsApp', 'Google'];

function isStringTranslated(currentStr, enStr, langCode) {
  if (!currentStr || !enStr) return false;
  const c = currentStr.trim();
  const e = enStr.trim();
  if (c.length < 3) return true;
  if (!/[a-zA-Z]/.test(e)) return true;
  if (BRAND_TERMS.includes(e) || e.includes('@') || e.startsWith('+977')) return true;
  
  const nonLatinLangs = ['ne', 'hi', 'ch', 'ja', 'ko', 'ar', 'he', 'rs', 'zh'];
  if (nonLatinLangs.includes(langCode)) {
    return /[^\u0000-\u007F]/.test(c);
  }
  return c.toLowerCase() !== e.toLowerCase();
}

async function findMissing() {
  const browser = await puppeteer.launch({
    headless: 'new',
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const missingReport = {};

  for (const p of TARGET_PAGES) {
    missingReport[p.name] = {};
    const url = `${BASE_URL}${p.path}`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.evaluate(() => {
      localStorage.setItem('i18nextLng', 'en');
      window.scrollTo(0, document.body.scrollHeight / 2);
    });
    await new Promise(r => setTimeout(r, 200));
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
    await new Promise(r => setTimeout(r, 200));
    await page.evaluate(() => { window.scrollTo(0, 0); });
    await new Promise(r => setTimeout(r, 400));

    const enBase = await page.evaluate(() => {
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

    for (const lang of TARGET_LANGS) {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight / 2); });
      await new Promise(r => setTimeout(r, 200));
      await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
      await new Promise(r => setTimeout(r, 200));
      await page.evaluate(() => { window.scrollTo(0, 0); });
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

      await new Promise(r => setTimeout(r, 1200));

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

      const unTranslated = [];
      const categories = ['hero', 'sections', 'body', 'cards', 'faq', 'buttons', 'footer'];
      for (const cat of categories) {
        const curList = current[cat] || [];
        const baseList = enBase[cat] || [];
        for (let i = 0; i < Math.min(curList.length, baseList.length); i++) {
          const cur = curList[i];
          const base = baseList[i];
          if (!base || base.length < 4) continue;
          if (!isStringTranslated(cur, base, lang.code)) {
            unTranslated.push({ cat, base, cur });
          }
        }
      }

      if (unTranslated.length > 0) {
        missingReport[p.name][lang.code] = unTranslated;
      }
    }
  }

  await browser.close();
  fs.writeFileSync(path.join(__dirname, 'missing_analysis.json'), JSON.stringify(missingReport, null, 2));
  console.log('Saved missing strings analysis to scripts/missing_analysis.json');
}

findMissing().catch(console.error);
