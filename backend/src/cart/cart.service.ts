import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCart(userId?: string) {
    return this.prisma.cart.findFirst({
      where: { userId },
      include: { items: { include: { variant: true } } },
    });
  }

  async addItem(cartId: string | null, userId: string | undefined, variantId: string, quantity: number) {
    let cart = cartId
      ? await this.prisma.cart.findUnique({ where: { id: cartId } })
      : null;
    if (!cart) {
      cart = await this.prisma.cart.create({ data: { userId } });
    }
    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        variantId,
        quantity,
        price: 0, // price snapshot; fill via variant lookup in real impl
      },
    });
  }

  async updateItem(id: string, quantity: number) {
    return this.prisma.cartItem.update({ where: { id }, data: { quantity } });
  }

  async removeItem(id: string) {
    return this.prisma.cartItem.delete({ where: { id } });
  }
}
