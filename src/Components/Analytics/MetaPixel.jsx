import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initializeMetaPixel, trackMetaEvent } from "./pixelEvents";
import { useCMS } from "../../Context/CMSContext";

let lastPageView = "";
let lastCheckoutPage = "";

export default function MetaPixel() {
  const location = useLocation();
  const { seo } = useCMS();

  const ga4Id = seo?.analytics?.ga4Id || import.meta.env.VITE_GA4_ID || "";

  // Dynamic Meta Pixel & GA4 initialization and SPA PageView tracking
  useEffect(() => {
    const pixelId = seo?.analytics?.metaPixelId || "1952950858737501";
    initializeMetaPixel(pixelId);

    const page = `${location.pathname}${location.search}`;

    if (lastPageView !== page) {
      // 1. Meta Pixel PageView
      if (window.fbq) {
        window.fbq("track", "PageView");
      }
      // 2. Google Analytics 4 SPA PageView
      if (typeof window.gtag === "function" && ga4Id) {
        window.gtag("event", "page_view", {
          page_path: page,
          page_location: window.location.href,
          page_title: document.title,
        });
      }
      lastPageView = page;
    }

    const isCheckout =
      location.pathname === "/book-now" ||
      location.pathname.startsWith("/book/");

    if (isCheckout && lastCheckoutPage !== page) {
      trackMetaEvent("InitiateCheckout", {
        content_category: "hotel_booking",
      });
      lastCheckoutPage = page;
    } else if (!isCheckout) {
      lastCheckoutPage = "";
    }
  }, [location.pathname, location.search, seo?.analytics?.metaPixelId, ga4Id]);

  // Dynamic Google Analytics 4 (GA4) Script & Global gtag Injection
  useEffect(() => {
    if (!ga4Id) return;

    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }

    // Check if gtag script already exists (either from index.html or injected)
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
  }, [ga4Id]);

  // Track user engagement clicks (WhatsApp, Phone, Email)
  useEffect(() => {
    const trackContactClick = (event) => {
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
