import { Heart, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { trackMetaEvent } from "../Analytics/pixelEvents";

// Simple toast notification component
const Toast = ({ message, show, onClose }) => {
  React.useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        {message}
      </div>
    </div>
  );
};

export default function GetInTouch() {
  const { t } = useTranslation();

  const [toastVisible, setToastVisible] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const handlePhoneClick = async () => {
    try {
      await navigator.clipboard.writeText("+977 9851068219");
      showToast(t("getInTouch.phoneCopied"));
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = "+977-9851068219";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showToast(t("getInTouch.phoneCopied"));
    }
  };

  const handleEmailClick = () => {
    trackMetaEvent("Contact", { contact_method: "email" });
    window.open("mailto:info@hotelsherpasoul.com", "_blank");
  };

  const handleMapClick = () => {
    window.open("https://maps.app.goo.gl/nDB9DnLtb6taeaLRA", "_blank");
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t("getInTouch.callWhatsApp"),
      detail: "+977-9851068219",
      description: t("getInTouch.whatsappDescription"),
      gradient: "from-emerald-400 to-teal-500",
      onClick: handlePhoneClick,
    },
    {
      icon: Mail,
      title: t("getInTouch.emailUs"),
      detail: "info@hotelsherpasoul.com",
      description: t("getInTouch.emailResponseTime"),
      gradient: "from-violet-400 to-purple-500",
      onClick: handleEmailClick,
    },
    {
      icon: MapPin,
      title: t("getInTouch.visitUs"),
      detail: "Thamel, Kathmandu, Nepal",
      description: t("getInTouch.visitDescription"),
      gradient: "from-orange-400 to-red-500",
      onClick: handleMapClick,
    },
  ];

  return (
    <div>
      <Toast
        message={toastMessage}
        show={toastVisible}
        onClose={() => setToastVisible(false)}
      />

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("getInTouch.getIn")}{" "}
              <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                {t("getInTouch.touch")}
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t("getInTouch.readyDescription")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                onClick={info.onClick}
                className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer border border-gray-100"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${info.gradient} rounded-xl flex items-center justify-center mb-4 shadow-md`}
                >
                  <info.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {info.title}
                </h3>
                <p className="text-base font-semibold text-slate-700 mb-2">
                  {info.detail}
                </p>
                <p className="text-sm text-slate-500">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
