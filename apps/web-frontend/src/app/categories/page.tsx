"use client";

import { useCategories } from "@/features/discovery/hooks";
import { CategoryCard } from "@/components/discovery/CategoryCard";
import { LoadingState } from "@/components/ui/States";

export default function CategoriesPage() {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[#111827]">All Categories</h1>
        <p className="mt-4 text-lg text-[#6B7280]">
          Browse our wide selection of local businesses by category.
        </p>
      </div>

      {isLoading ? (
        <LoadingState message="Loading categories..." className="py-20" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
