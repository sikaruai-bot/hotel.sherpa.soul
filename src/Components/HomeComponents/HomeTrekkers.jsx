import React from "react";
import { useTranslation } from "react-i18next";
import { Mountain, Compass, Bed, Sparkles, CheckCircle2 } from "lucide-react";

export default function HomeTrekkers() {
  const { t } = useTranslation();

  const trekPillars = [
    {
      step: "01",
      title: t("homeTrekkersSection.step1Title", "Before the Trek"),
      desc: t("homeTrekkersSection.step1Desc", "Rest after international flights, organize your gear, finalize route permits, and safely store your extra city bags in our secure luggage room free of charge."),
      icon: <Mountain className="w-7 h-7 text-[#FB6C01]" />,
      tag: t("homeTrekkersSection.step1Tag", "Gear Prep & Free Storage"),
    },
    {
      step: "02",
      title: t("homeTrekkersSection.step2Title", "After the Trek"),
      desc: t("homeTrekkersSection.step2Desc", "Return from the Himalayas to a high-pressure hot shower, clean bed, peaceful surroundings, and a well-deserved deep sleep in Thamel."),
      icon: <Bed className="w-7 h-7 text-[#01366E]" />,
      tag: t("homeTrekkersSection.step2Tag", "24/7 Hot Shower & Deep Sleep"),
    },
    {
      step: "03",
      title: t("homeTrekkersSection.step3Title", "Sherpa Guidance & Support"),
      desc: t("homeTrekkersSection.step3Desc", "Drawing from authentic Himalayan heritage, our front desk assists with permit advice, Lukla/Pokhara flight coordination, and practical Nepal travel tips."),
      icon: <Compass className="w-7 h-7 text-[#FB6C01]" />,
      tag: t("homeTrekkersSection.step3Tag", "Authentic Local Knowledge"),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-amber-50/20 to-white relative overflow-hidden border-t border-slate-100" id="trekkers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FB6C01]" />
            <span>{t("homeTrekkersSection.badge", "Trekker-Friendly Services")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#01366E] tracking-tight mb-4">
            {t("homeTrekkersSection.title", "Made for Your Himalayan Journey")}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {t("homeTrekkersSection.subtitle", "Kathmandu is the gateway to Nepal's trails. Whether you are trekking Everest Base Camp, Annapurna Circuit, Langtang, or exploring the valley, Hotel Sherpa Soul provides a reliable, welcoming base.")}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trekPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-amber-100 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-200">
                    {pillar.step}
                  </span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FB6C01] bg-orange-50 px-2.5 py-1 rounded-lg mb-2.5 inline-block">
                  {pillar.tag}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t("homeTrekkersSection.complimentary", "Complimentary for all staying guests")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
