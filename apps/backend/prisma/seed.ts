import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean existing data (optional, but good for reliable seeding)
  await prisma.review.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.service.deleteMany();
  await prisma.businessCategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.business.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create Users
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@cake.com',
      passwordHash: passwordHash,
      phone: '+1234567890',
      role: 'ADMIN',
    },
  });

  const bizUser = await prisma.user.create({
    data: {
      name: 'Jane Baker',
      email: 'jane@bakery.com',
      passwordHash: passwordHash,
      phone: '+1987654321',
      role: 'BUSINESS_OWNER',
    },
  });

  const customerUser = await prisma.user.create({
    data: {
      name: 'Hungry Customer',
      email: 'customer@test.com',
      passwordHash: passwordHash,
      phone: '+1555555555',
      role: 'CUSTOMER',
    },
  });

  // 2. Create Categories
  const categoryCakes = await prisma.category.create({
    data: {
      name: 'Custom Cakes',
      slug: 'custom-cakes',
      icon: 'Cake',
    },
  });

  const categoryPastries = await prisma.category.create({
    data: {
      name: 'Pastries',
      slug: 'pastries',
      icon: 'Croissant',
    },
  });

  // 3. Create Business
  const business = await prisma.business.create({
    data: {
      ownerId: bizUser.id,
      name: "Jane's Sweet Treats",
      slug: 'janes-sweet-treats',
      description: 'The best custom cakes and pastries in town! Baked with love daily.',
      location: '123 Baker Street',
      phone: '+1987654321',
      email: 'jane@bakery.com',
      status: 'ACTIVE',
      rating: 4.8,
      reviewCount: 42,
      isPickupAvailable: true,
      businessCategories: {
        create: [
          { categoryId: categoryCakes.id },
          { categoryId: categoryPastries.id }
        ]
      }
    },
  });

  // 4. Create Products
  const product1 = await prisma.product.create({
    data: {
      businessId: business.id,
      categoryId: categoryCakes.id,
      name: 'Signature Chocolate Truffle Cake',
      description: 'Rich, moist chocolate cake with dark chocolate ganache.',
      price: 45.00,
      status: 'ACTIVE',
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=60',
      variants: {
        create: [
          { name: '6 Inch (Serves 6-8)', price: 45.00 },
          { name: '8 Inch (Serves 10-14)', price: 65.00 },
        ]
      }
    }
  });

  const product2 = await prisma.product.create({
    data: {
      businessId: business.id,
      categoryId: categoryPastries.id,
      name: 'Assorted Macarons (Box of 12)',
      description: 'A colorful mix of our bestselling French macarons.',
      price: 24.00,
      status: 'ACTIVE',
      imageUrl: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&auto=format&fit=crop&q=60',
    }
  });

  // 5. Create Services
  const service1 = await prisma.service.create({
    data: {
      businessId: business.id,
      categoryId: categoryCakes.id,
      name: 'Wedding Cake Consultation & Tasting',
      description: 'Sit down with Jane to design your dream wedding cake. Includes tasting of 4 popular flavors.',
      price: 50.00,
      duration: 60, // 60 minutes
      status: 'ACTIVE',
      imageUrl: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&auto=format&fit=crop&q=60',
    }
  });

  // 6. Create a Review to populate the UI
  await prisma.review.create({
    data: {
      userId: customerUser.id,
      businessId: business.id,
      rating: 5,
      content: 'Absolutely incredible cake! Made our anniversary so special.',
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log('\n--- Test Accounts ---');
  console.log('Admin:', adminUser.email, '/ password123');
  console.log('Business:', bizUser.email, '/ password123');
  console.log('Customer:', customerUser.email, '/ password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
