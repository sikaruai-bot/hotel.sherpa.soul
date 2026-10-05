import { MessageCircle } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ContactHero() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Responsive LCP Hero Image */}
      <picture className="absolute inset-0 z-0">
        <source media="(max-width: 768px)" srcSet="/changes_photo/doubleBed-mobile.webp" type="image/webp" />
        <source media="(min-width: 769px)" srcSet="/changes_photo/doubleBed.webp" type="image/webp" />
        <img
          src="/changes_photo/doubleBed.webp"
          alt="Contact Hotel Sherpa Soul - Thamel Kathmandu"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width="768"
          height="512"
        />
      </picture>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60 z-1"></div>

      {/* Animated Color Blobs */}
      <div className="absolute inset-0 overflow-hidden z-1">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-400/20 to-pink-500/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-white text-center px-4 max-w-4xl">
        <div className="mb-6">
          <div className="inline-block p-4 bg-white/10 backdrop-blur-lg rounded-full mb-4">
            <MessageCircle className="w-12 h-12 text-orange-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-2xl mb-4 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
          {t("contactHero.title")}
        </h1>
        <p className="mt-4 text-xl text-gray-200 drop-shadow-lg">
          {t("contactHero.subtitle")}
        </p>
      </div>
    </section>
  );
}
