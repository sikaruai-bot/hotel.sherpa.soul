import React from "react";
import { Link } from "react-router-dom";
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

      {/* Quick Navigation: Rooms & Travel Guide */}
      <section className="bg-slate-50 border-t border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-[#01366E]">Explore Hotel Sherpa Soul</h3>
            <p className="text-sm text-slate-600 mt-1">Ready to choose your room or need travel advice for Kathmandu and trekking?</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/rooms" className="px-5 py-2.5 bg-[#01366E] hover:bg-[#072545] text-white font-semibold rounded-xl text-sm transition-all shadow-sm">
              View Rooms &amp; Rates &rarr;
            </Link>
            <Link to="/blog" className="px-5 py-2.5 bg-white hover:bg-slate-100 text-[#01366E] border border-slate-300 font-semibold rounded-xl text-sm transition-all shadow-sm">
              Kathmandu Travel Guide &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
