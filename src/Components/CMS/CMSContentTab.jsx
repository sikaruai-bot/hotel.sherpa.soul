import React, { useState } from "react";
import { Edit3, Sparkles, MapPin, Phone, Mail, MessageSquare, Info, Check } from "lucide-react";

export default function CMSContentTab({ content, onUpdateContent }) {
  const [activeSection, setActiveSection] = useState("hero"); // hero | philosophy | contact | footer

  const hero = content?.hero || {};
  const aboutVision = content?.aboutVision || {};
  const contact = content?.contact || {};
  const footer = content?.footer || {};

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

  return (
    <div className="space-y-8">
      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800">
        {[
          { id: "hero", label: "Hero Banner Content" },
          { id: "philosophy", label: "About & Philosophy Copy" },
          { id: "contact", label: "Contact, WhatsApp & Location" },
          { id: "footer", label: "Footer & Legal Information" },
        ].map((tab) => {
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all ${
                isActive
                  ? "bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. HERO BANNER */}
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

      {/* 2. PHILOSOPHY & ABOUT */}
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

      {/* 3. CONTACT & LOCATION */}
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

      {/* 4. FOOTER */}
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
