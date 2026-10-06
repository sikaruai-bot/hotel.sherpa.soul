import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Bed, Wifi, Wind, Bath, Utensils, CheckCircle2, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import BookingModal from "../HelperComponents/BookingModal";
import { trackBookingClick } from "../Analytics/pixelEvents";
import { HOTEL_PRESET_PHOTOS } from "../CMS/mediaUtils";
import { useCMS } from "../../Context/CMSContext";

export default function HomeRooms() {
  const { t } = useTranslation();
  const { rooms: cmsRooms, sitePhotos } = useCMS();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoomForModal, setSelectedRoomForModal] = useState(null);

  // Map preset photos to room categories by index
  const presetPhotos = HOTEL_PRESET_PHOTOS;

  const budgetRoom = cmsRooms?.find((r) => r.id === 101 || r.slug?.includes("budget")) || cmsRooms?.[0];
  const deluxeRoom = cmsRooms?.find((r) => r.id === 201 || r.slug?.includes("deluxe")) || cmsRooms?.[1];
  const familyRoom = cmsRooms?.find((r) => r.id === 301 || (r.slug?.includes("family") && !r.slug?.includes("budget"))) || cmsRooms?.[2];

  const getRoomImg = (cmsRoom, sitePhotoKey, fallbackPath) => {
    if (cmsRoom) {
      const raw = Array.isArray(cmsRoom.image) ? cmsRoom.image[0] : cmsRoom.image;
      if (raw && typeof raw === "string" && raw.trim() !== "") {
        return raw.replace(/\.jpeg$/i, ".webp");
      }
    }
    if (sitePhotos?.[sitePhotoKey]) return sitePhotos[sitePhotoKey];
    return fallbackPath;
  };

  const roomCategories = [
    {
      id: 101,
      slug: "budget-family-room",
      name: t("homeRoomsData.budget.name", "Budget Family Room"),
      image: getRoomImg(budgetRoom, "roomCard_budget", presetPhotos[2].path),
      bedType: t("homeRoomsData.budget.bed", "1 King Bed + 1 Single Bed"),
      occupancy: t("homeRoomsData.budget.occupancy", "Up to 4 Guests (3 Adults, 1 Child)"),
      size: "224 Sq. Ft.",
      priceUsd: 20,
      priceNpr: "2,700",
      description: t("homeRoomsData.budget.desc", "Comfortable and budget-conscious accommodation with en-suite hot shower, bright windows, and shared kitchen access for groups or families."),
      facilities: [
        t("homeRoomsData.budget.f1", "1 King Bed + 1 Single Bed"),
        t("homeRoomsData.budget.f2", "Private Attached Bathroom (24/7 Hot Water)"),
        t("homeRoomsData.budget.f3", "Free High-Speed Fiber Wi-Fi"),
        t("homeRoomsData.budget.f4", "Shared Guest Kitchen Access"),
        t("homeRoomsData.budget.f5", "Trekker Luggage Storage Included"),
      ],
      hasAC: false,
    },
    {
      id: 201,
      slug: "deluxe-room",
      name: t("homeRoomsData.deluxe.name", "Deluxe Room (AC)"),
      image: getRoomImg(deluxeRoom, "roomCard_deluxe", presetPhotos[0].path),
      bedType: t("homeRoomsData.deluxe.bed", "1 King Bed"),
      occupancy: t("homeRoomsData.deluxe.occupancy", "Up to 3 Guests (2 Adults, 1 Child)"),
      size: "168 Sq. Ft.",
      priceUsd: 20,
      priceNpr: "2,700",
      description: t("homeRoomsData.deluxe.desc", "Air-conditioned boutique room with king-size bed, private modern bathroom, work desk, and quiet ambiance for restful sleep."),
      facilities: [
        t("homeRoomsData.deluxe.f1", "Individual Climate Control (AC)"),
        t("homeRoomsData.deluxe.f2", "1 Comfortable King Bed"),
        t("homeRoomsData.deluxe.f3", "Private Modern Bathroom (24/7 Hot Shower)"),
        t("homeRoomsData.deluxe.f4", "Free High-Speed Fiber Wi-Fi"),
        t("homeRoomsData.deluxe.f5", "Shared Guest Kitchen Access"),
      ],
      hasAC: true,
      popular: true,
    },
    {
      id: 301,
      slug: "family-room",
      name: t("homeRoomsData.family.name", "Family Room (AC)"),
      image: getRoomImg(familyRoom, "roomCard_family", presetPhotos[1].path),
      bedType: t("homeRoomsData.family.bed", "1 King Bed + 1 Single Bed"),
      occupancy: t("homeRoomsData.family.occupancy", "Up to 4 Guests (3 Adults, 1 Child)"),
      size: "224 Sq. Ft.",
      priceUsd: 30,
      priceNpr: "4,000",
      description: t("homeRoomsData.family.desc", "Spacious family suite featuring air conditioning, one king bed and one single bed, private bathroom, and extra room for luggage."),
      facilities: [
        t("homeRoomsData.family.f1", "Individual Climate Control (AC)"),
        t("homeRoomsData.family.f2", "1 King Bed + 1 Single Bed"),
        t("homeRoomsData.family.f3", "Spacious Private Bathroom (24/7 Hot Water)"),
        t("homeRoomsData.family.f4", "Free High-Speed Fiber Wi-Fi"),
        t("homeRoomsData.family.f5", "Shared Guest Kitchen Access"),
      ],
      hasAC: true,
    },
  ];

  const handleOpenBooking = (room) => {
    setSelectedRoomForModal(room);
    trackBookingClick("home_rooms_card", { room_name: room.name, room_id: room.id });
    setIsBookingModalOpen(true);
  };

  return (
    <section className="py-20 bg-slate-50/60 border-t border-slate-100" id="rooms">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-3 rounded-full bg-orange-50 border border-orange-200 text-xs text-[#FB6C01] font-bold shadow-sm uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("homeRoomsData.badge", "Room Types & Current Rates")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#01366E] tracking-tight">
            {t("homeRoomsData.title", "Clean, Quiet Rooms in Thamel")}
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            {t("homeRoomsData.subtitle", "Every room includes private attached bathroom with continuous 24/7 hot water, high-speed fiber Wi-Fi, and access to our shared self-kitchen.")}
          </p>
        </div>

        {/* 3 Room Cards - Exactly Once, No Duplicate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roomCategories.map((room) => (
            <article
              key={room.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border flex flex-col justify-between relative group ${
                room.popular ? "border-amber-400 ring-2 ring-amber-400/20" : "border-slate-200"
              }`}
            >
              {room.popular && (
                <div className="absolute top-3 left-3 z-10 bg-[#FB6C01] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {t("homeRoomsData.mostPopular", "Most Popular")}
                </div>
              )}

              {/* Room Image */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={room.image}
                  alt={`${room.name} at Hotel Sherpa Soul Thamel Kathmandu`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  width="400"
                  height="260"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs font-semibold">
                  <span className="text-amber-300 font-bold text-sm sm:text-base">${room.priceUsd} USD</span>
                  <span className="text-slate-300 text-[11px] block">~NPR {room.priceNpr} {t("homeRoomsData.perNight", "/ night")}</span>
                </div>
              </div>

              {/* Room Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#01366E] transition-colors">
                      {room.name}
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 mb-3.5">
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4 text-[#FB6C01] flex-shrink-0" />
                      <span className="font-semibold text-slate-800">{t("homeRoomsData.bedLabel", "Bed:")}</span>
                      <span>{room.bedType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#01366E] flex-shrink-0" />
                      <span className="font-semibold text-slate-800">{t("homeRoomsData.occupancyLabel", "Occupancy:")}</span>
                      <span>{room.occupancy}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <span className="font-semibold text-slate-700">{t("homeRoomsData.sizeLabel", "Room Size:")}</span>
                      <span className="italic">{room.size}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {room.description}
                  </p>

                  {/* Facilities list */}
                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      {t("homeRoomsData.keyAmenities", "Key Amenities")}
                    </span>
                    {room.facilities.map((fac, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{fac}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Buttons */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to={`/room/${room.id}`}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1 min-h-[44px]"
                    >
                      <span>{t("homeRoomsData.viewDetails", "View Details")}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => handleOpenBooking(room)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#FB6C01] hover:bg-[#E05A00] text-white text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center justify-center gap-1 min-h-[44px]"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{t("homeRoomsData.checkAvailability", "Check Availability")}</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏷️</span>
            <div>
              <p className="font-bold text-slate-900 text-sm sm:text-base">
                {t("homeRoomsData.directOfferText", "Best Available Direct-Booking Offer")}
              </p>
              <p className="text-slate-600 text-xs sm:text-sm">
                {t("homeRoomsData.directOfferSub", "No third-party commission markups. Contact us directly for availability and instant WhatsApp confirmation.")}
              </p>
            </div>
          </div>
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#01366E] hover:bg-[#082844] text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md flex-shrink-0 min-h-[44px]"
          >
            <span>{t("homeRoomsData.compareAll", "Compare All Rooms")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
}
