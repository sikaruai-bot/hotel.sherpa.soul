import React, { useState, useRef, useEffect, lazy, Suspense } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { trackMetaEvent } from "./Analytics/pixelEvents";
import LanguageSwitcher from "./HelperComponents/LanguageSwticher";
import hotelLogo from "../assets/logo2.webp";

// Lazy-load BookingModal so framer-motion (which it uses) stays out of the
// critical-path bundle. The modal chunk is fetched only on first booking click.
const BookingModal = lazy(() => import("./HelperComponents/BookingModal"));

// Replaced framer-motion with CSS transitions in Navbar.
// framer-motion is still used in pages/modals that are lazily loaded
// (BookingModal, FullGallery, BlogPage, AboutPage, RoomsPage etc.).
// Removing it from the Navbar eliminates it from the critical-path JS bundle.

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { t } = useTranslation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: "home", label: t("nav.home", "Home"), href: "/" },
    { id: "room", label: t("nav.room", "Rooms"), href: "/rooms" },
    { id: "about", label: t("nav.about", "About Us"), href: "/about" },
    { id: "gallery", label: t("nav.gallery", "Gallery"), href: "/gallery" },
    { id: "location", label: t("nav.location", "Location"), href: "/#location" },
    { id: "blog", label: t("nav.blog", "Blog"), href: "/blog" },
    { id: "contact", label: t("nav.contact", "Contact"), href: "/contact" },
    { id: "guest-guide", label: t("nav.guestGuide", "Guest Guide"), href: "/guest-guide" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const handleBookingClick = () => {
    trackMetaEvent("InitiateCheckout", {
      content_category: "hotel_booking",
      entry_point: "navigation",
    });
    setIsBookingModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const NavLink = ({ item, mobile = false, onClick }) => {
    const isActive = currentPath === item.href;
    return (
      <div className="relative group/navlink">
        <Link
          to={item.href}
          onClick={onClick}
          className={`relative transition-colors duration-300 font-semibold text-sm lg:text-base ${
            mobile ? "flex items-center text-xl py-3.5 px-6 rounded-lg min-h-[44px]" : "py-3 px-1"
          } ${
            isActive
              ? "text-[#FB6C01]"
              : mobile
              ? "text-[#01366E] hover:text-[#FB6C01] hover:bg-orange-50"
              : "text-[#01366E] hover:text-[#FB6C01]"
          }`}
        >
          {item.label}
          {!mobile && (
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#FB6C01] origin-left transition-transform duration-300 ease-in-out ${
                isActive ? "scale-x-100" : "scale-x-0 group-hover/navlink:scale-x-100"
              }`}
            />
          )}
        </Link>
      </div>
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 shadow-sm border-b border-slate-100 transition-[background-color,box-shadow,backdrop-filter] duration-300 z-50 translate-y-0 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white/90 backdrop-blur-sm"
        }`}
        style={{ animation: "navSlideDown 0.6s ease-out both", willChange: "transform, opacity" }}
      >
        {/* Top 10% Discount Announcement Ribbon */}
        <div className="bg-gradient-to-r from-[#01366E] via-[#0A2540] to-[#01366E] text-white py-1.5 px-3 sm:px-6 border-b border-amber-400/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 mx-auto sm:mx-0 text-center sm:text-left">
              <span className="bg-[#FB6C01] text-white font-black text-[10px] sm:text-xs px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                {t("nav.ribbonBadge", "10% OFF")}
              </span>
              <span className="font-medium text-slate-100 text-xs sm:text-sm">
                {t("nav.ribbonSpecial", "Direct Booking Special: Get")}{" "}
                <strong className="text-amber-300 font-bold">{t("nav.ribbonDiscount", "10% Discount")}</strong>{" "}
                {t("nav.ribbonOnAll", "on all rooms!")}
              </span>
              <span className="hidden md:inline text-white/40">{t("nav.ribbonBestRate", "• Book Direct & Save 10%")}</span>
            </div>
            <button
              onClick={handleBookingClick}
              className="hidden sm:inline-flex items-center gap-1 font-bold text-amber-300 hover:text-white transition-colors underline underline-offset-4 text-xs"
            >
              {t("nav.ribbonClaim", "Claim 10% Off →")}
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 z-50 py-1 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]">
              <Link to="/" className="flex items-center justify-center">
                <img
                  src={hotelLogo}
                  alt="Hotel Sherpa Soul - Boutique Stay in Thamel, Kathmandu"
                  className="h-14 sm:h-16 w-auto max-w-[220px] object-contain transition-all duration-300"
                  width="200"
                  height="60"
                  loading="eager"
                  decoding="async"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex space-x-5 xl:space-x-7">
              {navItems.map((item) => (
                <NavLink key={item.id} item={item} />
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 lg:space-x-3 z-50">
              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Book Now Button */}
              <button
                onClick={handleBookingClick}
                className="hidden sm:flex items-center justify-center bg-[#FB6C01] hover:bg-[#E05A00] text-white px-5 lg:px-6 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm lg:text-base hover:scale-[1.04] active:scale-[0.96]"
              >
                {t("nav.quick", "Book Your Stay")}
              </button>

              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex flex-col justify-center items-center w-11 h-11 min-w-[44px] min-h-[44px] p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/90 hover:bg-slate-100 space-y-1.5 z-50 focus:outline-none focus:ring-2 focus:ring-[#01366E] active:scale-95 transition-transform"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <span
                  className={`w-6 h-0.5 rounded-full bg-[#01366E] transition-transform duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-[6px]" : ""
                  }`}
                />
                <span
                  className={`w-6 h-0.5 rounded-full bg-[#01366E] transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`w-6 h-0.5 rounded-full bg-[#01366E] transition-transform duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay — CSS transition replaces framer-motion AnimatePresence */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          style={{ animation: "fadeIn 0.3s ease both" }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-28 bottom-0 left-0 right-0 bg-white shadow-2xl overflow-y-auto z-50 rounded-t-3xl border-t border-slate-200/80 pb-8 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          isMobileMenuOpen ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Mobile Menu 10% Discount Banner */}
        <div className="mx-4 mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#01366E] to-[#0A2540] text-white border border-amber-400/40 shadow-lg">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-[#FB6C01] text-white font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {t("nav.ribbonBadge", "10% OFF")}
            </span>
            <span className="font-bold text-sm text-amber-300">{t("nav.mobileSpecial", "Direct Booking Special")}</span>
          </div>
          <p className="text-xs text-slate-200 mb-3 leading-relaxed">
            {t("nav.mobileDiscountDesc", "Book direct on our website & save 10% on your entire stay in Thamel.")}
          </p>
          <button
            onClick={handleBookingClick}
            className="w-full py-3 px-4 min-h-[44px] bg-gradient-to-r from-[#FB6C01] to-amber-500 hover:from-[#E05A00] hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <span>{t("nav.mobileBookBtn", "Book with 10% Discount")}</span>
            <span>&rarr;</span>
          </button>
        </div>

        <nav className="flex flex-col px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              mobile
              onClick={() => setIsMobileMenuOpen(false)}
            />
          ))}
        </nav>
      </div>

      {/* BookingModal is lazy-loaded — only fetched on first booking click */}
      {isBookingModalOpen && (
        <Suspense fallback={null}>
          <BookingModal
            isOpen={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
          />
        </Suspense>
      )}

      <style>{`
        @keyframes navSlideDown {
          from { transform: translate3d(0, -100%, 0); opacity: 0; }
          to   { transform: translate3d(0, 0, 0);     opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </>
  );
}
