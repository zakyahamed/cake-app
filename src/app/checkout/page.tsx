"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CreditCard, Truck, Store, Calendar, Clock } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { useService } from "@/features/catalog/hooks";
import { useSubmitOrder, useSubmitBooking } from "@/features/checkout/hooks";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FulfilmentMethod } from "@/domain/enums";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  const [mounted, setMounted] = useState(false);
  const { user } = useAuthStore();
  const { items, getSubtotal, clearCart } = useCartStore();

  const isBooking = !!serviceId;
  const { data: service } = useService(serviceId || "");
  
  const submitOrder = useSubmitOrder();
  const submitBooking = useSubmitBooking();

  const [fulfilment, setFulfilment] = useState<FulfilmentMethod>(FulfilmentMethod.BUSINESS_DELIVERY);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
    if (user) {
      if (user.addresses.length > 0) {
        setAddress(user.addresses[0].line1);
      }
      setPhone(user.phone);
    }
  }, [user]);

  if (!mounted) return null;

  // If standard checkout and cart is empty
  if (!isBooking && items.length === 0) {
    router.push("/cart");
    return null;
  }

  const subtotal = isBooking ? (service?.startingPrice || 0) : getSubtotal();
  const deliveryFee = fulfilment === FulfilmentMethod.PICKUP ? 0 : 350;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBooking) {
      const res = await submitBooking.mutateAsync({
        serviceId: serviceId!,
        date: date!,
        time: time!,
        totalAmount: total,
      });
      router.push(`/checkout/success?type=booking&id=${res.id}`);
    } else {
      const res = await submitOrder.mutateAsync({
        subtotal,
        deliveryFee,
        total,
        fulfilmentMethod: fulfilment,
      });
      clearCart();
      router.push(`/checkout/success?type=order&id=${res.id}`);
    }
  };

  const isSubmitting = submitOrder.isPending || submitBooking.isPending;

  return (
    <div className="bg-[#F7F8FA] min-h-screen py-8 md:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => router.back()}
          className="flex items-center text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        <h1 className="text-3xl font-bold text-[#111827] mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-2/3 space-y-6">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Fulfilment Method (Only for Orders) */}
              {!isBooking && (
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                  <h2 className="text-xl font-bold text-[#111827] mb-4">Delivery Method</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div 
                      className={`border rounded-xl p-4 cursor-pointer transition-all ${fulfilment === FulfilmentMethod.BUSINESS_DELIVERY ? 'border-[#0D6E6E] bg-[#0D6E6E]/5 ring-1 ring-[#0D6E6E]' : 'border-[#E5E7EB] hover:border-[#9CA3AF]'}`}
                      onClick={() => setFulfilment(FulfilmentMethod.BUSINESS_DELIVERY)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center font-semibold text-[#111827]">
                          <Truck className="h-5 w-5 mr-2 text-[#0D6E6E]" />
                          Delivery
                        </div>
                        <span className="text-sm font-medium text-[#0D6E6E]">LKR 350</span>
                      </div>
                      <p className="text-sm text-[#6B7280]">Delivered to your address</p>
                    </div>

                    <div 
                      className={`border rounded-xl p-4 cursor-pointer transition-all ${fulfilment === FulfilmentMethod.PICKUP ? 'border-[#0D6E6E] bg-[#0D6E6E]/5 ring-1 ring-[#0D6E6E]' : 'border-[#E5E7EB] hover:border-[#9CA3AF]'}`}
                      onClick={() => setFulfilment(FulfilmentMethod.PICKUP)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center font-semibold text-[#111827]">
                          <Store className="h-5 w-5 mr-2 text-[#0D6E6E]" />
                          Pickup
                        </div>
                        <span className="text-sm font-medium text-[#0D6E6E]">Free</span>
                      </div>
                      <p className="text-sm text-[#6B7280]">Pick up from the store</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking Schedule Info (Only for Bookings) */}
              {isBooking && (
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                  <h2 className="text-xl font-bold text-[#111827] mb-4">Appointment Schedule</h2>
                  <div className="flex items-center gap-6 p-4 bg-[#F7F8FA] rounded-xl border border-[#E5E7EB]">
                    <div className="flex items-center text-[#374151] font-medium">
                      <Calendar className="h-5 w-5 mr-2 text-[#0D6E6E]" />
                      {date}
                    </div>
                    <div className="flex items-center text-[#374151] font-medium">
                      <Clock className="h-5 w-5 mr-2 text-[#0D6E6E]" />
                      {time}
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Details */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                <h2 className="text-xl font-bold text-[#111827] mb-4">Contact Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Phone Number</label>
                    <Input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07XXXXXXXX" />
                  </div>
                  
                  {(!isBooking && fulfilment !== FulfilmentMethod.PICKUP) && (
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-1">Delivery Address</label>
                      <Input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, Colombo" />
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                <h2 className="text-xl font-bold text-[#111827] mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer ${paymentMethod === 'card' ? 'border-[#0D6E6E] bg-[#0D6E6E]/5' : 'border-[#E5E7EB]'}`}>
                    <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-4 h-4 text-[#0D6E6E] focus:ring-[#0D6E6E]" />
                    <CreditCard className="h-5 w-5 ml-3 mr-2 text-[#6B7280]" />
                    <span className="font-medium text-[#111827]">Credit / Debit Card</span>
                  </label>
                  
                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer ${paymentMethod === 'cash' ? 'border-[#0D6E6E] bg-[#0D6E6E]/5' : 'border-[#E5E7EB]'}`}>
                    <input type="radio" name="payment" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="w-4 h-4 text-[#0D6E6E] focus:ring-[#0D6E6E]" />
                    <span className="font-medium text-[#111827] ml-3">Cash on Delivery</span>
                  </label>
                </div>
              </div>

            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#111827] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {isBooking ? (
                  <div className="flex justify-between items-start text-sm">
                    <span className="font-medium text-[#374151]">{service?.name || "Service"}</span>
                    <span className="font-semibold text-[#111827]">LKR {subtotal.toLocaleString()}</span>
                  </div>
                ) : (
                  items.map(item => (
                    <div key={item.id} className="flex justify-between items-start text-sm">
                      <div className="flex-1 pr-4">
                        <span className="font-medium text-[#374151] line-clamp-1">{item.name}</span>
                        <span className="text-xs text-[#6B7280]">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-semibold text-[#111827] shrink-0">LKR {(item.unitPrice * item.quantity).toLocaleString()}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-3 text-sm text-[#374151] mb-6 pt-4 border-t border-[#E5E7EB]">
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
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-[#111827]">Total</span>
                  <span className="text-xl font-bold text-[#0D6E6E]">LKR {total.toLocaleString()}</span>
                </div>
              </div>

              <Button 
                type="submit"
                form="checkout-form"
                size="lg" 
                className="w-full h-14"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : `Pay LKR ${total.toLocaleString()}`}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
