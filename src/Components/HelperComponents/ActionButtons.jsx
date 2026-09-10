import React, { useState } from "react";
import WhatsAppButton from "./Whatsapp";
import BookingModal from "./BookingModal";
import { trackMetaEvent } from "../Analytics/pixelEvents";

export default function ActionButtons() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 left-4 flex justify-between items-center z-40 pointer-events-none">
        {/* Floating 10% OFF Direct Booking Pill */}
        <div className="pointer-events-auto">
          <button
            onClick={() => {
              trackMetaEvent("InitiateCheckout", {
                content_category: "hotel_booking",
                entry_point: "floating_discount_pill",
              });
              setIsBookingModalOpen(true);
            }}
            className="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#01366E] to-[#0A2540] hover:from-[#FB6C01] hover:to-amber-500 text-white font-bold text-xs sm:text-sm shadow-2xl border border-amber-400/50 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
            title="Book directly and get 10% discount"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FB6C01]"></span>
            </span>
            <span className="bg-[#FB6C01] text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-full uppercase">
              10% OFF
            </span>
            <span className="tracking-tight sm:tracking-normal text-amber-200 group-hover:text-white transition-colors">
              Book Direct <span className="hidden sm:inline">& Save</span>
            </span>
          </button>
        </div>

        {/* WhatsApp Button */}
        <div className="pointer-events-auto">
          <WhatsAppButton />
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
