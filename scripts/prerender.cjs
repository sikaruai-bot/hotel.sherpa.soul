const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(INDEX_PATH)) {
  console.error('Error: dist/index.html does not exist. Run "vite build" first.');
  process.exit(1);
}

let templateHtml = fs.readFileSync(INDEX_PATH, 'utf-8');
// Reset root div if dist/index.html already contains pre-rendered content
templateHtml = templateHtml.replace(/<div id="root">[\s\S]*?<\/body>/i, '<div id="root"></div>\n  </body>');

// Resolve hashed logo asset for 100% hydration alignment
const distAssetsDir = path.resolve(__dirname, '..', 'dist', 'assets');
const hashedLogo = fs.existsSync(distAssetsDir)
  ? (fs.readdirSync(distAssetsDir).find(f => f.startsWith('logo2-') && f.endsWith('.webp')) || 'logo2.webp')
  : 'logo2.webp';
const logoSrc = hashedLogo.startsWith('logo2-') ? `/assets/${hashedLogo}` : '/logo2.webp';

// Shared Navigation Component HTML (verbatim match to hydrated React Navbar)
const NAV_HTML = `<nav class="fixed top-0 left-0 right-0 shadow-sm border-b border-slate-100 transition-[background-color,box-shadow,backdrop-filter] duration-300 z-50 translate-y-0 bg-white/90 backdrop-blur-sm"><div class="bg-gradient-to-r from-[#01366E] via-[#0A2540] to-[#01366E] text-white py-1.5 px-3 sm:px-6 border-b border-amber-400/20"><div class="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm"><div class="flex items-center gap-2 mx-auto sm:mx-0 text-center sm:text-left"><span class="bg-[#FB6C01] text-white font-black text-[10px] sm:text-xs px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">10% OFF</span><span class="font-medium text-slate-100 text-xs sm:text-sm">Direct Booking Special: Get <strong class="text-amber-300 font-bold">10% Discount</strong> on all rooms!</span><span class="hidden md:inline text-white/40">• Best Rate Guaranteed</span></div><button class="hidden sm:inline-flex items-center gap-1 font-bold text-amber-300 hover:text-white transition-colors underline underline-offset-4 text-xs">Claim 10% Off →</button></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-20"><div class="flex-shrink-0 z-50 py-1 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"><a class="flex items-center justify-center" href="/"><img alt="Hotel Sherpa Soul - Boutique Stay in Thamel, Kathmandu" class="h-14 sm:h-16 w-auto max-w-[220px] object-contain transition-all duration-300" width="200" height="60" loading="eager" decoding="async" src="${logoSrc}"></a></div><div class="hidden lg:flex space-x-5 xl:space-x-7"><div class="relative group/navlink"><a class="relative transition-colors duration-300 font-semibold text-sm lg:text-base py-3 px-1 text-[#FB6C01]" href="/">Home<span class="absolute bottom-0 left-0 w-full h-0.5 bg-[#FB6C01] origin-left transition-transform duration-300 ease-in-out scale-x-100"></span></a></div><div class="relative group/navlink"><a class="relative transition-colors duration-300 font-semibold text-sm lg:text-base py-3 px-1 text-[#01366E] hover:text-[#FB6C01]" href="/rooms">Rooms<span class="absolute bottom-0 left-0 w-full h-0.5 bg-[#FB6C01] origin-left transition-transform duration-300 ease-in-out scale-x-0 group-hover/navlink:scale-x-100"></span></a></div><div class="relative group/navlink"><a class="relative transition-colors duration-300 font-semibold text-sm lg:text-base py-3 px-1 text-[#01366E] hover:text-[#FB6C01]" href="/about">About Us<span class="absolute bottom-0 left-0 w-full h-0.5 bg-[#FB6C01] origin-left transition-transform duration-300 ease-in-out scale-x-0 group-hover/navlink:scale-x-100"></span></a></div><div class="relative group/navlink"><a class="relative transition-colors duration-300 font-semibold text-sm lg:text-base py-3 px-1 text-[#01366E] hover:text-[#FB6C01]" href="/gallery">Gallery<span class="absolute bottom-0 left-0 w-full h-0.5 bg-[#FB6C01] origin-left transition-transform duration-300 ease-in-out scale-x-0 group-hover/navlink:scale-x-100"></span></a></div><div class="relative group/navlink"><a class="relative transition-colors duration-300 font-semibold text-sm lg:text-base py-3 px-1 text-[#01366E] hover:text-[#FB6C01]" href="/#location">Location<span class="absolute bottom-0 left-0 w-full h-0.5 bg-[#FB6C01] origin-left transition-transform duration-300 ease-in-out scale-x-0 group-hover/navlink:scale-x-100"></span></a></div><div class="relative group/navlink"><a class="relative transition-colors duration-300 font-semibold text-sm lg:text-base py-3 px-1 text-[#01366E] hover:text-[#FB6C01]" href="/blog">Blog<span class="absolute bottom-0 left-0 w-full h-0.5 bg-[#FB6C01] origin-left transition-transform duration-300 ease-in-out scale-x-0 group-hover/navlink:scale-x-100"></span></a></div><div class="relative group/navlink"><a class="relative transition-colors duration-300 font-semibold text-sm lg:text-base py-3 px-1 text-[#01366E] hover:text-[#FB6C01]" href="/contact">Contact<span class="absolute bottom-0 left-0 w-full h-0.5 bg-[#FB6C01] origin-left transition-transform duration-300 ease-in-out scale-x-0 group-hover/navlink:scale-x-100"></span></a></div><div class="relative group/navlink"><a class="relative transition-colors duration-300 font-semibold text-sm lg:text-base py-3 px-1 text-[#01366E] hover:text-[#FB6C01]" href="/guest-guide">Guest Guide<span class="absolute bottom-0 left-0 w-full h-0.5 bg-[#FB6C01] origin-left transition-transform duration-300 ease-in-out scale-x-0 group-hover/navlink:scale-x-100"></span></a></div></div><div class="flex items-center space-x-2 lg:space-x-3 z-50"><div class="relative"><button aria-label="Current language: English. Click to change language" title="Change language" class="group flex items-center gap-2 md:gap-4 px-2 py-1 bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/30 active:scale-95"><span class="text-xl group-hover:scale-110 transition-transform duration-200">🇺🇸</span><div class="hidden md:flex flex-col items-start"><span class="font-medium text-gray-700 text-sm">EN</span><span class="text-xs text-gray-500">English</span></div><div class="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"><svg class="w-3 h-3 text-white transition-transform duration-200 " fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg></div></button></div><button class="hidden sm:flex items-center justify-center bg-[#FB6C01] hover:bg-[#E05A00] text-white px-5 lg:px-6 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm lg:text-base hover:scale-[1.04] active:scale-[0.96]">Book Your Stay</button><button class="lg:hidden flex flex-col justify-center items-center w-11 h-11 min-w-[44px] min-h-[44px] p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/90 hover:bg-slate-100 space-y-1.5 z-50 focus:outline-none focus:ring-2 focus:ring-[#01366E] active:scale-95 transition-transform" aria-label="Open navigation menu" aria-expanded="false"><span class="w-6 h-0.5 rounded-full bg-[#01366E] transition-transform duration-300 "></span><span class="w-6 h-0.5 rounded-full bg-[#01366E] transition-all duration-300 "></span><span class="w-6 h-0.5 rounded-full bg-[#01366E] transition-transform duration-300 "></span></button></div></div></div></nav>`;

// Shared Footer Component HTML
const FOOTER_HTML = `
<footer class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans relative overflow-hidden mt-16">
  <div class="relative px-4 sm:px-6 lg:px-20 pt-12">
    <div class="max-w-7xl mx-auto">
      <div class="relative mb-14 overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 p-8 sm:p-12 shadow-2xl border border-amber-400/30">
        <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div class="max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-amber-100 text-xs font-bold uppercase tracking-widest mb-3">
              Hotel Sherpa Soul • Thamel, Kathmandu
            </div>
            <h3 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">Ready to Sleep Well?</h3>
            <p class="text-amber-100 text-sm sm:text-base leading-relaxed">Stay in the heart of Thamel and make Hotel Sherpa Soul your comfortable base for Kathmandu and your journey through Nepal.</p>
          </div>
          <div class="flex-shrink-0">
            <a href="/book-now" class="px-8 py-4 bg-white text-slate-900 hover:bg-amber-50 font-bold rounded-2xl shadow-xl transition-all text-base sm:text-lg inline-flex items-center gap-2">Book Your Stay</a>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
        <div class="space-y-6">
          <div class="flex items-center gap-4 mb-6">
            <a href="/" class="inline-block">
              <img src="/logo.webp" alt="Hotel Sherpa Soul Kathmandu" class="h-16 w-auto max-w-[200px] object-contain bg-white/95 px-3 py-1.5 rounded-xl shadow-md" width="180" height="60" />
            </a>
            <div>
              <p class="text-xl font-bold text-white mb-1">Hotel Sherpa Soul</p>
              <p class="text-[#FB6C01] text-xs font-semibold tracking-wide">No Restaurant. No Noise. Sleep Well.</p>
            </div>
          </div>
          <p class="text-gray-300 leading-relaxed text-sm">Hotel Sherpa Soul is a peaceful and comfortable boutique hotel in Thamel Bhagawati Marg 26, Kathmandu, created for travelers looking for convenient location, quiet rooms, and authentic Himalayan hospitality.</p>
        </div>
        <div class="space-y-6">
          <h3 class="text-lg font-semibold text-white">Quick Navigation</h3>
          <ul class="space-y-3 text-sm text-gray-300">
            <li><a href="/" class="hover:text-[#FB6C01] transition-colors">Home</a></li>
            <li><a href="/rooms" class="hover:text-[#FB6C01] transition-colors">Rooms & Suites</a></li>
            <li><a href="/about" class="hover:text-[#FB6C01] transition-colors">About Hotel Sherpa Soul</a></li>
            <li><a href="/services" class="hover:text-[#FB6C01] transition-colors">Services & Amenities</a></li>
            <li><a href="/gallery" class="hover:text-[#FB6C01] transition-colors">Photo & Video Gallery</a></li>
            <li><a href="/blog" class="hover:text-[#FB6C01] transition-colors">Kathmandu & Thamel Travel Blog</a></li>
            <li><a href="/guest-guide" class="hover:text-[#FB6C01] transition-colors">Guest Guide & House Rules</a></li>
            <li><a href="/contact" class="hover:text-[#FB6C01] transition-colors">Contact & Location</a></li>
          </ul>
        </div>
        <div class="space-y-6">
          <h3 class="text-lg font-semibold text-white">Contact & Location</h3>
          <ul class="space-y-3 text-sm text-gray-300">
            <li><strong>WhatsApp Chatbot:</strong> <a href="https://wa.me/9779818259472" class="hover:underline text-emerald-400">+977 9818259472</a></li>
            <li><strong>Front Desk Call:</strong> <a href="tel:+9779851068219" class="hover:underline text-amber-300">+977-9851068219</a></li>
            <li><strong>Email:</strong> <a href="mailto:info@hotelsherpasoul.com" class="hover:underline text-amber-300">info@hotelsherpasoul.com</a></li>
            <li><strong>Address:</strong> Thamel Bhagawati Marg 26, Kathmandu 44600, Bagmati, Nepal</li>
            <li><strong>Reception:</strong> 24 Hours / 7 Days Open</li>
          </ul>
        </div>
        <div class="space-y-6">
          <h3 class="text-lg font-semibold text-white">Book on Top OTAs</h3>
          <div class="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50 text-center space-y-3">
            <a href="https://www.booking.com/hotel/np/hotel-sherpa-soul.html" target="_blank" rel="noopener noreferrer" class="block w-28 h-28 mx-auto bg-white rounded-lg p-2 shadow-lg">
              <img src="/qr.webp" alt="Booking.com QR Code - Hotel Sherpa Soul" width="96" height="96" class="w-full h-full object-contain" />
            </a>
            <div class="space-y-2 pt-1 text-xs">
              <a href="https://www.booking.com/hotel/np/hotel-sherpa-soul.html" target="_blank" rel="noopener noreferrer" class="block py-1.5 px-3 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white border border-blue-500/30 font-medium">Book on Booking.com &rarr;</a>
              <a href="https://www.airbnb.com/rooms/1760024961976448522" target="_blank" rel="noopener noreferrer" class="block py-1.5 px-3 rounded-lg bg-rose-600/20 text-rose-300 hover:bg-rose-600 hover:text-white border border-rose-500/30 font-medium">Book on Airbnb &rarr;</a>
              <a href="https://www.trip.com/hotels/list?keyword=Hotel%20Sherpa%20Soul%20Kathmandu" target="_blank" rel="noopener noreferrer" class="block py-1.5 px-3 rounded-lg bg-sky-600/20 text-sky-300 hover:bg-sky-600 hover:text-white border border-sky-500/30 font-medium">Book on Trip.com &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="border-t border-slate-700/50 bg-slate-900/80 px-4 sm:px-6 lg:px-20 py-6">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-400">
      <div>&copy; 2026 <span class="text-[#FB6C01] font-semibold">Hotel Sherpa Soul</span>. All rights reserved. Thamel, Kathmandu, Nepal.</div>
      <div class="flex flex-wrap gap-4 sm:gap-6 items-center">
        <a href="/privacy" class="hover:text-[#FB6C01] transition-colors">Privacy Policy</a>
        <a href="/terms" class="hover:text-[#FB6C01] transition-colors">Terms of Service</a>
        <a href="/guest-guide" class="hover:text-[#FB6C01] transition-colors">Guest Guide</a>
        <button type="button" class="hover:text-[#FB6C01] transition-colors text-left cursor-pointer">Cookie Preferences</button>
      </div>
    </div>
  </div>
</footer>
`;

