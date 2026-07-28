import { BaseRepository } from '@/lib/dal/repository';
import type { AddressDto, CreateAddressDto, UpdateAddressDto } from '@/features/dashboard/types/addresses.types';

export class AddressesRepository extends BaseRepository<AddressDto, CreateAddressDto, UpdateAddressDto> {
  constructor() {
    super({
      base: '/api/v1/addresses',
      byId: (id) => `/api/v1/addresses/${id}`,
    });
  }

  async setDefault(id: string): Promise<AddressDto> {
    return this.patch(id, { isDefault: true } as Partial<UpdateAddressDto>);
  }
}

export const addressesRepository = new AddressesRepository();
