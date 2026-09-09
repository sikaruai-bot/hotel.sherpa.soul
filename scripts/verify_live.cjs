const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function verify() {
  try {
    for (const domain of ['https://hotelsherpasoul.com', 'https://hotel-sherpa-soul.vercel.app']) {
      console.log(`\nTesting ${domain}...`);
      const html = await get(domain + '/index.html?t=' + Date.now());
      const match = html.match(/src="([^"]+\.js)"/);
      console.log('Script tag found:', match ? match[1] : 'None');
      if (match) {
        const jsUrl = domain + match[1];
        const js = await get(jsUrl);
        console.log('Bundle length:', js.length);
        console.log('Has NPR price:', js.includes('NPR'));
        console.log('Has 2,700:', js.includes('2,700'));
      }
    }
  } catch (e) {
    console.error(e);
  }
}

verify();
