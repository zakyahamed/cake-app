import type { AuthRepository } from "../interfaces/auth";
import type { User } from "@/domain/types";
import {
  apiClient,
  setAccessToken,
  setRefreshToken,
  getAccessToken,
} from "./client";
import { AddressType, UserRole } from "@/domain/enums";

export class ApiAuthRepository implements AuthRepository {
  async login(email: string, password: string): Promise<User> {
    const result = await apiClient.post<{
      accessToken: string;
      refreshToken: string;
    }>("/auth/login", { email, password });
    setAccessToken(result.accessToken);
    setRefreshToken(result.refreshToken);
    return this.getCurrentUser() as Promise<User>;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      /* ignore */
    }
    setAccessToken(null);
    setRefreshToken(null);
  }

  async getCurrentUser(): Promise<User | null> {
    const token = getAccessToken();
    if (!token) return null;
    try {
      const [profile, addresses] = await Promise.all([
        apiClient.get<any>("/users/me"),
        apiClient.get<any[]>("/users/me/addresses"),
      ]);
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        phone: profile.phone || "",
        role: profile.role as UserRole,
        addresses: addresses.map((address) => ({
          id: address.id,
          userId: address.userId,
          label: address.label || address.type || "Address",
          type: (address.type || AddressType.OTHER) as AddressType,
          line1: address.line1 || "",
          line2: address.line2 || undefined,
          city: address.city || "",
          district: address.district || address.state || "",
          postalCode: address.postalCode || undefined,
          isDefault: Boolean(address.isDefault),
        })),
        createdAt: profile.createdAt,
      };
    } catch {
      return null;
    }
  }

  async register(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<User> {
    const result = await apiClient.post<{
      accessToken: string;
      refreshToken: string;
    }>("/auth/register", data);
    setAccessToken(result.accessToken);
    setRefreshToken(result.refreshToken);
    return this.getCurrentUser() as Promise<User>;
  }

  async updateProfile(data: { name: string; phone: string }): Promise<User> {
    await apiClient.patch("/users/me", data);
    return this.getCurrentUser() as Promise<User>;
  }
}
