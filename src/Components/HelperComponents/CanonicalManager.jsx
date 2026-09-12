import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCMS } from "../../Context/CMSContext";

const DEFAULT_BASE_URL = "https://hotelsherpasoul.com";

const DEFAULT_ROUTE_TITLES = {
  "/": "Hotel Sherpa Soul | Peaceful Hotel in Thamel, Kathmandu",
  "/about": "About Hotel Sherpa Soul | Peaceful Boutique Hotel in Thamel Kathmandu",
  "/services": "Services & Amenities | Shared Kitchen & Facilities | Hotel Sherpa Soul",
  "/rooms": "Rooms & Rates | Budget Family & Deluxe Rooms | Hotel Sherpa Soul",
  "/book-now": "Book Direct & Save 10% | Hotel Sherpa Soul Kathmandu",
  "/blog": "Kathmandu & Thamel Travel Guide | Hotel Sherpa Soul Blog",
  "/contact": "Contact Hotel Sherpa Soul | Location in Thamel Kathmandu",
  "/gallery": "Photo & Video Gallery | Rooms & Facilities | Hotel Sherpa Soul",
  "/privacy": "Privacy Policy & Cookie Disclosures | Hotel Sherpa Soul Kathmandu",
  "/terms": "Terms of Service & Booking Policies | Hotel Sherpa Soul",
};

/**
 * Dynamic Technical SEO & Canonical URL Manager
 * - Reads live SEO settings from CMSContext
 * - Updates canonical link, robots, title, meta description, keywords
 * - Updates OpenGraph (og:title, og:description, og:image, og:url) and Twitter cards
 * - Injects Google Search Console verification meta tag
 */
export default function CanonicalManager() {
  const location = useLocation();
  const { seo } = useCMS();

  useEffect(() => {
    // 1. Normalize pathname: strip trailing slash (except for root '/')
    let cleanPath = location.pathname;
    if (cleanPath.length > 1 && cleanPath.endsWith("/")) {
      cleanPath = cleanPath.slice(0, -1);
    }

    const baseUrl = (seo?.global?.canonicalBase || DEFAULT_BASE_URL).replace(/\/$/, "");
    const canonicalUrl = `${baseUrl}${cleanPath === "/" ? "/" : cleanPath}`;

    // Helper to update or create a meta tag
    const setMetaTag = (attr, key, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Helper to update or create a link tag
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // 2. Canonical URL & Social URLs
    setLinkTag("canonical", canonicalUrl);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("name", "twitter:url", canonicalUrl);

    // 3. Page SEO Data from CMS
    const pageData = seo?.pages?.[cleanPath] || {};
    const title =
      pageData.title ||
      DEFAULT_ROUTE_TITLES[cleanPath] ||
      (cleanPath.startsWith("/room/")
        ? "Room Details | Hotel Sherpa Soul Thamel Kathmandu"
        : cleanPath.startsWith("/book/")
        ? "Complete Your Reservation | Hotel Sherpa Soul"
        : seo?.global?.defaultTitle);

    const description =
      pageData.description ||
      seo?.global?.defaultDescription ||
      "Stay at Hotel Sherpa Soul, a peaceful hotel in Thamel, Kathmandu. Comfortable rooms, air conditioning, Wi-Fi, friendly service and practical facilities for travellers.";

    const keywords = pageData.keywords || seo?.global?.defaultKeywords;
    const ogImage = pageData.ogImage || seo?.social?.ogImage || `${baseUrl}/hero1.webp`;

    // 4. Update Document Title
    if (title) {
      document.title = title;
    }

    // 5. Update Meta Description & Keywords
    setMetaTag("name", "description", description);
    setMetaTag("name", "title", title);
    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    }

    // 6. Robots Tag
    if (seo?.global?.robots) {
      setMetaTag("name", "robots", seo.global.robots);
    }

    // 7. OpenGraph Social Tags
    setMetaTag("property", "og:title", pageData.title || seo?.social?.ogTitle || title);
    setMetaTag("property", "og:description", pageData.description || seo?.social?.ogDescription || description);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:site_name", seo?.social?.ogSiteName || "Hotel Sherpa Soul");
    setMetaTag("property", "og:type", seo?.social?.ogType || "website");

    // 8. Twitter Card Tags
    setMetaTag("name", "twitter:card", seo?.social?.twitterCard || "summary_large_image");
    setMetaTag("name", "twitter:title", pageData.title || seo?.social?.twitterTitle || title);
    setMetaTag("name", "twitter:description", pageData.description || seo?.social?.twitterDescription || description);
    setMetaTag("name", "twitter:image", ogImage);

    // 9. Google Search Console Verification
    const verificationTag = seo?.analytics?.googleVerification || "E9sWdPkI-frcA6WZQyLOuTU9tZL2qfoUnzIYk6c3h3c";
    if (verificationTag) {
      setMetaTag("name", "google-site-verification", verificationTag);
    }
  }, [location.pathname, seo]);

  return null;
}
