import React, { useState } from "react";
import {
  Globe,
  Calendar,
  ExternalLink,
  Check,
  Copy,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Sparkles,
  Link2,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function CMSChannelsTab({ channels, onUpdateChannels }) {
  const [localChannels, setLocalChannels] = useState(channels || {});
  const [copiedKey, setCopiedKey] = useState(null);
  const [activeGuide, setActiveGuide] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);

  const channelList = [
    {
      key: "bookingCom",
      name: "Booking.com",
      brandColor: "#003580",
      badgeColor: "bg-blue-600/20 text-blue-400 border-blue-500/30",
      btnBg: "bg-blue-600 hover:bg-blue-500",
      placeholderUrl: "https://www.booking.com/hotel/np/hotel-sherpa-soul.html",
      placeholderIcal: "https://admin.booking.com/hotel/hoteladmin/ical.html?t=...",
      guide: {
        title: "How to get your Booking.com iCal link:",
        steps: [
          "Log into your Booking.com Extranet (admin.booking.com).",
          "Navigate to 'Rates & Availability' ➔ 'Calendar'.",
          "Click on 'Sync calendars' in the top right corner.",
          "Select 'Export calendar', copy the .ics URL, and paste it below.",
          "To sync both ways, also click 'Add calendar connection' in Booking.com and paste our Hotel Direct iCal link.",
        ],
      },
    },
    {
      key: "airbnb",
      name: "Airbnb",
      brandColor: "#FF5A5F",
      badgeColor: "bg-rose-600/20 text-rose-400 border-rose-500/30",
      btnBg: "bg-rose-600 hover:bg-rose-500",
      placeholderUrl: "https://www.airbnb.com/rooms/1760024961976448522",
      placeholderIcal: "https://www.airbnb.com/calendar/ical/1760024961976448522.ics?s=...",
      guide: {
        title: "How to get your Airbnb iCal link:",
        steps: [
          "Log into your Airbnb Host account and go to 'Listings'.",
          "Click on your Hotel Sherpa Soul listing.",
          "Go to 'Pricing and availability' ➔ 'Calendar sync'.",
          "Click 'Export Calendar' and copy the provided .ics link.",
          "Paste it in the 'Airbnb iCal Calendar URL' field below.",
          "In Airbnb, click 'Import Calendar' and paste our Hotel Direct iCal link so Airbnb blocks dates booked on your website.",
        ],
      },
    },
    {
      key: "agoda",
      name: "Agoda",
      brandColor: "#5856D6",
      badgeColor: "bg-purple-600/20 text-purple-400 border-purple-500/30",
      btnBg: "bg-purple-600 hover:bg-purple-500",
      placeholderUrl: "https://www.agoda.com/hotel-sherpa-soul/hotel/kathmandu-np.html",
      placeholderIcal: "https://ycs.agoda.com/api/v1/ical/export/...",
      guide: {
        title: "How to get your Agoda iCal link:",
        steps: [
          "Log into Agoda YCS Extranet (ycs.agoda.com).",
          "Go to 'Manage' ➔ 'Calendar' or 'Settings'.",
          "Find 'Calendar Sync' / 'iCal'.",
          "Generate or copy the Agoda Export Calendar link and paste it below.",
          "Add our Hotel Direct iCal URL into Agoda's Import Calendar field.",
        ],
      },
    },
    {
      key: "tripCom",
      name: "Trip.com",
      brandColor: "#2681FF",
      badgeColor: "bg-sky-600/20 text-sky-400 border-sky-500/30",
      btnBg: "bg-sky-600 hover:bg-sky-500",
      placeholderUrl: "https://www.trip.com/hotels/list?keyword=Hotel%20Sherpa%20Soul%20Kathmandu",
      placeholderIcal: "https://ebooking.trip.com/calendar/ical/...",
      guide: {
        title: "How to get your Trip.com iCal link:",
        steps: [
          "Log into Trip.com eBooking Hotel Portal.",
          "Select 'Room Status' or 'Calendar'.",
          "Click on 'iCal Sync / Two-way Calendar Sync'.",
          "Copy the Export Calendar URL and paste it below.",
        ],
      },
    },
  ];

  const handleFieldChange = (channelKey, field, value) => {
    setLocalChannels((prev) => {
      const updated = {
        ...prev,
        [channelKey]: {
          ...(prev[channelKey] || {}),
          [field]: value,
        },
      };
      // Auto-save immediately to CMS Context
      onUpdateChannels(updated);
      return updated;
    });

    setSaveStatus("Saved");
    setTimeout(() => setSaveStatus(null), 2500);
  };

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const hotelDirectIcalUrl = "https://hotelsherpasoul.com/api/calendar?type=all";

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-800/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                OTA Channels & Calendar Sync Manager
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Hub
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
              Paste your official hotel listing links and iCal calendar feeds for{" "}
              <strong className="text-slate-200">Booking.com, Airbnb, Agoda, and Trip.com</strong>.
              URLs pasted here will automatically power all OTA buttons across your website and synchronize room availability to prevent double-bookings.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {saveStatus && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-semibold animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                <span>Changes Autosaved</span>
              </div>
            )}
            <a
              href="/book-now"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-all shadow-sm"
            >
              <span>Preview OTA Buttons</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Hotel Direct iCal Export Box */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 bg-slate-950/40 rounded-2xl p-4 sm:p-5 border border-slate-800/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  Hotel Sherpa Soul Direct iCal Export Feed (To Paste in Airbnb & Booking.com)
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Paste this link into your Airbnb and Booking.com extranet under "Import Calendar" so any direct booking on your website automatically blocks those dates on the OTAs!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <code className="px-3 py-2 bg-slate-900 border border-slate-700/80 text-amber-400 text-xs rounded-xl font-mono select-all overflow-x-auto max-w-xs sm:max-w-md">
                {hotelDirectIcalUrl}
              </code>
              <button
                onClick={() => handleCopy(hotelDirectIcalUrl, "hotelIcal")}
                className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md flex-shrink-0"
              >
                {copiedKey === "hotelIcal" ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 OTA Channel Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {channelList.map((ch) => {
          const current = localChannels[ch.key] || {};
          const isEnabled = current.enabled !== false;
          const listingUrl = current.url || "";
          const icalUrl = current.iCalUrl || "";
          const isGuideOpen = activeGuide === ch.key;

          return (
            <div
              key={ch.key}
              className={`bg-slate-900/90 border rounded-3xl p-6 transition-all shadow-lg flex flex-col justify-between ${
                isEnabled
                  ? "border-slate-800 hover:border-slate-700/90"
                  : "border-slate-800/50 opacity-70 bg-slate-950/60"
              }`}
            >
              <div className="space-y-5">
                {/* Header: Brand Name + Status Toggle */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white text-base shadow-md"
                      style={{ backgroundColor: ch.brandColor }}
                    >
                      {ch.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-base tracking-tight">
                          {ch.name}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${ch.badgeColor}`}
                        >
                          Channel
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {listingUrl ? "Connected & Active" : "Link Not Yet Pasted"}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Active on Website */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
                      {isEnabled ? "Show on Site" : "Hidden"}
                    </span>
                    <div className="relative inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={(e) =>
                          handleFieldChange(ch.key, "enabled", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </div>
                  </label>
                </div>

                {/* Field 1: Official Listing URL */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Link2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{ch.name} Public Listing URL:</span>
                    </label>
                    {listingUrl && (
                      <a
                        href={listingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                      >
                        <span>Test Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="url"
                      value={listingUrl}
                      onChange={(e) =>
                        handleFieldChange(ch.key, "url", e.target.value.trim())
                      }
                      placeholder={ch.placeholderUrl}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 transition-all font-mono"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    👉 Paste your official {ch.name} listing URL here. Guests clicking on {ch.name} will be redirected directly to this page.
                  </p>
                </div>

                {/* Field 2: iCal Calendar Sync URL */}
                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span>{ch.name} iCal Calendar Feed (.ics):</span>
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveGuide(isGuideOpen ? null : ch.key)
                      }
                      className="text-[11px] font-semibold text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>{isGuideOpen ? "Hide Guide" : "Where to find?"}</span>
                      {isGuideOpen ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type="url"
                      value={icalUrl}
                      onChange={(e) =>
                        handleFieldChange(ch.key, "iCalUrl", e.target.value.trim())
                      }
                      placeholder={ch.placeholderIcal}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-600 transition-all font-mono"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">
                      Syncs occupied dates to prevent double bookings.
                    </span>
                    {icalUrl ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        iCal Synced
                      </span>
                    ) : (
                      <span className="text-amber-500/90 font-medium">
                        Optional for 2-way sync
                      </span>
                    )}
                  </div>
                </div>

                {/* Collapsible Step-by-Step Guide */}
                {isGuideOpen && (
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-2.5 animate-fadeIn">
                    <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {ch.guide.title}
                    </h4>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-300 leading-relaxed pl-1">
                      {ch.guide.steps.map((step, idx) => (
                        <li key={idx} className="text-[11px]">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {/* Bottom Quick Test Bar */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Direct button preview:</span>
                {listingUrl ? (
                  <a
                    href={listingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-1.5 rounded-lg text-white font-bold text-xs flex items-center gap-1.5 transition-transform hover:scale-105 shadow-md ${ch.btnBg}`}
                  >
                    <span>Book on {ch.name}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="italic text-slate-500 text-[11px]">
                    (Paste URL above to activate button)
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Notice */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-start gap-3 text-xs text-slate-400">
        <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-200">
            Instant Automatic Sync Across All Website Pages
          </p>
          <p className="leading-relaxed">
            Whenever you paste or update URLs in this dashboard, the changes immediately apply to the <strong>Book Now page</strong>, <strong>Footer</strong>, and <strong>Room details</strong> for all visitors.
          </p>
        </div>
      </div>
    </div>
  );
}
