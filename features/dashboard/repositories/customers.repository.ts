// ============================================================
// CARTICOM CUSTOMERS — Repository
// ============================================================

import { BaseRepository } from '@/lib/dal/repository';
import type { CustomerDto, CreateCustomerDto, UpdateCustomerDto } from '@/features/dashboard/types/customers.types';
import type { QueryParams } from '@/lib/dal/types';

export class CustomersRepository extends BaseRepository<CustomerDto, CreateCustomerDto, UpdateCustomerDto> {
  constructor() {
    super({
      base: '/api/v1/customers',
      byId: (id) => `/api/v1/customers/${id}`,
    });
  }

  async getByStore(storeId: string, params?: QueryParams) {
    return this.get<CustomerDto[]>(`/api/v1/customers/store/${storeId}`, params as Record<string, string | number | boolean>);
  }
}

export const customersRepository = new CustomersRepository();