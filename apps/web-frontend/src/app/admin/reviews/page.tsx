"use client";

import { MessageSquareWarning } from "lucide-react";

export default function AdminReviewsPage() {
  return (
    <div className="bg-gray-950 p-8 rounded-xl border border-gray-800 flex flex-col items-center justify-center min-h-[500px]">
      <MessageSquareWarning className="w-16 h-16 text-gray-800 mb-4" />
      <h2 className="text-2xl font-bold text-gray-200">Content Moderation</h2>
      <p className="text-gray-500 mt-2 max-w-md text-center">
        A feed of all platform reviews and messages requiring moderation or deletion will go here.
      </p>
    </div>
  );
}
