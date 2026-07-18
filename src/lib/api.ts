export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002";

export async function apiFetch(path: string, options?: RequestInit) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options?.headers as Record<string, string>) || {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (res.status === 401 && typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error("Sesion expirada");
  }
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Error del servidor" }));
    throw new Error(error.detail || "Error del servidor");
  }
  return res.json();
}
