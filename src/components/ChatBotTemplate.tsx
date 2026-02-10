"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Loader2, User } from "lucide-react";

export default function ChatBotTemplate() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([
    {
      sender: "bot",
      text: "Hi! I'm your document assistant 🤖 — ask me anything from the uploaded files!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 💡 Backend API endpoint - Base URL
  const API_BASE_URL = "https://chat-bot-pgt8.onrender.com";

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });

      if (!response.ok) throw new Error("Network error");

      const data = await response.json();
      const botReply =
        data.answer ||
        "Sorry, I couldn’t find relevant info in the uploaded files.";

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to the chatbot server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-8 z-50 w-14 h-14 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-8 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-4 py-3 font-semibold flex justify-between items-center">
              Smart Chatbot
              <button onClick={toggleChat}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm text-gray-800">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <Bot className="h-5 w-5 text-indigo-500" />
                  )}
                  <div
                    className={`p-2 rounded-lg max-w-[80%] ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === "user" && (
                    <User className="h-5 w-5 text-blue-500" />
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {loading && (
                <div className="flex items-center gap-2 text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Bot is thinking...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-3 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask something..."
                className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="text-white rounded-full p-2 transition cursor-pointer disabled:opacity-50"
              >
                <Send className="h-6 w-6 text-blue-600 hover:text-blue-400" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
