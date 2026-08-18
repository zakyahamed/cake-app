"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!id) {
    router.push("/");
    return null;
  }

  const isBooking = type === "booking";

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 sm:p-10 text-center border border-[#E5E7EB]">
        
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-[#111827] mb-2">
          {isBooking ? "Booking Confirmed!" : "Order Placed!"}
        </h1>
        
        <p className="text-[#6B7280] mb-8 text-lg">
          Thank you for your {isBooking ? "booking" : "purchase"}. We&apos;ve sent a confirmation email with details.
        </p>

        <div className="bg-[#F7F8FA] rounded-xl p-4 mb-8 border border-[#E5E7EB]">
          <p className="text-sm text-[#6B7280] mb-1">
            {isBooking ? "Booking Reference" : "Order Number"}
          </p>
          <p className="text-lg font-mono font-bold text-[#111827]">{id}</p>
        </div>

        <div className="space-y-4 flex flex-col">
          <Button 
            size="lg" 
            className="w-full h-14"
            onClick={() => router.push(isBooking ? "/profile/bookings" : "/profile/orders")}
          >
            View {isBooking ? "Booking" : "Order"} Details
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline"
            size="lg" 
            className="w-full h-14"
            onClick={() => router.push("/")}
          >
            Continue Shopping
          </Button>
        </div>

      </div>
    </div>
  );
}

import { Suspense } from "react";
import { LoadingState } from "@/components/ui/States";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading..." className="min-h-[60vh]" />}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
