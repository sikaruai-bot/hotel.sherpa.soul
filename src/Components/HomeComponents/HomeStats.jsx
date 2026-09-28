import React from "react";
import { MapPin, Moon, UtensilsCrossed, ShieldCheck, Sparkles } from "lucide-react";

export default function HomeStats() {
  const trustPillars = [
    {
      icon: <MapPin className="w-7 h-7 text-[#FB6C01]" />,
      badge: "Quiet Thamel Location",
      title: "Peaceful Alleyway Setting",
      desc: "Located on Thamel Bhagawati Marg 26, steps away from central shops and bakeries, yet peacefully insulated from late-night bar and street noise.",
    },
    {
      icon: <Moon className="w-7 h-7 text-[#01366E]" />,
      badge: "Quiet Atmosphere",
      title: "Restful & Undisturbed Sleep",
      desc: "Designed for peaceful stays away from loud restaurant and bar noise inside the property. Spotless rooms and deep, restorative sleep are our priority.",
    },
    {
      icon: <UtensilsCrossed className="w-7 h-7 text-[#FB6C01]" />,
      badge: "Guest Kitchen",
      title: "Shared Kitchen for Light Cooking",
      desc: "Equipped with an induction cooktop, refrigerator, microwave, and kettle, giving guests the flexibility to prepare simple home meals and brew fresh tea.",
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#01366E]" />,
      badge: "Trekker-Friendly",
      title: "Free Luggage Storage & 24/7 Desk",
      desc: "Heading to Everest, Annapurna, or Langtang? Leave your extra gear safely in our luggage room free of charge until you return from your trek.",
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#FB6C01] text-xs font-semibold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why Stay at Hotel Sherpa Soul</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#01366E] tracking-tight">
            Comfortable, Quiet Accommodation in Thamel
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Honest, practical boutique hospitality in Kathmandu. No exaggerated claims — just clean comfort, quiet nights, and personal care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-13 h-13 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-5 group-hover:border-orange-200 transition-colors duration-300 shadow-xs">
                  {pillar.icon}
                </div>
                <span className="text-xs font-bold text-[#FB6C01] uppercase tracking-wider block mb-1">
                  {pillar.badge}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
