import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  Users,
  Star,
  Heart,
} from "lucide-react";
import React, { useState } from "react";
import GetInTouch from "./GetInTouch";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    const whatsappNumber = "9851068219";
    const whatsappURL = `https://wa.me/977${whatsappNumber}?text=Hello%20Hotel%20Sherpa%20Soul!%0AName:%20${encodeURIComponent(
      formData.name
    )}%0AEmail:%20${encodeURIComponent(
      formData.email
    )}%0AMessage:%20${encodeURIComponent(formData.message)}`;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappURL, "_blank");
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  const name = t("contact.form.data.name2");
  const mail = t("contact.form.data.email2");
  const msg = t("contact.form.data.msg2");

  return (
    <div>
      {/* Contact Info Section */}
      <GetInTouch />
      {/* Contact Form Section with Background Image */}
      <section
        className="py-24 px-6 relative overflow-hidden min-h-screen flex items-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Light overlay */}
        <div className="absolute inset-0 bg-wh/80 backdrop-blur-sm"></div>

        {/* Floating shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-pink-400/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Message */}
            <div className="text-white">
              <div className="mb-10">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  {t("contact.title")}
                </h2>
                <p className="text-xl text-white leading-relaxed mb-10">
                  {t("contact.subtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">
                        {t("contact.card.res.title")}
                      </h4>
                      <p className="text-slate-600 text-sm">
                        {t("contact.card.res.des")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">
                        {t("contact.card.per.title")}
                      </h4>
                      <p className="text-slate-600 text-sm">
                        {t("contact.card.per.des")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="relative">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 overflow-hidden">
                <div className="bg-[#AB8865] p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <Send className="w-7 h-7 mr-3" />
                      {t("contact.form.title")}
                    </h3>
                    <p className="text-white/90 mt-3 text-lg">
                      {t("contact.form.desc")}
                    </p>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="group">
                    <label className="block text-sm font-bold text-slate-700 mb-3 transition-colors group-focus-within:text-[#AB8865]">
                      {t("contact.form.data.name")} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border-2 border-slate-200 rounded-xl p-4 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#AB8865] focus:bg-white transition-all duration-300"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-bold text-slate-700 mb-3 transition-colors group-focus-within:text-[#AB8865]">
                      {t("contact.form.data.email")}s *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border-2 border-slate-200 rounded-xl p-4 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#AB8865] focus:bg-white transition-all duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-bold text-slate-700 mb-3 transition-colors group-focus-within:text-[#AB8865]">
                      {t("contact.form.data.msg")} *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className="w-full border-2 border-slate-200 rounded-xl p-4 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#AB8865] focus:bg-white resize-none transition-all duration-300"
                      placeholder="Tell us about your inquiry or request..."
                      required
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="group w-full bg-[#AB8865] text-white py-4 px-8 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          {t("contact.form.send2")}
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                          {t("contact.form.send")}
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
