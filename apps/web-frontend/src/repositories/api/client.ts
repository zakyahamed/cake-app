// ---------------------------------------------------------------------------
// Central API client for all frontend repositories
// ---------------------------------------------------------------------------

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (token) {
    if (typeof window !== "undefined")
      localStorage.setItem("accessToken", token);
  } else {
    if (typeof window !== "undefined") localStorage.removeItem("accessToken");
  }
}

export function getAccessToken(): string | null {
  if (accessToken) return accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }
  return accessToken;
}

export function setRefreshToken(token: string | null) {
  if (typeof window !== "undefined") {
    if (token) localStorage.setItem("refreshToken", token);
    else localStorage.removeItem("refreshToken");
  }
}

export function getRefreshToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refreshToken");
  }
  return null;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  retry = true,
): Promise<T> {
  const token = getAccessToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401 && retry && path !== "/auth/refresh") {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshResponse.ok) {
          const tokens = (await refreshResponse.json()) as {
            accessToken: string;
            refreshToken: string;
          };
          setAccessToken(tokens.accessToken);
          setRefreshToken(tokens.refreshToken);
          return request<T>(path, options, false);
        }
      }
      setAccessToken(null);
      setRefreshToken(null);
    }
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `API Error: ${response.status}`);
  }

  // Handle 204 No Content
  if (response.status === 204) return {} as T;

  return response.json();
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
