import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Play,
  Maximize2,
  Minimize2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RotateCw,
  Eye,
  ShieldCheck,
  Bed,
  Utensils,
  VolumeX,
} from "lucide-react";
import { useCMS } from "../../Context/CMSContext";

export const cleanTourEmbedUrl = (rawInput) => {
  if (!rawInput) return "";
  const trimmed = String(rawInput).trim();

  // If user pasted an iframe tag, extract the src attribute
  const iframeMatch = trimmed.match(/src=["']([^"']+)["']/i);
  if (iframeMatch && iframeMatch[1]) {
    return iframeMatch[1];
  }

  // If YouTube link
  if (trimmed.includes("youtube.com/watch")) {
    try {
      const urlObj = new URL(trimmed);
      const v = urlObj.searchParams.get("v");
      if (v) return `https://www.youtube-nocookie.com/embed/${v}?autoplay=1&rel=0&modestbranding=1`;
    } catch (e) {
      // fallback
    }
  }
  if (trimmed.includes("youtu.be/")) {
    const id = trimmed.split("youtu.be/")[1]?.split("?")[0]?.split("&")[0];
    if (id) return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  }
  if (trimmed.includes("youtube.com/shorts/")) {
    const id = trimmed.split("youtube.com/shorts/")[1]?.split("?")[0];
    if (id) return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  }

  // If Vimeo
  if (trimmed.includes("vimeo.com/")) {
    const id = trimmed.split("vimeo.com/")[1]?.split("?")[0];
    if (id && !trimmed.includes("player.vimeo.com")) {
      return `https://player.vimeo.com/video/${id}?autoplay=1`;
    }
  }

  return trimmed;
};

