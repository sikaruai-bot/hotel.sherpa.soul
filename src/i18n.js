import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./Locales/en.json";
import ar from "./Locales/ar.json";
import ch from "./Locales/ch.json"; // Chinese translations
import rs from "./Locales/rs.json"; // Russian (example)
import es from "./Locales/es.json";
import de from "./Locales/de.json";
import it from "./Locales/it.json";
import fra from "./Locales/fra.json";

const supportedLanguages = ["en", "ar", "zh", "rs", "es", "de", "it", "fra"];

// Ensure stored language is valid
let currentLang = localStorage.getItem("i18nextLng");
if (!supportedLanguages.includes(currentLang)) {
  currentLang = "en";
  localStorage.setItem("i18nextLng", currentLang);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    load: "languageOnly",
    resources: {
      en: { translation: en },
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
