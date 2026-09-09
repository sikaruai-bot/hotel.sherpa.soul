import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BookingModal from "./HelperComponents/BookingModal";
import { trackMetaEvent } from "./Analytics/pixelEvents";
import LanguageSwitcher from "./HelperComponents/LanguageSwticher";

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
      <motion.div
        className="relative"
        whileHover={{ y: mobile ? 0 : -1 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          to={item.href}
          onClick={onClick}
          className={`relative transition-colors duration-300 font-semibold text-sm lg:text-base ${
            mobile ? "block text-xl py-4 px-6 rounded-lg" : "py-3 px-1"
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
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FB6C01] origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isActive ? 1 : 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          )}
        </Link>
      </motion.div>
    );
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 shadow-sm border-b border-slate-100 transition-all duration-300 z-50 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white/90 backdrop-blur-sm"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0 z-50 py-1"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/" className="flex items-center justify-center">
                <img
                  src="/logo.webp?v=2"
                  alt="Hotel Sherpa Soul - Boutique Stay in Thamel, Kathmandu"
                  className="h-14 sm:h-16 w-auto max-w-[220px] object-contain transition-all duration-300"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex space-x-8">
              {navItems.map((item) => (
                <NavLink key={item.id} item={item} />
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 lg:space-x-3 z-50">
              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Book Now Button */}
              <motion.button
                onClick={handleBookingClick}
                className="hidden sm:flex items-center justify-center bg-[#FB6C01] hover:bg-[#E05A00] text-white px-5 lg:px-6 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm lg:text-base"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {t("nav.quick", "Book Your Stay")}
              </motion.button>

              {/* Mobile Hamburger Menu */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50"
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="w-6 h-0.5 rounded-full transition-colors duration-300 bg-[#01366E]"
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 6 : 0,
                  }}
                />
                <motion.span
                  className="w-6 h-0.5 rounded-full transition-colors duration-300 bg-[#01366E]"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    scale: isMobileMenuOpen ? 0 : 1,
                  }}
                />
                <motion.span
                  className="w-6 h-0.5 rounded-full transition-colors duration-300 bg-[#01366E]"
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -6 : 0,
                  }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed top-20 bottom-0 left-0 right-0 bg-white shadow-lg overflow-y-auto z-50 rounded-t-3xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <nav className="flex flex-col px-4 py-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.id}
                    item={item}
                    mobile
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}

              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
