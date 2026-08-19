"use client";

import { Users } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <div className="bg-gray-950 p-8 rounded-xl border border-gray-800 flex flex-col items-center justify-center min-h-[500px]">
      <Users className="w-16 h-16 text-gray-800 mb-4" />
      <h2 className="text-2xl font-bold text-gray-200">User Directory</h2>
      <p className="text-gray-500 mt-2 max-w-md text-center">
        A complete data grid of all registered users with suspend/activate controls will go here.
      </p>
    </div>
  );
}
