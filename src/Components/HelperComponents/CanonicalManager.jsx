import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCMS } from "../../Context/CMSContext";

const DEFAULT_BASE_URL = "https://hotelsherpasoul.com";

const DEFAULT_ROUTE_TITLES = {
  "/": "Hotel in Thamel Kathmandu | Hotel Sherpa Soul",
  "/about": "About Hotel Sherpa Soul | Peaceful Boutique Hotel in Thamel Kathmandu",
  "/services": "Services & Amenities | Shared Kitchen & Facilities | Hotel Sherpa Soul",
  "/rooms": "Rooms & Rates | Budget Family & Deluxe Rooms | Hotel Sherpa Soul",
  "/room/budget-family-room": "Budget Family Room in Thamel Kathmandu | Hotel Sherpa Soul",
  "/room/deluxe-room": "Deluxe Room in Thamel Kathmandu | Hotel Sherpa Soul",
  "/room/family-room": "Family Room with AC in Thamel Kathmandu | Hotel Sherpa Soul",
  "/book/budget-family-room": "Book Budget Family Room Direct & Save 10% | Hotel Sherpa Soul",
  "/book/deluxe-room": "Book Deluxe Room Direct & Save 10% | Hotel Sherpa Soul",
  "/book/family-room": "Book Family Room Direct & Save 10% | Hotel Sherpa Soul",
  "/location": "Hotel in Thamel Kathmandu | Location & Directions",
  "/book-now": "Book Direct & Save 10% | Hotel Sherpa Soul Kathmandu",
  "/blog": "Kathmandu & Thamel Travel Guide | Hotel Sherpa Soul Blog",
  "/contact": "Contact Hotel Sherpa Soul | Location in Thamel Kathmandu",
  "/gallery": "Photo & Video Gallery | Rooms & Facilities | Hotel Sherpa Soul",
  "/privacy": "Privacy Policy & Cookie Disclosures | Hotel Sherpa Soul Kathmandu",
  "/privacy-policy": "Privacy Policy & Cookie Disclosures | Hotel Sherpa Soul Kathmandu",
  "/terms": "Terms of Service & Booking Policies | Hotel Sherpa Soul",
  "/terms-and-conditions": "Terms of Service & Booking Policies | Hotel Sherpa Soul",
  "/cancellation-policy": "Cancellation Policy | Hotel Sherpa Soul Kathmandu",
  "/guest-guide": "Guest Guide & House Rules | Hotel Sherpa Soul",
};

const DEFAULT_ROUTE_DESCRIPTIONS = {
  "/": "Stay at Hotel Sherpa Soul in Thamel, Kathmandu. Enjoy quiet rooms, 24/7 front desk, fiber Wi-Fi, guest kitchen, and authentic Sherpa hospitality in Nepal.",
  "/about": "Learn about Hotel Sherpa Soul in Thamel, Kathmandu. Created for travelers who value restful sleep, authentic Himalayan hospitality, and quiet boutique rooms.",
  "/services": "Explore amenities at Hotel Sherpa Soul in Thamel: shared guest kitchen, 24/7 hot showers, high-speed fiber Wi-Fi, trekking luggage storage, and airport pickup.",
  "/rooms": "Explore boutique rooms at Hotel Sherpa Soul in Thamel, Kathmandu. Choose from Budget Family, Deluxe AC, and Family Rooms with en-suite baths and fiber Wi-Fi.",
  "/room/budget-family-room": "Book Budget Family Room at Hotel Sherpa Soul in Thamel, Kathmandu. Features 1 King and 1 Single Bed, attached hot shower, fast Wi-Fi, and 10% direct discount.",
  "/room/deluxe-room": "Stay in Deluxe AC Room at Hotel Sherpa Soul in Thamel, Kathmandu. Features King size bed, climate control, quiet atmosphere, hot shower, and 10% direct saving.",
  "/room/family-room": "Book Spacious Family AC Room at Hotel Sherpa Soul in Thamel, Kathmandu. Features King plus Single Bed, air conditioning, private washroom, and kitchen access.",
  "/book/budget-family-room": "Direct reservation for Budget Family Room at Hotel Sherpa Soul, Thamel Kathmandu. Enjoy King plus Single Bed, free luggage storage, and 10% direct discount.",
  "/book/deluxe-room": "Direct reservation for Deluxe AC Room at Hotel Sherpa Soul, Thamel Kathmandu. Enjoy King bed, private bath, quiet restful sleep, and 10% instant discount.",
  "/book/family-room": "Direct reservation for Family AC Room at Hotel Sherpa Soul, Thamel Kathmandu. Features King and Single bed, air conditioning, and 10% direct booking saving.",
  "/book-now": "Book your stay directly at Hotel Sherpa Soul for the lowest price guaranteed, instant confirmation, 10% off promotion, and authentic Himalayan hospitality.",
  "/gallery": "View photos and videos of Hotel Sherpa Soul in Thamel, Kathmandu. Browse quiet guest rooms, private bathrooms, shared guest kitchen, and Himalayan city views.",
  "/blog": "Explore Kathmandu travel advice, Thamel neighborhood guides, Everest trekking preparation tips, and local dining insights from the Hotel Sherpa Soul team.",
  "/contact": "Contact Hotel Sherpa Soul in Thamel, Kathmandu. Call +977-9851068219 or WhatsApp +977-9818259472 for direct room reservations, airport pickup, and inquiries.",
  "/privacy": "Read the Privacy Policy and Cookie Disclosures for Hotel Sherpa Soul in Thamel, Kathmandu. Understand how we protect your personal data, bookings, and privacy.",
  "/privacy-policy": "Read the Privacy Policy and Cookie Disclosures for Hotel Sherpa Soul in Thamel, Kathmandu. Understand how we protect your personal data, bookings, and privacy.",
  "/terms": "Review Terms of Service, check-in policies, quiet hours guidelines, and direct booking discount terms at Hotel Sherpa Soul in Thamel Bhagawati Marg, Kathmandu.",
  "/terms-and-conditions": "Review Terms of Service, check-in policies, quiet hours guidelines, and direct booking discount terms at Hotel Sherpa Soul in Thamel Bhagawati Marg, Kathmandu.",
  "/cancellation-policy": "Review Terms of Service, check-in policies, quiet hours guidelines, and direct booking discount terms at Hotel Sherpa Soul in Thamel Bhagawati Marg, Kathmandu.",
  "/guest-guide": "Official guest guide and house rules for Hotel Sherpa Soul in Thamel, Kathmandu. Find Wi-Fi details, check-in instructions, quiet hours, and reception help.",
};

