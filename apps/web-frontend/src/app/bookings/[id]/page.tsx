import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Booking Details", description: "View booking status and details." };
export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProtectedRoute><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8"><h1 className="text-2xl font-bold text-[#111827] mb-2">Booking {id}</h1><p className="text-[#6B7280]">Booking detail coming in Phase 6.</p></div></ProtectedRoute>;
}
