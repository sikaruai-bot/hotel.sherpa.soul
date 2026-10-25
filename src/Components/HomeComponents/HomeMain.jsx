import React, { Suspense, lazy } from "react";
import HomeHero from "./HomeHero";
import HomeDirectOffer from "./HomeDirectOffer";
import HomeStats from "./HomeStats";

// Below-the-fold sections are lazy-loaded to reduce the initial JS bundle.
// They are rendered only after the critical above-the-fold content (Hero, Offer, Stats).
const HomeRooms         = lazy(() => import("./HomeRooms"));
const HomeFacilities    = lazy(() => import("./HomeFacilities"));
const HomeLocation      = lazy(() => import("./HomeLocation"));
const HomeTrekkers      = lazy(() => import("./HomeTrekkers"));
const HomeGoogleReviews = lazy(() => import("./HomeGoogleReviews"));
const HomeFAQ           = lazy(() => import("./HomeFAQ"));
const HomeBookingCTA    = lazy(() => import("./HomeBookingCTA"));

// Minimal inline fallback — no extra imports needed, no layout shift
function SectionSkeleton() {
  return (
    <div className="py-16 flex items-center justify-center" aria-hidden="true">
      <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
    </div>
  );
}

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
      {/* 1. Hero Section — above the fold, eagerly loaded */}
      <HomeHero />

      {/* 2. Direct Booking Offer — above the fold, eagerly loaded */}
      <HomeDirectOffer />

      {/* 3. Why Stay at Hotel Sherpa Soul — eagerly loaded (just below fold) */}
      <HomeStats />

      {/* 4–10. Below the fold: lazy-loaded via Suspense */}
      <Suspense fallback={<SectionSkeleton />}>
        <HomeRooms />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <HomeFacilities />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <HomeLocation />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <HomeTrekkers />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <HomeGoogleReviews />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <HomeFAQ />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <HomeBookingCTA />
      </Suspense>
    </div>
  );
}
