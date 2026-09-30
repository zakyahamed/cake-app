"use client";

import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";
import { reviewRepository } from "@/repositories";

export default function MyReviewsPage() {
  const reviews = useQuery({
    queryKey: ["my-reviews"],
    queryFn: () => reviewRepository.getMyReviews(),
  });
  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold text-[#111827]">My Reviews</h1>
        {reviews.isLoading && (
          <LoadingState message="Loading your reviews..." />
        )}
        {reviews.isError && (
          <ErrorState
            message="We could not load your reviews."
            onRetry={() => reviews.refetch()}
          />
        )}
        {reviews.data?.length === 0 && (
          <EmptyState
            icon={<Star />}
            title="No reviews yet"
            description="Reviews you leave for completed orders and bookings will appear here."
          />
        )}
        <div className="space-y-4">
          {reviews.data?.map((review) => (
            <article
              key={review.id}
              className="rounded-xl border border-[#E5E7EB] bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-[#F5A623]">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4"
                      fill={index < review.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <time className="text-xs text-[#9CA3AF]">
                  {new Date(review.createdAt).toLocaleDateString()}
                </time>
              </div>
              <p className="mt-3 text-sm text-[#374151]">
                {review.comment || "No written comment"}
              </p>
            </article>
          ))}
        </div>
      </main>
    </ProtectedRoute>
  );
}
