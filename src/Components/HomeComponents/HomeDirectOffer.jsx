import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Tag, Clock, Briefcase, CheckCircle2, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import BookingModal from "../HelperComponents/BookingModal";
import { trackBookingClick, trackWhatsAppClick } from "../Analytics/pixelEvents";

export default function HomeDirectOffer() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const perks = [
    {
      title: "10% Direct Booking Discount",
      desc: "Instant 10% savings applied to standard room rates when booking directly with us.",
      icon: <Tag className="w-5 h-5 text-[#FB6C01]" />,
    },
    {
      title: "Free Luggage Storage",
      desc: "Leave your extra bags safely in our secure storage room while trekking the Himalayas.",
      icon: <Briefcase className="w-5 h-5 text-[#01366E]" />,
    },
    {
      title: "Instant 24/7 WhatsApp Confirmation",
      desc: "Get quick replies, airport transfer arrangements, and friendly assistance anytime.",
      icon: <Clock className="w-5 h-5 text-emerald-600" />,
    },
    {
      title: "Best Rate Guarantee",
      desc: "No third-party commission markups or hidden fees. Transparent, honest pricing.",
      icon: <ShieldCheck className="w-5 h-5 text-[#FB6C01]" />,
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-b border-amber-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-amber-200/90 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#FB6C01] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Direct Booking Benefits</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#01366E] tracking-tight">
                Book Directly with Hotel Sherpa Soul & Save 10%
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Skip OTA commissions and receive personalized Himalayan hospitality. Contact us for real-time room availability, dates, and flexible check-in.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
                {perks.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                    <div className="p-1.5 rounded-lg bg-white shadow-xs shrink-0 mt-0.5">
                      {perk.icon}
                    </div>
                    <div>
                      <strong className="block text-xs sm:text-sm text-slate-900 font-bold">{perk.title}</strong>
                      <span className="text-[11px] text-slate-500 leading-snug block">{perk.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={() => {
                  trackBookingClick("direct_offer_section");
                  setIsBookingModalOpen(true);
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FB6C01] to-amber-500 hover:from-amber-600 hover:to-[#FB6C01] text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Direct & Save 10%</span>
              </button>

              <a
                href="https://wa.me/9779818259472?text=Hello%20Hotel%20Sherpa%20Soul%2C%20I%20would%20like%20to%20check%20room%20availability%20and%20direct%20booking%20rates."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("direct_offer_section")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 min-h-[48px]"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>

              <p className="text-[11px] text-slate-500 text-center font-medium mt-1">
                🛡️ Best available direct-booking offer. Contact us for availability and dates.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
}
