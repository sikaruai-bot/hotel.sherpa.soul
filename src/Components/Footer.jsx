import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Mail,
  Phone,
  MapPin,
  QrCode,
  Smartphone,
  ExternalLink,
  Sparkles,
  CalendarCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
import BookingModal from "./HelperComponents/BookingModal";
import { trackMetaEvent } from "./Analytics/pixelEvents";
import hotelLogo from "../assets/logo.webp";

export default function Footer() {
  const { t } = useTranslation();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookingClick = () => {
    trackMetaEvent("InitiateCheckout", {
      content_category: "hotel_booking",
      entry_point: "footer_cta",
    });
    setIsBookingModalOpen(true);
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/1JYojEJGiL/",
      label: "Facebook",
      color: "hover:text-blue-500 hover:bg-blue-500/10",
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@sherpa.soul?_t=ZS-8ytRMKvOf4a&_r=1",
      label: "TikTok",
      color: "hover:text-pink-500 hover:bg-pink-500/10",
    },
    {
      icon: FaYoutube,
      href: "https://www.youtube.com/@HotelSherpaSoul26",
      label: "YouTube",
      color: "hover:text-red-500 hover:bg-red-500/10",
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/9779851068219?text=Hello! I'd like to talk with you.",
      label: "WhatsApp",
      color: "hover:text-green-500 hover:bg-green-500/10",
    },
    {
      icon: Mail,
      href: "mailto:info@hotelsherpasoul.com",
      label: "Email",
      color: "hover:text-red-500 hover:bg-red-500/10",
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: t("footer.contactUs.phone"),
      href: "tel:+9779851068219",
    },
    {
      icon: Mail,
      label: t("footer.contactUs.email"),
      href: "mailto:info@hotelsherpasoul.com",
    },
    {
      icon: MapPin,
      label: t("footer.contactUs.address"),
      href: "https://maps.app.goo.gl/nDB9DnLtb6taeaLRA",
    },
  ];

  const quickLinks = [
    { to: "/", key: "home", defaultLabel: "Home" },
    { to: "/rooms", key: "rooms", defaultLabel: "Rooms" },
    { to: "/about", key: "aboutUs", defaultLabel: "About Us" },
    { to: "/gallery", key: "gallery", defaultLabel: "Gallery" },
    { to: "/blog", key: "blog", defaultLabel: "Blog" },
    { to: "/contact", key: "contact", defaultLabel: "Contact" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans relative overflow-hidden">
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main footer content */}
      <div className="relative px-4 sm:px-6 lg:px-20 pt-12">
        <div className="max-w-7xl mx-auto">
          {/* Section 12: Footer CTA Banner */}
          <div className="relative mb-14 overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 p-8 sm:p-12 shadow-2xl border border-amber-400/30">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-amber-100 text-xs font-bold uppercase tracking-widest mb-3 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  Hotel Sherpa Soul • Thamel, Kathmandu
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                  {t("footer.cta.heading", "Ready to Sleep Well?")}
                </h3>
                <p className="text-amber-100 text-sm sm:text-base leading-relaxed">
                  {t(
                    "footer.cta.copy",
                    "Stay in the heart of Thamel and make Hotel Sherpa Soul your comfortable base for Kathmandu and your journey through Nepal."
                  )}
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={handleBookingClick}
                  className="px-8 py-4 bg-white text-slate-900 hover:bg-amber-50 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 text-base sm:text-lg flex items-center gap-2"
                >
                  <CalendarCheck className="w-5 h-5 text-amber-600" />
                  <span>{t("footer.cta.button", "Book Your Stay")}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4 Column Layout on large screens, 1 column on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Column 1: Brand & Description (Section 13) */}
            <div className="space-y-6">
              {/* Logo and Brand */}
              <div className="flex items-center gap-4 mb-6">
                <Link to="/" className="inline-block">
                  <img
                    src={hotelLogo}
                    alt="Hotel Sherpa Soul Kathmandu"
                    className="h-16 w-auto max-w-[200px] object-contain bg-white/95 px-3 py-1.5 rounded-xl shadow-md"
                  />
                </Link>
                <div>
                  <p className="text-xl font-bold text-white mb-1">
                    {t("footer.brand.title", "Hotel Sherpa Soul")}
                  </p>
                  <p className="text-[#FB6C01] text-xs font-semibold tracking-wide">
                    {t("footer.brand.tagline", "No Restaurant. No Noise. Sleep Well.")}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed text-sm">
                {t(
                  "footer.brand.description",
                  "Hotel Sherpa Soul is a peaceful and comfortable hotel in Thamel, Kathmandu, created for travelers looking for a convenient location, comfortable rooms and a good night's sleep."
                )}
              </p>

              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-[#FB6C01] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-4 h-px bg-[#FB6C01]"></span>
                  {t("footer.followUs.title")}
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target={
                        social.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        social.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={`p-2.5 bg-slate-800/50 backdrop-blur-sm rounded-lg transition-all duration-300 transform hover:scale-110 hover:translate-y-[-1px] border border-slate-700/50 ${social.color} group`}
                      aria-label={social.label}
                    >
                      <social.icon
                        size={18}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-[#FB6C01] to-transparent rounded-full"></span>
                {t("footer.quickLinks.title")}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.key}>
                    <Link
                      to={link.to}
                      className="text-gray-300 hover:text-[#FB6C01] transition-all duration-300 flex items-center group py-1 text-sm"
                    >
                      <span className="w-0 h-px bg-[#FB6C01] mr-0 group-hover:w-3 group-hover:mr-3 transition-all duration-300 rounded-full"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {t(`footer.quickLinks.links.${link.key}`, link.defaultLabel)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-[#FB6C01] to-transparent rounded-full"></span>
                {t("footer.contactUs.title")}
              </h3>
              <ul className="space-y-4">
                {contactInfo.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors duration-300 group"
                  >
                    <div className="p-2 bg-gradient-to-br from-[#FB6C01]/20 to-[#FB6C01]/10 rounded-lg group-hover:from-[#FB6C01] group-hover:to-[#8B7355] transition-all duration-300 border border-[#FB6C01]/20 mt-0.5 flex-shrink-0">
                      <item.icon
                        size={16}
                        className="text-[#FB6C01] group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="hover:underline text-sm font-medium break-words"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-sm font-medium break-words">
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Online Booking Platforms */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-[#FB6C01] to-transparent rounded-full"></span>
                Book on Top OTAs
              </h3>

              <div className="space-y-4">
                {/* QR Code Container */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 p-5 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                  <div className="text-center space-y-3">
                    {/* Clickable QR Code */}
                    <a
                      href="https://www.booking.com/hotel/np/hotel-sherpa-soul.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open Hotel Sherpa Soul on Booking.com"
                      className="block w-28 h-28 mx-auto bg-white rounded-lg p-2 shadow-lg hover:scale-105 transition-transform duration-200"
                    >
                      <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-700 rounded flex items-center justify-center">
                        <img
                          src="/qr.webp"
                          alt="Booking.com QR Code - Scan to Book Hotel Sherpa Soul"
                          width="96"
                          height="96"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </a>

                    {/* Direct OTA Action Buttons */}
                    <div className="space-y-2 pt-1">
                      <a
                        href="https://www.booking.com/hotel/np/hotel-sherpa-soul.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-medium transition-all duration-200"
                      >
                        <Smartphone size={13} />
                        <span>Book on Booking.com</span>
                        <ExternalLink size={11} className="opacity-70" />
                      </a>
                      <a
                        href="https://www.airbnb.com/rooms/1760024961976448522"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-medium transition-all duration-200"
                      >
                        <span>Book on Airbnb</span>
                        <ExternalLink size={11} className="opacity-70" />
                      </a>
                      <a
                        href="https://www.trip.com/hotels/list?keyword=Hotel%20Sherpa%20Soul%20Kathmandu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-sky-600/20 hover:bg-sky-600 text-sky-300 hover:text-white border border-sky-500/30 text-xs font-medium transition-all duration-200"
                      >
                        <span>Book on Trip.com</span>
                        <ExternalLink size={11} className="opacity-70" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom section */}
      <div className="relative border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="px-4 sm:px-6 lg:px-20 py-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-2 text-center md:text-left">
              <span className="w-2 h-2 bg-[#FB6C01] rounded-full hidden sm:block"></span>
              {t("footer.copyright.prefix")} {new Date().getFullYear()}{" "}
              <span className="text-[#FB6C01] font-semibold">
                {t("footer.copyright.hotelName")}
              </span>
              . {t("footer.copyright.suffix")}
            </div>

            {/* Enhanced legal links */}
            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 items-center">
              <Link
                to="/privacy"
                className="hover:text-[#FB6C01] transition-colors duration-300 relative group"
              >
                {t("footer.legal.privacy", "Privacy Policy")}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#FB6C01] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/terms"
                className="hover:text-[#FB6C01] transition-colors duration-300 relative group"
              >
                {t("footer.legal.terms", "Terms of Service")}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#FB6C01] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
                  }
                }}
                className="hover:text-[#FB6C01] transition-colors duration-300 relative group text-left cursor-pointer"
              >
                Cookie Preferences
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#FB6C01] group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
