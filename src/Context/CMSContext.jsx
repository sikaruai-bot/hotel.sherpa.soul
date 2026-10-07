import React, { createContext, useContext, useState, useEffect } from "react";
import { rooms as initialRooms } from "../Components/HelperComponents/RoomsData";
import { HOTEL_PRESET_PHOTOS } from "../Components/CMS/mediaUtils";

const CMS_STORAGE_KEY = "HSS_CMS_DATA_V3";
const CMS_AUTH_KEY = "HSS_CMS_AUTH_TOKEN";
const DEFAULT_PASSWORD = "sherpasoul2026";

const DEFAULT_CMS_DATA = {
  admin: {
    password: DEFAULT_PASSWORD,
  },
  seo: {
    global: {
      defaultTitle: "Hotel Sherpa Soul | Peaceful Hotel in Thamel, Kathmandu",
      defaultDescription: "Stay at Hotel Sherpa Soul in Thamel, Kathmandu. Enjoy comfortable rooms, a central location and a peaceful stay for travelers exploring Nepal.",
      defaultKeywords: "hotel in Thamel Kathmandu, hotel in Thamel, Thamel hotel, hotel Kathmandu, hotel near Thamel, accommodation in Thamel, Thamel accommodation, Kathmandu accommodation, budget hotel Kathmandu, hotel for travelers Kathmandu, peaceful hotel in Thamel, comfortable hotel in Kathmandu, hotel for trekkers Kathmandu, Nepal travel accommodation, where to stay in Thamel, best area to stay in Kathmandu, Kathmandu travel guide, Thamel travel guide, Nepal trekking accommodation",
      author: "Hotel Sherpa Soul",
      robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      canonicalBase: "https://hotelsherpasoul.com",
    },
    pages: {
      "/": {
        title: "Hotel Sherpa Soul | Peaceful Hotel in Thamel, Kathmandu",
        description: "Stay at Hotel Sherpa Soul in Thamel, Kathmandu. Enjoy comfortable rooms, a central location and a peaceful stay for travelers exploring Nepal.",
        keywords: "hotel in Thamel Kathmandu, peaceful hotel in Thamel, hotel in Thamel, Thamel accommodation",
        ogImage: "https://hotelsherpasoul.com/hero1.webp",
      },
      "/about": {
        title: "About Hotel Sherpa Soul | Hotel in Thamel, Kathmandu",
        description: "Learn about Hotel Sherpa Soul, a peaceful and comfortable hotel in Thamel, Kathmandu, designed for travelers exploring Nepal and the Himalayas.",
        keywords: "About Hotel Sherpa Soul, Hotel in Thamel Kathmandu, Peaceful hotel Thamel",
        ogImage: "https://hotelsherpasoul.com/hero1.webp",
      },
      "/rooms": {
        title: "Hotel Rooms in Thamel Kathmandu | Hotel Sherpa Soul",
        description: "Explore comfortable hotel rooms at Hotel Sherpa Soul in Thamel, Kathmandu. Find a peaceful place to rest before or after your Nepal adventure.",
        keywords: "Hotel Rooms in Thamel Kathmandu, Hotel Sherpa Soul rooms, accommodation in Thamel",
        ogImage: "https://hotelsherpasoul.com/room1/room.webp",
      },
      "/location": {
        title: "Hotel Location in Thamel Kathmandu | Hotel Sherpa Soul",
        description: "Stay in the heart of Thamel, Kathmandu at Hotel Sherpa Soul. Enjoy convenient access to Thamel's shops, cafés, travel services and attractions.",
        keywords: "hotel in Thamel Kathmandu, Hotel Location in Thamel, Hotel near Thamel",
        ogImage: "https://hotelsherpasoul.com/hero1.webp",
      },
      "/blog": {
        title: "Kathmandu Travel Guide | Thamel & Nepal Travel Tips",
        description: "Explore our Kathmandu travel guide for Thamel tips, Nepal travel advice, trekking information, places to visit and practical tips for travelers.",
        keywords: "Kathmandu Travel Guide, Thamel travel guide, Nepal travel advice, trekking tips",
        ogImage: "https://hotelsherpasoul.com/hero1.webp",
      },
      "/contact": {
        title: "Contact Hotel Sherpa Soul | Thamel Kathmandu",
        description: "Contact Hotel Sherpa Soul in Thamel, Kathmandu. Get in touch with us about rooms, availability, bookings and your stay in Nepal.",
        keywords: "Contact Hotel Sherpa Soul, Thamel Kathmandu, Phone WhatsApp",
        ogImage: "https://hotelsherpasoul.com/hero1.webp",
      },
      "/book-now": {
        title: "Book Direct | Hotel Sherpa Soul Kathmandu",
        description: "Book your stay directly at Hotel Sherpa Soul for the best rates, instant WhatsApp confirmation, and authentic Himalayan hospitality.",
        keywords: "Book Hotel Sherpa Soul, Hotel Reservation Thamel Kathmandu",
        ogImage: "https://hotelsherpasoul.com/hero1.webp",
      },
      "/gallery": {
        title: "Photo & Video Gallery | Hotel Sherpa Soul Kathmandu",
        description: "Take a visual tour of Hotel Sherpa Soul, our comfortable guest rooms, shared amenities, private balconies, and Kathmandu surroundings.",
        keywords: "Hotel Sherpa Soul Photos, Thamel Hotel Video Gallery, Room Pictures",
        ogImage: "https://hotelsherpasoul.com/hero1.webp",
      },
      "/services": {
        title: "Services & Amenities | Hotel Sherpa Soul Kathmandu",
        description: "Practical facilities designed for travellers: shared self-kitchen for long-stay guests, elevator, 24/7 hot water, high-speed Wi-Fi, and luggage storage.",
        keywords: "Hotel Sherpa Soul Amenities, Shared Kitchen Long Stay Thamel, Kathmandu Facilities",
        ogImage: "https://hotelsherpasoul.com/hero1.webp",
      },
    },
    social: {
      ogType: "website",
      ogSiteName: "Hotel Sherpa Soul",
      ogTitle: "Hotel Sherpa Soul | Boutique Stay in Thamel, Kathmandu",
      ogDescription: "Experience peaceful boutique comfort in the heart of Thamel, Kathmandu. Modern rooms, shared kitchen for long-stay guests, rooftop terrace, and authentic Sherpa hospitality.",
      ogImage: "https://hotelsherpasoul.com/hero1.webp",
      twitterCard: "summary_large_image",
      twitterTitle: "Hotel Sherpa Soul | Boutique Stay in Thamel, Kathmandu",
      twitterDescription: "Warm Himalayan hospitality in the vibrant center of Thamel, Kathmandu. Book direct for the best experience.",
      twitterImage: "https://hotelsherpasoul.com/hero1.webp",
    },
    analytics: {
      ga4Id: "G-E7Z3QDR3KD",
      gtmId: "GTM-PFRV7ZTV",
      metaPixelId: "1022329224109595",
      googleVerification: "E9sWdPkI-frcA6WZQyLOuTU9tZL2qfoUnzIYk6c3h3c",
      customHeadScript: "",
      customBodyScript: "",
    },
    schema: {
      hotelName: "Hotel Sherpa Soul",
      alternateName: "Sherpa Soul Hotel Thamel",
      description: "Experience peaceful boutique stay at Hotel Sherpa Soul in Thamel Bhagawati Marg, Kathmandu. Featuring modern deluxe rooms, shared kitchen for long-stay guests, 24/7 front desk, high-speed Wi-Fi, and authentic Himalayan hospitality.",
      telephone: "+977-9851068219",
      email: "info@hotelsherpasoul.com",
      addressStreet: "Thamel Bhagawati Marg 26",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      postalCode: "44600",
      addressCountry: "NP",
      latitude: "27.7154",
      longitude: "85.3106",
      priceRange: "$$",
      checkinTime: "Flexible",
      checkoutTime: "12:00",
      currenciesAccepted: "NPR, USD, EUR",
    },
  },
  content: {
    hero: {
      title: "A Simple Stay in Thamel. A Better Night's Sleep.",
      subtitle: "No Restaurant. No Noise. Sleep Well.",
      paragraph: "Welcome to Hotel Sherpa Soul, a small and comfortable hotel in the heart of Thamel, Kathmandu. We keep things simple: comfortable rooms, a peaceful place to rest, practical facilities, friendly service and a convenient location for exploring Kathmandu.",
      bookButtonText: "Book Your Stay",
      tourButtonText: "View Our Rooms",
      bgImage: "/hero/hero1.webp",
      bgVideo: "",
    },
    aboutVision: {
      title: "Philosophy: No Restaurant. No Noise. Sleep Well.",
      part1: "We intentionally keep the hotel simple and peaceful. Instead of running a busy restaurant or entertainment space, our focus is entirely on ",
      highlight: "peaceful accommodation and restful sleep",
      part2: "for travellers exploring Kathmandu.",
      para2: "Hotel Sherpa Soul is built around a simple understanding of hospitality: travellers need a place where they feel comfortable, welcome and able to rest after walking Kathmandu's vibrant streets or returning from a Himalayan trek.",
      para3: "What we offer is simpler and more meaningful: a comfortable room, a convenient location in Thamel, a quiet night's sleep, and genuine Sherpa warmth welcoming you to Nepal.",
      startJourneyText: "Book Your Stay",
      buddhistAlt: "Sherpa Heritage & Peace",
    },
    contact: {
      phone: "+977 9851068219",
      whatsapp: "+977 9851139414",
      email: "info@hotelsherpasoul.com",
      address: "Thamel Bhagawati Marg 26, Kathmandu, Nepal",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.186847847385!2d85.3106263!3d27.7154032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19502be1b869%3A0xb304b7b2fb66a1ec!2sHotel%20Sherpa%20Soul!5e0!3m2!1sen!2snp!4v1717000000000!5m2!1sen!2snp",
      hours: "24/7 Front Desk",
    },
    footer: {
      bio: "A peaceful hotel in Thamel, Kathmandu. Focused on comfortable rooms, practical facilities, and a restful night's sleep. No Restaurant. No Noise. Sleep Well.",
      emergency: "+977 9851068219",
      copyright: "© 2026 Hotel Sherpa Soul. All rights reserved.",
    },
    virtualTour: {
      enabled: true,
      badge: "Hotel Video Tour",
      title: "Take a Video Tour of Hotel Sherpa Soul",
      subtitle: "Experience Our Peaceful Stay Before You Arrive",
      paragraph: "Watch our hotel walkthrough video to explore our comfortable rooms, private balconies, quiet corridors, and shared rooftop kitchen in Thamel, Kathmandu.",
      tourType: "youtube",
      embedUrl: "https://youtu.be/fvznqsF-kkM?si=wmKJwCcIt_2IH3jA",
      coverImage: "https://img.youtube.com/vi/fvznqsF-kkM/maxresdefault.jpg",
      buttonText: "Book Your Stay Direct (10% Off)",
      buttonLink: "/book-now",
      features: [
        "Cozy, Clean & Peaceful Rooms",
        "Air Conditioned Deluxe Amenities",
        "Shared Kitchen for Long-Stay Guests",
        "Quiet Sleep Environment in Thamel",
      ],
    },
  },
  media: {
    gallery: [
      {
        id: "g1",
        src: "/changes_photo/deluxeRoom_ai.webp",
        type: "image",
        title: "Deluxe Room with AC (King Bed)",
        alt: "Hotel Sherpa Soul Deluxe Room Thamel Kathmandu",
        category: "rooms",
      },
      {
        id: "g2",
        src: "/changes_photo/doubleBed.webp",
        type: "image",
        title: "Family Room AC (King + Single Bed)",
        alt: "Hotel Sherpa Soul Family Room Thamel Kathmandu",
        category: "rooms",
      },
      {
        id: "g3",
        src: "/changes_photo/balkani.webp",
        type: "image",
        title: "Private Balcony & Views",
        alt: "Hotel Sherpa Soul Private Balcony View",
        category: "exterior",
      },
      {
        id: "g4",
        src: "/triple.webp",
        type: "image",
        title: "Budget Family Room (King & Single Bed)",
        alt: "Hotel Sherpa Soul Budget Family Room",
        category: "rooms",
      },
      {
        id: "g_frontdesk",
        src: "/assets/frontdesk_new-JHvt5Fe8.webp",
        type: "image",
        title: "24/7 Front Desk & Reception",
        alt: "Hotel Sherpa Soul 24/7 Front Desk & Reception",
        category: "amenities",
      },
      {
        id: "g_kitchen",
        src: "/assets/shared_kitchen_new-HROE-pWG.webp",
        type: "image",
        title: "Shared Self-Kitchen & Dining",
        alt: "Hotel Sherpa Soul Shared Self-Kitchen",
        category: "amenities",
      },
      {
        id: "g5",
        src: "/changes_photo/viewSeen.webp",
        type: "image",
        title: "Scenic Thamel Rooftop Skyline",
        alt: "Scenic Kathmandu Valley View from Hotel Sherpa Soul",
        category: "exterior",
      },
      {
        id: "g6",
        src: "/changes_photo/washRoom.webp",
        type: "image",
        title: "Modern En-Suite Bathroom",
        alt: "Hotel Sherpa Soul Modern En-Suite Bathroom",
        category: "amenities",
      },
      {
        id: "g7",
        src: "/changes_photo/storeRoom.webp",
        type: "image",
        title: "Guest Luggage & Storage",
        alt: "Hotel Sherpa Soul Guest Amenities and Storage",
        category: "amenities",
      },
      {
        id: "g8",
        src: "/hero1.webp",
        type: "image",
        title: "Hotel Sherpa Soul Thamel Main",
        alt: "Hotel Sherpa Soul Thamel Main",
        category: "exterior",
      },
    ],
    library: HOTEL_PRESET_PHOTOS,
  },
  sitePhotos: {
    // Homepage Hero
    homeHero: "/changes_photo/deluxeRoom_ai.webp",
    // Rooms section (homepage cards)
    roomCard_budget: "/triple.webp",
    roomCard_deluxe: "/changes_photo/deluxeRoom_ai.webp",
    roomCard_family: "/changes_photo/doubleBed.webp",
    // Book Now Page
    bookNow_hero: "/changes_photo/deluxeRoom_ai.webp",
    bookNow_budget: "/triple.webp",
    bookNow_deluxe: "/changes_photo/deluxeRoom_ai.webp",
    bookNow_family: "/changes_photo/doubleBed.webp",
    // About Page
    about_main: "/changes_photo/deluxeRoom_ai.webp",
    // Services Page
    services_kitchen: "/assets/shared_kitchen_new-HROE-pWG.webp",
    services_frontdesk: "/assets/frontdesk_new-JHvt5Fe8.webp",
    // General/Other
    washroom: "/changes_photo/washRoom.webp",
    balcony: "/changes_photo/balkani.webp",
    rooftop: "/changes_photo/viewSeen.webp",
    storage: "/changes_photo/storeRoom.webp",
  },
  rooms: initialRooms,
  channels: {
    bookingCom: {
      id: "bookingCom",
      name: "Booking.com",
      url: "https://www.booking.com/hotel/np/hotel-sherpa-soul.html",
      iCalUrl: "",
      enabled: true,
      badgeColor: "bg-blue-600",
      accentColor: "#003580",
    },
    airbnb: {
      id: "airbnb",
      name: "Airbnb",
      url: "https://www.airbnb.com/rooms/1760024961976448522",
      iCalUrl: "",
      enabled: true,
      badgeColor: "bg-rose-600",
      accentColor: "#FF5A5F",
    },
    agoda: {
      id: "agoda",
      name: "Agoda",
      url: "",
      iCalUrl: "",
      enabled: true,
      badgeColor: "bg-purple-600",
      accentColor: "#5856D6",
    },
    tripCom: {
      id: "tripCom",
      name: "Trip.com",
      url: "https://www.trip.com/hotels/list?keyword=Hotel%20Sherpa%20Soul%20Kathmandu",
      iCalUrl: "",
      enabled: true,
      badgeColor: "bg-sky-600",
      accentColor: "#2681FF",
    },
  },
};

