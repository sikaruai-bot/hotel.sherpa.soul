import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ServicesPage from "./Pages/ServicesPage";
import RoomsPage from "./Pages/RoomsPage";
import ContactPage from "./Pages/ContactPage";
import FullGallery from "./Pages/FullGallery";
import RoomDetails from "./Components/RoomsComponents/RoomDetails";
import ScrollToTop from "./Components/HelperComponents/ScrollToTop";
import Layout from "./Components/HelperComponents/Layout";
import BookNowPage from "./Pages/BookNowPage";
import BookingForm from "./Components/RoomsComponents/RoomBooking";
import LanguageSwitcher from "./Components/HelperComponents/LanguageSwticher";
import WhatsAppButton from "./Components/HelperComponents/Whatsapp";
import ActionButtons from "./Components/HelperComponents/ActionButtons";


function App() {
  return (
    <div>
      {/* <WhatsAppButton/>
      <LanguageSwitcher /> */}
      <ActionButtons/>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/book-now" element={<BookNowPage />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<FullGallery />} />
          <Route path="/book/:id" element={<BookingForm />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;

