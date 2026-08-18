"use client";

import { useAuthStore } from "@/stores/authStore";
import { EmptyState } from "@/components/ui/States";
import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AddressesPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#111827]">My Addresses</h1>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      
      {user.addresses.length === 0 ? (
        <EmptyState
          title="No addresses saved"
          description="Add a delivery address to checkout faster."
          icon={<MapPin className="h-10 w-10 text-gray-400" />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.addresses.map((address) => (
            <div key={address.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-6 relative">
              {address.isDefault && (
                <span className="absolute top-4 right-4 bg-gray-100 text-[#374151] text-xs font-bold px-2 py-1 rounded">
                  Default
                </span>
              )}
              <div className="flex items-center mb-3">
                <MapPin className="h-5 w-5 text-[#0D6E6E] mr-2 shrink-0" />
                <span className="font-bold text-[#111827]">{address.label}</span>
              </div>
              <div className="text-sm text-[#6B7280] space-y-1">
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>{address.city}, {address.district}</p>
                {address.postalCode && <p>{address.postalCode}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
