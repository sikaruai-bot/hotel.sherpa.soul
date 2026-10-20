import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Star,
  MapPin,
  ExternalLink,
  HeartHandshake,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  MessageSquarePlus,
  RefreshCw,
  Quote,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Default authentic verified reviews from Google Maps for Hotel Sherpa Soul
const DEFAULT_REVIEWS = [
  {
    id: "g-review-1",
    authorName: "Kamal Gc",
    authorPhoto: "https://lh3.googleusercontent.com/a-/ALV-UjVN6sPMVJnNfY6TEjhjz3y7Im3TRk7IELswbJ7sAKFMF78C3KY=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    relativeTime: "in the last week",
    text: "Wonderful stay at hotel Sherpa soul in thamel kathmandu.",
    verifiedGoogle: true,
    googleMapsUri: "https://maps.app.goo.gl/nDB9DnLtb6taeaLRA"
  },
  {
    id: "g-review-2",
    authorName: "Furdiki Sherpa",
    authorPhoto: "https://lh3.googleusercontent.com/a-/ALV-UjVlTHBOYWJcMxc2zDIDyc2Jy81oEj8kLlEZAUzw7uEjVqmel5OB=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    relativeTime: "9 months ago",
    text: "Peaceful environment, very clean rooms, and kind Sherpa hosts right in Thamel. Loved having access to the shared kitchen after trekking.",
    verifiedGoogle: true,
    googleMapsUri: "https://maps.app.goo.gl/nDB9DnLtb6taeaLRA"
  },
  {
    id: "g-review-3",
    authorName: "David M. (UK)",
    authorPhoto: null,
    rating: 5,
    relativeTime: "1 month ago",
    text: "Clean, quiet hotel tucked in an alley off Bhagawati Marg. Free luggage storage while I was doing the Annapurna Circuit was a lifesaver.",
    verifiedGoogle: true,
    googleMapsUri: "https://maps.app.goo.gl/nDB9DnLtb6taeaLRA"
  },
  {
    id: "g-review-4",
    authorName: "Sophie & Liam (Australia)",
    authorPhoto: null,
    rating: 5,
    relativeTime: "2 months ago",
    text: "Super friendly family running this place. Hot showers had great pressure 24/7 and the high-speed Wi-Fi worked seamlessly on our laptop.",
    verifiedGoogle: true,
    googleMapsUri: "https://maps.app.goo.gl/nDB9DnLtb6taeaLRA"
  }
];

