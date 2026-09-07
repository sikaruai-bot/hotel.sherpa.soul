const META_PIXEL_ID = "1952950858737501";
let initialized = false;

export const initializeMetaPixel = () => {
  if (typeof window === "undefined" || initialized) return;

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

  window.fbq("init", META_PIXEL_ID);
  initialized = true;
};

// Unified tracking function for Meta Pixel AND Google Tag Manager (dataLayer)
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window === "undefined") return;

  // 1. Meta / Facebook Pixel
  initializeMetaPixel();
  if (window.fbq) {
    window.fbq("track", eventName, parameters);
  }

  // 2. Google Tag Manager / GA4 dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    timestamp: new Date().toISOString(),
    ...parameters,
  });
};

// Backward compatibility alias
export const trackMetaEvent = trackEvent;
