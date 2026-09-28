import React from "react";
import HomeHero from "./HomeHero";
import HomeDirectOffer from "./HomeDirectOffer";
import HomeStats from "./HomeStats";
import HomeRooms from "./HomeRooms";
import HomeFacilities from "./HomeFacilities";
import HomeLocation from "./HomeLocation";
import HomeTrekkers from "./HomeTrekkers";
import HomeGoogleReviews from "./HomeGoogleReviews";
import HomeFAQ from "./HomeFAQ";
import HomeBookingCTA from "./HomeBookingCTA";

/**
 * Homepage Structure (Ordered strictly per Hotel SEO & Conversion Architecture):
 * 1. Hero section (HomeHero)
 * 2. Direct booking offer (HomeDirectOffer)
 * 3. Why stay at Hotel Sherpa Soul (HomeStats)
 * 4. Room types (HomeRooms - single instance of each room type)
 * 5. Hotel facilities and services (HomeFacilities - verified amenities)
 * 6. Location and nearby attractions (HomeLocation)
 * 7. Trekker-friendly services (HomeTrekkers)
 * 8. Guest reviews (HomeGoogleReviews - authentic Google review link & invitation)
 * 9. FAQ section (HomeFAQ - verified answers with positive quiet atmosphere wording)
 * 10. Final booking CTA (HomeBookingCTA)
 * 11. Footer is rendered by the global Layout wrapper
 */
export default function HomeMain() {
  return (
    <div className="overflow-x-hidden">
      {/* 1. Hero Section */}
      <HomeHero />

      {/* 2. Direct Booking Offer */}
      <HomeDirectOffer />

      {/* 3. Why Stay at Hotel Sherpa Soul */}
      <HomeStats />

      {/* 4. Room Types */}
      <HomeRooms />

      {/* 5. Hotel Facilities and Services */}
      <HomeFacilities />

      {/* 6. Location and Nearby Attractions */}
      <HomeLocation />

      {/* 7. Trekker-Friendly Services */}
      <HomeTrekkers />

      {/* 8. Guest Reviews (Genuine Google Reviews Card) */}
      <HomeGoogleReviews />

      {/* 9. FAQ Section */}
      <HomeFAQ />

      {/* 10. Final Booking CTA */}
      <HomeBookingCTA />
    </div>
  );
}
