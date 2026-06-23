import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  Bot,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HotelChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "🏨 Welcome to Hotel Sherpa Soul! I'm your virtual assistant. How may I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const options = [
    {
      id: "rooms",
      text: "🛏️ Room Types & Pricing",
      icon: "🛏️",
      response:
        "We offer several room types:\n\n🏨 **Standard Room** - $150/night\n• Perfect for solo travelers or couples\n• Free Wi-Fi & hot shower\n\n🏨 **Deluxe Room** - $200/night\n• Spacious with city view\n• Air conditioning & mini-fridge\n\n🏨 **Family Suite** - $350/night\n• Ideal for families\n• Separate living area\n\nAll rooms include complimentary breakfast! 🍳",
    },
    {
      id: "facilities",
      text: "🏢 Hotel Facilities",
      icon: "🏢",
      response:
        "Our hotel offers amazing facilities:\n\n🍽️ **Rooftop Restaurant**\n• Panoramic city views\n• Traditional & international cuisine\n\n🏨 **24/7 Reception**\n• Always here to help\n• Tourist information available\n\n📶 **Free Wi-Fi**\n• High-speed internet throughout\n\n🚗 **Airport Transfer**\n• Complimentary pickup service\n\n🗺️ **Guided Tours**\n• Explore Kathmandu with local guides",
    },
    {
      id: "location",
      text: "📍 Location & Nearby",
      icon: "📍",
      response:
        "📍 **Prime Location in Thamel**\n\nWe're situated in the heart of Kathmandu's tourist district:\n\n🚶 **Walking Distance:**\n• Durbar Square - 10 minutes\n• Garden of Dreams - 5 minutes\n• Local markets & shops\n\n🏛️ **Nearby Attractions:**\n• Swayambhunath Temple\n• Boudhanath Stupa\n• Pashupatinath Temple\n\nPerfect base for exploring Nepal! 🇳🇵",
    },
    {
      id: "booking",
      text: "📅 Make a Reservation",
      icon: "📅",
      response:
        "Ready to book your stay? Here are your options:\n\n📞 **Call us directly:**\n+977-9851068219\n\n📧 **Email reservation:**\nmingmasaino@gmail.com\n\n💻 **Online booking:**\nVisit our website for instant confirmation\n\n🏨 **Walk-in:**\nWe welcome walk-in guests (subject to availability)\n\n✨ Book now and get 10% off for stays over 3 nights!",
    },
    {
      id: "contact",
      text: "📞 Contact Information",
      icon: "📞",
      response:
        "📞 **Phone:** +977-9851068219\n📧 **Email:** mingmasaino@gmail.com\n📍 **Address:** Hotel Sherpa Soul, Thamel, Kathmandu, Nepal\n\n🕐 **Reception Hours:** 24/7\n🌐 **Languages:** English, Nepali, Hindi\n\n💬 **Need immediate help?** Our reception is always available!",
    },
  ];

  const quickReplies = [
    "Check availability",
    "Airport pickup",
    "Restaurant hours",
    "Wi-Fi password",
    "Tourist info",
  ];

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing animation
  const simulateTyping = async (response) => {
    setIsTyping(true);
    setShowOptions(false);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "bot",
        text: response,
        timestamp: new Date(),
      },
    ]);

    setIsTyping(false);
    setShowOptions(true);
  };

  const handleOption = async (option) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: option.text,
        timestamp: new Date(),
      },
    ]);

    // Simulate bot response
    await simulateTyping(option.response);
  };

  const handleCustomMessage = async (e) => {
    e.preventDefault();
    if (!customMessage.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: customMessage,
        timestamp: new Date(),
      },
    ]);

    setCustomMessage("");

    // Simple auto-responses based on keywords
    let response =
      "Thank you for your message! For personalized assistance, please call us at +977-9851068219 or use the quick options above. Our team is always ready to help! 😊";

    const msg = customMessage.toLowerCase();
    if (msg.includes("price") || msg.includes("cost") || msg.includes("rate")) {
      response =
        "💰 Our room rates start from $150/night for Standard rooms. Would you like to see all our room types and pricing? Please select 'Room Types & Pricing' above!";
    } else if (msg.includes("book") || msg.includes("reservation")) {
      response =
        "📅 I'd love to help you book! Please call +977-9851068219 or email mingmasaino@gmail.com for reservations. You can also select 'Make a Reservation' above for all booking options!";
    } else if (msg.includes("location") || msg.includes("address")) {
      response =
        "📍 We're located in Thamel, the heart of Kathmandu! Perfect for exploring the city. Select 'Location & Nearby' above for detailed information about our location and nearby attractions.";
    }

    await simulateTyping(response);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle unread messages when chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === "bot") {
        setUnreadCount((prev) => prev + 1);
      }
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="bg-gradient-to-br from-[#AB8865] to-[#8B6B47] text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MessageCircle size={24} />

              {/* Unread Badge */}
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
                >
                  {unreadCount}
                </motion.div>
              )}

              {/* Pulse Animation */}
              <div className="absolute inset-0 rounded-full bg-[#AB8865] animate-ping opacity-20"></div>
            </motion.button>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Need help? Chat with us!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white shadow-2xl rounded-2xl w-80 sm:w-96 h-[500px] flex flex-col border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#AB8865] to-[#8B6B47] text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">
                    Sherpa Soul Assistant
                  </h2>
                  <div className="flex items-center space-x-1 text-sm opacity-90">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Online now</span>
                  </div>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-end space-x-2 ${
                      msg.sender === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                        msg.sender === "bot" ? "bg-[#AB8865]" : "bg-blue-500"
                      }`}
                    >
                      {msg.sender === "bot" ? (
                        <Bot size={16} />
                      ) : (
                        <User size={16} />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${
                        msg.sender === "bot"
                          ? "bg-white text-gray-800 rounded-bl-sm border border-gray-200"
                          : "bg-[#AB8865] text-white rounded-br-sm"
                      }`}
                    >
                      <div className="text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.text}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          msg.sender === "bot"
                            ? "text-gray-500"
                            : "text-white/70"
                        }`}
                      >
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-end space-x-2"
                  >
                    <div className="w-8 h-8 bg-[#AB8865] rounded-full flex items-center justify-center text-white">
                      <Bot size={16} />
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-bl-sm border border-gray-200 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <AnimatePresence>
              {showOptions && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 py-2 border-t border-gray-200"
                >
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.slice(0, 3).map((reply, index) => (
                      <motion.button
                        key={reply}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-[#AB8865] hover:text-white transition-colors duration-200"
                        onClick={() =>
                          handleOption({
                            id: `quick-${index}`,
                            text: reply,
                            response: `Thank you for asking about "${reply}". Please call us at +977-9851068219 for immediate assistance, or select a detailed option below! 😊`,
                          })
                        }
                      >
                        {reply}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Options & Input */}
            <div className="border-t border-gray-200 bg-white">
              {/* Options */}
              <AnimatePresence>
                {showOptions && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 border-b border-gray-100 max-h-48 overflow-y-auto"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        How can I help you?
                      </span>
                      <ChevronDown size={16} className="text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      {options.map((option, index) => (
                        <motion.button
                          key={option.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleOption(option)}
                          className="w-full text-left text-sm py-2 px-3 border border-gray-200 rounded-lg hover:bg-[#AB8865] hover:text-white hover:border-[#AB8865] transition-all duration-200 group"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="group-hover:scale-110 transition-transform">
                              {option.icon}
                            </span>
                            <span>
                              {option.text.replace(/🛏️|🏢|📍|📅|📞/, "").trim()}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input */}
              <form onSubmit={handleCustomMessage} className="p-3">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AB8865] focus:border-transparent"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!customMessage.trim()}
                    className="bg-[#AB8865] text-white p-2 rounded-full hover:bg-[#8B6B47] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
