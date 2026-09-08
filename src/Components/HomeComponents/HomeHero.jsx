import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Play,
  X,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Calendar,
  Clock,
} from "lucide-react";
import { motion as Motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import BookingModal from "../HelperComponents/BookingModal";
import { trackMetaEvent } from "../Analytics/pixelEvents";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import { useCMS } from "../../Context/CMSContext";

export default function HomeIntro() {
  const { t, i18n } = useTranslation();
  const { content: cmsContent } = useCMS();
  const heroData = cmsContent?.hero || {};

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const heroSlides = [
    {
      image: heroData.bgImage || "hero/hero1.webp",
      subtitle: heroData.subtitle || t("home.hero.subtitle"),
    },
    {
      image: "hero/hero2.webp",
      subtitle: heroData.subtitle || t("home.hero.subtitle"),
    },
    {
      image: "hero/hero4.webp",
      subtitle: heroData.subtitle || t("home.hero.subtitle"),
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/1JYojEJGiL/",
      label: "Facebook",
      text: "blue",
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@sherpa.soul?_t=ZS-8ytRMKvOf4a&_r=1",
      label: "Tiktok",
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/9779851068219?text=Hello! I'd like to talk with you.",
      label: "Whatsapp",
      text: "green",
    },
  ];

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

  const isArabic = i18n.language.toLowerCase() === "ar";

  return (
    <div
      className={`relative ${isArabic ? "direction-rtl" : "direction-ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <section className="w-screen h-screen relative overflow-hidden flex">
        {/* Background Image Slideshow */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-[3000ms] ease-in-out ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <div
                className="w-full h-full mt-[80px]"
                style={{
                  backgroundImage: `url('${slide.image}')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>
          ))}
        </div>

        {/* Opening Soon Banner */}
        {/* Opening Soon Banner */}

        {/* Vertical Social Media Links */}
        <Motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`absolute ${
            isArabic ? "left-8" : "right-8"
          } bottom-8 z-20 hidden md:block`}
        >
          {/* "SOCIAL" text vertically */}
          <div className="mb-6 text-center">
            <div className="flex flex-col space-y-1 text-white/60 text-sm font-light tracking-widest">
              <span>S</span>
              <span>O</span>
              <span>C</span>
              <span>I</span>
              <span>A</span>
              <span>L</span>
            </div>
            <div className="mt-4 h-8 w-px bg-white/40 mx-auto"></div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col space-y-4">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <Motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="group w-10 h-10 bg-white backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <IconComponent
                    className={`w-6 h-6 text-${social.text}-500 group-hover:text-amber-300 transition-colors duration-300`}
                  />
                </Motion.a>
              );
            })}
          </div>

          {/* Bottom decorative line */}
          <div className="mt-6 h-8 w-px bg-white/40 mx-auto"></div>
        </Motion.div>

        {/* Content Panel */}
        <div
          className={`relative z-10 w-full flex flex-col justify-end px-6 sm:px-12 lg:px-20 pb-2 md:pb-12 max-w-6xl text-white ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          <Motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            {/* Text + Buttons container */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              {/* Text Block */}
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-sm font-semibold tracking-wide backdrop-blur-sm">
                  {heroData.subtitle || t("home.hero.subtitle")}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-none tracking-tight">
                  {heroData.title || t("home.hero.title")}
                </h1>
                <p className="text-white/90 text-lg leading-relaxed font-light">
                  {heroData.paragraph || t("home.hero.paragraph")}
                </p>
              </div>

              {/* Buttons Block */}
              <div
                className={`flex flex-col justify-between gap-4 ${
                  isArabic ? "sm:flex-row-reverse" : ""
                }`}
              >
                <button
                  onClick={() => {
                    trackMetaEvent("InitiateCheckout", {
                      content_category: "hotel_booking",
                      entry_point: "home_hero",
                    });
                    setIsBookingModalOpen(true);
                    setIsModalOpen(false);
                  }}
                  className="group bg-white text-gray-800 px-6 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2"
                >
                  <span>{heroData.bookButtonText || t("home.hero.bookButton")}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <button
                  onClick={openModal}
                  className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-800 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>{heroData.tourButtonText || t("home.hero.tourButton")}</span>
                </button>
              </div>
            </div>

            <div className="flex gap-4 md:hidden space-y-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="group w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-4 h-4 text-white group-hover:text-amber-300 transition-colors duration-300" />
                  </Motion.a>
                );
              })}
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl mx-4 bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-12 right-4 z-50 bg-white hover:bg-white/90 text-red-500 p-2 rounded-full transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-video">
              <iframe
                src="https://res.cloudinary.com/dobakybbu/video/upload/v1781170404/WhatsApp_Video_2026-06-11_at_3.06.54_PM_nkhxsw.mp4"
                title="Hotel Sherpa Soul Virtual Tour"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-6 bg-gradient-to-r from-amber-900/50 to-amber-800/50">
              <h3 className="text-xl font-bold text-white mb-2">
                {t("home.hero.modalTitle")}
              </h3>
              <p className="text-white/80">{t("home.hero.modalDesc")}</p>
            </div>
          </div>
        </div>
      )}

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedLanguage={i18n.language.toUpperCase()}
      />

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
