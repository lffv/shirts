import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cart: CartService) {}

  @Get()
  getCart() {
    return this.cart.getCart(undefined);
  }

  @Post('items')
  addItem(@Body() body: { cartId?: string; variantId: string; quantity?: number }) {
    return this.cart.addItem(body.cartId ?? null, undefined, body.variantId, body.quantity ?? 1);
  }

  @Patch('items/:id')
  updateItem(@Param('id') id: string, @Body() body: { quantity: number }) {
    return this.cart.updateItem(id, body.quantity);
  }

  @Delete('items/:id')
  removeItem(@Param('id') id: string) {
    return this.cart.removeItem(id);
  }
}
