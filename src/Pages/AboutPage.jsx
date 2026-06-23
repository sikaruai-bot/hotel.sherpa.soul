import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Mountain,
  Users,
  Award,
  MapPin,
  Heart,
  Star,
} from "lucide-react";
import AboutHero from "../Components/AboutComponents/AboutHero";
import AboutStats from "../Components/AboutComponents/AboutStats";
import Aboutstory from "../Components/AboutComponents/Aboutstory";
import AboutWhy from "../Components/AboutComponents/AboutWhy";
import AboutVision from "../Components/AboutComponents/AboutVision";

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans text-gray-800 overflow-hidden">
      {/* Enhanced Hero Section */}
      <AboutHero />
      {/* Stats Section */}
      <Aboutstory />
      <AboutStats />
      {/* Welcome Section - Enhanced */}
      {/* Feature Cards Section */}
      <AboutVision />
      <AboutWhy />
      {/* Enhanced Vision Section */}
    </div>
  );
}
