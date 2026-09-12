import React from "react";
import { Link } from "react-router-dom";
import { Scale, Clock, CreditCard, Sparkles, AlertCircle, ArrowLeft, VolumeX } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[#01366E] hover:text-[#FB6C01] font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/80 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4">
            <Scale className="w-4 h-4 text-[#FB6C01]" /> Guest Agreement & Policies
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#01366E] tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Last Updated: September 12, 2026. Welcome to Hotel Sherpa Soul. By booking a room or using our website, you agree to the following terms and guidelines designed to ensure a peaceful, safe, and comfortable stay for all guests.
          </p>
        </div>

        {/* Terms Content Sections */}
        <div className="space-y-8 bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/80 text-slate-700 leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#01366E] flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-[#FB6C01]" /> 1. Check-In & Check-Out Times
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Check-in:</strong> Begins from 14:00 (2:00 PM) onwards. Early check-in is subject to room availability and prior arrangement.</li>
              <li><strong>Check-out:</strong> Until 12:00 (12:00 PM noon). Late check-out requests should be communicated with the front desk.</li>
              <li><strong>24/7 Front Desk:</strong> Our reception is staffed around the clock to accommodate late-night flight arrivals or early morning trekking departures.</li>
              <li><strong>Complimentary Luggage Storage:</strong> Trekkers embarking on Himalayan expeditions may securely store luggage before or after their trek free of charge.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#01366E] flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#FB6C01]" /> 2. Direct Booking Promotion (10% Discount)
            </h2>
            <p className="text-slate-600">
              Reservations confirmed directly through our website or direct WhatsApp receive an instant 10% discount from standard rack rates. Direct booking ensures:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Best rate guarantee without intermediary agency markups.</li>
              <li>Flexible cancellation communication directly with hotel management.</li>
              <li>Priority room allocation and complimentary luggage storage.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#01366E] flex items-center gap-2.5">
              <CreditCard className="w-5 h-5 text-[#FB6C01]" /> 3. Payment Methods & Rates
            </h2>
            <p className="text-slate-600">
              Rates are displayed in both USD ($) and Nepalese Rupees (~NPR). We accept:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Cash in major currencies: NPR, USD, EUR.</li>
              <li>Credit and Debit cards: Visa, MasterCard.</li>
              <li>Fonepay QR transfers and direct bank transfers for local travelers.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#01366E] flex items-center gap-2.5">
              <VolumeX className="w-5 h-5 text-[#FB6C01]" /> 4. Peaceful Stay Policy ("No Restaurant. No Noise.")
            </h2>
            <p className="text-slate-600">
              Hotel Sherpa Soul is intentionally designed as a calm sanctuary in lively Thamel. To guarantee rest for all guests:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Quiet hours are observed from 22:00 (10:00 PM) to 07:00 (7:00 AM).</li>
              <li>Smoking is strictly prohibited in all guest rooms and indoor corridors.</li>
              <li>Guests are welcome to use the shared self-kitchen responsibly, keeping cooking and dining spaces clean after use.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#01366E] flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-[#FB6C01]" /> 5. Inquiries & Support
            </h2>
            <p className="text-slate-600">
              If you have any questions regarding your booking, dates, or terms, please contact our 24/7 team:
            </p>
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-sm space-y-1">
              <p><strong>Hotel Sherpa Soul</strong></p>
              <p>Address: Thamel Bhagawati Marg 26, Kathmandu, Nepal</p>
              <p>Email: <a href="mailto:info@hotelsherpasoul.com" className="text-[#FB6C01] hover:underline font-semibold">info@hotelsherpasoul.com</a></p>
              <p>WhatsApp / Phone: <a href="tel:+9779851068219" className="text-[#FB6C01] hover:underline font-semibold">+977-9851068219</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