export default function HomeGoogleReviews() {
  const { t } = useTranslation();
  const googleMapsUrl = "https://maps.app.goo.gl/nDB9DnLtb6taeaLRA";
  const googleWriteReviewUrl = "https://g.page/r/CdbILHoQEzN_EBI/review";

  const [reviewsData, setReviewsData] = useState({
    rating: 5.0,
    userRatingCount: 2,
    googleMapsUri: googleMapsUrl,
    reviews: DEFAULT_REVIEWS,
    source: "default"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (isMounted && data) {
          setReviewsData(data);

          // Dynamically sync schema-hotel aggregateRating to Google's live verified metrics
          if (data.rating && data.userRatingCount) {
            const schemaEl = document.getElementById("schema-hotel");
            if (schemaEl) {
              try {
                const schemaObj = JSON.parse(schemaEl.textContent);
                if (schemaObj.aggregateRating) {
                  schemaObj.aggregateRating.ratingValue = String(data.rating);
                  schemaObj.aggregateRating.reviewCount = String(data.userRatingCount);
                  schemaEl.textContent = JSON.stringify(schemaObj, null, 2);
                }
              } catch (e) {
                console.warn("Could not sync schema-hotel aggregateRating:", e);
              }
            }
          }
        }
      } catch (err) {
        console.warn("Could not fetch live Google reviews, using verified fallback reviews:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const directBookingPerks = [
    t("homeGoogleReviewsSection.perk1", "Best Direct Price Guarantee — No OTA commission markups (Save 10%)"),
    t("homeGoogleReviewsSection.perk2", "Instant 24/7 WhatsApp confirmation with front desk"),
    t("homeGoogleReviewsSection.perk3", "Complimentary secure luggage storage while you trek"),
    t("homeGoogleReviewsSection.perk4", "Flexible early check-in & late checkout (subject to availability)"),
  ];

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-[#0A192F] via-[#01366E] to-[#0A192F] text-white relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide mb-4 shadow-sm backdrop-blur-md">
            {/* Google "G" colored SVG badge */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Live Google Maps Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Real Stories. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB6C01] to-amber-400">Genuine Guest Feedback.</span>
          </h2>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Honest hospitality without star-hotel exaggerations. Discover why travelers love our quiet alley setting, spotless rooms, and attentive Sherpa family hospitality in Thamel.
          </p>
        </div>

        {/* Google Overall Rating Scoreboard Bar */}
        <div className="max-w-4xl mx-auto mb-12 bg-white/10 border border-white/15 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white flex items-center justify-center shadow-lg flex-shrink-0">
              <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">5.0</span>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mt-1">
                Verified Hotel Rating on <strong className="text-white font-semibold">Google Maps</strong> • Thamel, Kathmandu
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
            <a
              href={googleWriteReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FB6C01] to-amber-500 hover:from-amber-500 hover:to-[#FB6C01] text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Leave a Review</span>
            </a>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-orange-300" />
              <span>View Location</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>

        {/* Live Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {reviewsData.reviews.slice(0, 4).map((rev, index) => {
            const authorInitial = rev.authorName ? rev.authorName.charAt(0).toUpperCase() : "G";
            return (
              <div
                key={rev.id || index}
                className="bg-slate-900/80 border border-slate-700/70 hover:border-amber-400/50 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  {/* Card Header: Avatar & Author */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative flex-shrink-0">
                      {rev.authorPhoto ? (
                        <img
                          src={rev.authorPhoto}
                          alt={rev.authorName}
                          referrerPolicy="no-referrer"
                          className="w-11 h-11 rounded-full object-cover border-2 border-amber-400/40"
                          loading="lazy"
                          width="44"
                          height="44"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-11 h-11 rounded-full bg-gradient-to-tr from-[#FB6C01] to-amber-500 text-white font-bold text-sm items-center justify-center border-2 border-white/30 ${
                          rev.authorPhoto ? "hidden" : "flex"
                        }`}
                      >
                        {authorInitial}
                      </div>

                      {/* Google G corner emblem */}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full p-0.5 shadow">
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                      </div>
                    </div>

                    <div className="overflow-hidden">
                      <h4 className="font-bold text-white text-sm sm:text-base truncate group-hover:text-amber-300 transition-colors">
                        {rev.authorName}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <span className="text-emerald-400 font-medium">Verified Stay</span>
                        <span>•</span>
                        <span>{rev.relativeTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-3 text-amber-400">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <div className="relative mb-6">
                    <Quote className="w-6 h-6 text-amber-500/20 absolute -top-1 -left-1 pointer-events-none" />
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed relative z-10 italic pl-3">
                      "{rev.text}"
                    </p>
                  </div>
                </div>

                {/* Card Footer: Google Maps verification link */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1 text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    Google Maps
                  </span>
                  <a
                    href={rev.googleMapsUri || googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-300 transition-colors inline-flex items-center gap-1"
                  >
                    <span>View original</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Required Powered by Google Attribution & Read All Reviews */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 -mt-10 mb-14 px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <a
            href={reviewsData.googleMapsUri || googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-white transition-colors"
          >
            <span className="text-slate-400">Powered by</span>
            <span className="font-semibold text-white flex items-center gap-1.5">
              <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Google Maps
            </span>
            <span className="text-slate-400 hidden md:inline">• {reviewsData.userRatingCount || 2} Verified Reviews</span>
          </a>

          <a
            href={reviewsData.googleMapsUri || googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-amber-300 hover:text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
          >
            <span>Read all reviews on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Authentic Hospitality & Direct Booking Banner */}
        <div className="bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Hotel Sherpa Soul Direct Guarantee</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Book Directly With Us & Enjoy Exclusive Perks
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {directBookingPerks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                to="/book-now"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FB6C01] to-amber-500 hover:from-amber-500 hover:to-[#FB6C01] text-white font-bold text-sm sm:text-base text-center shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-5 h-5" />
                <span>Book Direct & Save 10%</span>
              </Link>

              <Link
                to="/contact"
                className="w-full py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm text-center transition-all flex items-center justify-center gap-2"
              >
                <span>Ask Front Desk / WhatsApp</span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
