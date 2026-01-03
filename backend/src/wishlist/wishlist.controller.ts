import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlist: WishlistService) {}

  // In real app, userId comes from auth token
  private userIdFallback = 'demo-user';

  @Get()
  list() {
    return this.wishlist.list(this.userIdFallback);
  }

  @Post(':productId')
  add(@Param('productId') productId: string) {
    return this.wishlist.add(this.userIdFallback, productId);
  }

  @Delete(':productId')
  remove(@Param('productId') productId: string) {
    return this.wishlist.remove(this.userIdFallback, productId);
  }
}
