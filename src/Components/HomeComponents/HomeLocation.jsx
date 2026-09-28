import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Navigation, Car, Compass, ExternalLink, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { trackPhoneClick, trackEmailClick, trackWhatsAppClick, trackMapsClick } from "../Analytics/pixelEvents";

export default function HomeLocation() {
  const verifiedAttractions = [
    {
      name: "Thamel Gear Shops & Cafes",
      distance: "Immediate vicinity (1-2 min walk)",
      note: "Right outside on Thamel Bhagawati Marg",
    },
    {
      name: "Garden of Dreams",
      distance: "~800 meters (~10 min walk)",
      note: "Historical neo-classical garden oasis",
    },
    {
      name: "Kathmandu Durbar Square",
      distance: "~1.8 km (~20 min walk or short taxi)",
      note: "UNESCO World Heritage ancient royal complex",
    },
    {
      name: "Swayambhunath (Monkey Temple)",
      distance: "~3 km (~15 min drive)",
      note: "Ancient hilltop Buddhist stupa with panoramic city views",
    },
    {
      name: "Tribhuvan International Airport (KTM)",
      distance: "~6 km (~20 to 30 min drive)",
      note: "Airport pickup & drop-off available upon request",
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-200" id="location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#FB6C01]" />
            <span>Prime Thamel Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#01366E] tracking-tight">
            Hotel Sherpa Soul in Thamel, Kathmandu
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            Conveniently situated on Thamel Bhagawati Marg 26. Step outside into the energetic culture and dining of Thamel, yet return to a quiet, noise-insulated boutique hotel at night.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Address, Contact & Directions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">
                Property Address & Contact
              </h3>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FB6C01] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Hotel Sherpa Soul</strong>
                    <span>Thamel Bhagawati Marg 26, Kathmandu, Nepal</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#01366E] shrink-0" />
                  <div>
                    <span className="text-xs text-slate-500 block">Front Desk (24/7):</span>
                    <a
                      href="tel:+9779851068219"
                      onClick={() => trackPhoneClick("home_location")}
                      className="font-bold text-[#01366E] hover:text-[#FB6C01] hover:underline"
                    >
                      +977 9851068219
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaWhatsapp className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-500 block">WhatsApp Support:</span>
                    <a
                      href="https://wa.me/9779818259472?text=Hello%20Hotel%20Sherpa%20Soul%2C%20I%20would%20like%20to%20check%20room%20availability%20and%20direct%20booking%20rates."
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick("home_location")}
                      className="font-bold text-emerald-700 hover:underline"
                    >
                      +977 9818259472 (Instant Chat)
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#FB6C01] shrink-0" />
                  <div>
                    <span className="text-xs text-slate-500 block">Email Inquiries:</span>
                    <a
                      href="mailto:info@hotelsherpasoul.com"
                      onClick={() => trackEmailClick("home_location")}
                      className="font-medium text-slate-800 hover:text-[#FB6C01] hover:underline"
                    >
                      info@hotelsherpasoul.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.app.goo.gl/nDB9DnLtb6taeaLRA"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackMapsClick("home_location")}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#01366E] hover:bg-[#082844] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all min-h-[44px]"
                >
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <Link
                  to="/location"
                  className="py-3 px-4 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all min-h-[44px]"
                >
                  <span>Detailed Directions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Verified Nearby Landmarks */}
            <div className="bg-amber-50/70 rounded-3xl p-6 sm:p-8 border border-amber-200/80 space-y-4">
              <h4 className="text-base font-bold text-[#01366E] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#FB6C01]" />
                <span>Verified Nearby Landmarks</span>
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                {verifiedAttractions.map((attraction, idx) => (
                  <li key={idx} className="flex items-start justify-between gap-2 border-b border-amber-100 pb-2 last:border-b-0 last:pb-0">
                    <div>
                      <strong className="block text-slate-900">{attraction.name}</strong>
                      <span className="text-[11px] text-slate-500">{attraction.note}</span>
                    </div>
                    <span className="font-semibold text-amber-800 text-right whitespace-nowrap text-xs">
                      {attraction.distance}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Embedded Responsive Google Map */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 h-[480px] sm:h-[560px] relative">
              <iframe
                title="Hotel Sherpa Soul Location Map - Thamel Bhagawati Marg 26 Kathmandu"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3532.0353113216966!2d85.310969!3d27.716196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDQyJzU4LjMiTiA4NcKwMTgnMzkuNSJF!5e0!3m2!1sen!2snp!4v1756878746121!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-xl shadow-md border border-slate-200 text-xs font-bold text-[#01366E] pointer-events-none">
                📍 Thamel Bhagawati Marg 26
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
