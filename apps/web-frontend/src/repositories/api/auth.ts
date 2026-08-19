import type { AuthRepository } from '../interfaces/auth';
import type { User } from '@/domain/types';
import { apiClient, setAccessToken, setRefreshToken, getAccessToken } from './client';
import { UserRole } from '@/domain/enums';

export class ApiAuthRepository implements AuthRepository {
  async login(email: string, password: string): Promise<User> {
    const result = await apiClient.post<{ accessToken: string; refreshToken: string }>('/auth/login', { email, password });
    setAccessToken(result.accessToken);
    setRefreshToken(result.refreshToken);
    return this.getCurrentUser() as Promise<User>;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch { /* ignore */ }
    setAccessToken(null);
    setRefreshToken(null);
  }

  async getCurrentUser(): Promise<User | null> {
    const token = getAccessToken();
    if (!token) return null;
    try {
      const profile = await apiClient.get<any>('/users/me');
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        phone: profile.phone || '',
        role: profile.role as UserRole,
        addresses: [],
        createdAt: profile.createdAt,
      };
    } catch {
      return null;
    }
  }

  async register(data: { name: string; email: string; phone: string; password: string }): Promise<User> {
    const result = await apiClient.post<{ accessToken: string; refreshToken: string }>('/auth/register', data);
    setAccessToken(result.accessToken);
    setRefreshToken(result.refreshToken);
    return this.getCurrentUser() as Promise<User>;
  }
}
