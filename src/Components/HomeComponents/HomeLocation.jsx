import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HomeLocation() {
  const { t, i18n } = useTranslation();

  return (
    <div className="font-sans text-gray-800">
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <span>📍</span> Prime Thamel Location
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-[#01366E] mb-4 tracking-tight">
            {t("locationSection.heading", "Stay Where Kathmandu Comes Alive")}
          </h2>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 font-light">
            {t(
              "locationSection.copy",
              "From Hotel Sherpa Soul, Thamel is right outside your door. Discover Kathmandu's cafés, shops, local streets and travel hubs while keeping a peaceful place to return to after a day of exploring."
            )}
          </p>

          <div className="mb-6">
            <a
              href="https://maps.app.goo.gl/nDB9DnLtb6taeaLRA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#01366E] hover:bg-[#072340] text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>{t("locationSection.cta", "Explore Our Location")}</span>
              <MapPin className="w-4 h-4 text-amber-400" />
            </a>
          </div>

          <ul className="space-y-3 pt-2 border-t border-gray-200 text-sm">
            <li className="flex items-center gap-3 text-gray-700">
              <MapPin className="text-[#FB6C01] w-4 h-4 flex-shrink-0" />
              <span>{t("contactMap.en.address", "Thamel Bhagawati Marg 26, Kathmandu, Nepal")}</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <Phone className="text-[#FB6C01] w-4 h-4 flex-shrink-0" />
              <span>+977 9851068219</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <Mail className="text-[#FB6C01] w-4 h-4 flex-shrink-0" />
              <span>info@hotelsherpasoul.com</span>
            </li>
          </ul>
        </div>

        {/* Google Maps */}
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            title={t("homeLocation.mapTitle")}
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3532.0353113216966!2d85.310969!3d27.716196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDQyJzU4LjMiTiA4NcKwMTgnMzkuNSJF!5e0!3m2!1sen!2snp!4v1756878746121!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