/**
 * Dynamic Technical SEO & Canonical URL Manager
 * - Reads live SEO settings from CMSContext
 * - Updates canonical link, robots, title, meta description, keywords
 * - Updates OpenGraph (og:title, og:description, og:image, og:url) and Twitter cards
 * - Injects Google Search Console verification meta tag
 * - Injects BreadcrumbList schema on inner pages
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
        el.setAttribute(rel, rel);
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
      (cleanPath.startsWith("/room/") || cleanPath.startsWith("/rooms/")
        ? "Room Details | Hotel Sherpa Soul Thamel Kathmandu"
        : cleanPath.startsWith("/book/")
        ? "Complete Your Reservation | Hotel Sherpa Soul"
        : seo?.global?.defaultTitle || "Hotel in Thamel Kathmandu | Hotel Sherpa Soul");

    const description =
      pageData.description ||
      DEFAULT_ROUTE_DESCRIPTIONS[cleanPath] ||
      seo?.global?.defaultDescription ||
      "Stay at Hotel Sherpa Soul in Thamel, Kathmandu. Enjoy quiet rooms, 24/7 front desk, fiber Wi-Fi, guest kitchen, and authentic Sherpa hospitality in Nepal.";

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

    // 10. Structured Data (JSON-LD) BreadcrumbList for Inner Pages
    let breadcrumbEl = document.getElementById("schema-breadcrumbs");
    if (!breadcrumbEl) {
      breadcrumbEl = document.createElement("script");
      breadcrumbEl.id = "schema-breadcrumbs";
      breadcrumbEl.type = "application/ld+json";
      document.head.appendChild(breadcrumbEl);
    }

    if (cleanPath === "/") {
      breadcrumbEl.textContent = "";
    } else {
      const breadcrumbItems = [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${baseUrl}/`
        }
      ];

      if (cleanPath === "/rooms") {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Rooms & Suites",
          "item": `${baseUrl}/rooms`
        });
      } else if (cleanPath.startsWith("/room/")) {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Rooms",
          "item": `${baseUrl}/rooms`
        });
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 3,
          "name": title.split("|")[0].trim(),
          "item": canonicalUrl
        });
      } else if (cleanPath.startsWith("/book/")) {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Rooms",
          "item": `${baseUrl}/rooms`
        });
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 3,
          "name": title.split("|")[0].trim(),
          "item": canonicalUrl
        });
      } else {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 2,
          "name": title.split("|")[0].trim(),
          "item": canonicalUrl
        });
      }

      breadcrumbEl.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
      });
    }
  }, [location.pathname, seo]);

  return null;
}
