"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Package, Calendar, MapPin, Settings, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

const navigation = [
  { name: "Overview", href: "/profile", icon: User },
  { name: "Orders", href: "/profile/orders", icon: Package },
  { name: "Bookings", href: "/profile/bookings", icon: Calendar },
  { name: "Addresses", href: "/profile/addresses", icon: MapPin },
  { name: "Settings", href: "/profile/settings", icon: Settings },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
    if (!user) {
      router.push("/login?redirect=/profile");
    }
  }, [user, router]);

  if (!mounted || !user) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sticky top-24">
          
          {/* User Info */}
          <div className="flex items-center gap-4 p-4 mb-4 border-b border-[#E5E7EB]">
            <div className="h-12 w-12 rounded-full bg-[#0D6E6E] text-white flex items-center justify-center font-bold text-xl uppercase">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-[#111827]">{user.name}</p>
              <p className="text-xs text-[#6B7280]">{user.email}</p>
            </div>
          </div>

          {/* Links */}
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#0D6E6E]/10 text-[#0D6E6E]"
                      : "text-[#374151] hover:bg-[#F7F8FA] hover:text-[#111827]"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "text-[#0D6E6E]" : "text-[#9CA3AF]"}`} />
                  {item.name}
                </Link>
              );
            })}

            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-4"
            >
              <LogOut className="h-5 w-5 text-red-500" />
              Sign Out
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}
