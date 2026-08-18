"use client";

import { useBookings } from "@/features/profile/hooks";
import { LoadingState, EmptyState } from "@/components/ui/States";
import { Calendar, Clock, CheckCircle2, XCircle } from "lucide-react";
import type { BookingStatus } from "@/domain/enums";

const statusConfig: Record<BookingStatus, { color: string; bg: string; icon: React.ElementType }> = {
  PENDING: { color: "text-orange-600", bg: "bg-orange-50", icon: Clock },
  CONFIRMED: { color: "text-blue-600", bg: "bg-blue-50", icon: CheckCircle2 },
  COMPLETED: { color: "text-green-600", bg: "bg-green-50", icon: CheckCircle2 },
  CANCELLED: { color: "text-red-600", bg: "bg-red-50", icon: XCircle },
  REJECTED: { color: "text-red-600", bg: "bg-red-50", icon: XCircle },
};

export default function BookingsPage() {
  const { data: bookingsResult, isLoading } = useBookings();

  if (isLoading) return <LoadingState message="Loading your bookings..." className="py-20" />;

  const bookings = bookingsResult?.data || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#111827]">Appointments</h1>
      
      {bookings.length === 0 ? (
        <EmptyState
          title="No bookings yet"
          description="When you schedule an appointment, it will appear here."
          icon={<Calendar className="h-10 w-10 text-gray-400" />}
        />
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const config = statusConfig[booking.status];
            const Icon = config.icon;
            
            return (
              <div key={booking.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-[#111827]">{booking.id}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                        <Icon className="h-3 w-3 mr-1" />
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#6B7280]">
                      Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#111827]">LKR {booking.totalAmount.toLocaleString()}</p>
                    <p className="text-sm text-[#6B7280]">{booking.durationMinutes} mins</p>
                  </div>
                </div>

                <div className="bg-[#F7F8FA] rounded-xl p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="flex items-center font-medium text-[#111827]">
                    <Calendar className="h-5 w-5 mr-2 text-[#0D6E6E]" />
                    {booking.date}
                  </div>
                  <div className="flex items-center font-medium text-[#111827]">
                    <Clock className="h-5 w-5 mr-2 text-[#0D6E6E]" />
                    {booking.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
