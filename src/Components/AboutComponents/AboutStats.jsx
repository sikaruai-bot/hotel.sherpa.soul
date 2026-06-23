import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  Heart,
  Star,
  Users,
  Bed,
  Coffee,
  Wifi,
  MapPin,
  LocateIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

/**u
 * Brand palette (from the logo):
 *  - Blue:   #2CACE2 (primary) / #50B8E6 (hover accent)
 *  - Orange: #F79724 (primary)
 * Neutrals:  white / gray-800/700 for text only
 */
const BRAND_BLUE = "#2CACE2";
const BRAND_BLUE_HOVER = "#50B8E6";
const BRAND_ORANGE = "#F79724";

export default function AboutStats() {
  const reduceMotion = useReducedMotion();
  const { t } = useTranslation();

  const stats = [
    { number: "15+", label: t("aboutstats.stat.1"), icon: Award },
    { number: "500+", label: t("aboutstats.stat.2"), icon: Users },
    { number: "24/7", label: t("aboutstats.stat.3"), icon: Heart },
    { number: "4.8★", label: t("aboutstats.stat.4"), icon: Star },
  ];

  const features = [
    { icon: Bed, text: t("aboutstats.amenities.1") },
    { icon: LocateIcon, text: t("aboutstats.amenities.3") },
    { icon: Wifi, text: t("aboutstats.amenities.2") },
    { icon: MapPin, text: t("aboutstats.amenities.4") },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left Content */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="space-y-4">
              <motion.h2
                variants={fadeInUp}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              >
                {t("aboutstats.title1")}{" "}
                <span style={{ color: BRAND_BLUE }}>
                  {t("aboutstats.title2")}
                </span>
              </motion.h2>
            </div>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-700 leading-relaxed text-justify"
            >
              {t("aboutstats.para1")}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 leading-relaxed text-justify"
            >
              {t("aboutstats.para2")}
            </motion.p>

            {/* Features */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4 pt-4"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white shadow-sm border border-gray-100"
                  >
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: `${BRAND_BLUE}15` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: BRAND_BLUE }} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {feature.text}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Side - Image & Stats */}
          <motion.div variants={fadeInUp} className="space-y-8">
            {/* Image Placeholder */}
            <div className="relative">
              <motion.div
                variants={fadeInUp}
                className=" rounded-2xl overflow-hidden shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${BRAND_BLUE}22, ${BRAND_ORANGE}22)`,
                }}
              >
                <img
                  src="changes_photo/feature.jpeg"
                  alt=""
                  className="object-contain rounded-2xl"
                />
              </motion.div>
            </div>

            {/* Stats Row */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-4 gap-4"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={{
                      y: reduceMotion ? 0 : -2,
                      scale: reduceMotion ? 1 : 1.05,
                    }}
                    className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                    style={{
                      borderTop: `3px solid ${
                        index % 2 === 0 ? BRAND_BLUE : BRAND_ORANGE
                      }`,
                    }}
                  >
                    <Icon
                      className="w-6 h-6 mx-auto mb-2"
                      style={{
                        color: index % 2 === 0 ? BRAND_BLUE : BRAND_ORANGE,
                      }}
                    />
                    <div className="text-xl font-bold text-gray-900 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
