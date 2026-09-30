"use client";

import { useAuthStore } from "@/stores/authStore";
import { EmptyState } from "@/components/ui/States";
import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addressRepository } from "@/repositories";
import { useState } from "react";

export default function AddressesPage() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const addresses = useQuery({
    queryKey: ["addresses", user?.id],
    queryFn: () => addressRepository.getAddresses(),
    enabled: !!user,
  });
  const createAddress = useMutation({
    mutationFn: () =>
      addressRepository.createAddress({
        line1,
        line2: undefined,
        city,
        state,
        postalCode,
      }),
    onSuccess: () => {
      setShowForm(false);
      setLine1("");
      setCity("");
      setState("");
      setPostalCode("");
      queryClient.invalidateQueries({ queryKey: ["addresses", user?.id] });
    },
  });
  const deleteAddress = useMutation({
    mutationFn: (id: string) => addressRepository.deleteAddress(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["addresses", user?.id] }),
  });

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#111827]">My Addresses</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowForm((value) => !value)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      {showForm && (
        <form
          className="space-y-3 rounded-xl border border-[#E5E7EB] bg-white p-5"
          onSubmit={(event) => {
            event.preventDefault();
            createAddress.mutate();
          }}
        >
          <input
            required
            value={line1}
            onChange={(event) => setLine1(event.target.value)}
            placeholder="Address line"
            className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2"
          />
          <input
            required
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="City"
            className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2"
          />
          <input
            value={state}
            onChange={(event) => setState(event.target.value)}
            placeholder="State / district"
            className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2"
          />
          <input
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
            placeholder="Postal code"
            className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2"
          />
          <Button type="submit" disabled={createAddress.isPending}>
            {createAddress.isPending ? "Saving..." : "Save address"}
          </Button>
        </form>
      )}

      {(addresses.data || user.addresses).length === 0 ? (
        <EmptyState
          title="No addresses saved"
          description="Add a delivery address to checkout faster."
          icon={<MapPin className="h-10 w-10 text-gray-400" />}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(addresses.data || user.addresses).map((address) => (
            <div
              key={address.id}
              className="bg-white rounded-2xl border border-[#E5E7EB] p-6 relative"
            >
              {address.isDefault && (
                <span className="absolute top-4 right-4 bg-gray-100 text-[#374151] text-xs font-bold px-2 py-1 rounded">
                  Default
                </span>
              )}
              <div className="flex items-center mb-3">
                <MapPin className="h-5 w-5 text-[#0D6E6E] mr-2 shrink-0" />
                <span className="font-bold text-[#111827]">
                  {address.label}
                </span>
              </div>
              <div className="text-sm text-[#6B7280] space-y-1">
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>
                  {address.city}, {address.district}
                </p>
                {address.postalCode && <p>{address.postalCode}</p>}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-4 text-red-600"
                onClick={() => deleteAddress.mutate(address.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
