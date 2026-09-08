import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import ScrollToTop from "./Components/HelperComponents/ScrollToTop";
import Layout from "./Components/HelperComponents/Layout";
import ActionButtons from "./Components/HelperComponents/ActionButtons";
import MetaPixel from "./Components/Analytics/MetaPixel";
import CanonicalManager from "./Components/HelperComponents/CanonicalManager";

// Route-level code-splitting for optimal mobile performance
const AboutPage = lazy(() => import("./Pages/AboutPage"));
const ServicesPage = lazy(() => import("./Pages/ServicesPage"));
const RoomsPage = lazy(() => import("./Pages/RoomsPage"));
const ContactPage = lazy(() => import("./Pages/ContactPage"));
const FullGallery = lazy(() => import("./Pages/FullGallery"));
const RoomDetails = lazy(() => import("./Components/RoomsComponents/RoomDetails"));
const BookNowPage = lazy(() => import("./Pages/BookNowPage"));
const BlogPage = lazy(() => import("./Pages/BlogPage"));
const BookingForm = lazy(() => import("./Components/RoomsComponents/RoomBooking"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 border-3 border-amber-600/20 border-t-amber-600 rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Loading</span>
      </div>
    </div>
  );
}

function ExternalRedirect({ to }) {
  React.useEffect(() => {
    window.location.href = to;
  }, [to]);
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 border-3 border-amber-600/20 border-t-amber-600 rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Redirecting to PMS Staff Portal...</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <MetaPixel />
      <CanonicalManager />
      {/* <WhatsAppButton/>
      <LanguageSwitcher /> */}
      <ActionButtons />
      <Layout>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/book-now" element={<BookNowPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/room/:id" element={<RoomDetails />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gallery" element={<FullGallery />} />
            <Route path="/book/:id" element={<BookingForm />} />

                        <Route path="/admin" element={<ExternalRedirect to="https://hotelsherpasoulpms-sigma.vercel.app" />} />
            <Route path="/dashboard" element={<ExternalRedirect to="https://hotelsherpasoulpms-sigma.vercel.app" />} />
            <Route path="/pms" element={<ExternalRedirect to="https://hotelsherpasoulpms-sigma.vercel.app" />} />
            <Route path="/staff" element={<ExternalRedirect to="https://hotelsherpasoulpms-sigma.vercel.app" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
