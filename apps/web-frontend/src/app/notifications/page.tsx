import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Notifications", description: "Stay updated with your orders, bookings, and messages." };
export default function NotificationsPage() {
  return <ProtectedRoute><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8"><h1 className="text-2xl font-bold text-[#111827] mb-2">Notifications</h1><p className="text-[#6B7280]">Notifications coming in Phase 7.</p></div></ProtectedRoute>;
}
