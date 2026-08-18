import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white mt-auto pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-7 w-7 rounded-lg bg-[#0D6E6E] flex items-center justify-center">
                <span className="text-white font-bold text-xs">M</span>
              </div>
              <span className="font-bold text-[#111827]">Marketplace</span>
            </div>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Discover the best local businesses in Sri Lanka. Shop, book, and connect with your community.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#111827] mb-3">Discover</h3>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              <li><Link href="/categories" className="hover:text-[#0D6E6E] transition-colors">Categories</Link></li>
              <li><Link href="/search" className="hover:text-[#0D6E6E] transition-colors">Search</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#111827] mb-3">Account</h3>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              <li><Link href="/login" className="hover:text-[#0D6E6E] transition-colors">Sign In</Link></li>
              <li><Link href="/register" className="hover:text-[#0D6E6E] transition-colors">Register</Link></li>
              <li><Link href="/orders" className="hover:text-[#0D6E6E] transition-colors">Orders</Link></li>
              <li><Link href="/bookings" className="hover:text-[#0D6E6E] transition-colors">Bookings</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#111827] mb-3">Help</h3>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              <li><span className="cursor-default">Support</span></li>
              <li><span className="cursor-default">Privacy Policy</span></li>
              <li><span className="cursor-default">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#9CA3AF]">
            © {new Date().getFullYear()} Marketplace. All rights reserved.
          </p>
          <p className="text-xs text-[#9CA3AF]">Built with ❤️ for Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}
