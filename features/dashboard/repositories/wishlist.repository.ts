import { BaseRepository } from '@/lib/dal/repository';
import type { WishlistItemDto } from '@/features/dashboard/types/wishlist.types';

class WishlistRepository extends BaseRepository<WishlistItemDto> {
  constructor() {
    super({
      base: '/api/v1/wishlist'});
  }

  async getAll(): Promise<WishlistItemDto[]> {
    return this.get<WishlistItemDto[]>('/api/v1/wishlist');
  }

  async add(productId: string): Promise<WishlistItemDto> {
    return this.post<WishlistItemDto>('/api/v1/wishlist', { productId });
  }

  async remove(itemId: string): Promise<void> {
    await this.delete({ id: itemId });
  }
}

export const wishlistRepository = new WishlistRepository();
