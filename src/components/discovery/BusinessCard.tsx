import Link from "next/link";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { FulfilmentMethod } from "@/domain/enums";
import type { Business } from "@/domain/types";

export function BusinessCard({ business }: { business: Business }) {
  return (
    <Link href={`/business/${business.slug}`} className="group block h-full">
      <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        {/* Cover Image */}
        <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
          <Image
            src={business.coverImage || "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80"}
            alt={business.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {business.featured && (
            <div className="absolute top-4 left-4 bg-[#F5A623] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-[#111827] text-lg leading-tight line-clamp-1 group-hover:text-[#0D6E6E] transition-colors">
              {business.name}
            </h3>
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md">
              <Star className="h-3.5 w-3.5 text-green-600 fill-current" />
              <span className="text-sm font-semibold text-green-700">
                {business.rating.toFixed(1)}
              </span>
            </div>
          </div>
          
          <p className="text-sm text-[#6B7280] line-clamp-2 mb-4 flex-grow">
            {business.description}
          </p>
          
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-sm text-[#6B7280]">
            <MapPin className="h-4 w-4 mr-1 text-[#0D6E6E]" />
            <span className="truncate">{business.location.city}</span>
            <span className="mx-2">•</span>
            <span className="truncate">{business.deliveryOptions.includes(FulfilmentMethod.BUSINESS_DELIVERY) || business.deliveryOptions.includes(FulfilmentMethod.PLATFORM_DELIVERY) ? "Delivery available" : "Pickup only"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
