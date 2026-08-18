"use client";

import Link from "next/link";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BusinessCard } from "@/components/discovery/BusinessCard";
import { useCategories, useFeaturedBusinesses } from "@/features/discovery/hooks";
import { LoadingState } from "@/components/ui/States";

export default function Home() {
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const { data: featuredBusinesses = [], isLoading: isLoadingFeatured } = useFeaturedBusinesses(6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#0D6E6E] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D6E6E]/90 to-[#0D6E6E]"></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5A623]" />
            Discover Sri Lanka&apos;s finest local businesses
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Your local marketplace,
            <br className="hidden sm:block" />
            <span className="text-[#F5A623]"> delivered to your door</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            From homemade cakes to custom jewelry, support local artisans and get unique products delivered same-day.
          </p>

          <div className="bg-white p-2 rounded-2xl shadow-xl max-w-3xl mx-auto flex flex-col sm:flex-row gap-2">
            <div className="flex-grow flex items-center bg-gray-50 rounded-xl px-4 py-2 border border-gray-100">
              <Search className="h-5 w-5 text-gray-400 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-transparent border-none outline-none w-full text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="flex-grow sm:max-w-[200px] flex items-center bg-gray-50 rounded-xl px-4 py-2 border border-gray-100">
              <MapPin className="h-5 w-5 text-gray-400 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Location"
                className="bg-transparent border-none outline-none w-full text-gray-900 placeholder-gray-500"
              />
            </div>
            <Link href="/search" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-12 rounded-xl">
                Search
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#111827]">Explore Categories</h2>
              <p className="text-[#6B7280] mt-1 text-sm">Find exactly what you need</p>
            </div>
            <Link
              href="/categories"
              className="hidden sm:flex items-center text-sm font-semibold text-[#0D6E6E] hover:text-[#0a5858] transition-colors"
            >
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {isLoadingCategories ? (
            <LoadingState message="Loading categories..." className="py-12" />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group flex flex-col items-center p-6 rounded-2xl bg-[#F7F8FA] hover:bg-white hover:shadow-md hover:ring-1 hover:ring-[#E5E7EB] transition-all"
                >
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-2xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    {/* Assuming icon is an emoji in mock data */}
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium text-[#374151] text-center">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
          
          <Link
            href="/categories"
            className="sm:hidden mt-6 flex justify-center items-center text-sm font-semibold text-[#0D6E6E]"
          >
            View all categories <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Featured Businesses Section */}
      <section className="py-16 bg-[#F7F8FA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#111827]">Featured Businesses</h2>
              <p className="text-[#6B7280] mt-1 text-sm">Top rated local favorites</p>
            </div>
            <Link
              href="/search"
              className="hidden sm:flex items-center text-sm font-semibold text-[#0D6E6E] hover:text-[#0a5858] transition-colors"
            >
              Browse all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {isLoadingFeatured ? (
            <LoadingState message="Loading businesses..." className="py-12" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0D6E6E] rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row">
            <div className="p-10 md:p-12 md:w-3/5 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Are you a local business owner?
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Join our marketplace to reach thousands of local customers, manage orders easily, and grow your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-[#0D6E6E] bg-white hover:bg-gray-50">
                  Register Business
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:block md:w-2/5 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
