"use client";

import { useAuthStore } from "@/stores/authStore";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Button } from "@/components/ui";
import { useLogout } from "@/features/auth/hooks";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { mutate: logout, isPending } = useLogout();

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-[#111827] mb-6">Profile</h1>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm max-w-2xl">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#6B7280]">Name</label>
              <p className="text-[#111827] font-medium">{user?.name}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-[#6B7280]">Email</label>
              <p className="text-[#111827] font-medium">{user?.email}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-[#6B7280]">Phone</label>
              <p className="text-[#111827] font-medium">{user?.phone}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
            <Button
              variant="danger"
              onClick={() => logout()}
              isLoading={isPending}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
