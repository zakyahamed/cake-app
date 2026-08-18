"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Calendar, Clock } from "lucide-react";
import { useService } from "@/features/catalog/hooks";
import { useBusiness } from "@/features/discovery/hooks";
import { Button } from "@/components/ui/Button";
import { LoadingState } from "@/components/ui/States";

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  
  const { data: service, isLoading, isError } = useService(id);
  const { data: business } = useBusiness(service?.businessId || "");

  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    if (isError) {
      router.push("/404");
    }
  }, [isError, router]);

  if (isLoading) {
    return <LoadingState message="Loading service details..." className="py-20" />;
  }

  if (!service) return null;

  // Mock time slots based on availability for UI purposes
  const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM", "05:00 PM"];

  const handleBookNow = () => {
    if (!date || !time) return;
    
    // In Phase 5, this will route to Checkout with these params
    router.push(`/checkout?serviceId=${service.id}&date=${date}&time=${time}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        
        {/* Images */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-[#E5E7EB]">
            <Image
              src={service.images[0] || "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80"}
              alt={service.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {service.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {service.images.slice(1, 5).map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-[#E5E7EB]">
                  <Image src={img} alt={`${service.name} ${idx + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details & Booking */}
        <div className="w-full md:w-1/2 flex flex-col">
          {business && (
            <div className="mb-2">
              <span className="text-sm font-medium text-[#0D6E6E] hover:underline cursor-pointer" onClick={() => router.push(`/business/${business.slug}`)}>
                {business.name}
              </span>
            </div>
          )}
          
          <h1 className="text-3xl font-bold text-[#111827] mb-2">{service.name}</h1>
          
          <div className="flex items-center gap-4 mb-6 text-sm text-[#6B7280]">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-[#F5A623] fill-current mr-1" />
              <span className="font-medium text-[#374151] mr-1">{service.rating.toFixed(1)}</span>
              <span>({service.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-[#9CA3AF]" />
              <span>{service.durationMinutes} mins</span>
            </div>
          </div>

          <p className="text-3xl font-bold text-[#111827] mb-6">
            From LKR {service.startingPrice.toLocaleString()}
          </p>

          <p className="text-[#6B7280] leading-relaxed mb-8 pb-8 border-b border-[#E5E7EB]">
            {service.description}
          </p>

          {/* Booking Section */}
          <div className="bg-[#F7F8FA] rounded-2xl p-6 border border-[#E5E7EB]">
            <h3 className="text-lg font-bold text-[#111827] mb-6">Schedule Appointment</h3>
            
            <div className="space-y-6">
              {/* Date */}
              <div>
                <label className="flex items-center text-sm font-medium text-[#374151] mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-[#6B7280]" />
                  Select Date
                </label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#0D6E6E] focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className="flex items-center text-sm font-medium text-[#374151] mb-2">
                  <Clock className="h-4 w-4 mr-2 text-[#6B7280]" />
                  Select Time
                </label>
                {date ? (
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setTime(slot)}
                        className={`py-2 rounded-xl border text-sm font-medium transition-all ${
                          time === slot
                            ? "border-[#0D6E6E] bg-[#0D6E6E]/5 text-[#0D6E6E] ring-1 ring-[#0D6E6E]"
                            : "border-[#E5E7EB] text-[#374151] hover:border-[#9CA3AF] bg-white"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-[#6B7280] bg-white p-4 rounded-xl border border-[#E5E7EB] text-center">
                    Please select a date first to view available times.
                  </div>
                )}
              </div>

              <Button 
                size="lg" 
                className="w-full h-14 text-base mt-2"
                disabled={!date || !time}
                onClick={handleBookNow}
              >
                Book Now
              </Button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
