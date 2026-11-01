const puppeteer = require('puppeteer');

const testLangs = [
  { code: 'ne', native: 'नेपाली' },
  { code: 'hi', native: 'हिन्दी' },
  { code: 'es', native: 'Español' },
  { code: 'fra', native: 'Français' },
  { code: 'de', native: 'Deutsch' },
  { code: 'it', native: 'Italiano' },
  { code: 'pt', native: 'Português' },
  { code: 'nl', native: 'Nederlands' },
  { code: 'rs', native: 'Русский' },
  { code: 'ch', native: '中文' },
  { code: 'ja', native: '日本語' },
  { code: 'ko', native: '한국어' },
  { code: 'ar', native: 'العربية' },
  { code: 'he', native: 'עברית' },
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', pipe: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('https://hotelsherpasoul.com/', { waitUntil: 'networkidle0' });

  for (const l of testLangs) {
    const switcher = await page.$('button[title="Change language"]');
    if (switcher) await switcher.click();
    await new Promise(r => setTimeout(r, 400));

    const clicked = await page.evaluate((native) => {
      const dropdown = document.querySelector('[class*="max-h-80"]') || document.body;
      const btns = Array.from(dropdown.querySelectorAll('button'));
      const target = btns.find(b => b.textContent.includes(native));
      if (target) {
        target.click();
        return true;
      }
      return false;
    }, l.native);

    await new Promise(r => setTimeout(r, 1200));
    const h1 = await page.evaluate(() => document.querySelector('h1')?.innerText || '');
    console.log(`[${l.code}] clicked: ${clicked} | H1: ${h1.substring(0, 40)}`);
  }

  await browser.close();
})();
