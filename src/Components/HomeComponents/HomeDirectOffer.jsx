import React, { useState } from "react";
import { ShieldCheck, Tag, Clock, Briefcase, Calendar, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import BookingModal from "../HelperComponents/BookingModal";
import { trackBookingClick } from "../Analytics/pixelEvents";

export default function HomeDirectOffer() {
  const { t } = useTranslation();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const perks = [
    {
      title: t("directOffer.discountTitle", "10% Direct Booking Discount"),
      desc: t("directOffer.discountDesc", "Instant 10% savings when booking directly with us — no OTA markups."),
      icon: <Tag className="w-5 h-5 text-[#FB6C01]" />,
    },
    {
      title: t("directOffer.luggageTitle", "Free Luggage Storage"),
      desc: t("directOffer.luggageDesc", "Leave your bags safely while trekking the Himalayas."),
      icon: <Briefcase className="w-5 h-5 text-[#01366E]" />,
    },
    {
      title: t("directOffer.whatsappTitle", "Instant WhatsApp Confirmation"),
      desc: t("directOffer.whatsappDesc", "24/7 replies, airport transfer help, and personal assistance."),
      icon: <Clock className="w-5 h-5 text-emerald-600" />,
    },
    {
      title: t("directOffer.bestRateTitle", "Book Direct & Save 10%"),
      desc: t("directOffer.bestRateDesc", "Transparent, honest pricing with no hidden fees."),
      icon: <ShieldCheck className="w-5 h-5 text-[#FB6C01]" />,
    },
  ];

  return (
    <section className="py-10 bg-amber-50/60 border-y border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">

          {/* Left: Perks grid */}
          <div className="flex-1 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#FB6C01] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("directOffer.badge", "Why Book Direct")}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#01366E]">
              {t("directOffer.title", "Book Directly with Us & Save 10%")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {perks.map((perk, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                  <div className="p-1.5 rounded-lg bg-slate-50 shrink-0 mt-0.5">
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

          {/* Right: Single CTA */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <button
              onClick={() => {
                trackBookingClick("direct_offer_section");
                setIsBookingModalOpen(true);
              }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FB6C01] to-amber-500 hover:from-amber-600 hover:to-[#FB6C01] text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 min-h-[48px]"
            >
              <Calendar className="w-5 h-5" />
              <span>{t("directOffer.cta", "Book Direct & Save 10%")}</span>
            </button>
            <p className="text-[11px] text-slate-500 text-center font-medium">
              🛡️ {t("directOffer.disclaimer", "Best direct-booking offer. Contact us for availability.")}
            </p>
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
