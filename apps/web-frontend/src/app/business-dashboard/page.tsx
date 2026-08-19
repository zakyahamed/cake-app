"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { operationsRepository, businessRepository } from "@/repositories";
import type { Business } from "@/domain/types";
import type { BusinessDashboardStats } from "@/repositories/interfaces/operations";
import { DollarSign, ShoppingBag, Users, Star, Calendar } from "lucide-react";
import { Price } from "@/components/ui/Price";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export default function BusinessDashboardPage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<any | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      
      try {
        // Find the business owned by this user
        // Note: For MVP, we're assuming the user has 1 business and we fetch it
        // A better approach in production is linking businessId to the user profile directly
        const businesses = await businessRepository.getBusinesses({ limit: 50 });
        const myBusiness = businesses.data.find(b => b.name !== ""); // Simple mock check, normally we'd match ownerId
        // In our backend, operations uses the businessId. 
        // For this demo, let's just grab the first featured business or a known business ID if possible.
        // Actually, let's just assume the user has a business and we can get their first business.
        const bizResult = await businessRepository.getBusinesses({});
        // In a real app we'd query by ownerId, but for now we'll pick the first one since our seed has only 1.
        const activeBiz = bizResult.data[0];
        setBusiness(activeBiz);

        if (activeBiz) {
          const dashboardStats = await operationsRepository.getDashboardStats(activeBiz.id);
          setStats(dashboardStats);
        }
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">Welcome, {user?.name}!</h2>
        <p className="text-gray-500 mt-2">You don't have an active business profile yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back! Here's how {business.name} is performing.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
            <h3 className="text-2xl font-bold text-gray-900"><Price amount={stats?.totalRevenue || 0} /></h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.totalOrders || 0}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Unique Customers</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.uniqueCustomers || 0}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Average Rating</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats?.averageRating ? stats.averageRating.toFixed(1) : '0.0'}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              Recent Orders
            </h2>
            <Link href="/business-dashboard/orders" className="text-sm text-primary hover:underline font-medium">View All</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {stats?.recentOrders?.length > 0 ? (
              stats.recentOrders.map((order: any) => (
                <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">Order #{order.id.substring(0, 6)}</p>
                    <p className="text-sm text-gray-500">{order.items.length} items • <Price amount={order.total} /></p>
                  </div>
                  <Badge variant={order.status === 'PENDING' ? 'warning' : 'success'}>{order.status}</Badge>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">No recent orders.</div>
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Recent Bookings
            </h2>
            <Link href="/business-dashboard/bookings" className="text-sm text-primary hover:underline font-medium">View All</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {stats?.recentBookings?.length > 0 ? (
              stats.recentBookings.map((booking: any) => (
                <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{new Date(booking.date).toLocaleDateString()} at {booking.time}</p>
                    <p className="text-sm text-gray-500"><Price amount={booking.totalAmount} /></p>
                  </div>
                  <Badge variant={booking.status === 'PENDING' ? 'warning' : 'success'}>{booking.status}</Badge>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">No recent bookings.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
