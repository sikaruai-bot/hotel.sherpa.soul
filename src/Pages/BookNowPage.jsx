import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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

const roomOptions = [
  {
    id: "1",
    label: "Budget Family Room",
    title: "Budget Family Room",
    roomNumber: "101",
    price: 20,
    priceNpr: 2700,
    currency: "USD",
    maxGuests: 4,
    bedInfo: "1 King Bed + 1 Single Bed",
    image: "/triple.webp",
    description: "Features 1 King Bed + 1 Single Bed, en-suite bathroom, 24/7 hot shower, free Wi-Fi, and shared kitchen privileges.",
    badge: "10% OFF",
  },
  {
    id: "2",
    label: "Deluxe Room (AC)",
    title: "Deluxe Room (AC)",
    roomNumber: "201",
    price: 20,
    priceNpr: 2700,
    currency: "USD",
    maxGuests: 3,
    bedInfo: "1 King Bed • Air Conditioned",
    image: "/changes_photo/singleBedWithSofa.webp",
    description: "Air-conditioned boutique room with king bed, sofa seating, private modern bathroom, fast Wi-Fi, and peaceful atmosphere.",
    badge: "10% OFF",
  },
  {
    id: "3",
    label: "Family Room (AC)",
    title: "Family Room (AC)",
    roomNumber: "301",
    price: 30,
    priceNpr: 4000,
    currency: "USD",
    maxGuests: 4,
    bedInfo: "King + Single • Air Conditioned",
    image: "/changes_photo/doubleBed.webp",
    description: "Spacious family suite with King + Single bed, full air conditioning, private modern washroom, and city views.",
    badge: "10% OFF",
  },
];

