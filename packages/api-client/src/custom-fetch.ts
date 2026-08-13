const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8787';

export async function customFetch<T>(
  url: string,
  options: RequestInit,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export default customFetch;