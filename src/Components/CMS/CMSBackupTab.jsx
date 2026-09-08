import React, { useState, useRef } from "react";
import { Download, Upload, RotateCcw, Key, ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function CMSBackupTab({
  onExport,
  onImport,
  onReset,
  onUpdatePassword,
}) {
  const fileInputRef = useRef(null);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passMsg, setPassMsg] = useState(null);
  const [importMsg, setImportMsg] = useState(null);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPassMsg(null);
    if (!newPass.trim() || newPass.trim().length < 4) {
      setPassMsg({ type: "error", text: "Password must be at least 4 characters." });
      return;
    }
    if (newPass !== confirmPass) {
      setPassMsg({ type: "error", text: "Passwords do not match." });
      return;
    }
    const res = onUpdatePassword(newPass);
    if (res.success) {
      setPassMsg({ type: "success", text: res.message });
      setNewPass("");
      setConfirmPass("");
    } else {
      setPassMsg({ type: "error", text: res.message });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      const res = onImport(content);
      if (res.success) {
        setImportMsg({ type: "success", text: res.message });
      } else {
        setImportMsg({ type: "error", text: res.message });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleResetConfirm = () => {
    if (
      window.confirm(
        "WARNING: This will wipe all custom SEO, content, and media modifications and reset everything back to initial website defaults. Are you sure?"
      )
    ) {
      onReset();
      alert("CMS has been restored to factory defaults.");
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* 1. BACKUP & RESTORE */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-amber-400" />
            1-Click Backup & JSON Restore
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Export a full snapshot of your website SEO, content, photos, and room catalog to keep a safe copy on your device.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/60 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white">Download Backup</h4>
              <p className="text-xs text-slate-400 mt-1">
                Save your current configuration to a timestamped .json file.
              </p>
            </div>
            <button
              onClick={onExport}
              className="mt-4 w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download JSON Backup</span>
            </button>
          </div>

          <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/60 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white">Upload & Restore</h4>
              <p className="text-xs text-slate-400 mt-1">
                Restore a previously exported backup file to immediately apply settings.
              </p>
            </div>
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs border border-slate-600 flex items-center justify-center gap-2 transition-all"
            >
              <Upload className="w-4 h-4 text-amber-400" />
              <span>Select Backup File to Restore</span>
            </button>
          </div>
        </div>

        {importMsg && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              importMsg.type === "success"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                : "bg-red-500/10 text-red-400 border border-red-500/30"
            }`}
          >
            {importMsg.text}
          </div>
        )}
      </div>

      {/* 2. CHANGE MASTER PASSWORD */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" />
            Change Admin Master Password
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Update your secret access key used to enter this CMS panel.
          </p>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Enter new password..."
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Re-enter new password..."
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
          </div>

          {passMsg && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                passMsg.type === "success"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : "bg-red-500/10 text-red-400 border border-red-500/30"
              }`}
            >
              {passMsg.text}
            </div>
          )}

          <button
            type="submit"
            className="py-2.5 px-5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl text-xs transition-all shadow-md shadow-amber-500/20"
          >
            Update Master Password
          </button>
        </form>
      </div>

      {/* 3. RESET TO FACTORY DEFAULTS */}
      <div className="bg-red-950/20 border border-red-900/40 rounded-3xl p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
          <AlertTriangle className="w-5 h-5" />
          <span>Danger Zone: Reset to Factory Defaults</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
          If you make a mistake or want to revert back to the original Hotel Sherpa Soul content and SEO settings, you can reset the entire CMS. This action cannot be undone unless you have a downloaded JSON backup.
        </p>
        <button
          type="button"
          onClick={handleResetConfirm}
          className="py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-red-600/20"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Data to Defaults</span>
        </button>
      </div>
    </div>
  );
}
