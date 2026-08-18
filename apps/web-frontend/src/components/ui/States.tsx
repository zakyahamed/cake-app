import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#E5E7EB]", className)}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 space-y-3">
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Loading State
// ---------------------------------------------------------------------------

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = "Loading…",
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center py-16 gap-3", className)}
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-8 w-8 animate-spin text-[#0D6E6E]" />
      <p className="text-sm text-[#6B7280]">{message}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Empty State
// ---------------------------------------------------------------------------

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 gap-4 text-center px-4",
        className
      )}
    >
      {icon && (
        <div className="h-14 w-14 rounded-2xl bg-[#F7F8FA] flex items-center justify-center text-[#9CA3AF]">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <p className="text-base font-semibold text-[#111827]">{title}</p>
        {description && (
          <p className="text-sm text-[#6B7280] max-w-xs">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Error State
// ---------------------------------------------------------------------------

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 gap-4 text-center px-4",
        className
      )}
      role="alert"
    >
      <div className="h-14 w-14 rounded-2xl bg-red-50 flex items-center justify-center text-[#DC2626] text-2xl">
        ⚠
      </div>
      <div className="space-y-1">
        <p className="text-base font-semibold text-[#111827]">Unable to load</p>
        <p className="text-sm text-[#6B7280] max-w-xs">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm font-medium text-[#0D6E6E] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E6E] rounded"
        >
          Try again
        </button>
      )}
    </div>
  );
}
