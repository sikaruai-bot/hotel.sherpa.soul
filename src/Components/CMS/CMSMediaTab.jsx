import React, { useState } from "react";
import {
  Image as ImageIcon,
  Film,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Check,
  X,
  Sparkles,
  Play,
  Maximize2,
} from "lucide-react";

export default function CMSMediaTab({
  media,
  content,
  onUpdateGallery,
  onUpdateContent,
}) {
  const [activeSubTab, setActiveSubTab] = useState("gallery"); // gallery | heroMedia
  const [editingItem, setEditingItem] = useState(null); // null or item object
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [newItem, setNewItem] = useState({
    src: "",
    type: "image", // image | video
    title: "",
    alt: "",
    category: "rooms",
  });

  const gallery = media?.gallery || [];
  const hero = content?.hero || {};

  const handleHeroMediaChange = (field, val) => {
    onUpdateContent("hero", { [field]: val });
  };

  const handleSaveNewItem = (e) => {
    e.preventDefault();
    if (!newItem.src.trim()) return;

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
    if (window.confirm("Are you sure you want to remove this media item?")) {
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-400" />
                Website Gallery Items ({gallery.length})
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Add, replace or remove photos and video clips displayed on the public Gallery page.
              </p>
            </div>
            <button
              onClick={() => setIsAddingNew(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold rounded-xl shadow-lg shadow-amber-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Media</span>
            </button>
          </div>

          {/* Add New Item Card */}
          {isAddingNew && (
            <div className="bg-slate-900/90 border-2 border-amber-500/40 rounded-3xl p-6 md:p-8 animate-fadeIn shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Add Photo or Video to Gallery
                </h4>
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveNewItem} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Media Type
                    </label>
                    <select
                      value={newItem.type}
                      onChange={(e) =>
                        setNewItem({ ...newItem, type: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                    >
                      <option value="image">Photo / Image</option>
                      <option value="video">Video (MP4 / Direct Link)</option>
                    </select>
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

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Media URL or Path (e.g. /changes_photo/doubleBedRoom.webp or https://...)
                  </label>
                  <input
                    type="text"
                    required
                    value={newItem.src}
                    onChange={(e) =>
                      setNewItem({ ...newItem, src: e.target.value })
                    }
                    placeholder="/changes_photo/balkani.webp or https://..."
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Title / Caption
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
                      Image Alt Text (SEO)
                    </label>
                    <input
                      type="text"
                      value={newItem.alt}
                      onChange={(e) =>
                        setNewItem({ ...newItem, alt: e.target.value })
                      }
                      placeholder="e.g. Hotel Sherpa Soul Deluxe Room Thamel"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                    />
                  </div>
                </div>

                {/* Live Preview Box */}
                {newItem.src && (
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Live Preview
                    </span>
                    <div className="w-48 h-32 rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center">
                      {newItem.type === "video" ? (
                        <video
                          src={newItem.src}
                          controls
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={newItem.src}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "/hero/hero1.webp";
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl text-xs shadow-md shadow-amber-500/20"
                  >
                    Save to Gallery
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Edit Item Modal */}
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

                <form onSubmit={handleSaveEdit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Media URL / Path
                    </label>
                    <input
                      type="text"
                      value={editingItem.src}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, src: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                    />
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
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
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
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-amber-500 text-slate-950 font-semibold rounded-xl text-xs"
                    >
                      Update Item
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Grid of Gallery Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gallery.map((item, index) => (
              <div
                key={item.id || index}
                className="group relative bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all shadow-lg"
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

                <div className="p-4">
                  <h4 className="text-white text-xs font-semibold truncate">
                    {item.title || "Gallery Item"}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {item.src}
                  </p>

                  <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-slate-800/80">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                      title="Edit Item"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
              Replace the large visual banner on the homepage with an image or video.
            </p>
          </div>

          <div className="space-y-5 max-w-2xl">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Hero Background Image URL / Path
              </label>
              <input
                type="text"
                value={hero.bgImage || ""}
                onChange={(e) => handleHeroMediaChange("bgImage", e.target.value)}
                placeholder="/hero/hero1.webp or https://..."
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Hero Background Video (Optional MP4 URL)
              </label>
              <input
                type="text"
                value={hero.bgVideo || ""}
                onChange={(e) => handleHeroMediaChange("bgVideo", e.target.value)}
                placeholder="https://.../video.mp4 (Leave empty for image only)"
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                If provided, video will autoplay silently in the hero background.
              </p>
            </div>

            {/* Current Hero Preview */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Current Background Preview
              </span>
              <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
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
    </div>
  );
}
