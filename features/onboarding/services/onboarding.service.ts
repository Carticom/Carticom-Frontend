// ============================================================
// CARTICOM ONBOARDING — Service Layer (aligned with backend)
// ============================================================

import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/lib/dal/types';
import type {
  CreateStoreDto,
  UpdateStoreDto,
  StoreDto,
  CreateProductDto,
  ProductDto,
  WalletDto,
  OrderDto,
  PaymentDto,
  EscrowTransactionDto,
  CartDto,
} from '@/features/onboarding/types';

const API_PREFIX = '/api/v1';

// ─── Auth API ─────────────────────────────────────────────────

export const authApi = {
  register: (data: {
    fullName: string;
    businessName: string;
    email: string;
    password: string;
    phone?: string;
  }) =>
    axiosInstance.post<
      ApiResponse<{
        token: string;
        refreshToken: string;
        expiresIn: number;
        tokenType: string;
        userId: string;
        email: string;
        fullName: string;
        role: string;
      }>
    >(`${API_PREFIX}/auth/register`, data),

  login: (data: { email: string; password: string }) =>
    axiosInstance.post<
      ApiResponse<{
        token: string;
        refreshToken: string;
        expiresIn: number;
        tokenType: string;
        userId: string;
        email: string;
        fullName: string;
        role: string;
      }>
    >(`${API_PREFIX}/auth/login`, data),

  refresh: (data: { refreshToken: string }) =>
    axiosInstance.post<
      ApiResponse<{
        token: string;
        refreshToken: string;
        expiresIn: number;
        tokenType: string;
        userId: string;
        email: string;
        fullName: string;
        role: string;
      }>
    >(`${API_PREFIX}/auth/refresh`, data),

  logout: () =>
    axiosInstance.post<ApiResponse<null>>(`${API_PREFIX}/auth/logout`),

  getMe: () =>
    axiosInstance.get<
      ApiResponse<{
        userId: string;
        email: string;
        fullName: string;
        role: string;
      }>
    >(`${API_PREFIX}/auth/me`),
};

// ─── Store API ────────────────────────────────────────────────

export const storeApi = {
  create: (data: CreateStoreDto) =>
    axiosInstance.post<ApiResponse<StoreDto>>(`${API_PREFIX}/stores`, data),

  getMyStores: () =>
    axiosInstance.get<ApiResponse<StoreDto[]>>(`${API_PREFIX}/stores`),

  getById: (id: string) =>
    axiosInstance.get<ApiResponse<StoreDto>>(`${API_PREFIX}/stores/${id}`),

  getBySlug: (slug: string) =>
    axiosInstance.get<ApiResponse<StoreDto>>(`${API_PREFIX}/stores/slug/${slug}`),

  update: (id: string, data: UpdateStoreDto) =>
    axiosInstance.put<ApiResponse<StoreDto>>(`${API_PREFIX}/stores/${id}`, data),

  delete: (id: string) =>
    axiosInstance.delete<ApiResponse<null>>(`${API_PREFIX}/stores/${id}`),

  updateStatus: (id: string, status: string) =>
    axiosInstance.patch<ApiResponse<StoreDto>>(
      `${API_PREFIX}/stores/${id}/status?status=${status}`
    ),
};

// ─── Product API ──────────────────────────────────────────────

export const productApi = {
  create: (data: CreateProductDto) =>
    axiosInstance.post<ApiResponse<ProductDto>>(`${API_PREFIX}/products`, data),

  getByStore: (storeId: string) =>
    axiosInstance.get<ApiResponse<ProductDto[]>>(
      `${API_PREFIX}/products/store/${storeId}`
    ),

  getActiveByStore: (storeId: string) =>
    axiosInstance.get<ApiResponse<ProductDto[]>>(
      `${API_PREFIX}/products/store/${storeId}/active`
    ),

  getById: (id: string) =>
    axiosInstance.get<ApiResponse<ProductDto>>(`${API_PREFIX}/products/${id}`),

  update: (id: string, data: Partial<CreateProductDto>) =>
    axiosInstance.put<ApiResponse<ProductDto>>(`${API_PREFIX}/products/${id}`, data),

  delete: (id: string) =>
    axiosInstance.delete<ApiResponse<null>>(`${API_PREFIX}/products/${id}`),

  updateInventory: (id: string, quantityDelta: number) =>
    axiosInstance.patch<ApiResponse<ProductDto>>(
      `${API_PREFIX}/products/${id}/inventory`,
      { quantityDelta }
    ),

  search: (query: string) =>
    axiosInstance.get<ApiResponse<ProductDto[]>>(
      `${API_PREFIX}/products/search?q=${encodeURIComponent(query)}`
    ),

  getByCategory: (categoryId: string) =>
    axiosInstance.get<ApiResponse<ProductDto[]>>(
      `${API_PREFIX}/products/category/${categoryId}`
    ),
};

