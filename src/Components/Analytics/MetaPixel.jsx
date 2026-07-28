import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initializeMetaPixel, trackMetaEvent } from "./pixelEvents";

let lastPageView = "";
let lastCheckoutPage = "";

export default function MetaPixel() {
  const location = useLocation();

  useEffect(() => {
    const page = `${location.pathname}${location.search}`;
    initializeMetaPixel();

    if (lastPageView !== page) {
      window.fbq("track", "PageView");
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
  }, [location.pathname, location.search]);

  useEffect(() => {
    const trackContactClick = (event) => {
      const link = event.target.closest("a");
      if (!link) return;

      const href = link.href || "";
      if (href.startsWith("mailto:")) {
        trackMetaEvent("Contact", { contact_method: "email" });
      } else if (href.includes("wa.me/") || href.includes("whatsapp.com/")) {
        trackMetaEvent("Contact", { contact_method: "whatsapp" });
      }
    };

    document.addEventListener("click", trackContactClick);
    return () => document.removeEventListener("click", trackContactClick);
  }, []);

  return null;
}
