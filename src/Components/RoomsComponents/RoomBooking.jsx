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
  Star,
  Shield,
  Clock,
} from "lucide-react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import api from "../Utils/api";

export default function BookingForm() {
  const [t] = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  // Room data
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    roomType: "",
    numberOfGuests: 1,
    checkIn: "",
    checkOut: "",
    numberOfRooms: 1,
  });

  // File upload state
  const [idVerificationImages, setIdVerificationImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  // Form state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch room details
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await api.get(`/get-room/${id}`);
        if (response.data.success) {
          const roomData = response.data.oneRoom;
          console.log(roomData);
          setRoom(roomData);

          // Set default roomType in formData
          setFormData((prev) => ({
            ...prev,
            roomType: roomData.name || "", // or use roomData.roomType if available
            availableRooms: roomData.availableRooms,
          }));
        }
      } catch (error) {
        console.error("Error fetching room details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  // Calculate total price and update guest limits when room number changes
  useEffect(() => {
    if (room && formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const nights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );

      if (nights > 0) {
        setTotalPrice(nights * room.price * formData.numberOfRooms);
      }
    }

    // Auto-adjust number of guests if it exceeds the new room capacity
    if (room && formData.numberOfRooms) {
      const maxAllowedGuests = (room.guests || 0) * formData.numberOfRooms;
      if (formData.numberOfGuests > maxAllowedGuests && maxAllowedGuests > 0) {
        setFormData((prev) => ({
          ...prev,
          numberOfGuests: maxAllowedGuests,
        }));
      }
    }
  }, [room, formData.checkIn, formData.checkOut, formData.numberOfRooms]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = type === "number" ? parseInt(value) || 0 : value;

    // Additional validation for numberOfGuests to not exceed room capacity
    if (name === "numberOfGuests" && room) {
      const maxAllowed = (room.guests || 0) * (formData.numberOfRooms || 1);
      if (newValue > maxAllowed) {
        newValue = maxAllowed;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle file upload
  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert(`File ${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      if (!file.type.startsWith("image/")) {
        alert(`File ${file.name} is not an image.`);
        return false;
      }
      return true;
    });

    setIdVerificationImages((prev) => [...prev, ...newFiles]);
  };

  const getTomorrow = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  // Handle drag and drop
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

  // Remove uploaded file
  const removeFile = (index) => {
    setIdVerificationImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
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
    if (!formData.roomType) newErrors.roomType = "Room type is required";
    if (!formData.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!formData.checkOut) newErrors.checkOut = "Check-out date is required";

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
    if (idVerificationImages.length === 0) {
      newErrors.idVerificationImages = "ID verification images are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Append form fields
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      // Append room ID
      submitData.append("room", id);

      // Append ID verification images
      idVerificationImages.forEach((file, index) => {
        submitData.append("idVerificationImages", file);
      });

      // Add room snapshot data
      if (room) {
        submitData.append(
          "roomSnapshot",
          JSON.stringify({
            name: room.name,
            size: room.size,
            beds: room.beds,
            price: room.price,
            image: room.image,
          })
        );
      }

      const response = await api.post(`/book/${id}`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("Booking created successfully!");
        navigate("/bookings"); // Navigate to bookings page or confirmation page
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Error creating booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading room details...</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {t("book.title2")}
                </h2>
                <p className="text-gray-600">{t("book.subtitle")}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
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

                {/* Room & Stay Details */}
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
                        {t("book.form.guests")} * (Max:{" "}
                        {(room.guests || 0) * (formData.numberOfRooms || 1)} for{" "}
                        {formData.numberOfRooms} room
                        {formData.numberOfRooms > 1 ? "s" : ""})
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
                                ) // check-in + 1 day
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
                        {t("book.form.noroom")} * (Rooms Available :{" "}
                        {formData.availableRooms})
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

                {/* ID Verification */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-amber-600" />
                    {t("book.form.id")} *
                  </h3>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      {t("book.form.idDet")}
                    </p>

                    {/* File Upload Area */}
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

                    {/* Uploaded Files */}
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

                {/* Submit Button */}
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

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {t("book.summary.title")}
                </h3>

                {/* Room Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex gap-4">
                    <img
                      src={room.image?.[0]?.url || "/placeholder-room.jpg"}
                      alt={room.name}
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

                {/* Booking Details */}
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
                      {t("book.form.checkin")}:
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
                  {formData.checkIn && formData.checkOut && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nights:</span>
                      <span className="font-medium">
                        {Math.ceil(
                          (new Date(formData.checkOut) -
                            new Date(formData.checkIn)) /
                            (1000 * 60 * 60 * 24)
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("book.rate")}:</span>
                    <span>$ {room.price}</span>
                  </div>
                  {formData.numberOfRooms > 1 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        × {formData.numberOfRooms} rooms:
                      </span>
                      <span>$ {room.price * formData.numberOfRooms}</span>
                    </div>
                  )}
                  {totalPrice > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        ×{" "}
                        {Math.ceil(
                          (new Date(formData.checkOut) -
                            new Date(formData.checkIn)) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        nights:
                      </span>
                      <span>$ {totalPrice}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-amber-600">
                      $ {totalPrice || room.price}
                    </span>
                  </div>
                </div>

                {/* Policies */}
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

                {/* Security Notice */}
                {/* <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      Secure Booking
                    </span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Your personal information is encrypted and secure. We never
                    share your data with third parties.
                  </p>
                </div> */}

                {/* Contact Info */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 mb-2">Need help?</p>
                  <div className="flex items-center justify-center gap-4 text-xs">
                    <a
                      href="tel:+977-1-234-5678"
                      className="flex items-center gap-1 text-amber-600 hover:text-amber-700"
                    >
                      <Phone className="w-3 h-3" />
                      Call Support
                    </a>
                    <a
                      href="mailto:support@hotel.com"
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
        </div>
      </div>
    </div>
  );
}
