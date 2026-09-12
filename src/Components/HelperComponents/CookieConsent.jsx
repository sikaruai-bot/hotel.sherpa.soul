import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, Shield, Check, X, Settings2 } from "lucide-react";
import { initializeMetaPixel } from "../Analytics/pixelEvents";
import { CONSENT_STORAGE_KEY, getStoredConsent } from "./consentUtils";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  useEffect(() => {
    const existingConsent = getStoredConsent();
    if (!existingConsent) {
      // Delay slightly for smooth page entry
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for footer "Cookie Settings" trigger
  useEffect(() => {
    const handleOpen = () => {
      const current = getStoredConsent();
      setAnalyticsEnabled(current === "all" || current === "analytics");
      setMarketingEnabled(current === "all");
      setShowPreferences(true);
      setIsVisible(true);
    };

    window.addEventListener("open-cookie-preferences", handleOpen);
    return () => window.removeEventListener("open-cookie-preferences", handleOpen);
  }, []);

  const applyConsent = (type) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, type);
    } catch (e) {
      console.warn("Could not save cookie preference:", e);
    }

    const grantAnalytics = type === "all" || type === "analytics";
    const grantMarketing = type === "all";

    // 1. Google Consent Mode v2 update
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: grantAnalytics ? "granted" : "denied",
        ad_storage: grantMarketing ? "granted" : "denied",
        ad_user_data: grantMarketing ? "granted" : "denied",
        ad_personalization: grantMarketing ? "granted" : "denied",
      });
    }

    // 2. Meta Pixel Consent update & dynamic init
    if (grantMarketing) {
      initializeMetaPixel();
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("consent", "grant");
      }
    } else if (typeof window !== "undefined" && window.fbq) {
      window.fbq("consent", "revoke");
    }

    // Dispatch global event for listeners (e.g. MetaPixel component)
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("cookie-consent-updated", {
          detail: { type, grantAnalytics, grantMarketing },
        })
      );
    }

    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => applyConsent("all");

  const handleRejectNonEssential = () => applyConsent("essential");

  const handleSavePreferences = () => {
    if (analyticsEnabled && marketingEnabled) {
      applyConsent("all");
    } else if (analyticsEnabled) {
      applyConsent("analytics");
    } else {
      applyConsent("essential");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-5 sm:p-6 rounded-3xl shadow-2xl border border-slate-700/60">
        {!showPreferences ? (
          <div>
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-2xl flex-shrink-0 mt-0.5 border border-amber-400/30">
                <Cookie className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base text-white tracking-tight">
                  Your Privacy at Hotel Sherpa Soul
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  We use cookies and privacy-respecting analytics (Google Analytics & Meta Pixel) to improve your experience and deliver booking confirmations. No tracking fires without your permission.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-amber-300/90 mb-4 pl-1">
              <Shield className="w-3.5 h-3.5" />
              <Link to="/privacy" className="hover:underline font-semibold">
                Read our Privacy Policy & Cookie Disclosure
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleAcceptAll}
                className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#FB6C01] to-amber-500 hover:from-amber-500 hover:to-[#FB6C01] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Accept All
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-colors border border-slate-700"
              >
                Essential Only
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="py-2.5 px-3 text-slate-400 hover:text-white text-xs font-medium hover:bg-slate-800/60 rounded-xl transition-colors"
                title="Customize preferences"
              >
                <Settings2 className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-amber-400" /> Cookie Preferences
              </h4>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs mb-4">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/50">
                <div>
                  <p className="font-semibold text-slate-200">Strictly Necessary</p>
                  <p className="text-[11px] text-slate-400">Security, currency & room booking</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  Always Active
                </span>
              </div>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/40 cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-200">Analytics & Performance</p>
                  <p className="text-[11px] text-slate-400">Google Analytics 4 traffic metrics</p>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="rounded border-slate-600 text-amber-500 focus:ring-amber-400 h-4 w-4 bg-slate-700 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/40 cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-200">Marketing & Conversions</p>
                  <p className="text-[11px] text-slate-400">Meta Pixel booking measurement</p>
                </div>
                <input
                  type="checkbox"
                  checked={marketingEnabled}
                  onChange={(e) => setMarketingEnabled(e.target.checked)}
                  className="rounded border-slate-600 text-amber-500 focus:ring-amber-400 h-4 w-4 bg-slate-700 cursor-pointer"
                />
              </label>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSavePreferences}
                className="flex-1 py-2 px-3 bg-[#FB6C01] hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setShowPreferences(false)}
                className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
