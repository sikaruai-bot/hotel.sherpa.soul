import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Users, Bed, Wifi, Car, Coffee, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../Utils/api";
import { rooms as fallbackRooms } from "./RoomsData";
import { useTranslation } from "react-i18next";

const BookingModal = ({ isOpen, onClose, selectedLanguage = "EN" }) => {
  const { t } = useTranslation();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch rooms when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchRooms();
    }
  }, [isOpen]);

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      // Strictly show the 3 room categories:
      // 1. Budget Family Room
      // 2. Deluxe Room
      // 3. Family Room
      const categories = fallbackRooms.map((r) => {
        const rawImg = Array.isArray(r.image) ? r.image[0] : r.image;
        const cleanedImg = typeof rawImg === "string" ? rawImg.replace(/\.jpeg$/i, ".webp") : rawImg;
        return {
          ...r,
          id: r.id,
          name: r.name, // Clean category name (no Room 101/201 etc.)
          Noroom: 2,
          image: cleanedImg,
        };
      });

      try {
        const response = await api.get("/rooms");
        const apiRooms = response?.data?.data || response?.data?.room || [];
        if (Array.isArray(apiRooms) && apiRooms.length > 0) {
          // If PMS provides dynamic rates, optionally match to category
          const updatedCategories = categories.map((cat) => {
            const pmsMatch = apiRooms.find(
              (r) =>
                r.type === cat.type ||
                r.type === cat.name ||
                String(r.number) === String(cat.roomNumber)
            );
            if (pmsMatch && pmsMatch.dailyRate) {
              const rateVal = Number(pmsMatch.dailyRate);
              const usd = rateVal > 100 ? cat.price : rateVal || cat.price;
              const npr = rateVal > 100 ? rateVal : cat.priceNprApprox;
              return { ...cat, price: usd, priceNprApprox: npr };
            }
            return cat;
          });
          setRooms(updatedCategories);
          return;
        }
      } catch (apiErr) {
        console.warn("Using local room categories for modal:", apiErr);
      }

      setRooms(categories);
    } catch (err) {
      console.warn("Using fallback rooms for booking modal:", err);
      setRooms(
        fallbackRooms.map((r) => ({
          ...r,
          id: r.id,
          name: r.name,
          Noroom: 2,
          image: Array.isArray(r.image) ? r.image[0] : r.image,
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRoomSelect = (room) => {
    // Close modal and navigate to booking page using normalized id
    onClose();
    navigate(`/book/${room.id}`, {
      state: { roomDetails: room },
    });
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: <Wifi size={16} />,
      parking: <Car size={16} />,
      breakfast: <Coffee size={16} />,
      default: <Star size={16} />,
    };
    return icons[amenity.toLowerCase()] || icons.default;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {t("modal.title")}
              </h2>
              <p className="text-gray-600 mt-1">{t("modal.subtitle")}</p>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} className="text-gray-500" />
            </motion.button>
          </div>

          {/* 10% Direct Discount Banner */}
          <div className="bg-gradient-to-r from-amber-500/15 via-[#FB6C01]/15 to-amber-500/15 border-b border-amber-300/40 px-6 py-2.5 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-[#01366E] font-semibold">
              <span className="text-base">🎉</span>
              <span>
                Direct Booking Privilege: <strong className="text-[#FB6C01] font-bold">10% Discount</strong> is automatically applied to all rates below!
              </span>
            </div>
            <span className="hidden sm:inline-block bg-[#FB6C01] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Best Rate Guaranteed
            </span>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <motion.div
                  className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span className="ml-3 text-gray-600">{t("modal.load")}</span>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <div className="text-red-500 text-lg mb-2">⚠️ Error</div>
                <p className="text-gray-600 mb-4">{error}</p>
                <motion.button
                  onClick={fetchRooms}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t("modal.try")}
                </motion.button>
              </div>
            )}

            {!loading && !error && rooms.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">🏨</div>
                <p className="text-gray-600">{t("modal.not")}</p>
              </div>
            )}

            {!loading && !error && rooms.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => {
                  return (
                    <motion.div
                      key={room.id}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleRoomSelect(room);
                      }}
                      layout
                    >
                      {/* Room Image */}
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        <img
                          src={String((Array.isArray(room.image) ? room.image[0] : room.image) || "/room1/room.webp").replace(/\.jpeg$/i, ".webp")}
                          alt={room.name ? `${room.name} - Hotel Sherpa Soul` : "Hotel Sherpa Soul Room"}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/room1/room.webp";
                          }}
                        />
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-[#FB6C01] to-amber-600 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow flex items-center gap-1 border border-amber-300/30">
                          <span>🏷️</span> 10% Direct OFF
                        </div>
                      </div>

                      {/* Room Details */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                            {room.name}
                          </h3>
                          {room.rating && (
                            <div className="flex items-center text-yellow-500">
                              <Star size={14} fill="currentColor" />
                              <span className="text-sm text-gray-600 ml-1">
                                {room.rating}
                              </span>
                            </div>
                          )}
                        </div>

                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {room.description}
                        </p>

                        {/* Room Info */}
                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                          {typeof room.guests !== "undefined" && (
                            <div className="flex items-center gap-1">
                              <Users size={14} />
                              <span>{room.guests}</span>
                            </div>
                          )}
                          {room.beds && (
                            <div className="flex items-center gap-1">
                              <Bed size={14} />
                              <span>{room.beds}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-amber-700 font-semibold">
                            <span>🔥</span>
                            <span>2 rooms available</span>
                          </div>
                        </div>

                        {/* Amenities */}
                        {room.amenities && room.amenities.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {room.amenities
                              .slice(0, 3)
                              .map((amenity, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs"
                                >
                                  {getAmenityIcon(amenity)}
                                  <span>{amenity}</span>
                                </div>
                              ))}
                            {room.amenities.length > 3 && (
                              <span className="text-xs text-gray-500 px-2 py-1">
                                +{room.amenities.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div>
                            {room.price && (
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="line-through text-gray-400 text-xs">${room.price}</span>
                                  <span className="text-lg font-bold text-[#FB6C01]">
                                    ${Math.round(room.price * 0.9)} USD
                                  </span>
                                  <span className="text-xs font-normal text-gray-500">
                                    /night
                                  </span>
                                </div>
                                <div className="text-[10px] font-bold text-emerald-600">
                                  10% Direct Discount Applied
                                </div>
                                <div className="text-xs font-semibold text-amber-700">
                                  ~NPR {Math.round((room.priceNprApprox || (Number(room.price) <= 100 ? Number(room.price) * 135 : Number(room.price))) * 0.9).toLocaleString()}
                                </div>
                              </div>
                            )}
                          </div>
                          <motion.button
                            className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors bg-orange-500 text-white hover:bg-orange-600 shadow"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRoomSelect(room);
                            }}
                          >
                            {t("modal.book")}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
