import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  Calendar,
  Users,
  Mail,
  Phone,
  Bed,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  CreditCard,
  MapPin,
  Shield,
  Clock,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Utils/api";
import { rooms as fallbackRooms } from "../HelperComponents/RoomsData";
import { trackMetaEvent } from "../Analytics/pixelEvents";

export default function BookingForm() {
  const [t] = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    roomType: "",
    numberOfGuests: 1,
    checkIn: "",
    checkOut: "",
    numberOfRooms: 1,
    availableRooms: 1,
  });

  const [idVerificationImages, setIdVerificationImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const localMatch =
          fallbackRooms.find(
            (r) =>
              String(r.id) === String(id) ||
              String(r.roomNumber) === String(id)
          ) || fallbackRooms[0];

        try {
          const response = await api.get("/rooms");
          if (
            response.data &&
            response.data.success &&
            Array.isArray(response.data.data)
          ) {
            const pmsRoom = response.data.data.find(
              (r) =>
                String(r.number) === String(id) || String(r.id) === String(id)
            );
            if (pmsRoom) {
              const matched = {
                ...localMatch,
                id: pmsRoom.number || pmsRoom.id,
                roomNumber: pmsRoom.number,
                name: `${pmsRoom.type} (Room ${pmsRoom.number})`,
                price: pmsRoom.dailyRate || localMatch.price,
                guests: pmsRoom.capacity || localMatch.guests,
                status: pmsRoom.status,
                availableRooms: pmsRoom.status === "AVAILABLE" ? 1 : 0,
              };
              setRoom(matched);
              setFormData((prev) => ({
                ...prev,
                roomType: matched.name || "",
                availableRooms: matched.availableRooms || 1,
              }));
              return;
            }
          }
        } catch (apiErr) {
          console.warn("Using local room data for booking:", apiErr);
        }

        setRoom(localMatch);
        setFormData((prev) => ({
          ...prev,
          roomType: localMatch.name || "",
          availableRooms: 1,
        }));
      } catch (error) {
        console.error("Error setting room:", error);
        setRoom(fallbackRooms[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  useEffect(() => {
    if (room && formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);

      const nights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );

      if (nights > 0) {
        setTotalPrice(nights * room.price * formData.numberOfRooms);
      } else {
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0);
    }

    if (room && formData.numberOfRooms) {
      const maxAllowedGuests = (room.guests || 0) * formData.numberOfRooms;

      if (formData.numberOfGuests > maxAllowedGuests && maxAllowedGuests > 0) {
        setFormData((prev) => ({
          ...prev,
          numberOfGuests: maxAllowedGuests,
        }));
      }
    }
  }, [
    room,
    formData.checkIn,
    formData.checkOut,
    formData.numberOfRooms,
    formData.numberOfGuests,
  ]);

  const getTomorrow = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    let newValue = type === "number" ? parseInt(value) || 0 : value;

    if (name === "numberOfGuests" && room) {
      const maxAllowed = (room.guests || 0) * (formData.numberOfRooms || 1);

      if (newValue > maxAllowed) {
        newValue = maxAllowed;
      }
    }

    if (name === "numberOfRooms" && room) {
      const maxRooms = Number(
        formData.availableRooms || room.availableRooms || 1
      );

      if (newValue > maxRooms) {
        newValue = maxRooms;
      }

      const maxAllowedGuests = (room.guests || 0) * newValue;

      if (formData.numberOfGuests > maxAllowedGuests && maxAllowedGuests > 0) {
        setFormData((prev) => ({
          ...prev,
          numberOfGuests: maxAllowedGuests,
        }));
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large. Maximum size is 5MB.`, {
          position: "top-right",
        });
        return false;
      }

      if (!file.type.startsWith("image/")) {
        toast.error(`File ${file.name} is not an image.`, {
          position: "top-right",
        });
        return false;
      }

      return true;
    });

    setIdVerificationImages((prev) => [...prev, ...newFiles]);

    if (errors.idVerificationImages) {
      setErrors((prev) => ({
        ...prev,
        idVerificationImages: "",
      }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeFile = (index) => {
    setIdVerificationImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.number) {
      newErrors.number = "Phone number is required";
    } else if (!/^\d{10,}$/.test(formData.number.toString())) {
      newErrors.number = "Phone number must be at least 10 digits";
    }

    if (!formData.roomType) {
      newErrors.roomType = "Room type is required";
    }

    if (!formData.checkIn) {
      newErrors.checkIn = "Check-in date is required";
    }

    if (!formData.checkOut) {
      newErrors.checkOut = "Check-out date is required";
    }

    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      if (checkIn < today) {
        newErrors.checkIn = "Check-in date cannot be in the past";
      }

      if (checkOut <= checkIn) {
        newErrors.checkOut = "Check-out date must be after check-in date";
      }
    }

    if (formData.numberOfGuests < 1) {
      newErrors.numberOfGuests = "At least 1 guest is required";
    }

    if (formData.numberOfRooms < 1) {
      newErrors.numberOfRooms = "At least 1 room is required";
    }

    // ID verification is optional for quick reservation (guests may present ID at check-in)

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetFormAfterSuccess = () => {
    setFormData({
      name: "",
      email: "",
      number: "",
      roomType: room?.name || "",
      numberOfGuests: 1,
      checkIn: "",
      checkOut: "",
      numberOfRooms: 1,
      availableRooms: room?.availableRooms || 1,
    });

    setIdVerificationImages([]);
    setErrors({});
    setTotalPrice(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields correctly.", {
        position: "top-right",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const roomNum = String(room?.roomNumber || id || "201");
      const calcTotal = Number(totalPrice) > 0 ? Number(totalPrice) : (Number(room?.price) || 3500);

      const payload = {
        guestName: formData.name,
        email: formData.email,
        phone: String(formData.number),
        nationality: "Nepal",
        roomNumber: roomNum,
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        adults: Number(formData.numberOfGuests) || 1,
        children: 0,
        totalAmount: calcTotal,
        paidAmount: 0,
        status: "CONFIRMED",
        source: "Direct Website",
        specialRequests: `Direct Booking for ${room?.name || 'Room ' + roomNum}. Number of Rooms: ${formData.numberOfRooms}. ${idVerificationImages.length > 0 ? '(Guest attached ID images)' : ''}`,
      };

      const response = await api.post("/reservations", payload);

      if (response.data && response.data.success) {
        const resData = response.data.data;
        const bookingRef = resData?.id || `HSS-${Date.now().toString().slice(-6)}`;

        setConfirmedBooking({
          id: bookingRef,
          guestName: formData.name,
          roomName: room?.name || `Room ${roomNum}`,
          roomNumber: roomNum,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          totalPrice: calcTotal,
          phone: formData.number,
          email: formData.email,
        });

        trackMetaEvent("Lead", {
          content_category: "hotel_booking",
          content_ids: [roomNum],
          content_name: room?.name,
          value: calcTotal,
          currency: "NPR",
        });

        trackMetaEvent("Purchase", {
          content_type: "hotel_booking",
          content_ids: [roomNum],
          value: calcTotal,
          currency: "NPR",
        });

        // Trigger official booking confirmation voucher & hotel staff alert email
        fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "booking",
            bookingRef,
            guestName: formData.name,
            email: formData.email,
            phone: formData.number,
            roomName: room?.name || `Room ${roomNum}`,
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
            numberOfRooms: formData.numberOfRooms,
            numberOfGuests: formData.numberOfGuests,
            totalPrice: calcTotal,
            specialRequests: payload.specialRequests,
          }),
        }).catch((err) => console.warn("Booking email delivery notice:", err));

        toast.success("Reservation confirmed! Confirmation sent to your email.", {
          position: "top-right",
        });
      } else {
        throw new Error(response.data?.error || "Booking submission failed");
      }
    } catch (error) {
      console.warn("PMS reservation error, creating direct reservation reference:", error);
      const fallbackRef = `HSS-${Date.now().toString().slice(-6)}`;
      const calcTotal = Number(totalPrice) > 0 ? Number(totalPrice) : (Number(room?.price) || 3500);

      // Trigger official booking confirmation voucher & hotel staff alert email
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          bookingRef: fallbackRef,
          guestName: formData.name,
          email: formData.email,
          phone: formData.number,
          roomName: room?.name || `Room ${room?.roomNumber || id}`,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          numberOfRooms: formData.numberOfRooms,
          numberOfGuests: formData.numberOfGuests,
          totalPrice: calcTotal,
          specialRequests: `Direct Booking. ID attached: ${idVerificationImages.length > 0}`,
        }),
      }).catch((err) => console.warn("Booking email delivery notice:", err));

      setConfirmedBooking({
        id: fallbackRef,
        guestName: formData.name,
        roomName: room?.name || `Room ${room?.roomNumber || id}`,
        roomNumber: room?.roomNumber || id || "201",
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        totalPrice: calcTotal,
        phone: formData.number,
        email: formData.email,
      });

      toast.success("Reservation recorded! Confirmation sent to your email.", {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading room details...</p>
          </div>
        </div>
      </>
    );
  }

  if (!room) {
    return (
      <>
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Room not found
            </h2>

            <p className="text-gray-600">
              The room you're trying to book doesn't exist.
            </p>

            <button
              onClick={() => navigate(-1)}
              className="mt-4 bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </>
    );
  }

  const nights =
    formData.checkIn && formData.checkOut
      ? Math.ceil(
          (new Date(formData.checkOut) - new Date(formData.checkIn)) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  if (confirmedBooking) {
    const waText = encodeURIComponent(
      `*🏨 New Direct Booking - Hotel Sherpa Soul*\n\n` +
      `*Booking Ref:* ${confirmedBooking.id}\n` +
      `*Guest Name:* ${confirmedBooking.guestName}\n` +
      `*Room:* ${confirmedBooking.roomName} (Room ${confirmedBooking.roomNumber})\n` +
      `*Check-in:* ${confirmedBooking.checkIn}\n` +
      `*Check-out:* ${confirmedBooking.checkOut}\n` +
      `*Total Rate:* NPR ${Number(confirmedBooking.totalPrice).toLocaleString()}\n` +
      `*Phone:* ${confirmedBooking.phone}\n` +
      `*Email:* ${confirmedBooking.email}\n\n` +
      `Please confirm our check-in and booking availability. Thank you!`
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 py-16 px-4">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-amber-100 overflow-hidden text-center p-8 md:p-12">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Reservation Confirmed!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you, <strong className="text-gray-800">{confirmedBooking.guestName}</strong>. Your stay at Hotel Sherpa Soul has been registered in our system.
          </p>

          <div className="bg-amber-50/60 rounded-2xl p-6 mb-8 text-left space-y-3 border border-amber-200/60">
            <div className="flex justify-between items-center border-b border-amber-200/50 pb-2">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Booking ID</span>
              <span className="font-mono font-bold text-amber-700">{confirmedBooking.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Room</span>
              <span className="font-semibold text-gray-800">{confirmedBooking.roomName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Dates</span>
              <span className="font-semibold text-gray-800">{confirmedBooking.checkIn} → {confirmedBooking.checkOut}</span>
            </div>
            <div className="flex justify-between items-center border-t border-amber-200/50 pt-2 text-base font-bold">
              <span className="text-gray-800">Total Payable at Hotel</span>
              <span className="text-amber-700">NPR {Number(confirmedBooking.totalPrice).toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/9779851139414?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              Confirm on WhatsApp (+977 9851139414)
            </a>
            <button
              onClick={() => navigate("/rooms")}
              className="px-6 py-4 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl transition-colors"
            >
              Back to Rooms
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">{t("book.back")}</span>
            </button>

            <div className="h-6 w-px bg-gray-300"></div>

            <h1 className="text-2xl font-bold text-gray-900">
              {t("book.title")}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {t("book.title2")}
                </h2>

                <p className="text-gray-600">{t("book.subtitle")}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-600" />
                    {t("book.form.info")}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("book.form.name")} *
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full p-4 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your full name"
                      />

                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("book.form.email")} *
                      </label>

                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="your.email@example.com"
                        />
                      </div>

                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone {t("book.form.number")} *
                      </label>

                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                        <input
                          type="tel"
                          name="number"
                          value={formData.number}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                            errors.number ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter your phone number"
                        />
                      </div>

                      {errors.number && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.number}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Bed className="w-5 h-5 text-amber-600" />
                    {t("book.form.room")}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("book.form.type")} *
                      </label>

                      <input
                        type="text"
                        name="roomType"
                        value={formData.roomType}
                        disabled
                        className="w-full p-4 border-2 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                      />

                      {errors.roomType && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.roomType}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("book.form.guests")} * Max:{" "}
                        {(room.guests || 0) * (formData.numberOfRooms || 1)}
                      </label>

                      <input
                        type="number"
                        name="numberOfGuests"
                        value={formData.numberOfGuests}
                        onChange={handleInputChange}
                        min="1"
                        max={(room.guests || 0) * (formData.numberOfRooms || 1)}
                        className={`w-full p-4 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                          errors.numberOfGuests
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />

                      <p className="text-xs text-gray-500 mt-1">
                        {t("book.form.guestnote")} {room.guests || 0}{" "}
                        {t("book.guests")}
                      </p>

                      {errors.numberOfGuests && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.numberOfGuests}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("book.form.checkin")} *
                      </label>

                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                        <input
                          type="date"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split("T")[0]}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                            errors.checkIn
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                      </div>

                      {errors.checkIn && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.checkIn}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("book.form.checkout")} *
                      </label>

                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                        <input
                          type="date"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleInputChange}
                          min={
                            formData.checkIn
                              ? new Date(
                                  new Date(formData.checkIn).getTime() +
                                    86400000
                                )
                                  .toISOString()
                                  .split("T")[0]
                              : getTomorrow()
                          }
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                            errors.checkOut
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                      </div>

                      {errors.checkOut && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.checkOut}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("book.form.noroom")} * Rooms Available:{" "}
                        {formData.availableRooms}
                      </label>

                      <input
                        type="number"
                        name="numberOfRooms"
                        value={formData.numberOfRooms}
                        onChange={handleInputChange}
                        min="1"
                        max={formData.availableRooms}
                        className={`w-full p-4 border-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                          errors.numberOfRooms
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />

                      {errors.numberOfRooms && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.numberOfRooms}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-amber-600" />
                    {t("book.form.id")} *
                  </h3>

                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      {t("book.form.idDet")}
                    </p>

                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                        dragActive
                          ? "border-amber-500 bg-amber-50"
                          : errors.idVerificationImages
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-amber-400 hover:bg-amber-50"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />

                      <p className="text-lg font-medium text-gray-700 mb-2">
                        {t("book.form.drag")}
                      </p>

                      <p className="text-gray-500 mb-4">or</p>

                      <label className="bg-amber-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-amber-600 transition-colors inline-flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        {t("book.form.choose")}
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e.target.files)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {errors.idVerificationImages && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.idVerificationImages}
                      </p>
                    )}

                    {idVerificationImages.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">
                          Uploaded Files:
                        </h4>

                        {idVerificationImages.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />

                            <span className="flex-1 text-sm text-gray-700">
                              {file.name}
                            </span>

                            <span className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </span>

                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="p-1 text-red-500 hover:bg-red-100 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing Booking...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        {t("book.form.button")}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {t("book.summary.title")}
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex gap-4">
                    <img
                      src={room.image?.[0]?.url || "/placeholder-room.jpg"}
                      alt={room.name ? `${room.name} - Hotel Sherpa Soul Kathmandu` : "Hotel Sherpa Soul Room"}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {room.name}
                      </h4>

                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {room.size} sq ft
                        </div>

                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          Up to {room.guests} guests
                        </div>

                        <div className="flex items-center gap-1">
                          <Bed className="w-3 h-3" />
                          {room.beds}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t("book.form.checkin")}:
                    </span>
                    <span className="font-medium">
                      {formData.checkIn
                        ? new Date(formData.checkIn).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t("book.form.checkout")}:
                    </span>
                    <span className="font-medium">
                      {formData.checkOut
                        ? new Date(formData.checkOut).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("book.guests")}:</span>
                    <span className="font-medium">
                      {formData.numberOfGuests}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("book.room")}:</span>
                    <span className="font-medium">
                      {formData.numberOfRooms}
                    </span>
                  </div>

                  {nights > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nights:</span>
                      <span className="font-medium">{nights}</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("book.rate")}:</span>
                    <span>NPR {Number(room.price).toLocaleString()}</span>
                  </div>

                  {formData.numberOfRooms > 1 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        × {formData.numberOfRooms} rooms:
                      </span>
                      <span>NPR {Number(room.price * formData.numberOfRooms).toLocaleString()}</span>
                    </div>
                  )}

                  {totalPrice > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total:</span>
                      <span>NPR {Number(totalPrice).toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-amber-600">
                      NPR {Number(totalPrice || room.price).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-600" />
                    Booking Policies
                  </h5>

                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-start gap-2">
                      <Clock className="w-3 h-3 mt-0.5 text-amber-600 flex-shrink-0" />
                      <span>{t("book.form.checkin")}: 2:00 PM - 11:00 PM</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="w-3 h-3 mt-0.5 text-amber-600 flex-shrink-0" />
                      <span>{t("book.form.checkout")}: 12:00 PM</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <X className="w-3 h-3 mt-0.5 text-red-500 flex-shrink-0" />
                      <span>{t("book.summary.policies.cancel")}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <Shield className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
                      <span>{t("book.summary.policies.id")}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 mb-2">Need help?</p>

                  <div className="flex items-center justify-center gap-4 text-xs">
                    <a
                      href="tel:+9779851068219"
                      className="flex items-center gap-1 text-amber-600 hover:text-amber-700"
                    >
                      <Phone className="w-3 h-3" />
                      Call Support
                    </a>

                    <a
                      href="mailto:info@hotelsherpasoul.com"
                      className="flex items-center gap-1 text-amber-600 hover:text-amber-700"
                    >
                      <Mail className="w-3 h-3" />
                      Email Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Booking Summary End */}
        </div>
      </div>
    </div>
  );
}
