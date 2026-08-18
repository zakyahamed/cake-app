"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function MessageThreadPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, I would like to customize the design for the cake.", sender: "user", time: "10:00 AM" },
    { id: 2, text: "Hello! Sure, please let me know what you have in mind.", sender: "business", time: "10:15 AM" },
    { id: 3, text: "Can you do a floral pattern with blue icing?", sender: "user", time: "10:20 AM" },
    { id: 4, text: "Yes, I can do that design!", sender: "business", time: "10:30 AM" },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages([...messages, {
      id: Date.now(),
      text: message,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setMessage("");
  };

  return (
    <div className="max-w-3xl mx-auto min-h-[calc(100vh-64px)] flex flex-col bg-white border-x border-[#E5E7EB]">
      {/* Chat Header */}
      <div className="h-16 border-b border-[#E5E7EB] flex items-center px-4 shrink-0 bg-white sticky top-16 z-10">
        <button 
          onClick={() => router.back()}
          className="p-2 mr-2 rounded-lg text-[#6B7280] hover:bg-[#F7F8FA] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="h-10 w-10 rounded-full bg-[#0D6E6E]/10 flex items-center justify-center text-[#0D6E6E] font-bold mr-3">
          N
        </div>
        <div>
          <h2 className="font-bold text-[#111827]">Nuha Henna Art</h2>
          <p className="text-xs text-green-600">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F7F8FA]">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                isUser 
                  ? 'bg-[#0D6E6E] text-white rounded-br-sm' 
                  : 'bg-white border border-[#E5E7EB] text-[#111827] rounded-bl-sm'
              }`}>
                <p className="text-sm">{msg.text}</p>
              </div>
              <span className="text-xs text-[#9CA3AF] mt-1 mx-1">{msg.time}</span>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-[#E5E7EB]">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 h-12 px-4 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6E6E]"
          />
          <Button type="submit" className="h-12 px-6 shrink-0 rounded-xl" disabled={!message.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
