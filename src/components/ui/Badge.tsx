import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "brand" | "amber" | "success" | "error" | "warning" | "neutral" | "outline";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  brand: "bg-[#0D6E6E]/10 text-[#0D6E6E]",
  amber: "bg-[#F5A623]/10 text-[#D4881A]",
  success: "bg-green-50 text-green-700",
  error: "bg-red-50 text-[#DC2626]",
  warning: "bg-amber-50 text-[#D97706]",
  neutral: "bg-[#F7F8FA] text-[#6B7280]",
  outline: "border border-[#E5E7EB] text-[#6B7280] bg-transparent",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-xs",
};

export function Badge({
  children,
  variant = "neutral",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
