import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRating } from "@/lib/utils";

interface RatingProps {
  value: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
}

const starSizes = { sm: "h-3 w-3", md: "h-4 w-4", lg: "h-5 w-5" };
const textSizes = { sm: "text-xs", md: "text-sm", lg: "text-base" };

export function Rating({
  value,
  reviewCount,
  size = "md",
  showCount = true,
  className,
}: RatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
        {stars.map((star) => (
          <Star
            key={star}
            className={cn(
              starSizes[size],
              star <= Math.round(value)
                ? "fill-[#F5A623] text-[#F5A623]"
                : "fill-[#E5E7EB] text-[#E5E7EB]"
            )}
          />
        ))}
      </div>
      <span className={cn("font-semibold text-[#111827]", textSizes[size])}>
        {formatRating(value)}
      </span>
      {showCount && reviewCount !== undefined && (
        <span className={cn("text-[#9CA3AF]", textSizes[size])}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}

interface StarInputProps {
  value: number;
  onChange: (value: number) => void;
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function StarInput({ value, onChange, size = "lg", label }: StarInputProps) {
  return (
    <div>
      {label && <p className="text-sm font-medium text-[#374151] mb-2">{label}</p>}
      <div className="flex items-center gap-1" role="group" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            aria-label={`${star} star${star !== 1 ? "s" : ""}`}
            onClick={() => onChange(star)}
            className="transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E6E] rounded"
          >
            <Star
              className={cn(
                starSizes[size],
                star <= value ? "fill-[#F5A623] text-[#F5A623]" : "fill-[#E5E7EB] text-[#E5E7EB]"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
