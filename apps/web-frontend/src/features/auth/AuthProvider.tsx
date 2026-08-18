"use client";

import { useCurrentUser } from "./hooks";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // This hook call will run once on mount (because of staleTime: Infinity)
  // and initialize the authStore.
  useCurrentUser();

  // We simply render children. The ProtectedRoute component will handle
  // showing a loading state if someone navigates directly to a protected route
  // before this query resolves.
  return <>{children}</>;
}
