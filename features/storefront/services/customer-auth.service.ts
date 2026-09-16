// ============================================================
// CARTICOM — Storefront Customer Auth
// Store-scoped customer accounts. Separate from the business
// owner session: token lives in its own localStorage key.
// Also integrates with the shared axios instance for API calls.
// ============================================================

import { setAccessToken, setRefreshTokenValue } from '@/lib/axios';

const CUSTOMER_TOKEN_KEY = 'carticom_customer_token';
const CUSTOMER_REFRESH_KEY = 'carticom_customer_refresh';
const CUSTOMER_USER_KEY = 'carticom_customer_user';

export interface CustomerAuthData {
  accessToken?: string;
  refreshToken?: string;
  id?: string;
  email?: string;
  fullName?: string;
  role?: string;
  tenantId?: string;
}

export interface CustomerProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  storeId: string;
}

export function getCustomerToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(CUSTOMER_TOKEN_KEY);
}

export function getCustomerUser(): CustomerAuthData | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(CUSTOMER_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CustomerAuthData;
  } catch {
    return null;
  }
}

export function clearCustomerSession(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(CUSTOMER_TOKEN_KEY);
  window.localStorage.removeItem(CUSTOMER_REFRESH_KEY);
  window.localStorage.removeItem(CUSTOMER_USER_KEY);
  setAccessToken(null);
  setRefreshTokenValue(null);
}

function persist(data: CustomerAuthData): CustomerAuthData {
  if (data.accessToken) {
    window.localStorage.setItem(CUSTOMER_TOKEN_KEY, data.accessToken);
    setAccessToken(data.accessToken);
  }
  if (data.refreshToken) {
    window.localStorage.setItem(CUSTOMER_REFRESH_KEY, data.refreshToken);
    setRefreshTokenValue(data.refreshToken);
  }
  window.localStorage.setItem(CUSTOMER_USER_KEY, JSON.stringify(data));
  return data;
}

/** Restore customer session into axios on page load */
export function restoreCustomerSession(): void {
  const token = getCustomerToken();
  if (token) {
    setAccessToken(token);
  }
}

async function parse(res: Response): Promise<CustomerAuthData> {
  const body = await res.json().catch(() => null);
  if (!res.ok || body?.success === false) {
    throw new Error(body?.message || 'Request failed. Please try again.');
  }
  const data = (body?.data ?? body) as CustomerAuthData;
  if (!data || typeof data !== 'object') {
    throw new Error('Unexpected response from server.');
  }
  return data;
}

export async function registerCustomer(
  storeId: string,
  dto: { fullName: string; email: string; password: string; phone?: string }
): Promise<CustomerAuthData> {
  const res = await fetch(`/api/v1/storefront/customers/${storeId}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  const data = await parse(res);
  return persist({ ...data, email: dto.email, fullName: dto.fullName });
}

export async function loginCustomer(
  storeId: string,
  dto: { email: string; password: string }
): Promise<CustomerAuthData> {
  const res = await fetch(`/api/v1/storefront/customers/${storeId}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  const data = await parse(res);
  return persist(data);
}

export async function getCustomerProfile(): Promise<CustomerProfile | null> {
  const token = getCustomerToken();
  if (!token) return null;
  const res = await fetch('/api/v1/storefront/customers/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const body = await res.json().catch(() => null);
  return (body?.data ?? null) as CustomerProfile | null;
}
