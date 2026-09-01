export interface ProductReviewStats {
  total_reviews: number;
  average_rating: number;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  dimensions: string;
  lead_time: string;
  main_image_url: string;
  gallery_images: string[];
  review_stats: ProductReviewStats;
  stock_quantity?: number;
  is_on_sale?: boolean;
  discount_percent?: number;
  sku?: string;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
}

const mockCategories: Category[] = [
  { id: 'cat1', name: 'Mesas', slug: 'mesas' },
  { id: 'cat2', name: 'Cadeiras', slug: 'cadeiras' },
  { id: 'cat3', name: 'Sofás', slug: 'sofas' },
  { id: 'cat4', name: 'Estantes', slug: 'estantes' },
  { id: 'cat5', name: 'Camas', slug: 'camas' },
];

const mockProducts: Product[] = [
  {
    id: 'prod1',
    category_id: 'cat1',
    name: 'Mesa de Centro Rústica',
    description:
      'Mesa de centro em madeira maciça com acabamento rústico. Perfeita para salas de estar contemporâneas.',
    price: 1450.0,
    dimensions: '80x80x45cm',
    lead_time: '10-15 dias úteis',
    main_image_url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800',
    gallery_images: [
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    ],
    review_stats: { total_reviews: 24, average_rating: 4.5 },
    stock_quantity: 15,
    is_on_sale: false,
    discount_percent: 0,
    sku: 'MESA-001',
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 'prod2',
    category_id: 'cat2',
    name: 'Cadeira Executiva Premium',
    description: 'Cadeira ergonômica com apoio lombar ajustável e acabamento em couro sintético.',
    price: 890.0,
    dimensions: '60x60x120cm',
    lead_time: '7-10 dias úteis',
    main_image_url: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800',
    gallery_images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800'],
    review_stats: { total_reviews: 18, average_rating: 4.8 },
    stock_quantity: 8,
    is_on_sale: true,
    discount_percent: 15,
    sku: 'CAD-002',
    created_at: '2024-02-20T14:30:00Z',
  },
  {
    id: 'prod3',
    category_id: 'cat3',
    name: 'Sofá 3 Lugares Elegance',
    description:
      'Sofá moderno com estrutura em madeira e estofado em linho natural. Conforto e elegância.',
    price: 3200.0,
    dimensions: '220x90x85cm',
    lead_time: '20-25 dias úteis',
    main_image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    gallery_images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800',
    ],
    review_stats: { total_reviews: 42, average_rating: 4.9 },
    stock_quantity: 3,
    is_on_sale: false,
    discount_percent: 0,
    sku: 'SOF-003',
    created_at: '2024-03-10T09:15:00Z',
  },
  {
    id: 'prod4',
    category_id: 'cat4',
    name: 'Estante Modular Industrial',
    description: 'Estante em metal e madeira com design industrial. Ideal para livros e decoração.',
    price: 1890.0,
    dimensions: '180x40x200cm',
    lead_time: '15-20 dias úteis',
    main_image_url: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800',
    gallery_images: ['https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800'],
    review_stats: { total_reviews: 12, average_rating: 4.3 },
    stock_quantity: 6,
    is_on_sale: true,
    discount_percent: 20,
    sku: 'EST-004',
    created_at: '2024-03-25T16:45:00Z',
  },
  {
    id: 'prod5',
    category_id: 'cat5',
    name: 'Cama Queen Size Natural',
    description: 'Cama queen size em madeira de reflorestamento com cabeceira estofada.',
    price: 2750.0,
    dimensions: '160x200x110cm',
    lead_time: '25-30 dias úteis',
    main_image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
    gallery_images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
    ],
    review_stats: { total_reviews: 35, average_rating: 4.7 },
    stock_quantity: 4,
    is_on_sale: false,
    discount_percent: 0,
    sku: 'CAM-005',
    created_at: '2024-04-05T11:20:00Z',
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const productService = {
  getProducts: async (filters?: {
    search?: string;
    categoryId?: string;
    sortBy?: 'name' | 'price' | 'date';
    sortOrder?: 'asc' | 'desc';
  }): Promise<Product[]> => {
    await delay(500);

    let filtered = [...mockProducts];

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower),
      );
    }

    if (filters?.categoryId) {
      filtered = filtered.filter((p) => p.category_id === filters.categoryId);
    }

    if (filters?.sortBy) {
      filtered.sort((a, b) => {
        let comparison = 0;
        switch (filters.sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'price':
            comparison = a.price - b.price;
            break;
          case 'date':
            comparison =
              new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime();
            break;
        }
        return filters.sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    return filtered;
  },

  getProductById: async (id: string): Promise<Product> => {
    await delay(500);
    const product = mockProducts.find((p) => p.id === id);
    if (!product) {
      throw new Error('Produto não encontrado');
    }
    return product;
  },

  createProduct: async (
    productData: Omit<Product, 'id' | 'review_stats' | 'created_at'>,
  ): Promise<Product> => {
    await delay(500);
    const newProduct: Product = {
      ...productData,
      id: `prod${Date.now()}`,
      review_stats: { total_reviews: 0, average_rating: 0 },
      created_at: new Date().toISOString(),
    };
    mockProducts.unshift(newProduct);
    return newProduct;
  },

  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    await delay(500);
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index < 0) {
      throw new Error('Produto não encontrado');
    }
    mockProducts[index] = { ...mockProducts[index], ...productData };
    return mockProducts[index];
  },

  deleteProduct: async (id: string): Promise<boolean> => {
    await delay(500);
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index < 0) {
      throw new Error('Produto não encontrado');
    }
    mockProducts.splice(index, 1);
    return true;
  },

  getCategories: async (): Promise<Category[]> => {
    await delay(300);
    return mockCategories;
  },

  duplicateProduct: async (id: string): Promise<Product> => {
    await delay(500);
    const original = mockProducts.find((p) => p.id === id);
    if (!original) {
      throw new Error('Produto não encontrado');
    }
    const duplicate: Product = {
      ...original,
      id: `prod${Date.now()}`,
      name: `${original.name} (Cópia)`,
      sku: original.sku ? `${original.sku}-COPY` : undefined,
      review_stats: { total_reviews: 0, average_rating: 0 },
      created_at: new Date().toISOString(),
    };
    mockProducts.unshift(duplicate);
    return duplicate;
  },

  deleteProducts: async (ids: string[]): Promise<number> => {
    await delay(500);
    let deletedCount = 0;
    ids.forEach((id) => {
      const index = mockProducts.findIndex((p) => p.id === id);
      if (index >= 0) {
        mockProducts.splice(index, 1);
        deletedCount++;
      }
    });
    return deletedCount;
  },

  updateProductsCategory: async (ids: string[], categoryId: string): Promise<number> => {
    await delay(500);
    let updatedCount = 0;
    ids.forEach((id) => {
      const product = mockProducts.find((p) => p.id === id);
      if (product) {
        product.category_id = categoryId;
        updatedCount++;
      }
    });
    return updatedCount;
  },

  updateProductsStock: async (ids: string[], stockQuantity: number): Promise<number> => {
    await delay(500);
    let updatedCount = 0;
    ids.forEach((id) => {
      const product = mockProducts.find((p) => p.id === id);
      if (product) {
        product.stock_quantity = stockQuantity;
        updatedCount++;
      }
    });
    return updatedCount;
  },

  exportProductsToCSV: (products: Product[], categories: Category[]): void => {
    const getCategoryName = (catId: string) => {
      const cat = categories.find((c) => c.id === catId);
      return cat?.name || 'Sem categoria';
    };

    const headers = [
      'ID',
      'Nome',
      'Descrição',
      'Categoria',
      'Preço',
      'Preço Original',
      'Em Promoção',
      'Desconto %',
      'SKU',
      'Estoque',
      'Dimensões',
      'Prazo de Entrega',
      'Avaliação Média',
      'Total de Avaliações',
      'Imagem Principal',
      'Criado em',
    ];

    const rows = products.map((p) => [
      p.id,
      `"${(p.name || '').replace(/"/g, '""')}"`,
      `"${(p.description || '').replace(/"/g, '""')}"`,
      getCategoryName(p.category_id),
      p.price.toFixed(2),
      p.is_on_sale && p.discount_percent
        ? (p.price / (1 - p.discount_percent / 100)).toFixed(2)
        : '',
      p.is_on_sale ? 'Sim' : 'Não',
      p.discount_percent || 0,
      p.sku || '',
      p.stock_quantity || 0,
      p.dimensions || '',
      p.lead_time || '',
      p.review_stats?.average_rating.toFixed(1) || '0.0',
      p.review_stats?.total_reviews || 0,
      p.main_image_url || '',
      p.created_at || '',
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `produtos_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
