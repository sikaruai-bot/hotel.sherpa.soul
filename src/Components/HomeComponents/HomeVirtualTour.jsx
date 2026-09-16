import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Video,
  Play,
  Maximize2,
  Minimize2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Eye,
  Film,
  Volume2,
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

  const badge = tour?.badge || "Hotel Video Tour";
  const title = tour?.title || "Take a Video Tour of Hotel Sherpa Soul";
  const subtitle = tour?.subtitle || "Experience Our Peaceful Stay Before You Arrive";
  const paragraph =
    tour?.paragraph ||
    "Watch our hotel walkthrough video to explore our comfortable rooms, private balconies, quiet corridors, and shared rooftop kitchen in Thamel, Kathmandu.";
  const coverImage = tour?.coverImage || "/room1/room.webp";
  const rawEmbedUrl = tour?.embedUrl || "";
  const buttonText = tour?.buttonText || "Book Your Stay Direct (10% Off)";
  const buttonLink = tour?.buttonLink || "/book-now";

  const defaultFeatures = [
    "Cozy, Clean & Peaceful Rooms",
    "Air Conditioned Deluxe Amenities",
    "Shared Kitchen for Long-Stay Guests",
    "Quiet Sleep Environment in Thamel",
  ];
  const features =
    Array.isArray(tour?.features) && tour.features.length > 0
      ? tour.features
      : defaultFeatures;

  const activeEmbedUrl = cleanTourEmbedUrl(rawEmbedUrl);

  // Auto-detect if it is a direct video file (data:video, .mp4, .webm, or blob)
  const isDirectVideo =
    tour?.tourType === "video" ||
    activeEmbedUrl.startsWith("data:video/") ||
    activeEmbedUrl.startsWith("blob:") ||
    activeEmbedUrl.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i);

  const isIframeOrEmbed =
    activeEmbedUrl.includes("youtube") ||
    activeEmbedUrl.includes("vimeo") ||
    activeEmbedUrl.includes("embed") ||
    tour?.tourType === "iframe" ||
    tour?.tourType === "youtube";

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
      id="video-tour"
      className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-[#0A192F] to-slate-950 text-white relative overflow-hidden"
    >
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide mb-4 shadow-sm backdrop-blur-md">
            <Video className="w-4 h-4 text-amber-400" />
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

        {/* Video Player Container */}
        <div
          ref={containerRef}
          className={`relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950 transition-all duration-500 ${
            isFullscreen
              ? "fixed inset-0 z-50 rounded-none border-none"
              : "w-full aspect-[16/10] sm:aspect-[16/9] max-h-[640px]"
          }`}
        >
          {!isPlaying ? (
            /* Cover / Launch Overlay (Ultra fast loading, loads video on click) */
            <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
              <img
                src={coverImage}
                alt="Hotel Sherpa Soul Video Tour"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                loading="lazy"
              />

              {/* Dark Gradient Veil */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-black/30" />

              {/* Central Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(true);
                  }}
                  className="group/btn relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#FB6C01] to-amber-400 text-white shadow-2xl shadow-amber-500/40 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/40"
                  aria-label="Play Hotel Tour Video"
                >
                  <span className="absolute inset-0 rounded-full border-2 border-amber-400/60 animate-ping opacity-75" />
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-0.5" />
                </button>

                <p className="mt-5 text-white font-bold text-lg sm:text-xl tracking-tight drop-shadow-md">
                  Watch Hotel Walkthrough Video
                </p>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md drop-shadow">
                  Click to see the rooms, shared kitchen, and peaceful surroundings.
                </p>

                {/* Video Badges */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-slate-200 text-xs font-medium">
                    <Film className="w-3.5 h-3.5 text-amber-400" />
                    HD Video Tour
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-slate-200 text-xs font-medium">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    Sound & Visuals
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Active Video Player View */
            <div className="relative w-full h-full bg-black">
              {isDirectVideo ? (
                /* Native MP4 / WebM HTML5 Video Player */
                <video
                  src={activeEmbedUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain bg-black"
                  poster={coverImage}
                />
              ) : isIframeOrEmbed && activeEmbedUrl ? (
                /* YouTube or Vimeo Player */
                <iframe
                  src={activeEmbedUrl}
                  title="Hotel Sherpa Soul Video Walkthrough"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                />
              ) : (
                /* Fallback if no video URL is provided yet */
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-400">
                  <Video className="w-12 h-12 text-amber-400 mb-3" />
                  <p className="text-base font-semibold text-white">No video uploaded yet</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Upload an MP4 video or paste a YouTube link in the CMS Admin panel.
                  </p>
                </div>
              )}

              {/* Viewer Controls (Top Right) */}
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
                  Close Video
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Feature Highlights Grid Below Video */}
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
              Like what you see in the video?
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
    </section>
  );
}
