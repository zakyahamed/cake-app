import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PriceProps {
  amount: number;
  prefix?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  compact?: boolean;
}

const sizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
  xl: "text-3xl",
};

export function Price({
  amount,
  prefix,
  size = "md",
  className,
  compact = false,
}: PriceProps) {
  return (
    <span
      className={cn("font-semibold text-[#0D6E6E]", sizeStyles[size], className)}
    >
      {prefix && <span className="text-[#9CA3AF] font-normal mr-1">{prefix}</span>}
      {formatPrice(amount, compact)}
    </span>
  );
}
