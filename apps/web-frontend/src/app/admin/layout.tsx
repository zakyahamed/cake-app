"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RoleGuard } from "@/components/RoleGuard";
import { UserRole } from "@/domain/enums";
import { ShieldAlert, Users, Store, MessageSquareWarning, Activity } from "lucide-react";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Platform Overview", href: "/admin", icon: Activity },
    { name: "Businesses Queue", href: "/admin/businesses/pending", icon: Store },
    { name: "User Directory", href: "/admin/users", icon: Users },
    { name: "Moderation", href: "/admin/reviews", icon: MessageSquareWarning },
  ];

  return (
    <RoleGuard allowedRoles={[UserRole.ADMIN]}>
      <div className="flex min-h-[calc(100vh-64px)] bg-gray-900 text-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-950 border-r border-gray-800 shadow-sm hidden md:block">
          <div className="p-4 border-b border-gray-800 flex items-center gap-2">
            <ShieldAlert className="text-red-500 w-5 h-5" />
            <div>
              <h2 className="text-lg font-bold text-gray-100">Admin Console</h2>
              <p className="text-xs text-gray-400 mt-0.5">Platform Management</p>
            </div>
          </div>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-red-600/10 text-red-500 font-medium border border-red-900/50"
                      : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </RoleGuard>
  );
}
