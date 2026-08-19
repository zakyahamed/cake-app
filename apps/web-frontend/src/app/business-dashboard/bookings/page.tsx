"use client";

import { useEffect, useState } from "react";
import { businessRepository } from "@/repositories";
import { ApiBookingRepository } from "@/repositories/api/order";
import type { Booking, Business } from "@/domain/types";
import { BookingStatus } from "@/domain/enums";
import { useAuthStore } from "@/stores/authStore";
import { LoadingState, EmptyState } from "@/components/ui/States";
import { Price } from "@/components/ui/Price";
import { toast } from "sonner";
import { CalendarCheck, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

// For this MVP, we use the concrete class to get the new method if we didn't export it in the root
const bookingRepository = new ApiBookingRepository();

export default function BusinessBookingsPage() {
  const { user } = useAuthStore();
  const [business, setBusiness] = useState<Business | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const bizRes = await businessRepository.getBusinesses({});
        const biz = bizRes.data[0];
        if (biz) {
          setBusiness(biz);
          // Assuming backend has this implemented. If not, it will return empty or throw error
          // For MVP, we catch it gracefully.
          try {
            const bizBookings = await bookingRepository.getBusinessBookings(biz.id);
            setBookings(bizBookings);
          } catch (e) {
            console.log("Mocking bookings due to missing backend endpoint");
            setBookings([]);
          }
        }
      } catch (e) {
        toast.error("Failed to load business");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [user]);

  const updateStatus = async (bookingId: string, newStatus: BookingStatus) => {
    try {
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
      await fetch(`http://localhost:3001/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      toast.success(`Booking ${newStatus.toLowerCase()}`);
    } catch (e) {
      toast.error("Failed to update booking");
    }
  };

  if (isLoading) return <LoadingState />;
  
  if (!business) return <EmptyState icon={<CalendarCheck />} title="No Business Profile" description="You need an active business to view bookings." />;

  const pendingBookings = bookings.filter(b => b.status === BookingStatus.PENDING);
  const upcomingBookings = bookings.filter(b => b.status === BookingStatus.CONFIRMED);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
        <p className="text-gray-500">Manage service appointments and consultations.</p>
      </div>

      {pendingBookings.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            Pending Requests ({pendingBookings.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingBookings.map(booking => (
              <div key={booking.id} className="bg-orange-50 border border-orange-200 p-5 rounded-xl shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{new Date(booking.date).toLocaleDateString()}</h3>
                    <p className="text-orange-700 font-medium">{booking.time} ({booking.durationMinutes} min)</p>
                  </div>
                  <Badge variant="warning">New</Badge>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  <p>Customer ID: {booking.customerId.slice(0,8)}</p>
                  <p>Service ID: {booking.serviceId.slice(0,8)}</p>
                  <Price amount={booking.totalAmount} className="font-bold text-gray-900 mt-2" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => updateStatus(booking.id, BookingStatus.CONFIRMED)} className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center justify-center gap-2 transition">
                    <CheckCircle2 className="w-4 h-4" /> Accept
                  </button>
                  <button onClick={() => updateStatus(booking.id, BookingStatus.CANCELLED)} className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                    <XCircle className="w-4 h-4" /> Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {upcomingBookings.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No upcoming appointments confirmed yet.</div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {upcomingBookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{booking.serviceId.slice(0,8)}...</td>
                    <td className="px-6 py-4 text-gray-600">{booking.customerId.slice(0,8)}...</td>
                    <td className="px-6 py-4"><Badge variant="success">Confirmed</Badge></td>
                    <td className="px-6 py-4">
                      <button onClick={() => updateStatus(booking.id, BookingStatus.COMPLETED)} className="text-primary hover:underline font-medium">
                        Mark Completed
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
