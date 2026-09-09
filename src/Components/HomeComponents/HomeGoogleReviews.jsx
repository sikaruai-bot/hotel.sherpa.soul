import React from "react";
import { Star, MapPin, MessageSquare, ExternalLink, ShieldCheck, HeartHandshake, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeGoogleReviews() {
  const googleMapsUrl = "https://maps.app.goo.gl/nDB9DnLtb6taeaLRA";

  const directBookingPerks = [
    "Best Direct Price Guarantee — No OTA commission markups",
    "Instant 24/7 WhatsApp confirmation with front desk",
    "Complimentary secure luggage storage while you trek",
    "Flexible early check-in & late checkout (subject to availability)",
  ];

  return (
    <section className="py-16 bg-[#01366E] text-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,100 L50,0 L100,100 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Authentic Hospitality Promise */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-orange-300 text-xs font-semibold uppercase tracking-wider">
              <span>❖</span> Honest Hospitality & Verified Location
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Real Hospitality. <span className="text-[#FB6C01]">Genuine Guest Experiences.</span>
            </h2>

            <p className="text-slate-200 text-base leading-relaxed">
              At Hotel Sherpa Soul, we believe in honest hospitality without fabricated stories or star-hotel exaggerations. We are a small boutique hotel on Bhagawati Marg, Thamel, dedicated to giving travelers a quiet, spotless, and comfortable stay in Kathmandu.
            </p>

            <div className="space-y-3 pt-2">
              {directBookingPerks.map((perk, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-[#FB6C01] flex-shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="bg-[#FB6C01] hover:bg-[#E05A00] text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
              >
                <span>Book Direct With Us</span>
                <HeartHandshake className="w-4 h-4" />
              </Link>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base transition-all duration-200 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-orange-300" />
                <span>Find Us on Google Maps</span>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>
            </div>
          </div>

          {/* Right Column: Google Review Card */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-800 rounded-3xl p-8 shadow-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/google.webp"
                  alt="Google Reviews"
                  className="w-8 h-8 object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-lg leading-tight">
                    Hotel Sherpa Soul
                  </h3>
                  <p className="text-xs text-slate-500">
                    Thamel Bhagawati Marg 26, Kathmandu
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-6">
                <div className="flex items-center gap-1.5 text-amber-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "Have you stayed with us? We warmly welcome our guests to leave an honest review on Google Maps to help fellow travelers make informed decisions."
                </p>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#01366E] hover:bg-[#082844] text-white py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Write a Google Review or View Map</span>
              </a>

              <p className="text-center text-xs text-slate-500 mt-3">
                100% verified, real-world traveler feedback on Google
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
