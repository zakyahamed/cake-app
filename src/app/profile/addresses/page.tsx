import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "My Addresses", description: "Manage your saved delivery addresses." };
export default function AddressesPage() {
  return <ProtectedRoute><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8"><h1 className="text-2xl font-bold text-[#111827] mb-2">My Addresses</h1><p className="text-[#6B7280]">Address management coming in Phase 8.</p></div></ProtectedRoute>;
}
