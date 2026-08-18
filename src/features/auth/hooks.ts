import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authRepository } from "@/repositories";
import { useAuthStore } from "@/stores/authStore";
import type { LoginInput, RegisterInput } from "@/domain/schemas";
import { useRouter } from "next/navigation";

export const authKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authKeys.all, "currentUser"] as const,
};

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: LoginInput) => authRepository.login(data.email, data.password),
    onSuccess: (user) => {
      setUser(user);
    },
  });
}

export function useRegister() {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: RegisterInput) => authRepository.register(data),
    onSuccess: (user) => {
      setUser(user);
    },
  });
}

export function useLogout() {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authRepository.logout(),
    onSuccess: () => {
      setUser(null);
      queryClient.clear(); // Clear all cached data
      router.push("/");
    },
  });
}

export function useCurrentUser() {
  const { setUser, setLoading } = useAuthStore();

  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: async () => {
      try {
        const user = await authRepository.getCurrentUser();
        setUser(user);
        return user;
      } finally {
        setLoading(false);
      }
    },
    staleTime: Infinity, // Avoid refetching unless manually invalidated
  });
}
