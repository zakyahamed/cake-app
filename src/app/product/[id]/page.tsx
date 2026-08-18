"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { useProduct } from "@/features/catalog/hooks";
import { useBusiness } from "@/features/discovery/hooks";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/Button";
import { LoadingState } from "@/components/ui/States";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  
  const { data: product, isLoading, isError } = useProduct(id);
  const { data: business } = useBusiness(product?.businessId || "");
  const addItem = useCartStore((state) => state.addItem);

  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (isError) {
      router.push("/404");
    }
  }, [isError, router]);

  // Set default variant
  useEffect(() => {
    if (product && product.variants.length > 0 && !selectedVariantId) {
      const availableVariant = product.variants.find((v) => v.isAvailable);
      if (availableVariant) {
        // eslint-disable-next-line
        setSelectedVariantId(availableVariant.id);
      }
    }
  }, [product, selectedVariantId]);

  if (isLoading) {
    return <LoadingState message="Loading product details..." className="py-20" />;
  }

  if (!product) return null;

  const activeVariant = product.variants.find((v) => v.id === selectedVariantId);
  const price = activeVariant ? activeVariant.price : product.basePrice;
  const isAvailable = product.isAvailable && (!product.variants.length || !!activeVariant);

  const handleAddToCart = () => {
    if (!isAvailable) return;
    
    addItem({
      productId: product.id,
      businessId: product.businessId,
      variantId: activeVariant?.id,
      quantity,
      unitPrice: price,
      name: product.name + (activeVariant ? ` - ${activeVariant.name}` : ""),
      image: product.images[0],
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        
        {/* Images */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-[#E5E7EB]">
            <Image
              src={product.images[0] || "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {product.images.slice(1, 5).map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-[#E5E7EB]">
                  <Image src={img} alt={`${product.name} ${idx + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          {business && (
            <div className="mb-2">
              <span className="text-sm font-medium text-[#0D6E6E] hover:underline cursor-pointer" onClick={() => router.push(`/business/${business.slug}`)}>
                {business.name}
              </span>
            </div>
          )}
          
          <h1 className="text-3xl font-bold text-[#111827] mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6 text-sm text-[#6B7280]">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-[#F5A623] fill-current mr-1" />
              <span className="font-medium text-[#374151] mr-1">{product.rating.toFixed(1)}</span>
              <span>({product.reviewCount} reviews)</span>
            </div>
          </div>

          <p className="text-3xl font-bold text-[#111827] mb-6">
            LKR {price.toLocaleString()}
          </p>

          <p className="text-[#6B7280] leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-[#374151] mb-3">Select Option</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariantId(variant.id)}
                    disabled={!variant.isAvailable}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                      selectedVariantId === variant.id
                        ? "border-[#0D6E6E] bg-[#0D6E6E]/5 text-[#0D6E6E] ring-1 ring-[#0D6E6E]"
                        : "border-[#E5E7EB] text-[#374151] hover:border-[#9CA3AF]"
                    } ${!variant.isAvailable ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Actions */}
          <div className="mt-auto border-t border-[#E5E7EB] pt-8">
            {isAvailable ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-[#E5E7EB] rounded-xl overflow-hidden h-14 bg-white shrink-0">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-full flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="w-12 text-center font-semibold text-[#111827]">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-full flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <Button 
                  size="lg" 
                  className={`flex-1 h-14 text-base ${isAdded ? "bg-green-600 hover:bg-green-700 text-white" : ""}`}
                  onClick={handleAddToCart}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl text-center font-medium">
                Currently Out of Stock
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
