import React, { useState } from "react";
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
  const [showLibraryPicker, setShowLibraryPicker] = useState(false);
  const [libraryTarget, setLibraryTarget] = useState(null); // "new" | "edit" | "hero"
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState(null);

  const gallery = media?.gallery || [];
  const hero = content?.hero || {};

  // Handle direct file upload from device
  const handleDeviceUpload = async (e, target, cardId = null) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadSuccessMsg(null);
      const optimized = await optimizeMediaFile(file);

      if (target === "quickAdd") {
        // Immediately add to gallery
        const fileName = file.name.replace(/\.[^/.]+$/, "");
        const newItem = {
          id: "g_" + Date.now(),
          src: optimized.src,
          type: optimized.type,
          title: fileName || "New Upload",
          alt: "Hotel Sherpa Soul " + fileName,
          category: "rooms",
        };
        onUpdateGallery([newItem, ...gallery]);
        setUploadSuccessMsg("Photo successfully uploaded from folder and added to gallery!");
        setTimeout(() => setUploadSuccessMsg(null), 3500);
      } else if (target === "replace" && cardId) {
        // Immediately replace the specific photo
        const updated = gallery.map((item) => {
          if (item.id === cardId) {
            return {
              ...item,
              src: optimized.src,
              type: optimized.type,
            };
          }
          return item;
        });
        onUpdateGallery(updated);
        setUploadSuccessMsg("Photo replaced successfully!");
        setTimeout(() => setUploadSuccessMsg(null), 3500);
      } else if (target === "edit" && editingItem) {
        setEditingItem((prev) => ({
          ...prev,
          src: optimized.src,
          type: optimized.type,
        }));
      } else if (target === "hero") {
        if (optimized.type === "video") {
          onUpdateContent("hero", { bgVideo: optimized.src });
        } else {
          onUpdateContent("hero", { bgImage: optimized.src });
        }
        setUploadSuccessMsg("Hero background updated successfully!");
        setTimeout(() => setUploadSuccessMsg(null), 3500);
      }
    } catch (err) {
      alert("Error processing file: " + err.message);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handlePickPreset = (path) => {
    if (libraryTarget === "quickAdd") {
      const newItem = {
        id: "g_" + Date.now(),
        src: path,
        type: "image",
        title: "Hotel Sherpa Soul Photo",
        alt: "Hotel Sherpa Soul Thamel Kathmandu",
        category: "rooms",
      };
      onUpdateGallery([newItem, ...gallery]);
      setUploadSuccessMsg("Photo from hotel library added to gallery!");
      setTimeout(() => setUploadSuccessMsg(null), 3500);
    } else if (libraryTarget === "edit" && editingItem) {
      setEditingItem((prev) => ({ ...prev, src: path, type: "image" }));
    } else if (libraryTarget === "hero") {
      onUpdateContent("hero", { bgImage: path });
      setUploadSuccessMsg("Hero background updated!");
      setTimeout(() => setUploadSuccessMsg(null), 3500);
    }
    setShowLibraryPicker(false);
    setLibraryTarget(null);
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
    if (window.confirm("Are you sure you want to remove this photo from the website gallery?")) {
      const updated = gallery.filter((item) => item.id !== id);
      onUpdateGallery(updated);
    }
  };

  return (
    <div className="space-y-8">
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
          {/* Direct Upload Actions Banner */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-amber-400" />
                  Website Gallery ({gallery.length} Photos & Videos)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Click the button below to directly open your computer or phone folder and pick any photo.
                </p>
              </div>

              {/* TWO DIRECT ACTION BUTTONS (NATIVE LABELS FOR 100% RELIABLE FILE PICKING) */}
              <div className="flex flex-wrap items-center gap-3">
                {/* 1. Direct Computer / Mobile Folder Upload */}
                <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 text-sm font-bold rounded-2xl shadow-xl shadow-amber-500/20 transition-all select-none">
                  <input
                    type="file"
                    accept="image/*,video/mp4"
                    className="sr-only"
                    onChange={(e) => handleDeviceUpload(e, "quickAdd")}
                  />
                  <Upload className="w-4 h-4" />
                  <span>📁 Upload Photo from Computer / Mobile</span>
                </label>

                {/* 2. Choose from Hotel Library */}
                <button
                  type="button"
                  onClick={() => {
                    setLibraryTarget("quickAdd");
                    setShowLibraryPicker(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-sm font-semibold rounded-2xl border border-slate-700 transition-all select-none"
                >
                  <FolderOpen className="w-4 h-4 text-blue-400" />
                  <span>🖼️ Pick from Hotel Library</span>
                </button>
              </div>
            </div>

            {/* Uploading Status Banner */}
            {isUploading && (
              <div className="mt-4 flex items-center gap-2.5 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs text-amber-300 animate-pulse">
                <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                <span>Processing and uploading photo from folder...</span>
              </div>
            )}

            {/* Success Feedback Banner */}
            {uploadSuccessMsg && (
              <div className="mt-4 flex items-center gap-2 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs text-emerald-400">
                <Check className="w-4 h-4 shrink-0" />
                <span>{uploadSuccessMsg}</span>
              </div>
            )}
          </div>

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
                  <div className="w-full h-44 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
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
                    <label className="flex-1 py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl text-center cursor-pointer flex items-center justify-center gap-1.5 shadow-md transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload from Device</span>
                      <input
                        type="file"
                        accept="image/*,video/mp4"
                        className="sr-only"
                        onChange={(e) => handleDeviceUpload(e, "edit")}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setLibraryTarget("edit");
                        setShowLibraryPicker(true);
                      }}
                      className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-1.5"
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

          {/* GALLERY CARDS WITH INSTANT NATIVE REPLACE LABEL BUTTON */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gallery.map((item, index) => (
              <div
                key={item.id || index}
                className="group relative bg-slate-900/70 border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all shadow-xl flex flex-col"
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
                    {/* Native Label for Instant OS File Picker on Click */}
                    <label className="cursor-pointer w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all select-none">
                      <input
                        type="file"
                        accept="image/*,video/mp4"
                        className="sr-only"
                        onChange={(e) => handleDeviceUpload(e, "replace", item.id)}
                      />
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Replace Photo from Folder</span>
                    </label>

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
            {/* Native Label for Hero Upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="cursor-pointer p-5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold shadow-xl transition-all select-none">
                <input
                  type="file"
                  accept="image/*,video/mp4"
                  className="sr-only"
                  onChange={(e) => handleDeviceUpload(e, "hero")}
                />
                <Upload className="w-4 h-4" />
                <span>Upload Hero Photo from Folder</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setLibraryTarget("hero");
                  setShowLibraryPicker(true);
                }}
                className="p-5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-white transition-all shadow-md"
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
