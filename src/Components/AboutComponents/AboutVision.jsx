import { ChevronRight, Heart, Sparkles, Star } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useCMS } from "../../Context/CMSContext";
import BookingModal from "../HelperComponents/BookingModal";
import { trackMetaEvent } from "../Analytics/pixelEvents";

export default function AboutVision() {
  const { t } = useTranslation();
  const { content: cmsContent } = useCMS();
  const vision = cmsContent?.aboutVision || {};
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookingClick = () => {
    trackMetaEvent("InitiateCheckout", {
      content_category: "hotel_booking",
      entry_point: "about_vision_cta",
    });
    setIsBookingModalOpen(true);
  };

  return (
    <div>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
      <section className="relative min-h-[80vh] flex items-center justify-center px-4 md:px-8 bg-slate-400 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/changes_photo/feature1.webp"
            alt={vision.buddhistAlt || t("aboutVision.buddhistAlt") || "Buddhist Symbol - Hotel Sherpa Soul Kathmandu"}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#F69520]/40 via-slate-900/80 to-indigo-900/70"></div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 container mx-auto text-center px-4 max-w-4xl">
          <div className="space-y-10">
            {/* Main Heading */}
            <div>
              <span className="text-amber-300 text-sm font-bold uppercase tracking-widest block mb-2">
                Our Philosophy
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
                {t(
                  "aboutPageContent.philosophy.heading",
                  "No Restaurant. No Noise. Sleep Well."
                )}
              </h2>
            </div>

            {/* Philosophy Copy */}
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
              {t(
                "aboutPageContent.philosophy.copy",
                "We believe a hotel doesn't need to be complicated to feel welcoming. For us, hospitality is about creating a comfortable space where travelers can rest, recharge and feel ready for the next day."
              )}
            </p>

            {/* For Travelers Card */}
            <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 text-left">
              <h3 className="text-xl md:text-2xl font-bold text-amber-400 mb-3">
                {t(
                  "aboutPageContent.forTravelers.heading",
                  "From Kathmandu to the Himalayas"
                )}
              </h3>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                {t(
                  "aboutPageContent.forTravelers.copy",
                  "Many journeys through Nepal begin in Kathmandu. Whether you are visiting Nepal for culture and sightseeing, preparing for a Himalayan trek or returning from the mountains, Sherpa Soul is designed to be your comfortable Kathmandu base."
                )}
              </p>
            </div>

            {/* About Us Closing */}
            <div className="pt-4">
              <h4 className="text-xl md:text-2xl font-semibold text-white mb-6">
                {t(
                  "aboutPageContent.closing.heading",
                  "Come for Kathmandu. Stay for the comfort. Sleep well for the journey ahead."
                )}
              </h4>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleBookingClick}
                  className="group relative bg-[#FB6C01] hover:bg-[#E05A00] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {t("aboutPageContent.closing.cta", "Book Your Stay")}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-800/50 to-transparent"></div>
      </section>
    </div>
  );
}
