"use client";

import { Bell } from "lucide-react";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";
import { Button } from "@/components/ui/Button";
import { useNotifications } from "@/features/social/hooks";

export default function NotificationsPage() {
  const notifications = useNotifications();
  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-[#111827]">Notifications</h1>
          <Button
            size="sm"
            variant="outline"
            onClick={() => notifications.markAllRead.mutate()}
            disabled={notifications.markAllRead.isPending}
          >
            Mark all read
          </Button>
        </div>
        {notifications.isLoading && (
          <LoadingState message="Loading notifications..." />
        )}
        {notifications.isError && (
          <ErrorState
            message="We could not load your notifications."
            onRetry={() => notifications.refetch()}
          />
        )}
        {notifications.data?.length === 0 && (
          <EmptyState
            icon={<Bell />}
            title="You are all caught up"
            description="New updates will appear here."
          />
        )}
        <div className="divide-y divide-[#E5E7EB] rounded-xl border border-[#E5E7EB] bg-white">
          {notifications.data?.map((notification) => (
            <button
              key={notification.id}
              className={`block w-full p-5 text-left ${notification.isRead ? "" : "bg-[#E6F4F1]/50"}`}
              onClick={() =>
                !notification.isRead &&
                notifications.markRead.mutate(notification.id)
              }
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-[#111827]">
                    {notification.title}
                  </p>
                  <p className="mt-1 text-sm text-[#6B7280]">
                    {notification.body}
                  </p>
                </div>
                <time className="shrink-0 text-xs text-[#9CA3AF]">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </time>
              </div>
            </button>
          ))}
        </div>
      </main>
    </ProtectedRoute>
  );
}
