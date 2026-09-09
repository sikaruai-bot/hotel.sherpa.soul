import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BedIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import api from "../Utils/api";

import { rooms as defaultFallbackRooms } from "../HelperComponents/RoomsData";
import { useCMS } from "../../Context/CMSContext";

const RoomsCard = () => {
  const { rooms: cmsRooms } = useCMS();
  const fallbackRooms = cmsRooms && cmsRooms.length > 0 ? cmsRooms : defaultFallbackRooms;
  const [rooms, setRooms] = useState(fallbackRooms);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const roomsPerPage = 9;
  const { t } = useTranslation();

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get("/rooms");

      if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
        const formattedRooms = data.data.map((r) => {
          const fallback =
            fallbackRooms.find(
              (f) => String(f.roomNumber) === String(r.number) || f.type === r.type
            ) || fallbackRooms[0];

          return {
            id: r.number || r.id,
            roomNumber: r.number,
            name: `${r.type} (Room ${r.number})`,
            type: r.type,
            guests: r.capacity || fallback.guests || 2,
            size: fallback.size || "280 Sq. Ft.",
            beds: r.bedType || fallback.beds || "1 Bed",
            Noroom: r.status === "AVAILABLE" ? 1 : 0,
            features: [
              ...(r.kitchenEligible ? ["Kitchen Access"] : []),
              ...(r.longStayEligible ? ["Long Stay Option"] : []),
              ...(fallback.features || []),
            ],
            description: fallback.description || "Comfortable boutique stay in Thamel.",
            amenities: fallback.amenities || ["Wi-Fi", "Hot Water", "Kitchen Access"],
            price: r.dailyRate || fallback.price,
            status: r.status,
            image: (fallback.image && fallback.image[0]) || "/room1/room.webp",
          };
        });

        // Show available rooms first
        formattedRooms.sort((a, b) => (b.Noroom - a.Noroom));
        setRooms(formattedRooms);
      } else {
        setRooms(fallbackRooms);
      }
    } catch (err) {
      console.warn("Using fallback room inventory:", err);
      setRooms(fallbackRooms);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Auto-reload every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        fetchRooms();
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [loading]);

  // Pagination logic
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(rooms.length / roomsPerPage);

  // Loading Screen Component
  const LoadingScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 md:py-16">
      <div className="text-center mb-12 px-4">
        <p className="text-xs text-amber-600 uppercase tracking-[0.3em] mb-3 font-medium">
          {t("room.title1")}
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4">
          {t("room.title2")}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base mb-2">
          {t("room.desc")}
        </p>
      </div>

      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="relative">
            {/* Animated Hotel Icon */}
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg animate-pulse"></div>
              <div className="absolute inset-2 bg-white rounded-md flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-amber-600 animate-bounce"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7v15h20V7l-10-5zM12 4.236L19 8v11H5V8l7-3.764zM7 10h10v2H7v-2zm0 4h10v2H7v-2z" />
                </svg>
              </div>
            </div>

            {/* Loading Spinner */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
                <div
                  className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-amber-400 rounded-full animate-spin"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </div>
            </div>

            <h3 className="text-xl font-medium text-gray-900 mb-2 animate-pulse">
              Loading Rooms...
            </h3>
            <p className="text-gray-600 text-sm">
              Please wait while we fetch the latest room availability
            </p>

            {/* Animated Dots */}
            <div className="flex justify-center mt-4 space-x-1">
              <div
                className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Error Screen Component
  const ErrorScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 md:py-16">
      <div className="text-center mb-12 px-4">
        <p className="text-xs text-amber-600 uppercase tracking-[0.3em] mb-3 font-medium">
          {t("room.title1")}
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4">
          {t("room.title2")}
        </h2>
      </div>

      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Unable to Load Rooms
          </h3>
          <p className="text-gray-600 text-sm mb-6">{error}</p>
          <button
            onClick={fetchRooms}
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-medium hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );

  // Show loading screen while loading
  if (loading) {
    return <LoadingScreen />;
  }

  // Show error screen if there's an error
  if (error) {
    return <ErrorScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 md:py-16">
      <div className="text-center mb-12 px-4">
        <p className="text-xs text-[#FB6C01] uppercase tracking-[0.3em] mb-3 font-semibold">
          {t("room.title1")}
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#01366E] mb-4">
          {t("room.title2")}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base mb-2">
          {t("room.desc")}
        </p>
        <p className="text-gray-500 text-sm">
          {rooms.length} Room{rooms.length !== 1 ? "s" : ""} Available
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4">
        {currentRooms.map((room, index) => {
          const isSoldOut = room.Noroom === 0;

          return (
            <div
              key={room.id}
              className={`group relative bg-white rounded-2xl shadow-md transition duration-200 ease-out overflow-hidden transform ${
                isSoldOut
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-lg hover:-translate-y-1"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.8s ease-out forwards",
                willChange: "transform, box-shadow",
                pointerEvents: isSoldOut ? "none" : "auto",
              }}
            >
              {/* Overlay when sold out */}
              {isSoldOut && (
                <div className="absolute inset-0 bg-black/80 bg-opacity-60 flex items-center justify-center text-white text-lg font-semibold rounded-2xl z-10">
                  {t("room.pack")}
                </div>
              )}

              {/* Background Image */}
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-200 pointer-events-none"
                style={{
                  backgroundImage: `url("flag2.jpg")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />

              {/* Main Image */}
              <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                {room.image && room.image.endsWith(".mp4") ? (
                  <video
                    src={room.image}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={room.image}
                    alt={`${room.name} - Hotel Sherpa Soul Kathmandu`}
                    className="w-full h-full object-cover transform transition duration-300 ease-out group-hover:scale-105"
                  />
                )}

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-[#01366E]/95 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-1.5">
                  <span className="text-[#FB6C01] font-bold">
                    {room.currency === "USD" || Number(room.price) <= 100
                      ? `$${room.price} USD`
                      : `NPR ${Number(room.price).toLocaleString()}`}
                  </span>
                  <span className="text-xs font-normal opacity-90">/ night</span>
                </div>

                {/* Features Badge */}
                {room.features && room.features.length > 0 && (
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                    {room.features[0]}
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-5 sm:p-6 space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#01366E] transition-colors duration-300">
                    {room.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1 font-semibold text-gray-800">
                      <svg
                        className="w-4 h-4 text-[#FB6C01]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {room.occupancy || `${room.guests} Guests`}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-[#01366E]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v8h12V6H4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {room.size}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-sm font-semibold text-[#01366E] mb-2 leading-relaxed">
                      {room.beds}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {room.description}
                  </p>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1">
                  {room.amenities && room.amenities.slice(0, 3).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-blue-50 text-[#01366E] text-xs font-medium rounded-full border border-blue-100"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities && room.amenities.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                  <Link to={`/room/${room.id}`} className="flex-1">
                    <button
                      disabled={isSoldOut}
                      className={`w-full px-4 py-2.5 border text-sm rounded-lg font-medium transition-all duration-300 ${
                        isSoldOut
                          ? "border-gray-300 text-gray-400 cursor-not-allowed"
                          : "border-[#01366E] text-[#01366E] hover:bg-blue-50 hover:shadow-md"
                      }`}
                    >
                      {t("room.details")}
                    </button>
                  </Link>
                  <Link to={`/book/${room.id}`} className="flex-1">
                    <button
                      disabled={isSoldOut}
                      className={`w-full px-4 py-2.5 text-white rounded-lg font-medium text-sm transition-all duration-300 transform ${
                        isSoldOut
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#01366E] hover:bg-[#072340] hover:shadow-lg hover:scale-105"
                      }`}
                    >
                      {t("room.book")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center items-center space-x-2 px-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-blue-50 hover:border-[#01366E] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 text-sm rounded-full border transition-all duration-300 ${
                currentPage === index + 1
                  ? "bg-[#01366E] text-white border-[#01366E] shadow-lg"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-[#01366E]"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-blue-50 hover:border-[#01366E] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default RoomsCard;
