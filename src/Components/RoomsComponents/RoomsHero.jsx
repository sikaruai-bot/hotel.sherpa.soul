import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const heroImage = "/changes_photo/singlesitter.jpeg";

export default function RoomsHero() {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <motion.img
        src={heroImage}
        alt="Room Hero Background"
        className="absolute top-0 left-0 w-full h-full object-cover scale-110"
        style={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        draggable={false}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />

      <div className="relative z-20 flex flex-col justify-end h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-20 text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-4 text-white/90 mb-8"
          >
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
          </motion.div>

          {/* Main Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="block"
              >
                {t("roomsHero.headingLine1")}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/80"
              >
                {t("roomsHero.headingLine2")}
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="text-xl md:text-2xl font-extralight text-white/80 max-w-3xl leading-relaxed"
            >
              {t("roomsHero.paragraph")}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
