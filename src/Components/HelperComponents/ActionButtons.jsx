import React from "react";
import WhatsAppButton from "./Whatsapp";
import LanguageSwitcher from "./LanguageSwticher";

export default function ActionButtons() {
  return (
    <div className="fixed bottom-4 right-4 left-4 flex justify-end gap-4 z-50">
      {/* First Button */}
      <WhatsAppButton />
    </div>
  );
}
