import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#0D6E6E] text-white hover:bg-[#1A9696] active:bg-[#094D4D] focus-visible:ring-[#0D6E6E]",
  secondary:
    "bg-[#F5A623] text-white hover:bg-[#FBBF52] active:bg-[#D4881A] focus-visible:ring-[#F5A623]",
  ghost:
    "bg-transparent text-[#111827] hover:bg-[#F7F8FA] active:bg-[#E5E7EB] focus-visible:ring-[#0D6E6E]",
  danger:
    "bg-[#DC2626] text-white hover:bg-red-500 active:bg-red-700 focus-visible:ring-red-500",
  outline:
    "border border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F7F8FA] active:bg-[#E5E7EB] focus-visible:ring-[#0D6E6E]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "active:scale-[0.97]",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        ) : leftIcon ? (
          <span aria-hidden="true">{leftIcon}</span>
        ) : null}
        {children}
        {!isLoading && rightIcon ? (
          <span aria-hidden="true">{rightIcon}</span>
        ) : null}
      </button>
    );
  }
);
Button.displayName = "Button";
