"use client";

import Link from "next/link";
import { Package, Calendar, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useOrders, useBookings } from "@/features/profile/hooks";

export default function ProfileOverviewPage() {
  const { user } = useAuthStore();
  const { data: ordersResult } = useOrders();
  const { data: bookingsResult } = useBookings();

  if (!user) return null;

  const activeOrders = ordersResult?.data.filter(o => !["COMPLETED", "CANCELLED", "REJECTED"].includes(o.status)) || [];
  const upcomingBookings = bookingsResult?.data.filter(b => b.status === "CONFIRMED") || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#111827]">Welcome back, {user.name.split(" ")[0]}!</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Active Orders Card */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-blue-50 p-3 rounded-xl">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <Link href="/profile/orders" className="text-sm font-semibold text-[#0D6E6E] hover:underline flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <h2 className="text-lg font-bold text-[#111827] mb-1">Active Orders</h2>
          <p className="text-[#6B7280] text-sm">
            {activeOrders.length} order{activeOrders.length !== 1 ? 's' : ''} currently in progress
          </p>
        </div>

        {/* Upcoming Bookings Card */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-purple-50 p-3 rounded-xl">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <Link href="/profile/bookings" className="text-sm font-semibold text-[#0D6E6E] hover:underline flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <h2 className="text-lg font-bold text-[#111827] mb-1">Upcoming Appointments</h2>
          <p className="text-[#6B7280] text-sm">
            {upcomingBookings.length} confirmed booking{upcomingBookings.length !== 1 ? 's' : ''}
          </p>
        </div>

      </div>
    </div>
  );
}
