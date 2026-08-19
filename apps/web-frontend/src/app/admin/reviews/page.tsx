"use client";

import { useEffect, useState } from "react";
import { adminRepository } from "@/repositories";
import type { Review } from "@/domain/types";
import { LoadingState, EmptyState } from "@/components/ui/States";
import { toast } from "sonner";
import { MessageSquareWarning, Trash2, User, Star } from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    setIsLoading(true);
    try {
      const data = await adminRepository.getReviews(1, 50);
      setReviews(data.data);
    } catch (e) {
      toast.error("Failed to load reviews");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await adminRepository.deleteReview(id);
      setReviews(prev => prev.filter(r => r.id !== id));
      toast.success("Review deleted successfully");
    } catch (e) {
      toast.error("Failed to delete review");
    }
  };

  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Content Moderation</h1>
        <p className="text-gray-400">Monitor and moderate user reviews.</p>
      </div>

      {reviews.length === 0 ? (
        <EmptyState icon={<MessageSquareWarning />} title="No Reviews Found" description="The moderation queue is currently empty." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map(review => (
            <div key={review.id} className="bg-gray-950 border border-gray-800 p-5 rounded-xl flex flex-col justify-between hover:border-gray-700 transition">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="bg-gray-900 p-1.5 rounded-md">
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                    <span>{review.customerId.slice(0, 8)}...</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-900 px-2 py-1 rounded text-xs font-bold text-yellow-500 border border-gray-800">
                    {review.rating} <Star className="w-3 h-3 fill-yellow-500" />
                  </div>
                </div>
                
                <p className="text-sm text-gray-300 italic mb-4 line-clamp-4">"{review.comment}"</p>
                
                <div className="text-xs text-gray-500 space-y-1 mb-4">
                  <p>Target Business: <span className="text-gray-400">{review.businessId.slice(0, 8)}...</span></p>
                  <p>Posted: {new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-800 flex justify-end">
                <button 
                  onClick={() => handleDelete(review.id)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded border border-red-500/20 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
