"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const products = [
        {
            id: "1",
            name: "Classic Blue Tee",
            slug: "classic-blue-tee",
            description: "Timeless comfort in premium cotton. Modern fit.",
            price: 29.99,
            category: "Unisex",
            tags: ["basic", "casual", "comfortable"],
            images: [{ url: "https://picsum.photos/500/600?random=1", position: 0 }],
            variants: [
                {
                    sku: "CBT-NAVY-S",
                    colorName: "Navy",
                    colorHex: "#001F3F",
                    size: "S",
                    stock: 20,
                    price: 29.99,
                },
            ],
        },
        {
            id: "2",
            name: "Minimalist Monochrome",
            slug: "minimalist-monochrome",
            description: "Sleek and sophisticated minimalist design.",
            price: 34.99,
            originalPrice: 49.99,
            category: "Unisex",
            tags: ["minimalist", "elegant", "sale"],
            images: [{ url: "https://picsum.photos/500/600?random=4", position: 0 }],
            variants: [
                {
                    sku: "MM-BLK-M",
                    colorName: "Black",
                    colorHex: "#000000",
                    size: "M",
                    stock: 30,
                    price: 34.99,
                },
            ],
        },
    ];
    for (const p of products) {
        await prisma.product.upsert({
            where: { id: p.id },
            update: {},
            create: {
                id: p.id,
                name: p.name,
                slug: p.slug,
                description: p.description,
                price: p.price,
                originalPrice: p.originalPrice,
                category: p.category,
                stock: 100,
                tags: p.tags,
                images: { create: p.images },
                variants: { create: p.variants },
            },
        });
    }
    console.log("Seeded products");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map