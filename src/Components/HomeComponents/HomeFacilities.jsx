import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Utensils, CheckCircle2, Coffee, Sparkles } from "lucide-react";

const HomeFacilities = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const facilities = [
    {
      img: "/changes_photo/shared_kitchen.webp",
      objectPosition: "center 30%",
      number: t("facilities.laundry.title", "Shared Self-Kitchen (Long Stay Only)"),
      title: "",
      desc: t(
        "facilities.laundry.desc",
        "Reserved exclusively for registered long-stay guests: induction cooktop, refrigerator, microwave oven, electric kettle, pots, pans, utensils, and dining area."
      ),
      initial: { opacity: 0, x: -60 },
      animate: { opacity: 1, x: 0 },
      delay: 0,
    },
    {
      img: "/changes_photo/frontend_desk.webp",
      objectPosition: "center 20%",
      number: t("facilities.frontdesk.title", "24/7 Front Desk"),
      title: "",
      desc: t(
        "facilities.frontdesk.desc",
        "Friendly assistance for check-ins, trek preparation, permits, transportation, and local Kathmandu advice."
      ),
      initial: { opacity: 0, y: 60 },
      animate: { opacity: 1, y: 0 },
      delay: 0.15,
    },
    {
      img: "/airportpickup.webp",
      number: t("facilities.pickup.title", "Airport Transfers"),
      title: "",
      desc: t(
        "facilities.pickup.desc",
        "Convenient airport pickup and drop-off available (~20 minutes from Tribhuvan International Airport depending on traffic)."
      ),
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 },
      delay: 0.3,
    },
    {
      img: "/changes_photo/washRoom.webp",
      number: t("facilities.showers.title", "Hot & Cold Showers"),
      title: "",
      desc: t(
        "facilities.showers.desc",
        "Private bathrooms equipped with hot and cold showers, clean towels, practical toiletries, and toothpaste."
      ),
      initial: { opacity: 0, y: 60 },
      animate: { opacity: 1, y: 0 },
      delay: 0.45,
    },
  ];

  const kitchenAmenities = [
    "Induction Cooktop",
    "Refrigerator & Freezer",
    "Microwave Oven",
    "Electric Kettle",
    "Cooking Pots & Pans",
    "Plates, Bowls & Cutlery",
    "Food Prep & Sink Area",
    "Dining / Eating Space",
  ];

  return (
    <div className="bg-stone-50 py-20 px-5" ref={sectionRef}>
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm tracking-widest uppercase text-amber-600 mb-3 font-semibold">
            {t("facilities.title1", "Long Stays & Amenities")}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 tracking-tight">
            {t("facilities.title2", "Shared Self-Kitchen & Hotel Amenities")}
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 relative gap-x-8 gap-y-20 mb-24">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={facility.initial}
              animate={isVisible ? facility.animate : {}}
              transition={{ duration: 0.8, delay: facility.delay }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                <img
                  src={facility.img}
                  alt={`${facility.number} - Hotel Sherpa Soul Amenity`}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: facility.objectPosition || "center" }}
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              </div>

              <div className="max-w-xl bg-[#01366E] text-white flex items-start justify-center flex-col absolute -bottom-10 left-5 right-5 sm:right-auto p-6 rounded-xl shadow-2xl border border-white/10 hover:scale-[1.02] transition-all duration-300">
                <div className="text-xl font-bold mb-2 tracking-wide text-white flex items-center gap-2">
                  <span className="text-[#FB6C01]">❖</span>
                  <span>{facility.number}</span>
                </div>
                <div className="text-slate-200 leading-relaxed text-sm">
                  {facility.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight Banner: Shared Self-Kitchen for Longer Stays */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#01366E] via-[#082844] to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden mt-12 border border-white/10"
        >
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 text-orange-300 text-xs uppercase tracking-wider font-semibold mb-4 border border-orange-400/30">
              <Sparkles className="w-3.5 h-3.5 text-[#FB6C01]" />
              Shared Self-Kitchen • Exclusively for Long Stays
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
              Feel at Home, Even When You're Away
            </h3>
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed mb-8">
              Staying in Kathmandu for a few days is one thing. Staying for a few weeks is different.
              Our shared self-use kitchen is reserved exclusively for registered long-stay guests (weekly and monthly stays),
              giving them the flexibility to prepare simple home meals, brew fresh tea, work remotely, and enjoy a comfortable routine in Thamel.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-700/60">
              {kitchenAmenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-stone-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeFacilities;
