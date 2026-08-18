import type { Product } from "@/domain/types";

export const mockProducts: Product[] = [
  // ---- Divini Cakes (biz-01) ----
  {
    id: "prod-01",
    businessId: "biz-01",
    categoryId: "cat-02",
    name: "Classic Chocolate Drip Cake",
    description:
      "A rich, moist chocolate sponge layered with Belgian chocolate ganache and finished with a silky drip. Customisable with your choice of topper and message.",
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565661902879-5e01d9f9b39a?w=800&h=600&fit=crop",
    ],
    basePrice: 3800,
    variants: [
      { id: "v-01-1", name: "1 kg", price: 3800, isAvailable: true },
      { id: "v-01-2", name: "1.5 kg", price: 5400, isAvailable: true },
      { id: "v-01-3", name: "2 kg", price: 6900, isAvailable: true },
      { id: "v-01-4", name: "3 kg", price: 9800, isAvailable: true },
    ],
    isAvailable: true,
    rating: 5.0,
    reviewCount: 148,
    featured: true,
    createdAt: "2023-02-01T08:00:00Z",
  },
  {
    id: "prod-02",
    businessId: "biz-01",
    categoryId: "cat-02",
    name: "Floral Fondant Wedding Cake",
    description:
      "Elegant 3-tier fondant wedding cake adorned with hand-crafted sugar flowers. Available in vanilla, red velvet, or lemon sponge. Minimum 4 weeks lead time required.",
    images: [
      "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1530648831609-0a0bb4741e48?w=800&h=600&fit=crop",
    ],
    basePrice: 22000,
    variants: [
      { id: "v-02-1", name: "Serves 30–40", price: 22000, isAvailable: true },
      { id: "v-02-2", name: "Serves 50–70", price: 32000, isAvailable: true },
      { id: "v-02-3", name: "Serves 80–100", price: 45000, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.9,
    reviewCount: 67,
    featured: true,
    createdAt: "2023-01-20T08:00:00Z",
  },
  {
    id: "prod-03",
    businessId: "biz-01",
    categoryId: "cat-02",
    name: "Dessert Box — Premium Collection",
    description:
      "A curated box of 12 assorted mini desserts — brownies, truffles, cheesecake bites, macarons, and cake pops. Perfect for gifting or celebrations.",
    images: [
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=600&fit=crop",
    ],
    basePrice: 2400,
    variants: [
      { id: "v-03-1", name: "Box of 12", price: 2400, isAvailable: true },
      { id: "v-03-2", name: "Box of 24", price: 4500, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.8,
    reviewCount: 93,
    featured: false,
    createdAt: "2023-03-10T08:00:00Z",
  },
  // ---- Sweetbite Bakery (biz-02) ----
  {
    id: "prod-04",
    businessId: "biz-02",
    categoryId: "cat-02",
    name: "Fresh Butter Croissants",
    description:
      "Buttery, flaky croissants baked fresh every morning. Available plain or filled with chocolate, almond paste, or ham and cheese.",
    images: [
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop",
    ],
    basePrice: 180,
    variants: [
      { id: "v-04-1", name: "Plain (each)", price: 180, isAvailable: true },
      { id: "v-04-2", name: "Chocolate (each)", price: 220, isAvailable: true },
      { id: "v-04-3", name: "Almond (each)", price: 240, isAvailable: true },
      { id: "v-04-4", name: "Ham & Cheese (each)", price: 280, isAvailable: true },
      { id: "v-04-5", name: "Pack of 6 (mixed)", price: 1200, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.7,
    reviewCount: 102,
    featured: false,
    createdAt: "2022-07-01T08:00:00Z",
  },
  {
    id: "prod-05",
    businessId: "biz-02",
    categoryId: "cat-02",
    name: "Kandy Special Birthday Cake",
    description:
      "A signature Kandy-style butter cake with local pineapple jam filling, white butter cream frosting, and colourful sugar decorations.",
    images: [
      "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&h=600&fit=crop",
    ],
    basePrice: 2200,
    variants: [
      { id: "v-05-1", name: "750g", price: 2200, isAvailable: true },
      { id: "v-05-2", name: "1.2 kg", price: 3400, isAvailable: true },
      { id: "v-05-3", name: "2 kg", price: 5200, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.6,
    reviewCount: 81,
    featured: false,
    createdAt: "2022-08-15T08:00:00Z",
  },
  // ---- Lace & Thread (biz-05) ----
  {
    id: "prod-06",
    businessId: "biz-05",
    categoryId: "cat-03",
    name: "Hand-embroidered Cotton Kurta",
    description:
      "Lightweight cotton kurta with intricate hand embroidery at the neckline and cuffs. Available in 6 colours. Machine washable.",
    images: [
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=600&fit=crop",
    ],
    basePrice: 2800,
    variants: [
      { id: "v-06-1", name: "XS — Ivory", price: 2800, isAvailable: true },
      { id: "v-06-2", name: "S — Ivory", price: 2800, isAvailable: true },
      { id: "v-06-3", name: "M — Ivory", price: 2800, isAvailable: true },
      { id: "v-06-4", name: "L — Ivory", price: 2800, isAvailable: true },
      { id: "v-06-5", name: "XL — Ivory", price: 2800, isAvailable: true },
      { id: "v-06-6", name: "M — Sage Green", price: 2800, isAvailable: false },
    ],
    isAvailable: true,
    rating: 4.8,
    reviewCount: 56,
    featured: true,
    createdAt: "2022-02-10T08:00:00Z",
  },
  {
    id: "prod-07",
    businessId: "biz-05",
    categoryId: "cat-03",
    name: "Bridal Lehenga — Ivory & Gold",
    description:
      "Stunning three-piece bridal lehenga in silk with intricate gold zari embroidery. Includes blouse, skirt, and dupatta. Custom fitting available.",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4b2f7b?w=800&h=600&fit=crop",
    ],
    basePrice: 45000,
    variants: [
      { id: "v-07-1", name: "Standard (Size 8–12)", price: 45000, isAvailable: true },
      { id: "v-07-2", name: "Custom Fitted", price: 52000, isAvailable: true },
    ],
    isAvailable: true,
    rating: 5.0,
    reviewCount: 14,
    featured: false,
    createdAt: "2022-11-05T08:00:00Z",
  },
  // ---- Amma's Kitchen (biz-06) ----
  {
    id: "prod-08",
    businessId: "biz-06",
    categoryId: "cat-06",
    name: "Traditional Rice & Curry Set",
    description:
      "Authentic Sri Lankan rice and curry with dhal, two vegetable curries, pol sambol, papadum, and a choice of protein. Home-cooked with love.",
    images: [
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop",
    ],
    basePrice: 450,
    variants: [
      { id: "v-08-1", name: "Vegetarian", price: 450, isAvailable: true },
      { id: "v-08-2", name: "With Chicken Curry", price: 550, isAvailable: true },
      { id: "v-08-3", name: "With Fish Curry", price: 580, isAvailable: true },
      { id: "v-08-4", name: "With Mutton Curry", price: 650, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.9,
    reviewCount: 274,
    featured: true,
    createdAt: "2020-06-01T08:00:00Z",
  },
  {
    id: "prod-09",
    businessId: "biz-06",
    categoryId: "cat-06",
    name: "Egg Kottu Roti",
    description:
      "The classic Sri Lankan street food made at home — shredded roti, eggs, onions, leeks and spicy kottu gravy. Available with or without extra protein.",
    images: [
      "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=800&h=600&fit=crop",
    ],
    basePrice: 380,
    variants: [
      { id: "v-09-1", name: "Egg Kottu", price: 380, isAvailable: true },
      { id: "v-09-2", name: "Chicken Kottu", price: 480, isAvailable: true },
      { id: "v-09-3", name: "Cheese Kottu", price: 520, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.8,
    reviewCount: 198,
    featured: false,
    createdAt: "2020-07-15T08:00:00Z",
  },
  // ---- Glow Cosmetics (biz-08) ----
  {
    id: "prod-10",
    businessId: "biz-08",
    categoryId: "cat-04",
    name: "Brightening Vitamin C Serum",
    description:
      "Our award-winning serum featuring 15% stable Vitamin C, Niacinamide and Sri Lankan sea buckthorn extract. Reduces dark spots and evens skin tone in 4 weeks.",
    images: [
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=800&h=600&fit=crop",
    ],
    basePrice: 2900,
    variants: [
      { id: "v-10-1", name: "30ml", price: 2900, isAvailable: true },
      { id: "v-10-2", name: "50ml", price: 4400, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.9,
    reviewCount: 187,
    featured: true,
    createdAt: "2021-05-01T08:00:00Z",
  },
  {
    id: "prod-11",
    businessId: "biz-08",
    categoryId: "cat-04",
    name: "Hydra-Glow Moisturiser SPF 30",
    description:
      "Lightweight daily moisturiser with broad-spectrum SPF 30. Non-greasy formula enriched with aloe vera, hyaluronic acid, and local jasmine extract.",
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&h=600&fit=crop",
    ],
    basePrice: 1800,
    variants: [
      { id: "v-11-1", name: "50ml", price: 1800, isAvailable: true },
      { id: "v-11-2", name: "100ml", price: 3200, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.7,
    reviewCount: 132,
    featured: false,
    createdAt: "2021-06-20T08:00:00Z",
  },
  // ---- Crafted with Love (biz-09) ----
  {
    id: "prod-12",
    businessId: "biz-09",
    categoryId: "cat-05",
    name: "Personalised Gift Box — Premium",
    description:
      "A thoughtfully curated gift box customised with your personal message. Fill it with chocolates, candles, skincare products and keepsakes of your choice.",
    images: [
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab9?w=800&h=600&fit=crop",
    ],
    basePrice: 3200,
    variants: [
      { id: "v-12-1", name: "Small Box", price: 3200, isAvailable: true },
      { id: "v-12-2", name: "Medium Box", price: 4800, isAvailable: true },
      { id: "v-12-3", name: "Large Box", price: 6500, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.9,
    reviewCount: 104,
    featured: true,
    createdAt: "2022-09-01T08:00:00Z",
  },
  {
    id: "prod-13",
    businessId: "biz-09",
    categoryId: "cat-05",
    name: "Custom Resin Keychain",
    description:
      "Handcrafted resin keychains with your choice of name, initials, or a small photo embedded. Each piece is unique. Perfect personalised gifts.",
    images: [
      "https://images.unsplash.com/photo-1544816565-aa8c1166648f?w=800&h=600&fit=crop",
    ],
    basePrice: 650,
    variants: [
      { id: "v-13-1", name: "Name Keychain", price: 650, isAvailable: true },
      { id: "v-13-2", name: "Photo Keychain", price: 950, isAvailable: true },
      { id: "v-13-3", name: "Set of 3", price: 1800, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.8,
    reviewCount: 68,
    featured: false,
    createdAt: "2022-10-15T08:00:00Z",
  },
  // ---- Lanka Herbal (biz-10) ----
  {
    id: "prod-14",
    businessId: "biz-10",
    categoryId: "cat-10",
    name: "Coconut & Curry Leaf Hair Oil",
    description:
      "Traditional Ayurvedic hair oil infused with fresh curry leaves, neem, and brahmi. Strengthens hair, reduces hair fall, and promotes scalp health.",
    images: [
      "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=800&h=600&fit=crop",
    ],
    basePrice: 980,
    variants: [
      { id: "v-14-1", name: "100ml", price: 980, isAvailable: true },
      { id: "v-14-2", name: "250ml", price: 2100, isAvailable: true },
      { id: "v-14-3", name: "500ml", price: 3800, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.7,
    reviewCount: 76,
    featured: false,
    createdAt: "2021-01-10T08:00:00Z",
  },
  // ---- Casa Interiors (biz-11) ----
  {
    id: "prod-15",
    businessId: "biz-11",
    categoryId: "cat-11",
    name: "Handwoven Rattan Wall Planter",
    description:
      "Bohemian-style rattan wall planters made by local artisans. Includes coconut shell liner for plants. Suitable for indoor trailing plants.",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
    ],
    basePrice: 1200,
    variants: [
      { id: "v-15-1", name: "Small (20cm)", price: 1200, isAvailable: true },
      { id: "v-15-2", name: "Medium (30cm)", price: 1800, isAvailable: true },
      { id: "v-15-3", name: "Set of 3 (assorted)", price: 3200, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.6,
    reviewCount: 47,
    featured: false,
    createdAt: "2021-09-20T08:00:00Z",
  },
  // ---- Spice Route Cafe (biz-13) ----
  {
    id: "prod-16",
    businessId: "biz-13",
    categoryId: "cat-14",
    name: "Kottu Waffle",
    description:
      "Our signature creation — crispy waffle topped with kottu gravy, caramelised onions, shredded chicken, and a fried egg. A must-try fusion dish.",
    images: [
      "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=800&h=600&fit=crop",
    ],
    basePrice: 680,
    variants: [
      { id: "v-16-1", name: "Chicken", price: 680, isAvailable: true },
      { id: "v-16-2", name: "Vegetarian", price: 580, isAvailable: true },
      { id: "v-16-3", name: "Mutton", price: 780, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.6,
    reviewCount: 203,
    featured: true,
    createdAt: "2019-01-15T08:00:00Z",
  },
  {
    id: "prod-17",
    businessId: "biz-13",
    categoryId: "cat-14",
    name: "King Coconut Smoothie Bowl",
    description:
      "Refreshing smoothie bowl made with king coconut water, locally sourced tropical fruits, granola, and Sri Lankan wildflower honey.",
    images: [
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop",
    ],
    basePrice: 550,
    variants: [
      { id: "v-17-1", name: "Regular", price: 550, isAvailable: true },
      { id: "v-17-2", name: "Large", price: 720, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.5,
    reviewCount: 98,
    featured: false,
    createdAt: "2019-03-01T08:00:00Z",
  },
  // ---- SugarCraft (biz-16) ----
  {
    id: "prod-18",
    businessId: "biz-16",
    categoryId: "cat-02",
    name: "Belgian Chocolate Truffle Cake",
    description:
      "Decadent layered cake made with premium Belgian dark chocolate sponge, whipped ganache filling, and a smooth mirror glaze finish.",
    images: [
      "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800&h=600&fit=crop",
    ],
    basePrice: 4200,
    variants: [
      { id: "v-18-1", name: "1 kg", price: 4200, isAvailable: true },
      { id: "v-18-2", name: "1.5 kg", price: 6000, isAvailable: true },
      { id: "v-18-3", name: "2 kg", price: 7800, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.9,
    reviewCount: 118,
    featured: true,
    createdAt: "2020-11-01T08:00:00Z",
  },
  {
    id: "prod-19",
    businessId: "biz-16",
    categoryId: "cat-02",
    name: "Cupcake Tower — 24 Pack",
    description:
      "24 individually decorated cupcakes arranged on a 3-tier display tower. Available in mixed flavours: vanilla, chocolate, red velvet, and lemon.",
    images: [
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&h=600&fit=crop",
    ],
    basePrice: 6800,
    variants: [
      { id: "v-19-1", name: "Mixed Flavours", price: 6800, isAvailable: true },
      { id: "v-19-2", name: "All Chocolate", price: 6800, isAvailable: true },
      { id: "v-19-3", name: "Custom Flavours", price: 7500, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.8,
    reviewCount: 84,
    featured: false,
    createdAt: "2021-02-14T08:00:00Z",
  },
  // ---- Curry Culture (biz-17) ----
  {
    id: "prod-20",
    businessId: "biz-17",
    categoryId: "cat-06",
    name: "Sri Lankan Tasting Box",
    description:
      "A curated box of 5 signature dishes showcasing the best of Sri Lankan cuisine — devilled cashew, fish ambul thiyal, lunu dehi sambol, pol roti and watalappam.",
    images: [
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&h=600&fit=crop",
    ],
    basePrice: 2800,
    variants: [
      { id: "v-20-1", name: "Box for 2", price: 2800, isAvailable: true },
      { id: "v-20-2", name: "Box for 4", price: 5200, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.8,
    reviewCount: 142,
    featured: true,
    createdAt: "2021-04-20T08:00:00Z",
  },
  // ---- Pure Beauty (biz-18) ----
  {
    id: "prod-21",
    businessId: "biz-18",
    categoryId: "cat-04",
    name: "Virgin Coconut Oil Skin Butter",
    description:
      "Cold-pressed virgin coconut oil whipped with shea butter and turmeric. Deeply moisturising, anti-inflammatory, and completely chemical-free.",
    images: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=600&fit=crop",
    ],
    basePrice: 1200,
    variants: [
      { id: "v-21-1", name: "100g", price: 1200, isAvailable: true },
      { id: "v-21-2", name: "250g", price: 2600, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.8,
    reviewCount: 89,
    featured: false,
    createdAt: "2022-03-15T08:00:00Z",
  },
  // ---- Fresh Harvest (biz-15) ----
  {
    id: "prod-22",
    businessId: "biz-15",
    categoryId: "cat-15",
    name: "Organic Vegetable Basket",
    description:
      "A seasonal selection of certified organic vegetables sourced directly from Nuwara Eliya and Dambulla farms. Contents change weekly based on harvest.",
    images: [
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop",
    ],
    basePrice: 1800,
    variants: [
      { id: "v-22-1", name: "Small (2–3 items)", price: 1800, isAvailable: true },
      { id: "v-22-2", name: "Family (6–8 items)", price: 3800, isAvailable: true },
      { id: "v-22-3", name: "Jumbo (10–12 items)", price: 5500, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.6,
    reviewCount: 112,
    featured: false,
    createdAt: "2019-09-10T08:00:00Z",
  },
  // ---- Threadworks (biz-20) ----
  {
    id: "prod-23",
    businessId: "biz-20",
    categoryId: "cat-03",
    name: "Silk Saree — Jaffna Collection",
    description:
      "Traditional Jaffna-style silk saree with gold and silver zari border. Comes with matching blouse fabric. Perfect for weddings, festivals, and special occasions.",
    images: [
      "https://images.unsplash.com/photo-1617627143233-5fb9e8f16ffe?w=800&h=600&fit=crop",
    ],
    basePrice: 8500,
    variants: [
      { id: "v-23-1", name: "Royal Blue", price: 8500, isAvailable: true },
      { id: "v-23-2", name: "Deep Red", price: 8500, isAvailable: true },
      { id: "v-23-3", name: "Emerald Green", price: 8500, isAvailable: true },
      { id: "v-23-4", name: "Rose Gold", price: 9200, isAvailable: false },
    ],
    isAvailable: true,
    rating: 4.7,
    reviewCount: 54,
    featured: false,
    createdAt: "2020-09-01T08:00:00Z",
  },
  // ---- More Divini Cakes ----
  {
    id: "prod-24",
    businessId: "biz-01",
    categoryId: "cat-02",
    name: "Red Velvet Cake",
    description:
      "Classic red velvet with cream cheese frosting. Moist, vibrant, and absolutely delicious. Can be customised with your message.",
    images: [
      "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=800&h=600&fit=crop",
    ],
    basePrice: 3500,
    variants: [
      { id: "v-24-1", name: "1 kg", price: 3500, isAvailable: true },
      { id: "v-24-2", name: "1.5 kg", price: 5000, isAvailable: true },
      { id: "v-24-3", name: "2 kg", price: 6500, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.8,
    reviewCount: 109,
    featured: false,
    createdAt: "2023-04-01T08:00:00Z",
  },
  // ---- More Amma's Kitchen ----
  {
    id: "prod-25",
    businessId: "biz-06",
    categoryId: "cat-06",
    name: "String Hopper (Indiappa) Set",
    description:
      "Freshly made string hoppers served with coconut milk, pol sambol, and your choice of curry. Available with chicken, fish, or dhal curry.",
    images: [
      "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=800&h=600&fit=crop",
    ],
    basePrice: 350,
    variants: [
      { id: "v-25-1", name: "With Dhal Curry", price: 350, isAvailable: true },
      { id: "v-25-2", name: "With Chicken Curry", price: 450, isAvailable: true },
      { id: "v-25-3", name: "With Fish Curry", price: 480, isAvailable: true },
    ],
    isAvailable: true,
    rating: 4.9,
    reviewCount: 163,
    featured: false,
    createdAt: "2020-08-01T08:00:00Z",
  },
];
