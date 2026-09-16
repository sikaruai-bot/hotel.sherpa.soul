import React, { useState } from "react";
import {
  Edit3,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Compass,
  Video,
  Upload,
  Eye,
  CheckCircle2,
  Trash2,
  Plus,
  ExternalLink,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import { optimizeMediaFile, HOTEL_PRESET_PHOTOS } from "./mediaUtils";
import { cleanTourEmbedUrl } from "../HomeComponents/HomeVirtualTour";

export default function CMSContentTab({ content, onUpdateContent }) {
  const [activeSection, setActiveSection] = useState("virtualTour"); // virtualTour | hero | philosophy | contact | footer

  const hero = content?.hero || {};
  const aboutVision = content?.aboutVision || {};
  const contact = content?.contact || {};
  const footer = content?.footer || {};
  const virtualTour = content?.virtualTour || {
    enabled: true,
    badge: "360° Virtual Experience",
    title: "Step Inside Hotel Sherpa Soul in 360°",
    subtitle: "Immersive Room & Hotel Walkthrough",
    paragraph:
      "Take an interactive virtual walkthrough of our boutique rooms, private balconies, quiet corridors, rooftop terrace, and shared guest kitchen in Thamel, Kathmandu before arriving.",
    tourType: "iframe",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.186847847385!2d85.3106263!3d27.7154032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19502be1b869%3A0xb304b7b2fb66a1ec!2sHotel%20Sherpa%20Soul!5e0!3m2!1sen!2snp!4v1717000000000!5m2!1sen!2snp",
    coverImage: "/room1/room.webp",
    buttonText: "Book Your Stay Direct (10% Off)",
    buttonLink: "/book-now",
    features: [
      "Interactive 360° Room Walkthrough",
      "Air Conditioned Deluxe Rooms",
      "Fully Equipped Shared Kitchen",
      "Quiet & Soundproofed Sleep Environment",
    ],
  };

  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [newFeatureText, setNewFeatureText] = useState("");

  const handleHeroChange = (field, val) => {
    onUpdateContent("hero", { [field]: val });
  };

  const handleVisionChange = (field, val) => {
    onUpdateContent("aboutVision", { [field]: val });
  };

  const handleContactChange = (field, val) => {
    onUpdateContent("contact", { [field]: val });
  };

  const handleFooterChange = (field, val) => {
    onUpdateContent("footer", { [field]: val });
  };

  const handleVirtualTourChange = (field, val) => {
    onUpdateContent("virtualTour", { [field]: val });
  };

  // Upload custom cover photo
  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingCover(true);
      const res = await optimizeMediaFile(file);
      handleVirtualTourChange("coverImage", res.src);
    } catch (err) {
      alert("Failed to process cover image: " + err.message);
    } finally {
      setUploadingCover(false);
      e.target.value = "";
    }
  };

  // Upload video file directly
  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingVideo(true);
      const res = await optimizeMediaFile(file);
      handleVirtualTourChange("embedUrl", res.src);
      handleVirtualTourChange("tourType", "video");
    } catch (err) {
      alert("Failed to process video: " + err.message);
    } finally {
      setUploadingVideo(false);
      e.target.value = "";
    }
  };

  // Add new feature tag
  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    const currentFeatures = virtualTour.features || [];
    handleVirtualTourChange("features", [...currentFeatures, newFeatureText.trim()]);
    setNewFeatureText("");
  };

  // Remove feature tag
  const handleRemoveFeature = (indexToRemove) => {
    const currentFeatures = virtualTour.features || [];
    handleVirtualTourChange(
      "features",
      currentFeatures.filter((_, idx) => idx !== indexToRemove)
    );
  };

  const previewCleanUrl = cleanTourEmbedUrl(virtualTour.embedUrl);

  return (
    <div className="space-y-8">
      {/* Sub-tabs Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800">
        {[
          { id: "virtualTour", label: "360° Virtual Tour", icon: Compass, badge: "New" },
          { id: "hero", label: "Hero Banner Content", icon: Sparkles },
          { id: "philosophy", label: "About & Philosophy Copy", icon: Edit3 },
          { id: "contact", label: "Contact, WhatsApp & Location", icon: MapPin },
          { id: "footer", label: "Footer & Legal Information", icon: CheckCircle2 },
        ].map((tab) => {
          const isActive = activeSection === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all ${
                isActive
                  ? "bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/30 text-slate-950">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 0. 360° VIRTUAL TOUR SECTION BUILDER */}
      {/* ============================================================ */}
      {activeSection === "virtualTour" && (
        <div className="space-y-8">
          {/* Status & Overview Bar */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    360° Virtual Tour Experience
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  Allow travelers to explore Hotel Sherpa Soul in full 360° panoramic view, YouTube walkthrough, or Google 360.
                </p>
              </div>

              {/* Enable / Disable Toggle */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-300">
                  Section Status:
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleVirtualTourChange("enabled", !virtualTour.enabled)
                  }
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${
                    virtualTour.enabled !== false ? "bg-emerald-500" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      virtualTour.enabled !== false ? "translate-x-8" : "translate-x-1"
                    }`}
                  />
                </button>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    virtualTour.enabled !== false
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-slate-800 text-slate-400 border border-slate-700"
                  }`}
                >
                  {virtualTour.enabled !== false ? "Visible on Site" : "Hidden"}
                </span>
              </div>
            </div>

            {/* Main Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
              {/* Left Column: Settings & URLs */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Choose Tour Format */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    1. Select Virtual Tour Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      {
                        id: "iframe",
                        label: "Google 360 / Embed",
                        desc: "Street View / Matterport / Kuula",
                      },
                      {
                        id: "youtube",
                        label: "YouTube Video",
                        desc: "YouTube 360 or Walkthrough",
                      },
                      {
                        id: "video",
                        label: "MP4 Video",
                        desc: "Direct Video URL / Upload",
                      },
                      {
                        id: "image",
                        label: "360 Panoramic",
                        desc: "Panoramic Photo View",
                      },
                    ].map((t) => {
                      const selected = (virtualTour.tourType || "iframe") === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => handleVirtualTourChange("tourType", t.id)}
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            selected
                              ? "bg-amber-500/15 border-amber-400 text-white shadow-md shadow-amber-500/10"
                              : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-white"
                          }`}
                        >
                          <p className="font-bold text-xs">{t.label}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{t.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Tour Link / Embed Snippet Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      2. Virtual Tour Link or Embed Code
                    </label>
                    <span className="text-[11px] text-amber-400">
                      Auto-extracts link from &lt;iframe&gt; or YouTube
                    </span>
                  </div>

                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      value={virtualTour.embedUrl || ""}
                      onChange={(e) =>
                        handleVirtualTourChange("embedUrl", e.target.value)
                      }
                      placeholder={
                        virtualTour.tourType === "youtube"
                          ? "e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or https://youtu.be/..."
                          : virtualTour.tourType === "video"
                          ? "e.g. https://example.com/tour.mp4 or click upload below"
                          : "Paste full Google Maps 360 embed code <iframe src='...'></iframe> or 360 tour URL"
                      }
                      className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />

                    <div className="flex flex-wrap items-center gap-3">
                      {/* Direct MP4 File Upload */}
                      <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer border border-slate-700 transition-colors">
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>
                          {uploadingVideo ? "Uploading..." : "Upload MP4 Video File"}
                        </span>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleVideoUpload}
                          className="hidden"
                          disabled={uploadingVideo}
                        />
                      </label>

                      {previewCleanUrl && (
                        <a
                          href={previewCleanUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open Embed Link in New Tab</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Cover Image Selection */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    3. Cover Preview Image (Displayed before visitor clicks to play)
                  </label>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-28 h-20 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0">
                      <img
                        src={virtualTour.coverImage || "/room1/room.webp"}
                        alt="Virtual Tour Cover Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      <input
                        type="text"
                        value={virtualTour.coverImage || ""}
                        onChange={(e) =>
                          handleVirtualTourChange("coverImage", e.target.value)
                        }
                        placeholder="/room1/room.webp or image URL"
                        className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                      />

                      <div className="flex flex-wrap gap-2">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold cursor-pointer border border-amber-500/30 transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>
                            {uploadingCover ? "Optimizing..." : "Upload New Cover"}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverUpload}
                            className="hidden"
                            disabled={uploadingCover}
                          />
                        </label>

                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              handleVirtualTourChange("coverImage", e.target.value);
                            }
                          }}
                          className="px-3 py-1.5 bg-slate-800 text-slate-200 text-xs rounded-lg border border-slate-700 focus:outline-none"
                        >
                          <option value="">Choose from Hotel Photos...</option>
                          {HOTEL_PRESET_PHOTOS.map((p, idx) => (
                            <option key={idx} value={p.path}>
                              {p.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Headlines & Description */}
                <div className="space-y-4 pt-2 border-t border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Badge Tagline
                      </label>
                      <input
                        type="text"
                        value={virtualTour.badge || ""}
                        onChange={(e) =>
                          handleVirtualTourChange("badge", e.target.value)
                        }
                        placeholder="360° Virtual Experience"
                        className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Subtitle / Accent Line
                      </label>
                      <input
                        type="text"
                        value={virtualTour.subtitle || ""}
                        onChange={(e) =>
                          handleVirtualTourChange("subtitle", e.target.value)
                        }
                        placeholder="Immersive Room & Hotel Walkthrough"
                        className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Main Section Title (H2)
                    </label>
                    <input
                      type="text"
                      value={virtualTour.title || ""}
                      onChange={(e) =>
                        handleVirtualTourChange("title", e.target.value)
                      }
                      placeholder="Step Inside Hotel Sherpa Soul in 360°"
                      className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Introductory Description
                    </label>
                    <textarea
                      rows={3}
                      value={virtualTour.paragraph || ""}
                      onChange={(e) =>
                        handleVirtualTourChange("paragraph", e.target.value)
                      }
                      placeholder="Take an interactive virtual walkthrough..."
                      className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* 5. Feature Highlights Badges */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Feature Highlights (Shown below the tour)
                  </label>

                  <div className="space-y-2">
                    {(virtualTour.features || []).map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) => {
                            const updated = [...virtualTour.features];
                            updated[idx] = e.target.value;
                            handleVirtualTourChange("features", updated);
                          }}
                          className="flex-1 bg-transparent text-sm text-white focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Delete feature"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newFeatureText}
                        onChange={(e) => setNewFeatureText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddFeature();
                          }
                        }}
                        placeholder="Add new highlight (e.g. Sunny Balcony with Mountain View)"
                        className="flex-1 px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                      />
                      <button
                        type="button"
                        onClick={handleAddFeature}
                        className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* 6. Direct Booking CTA Button */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={virtualTour.buttonText || "Book Your Stay Direct (10% Off)"}
                      onChange={(e) =>
                        handleVirtualTourChange("buttonText", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      CTA Button Link
                    </label>
                    <input
                      type="text"
                      value={virtualTour.buttonLink || "/book-now"}
                      onChange={(e) =>
                        handleVirtualTourChange("buttonLink", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Live Interactive Preview */}
              <div className="lg:col-span-5 space-y-4">
                <div className="sticky top-24 bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-amber-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                        Live Tour Preview
                      </h4>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      Type: {virtualTour.tourType || "iframe"}
                    </span>
                  </div>

                  {/* Mock Container */}
                  <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-slate-800 bg-black relative shadow-inner">
                    {previewCleanUrl ? (
                      virtualTour.tourType === "video" ? (
                        <video
                          src={previewCleanUrl}
                          controls
                          className="w-full h-full object-contain"
                          poster={virtualTour.coverImage || "/room1/room.webp"}
                        />
                      ) : (
                        <iframe
                          src={previewCleanUrl}
                          title="Virtual Tour Preview"
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                          allowFullScreen
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-500">
                        <Compass className="w-8 h-8 mb-2 opacity-50" />
                        <p className="text-xs">Paste a tour embed URL to preview</p>
                      </div>
                    )}
                  </div>

                  {/* Preview Content Metadata */}
                  <div className="space-y-1.5 text-left p-3 rounded-2xl bg-slate-900/90 border border-slate-800/80">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      {virtualTour.badge || "360° Virtual Experience"}
                    </span>
                    <h5 className="font-bold text-sm text-white">
                      {virtualTour.title || "Step Inside Hotel Sherpa Soul in 360°"}
                    </h5>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {virtualTour.paragraph || "Take an interactive virtual walkthrough..."}
                    </p>
                  </div>

                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-2 text-xs text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Any edits made here are instantly autosaved and live!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. HERO BANNER */}
      {/* ============================================================ */}
      {activeSection === "hero" && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Homepage Hero Copywriting
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Changes made here immediately update the front banner on the homepage.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Main Headline (H1)
              </label>
              <input
                type="text"
                value={hero.title || ""}
                onChange={(e) => handleHeroChange("title", e.target.value)}
                placeholder="A Simple Stay in Thamel. A Better Night's Sleep."
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Subtitle / Slogan
              </label>
              <input
                type="text"
                value={hero.subtitle || ""}
                onChange={(e) => handleHeroChange("subtitle", e.target.value)}
                placeholder="No Restaurant. No Noise. Sleep Well."
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Introductory Paragraph
              </label>
              <textarea
                rows={4}
                value={hero.paragraph || ""}
                onChange={(e) => handleHeroChange("paragraph", e.target.value)}
                placeholder="Welcome to Hotel Sherpa Soul..."
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Primary Booking Button Text
                </label>
                <input
                  type="text"
                  value={hero.bookButtonText || "Book Your Stay"}
                  onChange={(e) =>
                    handleHeroChange("bookButtonText", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Secondary Tour Button Text
                </label>
                <input
                  type="text"
                  value={hero.tourButtonText || "View Our Rooms"}
                  onChange={(e) =>
                    handleHeroChange("tourButtonText", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. PHILOSOPHY & ABOUT */}
      {/* ============================================================ */}
      {activeSection === "philosophy" && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-amber-400" />
              Philosophy & Vision Story
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Edit the core brand storytelling displayed on the About page.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Philosophy Section Title
              </label>
              <input
                type="text"
                value={aboutVision.title || ""}
                onChange={(e) => handleVisionChange("title", e.target.value)}
                placeholder="Philosophy: No Restaurant. No Noise. Sleep Well."
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Opening Phrase (Part 1)
                </label>
                <textarea
                  rows={3}
                  value={aboutVision.part1 || ""}
                  onChange={(e) => handleVisionChange("part1", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Highlighted Core Message
                </label>
                <textarea
                  rows={3}
                  value={aboutVision.highlight || ""}
                  onChange={(e) =>
                    handleVisionChange("highlight", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none text-amber-400 font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Ending Phrase (Part 2)
                </label>
                <textarea
                  rows={3}
                  value={aboutVision.part2 || ""}
                  onChange={(e) => handleVisionChange("part2", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Paragraph 2 (Understanding Hospitality)
              </label>
              <textarea
                rows={3}
                value={aboutVision.para2 || ""}
                onChange={(e) => handleVisionChange("para2", e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Paragraph 3 (What We Offer)
              </label>
              <textarea
                rows={3}
                value={aboutVision.para3 || ""}
                onChange={(e) => handleVisionChange("para3", e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. CONTACT & LOCATION */}
      {/* ============================================================ */}
      {activeSection === "contact" && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              Contact Information & Google Maps
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Used in the Contact page, Navigation quick buttons, and Footer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" /> Reception Phone
              </label>
              <input
                type="text"
                value={contact.phone || ""}
                onChange={(e) => handleContactChange("phone", e.target.value)}
                placeholder="+977 9851068219"
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp Direct Booking Number
              </label>
              <input
                type="text"
                value={contact.whatsapp || ""}
                onChange={(e) => handleContactChange("whatsapp", e.target.value)}
                placeholder="+977 9851139414"
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" /> Official Email Address
              </label>
              <input
                type="email"
                value={contact.email || ""}
                onChange={(e) => handleContactChange("email", e.target.value)}
                placeholder="info@hotelsherpasoul.com"
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Physical Street Address
              </label>
              <input
                type="text"
                value={contact.address || ""}
                onChange={(e) => handleContactChange("address", e.target.value)}
                placeholder="Thamel Bhagawati Marg 26, Kathmandu, Nepal"
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Google Maps Embed iFrame URL
            </label>
            <input
              type="text"
              value={contact.mapEmbedUrl || ""}
              onChange={(e) => handleContactChange("mapEmbedUrl", e.target.value)}
              placeholder="https://www.google.com/maps/embed?..."
              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. FOOTER & LEGAL */}
      {/* ============================================================ */}
      {activeSection === "footer" && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-base font-semibold text-white">
              Footer Details & Copyright
            </h3>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Brand Bio / Short Intro
              </label>
              <textarea
                rows={3}
                value={footer.bio || ""}
                onChange={(e) => handleFooterChange("bio", e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Emergency Contact Phone
                </label>
                <input
                  type="text"
                  value={footer.emergency || ""}
                  onChange={(e) => handleFooterChange("emergency", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Copyright Notice
                </label>
                <input
                  type="text"
                  value={footer.copyright || ""}
                  onChange={(e) => handleFooterChange("copyright", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
