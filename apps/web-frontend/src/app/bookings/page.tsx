"use client";

import { CalendarCheck } from "lucide-react";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";
import { Button } from "@/components/ui/Button";
import { useBookings } from "@/features/profile/hooks";
import { useCancelBooking } from "@/features/social/hooks";

export default function BookingsPage() {
  const bookings = useBookings();
  const cancelBooking = useCancelBooking();
  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold text-[#111827]">My Bookings</h1>
        {bookings.isLoading && (
          <LoadingState message="Loading your bookings..." />
        )}
        {bookings.isError && (
          <ErrorState
            message="We could not load your bookings."
            onRetry={() => bookings.refetch()}
          />
        )}
        {bookings.data?.data.length === 0 && (
          <EmptyState
            icon={<CalendarCheck />}
            title="No bookings yet"
            description="Your service appointments will appear here."
          />
        )}
        <div className="space-y-4">
          {bookings.data?.data.map((booking) => (
            <article
              key={booking.id}
              className="rounded-xl border border-[#E5E7EB] bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[#111827]">
                    Service appointment
                  </p>
                  <p className="text-sm text-[#6B7280]">
                    {booking.date} at {booking.time}
                  </p>
                </div>
                <span className="rounded-full bg-[#E6F4F1] px-3 py-1 text-xs font-semibold text-[#0D6E6E]">
                  {booking.status}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[#E5E7EB] pt-4 text-sm">
                <span>{booking.durationMinutes} minutes</span>
                <span className="font-bold text-[#111827]">
                  LKR {booking.totalAmount.toLocaleString()}
                </span>
              </div>
              {booking.status === "PENDING" && (
                <Button
                  className="mt-4"
                  size="sm"
                  variant="outline"
                  onClick={() => cancelBooking.mutate(booking.id)}
                  disabled={cancelBooking.isPending}
                >
                  Cancel booking
                </Button>
              )}
            </article>
          ))}
        </div>
      </main>
    </ProtectedRoute>
  );
}
