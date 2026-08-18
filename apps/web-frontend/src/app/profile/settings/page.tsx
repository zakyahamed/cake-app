"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [isSaved, setIsSaved] = useState(false);

  if (!user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call to update the profile.
    // We simulate a successful save here.
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-[#111827]">Account Settings</h1>
      
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
        <h2 className="text-lg font-bold text-[#111827] mb-6">Personal Information</h2>
        
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">Full Name</label>
            <Input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">Email Address</label>
            <Input 
              type="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">Phone Number</label>
            <Input 
              type="tel"
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Button type="submit" size="lg" className="px-8">
              Save Changes
            </Button>
            {isSaved && (
              <div className="flex items-center text-green-600 text-sm font-medium transition-opacity duration-300">
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                Settings saved
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
        <h2 className="text-lg font-bold text-[#111827] mb-2">Danger Zone</h2>
        <p className="text-sm text-[#6B7280] mb-4">
          Permanently delete your account and all of your content. This action is not reversible.
        </p>
        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
          Delete Account
        </Button>
      </div>
    </div>
  );
}
