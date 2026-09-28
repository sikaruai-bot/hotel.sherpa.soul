import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function RoomsHero() {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only register mousemove parallax on fine pointer devices (desktop) to save mobile battery and thread time
    if (window.matchMedia("(pointer: fine)").matches) {
      const handleMouseMove = (e) => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-900">
      {/* Responsive LCP Hero Image: Mobile WebP (32KB) vs Desktop WebP */}
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet="/changes_photo/singlesitter-mobile.webp"
          type="image/webp"
        />
        <source
          media="(min-width: 769px)"
          srcSet="/changes_photo/singlesitter.webp"
          type="image/webp"
        />
        <motion.img
          src="/changes_photo/singlesitter.webp"
          alt="Hotel Sherpa Soul comfortable and quiet rooms in Thamel Kathmandu"
          className="absolute top-0 left-0 w-full h-full object-cover scale-110"
          style={{
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          draggable={false}
          fetchpriority="high"
          loading="eager"
          decoding="async"
          width="960"
          height="720"
        />
      </picture>

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10 pointer-events-none" />

      {/* Critical Content: Visible immediately (no opacity: 0 blocking) to ensure instant FCP and LCP */}
      <div className="relative z-20 flex flex-col justify-end h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-20 text-white">
        <div className="space-y-8 max-w-4xl">
          {/* Badge */}
          <div className="flex items-center gap-4 text-white/90 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-full blur-lg" />
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg
                  className="w-6 h-6 transition-transform hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                  <polyline points="12,6 12,12 16,14" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-semibold tracking-wide">
                {t("roomsHero.badgeTitle")}
              </span>
              <span className="text-sm md:text-base text-white/70 font-light">
                {t("roomsHero.badgeSubtitle")}
              </span>
            </div>
          </div>

          {/* Main Text */}
          <div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
              <span className="block">
                {t("roomsHero.headingLine1")}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/80">
                {t("roomsHero.headingLine2")}
              </span>
            </h1>
            <p className="text-lg md:text-2xl font-extralight text-white/80 max-w-3xl leading-relaxed">
              {t("roomsHero.paragraph")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
