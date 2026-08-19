"use client";

import { Settings } from "lucide-react";

export default function BusinessSettingsPage() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[500px]">
      <Settings className="w-16 h-16 text-gray-300 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800">Store Settings</h2>
      <p className="text-gray-500 mt-2 max-w-md text-center">
        Update business profile, opening hours, and fulfillment settings here.
      </p>
    </div>
  );
}
