// Centralized USD -> NPR Exchange Rate Service with LocalStorage Caching

const CACHE_KEY_RATE = "HSS_USD_NPR_RATE";
const CACHE_KEY_TIMESTAMP = "HSS_USD_NPR_TIMESTAMP";
const CACHE_DURATION_MS = 12 * 60 * 60 * 1000; // 12 hours
export const EMERGENCY_FALLBACK_RATE = 135;

let inflightFetchPromise = null;

/**
 * Reads cached USD->NPR rate from localStorage if valid (< 12 hours old)
 */
export function getCachedRate() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    const cachedRateStr = localStorage.getItem(CACHE_KEY_RATE);
    const cachedTimeStr = localStorage.getItem(CACHE_KEY_TIMESTAMP);

    if (cachedRateStr && cachedTimeStr) {
      const rate = parseFloat(cachedRateStr);
      const timestamp = parseInt(cachedTimeStr, 10);
      const now = Date.now();

      if (!isNaN(rate) && rate > 0 && !isNaN(timestamp) && now - timestamp < CACHE_DURATION_MS) {
        return rate;
      }
    }
  } catch (e) {
    console.warn("Error reading cached exchange rate:", e);
  }
  return null;
}

/**
 * Fetches the live USD->NPR rate from open.er-api.com with fallback to exchangerate-api
 */
export async function getUsdToNprRate() {
  const cached = getCachedRate();
  if (cached !== null) {
    return cached;
  }

  // Deduplicate inflight API calls across concurrent component mounts
  if (inflightFetchPromise) {
    return inflightFetchPromise;
  }

  inflightFetchPromise = (async () => {
    try {
      const response = await fetch("https://open.er-api.com/v6/latest/USD");
      if (!response.ok) {
        throw new Error(`Exchange rate API HTTP error: ${response.status}`);
      }
      const data = await response.json();
      const nprRate = data?.rates?.NPR;

      if (typeof nprRate === "number" && nprRate > 0) {
        try {
          if (typeof window !== "undefined" && window.localStorage) {
            localStorage.setItem(CACHE_KEY_RATE, String(nprRate));
            localStorage.setItem(CACHE_KEY_TIMESTAMP, String(Date.now()));
          }
        } catch (e) {
          // ignore quota error
        }
        return nprRate;
      }
      throw new Error("Invalid rate payload from primary API");
    } catch (err) {
      console.warn("Primary exchange rate API failed, trying fallback source or emergency rate:", err);
      // Try secondary API as backup
      try {
        const backupRes = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        if (backupRes.ok) {
          const backupData = await backupRes.json();
          const backupRate = backupData?.rates?.NPR;
          if (typeof backupRate === "number" && backupRate > 0) {
            try {
              if (typeof window !== "undefined" && window.localStorage) {
                localStorage.setItem(CACHE_KEY_RATE, String(backupRate));
                localStorage.setItem(CACHE_KEY_TIMESTAMP, String(Date.now()));
              }
            } catch (e) {}
            return backupRate;
          }
        }
      } catch (backupErr) {
        console.warn("Secondary exchange rate API failed:", backupErr);
      }

      // Check if stale cache exists
      try {
        const staleRateStr = localStorage.getItem(CACHE_KEY_RATE);
        if (staleRateStr) {
          const staleRate = parseFloat(staleRateStr);
          if (!isNaN(staleRate) && staleRate > 0) {
            return staleRate;
          }
        }
      } catch (e) {}

      // Final fallback rate
      return EMERGENCY_FALLBACK_RATE;
    } finally {
      inflightFetchPromise = null;
    }
  })();

  return inflightFetchPromise;
}

/**
 * Formats a USD amount into approximate NPR text e.g. "NPR 3,082"
 */
export function formatNprApprox(usdAmount, rate) {
  const numUsd = Number(usdAmount);
  if (isNaN(numUsd) || numUsd <= 0) return "NPR —";
  const currentRate = typeof rate === "number" && rate > 0 ? rate : EMERGENCY_FALLBACK_RATE;
  const nprVal = Math.round(numUsd * currentRate);
  return `NPR ${nprVal.toLocaleString()}`;
}

/**
 * Formats a full room price display e.g. "$20 USD (~NPR 3,082)"
 */
export function formatFullPriceDisplay(usdAmount, rate) {
  const numUsd = Number(usdAmount);
  if (isNaN(numUsd) || numUsd <= 0) return "$0 USD";
  const nprStr = formatNprApprox(numUsd, rate);
  return `$${numUsd} USD (~${nprStr})`;
}
