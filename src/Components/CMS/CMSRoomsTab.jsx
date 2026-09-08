import React, { useState } from "react";
import { BedDouble, Plus, Edit2, Trash2, Check, X, Sparkles } from "lucide-react";

export default function CMSRoomsTab({ rooms, onUpdateRooms }) {
  const [editingRoom, setEditingRoom] = useState(null);

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

  const handleSaveRoom = (e) => {
    e.preventDefault();
    if (!editingRoom) return;

    const updated = rooms.map((r) =>
      r.id === editingRoom.id ? editingRoom : r
    );
    onUpdateRooms(updated);
    setEditingRoom(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-amber-400" />
            Rooms & Pricing Catalog ({rooms.length} Room Types)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Update room rates, bed configurations, sizes, descriptions and images.
          </p>
        </div>
      </div>

      {/* Edit Room Modal */}
      {editingRoom && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl my-8">
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

            <form onSubmit={handleSaveRoom} className="space-y-4 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    Price per Night (NPR)
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

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Primary Photo Path / URL
                </label>
                <input
                  type="text"
                  value={editingRoom.image?.[0] || ""}
                  onChange={(e) => {
                    const nextImgs = [...(editingRoom.image || [])];
                    nextImgs[0] = e.target.value;
                    setEditingRoom({ ...editingRoom, image: nextImgs });
                  }}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
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
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl text-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
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
                className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md ${
                  room.status === "AVAILABLE"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}
              >
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
                    NPR {room.price?.toLocaleString()}
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
