"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { LoadingState } from "@/components/ui/States";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !user) {
      // Redirect to login and capture the intended destination
      const callbackUrl = encodeURIComponent(pathname);
      router.replace(`/login?callbackUrl=${callbackUrl}`);
    }
  }, [user, isLoading, router, pathname, mounted]);

  // Show a loading state until we're mounted and the auth store has finished its initial load
  if (!mounted || isLoading) {
    return <LoadingState message="Loading your profile…" className="h-[60vh]" />;
  }

  // If we have a user, render the children
  if (user) {
    return <>{children}</>;
  }

  // Fallback (e.g., during redirect)
  return null;
}
