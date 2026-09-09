import React from "react";
import { MapPin, Moon, UtensilsCrossed, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HomeStats() {
  const { t } = useTranslation();

  const trustPillars = [
    {
      icon: <MapPin className="w-8 h-8 text-[#FB6C01]" />,
      badge: "Quiet Thamel Location",
      title: "Tucked Away From Noise",
      desc: "Located on Bhagawati Marg, just 2 minutes walk from Thamel center, yet peacefully insulated from late-night bar and traffic noise.",
    },
    {
      icon: <Moon className="w-8 h-8 text-[#01366E]" />,
      badge: "Our Golden Rule",
      title: "No Restaurant. Sleep Well.",
      desc: "We deliberately have no in-house restaurant, loud bar, or party crowd. Our sole priority is clean rooms and a deep, undisturbed sleep.",
    },
    {
      icon: <UtensilsCrossed className="w-8 h-8 text-[#FB6C01]" />,
      badge: "Long Stay Convenience",
      title: "Shared Kitchen (Long Stay Only)",
      desc: "Reserved exclusively for registered long-stay guests: equipped with an induction cooktop, refrigerator, microwave, and kettle for preparing simple home-cooked meals.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#01366E]" />,
      badge: "Trekker Friendly",
      title: "Free Luggage Storage & 24/7 Desk",
      desc: "Heading to Everest or Annapurna? Leave your extra bags in our safe luggage room free of charge while you trek in the mountains.",
    },
  ];

  return (
    <section className="py-14 bg-gradient-to-b from-white via-slate-50 to-white border-y border-slate-100 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#FB6C01] text-xs font-semibold tracking-wide uppercase mb-3">
            <span>❖</span> Authentic Sherpa Hospitality <span>❖</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#01366E] tracking-tight">
            Why Travelers Choose Hotel Sherpa Soul
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Honest, practical boutique hospitality in Kathmandu. No exaggerated claims — just clean comfort, quiet nights, and personal care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 group-hover:bg-orange-50/60 group-hover:border-orange-100 transition-colors duration-300">
                  {pillar.icon}
                </div>
                <span className="text-xs font-semibold text-[#FB6C01] uppercase tracking-wider block mb-1">
                  {pillar.badge}
                </span>
                <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
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
