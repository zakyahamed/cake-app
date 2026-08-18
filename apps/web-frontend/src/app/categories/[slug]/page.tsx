"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCategory, useBusinesses } from "@/features/discovery/hooks";
import { BusinessCard } from "@/components/discovery/BusinessCard";
import { Button } from "@/components/ui/Button";
import { LoadingState, EmptyState } from "@/components/ui/States";

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();

  const { data: category, isLoading: isLoadingCategory, isError } = useCategory(slug);

  const { data: businessResult, isLoading: isLoadingBusinesses } = useBusinesses({
    categoryId: category?.id,
    limit: 20,
  });

  // Handle invalid category
  useEffect(() => {
    if (isError) {
      router.push("/404");
    }
  }, [isError, router]);

  if (isLoadingCategory) {
    return <LoadingState message="Loading category..." className="py-20" />;
  }

  if (!category) return null;

  const businesses = businessResult?.data || [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#111827] flex items-center">
          <span className="text-4xl mr-3">{category.icon}</span>
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-2 text-[#6B7280]">{category.description}</p>
        )}
      </div>

      {isLoadingBusinesses ? (
        <LoadingState message="Loading businesses..." className="py-20" />
      ) : businesses.length === 0 ? (
        <EmptyState
          title="No businesses found"
          description={`We couldn't find any businesses in the ${category.name} category yet.`}
          action={
            <Button variant="outline" onClick={() => router.push("/categories")}>
              Browse all categories
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      )}
    </div>
  );
}