export default function HomeVirtualTour() {
  const { content } = useCMS();
  const tour = content?.virtualTour;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  // If explicitly disabled in CMS, do not render section
  if (tour?.enabled === false) {
    return null;
  }

  const badge = tour?.badge || "360° Virtual Experience";
  const title = tour?.title || "Step Inside Hotel Sherpa Soul in 360°";
  const subtitle = tour?.subtitle || "Immersive Room & Hotel Walkthrough";
  const paragraph =
    tour?.paragraph ||
    "Take an interactive virtual walkthrough of our boutique rooms, private balconies, quiet corridors, rooftop terrace, and shared guest kitchen in Thamel, Kathmandu before arriving.";
  const coverImage = tour?.coverImage || "/room1/room.webp";
  const rawEmbedUrl =
    tour?.embedUrl ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.186847847385!2d85.3106263!3d27.7154032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19502be1b869%3A0xb304b7b2fb66a1ec!2sHotel%20Sherpa%20Soul!5e0!3m2!1sen!2snp!4v1717000000000!5m2!1sen!2snp";
  const tourType = tour?.tourType || "iframe";
  const buttonText = tour?.buttonText || "Book Your Stay Direct (10% Off)";
  const buttonLink = tour?.buttonLink || "/book-now";

  const defaultFeatures = [
    "Interactive 360° Room Walkthrough",
    "Air Conditioned Deluxe Rooms",
    "Fully Equipped Shared Kitchen",
    "Quiet & Soundproofed Sleep Environment",
  ];
  const features = Array.isArray(tour?.features) && tour.features.length > 0
    ? tour.features
    : defaultFeatures;

  const activeEmbedUrl = cleanTourEmbedUrl(rawEmbedUrl);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.warn("Fullscreen error:", err));
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((err) => console.warn("Exit fullscreen error:", err));
    }
  };

  return (
    <section
      id="virtual-tour"
      className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-[#0A192F] to-slate-950 text-white relative overflow-hidden"
    >
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide mb-4 shadow-sm backdrop-blur-md">
            <Compass className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>{badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {title}
          </h2>

          <p className="text-amber-400 font-semibold text-base sm:text-lg mb-3">
            {subtitle}
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {paragraph}
          </p>
        </div>

        {/* 360 Interactive Viewer Container */}
        <div
          ref={containerRef}
          className={`relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950 transition-all duration-500 ${
            isFullscreen ? "fixed inset-0 z-50 rounded-none border-none" : "w-full aspect-[16/10] sm:aspect-[16/9] max-h-[640px]"
          }`}
        >
          {!isPlaying ? (
            /* Cover / Launch Overlay (Saves bandwidth & loads instantly) */
            <div className="relative w-full h-full group">
              <img
                src={coverImage}
                alt="Hotel Sherpa Soul 360 Virtual Tour Preview"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                loading="lazy"
              />

              {/* Dark Gradient Veil */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-black/30" />

              {/* Central Start Tour Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="group/btn relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#FB6C01] to-amber-400 text-white shadow-2xl shadow-amber-500/40 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/40"
                  aria-label="Start 360 Virtual Tour"
                >
                  <span className="absolute inset-0 rounded-full border-2 border-amber-400/60 animate-ping opacity-75" />
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-0.5" />
                </button>

                <p className="mt-5 text-white font-bold text-lg sm:text-xl tracking-tight drop-shadow-md">
                  Click to Explore in 360°
                </p>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md drop-shadow">
                  Rotate, zoom, and walk through our boutique hotel before check-in.
                </p>

                {/* Quick 360 Pill Badges */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-slate-200 text-xs font-medium">
                    <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                    360° Panoramic
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-slate-200 text-xs font-medium">
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    Interactive Room View
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Active 360 Frame / Video View */
            <div className="relative w-full h-full bg-black">
              {tourType === "video" ? (
                <video
                  src={activeEmbedUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  poster={coverImage}
                />
              ) : tourType === "image" ? (
                <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                  <img
                    src={activeEmbedUrl || coverImage}
                    alt="360 Panorama Room View"
                    className="w-full h-full object-cover animate-pan"
                  />
                  <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs text-amber-300 border border-slate-700">
                    360° Panoramic Photo View
                  </div>
                </div>
              ) : (
                /* Standard Embed: Google 360 Street View / Matterport / Kuula / YouTube 360 */
                <iframe
                  src={activeEmbedUrl}
                  title="Hotel Sherpa Soul 360 Virtual Walkthrough"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; xr-spatial-tracking; fullscreen"
                  allowFullScreen
                  loading="lazy"
                />
              )}

              {/* Floating Viewer Controls (Top Right) */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                <button
                  onClick={toggleFullscreen}
                  className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white backdrop-blur-md border border-slate-700/80 transition-all shadow-lg hover:scale-105"
                  title={isFullscreen ? "Exit Fullscreen" : "View Fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Maximize2 className="w-4 h-4 text-amber-400" />
                  )}
                </button>

                <button
                  onClick={() => setIsPlaying(false)}
                  className="px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white backdrop-blur-md border border-slate-700/80 text-xs font-semibold transition-all shadow-lg"
                >
                  Exit Tour
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Feature Highlights Grid Below Tour */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {features.map((featureText, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm flex items-start gap-3 hover:border-amber-400/40 transition-colors"
            >
              <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-snug">
                  {featureText}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Direct CTA Bar */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-800/90 via-slate-800/60 to-slate-800/90 border border-slate-700/70 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Booking Guarantee
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Like what you see in the tour?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Book direct with us today to secure the best rates and an exclusive 10% direct discount.
            </p>
          </div>

          <Link
            to={buttonLink}
            className="flex-shrink-0 px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#FB6C01] to-amber-500 hover:from-amber-500 hover:to-[#FB6C01] text-white font-bold text-sm sm:text-base shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Embedded style for subtle panorama animation when in image mode */}
      <style>{`
        @keyframes pan {
          0% { object-position: left center; }
          50% { object-position: right center; }
          100% { object-position: left center; }
        }
        .animate-pan {
          animation: pan 25s ease-in-out infinite;
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
