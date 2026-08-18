"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Search, ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home", icon: Home, exact: true },
  { href: "/categories", label: "Categories", icon: Grid },
  { href: "/search", label: "Search", icon: Search },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
  { href: "/profile", label: "Profile", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();
  const { getTotalItems } = useCartStore();
  const cartCount = getTotalItems();

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-[#E5E7EB] pb-safe"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16">
        {tabs.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full",
                "text-xs font-medium transition-colors",
                isActive ? "text-[#0D6E6E]" : "text-[#9CA3AF]"
              )}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
                {label === "Cart" && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full bg-[#0D6E6E] text-white text-[9px] font-bold flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </div>
              <span className={cn(isActive ? "text-[#0D6E6E]" : "text-[#9CA3AF]")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
