import React, { useState, useRef } from "react";
import {
  BedDouble,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  Upload,
  FolderOpen,
} from "lucide-react";
import { optimizeMediaFile, HOTEL_PRESET_PHOTOS } from "./mediaUtils";

export default function CMSRoomsTab({ rooms, onUpdateRooms }) {
  const [editingRoom, setEditingRoom] = useState(null);
  const [showPresetPicker, setShowPresetPicker] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [saveNotification, setSaveNotification] = useState(null);
  const roomFileInputRef = useRef(null);

  const handleToggleStatus = (id) => {
    const updated = rooms.map((r) => {
      if (r.id === id) {
        return {
          ...r,
          status: r.status === "AVAILABLE" ? "MAINTENANCE" : "AVAILABLE",
        };
      }
      return r;
    });
    onUpdateRooms(updated);
  };

  const handleRoomPhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editingRoom) return;

    try {
      setIsUploading(true);
      const optimized = await optimizeMediaFile(file);
      const nextImgs = [...(editingRoom.image || [])];
      nextImgs[0] = optimized.src;
      setEditingRoom({ ...editingRoom, image: nextImgs });
    } catch (err) {
      alert("Error processing photo: " + err.message);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handlePickPreset = (path) => {
    if (!editingRoom) return;
    const nextImgs = [...(editingRoom.image || [])];
    nextImgs[0] = path;
    setEditingRoom({ ...editingRoom, image: nextImgs });
    setShowPresetPicker(false);
  };

  const handleResetPhoto = () => {
    if (!editingRoom) return;
    const defaultImg =
      editingRoom.id === 101 ? "/triple.webp" :
      editingRoom.id === 201 ? "/changes_photo/singleBedWithSofa.webp" :
      "/changes_photo/doubleBed.webp";
    const nextImgs = [...(editingRoom.image || [])];
    nextImgs[0] = defaultImg;
    setEditingRoom({ ...editingRoom, image: nextImgs });
  };

  const handleSaveRoom = (e) => {
    e.preventDefault();
    if (!editingRoom) return;

    const updated = rooms.map((r) =>
      r.id === editingRoom.id ? editingRoom : r
    );
    onUpdateRooms(updated);
    setEditingRoom(null);
    setSaveNotification(`Room #${editingRoom.roomNumber} (${editingRoom.name}) updated successfully! Changes are live.`);
    setTimeout(() => setSaveNotification(null), 4500);
  };

  return (
    <div className="space-y-6">
      {saveNotification && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-2xl flex items-center gap-3 animate-fade-in shadow-lg">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{saveNotification}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-amber-400" />
            Rooms & Pricing Catalog ({rooms.length} Room Types)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Update room rates, bed configurations, sizes, descriptions and upload new photos from your computer.
          </p>
        </div>
      </div>

      {/* Edit Room Modal */}
      {editingRoom && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-amber-400" />
                Edit Room #{editingRoom.roomNumber} - {editingRoom.name}
              </h4>
              <button
                onClick={() => setEditingRoom(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRoom} className="space-y-5 text-left">
              {/* Room Photo Preview & Upload Controls */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Room Photo
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="w-36 h-24 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                    <img
                      src={editingRoom.image?.[0] || "/triple.webp"}
                      alt={editingRoom.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/hero/hero1.webp";
                      }}
                    />
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="file"
                      ref={roomFileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleRoomPhotoUpload}
                    />
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => roomFileInputRef.current?.click()}
                        className="flex-1 py-2 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo from Device</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowPresetPicker(true)}
                        className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-700"
                      >
                        <FolderOpen className="w-3.5 h-3.5 text-blue-400" />
                        <span>Pick from Library</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResetPhoto}
                        className="py-2 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-red-500/30 transition-all"
                        title="Reset photo to recommended default"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Reset / Clear</span>
                      </button>
                    </div>

                    {isUploading && (
                      <p className="text-[11px] text-amber-400">Processing photo...</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Room Display Name
                  </label>
                  <input
                    type="text"
                    value={editingRoom.name}
                    onChange={(e) =>
                      setEditingRoom({ ...editingRoom, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Price per Night (USD)
                  </label>
                  <input
                    type="number"
                    value={editingRoom.price}
                    onChange={(e) =>
                      setEditingRoom({
                        ...editingRoom,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Nepali Guest Rate (NPR)
                  </label>
                  <input
                    type="number"
                    value={editingRoom.priceNprApprox || (editingRoom.price ? Math.round(editingRoom.price * 135) : 2700)}
                    onChange={(e) =>
                      setEditingRoom({
                        ...editingRoom,
                        priceNprApprox: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Room Size
                  </label>
                  <input
                    type="text"
                    value={editingRoom.size || ""}
                    onChange={(e) =>
                      setEditingRoom({ ...editingRoom, size: e.target.value })
                    }
                    placeholder="e.g. 280 Sq. Ft."
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Bed Configuration
                  </label>
                  <input
                    type="text"
                    value={editingRoom.beds || ""}
                    onChange={(e) =>
                      setEditingRoom({ ...editingRoom, beds: e.target.value })
                    }
                    placeholder="e.g. 1 Queen Bed"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Max Guests
                  </label>
                  <input
                    type="number"
                    value={editingRoom.guests || 2}
                    onChange={(e) =>
                      setEditingRoom({
                        ...editingRoom,
                        guests: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Room Description
                </label>
                <textarea
                  rows={3}
                  value={editingRoom.description || ""}
                  onChange={(e) =>
                    setEditingRoom({
                      ...editingRoom,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm resize-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingRoom(null)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preset Photo Picker Modal for Rooms */}
      {showPresetPicker && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-amber-400" />
                Select Photo from Hotel Library
              </h4>
              <button
                onClick={() => setShowPresetPicker(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 py-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {HOTEL_PRESET_PHOTOS.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => handlePickPreset(photo.path)}
                  className="group cursor-pointer bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-400 transition-all"
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-800">
                    <img
                      src={photo.path}
                      alt={photo.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-2 text-center">
                    <span className="text-[11px] text-white font-medium truncate block">
                      {photo.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPresetPicker(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rooms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition-all shadow-xl"
          >
            <div className="aspect-video relative overflow-hidden bg-slate-950">
              <img
                src={room.image?.[0] || "/room1/room.webp"}
                alt={room.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/hero/hero1.webp";
                }}
              />
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-lg backdrop-blur-md flex items-center gap-1.5 ${
                  room.status === "AVAILABLE"
                    ? "bg-emerald-600 text-white border border-emerald-400/60 shadow-black/50"
                    : "bg-rose-600 text-white border border-rose-400/60 shadow-black/50"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    room.status === "AVAILABLE" ? "bg-emerald-200" : "bg-rose-200"
                  }`}
                />
                {room.status}
              </span>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                    Room #{room.roomNumber}
                  </span>
                  <h4 className="text-white text-base font-bold mt-0.5">
                    {room.name}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">from</span>
                  <p className="text-base font-bold text-amber-400">
                    ${room.price} USD
                  </p>
                  <p className="text-xs text-slate-300 font-medium">
                    ~NPR {(room.priceNprApprox || (room.price * 135))?.toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                {room.description}
              </p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800">
                <button
                  onClick={() => handleToggleStatus(room.id)}
                  className={`text-[11px] font-medium px-3 py-1.5 rounded-lg transition-colors ${
                    room.status === "AVAILABLE"
                      ? "text-slate-400 hover:text-red-400 bg-slate-800/60"
                      : "text-emerald-400 hover:text-emerald-300 bg-emerald-500/10"
                  }`}
                >
                  {room.status === "AVAILABLE" ? "Mark Maintenance" : "Mark Available"}
                </button>

                <button
                  onClick={() => setEditingRoom(room)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-xs transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Room</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
