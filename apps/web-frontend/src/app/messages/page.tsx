"use client";

import Link from "next/link";
import { MessageCircle, Search } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { Input } from "@/components/ui/Input";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";
import { useConversations } from "@/features/social/hooks";

export default function MessagesPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  const conversations = useConversations();

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
        {conversations.isLoading ? (
          <LoadingState message="Loading messages..." />
        ) : conversations.isError ? (
          <ErrorState
            message="We could not load your messages."
            onRetry={() => conversations.refetch()}
          />
        ) : conversations.data?.length === 0 ? (
          <EmptyState
            icon={<MessageCircle />}
            title="No messages yet"
            description="When you contact a business, messages will appear here."
          />
        ) : (
          <ul className="divide-y divide-[#E5E7EB]">
            {conversations.data?.map((chat) => (
              <li key={chat.id}>
                <Link
                  href={`/messages/${chat.id}`}
                  className="block hover:bg-[#F7F8FA] transition-colors p-4 sm:p-6"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-[#0D6E6E]/10 flex items-center justify-center text-[#0D6E6E] font-bold text-lg">
                        {(chat.businessName || "Business").charAt(0)}
                      </div>
                      <div>
                        <h4
                          className={`text-base font-semibold ${chat.unreadCount ? "text-[#111827]" : "text-[#374151]"}`}
                        >
                          {chat.businessName || "Business"}
                        </h4>
                        <p
                          className={`text-sm mt-0.5 line-clamp-1 ${chat.unread ? "font-medium text-[#111827]" : "text-[#6B7280]"}`}
                        >
                          {chat.lastMessage?.content || "No messages yet"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-[#6B7280]">
                        {new Date(chat.updatedAt).toLocaleDateString()}
                      </span>
                      {chat.unreadCount > 0 && (
                        <span className="h-5 w-5 rounded-full bg-[#0D6E6E] text-white text-[10px] font-bold flex items-center justify-center">
                          {chat.unreadCount}
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
