import { Controller, Get, Param, Post, Body, Query, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  list(
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('sort') sort?: 'price-low' | 'price-high' | 'newest' | 'popularity',
  ) {
    return this.products.list({
      category,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      sort,
    });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.products.get(id);
  }

  @Post()
  create(
    @Body()
    body: {
      name: string;
      slug: string;
      description: string;
      price: number;
      originalPrice?: number;
      category: string;
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
    },
  ) {
    return this.products.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.products.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.products.delete(id);
  }
}
