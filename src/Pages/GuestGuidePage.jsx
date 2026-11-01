import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wifi,
  Clock,
  CreditCard,
  Droplets,
  Sparkles,
  Moon,
  UtensilsCrossed,
  ShieldAlert,
  Scale,
  Compass,
  Phone,
  Mail,
  ExternalLink,
  Copy,
  Check,
  ArrowLeft,
  MessageCircle,
  Star,
  Building,
  Info,
  Lock,
  AlertTriangle,
} from "lucide-react";

export default function GuestGuidePage() {
  const [copiedField, setCopiedField] = useState(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");

  const handleCopy = (text, fieldName) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopiedField(fieldName);
          setLiveAnnouncement(`${fieldName} copied to clipboard`);
          setTimeout(() => {
            setCopiedField(null);
            setLiveAnnouncement("");
          }, 2500);
        })
        .catch(() => {
          setLiveAnnouncement("Failed to copy. Please copy manually.");
        });
    }
  };

  const jumpLinks = [
    { href: "#policies", label: "⚠️ Important Policies" },
    { href: "#wifi", label: "Wi-Fi" },
    { href: "#checkin-checkout", label: "Check-in & Out" },
    { href: "#payment", label: "Payment" },
    { href: "#room-facilities", label: "Hot Water & Facilities" },
    { href: "#food-dining", label: "Food & Dining" },
    { href: "#cleaning", label: "Cleaning" },
    { href: "#quiet-hours", label: "Quiet Hours" },
    { href: "#shared-kitchen", label: "Shared Kitchen" },
    { href: "#useful-info", label: "Useful Info" },
    { href: "#safety", label: "Safety & Security" },
    { href: "#legal", label: "Legal & House Rules" },
    { href: "#local-help", label: "Local Help" },
    { href: "#contact", label: "Contact Reception" },
    { href: "#review", label: "Google Review" },
  ];

  const hotelPolicies = [
    {
      icon: "🔇",
      title: "Quiet Hours",
      time: "10:00 PM – 7:00 AM",
      desc: "Keep noise, music, and phone calls low to respect other guests.",
    },
    {
      icon: "🛠️",
      title: "Damage & Lost Items",
      desc: "Guests are responsible for damage to hotel property or loss of items (keys, towels, linens, appliances, furniture). Repair/replacement costs charged at fair market value and settled at check-out.",
    },
    {
      icon: "🔑",
      title: "Room Key",
      desc: "Lost keys or access cards may incur a replacement fee. Return all keys at check-out.",
    },
    {
      icon: "🚭",
      title: "No Smoking",
      desc: "Smoking, vapes, and e-cigarettes are strictly prohibited in rooms and indoor areas. A cleaning fee may apply if detected. Use designated outdoor areas.",
    },
    {
      icon: "🍺",
      title: "No Alcohol & Intoxicants",
      desc: "Do not bring, store, or consume alcohol, beer, or intoxicating substances in guest rooms. Illegal drugs are strictly prohibited and may be reported to authorities.",
    },
    {
      icon: "🗑️",
      title: "Keep Your Room Clean",
      desc: "Dispose of all waste (wrappers, bottles, tissues) in the dustbin provided. Do not leave trash on floors, beds, or outside the room. Housekeeping can assist with extra bins on request.",
    },
    {
      icon: "👥",
      title: "Visitors",
      desc: "Outside visitors are not permitted in guest rooms after 10:00 PM without prior approval from reception.",
    },
    {
      icon: "🍳",
      title: "Shared Kitchen",
      desc: "Kitchen access is for approved long-stay guests only. Clean all utensils and surfaces after use.",
    },
    {
      icon: "💳",
      title: "Payment & Extensions",
      desc: "Outstanding balances must be settled at check-out. Late check-out or extensions are subject to availability and additional charges.",
    },
    {
      icon: "🛡️",
      title: "Guest Responsibility",
      desc: "Lock your room and secure valuables. Guests are responsible for personal belongings.",
    },
    {
      icon: "💡",
      title: "Save Energy — Switch Off Before Leaving",
      desc: "Before leaving your room, please switch off all electrical devices — air conditioner, fan, lights, heater/geyser, TV, and chargers. This helps us save energy and keep the environment safe. Thank you for your cooperation!",
    },
    {
      icon: "⚖️",
      title: "Legal Compliance & Police Cooperation",
      desc: "All guests must comply with the laws of Nepal. Prohibited activities (drugs, exploitation, violence, theft, weapons) are strictly forbidden. If police or other law enforcement visits to investigate or enforce the law, guests must cooperate fully and respectfully. The hotel will cooperate with lawful requests and may share guest registration information as required by law. Suspected illegal activity may be reported to authorities, and the hotel reserves the right to end a stay immediately in such cases.",
      isWide: true,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20 sm:pt-28 pb-20 font-sans text-slate-800 antialiased">
      {/* Accessible live region for screen readers */}
      <div
        role="status"
        aria-live="polite"
        className="sr-only"
      >
        {liveAnnouncement}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-3 sm:mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[#01366E] hover:text-[#FB6C01] font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Hotel Sherpa Soul Home
          </Link>
        </div>

        {/* ⚠️ Prominent Important Hotel Policies Section (Placed at the very top, immediately visible on mobile) */}
        <section
          id="policies"
          className="bg-gradient-to-br from-amber-50/95 via-orange-50/30 to-red-50/40 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-md border-2 border-amber-500 mb-6 scroll-mt-28 relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4 pb-3 border-b border-amber-200/80">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500 text-white text-[11px] sm:text-xs font-extrabold uppercase tracking-wider mb-1.5 shadow-xs">
                <AlertTriangle className="w-3.5 h-3.5" /> Important Hotel Policies
              </div>
              <h2 className="text-lg sm:text-2xl font-extrabold text-[#01366E] tracking-tight">
                House Rules &amp; Stay Guidelines
              </h2>
            </div>
            <p className="text-xs text-slate-600 max-w-sm sm:text-right leading-relaxed">
              Please review these essential rules for a safe, respectful, and peaceful stay at Hotel Sherpa Soul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
            {hotelPolicies.map((policy) => (
              <div
                key={policy.title}
                className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/95 border border-amber-200/90 shadow-2xs flex items-start gap-2.5 transition-all hover:border-amber-400 ${
                  policy.isWide ? "md:col-span-2" : ""
                }`}
              >
                <span className="text-xl shrink-0 select-none pt-0.5 leading-none" role="img" aria-label={policy.title}>
                  {policy.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5 flex-wrap">
                    <span>{policy.title}</span>
                    {policy.time && (
                      <span className="px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-100">
                        {policy.time}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-snug mt-0.5">
                    {policy.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 p-2.5 rounded-xl bg-amber-100/90 border border-amber-300 text-slate-900 text-[11px] sm:text-xs font-semibold text-center leading-snug shadow-2xs">
            Management reserves the right to refuse service or end a stay for serious violations of these policies or applicable law.
          </div>
        </section>

        {/* Compact Quick Jump Navigation for Mobile and Desktop */}
        <nav
          aria-label="Guest Guide sections"
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-6"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#FB6C01]" /> Quick Jump to Section:
          </div>
          <div className="flex flex-wrap gap-2">
            {jumpLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  item.href === "#policies"
                    ? "bg-amber-500 text-white font-bold shadow-xs hover:bg-amber-600"
                    : "bg-slate-100 hover:bg-[#01366E] hover:text-white text-slate-700"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero Banner Header */}
        <header className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/90 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Building className="w-3.5 h-3.5 text-[#FB6C01]" /> Peaceful Hotel in Thamel, Kathmandu
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#01366E] tracking-tight mb-2">
              Hotel Sherpa Soul
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-[#FB6C01] mb-4">
              Guest Guide &amp; House Rules
            </p>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl">
              Welcome to Hotel Sherpa Soul! We are happy to have you with us. This guide provides useful information to help you enjoy a clean, comfortable and peaceful stay in Kathmandu.
            </p>
          </div>
        </header>

        {/* Main Content Sections */}
        <main className="space-y-8">
          {/* 1. Wi-Fi Access */}
          <section
            id="wifi"
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-amber-50 text-[#FB6C01] rounded-xl border border-amber-200">
                <Wifi className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Section 1</span>
                <h2 className="text-2xl font-bold text-[#01366E]">1. Wi-Fi Access</h2>
              </div>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Complimentary high-speed fiber Wi-Fi is available in all rooms and common areas. Connect using the credentials below:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Network Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Wi-Fi Network (SSID)
                  </span>
                  <span className="text-lg sm:text-xl font-mono font-bold text-slate-900 select-all break-all">
                    netis-525AF4
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("netis-525AF4", "Network Name")}
                  className="mt-3.5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold transition-all shadow-sm cursor-pointer"
                  aria-label="Copy Wi-Fi network name"
                >
                  {copiedField === "Network Name" ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#FB6C01]" />
                      <span>Copy Network Name</span>
                    </>
                  )}
                </button>
              </div>

              {/* Password Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider block mb-1">
                    Wi-Fi Password
                  </span>
                  <span className="text-lg sm:text-xl font-mono font-bold text-[#01366E] select-all break-all">
                    thamel@123
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("thamel@123", "Wi-Fi Password")}
                  className="mt-3.5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FB6C01] hover:bg-[#e05a00] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                  aria-label="Copy Wi-Fi password"
                >
                  {copiedField === "Wi-Fi Password" ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Password</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* 2. Check-in & Check-out */}
          <section
            id="checkin-checkout"
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-blue-50 text-[#01366E] rounded-xl border border-blue-200">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Section 2</span>
                <h2 className="text-2xl font-bold text-[#01366E]">2. Check-in &amp; Check-out</h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs uppercase font-bold text-slate-500 mb-1">Check-in</div>
                  <div className="text-base font-semibold text-slate-900">Please confirm with reception.</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs uppercase font-bold text-slate-500 mb-1">Check-out</div>
                  <div className="text-base font-semibold text-slate-900">By 11:00 AM.</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950">
                <p className="text-sm">
                  Guests who need a late check-out or stay extension should contact reception in advance. Extensions depend on room availability.
                </p>
              </div>

              {/* Front Desk 1-Click WhatsApp Review Quick Share */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs uppercase font-bold text-emerald-800 tracking-wider flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Front Desk • 1-Click Review Request</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Tap to open WhatsApp with the pre-filled 30-second review request ready to send to departing guests.
                  </p>
                </div>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    "Namaste! Thank you for staying at Hotel Sherpa Soul 🙏 If you enjoyed your stay, could you take 30 seconds to leave us a Google review? It helps us a lot: https://www.google.com/maps?cid=9165690628119251158"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Review Request on WhatsApp</span>
                </a>
              </div>
            </div>
          </section>

          {/* 3. Payment Information */}
          <section
            id="payment"
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Section 3</span>
                <h2 className="text-2xl font-bold text-[#01366E]">3. Payment Information</h2>
              </div>
            </div>

            <div className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
              <p>
                If you have not completed payment at check-in, please contact reception to settle your outstanding room balance as agreed.
              </p>
              <p>
                If you have already paid, you may disregard this reminder.
              </p>
              <p>
                For billing questions or payment clarification, please speak with reception.
              </p>
            </div>
          </section>

          {/* 4. Hot Water & Room Facilities */}
          <section
            id="room-facilities"
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-orange-50 text-[#FB6C01] rounded-xl border border-orange-200">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">Section 4</span>
                <h2 className="text-2xl font-bold text-[#01366E]">4. Hot Water &amp; Room Facilities</h2>
              </div>
            </div>

            <div className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>Hot water:</strong> Available at all times.
                </li>
                <li>
                  <strong>Air conditioning:</strong> Available only in selected rooms. Room facilities vary by room type.
                </li>
                <li>
                  <strong>Assistance:</strong> If something is not working properly, please inform reception.
                </li>
              </ul>
            </div>
          </section>

          {/* 5. Food & Dining */}
          <section
            id="food-dining"
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-amber-50 text-[#FB6C01] rounded-xl border border-amber-200">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Section 5</span>
                <h2 className="text-2xl font-bold text-[#01366E]">5. Food &amp; Dining</h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950">
                <p className="font-semibold text-slate-900 mb-1">
                  A Peaceful Stay by Design:
                </p>
                <p className="text-slate-700 text-sm">
                  Hotel Sherpa Soul does not have an on-site restaurant — this helps us keep the hotel quiet and peaceful for all guests.
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-900 mb-2">Dining in Thamel:</p>
                <ul className="space-y-2 list-disc pl-5 text-slate-600">
                  <li>
                    <strong>In the Heart of Thamel:</strong> You are in the heart of Thamel — within a 2–10 minute walk you will find dozens of restaurants, cafés, and local eateries serving Nepali, Indian, Continental, and international food.
                  </li>
                  <li>
                    <strong>Ask Reception:</strong> Ask reception for personal recommendations — we know great nearby spots for every budget.
                  </li>
                  <li>
                    <strong>Food Delivery:</strong> Food delivery can be received at reception — please collect it promptly and dispose of waste in the dustbin.
                  </li>
                  <li>
                    <strong>Dining Areas:</strong> Please enjoy meals in designated areas, not in corridors or shared spaces.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. Room Cleaning & Towels */}
          <section
            id="cleaning"
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl border border-sky-200">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Section 6</span>
                <h2 className="text-2xl font-bold text-[#01366E]">6. Room Cleaning &amp; Towels</h2>
              </div>
            </div>

            <div className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
              <p>
                Room cleaning is available on request.
              </p>
              <p>
                Guests may contact reception for cleaning, fresh towels or essential supplies.
              </p>
            </div>
          </section>

          {/* 7. Quiet Hours */}
          <section
            id="quiet-hours"
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-200">
                <Moon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Section 7</span>
                <h2 className="text-2xl font-bold text-[#01366E]">7. Quiet Hours</h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-900 font-bold text-sm border border-indigo-100">
                <Clock className="w-4 h-4 text-indigo-600" /> Quiet hours: 10:00 PM to 7:00 AM
              </div>

              <p className="font-semibold text-slate-800">Please:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Keep noise to a minimum during quiet hours.</li>
                <li>Keep conversations and phone calls quiet in corridors and shared spaces.</li>
                <li>Close doors gently.</li>
                <li>Respect other guests' privacy and comfort.</li>
              </ul>

              <p className="text-sm font-medium text-slate-600 pt-2 border-t border-slate-100">
                The goal is to maintain a peaceful sleeping environment for everyone.
              </p>
            </div>
          </section>

          {/* 8. Shared Kitchen */}
          <section
            id="shared-kitchen"
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-amber-50 text-[#FB6C01] rounded-xl border border-amber-200">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Section 8</span>
                <h2 className="text-2xl font-bold text-[#01366E]">8. Shared Kitchen</h2>
              </div>
            </div>

            <div className="space-y-5 text-slate-700 leading-relaxed text-sm sm:text-base">
              {/* Prominent Callout Card for Long-Stay Kitchen */}
              <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50/50 to-amber-100/60 border-2 border-amber-400 shadow-md">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="text-2xl select-none" role="img" aria-label="Chef">👨‍🍳</span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#01366E]">
                    Free Shared Kitchen for Long-Stay Guests
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                  Staying with us for 2 weeks or longer? Enjoy FREE access to our shared self-catering kitchen — cook your own meals, save money, and feel at home during your long stay in Kathmandu.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                    <span className="text-emerald-600 font-bold">✅</span>
                    <span><strong>Free for long-stay guests</strong> (minimum 2 weeks / 14 nights)</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                    <span className="text-emerald-600 font-bold">✅</span>
                    <span><strong>Self-catering</strong> — cook your own meals</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                    <span className="text-emerald-600 font-bold">✅</span>
                    <span><strong>Shared kitchen facilities</strong></span>
                  </div>
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                    <span className="text-emerald-600 font-bold">✅</span>
                    <span><strong>Perfect for budget travelers</strong>, students, long-term visitors</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                    <span className="text-emerald-600 font-bold">✅</span>
                    <span><strong>Ask reception</strong> for kitchen access details and house rules</span>
                  </div>
                </div>
              </div>

              <p>
                The shared kitchen is available to eligible long-stay guests staying at least two weeks, subject to confirmation with reception.
              </p>

              <div>
                <p className="font-semibold text-slate-800 mb-2">Rules:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Confirm access with reception before using the kitchen.</li>
                  <li>Use your designated food storage space.</li>
                  <li>Clean utensils and work surfaces after use.</li>
                  <li>Switch off cooking appliances after use.</li>
                  <li>Keep the kitchen clean and safe.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 9. Useful Information */}
          <section
            id="useful-info"
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-blue-50 text-[#01366E] rounded-xl border border-blue-200">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Section 9</span>
                <h2 className="text-2xl font-bold text-[#01366E]">9. Useful Information</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="text-xl shrink-0 pt-0.5 select-none" role="img" aria-label="Luggage Storage">🧳</span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Luggage Storage</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Free luggage storage is available before check-in and after check-out — please confirm with reception.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="text-xl shrink-0 pt-0.5 select-none" role="img" aria-label="ID Requirement">🪪</span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">ID Requirement</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    All guests must present a valid passport or government ID at check-in, as required by Nepal law.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="text-xl shrink-0 pt-0.5 select-none" role="img" aria-label="Emergency Contact">🚨</span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Emergency Contact</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    For medical, fire, or security emergencies, contact reception 24/7 at <a href="tel:+9779851068219" className="text-[#01366E] font-bold underline">+977 9851068219</a>.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="text-xl shrink-0 pt-0.5 select-none" role="img" aria-label="Pets">🐕</span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Pets</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Not allowed.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="text-xl shrink-0 pt-0.5 select-none" role="img" aria-label="Drinking Water">💧</span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Drinking Water</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    2 complimentary bottles in room, more available nearby.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 sm:col-span-2">
                <span className="text-xl shrink-0 pt-0.5 select-none" role="img" aria-label="Laundry">🧺</span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Laundry</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Not provided on-site; nearby shops, reception can direct.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 10. Safety & Security */}
          <section
            id="safety"
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Section 10</span>
                <h2 className="text-2xl font-bold text-[#01366E]">10. Safety &amp; Security</h2>
              </div>
            </div>

            <div className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
              <ul className="space-y-2 list-disc pl-5">
                <li>Lock your room when leaving.</li>
                <li>Keep your valuables and personal belongings secure.</li>
                <li>Report damage, maintenance problems and safety concerns to reception.</li>
                <li>Treat hotel property, staff and fellow guests with respect.</li>
                <li>Follow reasonable safety instructions from hotel staff.</li>
              </ul>
            </div>
          </section>

          {/* 11. Legal Compliance & Prohibited Activities */}
          <section
            id="legal"
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl border border-rose-200">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Section 11</span>
                <h2 className="text-2xl font-bold text-[#01366E]">11. Legal Compliance &amp; Prohibited Activities</h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <p>
                All guests must comply with the applicable laws of Nepal while staying at the hotel.
              </p>

              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  The following activities are prohibited on hotel premises:
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Possession, use, sale or distribution of illegal drugs or other substances prohibited by law.</li>
                  <li>Human trafficking, exploitation, sexual abuse, or activities involving coercion or minors.</li>
                  <li>Theft, fraud, violence, threats, harassment or deliberate damage to hotel property.</li>
                  <li>Possession or use of illegal weapons or other items prohibited by law.</li>
                  <li>Any other activity prohibited by applicable laws of Nepal.</li>
                </ul>
              </div>

              <div className="pt-2">
                <h3 className="font-bold text-slate-900 mb-1">Guest Identification:</h3>
                <p>
                  Guests must provide accurate identification and registration information as required by applicable law and hotel procedures.
                </p>
              </div>

              <div className="pt-2">
                <h3 className="font-bold text-slate-900 mb-1">Safety and Reporting:</h3>
                <p>
                  Guests should inform reception about unsafe or potentially illegal activity.
                </p>
              </div>

              <div className="pt-2">
                <h3 className="font-bold text-slate-900 mb-1">Enforcement:</h3>
                <p>
                  Suspected illegal activity may be reported to the relevant authorities. The hotel will cooperate with lawful requests and take appropriate action in accordance with applicable law.
                </p>
              </div>
            </div>
          </section>

          {/* 12. Local Help & Important Information */}
          <section
            id="local-help"
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-amber-50 text-[#FB6C01] rounded-xl border border-amber-200">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Section 12</span>
                <h2 className="text-2xl font-bold text-[#01366E]">12. Local Help &amp; Important Information</h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <p>
                Guests may ask reception for local directions, transport assistance, sightseeing suggestions and general travel information.
              </p>

              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
                <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#FB6C01]" /> Important:
                </p>
                <p className="text-slate-700 text-sm">
                  Hotel Sherpa Soul does not have an on-site restaurant or private parking — but we offer a free shared self-catering kitchen for long-stay guests (minimum 2 weeks), and reception is happy to recommend great nearby restaurants and cafés.
                </p>
              </div>
            </div>
          </section>

          {/* 13. Contact Hotel Sherpa Soul */}
          <section
            id="contact"
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 scroll-mt-28"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-blue-50 text-[#01366E] rounded-xl border border-blue-200">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Section 13</span>
                <h2 className="text-2xl font-bold text-[#01366E]">13. Contact Hotel Sherpa Soul</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* WhatsApp */}
              <a
                href="https://wa.me/9779818259472"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:bg-emerald-100/70 transition-all flex items-start gap-3 group"
              >
                <div className="p-2.5 rounded-xl bg-emerald-600 text-white flex-shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">WhatsApp</div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    +977 9818259472
                  </div>
                  <div className="text-xs text-emerald-600 mt-0.5">Tap to chat on WhatsApp &rarr;</div>
                </div>
              </a>

              {/* Direct call */}
              <a
                href="tel:+9779851068219"
                className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 hover:bg-blue-100/70 transition-all flex items-start gap-3 group"
              >
                <div className="p-2.5 rounded-xl bg-[#01366E] text-white flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-800">Direct Call (Reception)</div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-[#01366E] transition-colors">
                    +977 9851068219
                  </div>
                  <div className="text-xs text-blue-600 mt-0.5">Tap to call reception desk &rarr;</div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@hotelsherpasoul.com"
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all flex items-start gap-3 group"
              >
                <div className="p-2.5 rounded-xl bg-slate-700 text-white flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-600">Email Address</div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-[#FB6C01] transition-colors break-all">
                    info@hotelsherpasoul.com
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">Tap to send email &rarr;</div>
                </div>
              </a>

              {/* Website */}
              <a
                href="https://www.hotelsherpasoul.com"
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all flex items-start gap-3 group"
              >
                <div className="p-2.5 rounded-xl bg-[#FB6C01] text-white flex-shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-600">Official Website</div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-[#01366E] transition-colors">
                    www.hotelsherpasoul.com
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">Visit official website &rarr;</div>
                </div>
              </a>
            </div>
          </section>

          {/* 14. Thank You & Google Review Invitation */}
          <section
            id="review"
            className="bg-gradient-to-br from-[#01366E] via-[#0A2540] to-[#01366E] text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-amber-400/30 scroll-mt-28 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 rounded-full bg-[#FB6C01]/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 fill-amber-300" /> Honest Guest Feedback
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Thank You for Staying with Us!
              </h2>

              <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed">
                <p>
                  We hope you enjoyed a clean, comfortable and peaceful stay at Hotel Sherpa Soul.
                </p>
                <p>
                  If you enjoyed your experience, we would truly appreciate your honest feedback. Your review helps other travellers discover our hotel and helps our small team continue to improve.
                </p>
                <p>
                  Thank you for choosing Hotel Sherpa Soul. We wish you safe travels and hope to welcome you again!
                </p>
              </div>

              <div className="pt-2 text-amber-200 text-sm font-semibold">
                Warm regards,<br />
                Team Hotel Sherpa Soul
              </div>

              <div className="pt-4 space-y-2">
                <div>
                  <a
                    href="https://www.google.com/maps?cid=9165690628119251158"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#FB6C01] hover:bg-[#e05a00] text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Star className="w-5 h-5 fill-white text-white" />
                    <span>Review us on Google ⭐</span>
                    <ExternalLink className="w-4 h-4 opacity-80" />
                  </a>
                </div>
                <div className="text-xs text-slate-300 flex flex-wrap items-center gap-1.5 pt-1">
                  <span>Tap the stars on our Google listing to leave a review</span>
                  <span className="hidden sm:inline text-white/40">•</span>
                  <a
                    href="https://search.google.com/local/writereview?placeid=ChIJE3xLXdEZ6zkR1sgsehATM38"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline text-amber-300 hover:text-white underline underline-offset-2 transition-colors"
                  >
                    Write a review directly &rarr;
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
