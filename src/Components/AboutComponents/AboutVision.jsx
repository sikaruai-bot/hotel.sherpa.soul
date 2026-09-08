import { ChevronRight, Heart, Sparkles, Star } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function AboutVision() {
  const { t } = useTranslation();

  return (
    <div>
      <section className="relative min-h-[80vh] flex items-center justify-center px-4 md:px-8 bg-slate-400 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/changes_photo/feature1.webp"
            alt={t("aboutVision.buddhistAlt") || "Buddhist Symbol - Hotel Sherpa Soul Kathmandu"}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#F69520]/40 via-slate-900/80 to-indigo-900/70"></div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 container mx-auto text-center">
          <div className="space-y-12">
            {/* Main Heading */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">{t("aboutVision.our")} </span>
              <span className="bg-gradient-to-r from-[#F69520]  to-blue-500 bg-clip-text text-transparent">
                {t("aboutVision.vision")}
              </span>
            </h2>

            {/* Extended Description */}
            <div className="space-y-8 container mx-auto">
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                {t("aboutVision.description.part1")}{" "}
                <span className="text-white font-semibold">
                  {t("aboutVision.description.highlight")}
                </span>{" "}
                {t("aboutVision.description.part2")}
              </p>

              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                {t("aboutVision.description.para2")}
              </p>

              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                {t("aboutVision.description.para3")}
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link to="/contact">
                <button className="group relative bg-[#F69520]  text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    {t("aboutVision.startJourney")}
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-800/50 to-transparent"></div>
      </section>
    </div>
  );
}
