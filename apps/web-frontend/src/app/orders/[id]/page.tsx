"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ErrorState, LoadingState } from "@/components/ui/States";
import { orderRepository } from "@/repositories";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const order = useQuery({
    queryKey: ["order", id],
    queryFn: () => orderRepository.getOrderById(id),
  });
  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {order.isLoading && <LoadingState message="Loading order..." />}
        {order.isError && (
          <ErrorState
            message="We could not load this order."
            onRetry={() => order.refetch()}
          />
        )}
        {order.data && (
          <>
            <h1 className="mb-6 text-2xl font-bold text-[#111827]">
              Order {order.data.id.slice(0, 8)}
            </h1>
            <section className="rounded-xl border border-[#E5E7EB] bg-white p-5">
              <div className="flex justify-between">
                <span>Status</span>
                <strong className="text-[#0D6E6E]">
                  {order.data.status.replaceAll("_", " ")}
                </strong>
              </div>
              <div className="mt-4 space-y-3 border-t border-[#E5E7EB] pt-4">
                {order.data.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>LKR {item.subtotal.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between border-t border-[#E5E7EB] pt-4 font-bold">
                <span>Total</span>
                <span>LKR {order.data.total.toLocaleString()}</span>
              </div>
            </section>
          </>
        )}
      </main>
    </ProtectedRoute>
  );
}
