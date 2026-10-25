import React, { useEffect, useState, useMemo, useCallback, lazy, Suspense } from "react";
import {
  ArrowRight,
  X,
  Facebook,
  Calendar,
  MapPin,
  Bed,
} from "lucide-react";

import { useTranslation } from "react-i18next";
const BookingModal = lazy(() => import("../HelperComponents/BookingModal"));
import { trackMetaEvent } from "../Analytics/pixelEvents";

// Lightweight inline SVGs replace react-icons/fa to keep hero bundle minimal
const FaTiktok = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.88a8.21 8.21 0 004.79 1.54V7.01a4.85 4.85 0 01-1.02-.32z"/>
  </svg>
);
const FaWhatsapp = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const FaYoutube = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
import { useCMS } from "../../Context/CMSContext";
import { rooms as defaultRooms } from "../HelperComponents/RoomsData";
import { HOTEL_PRESET_PHOTOS } from "../CMS/mediaUtils";

export default function HomeIntro() {
  const { t, i18n } = useTranslation();
  const { content: cmsContent, sitePhotos, rooms: cmsRooms, media } = useCMS();
  const heroData = cmsContent?.hero || {};

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Dynamically resolve hero slideshow images based on LIVE CMS updates:
  // 1. User's designated hero photo (or Deluxe Room photo)
  // 2. Family Room photo from CMS
  // 3. Budget Family Room photo from CMS
  // 4. Any additional clean images from the user's Gallery
  const heroSlides = useMemo(() => {
    const budgetRoom = cmsRooms?.find((r) => r.id === "budget-family-room" || r.slug?.includes("budget") || r.id === 101 || String(r.roomNumber) === "203" || String(r.roomNumber) === "303") || defaultRooms.find((r) => r.slug === "budget-family-room");
    const deluxeRoom = cmsRooms?.find((r) => r.id === "deluxe-room" || r.slug?.includes("deluxe") || r.id === 201 || String(r.roomNumber) === "201" || String(r.roomNumber) === "301") || defaultRooms.find((r) => r.slug === "deluxe-room");
    const familyRoom = cmsRooms?.find((r) => r.id === "family-room" || (r.slug?.includes("family") && !r.slug?.includes("budget")) || r.id === 302 || String(r.roomNumber) === "202" || String(r.roomNumber) === "302") || defaultRooms.find((r) => r.slug === "family-room");

    const getImg = (room, siteKey, fallback) => {
      const roomImg = Array.isArray(room?.image) ? room.image[0] : room?.image;
      if (roomImg && typeof roomImg === "string" && roomImg.trim()) return roomImg;
      if (sitePhotos?.[siteKey]) return sitePhotos[siteKey];
      return fallback;
    };

    const deluxeImg = sitePhotos?.homeHero || getImg(deluxeRoom, "roomCard_deluxe", "/hero/hero_deluxe_room.webp");
    const familyImg = getImg(familyRoom, "roomCard_family", "/changes_photo/doubleBed.webp");
    const budgetImg = getImg(budgetRoom, "roomCard_budget", "/triple.webp");

    const slidesList = [
      { label: "Deluxe Room", path: deluxeImg },
      { label: "Family Room", path: familyImg },
      { label: "Budget Family Room", path: budgetImg },
    ];

    // Optionally include up to 2 extra user gallery photos if available
    if (Array.isArray(media?.gallery)) {
      media.gallery
        .filter((g) => g.type !== "video" && g.src && !slidesList.some((s) => s.path === g.src))
        .slice(0, 2)
        .forEach((g) => {
          slidesList.push({ label: g.title || "Hotel Sherpa Soul", path: g.src });
        });
    }

    return slidesList.map((photo) => ({
      image: photo.path,
      subtitle: heroData.subtitle || t("home.hero.subtitle"),
    }));
  }, [cmsRooms, sitePhotos, media?.gallery, heroData.subtitle, t]);

  const socialLinks = useMemo(() => [
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
      href: "https://wa.me/9779818259472?text=Hi%20Hotel%20Sherpa%20Soul%2C%20I%20would%20like%20to%20check%20room%20availability.",
      label: "WhatsApp",
      colorClass: "text-[#25D366]",
    },
  ], []);


  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, heroSlides.length]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    setIsPlaying(false);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsPlaying(true);
  }, []);

  const isArabic = i18n.language.toLowerCase() === "ar" || i18n.language.toLowerCase() === "he";

  return (
    <div
      className={`relative ${isArabic ? "direction-rtl" : "direction-ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <section className="w-full h-screen relative overflow-hidden flex">
        {/* Background Image Slideshow */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out will-change-[opacity] ${index === currentSlide
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
                }`}
            >
              {index === 0 && slide.image === "/hero/hero_deluxe_room.webp" ? (
                <picture className="w-full h-full block">
                  <source media="(max-width: 768px)" srcSet="/hero/hero_deluxe_room-mobile.webp" type="image/webp" />
                  <source media="(min-width: 769px)" srcSet="/hero/hero_deluxe_room.webp" type="image/webp" />
                  <img
                    src="/hero/hero_deluxe_room.webp"
                    alt="Hotel Sherpa Soul - Deluxe Boutique Room in Thamel Kathmandu"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    width="1376"
                    height="768"
                  />
                </picture>
              ) : (
                <img
                  src={slide.image}
                  alt={slide.subtitle || "Hotel Sherpa Soul"}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  width="1376"
                  height="768"
                  onError={(e) => {
                    e.currentTarget.src = "/hero/hero_deluxe_room.webp";
                  }}
                />
              )}
              {/* Left-focused gradient overlay to let text shine on the left while keeping the room bright on the right */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Opening Soon Banner */}
        {/* Opening Soon Banner */}

        {/* Vertical Social Media Links */}
        <div
          className={`absolute ${isArabic ? "left-8" : "right-8"
            } bottom-8 z-20 hidden md:block animate-social-slide-in`}
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
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 bg-white backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110 shadow-lg animate-social-link"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                  aria-label={social.label}
                >
                  <IconComponent
                    className={`w-5 h-5 ${social.colorClass || "text-slate-800"} group-hover:scale-110 transition-transform duration-300`}
                  />
                </a>
              );
            })}
          </div>

          {/* Bottom decorative line */}
          <div className="mt-6 h-8 w-px bg-white/40 mx-auto"></div>
        </div>

        {/* Content Panel */}
        <div
          className={`relative z-10 w-full min-h-screen flex items-center px-6 sm:px-12 lg:px-20 pt-28 pb-12 max-w-7xl text-white ${isArabic ? "text-right" : "text-left"
            }`}
        >
          <div className="space-y-5 sm:space-y-6 max-w-2xl">
            <div className="text-xs sm:text-sm uppercase tracking-[0.25em] text-amber-300 font-semibold drop-shadow">
              {t("homeHero.welcome", "WELCOME TO HOTEL SHERPA SOUL • THAMEL, KATHMANDU")}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight text-white drop-shadow-md">
              {t("homeHero.title", "Quiet Boutique & Budget Hotel in Thamel, Kathmandu")}
            </h1>

            <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light drop-shadow">
              {t("homeHero.description", "Your peaceful hotel near Thamel Kathmandu on Bhagawati Marg 26 — spotless quiet rooms, 24/7 hot showers, free trekking luggage storage, shared kitchen, and warm Himalayan hospitality.")}
            </p>

            {/* 2 Clean CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              {/* 1. Check Availability */}
              <a
                href="/rooms"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#01366E] border-2 border-white/80 hover:border-white font-bold text-sm sm:text-base backdrop-blur-md transition-all duration-300 transform hover:scale-105 shadow-lg min-h-[44px]"
              >
                <span>{t("homeHero.checkAvailability", "Check Availability")}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* 2. Book Direct & Save */}
              <button
                onClick={() => {
                  trackMetaEvent("InitiateCheckout", {
                    content_category: "hotel_booking",
                    entry_point: "home_hero_book_direct",
                  });
                  setIsBookingModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FB6C01] to-amber-500 hover:from-amber-600 hover:to-[#FB6C01] text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 min-h-[44px]"
              >
                <Calendar className="w-4 h-4" />
                <span>{t("homeHero.bookDirect", "Book Direct & Save 10%")}</span>
              </button>
            </div>

            {/* Trust Line */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-200 font-medium">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#FB6C01]" />
                <span>{t("homeHero.trust1", "Central Thamel Location")}</span>
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-[#FB6C01]" />
                <span>{t("homeHero.trust2", "Comfortable Rooms")}</span>
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <span className="text-base leading-none">🪷</span>
                <span>{t("homeHero.trust3", "Peaceful Stay")}</span>
              </span>
            </div>
            {/* Mobile Social Links */}
            <div className="flex items-center gap-3 md:hidden pt-2">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 hover:border-white/40 transition-all duration-300 animate-social-link"
                    style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                    aria-label={social.label}
                  >
                    <IconComponent className="w-4 h-4 text-white hover:text-amber-300 transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>
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

      {isBookingModalOpen && (
        <Suspense fallback={null}>
          <BookingModal
            isOpen={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
            selectedLanguage={i18n.language.toUpperCase()}
          />
        </Suspense>
      )}

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
          will-change: transform;
        }

        @keyframes float {
          0%,
          100% {
            transform: translate3d(0, 0px, 0);
          }
          50% {
            transform: translate3d(0, -10px, 0);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes social-slide-in {
          from { opacity: 0; transform: translate3d(30px, 0, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        .animate-social-slide-in {
          animation: social-slide-in 0.8s ease-out 0.5s both;
          will-change: transform, opacity;
        }

        @keyframes social-fade-up {
          from { opacity: 0; transform: translate3d(0, 15px, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        .animate-social-link {
          animation: social-fade-up 0.5s ease-out both;
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}
