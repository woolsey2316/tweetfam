import { fetchWithTokenRefresh } from './authenticatedFetch';

const API_BASE = import.meta.env.VITE_API_ORIGIN;

// Helper to parse JSON response
async function parseResponse<T>(response: Response): Promise<T> {
  return response.json();
}

// GET request
export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await fetchWithTokenRefresh(`${API_BASE}${endpoint}`, {
    method: 'GET',
  });
  return parseResponse<T>(response);
}

// POST request
export async function apiPost<T>(endpoint: string, data?: any): Promise<T> {
  const response = await fetchWithTokenRefresh(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  return parseResponse<T>(response);
}

// POST with FormData
export async function apiPostFormData<T>(endpoint: string, formData: FormData): Promise<T> {
  const response = await fetchWithTokenRefresh(`${API_BASE}${endpoint}`, {
    method: 'POST',
    body: formData,
  });
  return parseResponse<T>(response);
}

// PATCH request
export async function apiPatch<T>(endpoint: string, data?: any): Promise<T> {
  const response = await fetchWithTokenRefresh(`${API_BASE}${endpoint}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  return parseResponse<T>(response);
}

// DELETE request
export async function apiDelete<T>(endpoint: string): Promise<T> {
  const response = await fetchWithTokenRefresh(`${API_BASE}${endpoint}`, {
    method: 'DELETE',
  });
  return parseResponse<T>(response);
}
