import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async checkout(data: {
    userId?: string;
    items: { variantId: string; quantity: number; price: number }[];
    shippingInfo: Prisma.InputJsonValue;
    billingInfo: Prisma.InputJsonValue;
    currency?: string;
  }) {
    const subtotal = data.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const shipping = subtotal > 100 ? 0 : 9.99;
    const total = subtotal + tax + shipping;

    const order = await this.prisma.order.create({
      data: {
        userId: data.userId,
        subtotal,
        tax,
        shipping,
        total,
        currency: data.currency ?? "USD",
        shippingInfo: data.shippingInfo,
        billingInfo: data.billingInfo,
        items: {
          create: data.items.map((i) => ({
            variantId: i.variantId,
            quantity: i.quantity,
            price: i.price,
          })),
        },
      },
      include: { items: true },
    });

    return { order, paymentIntentId: "demo-intent" };
  }

  get(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
  }
}
