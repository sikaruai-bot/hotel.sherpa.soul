const DEFAULT_META_PIXEL_IDS = ["1022329224109595", "1952950858737501"];
const initializedPixelIds = new Set();

const getConsent = () => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("hss_cookie_consent");
  } catch (e) {
    return null;
  }
};

export const initializeMetaPixel = (customPixelId) => {
  if (typeof window === "undefined") return;

  // Do not track if user explicitly opted out to "essential" only
  const consent = getConsent();
  if (consent === "essential") {
    return;
  }

  ((f, b, e, v, n, t, s) => {
    if (f.fbq) return;
    n = f.fbq = function (...args) {
      n.callMethod ? n.callMethod(...args) : n.queue.push(args);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );

  if (window.fbq) {
    window.fbq("consent", "grant");
    const targets = customPixelId
      ? Array.isArray(customPixelId)
        ? customPixelId
        : [customPixelId, ...DEFAULT_META_PIXEL_IDS]
      : DEFAULT_META_PIXEL_IDS;

    targets.forEach((id) => {
      if (!initializedPixelIds.has(id)) {
        window.fbq("init", id);
        initializedPixelIds.add(id);
      }
    });
  }
};

// Unified tracking function for Meta Pixel, Google Analytics 4, and Google Tag Manager
const STANDARD_META_EVENTS = [
  "PageView",
  "InitiateCheckout",
  "Lead",
  "Purchase",
  "Contact",
  "ViewContent",
  "Search",
  "AddToCart",
  "CompleteRegistration",
];

export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window === "undefined") return;
  const consent = getConsent();
  if (consent === "essential") return;

  const currentPath = window.location.pathname || "/";
  const enrichedParams = {
    page_type: currentPath === "/" ? "home" : currentPath.replace(/^\//, ""),
    ...parameters,
  };

  // 1. Meta / Facebook Pixel
  initializeMetaPixel();
  if (window.fbq) {
    if (STANDARD_META_EVENTS.includes(eventName)) {
      window.fbq("track", eventName, enrichedParams);
    } else {
      window.fbq("trackCustom", eventName, enrichedParams);
    }
  }

  // 2. Google Tag Manager / GA4 dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    timestamp: new Date().toISOString(),
    ...enrichedParams,
  });

  // 3. Google Analytics 4 (gtag.js) direct dispatch
  if (typeof window.gtag === "function") {
    const ga4EventMap = {
      PageView: "page_view",
      InitiateCheckout: "begin_booking",
      begin_booking: "begin_booking",
      Lead: "generate_lead",
      Purchase: "purchase",
      purchase: "purchase",
      booking_confirmed: "booking_confirmed",
      Contact: "contact",
      ViewContent: "view_room",
      view_room: "view_room",
      WhatsAppClick: "whatsapp_click",
      whatsapp_click: "whatsapp_click",
      PhoneClick: "phone_click",
      phone_click: "phone_click",
      EmailClick: "email_click",
      email_click: "email_click",
      OtaClick: "ota_click",
      ota_click: "ota_click",
      GoogleMapsClick: "maps_click",
      ContactFormSubmit: "form_submit",
      BookingFormSubmit: "booking_submit",
      booking_submit: "booking_submit",
    };

    const gaEventName = ga4EventMap[eventName] || eventName;
    window.gtag("event", gaEventName, enrichedParams);
  }
};

// Backward compatibility alias
export const trackMetaEvent = trackEvent;

// Specific CRO conversion tracking helpers
export const trackBookingClick = (entryPoint, extra = {}) => {
  trackEvent("InitiateCheckout", {
    content_category: "hotel_booking",
    entry_point: entryPoint,
    cta_location: entryPoint,
    cta_text: extra.cta_text || "Book Direct & Save 10%",
    ...extra,
  });
  trackEvent("begin_booking", {
    entry_point: entryPoint,
    cta_location: entryPoint,
    cta_text: extra.cta_text || "Book Direct & Save 10%",
    ...extra,
  });
};

export const trackWhatsAppClick = (entryPoint, extra = {}) => {
  trackEvent("Contact", {
    channel: "whatsapp",
    entry_point: entryPoint,
    cta_location: entryPoint,
    ...extra,
  });
  trackEvent("whatsapp_click", {
    entry_point: entryPoint,
    cta_location: entryPoint,
    ...extra,
  });
};

export const trackPhoneClick = (entryPoint, extra = {}) => {
  trackEvent("Contact", {
    channel: "phone",
    entry_point: entryPoint,
    cta_location: entryPoint,
    ...extra,
  });
  trackEvent("phone_click", {
    entry_point: entryPoint,
    cta_location: entryPoint,
    ...extra,
  });
};

export const trackEmailClick = (entryPoint, extra = {}) => {
  trackEvent("Contact", {
    channel: "email",
    entry_point: entryPoint,
    cta_location: entryPoint,
    ...extra,
  });
  trackEvent("email_click", {
    entry_point: entryPoint,
    cta_location: entryPoint,
    ...extra,
  });
};

export const trackOtaClick = (otaName, entryPoint = "footer", extra = {}) => {
  trackEvent("OtaClick", {
    ota_name: otaName,
    entry_point: entryPoint,
    cta_location: entryPoint,
    ...extra,
  });
  trackEvent("ota_click", {
    ota_name: otaName,
    entry_point: entryPoint,
    cta_location: entryPoint,
    ...extra,
  });
};

export const trackMapsClick = (entryPoint) => {
  trackEvent("ViewContent", {
    content_category: "google_maps",
    entry_point: entryPoint,
  });
};

export const trackContactFormSubmit = (data = {}) => {
  trackEvent("Lead", {
    form_type: "contact_form",
    ...data,
  });
};

export const trackBookingFormSubmit = (data = {}) => {
  trackEvent("booking_submit", {
    form_type: "direct_booking_form",
    ...data,
  });
};
