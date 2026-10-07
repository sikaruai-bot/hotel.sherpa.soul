import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CMSProvider } from "./Context/CMSContext";

import HomePage from "./Pages/HomePage";

// Code-split secondary routes to shrink initial JS bundle size and minimize Total Blocking Time (TBT)
const RoomsPage = lazy(() => import("./Pages/RoomsPage"));
const AboutPage = lazy(() => import("./Pages/AboutPage"));
const ServicesPage = lazy(() => import("./Pages/ServicesPage"));
const ContactPage = lazy(() => import("./Pages/ContactPage"));
const FullGallery = lazy(() => import("./Pages/FullGallery"));
const RoomDetails = lazy(() => import("./Components/RoomsComponents/RoomDetails"));
const BookNowPage = lazy(() => import("./Pages/BookNowPage"));
const BlogPage = lazy(() => import("./Pages/BlogPage"));
const PrivacyPage = lazy(() => import("./Pages/PrivacyPage"));
const TermsPage = lazy(() => import("./Pages/TermsPage"));

import ScrollToTop from "./Components/HelperComponents/ScrollToTop";
import Layout from "./Components/HelperComponents/Layout";
import ActionButtons from "./Components/HelperComponents/ActionButtons";
import MetaPixel from "./Components/Analytics/MetaPixel";
import CanonicalManager from "./Components/HelperComponents/CanonicalManager";
import CookieConsent from "./Components/HelperComponents/CookieConsent";

// Lazy-load admin/CMS and 404 to isolate heavy administrative bundles
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));
const CMSAdminPage = lazy(() => import("./Pages/CMSAdminPage"));

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

function AppContent() {
  const location = useLocation();
  const cleanPath = location.pathname.toLowerCase().replace(/\/+$/, "") || "/";
  const isCmsRoute =
    cleanPath === "/cms" ||
    cleanPath === "/site-admin" ||
    cleanPath.startsWith("/cms/") ||
    cleanPath.startsWith("/site-admin/");

  if (isCmsRoute) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/cms" element={<CMSAdminPage />} />
          <Route path="/cms/*" element={<CMSAdminPage />} />
          <Route path="/site-admin" element={<CMSAdminPage />} />
          <Route path="/site-admin/*" element={<CMSAdminPage />} />
          <Route path="*" element={<CMSAdminPage />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <div>
      <MetaPixel />
      <CanonicalManager />
      <ActionButtons />
      <CookieConsent />
      <Layout>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/book-now" element={<BookNowPage />} />
            <Route path="/book/:id" element={<BookNowPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/room/:id" element={<RoomDetails />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gallery" element={<FullGallery />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* Client-side fallback redirects for old room & booking URLs → new category slug URLs */}
            <Route path="/room/101" element={<Navigate to="/room/budget-family-room" replace />} />
            <Route path="/book/101" element={<Navigate to="/book/budget-family-room" replace />} />
            <Route path="/book/1" element={<Navigate to="/book/budget-family-room" replace />} />

            <Route path="/room/201" element={<Navigate to="/room/deluxe-room" replace />} />
            <Route path="/book/201" element={<Navigate to="/book/deluxe-room" replace />} />
            <Route path="/book/2" element={<Navigate to="/book/deluxe-room" replace />} />

            <Route path="/room/301" element={<Navigate to="/room/family-room" replace />} />
            <Route path="/book/301" element={<Navigate to="/book/family-room" replace />} />
            <Route path="/book/3" element={<Navigate to="/book/family-room" replace />} />

            <Route path="/rooms/budget-family-room" element={<Navigate to="/room/budget-family-room" replace />} />
            <Route path="/rooms/deluxe-room" element={<Navigate to="/room/deluxe-room" replace />} />
            <Route path="/rooms/family-room" element={<Navigate to="/room/family-room" replace />} />
            {/* Redirect /location → /contact (location info is in contact page) */}
            <Route path="/location" element={<Navigate to="/contact" replace />} />
            {/* Redirect /privacy-policy and /terms-and-conditions aliases */}
            <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
            <Route path="/terms-and-conditions" element={<Navigate to="/terms" replace />} />
            <Route path="/cancellation-policy" element={<Navigate to="/terms" replace />} />

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

function App() {
  return (
    <CMSProvider>
      <AppContent />
    </CMSProvider>
  );
}

export default App;
