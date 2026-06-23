import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  Users,
} from "lucide-react";
import ContactHero from "../Components/ContactComponents/ContactHero";
import ContactForm from "../Components/ContactComponents/ContactForm";
import ContactMap from "../Components/ContactComponents/ContactMap";

export default function ContactPage() {
  return (
    <div className="font-sans text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <ContactHero />

      {/* Contact Info Cards */}
      <ContactForm />
      {/* Location Info */}
      <ContactMap />
    </div>
  );
}
