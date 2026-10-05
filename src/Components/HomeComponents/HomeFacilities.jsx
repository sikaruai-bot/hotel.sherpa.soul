import React from "react";
import {
  Wifi,
  Clock,
  Briefcase,
  Car,
  Utensils,
  Mountain,
  ShowerHead,
  Sparkles,
  Wind,
  Laptop,
  CheckCircle2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import kitchenPhoto from "../../assets/shared_kitchen_new.webp";
import frontDeskPhoto from "../../assets/frontdesk_new.webp";

export default function HomeFacilities() {
  const { t } = useTranslation();

  const verifiedFacilities = [
    {
      icon: <Wifi className="w-6 h-6 text-[#FB6C01]" />,
      label: t("facilitiesSection.f1", "Free High-Speed Wi-Fi"),
      desc: t("facilitiesSection.d1", "Fast, reliable fiber-optic internet connection accessible throughout all guest rooms and public spaces."),
    },
    {
      icon: <Clock className="w-6 h-6 text-[#01366E]" />,
      label: t("facilitiesSection.f2", "24/7 Front Desk"),
      desc: t("facilitiesSection.d2", "Round-the-clock reception assistance for flexible check-ins, late arrivals, and local Kathmandu advice."),
    },
    {
      icon: <Briefcase className="w-6 h-6 text-[#FB6C01]" />,
      label: t("facilitiesSection.f3", "Luggage Storage for Trekkers"),
      desc: t("facilitiesSection.d3", "Complimentary, secure bag holding while you hike Everest Base Camp, Annapurna Circuit, or Langtang."),
    },
    {
      icon: <Car className="w-6 h-6 text-[#01366E]" />,
      label: t("facilitiesSection.f4", "Airport Transfer Service"),
      desc: t("facilitiesSection.d4", "Convenient airport pickup and drop-off transfers between Tribhuvan International Airport (KTM) and the hotel."),
    },
    {
      icon: <Utensils className="w-6 h-6 text-[#FB6C01]" />,
      label: t("facilitiesSection.f5", "Shared Guest Kitchen"),
      desc: t("facilitiesSection.d5", "Clean kitchen with induction cooktop, refrigerator, microwave, and electric kettle for self-cooking."),
    },
    {
      icon: <Mountain className="w-6 h-6 text-[#01366E]" />,
      label: t("facilitiesSection.f6", "Trekking Support & Advice"),
      desc: t("facilitiesSection.d6", "Practical assistance with trekking permits, flight tickets to Lukla or Pokhara, and authentic Sherpa advice."),
    },
    {
      icon: <ShowerHead className="w-6 h-6 text-[#FB6C01]" />,
      label: t("facilitiesSection.f7", "24/7 Hot Water Showers"),
      desc: t("facilitiesSection.d7", "Continuous high-pressure hot and cold water in all private en-suite bathrooms at any hour."),
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#01366E]" />,
      label: t("facilitiesSection.f8", "Daily Housekeeping"),
      desc: t("facilitiesSection.d8", "Attentive daily room cleaning, fresh bed linens, and spotless bathroom maintenance for a comfortable stay."),
    },
    {
      icon: <Wind className="w-6 h-6 text-[#FB6C01]" />,
      label: t("facilitiesSection.f9", "Air Conditioning"),
      desc: t("facilitiesSection.d9", "Individual climate control equipped in Deluxe and Family room categories for year-round comfort."),
    },
    {
      icon: <Laptop className="w-6 h-6 text-[#01366E]" />,
      label: t("facilitiesSection.f10", "Workspace Friendly"),
      desc: t("facilitiesSection.d10", "Work desk and stable connectivity suitable for remote professionals, digital nomads, and trip planners."),
    },
  ];

  return (
    <section className="py-20 bg-stone-50 border-t border-slate-200/80" id="facilities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <span>❖</span>
            <span>{t("facilitiesSection.badge", "Verified Hotel Amenities")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#01366E] tracking-tight">
            {t("facilitiesSection.title", "Hotel Facilities & Practical Services")}
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            {t("facilitiesSection.subtitle", "Thoughtfully planned for international tourists, backpackers, and trekking teams who appreciate functional comfort.")}
          </p>
        </div>

        {/* Verified Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {verifiedFacilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                {facility.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  {facility.label}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {facility.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Spotlight: Shared Guest Kitchen & Front Desk */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md flex flex-col justify-between">
            <div className="h-56 overflow-hidden">
              <img
                src={kitchenPhoto}
                alt="Shared Guest Kitchen at Hotel Sherpa Soul Thamel Kathmandu"
                className="w-full h-full object-cover"
                width="600"
                height="320"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-6 sm:p-8 space-y-3">
              <span className="text-xs font-bold text-[#FB6C01] uppercase tracking-wider">
                {t("facilitiesSection.card1Badge", "Self-Catering Convenience")}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#01366E]">
                {t("facilitiesSection.card1Title", "Shared Guest Kitchen")}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t("facilitiesSection.card1Desc", "Cook your own meals, prepare special dietary requirements, or brew warm Himalayan tea anytime. Fully equipped with an induction stove, refrigerator, microwave, and cooking utensils.")}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md flex flex-col justify-between">
            <div className="h-56 overflow-hidden">
              <img
                src={frontDeskPhoto}
                alt="24/7 Front Desk Reception at Hotel Sherpa Soul Kathmandu"
                className="w-full h-full object-cover"
                width="600"
                height="320"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-6 sm:p-8 space-y-3">
              <span className="text-xs font-bold text-[#FB6C01] uppercase tracking-wider">
                {t("facilitiesSection.card2Badge", "Always Available")}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#01366E]">
                {t("facilitiesSection.card2Title", "24/7 Reception & Travel Desk")}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t("facilitiesSection.card2Desc", "Whether you arrive on a late-night international flight or leave before dawn for a mountain trek, our team is always on duty to welcome you and assist with luggage and transport.")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
