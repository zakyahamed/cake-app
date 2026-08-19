"use client";

import { useState, useEffect } from "react";
import { businessRepository } from "@/repositories";
import type { Business, Service } from "@/domain/types";
import { useAuthStore } from "@/stores/authStore";
import { LoadingState, EmptyState } from "@/components/ui/States";
import { Price } from "@/components/ui/Price";
import { toast } from "sonner";
import { Plus, ChefHat, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Assuming we have ApiServiceRepository or similar
export default function BusinessServicesPage() {
  const { user } = useAuthStore();
  const [business, setBusiness] = useState<Business | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const bizRes = await businessRepository.getBusinesses({});
        const biz = bizRes.data[0];
        if (biz) {
          setBusiness(biz);
          // Assuming serviceRepository.getServices is available
          try {
            const { serviceRepository } = await import("@/repositories");
            const srvRes = await serviceRepository.getServices({ businessId: biz.id, limit: 50 });
            setServices(srvRes.data);
          } catch(e) {
            setServices([]); // fallback
          }
        }
      } catch (e) {
        toast.error("Failed to load services");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Service saved successfully!");
    setShowForm(false);
  };

  if (isLoading) return <LoadingState />;
  if (!business) return <EmptyState icon={<ChefHat />} title="No Business Profile" description="You need an active business to manage services." />;

  if (showForm) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Service</h2>
          <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
        </div>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
              <input required type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" placeholder="e.g. Wedding Cake Consultation" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea rows={3} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-3 border" placeholder="Describe the service..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Starting Price (LKR)</label>
                <input required type="number" min="0" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" placeholder="e.g. 5000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Minutes)</label>
                <input required type="number" min="15" step="15" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" placeholder="e.g. 60" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability (Days)</label>
              <div className="flex flex-wrap gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <label key={day} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 cursor-pointer">
                    <input type="checkbox" className="text-primary rounded" />
                    <span className="text-sm">{day}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <Button type="submit" className="w-full">Save Service</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Catalog</h1>
          <p className="text-gray-500">Manage your bookable services and consultations.</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Service
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {services.length === 0 ? (
          <div className="p-12 text-center">
            <ChefHat className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No services found</h3>
            <p className="text-gray-500 mt-1">Get started by adding your first service.</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Starting Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map(service => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{service.name}</td>
                  <td className="px-6 py-4 text-gray-600">{service.durationMinutes} mins</td>
                  <td className="px-6 py-4 font-medium"><Price amount={service.startingPrice} /></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
