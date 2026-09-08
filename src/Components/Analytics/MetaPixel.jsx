import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initializeMetaPixel, trackMetaEvent } from "./pixelEvents";
import { useCMS } from "../../Context/CMSContext";

let lastPageView = "";
let lastCheckoutPage = "";

export default function MetaPixel() {
  const location = useLocation();
  const { seo } = useCMS();

  // Dynamic Meta Pixel initialization
  useEffect(() => {
    const pixelId = seo?.analytics?.metaPixelId || "1952950858737501";
    initializeMetaPixel(pixelId);

    const page = `${location.pathname}${location.search}`;

    if (lastPageView !== page) {
      if (window.fbq) {
        window.fbq("track", "PageView");
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
  }, [location.pathname, location.search, seo?.analytics?.metaPixelId]);

  // Dynamic Google Analytics 4 (GA4) Tag injection if configured
  useEffect(() => {
    const ga4Id = seo?.analytics?.ga4Id;
    if (!ga4Id) return;

    let existingScript = document.getElementById("ga4-gtag-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "ga4-gtag-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", ga4Id);
    }
  }, [seo?.analytics?.ga4Id]);

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
