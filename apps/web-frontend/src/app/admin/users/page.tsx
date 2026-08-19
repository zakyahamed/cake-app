"use client";

import { useEffect, useState } from "react";
import { adminRepository } from "@/repositories";
import type { User } from "@/domain/types";
import { LoadingState } from "@/components/ui/States";
import { toast } from "sonner";
import { Search, Shield, ShieldAlert, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadUsers();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  async function loadUsers() {
    setIsLoading(true);
    try {
      const result = await adminRepository.getUsers(searchTerm, 1, 50);
      setUsers(result.data);
    } catch (e) {
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  }

  const toggleStatus = async (user: User) => {
    const newStatus = user.status === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
    try {
      await adminRepository.updateUserStatus(user.id, newStatus);
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
      toast.success(`User ${user.name} is now ${newStatus}`);
    } catch (e) {
      toast.error(`Failed to update status for ${user.name}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">User Directory</h1>
          <p className="text-gray-400">Manage all registered accounts.</p>
        </div>
      </div>

      <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-800 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 text-gray-100 rounded-lg pl-10 pr-4 py-2 focus:ring-1 focus:ring-gray-700 focus:border-gray-700 outline-none transition"
            />
          </div>
        </div>

        {isLoading ? (
          <LoadingState className="py-20" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="bg-gray-900 text-gray-500 font-medium border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-900/50">
                      <td className="px-6 py-4 font-medium text-gray-100">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-xs font-medium">
                          {user.role === 'ADMIN' ? <ShieldAlert className="w-3.5 h-3.5 text-red-500" /> : 
                           user.role === 'BUSINESS_OWNER' ? <Shield className="w-3.5 h-3.5 text-blue-500" /> : null}
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={user.status === 'SUSPENDED' ? 'error' : 'success'}>
                          {user.status || 'ACTIVE'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => toggleStatus(user)}
                          disabled={user.role === 'ADMIN'}
                          className="text-xs font-medium text-gray-400 hover:text-white disabled:opacity-50 transition px-3 py-1.5 border border-gray-700 hover:bg-gray-800 rounded"
                        >
                          {user.status === 'SUSPENDED' ? 'Activate' : 'Suspend'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
