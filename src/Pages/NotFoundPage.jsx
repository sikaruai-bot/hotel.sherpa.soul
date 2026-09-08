import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Compass,
  Home,
  Bed,
  Phone,
  Image as ImageIcon,
  BookOpen,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 - Page Not Found | Hotel Sherpa Soul Kathmandu";
    window.scrollTo(0, 0);
  }, []);

  const quickLinks = [
    {
      title: t("notFound.roomsBtn", "Rooms & Suites"),
      description: "Comfortable deluxe rooms with mountain views",
      href: "/rooms",
      icon: Bed,
      color: "from-amber-500/10 to-orange-500/10 text-amber-700",
    },
    {
      title: t("notFound.galleryLink", "Photo Gallery"),
      description: "Explore our hotel, rooms, and terrace views",
      href: "/gallery",
      icon: ImageIcon,
      color: "from-blue-500/10 to-indigo-500/10 text-blue-700",
    },
    {
      title: t("notFound.aboutLink", "Our Story"),
      description: "Learn about authentic Sherpa hospitality",
      href: "/about",
      icon: BookOpen,
      color: "from-emerald-500/10 to-teal-500/10 text-emerald-700",
    },
    {
      title: t("notFound.contactBtn", "Front Desk & Location"),
      description: "24/7 assistance in Thamel, Kathmandu",
      href: "/contact",
      icon: Phone,
      color: "from-purple-500/10 to-pink-500/10 text-purple-700",
    },
  ];

  return (
    <main className="min-h-[85vh] bg-gradient-to-b from-slate-50 via-amber-50/30 to-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl w-full text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 border border-amber-300/60 text-amber-800 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 shadow-sm"
        >
          <Compass className="w-4 h-4 text-amber-700" />
          <span>{t("notFound.badge", "Error 404 • Lost in the Himalayas")}</span>
        </motion.div>

        {/* Large 404 Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-6"
        >
          <span className="text-8xl sm:text-9xl md:text-[12rem] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-[#AB8865] to-slate-700 select-none drop-shadow-sm leading-none">
            404
          </span>
          <div className="mt-2 flex justify-center">
            <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-200 text-xs font-medium text-gray-700 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Hotel Sherpa Soul, Thamel
            </span>
          </div>
        </motion.div>

        {/* Main Headings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 max-w-2xl mx-auto mb-10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            {t("notFound.title", "Lost on the Mountain Trail?")}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {t(
              "notFound.subtitle",
              "The page or trail you are looking for does not exist or has been moved. Let our Sherpa hospitality guide you back to comfort."
            )}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-600 to-[#AB8865] text-white font-medium text-sm sm:text-base shadow-lg shadow-amber-900/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Home className="w-5 h-5" />
            {t("notFound.homeBtn", "Return to Home")}
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-gray-200 text-gray-700 font-medium text-sm sm:text-base shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("notFound.backBtn", "Go Back")}</span>
          </button>
        </motion.div>

        {/* Suggested Quick Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-left"
        >
          <h2 className="text-center text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6">
            {t("notFound.popularLinks", "Popular Destinations at Hotel Sherpa Soul")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  to={item.href}
                  className="group relative p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-base group-hover:text-amber-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
