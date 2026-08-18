import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Users
  const customer = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      passwordHash: 'hashed_password_mock',
      name: 'Alice Customer',
      phone: '555-0100',
      role: 'CUSTOMER',
    },
  });

  const businessOwner = await prisma.user.create({
    data: {
      email: 'owner@example.com',
      passwordHash: 'hashed_password_mock',
      name: 'Bob Bakery',
      phone: '555-0200',
      role: 'BUSINESS_OWNER',
    },
  });

  // 2. Create Category
  const category = await prisma.category.create({
    data: {
      slug: 'bakery-cakes',
      name: 'Bakery & Cakes',
      icon: 'Cake',
    },
  });

  // 3. Create Business
  const business = await prisma.business.create({
    data: {
      ownerId: businessOwner.id,
      slug: 'bobs-bakery',
      name: "Bob's Artisan Bakery",
      description: 'The best sourdough and cakes in town.',
      status: 'ACTIVE',
      location: '123 Baker St, London',
      email: 'hello@bobsbakery.com',
      phone: '555-0300',
      isDeliveryAvailable: true,
      isPickupAvailable: true,
      rating: 4.8,
      reviewCount: 120,
    },
  });

  // 4. Link Business to Category
  await prisma.businessCategory.create({
    data: {
      businessId: business.id,
      categoryId: category.id,
    },
  });

  // 5. Create Product
  const product = await prisma.product.create({
    data: {
      businessId: business.id,
      categoryId: category.id,
      name: 'Classic Sourdough Loaf',
      description: 'Freshly baked daily using a 10-year-old starter.',
      price: 8.5,
      status: 'ACTIVE',
    },
  });

  // 6. Create Product Variants
  await prisma.productVariant.createMany({
    data: [
      {
        productId: product.id,
        name: 'Standard',
        price: 8.5,
      },
      {
        productId: product.id,
        name: 'Large',
        price: 12.0,
      },
    ],
  });

  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
