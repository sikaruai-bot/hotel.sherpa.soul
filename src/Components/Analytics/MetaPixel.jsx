import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { initializeMetaPixel, trackMetaEvent } from "./pixelEvents";
import { useCMS } from "../../Context/CMSContext";
import { getStoredConsent } from "../HelperComponents/consentUtils";

let lastMetaPageView =
  typeof window !== "undefined"
    ? `${window.location.pathname}${window.location.search}`
    : "";
let lastGaPageView =
  typeof window !== "undefined"
    ? `${window.location.pathname}${window.location.search}`
    : "";
let lastCheckoutPage = "";

export default function MetaPixel() {
  const location = useLocation();
  const { seo } = useCMS();
  const [consent, setConsent] = useState(() => getStoredConsent());

  const ga4Id = seo?.analytics?.ga4Id || import.meta.env.VITE_GA4_ID || "";
  const metaPixelId =
    seo?.analytics?.metaPixelId || "1022329224109595";

  // Listen for consent updates from CookieConsent component
  useEffect(() => {
    const handleConsentUpdate = (e) => {
      const newConsent = e.detail?.type || getStoredConsent();
      setConsent(newConsent);
    };

    window.addEventListener("cookie-consent-updated", handleConsentUpdate);
    return () => window.removeEventListener("cookie-consent-updated", handleConsentUpdate);
  }, []);

  // Dynamic Meta Pixel & GA4 initialization and SPA PageView tracking
  useEffect(() => {
    // Tracking active unless user explicitly opted out to "essential" only
    const hasMarketingConsent = consent !== "essential";
    const hasAnalyticsConsent = consent !== "essential";
    const page = `${location.pathname}${location.search}`;

    if (hasMarketingConsent) {
      initializeMetaPixel(metaPixelId);
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("consent", "grant");
      }

      // Fire PageView on SPA route transitions
      if (lastMetaPageView !== page && typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "PageView");
        lastMetaPageView = page;
      }
    }

    // Google Analytics 4 SPA PageView
    if (hasAnalyticsConsent && typeof window.gtag === "function" && ga4Id) {
      if (lastGaPageView !== page) {
        window.gtag("event", "page_view", {
          page_path: page,
          page_location: window.location.href,
          page_title: document.title,
        });
        lastGaPageView = page;
      }
    }

    const isCheckout =
      location.pathname === "/book-now" ||
      location.pathname.startsWith("/book/");

    if (isCheckout && lastCheckoutPage !== page && hasMarketingConsent) {
      trackMetaEvent("InitiateCheckout", {
        content_category: "hotel_booking",
      });
      lastCheckoutPage = page;
    } else if (!isCheckout) {
      lastCheckoutPage = "";
    }
  }, [location.pathname, location.search, metaPixelId, ga4Id, consent]);

  // Dynamic Google Analytics 4 (GA4) Script & Global gtag Injection
  useEffect(() => {
    const hasAnalyticsConsent = consent !== "essential";
    if (!ga4Id || !hasAnalyticsConsent) return;

    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }

    // Check if gtag script already exists
    let existingScript =
      document.getElementById("ga4-gtag-script") ||
      document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${ga4Id}"]`);

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "ga4-gtag-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
      document.head.appendChild(script);

      window.gtag("js", new Date());
      window.gtag("config", ga4Id, {
        send_page_view: false, // SPA route changes tracked explicitly above
      });
    }
  }, [ga4Id, consent]);

  // Track user engagement clicks (WhatsApp, Phone, Email)
  useEffect(() => {
    const trackContactClick = (event) => {
      const currentConsent = getStoredConsent();
      if (currentConsent === "essential") return;

      const link = event.target.closest("a");
      if (!link) return;

      const href = link.href || "";
      if (href.startsWith("mailto:")) {
        trackMetaEvent("Contact", { contact_method: "email" });
      } else if (href.includes("wa.me/") || href.includes("whatsapp.com/")) {
        trackMetaEvent("Contact", { contact_method: "whatsapp" });
        trackMetaEvent("Lead", {
          content_name: "WhatsApp Inquiry",
          method: "whatsapp",
        });
      } else if (href.startsWith("tel:")) {
        trackMetaEvent("Contact", { contact_method: "phone_call" });
        trackMetaEvent("Lead", {
          content_name: "Direct Phone Call",
          method: "phone",
        });
      }
    };

    document.addEventListener("click", trackContactClick);
    return () => document.removeEventListener("click", trackContactClick);
  }, []);

  return null;
}
