import React, { createContext, useContext, useState, useEffect } from "react";
import { rooms as initialRooms } from "../Components/HelperComponents/RoomsData";

const CMS_STORAGE_KEY = "HSS_CMS_DATA_V2";
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
      metaPixelId: "1952950858737501",
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
      checkinTime: "14:00",
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
  },
  media: {
    gallery: [
      {
        id: "g1",
        src: "/room1/room.webp",
        type: "image",
        title: "Deluxe Bedroom Interior",
        alt: "Hotel Sherpa Soul Deluxe Bedroom Interior",
        category: "rooms",
      },
      {
        id: "g2",
        src: "/room1/room2.webp",
        type: "image",
        title: "Cozy Guest Room Setup",
        alt: "Hotel Sherpa Soul Cozy Guest Room",
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
        src: "/changes_photo/doubleBedRoom.webp",
        type: "image",
        title: "Spacious Double Bedroom",
        alt: "Hotel Sherpa Soul Spacious Double Bedroom",
        category: "rooms",
      },
      {
        id: "g5",
        src: "/hero/hero1.webp",
        type: "image",
        title: "Kathmandu Valley Panoramic View",
        alt: "Kathmandu City View from Hotel Sherpa Soul",
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
        src: "/changes_photo/viewSeen.webp",
        type: "image",
        title: "Scenic Thamel Rooftop Skyline",
        alt: "Scenic Kathmandu Valley View from Hotel Sherpa Soul",
        category: "exterior",
      },
    ],
  },
  rooms: initialRooms,
};

const CMSContext = createContext(null);

export function CMSProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(CMS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Deep merge with defaults so new schema fields are always present
        return {
          ...DEFAULT_CMS_DATA,
          ...parsed,
          seo: { ...DEFAULT_CMS_DATA.seo, ...(parsed.seo || {}) },
          content: { ...DEFAULT_CMS_DATA.content, ...(parsed.content || {}) },
          media: { ...DEFAULT_CMS_DATA.media, ...(parsed.media || {}) },
          rooms: Array.isArray(parsed.rooms) && parsed.rooms.length > 0 ? parsed.rooms : DEFAULT_CMS_DATA.rooms,
        };
      }
    } catch (err) {
      console.warn("Failed to load CMS data from localStorage:", err);
    }
    return DEFAULT_CMS_DATA;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(CMS_AUTH_KEY) === "true";
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

  // Auth actions
  const loginAdmin = (enteredPassword) => {
    const validPassword = data?.admin?.password || DEFAULT_PASSWORD;
    if (enteredPassword === validPassword) {
      sessionStorage.setItem(CMS_AUTH_KEY, "true");
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, message: "Incorrect password / PIN" };
  };

  const logoutAdmin = () => {
    sessionStorage.removeItem(CMS_AUTH_KEY);
    setIsAuthenticated(false);
  };

  const updateAdminPassword = (newPassword) => {
    if (!newPassword || newPassword.trim().length < 4) {
      return { success: false, message: "Password must be at least 4 characters." };
    }
    saveCMSData((prev) => ({
      ...prev,
      admin: { ...prev.admin, password: newPassword.trim() },
    }));
    return { success: true, message: "Password updated successfully!" };
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

  const updateRooms = (newRoomsList) => {
    saveCMSData((prev) => ({
      ...prev,
      rooms: newRoomsList,
    }));
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
        rooms: data.rooms,
        lastSaved,
        isAuthenticated,
        loginAdmin,
        logoutAdmin,
        updateAdminPassword,
        updateSEO,
        updatePageSEO,
        updateContent,
        updateGallery,
        updateRooms,
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
