import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Search,
  Clock,
  Tag,
  ArrowRight,
  Compass,
  Mountain,
  MapPin,
  Calendar,
  X,
  Share2,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { trackMetaEvent } from "../Components/Analytics/pixelEvents";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    trackMetaEvent("ViewContent", {
      content_name: "Kathmandu Travel Guide & Blog",
      content_category: "blog",
      content_type: "website",
    });
  }, []);

  const categories = [
    "All",
    "Thamel Guide",
    "Accommodation",
    "Trekking",
    "Sightseeing",
    "Travel Advice",
    "Transportation",
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Best Things to Do in Thamel, Kathmandu",
      category: "Thamel Guide",
      readTime: "5 min read",
      image: "/intro5.webp",
      seoKeywords: ["things to do in Thamel", "Thamel Kathmandu", "Thamel travel guide"],
      summary:
        "From artisan handicraft alleys and rooftop organic cafes to historic courtyards and lively music spots, discover the best of Thamel by day and night.",
      content: `Thamel has been the beating heart of traveler culture in Nepal for over half a century. Within its compact labyrinth of alleys, you'll find an extraordinary blend of ancient Newari architecture, outdoor gear shops, cozy bakeries, and vibrant cultural markets.

Key Highlights to Explore:
1. Historic Monasteries & Courtyards: Wander off the main shopping lanes to find hidden Bahals (Buddhist courtyards) like Chhusya Bahal with 17th-century carvings.
2. Artisan Handicrafts & Cashmere: Shop for authentic pashminas, singing bowls, handmade Lokta paper, and Sherpa wool beanies.
3. Café Culture & Garden Retreats: Unwind at serene courtyard cafes with fresh Himalayan Arabica coffee away from street bustle.
4. Live Acoustic & Cultural Evenings: Enjoy acoustic guitar performances and international cuisine across rooftop terraces.

Local Tip: After a sensory-rich day exploring Thamel, retreat to a quiet, restaurant-free room at Hotel Sherpa Soul on Bhagawati Marg for an undisturbed night's sleep.`,
    },
    {
      id: 2,
      title: "Where to Stay in Thamel, Kathmandu: A Traveler's Guide",
      category: "Accommodation",
      readTime: "6 min read",
      image: "/room1.webp",
      seoKeywords: ["where to stay in Thamel", "best area to stay in Kathmandu", "hotels in Thamel Kathmandu"],
      summary:
        "Choosing the right neighborhood in Kathmandu can define your trip. Discover why staying on a quiet street like Bhagawati Marg gives you central access without late-night noise.",
      content: `Kathmandu offers diverse neighborhoods, but Thamel remains the undisputed top choice for first-time visitors, cultural travelers, and trekkers. Its central proximity to airport access, travel agencies, restaurants, and historical monuments makes it exceptionally convenient.

What to Consider When Booking:
- Noise Insulation: Main party streets can remain loud into the early hours. Opt for quiet pockets like Bhagawati Marg where hotels operate without in-house bars or loud restaurants.
- Practical Amenities: Prioritize continuous hot showers, strong Wi-Fi, supportive mattresses, and air conditioning across seasons.
- Long-Stay Convenience: If staying for a week or longer, self-use kitchen facilities allow you to prepare wholesome home meals.

Hotel Sherpa Soul's "No Restaurant. No Noise. Sleep Well." philosophy provides exactly this balance: 2 minutes walk from central Thamel, yet peacefully insulated from party and traffic noise.`,
    },
    {
      id: 3,
      title: "10 Best Places to Visit in Kathmandu for First-Time Travelers",
      category: "Sightseeing",
      readTime: "7 min read",
      image: "/intro.webp",
      seoKeywords: ["places to visit in Kathmandu", "Kathmandu travel guide", "Kathmandu sightseeing"],
      summary:
        "Explore iconic UNESCO World Heritage sites including Swayambhunath (Monkey Temple), Boudhanath Stupa, Pashupatinath, and historic Kathmandu Durbar Square.",
      content: `Kathmandu Valley holds one of the world's highest concentrations of UNESCO World Heritage Sites. For first-time travelers, here are the top 10 experiences not to be missed:

1. Boudhanath Stupa: One of the largest spherical stupas in the world, filled with spinning prayer wheels and Tibetan butter lamps.
2. Swayambhunath (Monkey Temple): Perched high on a hill overlooking Kathmandu, offering sunrise panoramic vistas.
3. Kathmandu Durbar Square: Ancient royal palaces, intricately carved wooden pagoda temples, and the residence of the living goddess Kumari.
4. Pashupatinath Temple: Sacred Hindu pilgrimage along the Bagmati River with sacred Aarti ceremonies at dusk.
5. Patan Durbar Square: Renowned for exquisite Newari metal craftsmanship and the famous Krishna Mandir.
6. Bhaktapur: The preserved medieval city of devotees, home to the 55-Window Palace and Nyatapola Temple.
7. Garden of Dreams: A tranquil neo-classical historical garden located right at the entrance of Thamel.
8. Asan Tole & Indra Chowk: Bustling traditional spice and textile bazaar leading into historic squares.
9. Narayanhiti Palace Museum: The modern royal palace revealing Nepal's contemporary history.
10. Chandragiri Hills Cable Car: Spectacular Himalayan vistas spanning from Annapurna to Everest on clear days.`,
    },
    {
      id: 4,
      title: "Kathmandu to Everest Base Camp: What You Need to Know",
      category: "Trekking",
      readTime: "8 min read",
      image: "/flag2.webp",
      seoKeywords: ["Everest Base Camp trek from Kathmandu", "Kathmandu trekking guide", "Nepal trekking"],
      summary:
        "Essential logistics, flight booking from Kathmandu/Ramechhap to Lukla, permits, altitude acclimatization, and how to prepare your base stay before flying into the Khumbu region.",
      content: `Standing before Mount Everest (8,848.86m) is a lifelong dream for mountain lovers worldwide. The classic Everest Base Camp (EBC) journey begins and concludes in Kathmandu.

Key Pre-Trek Preparation Steps:
1. Flights to Lukla: During peak spring and autumn seasons, Lukla flights often operate from Manthali Airport (Ramechhap), a 4-hour pre-dawn road transfer from Kathmandu. Book flights well in advance.
2. Permits Required: Khumbu Pasang Lhamu Rural Municipality entry permit and Sagarmatha National Park entry permit (both obtainable along the trail).
3. Packing & Free Luggage Storage: Pack only essentials in your duffel (under 15kg for mountain flights). Leave excess city clothes, electronics, and suitcases in secure hotel luggage storage in Kathmandu free of charge.
4. Acclimatization: Plan at least 2 contingency days in Kathmandu on the return leg in case Lukla mountain weather delays flights.

At Hotel Sherpa Soul, our Sherpa heritage team gladly assists guests with trek preparation, gear checks, and secure luggage holding.`,
    },
    {
      id: 5,
      title: "Best Time to Visit Kathmandu and Nepal",
      category: "Travel Advice",
      readTime: "4 min read",
      image: "/intro1.webp",
      seoKeywords: ["best time to visit Nepal", "best time to visit Kathmandu", "Nepal travel guide"],
      summary:
        "A season-by-season guide covering autumn crystal skies (Sep-Nov), spring rhododendron blooms (Mar-May), mild winter exploring, and monsoon photography.",
      content: `Nepal offers distinct charms across every season, with climate heavily influenced by Himalayan topography:

- Autumn (September to November) — Peak Season:
Crystal-clear skies, post-monsoon fresh air, optimal mountain visibility, and major cultural festivals (Dashain and Tihar). Ideal for trekking and city exploration.

- Spring (March to May) — Floral Season:
Warm daytime temperatures, blooming wild rhododendrons on mountain slopes, and vibrant festival celebrations like Holi and Buddha Jayanti.

- Winter (December to February) — Peaceful & Clear:
Sunny crisp days in Kathmandu (15-20°C) and cold nights. Minimal tourist crowds, lower hotel rates, and exceptional valley clarity.

- Summer / Monsoon (June to August) — Lush & Green:
Refreshing rains transform the valley into lush emerald terraces. Great for budget travelers, yoga retreats, and rain-shadow treks like Upper Mustang.`,
    },
    {
      id: 6,
      title: "Thamel at Night: What Travelers Should Know",
      category: "Thamel Guide",
      readTime: "5 min read",
      image: "/intro5.webp",
      seoKeywords: ["Thamel nightlife", "things to do in Thamel at night", "Thamel Kathmandu"],
      summary:
        "How to enjoy Kathmandu's vibrant evening scene safely, finding quiet dinner spots, acoustic live music, and knowing when to retreat to your quiet room for a restorative night's rest.",
      content: `As twilight settles, Thamel transforms. Lanterns illuminate cobblestone avenues, aromatic spices waft from dining rooms, and live bands strum classic rock and acoustic folk.

Nightly Guide for Travelers:
- Dining: From authentic Dal Bhat and piping-hot momos to wood-fired pizza and Sherpa Tsampa porridge, culinary choices are endless.
- Live Music Venues: Renowned spots host talented Nepali musicians performing classic covers and modern fusion until around midnight.
- Safety & Navigation: Thamel is generally very safe for international tourists. Street lighting is good, but carrying a pocket torch or keeping your phone charged is helpful.
- Restful Sleep: After enjoying the evening, return to an insulated retreat. Hotel Sherpa Soul intentionally has no noisy bar or nightclub, ensuring you sleep soundly.`,
    },
    {
      id: 7,
      title: "Kathmandu Travel Guide for First-Time Visitors",
      category: "Travel Advice",
      readTime: "7 min read",
      image: "/intro.webp",
      seoKeywords: ["Kathmandu travel guide", "first time Nepal", "Nepal travel tips"],
      summary:
        "Practical insights on arrival at TIA, SIM cards, currency exchange, local etiquette, taxi apps (Pathao/InDrive), and settling easily into the rhythm of the valley.",
      content: `Arriving in Kathmandu is an exhilarating immersion of sights, sounds, and warm smiles. Here is your primer to hit the ground running smoothly:

1. Visa on Arrival: Most nationalities can obtain tourist visas upon landing at Tribhuvan International Airport (15 days: $30 USD, 30 days: $50 USD, 90 days: $125 USD).
2. Local SIM & Data: Purchase an Ncell or Namaste SIM card right at the airport arrival terminal for inexpensive 4G data.
3. Currency & ATMS: ATMs are widely available across Thamel. While US Dollars and major credit cards are accepted in hotels, carrying Nepali Rupees (NPR) is best for small shops and taxis.
4. Getting Around: Download ride-hailing apps like Pathao or InDrive for fair, transparent taxi and motorbike rides across the city.
5. Temple Etiquette: Remove shoes before entering shrines, walk clockwise around Buddhist stupas and mani walls, and ask before photographing ceremonies.`,
    },
    {
      id: 8,
      title: "What to Pack for a Nepal Trek",
      category: "Trekking",
      readTime: "6 min read",
      image: "/flag2.webp",
      seoKeywords: ["Nepal trekking packing list", "what to pack for Nepal trek", "Nepal trekking guide"],
      summary:
        "The definitive packing checklist: layering systems, broken-in trekking boots, down jackets, water purification, power banks, and free luggage storage at Hotel Sherpa Soul.",
      content: `Packing efficiently for a Himalayan trek means balancing warmth and weight. Remember, porters and teahouses have weight limits:

Essential Gear Checklist:
- Layering Clothing: Moisture-wicking base layers, breathable fleece mid-layer, windproof/waterproof Gore-Tex shell jacket, and lightweight trekking trousers.
- Footwear: Sturdy, broken-in ankle-support trekking boots, 4-5 pairs of merino wool hiking socks, and lightweight camp slippers.
- Outer Insulation: A quality 700+ fill down jacket and four-season sleeping bag (rated to -10°C or -15°C for high-altitude passes).
- Head & Hands: UV protective sunglasses (Cat 3 or 4), wide-brim sun hat, warm fleece beanie, liner gloves, and waterproof outer mitts.
- Health & Hygiene: Water purification tablets or LifeStraw bottle, electrolyte packets, high-SPF sunscreen, lip balm, blister kit, and personal first-aid essentials.
- Power: High-capacity power bank (20,000 mAh), as teahouses charge fees for battery charging at higher elevations.

Forgot something? Thamel is the world capital for trekking gear shops with both genuine brands and high-quality local gear available for rent or purchase.`,
    },
    {
      id: 9,
      title: "Kathmandu Airport to Thamel: Complete Transportation Guide",
      category: "Transportation",
      readTime: "4 min read",
      image: "/airportpickup.webp",
      seoKeywords: ["Kathmandu airport to Thamel", "how to get from Kathmandu airport to Thamel", "Kathmandu transportation"],
      summary:
        "Navigating Tribhuvan International Airport (TIA) to Thamel (~5.5 km): prepaid airport taxis, ride-hailing apps, hotel airport pickup services, and fare expectations.",
      content: `Tribhuvan International Airport (TIA) is located approximately 5.5 kilometers east of Thamel. Depending on Kathmandu traffic, the drive takes 20 to 40 minutes.

Transportation Options:
1. Hotel Private Airport Pickup (Recommended): The easiest and most stress-free option. A hotel staff member greets you outside the arrival gate holding a personalized name board and escorts you directly to the hotel door.
2. Prepaid Airport Taxi: Booked directly at the official counter inside the arrivals lobby. Fares typically range between NPR 800 and 1,000.
3. Ride-Hailing Apps: Apps like Pathao or InDrive operate in Kathmandu. Walk past the main parking area to meet your driver.

Traveler Tip: Contact Hotel Sherpa Soul via WhatsApp (+977 9851068219) prior to boarding your flight to arrange direct private transfer.`,
    },
    {
      id: 10,
      title: "Why Thamel Is One of the Best Places to Stay in Kathmandu",
      category: "Accommodation",
      readTime: "5 min read",
      image: "/changes_photo/feature1.webp",
      seoKeywords: ["best place to stay Kathmandu", "Thamel hotels", "Thamel accommodation"],
      summary:
        "Why generations of world travelers, mountaineers, and cultural explorers choose Thamel as their home base in Nepal, and how to find quiet, restorative sleep right in the center.",
      content: `For decades, travelers from every corner of the globe have gravitated toward Thamel. It is the logistical and social epicenter of Nepal travel, offering convenience unmatched by any other district.

Why Thamel Excels as a Base:
1. Unmatched Convenience: Over 200 travel agencies, trekking outfitters, money exchanges, airlines, and gear shops within 5 minutes walking radius.
2. Walkability: Stroll directly to Kathmandu Durbar Square, Asan Bazar, and the Garden of Dreams without needing vehicular transport.
3. Global Dining Options: Fresh bakeries, Italian trattorias, traditional Nepali Thakali houses, Tibetan eateries, and vegan cafes.
4. Finding Peace in the Center: While some parts of Thamel are loud, hotels like Hotel Sherpa Soul on Bhagawati Marg offer the best of both worlds: immediate access to the vibrancy outside, with calm, restaurant-free silence inside for deep, restorative sleep.`,
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.seoKeywords.some((k) =>
        k.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[52vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        <img
          src="/hero2.webp"
          alt="Kathmandu valley landscape - Hotel Sherpa Soul Travel Guide"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Official Travel Hub</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4 text-white">
              Kathmandu Travel Guide
            </h1>
            <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Discover Kathmandu through local tips, Thamel travel guides, trekking
              information, things to do, places to visit and practical advice for
              travelers visiting Nepal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-[#01366E] text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveArticle(post)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={post.image}
                  alt={`${post.title} - Hotel Sherpa Soul Kathmandu`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#01366E]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                  {post.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-[#01366E] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div>
                  {/* SEO Keyword Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.seoKeywords.slice(0, 2).map((k, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200/60 px-2 py-0.5 rounded"
                      >
                        #{k}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-[#01366E] group-hover:text-amber-600 transition-colors">
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              No matching travel guides found
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              Try searching with different keywords like "Thamel", "Trekking", or "Sightseeing".
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-5 py-2 bg-[#01366E] text-white rounded-xl text-sm font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
            >
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-50 text-[#01366E] font-bold text-xs rounded-full">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeArticle.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                {activeArticle.title}
              </h2>

              <div className="h-64 sm:h-80 rounded-xl overflow-hidden mb-6 bg-slate-900">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line mb-8">
                {activeArticle.content}
              </div>

              {/* SEO Keyword Tags */}
              <div className="pt-4 border-t border-slate-100 mb-6">
                <span className="text-xs font-semibold text-slate-500 block mb-2">
                  Related Topics & Search Keywords:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeArticle.seoKeywords.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Booking Call to Action */}
              <div className="p-6 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    Planning Your Kathmandu Stay?
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Enjoy central Thamel access with peaceful, restaurant-free sleep.
                  </p>
                </div>
                <Link
                  to="/rooms"
                  onClick={() => setActiveArticle(null)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#01366E] hover:bg-[#072340] text-white font-bold rounded-xl text-sm transition-colors text-center"
                >
                  View Rooms & Rates
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
