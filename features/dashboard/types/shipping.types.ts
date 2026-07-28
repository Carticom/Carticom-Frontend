export interface ShippingZoneDto {
  id: string;
  name: string;
  countries: string[];
  regions: string[];
  isActive: boolean;
}

export interface CreateShippingZoneDto {
  name: string;
  countries: string[];
  regions?: string[];
}

export interface UpdateShippingZoneDto {
  name?: string;
  countries?: string[];
  regions?: string[];
  isActive?: boolean;
}

export type ShippingMethodType = 'FREE' | 'FLAT' | 'PER_ITEM';

export interface ShippingMethodDto {
  id: string;
  zoneId: string;
  name: string;
  type: ShippingMethodType;
  rate: number;
  minOrderAmount?: number;
  estimatedDaysMin: number;
  estimatedDaysMax: number;
  isActive: boolean;
}

export interface CreateShippingMethodDto {
  name: string;
  type: ShippingMethodType;
  rate: number;
  minOrderAmount?: number;
  estimatedDaysMin: number;
  estimatedDaysMax: number;
}

export interface UpdateShippingMethodDto {
  name?: string;
  type?: ShippingMethodType;
  rate?: number;
  minOrderAmount?: number;
  estimatedDaysMin?: number;
  estimatedDaysMax?: number;
  isActive?: boolean;
}

export interface ShippingRateRequest {
  storeId: string;
  country: string;
  region?: string;
  itemsWeight?: number;
  cartTotal: number;
}

export interface ShippingRateResponse {
  methods: {
    id: string;
    name: string;
    rate: number;
    estimatedDays: number;
  }[];
}
