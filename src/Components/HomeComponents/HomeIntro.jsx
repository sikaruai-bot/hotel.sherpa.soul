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
                  backgroundImage: `url('${slide.image?.startsWith("/") ? slide.image : "/" + (slide.image || "changes_photo/doubleBedRoom.webp")}')`,
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
                  rgba(1, 54, 110, 0.95) 0%, 
                  rgba(1, 54, 110, 0.8) 25%, 
                  rgba(1, 54, 110, 0.45) 50%, 
                  rgba(1, 54, 110, 0.1) 75%,
                  rgba(1, 54, 110, 0) 100%
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
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/30 text-orange-200 text-xs sm:text-sm font-semibold tracking-wider uppercase border border-orange-400/40 backdrop-blur-md">
                <span>❖</span> {t("mainBrand.brandStatement", "No Restaurant. No Noise. Sleep Well.")}
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
                {t("mainBrand.heading", "Thamel Outside. Peace Inside.")}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-4 max-w-3xl"
            >
              <p className="text-white/95 text-lg sm:text-xl leading-relaxed font-light">
                {t("mainBrand.copy", "Thamel is full of life, energy and adventure. Hotel Sherpa Soul gives you a quieter place to come back to. Located in Thamel, Kathmandu, our hotel is designed for travelers who value a comfortable room, a convenient location and a peaceful night's sleep.")}
              </p>
              <p className="text-amber-300/90 text-sm sm:text-base font-medium italic border-l-2 border-amber-400/60 pl-3">
                "{t("mainBrand.supportingCopy", "Sometimes, the best hotel experience is simply a clean, comfortable room, a great location and a good night's sleep.")}"
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className={`flex flex-wrap items-center gap-4 pt-4 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <a
                href="/rooms"
                className="bg-amber-500 hover:bg-amber-600 text-white px-7 py-3.5 rounded-full font-bold text-base transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                <span>View Rooms & Rates</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/about"
                className="bg-white/15 hover:bg-white text-white hover:text-slate-950 border border-white/40 px-6 py-3.5 rounded-full font-semibold text-base transition-all duration-300 backdrop-blur-sm"
              >
                Our Story
              </a>
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

            <div className="p-6 bg-[#01366E] text-white">
              <h3 className="text-xl font-bold text-white mb-2">
                {t("modalTitle")}
              </h3>
              <p className="text-slate-200">{t("modalDescription")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
