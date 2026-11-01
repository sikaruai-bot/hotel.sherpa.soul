import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Wifi,
  Clock,
  CreditCard,
  Droplets,
  Sparkles,
  Moon,
  UtensilsCrossed,
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
  const { t } = useTranslation();
  const [copiedField, setCopiedField] = useState(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");

  const handleCopy = (text, fieldName) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopiedField(fieldName);
          setLiveAnnouncement(
            t("guestGuide.accessibility.copiedAnnouncement", {
              field: fieldName,
              defaultValue: `${fieldName} copied to clipboard`,
            })
          );
          setTimeout(() => {
            setCopiedField(null);
            setLiveAnnouncement("");
          }, 2500);
        })
        .catch(() => {
          setLiveAnnouncement(
            t(
              "guestGuide.accessibility.copyFailedAnnouncement",
              "Failed to copy. Please copy manually."
            )
          );
        });
    }
  };

  const jumpLinks = [
    { href: "#policies", label: t("guestGuide.quickJump.policies", "⚠️ Important Policies") },
    { href: "#wifi", label: t("guestGuide.quickJump.wifi", "Wi-Fi") },
    { href: "#checkin-checkout", label: t("guestGuide.quickJump.checkinCheckout", "Check-in & Out") },
    { href: "#payment", label: t("guestGuide.quickJump.payment", "Payment") },
    { href: "#room-facilities", label: t("guestGuide.quickJump.roomFacilities", "Hot Water & Facilities") },
    { href: "#food-dining", label: t("guestGuide.quickJump.foodDining", "Food & Dining") },
    { href: "#long-stay-kitchen", label: t("guestGuide.quickJump.kitchenPerk", "👨‍🍳 Kitchen Perk") },
    { href: "#cleaning", label: t("guestGuide.quickJump.cleaning", "Cleaning") },
    { href: "#quiet-hours", label: t("guestGuide.quickJump.quietHours", "Quiet Hours") },
    { href: "#shared-kitchen", label: t("guestGuide.quickJump.sharedKitchen", "Shared Kitchen") },
    { href: "#useful-info", label: t("guestGuide.quickJump.usefulInfo", "Useful Info") },
    { href: "#safety", label: t("guestGuide.quickJump.safety", "Safety & Security") },
    { href: "#legal", label: t("guestGuide.quickJump.legal", "Legal & House Rules") },
    { href: "#local-help", label: t("guestGuide.quickJump.localHelp", "Local Help") },
    { href: "#contact", label: t("guestGuide.quickJump.contact", "Contact Reception") },
    { href: "#review", label: t("guestGuide.quickJump.review", "Google Review") },
  ];

  const hotelPolicies = [
    {
      icon: "🔇",
      title: t("guestGuide.policies.quietHours.title", "Quiet Hours"),
      time: t("guestGuide.policies.quietHours.time", "10:00 PM – 7:00 AM"),
      desc: t("guestGuide.policies.quietHours.desc", "Keep noise, music, and phone calls low to respect other guests."),
    },
    {
      icon: "🛠️",
      title: t("guestGuide.policies.damageLost.title", "Damage & Lost Items"),
      desc: t("guestGuide.policies.damageLost.desc", "Guests are responsible for damage to hotel property or loss of items (keys, towels, linens, appliances, furniture). Repair/replacement costs charged at fair market value and settled at check-out."),
    },
    {
      icon: "🔑",
      title: t("guestGuide.policies.roomKey.title", "Room Key"),
      desc: t("guestGuide.policies.roomKey.desc", "Lost keys or access cards may incur a replacement fee. Return all keys at check-out."),
    },
    {
      icon: "🚭",
      title: t("guestGuide.policies.noSmoking.title", "No Smoking"),
      desc: t("guestGuide.policies.noSmoking.desc", "Smoking, vapes, and e-cigarettes are strictly prohibited in rooms and indoor areas. A cleaning fee may apply if detected. Use designated outdoor areas."),
    },
    {
      icon: "🍺",
      title: t("guestGuide.policies.noAlcohol.title", "No Alcohol & Intoxicants"),
      desc: t("guestGuide.policies.noAlcohol.desc", "Do not bring, store, or consume alcohol, beer, or intoxicating substances in guest rooms. Illegal drugs are strictly prohibited and may be reported to authorities."),
    },
    {
      icon: "🗑️",
      title: t("guestGuide.policies.keepClean.title", "Keep Your Room Clean"),
      desc: t("guestGuide.policies.keepClean.desc", "Dispose of all waste (wrappers, bottles, tissues) in the dustbin provided. Do not leave trash on floors, beds, or outside the room. Housekeeping can assist with extra bins on request."),
    },
    {
      icon: "👥",
      title: t("guestGuide.policies.visitors.title", "Visitors"),
      desc: t("guestGuide.policies.visitors.desc", "Outside visitors are not permitted in guest rooms after 10:00 PM without prior approval from reception."),
    },
    {
      icon: "🍳",
      title: t("guestGuide.policies.sharedKitchen.title", "Shared Kitchen"),
      desc: t("guestGuide.policies.sharedKitchen.desc", "Kitchen access is for approved long-stay guests only. Clean all utensils and surfaces after use."),
    },
    {
      icon: "💳",
      title: t("guestGuide.policies.paymentExtensions.title", "Payment & Extensions"),
      desc: t("guestGuide.policies.paymentExtensions.desc", "Outstanding balances must be settled at check-out. Late check-out or extensions are subject to availability and additional charges."),
    },
    {
      icon: "🛡️",
      title: t("guestGuide.policies.guestResponsibility.title", "Guest Responsibility"),
      desc: t("guestGuide.policies.guestResponsibility.desc", "Lock your room and secure valuables. Guests are responsible for personal belongings."),
    },
    {
      icon: "💡",
      title: t("guestGuide.policies.saveEnergy.title", "Save Energy — Switch Off Before Leaving"),
      desc: t("guestGuide.policies.saveEnergy.desc", "Before leaving your room, please switch off all electrical devices — air conditioner, fan, lights, heater/geyser, TV, and chargers. This helps us save energy and keep the environment safe. Thank you for your cooperation!"),
    },
    {
      icon: "⚖️",
      title: t("guestGuide.policies.legalCompliance.title", "Legal Compliance & Police Cooperation"),
      desc: t("guestGuide.policies.legalCompliance.desc", "All guests must comply with the laws of Nepal. Prohibited activities (drugs, exploitation, violence, theft, weapons) are strictly forbidden. If police or other law enforcement visits to investigate or enforce the law, guests must cooperate fully and respectfully. The hotel will cooperate with lawful requests and may share guest registration information as required by law. Suspected illegal activity may be reported to authorities, and the hotel reserves the right to end a stay immediately in such cases."),
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
            <ArrowLeft className="w-4 h-4" /> {t("guestGuide.backHome", "Back to Hotel Sherpa Soul Home")}
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
                <AlertTriangle className="w-3.5 h-3.5" /> {t("guestGuide.policies.badge", "Important Hotel Policies")}
              </div>
              <h2 className="text-lg sm:text-2xl font-extrabold text-[#01366E] tracking-tight">
                {t("guestGuide.policies.heading", "House Rules & Stay Guidelines")}
              </h2>
            </div>
            <p className="text-xs text-slate-600 max-w-sm sm:text-right leading-relaxed">
              {t("guestGuide.policies.subheading", "Please review these essential rules for a safe, respectful, and peaceful stay at Hotel Sherpa Soul.")}
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
            {t("guestGuide.policies.disclaimer", "Management reserves the right to refuse service or end a stay for serious violations of these policies or applicable law.")}
          </div>
        </section>

        {/* Compact Quick Jump Navigation for Mobile and Desktop */}
        <nav
          aria-label="Guest Guide sections"
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-6"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#FB6C01]" /> {t("guestGuide.quickJump.title", "Quick Jump to Section:")}
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
              <Building className="w-3.5 h-3.5 text-[#FB6C01]" /> {t("guestGuide.header.badge", "Peaceful Hotel in Thamel, Kathmandu")}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#01366E] tracking-tight mb-2">
              Hotel Sherpa Soul
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-[#FB6C01] mb-4">
              {t("guestGuide.header.subtitle", "Guest Guide & House Rules")}
            </p>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl">
              {t("guestGuide.header.desc", "Welcome to Hotel Sherpa Soul! We are happy to have you with us. This guide provides useful information to help you enjoy a clean, comfortable and peaceful stay in Kathmandu.")}
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
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">{t("guestGuide.wifi.tag", "Section 1")}</span>
                <h2 className="text-2xl font-bold text-[#01366E]">{t("guestGuide.wifi.title", "1. Wi-Fi Access")}</h2>
              </div>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              {t("guestGuide.wifi.desc", "Complimentary high-speed fiber Wi-Fi is available in all rooms and common areas. Connect using the credentials below:")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Network Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    {t("guestGuide.wifi.ssidLabel", "Wi-Fi Network (SSID)")}
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
                      <span className="text-emerald-700">{t("guestGuide.wifi.copied", "Copied!")}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#FB6C01]" />
                      <span>{t("guestGuide.wifi.copyNetwork", "Copy Network Name")}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Password Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider block mb-1">
                    {t("guestGuide.wifi.passwordLabel", "Wi-Fi Password")}
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
                      <span>{t("guestGuide.wifi.copiedClipboard", "Copied to Clipboard!")}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{t("guestGuide.wifi.copyPassword", "Copy Password")}</span>
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
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">{t("guestGuide.checkinCheckout.tag", "Section 2")}</span>
                <h2 className="text-2xl font-bold text-[#01366E]">{t("guestGuide.checkinCheckout.title", "2. Check-in & Check-out")}</h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs uppercase font-bold text-slate-500 mb-1">{t("guestGuide.checkinCheckout.checkinLabel", "Check-in")}</div>
                  <div className="text-base font-semibold text-slate-900">{t("guestGuide.checkinCheckout.checkinValue", "Please confirm with reception.")}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs uppercase font-bold text-slate-500 mb-1">{t("guestGuide.checkinCheckout.checkoutLabel", "Check-out")}</div>
                  <div className="text-base font-semibold text-slate-900">{t("guestGuide.checkinCheckout.checkoutValue", "By 11:00 AM.")}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950">
                <p className="text-sm">
                  {t("guestGuide.checkinCheckout.note", "Guests who need a late check-out or stay extension should contact reception in advance. Extensions depend on room availability.")}
                </p>
              </div>

              {/* Front Desk 1-Click WhatsApp Review Quick Share */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs uppercase font-bold text-emerald-800 tracking-wider flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>{t("guestGuide.checkinCheckout.reviewTitle", "Front Desk • 1-Click Review Request")}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t("guestGuide.checkinCheckout.reviewDesc", "Tap to open WhatsApp with the pre-filled 30-second review request ready to send to departing guests.")}
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
                  <span>{t("guestGuide.checkinCheckout.reviewBtn", "Send Review Request on WhatsApp")}</span>
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
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{t("guestGuide.payment.tag", "Section 3")}</span>
                <h2 className="text-2xl font-bold text-[#01366E]">{t("guestGuide.payment.title", "3. Payment Information")}</h2>
              </div>
            </div>

            <div className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
              <p>
                {t("guestGuide.payment.p1", "If you have not completed payment at check-in, please contact reception to settle your outstanding room balance as agreed.")}
              </p>
              <p>
                {t("guestGuide.payment.p2", "If you have already paid, you may disregard this reminder.")}
              </p>
              <p>
                {t("guestGuide.payment.p3", "For billing questions or payment clarification, please speak with reception.")}
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
                <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">{t("guestGuide.roomFacilities.tag", "Section 4")}</span>
                <h2 className="text-2xl font-bold text-[#01366E]">{t("guestGuide.roomFacilities.title", "4. Hot Water & Room Facilities")}</h2>
              </div>
            </div>

            <div className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong>{t("guestGuide.roomFacilities.hotWaterLabel", "Hot water:")}</strong> {t("guestGuide.roomFacilities.hotWaterDesc", "Available at all times.")}
                </li>
                <li>
                  <strong>{t("guestGuide.roomFacilities.acLabel", "Air conditioning:")}</strong> {t("guestGuide.roomFacilities.acDesc", "Available only in selected rooms. Room facilities vary by room type.")}
                </li>
                <li>
                  <strong>{t("guestGuide.roomFacilities.assistanceLabel", "Assistance:")}</strong> {t("guestGuide.roomFacilities.assistanceDesc", "If something is not working properly, please inform reception.")}
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
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">{t("guestGuide.foodDining.tag", "Section 5")}</span>
                <h2 className="text-2xl font-bold text-[#01366E]">{t("guestGuide.foodDining.title", "5. Food & Dining")}</h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950">
                <p className="font-semibold text-slate-900 mb-1">
                  {t("guestGuide.foodDining.peacefulTitle", "A Peaceful Stay by Design:")}
                </p>
                <p className="text-slate-700 text-sm">
                  {t("guestGuide.foodDining.peacefulDesc", "Hotel Sherpa Soul does not have an on-site restaurant — this helps us keep the hotel quiet and peaceful for all guests.")}
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-900 mb-2">{t("guestGuide.foodDining.diningThamelTitle", "Dining in Thamel:")}</p>
                <ul className="space-y-2 list-disc pl-5 text-slate-600">
                  <li>
                    <strong>{t("guestGuide.foodDining.heartThamelLabel", "In the Heart of Thamel:")}</strong> {t("guestGuide.foodDining.heartThamelDesc", "You are in the heart of Thamel — within a 2–10 minute walk you will find dozens of restaurants, cafés, and local eateries serving Nepali, Indian, Continental, and international food.")}
                  </li>
                  <li>
                    <strong>{t("guestGuide.foodDining.askReceptionLabel", "Ask Reception:")}</strong> {t("guestGuide.foodDining.askReceptionDesc", "Ask reception for personal recommendations — we know great nearby spots for every budget.")}
                  </li>
                  <li>
                    <strong>{t("guestGuide.foodDining.foodDeliveryLabel", "Food Delivery:")}</strong> {t("guestGuide.foodDining.foodDeliveryDesc", "Food delivery can be received at reception — please collect it promptly and dispose of waste in the dustbin.")}
                  </li>
                  <li>
                    <strong>{t("guestGuide.foodDining.diningAreasLabel", "Dining Areas:")}</strong> {t("guestGuide.foodDining.diningAreasDesc", "Please enjoy meals in designated areas, not in corridors or shared spaces.")}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 👨‍🍳 Long-Stay Kitchen Highlight Section (Placed prominently right after Food & Dining) */}
          <section
            id="long-stay-kitchen"
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-green-50/80 border-2 border-emerald-500 shadow-md scroll-mt-28 relative overflow-hidden"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-xs">
                {t("guestGuide.longStayKitchen.badge", "🌟 Long-Stay Perk")}
              </span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                {t("guestGuide.longStayKitchen.nightsBadge", "14+ Nights")}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl select-none" role="img" aria-label="Chef">👨‍🍳</span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#01366E] tracking-tight">
                {t("guestGuide.longStayKitchen.title", "👨‍🍳 Free Shared Kitchen for Long-Stay Guests")}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium mb-4">
              {t("guestGuide.longStayKitchen.desc", "Staying with us for 2 weeks or longer? Enjoy FREE access to our shared self-catering kitchen — cook your own meals, save money, and feel at home during your long stay in Kathmandu.")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/90 border border-emerald-200/90 text-xs sm:text-sm text-slate-800 font-medium shadow-2xs">
                <span className="text-emerald-600 font-bold shrink-0">✅</span>
                <span><strong>{t("guestGuide.longStayKitchen.perk1Strong", "Free for long-stay guests")}</strong> {t("guestGuide.longStayKitchen.perk1", "(minimum 2 weeks / 14 nights)")}</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/90 border border-emerald-200/90 text-xs sm:text-sm text-slate-800 font-medium shadow-2xs">
                <span className="text-emerald-600 font-bold shrink-0">✅</span>
                <span><strong>{t("guestGuide.longStayKitchen.perk2Strong", "Self-catering")}</strong> {t("guestGuide.longStayKitchen.perk2", "— cook your own meals")}</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/90 border border-emerald-200/90 text-xs sm:text-sm text-slate-800 font-medium shadow-2xs">
                <span className="text-emerald-600 font-bold shrink-0">✅</span>
                <span><strong>{t("guestGuide.longStayKitchen.perk3Strong", "Shared kitchen facilities")}</strong></span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/90 border border-emerald-200/90 text-xs sm:text-sm text-slate-800 font-medium shadow-2xs">
                <span className="text-emerald-600 font-bold shrink-0">✅</span>
                <span><strong>{t("guestGuide.longStayKitchen.perk4Strong", "Perfect for budget travelers")}</strong>{t("guestGuide.longStayKitchen.perk4", ", students, and long-term visitors")}</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/90 border border-emerald-200/90 text-xs sm:text-sm text-slate-800 font-medium shadow-2xs sm:col-span-2">
                <span className="text-emerald-600 font-bold shrink-0">✅</span>
                <span><strong>{t("guestGuide.longStayKitchen.perk5Strong", "Ask reception")}</strong> {t("guestGuide.longStayKitchen.perk5", "for kitchen access details and house rules")}</span>
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
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">{t("guestGuide.cleaning.tag", "Section 6")}</span>
                <h2 className="text-2xl font-bold text-[#01366E]">{t("guestGuide.cleaning.title", "6. Room Cleaning & Towels")}</h2>
              </div>
            </div>

            <div className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
              <p>
                {t("guestGuide.cleaning.p1", "Room cleaning is available on request.")}
              </p>
              <p>
                {t("guestGuide.cleaning.p2", "Guests may contact reception for cleaning, fresh towels or essential supplies.")}
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
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">{t("guestGuide.quietHours.tag", "Section 7")}</span>
                <h2 className="text-2xl font-bold text-[#01366E]">{t("guestGuide.quietHours.title", "7. Quiet Hours")}</h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-900 font-bold text-sm border border-indigo-100">
                <Clock className="w-4 h-4 text-indigo-600" /> {t("guestGuide.quietHours.timeBadge", "Quiet hours: 10:00 PM to 7:00 AM")}
              </div>

              <p className="font-semibold text-slate-800">{t("guestGuide.quietHours.please", "Please:")}</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>{t("guestGuide.quietHours.item1", "Keep noise to a minimum during quiet hours.")}</li>
                <li>{t("guestGuide.quietHours.item2", "Keep conversations and phone calls quiet in corridors and shared spaces.")}</li>
                <li>{t("guestGuide.quietHours.item3", "Close doors gently.")}</li>
                <li>{t("guestGuide.quietHours.item4", "Respect other guests' privacy and comfort.")}</li>
              </ul>

              <p className="text-sm font-medium text-slate-600 pt-2 border-t border-slate-100">
                {t("guestGuide.quietHours.note", "The goal is to maintain a peaceful sleeping environment for everyone.")}
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
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">{t("guestGuide.sharedKitchen.tag", "Section 8")}</span>
                <h2 className="text-2xl font-bold text-[#01366E]">{t("guestGuide.sharedKitchen.title", "8. Shared Kitchen Guidelines")}</h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <p>
                {t("guestGuide.sharedKitchen.desc", "The shared kitchen is available to eligible long-stay guests staying at least two weeks, subject to confirmation with reception.")}
              </p>

              <div>
                <p className="font-semibold text-slate-800 mb-2">{t("guestGuide.sharedKitchen.rulesTitle", "Rules:")}</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>{t("guestGuide.sharedKitchen.rule1", "Confirm access with reception before using the kitchen.")}</li>
                  <li>{t("guestGuide.sharedKitchen.rule2", "Use your designated food storage space.")}</li>
                  <li>{t("guestGuide.sharedKitchen.rule3", "Clean utensils and work surfaces after use.")}</li>
                  <li>{t("guestGuide.sharedKitchen.rule4", "Switch off cooking appliances after use.")}</li>
                  <li>{t("guestGuide.sharedKitchen.rule5", "Keep the kitchen clean and safe.")}</li>
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
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">{t("guestGuide.usefulInfo.tag", "Section 9")}</span>
                <h2 className="text-2xl font-bold text-[#01366E]">{t("guestGuide.usefulInfo.title", "9. Useful Information")}</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="text-xl shrink-0 pt-0.5 select-none" role="img" aria-label="Luggage Storage">🧳</span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{t("guestGuide.usefulInfo.luggageTitle", "Luggage Storage")}</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {t("guestGuide.usefulInfo.luggageDesc", "Free luggage storage is available before check-in and after check-out — please confirm with reception.")}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="text-xl shrink-0 pt-0.5 select-none" role="img" aria-label="ID Requirement">🪪</span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{t("guestGuide.usefulInfo.idTitle", "ID Requirement")}</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {t("guestGuide.usefulInfo.idDesc", "All guests must present a valid passport or government ID at check-in, as required by Nepal law.")}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="text-xl shrink-0 pt-0.5 select-none" role="img" aria-label="Emergency Contact">🚨</span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{t("guestGuide.usefulInfo.emergencyTitle", "Emergency Contact")}</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {t("guestGuide.usefulInfo.emergencyDesc", "For medical, fire, or security emergencies, contact reception 24/7 at")}{" "}
                    <a href="tel:+9779851068219" className="text-[#01366E] font-bold underline">+977 9851068219</a>.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="text-xl shrink-0 pt-0.5 select-none" role="img" aria-label="Pets">🐕</span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{t("guestGuide.usefulInfo.petsTitle", "Pets")}</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {t("guestGuide.usefulInfo.petsDesc", "Pets are not allowed in the hotel.")}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="text-xl shrink-0 pt-0.5 select-none" role="img" aria-label="Drinking Water">💧</span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{t("guestGuide.usefulInfo.waterTitle", "Drinking Water")}</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {t("guestGuide.usefulInfo.waterDesc", "2 complimentary bottles of drinking water are provided in your room. Additional water can be purchased nearby.")}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 sm:col-span-2">
                <span className="text-xl shrink-0 pt-0.5 select-none" role="img" aria-label="Laundry">🧺</span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{t("guestGuide.usefulInfo.laundryTitle", "Laundry")}</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {t("guestGuide.usefulInfo.laundryDesc", "We do not provide laundry service. Laundry shops are available nearby — reception can direct you to the closest one.")}
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
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{t("guestGuide.safety.tag", "Section 10")}</span>
                <h2 className="text-2xl font-bold text-[#01366E]">{t("guestGuide.safety.title", "10. Safety & Security")}</h2>
              </div>
            </div>

            <div className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
              <ul className="space-y-2 list-disc pl-5">
                <li>{t("guestGuide.safety.item1", "Lock your room when leaving.")}</li>
                <li>{t("guestGuide.safety.item2", "Keep your valuables and personal belongings secure.")}</li>
                <li>{t("guestGuide.safety.item3", "Report damage, maintenance problems and safety concerns to reception.")}</li>
                <li>{t("guestGuide.safety.item4", "Treat hotel property, staff and fellow guests with respect.")}</li>
                <li>{t("guestGuide.safety.item5", "Follow reasonable safety instructions from hotel staff.")}</li>
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
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">{t("guestGuide.legal.tag", "Section 11")}</span>
                <h2 className="text-2xl font-bold text-[#01366E]">{t("guestGuide.legal.title", "11. Legal Compliance & Prohibited Activities")}</h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <p>
                {t("guestGuide.legal.p1", "All guests must comply with the applicable laws of Nepal while staying at the hotel.")}
              </p>

              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  {t("guestGuide.legal.prohibitedTitle", "The following activities are prohibited on hotel premises:")}
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>{t("guestGuide.legal.item1", "Possession, use, sale or distribution of illegal drugs or other substances prohibited by law.")}</li>
                  <li>{t("guestGuide.legal.item2", "Human trafficking, exploitation, sexual abuse, or activities involving coercion or minors.")}</li>
                  <li>{t("guestGuide.legal.item3", "Theft, fraud, violence, threats, harassment or deliberate damage to hotel property.")}</li>
                  <li>{t("guestGuide.legal.item4", "Possession or use of illegal weapons or other items prohibited by law.")}</li>
                  <li>{t("guestGuide.legal.item5", "Any other activity prohibited by applicable laws of Nepal.")}</li>
                </ul>
              </div>

              <div className="pt-2">
                <h3 className="font-bold text-slate-900 mb-1">{t("guestGuide.legal.guestIdTitle", "Guest Identification:")}</h3>
                <p>
                  {t("guestGuide.legal.guestIdDesc", "Guests must provide accurate identification and registration information as required by applicable law and hotel procedures.")}
                </p>
              </div>

              <div className="pt-2">
                <h3 className="font-bold text-slate-900 mb-1">{t("guestGuide.legal.safetyReportingTitle", "Safety and Reporting:")}</h3>
                <p>
                  {t("guestGuide.legal.safetyReportingDesc", "Guests should inform reception about unsafe or potentially illegal activity.")}
                </p>
              </div>

              <div className="pt-2">
                <h3 className="font-bold text-slate-900 mb-1">{t("guestGuide.legal.enforcementTitle", "Enforcement:")}</h3>
                <p>
                  {t("guestGuide.legal.enforcementDesc", "Suspected illegal activity may be reported to the relevant authorities. The hotel will cooperate with lawful requests and take appropriate action in accordance with applicable law.")}
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
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">{t("guestGuide.localHelp.tag", "Section 12")}</span>
                <h2 className="text-2xl font-bold text-[#01366E]">{t("guestGuide.localHelp.title", "12. Local Help & Important Information")}</h2>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <p>
                {t("guestGuide.localHelp.p1", "Guests may ask reception for local directions, transport assistance, sightseeing suggestions and general travel information.")}
              </p>

              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
                <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#FB6C01]" /> {t("guestGuide.localHelp.importantTitle", "Important:")}
                </p>
                <p className="text-slate-700 text-sm">
                  {t("guestGuide.localHelp.importantDesc", "Hotel Sherpa Soul does not have an on-site restaurant or private parking — but we offer a free shared self-catering kitchen for long-stay guests (minimum 2 weeks), and reception is happy to recommend great nearby restaurants and cafés.")}
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
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">{t("guestGuide.contact.tag", "Section 13")}</span>
                <h2 className="text-2xl font-bold text-[#01366E]">{t("guestGuide.contact.title", "13. Contact Hotel Sherpa Soul")}</h2>
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
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">{t("guestGuide.contact.whatsappLabel", "WhatsApp")}</div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    +977 9818259472
                  </div>
                  <div className="text-xs text-emerald-600 mt-0.5">{t("guestGuide.contact.whatsappSub", "Tap to chat on WhatsApp →")}</div>
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
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-800">{t("guestGuide.contact.phoneLabel", "Direct Call (Reception)")}</div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-[#01366E] transition-colors">
                    +977 9851068219
                  </div>
                  <div className="text-xs text-blue-600 mt-0.5">{t("guestGuide.contact.phoneSub", "Tap to call reception desk →")}</div>
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
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-600">{t("guestGuide.contact.emailLabel", "Email Address")}</div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-[#FB6C01] transition-colors break-all">
                    info@hotelsherpasoul.com
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{t("guestGuide.contact.emailSub", "Tap to send email →")}</div>
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
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-600">{t("guestGuide.contact.websiteLabel", "Official Website")}</div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-[#01366E] transition-colors">
                    www.hotelsherpasoul.com
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{t("guestGuide.contact.websiteSub", "Visit official website →")}</div>
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
                <Star className="w-3.5 h-3.5 fill-amber-300" /> {t("guestGuide.review.badge", "Honest Guest Feedback")}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {t("guestGuide.review.title", "Thank You for Staying with Us!")}
              </h2>

              <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed">
                <p>
                  {t("guestGuide.review.p1", "We hope you enjoyed a clean, comfortable and peaceful stay at Hotel Sherpa Soul.")}
                </p>
                <p>
                  {t("guestGuide.review.p2", "If you enjoyed your experience, we would truly appreciate your honest feedback. Your review helps other travellers discover our hotel and helps our small team continue to improve.")}
                </p>
                <p>
                  {t("guestGuide.review.p3", "Thank you for choosing Hotel Sherpa Soul. We wish you safe travels and hope to welcome you again!")}
                </p>
              </div>

              <div className="pt-2 text-amber-200 text-sm font-semibold">
                {t("guestGuide.review.regards", "Warm regards,")}<br />
                {t("guestGuide.review.team", "Team Hotel Sherpa Soul")}
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
                    <span>{t("guestGuide.review.reviewBtn", "Review us on Google ⭐")}</span>
                    <ExternalLink className="w-4 h-4 opacity-80" />
                  </a>
                </div>
                <div className="text-xs text-slate-300 flex flex-wrap items-center gap-1.5 pt-1">
                  <span>{t("guestGuide.review.reviewStarsHint", "Tap the stars on our Google listing to leave a review")}</span>
                  <span className="hidden sm:inline text-white/40">•</span>
                  <a
                    href="https://search.google.com/local/writereview?placeid=ChIJE3xLXdEZ6zkR1sgsehATM38"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline text-amber-300 hover:text-white underline underline-offset-2 transition-colors"
                  >
                    {t("guestGuide.review.directReviewLink", "Write a review directly →")}
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
