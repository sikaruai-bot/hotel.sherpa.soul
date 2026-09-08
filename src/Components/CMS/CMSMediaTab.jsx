import React, { useState, useRef } from "react";
import {
  Image as ImageIcon,
  Film,
  Plus,
  Trash2,
  Edit2,
  Upload,
  FolderOpen,
  Check,
  X,
  Sparkles,
  Play,
  RotateCw,
  Eye,
} from "lucide-react";
import { optimizeMediaFile, HOTEL_PRESET_PHOTOS } from "./mediaUtils";

export default function CMSMediaTab({
  media,
  content,
  onUpdateGallery,
  onUpdateContent,
}) {
  const [activeSubTab, setActiveSubTab] = useState("gallery"); // gallery | heroMedia
  const [editingItem, setEditingItem] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showLibraryPicker, setShowLibraryPicker] = useState(false);
  const [libraryTarget, setLibraryTarget] = useState(null); // "new" | "edit" | "hero"
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);
  const replaceCardInputRef = useRef(null);
  const [replaceTargetId, setReplaceTargetId] = useState(null);

  const heroFileInputRef = useRef(null);

  const [newItem, setNewItem] = useState({
    src: "",
    type: "image",
    title: "",
    alt: "",
    category: "rooms",
  });

  const gallery = media?.gallery || [];
  const hero = content?.hero || {};

  // Handle direct file upload from device
  const handleDeviceUpload = async (e, target) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const optimized = await optimizeMediaFile(file);

      if (target === "new") {
        setNewItem((prev) => ({
          ...prev,
          src: optimized.src,
          type: optimized.type,
          title: prev.title || file.name.replace(/\.[^/.]+$/, ""),
          alt: prev.alt || "Hotel Sherpa Soul " + file.name.replace(/\.[^/.]+$/, ""),
        }));
      } else if (target === "edit" && editingItem) {
        setEditingItem((prev) => ({
          ...prev,
          src: optimized.src,
          type: optimized.type,
        }));
      } else if (target === "replace" && replaceTargetId) {
        const updated = gallery.map((item) => {
          if (item.id === replaceTargetId) {
            return {
              ...item,
              src: optimized.src,
              type: optimized.type,
            };
          }
          return item;
        });
        onUpdateGallery(updated);
        setReplaceTargetId(null);
      } else if (target === "hero") {
        if (optimized.type === "video") {
          onUpdateContent("hero", { bgVideo: optimized.src });
        } else {
          onUpdateContent("hero", { bgImage: optimized.src });
        }
      }
    } catch (err) {
      alert("Error processing file: " + err.message);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handlePickPreset = (path) => {
    if (libraryTarget === "new") {
      setNewItem((prev) => ({ ...prev, src: path, type: "image" }));
    } else if (libraryTarget === "edit" && editingItem) {
      setEditingItem((prev) => ({ ...prev, src: path, type: "image" }));
    } else if (libraryTarget === "hero") {
      onUpdateContent("hero", { bgImage: path });
    }
    setShowLibraryPicker(false);
    setLibraryTarget(null);
  };

  const handleSaveNewItem = (e) => {
    e.preventDefault();
    if (!newItem.src.trim()) {
      alert("Please upload a photo from your computer or pick from the hotel library.");
      return;
    }

    const itemToAdd = {
      id: "g_" + Date.now(),
      src: newItem.src.trim(),
      type: newItem.type,
      title: newItem.title.trim() || "Hotel Sherpa Soul Gallery",
      alt: newItem.alt.trim() || "Hotel Sherpa Soul Kathmandu",
      category: newItem.category || "rooms",
    };

    onUpdateGallery([...gallery, itemToAdd]);
    setNewItem({
      src: "",
      type: "image",
      title: "",
      alt: "",
      category: "rooms",
    });
    setIsAddingNew(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    const updated = gallery.map((item) =>
      item.id === editingItem.id ? editingItem : item
    );
    onUpdateGallery(updated);
    setEditingItem(null);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to remove this photo from the gallery?")) {
      const updated = gallery.filter((item) => item.id !== id);
      onUpdateGallery(updated);
    }
  };

  const triggerCardReplace = (id) => {
    setReplaceTargetId(id);
    replaceCardInputRef.current?.click();
  };

  return (
    <div className="space-y-8">
      {/* Hidden file input for single-click card replace */}
      <input
        type="file"
        ref={replaceCardInputRef}
        accept="image/*,video/mp4"
        className="hidden"
        onChange={(e) => handleDeviceUpload(e, "replace")}
      />

      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800">
        {[
          { id: "gallery", label: "Photo & Video Gallery Hub", icon: ImageIcon },
          { id: "heroMedia", label: "Hero Background Media", icon: Film },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all ${
                isActive
                  ? "bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. GALLERY MEDIA MANAGER */}
      {activeSubTab === "gallery" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-400" />
                Website Photos & Videos ({gallery.length})
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                You can directly upload photos from your computer/mobile or pick from existing hotel photos.
              </p>
            </div>
            <button
              onClick={() => setIsAddingNew(true)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Upload New Photo / Video</span>
            </button>
          </div>

          {/* ADD NEW MEDIA MODAL / CARD */}
          {isAddingNew && (
            <div className="bg-slate-900/95 border-2 border-amber-500/50 rounded-3xl p-6 md:p-8 animate-fadeIn shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Add New Photo to Website Gallery
                </h4>
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveNewItem} className="space-y-6">
                {/* 2 Easy Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option A: Upload from Device */}
                  <div className="border border-slate-700/80 bg-slate-800/50 hover:bg-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer transition-all">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*,video/mp4"
                      className="hidden"
                      onChange={(e) => handleDeviceUpload(e, "new")}
                    />
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-sm font-bold text-white group-hover:text-amber-400"
                    >
                      Upload from Computer / Mobile
                    </button>
                    <p className="text-xs text-slate-400 mt-1">
                      Pick any JPG, PNG, WebP or MP4 from your folder
                    </p>
                  </div>

                  {/* Option B: Choose from Hotel Media Library */}
                  <div
                    onClick={() => {
                      setLibraryTarget("new");
                      setShowLibraryPicker(true);
                    }}
                    className="border border-slate-700/80 bg-slate-800/50 hover:bg-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <FolderOpen className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-white group-hover:text-blue-400">
                      Choose from Hotel Photo Library
                    </span>
                    <p className="text-xs text-slate-400 mt-1">
                      Pick from rooms, balconies, washrooms, or views
                    </p>
                  </div>
                </div>

                {isUploading && (
                  <div className="flex items-center justify-center gap-2 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">
                    <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    <span>Processing and optimizing image...</span>
                  </div>
                )}

                {/* Selected Image Preview */}
                {newItem.src && (
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                      {newItem.type === "video" ? (
                        <video
                          src={newItem.src}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={newItem.src}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Photo Ready to Add
                      </span>
                      <p className="text-[11px] text-slate-400 truncate mt-1">
                        {newItem.src.startsWith("data:")
                          ? "Custom Device Upload"
                          : newItem.src}
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Photo Title / Caption (Optional)
                    </label>
                    <input
                      type="text"
                      value={newItem.title}
                      onChange={(e) =>
                        setNewItem({ ...newItem, title: e.target.value })
                      }
                      placeholder="e.g. Deluxe Double Balcony Room"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Category
                    </label>
                    <select
                      value={newItem.category}
                      onChange={(e) =>
                        setNewItem({ ...newItem, category: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                    >
                      <option value="rooms">Rooms & Suites</option>
                      <option value="exterior">Exterior & Views</option>
                      <option value="amenities">Amenities & Facilities</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newItem.src}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs shadow-md shadow-amber-500/20 transition-all"
                  >
                    Save Photo to Website
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* EDIT MEDIA MODAL */}
          {editingItem && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-white">
                    Edit Media Item
                  </h4>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                    {editingItem.type === "video" ? (
                      <video
                        src={editingItem.src}
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={editingItem.src}
                        alt="Edit preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex gap-2">
                    <label className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl text-center cursor-pointer border border-slate-700 flex items-center justify-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>Upload New from Device</span>
                      <input
                        type="file"
                        accept="image/*,video/mp4"
                        className="hidden"
                        onChange={(e) => handleDeviceUpload(e, "edit")}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setLibraryTarget("edit");
                        setShowLibraryPicker(true);
                      }}
                      className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-1.5"
                    >
                      <FolderOpen className="w-3.5 h-3.5 text-blue-400" />
                      <span>Pick from Library</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editingItem.title || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Alt Tag (SEO)
                    </label>
                    <input
                      type="text"
                      value={editingItem.alt || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, alt: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="px-5 py-2 bg-amber-500 text-slate-950 font-semibold rounded-xl text-xs"
                    >
                      Update Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GALLERY CARDS WITH INSTANT REPLACE BUTTON */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gallery.map((item, index) => (
              <div
                key={item.id || index}
                className="group relative bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all shadow-xl flex flex-col"
              >
                <div className="relative aspect-video bg-slate-950 overflow-hidden">
                  {item.type === "video" ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-slate-900">
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white/80" />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt || "Gallery Item"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "/hero/hero1.webp";
                      }}
                    />
                  )}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/60 text-white backdrop-blur-sm uppercase">
                    {item.type}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-white text-xs font-bold truncate">
                      {item.title || `Photo #${index + 1}`}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                      {item.alt || "Hotel Sherpa Soul"}
                    </p>
                  </div>

                  {/* Actions on Card */}
                  <div className="space-y-2 mt-4 pt-3 border-t border-slate-800">
                    {/* Instant Replace Button */}
                    <button
                      type="button"
                      onClick={() => triggerCardReplace(item.id)}
                      className="w-full py-2 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      title="Upload a new photo from your folder to replace this one"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Replace Photo</span>
                    </button>

                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingItem(item)}
                        className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs flex items-center justify-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. HERO BACKGROUND MEDIA */}
      {activeSubTab === "heroMedia" && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Film className="w-5 h-5 text-amber-400" />
              Homepage Hero Background Media
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Replace the large banner on the homepage by picking a photo or uploading from your computer.
            </p>
          </div>

          <div className="space-y-6 max-w-2xl">
            {/* Upload Buttons for Hero */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="file"
                ref={heroFileInputRef}
                accept="image/*,video/mp4"
                className="hidden"
                onChange={(e) => handleDeviceUpload(e, "hero")}
              />
              <button
                type="button"
                onClick={() => heroFileInputRef.current?.click()}
                className="p-5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-white transition-all shadow-md"
              >
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Upload New Hero from Device</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setLibraryTarget("hero");
                  setShowLibraryPicker(true);
                }}
                className="p-5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-white transition-all shadow-md"
              >
                <FolderOpen className="w-4 h-4 text-blue-400" />
                <span>Pick from Hotel Photo Library</span>
              </button>
            </div>

            {/* Current Hero Preview */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                Current Homepage Banner Preview
              </span>
              <div className="w-full h-56 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                {hero.bgVideo ? (
                  <video
                    src={hero.bgVideo}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={hero.bgImage || "/hero/hero1.webp"}
                    alt="Hero Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/hero/hero1.webp";
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: HOTEL PHOTO LIBRARY PICKER */}
      {showLibraryPicker && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-amber-400" />
                  Hotel Photo Library
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click on any photo below to immediately select it.
                </p>
              </div>
              <button
                onClick={() => setShowLibraryPicker(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {HOTEL_PRESET_PHOTOS.map((photo, i) => (
                <div
                  key={i}
                  onClick={() => handlePickPreset(photo.path)}
                  className="group cursor-pointer bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-400 transition-all shadow-md"
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-800">
                    <img
                      src={photo.path}
                      alt={photo.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.target.src = "/hero/hero1.webp";
                      }}
                    />
                  </div>
                  <div className="p-2.5 text-center">
                    <p className="text-white text-xs font-medium truncate">
                      {photo.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setShowLibraryPicker(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
