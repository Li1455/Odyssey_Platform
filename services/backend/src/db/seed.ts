import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import { menuCategories, menuItems, customers, orders, settings } from './schema';

dotenv.config();

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:admin@localhost:5432/odyssey';
const client = postgres(connectionString);
const db = drizzle(client);

async function seed() {
  console.log('🌱 Seeding Odyssey database...');

  await db.insert(settings).values({
    id: 'default',
    prepTimeMinutes: 20,
    autoAcceptOrders: false,
    serviceAvailable: true,
    openingHours: '11:00 - 23:00',
  }).onConflictDoNothing();

  await db.insert(menuCategories).values([
    { id: 'cat_1', name: 'Burgers', sortOrder: 1 },
    { id: 'cat_2', name: 'Sides', sortOrder: 2 },
    { id: 'cat_3', name: 'Drinks', sortOrder: 3 },
  ]).onConflictDoNothing();

  await db.insert(menuItems).values([
    { id: 'item_1', categoryId: 'cat_1', name: 'Truffle Burger', description: 'Brioche bun, wagyu patty, truffle aioli', price: '18.50', isAvailable: true },
    { id: 'item_2', categoryId: 'cat_1', name: 'Classic Smash Burger', description: 'Double beef patty, American cheese, special sauce', price: '14.00', isAvailable: true },
    { id: 'item_3', categoryId: 'cat_2', name: 'Parmesan Truffle Fries', description: 'Hand-cut fries, aged parmesan, truffle oil', price: '8.50', isAvailable: true },
    { id: 'item_4', categoryId: 'cat_3', name: 'Craft Ginger Beer', description: 'Real ginger, cane sugar, brewed locally', price: '4.50', isAvailable: true },
  ]).onConflictDoNothing();

  await db.insert(customers).values([
    { id: 'cust_1', name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '555-0192', totalSpend: '37.00', orderCount: 2 },
    { id: 'cust_2', name: 'Alex Rivera', email: 'arivera@example.com', phone: '555-8491', totalSpend: '18.50', orderCount: 1 },
  ]).onConflictDoNothing();

  console.log('✅ Seeding completed successfully.');
  await client.end();
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});