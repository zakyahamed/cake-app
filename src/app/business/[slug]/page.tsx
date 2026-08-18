"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Star, MapPin, Clock, Phone, Globe, Mail } from "lucide-react";
import { useBusiness, useBusinessProducts, useBusinessServices } from "@/features/discovery/hooks";
import { Button } from "@/components/ui";
import { LoadingState, EmptyState } from "@/components/ui/States";

export default function BusinessProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();

  const { data: business, isLoading, isError } = useBusiness(slug);
  const { data: productResult, isLoading: isLoadingProducts } = useBusinessProducts(business?.id);
  const { data: serviceResult, isLoading: isLoadingServices } = useBusinessServices(business?.id);

  useEffect(() => {
    if (isError) {
      router.push("/404");
    }
  }, [isError, router]);

  if (isLoading) {
    return <LoadingState message="Loading business profile..." className="py-20" />;
  }

  if (!business) return null;

  const products = productResult?.data || [];
  const services = serviceResult?.data || [];

  return (
    <div className="pb-20">
      {/* Cover Photo */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gray-200">
        <Image
          src={business.coverImage || "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80"}
          alt={business.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#E5E7EB] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-end">
          
          <div className="flex-1 mt-4 md:mt-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#111827]">{business.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-[#6B7280] text-sm">
                  <div className="flex items-center gap-1 text-green-700 font-semibold bg-green-50 px-2 py-1 rounded-md">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{business.rating.toFixed(1)}</span>
                    <span className="text-green-600 font-normal">({business.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {business.location.city}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" className="w-full md:w-auto">
                  Message
                </Button>
                <Button className="w-full md:w-auto">
                  Order Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Products/Services) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* About */}
            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-4">About</h2>
              <p className="text-[#6B7280] leading-relaxed">
                {business.description}
              </p>
            </section>

            {/* Offerings */}
            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-6">Our Offerings</h2>
              
              {isLoadingProducts || isLoadingServices ? (
                <LoadingState message="Loading catalog..." className="py-10" />
              ) : products.length === 0 && services.length === 0 ? (
                <EmptyState
                  title="No items found"
                  description="This business hasn't added any products or services yet."
                />
              ) : (
                <div className="space-y-8">
                  {/* Products */}
                  {products.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-[#374151] mb-4 border-b pb-2">Products</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {products.map((product) => (
                          <div key={product.id} className="flex gap-4 p-4 border border-[#E5E7EB] rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                              <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <div className="flex flex-col justify-between">
                              <div>
                                <h4 className="font-semibold text-[#111827] line-clamp-1">{product.name}</h4>
                                <p className="text-sm text-[#6B7280] line-clamp-2 mt-1">{product.description}</p>
                              </div>
                              <p className="font-bold text-[#0D6E6E]">LKR {product.basePrice.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Services */}
                  {services.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-[#374151] mb-4 border-b pb-2">Services</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {services.map((service) => (
                          <div key={service.id} className="flex gap-4 p-4 border border-[#E5E7EB] rounded-xl hover:shadow-md transition-shadow cursor-pointer group">
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                              <Image src={service.images[0]} alt={service.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <div className="flex flex-col justify-between">
                              <div>
                                <h4 className="font-semibold text-[#111827] line-clamp-1">{service.name}</h4>
                                <p className="text-sm text-[#6B7280] line-clamp-2 mt-1">{service.description}</p>
                              </div>
                              <p className="font-bold text-[#0D6E6E]">From LKR {service.startingPrice.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Contact Info */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h3 className="font-bold text-[#111827] mb-4">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start text-[#6B7280] text-sm">
                  <MapPin className="h-5 w-5 mr-3 shrink-0 text-[#9CA3AF]" />
                  <span>{business.location.address}<br/>{business.location.city}</span>
                </li>
                {business.contactInformation.phone && (
                  <li className="flex items-center text-[#6B7280] text-sm">
                    <Phone className="h-5 w-5 mr-3 shrink-0 text-[#9CA3AF]" />
                    <span>{business.contactInformation.phone}</span>
                  </li>
                )}
                {business.contactInformation.email && (
                  <li className="flex items-center text-[#6B7280] text-sm">
                    <Mail className="h-5 w-5 mr-3 shrink-0 text-[#9CA3AF]" />
                    <span className="truncate">{business.contactInformation.email}</span>
                  </li>
                )}
                {business.contactInformation.website && (
                  <li className="flex items-center text-[#0D6E6E] text-sm">
                    <Globe className="h-5 w-5 mr-3 shrink-0 text-[#0D6E6E]" />
                    <a href={business.contactInformation.website} target="_blank" rel="noreferrer" className="hover:underline truncate">
                      {business.contactInformation.website.replace(/^https?:\/\//, '')}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Operating Hours */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-[#111827] mr-2" />
                <h3 className="font-bold text-[#111827]">Operating Hours</h3>
              </div>
              <ul className="space-y-2 text-sm">
                {business.openingHours.map((hours) => (
                  <li key={hours.day} className="flex justify-between">
                    <span className="text-[#6B7280] capitalize">{hours.day.toLowerCase()}</span>
                    <span className="font-medium text-[#374151]">
                      {!hours.isOpen ? "Closed" : `${hours.openTime} - ${hours.closeTime}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
