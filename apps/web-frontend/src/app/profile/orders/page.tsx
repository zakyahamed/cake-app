"use client";

import { useOrders } from "@/features/profile/hooks";
import { LoadingState, EmptyState } from "@/components/ui/States";
import { Package, Clock, CheckCircle2, XCircle } from "lucide-react";
import type { OrderStatus } from "@/domain/enums";

const statusConfig: Record<OrderStatus, { color: string; bg: string; icon: React.ElementType }> = {
  PENDING_PAYMENT: { color: "text-orange-600", bg: "bg-orange-50", icon: Clock },
  PAID: { color: "text-blue-600", bg: "bg-blue-50", icon: CheckCircle2 },
  CONFIRMED: { color: "text-blue-600", bg: "bg-blue-50", icon: CheckCircle2 },
  PREPARING: { color: "text-indigo-600", bg: "bg-indigo-50", icon: Package },
  READY: { color: "text-purple-600", bg: "bg-purple-50", icon: Package },
  OUT_FOR_DELIVERY: { color: "text-purple-600", bg: "bg-purple-50", icon: Package },
  COMPLETED: { color: "text-green-600", bg: "bg-green-50", icon: CheckCircle2 },
  CANCELLED: { color: "text-red-600", bg: "bg-red-50", icon: XCircle },
  REJECTED: { color: "text-red-600", bg: "bg-red-50", icon: XCircle },
  REFUNDED: { color: "text-gray-600", bg: "bg-gray-50", icon: CheckCircle2 },
};

export default function OrdersPage() {
  const { data: ordersResult, isLoading } = useOrders();

  if (isLoading) return <LoadingState message="Loading your orders..." className="py-20" />;

  const orders = ordersResult?.data || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#111827]">Order History</h1>
      
      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="When you place orders, they will appear here."
          icon={<Package className="h-10 w-10 text-gray-400" />}
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const config = statusConfig[order.status];
            const Icon = config.icon;
            
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-[#111827]">{order.id}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                        <Icon className="h-3 w-3 mr-1" />
                        {order.status.replace(/_/g, " ")}
                      </span>
                    </div>
                    <p className="text-sm text-[#6B7280]">
                      {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#111827]">LKR {order.total.toLocaleString()}</p>
                    <p className="text-sm text-[#6B7280]">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-4 mt-4">
                  <div className="flex flex-wrap gap-2 text-sm text-[#374151]">
                    <span className="font-medium text-[#6B7280] mr-2">Items:</span>
                    {order.items.map(item => item.name).join(", ")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
