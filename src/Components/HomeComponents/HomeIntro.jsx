import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Play, X } from "lucide-react";
import { motion } from "framer-motion";

export default function HomeIntro() {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get slides from translations
  const heroSlides = t("heroSlides", { returnObjects: true });

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, heroSlides.length]);

  const openModal = () => {
    setIsModalOpen(true);
    setIsPlaying(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsPlaying(true);
  };

  // RTL for Arabic
  const isRTL = i18n.language === "ar";

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="relative">
      <section className="h-[90vh] flex relative overflow-hidden">
        {/* Background Image Slideshow */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-[3000ms] ease-in-out ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-110"
              }`}
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url('${slide.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          ))}
        </div>

        {/* Content Panel */}
        <div className="w-full flex flex-col justify-end px-6 sm:px-12 lg:px-20 pb-6 relative">
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(to top, 
                  rgba(171, 136, 101, 0.95) 0%, 
                  rgba(171, 136, 101, 0.8) 20%, 
                  rgba(171, 136, 101, 0.4) 40%, 
                  rgba(171, 136, 101, 0.1) 70%,
                  rgba(171, 136, 101, 0) 100%
                )
              `,
            }}
          />

          {/* Animated Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10 space-y-8 max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-none tracking-tight">
                {t("hotelName")}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-white/80 text-lg leading-relaxed max-w-2xl font-light"
            >
              {t("introsub")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className={`flex flex-col sm:flex-row justify-start sm:justify-end gap-4 pt-4 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {/* <button className="group bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2">
                <span>{t("bookButton")}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button> */}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl mx-4 bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-video">
              <iframe
                src={t("videoUrl")}
                title={t("modalTitle")}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-6 bg-gradient-to-r from-amber-900/50 to-amber-800/50">
              <h3 className="text-xl font-bold text-white mb-2">
                {t("modalTitle")}
              </h3>
              <p className="text-white/80">{t("modalDescription")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
