// ============================================================
// CARTICOM SUBSCRIPTION — Repository (aligned with backend)
// ============================================================

import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/lib/dal/types';
import type {
  SubscriptionDto,
  SubscriptionPlan,
  SubscriptionRequest,
  SubscriptionPaymentResponse} from '@/features/dashboard/types/subscription.types';

const BASE = '/api/v1/subscriptions';

export const subscriptionRepository = {
  getByStore: (storeId: string) =>
    axiosInstance
      .get<ApiResponse<SubscriptionDto>>(`${BASE}/store/${storeId}`)
      .then((res) => res.data.data as SubscriptionDto),

  getPlans: () =>
    axiosInstance
      .get<ApiResponse<SubscriptionPlan[]>>(`${BASE}/plans`)
      .then((res) => res.data.data ?? []),

  create: (storeId: string, data: SubscriptionRequest) =>
    axiosInstance
      .post<ApiResponse<SubscriptionDto>>(BASE, data, { params: { storeId } })
      .then((res) => res.data.data as SubscriptionDto),

  pay: (subscriptionId: string, data: SubscriptionRequest) =>
    axiosInstance
      .post<ApiResponse<SubscriptionPaymentResponse>>(`${BASE}/${subscriptionId}/pay`, data)
      .then((res) => res.data.data as SubscriptionPaymentResponse),

  upgrade: (subscriptionId: string, data: SubscriptionRequest) =>
    axiosInstance
      .post<ApiResponse<SubscriptionPaymentResponse>>(`${BASE}/${subscriptionId}/upgrade`, data)
      .then((res) => res.data.data as SubscriptionPaymentResponse),

  downgrade: (subscriptionId: string, data: SubscriptionRequest) =>
    axiosInstance
      .post<ApiResponse<SubscriptionPaymentResponse>>(`${BASE}/${subscriptionId}/downgrade`, data)
      .then((res) => res.data.data as SubscriptionPaymentResponse),

  cancel: (subscriptionId: string) =>
    axiosInstance
      .delete<ApiResponse<SubscriptionDto>>(`${BASE}/${subscriptionId}`)
      .then((res) => res.data.data as SubscriptionDto)};

export default subscriptionRepository;