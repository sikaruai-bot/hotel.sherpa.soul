import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./Locales/en.json";
import ne from "./Locales/ne.json";
import hi from "./Locales/hi.json";
import ja from "./Locales/ja.json";
import ko from "./Locales/ko.json";
import nl from "./Locales/nl.json";
import he from "./Locales/he.json";
import pt from "./Locales/pt.json";
import ar from "./Locales/ar.json";
import ch from "./Locales/ch.json"; // Chinese translations
import rs from "./Locales/rs.json"; // Russian (example)
import es from "./Locales/es.json";
import de from "./Locales/de.json";
import it from "./Locales/it.json";
import fra from "./Locales/fra.json";

const supportedLanguages = [
  "en",
  "ne",
  "hi",
  "ja",
  "ko",
  "nl",
  "he",
  "pt",
  "ar",
  "zh",
  "rs",
  "es",
  "de",
  "it",
  "fra",
];

// Ensure stored language is valid
let currentLang = "en";
if (typeof window !== "undefined" && window.localStorage) {
  try {
    currentLang = localStorage.getItem("i18nextLng") || "en";
    if (!supportedLanguages.includes(currentLang)) {
      currentLang = "en";
      localStorage.setItem("i18nextLng", currentLang);
    }
  } catch (e) {
    currentLang = "en";
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    load: "languageOnly",
    resources: {
      en: { translation: en },
      ne: { translation: ne },
      hi: { translation: hi },
      ja: { translation: ja },
      ko: { translation: ko },
      nl: { translation: nl },
      he: { translation: he },
      pt: { translation: pt },
      ar: { translation: ar },
      zh: { translation: ch },
      rs: { translation: rs },
      es: { translation: es },
      de: { translation: de },
      it: { translation: it },
      fr: { translation: fra },
    },
    detection: {
      order: ["localStorage", "querystring", "navigator"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, // faster rendering for static JSON
    },
  });

export default i18n;
