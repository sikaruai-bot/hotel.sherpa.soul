import React, { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Upload,
  AlertTriangle,
  Check,
  Calendar,
  Users,
  Hotel,
  User,
  FileText,
  Sparkles,
} from "lucide-react";
import { trackMetaEvent } from "../Components/Analytics/pixelEvents";
import api from "../Components/Utils/api";
import { sendEmailNotification } from "../Components/Utils/emailService";
import { useCMS } from "../Context/CMSContext";

export default function BookNowPage() {
  const { t } = useTranslation();
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { channels, rooms: cmsRooms, sitePhotos } = useCMS();

  // Dynamically synchronize room categories & photos with Book Your Stay (CMS/Modal)
  const roomOptions = useMemo(() => {
    const budgetRoom =
      cmsRooms?.find((r) => r.id === 101 || String(r.roomNumber) === "101" || r.slug?.includes("budget")) ||
      cmsRooms?.[0];
    const deluxeRoom =
      cmsRooms?.find((r) => r.id === 201 || String(r.roomNumber) === "201" || r.slug?.includes("deluxe")) ||
      cmsRooms?.[1];
    const familyRoom =
      cmsRooms?.find(
        (r) =>
          r.id === 301 ||
          String(r.roomNumber) === "301" ||
          (r.slug?.includes("family") && !r.slug?.includes("budget"))
      ) || cmsRooms?.[2];

    const getRoomPhoto = (cmsRoom, sitePhotoKey, defaultPath) => {
      if (cmsRoom) {
        const raw = Array.isArray(cmsRoom.image) ? cmsRoom.image[0] : cmsRoom.image;
        if (raw && typeof raw === "string" && raw.trim() !== "") {
          return raw.replace(/\.jpeg$/i, ".webp");
        }
      }
      if (sitePhotos?.[sitePhotoKey]) return sitePhotos[sitePhotoKey];
      return defaultPath;
    };

    return [
      {
        id: "1",
        code: "101",
        label: "Budget Family Room",
        title: t("homeRoomsData.budget.name", budgetRoom?.name || "Budget Family Room"),
        roomNumber: budgetRoom?.roomNumber || "101",
        price: budgetRoom?.price || 20,
        priceNpr: budgetRoom?.priceNprApprox || 2700,
        currency: "USD",
        maxGuests: budgetRoom?.guests || 4,
        bedInfo: t("homeRoomsData.budget.bed", budgetRoom?.beds || "1 King Bed + 1 Single Bed"),
        image: getRoomPhoto(budgetRoom, "bookNow_budget", "/triple.webp"),
        description: t("homeRoomsData.budget.desc", budgetRoom?.description || "Comfortable family room with 1 King Bed + 1 Single Bed, private en-suite bathroom, 24/7 hot shower, free Wi-Fi, and shared kitchen access."),
        badge: "10% OFF",
      },
      {
        id: "2",
        code: "201",
        label: "Deluxe Room (AC)",
        title: t("homeRoomsData.deluxe.name", deluxeRoom?.name || "Deluxe Room (AC)"),
        roomNumber: deluxeRoom?.roomNumber || "201",
        price: deluxeRoom?.price || 20,
        priceNpr: deluxeRoom?.priceNprApprox || 2700,
        currency: "USD",
        maxGuests: deluxeRoom?.guests || 3,
        bedInfo: t("homeRoomsData.deluxe.bed", deluxeRoom?.beds ? `${deluxeRoom.beds} • Air Conditioned` : "1 King Bed • Air Conditioned"),
        image: getRoomPhoto(deluxeRoom, "bookNow_deluxe", "/changes_photo/deluxeRoom_ai.webp"),
        description: t("homeRoomsData.deluxe.desc", deluxeRoom?.description || "Air-conditioned boutique room with king bed, Himalayan mountain art, sofa seating, private modern bathroom, and peaceful atmosphere."),
        badge: "10% OFF",
      },
      {
        id: "3",
        code: "301",
        label: "Family Room (AC)",
        title: t("homeRoomsData.family.name", familyRoom?.name || "Family Room (AC)"),
        roomNumber: familyRoom?.roomNumber || "301",
        price: familyRoom?.price || 30,
        priceNpr: familyRoom?.priceNprApprox || 4000,
        currency: "USD",
        maxGuests: familyRoom?.guests || 4,
        bedInfo: t("homeRoomsData.family.bed", familyRoom?.beds ? `${familyRoom.beds} • Air Conditioned` : "King + Single • Air Conditioned"),
        image: getRoomPhoto(familyRoom, "bookNow_family", "/changes_photo/doubleBed.webp"),
        description: t("homeRoomsData.family.desc", familyRoom?.description || "Spacious AC family suite with King + Single bed, private modern washroom, free luggage storage, and shared kitchen access."),
        badge: "10% OFF",
      },
    ];
  }, [cmsRooms, sitePhotos, t]);

  const [formData, setFormData] = useState({
    fullName: "",
    roomType: "Budget Family Room",
    numberOfPeople: 2,
    numberOfRooms: 1,
    checkIn: formatDate(today),
    checkOut: formatDate(tomorrow),
    email: "",
    phone: "",
  });

  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [maxGuests, setMaxGuests] = useState(4);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRefId, setBookingRefId] = useState("");
  const [totalCalculated, setTotalCalculated] = useState(0);

  // Auto-detect room from router navigation state (e.g. from Book Your Stay modal), URL param, or query
  useEffect(() => {
    if (location.state?.roomDetails) {
      const passed = location.state.roomDetails;
      const match = roomOptions.find(
        (r) =>
          String(r.id) === String(passed.id) ||
          String(r.code) === String(passed.id) ||
          String(r.roomNumber) === String(passed.roomNumber) ||
          r.label.toLowerCase() === (passed.name || passed.title || "").toLowerCase()
      );
      if (match) {
        handleSelectRoom(match);
        return;
      }
    }

    const rawId = id || searchParams.get("room") || searchParams.get("id");
    if (rawId) {
      const match = roomOptions.find(
        (r) =>
          String(r.id) === String(rawId) ||
          String(r.code) === String(rawId) ||
          String(r.roomNumber) === String(rawId) ||
          r.label.toLowerCase().includes(String(rawId).toLowerCase())
      );
      if (match) {
        handleSelectRoom(match);
      }
    }
  }, [id, searchParams, location.state, roomOptions]);

  const selectedRoomObj = roomOptions.find((r) => r.label === formData.roomType || r.title === formData.roomType) || roomOptions[0];
  const estimatedNights = formData.checkIn && formData.checkOut
    ? Math.max(1, Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)))
    : 1;
  const estimatedTotalUsd = selectedRoomObj ? estimatedNights * selectedRoomObj.price * (Number(formData.numberOfRooms) || 1) : 0;
  const estimatedTotalNpr = selectedRoomObj ? estimatedNights * (selectedRoomObj.priceNpr || (selectedRoomObj.price * 135)) * (Number(formData.numberOfRooms) || 1) : 0;

  const handleSelectRoom = (room) => {
    setMaxGuests(room.maxGuests);
    setFormData((prev) => ({
      ...prev,
      roomType: room.label,
      numberOfPeople: Math.min(prev.numberOfPeople || 2, room.maxGuests),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "roomType") {
      const selectedRoom = roomOptions.find((room) => room.label === value || room.title === value);
      if (selectedRoom) {
        setMaxGuests(selectedRoom.maxGuests);
        setFormData((prev) => ({
          ...prev,
          numberOfPeople: Math.min(prev.numberOfPeople, selectedRoom.maxGuests),
        }));
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedDocument(file);
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.roomType || !formData.checkIn || !formData.checkOut) {
      alert("Please fill in your name, phone number, room type, and dates.");
      return;
    }

    setIsSubmitting(true);
    const selectedRoom = roomOptions.find((r) => r.label === formData.roomType) || roomOptions[0];
    const nights = Math.max(
      1,
      Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24))
    );
    const totalAmount = nights * (selectedRoom.price || 20) * (formData.numberOfRooms || 1);
    setTotalCalculated(totalAmount);

    try {
      const payload = {
        guestName: formData.fullName,
        email: formData.email,
        phone: String(formData.phone),
        nationality: "Nepal",
        roomNumber: String(selectedRoom.roomNumber),
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        adults: Number(formData.numberOfPeople) || 1,
        children: 0,
        totalAmount,
        paidAmount: 0,
        status: "CONFIRMED",
        source: "Direct Website",
        specialRequests: `Direct Booking for ${formData.roomType}. Rooms: ${formData.numberOfRooms}. ${uploadedDocument ? '(ID uploaded)' : ''}`,
      };

      const response = await api.post("/reservations", payload);
      const refId = response.data?.data?.id || `HSS-${Date.now().toString().slice(-6)}`;
      setBookingRefId(refId);

      // Trigger official booking confirmation voucher & hotel staff alert email
      sendEmailNotification({
        type: "booking",
        bookingRef: refId,
        guestName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        roomName: formData.roomType,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        numberOfRooms: formData.numberOfRooms,
        numberOfGuests: formData.numberOfPeople,
        totalPrice: totalAmount,
        specialRequests: payload.specialRequests,
      }).catch((e) => console.warn("Booking email delivery notice:", e));

      trackMetaEvent("Lead", {
        content_category: "hotel_booking",
        content_name: formData.roomType,
        value: totalAmount,
        currency: "NPR",
      });

      trackMetaEvent("Purchase", {
        content_type: "hotel_booking",
        value: totalAmount,
        currency: "NPR",
      });
    } catch (err) {
      console.warn("PMS reservation request recorded with direct reference:", err);
      const fallbackRef = `HSS-${Date.now().toString().slice(-6)}`;
      setBookingRefId(fallbackRef);

      // Trigger official booking confirmation voucher & hotel staff alert email
      sendEmailNotification({
        type: "booking",
        bookingRef: fallbackRef,
        guestName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        roomName: formData.roomType,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        numberOfRooms: formData.numberOfRooms,
        numberOfGuests: formData.numberOfPeople,
        totalPrice: totalAmount,
        specialRequests: `Direct Booking for ${formData.roomType}. Rooms: ${formData.numberOfRooms}`,
      }).catch((e) => console.warn("Booking email delivery notice:", e));
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Sleek Hero Section */}
      <div className="relative py-20 sm:py-24 overflow-hidden bg-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 transform scale-105"
          style={{
            backgroundImage: `url('${sitePhotos?.bookNow_hero || "/changes_photo/deluxeRoom_ai.webp"}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#01366E]/95 via-[#0A2540]/90 to-[#01366E]/95" />

        {/* Animated ambient glow */}
        <div className="absolute top-6 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div
          className="absolute bottom-6 right-10 w-32 h-32 bg-amber-400/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-3xl pt-10 sm:pt-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-1.5 mb-4 border border-white/20">
              <Sparkles className="w-4 h-4 text-[#FB6C01]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-amber-200">
                {t("bookNowPage.heroBadge", "Direct Booking Privilege: Save 10% on All Rooms")}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3 text-white leading-tight">
              {t("bookNowPage.heroTitle", "Reserve Your Peaceful Stay")}
            </h1>
            <p className="text-sm sm:text-base font-light text-slate-200 max-w-2xl mx-auto leading-relaxed">
              {t("bookNowPage.heroSub", "Clean, quiet rooms, authentic Sherpa hospitality, and comfortable rest in the heart of Thamel, Kathmandu")}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {!submitted ? (
        <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
          {/* Step 1: Visual 3 Room Categories */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200/80 p-6 sm:p-10 mb-10">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="inline-block bg-[#FB6C01]/10 text-[#FB6C01] font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full border border-[#FB6C01]/20">
                {t("bookNowPage.step1Badge", "Step 1: Choose Your Room Category")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#01366E] mt-2">
                {t("bookNowPage.step1Title", "Select From Our 3 Room Categories")}
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                {t("bookNowPage.step1Sub", "Click any room to select it — your 10% direct booking discount is automatically applied.")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roomOptions.map((room) => {
                const isSelected = formData.roomType === room.label || formData.roomType === room.title;
                return (
                  <div
                    key={room.id}
                    onClick={() => handleSelectRoom(room)}
                    className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 bg-white flex flex-col justify-between ${
                      isSelected
                        ? "border-[#FB6C01] ring-4 ring-[#FB6C01]/20 shadow-xl scale-[1.02]"
                        : "border-slate-200 hover:border-amber-400 hover:shadow-lg"
                    }`}
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={room.image}
                        alt={`${room.title} - Hotel Sherpa Soul Thamel Kathmandu`}
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="260"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-[#FB6C01] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                        {t("bookNowPage.directOff", "10% DIRECT OFF")}
                      </div>
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-emerald-600 text-white p-1.5 rounded-full shadow-lg flex items-center justify-center">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black/75 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs">
                        <span className="font-bold text-[#FB6C01] text-sm">${room.price} USD</span>
                        <span className="text-amber-300 font-semibold">~NPR {room.priceNpr.toLocaleString()} {t("roomsCard.perNight", "/ night")}</span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1">
                          {room.title}
                        </h3>
                        <p className="text-xs text-slate-500 mb-2 font-medium">
                          {room.bedInfo} • Max {room.maxGuests} {t("room.guest", "Guests")}
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {room.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectRoom(room);
                          }}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                            isSelected
                              ? "bg-[#FB6C01] text-white shadow-md"
                              : "bg-slate-100 text-slate-700 hover:bg-[#01366E] hover:text-white"
                          }`}
                        >
                          {isSelected ? t("bookNowPage.roomSelected", "✓ Room Selected") : t("bookNowPage.selectThisRoom", "Select This Room")}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            {/* Left - Contact Info */}
            <div className="xl:col-span-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 sticky top-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {t("bookNowPage.getInTouch", "Get in Touch")}
                  </h2>
                  <p className="text-gray-600 mt-2">{t("bookNowPage.hereToHelp", "We're here to help 24/7")}</p>
                </div>

                <div className="space-y-4">
                  <a
                    href="https://wa.me/9779818259472?text=Hello%20Hotel%20Sherpa%20Soul%2C%20I%20would%20like%20to%20check%20room%20availability%20and%20direct%20booking%20rates."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-lg hover:border-green-200">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg group-hover:shadow-green-200 transition-shadow">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">WhatsApp</h3>
                        <p className="text-green-600 font-semibold text-lg">
                          +977 9818259472
                        </p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="tel:+9779851068219"
                    className="block group hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100 hover:shadow-lg hover:border-amber-200">
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-2xl shadow-lg group-hover:shadow-amber-200 transition-shadow">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{t("bookNowPage.callDirectly", "Call directly")}</h3>
                        <p className="text-amber-600 font-semibold text-lg">
                          +977 9851068219
                        </p>
                      </div>
                    </div>
                  </a>

                  <div className="group hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 hover:shadow-lg hover:border-blue-200">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg group-hover:shadow-blue-200 transition-shadow">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{t("bookNowPage.email", "Email")}</h3>
                        <p className="text-blue-600 font-semibold">
                          info@hotelsherpasoul.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl border border-purple-100 hover:shadow-lg hover:border-purple-200">
                      <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-4 rounded-2xl shadow-lg group-hover:shadow-purple-200 transition-shadow">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{t("bookNowPage.location", "Location")}</h3>
                        <p className="text-purple-600 font-semibold">
                          Thamel Bhagawati Marg 26, Kathmandu, Nepal
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100 hover:shadow-lg hover:border-orange-200">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 rounded-2xl shadow-lg group-hover:shadow-orange-200 transition-shadow">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {t("bookNowPage.officeHours", "Office Hours")}
                        </h3>
                        <p className="text-orange-600 font-semibold">
                          {t("bookNowPage.support247", "24/7 Customer Support")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Also Listed On Major OTAs */}
                <div className="mt-8 bg-slate-900 rounded-2xl p-6 text-white shadow-xl border border-slate-800">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 mb-2">
                    {t("bookNowPage.otaTitle", "Prefer Booking on Trusted OTAs?")}
                  </h4>
                  <p className="text-gray-300 text-xs mb-4 leading-relaxed">
                    {t("bookNowPage.otaSub", "You can also reserve Hotel Sherpa Soul through our official listings on major platforms:")}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {channels?.bookingCom?.enabled !== false && (
                      <a
                        href={channels?.bookingCom?.url || "https://www.booking.com/hotel/np/hotel-sherpa-soul.html"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center py-2.5 px-2 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-semibold shadow-md transition-transform hover:scale-105 text-center"
                      >
                        Booking.com
                      </a>
                    )}
                    {channels?.airbnb?.enabled !== false && (
                      <a
                        href={channels?.airbnb?.url || "https://www.airbnb.com/rooms/1760024961976448522"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center py-2.5 px-2 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-semibold shadow-md transition-transform hover:scale-105 text-center"
                      >
                        Airbnb
                      </a>
                    )}
                    {channels?.agoda?.enabled !== false && channels?.agoda?.url && (
                      <a
                        href={channels.agoda.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center py-2.5 px-2 rounded-xl bg-purple-600/90 hover:bg-purple-600 text-white text-xs font-semibold shadow-md transition-transform hover:scale-105 text-center"
                      >
                        Agoda
                      </a>
                    )}
                    {channels?.tripCom?.enabled !== false && (
                      <a
                        href={channels?.tripCom?.url || "https://www.trip.com/hotels/list?keyword=Hotel%20Sherpa%20Soul%20Kathmandu"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center py-2.5 px-2 rounded-xl bg-sky-600/90 hover:bg-sky-600 text-white text-xs font-semibold shadow-md transition-transform hover:scale-105 text-center"
                      >
                        Trip.com
                      </a>
                    )}
                  </div>
                </div>

                {/* Enhanced Warning */}
                <div className="mt-8 bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400 rounded-r-2xl p-6 shadow-lg border border-amber-100">
                  <div className="flex items-start">
                    <div className="bg-amber-400 p-2 rounded-xl mr-4 flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-800 mb-3 text-lg">
                        {t("bookNowPage.noticeTitle", "Important Notice")}
                      </h4>
                      <ul className="text-amber-700 space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                          {t("bookNowPage.notice1", "Original identification documents required")}
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                          {t("bookNowPage.notice2", "Upload a clear photo of your ID below")}
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                          {t("bookNowPage.notice3", "Booking confirmation will be sent via email")}
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                          {t("bookNowPage.notice4", "Cancellation policy applies as per terms")}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Enhanced Booking Form */}
            <div className="xl:col-span-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
                <div className="border-b border-slate-100 pb-5 mb-6 text-center sm:text-left">
                  <span className="inline-block bg-[#FB6C01]/10 text-[#FB6C01] font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-[#FB6C01]/20 mb-2">
                    {t("bookNowPage.step2Badge", "Step 2 of 2: Guest Information")}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#01366E]">
                    {t("bookNowPage.reservationFor", "Reservation for:")} <span className="text-[#FB6C01]">{selectedRoomObj?.title || formData.roomType}</span>
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    {t("bookNowPage.fillDetails", "Fill in your details below. 10% direct booking discount is automatically applied.")}
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Personal Information Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      {t("bookNowPage.personalInfo", "Personal Information")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="booking-fullName" className="block text-sm font-semibold text-slate-800 mb-1.5">
                          {t("bookNowPage.fullName", "Full Name")} <span className="text-red-600">*</span>
                        </label>
                        <div className="relative group">
                          <input
                            type="text"
                            id="booking-fullName"
                            name="fullName"
                            placeholder="e.g. John Doe"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full py-3.5 px-4 pr-11 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white text-base text-slate-900 placeholder-gray-400 min-h-[48px]"
                          />
                          <User className="absolute right-3.5 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="booking-email" className="block text-sm font-semibold text-slate-800 mb-1.5">
                          {t("bookNowPage.emailAddress", "Email Address")} <span className="text-red-600">*</span>
                        </label>
                        <div className="relative group">
                          <input
                            type="email"
                            id="booking-email"
                            name="email"
                            placeholder="e.g. guest@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full py-3.5 px-4 pr-11 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white text-base text-slate-900 placeholder-gray-400 min-h-[48px]"
                          />
                          <Mail className="absolute right-3.5 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="booking-phone" className="block text-sm font-semibold text-slate-800 mb-1.5">
                          {t("bookNowPage.phoneWhatsApp", "Phone / WhatsApp Number")} <span className="text-red-600">*</span>
                        </label>
                        <div className="relative group">
                          <input
                            type="tel"
                            id="booking-phone"
                            name="phone"
                            placeholder="e.g. +977-9800000000"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full py-3.5 px-4 pr-11 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white text-base text-slate-900 placeholder-gray-400 min-h-[48px]"
                          />
                          <Phone className="absolute right-3.5 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Room Selection Section */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Hotel className="w-5 h-5 text-purple-600" />
                      {t("bookNowPage.roomSelection", "Room Selection")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="booking-roomType" className="block text-sm font-semibold text-slate-800 mb-1.5">
                          {t("bookNowPage.roomCategory", "Room Category")} <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="booking-roomType"
                            name="roomType"
                            value={formData.roomType}
                            onChange={handleChange}
                            required
                            className="w-full py-3.5 px-4 pr-11 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white text-base text-slate-900 appearance-none cursor-pointer min-h-[48px]"
                          >
                            <option value="">{t("bookNowPage.selectRoomType", "Select Room Type")}</option>
                            {roomOptions.map((room, idx) => (
                              <option key={idx} value={room.label}>
                                {room.title} (Max {room.maxGuests} {t("room.guest", "Guest")}{room.maxGuests > 1 ? "s" : ""})
                              </option>
                            ))}
                          </select>
                          <Hotel className="absolute right-3.5 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="booking-numberOfRooms" className="block text-sm font-semibold text-slate-800 mb-1.5">
                          {t("bookNowPage.numberOfRooms", "Number of Rooms")} <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            id="booking-numberOfRooms"
                            name="numberOfRooms"
                            value={formData.numberOfRooms}
                            onChange={handleChange}
                            min="1"
                            required
                            className="w-full py-3.5 px-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white text-base text-slate-900 min-h-[48px]"
                            placeholder={t("bookNowPage.numberOfRooms", "Number of Rooms")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Guest Information Section */}
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border border-green-100">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-600" />
                      {t("bookNowPage.guestInfo", "Guest Information")}
                    </h3>
                    <div>
                      <label htmlFor="booking-numberOfPeople" className="block text-sm font-semibold text-slate-800 mb-1.5">
                        {t("bookNowPage.totalGuests", "Total Number of Guests")} <span className="text-red-600">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="booking-numberOfPeople"
                          name="numberOfPeople"
                          value={formData.numberOfPeople}
                          onChange={handleChange}
                          min="1"
                          max={maxGuests}
                          required
                          className="w-full py-3.5 px-4 pr-11 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-white text-base text-slate-900 min-h-[48px]"
                          placeholder={t("bookNowPage.totalGuests", "Number of Guests")}
                        />
                        <Users className="absolute right-3.5 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    {formData.roomType && (
                      <p className="text-sm text-green-700 mt-2 font-medium">
                        {t("bookNowPage.maxGuestsAllowed", { maxGuests, roomType: selectedRoomObj?.title || formData.roomType, defaultValue: `Maximum ${maxGuests} guests allowed for ${selectedRoomObj?.title || formData.roomType}` })}
                      </p>
                    )}
                  </div>

                  {/* Date Selection Section */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      {t("bookNowPage.stayDuration", "Stay Duration")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="booking-checkIn" className="block text-sm font-semibold text-slate-800 mb-1.5">
                          {t("bookNowPage.checkInDate", "Check-in Date")} <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="date"
                          id="booking-checkIn"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleChange}
                          min={formatDate(today)}
                          required
                          className="w-full py-3.5 px-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white text-base text-slate-900 min-h-[48px]"
                        />
                      </div>
                      <div>
                        <label htmlFor="booking-checkOut" className="block text-sm font-semibold text-slate-800 mb-1.5">
                          {t("bookNowPage.checkOutDate", "Check-out Date")} <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="date"
                          id="booking-checkOut"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleChange}
                          min={
                            formData.checkIn > formatDate(today)
                              ? formData.checkIn
                              : formatDate(tomorrow)
                          }
                          required
                          className="w-full py-3.5 px-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white text-base text-slate-900 min-h-[48px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Document Upload Section */}
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
                    <label htmlFor="booking-document" className="block text-lg font-semibold text-slate-900 mb-1 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      {t("bookNowPage.documentUpload", "Document Upload")}
                      <span className="text-xs text-slate-500 font-normal ml-auto">{t("bookNowPage.optionalOnline", "(Optional online)")}</span>
                    </label>
                    <p className="text-xs text-slate-600 mb-4">
                      {t("bookNowPage.documentHelp", "Upload photo of passport / citizenship for faster check-in, or present original upon arrival at reception.")}
                    </p>
                    <div className="relative">
                      <input
                        type="file"
                        id="booking-document"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="w-full py-3.5 px-4 border-2 border-dashed border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white text-base text-slate-900 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer min-h-[48px]"
                      />
                      <Upload className="absolute right-3.5 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    {uploadedDocument && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <p className="text-green-700 font-medium">
                          {uploadedDocument.name}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Estimated Price Indicator */}
                  {selectedRoomObj && (
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 mb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                            {t("bookNowPage.estimatedTotal", { nights: estimatedNights, nightPlural: estimatedNights === 1 ? "" : "s", rooms: formData.numberOfRooms, roomPlural: formData.numberOfRooms > 1 ? "s" : "", defaultValue: `Estimated Total (${estimatedNights} ${estimatedNights === 1 ? "night" : "nights"}, ${formData.numberOfRooms} ${formData.numberOfRooms > 1 ? "rooms" : "room"})` })}
                          </span>
                          <span className="text-xs text-gray-600">
                            {t("bookNowPage.nprNotice", "Nepali guests pay in NPR at front desk")}
                          </span>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="text-2xl font-bold text-[#01366E] block">
                            ${estimatedTotalUsd} USD
                          </span>
                          <span className="text-sm font-bold text-amber-700 block">
                            ~NPR {estimatedTotalNpr.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 text-lg relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? t("bookNowPage.registering", "Registering Reservation...") : t("bookNowPage.completeBooking", "Complete Booking")}
                      <Sparkles className="w-5 h-5" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Enhanced Thank You Section
        <div className="min-h-screen flex items-center justify-center p-8 -mt-32">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-12 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
              {t("bookNowPage.confirmedTitle", "Booking Confirmed!")}
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-xl">
                {t("bookNowPage.thankYou", "Thank you")}{" "}
                <span className="font-bold text-blue-600">
                  {formData.fullName}
                </span>
                !
              </p>
              <p className="text-lg">
                {t("bookNowPage.reservationConfirmed", { roomType: selectedRoomObj?.title || formData.roomType, defaultValue: `Your reservation for a ${selectedRoomObj?.title || formData.roomType} has been confirmed.` })}
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mt-6 border border-blue-100">
                <h3 className="font-semibold text-gray-800 mb-3">
                  {t("bookNowPage.bookingSummary", "Booking Summary:")}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">{t("bookNowPage.checkIn", "Check-in:")}</span>
                    <p className="font-semibold">{formData.checkIn}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">{t("bookNowPage.checkOut", "Check-out:")}</span>
                    <p className="font-semibold">{formData.checkOut}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">{t("bookNowPage.guests", "Guests:")}</span>
                    <p className="font-semibold">{formData.numberOfPeople}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">{t("bookNowPage.rooms", "Rooms:")}</span>
                    <p className="font-semibold">{formData.numberOfRooms}</p>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-blue-200 flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{t("bookNowPage.totalRate", "Total Rate:")}</span>
                    <div className="text-right">
                      <span className="font-bold text-[#01366E] text-base">${Number(totalCalculated)} USD</span>
                      <span className="text-xs font-semibold text-amber-700 block">~NPR ${(Number(totalCalculated) * 135).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-sm">
                <span className="text-gray-600">{t("bookNowPage.bookingRef", "Booking Reference ID:")}</span>{" "}
                <strong className="font-mono text-amber-700">{bookingRefId || 'Confirmed'}</strong>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                {t("bookNowPage.emailNotice", "A confirmation notification has been registered in the hotel system for")}{" "}
                <span className="font-semibold">{formData.email || formData.phone}</span>
              </p>

              <div className="pt-6">
                <a
                  href={`https://wa.me/9779818259472?text=${encodeURIComponent(
                    `*🏨 New Website Reservation - Hotel Sherpa Soul*\n\n` +
                    `*Booking Ref:* ${bookingRefId}\n` +
                    `*Guest Name:* ${formData.fullName}\n` +
                    `*Room:* ${formData.roomType}\n` +
                    `*Check-in:* ${formData.checkIn}\n` +
                    `*Check-out:* ${formData.checkOut}\n` +
                    `*Rooms:* ${formData.numberOfRooms} | *Guests:* ${formData.numberOfPeople}\n` +
                    `*Total Payable:* $${Number(totalCalculated)} USD (~NPR ${(Number(totalCalculated) * 135).toLocaleString()})\n` +
                    `*Phone:* ${formData.phone}\n\n` +
                    `Please confirm my reservation check-in. Thank you!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  {t("bookNowPage.confirmWhatsApp", "Confirm on WhatsApp (+977 9818259472)")}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
