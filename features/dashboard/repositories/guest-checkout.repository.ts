import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/lib/dal/types';
import type { GuestCheckoutRequest, GuestCheckoutResponse, GuestOrderTrackResponse, GuestPayRequest, GuestPayConfirmRequest, GuestPaymentResponse } from '@/features/dashboard/types/guest-checkout.types';

export class GuestCheckoutRepository {
  async create(data: GuestCheckoutRequest): Promise<GuestCheckoutResponse> {
    const response = await axiosInstance.post<ApiResponse<GuestCheckoutResponse>>(
      '/api/v1/guest-checkout',
      data
    );
    return response.data.data as GuestCheckoutResponse;
  }

  async track(reference: string): Promise<GuestOrderTrackResponse> {
    const response = await axiosInstance.get<ApiResponse<GuestOrderTrackResponse>>(
      `/api/v1/guest-checkout/track/${reference}`
    );
    return response.data.data as GuestOrderTrackResponse;
  }

  async pay(data: GuestPayRequest): Promise<GuestPaymentResponse> {
    const response = await axiosInstance.post<ApiResponse<GuestPaymentResponse>>(
      '/api/v1/guest-checkout/pay',
      data
    );
    return response.data.data as GuestPaymentResponse;
  }

  async payConfirm(data: GuestPayConfirmRequest): Promise<GuestPaymentResponse> {
    const response = await axiosInstance.post<ApiResponse<GuestPaymentResponse>>(
      '/api/v1/guest-checkout/pay/confirm',
      data
    );
    return response.data.data as GuestPaymentResponse;
  }
}

export const guestCheckoutRepository = new GuestCheckoutRepository();
