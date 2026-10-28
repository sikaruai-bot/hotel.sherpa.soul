const http = require('http');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const DIST = path.resolve(__dirname, '..', 'dist');

function getMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html';
    case '.css': return 'text/css';
    case '.js': return 'application/javascript';
    case '.json': return 'application/json';
    case '.webp': return 'image/webp';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    case '.ico': return 'image/x-icon';
    default: return 'application/octet-stream';
  }
}

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  if (!path.extname(reqPath)) {
    const candidate = path.join(DIST, reqPath, 'index.html');
    if (fs.existsSync(candidate)) {
      reqPath = path.join(reqPath, 'index.html');
    } else {
      reqPath += '.html';
    }
  }

  const filePath = path.join(DIST, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': getMime(filePath) });
    fs.createReadStream(filePath).pipe(res);
  } else {
    const fallback = path.join(DIST, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(fallback).pipe(res);
  }
});

const PORT = 4180;
let targetUrl = process.env.TARGET_URL;

const viewports = [
  { width: 1366, height: 768, name: 'Standard Desktop (1366x768)', isMobile: false },
  { width: 1920, height: 1080, name: 'FHD Desktop (1920x1080)', isMobile: false },
  { width: 1024, height: 768, name: 'Small Desktop / iPad Pro (1024x768)', isMobile: false },
  { width: 1280, height: 800, name: 'MacBook 13 (1280x800)', isMobile: false },
  { width: 390, height: 844, name: 'Mobile (iPhone 14 - 390x844)', isMobile: true },
];

(async () => {
  if (!targetUrl) {
    await new Promise(resolve => server.listen(PORT, resolve));
    targetUrl = `http://localhost:${PORT}`;
    console.log(`Local server started at ${targetUrl}`);
  }

  console.log('\n========================================');
  console.log(`🖥️ DESKTOP CLS AUDIT ON: ${targetUrl}`);
  console.log('========================================\n');

  const tempProfile = path.join(__dirname, '..', '.puppeteer_cls_' + Date.now());
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      userDataDir: tempProfile,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

  for (const vp of viewports) {
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

    await page.setViewport({
      width: vp.width,
      height: vp.height,
      isMobile: !!vp.isMobile,
      hasTouch: !!vp.isMobile,
      deviceScaleFactor: vp.isMobile ? 3 : 1
    });

    await page.evaluateOnNewDocument(() => {
      window._cls_shifts = [];
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            const sources = (entry.sources || []).map(s => ({
              nodeName: s.node ? s.node.nodeName : 'unknown',
              className: s.node && s.node.className ? String(s.node.className).slice(0, 80) : '',
              id: s.node && s.node.id ? s.node.id : '',
              prev: s.previousRect ? { x: s.previousRect.x, y: s.previousRect.y, width: s.previousRect.width, height: s.previousRect.height } : null,
              curr: s.currentRect ? { x: s.currentRect.x, y: s.currentRect.y, width: s.currentRect.width, height: s.currentRect.height } : null
            }));
            window._cls_shifts.push({
              value: entry.value,
              sources: sources
            });
          }
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });

    await page.goto(targetUrl, { waitUntil: 'load' });
    await new Promise(r => setTimeout(r, 4500));

    const shifts = await page.evaluate(() => window._cls_shifts);

    let totalCls = 0;
    console.log(`\n--- Viewport: ${vp.name} ---`);
    if (shifts.length === 0) {
      console.log('  Zero shifts recorded (CLS = 0.0000)');
    } else {
      shifts.forEach((s, i) => {
        totalCls += s.value;
        console.log(`  Shift #${i + 1}: value=${s.value.toFixed(5)}`);
        s.sources.forEach(src => {
          console.log(`    <${src.nodeName} id="${src.id}" class="${src.className}">`);
          console.log(`      prev:`, src.prev);
          console.log(`      curr:`, src.curr);
        });
      });
      console.log(`  👉 Total CLS: ${totalCls.toFixed(5)}`);
    }
    await page.close();
  }

    await browser.close();
    try {
      fs.rmSync(tempProfile, { recursive: true, force: true });
    } catch (e) {}
    process.exit(0);
  } catch (err) {
    console.error('Audit error:', err);
    try {
      fs.rmSync(tempProfile, { recursive: true, force: true });
    } catch (e) {}
    process.exit(1);
  }
})();
