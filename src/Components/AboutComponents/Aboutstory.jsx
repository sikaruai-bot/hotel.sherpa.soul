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
                <div className="inline-block py-1.5 px-3 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  {t("aboutStory.ourStory", "Our Story")}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#01366E] mb-6 leading-tight">
                  {t(
                    "aboutPageContent.introHeading",
                    "A peaceful place to stay in the heart of Thamel, Kathmandu."
                  )}
                </h2>
              </div>

              <div className="space-y-5 text-base md:text-lg leading-relaxed text-gray-700">
                <p>
                  {t(
                    "aboutPageContent.copy",
                    "Hotel Sherpa Soul was created for travelers who want to experience Kathmandu without giving up the comfort of a peaceful night's sleep. Located in Thamel, one of Kathmandu's most popular traveler neighborhoods, we offer a simple and comfortable base for exploring the city, preparing for a trek or beginning your journey through Nepal."
                  )}
                </p>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#FB6C01]" />
                    {t("aboutPageContent.location.heading", "At the Heart of Thamel")}
                  </h3>
                  <p className="text-gray-600 text-base">
                    {t(
                      "aboutPageContent.location.copy",
                      "Thamel is one of Kathmandu's best-known areas for travelers, surrounded by cafés, shops, travel services and local experiences. Hotel Sherpa Soul gives you the convenience of staying close to it all while offering a peaceful place to return to."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Image with overlays */}
            <div className="relative">
              <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img
                  src="/intro.webp"
                  alt={t("aboutStory.imageAlt", "Hotel Sherpa Soul boutique hotel in Thamel, Kathmandu")}
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
