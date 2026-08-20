"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  Menu,
  X,
  MapPin,
  ChevronDown,
  MessageCircle,
  Package,
} from "lucide-react";
import { useState } from "react";
import { CartIcon } from "./CartIcon";
import { useAuthStore } from "@/stores/authStore";
import { useUIStore } from "@/stores/uiStore";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/categories", label: "Categories" },
  { href: "/search", label: "Explore" },
];

export function Header() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { selectedCity, setSelectedCity, isMobileMenuOpen, toggleMobileMenu } = useUIStore();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="h-8 w-8 rounded-lg bg-[#0D6E6E] flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-[#111827] text-lg hidden sm:block">
            Marketplace
          </span>
        </Link>

        {/* Location selector (desktop) */}
        <button
          className="hidden md:flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
          aria-label="Change location"
          onClick={() =>
            setSelectedCity(selectedCity === "Colombo" ? "Kandy" : "Colombo")
          }
        >
          <MapPin className="h-4 w-4 text-[#0D6E6E]" />
          <span>{selectedCity}</span>
          <ChevronDown className="h-3 w-3" />
        </button>

        {/* Search (desktop) */}
        <Link
          href="/search"
          className="hidden md:flex flex-1 mx-6 max-w-md items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F7F8FA] px-4 py-2 text-sm text-[#9CA3AF] hover:border-[#0D6E6E] transition-colors"
        >
          <Search className="h-4 w-4" />
          <span>Search businesses, products, services…</span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname.startsWith(link.href)
                  ? "text-[#0D6E6E] bg-[#0D6E6E]/5"
                  : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F7F8FA]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {/* Search icon (mobile) */}
          <Link
            href="/search"
            className="md:hidden p-2 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F7F8FA] transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Link>

          {/* Cart */}
          <CartIcon />

          {/* Notifications (logged in) */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="hidden sm:flex p-2 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F7F8FA] transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#E5E7EB] overflow-hidden z-50 py-2">
                  <div className="px-4 py-3 border-b border-[#E5E7EB]">
                    <h3 className="font-bold text-[#111827]">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-[#F7F8FA] cursor-pointer">
                      <p className="text-sm font-medium text-[#111827]">Order ORD-12345 has been confirmed.</p>
                      <p className="text-xs text-[#6B7280] mt-1">10 minutes ago</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-[#F7F8FA] cursor-pointer">
                      <p className="text-sm font-medium text-[#111827]">Your booking at Silva Associates is tomorrow.</p>
                      <p className="text-xs text-[#6B7280] mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-t border-[#E5E7EB] text-center">
                    <button className="text-sm font-semibold text-[#0D6E6E] hover:underline">Mark all as read</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Messages (logged in) */}
          {user && (
            <Link
              href="/messages"
              className="hidden sm:flex p-2 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F7F8FA] transition-colors"
              aria-label="Messages"
            >
              <MessageCircle className="h-5 w-5" />
            </Link>
          )}

          {/* Orders (logged in) */}
          {user && (
            <Link
              href="/orders"
              className="hidden sm:flex p-2 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F7F8FA] transition-colors"
              aria-label="Orders"
            >
              <Package className="h-5 w-5" />
            </Link>
          )}

          {/* Profile / Login */}
          {user ? (
            <Link href="/profile" aria-label="Profile">
              <Avatar src={user.avatar} name={user.name} size="sm" className="ml-1" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="ml-1 px-3 py-1.5 rounded-lg bg-[#0D6E6E] text-white text-sm font-medium hover:bg-[#1A9696] transition-colors"
            >
              Sign in
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden ml-1 p-2 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-[#F7F8FA] transition-colors"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[#E5E7EB] bg-white px-4 py-3 space-y-1 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleMobileMenu}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname.startsWith(link.href)
                    ? "text-[#0D6E6E] bg-[#0D6E6E]/5"
                    : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F7F8FA]"
                )}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <>
                <Link
                  href="/orders"
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#6B7280] hover:text-[#111827] hover:bg-[#F7F8FA]"
                >
                  <Package className="h-4 w-4" /> Orders
                </Link>
                <Link
                  href="/messages"
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#6B7280] hover:text-[#111827] hover:bg-[#F7F8FA]"
                >
                  <MessageCircle className="h-4 w-4" /> Messages
                </Link>
                <Link
                  href="/notifications"
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#6B7280] hover:text-[#111827] hover:bg-[#F7F8FA]"
                >
                  <Bell className="h-4 w-4" /> Notifications
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
