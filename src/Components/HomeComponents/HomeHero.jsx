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
  MapPin,
  Bed,
} from "lucide-react";
import { motion as Motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import BookingModal from "../HelperComponents/BookingModal";
import { trackMetaEvent } from "../Analytics/pixelEvents";
import { FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
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
      image: heroData.bgImage || "/hero/hero1.webp",
      subtitle: heroData.subtitle || t("home.hero.subtitle"),
    },
    {
      image: "/hero/hero2.webp",
      subtitle: heroData.subtitle || t("home.hero.subtitle"),
    },
    {
      image: "/hero/hero4.webp",
      subtitle: heroData.subtitle || t("home.hero.subtitle"),
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/1JYojEJGiL/",
      label: "Facebook",
      colorClass: "text-[#1877F2]",
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@sherpa.soul?_t=ZS-8ytRMKvOf4a&_r=1",
      label: "Tiktok",
      colorClass: "text-slate-900",
    },
    {
      icon: FaYoutube,
      href: "https://www.youtube.com/@HotelSherpaSoul26",
      label: "YouTube",
      colorClass: "text-[#FF0000]",
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/9779851068219?text=Hello! I'd like to talk with you.",
      label: "Whatsapp",
      colorClass: "text-[#25D366]",
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
              className={`absolute inset-0 transition-all duration-[3000ms] ease-in-out ${index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
                }`}
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url('${slide.image}')`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
              {/* Left-focused gradient overlay to let text shine on the left while keeping the room bright on the right */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
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
          className={`absolute ${isArabic ? "left-8" : "right-8"
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
                  className="group w-10 h-10 bg-white backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110 shadow-lg"
                  aria-label={social.label}
                >
                  <IconComponent
                    className={`w-5 h-5 ${social.colorClass || "text-slate-800"} group-hover:scale-110 transition-transform duration-300`}
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
          className={`relative z-10 w-full min-h-screen flex items-center px-6 sm:px-12 lg:px-20 pt-28 pb-12 max-w-7xl text-white ${isArabic ? "text-right" : "text-left"
            }`}
        >
          <Motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-5 sm:space-y-6 max-w-2xl"
          >
            {/* 10% OFF Glowing Top Pill */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FB6C01]/30 via-amber-500/25 to-[#FB6C01]/30 border border-amber-400/60 backdrop-blur-md shadow-lg shadow-orange-950/40 text-white">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FB6C01]"></span>
                </span>
                <span className="bg-[#FB6C01] text-white text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  10% OFF
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-amber-200">
                  Direct Booking Offer: <strong className="text-white font-extrabold underline decoration-amber-400 decoration-2 underline-offset-2">Save 10% Instantly</strong>
                </span>
              </div>
            </div>

            <div className="text-xs sm:text-sm uppercase tracking-[0.25em] text-amber-300 font-semibold drop-shadow">
              WELCOME TO HOTEL SHERPA SOUL
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight text-white drop-shadow-md">
              Sleep Well in the{" "}
              <span className="text-[#FB6C01]">Heart of Thamel</span>, Kathmandu
            </h1>

            <p className="text-white/95 text-base sm:text-lg leading-relaxed font-light drop-shadow">
              Discover a peaceful and comfortable stay at Hotel Sherpa Soul, located in the vibrant heart of Thamel, Kathmandu. Explore the city by day, return to a quiet room at night, and wake up refreshed for your next adventure.
            </p>

            {/* 10% Direct Booking Special Highlight Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-black/75 via-[#01366E]/50 to-black/75 border border-amber-400/50 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-gradient-to-br from-[#FB6C01] via-amber-500 to-yellow-400 flex flex-col items-center justify-center text-white shadow-lg flex-shrink-0">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider leading-none">SAVE</span>
                    <span className="text-base sm:text-lg font-black leading-none mt-0.5">10%</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-sm sm:text-base">
                        Direct Booking Discount
                      </span>
                      <span className="bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Active Deal
                      </span>
                    </div>
                    <p className="text-slate-200 text-xs sm:text-sm font-light leading-snug mt-0.5">
                      Get an instant <strong className="text-amber-300 font-bold">10% OFF</strong> when booking directly. Best rate guarantee & no hidden charges.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    trackMetaEvent("InitiateCheckout", {
                      content_category: "hotel_booking",
                      entry_point: "hero_discount_card",
                    });
                    setIsBookingModalOpen(true);
                  }}
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-white bg-[#FB6C01] hover:bg-[#e05a00] px-3.5 py-2 rounded-xl transition-all shadow-md flex-shrink-0"
                >
                  Claim 10% Off &rarr;
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-1">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    trackMetaEvent("InitiateCheckout", {
                      content_category: "hotel_booking",
                      entry_point: "home_hero",
                    });
                    setIsBookingModalOpen(true);
                    setIsModalOpen(false);
                  }}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#FB6C01] to-amber-500 hover:from-amber-600 hover:to-[#FB6C01] text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Direct & Save 10%</span>
                </button>

                <a
                  href="/rooms"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#01366E] border-2 border-white/70 hover:border-white font-semibold text-base sm:text-lg backdrop-blur-md transition-all duration-300 transform hover:scale-105"
                >
                  <span>Explore Our Rooms</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-200/90 font-medium pt-2 pl-2 flex items-center gap-1.5">
                <span>✨</span>
                <span>Direct booking benefit automatically applied • Instant confirmation</span>
              </p>
            </div>

            {/* Trust Line */}
            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-200 font-medium">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#FB6C01]" />
                <span>Central Thamel Location</span>
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-[#FB6C01]" />
                <span>Comfortable Rooms</span>
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <span className="text-base leading-none">🪷</span>
                <span>Peaceful Stay</span>
              </span>
            </div>
            {/* Mobile Social Links */}
            <div className="flex items-center gap-3 md:hidden pt-2">
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
                    className="w-9 h-9 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-4 h-4 text-white hover:text-amber-300 transition-colors duration-300" />
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
