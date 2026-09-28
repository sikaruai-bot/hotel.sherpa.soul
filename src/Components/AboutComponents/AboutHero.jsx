import { Mountain } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AboutHero() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Responsive LCP Hero Image */}
        <picture className="absolute inset-0 z-0">
          <source media="(max-width: 768px)" srcSet="/changes_photo/singlesitter-mobile.webp" type="image/webp" />
          <source media="(min-width: 769px)" srcSet="/changes_photo/singlesitter.webp" type="image/webp" />
          <img
            src="/changes_photo/singlesitter.webp"
            alt="About Hotel Sherpa Soul - Thamel Kathmandu"
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
            width="960"
            height="720"
          />
        </picture>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-1"></div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 z-1"></div>

        {/* Text content */}
        <div className="relative z-10 text-center text-white px-6">
          <h1
            className="text-5xl md:text-7xl font-extrabold tracking-wide drop-shadow-2xl mb-6 
                       bg-gradient-to-r from-white via-orange-200 to-orange-500 
                       bg-clip-text text-transparent bg-[length:200%_200%] bg-left"
          >
            {t("aboutPageContent.h1", t("about.hero.title", "About Hotel Sherpa Soul"))}
          </h1>

          <p
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
          >
            {t("aboutPageContent.introHeading", t("about.hero.subtitle", "A peaceful place to stay in the heart of Thamel, Kathmandu."))}
          </p>
        </div>
      </div>
    </div>
  );
}
