"use client";

import { PackageSearch } from "lucide-react";

export default function BusinessProductsPage() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[500px]">
      <PackageSearch className="w-16 h-16 text-gray-300 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800">Product Catalog</h2>
      <p className="text-gray-500 mt-2 max-w-md text-center">
        Forms to add, edit, and manage physical products and variants will go here.
      </p>
    </div>
  );
}
