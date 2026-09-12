const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(INDEX_PATH)) {
  console.error('Error: dist/index.html does not exist. Run "vite build" first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(INDEX_PATH, 'utf-8');

// Shared Navigation Component HTML
const NAV_HTML = `
<nav class="fixed top-0 left-0 right-0 shadow-sm border-b border-slate-100 bg-white/95 backdrop-blur-md z-50 transition-all duration-300">
  <div class="bg-gradient-to-r from-[#01366E] via-[#0A2540] to-[#01366E] text-white py-1.5 px-3 sm:px-6 border-b border-amber-400/20">
    <div class="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
      <div class="flex items-center gap-2 mx-auto sm:mx-0 text-center sm:text-left">
        <span class="bg-[#FB6C01] text-white font-black text-[10px] sm:text-xs px-2 py-0.5 rounded-full uppercase tracking-wider">10% OFF</span>
        <span class="font-medium text-slate-100 text-xs sm:text-sm">Direct Booking Special: Get <strong class="text-amber-300 font-bold">10% Discount</strong> on all rooms!</span>
        <span class="hidden md:inline text-white/40">• Best Rate Guaranteed</span>
      </div>
      <a href="/book-now" class="hidden sm:inline-flex items-center gap-1 font-bold text-amber-300 hover:text-white transition-colors underline underline-offset-4 text-xs">Claim 10% Off &rarr;</a>
    </div>
  </div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-20">
      <div class="flex-shrink-0 z-50 py-1">
        <a href="/" class="flex items-center justify-center">
          <img src="/logo.webp" alt="Hotel Sherpa Soul - Boutique Stay in Thamel, Kathmandu" class="h-14 sm:h-16 w-auto max-w-[220px] object-contain" width="200" height="60" />
        </a>
      </div>
      <div class="hidden lg:flex space-x-8">
        <a href="/" class="font-semibold text-sm lg:text-base py-3 px-1 text-[#01366E] hover:text-[#FB6C01] transition-colors">Home</a>
        <a href="/rooms" class="font-semibold text-sm lg:text-base py-3 px-1 text-[#01366E] hover:text-[#FB6C01] transition-colors">Rooms</a>
        <a href="/about" class="font-semibold text-sm lg:text-base py-3 px-1 text-[#01366E] hover:text-[#FB6C01] transition-colors">About Us</a>
        <a href="/services" class="font-semibold text-sm lg:text-base py-3 px-1 text-[#01366E] hover:text-[#FB6C01] transition-colors">Services</a>
        <a href="/gallery" class="font-semibold text-sm lg:text-base py-3 px-1 text-[#01366E] hover:text-[#FB6C01] transition-colors">Gallery</a>
        <a href="/blog" class="font-semibold text-sm lg:text-base py-3 px-1 text-[#01366E] hover:text-[#FB6C01] transition-colors">Blog</a>
        <a href="/contact" class="font-semibold text-sm lg:text-base py-3 px-1 text-[#01366E] hover:text-[#FB6C01] transition-colors">Contact</a>
      </div>
      <div class="flex items-center space-x-2 lg:space-x-3 z-50">
        <a href="/book-now" class="hidden sm:flex items-center justify-center bg-[#FB6C01] hover:bg-[#E05A00] text-white px-5 lg:px-6 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-all text-sm lg:text-base">Book Your Stay</a>
      </div>
    </div>
  </div>
</nav>
`;

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
            <li><a href="/contact" class="hover:text-[#FB6C01] transition-colors">Contact & Location</a></li>
          </ul>
        </div>
        <div class="space-y-6">
          <h3 class="text-lg font-semibold text-white">Contact & Location</h3>
          <ul class="space-y-3 text-sm text-gray-300">
            <li><strong>Phone / WhatsApp:</strong> <a href="tel:+9779851068219" class="hover:underline text-amber-300">+977-9851068219</a></li>
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
        <button type="button" class="hover:text-[#FB6C01] transition-colors text-left cursor-pointer">Cookie Preferences</button>
      </div>
    </div>
  </div>
</footer>
`;

// Define routes and their content
const ROUTES = [
  {
    path: '/',
    title: 'Hotel Sherpa Soul | Peaceful Hotel in Thamel, Kathmandu',
    description: 'Stay at Hotel Sherpa Soul in Thamel, Kathmandu. Enjoy comfortable rooms, 24/7 front desk, high-speed Wi-Fi, shared kitchen, and a peaceful stay for travelers exploring Nepal.',
    canonical: 'https://hotelsherpasoul.com/',
    ogImage: 'https://hotelsherpasoul.com/hero1.webp',
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-20">
        <!-- Hero Section -->
        <section class="relative min-h-[90vh] flex items-center bg-slate-900 text-white overflow-hidden">
          <div class="absolute inset-0 z-0">
            <picture>
              <source media="(max-width: 768px)" srcset="/hero/hero1-mobile.webp" type="image/webp" />
              <source media="(min-width: 769px)" srcset="/hero/hero1.webp" type="image/webp" />
              <img src="/hero/hero1.webp" alt="Hotel Sherpa Soul - Boutique Room in Thamel Kathmandu" class="w-full h-full object-cover opacity-60" width="1376" height="768" fetchpriority="high" />
            </picture>
            <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
          </div>
          <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-20">
            <div class="max-w-2xl space-y-6">
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FB6C01]/30 via-amber-500/25 to-[#FB6C01]/30 border border-amber-400/60 text-white">
                <span class="bg-[#FB6C01] text-white text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full uppercase">10% OFF</span>
                <span class="text-xs sm:text-sm font-semibold text-amber-200">Direct Booking Offer: <strong class="text-white font-extrabold underline">Save 10% Instantly</strong></span>
              </div>
              <p class="text-xs sm:text-sm uppercase tracking-[0.25em] text-amber-300 font-semibold">WELCOME TO HOTEL SHERPA SOUL</p>
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight text-white">Sleep Well in the <span class="text-[#FB6C01]">Heart of Thamel</span>, Kathmandu</h1>
              <p class="text-white/95 text-base sm:text-lg leading-relaxed font-light">Discover a peaceful and comfortable boutique hotel at Hotel Sherpa Soul, located in the vibrant heart of Thamel, Kathmandu. Explore the city by day, return to a quiet room at night, and wake up refreshed for your next Himalayan adventure.</p>
              
              <div class="p-4 rounded-2xl bg-black/70 border border-amber-400/50 backdrop-blur-md">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <span class="text-white font-bold text-base">Direct Booking Discount Active</span>
                    <p class="text-slate-200 text-xs sm:text-sm font-light mt-0.5">Get an instant <strong class="text-amber-300 font-bold">10% OFF</strong> on all rooms when booking directly. Best rate guarantee, free luggage storage & no hidden charges.</p>
                  </div>
                  <a href="/book-now" class="text-xs font-bold text-white bg-[#FB6C01] hover:bg-[#e05a00] px-4 py-2.5 rounded-xl transition-all shadow-md flex-shrink-0">Claim 10% Off &rarr;</a>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-4 pt-2">
                <a href="/book-now" class="px-8 py-4 rounded-full bg-gradient-to-r from-[#FB6C01] to-amber-500 hover:from-amber-600 hover:to-[#FB6C01] text-white font-bold text-base sm:text-lg shadow-xl transition-all">Book Direct & Save 10%</a>
                <a href="/rooms" class="px-8 py-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#01366E] border-2 border-white/70 font-semibold text-base sm:text-lg transition-all">Explore Our Rooms &rarr;</a>
              </div>

              <div class="pt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200 font-medium">
                <span>📍 Central Thamel Location</span>
                <span>•</span>
                <span>🛏️ Comfortable Rooms</span>
                <span>•</span>
                <span>🪷 Peaceful Stay (No Noise)</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Stats Bar -->
        <section class="bg-white py-8 border-y border-slate-200 shadow-sm">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div class="text-2xl sm:text-3xl font-extrabold text-[#01366E]">4.9 / 5.0</div>
              <div class="text-xs sm:text-sm text-slate-600 mt-1">Guest Review Rating</div>
            </div>
            <div>
              <div class="text-2xl sm:text-3xl font-extrabold text-[#FB6C01]">24/7 Front Desk</div>
              <div class="text-xs sm:text-sm text-slate-600 mt-1">Check-in & Travel Desk</div>
            </div>
            <div>
              <div class="text-2xl sm:text-3xl font-extrabold text-[#01366E]">Heart of Thamel</div>
              <div class="text-xs sm:text-sm text-slate-600 mt-1">Thamel Bhagawati Marg 26</div>
            </div>
            <div>
              <div class="text-2xl sm:text-3xl font-extrabold text-[#FB6C01]">100% Himalayan</div>
              <div class="text-xs sm:text-sm text-slate-600 mt-1">Authentic Hospitality</div>
            </div>
          </div>
        </section>

        <!-- Intro Section -->
        <section class="py-20 px-6 sm:px-12 lg:px-20 bg-[#FFFBF7]">
          <div class="max-w-4xl mx-auto text-center space-y-6">
            <span class="text-xs font-bold tracking-widest text-[#FB6C01] uppercase">THAMEL OUTSIDE • PEACE INSIDE</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-[#01366E]">A Simple Stay in Thamel. A Better Night's Sleep.</h2>
            <p class="text-lg text-slate-700 leading-relaxed font-light">Thamel is full of energy, cultural bazaars, and mountain excitement. Hotel Sherpa Soul gives you a quieter sanctuary to come home to. Our brand motto: <strong class="text-[#01366E]">"No Restaurant. No Noise. Sleep Well."</strong> We intentionally keep things peaceful, clean, and practical for travelers who want quality rest.</p>
          </div>
        </section>

        <!-- Rooms Showcase Section -->
        <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div class="text-center max-w-3xl mx-auto mb-14">
            <span class="text-xs font-bold tracking-widest text-[#FB6C01] uppercase">OUR ACCOMMODATIONS</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-[#01366E] mt-2">Your Room. Your Space. Your Rest.</h2>
            <p class="text-slate-600 text-base sm:text-lg mt-3">Clean, quiet, and equipped with fiber-optic Wi-Fi, 24/7 hot water, private en-suite bathrooms, and access to our shared self-kitchen.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Room 1 -->
            <article class="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col">
              <div class="relative h-64 overflow-hidden">
                <img src="/triple.webp" alt="Budget Family Room - Hotel Sherpa Soul Thamel Kathmandu" class="w-full h-full object-cover" width="400" height="250" loading="lazy" />
                <div class="absolute top-4 right-4 bg-[#01366E] text-white px-3 py-1.5 rounded-xl font-bold text-sm">$20 USD / ~NPR 2,700</div>
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 class="text-xl font-bold text-[#01366E]">Budget Family Room</h3>
                  <p class="text-xs text-slate-500 mt-1">3 Adults, 1 Child • 1 King Bed + 1 Single Bed</p>
                  <p class="text-sm text-slate-600 mt-3 leading-relaxed">Spacious and budget-friendly room for families and trekking groups resting before and after Himalayan trails.</p>
                </div>
                <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span class="text-xs text-emerald-600 font-bold">10% OFF with direct booking</span>
                  <a href="/room/1" class="text-sm font-bold text-[#FB6C01] hover:underline">View Room Details &rarr;</a>
                </div>
              </div>
            </article>

            <!-- Room 2 -->
            <article class="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col">
              <div class="relative h-64 overflow-hidden">
                <img src="/changes_photo/singleBedWithSofa.webp" alt="Deluxe Room - Hotel Sherpa Soul Thamel Kathmandu" class="w-full h-full object-cover" width="400" height="250" loading="lazy" />
                <div class="absolute top-4 right-4 bg-[#01366E] text-white px-3 py-1.5 rounded-xl font-bold text-sm">$20 USD / ~NPR 2,700</div>
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 class="text-xl font-bold text-[#01366E]">Deluxe Room</h3>
                  <p class="text-xs text-slate-500 mt-1">2 Adults, 1 Child • 1 King Bed • Air Conditioned</p>
                  <p class="text-sm text-slate-600 mt-3 leading-relaxed">Quiet boutique room with king mattress, climate control (AC), private modern bathroom, and city views.</p>
                </div>
                <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span class="text-xs text-emerald-600 font-bold">10% OFF with direct booking</span>
                  <a href="/room/2" class="text-sm font-bold text-[#FB6C01] hover:underline">View Room Details &rarr;</a>
                </div>
              </div>
            </article>

            <!-- Room 3 -->
            <article class="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col">
              <div class="relative h-64 overflow-hidden">
                <img src="/changes_photo/doubleBed.webp" alt="Family Room - Hotel Sherpa Soul Thamel Kathmandu" class="w-full h-full object-cover" width="400" height="250" loading="lazy" />
                <div class="absolute top-4 right-4 bg-[#01366E] text-white px-3 py-1.5 rounded-xl font-bold text-sm">$30 USD / ~NPR 4,000</div>
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 class="text-xl font-bold text-[#01366E]">Family Room</h3>
                  <p class="text-xs text-slate-500 mt-1">3 Adults, 1 Child • King Bed + Single Bed • AC</p>
                  <p class="text-sm text-slate-600 mt-3 leading-relaxed">Extra spacious deluxe accommodation with air conditioning, premium linen, hot shower, and shared kitchen access.</p>
                </div>
                <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span class="text-xs text-emerald-600 font-bold">10% OFF with direct booking</span>
                  <a href="/room/3" class="text-sm font-bold text-[#FB6C01] hover:underline">View Room Details &rarr;</a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <!-- Facilities & Services Section -->
        <section class="py-16 bg-slate-50 border-t border-slate-200">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-2xl mx-auto mb-12">
              <h2 class="text-2xl sm:text-3xl font-bold text-[#01366E]">Practical Hotel Amenities for Travellers</h2>
              <p class="text-sm text-slate-600 mt-2">Thoughtfully designed for comfort, convenience, and Himalayan exploration.</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div class="text-2xl mb-2">🍳</div>
                <h3 class="font-bold text-slate-800 text-sm">Shared Guest Kitchen</h3>
                <p class="text-xs text-slate-500 mt-1">Equipped kitchen for cooking and tea</p>
              </div>
              <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div class="text-2xl mb-2">🚿</div>
                <h3 class="font-bold text-slate-800 text-sm">24/7 Hot Water Shower</h3>
                <p class="text-xs text-slate-500 mt-1">High pressure hot water in every room</p>
              </div>
              <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div class="text-2xl mb-2">🛄</div>
                <h3 class="font-bold text-slate-800 text-sm">Free Luggage Storage</h3>
                <p class="text-xs text-slate-500 mt-1">Secure storage during Himalayan treks</p>
              </div>
              <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div class="text-2xl mb-2">📶</div>
                <h3 class="font-bold text-slate-800 text-sm">High-Speed Fiber Wi-Fi</h3>
                <p class="text-xs text-slate-500 mt-1">Fast connection throughout the hotel</p>
              </div>
            </div>
          </div>
        </section>

        <!-- FAQs Section -->
        <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
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
              <p class="text-sm text-slate-600 mt-2">Yes, we provide reliable airport pickup and drop-off transfers between Kathmandu Airport (KTM) and the hotel. Contact us on WhatsApp at +977-9851068219 to arrange your transfer.</p>
            </div>
            <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <h3 class="font-bold text-slate-800 text-base">Can I store my luggage while on a trek?</h3>
              <p class="text-sm text-slate-600 mt-2">Yes, we offer complimentary secure luggage storage before check-in, after check-out, and during multi-day Himalayan journeys until you return.</p>
            </div>
          </div>
        </section>
      </main>
      ${FOOTER_HTML}
    `
  },
  {
    path: '/rooms',
    title: 'Rooms & Rates | Budget Family & Deluxe Rooms | Hotel Sherpa Soul',
    description: 'Explore hotel rooms at Hotel Sherpa Soul in Thamel, Kathmandu. Choose from Budget Family Rooms, Deluxe Rooms, and Family Rooms with AC, private bathrooms, and fiber Wi-Fi.',
    canonical: 'https://hotelsherpasoul.com/rooms',
    ogImage: 'https://hotelsherpasoul.com/triple.webp',
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="text-xs font-bold tracking-widest text-[#FB6C01] uppercase">THAMEL ACCOMMODATION</span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-[#01366E] mt-2">Rooms & Suites at Hotel Sherpa Soul</h1>
          <p class="text-slate-600 text-base sm:text-lg mt-3">Enjoy peaceful sleep, 24/7 hot water, high-speed Wi-Fi, and authentic Himalayan hospitality in Thamel, Kathmandu.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article class="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <img src="/triple.webp" alt="Budget Family Room - Hotel Sherpa Soul" class="w-full h-56 object-cover rounded-2xl mb-4" width="400" height="225" />
              <div class="flex justify-between items-center mb-2">
                <h2 class="text-2xl font-bold text-[#01366E]">Budget Family Room</h2>
                <span class="bg-[#01366E] text-white px-3 py-1 rounded-xl text-sm font-bold">$20 / night</span>
              </div>
              <p class="text-xs text-[#FB6C01] font-bold mb-3">~NPR 2,700 • 3 Adults, 1 Child</p>
              <p class="text-sm text-slate-600 leading-relaxed">Features 1 King Bed and 1 Single Bed, en-suite bathroom, 24/7 hot shower, and shared kitchen privileges.</p>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <a href="/room/1" class="text-sm font-bold text-[#01366E] hover:underline">Details & Specs &rarr;</a>
              <a href="/book-now" class="px-4 py-2 bg-[#FB6C01] text-white rounded-xl text-xs font-bold hover:bg-[#e05a00]">Book Now</a>
            </div>
          </article>
          <article class="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <img src="/changes_photo/singleBedWithSofa.webp" alt="Deluxe Room - Hotel Sherpa Soul" class="w-full h-56 object-cover rounded-2xl mb-4" width="400" height="225" />
              <div class="flex justify-between items-center mb-2">
                <h2 class="text-2xl font-bold text-[#01366E]">Deluxe Room</h2>
                <span class="bg-[#01366E] text-white px-3 py-1 rounded-xl text-sm font-bold">$20 / night</span>
              </div>
              <p class="text-xs text-[#FB6C01] font-bold mb-3">~NPR 2,700 • 2 Adults, 1 Child</p>
              <p class="text-sm text-slate-600 leading-relaxed">Air-conditioned boutique room with king bed, sofa seating, private bathroom, fast Wi-Fi, and peaceful atmosphere.</p>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <a href="/room/2" class="text-sm font-bold text-[#01366E] hover:underline">Details & Specs &rarr;</a>
              <a href="/book-now" class="px-4 py-2 bg-[#FB6C01] text-white rounded-xl text-xs font-bold hover:bg-[#e05a00]">Book Now</a>
            </div>
          </article>
          <article class="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <img src="/changes_photo/doubleBed.webp" alt="Family Room - Hotel Sherpa Soul" class="w-full h-56 object-cover rounded-2xl mb-4" width="400" height="225" />
              <div class="flex justify-between items-center mb-2">
                <h2 class="text-2xl font-bold text-[#01366E]">Family Room</h2>
                <span class="bg-[#01366E] text-white px-3 py-1 rounded-xl text-sm font-bold">$30 / night</span>
              </div>
              <p class="text-xs text-[#FB6C01] font-bold mb-3">~NPR 4,000 • 3 Adults, 1 Child</p>
              <p class="text-sm text-slate-600 leading-relaxed">Spacious family suite with King + Single bed, full air conditioning, private modern washroom, and city views.</p>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <a href="/room/3" class="text-sm font-bold text-[#01366E] hover:underline">Details & Specs &rarr;</a>
              <a href="/book-now" class="px-4 py-2 bg-[#FB6C01] text-white rounded-xl text-xs font-bold hover:bg-[#e05a00]">Book Now</a>
            </div>
          </article>
        </div>
      </main>
      ${FOOTER_HTML}
    `
  },
  {
    path: '/about',
    title: 'About Hotel Sherpa Soul | Peaceful Boutique Hotel in Thamel Kathmandu',
    description: 'Learn about Hotel Sherpa Soul in Thamel, Kathmandu. Created for travelers who value restful sleep, authentic Himalayan hospitality, and quiet boutique rooms.',
    canonical: 'https://hotelsherpasoul.com/about',
    ogImage: 'https://hotelsherpasoul.com/hero1.webp',
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="text-xs font-bold tracking-widest text-[#FB6C01] uppercase">OUR STORY & PHILOSOPHY</span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-[#01366E] mt-2 mb-6">About Hotel Sherpa Soul</h1>
        <div class="space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
          <p>Hotel Sherpa Soul was created for travelers who want to experience Kathmandu without giving up the comfort of a peaceful night's sleep. Located in Thamel Bhagawati Marg 26, one of Kathmandu's most popular traveler neighborhoods, we offer a simple, warm, and comfortable base for exploring the city, preparing for a trek, or resting afterwards.</p>
          <div class="p-6 rounded-2xl bg-amber-50 border border-amber-200">
            <h2 class="text-xl font-bold text-[#01366E] mb-2">Our Core Philosophy: No Restaurant. No Noise. Sleep Well.</h2>
            <p class="text-slate-600 text-sm sm:text-base">We intentionally do not operate a noisy on-site bar or restaurant. Instead, we offer guests a fully equipped shared guest kitchen, allowing you to prepare meals and brew fresh Himalayan tea anytime in a calm environment.</p>
          </div>
          <p>Drawing from our authentic Sherpa mountain heritage, our team provides 24/7 front desk service, airport transfers, licensed trekking guide arrangements, permit assistance for Everest and Annapurna, and complimentary luggage storage.</p>
        </div>
      </main>
      ${FOOTER_HTML}
    `
  },
  {
    path: '/services',
    title: 'Services & Amenities | Shared Kitchen & Facilities | Hotel Sherpa Soul',
    description: 'Discover practical facilities at Hotel Sherpa Soul: shared guest kitchen, 24/7 hot water, fiber-optic Wi-Fi, elevator, trekking permit desk, and airport shuttle.',
    canonical: 'https://hotelsherpasoul.com/services',
    ogImage: 'https://hotelsherpasoul.com/hero1.webp',
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="text-xs font-bold tracking-widest text-[#FB6C01] uppercase">GUEST CONVENIENCE</span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-[#01366E] mt-2 mb-6">Services & Facilities at Hotel Sherpa Soul</h1>
        <p class="text-slate-600 text-lg mb-10">We provide essential, practical amenities designed specifically for backpackers, trekkers, and long-stay guests exploring Nepal.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h2 class="text-xl font-bold text-[#01366E] mb-2">🍳 Shared Self-Kitchen</h2>
            <p class="text-slate-600 text-sm leading-relaxed">Cook your favorite food, prepare specialized diets, brew Himalayan tea, and store food in our shared guest refrigerator.</p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h2 class="text-xl font-bold text-[#01366E] mb-2">🚿 24/7 Hot Water Showers</h2>
            <p class="text-slate-600 text-sm leading-relaxed">High pressure hot water available around the clock, perfect for warming up after arriving from a mountain trek.</p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h2 class="text-xl font-bold text-[#01366E] mb-2">🛄 Free Trekker Luggage Storage</h2>
            <p class="text-slate-600 text-sm leading-relaxed">Complimentary secure luggage holding while you hike Everest Base Camp, Annapurna Circuit, or Langtang.</p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h2 class="text-xl font-bold text-[#01366E] mb-2">🚐 Airport Transfers & Tours</h2>
            <p class="text-slate-600 text-sm leading-relaxed">Reliable airport pickups, flight bookings to Lukla/Pokhara, and Kathmandu valley sightseeing arrangements.</p>
          </div>
        </div>
      </main>
      ${FOOTER_HTML}
    `
  },
  {
    path: '/contact',
    title: 'Contact Hotel Sherpa Soul | Location in Thamel Kathmandu',
    description: 'Contact Hotel Sherpa Soul in Thamel, Kathmandu. Call or WhatsApp +977-9851068219 or email info@hotelsherpasoul.com for bookings and airport pickup.',
    canonical: 'https://hotelsherpasoul.com/contact',
    ogImage: 'https://hotelsherpasoul.com/hero1.webp',
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="text-xs font-bold tracking-widest text-[#FB6C01] uppercase">24/7 FRONT DESK</span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-[#01366E] mt-2 mb-6">Contact Hotel Sherpa Soul</h1>
        <div class="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <p class="text-slate-700 text-base sm:text-lg">Have a question about room availability, airport pickup, or trekking in Nepal? Get in touch directly with our team:</p>
          <div class="space-y-4 text-slate-700">
            <div><strong>Address:</strong> Thamel Bhagawati Marg 26, Kathmandu 44600, Bagmati, Nepal</div>
            <div><strong>Direct Phone:</strong> <a href="tel:+9779851068219" class="text-[#FB6C01] font-bold hover:underline">+977-9851068219</a></div>
            <div><strong>WhatsApp:</strong> <a href="https://wa.me/9779851068219" class="text-emerald-600 font-bold hover:underline">+977-9851068219 (Instant Chat)</a></div>
            <div><strong>Official Email:</strong> <a href="mailto:info@hotelsherpasoul.com" class="text-[#01366E] font-bold hover:underline">info@hotelsherpasoul.com</a></div>
            <div><strong>Check-in:</strong> 14:00 (2:00 PM) • <strong>Check-out:</strong> 12:00 (12:00 PM noon)</div>
          </div>
          <div class="pt-4 border-t border-slate-100">
            <a href="/book-now" class="inline-block py-3 px-6 bg-[#FB6C01] hover:bg-[#e05a00] text-white font-bold rounded-xl shadow-md transition-all">Book Online with 10% Discount &rarr;</a>
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
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="text-xs font-bold tracking-widest text-[#FB6C01] uppercase">BEST RATE GUARANTEE</span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-[#01366E] mt-2 mb-6">Book Direct & Save 10% on Your Stay</h1>
        <div class="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <p class="text-slate-700 text-lg">Direct bookings receive our guaranteed best price with an automatic 10% discount off standard rates.</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div class="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div class="font-bold text-[#01366E]">Budget Family Room</div>
              <div class="text-[#FB6C01] font-bold text-lg mt-1">$20 USD / ~NPR 2,700</div>
              <div class="text-xs text-slate-500">1 King + 1 Single Bed</div>
            </div>
            <div class="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div class="font-bold text-[#01366E]">Deluxe Room (AC)</div>
              <div class="text-[#FB6C01] font-bold text-lg mt-1">$20 USD / ~NPR 2,700</div>
              <div class="text-xs text-slate-500">1 King Bed • Air Conditioned</div>
            </div>
            <div class="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div class="font-bold text-[#01366E]">Family Room (AC)</div>
              <div class="text-[#FB6C01] font-bold text-lg mt-1">$30 USD / ~NPR 4,000</div>
              <div class="text-xs text-slate-500">King + Single • Air Conditioned</div>
            </div>
          </div>
          <div class="pt-4 text-center">
            <a href="https://wa.me/9779851068219?text=Hello! I'd like to book a room with the 10% direct discount." class="inline-block py-3.5 px-8 bg-[#25D366] hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg text-base transition-all">Book via WhatsApp Instantly &rarr;</a>
          </div>
        </div>
      </main>
      ${FOOTER_HTML}
    `
  },
  {
    path: '/gallery',
    title: 'Photo & Video Gallery | Rooms & Facilities | Hotel Sherpa Soul',
    description: 'Explore photos of guest rooms, private balconies, modern bathrooms, shared kitchen, and Kathmandu valley views at Hotel Sherpa Soul in Thamel.',
    canonical: 'https://hotelsherpasoul.com/gallery',
    ogImage: 'https://hotelsherpasoul.com/changes_photo/doubleBedRoom.webp',
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-10">
          <span class="text-xs font-bold tracking-widest text-[#FB6C01] uppercase">VISUAL TOUR</span>
          <h1 class="text-3xl sm:text-5xl font-extrabold text-[#01366E] mt-2">Hotel Sherpa Soul Gallery</h1>
          <p class="text-slate-600 text-lg mt-2">Take a tour of our comfortable guest rooms, facilities, and Thamel surroundings.</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="/changes_photo/doubleBedRoom.webp" alt="Hotel Sherpa Soul Spacious Double Bedroom" class="w-full h-48 object-cover rounded-2xl shadow-sm" width="300" height="200" loading="lazy" />
          <img src="/changes_photo/singlesitter.webp" alt="Hotel Sherpa Soul Single Room with Seating" class="w-full h-48 object-cover rounded-2xl shadow-sm" width="300" height="200" loading="lazy" />
          <img src="/changes_photo/viewSeen.webp" alt="Kathmandu Valley View from Hotel Sherpa Soul" class="w-full h-48 object-cover rounded-2xl shadow-sm" width="300" height="200" loading="lazy" />
          <img src="/changes_photo/balkani.webp" alt="Hotel Sherpa Soul Private Balcony View" class="w-full h-48 object-cover rounded-2xl shadow-sm" width="300" height="200" loading="lazy" />
        </div>
      </main>
      ${FOOTER_HTML}
    `
  },
  {
    path: '/blog',
    title: 'Kathmandu & Thamel Travel Guide | Hotel Sherpa Soul Blog',
    description: 'Discover practical Kathmandu travel tips, Thamel exploration guides, Nepal trekking advice, and cultural insights from Hotel Sherpa Soul.',
    canonical: 'https://hotelsherpasoul.com/blog',
    ogImage: 'https://hotelsherpasoul.com/hero1.webp',
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="text-xs font-bold tracking-widest text-[#FB6C01] uppercase">LOCAL INSIGHTS</span>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-[#01366E] mt-2 mb-6">Kathmandu & Thamel Travel Guide</h1>
        <div class="space-y-6">
          <article class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h2 class="text-xl font-bold text-[#01366E] mb-2">Where to Stay in Kathmandu: Why Thamel is the Best Choice</h2>
            <p class="text-sm text-slate-600 leading-relaxed">Thamel is the vibrant travel heart of Kathmandu. Surrounded by artisanal shops, organic bakeries, gear rentals, and cultural temples, staying at a quiet hotel like Hotel Sherpa Soul offers the best balance of convenience and peaceful rest.</p>
          </article>
          <article class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h2 class="text-xl font-bold text-[#01366E] mb-2">Trekking Preparation: Essential Gear Check in Thamel</h2>
            <p class="text-sm text-slate-600 leading-relaxed">Tips on preparing for Everest, Annapurna, or Langtang treks, including permit processing, warm gear procurement, and luggage storage.</p>
          </article>
        </div>
      </main>
      ${FOOTER_HTML}
    `
  },
  {
    path: '/privacy',
    title: 'Privacy Policy & Cookie Disclosures | Hotel Sherpa Soul Kathmandu',
    description: 'Privacy Policy for Hotel Sherpa Soul. Information on data protection, Google Tag Manager, GA4, Meta Pixel, cookie consent, and guest rights.',
    canonical: 'https://hotelsherpasoul.com/privacy',
    ogImage: 'https://hotelsherpasoul.com/hero1.webp',
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl sm:text-5xl font-extrabold text-[#01366E] mb-6">Privacy Policy</h1>
        <div class="space-y-4 text-slate-700 leading-relaxed">
          <p>Hotel Sherpa Soul is committed to protecting your privacy and personal data. We disclose our collection practices, Google Tag Manager (GTM-PFRV7ZTV), Google Analytics 4 (G-E7Z3QDR3KD), and Meta Pixel usage in full transparency.</p>
          <p>For questions or requests, contact: <strong>info@hotelsherpasoul.com</strong> or phone <strong>+977-9851068219</strong>.</p>
        </div>
      </main>
      ${FOOTER_HTML}
    `
  },
  {
    path: '/terms',
    title: 'Terms of Service & Booking Policies | Hotel Sherpa Soul',
    description: 'Terms of Service, check-in/out policies, 10% direct booking discount terms, and quiet hours policy at Hotel Sherpa Soul in Thamel, Kathmandu.',
    canonical: 'https://hotelsherpasoul.com/terms',
    ogImage: 'https://hotelsherpasoul.com/hero1.webp',
    content: `
      ${NAV_HTML}
      <main class="min-h-screen pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl sm:text-5xl font-extrabold text-[#01366E] mb-6">Terms of Service</h1>
        <div class="space-y-4 text-slate-700 leading-relaxed">
          <p>Check-in is from 14:00 (2:00 PM) and check-out is by 12:00 (12:00 PM). Direct bookings made through our site or WhatsApp receive a 10% discount off standard rates.</p>
          <p>Quiet hours are observed between 22:00 and 07:00 to honor our "No Noise. Sleep Well" commitment.</p>
        </div>
      </main>
      ${FOOTER_HTML}
    `
  }
];

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

  // Inject pre-rendered content into <div id="root">
  const cleanContent = route.content.trim();
  html = html.replace(/<div id="root"><\/div>/i, `<div id="root">${cleanContent}</div>`);

  return html;
}

console.log('🚀 Starting SSG Pre-rendering for Hotel Sherpa Soul...');

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
