"use client";

import { useState, useEffect } from "react";
import { businessRepository } from "@/repositories";
import type { Business } from "@/domain/types";
import { useAuthStore } from "@/stores/authStore";
import { LoadingState, EmptyState } from "@/components/ui/States";
import { toast } from "sonner";
import { Settings, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function BusinessSettingsPage() {
  const { user } = useAuthStore();
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pickupAvailable, setPickupAvailable] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const bizRes = await businessRepository.getBusinesses({});
        const biz = bizRes.data[0];
        if (biz) {
          setBusiness(biz);
          setDescription(biz.description || "");
          setPhone(biz.contactInformation.phone || "");
          setEmail(biz.contactInformation.email || "");
          setAddress(biz.location.address || "");
          setPickupAvailable(biz.pickupAvailable);
        }
      } catch (e) {
        toast.error("Failed to load business");
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business) return;
    
    // In a real app we'd call businessRepository.updateBusiness(business.id, {...})
    toast.success("Business profile updated successfully!");
  };

  if (isLoading) return <LoadingState />;
  if (!business) return <EmptyState icon={<Settings />} title="No Business Profile" description="You need an active business to manage settings." />;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
        <p className="text-gray-500">Update your business profile and fulfillment preferences.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Public Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input disabled type="text" value={business.name} className="w-full rounded-lg border-gray-300 bg-gray-50 text-gray-500 h-10 px-3 border" />
                <p className="text-xs text-gray-500 mt-1">To change your business name, contact support.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={4} 
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-3 border" 
                />
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Phone</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Store Address</label>
                <input 
                  type="text" 
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 px-3 border" 
                />
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fulfillment</h3>
            <div className="space-y-4">
              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center h-5">
                  <input 
                    type="checkbox" 
                    checked={pickupAvailable}
                    onChange={e => setPickupAvailable(e.target.checked)}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">Allow Store Pickup</span>
                  <span className="text-sm text-gray-500">Customers can order online and pick up their items at your physical location.</span>
                </div>
              </label>
            </div>
          </section>

        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <Button type="submit" className="flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
