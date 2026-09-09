import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Users, Bed, Wifi, Car, Coffee, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../Utils/api";
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
      const response = await api.get("/get-rooms");
      const apiRooms = response?.data?.room || [];

      // Map API data to match RoomsCard format and UX
      const formattedRooms = apiRooms
        .map((r) => ({
          id: r._id,
          name: r.name,
          guests: r.guests,
          size: r.size,
          beds: r.beds,
          Noroom: r.availableRooms,
          features: r.features || [],
          description: r.description,
          amenities: r.amenities || [],
          price: r.price,
          priceNprApprox: r.priceNprApprox || (Number(r.price) <= 100 ? Number(r.price) * 135 : Number(r.price)),
          image: r.image?.[0]?.url || "",
        }))
        // Ensure available rooms appear first, sold-out last
        .sort((a, b) => {
          if (a.Noroom === 0 && b.Noroom !== 0) return 1;
          if (a.Noroom !== 0 && b.Noroom === 0) return -1;
          return 0;
        });

      setRooms(formattedRooms);
    } catch (err) {
      setError(err.message || "Failed to fetch rooms");
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
                  const isSoldOut = room.Noroom === 0;
                  return (
                    <motion.div
                      key={room.id}
                      className={`bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 cursor-pointer ${
                        isSoldOut ? "opacity-60" : "hover:shadow-lg"
                      }`}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (!isSoldOut) handleRoomSelect(room);
                      }}
                      layout
                    >
                      {/* Room Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={room.image || "/api/placeholder/300/200"}
                          alt={room.name ? `${room.name} - Hotel Sherpa Soul` : "Hotel Sherpa Soul Room"}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        {isSoldOut && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-red-500 capitalize text-white px-3 py-1 rounded-full text-sm font-medium">
                              {t("modal.booked")}
                            </span>
                          </div>
                        )}
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
                          {typeof room.Noroom !== "undefined" && (
                            <div className="flex items-center gap-1">
                              <Bed size={14} />
                              <span>{room.Noroom}</span>
                            </div>
                          )}
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
                                <div className="text-lg font-bold text-orange-500">
                                  ${room.price} USD
                                  <span className="text-xs font-normal text-gray-500 ml-1">
                                    /night
                                  </span>
                                </div>
                                <div className="text-xs font-semibold text-amber-700">
                                  ~NPR {(room.priceNprApprox || (Number(room.price) <= 100 ? Number(room.price) * 135 : Number(room.price))).toLocaleString()}
                                </div>
                              </div>
                            )}
                          </div>
                          <motion.button
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              isSoldOut
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-orange-500 text-white hover:bg-orange-600"
                            }`}
                            whileHover={!isSoldOut ? { scale: 1.05 } : {}}
                            whileTap={!isSoldOut ? { scale: 0.95 } : {}}
                            disabled={isSoldOut}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isSoldOut) handleRoomSelect(room);
                            }}
                          >
                            {isSoldOut
                              ? t("modal.Unavailable")
                              : t("modal.book")}
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
