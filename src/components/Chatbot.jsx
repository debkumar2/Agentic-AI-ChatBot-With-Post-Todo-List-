import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi 👋 How can I help you today?", sender: "bot" },
    { id: 2, text: "I want to learn React", sender: "user" },
    { id: 3, text: "Great choice! Ask me anything about React 🚀", sender: "bot" },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { id: Date.now(), text: input, sender: "user" },
    ]);

    setInput("");
  };

  return (
    <div className="min-h-[calc(100vh-62px)] bg-black text-white flex justify-center p-4">
      <div className="w-full max-w-2xl bg-zinc-900 rounded-2xl shadow-xl flex flex-col">
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h1 className="text-lg font-semibold">AI Chatbot</h1>
        </div>

        <div className="flex-1 overflow-y-auto max-h-[418px] p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-zinc-800 text-gray-200 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-white/10 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg bg-black/40 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSend}
            className="px-5 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chatbot;
