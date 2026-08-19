"use client";

import { useEffect, useState } from "react";
import { adminRepository } from "@/repositories";
import type { AdminStats } from "@/repositories/interfaces/admin";
import { Users, Store, DollarSign, CalendarCheck } from "lucide-react";
import { Price } from "@/components/ui/Price";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await adminRepository.getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load admin stats", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Platform Overview</h1>
          <p className="text-gray-400">System-wide metrics and health check.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-950 p-6 rounded-xl border border-gray-800 flex items-center gap-4">
          <div className="p-3 bg-red-950 text-red-500 rounded-lg border border-red-900/50">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Total GMV</p>
            <h3 className="text-2xl font-bold text-gray-100">
              <Price amount={stats?.totalRevenue || 0} />
            </h3>
          </div>
        </div>

        <div className="bg-gray-950 p-6 rounded-xl border border-gray-800 flex items-center gap-4">
          <div className="p-3 bg-gray-900 text-gray-300 rounded-lg border border-gray-800">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Total Businesses</p>
            <h3 className="text-2xl font-bold text-gray-100">{stats?.totalBusinesses || 0}</h3>
          </div>
        </div>

        <div className="bg-gray-950 p-6 rounded-xl border border-gray-800 flex items-center gap-4">
          <div className="p-3 bg-gray-900 text-gray-300 rounded-lg border border-gray-800">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Registered Users</p>
            <h3 className="text-2xl font-bold text-gray-100">{stats?.totalUsers || 0}</h3>
          </div>
        </div>

        <div className="bg-gray-950 p-6 rounded-xl border border-gray-800 flex items-center gap-4">
          <div className="p-3 bg-gray-900 text-gray-300 rounded-lg border border-gray-800">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Total Bookings</p>
            <h3 className="text-2xl font-bold text-gray-100">{stats?.totalBookings || 0}</h3>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100">System Logs</h2>
          <p className="text-sm text-gray-400">API health and monitoring events will appear here in production.</p>
        </div>
        <div className="p-6 text-center text-gray-500">
          No recent alerts. Platform is operating normally.
        </div>
      </div>
    </div>
  );
}
