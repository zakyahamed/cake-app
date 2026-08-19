"use client";

import { ChefHat } from "lucide-react";

export default function BusinessServicesPage() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[500px]">
      <ChefHat className="w-16 h-16 text-gray-300 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800">Service Catalog</h2>
      <p className="text-gray-500 mt-2 max-w-md text-center">
        Forms to manage bookable services, durations, and availability will go here.
      </p>
    </div>
  );
}
