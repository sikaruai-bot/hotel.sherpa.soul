const DEFAULT_META_PIXEL_ID = "1952950858737501";
let activePixelId = null;

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

  // STRICT CONSENT CHECK: Only initialize if explicit consent granted
  const consent = getConsent();
  if (consent !== "all") {
    return;
  }

  const targetId = customPixelId || activePixelId || DEFAULT_META_PIXEL_ID;
  if (activePixelId === targetId) return;

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

  if (targetId) {
    window.fbq("init", targetId);
    activePixelId = targetId;
  }
};

// Unified tracking function for Meta Pixel, Google Analytics 4, and Google Tag Manager
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window === "undefined") return;
  const consent = getConsent();

  // 1. Meta / Facebook Pixel (Requires full marketing consent)
  if (consent === "all") {
    initializeMetaPixel();
    if (window.fbq) {
      window.fbq("track", eventName, parameters);
    }
  }

  // 2. Google Tag Manager / GA4 dataLayer (Requires analytics or all consent)
  if (consent === "all" || consent === "analytics") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      ...parameters,
    });

    // 3. Google Analytics 4 (gtag.js) direct dispatch
    if (typeof window.gtag === "function") {
      const ga4EventMap = {
        PageView: "page_view",
        InitiateCheckout: "begin_checkout",
        Lead: "generate_lead",
        Purchase: "purchase",
        Contact: "contact",
        ViewContent: "view_item",
      };

      const gaEventName = ga4EventMap[eventName] || eventName;
      window.gtag("event", gaEventName, parameters);
    }
  }
};

// Backward compatibility alias
export const trackMetaEvent = trackEvent;

