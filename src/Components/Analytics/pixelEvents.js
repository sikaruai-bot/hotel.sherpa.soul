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
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window === "undefined") return;
  const consent = getConsent();

  // 1. Meta / Facebook Pixel (Fires unless user explicitly opted out to essential)
  if (consent !== "essential") {
    initializeMetaPixel();
    if (window.fbq) {
      window.fbq("track", eventName, parameters);
    }
  }

  // 2. Google Tag Manager / GA4 dataLayer
  if (consent !== "essential") {
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
