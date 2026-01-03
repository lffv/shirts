import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  list(params: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: "price-low" | "price-high" | "newest" | "popularity";
  }) {
    const orderBy = this.sortToOrder(params.sort);
    return this.prisma.product.findMany({
      where: {
        category:
          params.category && params.category !== "All"
            ? params.category
            : undefined,
        price: {
          gte: params.minPrice,
          lte: params.maxPrice,
        },
        deletedAt: null,
      },
      include: { variants: true, images: true },
      orderBy,
    });
  }

  get(idOrSlug: string) {
    return this.prisma.product.findFirst({
      where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }], deletedAt: null },
      include: { variants: true, images: true },
    });
  }

  create(data: {
    name: string;
    slug: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: string;
    stock?: number;
    tags?: string[];
    images?: { url: string; alt?: string; position?: number }[];
    variants?: {
      sku: string;
      colorName: string;
      colorHex: string;
      size: string;
      stock: number;
      price: number;
    }[];
  }) {
    return this.prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        originalPrice: data.originalPrice,
        stock: data.stock ?? 0,
        category: data.category,
        tags: data.tags ?? [],
        images: { create: data.images ?? [] },
        variants: { create: data.variants ?? [] },
      },
    });
  }

  update(
    id: string,
    data: Partial<{
      name: string;
      description: string;
      price: number;
      category: string;
      tags: string[];
    }>
  ) {
    return this.prisma.product.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private sortToOrder(sort?: string) {
    if (sort === "price-low") return { price: "asc" as const };
    if (sort === "price-high") return { price: "desc" as const };
    if (sort === "popularity") return { reviewsCount: "desc" as const };
    return { createdAt: "desc" as const };
  }
}
