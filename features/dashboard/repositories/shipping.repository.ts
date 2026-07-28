import { BaseRepository } from '@/lib/dal/repository';
import axiosInstance from '@/lib/axios';
import type {
  ShippingZoneDto,
  CreateShippingZoneDto,
  UpdateShippingZoneDto,
  ShippingMethodDto,
  CreateShippingMethodDto,
  UpdateShippingMethodDto,
  ShippingRateRequest,
  ShippingRateResponse,
} from '@/features/dashboard/types/shipping.types';

export class ShippingRepository extends BaseRepository<ShippingZoneDto, CreateShippingZoneDto, UpdateShippingZoneDto> {
  constructor() {
    super({
      base: '/api/v1/shipping/zones',
      byId: (id) => `/api/v1/shipping/zones/${id}`,
    });
  }

  async getZones(): Promise<ShippingZoneDto[]> {
    return this.get<ShippingZoneDto[]>('/api/v1/shipping/zones');
  }

  async createZone(data: CreateShippingZoneDto): Promise<ShippingZoneDto> {
    return this.post<ShippingZoneDto>('/api/v1/shipping/zones', data);
  }

  async updateZone(id: string, data: UpdateShippingZoneDto): Promise<ShippingZoneDto> {
    return this.update({ id, data });
  }

  async deleteZone(id: string): Promise<void> {
    return this.delete({ id });
  }

  async getMethods(zoneId: string): Promise<ShippingMethodDto[]> {
    const res = await axiosInstance.get(`/api/v1/shipping/zones/${zoneId}/methods`);
    return res.data.data as ShippingMethodDto[];
  }

  async createMethod(zoneId: string, data: CreateShippingMethodDto): Promise<ShippingMethodDto> {
    const res = await axiosInstance.post(`/api/v1/shipping/zones/${zoneId}/methods`, data);
    return res.data.data as ShippingMethodDto;
  }

  async updateMethod(zoneId: string, id: string, data: UpdateShippingMethodDto): Promise<ShippingMethodDto> {
    const res = await axiosInstance.put(`/api/v1/shipping/zones/${zoneId}/methods/${id}`, data);
    return res.data.data as ShippingMethodDto;
  }

  async deleteMethod(zoneId: string, id: string): Promise<void> {
    await axiosInstance.delete(`/api/v1/shipping/zones/${zoneId}/methods/${id}`);
  }

  async calculateRates(request: ShippingRateRequest): Promise<ShippingRateResponse> {
    return this.post<ShippingRateResponse>('/api/v1/shipping/rates', request);
  }
}

export const shippingRepository = new ShippingRepository();
