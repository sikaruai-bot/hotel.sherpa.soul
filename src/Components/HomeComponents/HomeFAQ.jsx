import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { HelpCircle, ChevronDown, Phone, MapPin, BedDouble, Utensils, Wind, Wifi, Plane, Briefcase, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { trackWhatsAppClick, trackPhoneClick } from "../Analytics/pixelEvents";

export default function HomeFAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const faqList = [
    {
      q: t("homeFAQSection.q1", "Where is Hotel Sherpa Soul located?"),
      a: t("homeFAQSection.a1", "Hotel Sherpa Soul is located on Thamel Bhagawati Marg 26 in the heart of Thamel, Kathmandu, Nepal. We are in a quiet alley within easy walking distance to trekking gear shops, bakeries, cafes, and historic Durbar Square."),
      icon: <MapPin className="w-5 h-5 text-[#FB6C01]" />,
    },
    {
      q: t("homeFAQSection.q2", "How can I reach the hotel from Tribhuvan International Airport?"),
      a: t("homeFAQSection.a2", "The hotel is approximately 6 km from Tribhuvan International Airport (KTM). Travel time is typically 20 to 30 minutes by taxi or private transfer depending on city traffic."),
      icon: <Plane className="w-5 h-5 text-[#01366E]" />,
    },
    {
      q: t("homeFAQSection.q3", "Does the hotel offer airport pickup?"),
      a: t("homeFAQSection.a3", "Yes, we arrange reliable airport pickup and drop-off transfers directly between Kathmandu Airport and the hotel. You can request an airport transfer when booking directly or by contacting our front desk via WhatsApp at +977 9818259472."),
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    },
    {
      q: t("homeFAQSection.q4", "Is luggage storage available for trekkers?"),
      a: t("homeFAQSection.a4", "Yes, we offer complimentary secure luggage storage for all guests. Trekkers venturing on multi-day journeys to Everest, Annapurna, or Langtang can safely store their non-trekking luggage with us free of charge until they return."),
      icon: <Briefcase className="w-5 h-5 text-[#FB6C01]" />,
    },
    {
      q: t("homeFAQSection.q5", "Does the hotel have a restaurant?"),
      a: t("homeFAQSection.a5", "Designed for peaceful stays away from loud restaurant and bar noise inside the property. While we do not operate a commercial on-site restaurant or bar, we provide guests with a fully equipped shared kitchen, and hundreds of Thamel's acclaimed restaurants and bakeries are just a 1 to 3 minute walk away."),
      icon: <Utensils className="w-5 h-5 text-[#01366E]" />,
    },
    {
      q: t("homeFAQSection.q6", "Is a shared kitchen available?"),
      a: t("homeFAQSection.a6", "Yes, Hotel Sherpa Soul provides a clean, well-equipped shared guest kitchen featuring an induction cooktop, refrigerator, microwave, and electric kettle where guests can prepare light meals, cook personal dietary favorites, or brew fresh Himalayan tea."),
      icon: <Utensils className="w-5 h-5 text-[#FB6C01]" />,
    },
    {
      q: t("homeFAQSection.q7", "What time is check-in and check-out?"),
      a: t("homeFAQSection.a7", "Standard check-in begins at 14:00 (2:00 PM) and check-out is until 12:00 (12:00 PM noon). Our front desk is staffed 24/7, and flexible early check-in or late check-out is accommodated whenever room availability allows."),
      icon: <Clock className="w-5 h-5 text-[#01366E]" />,
    },
    {
      q: t("homeFAQSection.q8", "Is Wi-Fi available?"),
      a: t("homeFAQSection.a8", "Yes, complimentary high-speed fiber-optic Wi-Fi is provided throughout the entire property, including all guest rooms, suites, and common lounge spaces."),
      icon: <Wifi className="w-5 h-5 text-[#FB6C01]" />,
    },
    {
      q: t("homeFAQSection.q9", "Which rooms have air conditioning?"),
      a: t("homeFAQSection.a9", "Air conditioning (AC) with heating and cooling climate control is equipped in our Deluxe Rooms and Family Rooms. Budget Family Rooms feature ceiling fans and supplemental heating."),
      icon: <Wind className="w-5 h-5 text-[#01366E]" />,
    },
    {
      q: t("homeFAQSection.q10", "What is the cancellation policy?"),
      a: t("homeFAQSection.a10", "Direct bookings made via our website, WhatsApp, or phone enjoy flexible cancellation. If your travel plans change, please notify our front desk at least 24 hours prior to your scheduled arrival date."),
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
    },
    {
      q: t("homeFAQSection.q11", "How can I book directly?"),
      a: t("homeFAQSection.a11", "You can book directly through our official website by clicking 'Check Availability', or contact our front desk directly via WhatsApp at +977 9818259472 for instant booking confirmation with our best 10% direct rate guarantee."),
      icon: <BedDouble className="w-5 h-5 text-[#FB6C01]" />,
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-20 bg-slate-50/70 border-t border-slate-200" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#FB6C01]" />
            <span>{t("homeFAQSection.badge", "Frequently Asked Questions")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#01366E] tracking-tight">
            {t("homeFAQSection.title", "Helpful Information for Your Stay")}
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            {t("homeFAQSection.subtitle", "Real, verified information about staying at Hotel Sherpa Soul in Thamel, Kathmandu.")}
          </p>
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-3.5">
          {faqList.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#01366E] cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                      {item.icon}
                    </div>
                    <span className="font-bold text-slate-900 text-base sm:text-lg">
                      {item.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#FB6C01]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 text-slate-700 text-sm sm:text-base leading-relaxed border-t border-slate-100 pl-14 sm:pl-16">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">
              {t("homeFAQSection.haveQuestion", "Have Another Question?")}
            </h3>
            <p className="text-slate-600 text-sm mt-0.5">
              {t("homeFAQSection.helpText", "Our 24/7 reception desk is available anytime via WhatsApp or phone.")}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/9779818259472?text=Hello%20Hotel%20Sherpa%20Soul!%20I%20have%20a%20question%20about%20my%20stay."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("faq_footer")}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all min-h-[44px]"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>{t("homeFAQSection.whatsappBtn", "WhatsApp Us")}</span>
            </a>
            <a
              href="tel:+9779851068219"
              onClick={() => trackPhoneClick("faq_footer")}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-[#01366E]" />
              <span>{t("homeFAQSection.callBtn", "Call Reception")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
