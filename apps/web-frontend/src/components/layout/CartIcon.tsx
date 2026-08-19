"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { motion, AnimatePresence } from "framer-motion";

export function CartIcon() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  return (
    <Link href="/cart" className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors">
      <span className="sr-only">Cart</span>
      <ShoppingCart className="h-6 w-6" aria-hidden="true" />
      
      <AnimatePresence>
        {mounted && totalItems > 0 && (
          <motion.span 
            initial={{ scale: 0, x: '25%', y: '-25%' }}
            animate={{ scale: 1, x: '25%', y: '-25%' }}
            exit={{ scale: 0, x: '25%', y: '-25%' }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-[#E74C3C] rounded-full"
          >
            {totalItems > 99 ? "99+" : totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
