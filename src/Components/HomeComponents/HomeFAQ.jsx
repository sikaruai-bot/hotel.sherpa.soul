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
  Clock,
  Car,
  Wifi,
  Utensils,
  Mountain,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeFAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = [
    {
      icon: MapPin,
      question: t(
        "faq.q1",
        "Where is Hotel Sherpa Soul located in Kathmandu?"
      ),
      answer: t(
        "faq.a1",
        "Hotel Sherpa Soul is situated on Thamel Bhagawati Marg 26 in the heart of Thamel, Kathmandu, Nepal. We are within walking distance to famous restaurants, shops, and cultural heritage sites, and approximately 6 km from Tribhuvan International Airport."
      ),
    },
    {
      icon: Clock,
      question: t("faq.q2", "What are the check-in and check-out times?"),
      answer: t(
        "faq.a2",
        "Check-in begins at 14:00 (2:00 PM) and check-out is until 12:00 (12:00 PM). Our front desk is open 24/7, and flexible early check-in or late check-out is available upon request subject to room availability."
      ),
    },
    {
      icon: Car,
      question: t(
        "faq.q3",
        "Do you offer airport pickup and shuttle services?"
      ),
      answer: t(
        "faq.a3",
        "Yes, we provide reliable airport pickup and drop-off transfers between Tribhuvan International Airport (KTM) and the hotel. You can request a transfer during direct booking or by contacting us via WhatsApp at +977-9851068219."
      ),
    },
    {
      icon: Wifi,
      question: t(
        "faq.q4",
        "Is high-speed Wi-Fi available throughout the hotel?"
      ),
      answer: t(
        "faq.a4",
        "Yes, complimentary high-speed fiber-optic Wi-Fi is available in all guest rooms, suites, the rooftop terrace, and common areas, perfect for remote workers and travelers staying connected."
      ),
    },
    {
      icon: Utensils,
      question: t(
        "faq.q5",
        "Is there a kitchen facility for guests to use?"
      ),
      answer: t(
        "faq.a5",
        "Yes, Hotel Sherpa Soul features a clean, fully equipped shared guest kitchen where you can cook your favorite meals, brew fresh Himalayan tea, or prepare snacks anytime during your stay."
      ),
    },
    {
      icon: Mountain,
      question: t(
        "faq.q6",
        "Can you arrange trekking permits and Himalayan tours?"
      ),
      answer: t(
        "faq.a6",
        "Absolutely! Drawing from our authentic Sherpa mountain heritage, our team provides complete travel desk support including Everest, Annapurna, and Langtang trek permits, licensed Sherpa guides, domestic flights, and valley sightseeing."
      ),
    },
    {
      icon: ShieldCheck,
      question: t(
        "faq.q7",
        "Can I securely store my luggage while on a trek?"
      ),
      answer: t(
        "faq.a7",
        "Yes, we offer complimentary secure luggage storage before check-in, after check-out, and for trekkers during their multi-day Himalayan journeys until they return."
      ),
    },
    {
      icon: CreditCard,
      question: t("faq.q8", "What payment methods do you accept?"),
      answer: t(
        "faq.a8",
        "We accept cash (NPR, USD, EUR), credit and debit cards (Visa, MasterCard), Fonepay QR transfers, and direct bank transfers."
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
              "Find answers to common questions about our rooms, location in Thamel, airport pickups, and hospitality services."
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
                transition={{ duration: 0.4, delay: index * 0.05 }}
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
              {t("faq.supportTag", "24/7 Front Desk Assistance")}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">
              {t("faq.helpTitle", "Still have questions about your stay?")}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl">
              {t(
                "faq.helpSubtitle",
                "Our warm Sherpa team is always ready to assist with customized itineraries, special requests, and room bookings."
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