const CMSContext = createContext(null);

export function CMSProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        // Purge legacy storage keys to eliminate any broken references
        try {
          localStorage.removeItem("HSS_CMS_DATA");
          localStorage.removeItem("HSS_CMS_DATA_V1");
          localStorage.removeItem("HSS_CMS_DATA_V2");
        } catch (e) {
          // ignore
        }

        const stored = localStorage.getItem(CMS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Sanitize rooms to ensure categories have valid images and category slug IDs
          const sanitizedRooms = Array.isArray(parsed.rooms) && parsed.rooms.length > 0
            ? parsed.rooms.slice(0, 3).map((r, idx) => {
                const cleanedImg = Array.isArray(r.image)
                  ? r.image.map((i) => typeof i === "string" && !i.startsWith("data:") ? i.replace(/\.jpeg$/i, ".webp") : i)
                  : typeof r.image === "string" && !r.image.startsWith("data:")
                  ? r.image.replace(/\.jpeg$/i, ".webp")
                  : r.image;

                const idStr = String(r.id || r.slug || r.name || r.type || "").toLowerCase();
                const numStr = String(r.roomNumber || "");
                const catSlug =
                  idStr.includes("budget") || numStr === "203" || numStr === "303" || numStr === "101"
                    ? "budget-family-room"
                    : idStr.includes("deluxe") || numStr === "201" || numStr === "301"
                    ? "deluxe-room"
                    : (idStr.includes("family") && !idStr.includes("budget")) || numStr === "202" || numStr === "302"
                    ? "family-room"
                    : idx === 0
                    ? "budget-family-room"
                    : idx === 1
                    ? "deluxe-room"
                    : "family-room";
                const catRoomNum = catSlug === "budget-family-room" ? "203" : catSlug === "deluxe-room" ? "201" : "302";

                return {
                  ...r,
                  id: catSlug,
                  slug: catSlug,
                  roomNumber: catRoomNum,
                  image: cleanedImg,
                  Noroom: 2,
                };
              })
            : DEFAULT_CMS_DATA.rooms;

          const rawLib = Array.isArray(parsed.media?.library) && parsed.media.library.length > 0
            ? parsed.media.library.filter((p) => {
                const pth = p.path || "";
                return (
                  !pth.includes("washRoom") &&
                  !pth.includes("storeRoom") &&
                  !pth.includes("doubleBedRoom") &&
                  !pth.includes("balkani") &&
                  !pth.includes("viewSeen")
                );
              })
            : HOTEL_PRESET_PHOTOS;

          return {
            ...DEFAULT_CMS_DATA,
            ...parsed,
            seo: { ...DEFAULT_CMS_DATA.seo, ...(parsed.seo || {}) },
            content: {
              ...DEFAULT_CMS_DATA.content,
              ...(parsed.content || {}),
              virtualTour: (() => {
                const rawTour = parsed.content?.virtualTour || {};
                const tourUrl = rawTour.embedUrl || DEFAULT_CMS_DATA.content.virtualTour.embedUrl;
                const isYt = /youtu\.?be|youtube\.com/i.test(tourUrl);
                return {
                  ...DEFAULT_CMS_DATA.content.virtualTour,
                  ...rawTour,
                  tourType: isYt ? "youtube" : (rawTour.tourType || DEFAULT_CMS_DATA.content.virtualTour.tourType),
                  embedUrl: tourUrl.includes("google.com/maps") ? DEFAULT_CMS_DATA.content.virtualTour.embedUrl : tourUrl,
                  coverImage: rawTour.coverImage || DEFAULT_CMS_DATA.content.virtualTour.coverImage,
                };
              })(),
            },
            media: {
              ...DEFAULT_CMS_DATA.media,
              ...(parsed.media || {}),
              library: rawLib.length > 0 ? rawLib : HOTEL_PRESET_PHOTOS,
            },
            sitePhotos: { ...DEFAULT_CMS_DATA.sitePhotos, ...(parsed.sitePhotos || {}) },
            rooms: sanitizedRooms,
            channels: {
              ...DEFAULT_CMS_DATA.channels,
              ...(parsed.channels || {}),
            },
          };
        }
      }
    } catch (err) {
      console.warn("Failed to load CMS data from localStorage:", err);
    }
    return DEFAULT_CMS_DATA;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      try {
        return sessionStorage.getItem(CMS_AUTH_KEY) === "true";
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  const [lastSaved, setLastSaved] = useState(null);

  // Auto-save to localStorage whenever data changes
  const saveCMSData = (updater) => {
    setData((prev) => {
      const nextData = typeof updater === "function" ? updater(prev) : updater;
      try {
        localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(nextData));
        setLastSaved(new Date().toLocaleTimeString());
      } catch (err) {
        console.error("Error saving CMS to localStorage:", err);
      }
      return nextData;
    });
  };

  // Strong password policy check
  const isStrongPassword = (pwd) => {
    if (!pwd || pwd.length < 8) return false;
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    return hasLetter && hasNumber;
  };

  // Auth actions with Strong Password & 2FA support
  const loginAdmin = (enteredPassword, twoFactorCode = "") => {
    const validPassword = data?.admin?.password || DEFAULT_PASSWORD;
    const is2FAEnabled = data?.admin?.twoFactorEnabled ?? true;
    const valid2FACode = data?.admin?.twoFactorCode || "8219"; // Default 2FA PIN based on official hotel phone 9851068219

    const pwd = (enteredPassword || "").trim();
    const code = (twoFactorCode || "").trim();

    if (pwd !== validPassword) {
      return { success: false, message: "Incorrect master password." };
    }

    // If 2FA is enabled and code is provided, verify it
    if (is2FAEnabled) {
      if (!code) {
        return { success: false, requires2FA: true, message: "Please enter your 2FA verification PIN." };
      }
      if (code !== String(valid2FACode).trim()) {
        return { success: false, requires2FA: true, message: "Invalid 2FA verification PIN." };
      }
    }

    sessionStorage.setItem(CMS_AUTH_KEY, "true");
    setIsAuthenticated(true);
    return { success: true };
  };

  const logoutAdmin = () => {
    sessionStorage.removeItem(CMS_AUTH_KEY);
    setIsAuthenticated(false);
  };

  const updateAdminPassword = (newPassword) => {
    const cleanPwd = (newPassword || "").trim();
    if (!isStrongPassword(cleanPwd)) {
      return {
        success: false,
        message: "Strong password required: at least 8 characters with letters and numbers.",
      };
    }
    saveCMSData((prev) => ({
      ...prev,
      admin: { ...prev.admin, password: cleanPwd },
    }));
    return { success: true, message: "Admin password updated successfully with strong security policy!" };
  };

  const updateAdmin2FA = (enabled, code = "8219") => {
    saveCMSData((prev) => ({
      ...prev,
      admin: {
        ...prev.admin,
        twoFactorEnabled: !!enabled,
        twoFactorCode: String(code).trim() || "8219",
      },
    }));
    return { success: true, message: `2FA ${enabled ? "enabled" : "disabled"} successfully!` };
  };

  // Section update helpers
  const updateSEO = (newSeo) => {
    saveCMSData((prev) => ({
      ...prev,
      seo: { ...prev.seo, ...newSeo },
    }));
  };

  const updatePageSEO = (pathname, pageSeo) => {
    saveCMSData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        pages: {
          ...prev.seo.pages,
          [pathname]: { ...(prev.seo.pages[pathname] || {}), ...pageSeo },
        },
      },
    }));
  };

  const updateContent = (sectionKey, newContent) => {
    saveCMSData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [sectionKey]: { ...(prev.content[sectionKey] || {}), ...newContent },
      },
    }));
  };

  const updateGallery = (newGalleryItems) => {
    saveCMSData((prev) => ({
      ...prev,
      media: { ...prev.media, gallery: newGalleryItems },
    }));
  };

  // Room-to-gallery/sitePhoto mapping
  // When a room photo changes, auto-sync it to the gallery and site photo cards
  const ROOM_GALLERY_MAP = {
    101: { galleryId: "g4",  sitePhotoKeys: ["roomCard_budget", "bookNow_budget"]  },
    201: { galleryId: "g1",  sitePhotoKeys: ["roomCard_deluxe", "bookNow_deluxe", "homeHero"]  },
    301: { galleryId: "g2",  sitePhotoKeys: ["roomCard_family", "bookNow_family"]  },
  };

  const updateSitePhotos = (newPhotos) => {
    saveCMSData((prev) => {
      let updatedRooms = Array.isArray(prev.rooms) ? [...prev.rooms] : [...DEFAULT_CMS_DATA.rooms];
      let updatedGallery = Array.isArray(prev.media?.gallery) ? [...prev.media.gallery] : [...DEFAULT_CMS_DATA.media.gallery];

      // Bi-directional sync: if roomCard_budget is updated, update room 101 image[0] and gallery g4
      if (newPhotos.roomCard_budget) {
        updatedRooms = updatedRooms.map((r) =>
          (Number(r.id) === 101 || String(r.id) === "101")
            ? { ...r, image: [newPhotos.roomCard_budget, ...(Array.isArray(r.image) ? r.image.slice(1) : [])] }
            : r
        );
        updatedGallery = updatedGallery.map((g) => g.id === "g4" ? { ...g, src: newPhotos.roomCard_budget } : g);
      }
      if (newPhotos.roomCard_deluxe || newPhotos.homeHero) {
        const src = newPhotos.roomCard_deluxe || newPhotos.homeHero;
        updatedRooms = updatedRooms.map((r) =>
          (Number(r.id) === 201 || String(r.id) === "201")
            ? { ...r, image: [src, ...(Array.isArray(r.image) ? r.image.slice(1) : [])] }
            : r
        );
        updatedGallery = updatedGallery.map((g) => g.id === "g1" ? { ...g, src } : g);
      }
      if (newPhotos.roomCard_family) {
        updatedRooms = updatedRooms.map((r) =>
          (Number(r.id) === 301 || String(r.id) === "301")
            ? { ...r, image: [newPhotos.roomCard_family, ...(Array.isArray(r.image) ? r.image.slice(1) : [])] }
            : r
        );
        updatedGallery = updatedGallery.map((g) => g.id === "g2" ? { ...g, src: newPhotos.roomCard_family } : g);
      }

      return {
        ...prev,
        sitePhotos: { ...prev.sitePhotos, ...newPhotos },
        rooms: updatedRooms,
        media: { ...prev.media, gallery: updatedGallery },
      };
    });
  };

  const updateRooms = (newRoomsList) => {
    saveCMSData((prev) => {
      // Build updated gallery — sync room image[0] into matching gallery entry
      let updatedGallery = [...(prev.media?.gallery || DEFAULT_CMS_DATA.media.gallery)];
      let updatedSitePhotos = { ...(prev.sitePhotos || DEFAULT_CMS_DATA.sitePhotos) };

      newRoomsList.forEach((room) => {
        const rId = Number(room.id);
        const newPhoto = Array.isArray(room.image) ? room.image[0] : room.image;

        if (newPhoto && typeof newPhoto === "string" && newPhoto.trim() !== "") {
          const mapping = ROOM_GALLERY_MAP[rId] || ROOM_GALLERY_MAP[room.id];
          if (mapping) {
            // Update gallery entry
            updatedGallery = updatedGallery.map((g) =>
              g.id === mapping.galleryId ? { ...g, src: newPhoto } : g
            );
            // Update sitePhoto keys (room card + book now page + home hero if deluxe)
            mapping.sitePhotoKeys.forEach((key) => {
              updatedSitePhotos[key] = newPhoto;
            });
          }
        }
      });

      return {
        ...prev,
        rooms: newRoomsList,
        media: { ...prev.media, gallery: updatedGallery },
        sitePhotos: updatedSitePhotos,
      };
    });
  };

  const updateChannels = (newChannels) => {
    saveCMSData((prev) => ({
      ...prev,
      channels: typeof newChannels === "function" ? newChannels(prev.channels) : newChannels,
    }));
  };

  const updateChannel = (channelKey, channelData) => {
    saveCMSData((prev) => ({
      ...prev,
      channels: {
        ...prev.channels,
        [channelKey]: {
          ...(prev.channels?.[channelKey] || DEFAULT_CMS_DATA.channels[channelKey] || {}),
          ...channelData,
        },
      },
    }));
  };

  const updateLibrary = (newLibrary) => {
    saveCMSData((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        library: newLibrary,
      },
    }));
  };

  const deleteFromLibrary = (photoPath) => {
    saveCMSData((prev) => {
      const current = prev.media?.library || HOTEL_PRESET_PHOTOS;
      return {
        ...prev,
        media: {
          ...prev.media,
          library: current.filter((p) => p.path !== photoPath),
        },
      };
    });
  };

  const addToLibrary = (newPhoto) => {
    saveCMSData((prev) => {
      const current = prev.media?.library || HOTEL_PRESET_PHOTOS;
      return {
        ...prev,
        media: {
          ...prev.media,
          library: [newPhoto, ...current],
        },
      };
    });
  };

  // Export / Import / Reset
  const exportConfigJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hotelsherpasoul-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importConfigJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== "object") {
        throw new Error("Invalid configuration file");
      }
      saveCMSData({
        ...DEFAULT_CMS_DATA,
        ...parsed,
      });
      return { success: true, message: "Configuration imported successfully!" };
    } catch (err) {
      return { success: false, message: "Failed to parse JSON file: " + err.message };
    }
  };

  const resetToDefaults = () => {
    localStorage.removeItem(CMS_STORAGE_KEY);
    setData(DEFAULT_CMS_DATA);
    setLastSaved(new Date().toLocaleTimeString());
    return { success: true, message: "CMS has been reset to factory defaults." };
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        seo: data.seo,
        content: data.content,
        media: data.media,
        hotelLibrary: data.media?.library || HOTEL_PRESET_PHOTOS,
        sitePhotos: data.sitePhotos || DEFAULT_CMS_DATA.sitePhotos,
        rooms: data.rooms,
        channels: data.channels || DEFAULT_CMS_DATA.channels,
        lastSaved,
        isAuthenticated,
        loginAdmin,
        logoutAdmin,
        updateAdminPassword,
        updateAdmin2FA,
        updateSEO,
        updatePageSEO,
        updateContent,
        updateGallery,
        updateLibrary,
        deleteFromLibrary,
        addToLibrary,
        updateSitePhotos,
        updateRooms,
        updateChannels,
        updateChannel,
        exportConfigJSON,
        importConfigJSON,
        resetToDefaults,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
