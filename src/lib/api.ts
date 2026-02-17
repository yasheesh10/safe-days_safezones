export const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include", // safe even if you don't use cookies
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = (data as any)?.error || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data as T;
}
