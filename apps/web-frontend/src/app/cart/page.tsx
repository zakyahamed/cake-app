"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";

export default function CartPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    getSubtotal,
    getTotalItems
  } = useCartStore();

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalItems = getTotalItems();
  const subtotal = getSubtotal();
  const deliveryFee = 350; // Mock fixed delivery fee
  const total = subtotal > 0 ? subtotal + deliveryFee : 0;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet."
          icon={<ShoppingBag className="h-12 w-12 text-gray-300" />}
          action={
            <Button onClick={() => router.push("/search")}>
              Start Shopping
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl font-bold text-[#111827] mb-8">Your Cart ({totalItems})</h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Cart Items List */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
            <ul className="divide-y divide-[#E5E7EB]">
              {items.map((item) => (
                <li key={item.id} className="p-4 sm:p-6 flex gap-4 sm:gap-6">
                  {/* Item Image */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-[#E5E7EB]">
                    <Image 
                      src={item.image || "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=200&q=80"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link href={`/product/${item.productId}`} className="font-semibold text-[#111827] hover:text-[#0D6E6E] line-clamp-2">
                          {item.name}
                        </Link>
                        {item.variantId && (
                          <p className="text-sm text-[#6B7280] mt-1">Variant: {item.variantId}</p>
                        )}
                        <p className="text-sm text-[#6B7280] mt-1">LKR {item.unitPrice.toLocaleString()} each</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-[#9CA3AF] hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      {/* Quantity Control */}
                      <div className="flex items-center border border-[#E5E7EB] rounded-lg overflow-hidden h-9 bg-white shrink-0">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-9 h-full flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <div className="w-10 text-center text-sm font-semibold text-[#111827]">
                          {item.quantity}
                        </div>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-9 h-full flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="font-bold text-[#111827]">
                        LKR {(item.unitPrice * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sticky top-24">
            <h2 className="text-xl font-bold text-[#111827] mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm text-[#374151] mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>LKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>LKR {deliveryFee.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="border-t border-[#E5E7EB] pt-4 mb-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-base font-bold text-[#111827]">Total</span>
                <span className="text-xl font-bold text-[#0D6E6E]">LKR {total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-[#6B7280]">Includes VAT where applicable</p>
            </div>

            <Button 
              size="lg" 
              className="w-full h-14"
              onClick={() => router.push("/checkout")}
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
