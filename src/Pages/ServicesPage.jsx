import React from "react";
import { Link } from "react-router-dom";
import { Utensils, ShowerHead, Briefcase, Wifi, Plane, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export default function ServicesPage() {
  const servicesList = [
    {
      icon: Utensils,
      title: "Shared Self-Kitchen",
      desc: "Cook your favorite meals, prepare specialized dietary dishes, brew authentic Himalayan tea, and store food safely in our shared guest refrigerator and clean kitchen space.",
      badge: "Guest Favorite",
    },
    {
      icon: ShowerHead,
      title: "24/7 Hot Water Showers",
      desc: "High-pressure, instant hot water available round-the-clock in every private bathroom. Perfect for rejuvenating after arriving from high-altitude trekking trails.",
      badge: "High Pressure",
    },
    {
      icon: Briefcase,
      title: "Free Trekker Luggage Storage",
      desc: "Complimentary, secure luggage room while you explore Everest Base Camp, Annapurna Circuit, Langtang, or Chitwan. Pick up your bags when you return.",
      badge: "100% Free",
    },
    {
      icon: Wifi,
      title: "High-Speed Fiber Wi-Fi",
      desc: "Reliable fiber-optic wireless internet accessible throughout the entire hotel property, ideal for remote work, staying connected with family, and booking onward travel.",
      badge: "Fiber Optic",
    },
    {
      icon: Plane,
      title: "Airport Transfers & Tour Desk",
      desc: "Stress-free airport pickups and drop-offs between Tribhuvan International Airport (TIA) and the hotel, plus Lukla/Pokhara flight tickets and licensed guide arrangements.",
      badge: "24/7 Available",
    },
    {
      icon: Clock,
      title: "24-Hour Front Desk",
      desc: "Flexible check-in and check-out support anytime of day or night. Our friendly team is always here to assist with recommendations and emergency assistance.",
      badge: "Always Open",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block bg-[#FB6C01]/10 text-[#FB6C01] font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full border border-[#FB6C01]/20 mb-3">
            PRACTICAL AMENITIES • NO HIDDEN FEES
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#01366E] tracking-tight">
            Services & Facilities at Hotel Sherpa Soul
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Thoughtfully curated amenities designed specifically for international travelers, trekkers, and long-stay guests exploring Nepal.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {servicesList.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl border border-slate-200/80 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-[#FB6C01] flex items-center justify-center border border-amber-400/20">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {service.badge}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#01366E] mb-2">{service.title}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{service.desc}</p>
                </div>
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Available to all registered guests</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Booking CTA Banner */}
        <div className="bg-gradient-to-r from-[#01366E] via-[#0A2540] to-[#01366E] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="inline-block bg-[#FB6C01] text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider mb-3">
              10% DIRECT BOOKING DISCOUNT
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Experience Quiet Rest in Thamel?
            </h3>
            <p className="text-slate-200 text-sm sm:text-base mt-2">
              Book your room directly on our website or through WhatsApp to enjoy guaranteed lowest rates, free luggage storage, and full access to our shared guest kitchen.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/book-now"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FB6C01] hover:bg-[#e05a00] text-white font-bold rounded-2xl shadow-lg transition-all text-base"
            >
              <span>Book Your Stay</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
