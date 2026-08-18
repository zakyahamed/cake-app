"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search as SearchIcon, Filter } from "lucide-react";
import { useSearch } from "@/features/discovery/hooks";
import { BusinessCard } from "@/components/discovery/BusinessCard";
import { CategoryCard } from "@/components/discovery/CategoryCard";
import { Input, Button } from "@/components/ui";
import { LoadingState, EmptyState } from "@/components/ui/States";

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [inputValue, setInputValue] = useState(queryParam);
  
  // Sync input value with URL changes
  useEffect(() => {
    // eslint-disable-next-line
    setInputValue(queryParam);
  }, [queryParam]);

  const { data: results, isLoading, isError } = useSearch({ query: queryParam, limit: 10 });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    } else {
      router.push("/search");
    }
  };

  const hasResults =
    results &&
    (results.businesses.length > 0 ||
      results.products.length > 0 ||
      results.services.length > 0 ||
      results.categories.length > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Search Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#111827] mb-6">Search</h1>
        
        <form onSubmit={handleSearch} className="flex gap-4 w-full max-w-2xl">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search for businesses, cakes, jewelry..."
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
          <Button type="button" variant="outline" className="px-3 shrink-0">
            <Filter className="h-5 w-5" />
          </Button>
        </form>
      </div>

      {!queryParam ? (
        <EmptyState
          title="What are you looking for?"
          description="Enter a search term above to find the best local businesses and products."
          icon={<SearchIcon className="h-12 w-12 text-gray-300" />}
        />
      ) : isLoading ? (
        <LoadingState message="Searching..." className="py-20" />
      ) : isError ? (
        <EmptyState
          title="Search failed"
          description="There was an error performing your search. Please try again."
        />
      ) : !hasResults ? (
        <EmptyState
          title="No results found"
          description={`We couldn't find anything matching "${queryParam}". Try adjusting your search term.`}
        />
      ) : (
        <div className="space-y-12">
          
          {/* Categories */}
          {results.categories.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-4">Categories</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {results.categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </section>
          )}

          {/* Businesses */}
          {results.businesses.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-4">Businesses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.businesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </section>
          )}

          {/* Products & Services */}
          {(results.products.length > 0 || results.services.length > 0) && (
            <section>
              <h2 className="text-xl font-bold text-[#111827] mb-4">Items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {results.products.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`} className="group">
                    <div className="flex gap-4 p-4 border border-[#E5E7EB] rounded-xl hover:shadow-md transition-shadow bg-white h-full">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div>
                          <h4 className="font-semibold text-[#111827] line-clamp-1 group-hover:text-[#0D6E6E]">{product.name}</h4>
                          <p className="text-xs text-[#6B7280] line-clamp-1 mt-1">{product.businessId}</p>
                        </div>
                        <p className="font-bold text-[#0D6E6E] text-sm mt-2">LKR {product.basePrice.toLocaleString()}</p>
                      </div>
                    </div>
                  </Link>
                ))}

                {results.services.map((service) => (
                  <Link key={service.id} href={`/service/${service.id}`} className="group">
                    <div className="flex gap-4 p-4 border border-[#E5E7EB] rounded-xl hover:shadow-md transition-shadow bg-white h-full">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                        <Image src={service.images[0]} alt={service.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div>
                          <h4 className="font-semibold text-[#111827] line-clamp-1 group-hover:text-[#0D6E6E]">{service.name}</h4>
                          <p className="text-xs text-[#6B7280] line-clamp-1 mt-1">{service.businessId}</p>
                        </div>
                        <p className="font-bold text-[#0D6E6E] text-sm mt-2">From LKR {service.startingPrice.toLocaleString()}</p>
                      </div>
                    </div>
                  </Link>
                ))}

              </div>
            </section>
          )}

        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingState message="Preparing search..." className="py-20" />}>
      <SearchPageContent />
    </Suspense>
  );
}
