"use client";

import Link from "next/link";
import { MessageCircle, Search } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { Input } from "@/components/ui/Input";

export default function MessagesPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  const conversations = [
    { id: "1", name: "Nuha Henna Art", lastMessage: "Yes, I can do that design!", time: "10:30 AM", unread: 1 },
    { id: "2", name: "Silva Associates", lastMessage: "See you tomorrow at 2 PM.", time: "Yesterday", unread: 0 },
    { id: "3", name: "Sweet Treats Bakery", lastMessage: "Your order is ready for pickup.", time: "Monday", unread: 0 },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#111827]">Messages</h1>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input placeholder="Search messages..." className="pl-10" />
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
        {conversations.length === 0 ? (
          <div className="p-12 text-center">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#111827]">No messages yet</h3>
            <p className="text-[#6B7280]">When you contact a business, messages will appear here.</p>
          </div>
        ) : (
          <ul className="divide-y divide-[#E5E7EB]">
            {conversations.map((chat) => (
              <li key={chat.id}>
                <Link href={`/messages/${chat.id}`} className="block hover:bg-[#F7F8FA] transition-colors p-4 sm:p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-[#0D6E6E]/10 flex items-center justify-center text-[#0D6E6E] font-bold text-lg">
                        {chat.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className={`text-base font-semibold ${chat.unread ? 'text-[#111827]' : 'text-[#374151]'}`}>
                          {chat.name}
                        </h4>
                        <p className={`text-sm mt-0.5 line-clamp-1 ${chat.unread ? 'font-medium text-[#111827]' : 'text-[#6B7280]'}`}>
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-[#6B7280]">{chat.time}</span>
                      {chat.unread > 0 && (
                        <span className="h-5 w-5 rounded-full bg-[#0D6E6E] text-white text-[10px] font-bold flex items-center justify-center">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
