import React from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye, Cookie, FileText, CheckCircle, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
            <Shield className="w-4 h-4 text-[#FB6C01]" /> Privacy & Data Transparency
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#01366E] tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Last Updated: September 12, 2026. This Privacy Policy describes how Hotel Sherpa Soul
            ("we", "our", or "the hotel") collects, uses, and protects your information when you visit{" "}
            <a href="https://hotelsherpasoul.com" className="text-[#FB6C01] hover:underline font-medium">
              hotelsherpasoul.com
            </a>{" "}
            or book our boutique accommodation in Thamel, Kathmandu.
          </p>
        </div>

        {/* Policy Content Sections */}
        <div className="space-y-8 bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/80 text-slate-700 leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#01366E] flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-[#FB6C01]" /> 1. Information We Collect
            </h2>
            <p>
              When you interact with our website or make a reservation inquiry, we may collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                <strong>Guest Contact Details:</strong> Full name, email address, phone/WhatsApp number, nationality, and passport details if required for hotel check-in under Nepalese hospitality regulations.
              </li>
              <li>
                <strong>Booking Inquiries:</strong> Selected room category (Budget Family, Deluxe, or Family Room), arrival and departure dates, number of guests, airport pickup requests, and special dietary or stay preferences.
              </li>
              <li>
                <strong>Technical & Usage Data:</strong> Anonymized IP addresses, browser types, device information, referring URLs, and interaction signals on our website.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#01366E] flex items-center gap-2.5">
              <Eye className="w-5 h-5 text-[#FB6C01]" /> 2. How We Use Your Information
            </h2>
            <p>Your information is processed strictly for legitimate hospitality and business purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>To confirm your room reservation and deliver instant WhatsApp/email booking confirmation.</li>
              <li>To coordinate travel assistance, airport transfers between Tribhuvan International Airport (KTM) and the hotel, and trekking permit guidance.</li>
              <li>To maintain our 24-hour front desk communication and assist during your stay in Kathmandu.</li>
              <li>To improve website performance, speed, and usability.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#01366E] flex items-center gap-2.5">
              <Cookie className="w-5 h-5 text-[#FB6C01]" /> 3. Cookies, Analytics & Third-Party Trackers
            </h2>
            <p>
              We operate an explicit <strong>Consent Gate</strong>. Non-essential tracking scripts do not load or execute until you grant consent via our Cookie Banner:
            </p>
            <div className="space-y-4 my-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-[#01366E] text-base mb-1">
                  Google Tag Manager (GTM) & Google Analytics 4 (GA4)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  We use Google Analytics (Property ID: <code>G-E7Z3QDR3KD</code>) via Google Tag Manager (Container ID: <code>GTM-PFRV7ZTV</code>) to monitor aggregate website traffic, popular room views, and technical performance. We utilize Google Consent Mode v2 with IP anonymization enabled.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-[#01366E] text-base mb-1">
                  Meta / Facebook Pixel
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  We utilize the Meta Pixel (Pixel ID: <code>1952950858737501</code>) to measure the effectiveness of our direct booking campaigns. In accordance with data protection guidelines, the Meta Pixel only initializes after you explicitly click "Accept All Cookies".
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              You may modify or revoke your consent at any time by clicking the <strong>"Cookie Preferences"</strong> button in our footer.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#01366E] flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-[#FB6C01]" /> 4. Data Sharing & Confidentiality
            </h2>
            <p>
              Hotel Sherpa Soul <strong>never sells, rents, or trades</strong> your personal data to third parties or marketing brokers. We share data only with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Authorized hotel management staff to prepare your room and arrival.</li>
              <li>Secure transactional service providers (e.g., transactional email systems for booking confirmations).</li>
              <li>Law enforcement authorities only if strictly required by applicable Nepalese law.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#01366E] flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-[#FB6C01]" /> 5. Your Privacy Rights & Contact
            </h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal booking inquiry records stored in our systems. To exercise these rights or ask any questions regarding your data, please contact our team:
            </p>
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-sm space-y-1">
              <p><strong>Hotel Sherpa Soul</strong></p>
              <p>Address: Thamel Bhagawati Marg 26, Kathmandu 44600, Bagmati, Nepal</p>
              <p>Email: <a href="mailto:info@hotelsherpasoul.com" className="text-[#FB6C01] hover:underline font-semibold">info@hotelsherpasoul.com</a></p>
              <p>Phone / WhatsApp: <a href="tel:+9779851068219" className="text-[#FB6C01] hover:underline font-semibold">+977-9851068219</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
