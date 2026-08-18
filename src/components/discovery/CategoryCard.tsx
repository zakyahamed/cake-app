import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/domain/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-[#E5E7EB] hover:border-[#0D6E6E] hover:shadow-md transition-all duration-200"
    >
      <div className="relative h-16 w-16 mb-4 overflow-hidden rounded-full bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
        <Image
          src={category.image || "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=200&q=80"}
          alt={category.name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="font-semibold text-[#111827] text-center">{category.name}</h3>
      {category.description && (
        <p className="text-xs text-[#6B7280] text-center mt-2 line-clamp-2">
          {category.description}
        </p>
      )}
    </Link>
  );
}
