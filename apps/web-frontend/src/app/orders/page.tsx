"use client";

import { PackageCheck } from "lucide-react";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";
import { Button } from "@/components/ui/Button";
import { useOrders } from "@/features/profile/hooks";
import { useCancelOrder } from "@/features/social/hooks";

export default function OrdersPage() {
  const orders = useOrders();
  const cancelOrder = useCancelOrder();

  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold text-[#111827]">My Orders</h1>
        {orders.isLoading && <LoadingState message="Loading your orders..." />}
        {orders.isError && (
          <ErrorState
            message="We could not load your orders."
            onRetry={() => orders.refetch()}
          />
        )}
        {orders.data?.data.length === 0 && (
          <EmptyState
            icon={<PackageCheck />}
            title="No orders yet"
            description="Your purchases will appear here."
          />
        )}
        <div className="space-y-4">
          {orders.data?.data.map((order) => (
            <article
              key={order.id}
              className="rounded-xl border border-[#E5E7EB] bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[#111827]">
                    Order {order.id.slice(0, 8)}
                  </p>
                  <p className="text-sm text-[#6B7280]">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="rounded-full bg-[#E6F4F1] px-3 py-1 text-xs font-semibold text-[#0D6E6E]">
                  {order.status.replaceAll("_", " ")}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[#E5E7EB] pt-4 text-sm">
                <span>
                  {order.items.length} item{order.items.length === 1 ? "" : "s"}{" "}
                  · {order.fulfilmentMethod.replaceAll("_", " ")}
                </span>
                <span className="font-bold text-[#111827]">
                  LKR {order.total.toLocaleString()}
                </span>
              </div>
              {["PENDING_PAYMENT", "PAID", "CONFIRMED"].includes(
                order.status,
              ) && (
                <Button
                  className="mt-4"
                  size="sm"
                  variant="outline"
                  onClick={() => cancelOrder.mutate(order.id)}
                  disabled={cancelOrder.isPending}
                >
                  Cancel order
                </Button>
              )}
            </article>
          ))}
        </div>
      </main>
    </ProtectedRoute>
  );
}
