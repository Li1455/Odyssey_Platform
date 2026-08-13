import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { cors } from 'hono/cors';

const app = new OpenAPIHono();

app.use('*', cors());

// In-memory order store initialized with existing mock items
const orders = [
  {
    id: 'ord_1092',
    customerId: 'Sarah Jenkins',
    status: 'pending' as const,
    totalAmount: '37.00',
    items: [{ menuItemId: 'item_1', quantity: 2 }],
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: 'ord_1091',
    customerId: 'Alex Rivera',
    status: 'preparing' as const,
    totalAmount: '18.50',
    items: [{ menuItemId: 'item_1', quantity: 1 }],
    createdAt: new Date(Date.now() - 14 * 60000).toISOString(),
  },
  {
    id: 'ord_1090',
    customerId: 'Marcus Chen',
    status: 'ready' as const,
    totalAmount: '22.50',
    items: [{ menuItemId: 'item_1', quantity: 1 }],
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
  },
];

const selectOrderSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  status: z.enum(['pending', 'preparing', 'ready', 'completed', 'cancelled']),
  totalAmount: z.string(),
  items: z.array(z.object({ menuItemId: z.string(), quantity: z.number() })),
  createdAt: z.string(),
});

const insertOrderSchema = z.object({
  customerId: z.string(),
  items: z.array(z.object({ menuItemId: z.string(), quantity: z.number() })),
});

// GET /api/orders route
const getOrdersRoute = createRoute({
  method: 'get',
  path: '/api/orders',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(selectOrderSchema),
        },
      },
      description: 'Retrieve all orders',
    },
  },
});

app.openapi(getOrdersRoute, (c) => {
  return c.json(orders);
});

// POST /api/orders route
const createOrderRoute = createRoute({
  method: 'post',
  path: '/api/orders',
  request: {
    body: {
      content: {
        'application/json': {
          schema: insertOrderSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: selectOrderSchema,
        },
      },
      description: 'Order created successfully',
    },
  },
});

app.openapi(createOrderRoute, async (c) => {
  const body = c.req.valid('json');
  const newOrder = {
    id: `ord_${Date.now()}`,
    customerId: body.customerId,
    status: 'pending' as const,
    totalAmount: '37.00',
    items: body.items,
    createdAt: new Date().toISOString(),
  };
  
  // Persist order in memory so the frontend can fetch it
  orders.unshift(newOrder);
  
  return c.json(newOrder, 201);
});

export default app;