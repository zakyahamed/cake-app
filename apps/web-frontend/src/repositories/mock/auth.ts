import { mockUsers } from "@/mock-data";
import { UserRole } from "@/domain/enums";
import type { User } from "@/domain/types";
import type { AuthRepository } from "../interfaces/auth";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Session key for localStorage persistence
const SESSION_KEY = "marketplace_mock_user_id";

// The development account — always succeeds
const DEV_EMAIL = "customer@example.com";
const DEV_PASSWORD = "password";
const DEV_USER_ID = "user-01";

let users: User[] = [...mockUsers];

export class MockAuthRepository implements AuthRepository {
  async login(email: string, password: string): Promise<User> {
    await delay(600);

    // Dev account shortcut
    if (email === DEV_EMAIL && password === DEV_PASSWORD) {
      const user = users.find((u) => u.id === DEV_USER_ID);
      if (user) {
        if (typeof window !== "undefined") {
          localStorage.setItem(SESSION_KEY, user.id);
        }
        return user;
      }
    }

    // Check other mock users (any password accepted)
    const user = users.find((u) => u.email === email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(SESSION_KEY, user.id);
    }
    return user;
  }

  async logout(): Promise<void> {
    await delay(200);
    if (typeof window !== "undefined") {
      localStorage.removeItem(SESSION_KEY);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    await delay(100);
    if (typeof window === "undefined") return null;
    const userId = localStorage.getItem(SESSION_KEY);
    if (!userId) return null;
    return users.find((u) => u.id === userId) ?? null;
  }

  async register(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<User> {
    await delay(700);

    const exists = users.find((u) => u.email === data.email);
    if (exists) throw new Error("An account with this email already exists");

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: UserRole.CUSTOMER,
      addresses: [],
      createdAt: new Date().toISOString(),
    };

    users = [...users, newUser];

    if (typeof window !== "undefined") {
      localStorage.setItem(SESSION_KEY, newUser.id);
    }
    return newUser;
  }
}
