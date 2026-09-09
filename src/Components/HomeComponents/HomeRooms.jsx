import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RoomCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rooms = [
    {
      id: 101,
      name: t("room.rooms.1.name", "Budget Family Room"),
      occupancy: "3 Adults, 1 Child",
      beds: "1 King Bed (32.5 sq. ft) + 1 Single Bed (19.5 sq. ft)",
      bedShort: "King 32.5 sq.ft + Single 19.5 sq.ft",
      featureHighlight: "1 King + 1 Single Bed • 24/7 Hot Water • Shared Kitchen",
      price: 20,
      currency: "USD",
      image: "/changes_photo/doubleBedRoom.jpeg",
    },
    {
      id: 201,
      name: t("room.rooms.2.name", "Deluxe Room"),
      occupancy: "2 Adults, 1 Child",
      beds: "1 King Bed (32.5 sq. ft)",
      bedShort: "Air Conditioned • King 32.5 sq.ft",
      featureHighlight: "Air Conditioned (AC) • 1 King Bed • 24/7 Hot Water • Shared Kitchen",
      price: 20,
      currency: "USD",
      image: "/changes_photo/singleBedWithSofa.jpeg",
    },
    {
      id: 301,
      name: t("room.rooms.3.name", "Family Room"),
      occupancy: "3 Adults, 1 Child",
      beds: "1 King Bed (32.5 sq. ft) + 1 Single Bed (19.5 sq. ft)",
      bedShort: "Air Conditioned • King + Single",
      featureHighlight: "Air Conditioned (AC) • King + Single Bed • Shared Kitchen",
      price: 30,
      currency: "USD",
      image: "/changes_photo/doubleBed.jpeg",
    },
  ];

  const infiniteRooms = [...rooms, ...rooms, ...rooms];
  const getSlideWidth = () => (isMobile ? 280 : 400);
  const getSlideGap = () => (isMobile ? 16 : 32);

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    if (currentIndex >= rooms.length * 2 || currentIndex < rooms.length) {
      setCurrentIndex(rooms.length);
    }
  }, [currentIndex, rooms.length]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    setCurrentIndex(rooms.length);
  }, [rooms.length]);

  return (
    <div className="min-h-screen bg-white py-8 md:py-16">
      <div className="text-center mb-12">
        <p className="text-xs text-[#FB6C01] uppercase tracking-[0.2em] mb-2 font-semibold">
          {t("room.title1")}
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-[#01366E]">
          {t("room.title2")}
        </h2>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 shadow-md rounded-full flex items-center justify-center text-[#01366E] hover:text-[#FB6C01]"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 shadow-md rounded-full flex items-center justify-center text-[#01366E] hover:text-[#FB6C01]"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        <div className="overflow-hidden mx-8 md:mx-16">
          <motion.div
            className="flex"
            style={{ gap: `${getSlideGap()}px` }}
            animate={{ x: -currentIndex * (getSlideWidth() + getSlideGap()) }}
            transition={
              isTransitioning
                ? { type: "spring", stiffness: 300, damping: 30 }
                : { duration: 0 }
            }
            onAnimationComplete={handleTransitionEnd}
          >
            {infiniteRooms.map((room, index) => (
              <motion.div
                key={`${room.id}-${index}`}
                className="relative flex-shrink-0 group cursor-pointer"
                style={{
                  width: `${getSlideWidth()}px`,
                  height: isMobile ? "400px" : "500px",
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link to={`/room/${room.id}`} className="block w-full h-full">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={room.image}
                      alt={`${room.name} - Hotel Sherpa Soul Kathmandu`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white bg-gradient-to-t from-black/85 via-black/50 to-transparent">
                      <h3 className="text-lg md:text-2xl font-bold mb-1 text-white">
                        {room.name}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-200 font-medium">
                        {room.occupancy} • {room.bedShort}
                      </p>
                    </div>

                    <div className="absolute top-4 right-4 bg-[#01366E]/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white text-xs font-semibold shadow flex items-center gap-1.5">
                      <span className="text-[#FB6C01] font-bold">${room.price} USD</span>
                      <span className="text-slate-200">/ night</span>
                    </div>

                    <AnimatePresence>
                      {!isMobile && hoveredIndex === index && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-[#01366E]/95 via-[#01366E]/70 to-transparent flex flex-col justify-end p-6 text-white"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-sm text-slate-200 mb-2 font-light">
                            {room.featureHighlight || `${room.beds} • 24/7 Hot Water • Shared Kitchen`}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FB6C01]">
                            View Room Details & Rates <ArrowRight className="w-4 h-4" />
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {isMobile && (
            <div className="flex justify-center mt-6 gap-2">
              {rooms.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-[#FB6C01] w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center mt-10 px-4">
        <Link to="/rooms">
          <button className="flex items-center gap-3 justify-between bg-[#01366E] hover:bg-[#072340] text-white px-8 py-3.5 rounded-full font-semibold transition-colors duration-300 shadow-md">
            <span className="text-base">Explore All Rooms & Rates</span>
            <ArrowRight className="w-5 h-5 text-[#FB6C01]" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RoomCarousel;
