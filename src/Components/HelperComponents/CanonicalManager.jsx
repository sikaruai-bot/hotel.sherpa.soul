import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://hotelsherpasoul.com";

const ROUTE_TITLES = {
  "/": "Hotel Sherpa Soul | Boutique Stay in Thamel, Kathmandu, Nepal",
  "/about": "About Us | Hotel Sherpa Soul Thamel, Kathmandu",
  "/services": "Services & Amenities | Hotel Sherpa Soul Kathmandu",
  "/rooms": "Rooms & Suites | Hotel Sherpa Soul Thamel, Kathmandu",
  "/book-now": "Book Direct | Hotel Sherpa Soul Kathmandu",
  "/blog": "Stories & Travel Guide | Hotel Sherpa Soul Blog",
  "/contact": "Contact & Location | Hotel Sherpa Soul Thamel Kathmandu",
  "/gallery": "Photo Gallery | Hotel Sherpa Soul Kathmandu",
};

/**
 * Dynamic Canonical URL and OpenGraph URL manager
 * - Strips query strings (?utm_..., ?fbclid=...) and hashes for clean canonical links
 * - Normalizes trailing slashes (root / has trailing slash, interior pages do not)
 * - Updates <link rel="canonical">, <meta property="og:url">, and <meta name="twitter:url"> in real-time
 * - Updates document.title to match the active route
 */
export default function CanonicalManager() {
  const location = useLocation();

  useEffect(() => {
    // 1. Normalize pathname: strip trailing slash (except for root '/')
    let cleanPath = location.pathname;
    if (cleanPath.length > 1 && cleanPath.endsWith("/")) {
      cleanPath = cleanPath.slice(0, -1);
    }

    // 2. Build full canonical URL (without query params or fragments)
    const canonicalUrl = `${BASE_URL}${cleanPath === "/" ? "/" : cleanPath}`;

    // 3. Update or create <link rel="canonical"> in <head>
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 4. Update OpenGraph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", canonicalUrl);

    // 5. Update Twitter URL
    let twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (!twitterUrl) {
      twitterUrl = document.createElement("meta");
      twitterUrl.setAttribute("name", "twitter:url");
      document.head.appendChild(twitterUrl);
    }
    twitterUrl.setAttribute("content", canonicalUrl);

    // 6. Update document.title if route is defined
    if (ROUTE_TITLES[cleanPath]) {
      document.title = ROUTE_TITLES[cleanPath];
    } else if (cleanPath.startsWith("/room/")) {
      document.title = "Room Details | Hotel Sherpa Soul Thamel Kathmandu";
    } else if (cleanPath.startsWith("/book/")) {
      document.title = "Complete Your Reservation | Hotel Sherpa Soul";
    }
  }, [location.pathname]);

  return null;
}
