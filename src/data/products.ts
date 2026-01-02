/** Product mock data with 15+ t-shirt designs */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  category: "Men" | "Women" | "Unisex" | "Limited Edition";
  tags: string[];
  stock: number;
  featured: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Blue Tee",
    description:
      "Timeless comfort in premium cotton. Perfect for everyday wear with a modern fit.",
    price: 29.99,
    images: [
      "https://picsum.photos/500/600?random=1",
      "https://picsum.photos/500/600?random=2",
      "https://picsum.photos/500/600?random=3",
    ],
    colors: [
      { name: "Navy", hex: "#001F3F" },
      { name: "Sky Blue", hex: "#00BFFF" },
      { name: "White", hex: "#FFFFFF" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Unisex",
    tags: ["basic", "casual", "comfortable"],
    stock: 150,
    featured: true,
    rating: 4.8,
    reviews: 245,
  },
  {
    id: "2",
    name: "Minimalist Monochrome",
    description:
      "Sleek and sophisticated. A wardrobe essential with a minimalist design.",
    price: 34.99,
    originalPrice: 49.99,
    images: [
      "https://picsum.photos/500/600?random=4",
      "https://picsum.photos/500/600?random=5",
      "https://picsum.photos/500/600?random=6",
    ],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Charcoal", hex: "#36454F" },
      { name: "Heather Gray", hex: "#A9A9A9" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Unisex",
    tags: ["minimalist", "elegant", "sale"],
    stock: 200,
    featured: true,
    rating: 4.9,
    reviews: 312,
  },
  {
    id: "3",
    name: "Vibrant Summer Colors",
    description:
      "Bright and energetic. Bring your style to life with our vibrant color collection.",
    price: 24.99,
    images: [
      "https://picsum.photos/500/600?random=7",
      "https://picsum.photos/500/600?random=8",
      "https://picsum.photos/500/600?random=9",
    ],
    colors: [
      { name: "Coral", hex: "#FF7F50" },
      { name: "Mint", hex: "#98FF98" },
      { name: "Lemon", hex: "#FFFACD" },
      { name: "Lavender", hex: "#E6E6FA" },
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Unisex",
    tags: ["colorful", "summer", "casual"],
    stock: 120,
    featured: true,
    rating: 4.6,
    reviews: 189,
  },
  {
    id: "4",
    name: "Athletic Performance Fit",
    description:
      "Moisture-wicking and breathable. Designed for active lifestyle and performance.",
    price: 39.99,
    images: [
      "https://picsum.photos/500/600?random=10",
      "https://picsum.photos/500/600?random=11",
      "https://picsum.photos/500/600?random=12",
    ],
    colors: [
      { name: "Graphite", hex: "#383838" },
      { name: "Electric Blue", hex: "#0080FF" },
      { name: "Neon Green", hex: "#39FF14" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Men",
    tags: ["athletic", "performance", "sport"],
    stock: 180,
    featured: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "5",
    name: "Fitted Women's Cut",
    description:
      "Tailored for the perfect feminine silhouette. Premium comfort meets style.",
    price: 31.99,
    images: [
      "https://picsum.photos/500/600?random=13",
      "https://picsum.photos/500/600?random=14",
      "https://picsum.photos/500/600?random=15",
    ],
    colors: [
      { name: "Rose", hex: "#FF007F" },
      { name: "Burgundy", hex: "#800020" },
      { name: "Pearl", hex: "#EAE0C8" },
      { name: "Teal", hex: "#008080" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Women",
    tags: ["fitted", "feminine", "elegant"],
    stock: 140,
    featured: true,
    rating: 4.85,
    reviews: 278,
  },
  {
    id: "6",
    name: "Retro Vintage Vibes",
    description:
      "Nostalgic throwback design. Comfortable oversized fit with classic appeal.",
    price: 36.99,
    images: [
      "https://picsum.photos/500/600?random=16",
      "https://picsum.photos/500/600?random=17",
      "https://picsum.photos/500/600?random=18",
    ],
    colors: [
      { name: "Vintage Black", hex: "#2F2F2F" },
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Rust", hex: "#B7410E" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Unisex",
    tags: ["vintage", "retro", "nostalgia"],
    stock: 100,
    featured: false,
    rating: 4.5,
    reviews: 134,
  },
  {
    id: "7",
    name: "Luxury Limited Edition",
    description:
      "Exclusive design produced in limited quantities. Premium fabric, premium style.",
    price: 79.99,
    originalPrice: 99.99,
    images: [
      "https://picsum.photos/500/600?random=19",
      "https://picsum.photos/500/600?random=20",
      "https://picsum.photos/500/600?random=21",
    ],
    colors: [
      { name: "Gold", hex: "#FFD700" },
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Platinum", hex: "#E5E4E2" },
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Limited Edition",
    tags: ["limited", "luxury", "exclusive"],
    stock: 25,
    featured: true,
    rating: 4.95,
    reviews: 89,
  },
  {
    id: "8",
    name: "Sustainable Eco Tee",
    description:
      "Ethically made from 100% organic cotton. Better for you, better for the planet.",
    price: 44.99,
    images: [
      "https://picsum.photos/500/600?random=22",
      "https://picsum.photos/500/600?random=23",
      "https://picsum.photos/500/600?random=24",
    ],
    colors: [
      { name: "Leaf Green", hex: "#228B22" },
      { name: "Earth Brown", hex: "#8B4513" },
      { name: "Sky", hex: "#87CEEB" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Unisex",
    tags: ["sustainable", "eco", "organic"],
    stock: 95,
    featured: false,
    rating: 4.7,
    reviews: 167,
  },
  {
    id: "9",
    name: "Oversized Streetwear",
    description:
      "Bold and comfortable. The perfect streetwear essential for modern style.",
    price: 42.99,
    images: [
      "https://picsum.photos/500/600?random=25",
      "https://picsum.photos/500/600?random=26",
      "https://picsum.photos/500/600?random=27",
    ],
    colors: [
      { name: "Jet Black", hex: "#0A0E27" },
      { name: "Off White", hex: "#F5F5F0" },
      { name: "Sage", hex: "#9DC183" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Unisex",
    tags: ["streetwear", "oversized", "bold"],
    stock: 160,
    featured: false,
    rating: 4.6,
    reviews: 198,
  },
  {
    id: "10",
    name: "Classic Polo Hybrid",
    description:
      "Perfect blend of casual and formal. Versatile for any occasion.",
    price: 49.99,
    images: [
      "https://picsum.photos/500/600?random=28",
      "https://picsum.photos/500/600?random=29",
      "https://picsum.photos/500/600?random=30",
    ],
    colors: [
      { name: "Navy", hex: "#001F3F" },
      { name: "Forest Green", hex: "#228B22" },
      { name: "Burgundy", hex: "#800020" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Men",
    tags: ["polo", "versatile", "formal"],
    stock: 110,
    featured: false,
    rating: 4.8,
    reviews: 225,
  },
  {
    id: "11",
    name: "Graphic Art Collection",
    description:
      "Unique artistic designs from independent artists. Express your creativity.",
    price: 37.99,
    images: [
      "https://picsum.photos/500/600?random=31",
      "https://picsum.photos/500/600?random=32",
      "https://picsum.photos/500/600?random=33",
    ],
    colors: [
      { name: "Midnight", hex: "#191970" },
      { name: "Indigo", hex: "#4B0082" },
      { name: "Violet", hex: "#EE82EE" },
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "Unisex",
    tags: ["graphic", "art", "unique"],
    stock: 75,
    featured: false,
    rating: 4.4,
    reviews: 112,
  },
  {
    id: "12",
    name: "Premium Henley Style",
    description:
      "Sophisticated henley neckline design. Comfort with a touch of elegance.",
    price: 38.99,
    images: [
      "https://picsum.photos/500/600?random=34",
      "https://picsum.photos/500/600?random=35",
      "https://picsum.photos/500/600?random=36",
    ],
    colors: [
      { name: "Charcoal", hex: "#36454F" },
      { name: "Olive", hex: "#808000" },
      { name: "Maroon", hex: "#800000" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Men",
    tags: ["henley", "elegant", "sophisticated"],
    stock: 130,
    featured: false,
    rating: 4.7,
    reviews: 187,
  },
  {
    id: "13",
    name: "Cropped Baby Tee",
    description:
      "Trendy crop top style. Perfect for the modern, fashion-forward look.",
    price: 27.99,
    images: [
      "https://picsum.photos/500/600?random=37",
      "https://picsum.photos/500/600?random=38",
      "https://picsum.photos/500/600?random=39",
    ],
    colors: [
      { name: "Hot Pink", hex: "#FF69B4" },
      { name: "Lime", hex: "#CDDC39" },
      { name: "Turquoise", hex: "#40E0D0" },
    ],
    sizes: ["XS", "S", "M", "L"],
    category: "Women",
    tags: ["crop", "trendy", "fashion"],
    stock: 85,
    featured: false,
    rating: 4.5,
    reviews: 143,
  },
  {
    id: "14",
    name: "Premium Jersey Long Sleeve",
    description:
      "Long sleeve comfort with premium jersey fabric. Great for layering.",
    price: 41.99,
    images: [
      "https://picsum.photos/500/600?random=40",
      "https://picsum.photos/500/600?random=41",
      "https://picsum.photos/500/600?random=42",
    ],
    colors: [
      { name: "Deep Navy", hex: "#00008B" },
      { name: "Oxblood Red", hex: "#4B0000" },
      { name: "Pewter", hex: "#83878B" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Unisex",
    tags: ["long-sleeve", "premium", "layering"],
    stock: 120,
    featured: false,
    rating: 4.6,
    reviews: 176,
  },
  {
    id: "15",
    name: "Ultra Soft Cotton Blend",
    description:
      "Luxuriously soft cotton blend. Maximum comfort for all-day wear.",
    price: 32.99,
    images: [
      "https://picsum.photos/500/600?random=43",
      "https://picsum.photos/500/600?random=44",
      "https://picsum.photos/500/600?random=45",
    ],
    colors: [
      { name: "Blush", hex: "#FFB6C1" },
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Soft Gray", hex: "#D3D3D3" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Women",
    tags: ["soft", "cotton", "comfort"],
    stock: 175,
    featured: false,
    rating: 4.8,
    reviews: 267,
  },
];

export const categories = ["Men", "Women", "Unisex", "Limited Edition"];
export const priceRanges = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 - $50", min: 25, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "Over $100", min: 100, max: Infinity },
];
