"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LoadingState, ErrorState } from "@/components/ui/States";
import { messageRepository } from "@/repositories";
import { useAuthStore } from "@/stores/authStore";

export default function MessageThreadPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const messages = useQuery({
    queryKey: ["messages", params.id],
    queryFn: () => messageRepository.getMessages(params.id),
  });
  const sendMessage = useMutation({
    mutationFn: (content: string) =>
      messageRepository.sendMessage(params.id, content),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["messages", params.id] }),
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sendMessage.mutate(message);
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
          B
        </div>
        <div>
          <h2 className="font-bold text-[#111827]">Business conversation</h2>
          <p className="text-xs text-[#6B7280]">Conversation</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F7F8FA]">
        {messages.isLoading && (
          <LoadingState message="Loading conversation..." />
        )}
        {messages.isError && (
          <ErrorState
            message="We could not load this conversation."
            onRetry={() => messages.refetch()}
          />
        )}
        {messages.data?.map((msg) => {
          const isUser = msg.senderId === user?.id;
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  isUser
                    ? "bg-[#0D6E6E] text-white rounded-br-sm"
                    : "bg-white border border-[#E5E7EB] text-[#111827] rounded-bl-sm"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
              <span className="text-xs text-[#9CA3AF] mt-1 mx-1">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
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
          <Button
            type="submit"
            className="h-12 px-6 shrink-0 rounded-xl"
            disabled={!message.trim() || sendMessage.isPending}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
