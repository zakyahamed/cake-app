import type { User } from "@/domain/types";

export interface AuthRepository {
  login(email: string, password: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  register(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<User>;
  updateProfile(data: { name: string; phone: string }): Promise<User>;
  requestPasswordReset(
    email: string,
  ): Promise<{ message: string; resetToken?: string }>;
  resetPassword(token: string, password: string): Promise<void>;
}