function getBookingPageContent(roomTitle, roomId) {
  const currentRoomId = Number(roomId) || 1;

  const roomsList = [
    {
      id: 1,
      title: "Budget Family Room",
      price: 20,
      priceNpr: "2,700",
      bed: "1 King Bed + 1 Single Bed",
      guests: 4,
      desc: "Features 1 King Bed + 1 Single Bed, en-suite bathroom, 24/7 hot shower, free Wi-Fi, and shared kitchen privileges.",
      image: "/triple.webp",
    },
    {
      id: 2,
      title: "Deluxe Room (AC)",
      price: 20,
      priceNpr: "2,700",
      bed: "1 King Bed • Air Conditioned",
      guests: 3,
      desc: "Air-conditioned boutique room with king bed, sofa seating, private modern bathroom, fast Wi-Fi, and peaceful atmosphere.",
      image: "/changes_photo/singleBedWithSofa.webp",
    },
    {
      id: 3,
      title: "Family Room (AC)",
      price: 30,
      priceNpr: "4,000",
      bed: "King + Single • Air Conditioned",
      guests: 4,
      desc: "Spacious family suite with King + Single bed, full air conditioning, private modern washroom, and city views.",
      image: "/changes_photo/doubleBed.webp",
    }
  ];

  const cardsHtml = roomsList.map(r => {
    const isSelected = r.id === currentRoomId;
    return `
      <a href="/book/${r.id}" class="group relative rounded-2xl overflow-hidden transition-all duration-300 border-2 bg-white flex flex-col justify-between block ${isSelected ? 'border-[#FB6C01] ring-4 ring-[#FB6C01]/20 shadow-xl scale-[1.02]' : 'border-slate-200 hover:border-amber-400 hover:shadow-lg'}">
        <div class="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
          <img src="${r.image}" alt="${r.title} - Hotel Sherpa Soul Thamel Kathmandu" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" width="400" height="250" loading="lazy" />
          <div class="absolute top-3 left-3 bg-[#FB6C01] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow">10% DIRECT OFF</div>
          ${isSelected ? '<div class="absolute top-3 right-3 bg-emerald-600 text-white px-2.5 py-1 rounded-full shadow-lg text-xs font-bold flex items-center gap-1">✓ Selected</div>' : '<div class="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-[11px] font-medium">Click to select</div>'}
          <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs">
            <span class="font-bold text-amber-400 text-sm sm:text-base">$${r.price} USD</span>
            <span class="text-amber-200 font-semibold">~NPR ${r.priceNpr} / night</span>
          </div>
        </div>
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="font-bold text-lg text-slate-900 mb-1 flex items-center justify-between">
              <span>${r.title}</span>
              <span class="text-xs text-slate-500 font-normal">Max ${r.guests} guests</span>
            </h3>
            <p class="text-xs text-[#01366E] mb-2 font-semibold">🛏️ ${r.bed}</p>
            <p class="text-xs text-slate-600 leading-relaxed">${r.desc}</p>
          </div>
          <div class="pt-4 mt-4 border-t border-slate-100">
            <span class="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${isSelected ? 'bg-[#FB6C01] text-white shadow-md' : 'bg-slate-100 text-slate-700 group-hover:bg-[#01366E] group-hover:text-white'}">
              ${isSelected ? '✓ Room Selected (' + r.title + ')' : 'Select ' + r.title + ' &rarr;'}
            </span>
          </div>
        </div>
      </a>
    `;
  }).join('');

  const selectedRoom = roomsList.find(r => r.id === currentRoomId) || roomsList[0];

  return `
    ${NAV_HTML}
    <main class="min-h-screen pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="inline-block bg-[#FB6C01]/10 text-[#FB6C01] font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full border border-[#FB6C01]/20 mb-2">DIRECT BOOKING PRIVILEGE • 10% OFF</span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-[#01366E] mt-1">${roomTitle}</h1>
        <p class="text-slate-600 text-base sm:text-lg mt-2">Clean, quiet rooms, authentic Sherpa hospitality, and comfortable rest in the heart of Thamel.</p>
      </div>

      <!-- Step 1: 3 Room Categories Visual Cards -->
      <div class="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 mb-10">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-6 border-b border-slate-100 gap-2">
          <div>
            <span class="inline-block bg-[#FB6C01]/10 text-[#FB6C01] font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-[#FB6C01]/20">Step 1 of 2: Choose Room Category</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#01366E] mt-1.5">Select From Our 3 Room Categories</h2>
            <p class="text-slate-600 text-sm mt-0.5">Click any room below to select it — 10% direct discount is automatically applied.</p>
          </div>
          <div class="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 self-start sm:self-auto">
            <span>✓ Active: <strong>${selectedRoom.title}</strong></span>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${cardsHtml}
        </div>
      </div>

      <!-- Step 2: Booking Form & Support Info -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8">
          <div class="border-b border-slate-100 pb-5 mb-6 text-left">
            <span class="inline-block bg-[#01366E]/10 text-[#01366E] font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-[#01366E]/20 mb-1.5">Step 2 of 2: Guest Details</span>
            <h2 class="text-2xl font-bold text-slate-900">Reservation for: <span class="text-[#FB6C01]">${selectedRoom.title}</span></h2>
            <p class="text-sm text-slate-500 mt-1">Direct booking receives automatic 10% discount off standard rates ($${selectedRoom.price} USD / ~NPR ${selectedRoom.priceNpr})</p>
          </div>
          <form class="space-y-6">
            <input type="text" name="website_hp" style="display:none !important;" tabindex="-1" autocomplete="off" />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Guest Full Name *</label>
                <input type="text" name="fullName" id="booking-fullName" required placeholder="e.g. John Doe" class="w-full p-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FB6C01] outline-none" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                <input type="email" name="email" id="booking-email" required placeholder="john@example.com" class="w-full p-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FB6C01] outline-none" />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Phone / WhatsApp Number *</label>
                <input type="tel" name="phone" id="booking-phone" required placeholder="+977-98..." class="w-full p-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#FB6C01] outline-none" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Selected Room Category *</label>
                <select name="roomType" class="w-full p-3.5 border border-slate-300 rounded-xl font-medium bg-white">
                  <option value="Budget Family Room" ${currentRoomId === 1 ? 'selected' : ''}>Budget Family Room - $20 USD (~NPR 2,700)</option>
                  <option value="Deluxe Room (AC)" ${currentRoomId === 2 ? 'selected' : ''}>Deluxe Room (AC) - $20 USD (~NPR 2,700)</option>
                  <option value="Family Room (AC)" ${currentRoomId === 3 ? 'selected' : ''}>Family Room (AC) - $30 USD (~NPR 4,000)</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Check-in Date *</label>
                <input type="date" name="checkIn" required class="w-full p-3.5 border border-slate-300 rounded-xl" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Check-out Date *</label>
                <input type="date" name="checkOut" required class="w-full p-3.5 border border-slate-300 rounded-xl" />
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Number of Guests</label>
                <input type="number" name="numberOfGuests" min="1" max="4" value="2" class="w-full p-3.5 border border-slate-300 rounded-xl" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Number of Rooms</label>
                <input type="number" name="numberOfRooms" min="1" max="5" value="1" class="w-full p-3.5 border border-slate-300 rounded-xl" />
              </div>
            </div>
            <div class="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-sm">
              <span class="font-semibold text-[#01366E]">Direct Booking Benefit:</span>
              <span class="font-bold text-[#FB6C01]">10% Discount Automatically Applied</span>
            </div>
            <button type="submit" class="w-full py-4 px-6 bg-[#FB6C01] hover:bg-[#e05a00] text-white font-bold text-lg rounded-2xl shadow-lg transition-all cursor-pointer">Confirm & Reserve Room &rarr;</button>
            <p class="text-xs text-slate-500 text-center mt-3">By submitting, you agree to our <a href="/terms" class="text-[#01366E] font-medium underline">Terms of Service</a>, <a href="/guest-guide" class="text-[#01366E] font-medium underline">Guest Guide &amp; House Rules</a>, and <a href="/privacy" class="text-[#01366E] font-medium underline">Privacy Policy</a>.</p>
          </form>
        </div>
        <div class="space-y-6">
          <div class="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-4">
            <h3 class="text-xl font-bold text-[#01366E]">Need Quick Confirmation?</h3>
            <p class="text-slate-600 text-sm">Feel free to message or call our 24/7 reception desk for immediate room availability:</p>
            <div class="space-y-3 text-sm">
              <div><strong>WhatsApp:</strong> <a href="https://wa.me/9779818259472" class="text-emerald-600 font-bold hover:underline">+977 9818259472</a></div>
              <div><strong>Direct Phone:</strong> <a href="tel:+9779851068219" class="text-[#FB6C01] font-bold hover:underline">+977-9851068219</a></div>
              <div><strong>Email:</strong> <a href="mailto:info@hotelsherpasoul.com" class="text-[#01366E] font-bold hover:underline">info@hotelsherpasoul.com</a></div>
              <div><strong>Address:</strong> Thamel Bhagawati Marg 26, Kathmandu 44600</div>
            </div>
          </div>
        </div>
      </div>
    </main>
    ${FOOTER_HTML}
  `;
}

