import axiosInstance from '@/lib/axios';
import type { ApiResponse } from '@/lib/dal/types';
import type { GuestCheckoutRequest, GuestCheckoutResponse, GuestOrderTrackResponse } from '@/features/dashboard/types/guest-checkout.types';

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
      `/api/v1/guest-checkout/orders/${reference}/track`
    );
    return response.data.data as GuestOrderTrackResponse;
  }
}

export const guestCheckoutRepository = new GuestCheckoutRepository();
