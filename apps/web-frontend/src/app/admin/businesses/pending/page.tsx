"use client";

import { useEffect, useState } from "react";
import { adminRepository } from "@/repositories";
import type { Business } from "@/domain/types";
import { LoadingState, EmptyState } from "@/components/ui/States";
import { toast } from "sonner";
import { Store, CheckCircle, XCircle } from "lucide-react";

export default function AdminPendingBusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPending();
  }, []);

  async function loadPending() {
    setIsLoading(true);
    try {
      const data = await adminRepository.getPendingBusinesses();
      setBusinesses(data);
    } catch (e) {
      toast.error("Failed to load pending businesses");
    } finally {
      setIsLoading(false);
    }
  }

  const handleAction = async (id: string, status: 'ACTIVE' | 'REJECTED') => {
    try {
      await adminRepository.updateBusinessStatus(id, status);
      setBusinesses(prev => prev.filter(b => b.id !== id));
      toast.success(`Business ${status === 'ACTIVE' ? 'approved' : 'rejected'}`);
    } catch (e) {
      toast.error(`Failed to ${status === 'ACTIVE' ? 'approve' : 'reject'} business`);
    }
  };

  if (isLoading) return <LoadingState />;

  if (businesses.length === 0) {
    return <EmptyState icon={<Store />} title="No Pending Businesses" description="The approval queue is empty. Good job!" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Pending Approvals</h1>
        <p className="text-gray-400">Review and approve new merchant applications.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {businesses.map(business => (
          <div key={business.id} className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-100">{business.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{business.slug}</p>
                </div>
                <span className="bg-yellow-500/10 text-yellow-500 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/20">
                  PENDING
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Description</p>
                  <p className="text-sm text-gray-300">{business.description || 'No description provided.'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Contact Info</p>
                  <p className="text-sm text-gray-300">{business.contactInformation.email}</p>
                  <p className="text-sm text-gray-300">{business.contactInformation.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 border-t border-gray-800 p-4 flex gap-3">
              <button 
                onClick={() => handleAction(business.id, 'ACTIVE')}
                className="flex-1 bg-gray-100 text-gray-900 py-2.5 rounded-lg text-sm font-bold hover:bg-white flex items-center justify-center gap-2 transition"
              >
                <CheckCircle className="w-4 h-4" /> Approve
              </button>
              <button 
                onClick={() => handleAction(business.id, 'REJECTED')}
                className="flex-1 bg-gray-950 border border-gray-700 text-gray-300 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center justify-center gap-2 transition"
              >
                <XCircle className="w-4 h-4" /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
