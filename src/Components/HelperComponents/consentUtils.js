export const CONSENT_STORAGE_KEY = "hss_cookie_consent";

export const getStoredConsent = () => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch (_e) {
    return null;
  }
};

export const hasAnalyticsConsent = () => {
  const consent = getStoredConsent();
  return consent === "all" || consent === "analytics";
};
