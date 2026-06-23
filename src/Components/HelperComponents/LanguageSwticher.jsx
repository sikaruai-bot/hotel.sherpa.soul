import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "en");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const languages = [
    { code: "en", label: "EN", flag: "🇺🇸", name: "English" },
    { code: "zh", label: "ZH", flag: "🇨🇳", name: "Chinese" },
    { code: "ar", label: "AR", flag: "🇦🇪", name: "Arabic" },
    { code: "rs", label: "RU", flag: "🇷🇺", name: "Russian" },
    { code: "es", label: "ES", flag: "🇪🇸", name: "Spanish" },
    { code: "fr", label: "FR", flag: "🇫🇷", name: "French" },
    { code: "de", label: "DE", flag: "🇩🇪", name: "German" },
    { code: "it", label: "IT", flag: "🇮🇹", name: "Italian" },
  ];

  const selectLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === currentLang) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Menu - Opens upward */}
      {isOpen && (
        //  <div className="absolute bottom-full right-0 mb-2 w-48 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-lg shadow-xl max-h-64 overflow-y-auto">
        <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-lg shadow-xl max-h-64 overflow-y-auto"> 
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => selectLanguage(language.code)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100/80 transition-colors duration-150 flex items-center gap-3 ${
                  currentLang === language.code
                    ? "bg-blue-50/80 text-blue-700"
                    : "text-gray-700"
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{language.label}</span>
                  <span className="text-xs text-gray-500">{language.name}</span>
                </div>
                {currentLang === language.code && (
                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Current language: ${currentLanguage.name}. Click to change language`}
        title="Change language"
        className="group flex items-center gap-2 md:gap-4 px-2 py-1 bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/30 active:scale-95"
      >
        <span className="text-xl group-hover:scale-110 transition-transform duration-200">
          {currentLanguage.flag}
        </span>
        <div className="hidden md:flex flex-col items-start">
          <span className="font-medium text-gray-700 text-sm">
            {currentLanguage.label}
          </span>
          <span className="text-xs text-gray-500">{currentLanguage.name}</span>
        </div>
        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          <svg
            className={`w-3 h-3 text-white transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}


