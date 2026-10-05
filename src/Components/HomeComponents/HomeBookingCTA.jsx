import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, Phone, Sparkles } from "lucide-react";
import BookingModal from "../HelperComponents/BookingModal";
import { trackBookingClick, trackPhoneClick } from "../Analytics/pixelEvents";

export default function HomeBookingCTA() {
  const { t } = useTranslation();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-[#01366E] via-[#072444] to-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t("homeBookingCTASection.badge", "Direct Booking Privilege")}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          {t("homeBookingCTASection.title", "Ready to Sleep Well in Thamel, Kathmandu?")}
        </h2>

        <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8 font-light">
          {t("homeBookingCTASection.subtitle", "Enjoy clean rooms, quiet nights, 24/7 hot showers, and trekker luggage storage. Book directly with Hotel Sherpa Soul for the best rates and instant WhatsApp support.")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              trackBookingClick("final_home_cta");
              setIsBookingModalOpen(true);
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#FB6C01] to-amber-500 hover:from-amber-600 hover:to-[#FB6C01] text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 min-h-[48px]"
          >
            <Calendar className="w-5 h-5" />
            <span>{t("homeBookingCTASection.bookBtn", "Book Direct & Save 10%")}</span>
          </button>

          <a
            href="tel:+9779851068219"
            onClick={() => trackPhoneClick("final_home_cta")}
            className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#01366E] border border-white/40 font-semibold text-base transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 min-h-[48px]"
          >
            <Phone className="w-4 h-4" />
            <span>{t("homeBookingCTASection.callBtn", "Call +977 9851068219")}</span>
          </a>
        </div>

        {/* Trust disclaimer */}
        <p className="text-xs sm:text-sm text-amber-200/90 font-medium mt-6">
          {t("homeBookingCTASection.disclaimer", "Best available direct-booking offer. Contact us for availability and dates.")}
        </p>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
}
