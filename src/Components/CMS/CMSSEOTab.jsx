import React, { useState } from "react";
import {
  Search,
  Globe,
  Share2,
  Code2,
  BarChart3,
  CheckCircle2,
  ExternalLink,
  Copy,
  Smartphone,
  Monitor,
  Sparkles,
  Info,
} from "lucide-react";

export default function CMSSEOTab({ seo, onUpdateSEO, onUpdatePageSEO }) {
  const [selectedRoute, setSelectedRoute] = useState("/");
  const [previewDevice, setPreviewDevice] = useState("desktop"); // desktop | mobile
  const [activeSubTab, setActiveSubTab] = useState("pages"); // pages | social | analytics | schema | robots
  const [copiedSchema, setCopiedSchema] = useState(false);

  const currentPageSEO = seo?.pages?.[selectedRoute] || {
    title: "",
    description: "",
    keywords: "",
    ogImage: "",
  };

  const handlePageFieldChange = (field, val) => {
    onUpdatePageSEO(selectedRoute, { [field]: val });
  };

  const handleGlobalFieldChange = (field, val) => {
    onUpdateSEO({
      global: { ...(seo?.global || {}), [field]: val },
    });
  };

  const handleSocialFieldChange = (field, val) => {
    onUpdateSEO({
      social: { ...(seo?.social || {}), [field]: val },
    });
  };

  const handleAnalyticsFieldChange = (field, val) => {
    onUpdateSEO({
      analytics: { ...(seo?.analytics || {}), [field]: val },
    });
  };

  const handleSchemaFieldChange = (field, val) => {
    onUpdateSEO({
      schema: { ...(seo?.schema || {}), [field]: val },
    });
  };

  // Generate full Schema.org JSON-LD
  const generatedSchema = {
    "@context": "https://schema.org",
    "@type": ["Hotel", "LodgingBusiness"],
    "@id": `${seo?.global?.canonicalBase || "https://hotelsherpasoul.com"}/#hotel`,
    name: seo?.schema?.hotelName || "Hotel Sherpa Soul",
    alternateName: seo?.schema?.alternateName || "Sherpa Soul Hotel Thamel",
    description: seo?.schema?.description || seo?.global?.defaultDescription,
    url: seo?.global?.canonicalBase || "https://hotelsherpasoul.com",
    telephone: seo?.schema?.telephone || "+977-9851068219",
    email: seo?.schema?.email || "info@hotelsherpasoul.com",
    logo: `${seo?.global?.canonicalBase || "https://hotelsherpasoul.com"}/logo.webp`,
    image: [
      `${seo?.global?.canonicalBase || "https://hotelsherpasoul.com"}/hero1.webp`,
      `${seo?.global?.canonicalBase || "https://hotelsherpasoul.com"}/changes_photo/doubleBedRoom.webp`,
    ],
    priceRange: seo?.schema?.priceRange || "$$",
    currenciesAccepted: seo?.schema?.currenciesAccepted || "NPR, USD, EUR",
    checkinTime: seo?.schema?.checkinTime || "14:00",
    checkoutTime: seo?.schema?.checkoutTime || "12:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: seo?.schema?.addressStreet || "Thamel Bhagawati Marg 26",
      addressLocality: seo?.schema?.addressLocality || "Kathmandu",
      addressRegion: seo?.schema?.addressRegion || "Bagmati",
      postalCode: seo?.schema?.postalCode || "44600",
      addressCountry: seo?.schema?.addressCountry || "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: parseFloat(seo?.schema?.latitude || 27.7154),
      longitude: parseFloat(seo?.schema?.longitude || 85.3106),
    },
  };

  const copySchemaToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedSchema, null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const pageRoutes = [
    { route: "/", label: "Homepage (/)" },
    { route: "/about", label: "About Us (/about)" },
    { route: "/rooms", label: "Rooms & Suites (/rooms)" },
    { route: "/gallery", label: "Photo Gallery (/gallery)" },
    { route: "/contact", label: "Contact Us (/contact)" },
    { route: "/blog", label: "Blog & Travel Stories (/blog)" },
    { route: "/services", label: "Services & Amenities (/services)" },
    { route: "/book-now", label: "Direct Booking (/book-now)" },
  ];

  return (
    <div className="space-y-8">
      {/* Sub-navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800">
        {[
          { id: "pages", label: "Page Meta & Titles", icon: Search },
          { id: "social", label: "Social Preview (OG & Cards)", icon: Share2 },
          { id: "analytics", label: "Analytics & Webmaster", icon: BarChart3 },
          { id: "schema", label: "Schema.org (JSON-LD)", icon: Code2 },
          { id: "robots", label: "Canonical & Robots", icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all ${
                isActive
                  ? "bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. PAGE META & GOOGLE SEARCH PREVIEW */}
      {activeSubTab === "pages" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Fields */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Select Page to Edit
                </label>
                <span className="text-xs text-slate-400">
                  Select route to edit independent SEO tags
                </span>
              </div>
              <select
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              >
                {pageRoutes.map((p) => (
                  <option key={p.route} value={p.route}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-5">
              {/* Meta Title */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Meta Title
                  </label>
                  <span
                    className={`text-xs ${
                      (currentPageSEO.title || "").length > 60
                        ? "text-amber-400"
                        : "text-slate-400"
                    }`}
                  >
                    {(currentPageSEO.title || "").length} / 60 characters
                  </span>
                </div>
                <input
                  type="text"
                  value={currentPageSEO.title || ""}
                  onChange={(e) => handlePageFieldChange("title", e.target.value)}
                  placeholder="e.g. Hotel Sherpa Soul | Boutique Stay in Thamel, Kathmandu"
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Meta Description
                  </label>
                  <span
                    className={`text-xs ${
                      (currentPageSEO.description || "").length > 160
                        ? "text-amber-400"
                        : "text-slate-400"
                    }`}
                  >
                    {(currentPageSEO.description || "").length} / 160 characters
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={currentPageSEO.description || ""}
                  onChange={(e) =>
                    handlePageFieldChange("description", e.target.value)
                  }
                  placeholder="Write a compelling description for search engine results..."
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none"
                />
              </div>

              {/* Meta Keywords */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Meta Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={currentPageSEO.keywords || ""}
                  onChange={(e) =>
                    handlePageFieldChange("keywords", e.target.value)
                  }
                  placeholder="Hotel Sherpa Soul, Hotel in Thamel, Kathmandu Stay"
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>

              {/* Page OG Image */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Page Social Share Image (URL or path)
                </label>
                <input
                  type="text"
                  value={currentPageSEO.ogImage || ""}
                  onChange={(e) =>
                    handlePageFieldChange("ogImage", e.target.value)
                  }
                  placeholder="https://hotelsherpasoul.com/hero1.webp or /hero/hero1.webp"
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>
            </div>
          </div>

          {/* Live Google Search Preview Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-semibold text-white">
                    Live Google Search Preview
                  </h3>
                </div>
                <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
                  <button
                    onClick={() => setPreviewDevice("desktop")}
                    className={`p-1.5 rounded ${
                      previewDevice === "desktop"
                        ? "bg-amber-500 text-slate-950"
                        : "text-slate-400"
                    }`}
                    title="Desktop Preview"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice("mobile")}
                    className={`p-1.5 rounded ${
                      previewDevice === "mobile"
                        ? "bg-amber-500 text-slate-950"
                        : "text-slate-400"
                    }`}
                    title="Mobile Preview"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Mock Google Search Card */}
              <div
                className={`bg-white rounded-2xl p-5 shadow-inner border border-slate-200 text-slate-900 ${
                  previewDevice === "mobile" ? "max-w-xs mx-auto" : "w-full"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-[10px] text-white font-bold">
                    H
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-800 leading-tight">
                      Hotel Sherpa Soul
                    </span>
                    <span className="text-[11px] text-emerald-800 truncate leading-tight">
                      https://hotelsherpasoul.com
                      {selectedRoute === "/" ? "" : selectedRoute}
                    </span>
                  </div>
                </div>
                <h4 className="text-blue-800 hover:underline text-base font-medium leading-snug cursor-pointer line-clamp-2">
                  {currentPageSEO.title ||
                    "Hotel Sherpa Soul | Boutique Stay in Thamel, Kathmandu"}
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                  {currentPageSEO.description ||
                    "Stay at Hotel Sherpa Soul, a peaceful hotel in Thamel, Kathmandu. Comfortable rooms, air conditioning, Wi-Fi, friendly service and practical facilities."}
                </p>
              </div>

              <div className="mt-4 p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <span>
                  Search engines usually index titles under 60 characters and
                  descriptions under 160 characters without truncation.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SOCIAL MEDIA & OPEN GRAPH */}
      {activeSubTab === "social" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-5">
              <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                OpenGraph / Facebook / WhatsApp Settings
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  OG Title
                </label>
                <input
                  type="text"
                  value={seo?.social?.ogTitle || ""}
                  onChange={(e) => handleSocialFieldChange("ogTitle", e.target.value)}
                  placeholder="Hotel Sherpa Soul | Boutique Stay in Thamel"
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  OG Description
                </label>
                <textarea
                  rows={3}
                  value={seo?.social?.ogDescription || ""}
                  onChange={(e) =>
                    handleSocialFieldChange("ogDescription", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  OG Image URL (1200 x 630px recommended)
                </label>
                <input
                  type="text"
                  value={seo?.social?.ogImage || ""}
                  onChange={(e) => handleSocialFieldChange("ogImage", e.target.value)}
                  placeholder="https://hotelsherpasoul.com/hero1.webp"
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    OG Site Name
                  </label>
                  <input
                    type="text"
                    value={seo?.social?.ogSiteName || "Hotel Sherpa Soul"}
                    onChange={(e) =>
                      handleSocialFieldChange("ogSiteName", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Twitter Card Type
                  </label>
                  <select
                    value={seo?.social?.twitterCard || "summary_large_image"}
                    onChange={(e) =>
                      handleSocialFieldChange("twitterCard", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  >
                    <option value="summary_large_image">
                      Summary Large Image (Recommended)
                    </option>
                    <option value="summary">Summary Small Card</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Live WhatsApp / Facebook Share Card Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Share2 className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-white">
                  Live Social Share Preview
                </h3>
              </div>

              <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                {/* Image Banner */}
                <div className="w-full h-48 bg-slate-800 relative overflow-hidden flex items-center justify-center">
                  <img
                    src={seo?.social?.ogImage || "/hero/hero1.webp"}
                    alt="Social preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/hero/hero1.webp";
                    }}
                  />
                </div>
                {/* Card Meta Content */}
                <div className="p-4 bg-slate-900 border-t border-slate-800">
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    HOTELSHERPASOUL.COM
                  </span>
                  <h4 className="text-white text-sm font-bold mt-1 line-clamp-1">
                    {seo?.social?.ogTitle || "Hotel Sherpa Soul | Boutique Stay"}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {seo?.social?.ogDescription ||
                      "Experience peaceful boutique comfort in the heart of Thamel, Kathmandu."}
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-3 text-center">
                This is how the link appears when shared on WhatsApp, Facebook, iMessage, and Twitter.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. ANALYTICS & WEBMASTER SUITE */}
      {activeSubTab === "analytics" && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-400" />
                Webmaster Verification & Tracking Tags
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your measurement IDs to enable tracking without touching code.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Google Analytics 4 */}
              <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/60 space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Google Analytics 4 (GA4) ID
                </label>
                <input
                  type="text"
                  value={seo?.analytics?.ga4Id || ""}
                  onChange={(e) =>
                    handleAnalyticsFieldChange("ga4Id", e.target.value.trim())
                  }
                  placeholder="e.g. G-XXXXXXXXXX"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-mono"
                />
                <p className="text-[11px] text-slate-400">
                  Tracks visitors, conversions, and traffic sources across all pages.
                </p>
              </div>

              {/* Google Tag Manager */}
              <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/60 space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Google Tag Manager (GTM) ID
                </label>
                <input
                  type="text"
                  value={seo?.analytics?.gtmId || ""}
                  onChange={(e) =>
                    handleAnalyticsFieldChange("gtmId", e.target.value.trim())
                  }
                  placeholder="e.g. GTM-PFRV7ZTV"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-mono"
                />
                <p className="text-[11px] text-slate-400">
                  Container ID for custom Google Tag Manager tags.
                </p>
              </div>

              {/* Meta Pixel */}
              <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/60 space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Meta / Facebook Pixel ID
                </label>
                <input
                  type="text"
                  value={seo?.analytics?.metaPixelId || ""}
                  onChange={(e) =>
                    handleAnalyticsFieldChange("metaPixelId", e.target.value.trim())
                  }
                  placeholder="e.g. 1952950858737501"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-mono"
                />
                <p className="text-[11px] text-slate-400">
                  Tracks PageView, InitiateCheckout, Contact, and Lead events.
                </p>
              </div>

              {/* Google Search Console Verification */}
              <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/60 space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Google Search Console Verification Tag
                </label>
                <input
                  type="text"
                  value={seo?.analytics?.googleVerification || ""}
                  onChange={(e) =>
                    handleAnalyticsFieldChange(
                      "googleVerification",
                      e.target.value.trim()
                    )
                  }
                  placeholder="e.g. cZ5JAFfqiZ7VDvThWPrhplQFXBaEIlUHunGdP0JaNVQ"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-mono"
                />
                <p className="text-[11px] text-slate-400">
                  HTML tag verification string for Google Search Console ownership.
                </p>
              </div>
            </div>

            {/* Custom Scripts */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Custom Header Code / Verification Meta Tags (&lt;head&gt;)
                </label>
                <textarea
                  rows={3}
                  value={seo?.analytics?.customHeadScript || ""}
                  onChange={(e) =>
                    handleAnalyticsFieldChange("customHeadScript", e.target.value)
                  }
                  placeholder="<!-- e.g. Bing verification, Pinterest meta, etc. -->"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Custom Body Tracking Code (&lt;body&gt;)
                </label>
                <textarea
                  rows={3}
                  value={seo?.analytics?.customBodyScript || ""}
                  onChange={(e) =>
                    handleAnalyticsFieldChange("customBodyScript", e.target.value)
                  }
                  placeholder="<!-- e.g. Live chat widgets, heatmaps, etc. -->"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. SCHEMA.ORG (JSON-LD) */}
      {activeSubTab === "schema" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                Hotel Schema Attributes
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Hotel Legal Name
                </label>
                <input
                  type="text"
                  value={seo?.schema?.hotelName || "Hotel Sherpa Soul"}
                  onChange={(e) => handleSchemaFieldChange("hotelName", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Telephone
                  </label>
                  <input
                    type="text"
                    value={seo?.schema?.telephone || "+977-9851068219"}
                    onChange={(e) =>
                      handleSchemaFieldChange("telephone", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={seo?.schema?.email || "info@hotelsherpasoul.com"}
                    onChange={(e) => handleSchemaFieldChange("email", e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  value={seo?.schema?.addressStreet || "Thamel Bhagawati Marg 26"}
                  onChange={(e) =>
                    handleSchemaFieldChange("addressStreet", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={seo?.schema?.latitude || "27.7154"}
                    onChange={(e) =>
                      handleSchemaFieldChange("latitude", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={seo?.schema?.longitude || "85.3106"}
                    onChange={(e) =>
                      handleSchemaFieldChange("longitude", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Check-in Time
                  </label>
                  <input
                    type="text"
                    value={seo?.schema?.checkinTime || "14:00"}
                    onChange={(e) =>
                      handleSchemaFieldChange("checkinTime", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Check-out Time
                  </label>
                  <input
                    type="text"
                    value={seo?.schema?.checkoutTime || "12:00"}
                    onChange={(e) =>
                      handleSchemaFieldChange("checkoutTime", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Generated JSON-LD Structured Data
                </span>
                <button
                  onClick={copySchemaToClipboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors"
                >
                  {copiedSchema ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Schema</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-emerald-400 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[420px]">
                {JSON.stringify(generatedSchema, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 5. CANONICAL & ROBOTS */}
      {activeSubTab === "robots" && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-400" />
            Indexing & Canonical URL Configuration
          </h3>

          <div className="space-y-5 max-w-2xl">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Canonical Base URL
              </label>
              <input
                type="text"
                value={seo?.global?.canonicalBase || "https://hotelsherpasoul.com"}
                onChange={(e) =>
                  handleGlobalFieldChange("canonicalBase", e.target.value.trim())
                }
                placeholder="https://hotelsherpasoul.com"
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Used to generate self-referencing canonical tags, preventing duplicate content penalties.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Robots Meta Directives
              </label>
              <input
                type="text"
                value={
                  seo?.global?.robots ||
                  "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
                }
                onChange={(e) =>
                  handleGlobalFieldChange("robots", e.target.value)
                }
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Standard: <code className="text-amber-400">index, follow</code> tells search engines to index and rank your pages.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
