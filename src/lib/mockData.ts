export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number;
  dimensions: string | null;
  lead_time: string | null;
  main_image_url: string | null;
  gallery_images: string[] | null;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending_payment' | 'sent_to_factory' | 'in_production' | 'shipped' | 'delivered';
  shipping_address: string | null;
  shipping_phone: string | null;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  created_at: string;
}

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Salas de Estar',
    slug: 'salas-de-estar',
    image_url: '',
    created_at: new Date().toISOString(),
  },
  {
    id: 'cat-2',
    name: 'Quartos',
    slug: 'quartos',
    image_url: '',
    created_at: new Date().toISOString(),
  },
  {
    id: 'cat-3',
    name: 'Escritórios',
    slug: 'escritorios',
    image_url: '',
    created_at: new Date().toISOString(),
  },
];

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    category_id: 'cat-1',
    name: 'Estante Moderna',
    description:
      'Estante elegante em madeira de lei com acabamento premium. Perfeita para decorar sua sala de estar com sofisticação.',
    price: 3500,
    dimensions: '2.40m x 0.60m x 2.00m',
    lead_time: '20 dias',
    main_image_url: '',
    gallery_images: ['', ''],
    created_at: new Date().toISOString(),
  },
  {
    id: 'prod-2',
    category_id: 'cat-1',
    name: 'Mesa de Centro Premium',
    description:
      'Mesa de centro em madeira maciça com design contemporâneo. Acabamento impecável e durabilidade garantida.',
    price: 2800,
    dimensions: '1.20m x 0.60m x 0.45m',
    lead_time: '15 dias',
    main_image_url: '',
    gallery_images: null,
    created_at: new Date().toISOString(),
  },
  {
    id: 'prod-3',
    category_id: 'cat-2',
    name: 'Guarda-roupa Luxo',
    description:
      'Guarda-roupa espaçoso com portas de correr e acabamento em laca. Design moderno e funcional.',
    price: 8500,
    dimensions: '3.00m x 0.60m x 2.40m',
    lead_time: '30 dias',
    main_image_url: '',
    gallery_images: null,
    created_at: new Date().toISOString(),
  },
  {
    id: 'prod-4',
    category_id: 'cat-2',
    name: 'Cama Box Queen',
    description:
      'Cama box com cabeceira estofada e design elegante. Conforto e sofisticação para seu quarto.',
    price: 5200,
    dimensions: '1.98m x 1.58m x 1.20m',
    lead_time: '25 dias',
    main_image_url: '',
    gallery_images: null,
    created_at: new Date().toISOString(),
  },
  {
    id: 'prod-5',
    category_id: 'cat-3',
    name: 'Mesa de Escritório Executiva',
    description:
      'Mesa executiva em madeira nobre com gavetas e acabamento refinado. Ideal para home office.',
    price: 4500,
    dimensions: '1.80m x 0.80m x 0.75m',
    lead_time: '20 dias',
    main_image_url: '',
    gallery_images: null,
    created_at: new Date().toISOString(),
  },
  {
    id: 'prod-6',
    category_id: 'cat-3',
    name: 'Estante para Livros',
    description:
      'Estante modular em madeira maciça, perfeita para organizar seus livros e objetos decorativos.',
    price: 3200,
    dimensions: '2.00m x 0.40m x 2.20m',
    lead_time: '18 dias',
    main_image_url: '',
    gallery_images: null,
    created_at: new Date().toISOString(),
  },
];

let mockOrders: Order[] = [];
let mockOrderItems: OrderItem[] = [];

export const getMockOrders = (userId: string): Order[] => {
  return mockOrders.filter((order) => order.user_id === userId);
};

export const getMockOrderWithItems = (userId: string) => {
  const userOrders = getMockOrders(userId);
  return userOrders.map((order) => {
    const items = mockOrderItems
      .filter((item) => item.order_id === order.id)
      .map((item) => {
        const product = mockProducts.find((p) => p.id === item.product_id);
        return {
          ...item,
          products: product
            ? {
                name: product.name,
                main_image_url: product.main_image_url,
              }
            : null,
        };
      });

    return {
      ...order,
      order_items: items,
    };
  });
};

export const createMockOrder = (
  userId: string,
  totalAmount: number,
  shippingAddress: string,
  shippingPhone: string,
  items: { product_id: string; quantity: number; price_at_purchase: number }[],
): Order => {
  const orderId = `order-${Date.now()}`;

  const newOrder: Order = {
    id: orderId,
    user_id: userId,
    total_amount: totalAmount,
    status: 'pending_payment',
    shipping_address: shippingAddress,
    shipping_phone: shippingPhone,
    created_at: new Date().toISOString(),
  };

  mockOrders.push(newOrder);

  items.forEach((item) => {
    const orderItem: OrderItem = {
      id: `item-${Date.now()}-${Math.random()}`,
      order_id: orderId,
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_purchase: item.price_at_purchase,
      created_at: new Date().toISOString(),
    };
    mockOrderItems.push(orderItem);
  });

  return newOrder;
};
