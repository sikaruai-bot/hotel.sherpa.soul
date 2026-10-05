import React, { useState, useRef } from "react";
import {
  Upload,
  Check,
  RotateCw,
  Image as ImageIcon,
  Sparkles,
  Home,
  BedDouble,
  Calendar,
  UtensilsCrossed,
  Eye,
  Trash2,
} from "lucide-react";
import { useCMS } from "../../Context/CMSContext";

// Site photo groups definition
const PHOTO_GROUPS = [
  {
    id: "homepage",
    label: "Homepage",
    icon: Home,
    color: "from-blue-600 to-indigo-600",
    fields: [
      {
        key: "homeHero",
        label: "Homepage Hero Background",
        desc: "Main background photo behind the hotel title on the homepage",
        page: "hotelsherpasoul.com",
      },
    ],
  },
  {
    id: "roomCards",
    label: "Room Cards (Homepage)",
    icon: BedDouble,
    color: "from-amber-600 to-orange-500",
    fields: [
      {
        key: "roomCard_budget",
        label: "Budget Family Room Card",
        desc: "Photo shown on the Budget Family Room card on the homepage rooms section",
        page: "Homepage → Rooms section",
      },
      {
        key: "roomCard_deluxe",
        label: "Deluxe Room Card",
        desc: "Photo shown on the Deluxe Room card on the homepage",
        page: "Homepage → Rooms section",
      },
      {
        key: "roomCard_family",
        label: "Family Room Card",
        desc: "Photo shown on the Family Room card on the homepage",
        page: "Homepage → Rooms section",
      },
    ],
  },
  {
    id: "bookNow",
    label: "Book Now Page",
    icon: Calendar,
    color: "from-emerald-600 to-teal-500",
    fields: [
      {
        key: "bookNow_hero",
        label: "Book Now Page Hero",
        desc: "Background photo on the Book Now / Book Direct page header",
        page: "hotelsherpasoul.com/book-now",
      },
      {
        key: "bookNow_budget",
        label: "Budget Family Room (Book Now)",
        desc: "Photo on the Budget Family Room selection card in Book Now",
        page: "Book Now → Room selection",
      },
      {
        key: "bookNow_deluxe",
        label: "Deluxe Room (Book Now)",
        desc: "Photo on the Deluxe Room selection card in Book Now",
        page: "Book Now → Room selection",
      },
      {
        key: "bookNow_family",
        label: "Family Room (Book Now)",
        desc: "Photo on the Family Room selection card in Book Now",
        page: "Book Now → Room selection",
      },
    ],
  },
  {
    id: "amenities",
    label: "Amenities & Services",
    icon: UtensilsCrossed,
    color: "from-purple-600 to-violet-500",
    fields: [
      {
        key: "services_kitchen",
        label: "Shared Kitchen Photo",
        desc: "Photo of the shared self-kitchen used in Services and About pages",
        page: "Services page",
      },
      {
        key: "services_frontdesk",
        label: "Front Desk Photo",
        desc: "Photo of the hotel front desk / reception used on multiple pages",
        page: "About / Services page",
      },
      {
        key: "washroom",
        label: "Washroom / Bathroom",
        desc: "Attached private bathroom photo used across the site",
        page: "Multiple pages",
      },
      {
        key: "balcony",
        label: "Balcony View",
        desc: "Balcony/outdoor area photo used in gallery and rooms",
        page: "Gallery / Rooms",
      },
      {
        key: "rooftop",
        label: "Rooftop / City View",
        desc: "Rooftop or city view photo",
        page: "Gallery / About",
      },
      {
        key: "storage",
        label: "Luggage Storage Room",
        desc: "Luggage / storage room photo for services section",
        page: "Services page",
      },
    ],
  },
];

export default function SitePhotosManager({
  sitePhotos,
  onUpdateSitePhotos,
  presets,
  onOptimize,
}) {
  const [activeGroup, setActiveGroup] = useState("homepage");
  const [isUploading, setIsUploading] = useState(null); // key being uploaded
  const [successMsg, setSuccessMsg] = useState(null);
  const fileInputRef = useRef(null);
  const [pendingUploadKey, setPendingUploadKey] = useState(null);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Open file picker
  const handleUploadClick = (key) => {
    setPendingUploadKey(key);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  // Handle file upload
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !pendingUploadKey) return;
    try {
      setIsUploading(pendingUploadKey);
      const optimized = await onOptimize(file);
      onUpdateSitePhotos({ [pendingUploadKey]: optimized.src });
      showSuccess("Photo updated successfully! ✓");
    } catch (err) {
      alert("Error uploading photo: " + err.message);
    } finally {
      setIsUploading(null);
      setPendingUploadKey(null);
      e.target.value = "";
    }
  };


  const currentGroup = PHOTO_GROUPS.find((g) => g.id === activeGroup);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
            <ImageIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Website Photos Manager
              <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                Live Edit
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Change any photo used on the website. Upload from your computer or pick from the hotel photo library.
            </p>
          </div>
        </div>

        {/* Success message */}
        {successMsg && (
          <div className="mt-3 flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-medium">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      {/* Group tabs */}
      <div className="flex flex-wrap gap-2">
        {PHOTO_GROUPS.map((group) => {
          const Icon = group.icon;
          const isActive = activeGroup === group.id;
          return (
            <button
              key={group.id}
              onClick={() => setActiveGroup(group.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? `bg-gradient-to-r ${group.color} text-white shadow-lg`
                  : "bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{group.label}</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                {PHOTO_GROUPS.find(g => g.id === group.id)?.fields?.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Photo cards for active group */}
      {currentGroup && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentGroup.fields.map((field) => {
            const currentSrc = sitePhotos?.[field.key] || "";
            const uploading = isUploading === field.key;

            return (
              <div
                key={field.key}
                className="bg-slate-900/80 border border-slate-700/60 rounded-2xl overflow-hidden group hover:border-amber-500/40 transition-all duration-300"
              >
                {/* Photo Preview */}
                <div className="relative h-44 bg-slate-800 overflow-hidden">
                  {currentSrc ? (
                    <img
                      src={currentSrc}
                      alt={field.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-10 h-10 text-slate-600" />
                    </div>
                  )}

                  {/* Uploading overlay */}
                  {uploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-white text-sm font-medium">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Uploading...</span>
                      </div>
                    </div>
                  )}

                  {/* Page badge */}
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-[10px] text-slate-300 px-2 py-1 rounded-lg font-medium">
                    {field.page}
                  </div>
                </div>

                {/* Info + actions */}
                <div className="p-3.5 space-y-2.5">
                  <div>
                    <p className="text-white text-sm font-bold leading-tight">{field.label}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5 leading-snug">{field.desc}</p>
                  </div>

                  <div>
                    <button
                      onClick={() => handleUploadClick(field.key)}
                      disabled={uploading}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md disabled:opacity-50"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFileChange}
      />
    </div>
  );
}
