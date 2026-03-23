const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export function getBaseUrl() {
  return baseUrl;
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    ...init,
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${path}`);
  }

  return response.json();
}
