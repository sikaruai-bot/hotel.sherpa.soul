import React, { useState } from "react";
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

const roomOptions = [
  { label: "Single Bed", maxGuests: 1 },
  { label: "Single Double Bed", maxGuests: 2 },
  { label: "Double Bed", maxGuests: 3 },
];

export default function BookNowPage() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    fullName: "",
    roomType: "",
    numberOfPeople: 1,
    numberOfRooms: 1,
    checkIn: formatDate(today),
    checkOut: formatDate(tomorrow),
    email: "",
    phone: "",
  });

  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [maxGuests, setMaxGuests] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "roomType") {
      const selectedRoom = roomOptions.find((room) => room.label === value);
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

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-indigo-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Animated floating elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute top-32 right-20 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-300/20 rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />

        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">Premium Experience</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              Reserve Your Perfect Stay
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Experience luxury and comfort in the heart of the city with our
              premium accommodations
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      {!submitted ? (
        <div className="max-w-7xl mx-auto px-4 py-16 -mt-32 relative z-10">
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
                          +1 (555) 123-4567
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
                          reservations@luxuryhotel.com
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
                          123 Luxury Avenue, City Center
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
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                    Booking Details
                  </h2>
                  <p className="text-gray-600">
                    Fill in your information to complete your reservation
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
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      Document Upload
                    </h3>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        required
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
                    <p className="text-sm text-gray-600 mt-2">
                      Upload a clear photo of your ID (JPEG, PNG) or PDF
                      document
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 text-lg relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center justify-center gap-2">
                      Complete Booking
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
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-6">
                A confirmation email has been sent to{" "}
                <span className="font-semibold">{formData.email}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
