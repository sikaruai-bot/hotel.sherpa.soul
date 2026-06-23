import { Mountain } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AboutHero() {
  const { t } = useTranslation();

  return (
    <div>
      <div
        className="relative min-h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{
          // ✅ Using public folder path so it works in all languages
          backgroundImage: "url('/changes_photo/singlesitter.jpeg')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>

        {/* Text content */}
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              backgroundPosition: "200% center",
              transition: { duration: 0.6 },
            }}
            className="text-5xl md:text-7xl font-extrabold tracking-wide drop-shadow-2xl mb-6 
                       bg-gradient-to-r from-white via-orange-200 to-orange-500 
                       bg-clip-text text-transparent bg-[length:200%_200%] bg-left"
          >
            {t("about.hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
          >
            {t("about.hero.subtitle")}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
