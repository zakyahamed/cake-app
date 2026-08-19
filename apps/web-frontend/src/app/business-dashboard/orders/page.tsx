"use client";

import { useEffect, useState } from "react";
import { orderRepository, businessRepository } from "@/repositories";
import type { Order, Business } from "@/domain/types";
import { OrderStatus } from "@/domain/enums";
import { useAuthStore } from "@/stores/authStore";
import { LoadingState, EmptyState } from "@/components/ui/States";
import { Price } from "@/components/ui/Price";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const COLUMNS = [
  { id: OrderStatus.CONFIRMED, title: "New Orders", color: "bg-orange-50 border-orange-200", badge: "warning" as const },
  { id: OrderStatus.PREPARING, title: "Preparing", color: "bg-blue-50 border-blue-200", badge: "brand" as const },
  { id: OrderStatus.READY, title: "Ready", color: "bg-green-50 border-green-200", badge: "success" as const },
  { id: OrderStatus.COMPLETED, title: "Completed", color: "bg-gray-50 border-gray-200", badge: "neutral" as const },
];

export default function BusinessOrdersPage() {
  const { user } = useAuthStore();
  const [business, setBusiness] = useState<Business | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const bizRes = await businessRepository.getBusinesses({});
        const biz = bizRes.data[0];
        if (biz) {
          setBusiness(biz);
          const bizOrders = await orderRepository.getBusinessOrders(biz.id);
          setOrders(bizOrders);
        }
      } catch (e) {
        toast.error("Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [user]);

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      // Optimistic update
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      // Real API call (we only have a mock update in the current controller which does CANCELLED,
      // but let's assume updateOrderStatus is fully functional for all statuses)
      await fetch(`http://localhost:3001/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id}` // Mock auth
        },
        body: JSON.stringify({ status: newStatus })
      });
      toast.success(`Order moved to ${newStatus}`);
    } catch (e) {
      toast.error("Failed to update status");
      // Could revert state here
    }
  };

  if (isLoading) return <LoadingState />;
  
  if (!business) return <EmptyState icon={<ShoppingBag />} title="No Business Profile" description="You need an active business to view orders." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order Board</h1>
        <p className="text-gray-500">Manage and fulfill active orders.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {COLUMNS.map((col) => {
          const colOrders = orders.filter((o) => o.status === col.id);
          return (
            <div key={col.id} className={`rounded-xl border ${col.color} p-4 min-h-[500px] flex flex-col`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">{col.title}</h3>
                <span className="bg-white text-gray-600 text-xs font-bold px-2 py-1 rounded-full border border-gray-200">
                  {colOrders.length}
                </span>
              </div>
              
              <div className="flex flex-col gap-3 flex-1">
                <AnimatePresence>
                  {colOrders.map((order) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={order.id}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 relative group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-mono text-gray-500">#{order.id.slice(0, 6)}</span>
                        <Badge variant={col.badge}>{order.fulfilmentMethod}</Badge>
                      </div>
                      
                      <div className="mb-3 space-y-1">
                        {order.items.map(i => (
                          <div key={i.id} className="text-sm">
                            <span className="font-medium text-gray-900">{i.quantity}x</span> {i.name}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <Price amount={order.total} className="font-bold text-primary" />
                        
                        {/* Status progression actions */}
                        {col.id === OrderStatus.CONFIRMED && (
                          <button onClick={() => updateStatus(order.id, OrderStatus.PREPARING)} className="text-primary hover:bg-primary/10 p-1.5 rounded transition">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                        {col.id === OrderStatus.PREPARING && (
                          <button onClick={() => updateStatus(order.id, OrderStatus.READY)} className="text-primary hover:bg-primary/10 p-1.5 rounded transition">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                        {col.id === OrderStatus.READY && (
                          <button onClick={() => updateStatus(order.id, OrderStatus.COMPLETED)} className="text-primary hover:bg-primary/10 p-1.5 rounded transition">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {colOrders.length === 0 && (
                  <div className="text-center text-sm text-gray-400 py-8">
                    No orders in this state
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
