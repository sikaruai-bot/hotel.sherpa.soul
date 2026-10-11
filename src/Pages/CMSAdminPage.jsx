import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../Context/CMSContext";
import CMSAuthModal from "../Components/CMS/CMSAuthModal";
import CMSSEOTab from "../Components/CMS/CMSSEOTab";
import CMSContentTab from "../Components/CMS/CMSContentTab";
import CMSMediaTab from "../Components/CMS/CMSMediaTab";
import CMSRoomsTab from "../Components/CMS/CMSRoomsTab";
import CMSChannelsTab from "../Components/CMS/CMSChannelsTab";
import CMSBackupTab from "../Components/CMS/CMSBackupTab";
import {
  Search,
  FileText,
  Image,
  BedDouble,
  Globe,
  Settings,
  ExternalLink,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function CMSAdminPage() {
  const {
    seo,
    content,
    media,
    sitePhotos,
    rooms,
    channels,
    lastSaved,
    isSaving,
    saveError,
    conflict,
    resolveConflict,
    isAuthenticated,
    loginAdmin,
    logoutAdmin,
    updateAdminPassword,
    updateSEO,
    updatePageSEO,
    updateContent,
    updateGallery,
    updateSitePhotos,
    updateRooms,
    updateChannels,
    updateChannel,
    exportConfigJSON,
    importConfigJSON,
    resetToDefaults,
  } = useCMS();

  const [activeTab, setActiveTab] = useState("channels"); // channels | seo | content | media | rooms | backup

  if (!isAuthenticated) {
    return <CMSAuthModal onLogin={loginAdmin} />;
  }

  const navTabs = [
    { id: "channels", label: "OTA & Channel Sync", icon: Globe, badge: "Sync" },
    { id: "seo", label: "Technical SEO & Analytics", icon: Search, badge: "Crucial" },
    { id: "content", label: "Copywriting & Texts", icon: FileText },
    { id: "media", label: "Photos & Videos Hub", icon: Image },
    { id: "rooms", label: "Rooms & Pricing", icon: BedDouble },
    { id: "backup", label: "Settings & Backup", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-md shadow-amber-500/20">
              <ShieldCheck className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight">
                  Hotel Sherpa Soul
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  CMS Suite
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none">
                Content & SEO Management Panel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Real-time Save status indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 border border-slate-700/60 rounded-full text-xs text-slate-300">
              {isSaving ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-amber-300">Saving changes...</span>
                </>
              ) : conflict ? (
                <button
                  type="button"
                  onClick={() => resolveConflict(true)}
                  className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-semibold cursor-pointer"
                  title="Click to overwrite and save your changes"
                >
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                  <span>Conflict: Click to Overwrite</span>
                </button>
              ) : saveError ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-red-400">Save Failed</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{lastSaved ? `Saved ${lastSaved}` : "Live Sync Active"}</span>
                </>
              )}
            </div>

            {/* Quick link to live public site */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition-all"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            {/* Logout button */}
            <button
              onClick={logoutAdmin}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-all"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Conflict Resolution Banner */}
        {conflict && (
          <div className="bg-amber-950/60 border border-amber-500/40 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-200 animate-fadeIn">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
              <div>
                <p className="font-semibold text-sm text-white">Server Conflict: Server has newer updates</p>
                <p className="text-xs text-amber-300/80">Would you like to keep your latest changes or load the server version?</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => resolveConflict(true)}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold transition-all shadow"
              >
                Overwrite With My Edits
              </button>
              <button
                onClick={() => resolveConflict(false)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all"
              >
                Discard & Reload Server
              </button>
            </div>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800/80">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                      isActive
                        ? "bg-slate-950 text-amber-400"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="animate-fadeIn">
          {activeTab === "channels" && (
            <CMSChannelsTab
              channels={channels}
              onUpdateChannels={updateChannels}
            />
          )}

          {activeTab === "seo" && (
            <CMSSEOTab
              seo={seo}
              onUpdateSEO={updateSEO}
              onUpdatePageSEO={updatePageSEO}
            />
          )}

          {activeTab === "content" && (
            <CMSContentTab
              content={content}
              onUpdateContent={updateContent}
            />
          )}

          {activeTab === "media" && (
            <CMSMediaTab
              media={media}
              content={content}
              sitePhotos={sitePhotos}
              onUpdateGallery={updateGallery}
              onUpdateContent={updateContent}
              onUpdateSitePhotos={updateSitePhotos}
            />
          )}

          {activeTab === "rooms" && (
            <CMSRoomsTab
              rooms={rooms}
              onUpdateRooms={updateRooms}
            />
          )}

          {activeTab === "backup" && (
            <CMSBackupTab
              onExport={exportConfigJSON}
              onImport={importConfigJSON}
              onReset={resetToDefaults}
              onUpdatePassword={updateAdminPassword}
            />
          )}
        </div>
      </main>
    </div>
  );
}
