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
import kitchenPhoto from "../../assets/shared_kitchen_new.webp";
import frontDeskPhoto from "../../assets/frontdesk_new.webp";

export default function HomeFacilities() {
  const verifiedFacilities = [
    {
      icon: <Wifi className="w-6 h-6 text-[#FB6C01]" />,
      label: "Free High-Speed Wi-Fi",
      desc: "Fast, reliable fiber-optic internet connection accessible throughout all guest rooms and public spaces.",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#01366E]" />,
      label: "24/7 Front Desk",
      desc: "Round-the-clock reception assistance for flexible check-ins, late arrivals, and local Kathmandu advice.",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-[#FB6C01]" />,
      label: "Luggage Storage for Trekkers",
      desc: "Complimentary, secure bag holding while you hike Everest Base Camp, Annapurna Circuit, or Langtang.",
    },
    {
      icon: <Car className="w-6 h-6 text-[#01366E]" />,
      label: "Airport Transfer Service",
      desc: "Convenient airport pickup and drop-off transfers between Tribhuvan International Airport (KTM) and the hotel.",
    },
    {
      icon: <Utensils className="w-6 h-6 text-[#FB6C01]" />,
      label: "Shared Guest Kitchen",
      desc: "Clean kitchen with induction cooktop, refrigerator, microwave, and electric kettle for self-cooking.",
    },
    {
      icon: <Mountain className="w-6 h-6 text-[#01366E]" />,
      label: "Trekking Support & Advice",
      desc: "Practical assistance with trekking permits, flight tickets to Lukla or Pokhara, and authentic Sherpa advice.",
    },
    {
      icon: <ShowerHead className="w-6 h-6 text-[#FB6C01]" />,
      label: "24/7 Hot Water Showers",
      desc: "Continuous high-pressure hot and cold water in all private en-suite bathrooms at any hour.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#01366E]" />,
      label: "Daily Housekeeping",
      desc: "Attentive daily room cleaning, fresh bed linens, and spotless bathroom maintenance for a comfortable stay.",
    },
    {
      icon: <Wind className="w-6 h-6 text-[#FB6C01]" />,
      label: "Air Conditioning",
      desc: "Individual climate control equipped in Deluxe and Family room categories for year-round comfort.",
    },
    {
      icon: <Laptop className="w-6 h-6 text-[#01366E]" />,
      label: "Workspace Friendly",
      desc: "Work desk and stable connectivity suitable for remote professionals, digital nomads, and trip planners.",
    },
  ];

  return (
    <section className="py-20 bg-stone-50 border-t border-slate-200/80" id="facilities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <span>❖</span>
            <span>Verified Hotel Amenities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#01366E] tracking-tight">
            Hotel Facilities & Practical Services
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            Thoughtfully planned for international tourists, backpackers, and trekking teams who appreciate functional comfort.
          </p>
        </div>

        {/* Verified Facilities Grid (10 items: Simple Icon, Short Label, One-Sentence Explanation) */}
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
                Self-Catering Convenience
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#01366E]">
                Shared Guest Kitchen
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Cook your own meals, prepare special dietary requirements, or brew warm Himalayan tea anytime. Fully equipped with an induction stove, refrigerator, microwave, and cooking utensils.
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
                Always Available
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#01366E]">
                24/7 Reception & Travel Desk
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Whether you arrive on a late-night international flight or leave before dawn for a mountain trek, our team is always on duty to welcome you and assist with luggage and transport.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
