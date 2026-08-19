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
  ShippingRateResponse} from '@/features/dashboard/types/shipping.types';

interface RawShippingZone {
  id: string;
  storeId: string;
  name: string;
  countries?: string;
  regions?: string;
  baseRate: number;
  perKgRate?: number;
  isActive: boolean;
}

interface RawShippingMethod {
  id: string;
  storeId: string;
  name: string;
  description?: string;
  price: number;
  estimatedDays?: number;
  isActive: boolean;
}

function splitList(value?: string): string[] {
  return value ? value.split(',').map((s) => s.trim()).filter(Boolean) : [];
}

function joinList(value?: string[]): string | undefined {
  return value && value.length > 0 ? value.join(', ') : undefined;
}

function toZone(raw: RawShippingZone): ShippingZoneDto {
  return {
    id: raw.id,
    storeId: raw.storeId,
    name: raw.name,
    countries: splitList(raw.countries),
    regions: splitList(raw.regions),
    baseRate: Number(raw.baseRate ?? 0),
    perKgRate: raw.perKgRate != null ? Number(raw.perKgRate) : undefined,
    isActive: raw.isActive};
}

function toMethod(raw: RawShippingMethod): ShippingMethodDto {
  return {
    id: raw.id,
    storeId: raw.storeId,
    name: raw.name,
    description: raw.description,
    price: Number(raw.price ?? 0),
    estimatedDays: raw.estimatedDays,
    isActive: raw.isActive};
}

export class ShippingRepository extends BaseRepository<ShippingZoneDto, CreateShippingZoneDto, UpdateShippingZoneDto> {
  constructor() {
    super({
      base: '/api/v1/shipping/zones',
      byId: (id) => `/api/v1/shipping/zones/${id}`});
  }

  async getZones(storeId: string): Promise<ShippingZoneDto[]> {
    const res = await axiosInstance.get(`/api/v1/shipping/zones/${storeId}`);
    return (res.data.data as RawShippingZone[]).map(toZone);
  }

  async createZone(data: CreateShippingZoneDto): Promise<ShippingZoneDto> {
    const payload = {
      storeId: data.storeId,
      name: data.name,
      countries: joinList(data.countries),
      regions: joinList(data.regions),
      baseRate: data.baseRate,
      perKgRate: data.perKgRate};
    const res = await axiosInstance.post('/api/v1/shipping/zones', payload);
    return toZone(res.data.data as RawShippingZone);
  }

  async updateZone(id: string, data: UpdateShippingZoneDto): Promise<ShippingZoneDto> {
    const payload: Record<string, unknown> = {};
    if (data.name !== undefined) payload.name = data.name;
    if (data.countries !== undefined) payload.countries = joinList(data.countries);
    if (data.regions !== undefined) payload.regions = joinList(data.regions);
    if (data.baseRate !== undefined) payload.baseRate = data.baseRate;
    if (data.perKgRate !== undefined) payload.perKgRate = data.perKgRate;
    if (data.isActive !== undefined) payload.isActive = data.isActive;
    const res = await axiosInstance.put(`/api/v1/shipping/zones/${id}`, payload);
    return toZone(res.data.data as RawShippingZone);
  }

  async deleteZone(id: string): Promise<void> {
    await axiosInstance.delete(`/api/v1/shipping/zones/${id}`);
  }

  async getMethods(storeId: string): Promise<ShippingMethodDto[]> {
    const res = await axiosInstance.get(`/api/v1/shipping/methods/${storeId}`);
    return (res.data.data as RawShippingMethod[]).map(toMethod);
  }

  async createMethod(data: CreateShippingMethodDto): Promise<ShippingMethodDto> {
    const payload = {
      storeId: data.storeId,
      name: data.name,
      description: data.description,
      price: data.price,
      estimatedDays: data.estimatedDays};
    const res = await axiosInstance.post('/api/v1/shipping/methods', payload);
    return toMethod(res.data.data as RawShippingMethod);
  }

  async updateMethod(id: string, data: UpdateShippingMethodDto): Promise<ShippingMethodDto> {
    const payload: Record<string, unknown> = {};
    if (data.name !== undefined) payload.name = data.name;
    if (data.description !== undefined) payload.description = data.description;
    if (data.price !== undefined) payload.price = data.price;
    if (data.estimatedDays !== undefined) payload.estimatedDays = data.estimatedDays;
    if (data.isActive !== undefined) payload.isActive = data.isActive;
    const res = await axiosInstance.put(`/api/v1/shipping/methods/${id}`, payload);
    return toMethod(res.data.data as RawShippingMethod);
  }

  async deleteMethod(id: string): Promise<void> {
    await axiosInstance.delete(`/api/v1/shipping/methods/${id}`);
  }

  async calculateRates(request: ShippingRateRequest): Promise<ShippingRateResponse> {
    return this.post<ShippingRateResponse>('/api/v1/shipping/rates', request);
  }
}

export const shippingRepository = new ShippingRepository();