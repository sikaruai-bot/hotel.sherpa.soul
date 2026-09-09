import React from "react";
import HomeHero from "./HomeHero";
import HomeIntro from "./HomeIntro";
import HomeLocation from "./HomeLocation";
import HomeRooms from "./HomeRooms";
import HomeServices from "./HomeServices";
import HomeGoogleReviews from "./HomeGoogleReviews";
import HomeFacilities from "./HomeFacilities";
import HomeStats from "./HomeStats";
import HomeFAQ from "./HomeFAQ";

export default function HomeMain() {
  return (
    <div>
      <HomeHero />
      <HomeStats />
      <HomeIntro />
      <HomeRooms />
      <HomeServices />
      <HomeFacilities />
      <HomeGoogleReviews />
      <HomeFAQ />
      <HomeLocation />
    </div>
  );
}
