import React, { useState } from "react";
import { Lock, ShieldCheck, KeyRound, ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";

export default function CMSAuthModal({ onLogin }) {
  const [password, setPassword] = useState("");
  const [twoFactorPin, setTwoFactorPin] = useState("");
  const [step, setStep] = useState("password"); // "password" | "2fa"
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === "password") {
      if (!password.trim()) {
        setError("Please enter the master admin password.");
        return;
      }
      setIsLoading(true);
      setError("");

      setTimeout(() => {
        const res = onLogin(password);
        if (res.requires2FA) {
          setStep("2fa");
          setIsLoading(false);
          return;
        }
        if (!res.success) {
          setError(res.message || "Invalid password.");
        }
        setIsLoading(false);
      }, 350);
    } else {
      if (!twoFactorPin.trim()) {
        setError("Please enter your 4-6 digit 2FA security PIN.");
        return;
      }
      setIsLoading(true);
      setError("");

      setTimeout(() => {
        const res = onLogin(password, twoFactorPin);
        if (!res.success) {
          setError(res.message || "Invalid 2FA security PIN.");
        }
        setIsLoading(false);
      }, 350);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 flex items-center justify-center p-4">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 shadow-2xl rounded-3xl p-8 md:p-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 mb-5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Hotel Sherpa Soul CMS
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {step === "password" ? "Admin Authentication" : "Two-Factor Verification (2FA)"}
          </h1>
          <p className="text-sm text-slate-300 mt-2">
            {step === "password"
              ? "Enter your master administrative password to manage website content & SEO."
              : "Enter your 2FA Security PIN to confirm your identity."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {step === "password" ? (
            <div>
              <label htmlFor="cms-master-password" className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                Master Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="cms-master-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter admin password..."
                  className="w-full pl-11 pr-12 py-3.5 min-h-[48px] bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label htmlFor="cms-2fa-pin" className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                2FA Security PIN <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-5 h-5 text-amber-400" />
                </div>
                <input
                  type="password"
                  id="cms-2fa-pin"
                  maxLength={6}
                  value={twoFactorPin}
                  onChange={(e) => {
                    setTwoFactorPin(e.target.value);
                    setError("");
                  }}
                  placeholder="e.g. 8219"
                  className="w-full pl-11 pr-4 py-3.5 min-h-[48px] bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-base tracking-widest text-center font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  autoFocus
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Default 2FA PIN: <code className="text-amber-300 font-mono bg-amber-500/20 px-1.5 py-0.5 rounded">8219</code> (hotel phone suffix)
              </p>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-500/15 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2 animate-fadeIn">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 min-h-[48px] bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-semibold rounded-xl text-base shadow-lg shadow-amber-600/25 transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{step === "password" ? "Continue to 2FA" : "Verify & Access CMS"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>

            {step === "2fa" && (
              <button
                type="button"
                onClick={() => {
                  setStep("password");
                  setError("");
                }}
                className="w-full py-2.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                &larr; Back to Password
              </button>
            )}
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-400">
            Initial Master Key: <code className="text-amber-300 font-mono bg-amber-500/10 px-2 py-0.5 rounded">sherpasoul2026</code>
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Strong password policy and 2FA can be reconfigured in CMS Settings.
          </p>
        </div>
      </div>
    </div>
  );
}
      </div>
    </div>
  );
}
