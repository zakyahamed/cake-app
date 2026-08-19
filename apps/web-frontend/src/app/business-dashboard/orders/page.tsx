"use client";

import { ShoppingBag } from "lucide-react";

export default function BusinessOrdersPage() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[500px]">
      <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
      <p className="text-gray-500 mt-2 max-w-md text-center">
        A full kanban board for managing active orders will be implemented here.
      </p>
    </div>
  );
}
