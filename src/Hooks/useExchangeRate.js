import { useState, useEffect } from "react";
import {
  getUsdToNprRate,
  getCachedRate,
  EMERGENCY_FALLBACK_RATE,
  formatNprApprox,
  formatFullPriceDisplay,
} from "../Services/exchangeRateService";

export function useExchangeRate() {
  const [rate, setRate] = useState(() => {
    const cached = getCachedRate();
    return cached !== null ? cached : EMERGENCY_FALLBACK_RATE;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const cached = getCachedRate();

    // If no fresh cache exists, fetch in background
    if (cached === null) {
      setLoading(true);
      getUsdToNprRate()
        .then((fetchedRate) => {
          if (isMounted) {
            setRate(fetchedRate);
            setLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) {
            setLoading(false);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    rate,
    loading,
    formatNpr: (usdAmount) => formatNprApprox(usdAmount, rate),
    formatFullDisplay: (usdAmount) => formatFullPriceDisplay(usdAmount, rate),
  };
}
