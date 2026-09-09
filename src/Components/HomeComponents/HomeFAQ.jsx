import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Phone,
  Sparkles,
  MapPin,
  BedDouble,
  Utensils,
  Car,
  Wind,
  Wifi,
  Coffee,
  Users,
  Plane,
  Landmark,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeFAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = [
    {
      icon: MapPin,
      question: t("faq.q1", "Where is Hotel Sherpa Soul located?"),
      answer: t(
        "faq.a1",
        "Hotel Sherpa Soul is located in Thamel, Kathmandu, Nepal, a popular area for travellers and visitors to Kathmandu."
      ),
    },
    {
      icon: BedDouble,
      question: t("faq.q2", "What room types are available?"),
      answer: t(
        "faq.a2",
        "Hotel Sherpa Soul offers three room categories: (A) Budget Family Room (3 adults, 1 child; King 32.5 sq. ft + Single 19.5 sq. ft; $20 USD/night), (B) Deluxe Room (2 adults, 1 child; King 32.5 sq. ft; $20 USD/night), and (C) Family Room (3 adults, 1 child; King 32.5 sq. ft + Single 19.5 sq. ft; $30 USD/night)."
      ),
    },
    {
      icon: Utensils,
      question: t("faq.q3", "Is Hotel Sherpa Soul a hotel with a restaurant?"),
      answer: t(
        "faq.a3",
        "No. Hotel Sherpa Soul does not operate a restaurant. Our focus is on comfortable accommodation and a peaceful environment for our guests."
      ),
    },
    {
      icon: Car,
      question: t("faq.q4", "Do you have private parking?"),
      answer: t(
        "faq.a4",
        "Private parking is not available at the hotel. Guests who need parking should contact the hotel before arrival for information about nearby options."
      ),
    },
    {
      icon: Wind,
      question: t("faq.q5", "Do the rooms have air conditioning?"),
      answer: t(
        "faq.a5",
        "Air conditioning is available as a room facility where specified. Guests should check the selected room category for exact facilities."
      ),
    },
    {
      icon: Wifi,
      question: t("faq.q6", "Do you provide Wi-Fi?"),
      answer: t(
        "faq.a6",
        "Yes, Wi-Fi is provided for guests to stay connected during their visit."
      ),
    },
    {
      icon: Coffee,
      question: t("faq.q7", "Does the hotel have a shared kitchen?"),
      answer: t(
        "faq.a7",
        "Yes, Hotel Sherpa Soul provides a shared self-use kitchen reserved strictly for registered long-stay guests (weekly and monthly stays). Short single-night stays do not have kitchen access."
      ),
    },
    {
      icon: Users,
      question: t("faq.q8", "Who can use the shared kitchen?"),
      answer: t(
        "faq.a8",
        "The shared kitchen is reserved exclusively for registered long-stay guests. House rules and prior registration apply to ensure a clean, orderly environment for all."
      ),
    },
    {
      icon: Plane,
      question: t("faq.q9", "How far is Kathmandu Airport?"),
      answer: t(
        "faq.a9",
        "The hotel is approximately 20 minutes from Tribhuvan International Airport by vehicle, depending on traffic."
      ),
    },
    {
      icon: Landmark,
      question: t("faq.q10", "How far is Pashupatinath Temple?"),
      answer: t(
        "faq.a10",
        "Pashupatinath Temple is approximately 15 minutes away by vehicle, depending on traffic."
      ),
    },
    {
      icon: Sparkles,
      question: t("faq.q11", "How far is Boudhanath Stupa?"),
      answer: t(
        "faq.a11",
        "Boudhanath Stupa is approximately 20 minutes away by vehicle, depending on traffic."
      ),
    },
    {
      icon: CheckCircle2,
      question: t("faq.q12", "How can I book a room?"),
      answer: t(
        "faq.a12",
        "You can book directly through our website or contact the hotel directly via WhatsApp or phone to check availability."
      ),
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-amber-50/20 relative overflow-hidden">
      {/* Background Subtle Highlights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/70 border border-amber-300/60 text-amber-800 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>{t("faq.badge", "Frequently Asked Questions")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4"
          >
            {t("faq.title", "Everything You Need to Know")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 leading-relaxed"
          >
            {t(
              "faq.subtitle",
              "Clear, practical answers about our rooms, quiet atmosphere, shared kitchen, and Thamel location."
            )}
          </motion.p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-16">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? "bg-white border-amber-300 shadow-md ring-2 ring-amber-100/50"
                    : "bg-white/80 border-gray-200 hover:border-amber-200 shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 ${
                        isOpen
                          ? "bg-amber-600 text-white shadow-sm"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-gray-900 text-base sm:text-lg">
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-amber-100 text-amber-800 rotate-180"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed text-sm sm:text-base border-t border-gray-100 ml-14">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still Have Questions Contact Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#2A2D34] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {t("faq.supportTag", "Friendly Front Desk Support")}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">
              {t("faq.helpTitle", "Have a question before booking?")}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl">
              {t(
                "faq.helpSubtitle",
                "We are happy to help you choose the right room and plan your stay in Kathmandu."
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="https://wa.me/9779851068219?text=Hello%20Hotel%20Sherpa%20Soul!%20I%20have%20a%20question%20about%20my%20stay."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium shadow-md transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-white text-sm font-medium shadow-md transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              Contact Page
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