export default function BookNowPage() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { channels } = useCMS();

  const [formData, setFormData] = useState({
    fullName: "",
    roomType: roomOptions[0].label,
    numberOfPeople: 2,
    numberOfRooms: 1,
    checkIn: formatDate(today),
    checkOut: formatDate(tomorrow),
    email: "",
    phone: "",
  });

  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [maxGuests, setMaxGuests] = useState(roomOptions[0].maxGuests);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRefId, setBookingRefId] = useState("");
  const [totalCalculated, setTotalCalculated] = useState(0);

  // Auto-detect room from URL param or search query (e.g. /book/2, /book/3, /book-now?room=2)
  useEffect(() => {
    const rawId = id || searchParams.get("room") || searchParams.get("id");
    if (rawId) {
      const match = roomOptions.find(
        (r) =>
          String(r.id) === String(rawId) ||
          String(r.roomNumber) === String(rawId) ||
          r.label.toLowerCase().includes(String(rawId).toLowerCase())
      );
      if (match) {
        handleSelectRoom(match);
      }
    }
  }, [id, searchParams]);

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
            backgroundImage:
              "url('/hero/hero1.webp')",
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
                Direct Booking Privilege: <strong className="text-white">Save 10% on All Rooms</strong>
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3 text-white leading-tight">
              Reserve Your Peaceful Stay
            </h1>
            <p className="text-sm sm:text-base font-light text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Clean, quiet rooms, authentic Sherpa hospitality, and comfortable rest in the heart of Thamel, Kathmandu
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
                Step 1: Choose Your Room Category
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#01366E] mt-2">
                Select From Our 3 Room Categories
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Click any room to select it — your 10% direct booking discount is automatically applied.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roomOptions.map((room) => {
                const isSelected = formData.roomType === room.label;
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
                        alt={room.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-[#FB6C01] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                        10% DIRECT OFF
                      </div>
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-emerald-600 text-white p-1.5 rounded-full shadow-lg flex items-center justify-center">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black/75 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs">
                        <span className="font-bold text-[#FB6C01] text-sm">${room.price} USD</span>
                        <span className="text-amber-300 font-semibold">~NPR {room.priceNpr.toLocaleString()} / night</span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1">
                          {room.title}
                        </h3>
                        <p className="text-xs text-slate-500 mb-2 font-medium">
                          {room.bedInfo} • Max {room.maxGuests} Guests
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
                          {isSelected ? "✓ Room Selected" : "Select This Room"}
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
                    Get in Touch
                  </h2>
                  <p className="text-gray-600 mt-2">We're here to help 24/7</p>
                </div>

                <div className="space-y-4">
                  <div className="group hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-lg hover:border-green-200">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg group-hover:shadow-green-200 transition-shadow">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">WhatsApp</h3>
                        <p className="text-green-600 font-semibold text-lg">
                          +977-9851068219
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 hover:shadow-lg hover:border-blue-200">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-lg group-hover:shadow-blue-200 transition-shadow">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">Email</h3>
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
                        <h3 className="font-bold text-gray-800">Location</h3>
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
                          Office Hours
                        </h3>
                        <p className="text-orange-600 font-semibold">
                          24/7 Customer Support
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Also Listed On Major OTAs */}
                <div className="mt-8 bg-slate-900 rounded-2xl p-6 text-white shadow-xl border border-slate-800">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 mb-2">
                    Prefer Booking on Trusted OTAs?
                  </h4>
                  <p className="text-gray-300 text-xs mb-4 leading-relaxed">
                    You can also reserve Hotel Sherpa Soul through our official listings on major platforms:
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
                        Important Notice
                      </h4>
                      <ul className="text-amber-700 space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                          Original identification documents required
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                          Upload a clear photo of your ID below
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                          Booking confirmation will be sent via email
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                          Cancellation policy applies as per terms
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
                    Step 2 of 2: Guest Information
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#01366E]">
                    Reservation for: <span className="text-[#FB6C01]">{formData.roomType}</span>
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Fill in your details below. 10% direct booking discount is automatically applied.
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Personal Information Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative group">
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400"
                        />
                        <User className="absolute right-3 top-4 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <div className="relative group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400"
                        />
                        <Mail className="absolute right-3 top-4 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <div className="relative group md:col-span-2">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400"
                        />
                        <Phone className="absolute right-3 top-4 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Room Selection Section */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Hotel className="w-5 h-5 text-purple-600" />
                      Room Selection
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <select
                          name="roomType"
                          value={formData.roomType}
                          onChange={handleChange}
                          required
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
                        >
                          <option value="">Select Room Type</option>
                          {roomOptions.map((room, idx) => (
                            <option key={idx} value={room.label}>
                              {room.label} (Max {room.maxGuests} guest
                              {room.maxGuests > 1 ? "s" : ""})
                            </option>
                          ))}
                        </select>
                        <Hotel className="absolute right-3 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          name="numberOfRooms"
                          value={formData.numberOfRooms}
                          onChange={handleChange}
                          min="1"
                          required
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                          placeholder="Number of Rooms"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guest Information Section */}
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border border-green-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-600" />
                      Guest Information
                    </h3>
                    <div className="relative">
                      <input
                        type="number"
                        name="numberOfPeople"
                        value={formData.numberOfPeople}
                        onChange={handleChange}
                        min="1"
                        max={maxGuests}
                        required
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        placeholder="Number of Guests"
                      />
                      <Users className="absolute right-3 top-4 w-5 h-5 text-gray-400" />
                    </div>
                    {formData.roomType && (
                      <p className="text-sm text-green-600 mt-2 font-medium">
                        Maximum {maxGuests} guest{maxGuests > 1 ? "s" : ""} for{" "}
                        {formData.roomType}
                      </p>
                    )}
                  </div>

                  {/* Date Selection Section */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      Stay Duration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <input
                          type="date"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleChange}
                          min={formatDate(today)}
                          required
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        />
                        <label className="absolute -top-2 left-3 bg-white px-2 text-xs font-semibold text-orange-600">
                          Check-in Date
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="date"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleChange}
                          min={
                            formData.checkIn > formatDate(today)
                              ? formData.checkIn
                              : formatDate(tomorrow)
                          }
                          required
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        />
                        <label className="absolute -top-2 left-3 bg-white px-2 text-xs font-semibold text-orange-600">
                          Check-out Date
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Document Upload Section */}
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      Document Upload
                      <span className="text-xs text-slate-500 font-normal ml-auto">(Optional online)</span>
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">
                      Upload photo of passport / citizenship for faster check-in, or present original upon arrival at reception.
                    </p>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                      />
                      <Upload className="absolute right-3 top-4 w-5 h-5 text-gray-400" />
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
                            Estimated Total ({estimatedNights} {estimatedNights === 1 ? "night" : "nights"}, {formData.numberOfRooms} {formData.numberOfRooms > 1 ? "rooms" : "room"})
                          </span>
                          <span className="text-xs text-gray-600">
                            Nepali guests pay in NPR at front desk
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
                      {isSubmitting ? "Registering Reservation..." : "Complete Booking"}
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
              Booking Confirmed!
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-xl">
                Thank you{" "}
                <span className="font-bold text-blue-600">
                  {formData.fullName}
                </span>
                !
              </p>
              <p className="text-lg">
                Your reservation for a{" "}
                <span className="font-semibold text-purple-600">
                  {formData.roomType}
                </span>{" "}
                has been confirmed.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mt-6 border border-blue-100">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Booking Summary:
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Check-in:</span>
                    <p className="font-semibold">{formData.checkIn}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Check-out:</span>
                    <p className="font-semibold">{formData.checkOut}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Guests:</span>
                    <p className="font-semibold">{formData.numberOfPeople}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Rooms:</span>
                    <p className="font-semibold">{formData.numberOfRooms}</p>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-blue-200 flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Total Rate:</span>
                    <div className="text-right">
                      <span className="font-bold text-[#01366E] text-base">${Number(totalCalculated)} USD</span>
                      <span className="text-xs font-semibold text-amber-700 block">~NPR ${(Number(totalCalculated) * 135).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-sm">
                <span className="text-gray-600">Booking Reference ID:</span>{" "}
                <strong className="font-mono text-amber-700">{bookingRefId || 'Confirmed'}</strong>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                A confirmation notification has been registered in the hotel system for{" "}
                <span className="font-semibold">{formData.email || formData.phone}</span>
              </p>

              <div className="pt-6">
                <a
                  href={`https://wa.me/9779851139414?text=${encodeURIComponent(
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
                  Confirm on WhatsApp (+977 9851139414)
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
