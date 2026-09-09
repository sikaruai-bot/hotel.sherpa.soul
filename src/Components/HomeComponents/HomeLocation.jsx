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
          <h2 className="text-3xl md:text-4xl font-bold text-[#01366E] mb-6">
            {t("contactMap.en.title")}
          </h2>

          <p className="text-base md:text-lg leading-relaxed mb-4">
            {t("contactMap.en.description")}
          </p>

          <ul className="space-y-4 mt-6">
            <li className="flex items-center gap-3">
              <MapPin className="text-[#FB6C01]" />
              <span>{t("contactMap.en.address")}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-[#FB6C01]" />
              <span>+977 9851068219</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-[#FB6C01]" />
              <span>{t("contactMap.en.email")}</span>
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
