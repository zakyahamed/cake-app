"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RoleGuard } from "@/components/RoleGuard";
import { UserRole } from "@/domain/enums";
import { LayoutDashboard, ShoppingBag, CalendarCheck, PackageSearch, Settings, ChefHat } from "lucide-react";

export default function BusinessDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/business-dashboard", icon: LayoutDashboard },
    { name: "Orders", href: "/business-dashboard/orders", icon: ShoppingBag },
    { name: "Bookings", href: "/business-dashboard/bookings", icon: CalendarCheck },
    { name: "Products", href: "/business-dashboard/products", icon: PackageSearch },
    { name: "Services", href: "/business-dashboard/services", icon: ChefHat },
    { name: "Settings", href: "/business-dashboard/settings", icon: Settings },
  ];

  return (
    <RoleGuard allowedRoles={[UserRole.BUSINESS_OWNER]}>
      <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 shadow-sm hidden md:block">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Business Portal</h2>
            <p className="text-xs text-gray-500 mt-1">Manage your storefront</p>
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
                      ? "bg-gray-100 text-gray-900 font-medium shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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
