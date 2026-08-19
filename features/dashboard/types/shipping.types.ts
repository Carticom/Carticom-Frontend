export interface ShippingZoneDto {
  id: string;
  storeId: string;
  name: string;
  countries: string[];
  regions: string[];
  baseRate: number;
  perKgRate?: number;
  isActive: boolean;
}

export interface CreateShippingZoneDto {
  storeId: string;
  name: string;
  countries: string[];
  regions?: string[];
  baseRate: number;
  perKgRate?: number;
}

export interface UpdateShippingZoneDto {
  name?: string;
  countries?: string[];
  regions?: string[];
  baseRate?: number;
  perKgRate?: number;
  isActive?: boolean;
}

export interface ShippingMethodDto {
  id: string;
  storeId: string;
  name: string;
  description?: string;
  price: number;
  estimatedDays?: number;
  isActive: boolean;
}

export interface CreateShippingMethodDto {
  storeId: string;
  name: string;
  description?: string;
  price: number;
  estimatedDays?: number;
}

export interface UpdateShippingMethodDto {
  name?: string;
  description?: string;
  price?: number;
  estimatedDays?: number;
  isActive?: boolean;
}

export interface ShippingRateRequest {
  storeId: string;
  weight?: number;
  country: string;
  state: string;
  zipCode?: string;
}

export interface ShippingRateResponse {
  destination: string;
  weight?: number;
  methods: {
    methodId: string;
    name: string;
    description?: string;
    price: number;
    estimatedDays?: number;
  }[];
}