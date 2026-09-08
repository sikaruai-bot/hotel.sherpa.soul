import { ChevronRight, MapPin } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Aboutstory() {
  const { t } = useTranslation();

  // Multi-color gradient
  const MULTI_GRADIENT = `linear-gradient(to right, #F79724, #FF6B6B, #9B5DE5, #2CACE2)`;

  return (
    <div>
      <section className="relative py-24 px-6 md:px-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-block py-2 text-black text-md font-semibold mb-2">
                  {t("aboutStory.ourStory")}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                  {t("aboutStory.welcomeTo")}{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F79724] to-[#2CACE2]">
                    {t("aboutStory.sherpaSoul")}
                  </span>
                </h2>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-gray-600">
                <p>{t("aboutStory.paragraph1")}</p>
                <p>{t("aboutStory.paragraph2")}</p>
                <p>{t("aboutStory.paragraph3")}</p>
              </div>
            </div>

            {/* Image with overlays */}
            <div className="relative">
              <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img
                  src="/intro.webp"
                  alt={t("aboutStory.imageAlt")}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
