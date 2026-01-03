import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Post("checkout")
  checkout(
    @Body()
    body: {
      userId?: string;
      items: { variantId: string; quantity: number; price: number }[];
      shippingInfo: Prisma.InputJsonValue;
      billingInfo: Prisma.InputJsonValue;
      currency?: string;
    }
  ) {
    return this.orders.checkout(body);
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.orders.get(id);
  }
}
