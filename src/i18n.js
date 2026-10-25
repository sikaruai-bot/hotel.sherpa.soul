import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// English is eagerly bundled (the default/fallback language).
// All other locales are lazy-loaded on demand via dynamic import().
import en from "./Locales/en.json";

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

// Map each language code to its lazy-import function.
// These are only fetched from the server when the user switches language.
const lazyLocales = {
  ne:  () => import("./Locales/ne.json"),
  hi:  () => import("./Locales/hi.json"),
  ja:  () => import("./Locales/ja.json"),
  ko:  () => import("./Locales/ko.json"),
  nl:  () => import("./Locales/nl.json"),
  he:  () => import("./Locales/he.json"),
  pt:  () => import("./Locales/pt.json"),
  ar:  () => import("./Locales/ar.json"),
  zh:  () => import("./Locales/ch.json"),
  rs:  () => import("./Locales/rs.json"),
  es:  () => import("./Locales/es.json"),
  de:  () => import("./Locales/de.json"),
  it:  () => import("./Locales/it.json"),
  fra: () => import("./Locales/fra.json"),
};

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
    // Only English is bundled eagerly
    resources: {
      en: { translation: en },
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

// Lazy-load the initial language if it is not English
if (currentLang !== "en" && lazyLocales[currentLang]) {
  lazyLocales[currentLang]()
    .then((module) => {
      const translations = module.default || module;
      i18n.addResourceBundle(currentLang, "translation", translations, true, true);
      i18n.changeLanguage(currentLang);
    })
    .catch(() => {
      // Silently fall back to English if the locale fails to load
      i18n.changeLanguage("en");
    });
}

// Expose a helper so the LanguageSwitcher can lazy-load before switching
export async function loadLanguage(lang) {
  if (!supportedLanguages.includes(lang) || lang === "en") return;
  if (i18n.hasResourceBundle(lang, "translation")) return; // already loaded
  try {
    const loader = lazyLocales[lang];
    if (!loader) return;
    const module = await loader();
    const translations = module.default || module;
    i18n.addResourceBundle(lang, "translation", translations, true, true);
  } catch (e) {
    console.warn(`[i18n] Failed to lazy-load locale "${lang}":`, e);
  }
}

export default i18n;
