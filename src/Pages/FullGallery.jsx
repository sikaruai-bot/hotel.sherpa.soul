import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCMS } from "../Context/CMSContext";

// Lazy loading for images/videos
const LazyMotionItem = ({ type, src, alt }) => {
  if (type === "video") {
    return (
      <video
        src={src}
        className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }
  return (
    <motion.img
      src={src}
      alt={alt || "Hotel Sherpa Soul Gallery Photo"}
      className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
      loading="lazy"
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onError={(e) => {
        e.target.src = "/hero/hero1.webp";
      }}
    />
  );
};

// Skeleton shimmer effect for loading state
const SkeletonShimmer = () => (
  <div className="animate-pulse h-full">
    <div
      className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-3xl h-full w-full"
      style={{
        backgroundSize: "200% 100%",
        animation: "shimmer 2.5s infinite linear",
      }}
    ></div>
  </div>
);

const GallerySkeletonGrid = ({ count = 12 }) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 lg:gap-8 space-y-6 lg:space-y-8">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="break-inside-avoid mb-6 lg:mb-8"
          style={{
            aspectRatio:
              index % 3 === 0 ? "4/5" : index % 4 === 0 ? "3/4" : "1/1",
          }}
        >
          <SkeletonShimmer />
        </div>
      ))}
    </div>
  );
};

export default function GalleryPage() {
  const { t } = useTranslation();
  const { media } = useCMS();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const gallery = media?.gallery && media.gallery.length > 0 ? media.gallery : [
    {
      src: "/room1/room.webp",
      type: "image",
      alt: "Hotel Sherpa Soul Deluxe Bedroom Interior",
    },
    {
      src: "/room1/room2.webp",
      type: "image",
      alt: "Hotel Sherpa Soul Cozy Guest Room",
    },
    {
      src: "/changes_photo/frontend_desk.webp",
      type: "image",
      alt: "Hotel Sherpa Soul 24/7 Front Desk & Reception",
    },
    {
      src: "/changes_photo/balkani.webp",
      type: "image",
      alt: "Hotel Sherpa Soul Private Balcony View",
    },
    {
      src: "/changes_photo/doubleBedRoom.webp",
      type: "image",
      alt: "Hotel Sherpa Soul Spacious Double Bedroom",
    },
    {
      src: "/hero/hero1.webp",
      type: "image",
      alt: "Kathmandu City View from Hotel Sherpa Soul",
    },
    {
      src: "/changes_photo/washRoom.webp",
      type: "image",
      alt: "Hotel Sherpa Soul Modern En-Suite Bathroom",
    },
    {
      src: "/changes_photo/storeRoom.webp",
      type: "image",
      alt: "Hotel Sherpa Soul Guest Amenities and Storage",
    },
    {
      src: "/changes_photo/viewSeen.webp",
      type: "image",
      alt: "Scenic Kathmandu Valley View from Hotel Sherpa Soul",
    },
  ];

  const openModal = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedIndex(null);
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextMedia = () =>
    setSelectedIndex((prev) => (prev + 1) % gallery.length);
  const prevMedia = () =>
    setSelectedIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] lg:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src="/changes_photo/doubleBedRoom.webp"
            alt="Hotel Sherpa Soul Deluxe Room Gallery Preview"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 lg:px-8 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              {t("gallery.title")}
            </h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto text-gray-200 font-light leading-relaxed">
              {t("gallery.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t("gallery.featuredTitle")}
            </h2>
            <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("gallery.featuredDesc")}
            </p>
          </div>
          {isLoading ? (
            <GallerySkeletonGrid count={12} />
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 lg:gap-8 space-y-6 lg:space-y-8">
              {gallery.map((file, index) => (
                <div
                  key={file.id || index}
                  className="group cursor-pointer relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-white break-inside-avoid mb-6 lg:mb-8"
                  onClick={() => openModal(index)}
                  style={{
                    aspectRatio:
                      index % 3 === 0 ? "4/5" : index % 4 === 0 ? "3/4" : "1/1",
                  }}
                >
                  <LazyMotionItem type={file.type} src={file.src} alt={file.alt} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/95 backdrop-blur-md rounded-full px-6 py-3 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                      <span className="text-gray-800 font-semibold text-sm">
                        {t("gallery.viewImage")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedIndex !== null && gallery[selectedIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-3 transition-all duration-200"
          >
            <X size={28} />
          </button>
          <button
            onClick={prevMedia}
            className="absolute left-6 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-4 transition-all duration-200"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={nextMedia}
            className="absolute right-6 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-4 transition-all duration-200"
          >
            <ChevronRight size={36} />
          </button>

          <div className="max-w-4xl max-h-[85vh] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
            <div className="overflow-auto flex flex-col md:flex-row gap-6">
              {gallery[selectedIndex].type === "image" ? (
                <img
                  src={gallery[selectedIndex].src}
                  alt={gallery[selectedIndex].alt || `Hotel Sherpa Soul Gallery Photo ${selectedIndex + 1}`}
                  className="max-w-full max-h-[70vh] object-contain shadow-md"
                  onError={(e) => {
                    e.target.src = "/hero/hero1.webp";
                  }}
                />
              ) : (
                <video
                  src={gallery[selectedIndex].src}
                  autoPlay
                  controls
                  className="max-w-full max-h-[70vh] object-contain shadow-md"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
