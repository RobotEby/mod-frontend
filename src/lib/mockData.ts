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
  originalPrice?: number;
  discountPercent?: number;
  isOnSale?: boolean;
  dimensions: string | null;
  lead_time: string | null;
  main_image_url: string | null;
  gallery_images: string[] | null;
  created_at: string;
  stock_quantity: number;
  low_stock_threshold: number;
  sku: string;
  status: 'active' | 'inactive' | 'out_of_stock';
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
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    created_at: new Date().toISOString(),
  },
  {
    id: 'cat-2',
    name: 'Quartos',
    slug: 'quartos',
    image_url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800',
    created_at: new Date().toISOString(),
  },
  {
    id: 'cat-3',
    name: 'Escritórios',
    slug: 'escritorios',
    image_url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
    created_at: new Date().toISOString(),
  },
  {
    id: 'cat-4',
    name: 'Cozinha',
    slug: 'cozinha',
    image_url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
    created_at: new Date().toISOString(),
  },
  {
    id: 'cat-5',
    name: 'Sala de Jantar',
    slug: 'sala-de-jantar',
    image_url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800',
    created_at: new Date().toISOString(),
  },
  {
    id: 'cat-6',
    name: 'Área Externa',
    slug: 'area-externa',
    image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
    created_at: new Date().toISOString(),
  },
  {
    id: 'cat-7',
    name: 'Quarto Infantil',
    slug: 'quarto-infantil',
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
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
    price: 3150,
    originalPrice: 3500,
    discountPercent: 10,
    isOnSale: true,
    dimensions: '2.40m x 0.60m x 2.00m',
    lead_time: '20 dias',
    main_image_url: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800',
    gallery_images: [
      'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=400',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400',
    ],
    created_at: new Date().toISOString(),
    stock_quantity: 12,
    low_stock_threshold: 5,
    sku: 'EST-MOD-001',
    status: 'active',
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
    main_image_url: 'https://images.unsplash.com/photo-1618219944342-824e40a13285?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 8,
    low_stock_threshold: 3,
    sku: 'MES-CEN-001',
    status: 'active',
  },
  {
    id: 'prod-3',
    category_id: 'cat-2',
    name: 'Guarda-roupa alta qualidade',
    description:
      'Guarda-roupa espaçoso com portas de correr e acabamento em laca. Design moderno e funcional.',
    price: 7225,
    originalPrice: 8500,
    discountPercent: 15,
    isOnSale: true,
    dimensions: '3.00m x 0.60m x 2.40m',
    lead_time: '30 dias',
    main_image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 3,
    low_stock_threshold: 5,
    sku: 'GUA-LUX-001',
    status: 'active',
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
    main_image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 15,
    low_stock_threshold: 5,
    sku: 'CAM-QUE-001',
    status: 'active',
  },
  {
    id: 'prod-5',
    category_id: 'cat-3',
    name: 'Mesa de Escritório Executiva',
    description:
      'Mesa executiva em madeira nobre com gavetas e acabamento refinado. Ideal para home office.',
    price: 3825,
    originalPrice: 4500,
    discountPercent: 15,
    isOnSale: true,
    dimensions: '1.80m x 0.80m x 0.75m',
    lead_time: '20 dias',
    main_image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 7,
    low_stock_threshold: 3,
    sku: 'MES-EXE-001',
    status: 'active',
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
    main_image_url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 10,
    low_stock_threshold: 4,
    sku: 'EST-LIV-001',
    status: 'active',
  },
  {
    id: 'prod-7',
    category_id: 'cat-4',
    name: 'Armário de Cozinha Planejado',
    description: 'Armário completo para cozinha com acabamento em laca branca e puxadores em inox.',
    price: 10200,
    originalPrice: 12000,
    discountPercent: 15,
    isOnSale: true,
    dimensions: '3.50m x 0.60m x 2.40m',
    lead_time: '35 dias',
    main_image_url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 2,
    low_stock_threshold: 3,
    sku: 'ARM-COZ-001',
    status: 'active',
  },
  {
    id: 'prod-8',
    category_id: 'cat-4',
    name: 'Ilha de Cozinha',
    description: 'Ilha central para cozinha gourmet com bancada em mármore e acabamento premium.',
    price: 8500,
    dimensions: '1.80m x 1.00m x 0.90m',
    lead_time: '30 dias',
    main_image_url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 5,
    low_stock_threshold: 2,
    sku: 'ILH-COZ-001',
    status: 'active',
  },
  {
    id: 'prod-9',
    category_id: 'cat-5',
    name: 'Mesa de Jantar 8 Lugares',
    description:
      'Mesa de jantar em madeira maciça com design elegante, perfeita para reunir família e amigos.',
    price: 5440,
    originalPrice: 6800,
    discountPercent: 20,
    isOnSale: true,
    dimensions: '2.40m x 1.00m x 0.75m',
    lead_time: '25 dias',
    main_image_url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 6,
    low_stock_threshold: 3,
    sku: 'MES-JAN-001',
    status: 'active',
  },
  {
    id: 'prod-10',
    category_id: 'cat-5',
    name: 'Buffet Clássico',
    description:
      'Buffet em madeira nobre com gavetas e portas, ideal para sala de jantar sofisticada.',
    price: 5200,
    dimensions: '1.80m x 0.50m x 0.90m',
    lead_time: '22 dias',
    main_image_url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 4,
    low_stock_threshold: 2,
    sku: 'BUF-CLA-001',
    status: 'active',
  },
  {
    id: 'prod-11',
    category_id: 'cat-5',
    name: 'Cristaleira de Parede',
    description: 'Cristaleira suspensa com iluminação LED e prateleiras de vidro temperado.',
    price: 3800,
    dimensions: '1.60m x 0.40m x 0.80m',
    lead_time: '20 dias',
    main_image_url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 0,
    low_stock_threshold: 3,
    sku: 'CRI-PAR-001',
    status: 'out_of_stock',
  },
  {
    id: 'prod-12',
    category_id: 'cat-6',
    name: 'Conjunto de Jardim Premium',
    description: 'Conjunto completo para área externa com mesa e 6 cadeiras em madeira tratada.',
    price: 7500,
    dimensions: '1.80m x 1.00m x 0.75m',
    lead_time: '28 dias',
    main_image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 8,
    low_stock_threshold: 3,
    sku: 'CON-JAR-001',
    status: 'active',
  },
  {
    id: 'prod-13',
    category_id: 'cat-6',
    name: 'Espreguiçadeira de Madeira',
    description:
      'Espreguiçadeira articulável em madeira de eucalipto tratado, perfeita para relaxar.',
    price: 1530,
    originalPrice: 1800,
    discountPercent: 15,
    isOnSale: true,
    dimensions: '2.00m x 0.70m x 0.90m',
    lead_time: '15 dias',
    main_image_url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 20,
    low_stock_threshold: 5,
    sku: 'ESP-MAD-001',
    status: 'active',
  },
  {
    id: 'prod-14',
    category_id: 'cat-7',
    name: 'Beliche com Escrivaninha',
    description: 'Beliche funcional com escrivaninha integrada e escada com gavetas.',
    price: 4500,
    dimensions: '2.00m x 1.00m x 1.80m',
    lead_time: '25 dias',
    main_image_url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 6,
    low_stock_threshold: 3,
    sku: 'BEL-ESC-001',
    status: 'active',
  },
  {
    id: 'prod-15',
    category_id: 'cat-7',
    name: 'Guarda-Roupa Infantil Colorido',
    description: 'Guarda-roupa com design lúdico e cores vibrantes, ideal para quarto de criança.',
    price: 3200,
    dimensions: '1.60m x 0.50m x 1.80m',
    lead_time: '20 dias',
    main_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 9,
    low_stock_threshold: 4,
    sku: 'GUA-INF-001',
    status: 'active',
  },
  {
    id: 'prod-16',
    category_id: 'cat-1',
    name: 'Rack para TV 65 polegadas',
    description: 'Rack moderno com painel para TV e nichos para decoração, acabamento em laca.',
    price: 4200,
    dimensions: '2.20m x 0.45m x 0.60m',
    lead_time: '20 dias',
    main_image_url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 11,
    low_stock_threshold: 4,
    sku: 'RAC-TV-001',
    status: 'active',
  },
  {
    id: 'prod-17',
    category_id: 'cat-1',
    name: 'Sofá de 3 Lugares com Chaise',
    description: 'Sofá em L com estofado premium e estrutura em madeira maciça.',
    price: 9500,
    dimensions: '2.80m x 1.60m x 0.90m',
    lead_time: '35 dias',
    main_image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 4,
    low_stock_threshold: 2,
    sku: 'SOF-CHA-001',
    status: 'active',
  },
  {
    id: 'prod-18',
    category_id: 'cat-2',
    name: 'Penteadeira com Espelho Iluminado',
    description: 'Penteadeira moderna com espelho LED e gavetas organizadoras.',
    price: 2800,
    dimensions: '1.20m x 0.45m x 1.50m',
    lead_time: '18 dias',
    main_image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 7,
    low_stock_threshold: 3,
    sku: 'PEN-ESP-001',
    status: 'active',
  },
  {
    id: 'prod-19',
    category_id: 'cat-2',
    name: 'Criado-Mudo Suspenso',
    description: 'Criado-mudo de parede com design minimalista e gaveta discreta.',
    price: 1200,
    dimensions: '0.50m x 0.40m x 0.20m',
    lead_time: '12 dias',
    main_image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 25,
    low_stock_threshold: 8,
    sku: 'CRI-SUS-001',
    status: 'active',
  },
  {
    id: 'prod-20',
    category_id: 'cat-3',
    name: 'Estação de Trabalho Executiva',
    description: 'Mesa em L com gaveteiro e suporte para computador, design corporativo premium.',
    price: 5800,
    dimensions: '1.80m x 1.60m x 0.75m',
    lead_time: '25 dias',
    main_image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800',
    gallery_images: null,
    created_at: new Date().toISOString(),
    stock_quantity: 3,
    low_stock_threshold: 2,
    sku: 'EST-TRA-001',
    status: 'active',
  },
];

