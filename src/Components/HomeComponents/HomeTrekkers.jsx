import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mountain, Compass, ShieldCheck, ArrowRight, Bed, Sparkles, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BookingModal from "../HelperComponents/BookingModal";
import { trackMetaEvent } from "../Analytics/pixelEvents";

export default function HomeTrekkers() {
  const { t } = useTranslation();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const trekPillars = [
    {
      step: "01",
      title: t("trekkersSection.beforeTrek.title", "Before the Trek"),
      desc: t("trekkersSection.beforeTrek.desc", "Rest, recharge and prepare for your journey."),
      icon: <Mountain className="w-7 h-7 text-amber-500" />,
      tag: "Trek Preparation & Gear Storage",
    },
    {
      step: "02",
      title: t("trekkersSection.afterTrek.title", "After the Trek"),
      desc: t("trekkersSection.afterTrek.desc", "Come back to Kathmandu and enjoy a comfortable place to relax."),
      icon: <Bed className="w-7 h-7 text-amber-500" />,
      tag: "Hot Showers & Deep Sleep",
    },
    {
      step: "03",
      title: t("trekkersSection.cityExploration.title", "City Exploration"),
      desc: t("trekkersSection.cityExploration.desc", "Stay close to the energy of Thamel while having a peaceful room to return to."),
      icon: <Compass className="w-7 h-7 text-amber-500" />,
      tag: "2 Mins Walk to Thamel Hub",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden border-t border-slate-100">
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Travelers & Trekkers
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#01366E] tracking-tight mb-4">
            {t("trekkersSection.heading", "Made for the Journey Ahead")}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {t(
              "trekkersSection.copy",
              "Kathmandu is often the beginning of something bigger. Whether you're starting a Himalayan trek, exploring Nepal for the first time, or simply discovering Kathmandu, Hotel Sherpa Soul gives you a comfortable base in Thamel."
            )}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {trekPillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-amber-100/80 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-200">
                    {pillar.step}
                  </span>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                  {pillar.tag}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-amber-700">
                <span>Authentic Sherpa Hospitality</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section 7: Booking CTA Section */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#01366E] via-[#072340] to-slate-950 p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-sm">
              <span>✦</span> Start Your Journey
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white">
              {t("bookingCta.heading", "Your Kathmandu Adventure Starts Here.")}
            </h3>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-8 font-light">
              {t(
                "bookingCta.copy",
                "Explore Thamel. Discover Kathmandu. Prepare for the Himalayas. And when the day is done, come back to a place where you can simply sleep well."
              )}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  trackMetaEvent("InitiateCheckout", {
                    content_category: "hotel_booking",
                    entry_point: "home_trekkers_cta",
                  });
                  setIsBookingModalOpen(true);
                }}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-full text-base transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
              >
                <span>{t("bookingCta.primaryCta", "Book Your Stay at Hotel Sherpa Soul")}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                to="/rooms"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white hover:text-slate-900 border border-white/30 text-white font-semibold rounded-full text-base transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
              >
                <span>{t("bookingCta.secondaryCta", "Check Room Availability")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