// ─── Cart API ─────────────────────────────────────────────────

export const cartApi = {
  get: (storeId: string) =>
    axiosInstance.get<ApiResponse<CartDto>>(
      `${API_PREFIX}/cart?storeId=${storeId}`
    ),

  add: (data: { storeId: string; productId: string; quantity: number }) =>
    axiosInstance.post<ApiResponse<CartDto>>(`${API_PREFIX}/cart/add`, data),

  updateItem: (storeId: string, productId: string, quantity: number) =>
    axiosInstance.put<ApiResponse<CartDto>>(
      `${API_PREFIX}/cart/update?storeId=${storeId}&productId=${productId}&quantity=${quantity}`
    ),

  removeItem: (storeId: string, productId: string) =>
    axiosInstance.delete<ApiResponse<CartDto>>(
      `${API_PREFIX}/cart/remove?storeId=${storeId}&productId=${productId}`
    ),

  clear: (storeId: string) =>
    axiosInstance.delete<ApiResponse<null>>(
      `${API_PREFIX}/cart/clear?storeId=${storeId}`
    ),
};

// ─── Checkout / Orders API ────────────────────────────────────

export const checkoutApi = {
  checkout: (storeId: string, data?: {
    deliveryMethod?: string;
    notes?: string;
    couponCode?: string;
    shippingAddress?: {
      fullName: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      country?: string;
    };
  }) =>
    axiosInstance.post<ApiResponse<OrderDto>>(
      `${API_PREFIX}/checkout?storeId=${storeId}`,
      data || {}
    ),

  getMyOrders: () =>
    axiosInstance.get<ApiResponse<OrderDto[]>>(`${API_PREFIX}/checkout/orders`),

  getOrderById: (orderId: string) =>
    axiosInstance.get<ApiResponse<OrderDto>>(
      `${API_PREFIX}/checkout/orders/${orderId}`
    ),

  cancelOrder: (orderId: string) =>
    axiosInstance.post<ApiResponse<OrderDto>>(
      `${API_PREFIX}/checkout/orders/${orderId}/cancel`
    ),
};

// ─── Payments API ─────────────────────────────────────────────

export const paymentApi = {
  initiate: (data: { orderId: string; paymentMethod: string; paymentProvider: string }) =>
    axiosInstance.post<ApiResponse<PaymentDto>>(
      `${API_PREFIX}/payments/initiate`,
      data
    ),

  confirm: (data: { transactionId: string; status: string; providerReference: string }) =>
    axiosInstance.post<ApiResponse<PaymentDto>>(
      `${API_PREFIX}/payments/confirm`,
      data
    ),

  refund: (data: { transactionId: string; amount: number; reason: string }) =>
    axiosInstance.post<ApiResponse<PaymentDto>>(
      `${API_PREFIX}/payments/refund`,
      data
    ),
};

// ─── Wallet API ───────────────────────────────────────────────

export const walletApi = {
  getBalance: () =>
    axiosInstance.get<ApiResponse<WalletDto>>(`${API_PREFIX}/wallets/balance`),
};

// ─── Storefront API (public) ─────────────────────────────────

export const storefrontApi = {
  getStores: (q?: string) =>
    axiosInstance.get<ApiResponse<StoreDto[]>>(
      `${API_PREFIX}/storefront/stores${q ? `?q=${encodeURIComponent(q)}` : ''}`
    ),

  getStoreBySlug: (slug: string) =>
    axiosInstance.get<ApiResponse<StoreDto>>(
      `${API_PREFIX}/storefront/stores/${slug}`
    ),

  getStoreProducts: (slug: string) =>
    axiosInstance.get<ApiResponse<ProductDto[]>>(
      `${API_PREFIX}/storefront/stores/${slug}/products`
    ),

  getStoreCategories: (slug: string) =>
    axiosInstance.get<ApiResponse<unknown[]>>(
      `${API_PREFIX}/storefront/stores/${slug}/categories`
    ),

  search: (q: string) =>
    axiosInstance.get<ApiResponse<ProductDto[]>>(
      `${API_PREFIX}/storefront/search?q=${encodeURIComponent(q)}`
    ),
};

// ─── Escrow API ───────────────────────────────────────────────

export const escrowApi = {
  getByStore: (storeId: string) =>
    axiosInstance.get<ApiResponse<EscrowTransactionDto[]>>(
      `${API_PREFIX}/escrow/store/${storeId}`
    ),
};