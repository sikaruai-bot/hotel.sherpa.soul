// HomeServices.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Tv2,
  Wifi,
  ShowerHead,
  Utensils,
  BedDouble,
  Briefcase,
  Currency,
  DollarSign,
  Lock,
  Car,
  Bed,
  Bus,
  WashingMachine,
  Hourglass,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

export default function HomeServices() {
  const { t } = useTranslation();

  const services = t("homeServices.services", { returnObjects: true });

  const icons = [
    <BedDouble key="bed" className="w-8 h-8 text-[#8B4513]" />,
    <Wifi key="wifi" className="w-8 h-8 text-[#8B4513]" />,
    <Bed key="Bed" className="w-8 h-8 text-[#8B4513]" />,
    <WashingMachine key="WashingMachine" className="w-8 h-8 text-[#8B4513]" />,
    <ShowerHead key="shower" className="w-8 h-8 text-[#8B4513]" />,
    <Car key="Car" className="w-8 h-8 text-[#8B4513]" />,
    <Bus key="DollarSign" className="w-8 h-8 text-[#8B4513]" />,
    <Clock key="Clock" className="w-8 h-8 text-[#8B4513]" />,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="min-h-screen bg-[#fff5ed] py-16"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.2em] text-amber-600 uppercase mb-4 font-light">
            {t("homeServices.sectionTag")}
          </p>
          <h2 className="text-5xl font-light text-gray-900 tracking-wide">
            {t("homeServices.sectionTitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Side with Image */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-red-100 rounded-2xl md:rounded-r-full h-[75vh] overflow-hidden flex items-center justify-center"
          >
            <img
              src="/intro5.webp"
              alt={`${t("homeServices.sectionTag")} - Hotel Sherpa Soul Hospitality Services`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Right Side with Icons and Features */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-0 md:mt-16 px-4 md:pr-12"
          >
            <div className="flex items-start flex-col mb-6">
              <div className="text-2xl font-extrabold mb-2">
                {t("homeServices.intro.title")}
              </div>
              <div className="max-w-xl">{t("homeServices.intro.desc")}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div>{icons[index]}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#1a1a1a]">
                      {service.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
