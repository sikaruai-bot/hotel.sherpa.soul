const http = require('http');

function checkUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
      });
    }).on('error', reject);
  });
}

async function verify() {
  console.log('Testing preview server: http://localhost:4173/guest-guide/ ...');
  const response = await checkUrl('http://localhost:4173/guest-guide/');
  
  console.log('HTTP Status:', response.statusCode);
  if (response.statusCode !== 200) {
    throw new Error(`Expected HTTP 200, got ${response.statusCode}`);
  }

  const requiredStrings = [
    'Hotel Sherpa Soul',
    'Guest Guide &amp; House Rules',
    'Peaceful Hotel in Thamel, Kathmandu',
    'netis-525AF4',
    'thamel@123',
    'Please confirm with reception.',
    'By 11:00 AM.',
    'settle your outstanding room balance as agreed',
    'Hot water is available at all times.',
    'Air conditioning is available only in selected rooms.',
    'Room cleaning is available on request.',
    'Quiet hours: 10:00 PM to 7:00 AM.',
    'The shared kitchen is available to eligible long-stay guests staying at least two weeks',
    'Lock your room when leaving.',
    'Legal Compliance &amp; Prohibited Activities',
    'applicable laws of Nepal',
    'Possession, use, sale or distribution of illegal drugs',
    'Human trafficking, exploitation, sexual abuse',
    'Hotel Sherpa Soul does not have an on-site restaurant or private parking.',
    'https://wa.me/9779818259472',
    '+977 9818259472',
    'tel:+9779851068219',
    '+977 9851068219',
    'mailto:info@hotelsherpasoul.com',
    'info@hotelsherpasoul.com',
    'https://www.hotelsherpasoul.com',
    'Thank You for Staying with Us!',
    'Leave Us a Google Review',
    'https://g.page/r/CdbILHoQEzN_EBI/review',
    'https://hotelsherpasoul.com/guest-guide'
  ];

  let missing = [];
  for (const str of requiredStrings) {
    if (!response.body.includes(str)) {
      missing.push(str);
    }
  }

  if (missing.length > 0) {
    console.error('❌ Missing expected strings in pre-rendered response:');
    missing.forEach(m => console.error('  -', m));
    process.exit(1);
  }

  console.log('✅ ALL 30 required content strings, contact links, and policies verified in HTML output!');
}

verify().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