let mockOrders: Order[] = [
  {
    id: 'order-1',
    user_id: 'user-1',
    total_amount: 8500,
    status: 'in_production',
    shipping_address: 'Rua das Flores, 123 - São Paulo, SP',
    shipping_phone: '(11) 99999-9999',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'order-2',
    user_id: 'user-1',
    total_amount: 5200,
    status: 'shipped',
    shipping_address: 'Av. Brasil, 456 - Rio de Janeiro, RJ',
    shipping_phone: '(21) 88888-8888',
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'order-3',
    user_id: 'user-2',
    total_amount: 12000,
    status: 'pending_payment',
    shipping_address: 'Rua Curitiba, 789 - Curitiba, PR',
    shipping_phone: '(41) 77777-7777',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'order-4',
    user_id: 'user-3',
    total_amount: 3500,
    status: 'delivered',
    shipping_address: 'Rua Porto Alegre, 321 - Porto Alegre, RS',
    shipping_phone: '(51) 66666-6666',
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'order-5',
    user_id: 'user-4',
    total_amount: 9500,
    status: 'sent_to_factory',
    shipping_address: 'Av. Paulista, 1000 - São Paulo, SP',
    shipping_phone: '(11) 55555-5555',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

let mockOrderItems: OrderItem[] = [
  {
    id: 'item-1',
    order_id: 'order-1',
    product_id: 'prod-3',
    quantity: 1,
    price_at_purchase: 8500,
    created_at: new Date().toISOString(),
  },
  {
    id: 'item-2',
    order_id: 'order-2',
    product_id: 'prod-4',
    quantity: 1,
    price_at_purchase: 5200,
    created_at: new Date().toISOString(),
  },
  {
    id: 'item-3',
    order_id: 'order-3',
    product_id: 'prod-7',
    quantity: 1,
    price_at_purchase: 12000,
    created_at: new Date().toISOString(),
  },
  {
    id: 'item-4',
    order_id: 'order-4',
    product_id: 'prod-1',
    quantity: 1,
    price_at_purchase: 3500,
    created_at: new Date().toISOString(),
  },
  {
    id: 'item-5',
    order_id: 'order-5',
    product_id: 'prod-17',
    quantity: 1,
    price_at_purchase: 9500,
    created_at: new Date().toISOString(),
  },
];

export const getMockOrders = (userId: string): Order[] => {
  return mockOrders.filter((order) => order.user_id === userId);
};

export const getAllMockOrders = (): Order[] => {
  return mockOrders;
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

export const getAllMockOrdersWithItems = () => {
  return mockOrders.map((order) => {
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

export const updateMockOrderStatus = (orderId: string, newStatus: Order['status']) => {
  const orderIndex = mockOrders.findIndex((o) => o.id === orderId);
  if (orderIndex !== -1) {
    mockOrders[orderIndex].status = newStatus;
    return mockOrders[orderIndex];
  }
  return null;
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

export const updateProductStock = (productId: string, newQuantity: number) => {
  const productIndex = mockProducts.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    mockProducts[productIndex].stock_quantity = newQuantity;
    mockProducts[productIndex].status = newQuantity === 0 ? 'out_of_stock' : 'active';
    return mockProducts[productIndex];
  }
  return null;
};

export const getProductsByStatus = (status: Product['status']) => {
  return mockProducts.filter((p) => p.status === status);
};

export const getLowStockProducts = () => {
  return mockProducts.filter(
    (p) => p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold,
  );
};

export const getOutOfStockProducts = () => {
  return mockProducts.filter((p) => p.stock_quantity === 0);
};
