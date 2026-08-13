import { pgTable, text, timestamp, integer, boolean, numeric, jsonb } from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

export const menuCategories = pgTable('menu_categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const menuItems = pgTable('menu_items', {
  id: text('id').primaryKey(),
  categoryId: text('category_id').references(() => menuCategories.id).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  isAvailable: boolean('is_available').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const customers = pgTable('customers', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  phone: text('phone'),
  totalSpend: numeric('total_spend', { precision: 10, scale: 2 }).notNull().default('0.00'),
  orderCount: integer('order_count').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  customerId: text('customer_id').references(() => customers.id).notNull(),
  status: text('status', { enum: ['pending', 'preparing', 'ready', 'completed', 'cancelled'] })
    .notNull()
    .default('pending'),
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  items: jsonb('items').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const settings = pgTable('settings', {
  id: text('id').primaryKey(),
  prepTimeMinutes: integer('prep_time_minutes').notNull().default(20),
  autoAcceptOrders: boolean('auto_accept_orders').notNull().default(false),
  serviceAvailable: boolean('service_available').notNull().default(true),
  openingHours: text('opening_hours').notNull().default('09:00 - 22:00'),
});

// Drizzle-Zod validation schemas
export const selectMenuItemSchema = createSelectSchema(menuItems);
export const insertMenuItemSchema = createInsertSchema(menuItems);
export const selectOrderSchema = createSelectSchema(orders);
export const insertOrderSchema = createInsertSchema(orders);
export const selectCustomerSchema = createSelectSchema(customers);
export const selectSettingsSchema = createSelectSchema(settings);