"use client";

import { Store } from "lucide-react";

export default function AdminPendingBusinessesPage() {
  return (
    <div className="bg-gray-950 p-8 rounded-xl border border-gray-800 flex flex-col items-center justify-center min-h-[500px]">
      <Store className="w-16 h-16 text-gray-800 mb-4" />
      <h2 className="text-2xl font-bold text-gray-200">Pending Businesses</h2>
      <p className="text-gray-500 mt-2 max-w-md text-center">
        The review queue for approving or rejecting new merchant applications will be implemented here.
      </p>
    </div>
  );
}
