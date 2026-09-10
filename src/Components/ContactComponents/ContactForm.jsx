import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  Users,
  Star,
  Heart,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import React, { useState } from "react";
import GetInTouch from "./GetInTouch";
import { useTranslation } from "react-i18next";
import { trackMetaEvent } from "../Analytics/pixelEvents";
import { sendEmailNotification } from "../Utils/emailService";

export default function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle | success | error
  const [statusMessage, setStatusMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const data = await sendEmailNotification({
        type: "contact",
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        message: formData.message,
      });

      if (data && data.success) {
        setSubmitStatus("success");
        setStatusMessage(
          "Thank you! Your message has been sent to info@hotelsherpasoul.com. A confirmation copy has been sent to your email."
        );
        trackMetaEvent("Contact", { contact_method: "official_email" });
        trackMetaEvent("Lead", {
          content_name: "Website Contact Form",
          method: "official_email",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error(data?.error || "Failed to deliver message");
      }
    } catch (error) {
      console.warn("Contact form email fallback to WhatsApp:", error);
      setSubmitStatus("error");
      setStatusMessage(
        "Could not send email directly. You can message us directly on WhatsApp for instant assistance!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

        {/* Soft mountain tints */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full filter blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Message */}
            <div className="text-slate-900">
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#FB6C01] text-xs font-semibold tracking-wide uppercase mb-4">
                  <span>❖</span> Front Desk & Inquiries
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-[#01366E]">
                  {t("contact.title")}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {t("contact.subtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#01366E] to-[#154D85] rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">
                        {t("contact.card.quick.title")}
                      </h4>
                      <p className="text-slate-600 text-sm">
                        {t("contact.card.quick.des")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#FB6C01] to-[#E05A00] rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
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
              <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
                <div className="bg-[#01366E] p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <Send className="w-6 h-6 mr-3 text-[#FB6C01]" />
                      {t("contact.form.title")}
                    </h3>
                    <p className="text-slate-200 mt-2 text-base">
                      {t("contact.form.desc")}
                    </p>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="group">
                    <label className="block text-sm font-bold text-slate-700 mb-3 transition-colors group-focus-within:text-[#01366E]">
                      {t("contact.form.data.name")} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border-2 border-slate-200 rounded-xl p-4 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FB6C01] focus:bg-white transition-all duration-300"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-bold text-slate-700 mb-3 transition-colors group-focus-within:text-[#01366E]">
                      {t("contact.form.data.email")} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border-2 border-slate-200 rounded-xl p-4 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FB6C01] focus:bg-white transition-all duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-bold text-slate-700 mb-3 transition-colors group-focus-within:text-[#01366E]">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border-2 border-slate-200 rounded-xl p-4 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FB6C01] focus:bg-white transition-all duration-300"
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-bold text-slate-700 mb-3 transition-colors group-focus-within:text-[#01366E]">
                      {t("contact.form.data.msg")} *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className="w-full border-2 border-slate-200 rounded-xl p-4 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FB6C01] focus:bg-white resize-none transition-all duration-300"
                      placeholder="Tell us about your inquiry, booking dates, or request..."
                      required
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-800">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-semibold">{statusMessage}</p>
                        <p className="mt-1 text-emerald-700 text-xs">
                          Need instant assistance? You can also reach our 24/7 Front Desk on WhatsApp:{" "}
                          <a
                            href="https://wa.me/9779851068219"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold underline text-emerald-900"
                          >
                            +977-9851068219
                          </a>
                        </p>
                      </div>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-800">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-semibold">{statusMessage}</p>
                        <a
                          href="https://wa.me/9779851068219?text=Hello%20Hotel%20Sherpa%20Soul"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                        >
                          Chat on WhatsApp
                        </a>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="group w-full bg-[#FB6C01] hover:bg-[#E05A00] text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        {t("contact.form.send2")}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        {t("contact.form.send")}
                      </>
                    )}
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
