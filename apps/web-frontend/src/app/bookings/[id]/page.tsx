"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ErrorState, LoadingState } from "@/components/ui/States";
import { bookingRepository } from "@/repositories";

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const booking = useQuery({
    queryKey: ["booking", id],
    queryFn: () => bookingRepository.getBookingById(id),
  });
  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {booking.isLoading && <LoadingState message="Loading booking..." />}
        {booking.isError && (
          <ErrorState
            message="We could not load this booking."
            onRetry={() => booking.refetch()}
          />
        )}
        {booking.data && (
          <>
            <h1 className="mb-6 text-2xl font-bold text-[#111827]">
              Booking {booking.data.id.slice(0, 8)}
            </h1>
            <section className="space-y-4 rounded-xl border border-[#E5E7EB] bg-white p-5">
              <div className="flex justify-between">
                <span>Status</span>
                <strong className="text-[#0D6E6E]">
                  {booking.data.status}
                </strong>
              </div>
              <div className="flex justify-between text-sm">
                <span>Date</span>
                <span>{booking.data.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Time</span>
                <span>{booking.data.time}</span>
              </div>
              <div className="flex justify-between border-t border-[#E5E7EB] pt-4 font-bold">
                <span>Total</span>
                <span>LKR {booking.data.totalAmount.toLocaleString()}</span>
              </div>
            </section>
          </>
        )}
      </main>
    </ProtectedRoute>
  );
}