// Define routes and their content
const ROUTES = [
  {
    path: '/',
    title: 'Hotel Sherpa Soul | Peaceful Hotel in Thamel, Kathmandu',
    description: 'Stay at Hotel Sherpa Soul in Thamel, Kathmandu. Enjoy quiet rooms, 24/7 front desk, fiber Wi-Fi, guest kitchen, and authentic Sherpa hospitality in Nepal.',
    canonical: 'https://hotelsherpasoul.com/',
    ogImage: 'https://hotelsherpasoul.com/hero1.webp',
    preload: `
    <link rel="preload" as="image" href="/hero/hero_deluxe_room-mobile.webp" type="image/webp" media="(max-width: 768px)" fetchpriority="high" />
    <link rel="preload" as="image" href="/hero/hero_deluxe_room.webp" type="image/webp" media="(min-width: 769px)" fetchpriority="high" />
    `,
    content: `
      ${NAV_HTML}
      <div>
        <div class="overflow-x-hidden">
          <!-- 1. Hero Section -->
          <div class="relative direction-ltr" dir="ltr">
            <section class="w-full h-screen relative overflow-hidden flex">
              <div class="absolute inset-0">
                <div class="absolute inset-0 opacity-100 z-10">
                  <picture class="w-full h-full block">
                    <source media="(max-width: 768px)" srcset="/hero/hero_deluxe_room-mobile.webp" type="image/webp" />
                    <source media="(min-width: 769px)" srcset="/hero/hero_deluxe_room.webp" type="image/webp" />
                    <img src="/hero/hero_deluxe_room.webp" alt="Hotel Sherpa Soul - Deluxe Boutique Room in Thamel Kathmandu" class="w-full h-full object-cover" width="1024" height="682" fetchpriority="high" loading="eager" />
                  </picture>
                  <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none"></div>
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none"></div>
                </div>
              </div>

              <!-- Vertical Social Media Links — desktop only -->
              <div class="absolute right-8 bottom-8 z-20 hidden md:block">
                <div class="mb-6 text-center">
                  <div class="flex flex-col space-y-1 text-white/60 text-sm font-light tracking-widest">
                    <span>S</span>
                    <span>O</span>
                    <span>C</span>
                    <span>I</span>
                    <span>A</span>
                    <span>L</span>
                  </div>
                  <div class="mt-4 h-8 w-px bg-white/40 mx-auto"></div>
                </div>
                <div class="flex flex-col space-y-4">
                  <a href="https://www.facebook.com/share/1JYojEJGiL/" target="_blank" rel="noopener noreferrer" class="group w-10 h-10 bg-white backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110 shadow-lg" aria-label="Facebook">
                    <svg class="w-5 h-5 text-[#1877F2] group-hover:scale-110 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a href="https://www.tiktok.com/@sherpa.soul?_t=ZS-8ytRMKvOf4a&_r=1" target="_blank" rel="noopener noreferrer" class="group w-10 h-10 bg-white backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110 shadow-lg" aria-label="Tiktok">
                    <svg class="w-5 h-5 text-slate-900 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.88a8.21 8.21 0 004.79 1.54V7.01a4.85 4.85 0 01-1.02-.32z" /></svg>
                  </a>
                  <a href="https://www.youtube.com/@HotelSherpaSoul26" target="_blank" rel="noopener noreferrer" class="group w-10 h-10 bg-white backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110 shadow-lg" aria-label="YouTube">
                    <svg class="w-5 h-5 text-[#FF0000] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                  </a>
                  <a href="https://wa.me/9779818259472?text=Hi%20Hotel%20Sherpa%20Soul%2C%20I%20would%20like%20to%20check%20room%20availability." target="_blank" rel="noopener noreferrer" class="group w-10 h-10 bg-white backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110 shadow-lg" aria-label="WhatsApp">
                    <svg class="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  </a>
                </div>
                <div class="mt-6 h-8 w-px bg-white/40 mx-auto"></div>
              </div>

              <!-- Content Panel -->
              <div class="relative z-10 w-full min-h-screen flex items-center px-6 sm:px-12 lg:px-20 pt-28 pb-12 max-w-7xl text-white text-left">
                <div class="space-y-5 sm:space-y-6 max-w-2xl">
                  <div class="text-xs sm:text-sm uppercase tracking-[0.25em] text-amber-300 font-semibold drop-shadow">WELCOME TO HOTEL SHERPA SOUL • THAMEL, KATHMANDU</div><h1 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight text-white drop-shadow-md">Comfortable, Quiet Hotel in the Heart of Thamel, Kathmandu</h1><p class="text-white/90 text-base sm:text-lg leading-relaxed font-light drop-shadow">A boutique hotel on Thamel Bhagawati Marg 26 — clean rooms, peaceful nights, 24/7 hot showers, free luggage storage, and warm Himalayan hospitality.</p><div class="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"><a href="/rooms" class="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#01366E] border-2 border-white/80 hover:border-white font-bold text-sm sm:text-base backdrop-blur-md transition-all duration-300 transform hover:scale-105 shadow-lg min-h-[44px]"><span>Check Availability</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right w-4 h-4" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></a><button class="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FB6C01] to-amber-500 hover:from-amber-600 hover:to-[#FB6C01] text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 min-h-[44px]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar w-4 h-4" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg><span>Book Direct &amp; Save 10%</span></button></div><div class="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-200 font-medium"><span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin w-4 h-4 text-[#FB6C01]" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg><span>Central Thamel Location</span></span><span class="text-white/40">•</span><span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bed w-4 h-4 text-[#FB6C01]" aria-hidden="true"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg><span>Comfortable Rooms</span></span><span class="text-white/40">•</span><span class="flex items-center gap-1.5"><span class="text-base leading-none">🪷</span><span>Peaceful Stay</span></span></div><div class="flex items-center gap-3 md:hidden pt-2"><a href="https://www.facebook.com/share/1JYojEJGiL/" target="_blank" rel="noopener noreferrer" class="w-9 h-9 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 hover:border-white/40 transition-all duration-300" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook w-4 h-4 text-white hover:text-amber-300 transition-colors duration-300" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a><a href="https://www.tiktok.com/@sherpa.soul?_t=ZS-8ytRMKvOf4a&amp;_r=1" target="_blank" rel="noopener noreferrer" class="w-9 h-9 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 hover:border-white/40 transition-all duration-300" aria-label="Tiktok"><svg class="w-4 h-4 text-white hover:text-amber-300 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.33-6.34V8.88a8.21 8.21 0 004.79 1.54V7.01a4.85 4.85 0 01-1.02-.32z"></path></svg></a><a href="https://www.youtube.com/@HotelSherpaSoul26" target="_blank" rel="noopener noreferrer" class="w-9 h-9 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 hover:border-white/40 transition-all duration-300" aria-label="YouTube"><svg class="w-4 h-4 text-white hover:text-amber-300 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg></a><a href="https://wa.me/9779818259472?text=Hi%20Hotel%20Sherpa%20Soul%2C%20I%20would%20like%20to%20check%20room%20availability." target="_blank" rel="noopener noreferrer" class="w-9 h-9 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 hover:border-white/40 transition-all duration-300" aria-label="WhatsApp"><svg class="w-4 h-4 text-white hover:text-amber-300 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg></a></div>
                </div>
              </div>
            </section>
          </div>

          <!-- 2. Direct Booking Offer -->
          <section class="py-10 bg-amber-50/60 border-y border-amber-100">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex flex-col lg:flex-row items-center gap-8">
                <div class="flex-1 space-y-3">
                  <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#FB6C01] text-xs font-bold uppercase tracking-wider mb-1">
                    <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
                    <span>Why Book Direct</span>
                  </div>
                  <h2 class="text-xl sm:text-2xl font-bold text-[#01366E]">
                    Book Directly with Us &amp; Save 10%
                  </h2>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div class="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                      <div class="p-1.5 rounded-lg bg-slate-50 shrink-0 mt-0.5">
                        <svg class="w-5 h-5 text-[#FB6C01]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                      </div>
                      <div>
                        <strong class="block text-xs sm:text-sm text-slate-900 font-bold">10% Direct Booking Discount</strong>
                        <span class="text-[11px] text-slate-500 leading-snug block">Instant 10% savings when booking directly with us — no OTA markups.</span>
                      </div>
                    </div>
                    <div class="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                      <div class="p-1.5 rounded-lg bg-slate-50 shrink-0 mt-0.5">
                        <svg class="w-5 h-5 text-[#01366E]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
                      </div>
                      <div>
                        <strong class="block text-xs sm:text-sm text-slate-900 font-bold">Free Luggage Storage</strong>
                        <span class="text-[11px] text-slate-500 leading-snug block">Leave your bags safely while trekking the Himalayas.</span>
                      </div>
                    </div>
                    <div class="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                      <div class="p-1.5 rounded-lg bg-slate-50 shrink-0 mt-0.5">
                        <svg class="w-5 h-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      </div>
                      <div>
                        <strong class="block text-xs sm:text-sm text-slate-900 font-bold">Instant WhatsApp Confirmation</strong>
                        <span class="text-[11px] text-slate-500 leading-snug block">24/7 replies, airport transfer help, and personal assistance.</span>
                      </div>
                    </div>
                    <div class="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                      <div class="p-1.5 rounded-lg bg-slate-50 shrink-0 mt-0.5">
                        <svg class="w-5 h-5 text-[#FB6C01]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
                      </div>
                      <div>
                        <strong class="block text-xs sm:text-sm text-slate-900 font-bold">Book Direct &amp; Save 10%</strong>
                        <span class="text-[11px] text-slate-500 leading-snug block">Transparent, honest pricing with no hidden fees.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Right: Single CTA -->
                <div class="flex flex-col items-center gap-3 shrink-0">
                  <a href="/book-now" class="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FB6C01] to-amber-500 hover:from-amber-600 hover:to-[#FB6C01] text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 min-h-[48px]">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                    <span>Book Direct &amp; Save 10%</span>
                  </a>
                  <p class="text-[11px] text-slate-500 text-center font-medium">
                    🛡️ Best direct-booking offer. Contact us for availability.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- 3. Why Stay at Hotel Sherpa Soul -->
          <section class="py-16 bg-white border-b border-slate-100 relative">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="text-center max-w-3xl mx-auto mb-12">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#FB6C01] text-xs font-semibold tracking-wide uppercase mb-3">
                  <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
                  <span>Why Stay at Hotel Sherpa Soul</span>
                </div>
                <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-[#01366E] tracking-tight">
                  Comfortable, Quiet Accommodation in Thamel
                </h2>
                <p class="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                  Honest, practical boutique hospitality in Kathmandu. No exaggerated claims — just clean comfort, quiet nights, and personal care.
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div class="w-13 h-13 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-5 group-hover:border-orange-200 transition-colors duration-300 shadow-xs">
                      <svg class="w-7 h-7 text-[#FB6C01]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <span class="text-xs font-bold text-[#FB6C01] uppercase tracking-wider block mb-1">Quiet Thamel Location</span>
                    <h3 class="text-lg font-bold text-slate-900 mb-2 leading-snug">Peaceful Alleyway Setting</h3>
                    <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">Located on Thamel Bhagawati Marg 26, steps away from central shops and bakeries, yet peacefully insulated from late-night bar and street noise.</p>
                  </div>
                </div>

                <div class="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div class="w-13 h-13 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-5 group-hover:border-orange-200 transition-colors duration-300 shadow-xs">
                      <svg class="w-7 h-7 text-[#01366E]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                    </div>
                    <span class="text-xs font-bold text-[#FB6C01] uppercase tracking-wider block mb-1">Quiet Atmosphere</span>
                    <h3 class="text-lg font-bold text-slate-900 mb-2 leading-snug">Restful &amp; Undisturbed Sleep</h3>
                    <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">Designed for peaceful stays away from loud restaurant and bar noise inside the property. Spotless rooms and deep, restorative sleep are our priority.</p>
                  </div>
                </div>

                <div class="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div class="w-13 h-13 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-5 group-hover:border-orange-200 transition-colors duration-300 shadow-xs">
                      <svg class="w-7 h-7 text-[#FB6C01]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8Z"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/></svg>
                    </div>
                    <span class="text-xs font-bold text-[#FB6C01] uppercase tracking-wider block mb-1">Guest Kitchen</span>
                    <h3 class="text-lg font-bold text-slate-900 mb-2 leading-snug">Shared Kitchen for Light Cooking</h3>
                    <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">Equipped with an induction cooktop, refrigerator, microwave, and kettle, giving guests the flexibility to prepare simple home meals and brew fresh tea.</p>
                  </div>
                </div>

                <div class="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div class="w-13 h-13 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-5 group-hover:border-orange-200 transition-colors duration-300 shadow-xs">
                      <svg class="w-7 h-7 text-[#01366E]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <span class="text-xs font-bold text-[#FB6C01] uppercase tracking-wider block mb-1">Trekker-Friendly</span>
                    <h3 class="text-lg font-bold text-slate-900 mb-2 leading-snug">Free Luggage Storage &amp; 24/7 Desk</h3>
                    <p class="text-slate-600 text-xs sm:text-sm leading-relaxed">Heading to Everest, Annapurna, or Langtang? Leave your extra gear safely in our luggage room free of charge until you return from your trek.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 4. Accommodations Showcase Section -->
          <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="rooms">
            <div class="text-center max-w-3xl mx-auto mb-14">
              <span class="text-xs font-bold tracking-widest text-[#FB6C01] uppercase">OUR ACCOMMODATIONS</span>
              <h2 class="text-3xl sm:text-4xl font-extrabold text-[#01366E] mt-2">Your Room. Your Space. Your Rest.</h2>
              <p class="text-slate-600 text-base sm:text-lg mt-3">Clean, quiet, and equipped with fiber-optic Wi-Fi, 24/7 hot water, private en-suite bathrooms, and access to our shared self-kitchen.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <!-- Room 1: Budget Family Room -->
              <article class="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col">
                <div class="relative h-64 overflow-hidden bg-slate-100">
                  <img src="/triple.webp" alt="Budget Family Room at Hotel Sherpa Soul Thamel Kathmandu" class="w-full h-full object-cover" width="400" height="260" loading="lazy" decoding="async" />
                  <div class="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs font-semibold">
                    <span class="text-amber-300 font-bold text-sm sm:text-base">$20 USD</span>
                    <span class="text-slate-300 text-[11px] block">~NPR 2,700 / night</span>
                  </div>
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 class="text-xl font-bold text-[#01366E]">Budget Family Room</h3>
                    <p class="text-xs text-slate-500 mt-1">Up to 4 Guests (3 Adults, 1 Child) • 1 King Bed + 1 Single Bed</p>
                    <p class="text-sm text-slate-600 mt-3 leading-relaxed">Spacious and budget-friendly room for families and trekking groups resting before and after Himalayan trails.</p>
                  </div>
                  <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span class="text-xs text-emerald-600 font-bold">10% OFF with direct booking</span>
                    <a href="/room/budget-family-room" class="text-sm font-bold text-[#FB6C01] hover:underline">View Room Details &rarr;</a>
                  </div>
                </div>
              </article>

              <!-- Room 2: Deluxe Room (AC) -->
              <article class="bg-white rounded-3xl overflow-hidden shadow-lg border border-amber-400 ring-2 ring-amber-400/20 flex flex-col relative">
                <div class="absolute top-3 left-3 z-10 bg-[#FB6C01] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
                <div class="relative h-64 overflow-hidden bg-slate-100">
                  <img src="/changes_photo/singleBedWithSofa.webp" alt="Deluxe Room (AC) at Hotel Sherpa Soul Thamel Kathmandu" class="w-full h-full object-cover" width="400" height="260" loading="lazy" decoding="async" />
                  <div class="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs font-semibold">
                    <span class="text-amber-300 font-bold text-sm sm:text-base">$20 USD</span>
                    <span class="text-slate-300 text-[11px] block">~NPR 2,700 / night</span>
                  </div>
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 class="text-xl font-bold text-[#01366E]">Deluxe Room (AC)</h3>
                    <p class="text-xs text-slate-500 mt-1">Up to 3 Guests (2 Adults, 1 Child) • 1 King Bed • Air Conditioned</p>
                    <p class="text-sm text-slate-600 mt-3 leading-relaxed">Quiet boutique room with king mattress, climate control (AC), private modern bathroom, and city views.</p>
                  </div>
                  <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span class="text-xs text-emerald-600 font-bold">10% OFF with direct booking</span>
                    <a href="/room/deluxe-room" class="text-sm font-bold text-[#FB6C01] hover:underline">View Room Details &rarr;</a>
                  </div>
                </div>
              </article>

              <!-- Room 3: Family Room (AC) -->
              <article class="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col">
                <div class="relative h-64 overflow-hidden bg-slate-100">
                  <img src="/changes_photo/doubleBed.webp" alt="Family Room (AC) at Hotel Sherpa Soul Thamel Kathmandu" class="w-full h-full object-cover" width="400" height="260" loading="lazy" decoding="async" />
                  <div class="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs font-semibold">
                    <span class="text-amber-300 font-bold text-sm sm:text-base">$30 USD</span>
                    <span class="text-slate-300 text-[11px] block">~NPR 4,000 / night</span>
                  </div>
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 class="text-xl font-bold text-[#01366E]">Family Room (AC)</h3>
                    <p class="text-xs text-slate-500 mt-1">Up to 4 Guests (3 Adults, 1 Child) • 1 King Bed + 1 Single Bed • AC</p>
                    <p class="text-sm text-slate-600 mt-3 leading-relaxed">Spacious family suite featuring air conditioning, one king bed and one single bed, private bathroom, and extra room for luggage.</p>
                  </div>
                  <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span class="text-xs text-emerald-600 font-bold">10% OFF with direct booking</span>
                    <a href="/room/family-room" class="text-sm font-bold text-[#FB6C01] hover:underline">View Room Details &rarr;</a>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <!-- 5. Facilities & Services Section -->
          <section class="py-20 bg-stone-50 border-t border-slate-200/80" id="facilities">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="text-center max-w-3xl mx-auto mb-16">
                <div class="inline-flex items-center gap-2 px-3.5 py-1 mb-3 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  <span>❖</span>
                  <span>Verified Hotel Amenities</span>
                </div>
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#01366E] tracking-tight">
                  Hotel Facilities &amp; Practical Services
                </h2>
                <p class="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
                  Thoughtfully planned for international tourists, backpackers, and trekking teams who appreciate functional comfort.
                </p>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md flex flex-col justify-between">
                  <div class="h-56 overflow-hidden">
                    <img src="/shared_kitchen_new.webp" alt="Shared Guest Kitchen at Hotel Sherpa Soul Thamel Kathmandu" class="w-full h-full object-cover" width="600" height="320" loading="lazy" decoding="async" />
                  </div>
                  <div class="p-6 sm:p-8 space-y-3">
                    <span class="text-xs font-bold text-[#FB6C01] uppercase tracking-wider">Self-Catering Convenience</span>
                    <h3 class="text-xl sm:text-2xl font-bold text-[#01366E]">Shared Guest Kitchen</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">Cook your own meals, prepare special dietary requirements, or brew warm Himalayan tea anytime. Fully equipped with an induction stove, refrigerator, microwave, and cooking utensils.</p>
                  </div>
                </div>

                <div class="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md flex flex-col justify-between">
                  <div class="h-56 overflow-hidden">
                    <img src="/frontdesk_new.webp" alt="24/7 Front Desk Reception at Hotel Sherpa Soul Kathmandu" class="w-full h-full object-cover" width="600" height="320" loading="lazy" decoding="async" />
                  </div>
                  <div class="p-6 sm:p-8 space-y-3">
                    <span class="text-xs font-bold text-[#FB6C01] uppercase tracking-wider">Always Available</span>
                    <h3 class="text-xl sm:text-2xl font-bold text-[#01366E]">24/7 Reception &amp; Travel Desk</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">Whether you arrive on a late-night international flight or leave before dawn for a mountain trek, our team is always on duty to welcome you and assist with luggage and transport.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 6. Location Section -->
          <section class="py-20 bg-white border-t border-slate-200" id="location">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="text-center max-w-3xl mx-auto mb-16">
                <div class="inline-flex items-center gap-2 px-3.5 py-1 mb-3 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  <svg class="w-3.5 h-3.5 text-[#FB6C01]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Prime Thamel Location</span>
                </div>
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#01366E] tracking-tight">
                  Hotel Sherpa Soul in Thamel, Kathmandu
                </h2>
                <p class="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
                  Conveniently situated on Thamel Bhagawati Marg 26. Step outside into the energetic culture and dining of Thamel, yet return to a quiet, noise-insulated boutique hotel at night.
                </p>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div class="lg:col-span-5 space-y-6">
                  <div class="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 shadow-sm">
                    <h3 class="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">Property Address &amp; Contact</h3>
                    <div class="space-y-4 text-sm text-slate-700">
                      <div>
                        <strong class="block text-slate-900">Hotel Sherpa Soul</strong>
                        <span>Thamel Bhagawati Marg 26, Kathmandu, Nepal</span>
                      </div>
                      <div>
                        <span class="text-xs text-slate-500 block">Front Desk (24/7):</span>
                        <a href="tel:+9779851068219" class="font-bold text-[#01366E] hover:text-[#FB6C01] hover:underline">+977 9851068219</a>
                      </div>
                      <div>
                        <span class="text-xs text-slate-500 block">WhatsApp Support:</span>
                        <a href="https://wa.me/9779818259472" target="_blank" rel="noopener noreferrer" class="font-bold text-emerald-600 hover:underline">+977 9818259472</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="lg:col-span-7">
                  <div class="rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 h-[480px] sm:h-[560px] relative">
                    <iframe title="Hotel Sherpa Soul Location Map" src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3532.0353113216966!2d85.310969!3d27.716196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDQyJzU4LjMiTiA4NcKwMTgnMzkuNSJF!5e0!3m2!1sen!2snp!4v1756878746121!5m2!1sen!2snp" width="100%" height="100%" style="border: 0" loading="lazy" class="w-full h-full"></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 7. Trekker-Friendly Services -->
          <section class="py-20 bg-gradient-to-b from-white via-amber-50/20 to-white relative overflow-hidden border-t border-slate-100" id="trekkers">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="text-center max-w-3xl mx-auto mb-16">
                <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-3">
                  <span>Trekker-Friendly Services</span>
                </div>
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#01366E] tracking-tight mb-4">
                  Made for Your Himalayan Journey
                </h2>
                <p class="text-slate-600 text-base sm:text-lg leading-relaxed">
                  Kathmandu is the gateway to Nepal's trails. Whether you are trekking Everest Base Camp, Annapurna Circuit, Langtang, or exploring the valley, Hotel Sherpa Soul provides a reliable, welcoming base.
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white rounded-3xl p-8 shadow-sm border border-amber-100">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-[#FB6C01] bg-orange-50 px-2.5 py-1 rounded-lg mb-2.5 inline-block">01 • Gear Prep &amp; Free Storage</span>
                  <h3 class="text-xl font-bold text-slate-900 mb-2">Before the Trek</h3>
                  <p class="text-slate-600 text-sm leading-relaxed">Rest after international flights, organize your gear, finalize route permits, and safely store your extra city bags in our secure luggage room free of charge.</p>
                </div>
                <div class="bg-white rounded-3xl p-8 shadow-sm border border-amber-100">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-[#01366E] bg-blue-50 px-2.5 py-1 rounded-lg mb-2.5 inline-block">02 • 24/7 Hot Shower &amp; Deep Sleep</span>
                  <h3 class="text-xl font-bold text-slate-900 mb-2">After the Trek</h3>
                  <p class="text-slate-600 text-sm leading-relaxed">Return from the Himalayas to a high-pressure hot shower, clean bed, peaceful surroundings, and a well-deserved deep sleep in Thamel.</p>
                </div>
                <div class="bg-white rounded-3xl p-8 shadow-sm border border-amber-100">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-[#FB6C01] bg-orange-50 px-2.5 py-1 rounded-lg mb-2.5 inline-block">03 • Authentic Local Knowledge</span>
                  <h3 class="text-xl font-bold text-slate-900 mb-2">Sherpa Guidance &amp; Support</h3>
                  <p class="text-slate-600 text-sm leading-relaxed">Drawing from authentic Himalayan heritage, our front desk assists with permit advice, Lukla/Pokhara flight coordination, and practical Nepal travel tips.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- 8. Guest Reviews Section -->
          <section class="py-20 bg-slate-50 border-t border-slate-200" id="reviews">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <span class="text-xs font-bold tracking-widest text-[#FB6C01] uppercase">AUTHENTIC GUEST EXPERIENCES</span>
              <h2 class="text-3xl sm:text-4xl font-extrabold text-[#01366E] mt-2">Rated 4.9/5 on Google Reviews</h2>
              <p class="text-slate-600 text-base max-w-2xl mx-auto mt-3">Read what international travelers and trekkers say about their peaceful stay at Hotel Sherpa Soul in Thamel.</p>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div class="flex items-center gap-1 text-amber-400 mb-3">★★★★★</div>
                  <p class="text-slate-700 text-sm italic">"Wonderful stay at hotel Sherpa soul in thamel kathmandu."</p>
                  <p class="text-xs font-bold text-[#01366E] mt-4">Kamal Gc • Verified Google Review</p>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div class="flex items-center gap-1 text-amber-400 mb-3">★★★★★</div>
                  <p class="text-slate-700 text-sm italic">"Peaceful environment, very clean rooms, and kind Sherpa hosts right in Thamel. Loved having access to the shared kitchen after trekking."</p>
                  <p class="text-xs font-bold text-[#01366E] mt-4">Furdiki Sherpa • Verified Google Review</p>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div class="flex items-center gap-1 text-amber-400 mb-3">★★★★★</div>
                  <p class="text-slate-700 text-sm italic">"Clean, quiet hotel tucked in an alley off Bhagawati Marg. Free luggage storage while I was doing the Annapurna Circuit was a lifesaver."</p>
                  <p class="text-xs font-bold text-[#01366E] mt-4">David M. (UK) • Verified Google Review</p>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div class="flex items-center gap-1 text-amber-400 mb-3">★★★★★</div>
                  <p class="text-slate-700 text-sm italic">"Super friendly family running this place. Hot showers had great pressure 24/7 and the high-speed Wi-Fi worked seamlessly on our laptop."</p>
                  <p class="text-xs font-bold text-[#01366E] mt-4">Sophie &amp; Liam (Australia) • Verified Review</p>
                </div>
              </div>
            </div>
          </section>

          <!-- 9. FAQs Section -->
          <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" id="faq">
            <div class="text-center mb-10">
              <h2 class="text-2xl sm:text-3xl font-bold text-[#01366E]">Frequently Asked Questions</h2>
              <p class="text-sm text-slate-600 mt-1">Everything you need to know about staying at Hotel Sherpa Soul in Thamel.</p>
            </div>
            <div class="space-y-4">
              <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h3 class="font-bold text-slate-800 text-base">Where is Hotel Sherpa Soul located in Kathmandu?</h3>
                <p class="text-sm text-slate-600 mt-2">Hotel Sherpa Soul is situated on Thamel Bhagawati Marg 26 in the heart of Thamel, Kathmandu, Nepal. We are within walking distance to famous restaurants, cafés, and trekking gear shops, and 6 km from Tribhuvan International Airport.</p>
              </div>
              <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h3 class="font-bold text-slate-800 text-base">What are the check-in and check-out times?</h3>
                <p class="text-sm text-slate-600 mt-2">Check-in begins at 14:00 (2:00 PM) and check-out is until 12:00 (12:00 PM noon). Our front desk is open 24/7 with flexible early check-in or late check-out available on request.</p>
              </div>
              <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h3 class="font-bold text-slate-800 text-base">Do you provide airport transfer and pickup services?</h3>
                <p class="text-sm text-slate-600 mt-2">Yes, we provide reliable airport pickup and drop-off transfers between Kathmandu Airport (KTM) and the hotel. Contact us on WhatsApp at +977 9818259472 to arrange your transfer.</p>
              </div>
              <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h3 class="font-bold text-slate-800 text-base">Can I store my luggage while on a trek?</h3>
                <p class="text-sm text-slate-600 mt-2">Yes, we offer complimentary secure luggage storage before check-in, after check-out, and during multi-day Himalayan journeys until you return.</p>
              </div>
              <div class="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-sm">
                <h3 class="font-bold text-slate-800 text-base">Where can I read your house rules, Wi-Fi, and guest guide?</h3>
                <p class="text-sm text-slate-600 mt-2">Please explore our comprehensive <a href="/guest-guide" class="text-[#FB6C01] font-bold hover:underline">Guest Guide &amp; House Rules</a> for quiet hours, Wi-Fi instructions, shared kitchen etiquette, and front desk assistance. All reservations are protected under our <a href="/privacy" class="text-[#01366E] font-bold hover:underline">Privacy Policy</a> and <a href="/terms" class="text-[#01366E] font-bold hover:underline">Terms of Service</a>.</p>
              </div>
            </div>
          </section>

          <!-- 10. Final Booking CTA -->
          <section class="py-20 bg-gradient-to-br from-[#01366E] via-[#072444] to-slate-900 text-white relative overflow-hidden" id="booking-cta">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                <span>Direct Booking Privilege</span>
              </div>
              <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                Ready to Sleep Well in Thamel, Kathmandu?
              </h2>
              <p class="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8 font-light">
                Enjoy clean rooms, quiet nights, 24/7 hot showers, and trekker luggage storage. Book directly with Hotel Sherpa Soul for the best rates and instant WhatsApp support.
              </p>
              <div class="flex flex-wrap items-center justify-center gap-4">
                <a href="/book-now" class="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#FB6C01] to-amber-500 hover:from-amber-600 hover:to-[#FB6C01] text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 min-h-[48px]">
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                  <span>Book Direct &amp; Save 10%</span>
                </a>
                <a href="tel:+9779851068219" class="w-full sm:w-auto px-6 py-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#01366E] border border-white/40 font-semibold text-base transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 min-h-[48px]">
                  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>Call +977 9851068219</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
      ${FOOTER_HTML}
    `
  },
  {
    path: '/rooms',
    title: 'Rooms & Rates | Budget Family & Deluxe Rooms | Hotel Sherpa Soul',
    description: 'Explore boutique rooms at Hotel Sherpa Soul in Thamel, Kathmandu. Choose from Budget Family, Deluxe AC, and Family Rooms with en-suite baths and fiber Wi-Fi.',
    canonical: 'https://hotelsherpasoul.com/rooms',
    ogImage: 'https://hotelsherpasoul.com/triple.webp',
    preload: `
    <link rel="preload" as="image" href="/changes_photo/singlesitter-mobile.webp" type="image/webp" media="(max-width: 768px)" fetchpriority="high" />
    <link rel="preload" as="image" href="/changes_photo/singlesitter.webp" type="image/webp" media="(min-width: 769px)" fetchpriority="high" />
    `,
    content: `
      ${NAV_HTML}
      <div>
        <div class="relative w-full h-screen overflow-hidden bg-slate-900">
          <picture>
            <source media="(max-width: 768px)" srcset="/changes_photo/singlesitter-mobile.webp" type="image/webp" />
            <source media="(min-width: 769px)" srcset="/changes_photo/singlesitter.webp" type="image/webp" />
            <img
              src="/changes_photo/singlesitter.webp"
              alt="Hotel Sherpa Soul comfortable and quiet rooms in Thamel Kathmandu"
              class="absolute top-0 left-0 w-full h-full object-cover scale-110"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              width="960"
              height="720"
            />
          </picture>
          <div class="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent z-10 pointer-events-none"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10 pointer-events-none"></div>
          <div class="relative z-20 flex flex-col justify-end h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-20 text-white">
            <div class="space-y-8 max-w-4xl">
              <div class="flex items-center gap-4 text-white/90 mb-8">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-full blur-lg"></div>
                  <div class="relative w-12 h-12 flex items-center justify-center">
                    <svg class="w-6 h-6 transition-transform hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke-width="1.5"></circle>
                      <polyline points="12,6 12,12 16,14" stroke-width="1.5"></polyline>
                    </svg>
                  </div>
                </div>
                <div class="flex flex-col">
                  <span class="text-lg md:text-xl font-semibold tracking-wide">Hotel Sherpa Soul</span>
                  <span class="text-sm md:text-base text-white/70 font-light">Thamel, Kathmandu</span>
                </div>
              </div>
              <div>
                <h1 class="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
                  <span class="block">Comfortable Rooms for</span>
                  <span class="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/80">Different Ways of Travelling</span>
                </h1>
                <p class="text-lg md:text-2xl font-extralight text-white/80 max-w-3xl leading-relaxed">
                  Every traveller has a different reason for coming to Kathmandu. Our room categories are designed around simple, practical comfort.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 md:py-16">
          <div class="text-center mb-12 px-4">
            <p class="text-xs text-[#FB6C01] uppercase tracking-[0.3em] mb-3 font-semibold">OUR SANCTUARY</p>
            <h2 class="text-3xl md:text-5xl lg:text-6xl font-bold text-[#01366E] mb-4">Rooms & Suites</h2>
            <p class="text-gray-600 max-w-2xl mx-auto text-sm md:text-base mb-2">Discover comfort and elegance in our thoughtfully designed accommodations</p>
            <p class="text-gray-500 text-sm">3 Room Categories Available</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4">
            <div class="group relative bg-white rounded-2xl shadow-md overflow-hidden">
              <div class="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-slate-100">
                <img src="/triple.webp" alt="Budget Family Room - Hotel Sherpa Soul Kathmandu" class="w-full h-full object-cover" loading="lazy" decoding="async" width="400" height="256" />
                <div class="absolute top-4 right-4 bg-[#01366E]/95 text-white px-3.5 py-1.5 rounded-xl text-right">
                  <div class="flex items-center gap-1"><span class="text-[#FB6C01] font-bold text-sm sm:text-base">$20 USD</span><span class="text-xs opacity-80">/ night</span></div>
                  <span class="text-amber-200 text-xs font-medium">~NPR 2,700</span>
                </div>
                <div class="absolute top-4 left-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">🔥 Only 2 rooms left!</div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-[#01366E] mb-1">Budget Family Room</h3>
                <p class="text-xs text-slate-500 mb-4">3 Adults, 1 Child • 1 King Bed + 1 Single Bed</p>
                <p class="text-sm text-slate-600 leading-relaxed mb-6">Features 1 King Bed + 1 Single Bed, en-suite bathroom, 24/7 hot shower, free Wi-Fi, and shared kitchen privileges.</p>
                <div class="flex items-center gap-3">
                  <a href="/book/budget-family-room" class="flex-1 py-3 px-4 bg-gradient-to-r from-[#FB6C01] to-amber-500 text-white text-center font-bold rounded-xl text-sm shadow-md">Book Room &rarr;</a>
                </div>
              </div>
            </div>

            <div class="group relative bg-white rounded-2xl shadow-md overflow-hidden">
              <div class="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-slate-100">
                <img src="/changes_photo/singleBedWithSofa.webp" alt="Deluxe Room (AC) - Hotel Sherpa Soul Kathmandu" class="w-full h-full object-cover" loading="lazy" decoding="async" width="400" height="256" />
                <div class="absolute top-4 right-4 bg-[#01366E]/95 text-white px-3.5 py-1.5 rounded-xl text-right">
                  <div class="flex items-center gap-1"><span class="text-[#FB6C01] font-bold text-sm sm:text-base">$20 USD</span><span class="text-xs opacity-80">/ night</span></div>
                  <span class="text-amber-200 text-xs font-medium">~NPR 2,700</span>
                </div>
                <div class="absolute top-4 left-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">🔥 Only 2 rooms left!</div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-[#01366E] mb-1">Deluxe Room (AC)</h3>
                <p class="text-xs text-slate-500 mb-4">2 Adults, 1 Child • 1 King Bed • Air Conditioned</p>
                <p class="text-sm text-slate-600 leading-relaxed mb-6">Air-conditioned boutique room with king bed, sofa seating, private modern bathroom, fast Wi-Fi, and peaceful atmosphere.</p>
                <div class="flex items-center gap-3">
                  <a href="/book/deluxe-room" class="flex-1 py-3 px-4 bg-gradient-to-r from-[#FB6C01] to-amber-500 text-white text-center font-bold rounded-xl text-sm shadow-md">Book Room &rarr;</a>
                </div>
              </div>
            </div>

            <div class="group relative bg-white rounded-2xl shadow-md overflow-hidden">
              <div class="relative h-48 sm:h-56 lg:h-64 overflow-hidden bg-slate-100">
                <img src="/changes_photo/doubleBed.webp" alt="Family Room (AC) - Hotel Sherpa Soul Kathmandu" class="w-full h-full object-cover" loading="lazy" decoding="async" width="400" height="256" />
                <div class="absolute top-4 right-4 bg-[#01366E]/95 text-white px-3.5 py-1.5 rounded-xl text-right">
                  <div class="flex items-center gap-1"><span class="text-[#FB6C01] font-bold text-sm sm:text-base">$30 USD</span><span class="text-xs opacity-80">/ night</span></div>
                  <span class="text-amber-200 text-xs font-medium">~NPR 4,000</span>
                </div>
                <div class="absolute top-4 left-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">🔥 Only 2 rooms left!</div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-[#01366E] mb-1">Family Room (AC)</h3>
                <p class="text-xs text-slate-500 mb-4">3 Adults, 1 Child • King Bed + Single Bed • AC</p>
                <p class="text-sm text-slate-600 leading-relaxed mb-6">Extra spacious deluxe family accommodation with air conditioning, premium linen, hot shower, and shared kitchen access.</p>
                <div class="flex items-center gap-3">
                  <a href="/book/family-room" class="flex-1 py-3 px-4 bg-gradient-to-r from-[#FB6C01] to-amber-500 text-white text-center font-bold rounded-xl text-sm shadow-md">Book Room &rarr;</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Helpful Links Banner -->
          <div class="max-w-4xl mx-auto mt-14 px-4 text-center">
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="text-left">
                <h4 class="font-bold text-[#01366E] text-sm sm:text-base">Planning Your Stay at Hotel Sherpa Soul?</h4>
                <p class="text-xs sm:text-sm text-slate-600 mt-0.5">Read our check-in policies, quiet hours, shared kitchen etiquette, and privacy disclosures.</p>
              </div>
              <div class="flex items-center gap-3 shrink-0">
                <a href="/guest-guide" class="px-4 py-2 bg-slate-100 hover:bg-[#FB6C01] hover:text-white text-slate-800 text-xs font-bold rounded-xl transition-all">
                  Guest Guide &amp; Rules &rarr;
                </a>
                <a href="/privacy" class="px-4 py-2 bg-slate-100 hover:bg-[#01366E] hover:text-white text-slate-800 text-xs font-bold rounded-xl transition-all">
                  Privacy Policy &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      ${FOOTER_HTML}
    `
  },
  {
    path: '/about',
    title: 'About Hotel Sherpa Soul | Peaceful Boutique Hotel in Thamel Kathmandu',
    description: 'Learn about Hotel Sherpa Soul in Thamel, Kathmandu. Created for travelers who value restful sleep, authentic Himalayan hospitality, and quiet boutique rooms.',
    canonical: 'https://hotelsherpasoul.com/about',
    ogImage: 'https://hotelsherpasoul.com/hero1.webp',
    preload: `
    <link rel="preload" as="image" href="/changes_photo/singlesitter-mobile.webp" type="image/webp" media="(max-width: 768px)" fetchpriority="high" />
    <link rel="preload" as="image" href="/changes_photo/singlesitter.webp" type="image/webp" media="(min-width: 769px)" fetchpriority="high" />
    `,
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14">
          <span class="text-xs font-bold tracking-widest text-[#FB6C01] uppercase bg-amber-100 px-3 py-1 rounded-full">OUR STORY</span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-[#01366E] mt-3 mb-4">About Hotel Sherpa Soul</h1>
          <p class="text-slate-600 text-base sm:text-lg leading-relaxed">Authentic Himalayan hospitality, quiet rooms, and honest hospitality in the heart of Thamel, Kathmandu.</p>
        </div>

        <div class="space-y-12">
          <section class="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-slate-700 leading-relaxed text-base">
            <h2 class="text-2xl font-bold text-[#01366E]">Born from the High Himalayas</h2>
            <p>Hotel Sherpa Soul was founded by a local family with roots in the Solukhumbu region of Nepal—the legendary homeland of Mount Everest. For generations, the Sherpa people have been celebrated worldwide for their strength, quiet resilience, and profound tradition of hospitality to travelers passing through high mountain passes.</p>
            <p>We created Hotel Sherpa Soul to bring that authentic spirit down into Kathmandu: providing an unpretentious, warm, and thoroughly restful haven where travelers from all over the world can recharge between adventures.</p>
          </section>

          <section class="p-8 sm:p-10 rounded-3xl bg-amber-50/60 border border-amber-200 shadow-sm space-y-4 text-slate-700 leading-relaxed text-base">
            <h2 class="text-2xl font-bold text-[#01366E]">The Philosophy: "No Restaurant. No Noise. Sleep Well."</h2>
            <p>Kathmandu is one of Asia's most exciting cities, filled with ancient temples, bustling markets, and mountain energy. But after a full day of sightseeing or a 15-day trek along the Annapurna Circuit, what travelers need most is quiet, deep, restorative sleep.</p>
            <p>Many hotels in Thamel feature loud ground-floor bars, sports lounges, or rooftop nightclubs that blast music past midnight. We made a conscious, deliberate choice to do the opposite: we operate no noisy public bar or commercial restaurant inside our hotel. Instead, our rooms remain peacefully insulated from party and traffic sounds, while our shared rooftop kitchen allows guests to brew their own morning tea and prepare healthy meals at leisure.</p>
          </section>

          <section class="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-slate-700 leading-relaxed text-base">
            <h2 class="text-2xl font-bold text-[#01366E]">Prime Location on Thamel Bhagawati Marg</h2>
            <p>Situated on Bhagawati Marg 26, Hotel Sherpa Soul gives you the ultimate Kathmandu location advantage: you are a mere 2-minute stroll from central Thamel's shopping lanes, 4 minutes from the serene Garden of Dreams, and 7 minutes from the upscale dining and bank ATMs of Durbar Marg (King's Way). Yet because Bhagawati Marg is a wider, quieter residential street, you bypass the narrow alley traffic jams that plague inner Thamel.</p>
            <div class="pt-4 flex flex-wrap items-center gap-4 text-sm font-bold">
              <a href="/rooms" class="text-[#FB6C01] hover:underline">View Our Rooms &rarr;</a>
              <a href="/services" class="text-[#01366E] hover:underline">Explore Hotel Services &rarr;</a>
              <a href="/contact" class="text-emerald-700 hover:underline">Contact Front Desk &rarr;</a>
            </div>
          </section>
        </div>
      </main>
      ${FOOTER_HTML}
`
  },
  {
    path: '/services',
    title: 'Services & Amenities | Shared Kitchen & Facilities | Hotel Sherpa Soul',
    description: 'Explore amenities at Hotel Sherpa Soul in Thamel: shared guest kitchen, 24/7 hot showers, high-speed fiber Wi-Fi, trekking luggage storage, and airport pickup.',
    canonical: 'https://hotelsherpasoul.com/services',
    ogImage: 'https://hotelsherpasoul.com/hero1.webp',
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-28 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14">
          <span class="text-xs font-bold tracking-widest text-[#FB6C01] uppercase bg-amber-100 px-3 py-1 rounded-full">HOTEL FACILITIES</span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-[#01366E] mt-3 mb-4">Services &amp; Facilities at Hotel Sherpa Soul</h1>
          <p class="text-slate-600 text-base sm:text-lg leading-relaxed">Thoughtfully designed for Himalayan trekkers, international vacationers, and long-stay guests looking for practical comfort in Thamel, Kathmandu.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div class="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-2xl bg-amber-100 text-[#FB6C01] flex items-center justify-center text-2xl mb-5">🍳</div>
            <h2 class="text-xl font-bold text-[#01366E] mb-2">Shared Guest Kitchen</h2>
            <p class="text-slate-600 text-sm leading-relaxed">Our clean, fully-equipped rooftop kitchen is free for all guests. Includes gas burners, cookware, microwave, refrigerator, and purified water. Ideal for preparing home meals, brewing morning tea, or catering to specific dietary needs.</p>
          </div>

          <div class="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-2xl bg-blue-100 text-[#01366E] flex items-center justify-center text-2xl mb-5">🚿</div>
            <h2 class="text-xl font-bold text-[#01366E] mb-2">24/7 Hot Water Showers</h2>
            <p class="text-slate-600 text-sm leading-relaxed">Continuous, high-pressure hot water available day and night. Powered by commercial solar heating with electric geyser backup to ensure you always have a steaming hot shower after trekking or arriving from flights.</p>
          </div>

          <div class="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-5">🛄</div>
            <h2 class="text-xl font-bold text-[#01366E] mb-2">Free Trekker Luggage Storage</h2>
            <p class="text-slate-600 text-sm leading-relaxed">Complimentary secure luggage lockup for all guests embarking on Himalayan treks (Everest Base Camp, Annapurna, Langtang). Leave city clothes and heavy suitcases safely behind without daily storage fees.</p>
          </div>

          <div class="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-5">📶</div>
            <h2 class="text-xl font-bold text-[#01366E] mb-2">High-Speed Fiber Wi-Fi</h2>
            <p class="text-slate-600 text-sm leading-relaxed">Reliable dual-band fiber internet with repeaters on every floor. Perfect for remote workers, video conferencing, itinerary planning, and streaming media without buffering interruptions.</p>
          </div>

          <div class="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl mb-5">🚐</div>
            <h2 class="text-xl font-bold text-[#01366E] mb-2">Airport Transfers &amp; Taxis</h2>
            <p class="text-slate-600 text-sm leading-relaxed">Pre-arranged private transfers to and from Tribhuvan International Airport (TIA). Our driver meets you outside arrival gates with a personalized sign, ensuring a smooth and hassle-free journey directly to our hotel.</p>
          </div>

          <div class="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl mb-5">🏔️</div>
            <h2 class="text-xl font-bold text-[#01366E] mb-2">Trek &amp; Tour Assistance</h2>
            <p class="text-slate-600 text-sm leading-relaxed">Benefit from genuine Sherpa mountaineering advice. We assist with mountain flight tickets to Lukla, Pokhara tourist buses, national park permits, certified local trekking guides, and Kathmandu heritage tours.</p>
          </div>
        </div>

        <!-- Practical Perks Section -->
        <div class="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#01366E] to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 class="text-2xl font-bold mb-2">Ready to Book Your Peaceful Stay?</h3>
            <p class="text-slate-300 text-sm sm:text-base">Reserve directly through our official website to enjoy our lowest price guarantee and an instant 10% discount on all room categories.</p>
          </div>
          <div class="flex items-center gap-4 flex-shrink-0">
            <a href="/rooms" class="px-6 py-3.5 rounded-xl bg-[#FB6C01] hover:bg-[#e05a00] text-white font-bold text-sm shadow-lg transition-all">Explore Rooms &rarr;</a>
            <a href="/contact" class="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all">Contact Us</a>
          </div>
        </div>
      </main>
      ${FOOTER_HTML}
`
  },
  {
    path: '/contact',
    title: 'Contact Hotel Sherpa Soul | Location in Thamel Kathmandu',
    description: 'Contact Hotel Sherpa Soul in Thamel, Kathmandu. Call +977-9851068219 or WhatsApp +977-9818259472 for direct room reservations, airport pickup, and inquiries.',
    canonical: 'https://hotelsherpasoul.com/contact',
    ogImage: 'https://hotelsherpasoul.com/hero1.webp',
    preload: `
    <link rel="preload" as="image" href="/changes_photo/doubleBed-mobile.webp" type="image/webp" media="(max-width: 768px)" fetchpriority="high" />
    <link rel="preload" as="image" href="/changes_photo/doubleBed.webp" type="image/webp" media="(min-width: 769px)" fetchpriority="high" />
    `,
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-800">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="text-xs font-bold tracking-widest text-[#FB6C01] uppercase bg-amber-100 px-3.5 py-1 rounded-full">24/7 FRONT DESK &amp; TRAVEL DESK</span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-[#01366E] mt-3 mb-4">Contact Hotel Sherpa Soul</h1>
          <p class="text-slate-600 text-base sm:text-lg leading-relaxed">Reach our friendly Sherpa family team directly for room reservations, private airport transfers, trekking logistics, and personalized Kathmandu recommendations.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <!-- Primary Contact Information Card -->
          <div class="lg:col-span-7 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <h2 class="text-2xl font-bold text-[#01366E] border-b border-slate-100 pb-3">Get in Touch Directly</h2>
            <p class="text-slate-700 text-base leading-relaxed">Whether you are arriving late at night from an international flight, coordinating early morning departures for Himalayan trails, or seeking direct booking rates, our reception desk is open 24 hours a day, 7 days a week.</p>
            
            <div class="space-y-4 text-slate-700 text-sm sm:text-base">
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span class="text-xl">📍</span>
                <div>
                  <strong>Physical Address:</strong><br />
                  <span>Hotel Sherpa Soul, Thamel Bhagawati Marg 26, Kathmandu 44600, Bagmati Province, Nepal</span>
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <span class="text-xl">💬</span>
                <div>
                  <strong>WhatsApp &amp; Fast Messaging:</strong><br />
                  <a href="https://wa.me/9779818259472" class="text-emerald-700 font-bold hover:underline">+977 9818259472 (Instant Assistance &amp; Room Holds)</a>
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <span class="text-xl">📞</span>
                <div>
                  <strong>Front Desk Direct Phone:</strong><br />
                  <a href="tel:+9779851068219" class="text-[#FB6C01] font-bold hover:underline">+977-9851068219</a> / <a href="tel:+9779818259472" class="text-[#FB6C01] font-bold hover:underline">+977-9818259472</a>
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
                <span class="text-xl">✉️</span>
                <div>
                  <strong>Email Inquiries:</strong><br />
                  <a href="mailto:info@hotelsherpasoul.com" class="text-[#01366E] font-bold hover:underline">info@hotelsherpasoul.com</a>
                </div>
              </div>
            </div>

            <div class="pt-2 flex flex-wrap gap-4 text-sm font-bold">
              <a href="/book-now" class="inline-block py-3 px-6 bg-[#FB6C01] hover:bg-[#e05a00] text-white font-bold rounded-xl shadow-md transition-all">Book Online &amp; Save 10% &rarr;</a>
              <a href="/rooms" class="inline-block py-3 px-6 bg-[#01366E] hover:bg-[#024a94] text-white font-bold rounded-xl shadow-md transition-all">View All Rooms &rarr;</a>
            </div>
          </div>

          <!-- Directions & Airport Transit Card -->
          <div class="lg:col-span-5 p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
            <h2 class="text-2xl font-bold text-amber-400 border-b border-slate-700 pb-3">How to Find Us</h2>
            
            <div class="space-y-4 text-sm text-slate-200 leading-relaxed">
              <div>
                <h3 class="font-bold text-white text-base mb-1">From Tribhuvan Airport (TIA):</h3>
                <p>Located approximately 6.5 kilometers west of the airport. Driving time is 20-35 minutes depending on traffic. We offer private pre-arranged airport pickups with a driver holding your name placard at the arrival exit for $15 USD.</p>
              </div>

              <div>
                <h3 class="font-bold text-white text-base mb-1">Walking From Local Landmarks:</h3>
                <ul class="space-y-1.5 list-disc pl-5">
                  <li><strong>Garden of Dreams:</strong> 4-minute walk (350 meters)</li>
                  <li><strong>Durbar Marg (King's Way):</strong> 7-minute walk (600 meters)</li>
                  <li><strong>Sorhakhutte Tourist Bus Station:</strong> 5-minute walk (450 meters)</li>
                  <li><strong>Kathmandu Durbar Square:</strong> 15-minute scenic stroll</li>
                </ul>
              </div>

              <div class="pt-2 border-t border-slate-800 text-xs text-slate-400">
                <p><strong>Check-in Time:</strong> 14:00 (2:00 PM) | <strong>Check-out Time:</strong> 11:00 AM (or 12:00 PM upon request)</p>
                <p class="mt-1">Complimentary secure luggage lockup is available for all guests while trekking in the Himalayas.</p>
                <p class="mt-2 text-slate-300">Need house rules, Wi-Fi, or privacy details? View our <a href="/guest-guide" class="text-amber-300 underline font-semibold">Guest Guide &amp; House Rules</a> and <a href="/privacy" class="text-amber-300 underline font-semibold">Privacy Policy</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      ${FOOTER_HTML}
    `
  },
  {
    path: '/book-now',
    title: 'Book Direct & Save 10% | Hotel Sherpa Soul Kathmandu',
    description: 'Book your stay directly at Hotel Sherpa Soul for the lowest price guaranteed, instant confirmation, 10% off promotion, and authentic Himalayan hospitality.',
    canonical: 'https://hotelsherpasoul.com/book-now',
    ogImage: 'https://hotelsherpasoul.com/hero1.webp',
    preload: `
    <link rel="preload" as="image" href="/hero/hero1-mobile.webp" type="image/webp" media="(max-width: 768px)" fetchpriority="high" />
    <link rel="preload" as="image" href="/hero/hero1.webp" type="image/webp" media="(min-width: 769px)" fetchpriority="high" />
    `,
    content: getBookingPageContent('Reserve Your Peaceful Stay', 1)
  },
  {
    path: '/room/budget-family-room',
    title: 'Budget Family Room | Hotel Sherpa Soul Thamel Kathmandu',
    description: 'Book Budget Family Room at Hotel Sherpa Soul in Thamel, Kathmandu. Features 1 King and 1 Single Bed, attached hot shower, fast Wi-Fi, and 10% direct discount.',
    canonical: 'https://hotelsherpasoul.com/room/budget-family-room',
    ogImage: 'https://hotelsherpasoul.com/triple.webp',
    preload: `
    <link rel="preload" as="image" href="/triple.webp" type="image/webp" fetchpriority="high" />
    `,
    content: getBookingPageContent('Budget Family Room ($20 / ~NPR 2,700)', 1)
  },
  {
    path: '/room/deluxe-room',
    title: 'Deluxe Room (AC) | Hotel Sherpa Soul Thamel Kathmandu',
    description: 'Stay in Deluxe AC Room at Hotel Sherpa Soul in Thamel, Kathmandu. Features King size bed, climate control, quiet atmosphere, hot shower, and 10% direct saving.',
    canonical: 'https://hotelsherpasoul.com/room/deluxe-room',
    ogImage: 'https://hotelsherpasoul.com/changes_photo/deluxeRoom_ai.webp',
    preload: `
    <link rel="preload" as="image" href="/changes_photo/deluxeRoom_ai.webp" type="image/webp" fetchpriority="high" />
    `,
    content: getBookingPageContent('Deluxe Room (AC) ($20 / ~NPR 2,700)', 2)
  },
  {
    path: '/room/family-room',
    title: 'Family Room (AC) | Hotel Sherpa Soul Thamel Kathmandu',
    description: 'Book Spacious Family AC Room at Hotel Sherpa Soul in Thamel, Kathmandu. Features King plus Single Bed, air conditioning, private washroom, and kitchen access.',
    canonical: 'https://hotelsherpasoul.com/room/family-room',
    ogImage: 'https://hotelsherpasoul.com/changes_photo/doubleBed.webp',
    preload: `
    <link rel="preload" as="image" href="/changes_photo/doubleBed.webp" type="image/webp" fetchpriority="high" />
    `,
    content: getBookingPageContent('Family Room (AC) ($30 / ~NPR 4,000)', 3)
  },
  {
    path: '/book/budget-family-room',
    title: 'Book Budget Family Room | Hotel Sherpa Soul Kathmandu',
    description: 'Direct reservation for Budget Family Room at Hotel Sherpa Soul, Thamel Kathmandu. Enjoy King plus Single Bed, free luggage storage, and 10% direct discount.',
    canonical: 'https://hotelsherpasoul.com/book/budget-family-room',
    ogImage: 'https://hotelsherpasoul.com/triple.webp',
    preload: `
    <link rel="preload" as="image" href="/triple.webp" type="image/webp" fetchpriority="high" />
    `,
    content: getBookingPageContent('Book Budget Family Room ($20 / ~NPR 2,700)', 1)
  },
  {
    path: '/book/deluxe-room',
    title: 'Book Deluxe Room (AC) | Hotel Sherpa Soul Kathmandu',
    description: 'Direct reservation for Deluxe AC Room at Hotel Sherpa Soul, Thamel Kathmandu. Enjoy King bed, private bath, quiet restful sleep, and 10% instant discount.',
    canonical: 'https://hotelsherpasoul.com/book/deluxe-room',
    ogImage: 'https://hotelsherpasoul.com/changes_photo/singleBedWithSofa.webp',
    preload: `
    <link rel="preload" as="image" href="/changes_photo/singleBedWithSofa.webp" type="image/webp" fetchpriority="high" />
    `,
    content: getBookingPageContent('Book Deluxe Room (AC) ($20 / ~NPR 2,700)', 2)
  },
  {
    path: '/book/family-room',
    title: 'Book Family Room (AC) | Hotel Sherpa Soul Kathmandu',
    description: 'Direct reservation for Family AC Room at Hotel Sherpa Soul, Thamel Kathmandu. Features King and Single bed, air conditioning, and 10% direct booking saving.',
    canonical: 'https://hotelsherpasoul.com/book/family-room',
    ogImage: 'https://hotelsherpasoul.com/changes_photo/doubleBed.webp',
    preload: `
    <link rel="preload" as="image" href="/changes_photo/doubleBed-mobile.webp" type="image/webp" media="(max-width: 768px)" fetchpriority="high" />
    <link rel="preload" as="image" href="/changes_photo/doubleBed.webp" type="image/webp" media="(min-width: 769px)" fetchpriority="high" />
    `,
    content: getBookingPageContent('Book Family Room (AC) ($30 / ~NPR 4,000)', 3)
  },
  {
    path: '/gallery',
    title: 'Photo & Video Gallery | Rooms & Facilities | Hotel Sherpa Soul',
    description: 'View photos and videos of Hotel Sherpa Soul in Thamel, Kathmandu. Browse quiet guest rooms, private bathrooms, shared guest kitchen, and Himalayan city views.',
    canonical: 'https://hotelsherpasoul.com/gallery',
    ogImage: 'https://doiurqcy6roxkmyq.public.blob.vercel-storage.com/cms-uploads/hotel-sherpa-soul-entrance-reception-yZXLIoQxMJa12KXxDK3ZonYaKKz3Ck.webp',
    preload: `
    <link rel="preload" as="image" href="/front-desk.webp" type="image/webp" fetchpriority="high" />
    `,
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14">
          <span class="text-xs font-bold tracking-widest text-[#FB6C01] uppercase bg-amber-100 px-3 py-1 rounded-full">VISUAL TOUR</span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-[#01366E] mt-3 mb-4">Hotel Sherpa Soul Photo &amp; Video Gallery</h1>
          <p class="text-slate-600 text-base sm:text-lg leading-relaxed">Take a visual tour of our quiet boutique rooms, shared guest kitchen, private balconies, and 24/7 reception in Thamel, Kathmandu.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div class="space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <img src="/front-desk.webp" alt="Hotel Sherpa Soul Entrance Corridor &amp; 24/7 Reception" class="w-full h-56 object-cover rounded-xl" width="400" height="240" loading="eager" />
            <h3 class="font-bold text-[#01366E] text-base">Reception &amp; Lobby</h3>
            <p class="text-slate-600 text-xs leading-relaxed">Welcoming front desk staffed 24 hours a day with local travel assistance and secure luggage holding.</p>
          </div>

          <div class="space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <img src="/changes_photo/singleBedWithSofa.webp" alt="Deluxe Room with AC &amp; King Bed - Hotel Sherpa Soul" class="w-full h-56 object-cover rounded-xl" width="400" height="240" loading="lazy" />
            <h3 class="font-bold text-[#01366E] text-base">Deluxe Room (AC)</h3>
            <p class="text-slate-600 text-xs leading-relaxed">Spacious boutique room with King bed, sofa seating, private bathroom, and air conditioning.</p>
          </div>

          <div class="space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <img src="/triple.webp" alt="Budget Family Room with King and Single Bed" class="w-full h-56 object-cover rounded-xl" width="400" height="240" loading="lazy" />
            <h3 class="font-bold text-[#01366E] text-base">Budget Family Room</h3>
            <p class="text-slate-600 text-xs leading-relaxed">Comfortable family accommodation featuring 1 King Bed plus 1 Single Bed with attached hot shower.</p>
          </div>

          <div class="space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <img src="/changes_photo/doubleBed.webp" alt="Family AC Room with City Views" class="w-full h-56 object-cover rounded-xl" width="400" height="240" loading="lazy" />
            <h3 class="font-bold text-[#01366E] text-base">Family Room (AC)</h3>
            <p class="text-slate-600 text-xs leading-relaxed">Air-conditioned family suite with natural sunlight, wardrobe storage, and city mountain vistas.</p>
          </div>
        </div>

        <section class="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-slate-700 leading-relaxed mb-12">
          <h2 class="text-2xl font-bold text-[#01366E]">What You Will Experience at Hotel Sherpa Soul</h2>
          <p>Every photo in our gallery reflects our genuine, unedited hotel environment on Thamel Bhagawati Marg 26. We prioritize cleanliness, natural ventilation, quality orthopedic mattresses, and high-pressure hot water.</p>
          <p>Our shared rooftop guest kitchen is fully stocked for guest cooking, and our rooftop terrace offers sweeping views of the Kathmandu valley and surrounding green hills. Whether relaxing after a long international flight or recovering from a mountain expedition, our hotel provides an authentic, quiet home base.</p>
          <div class="pt-2 flex flex-wrap gap-4 text-sm font-bold">
            <a href="/rooms" class="text-[#FB6C01] hover:underline">Check Room Availability &rarr;</a>
            <a href="/book-now" class="text-[#01366E] hover:underline">Book Online (Save 10%) &rarr;</a>
            <a href="/services" class="text-emerald-700 hover:underline">View Hotel Services &rarr;</a>
          </div>
        </section>
      </main>
      ${FOOTER_HTML}
`
  },
  {
    path: '/blog',
    title: 'Kathmandu & Thamel Travel Guide | Hotel Sherpa Soul Blog',
    description: 'Explore Kathmandu travel advice, Thamel neighborhood guides, Everest trekking preparation tips, and local dining insights from the Hotel Sherpa Soul team.',
    canonical: 'https://hotelsherpasoul.com/blog',
    ogImage: 'https://hotelsherpasoul.com/hero1.webp',
    preload: `
    <link rel="preload" as="image" href="/hero2-mobile.webp" type="image/webp" media="(max-width: 768px)" fetchpriority="high" />
    <link rel="preload" as="image" href="/hero2.webp" type="image/webp" media="(min-width: 769px)" fetchpriority="high" />
    `,
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14">
          <span class="text-xs font-bold tracking-widest text-[#FB6C01] uppercase bg-amber-100 px-3 py-1 rounded-full">OFFICIAL TRAVEL GUIDES</span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-[#01366E] mt-3 mb-4">Kathmandu &amp; Thamel Travel Guides</h1>
          <p class="text-slate-600 text-base sm:text-lg leading-relaxed">Expert local advice, neighborhood guides, budget accommodation tips, and trekking logistics from the Hotel Sherpa Soul team in Thamel, Kathmandu.</p>
        </div>

        <div class="space-y-16">
          <!-- Article 1: Budget Hotels in Thamel -->
          <article class="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <span class="text-xs font-bold px-3 py-1 bg-blue-50 text-[#01366E] rounded-full uppercase tracking-wider">Accommodation Guide • 7 Min Read</span>
            <h2 class="text-2xl sm:text-4xl font-extrabold text-[#01366E] tracking-tight">The Complete Guide to Budget Hotels in Thamel, Kathmandu (2026 Edition)</h2>
            <div class="prose max-w-none text-slate-700 text-base leading-relaxed space-y-4">
              <p>Thamel has long been celebrated as the undisputed epicenter of budget travel in Nepal. Packed with hundreds of lodges, cafes, handicraft stalls, and trekking agencies, this vibrant neighborhood welcomes international adventurers, solo backpackers, cultural explorers, and mountaineers every day.</p>
              <p>However, finding the right budget hotels in Thamel Kathmandu can often feel like a gamble. Behind attractive online photos, travelers frequently encounter unexpected issues: deafening street noise from late-night nightclubs, erratic solar hot water on chilly winter mornings, hidden service charges, and cramped windowless rooms.</p>
              
              <h3 class="text-xl font-bold text-[#01366E] pt-2">5 Critical Checks Before You Book a Budget Hotel in Thamel</h3>
              <ul class="list-disc pl-6 space-y-2">
                <li><strong>Noise Insulation:</strong> Avoid main party streets like Paryatan Marg. Choose quiet residential alleys like Bhagawati Marg where hotels operate without noisy in-house bars.</li>
                <li><strong>True 24/7 Hot Water:</strong> Ensure your hotel has electric backup heating so showers stay piping hot even on cloudy days.</li>
                <li><strong>Free Trekker Luggage Storage:</strong> Save heavy mountain flight fees by storing excess baggage safely while trekking in the Himalayas.</li>
                <li><strong>Shared Self-Kitchen:</strong> Having kitchen access saves money and allows you to brew fresh tea or cook healthy meals.</li>
                <li><strong>Direct Booking 10% Discount:</strong> Book directly to bypass high OTA commissions and lock in lower rates.</li>
              </ul>

              <h3 class="text-xl font-bold text-[#01366E] pt-2">Why Hotel Sherpa Soul Redefines Budget Hospitality</h3>
              <p>At Hotel Sherpa Soul (Bhagawati Marg 26), our "No Restaurant. No Noise. Sleep Well" commitment ensures spotless, peaceful rooms starting at just $20 USD (~NPR 2,700) per night, complete with King beds, en-suite bathrooms, free Wi-Fi, and shared rooftop kitchen privileges.</p>

              <div class="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                <h4 class="font-bold text-[#01366E] text-lg">Frequently Asked Questions (FAQs)</h4>
                <p><strong>Q: What is the average price of a budget hotel in Thamel?</strong><br />A: Quality budget rooms with private bathrooms typically cost $18 to $25 USD (NPR 2,400 to NPR 3,400) per night. Direct bookings at Hotel Sherpa Soul include an exclusive 10% discount.</p>
                <p><strong>Q: Can I store my luggage for free while trekking?</strong><br />A: Yes! Hotel Sherpa Soul provides free, secure luggage holding for all our guests during their mountain treks.</p>
              </div>
            </div>

            <div class="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4 text-sm font-bold">
              <a href="/rooms" class="text-[#FB6C01] hover:underline">View Budget Rooms ($20 / Night) &rarr;</a>
              <a href="/book-now" class="text-[#01366E] hover:underline">Book Direct &amp; Save 10% &rarr;</a>
            </div>
          </article>

          <!-- Article 2: Where to Stay in Thamel for First-Time Visitors -->
          <article class="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <span class="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-900 rounded-full uppercase tracking-wider">Thamel Guide • 8 Min Read</span>
            <h2 class="text-2xl sm:text-4xl font-extrabold text-[#01366E] tracking-tight">Where to Stay in Thamel for First-Time Visitors: Neighborhood Secrets &amp; Noise Survival</h2>
            <div class="prose max-w-none text-slate-700 text-base leading-relaxed space-y-4">
              <p>Arriving in Kathmandu for the first time is an exhilarating immersion. The colorful prayer flags, aromatic incense, and bustling street markets are wonderful, but choosing where to stay in Thamel determines whether you sleep deeply or stay awake listening to nightclub bass.</p>
              <p>Thamel is divided into distinct zones: noisy central party lanes versus peaceful eastern avenues like Bhagawati Marg. Choosing Bhagawati Marg gives you the ultimate convenience: 2 minutes walk from central Thamel, 4 minutes walk from the Garden of Dreams, and 7 minutes from Durbar Marg, while remaining blissfully quiet at night.</p>

              <h3 class="text-xl font-bold text-[#01366E] pt-2">Essential Logistics for First-Time Visitors</h3>
              <ul class="list-disc pl-6 space-y-2">
                <li><strong>Airport Pickups:</strong> Pre-book private hotel transfers to avoid confusing negotiations at Tribhuvan Airport.</li>
                <li><strong>Local SIM Cards:</strong> Obtain an Ncell or Nepal Telecom tourist SIM right at TIA arrivals for inexpensive 4G data.</li>
                <li><strong>ATMs &amp; Money:</strong> Bhagawati Marg features secure bank ATMs with 24/7 security guards accepting international cards.</li>
              </ul>

              <div class="p-6 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-3">
                <h4 class="font-bold text-[#01366E] text-lg">Frequently Asked Questions (FAQs)</h4>
                <p><strong>Q: Is Thamel safe for first-time solo travelers?</strong><br />A: Yes, Thamel is very safe with friendly locals and strong tourist police presence. Family-run hotels with 24/7 front desk teams offer total peace of mind.</p>
                <p><strong>Q: How do I avoid street noise in Kathmandu?</strong><br />A: Select hotels located on Bhagawati Marg that have no in-house bar or live-music restaurant, such as Hotel Sherpa Soul.</p>
              </div>
            </div>

            <div class="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4 text-sm font-bold">
              <a href="/room/deluxe-room" class="text-[#FB6C01] hover:underline">Explore Deluxe AC Rooms &rarr;</a>
              <a href="/guest-guide" class="text-[#01366E] hover:underline">Read Our Official Guest Guide &rarr;</a>
            </div>
          </article>

          <!-- Article 3: Thamel Hotel Near Durbar Marg & Attractions -->
          <article class="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <span class="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-900 rounded-full uppercase tracking-wider">Sightseeing Guide • 8 Min Read</span>
            <h2 class="text-2xl sm:text-4xl font-extrabold text-[#01366E] tracking-tight">Staying in a Thamel Hotel Near Durbar Marg, Garden of Dreams &amp; Kathmandu Attractions</h2>
            <div class="prose max-w-none text-slate-700 text-base leading-relaxed space-y-4">
              <p>Location is everything when exploring Kathmandu. Staying on the eastern border of Thamel (Bhagawati Marg) allows you to effortlessly walk to both bohemian Thamel markets and upscale Durbar Marg (King's Way) within minutes.</p>

              <h3 class="text-xl font-bold text-[#01366E] pt-2">Walking Itinerary From Hotel Sherpa Soul:</h3>
              <ul class="list-disc pl-6 space-y-2">
                <li><strong>Garden of Dreams:</strong> 4-minute walk to tranquil neo-classical gardens, marble fountains, and cafes.</li>
                <li><strong>Narayanhiti Palace Museum:</strong> 7-minute walk to Nepal's modern royal palace on Durbar Marg.</li>
                <li><strong>Kathmandu Durbar Square:</strong> 15-minute heritage stroll through historic Asan spice bazaars to ancient temples.</li>
                <li><strong>Swayambhunath (Monkey Temple):</strong> 25-minute scenic walk or 7-minute taxi ride for panoramic valley views.</li>
                <li><strong>Sorhakhutte Tourist Bus Station:</strong> 5-minute walk for early morning departures to Pokhara and Chitwan.</li>
              </ul>

              <div class="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                <h4 class="font-bold text-[#01366E] text-lg">Frequently Asked Questions (FAQs)</h4>
                <p><strong>Q: How far is Hotel Sherpa Soul from Durbar Marg?</strong><br />A: It is an easy 7-minute walk (approx. 600m) along well-lit sidewalks.</p>
                <p><strong>Q: Can I walk to tourist bus stations in the morning?</strong><br />A: Yes, the Pokhara tourist coach hub at Sorhakhutte is just 5 minutes walk from our door.</p>
              </div>
            </div>

            <div class="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4 text-sm font-bold">
              <a href="/rooms" class="text-[#FB6C01] hover:underline">View All Available Rooms &rarr;</a>
              <a href="/contact" class="text-[#01366E] hover:underline">Contact Front Desk on WhatsApp &rarr;</a>
            </div>
          </article>
        </div>
      </main>
      ${FOOTER_HTML}
`
  },
  {
    path: '/privacy',
    title: 'Privacy Policy & Cookie Disclosures | Hotel Sherpa Soul Kathmandu',
    description: 'Read the Privacy Policy and Cookie Disclosures for Hotel Sherpa Soul in Thamel, Kathmandu. Understand how we protect your personal data, bookings, and privacy.',
    canonical: 'https://hotelsherpasoul.com/privacy',
    ogImage: 'https://hotelsherpasoul.com/hero1.webp',
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-800">
        <h1 class="text-3xl sm:text-5xl font-extrabold text-[#01366E] mb-6">Privacy Policy &amp; Cookie Disclosures</h1>
        <div class="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-slate-700 text-base leading-relaxed">
          <p>Hotel Sherpa Soul (accessible at https://hotelsherpasoul.com) values your privacy. This policy outlines the types of personal information received and collected when you visit our website, submit direct booking inquiries, or communicate with our front desk.</p>

          <h2 class="text-xl font-bold text-[#01366E]">1. Information We Collect</h2>
          <p>When you make an inquiry or room booking, we may collect your name, email address, phone/WhatsApp number, country of residence, check-in/out dates, and specific room preferences. We never store credit card or payment card numbers on our local servers.</p>

          <h2 class="text-xl font-bold text-[#01366E]">2. How We Use Your Information</h2>
          <p>Information is used solely to confirm room reservations, coordinate airport pickups, respond to guest inquiries, and deliver personalized Himalayan hospitality during your stay. We never sell, rent, or trade your personal data to third parties.</p>

          <h2 class="text-xl font-bold text-[#01366E]">3. Analytics &amp; Cookies</h2>
          <p>We use industry-standard web analytics tools including Google Analytics 4 (G-E7Z3QDR3KD) and Meta Pixel to understand website traffic patterns, improve site speed, and measure user engagement. Cookies help remember your preferred language and direct booking discount sessions. You may manage or opt out of non-essential cookies via your browser settings or our cookie consent banner.</p>

          <h2 class="text-xl font-bold text-[#01366E]">4. Contact Details</h2>
          <p>For questions or privacy requests, please contact our data coordinator at <strong>info@hotelsherpasoul.com</strong> or call <strong>+977-9851068219</strong>.</p>
        </div>
      </main>
      ${FOOTER_HTML}
`
  },
  {
    path: '/terms',
    title: 'Terms of Service & Booking Policies | Hotel Sherpa Soul',
    description: 'Review Terms of Service, check-in policies, quiet hours guidelines, and direct booking discount terms at Hotel Sherpa Soul in Thamel Bhagawati Marg, Kathmandu.',
    canonical: 'https://hotelsherpasoul.com/terms',
    ogImage: 'https://hotelsherpasoul.com/hero1.webp',
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-800">
        <h1 class="text-3xl sm:text-5xl font-extrabold text-[#01366E] mb-6">Terms of Service &amp; House Policies</h1>
        <div class="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-slate-700 text-base leading-relaxed">
          <p>Welcome to Hotel Sherpa Soul. By accessing our website (https://hotelsherpasoul.com) or confirming a room reservation, you agree to comply with and be bound by the following terms, conditions, and guest house policies.</p>

          <h2 class="text-xl font-bold text-[#01366E]">1. Check-in and Check-out Policies</h2>
          <p>Standard check-in time is from 14:00 (2:00 PM). Check-out time is by 11:00 AM (or 12:00 PM noon upon prior request). Early check-in and late checkout are subject to room availability on the date of arrival/departure. A valid government photo ID or passport is required upon registration.</p>

          <h2 class="text-xl font-bold text-[#01366E]">2. Direct Booking Guarantee &amp; 10% Discount</h2>
          <p>Guests booking directly through our website (/book-now) or via verified WhatsApp front desk receive a guaranteed 10% discount off standard rates. Best rate guarantee applies to all direct reservations.</p>

          <h2 class="text-xl font-bold text-[#01366E]">3. Quiet Hours &amp; "No Noise" Commitment</h2>
          <p>To honor our brand promise ("No Restaurant. No Noise. Sleep Well"), quiet hours are strictly observed between 22:00 (10:00 PM) and 07:00 (7:00 AM). Guests are kindly requested to respect the peace of fellow travelers in hallways and common stairwells.</p>

          <h2 class="text-xl font-bold text-[#01366E]">4. Shared Kitchen Etiquette</h2>
          <p>The shared rooftop kitchen is provided free of charge for guest convenience. Guests must clean utensils, wipe down counters, and properly dispose of food scraps after use. Smoking is strictly prohibited inside guest rooms.</p>

          <h2 class="text-xl font-bold text-[#01366E]">5. Luggage Storage Terms</h2>
          <p>Complimentary luggage storage is provided to guests trekking in Nepal. While storage areas are locked and monitored, high-value personal valuables (passports, cash, fine jewelry) should be kept with the traveler.</p>
        </div>
      </main>
      ${FOOTER_HTML}
`
  },
  {
    path: '/guest-guide',
    title: 'Guest Guide & House Rules | Hotel Sherpa Soul',
    description: 'Official guest guide and house rules for Hotel Sherpa Soul in Thamel, Kathmandu. Find Wi-Fi details, check-in instructions, quiet hours, and reception help.',
    canonical: 'https://hotelsherpasoul.com/guest-guide',
    ogImage: 'https://hotelsherpasoul.com/hero1.webp',
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-24 sm:pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-800">
        <header class="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 mb-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            Peaceful Hotel in Thamel, Kathmandu
          </div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#01366E] tracking-tight mb-2">
            Hotel Sherpa Soul
          </h1>
          <p class="text-xl sm:text-2xl font-semibold text-[#FB6C01] mb-4">
            Guest Guide &amp; House Rules
          </p>
          <p class="text-slate-600 text-base sm:text-lg leading-relaxed">
            Welcome to Hotel Sherpa Soul! We are happy to have you with us. This guide provides useful information to help you enjoy a clean, comfortable and peaceful stay in Kathmandu.
          </p>
        </header>

        <div class="space-y-8">
          <!-- 1. Wi-Fi Access -->
          <section id="wifi" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <h2 class="text-2xl font-bold text-[#01366E] mb-3">1. Wi-Fi Access</h2>
            <p class="text-slate-600 mb-4">Complimentary fiber Wi-Fi is available in all rooms and common areas.</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span class="text-xs uppercase font-semibold text-slate-500 block mb-1">Network (SSID)</span>
                <span class="text-lg font-mono font-bold text-slate-900 select-all">netis-525AF4</span>
              </div>
              <div class="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                <span class="text-xs uppercase font-semibold text-amber-900 block mb-1">Password</span>
                <span class="text-lg font-mono font-bold text-[#01366E] select-all">thamel@123</span>
              </div>
            </div>
          </section>

          <!-- 2. Check-in & Check-out -->
          <section id="checkin-checkout" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <h2 class="text-2xl font-bold text-[#01366E] mb-4">2. Check-in &amp; Check-out</h2>
            <div class="space-y-3 text-slate-700">
              <p><strong>Check-in:</strong> Please confirm with reception.</p>
              <p><strong>Check-out:</strong> By 11:00 AM.</p>
              <p class="text-sm text-slate-600">Guests who need a late check-out or stay extension should contact reception in advance. Extensions depend on room availability.</p>
              <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
                <div class="space-y-1">
                  <div class="text-xs uppercase font-bold text-emerald-800 tracking-wider">
                    Front Desk • 1-Click Review Request
                  </div>
                  <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Tap to open WhatsApp with the pre-filled 30-second review request ready to send to departing guests.
                  </p>
                </div>
                <a href="https://wa.me/?text=Namaste!%20Thank%20you%20for%20staying%20at%20Hotel%20Sherpa%20Soul%20%F0%9F%99%8F%20If%20you%20enjoyed%20your%20stay%2C%20could%20you%20take%2030%20seconds%20to%20leave%20us%20a%20Google%20review%3F%20It%20helps%20us%20a%20lot%3A%20https%3A%2F%2Fsearch.google.com%2Flocal%2Fwritereview%3Fplaceid%3DChIJE3xLXdEZ6zkR1sgsehATM38" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-md transition-all">
                  Send Review Request on WhatsApp
                </a>
              </div>
            </div>
          </section>

          <!-- 3. Payment Information -->
          <section id="payment" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <h2 class="text-2xl font-bold text-[#01366E] mb-3">3. Payment Information</h2>
            <div class="space-y-2 text-slate-700">
              <p>If you have not completed payment at check-in, please contact reception to settle your outstanding room balance as agreed.</p>
              <p>If you have already paid, you may disregard this reminder.</p>
              <p>For billing questions or payment clarification, please speak with reception.</p>
            </div>
          </section>

          <!-- 4. Hot Water & Room Facilities -->
          <section id="room-facilities" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <h2 class="text-2xl font-bold text-[#01366E] mb-3">4. Hot Water &amp; Room Facilities</h2>
            <ul class="space-y-2 list-disc pl-5 text-slate-700">
              <li>Hot water is available at all times.</li>
              <li>Air conditioning is available only in selected rooms. Room facilities vary by room type.</li>
              <li>If something is not working properly, please inform reception.</li>
            </ul>
          </section>

          <!-- 5. Room Cleaning & Towels -->
          <section id="cleaning" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <h2 class="text-2xl font-bold text-[#01366E] mb-3">5. Room Cleaning &amp; Towels</h2>
            <div class="space-y-2 text-slate-700">
              <p>Room cleaning is available on request.</p>
              <p>Guests may contact reception for cleaning, fresh towels or essential supplies.</p>
            </div>
          </section>

          <!-- 6. Quiet Hours -->
          <section id="quiet-hours" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <h2 class="text-2xl font-bold text-[#01366E] mb-3">6. Quiet Hours</h2>
            <div class="space-y-3 text-slate-700">
              <p class="font-semibold text-slate-900">Quiet hours: 10:00 PM to 7:00 AM.</p>
              <p>Please:</p>
              <ul class="space-y-1.5 list-disc pl-5">
                <li>Keep noise to a minimum during quiet hours.</li>
                <li>Keep conversations and phone calls quiet in corridors and shared spaces.</li>
                <li>Close doors gently.</li>
                <li>Respect other guests' privacy and comfort.</li>
              </ul>
              <p class="text-sm text-slate-600">The goal is to maintain a peaceful sleeping environment for everyone.</p>
            </div>
          </section>

          <!-- 7. Shared Kitchen -->
          <section id="shared-kitchen" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <h2 class="text-2xl font-bold text-[#01366E] mb-3">7. Shared Kitchen</h2>
            <div class="space-y-3 text-slate-700">
              <p>The shared kitchen is available to eligible long-stay guests staying at least two weeks, subject to confirmation with reception.</p>
              <p class="font-semibold text-slate-900">Rules:</p>
              <ul class="space-y-1.5 list-disc pl-5">
                <li>Confirm access with reception before using the kitchen.</li>
                <li>Use your designated food storage space.</li>
                <li>Clean utensils and work surfaces after use.</li>
                <li>Switch off cooking appliances after use.</li>
                <li>Keep the kitchen clean and safe.</li>
              </ul>
            </div>
          </section>

          <!-- 8. Safety & Security -->
          <section id="safety" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <h2 class="text-2xl font-bold text-[#01366E] mb-3">8. Safety &amp; Security</h2>
            <ul class="space-y-2 list-disc pl-5 text-slate-700">
              <li>Lock your room when leaving.</li>
              <li>Keep your valuables and personal belongings secure.</li>
              <li>Report damage, maintenance problems and safety concerns to reception.</li>
              <li>Treat hotel property, staff and fellow guests with respect.</li>
              <li>Follow reasonable safety instructions from hotel staff.</li>
            </ul>
          </section>

          <!-- 9. Legal Compliance & Prohibited Activities -->
          <section id="legal" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <h2 class="text-2xl font-bold text-[#01366E] mb-3">Legal Compliance &amp; Prohibited Activities</h2>
            <div class="space-y-3 text-slate-700">
              <p>All guests must comply with the applicable laws of Nepal while staying at the hotel.</p>
              <p class="font-semibold text-slate-900">The following activities are prohibited on hotel premises:</p>
              <ul class="space-y-1.5 list-disc pl-5">
                <li>Possession, use, sale or distribution of illegal drugs or other substances prohibited by law.</li>
                <li>Human trafficking, exploitation, sexual abuse, or activities involving coercion or minors.</li>
                <li>Theft, fraud, violence, threats, harassment or deliberate damage to hotel property.</li>
                <li>Possession or use of illegal weapons or other items prohibited by law.</li>
                <li>Any other activity prohibited by applicable laws of Nepal.</li>
              </ul>
              <h3 class="font-bold text-slate-900 pt-2">Guest Identification:</h3>
              <p>Guests must provide accurate identification and registration information as required by applicable law and hotel procedures.</p>
              <h3 class="font-bold text-slate-900 pt-2">Safety and Reporting:</h3>
              <p>Guests should inform reception about unsafe or potentially illegal activity.</p>
              <h3 class="font-bold text-slate-900 pt-2">Enforcement:</h3>
              <p>Suspected illegal activity may be reported to the relevant authorities. The hotel will cooperate with lawful requests and take appropriate action in accordance with applicable law.</p>
            </div>
          </section>

          <!-- 10. Local Help & Important Information -->
          <section id="local-help" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <h2 class="text-2xl font-bold text-[#01366E] mb-3">10. Local Help &amp; Important Information</h2>
            <div class="space-y-3 text-slate-700">
              <p>Guests may ask reception for local directions, transport assistance, sightseeing suggestions and general travel information.</p>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p class="font-bold text-slate-900">Important:</p>
                <p class="text-slate-700 text-sm">Hotel Sherpa Soul does not have an on-site restaurant or private parking.</p>
              </div>
            </div>
          </section>

          <!-- 11. Contact Hotel Sherpa Soul -->
          <section id="contact" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <h2 class="text-2xl font-bold text-[#01366E] mb-4">11. Contact Hotel Sherpa Soul</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div class="text-xs uppercase font-bold text-emerald-800">WhatsApp</div>
                <a href="https://wa.me/9779818259472" target="_blank" rel="noopener noreferrer" class="text-base font-bold text-emerald-700 hover:underline">+977 9818259472</a>
              </div>
              <div class="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
                <div class="text-xs uppercase font-bold text-blue-800">Direct Call</div>
                <a href="tel:+9779851068219" class="text-base font-bold text-[#01366E] hover:underline">+977 9851068219</a>
              </div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="text-xs uppercase font-bold text-slate-600">Email</div>
                <a href="mailto:info@hotelsherpasoul.com" class="text-base font-bold text-slate-800 hover:underline">info@hotelsherpasoul.com</a>
              </div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div class="text-xs uppercase font-bold text-slate-600">Website</div>
                <a href="https://www.hotelsherpasoul.com" class="text-base font-bold text-slate-800 hover:underline">www.hotelsherpasoul.com</a>
              </div>
            </div>
          </section>

          <!-- 12. Thank You & Google Review Invitation -->
          <section id="review" class="bg-gradient-to-br from-[#01366E] via-[#0A2540] to-[#01366E] text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-amber-400/30">
            <h2 class="text-2xl sm:text-3xl font-extrabold mb-4">Thank You for Staying with Us!</h2>
            <div class="space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
              <p>We hope you enjoyed a clean, comfortable and peaceful stay at Hotel Sherpa Soul.</p>
              <p>If you enjoyed your experience, we would truly appreciate your honest feedback. Your review helps other travellers discover our hotel and helps our small team continue to improve.</p>
              <p>Thank you for choosing Hotel Sherpa Soul. We wish you safe travels and hope to welcome you again!</p>
            </div>
            <div class="mb-6 text-amber-200 text-sm font-semibold">
              Warm regards,<br />Team Hotel Sherpa Soul
            </div>
            <div>
              <a href="https://search.google.com/local/writereview?placeid=ChIJE3xLXdEZ6zkR1sgsehATM38" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#FB6C01] hover:bg-[#e05a00] text-white font-bold text-base sm:text-lg shadow-xl transition-all">
                Leave Us a Google Review &rarr;
              </a>
            </div>
          </section>
        </div>
      </main>
      ${FOOTER_HTML}
    `
  }
];

function getBreadcrumbSchemaForRoute(route) {
  const baseUrl = "https://hotelsherpasoul.com";
  
  if (route.path === '/') {
    return '';
  }

  const items = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `${baseUrl}/`
    }
  ];

  if (route.path === '/rooms') {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Rooms & Suites",
      "item": `${baseUrl}/rooms`
    });
  } else if (route.path.startsWith('/room/')) {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Rooms",
      "item": `${baseUrl}/rooms`
    });
    const roomSlug = route.path.replace('/room/', '');
    const roomName = roomSlug === 'budget-family-room' ? 'Budget Family Room'
      : roomSlug === 'deluxe-room' ? 'Deluxe Room (AC)'
      : 'Family Room (AC)';
    items.push({
      "@type": "ListItem",
      "position": 3,
      "name": roomName,
      "item": `${baseUrl}${route.path}`
    });
  } else if (route.path.startsWith('/book/')) {
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Rooms",
      "item": `${baseUrl}/rooms`
    });
    const roomSlug = route.path.replace('/book/', '');
    const roomName = roomSlug === 'budget-family-room' ? 'Book Budget Family Room'
      : roomSlug === 'deluxe-room' ? 'Book Deluxe Room'
      : 'Book Family Room';
    items.push({
      "@type": "ListItem",
      "position": 3,
      "name": roomName,
      "item": `${baseUrl}${route.path}`
    });
  } else {
    const pageNames = {
      '/about': 'About Us',
      '/services': 'Services & Amenities',
      '/contact': 'Contact & Location',
      '/book-now': 'Book Direct',
      '/gallery': 'Photo & Video Gallery',
      '/blog': 'Kathmandu Travel Blog',
      '/guest-guide': 'Guest Guide & House Rules',
      '/terms': 'Terms of Service',
      '/privacy': 'Privacy Policy'
    };
    items.push({
      "@type": "ListItem",
      "position": 2,
      "name": pageNames[route.path] || route.title.split('|')[0].trim(),
      "item": `${baseUrl}${route.path}`
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };

  return `<script id="schema-breadcrumbs" type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`;
}

function getRoomSchemaForRoute(route) {
  const baseUrl = "https://hotelsherpasoul.com";
  if (!route.path.startsWith('/room/')) return '';

  const roomSlug = route.path.replace('/room/', '');
  const roomData = {
    'budget-family-room': {
      name: 'Budget Family Room in Thamel, Kathmandu',
      description: 'Budget-friendly family room with 1 King Bed and 1 Single Bed, en-suite bathroom with 24/7 hot water, free Wi-Fi, and shared kitchen privileges.',
      bed: '1 King Bed + 1 Single Bed',
      occupancy: 4,
      price: '20',
      image: `${baseUrl}/triple.webp`
    },
    'deluxe-room': {
      name: 'Deluxe Room (AC) in Thamel, Kathmandu',
      description: 'Air-conditioned boutique room with king bed, sofa seating, private modern bathroom, fast Wi-Fi, and peaceful atmosphere in Thamel.',
      bed: '1 King Bed',
      occupancy: 3,
      price: '20',
      image: `${baseUrl}/changes_photo/singleBedWithSofa.webp`
    },
    'family-room': {
      name: 'Family Room (AC) in Thamel, Kathmandu',
      description: 'Spacious family suite with King plus Single bed, full air conditioning, private modern washroom, city views, and shared kitchen privileges.',
      bed: '1 King Bed + 1 Single Bed',
      occupancy: 4,
      price: '30',
      image: `${baseUrl}/changes_photo/doubleBed.webp`
    }
  }[roomSlug];

  if (!roomData) return '';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    "@id": `${baseUrl}${route.path}#room`,
    "name": roomData.name,
    "description": roomData.description,
    "image": roomData.image,
    "bed": roomData.bed,
    "occupancy": {
      "@type": "QuantitativeValue",
      "value": roomData.occupancy
    },
    "offers": {
      "@type": "Offer",
      "price": roomData.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `${baseUrl}/book/${roomSlug}`
    },
    "partOf": {
      "@type": "Hotel",
      "@id": `${baseUrl}/#hotel`,
      "name": "Hotel Sherpa Soul"
    }
  };

  return `<script id="schema-room" type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`;
}

function generateHtmlForRoute(route) {
  let html = templateHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
  html = html.replace(/<meta name="title" content=".*?" \/>/i, `<meta name="title" content="${route.title}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${route.title}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${route.title}" />`);

  // Replace Description
  html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${route.description}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${route.description}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${route.description}" />`);

  // Replace Canonical & OpenGraph URL
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${route.canonical}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${route.canonical}" />`);
  html = html.replace(/<meta name="twitter:url" content=".*?" \/>/i, `<meta name="twitter:url" content="${route.canonical}" />`);

  // Replace OG Image if available
  if (route.ogImage) {
    html = html.replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${route.ogImage}" />`);
    html = html.replace(/<meta name="twitter:image" content=".*?" \/>/i, `<meta name="twitter:image" content="${route.ogImage}" />`);
  }

  // Handle Schema.org JSON-LD structured data
  if (route.path === '/') {
    // On homepage: Keep Hotel schema + FAQPage schema. Remove breadcrumb script.
    html = html.replace(/<script id="schema-breadcrumbs" type="application\/ld\+json">[\s\S]*?<\/script>/i, '');
  } else {
    // On inner pages:
    // 1. Inject proper BreadcrumbList schema
    const breadcrumbTag = getBreadcrumbSchemaForRoute(route);
    html = html.replace(/<script id="schema-breadcrumbs" type="application\/ld\+json">[\s\S]*?<\/script>/i, breadcrumbTag);

    // 2. Remove FAQPage schema since inner pages do not have FAQ accordion
    html = html.replace(/<script id="schema-faq" type="application\/ld\+json">[\s\S]*?<\/script>/i, '');

    // 3. Inject HotelRoom schema on room detail pages
    const roomSchema = getRoomSchemaForRoute(route);
    if (roomSchema) {
      html = html.replace('</head>', `    ${roomSchema}\n  </head>`);
    }
  }

  // Inject route-specific LCP preload in <head>
  if (route.preload) {
    html = html.replace('<!-- ROUTE_PRELOAD -->', route.preload.trim());
  } else {
    html = html.replace('<!-- ROUTE_PRELOAD -->', '');
  }

  // Inject pre-rendered content into <div id="root">
  const cleanContent = route.content.trim();
  html = html.replace(/<div id="root"><\/div>/i, `<div id="root">${cleanContent}</div>`);

  return html;
}

console.log('🚀 Starting SSG Pre-rendering for Hotel Sherpa Soul...');

// ============================================================================
// CRITICAL CSS EXTRACTION & ASYNC FULL STYLESHEET LOADER (LCP Fix)
// ============================================================================
const assetsDir = path.join(DIST_DIR, 'assets');
const cssFile = fs.existsSync(assetsDir)
  ? fs.readdirSync(assetsDir).find(f => f.startsWith('index-') && f.endsWith('.css'))
  : null;

if (cssFile) {
  const cssHref = `/assets/${cssFile}`;
  const fullCss = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');

  // Extract all classes from above-the-fold HTML (Navbar + Hero + DirectOffer)
  const criticalClasses = new Set();
  const classRe = /class=["']([^"']+)["']/g;
  let cm;
  const sampleHtml = NAV_HTML + (ROUTES[0] ? ROUTES[0].content.slice(0, 30000) : '');
  while ((cm = classRe.exec(sampleHtml)) !== null) {
    cm[1].split(/\s+/).forEach(c => c && criticalClasses.add(c));
  }

  // Ensure key layout utilities & display classes are preserved (including global action buttons & ribbons)
  [
    'hidden', 'block', 'inline-block', 'flex', 'inline-flex', 'relative', 'absolute', 'fixed',
    'w-full', 'h-full', 'min-h-screen', 'transition-all', 'duration-300',
    'bottom-5', 'right-5', 'z-40', 'z-50', 'w-14', 'h-14', 'rounded-full', 'bg-green-500', 'bg-green-600', 'shadow-xl'
  ].forEach(c => criticalClasses.add(c));

  // Use PostCSS to produce 100% syntactically valid critical CSS without regex truncation errors
  const postcss = require('postcss');
  const root = postcss.parse(fullCss);

  function selectorMatches(selector) {
    const cleanSelector = selector.replace(/\\/g, '');
    for (const cls of criticalClasses) {
      if (cleanSelector.includes(cls)) {
        return true;
      }
    }
    return false;
  }

  const utilitiesLayer = root.nodes.find(n => n.type === 'atrule' && n.name === 'layer' && n.params === 'utilities');
  if (utilitiesLayer) {
    utilitiesLayer.walkRules(rule => {
      if (!selectorMatches(rule.selector)) {
        rule.remove();
      }
    });
    utilitiesLayer.walkAtRules(atRule => {
      if (atRule.nodes && atRule.nodes.length === 0) {
        atRule.remove();
      }
    });
  }

  const criticalCss = root.toString();
  const criticalStyleTag = `<style id="critical-css">${criticalCss}</style>`;

  const asyncCssBlock = `
    ${criticalStyleTag}
    <link rel="preload" as="style" href="${cssHref}" crossorigin />
    <link rel="stylesheet" href="${cssHref}" media="print" onload="this.media='all'" crossorigin />
    <noscript><link rel="stylesheet" href="${cssHref}" crossorigin /></noscript>
  `.trim();

  // Replace render-blocking stylesheet link with async pattern
  const linkRegex = new RegExp(`<link rel="stylesheet"[^>]*href="${cssHref.replace(/\./g, '\\.')}"[^>]*>`, 'i');
  if (linkRegex.test(templateHtml)) {
    templateHtml = templateHtml.replace(linkRegex, asyncCssBlock);
  } else {
    templateHtml = templateHtml.replace(/<link rel="stylesheet"[^>]*>/i, asyncCssBlock);
  }

  // Remove vendor-libs modulepreload from <head> so it does not block initial page interactive
  templateHtml = templateHtml.replace(/<link rel="modulepreload"[^>]*href="\/assets\/vendor-libs-[^"]+\.js"[^>]*>\s*/gi, '');
  console.log(`✓ Critical CSS inlined (${criticalCss.length} bytes, ~${require('zlib').gzipSync(criticalCss).length} bytes gzip). Full CSS set to async.`);
}


let count = 0;
for (const route of ROUTES) {
  const renderedHtml = generateHtmlForRoute(route);
  
  if (route.path === '/') {
    fs.writeFileSync(INDEX_PATH, renderedHtml, 'utf-8');
    console.log(`✓ Pre-rendered: / -> ${INDEX_PATH}`);
  } else {
    const routeDir = path.join(DIST_DIR, route.path.replace(/^\//, ''));
    fs.mkdirSync(routeDir, { recursive: true });
    const filePath = path.join(routeDir, 'index.html');
    fs.writeFileSync(filePath, renderedHtml, 'utf-8');
    console.log(`✓ Pre-rendered: ${route.path} -> ${filePath}`);
  }
  count++;
}

console.log(`🎉 SSG Pre-rendering completed successfully: ${count} routes rendered with full semantic HTML!`);
